import { useState, useEffect, useRef } from 'react';
import kairosLogo from './assets/images/logo-2.png';

// Never bake the secret into the client bundle — always prompt at login.
const BUNDLED_SECRET = '';

// All API helpers accept the runtime secret typed at the gate.
async function apiStatus(secret) {
  const res = await fetch('/api/status', { headers: { 'x-admin-secret': secret } });
  return res.json();
}

async function apiSetOnline(online, secret) {
  const res = await fetch('/api/status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
    body: JSON.stringify({ online }),
  });
  return res.json();
}

async function apiSessions(secret) {
  const res = await fetch('/api/sessions', { headers: { 'x-admin-secret': secret } });
  return res.json();
}

async function apiReply(session, text, secret) {
  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session, role: 'assistant', text, secret }),
  });
  return res.json();
}

export default function AdminPanel() {
  // runtimeSecret: always set from what the user types at the gate
  const [runtimeSecret, setRuntimeSecret] = useState('');
  const [authed, setAuthed]               = useState(false);
  const [secretInput, setSecret]          = useState('');
  const [online, setOnline]       = useState(false);
  const [toggling, setToggling]   = useState(false);
  const [sessions, setSessions]   = useState([]);
  const [activeId, setActiveId]   = useState(null);
  const [reply, setReply]         = useState('');
  const [sending, setSending]     = useState(false);
  const pollRef                   = useRef(null);

  // ── Fetch status + sessions ───────────────────────────────────────────────
  async function refresh(secret) {
    try {
      const [st, se] = await Promise.all([apiStatus(secret), apiSessions(secret)]);
      setOnline(st.online ?? false);
      setSessions(se.sessions ?? []);
    } catch { /* ignore */ }
  }

  useEffect(() => {
    if (!authed || !runtimeSecret) return;
    refresh(runtimeSecret);
    pollRef.current = setInterval(() => refresh(runtimeSecret), 5_000);
    return () => clearInterval(pollRef.current);
  }, [authed, runtimeSecret]);

  // ── Toggle online status ──────────────────────────────────────────────────
  async function toggleOnline() {
    setToggling(true);
    const result = await apiSetOnline(!online, runtimeSecret);
    if (result.online !== undefined) setOnline(result.online);
    setToggling(false);
  }

  // ── Send reply ────────────────────────────────────────────────────────────
  async function sendReply(e) {
    e.preventDefault();
    const text = reply.trim();
    if (!text || !activeId) return;
    setSending(true);
    await apiReply(activeId, text, runtimeSecret);
    setReply('');
    await refresh();
    setSending(false);
  }

  const activeSession = sessions.find(s => s.id === activeId) ?? null;

  // ── Secret gate ───────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="ap-gate">
        <div className="ap-gate-card">
          <img src={kairosLogo} alt="Kairos" className="ap-gate-logo" />
          <h2 className="ap-gate-title">Admin Access</h2>
          <form onSubmit={e => {
            e.preventDefault();
            if (secretInput) {
              setRuntimeSecret(secretInput);
              setAuthed(true);
            }
          }}>
            <input
              type="password"
              className="ap-gate-input"
              placeholder="Enter admin secret…"
              value={secretInput}
              onChange={e => setSecret(e.target.value)}
              autoFocus
            />
            <button className="ap-gate-btn" type="submit" disabled={!secretInput}>
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="ap-layout">
      {/* Sidebar */}
      <aside className="ap-sidebar">
        <div className="ap-sidebar-header">
          <img src={kairosLogo} alt="Kairos" className="ap-sidebar-logo" />
          <span className="ap-sidebar-title">JEL Admin</span>
        </div>

        {/* Online toggle */}
        <div className="ap-presence">
          <span className={`ap-presence-dot ${online ? 'ap-presence-dot--on' : ''}`} />
          <span className="ap-presence-label">{online ? 'You are Online' : 'You are Offline'}</span>
          <button
            className={`ap-toggle-btn ${online ? 'ap-toggle-btn--on' : ''}`}
            onClick={toggleOnline}
            disabled={toggling}
          >
            {toggling ? '…' : online ? 'Go Offline' : 'Go Online'}
          </button>
        </div>

        <p className="ap-sidebar-hint">
          {online
            ? '🟢 Visitors see you as online and can chat live.'
            : '⚫ Visitors see the AI assistant (Kairos).'}
        </p>

        {/* Session list */}
        <div className="ap-sessions-label">Active Conversations</div>
        {sessions.length === 0 && (
          <div className="ap-sessions-empty">No active visitors yet.</div>
        )}
        {sessions.map(s => (
          <button
            key={s.id}
            className={`ap-session-item ${s.id === activeId ? 'ap-session-item--active' : ''}`}
            onClick={() => setActiveId(s.id)}
          >
            <span className="ap-session-id">{s.id.slice(0, 8)}…</span>
            <span className="ap-session-count">{s.unread} msg{s.unread !== 1 ? 's' : ''}</span>
            {s.lastMsg && (
              <span className="ap-session-last">
                {s.lastMsg.text.slice(0, 40)}{s.lastMsg.text.length > 40 ? '…' : ''}
              </span>
            )}
          </button>
        ))}
      </aside>

      {/* Chat pane */}
      <main className="ap-chat">
        {!activeSession ? (
          <div className="ap-chat-empty">
            <p>Select a conversation on the left.</p>
          </div>
        ) : (
          <>
            <div className="ap-chat-header">
              Visitor <code>{activeSession.id.slice(0, 12)}…</code>
            </div>
            <div className="ap-chat-messages">
              {activeSession.messages.map((m, i) => (
                <div key={i} className={`ap-msg ${m.role === 'user' ? 'ap-msg--user' : 'ap-msg--me'}`}>
                  <span className="ap-msg-label">{m.role === 'user' ? 'Visitor' : 'You'}</span>
                  <div className="ap-msg-bubble">{m.text}</div>
                  <span className="ap-msg-ts">{new Date(m.ts).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
            <form className="ap-reply-row" onSubmit={sendReply}>
              <textarea
                className="ap-reply-input"
                placeholder="Type your reply…"
                rows={2}
                value={reply}
                onChange={e => setReply(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendReply(e); } }}
              />
              <button className="ap-reply-btn" type="submit" disabled={!reply.trim() || sending}>
                {sending ? '…' : 'Send'}
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
