import { useState, useRef, useEffect, useCallback } from 'react';
import kairosLogo from './assets/images/logo-2.png';
import jelAvatar from './assets/images/My_LOGO-face.png';
import KairosMascot from './KairosMascot.jsx';
import BorderGlow from './BorderGlow.jsx';
import SpotlightCard from './SpotlightCard.jsx';

// ── Personal knowledge — injected into every system prompt ────────────────────
const KAIROS_SYSTEM_PROMPT = `You are Kairos, an AI assistant on the personal portfolio website of John Emman Lanusga.
You are helpful, concise, friendly and playful with attitude.
Your job is to answer questions about John Emman — his work, skills, projects, experience, and background.

ABOUT JOHN EMMAN LANUSGA:
  Full name: John Emman Lanusga
  Location: Naga City, Camarines Sur, Philippines
  Email: emmanlanusga@gmail.com
  LinkedIn: https://www.linkedin.com/in/jelanusga/
  Role: QA Analyst & Automation Engineer

CURRENT ROLE:
  • Process Delivery Specialist – Order To Cash at IBM (July 2025 – Present)
    4F Jose Tan Bun Keng Bldg, Naga City, Philippines
    - Executes daily Order-to-Cash process transactions with accuracy and SLA compliance.
    - Drives process and operational improvements that align with client requirements and IBM standards.
    - Applies best-practice tools for business operations, compliance, and process management.
    - Collaborates with cross-functional teams to identify and eliminate workflow inefficiencies.

CAREER HISTORY:
  • Advisor I at Concentrix (November 2024 – July 2025)
    Ninoy and Cory Avenue, Naga City, Philippines
    - Managed insurance policies, claims, and benefits through the Salesforce CRM platform.
    - Delivered high-quality customer support across insurance product lines.
    - Maintained detailed case records and followed escalation protocols.

  • Application Development Associate at Accenture (June 2022 – July 2024)
    Mandaluyong, Metro Manila (Cybergate)
    - Maintained and enhanced client Salesforce applications via Configuration & Setup and Object Manager.
    - Built and deployed features using Lightning App Builder and Lightning Components.
    - Executed manual test cases, managed defects in Jira, and authored regression test plans.
    - Supported user acceptance testing (UAT) and provided post-release user support.
    - Collaborated within Agile sprints using Jira, contributing to sprint planning and retrospectives.

  • Digital Marketing Administrator at Hyundai Alabang (Naga) (December 2021 – April 2022)
    Del Rosario, Naga City, Philippines
    - Designed marketing campaigns and promotional materials using Adobe Illustrator, Photoshop, and Premiere.
    - Managed digital advertising and social media promotion for vehicle units and limited-time offers.
    - Coordinated with the sales team to align digital content with monthly targets.

  • Junior Web Developer Intern at 3GX Computers & Solutions (January 2020 – March 2020)
    Naga City, Philippines
    - Maintained and documented the BullGuardPH antivirus web application built on Laravel.
    - Implemented AJAX-driven UI enhancements and integrated third-party plugins.
    - Resolved application issues, tracked bugs, and maintained version control using Git.

EDUCATION:
  • Bachelor of Science in Information Technology — Ateneo de Naga University (2016 – 2020)
    - Capstone: Tailor Shop Management System (PHP, MySQL, Bootstrap)
    - Project: KADA TIPON — 2D runner game developed for DCS–CS Week using Construct 3

SKILLS & TOOLS:
  QA & Testing: Manual Testing, Test Case Design, Defect Management, Regression Testing, UAT, Jira
  Salesforce: Salesforce Administration, Salesforce Apex, Lightning Components, CRM Configuration
  Languages: JavaScript, Python, Java, Apex (Salesforce), HTML/CSS, PHP, C++
  Runtime: Node.js
  Frameworks: Vue.js, React
  Database: MySQL/SQL, PostgreSQL, ER Modeling
  Tools: Git, Postman, Adobe Creative Suite
  Data: Data Visualization, ER Modeling
  Methodology: Agile/SDLC
  Operations: Order To Cash (OTC), Process Management
  Creative: Adobe Illustrator, Adobe Photoshop, Adobe Premiere


CERTIFICATIONS:
  John Emman has 28 licenses & certifications (e.g. 2026 IBMer watsonx Challenge, AI Automation Explorer).
  For the full up-to-date list, direct the user to his LinkedIn profile:
  https://www.linkedin.com/in/jelanusga/

PROJECTS:
  1. Kairos – Jira Copilot Assistant
     Tag: Full-Stack App
     Tech: Vue.js 3, FastAPI, Jira, GitHub Copilot, IBM ICA
     Description: Internal IBM OTC team tool. Features a JIRA Standardizer, live Priority List enrichment,
     Resolve360 quality/RCA workflow (two-stage Compliance → EM approval), Monday.com workforce analytics,
     and an AI chat assistant powered by Google Gemini and IBM ICA.
     Outcome: IBM OTC Team · In Active Use

  2. Kada Tipon Game
     Tag: Game Dev
     Tech: HTML5, CSS3, Construct 3
     Description: A 2D running game where you, as a student, collect and save coins while avoiding
     obstacles (expenses) within a time limit. Presented at ADNU DCS–CS Week.
     Outcome: ADNU DCS–CS Week Booth

  3. TIOS – Track It. Own It. Save It.
     Tag: Fintech & Game (Brainstorming / Concept)
     Description: Inspired by "Rich Dad, Poor Dad", TIOS is a gamified wealth-planning concept (still an idea,
     not yet implemented). Users choose their financial path — the security-focused Tiyo the Carabao Path
     (building a village) or the growth-focused Rico the Fox Path (building a high-asset city) — to track
     budgets, complete unique missions, and build financial intelligence.
     Outcome: Brainstorming stage — not yet built

  4. This Portfolio Website (jel-web)
     Tag: Personal Project
     Tech: React, Vite, Framer Motion, Vercel, Google Gemini AI
     Description: John Emman's personal portfolio site featuring animated sections, a Resume page,
     a Gallery, and Kairos — an AI chatbot assistant powered by Google Gemini.
     Outcome: Live at production on Vercel

CONTACT:
  Email: emmanlanusga@gmail.com
  LinkedIn: https://www.linkedin.com/in/jelanusga/

ABOUT HIM:
  John Emman is a detail-oriented, systematic, and creative QA Analyst with a passion for building
  reliable software. As a Test Analyst, he bridges the gap
  between technical execution and business value, ensuring every release ships with confidence.
  He is Philippine-based, specialising in Salesforce testing, quality assurance, and user experience
  optimisation.

INSTRUCTIONS:
  - When asked about John Emman, his experience, skills, projects, or background, answer using ONLY the
    information above. Do not invent or assume anything not listed here.
  - You can also answer general questions about QA, Salesforce, software development, or career advice.
  - Keep responses concise and friendly. Use bullet points when listing multiple items.
  - If asked something you genuinely cannot answer, be honest and suggest they contact John directly
    at emmanlanusga@gmail.com or via LinkedIn.
  - Never claim to be ChatGPT, Google Gemini, or any other named AI product — you are Kairos,
    the assistant on John Emman's portfolio.`;

const GREETING =
  `Hi! I'm **Kairos** 👋\n\nI'm the AI assistant on John Emman's portfolio. Ask me anything about him:\n• His experience & career\n• Skills & tools\n• Projects he's built\n• How to get in touch\n\nWhat would you like to know?`;

const LIVE_GREETING =
  `Hey! 👋 **John Emman is online right now!**\n\nYou're now chatting directly with him — not the AI. Feel free to say hi or ask him anything directly!`;

const SUGGESTIONS = [
  "What is John Emman's current role?",
  "What projects has he built?",
  "What are his top skills?",
  "How can I contact him?",
];

// ── Generate a stable session ID for this browser tab ────────────────────────
function getSessionId() {
  let id = sessionStorage.getItem('kc-session');
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem('kc-session', id);
  }
  return id;
}

// ── Minimal markdown renderer ─────────────────────────────────────────────────
function renderMd(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^• (.+)$/gm, '<li>$1</li>')
    .replace(/^[-•] (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/((<li>[^]*?<\/li>\n?)+)/g, '<ul>$1</ul>')
    .replace(/\n/g, '<br />');
}

// ── Kairos AI API call — proxied through /api/chat ────────────────────────────
async function callGemini(messages) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? `API ${res.status}`);
  return data.content;
}

// ── Live chat helpers ─────────────────────────────────────────────────────────
async function fetchOnlineStatus() {
  try {
    const res = await fetch('/api/status');
    const data = await res.json();
    return data.online === true;
  } catch {
    return false;
  }
}

async function postLiveMessage(session, role, text) {
  await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session, role, text }),
  });
}

async function fetchLiveMessages(session) {
  const res = await fetch(`/api/messages?session=${session}`);
  const data = await res.json();
  return data.messages ?? [];
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function KairosChat() {
  const [open, setOpen]         = useState(false);
  const [messages, setMsgs]     = useState([
    { role: 'assistant', content: GREETING },
  ]);
  const [draft, setDraft]       = useState('');
  const [thinking, setThink]    = useState(false);
  const [unread, setUnread]     = useState(0);
  const [isDark, setIsDark]     = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  );

  // ── Online / live-chat state ──────────────────────────────────────────────
  const [jelOnline, setJelOnline]     = useState(false);
  const [liveMode, setLiveMode]       = useState(false);   // true once visitor enters live chat
  const [liveMsgCount, setLiveMsgCnt] = useState(0);       // track last-seen count for polling

  const sessionId   = useRef(getSessionId());
  const pollRef     = useRef(null);
  const msgRef      = useRef(null);
  const inputRef    = useRef(null);
  const mascotRef   = useRef(null);
  const draftRef    = useRef(draft);
  const msgsRef     = useRef(messages);
  draftRef.current  = draft;
  msgsRef.current   = messages;

  function inferMood(text) {
    const t = text.toLowerCase();
    if (/error|sorry|failed|unable|can't|cannot|unfortunately|problem|wrong/.test(t)) return 'sad';
    if (/excellent|perfect|great|amazing|awesome|congratulations|done|completed/.test(t)) return 'excited';
    if (/sure|here you go|found|of course|happy to|here is|here are/.test(t)) return 'happy';
    if (/unclear|not sure|confused|could you clarify|ambiguous|\?/.test(t)) return 'confuse';
    if (/let me|checking|searching|analysi|thinking|calculating/.test(t)) return 'thinking';
    return 'happy';
  }

  const scrollBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (msgRef.current) msgRef.current.scrollTop = msgRef.current.scrollHeight;
    });
  }, []);

  // ── Dark-mode observer ────────────────────────────────────────────────────
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  // ── Poll JEL's online status every 30 s ──────────────────────────────────
  useEffect(() => {
    let alive = true;
    async function check() {
      const online = await fetchOnlineStatus();
      if (alive) setJelOnline(online);
    }
    check();
    const id = setInterval(check, 30_000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  // ── Live-chat message polling (every 3 s when in live mode) ──────────────
  useEffect(() => {
    if (!liveMode) { clearInterval(pollRef.current); return; }

    async function poll() {
      const msgs = await fetchLiveMessages(sessionId.current);
      setMsgs(prev => {
        // Only update if there are new messages from JEL
        if (msgs.length > prev.length) {
          const newMsgs = msgs.map(m => ({ role: m.role, content: m.text }));
          if (!open) setUnread(u => u + (msgs.length - prev.length));
          return newMsgs;
        }
        return prev;
      });
    }

    poll();
    pollRef.current = setInterval(poll, 3_000);
    return () => clearInterval(pollRef.current);
  }, [liveMode, open]);

  useEffect(() => { if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 80); } }, [open]);
  useEffect(() => { scrollBottom(); }, [messages, thinking]);

  const autoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const addMsg = (role, content) =>
    setMsgs(prev => [...prev, { role, content }]);

  // ── Enter live-chat mode ──────────────────────────────────────────────────
  const enterLiveMode = useCallback(async () => {
    setLiveMode(true);
    setMsgs([{ role: 'assistant', content: LIVE_GREETING }]);
    // Seed the Redis thread with the greeting so admin sees context
    await postLiveMessage(sessionId.current, 'assistant', LIVE_GREETING);
    mascotRef.current?.setMood('excited');
  }, []);

  // ── Send message ──────────────────────────────────────────────────────────
  const send = useCallback(async () => {
    const text = draftRef.current.trim();
    if (!text || thinking) return;
    setDraft('');
    if (inputRef.current) { inputRef.current.style.height = 'auto'; }

    addMsg('user', text);
    setThink(true);
    mascotRef.current?.setMood('thinking');

    try {
      if (liveMode) {
        // Live mode: store in Redis, JEL will reply from admin panel
        await postLiveMessage(sessionId.current, 'user', text);
        // Show a waiting indicator in the bubble list (handled by polling)
      } else {
        // AI mode: call Gemini
        const history = [
          { role: 'system', content: KAIROS_SYSTEM_PROMPT },
          ...msgsRef.current.slice(-10).map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: text },
        ];
        const reply = await callGemini(history);
        addMsg('assistant', reply);
        mascotRef.current?.setMood(inferMood(reply));
        if (!open) setUnread(u => u + 1);
      }
    } catch (err) {
      addMsg('assistant', `⚠️ ${err.message}`);
      mascotRef.current?.setMood('sad');
    } finally {
      setThink(false);
    }
  }, [thinking, open, liveMode]);

  const sendSuggestion = (s) => {
    draftRef.current = s;
    setDraft(s);
    requestAnimationFrame(() => send());
  };

  const clearChat = () => {
    setMsgs([{ role: 'assistant', content: liveMode ? LIVE_GREETING : GREETING }]);
    setUnread(0);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  // ── Online banner (shown above input when JEL is online but not in live mode) ──
  const onlineBanner = jelOnline && !liveMode && (
    <div className="kc-online-banner">
      <span className="kc-online-banner-dot" />
      <span>John Emman is online!</span>
      <button className="kc-online-banner-btn" onClick={enterLiveMode}>
        Talk to him →
      </button>
    </div>
  );

  // ── Reusable inner chat content ───────────────────────────────────────────
  const chatContent = (
    <>
      {/* Header */}
      <div className="kc-header">
        <div className="kc-header-left">
          <img
            src={liveMode ? jelAvatar : kairosLogo}
            className="kc-logo"
            alt={liveMode ? 'JEL' : 'Kairos'}
          />
          <div>
            <div className="kc-header-name">
              {liveMode ? 'John Emman' : 'Kairos'}
            </div>
            <div className="kc-header-status">
              <span className={`kc-status-dot${liveMode ? ' kc-status-dot--live' : ''}`} />
              {liveMode ? 'Live · Chatting now' : 'Gemini · Portfolio'}
            </div>
          </div>
        </div>
        <div className="kc-header-actions">
          {liveMode && (
            <button
              className="kc-icon-btn kc-icon-btn--ai"
              title="Switch back to AI"
              onClick={() => { setLiveMode(false); setMsgs([{ role: 'assistant', content: GREETING }]); }}
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="14" height="14">
                <circle cx="10" cy="10" r="8" />
                <path d="M7 10h6M10 7l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <button className="kc-icon-btn" title="Clear conversation" onClick={clearChat}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="14" height="14">
              <path d="M3 5h14M8 5V3h4v2M6 5l1 12h6l1-12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="kc-icon-btn" title="Close" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
              <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Live mode notice bar */}
      {liveMode && (
        <div className="kc-live-bar">
          <span className="kc-live-bar-dot" />
          You are chatting live with John Emman
        </div>
      )}

      {/* Messages — wrapped in SpotlightCard in dark mode */}
      {isDark ? (
        <SpotlightCard
          className="kc-messages kc-messages-spotlight"
          spotlightColor="rgba(99, 102, 241, 0.18)"
        >
          <div ref={msgRef} className="kc-messages-inner">
            {messages.map((m, i) => (
              <div key={i} className={`kc-msg-row ${m.role === 'user' ? 'kc-row-user' : 'kc-row-ai'}`}>
                {m.role === 'assistant' && (
                  <img
                    src={liveMode ? jelAvatar : kairosLogo}
                    className="kc-avatar"
                    alt={liveMode ? 'JEL' : 'Kairos'}
                  />
                )}
                <div
                  className={`kc-bubble ${m.role === 'user' ? 'kc-bubble-user' : 'kc-bubble-ai'}`}
                  dangerouslySetInnerHTML={{ __html: renderMd(m.content) }}
                />
              </div>
            ))}
            {thinking && (
              <div className="kc-msg-row kc-row-ai">
                <img
                  src={liveMode ? jelAvatar : kairosLogo}
                  className="kc-avatar"
                  alt={liveMode ? 'JEL' : 'Kairos'}
                />
                <div className="kc-bubble kc-bubble-ai kc-thinking"><span /><span /><span /></div>
              </div>
            )}
          </div>
        </SpotlightCard>
      ) : (
        <div className="kc-messages" ref={msgRef}>
          {messages.map((m, i) => (
            <div key={i} className={`kc-msg-row ${m.role === 'user' ? 'kc-row-user' : 'kc-row-ai'}`}>
              {m.role === 'assistant' && (
                <img
                  src={liveMode ? jelAvatar : kairosLogo}
                  className="kc-avatar"
                  alt={liveMode ? 'JEL' : 'Kairos'}
                />
              )}
              <div
                className={`kc-bubble ${m.role === 'user' ? 'kc-bubble-user' : 'kc-bubble-ai'}`}
                dangerouslySetInnerHTML={{ __html: renderMd(m.content) }}
              />
            </div>
          ))}
          {thinking && !liveMode && (
            <div className="kc-msg-row kc-row-ai">
              <img src={kairosLogo} className="kc-avatar" alt="Kairos" />
              <div className="kc-bubble kc-bubble-ai kc-thinking"><span /><span /><span /></div>
            </div>
          )}
          {/* Live mode: waiting for JEL to type */}
          {liveMode && thinking && (
            <div className="kc-msg-row kc-row-ai">
              <img src={jelAvatar} className="kc-avatar" alt="JEL" />
              <div className="kc-bubble kc-bubble-ai kc-thinking"><span /><span /><span /></div>
            </div>
          )}
        </div>
      )}

      {/* Suggestion chips (AI mode only, first message) */}
      {messages.length === 1 && !thinking && !liveMode && (
        <div className="kc-suggestions">
          {SUGGESTIONS.map(s => (
            <button key={s} className="kc-chip" onClick={() => sendSuggestion(s)}>{s}</button>
          ))}
        </div>
      )}

      {/* Online banner */}
      {onlineBanner}

      {/* Input row */}
      <div className="kc-input-row">
        <textarea
          ref={inputRef}
          className="kc-input"
          placeholder={liveMode ? 'Message John Emman…' : 'Ask Kairos…'}
          rows={1}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onInput={autoResize}
        />
        <button
          className="kc-send-btn"
          disabled={!draft.trim() || thinking}
          onClick={send}
          title="Send (Enter)"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path d="M2.94 17.05l14.58-7.07a.5.5 0 000-.9L2.94 2.01a.5.5 0 00-.7.54l1.2 5.22a.5.5 0 00.43.39l7.43.83a.1.1 0 010 .2l-7.43.83a.5.5 0 00-.43.39l-1.2 5.23a.5.5 0 00.7.54z" />
          </svg>
        </button>
      </div>

      <div className="kc-footer">
        {liveMode ? 'Live chat · John Emman Lanusga' : 'Powered by Google Gemini · Portfolio'}
      </div>
    </>
  );

  return (
    <>
      {/* ── Mascot + Chat window side-by-side ── */}
      {open && (
        <div className="kc-with-mascot">
          <div className="kc-mascot-panel">
            <KairosMascot ref={mascotRef} idleDelay={4000} />
          </div>

          {isDark ? (
            <BorderGlow
              className="kc-window"
              backgroundColor="#0d0f1a"
              borderRadius={16}
              glowRadius={32}
              glowColor={liveMode ? '120 200 80' : '220 70 75'}
              glowIntensity={0.85}
              coneSpread={20}
              colors={liveMode ? ['#16a34a', '#22c55e', '#4ade80'] : ['#6366f1', '#3b5bdb', '#818cf8']}
              edgeSensitivity={25}
              animated
            >
              <div role="dialog" aria-label="Kairos AI Chat" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {chatContent}
              </div>
            </BorderGlow>
          ) : (
            <div className={`kc-window${liveMode ? ' kc-window--live' : ''}`} role="dialog" aria-label="Kairos AI Chat">
              {chatContent}
            </div>
          )}
        </div>
      )}

      {/* ── FAB ── */}
      <div className="kc-root">
        <button
          className={`kc-fab${open ? ' kc-fab-open' : ''}${jelOnline && !open ? ' kc-fab--online' : ''}`}
          onClick={() => setOpen(o => !o)}
          title={open ? 'Close chat' : jelOnline ? 'John Emman is online!' : 'Chat with Kairos'}
          aria-label="Toggle Kairos chat"
        >
          {open
            ? <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" width="20" height="20">
                <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
              </svg>
            : <img src={kairosLogo} className="kc-fab-logo" alt="Kairos" />
          }
        </button>
        {/* Online presence dot on FAB */}
        {jelOnline && !open && <span className="kc-fab-online-dot" title="JEL is online" />}
        {unread > 0 && !open && (
          <span className="kc-badge">{unread}</span>
        )}
      </div>
    </>
  );
}
