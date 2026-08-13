import { useState, useRef, useEffect, useCallback } from 'react';
import kairosLogo from './assets/images/logo-2.png';
import KairosMascot from './KairosMascot.jsx';

// ── Personal knowledge — injected into every system prompt ────────────────────
const KAIROS_SYSTEM_PROMPT = `You are Kairos, an AI assistant on the personal portfolio website of John Emman Lanusga.
You are helpful, concise, friendly and playful with attitude.
Your job is to answer questions about John Emman — his work, skills, projects, experience, and background.

ABOUT JOHN EMMAN LANUSGA:
  Full name: John Emman Lanusga
  Location: Philippines (Naga City, Camarines Sur)
  Email: emmanlanusga@gmail.com
  LinkedIn: https://www.linkedin.com/in/jelanusga/
  Role: QA Analyst & Automation Engineer | Certified Salesforce Administrator

CURRENT ROLE:
  • Process Delivery Specialist – Order To Cash at IBM (July 2025 – Present)
    4F Jose Tan Bun Keng Bldg, Naga City
    Executes daily process transactions and drives operational improvements meeting client and IBM requirements.
    Skills: business operations, process management, compliance, best-practice tools.

CAREER HISTORY:
  • Advisor I at Concentrix (November 2024 – July 2025)
    Ninoy and Cory Avenue, Naga City
    Managed insurance policies, claims, benefits, and customer service via the Salesforce platform.

  • Application Development Associate at Accenture (June 2022 – July 2024)
    Mandaluyong, Cybergate
    Maintained and enhanced client Salesforce apps through Configuration & Setup, Object Manager,
    Lightning App Builder, Manual Test Execution, Defect Management (JIRA), and Test Case Planning
    using Agile methodologies.

  • Digital Marketing Administrator at Hyundai Alabang (Naga) (December 2021 – April 2022)
    Del Rosario, Naga City
    Handled digital marketing using Adobe Illustrator, Photoshop, and Premiere.
    Sales marketing and promoting products, services, and limited-time offers.

  • Junior Web Developer Intern at 3GX Computers & Solutions (January 2020 – March 2020)
    Naga City
    Maintained and resolved issues in the BullGuardPH application (Philippines' official antivirus distributor).
    Used Laravel Framework with AJAX, plugins, and Git.

SKILLS & TOOLS:
  Platform: Salesforce
  QA: Manual Testing, Test Case Planning, Defect Management, Regression Testing
  Tools: Jira
  Languages: JavaScript, Python, Java, Apex (Salesforce), HTML/CSS, PHP, C++
  Runtime: Node.js
  Database: MySQL/SQL, PostgreSQL, ER Modeling
  Frameworks: Vue.js, React
  Data: Data Visualization, ER Modeling
  Version Control: Git
  Methodology: Agile/SDLC
  Operations: Order To Cash (OTC), Process Management
  Creative: Adobe Illustrator, Adobe Photoshop, Adobe Premiere

CERTIFICATIONS:
  • Salesforce Certified Administrator (SCA) — Salesforce, June 2024

PROJECTS:
  1. Kairos – Jira Copilot Assistant
     Tag: Full-Stack App
     Description: Internal IBM OTC team tool built with Vue.js 3 + FastAPI. Features a JIRA Standardizer,
     live Priority List enrichment, Resolve360 quality/RCA workflow (two-stage Compliance → EM approval),
     Monday.com workforce analytics, and an AI chat assistant powered by GitHub Copilot and IBM ICA.
     Outcome: IBM OTC Team · In Active Use

  2. Kada Tipon Game
     Tag: Game Dev
     Description: A 2D running game where you, as a student, collect and save coins while avoiding
     obstacles (expenses) within a time limit. Presented at ADNU DCS–CS Week.
     Outcome: ADNU DCS–CS Week Booth

ABOUT HIM:
  John Emman is a detail-oriented, systematic, and creative QA Analyst with a passion for building
  reliable software. As a Certified Salesforce Administrator and Test Analyst, he bridges the gap
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
  - Never claim to be ChatGPT, GitHub Copilot, or any other named AI product — you are Kairos,
    the assistant on John Emman's portfolio.`;

const GREETING =
  `Hi! I'm **Kairos** 👋\n\nI'm the AI assistant on John Emman's portfolio. Ask me anything about him:\n• His experience & career\n• Skills & tools\n• Projects he's built\n• How to get in touch\n\nWhat would you like to know?`;

const SUGGESTIONS = [
  "What is John Emman's current role?",
  "What projects has he built?",
  "What are his top skills?",
  "How can I contact him?",
];

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

// ── GitHub Copilot call ───────────────────────────────────────────────────────
async function callCopilot(messages, token, model = 'gpt-4o') {
  const res = await fetch('https://api.githubcopilot.com/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Editor-Version': 'vscode/1.89.0',
      'Copilot-Integration-Id': 'vscode-chat',
    },
    body: JSON.stringify({ model, messages, max_tokens: 1024, temperature: 0.7 }),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => res.statusText);
    throw new Error(`Copilot API ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '(empty response)';
}

// ── Component ─────────────────────────────────────────────────────────────────
const COPILOT_TOKEN = import.meta.env.VITE_COPILOT_TOKEN;

export default function KairosChat() {
  const [open, setOpen]      = useState(false);
  const [messages, setMsgs]  = useState([
    { role: 'assistant', content: GREETING },
  ]);
  const [draft, setDraft]    = useState('');
  const [thinking, setThink] = useState(false);
  const [unread, setUnread]  = useState(0);

  const msgRef    = useRef(null);
  const inputRef  = useRef(null);
  const mascotRef = useRef(null);
  const draftRef  = useRef(draft);
  const msgsRef   = useRef(messages);
  draftRef.current = draft;
  msgsRef.current  = messages;

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

  useEffect(() => { if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 80); } }, [open]);
  useEffect(() => { scrollBottom(); }, [messages, thinking]);

  const autoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const addMsg = (role, content) =>
    setMsgs(prev => [...prev, { role, content }]);

  const send = useCallback(async () => {
    const text = draftRef.current.trim();
    if (!text || thinking) return;
    setDraft('');
    // reset textarea height
    if (inputRef.current) { inputRef.current.style.height = 'auto'; }

    addMsg('user', text);
    setThink(true);
    mascotRef.current?.setMood('thinking');

    try {
      const history = [
        { role: 'system', content: KAIROS_SYSTEM_PROMPT },
        ...msgsRef.current.slice(-10).map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: text },
      ];
      const reply = await callCopilot(history, COPILOT_TOKEN);
      addMsg('assistant', reply);
      mascotRef.current?.setMood(inferMood(reply));
      if (!open) setUnread(u => u + 1);
    } catch (err) {
      addMsg('assistant', `⚠️ ${err.message}`);
      mascotRef.current?.setMood('sad');
    } finally {
      setThink(false);
    }
  }, [thinking, open]);

  const sendSuggestion = (s) => {
    draftRef.current = s;
    setDraft(s);
    requestAnimationFrame(() => send());
  };

  const clearChat = () => {
    setMsgs([{ role: 'assistant', content: GREETING }]);
    setUnread(0);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* ── Mascot + Chat window side-by-side ── */}
      {open && (
        <div className="kc-with-mascot">
          <div className="kc-mascot-panel">
            <KairosMascot ref={mascotRef} idleDelay={4000} />
          </div>
          <div className="kc-window" role="dialog" aria-label="Kairos AI Chat">

          {/* Header */}
          <div className="kc-header">
            <div className="kc-header-left">
              <img src={kairosLogo} className="kc-logo" alt="Kairos" />
              <div>
                <div className="kc-header-name">Kairos</div>
                <div className="kc-header-status">
                  <span className="kc-status-dot" />
                  Microsoft Copilot · Portfolio
                </div>
              </div>
            </div>
            <div className="kc-header-actions">
              {/* Clear */}
              <button className="kc-icon-btn" title="Clear conversation" onClick={clearChat}>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="14" height="14">
                  <path d="M3 5h14M8 5V3h4v2M6 5l1 12h6l1-12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {/* Close */}
              <button className="kc-icon-btn" title="Close" onClick={() => setOpen(false)}>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                  <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="kc-messages" ref={msgRef}>
            {messages.map((m, i) => (
              <div key={i} className={`kc-msg-row ${m.role === 'user' ? 'kc-row-user' : 'kc-row-ai'}`}>
                {m.role === 'assistant' && (
                  <img src={kairosLogo} className="kc-avatar" alt="Kairos" />
                )}
                <div
                  className={`kc-bubble ${m.role === 'user' ? 'kc-bubble-user' : 'kc-bubble-ai'}`}
                  dangerouslySetInnerHTML={{ __html: renderMd(m.content) }}
                />
              </div>
            ))}

            {/* Typing dots */}
            {thinking && (
              <div className="kc-msg-row kc-row-ai">
                <img src={kairosLogo} className="kc-avatar" alt="Kairos" />
                <div className="kc-bubble kc-bubble-ai kc-thinking">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          {/* Suggestion chips — first message only */}
          {messages.length === 1 && !thinking && (
            <div className="kc-suggestions">
              {SUGGESTIONS.map(s => (
                <button key={s} className="kc-chip" onClick={() => sendSuggestion(s)}>{s}</button>
              ))}
            </div>
          )}

          {/* Input row */}
          <div className="kc-input-row">
            <textarea
              ref={inputRef}
              className="kc-input"
              placeholder="Ask Kairos…"
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

          <div className="kc-footer">Powered by Microsoft Copilot · Portfolio</div>
          </div>
        </div>
      )}

      {/* ── FAB ── */}
      <div className="kc-root">
        <button
          className={`kc-fab${open ? ' kc-fab-open' : ''}`}
          onClick={() => setOpen(o => !o)}
          title={open ? 'Close chat' : 'Chat with Kairos'}
          aria-label="Toggle Kairos chat"
        >
          {open
            ? <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" width="20" height="20">
                <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
              </svg>
            : <img src={kairosLogo} className="kc-fab-logo" alt="Kairos" />
          }
        </button>
        {unread > 0 && !open && (
          <span className="kc-badge">{unread}</span>
        )}
      </div>
    </>
  );
}
