import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import AdminPanel from './AdminPanel.jsx';
import ProjectPage from './ProjectPage.jsx';
import DarkVeil from './DarkVeil.jsx';
import Particles from './Particles.jsx';
import KairosChat from './KairosChat.jsx';
import SpotlightCard from './SpotlightCard.jsx';
import galleryImg1  from './assets/images/Gallery/Random (1).jpeg';
import galleryImg2  from './assets/images/Gallery/Random (1).jpg';
import galleryImg3  from './assets/images/Gallery/Random (1).png';
import galleryImg4  from './assets/images/Gallery/Random (2).jpg';
import galleryImg5  from './assets/images/Gallery/Random (3).jpg';
import galleryImg6  from './assets/images/Gallery/Random (4).jpg';
import galleryImg7  from './assets/images/Gallery/Random (5).jpg';
import galleryImg8  from './assets/images/Gallery/Random (6).jpg';
import galleryImg9  from './assets/images/Gallery/Random (7).jpg';
import galleryImg10 from './assets/images/Gallery/Random (8).jpg';
import galleryImg11 from './assets/images/Gallery/Random (9).jpg';
import galleryImg12 from './assets/images/Gallery/Random (10).jpg';
import galleryImg13 from './assets/images/Gallery/Random (11).jpg';
import galleryImg14 from './assets/images/Gallery/Random (12).jpg';
import galleryImg15 from './assets/images/Gallery/Random (13).jpg';
import galleryImg16 from './assets/images/Gallery/Random (14).jpg';
import galleryImg17 from './assets/images/Gallery/Random (15).jpg';
import logo from './assets/images/My_LOGO.png';
import logoWhite from './assets/images/My_LOGO-white.png';
import logoFace from './assets/images/My_LOGO_FINAL-for_DECALS.png';
import logoFaceWhite from './assets/images/My_LOGO_FINAL-for_DECALS-white-contrast.png';
import portal from './assets/images/PORTAL.png';
import resume from './assets/images/LANUSGA_JEL_CV.pdf';
import PortalGateway from './PortalGateway.jsx';
import kairosPriority        from './assets/images/Kairos/JIRA-Priority.png';
import kairosLogin           from './assets/images/Kairos/Login-Page.png';
import kairosResolve360AI    from './assets/images/Kairos/Resolve360-AI-Investigation.jpeg';
import kairosResolve360RCA   from './assets/images/Kairos/Resolve360-AI-RCA-Check-Apply.jpeg';
import kairosResolve360Stats from './assets/images/Kairos/Resolve360-Analytics.png';
import kairosResolve360CAPA  from './assets/images/Kairos/Resolve360-Auto-CAPA-Assignment.jpeg';
import kadaTiponStart    from './assets/images/Kada Tipon/Kada-Tipon-Start.png';
import kadaTiponHowTo   from './assets/images/Kada Tipon/Kada-Tipon-How-To.png';
import kadaTiponPlaying  from './assets/images/Kada Tipon/Kada-Tipon-Playing.png';
import kadaTiponPlaying1 from './assets/images/Kada Tipon/Kada-Tipon-Playing-1.png';
import tiosLogo          from './assets/images/Tios/TIOS-SAMPLE-LOGO.jpg';
import tiosLogoHrzl      from './assets/images/Tios/TIOS-SAMPLE-LOGO-hrzl.png';
import tiosLogoHrzlWhite from './assets/images/Tios/TIOS-SAMPLE-LOGO-hrzl-white.png';
import spaceCat           from './assets/images/SPACE-CAT.png';
import Stack from './Stack.jsx';
import './App.css';
import SplitText from './SplitText.jsx';
import ScrollVelocity from './ScrollVelocity.jsx';
import ResumePage from './ResumePage.jsx';

//  /$$$$$$$   /$$$$$$  /$$$$$$$$ /$$$$$$ 
// | $$__  $$ /$$__  $$|__  $$__//$$__  $$
// | $$  \ $$| $$  \ $$   | $$  | $$  \ $$
// | $$  | $$| $$$$$$$$   | $$  | $$$$$$$$
// | $$  | $$| $$__  $$   | $$  | $$__  $$
// | $$  | $$| $$  | $$   | $$  | $$  | $$
// | $$$$$$$/| $$  | $$   | $$  | $$  | $$
// |_______/ |__/  |__/   |__/  |__/  |__/
// Simple Icons CDN — for open-source tech logos
const SI  = (slug, color) => `https://cdn.simpleicons.org/${slug}/${color}`;
// Devicons CDN — for proprietary/brand logos removed from Simple Icons
const DVI = (name, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

const skills = [
  { img: DVI('salesforce'),                   name: 'Salesforce',           type: 'Platform' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
    name: 'Manual Testing', type: 'QA' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>`,
    name: 'Test Case Planning', type: 'QA' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    name: 'Defect Management', type: 'QA' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
    name: 'Regression Testing', type: 'QA' },
  { img: SI('jira', '0052CC'),                name: 'Jira',                 type: 'Tool' },
  { img: SI('javascript', 'F7DF1E'),          name: 'JavaScript',           type: 'Language' },
  { img: SI('python', '3776AB'),              name: 'Python',               type: 'Language' },
  { img: DVI('java'),                         name: 'Java',                 type: 'Language' },
  { img: DVI('salesforce'),                   name: 'Apex (Salesforce)',    type: 'Language' },
  { img: SI('html5', 'E34F26'),               name: 'HTML / CSS',           type: 'Web' },
  { img: SI('php', '777BB4'),                 name: 'PHP',                  type: 'Language' },
  { img: SI('nodedotjs', '339933'),           name: 'Node.js',              type: 'Runtime' },
  { img: SI('cplusplus', '00599C'),           name: 'C++',                  type: 'Language' },
  { img: DVI('mysql'),                        name: 'MySQL / SQL',          type: 'Database' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#E97627" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    name: 'Data Visualization', type: 'Data' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>`,
    name: 'ER Modeling', type: 'Data' },
  { img: SI('git', 'F05032'),                 name: 'Git',                  type: 'Version Control' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
    name: 'Agile / SDLC', type: 'Methodology' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#0f62fe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
    name: 'Order To Cash (OTC)', type: 'Operations' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    name: 'Process Management', type: 'Operations' },
  { img: SI('vuedotjs', '41B883'),            name: 'Vue.js',               type: 'Framework' },
  { img: SI('react', '61DAFB'),               name: 'React',                type: 'Framework' },
  { img: SI('postgresql', '336791'),          name: 'PostgreSQL',           type: 'Database' },
  { img: SI('sqlite', '003B57'),              name: 'SQLite',               type: 'Database' },
  { img: DVI('illustrator'),                  name: 'Adobe Illustrator',    type: 'Creative' },
  { img: DVI('photoshop'),                    name: 'Adobe Photoshop',      type: 'Creative' },
  { img: DVI('premierepro'),                  name: 'Adobe Premiere',       type: 'Creative' },
];

const certs = [
  {
    icon: '☁️',
    title: 'Salesforce Certified Administrator (SCA)',
    issuer: 'Salesforce',
    year: 'June 2024',
  },
];

const timeline = [
  {
    date: 'July 2025 – Present',
    role: 'Process Delivery Specialist – Order To Cash',
    company: 'IBM · 4F Jose Tan Bun Keng Bldg, Naga City',
    desc: "Responsible for executing daily process transactions and driving process and operational improvements that meet both client and IBM requirements. Applies skills in business operations, process management, compliance, and best-practice tools to support clients' core processes.",
  },
  {
    date: 'November 2024 – July 2025',
    role: 'Advisor I',
    company: 'Concentrix · Ninoy and Cory Avenue, Naga City',
    desc: 'Responsible for managing insurance policies, claims, benefits, and customer service through the Salesforce platform.',
  },
  {
    date: 'June 2022 – July 2024',
    role: 'Application Development Associate',
    company: 'Accenture · Mandaluyong, Cybergate',
    desc: 'In charge of maintaining and enhancing client Salesforce applications through Salesforce Configuration & Setup, Object Manager, Lightning App Builder, Manual Test Execution, Defect Management (JIRA), and Test Case Planning using Agile methodologies.',
  },
  {
    date: 'December 2021 – April 2022',
    role: 'Digital Marketing Administrator',
    company: 'Hyundai Alabang (Naga) · Del Rosario, Naga City',
    desc: 'Handled digital marketing and advertising using Adobe Illustrator, Photoshop, and Premiere. In charge of sales marketing and promoting various products, services, units, and limited-time offers.',
  },
  {
    date: 'January 2020 – March 2020',
    role: 'Junior Web Developer (Internship)',
    company: '3GX Computers & Solutions · Naga City',
    desc: "Maintained, documented, and resolved issues within the BullGuardPH application — the Philippines' official antivirus distributor. Utilized Laravel Framework with AJAX, plugins, and Git.",
  },
];

function TiosShowcase({ dark }) {
  const [path, setPath] = useState(null); // null | 'tiyo' | 'rico'
  const [income, setIncome] = useState(30000);

  // Core Formulas
  const emergencyFund = income * 4;
  const investmentMin = income * 0.10;
  const maxExpenses = income * 0.55;
  const freedomNumber = income * 200;

  if (!path) {
    return (
      <div className="tios-wrap tios-onboarding">
        <div className="tios-brainstorming-badge">Brainstorming... (Concept Only)</div>
        <img src={dark ? tiosLogoHrzlWhite : tiosLogoHrzl} alt="TIOS" className="tios-onboarding-logo" />
        <p className="tios-onboarding-tagline">Track It. Own It. Save It.</p>
        <p className="tios-onboarding-prompt">What's your money goal?</p>
        <div className="tios-onboarding-choices">
          <button className="tios-choice-card" onClick={() => setPath('tiyo')}>
            <span className="tios-choice-animal">Carabao</span>
            <div className="tios-choice-body">
              <strong>Tiyo the Carabao Path</strong>
              <span>"Protect first. Grow second."</span>
              <span className="tios-choice-btn">Build My Foundation</span>
            </div>
          </button>
          <button className="tios-choice-card" onClick={() => setPath('rico')}>
            <span className="tios-choice-animal">Fox</span>
            <div className="tios-choice-body">
              <strong>Rico the Fox Path</strong>
              <span>"Make money work for you."</span>
              <span className="tios-choice-btn">Build My Wealth</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tios-wrap tios-dashboard">
      <div className="tios-header">
        <span className="tios-dashboard-title">
          {path === 'tiyo' ? 'Tiyo the Carabao Path (Concept)' : 'Rico the Fox Path (Concept)'}
        </span>
        <button className="tios-reset-btn" onClick={() => setPath(null)}>Reset</button>
      </div>

      <div className="tios-calc">
        <div className="tios-input-group">
          <label htmlFor="tios-income">Monthly Income:</label>
          <div className="tios-input-row">
            <span>₱</span>
            <input
              id="tios-income"
              type="number"
              value={income}
              onChange={(e) => setIncome(Math.max(0, parseInt(e.target.value) || 0))}
              className="tios-input"
            />
          </div>
        </div>

        <div className="tios-formula-grid">
          <div className="tios-formula-item">
            <span className="tios-formula-label">Emergency Fund</span>
            <strong className="tios-formula-val">₱{emergencyFund.toLocaleString()}</strong>
          </div>
          <div className="tios-formula-item">
            <span className="tios-formula-label">Min Investment</span>
            <strong className="tios-formula-val">₱{investmentMin.toLocaleString()}</strong>
          </div>
          <div className="tios-formula-item">
            <span className="tios-formula-label">Max Expenses</span>
            <strong className="tios-formula-val">₱{maxExpenses.toLocaleString()}</strong>
          </div>
          <div className="tios-formula-item">
            <span className="tios-formula-label">Freedom Number</span>
            <strong className="tios-formula-val">₱{freedomNumber.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      <div className="tios-bottom-section">
        <div className="tios-bubble-row">
          <p className="tios-bubble-text">
            {path === 'tiyo' ? (
              <>
                <strong>Tiyo the Carabao:</strong> Great job. Your emergency fund now covers 4 months of expenses. You're building peace of mind.
              </>
            ) : (
              <>
                <strong>Rico the Fox:</strong> Nice. You invested ₱{investmentMin.toLocaleString()} today. Assets create options. Keep building.
              </>
            )}
          </p>
        </div>

        <div className="tios-gamified">
          <span className="tios-gamified-title">
            {path === 'tiyo' ? 'Tiyo Village' : 'Rico City'}
          </span>
          <div className="tios-gamified-badges">
            {path === 'tiyo' ? (
              <>
                <span className="tios-g-badge tios-g-badge--on">House</span>
                <span className="tios-g-badge tios-g-badge--on">Garden</span>
                <span className="tios-g-badge">Well</span>
                <span className="tios-g-badge">Town Hall</span>
              </>
            ) : (
              <>
                <span className="tios-g-badge tios-g-badge--on">Workstation</span>
                <span className="tios-g-badge tios-g-badge--on">Business</span>
                <span className="tios-g-badge">Asset Tower</span>
                <span className="tios-g-badge">Freedom Tower</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const projects = [
  {
    images: [kairosPriority, kairosLogin, kairosResolve360AI, kairosResolve360RCA, kairosResolve360Stats, kairosResolve360CAPA],
    tag: 'Full-Stack App',
    title: 'Kairos – Jira Copilot Assistant',
    desc: 'Internal IBM OTC team tool built with Vue.js 3 + FastAPI. Features a JIRA Standardizer, live Priority List enrichment, Resolve360 quality/RCA workflow (two-stage Compliance → EM approval), Monday.com workforce analytics, and an AI chat assistant powered by GitHub Copilot and IBM ICA.',
    tech: [
      { name: 'Vue.js 3', logo: SI('vuedotjs', '41B883') },
      { name: 'FastAPI', logo: SI('fastapi', '009688') },
      { name: 'PostgreSQL', logo: SI('postgresql', '4169E1') },
      { name: 'Jira', logo: SI('jira', '0052CC') },
      { name: 'GitHub Copilot', logo: SI('githubcopilot', '24292e') },
    ],
    outcome: 'IBM OTC Team · In Active Use',
    developers: ['John Emman Lanusga', 'Hannah Rodriguez'],
    featuresType: 'tabs',
    features: [
      {
        tab: 'JIRA Standardizer',
        use: 'Ticket Quality Control',
        desc: 'Validates and standardizes JIRA ticket fields - summary, priority, assignee, and labels - against team conventions.',
      },
      {
        tab: 'Priority List',
        use: 'Live Workload Enrichment',
        desc: 'Uploads a CSV or XLSX exported from JIRA, cross-references each issue key against the live JIRA instance, and computes real-time Action Takens per assignee - giving team leads an instant workload snapshot.',
      },
      {
        tab: 'Resolve360',
        use: 'Quality & RCA Workflow',
        desc: 'Two-stage approval flow: tickets requiring resolution first pass Compliance review, then escalate to EM sign-off. Tracks RCA notes, links evidence, and logs every approval action with timestamps.',
      },
      {
        tab: 'Workforce Analytics',
        use: 'Monday.com Integration',
        desc: 'Pulls headcount and task data from Monday.com boards to surface utilisation rates, bandwidth gaps, and team availability - presented as a dashboard for capacity planning.',
      },
      {
        tab: 'AI Assistant',
        use: 'GitHub Copilot + IBM ICA',
        desc: 'Embedded chat assistant trained on OTC process knowledge. Answers ticket-related questions, drafts summaries, suggests resolutions, and retrieves historical RCA patterns using GitHub Copilot and IBM ICA APIs.',
      },
    ],
  },
  {
    images: [kadaTiponStart, kadaTiponHowTo, kadaTiponPlaying, kadaTiponPlaying1],
    tag: 'Game Dev',
    title: 'Kada Tipon Game',
    demoUrl: '#game',
    desc: 'A 2D running game where you, as a student, collect and save coins while avoiding obstacles (expenses) within a time limit. Presented at ADNU DCS–CS Week.',
    tech: [
      { name: 'HTML5', logo: SI('html5', 'E34F26') },
      { name: 'CSS3', logo: SI('css3', '1572B6') },
      { name: 'Construct', logo: SI('construct3', 'E34F26') },
    ],
    outcome: 'ADNU DCS–CS Week Booth',
    featuresType: 'rules',
    features: [
      { rule: 'Objective',        desc: 'Collect and save money as much as possible within the given distance limit.' },
      { rule: 'Controls',         desc: 'Use arrow keys (↑ ↓ ← →) for player movement. Press Esc to pause or unpause the game.' },
      { rule: 'Bulastugan',       desc: 'A food cart obstacle - hitting it subtracts ₱5 from your savings.' },
      { rule: 'Meta Cyberlounge', desc: 'A computer shop obstacle - hitting it subtracts ₱20 from your savings.' },
      { rule: 'Yosi',             desc: 'A cigarette obstacle - hitting it subtracts ₱3 from your savings.' },
      { rule: 'Zen Xtreme',       desc: 'A gaming lounge obstacle - hitting it subtracts ₱20 from your savings.' },
    ],
  },
  {
    images: [],
    isCustomVisual: true,
    logo: tiosLogo,
    tag: 'Fintech & Game (Brainstorming)',
    title: 'TIOS – Track It. Own It. Save It.',
    desc: 'Inspired by "Rich Dad, Poor Dad", TIOS is a gamified wealth-planning concept (still an idea, not yet implemented). Users choose their financial path—the security-focused Tiyo the Carabao Path (building a village) or the growth-focused Rico the Fox Path (building a high-asset city) to track budgets, complete unique missions, and build financial intelligence.',
    outcome: 'Brainstorming...',
    featuresType: 'rules',
    features: [
      { rule: 'Choose Your Path',   desc: 'Pick Tiyo the Carabao (security-first) or Rico the Fox (growth-first) - each path unlocks different missions and financial strategies.' },
      { rule: 'Track Income',       desc: 'Input your monthly income and TIOS auto-calculates your emergency fund target, minimum investment, max expense budget, and freedom number.' },
      { rule: 'Complete Missions',  desc: 'Earn badges by hitting financial milestones: filling your emergency fund, making your first investment, or cutting expenses below the cap.' },
      { rule: 'Build Your World',   desc: 'Progress is visualised as a growing village (Carabao Path) or a high-asset city (Fox Path) - each milestone unlocks a new building.' },
    ],
  },
];

//   /$$$$$$   /$$$$$$  /$$       /$$       /$$$$$$$$ /$$$$$$$  /$$     /$$       /$$$$$$$   /$$$$$$  /$$$$$$$$ /$$$$$$ 
//  /$$__  $$ /$$__  $$| $$      | $$      | $$_____/| $$__  $$|  $$   /$$/      | $$__  $$ /$$__  $$|__  $$__//$$__  $$
// | $$  \__/| $$  \ $$| $$      | $$      | $$      | $$  \ $$ \  $$ /$$/       | $$  \ $$| $$  \ $$   | $$  | $$  \ $$
// | $$ /$$$$| $$$$$$$$| $$      | $$      | $$$$$   | $$$$$$$/  \  $$$$/        | $$  | $$| $$$$$$$$   | $$  | $$$$$$$$
// | $$|_  $$| $$__  $$| $$      | $$      | $$__/   | $$__  $$   \  $$/         | $$  | $$| $$__  $$   | $$  | $$__  $$
// | $$  \ $$| $$  | $$| $$      | $$      | $$      | $$  \ $$    | $$          | $$  | $$| $$  | $$   | $$  | $$  | $$
// |  $$$$$$/| $$  | $$| $$$$$$$$| $$$$$$$$| $$$$$$$$| $$  | $$    | $$          | $$$$$$$/| $$  | $$   | $$  | $$  | $$
//  \______/ |__/  |__/|________/|________/|________/|__/  |__/    |__/          |_______/ |__/  |__/   |__/  |__/  |__/
const sketches = [
  { src: galleryImg1,  title: 'Random #1' },
  { src: galleryImg2,  title: 'Random #2' },
  { src: galleryImg3,  title: 'Random #3' },
  { src: galleryImg4,  title: 'Random #4' },
  { src: galleryImg5,  title: 'Random #5' },
  { src: galleryImg6,  title: 'Random #6' },
  { src: galleryImg7,  title: 'Random #7' },
  { src: galleryImg8,  title: 'Random #8' },
  { src: galleryImg9,  title: 'Random #9' },
  { src: galleryImg10, title: 'Random #10' },
  { src: galleryImg11, title: 'Random #11' },
  { src: galleryImg12, title: 'Random #12' },
  { src: galleryImg13, title: 'Random #13' },
  { src: galleryImg14, title: 'Random #14' },
  { src: galleryImg15, title: 'Random #15' },
  { src: galleryImg16, title: 'Random #16' },
  { src: galleryImg17, title: 'Random #17' },
];

//   /$$$$$$   /$$$$$$  /$$       /$$       /$$$$$$$$ /$$$$$$$  /$$     /$$        /$$$$$$  /$$$$$$$$  /$$$$$$  /$$$$$$$$ /$$$$$$  /$$$$$$  /$$   /$$
//  /$$__  $$ /$$__  $$| $$      | $$      | $$_____/| $$__  $$|  $$   /$$/       /$$__  $$| $$_____/ /$$__  $$|__  $$__/|_  $$_/ /$$__  $$| $$$ | $$
// | $$  \__/| $$  \ $$| $$      | $$      | $$      | $$  \ $$ \  $$ /$$/       | $$  \__/| $$      | $$  \__/   | $$     | $$  | $$  \ $$| $$$$| $$
// | $$ /$$$$| $$$$$$$$| $$      | $$      | $$$$$   | $$$$$$$/  \  $$$$/        |  $$$$$$ | $$$$$   | $$         | $$     | $$  | $$  | $$| $$ $$ $$
// | $$|_  $$| $$__  $$| $$      | $$      | $$__/   | $$__  $$   \  $$/          \____  $$| $$__/   | $$         | $$     | $$  | $$  | $$| $$  $$$$
// | $$  \ $$| $$  | $$| $$      | $$      | $$      | $$  \ $$    | $$           /$$  \ $$| $$      | $$    $$   | $$     | $$  | $$  | $$| $$\  $$$
// |  $$$$$$/| $$  | $$| $$$$$$$$| $$$$$$$$| $$$$$$$$| $$  | $$    | $$          |  $$$$$$/| $$$$$$$$|  $$$$$$/   | $$    /$$$$$$|  $$$$$$/| $$ \  $$
//  \______/ |__/  |__/|________/|________/|________/|__/  |__/    |__/           \______/ |________/ \______/    |__/   |______/ \______/ |__/  \__/
function GallerySection() {
  const [active, setActive] = useState(null);

  const open  = useCallback((i) => setActive(i), []);
  const close = useCallback(() => setActive(null), []);

  // Keyboard: Escape → close, Arrow keys → prev/next
  useEffect(() => {
    if (active === null) return;
    const handler = (e) => {
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % sketches.length);
      if (e.key === 'ArrowLeft')  setActive((i) => (i - 1 + sketches.length) % sketches.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, close]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = active !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  const item = active !== null ? sketches[active] : null;

  return (
    <section id="gallery" className="gallery-section" aria-label="Sketches and Gallery">
      <div className="container">
        <div className="gallery-stack-layout">
          {/* Left 70% — description */}
          <div className="gallery-stack-info">
            <p className="section-label">Creative</p>
            <SectionHeading text="Sketches / Gallery" />
            <p className="section-sub">
              A personal collection of sketches, ideas, illustrations, and photography.
            </p>
            <p className="gallery-stack-hint">Drag or click a card to flip through</p>
          </div>

          {/* Right 30% — Stack */}
          <div className="gallery-stack-visual">
            <Stack
              randomRotation={true}
              sensitivity={180}
              sendToBackOnClick={true}
              autoplay={true}
              autoplayDelay={2500}
              pauseOnHover={true}
              cards={sketches.map((s, i) => (
                <img
                  key={i}
                  src={s.src}
                  alt={s.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onClick={() => open(i)}
                />
              ))}
            />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {item && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          onClick={close}
        >
          <div className="gallery-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-lb-close" onClick={close} aria-label="Close">✕</button>

            {/* Prev / Next */}
            <button
              className="gallery-lb-arrow gallery-lb-arrow--prev"
              onClick={() => setActive((i) => (i - 1 + sketches.length) % sketches.length)}
              aria-label="Previous"
            >‹</button>
            <button
              className="gallery-lb-arrow gallery-lb-arrow--next"
              onClick={() => setActive((i) => (i + 1) % sketches.length)}
              aria-label="Next"
            >›</button>

            <div className="gallery-lb-media">
              <img src={item.src} alt={item.title} className="gallery-lb-img" />
            </div>
            <div className="gallery-lb-info">
              <p className="gallery-lb-title">{item.title}</p>
              {item.caption && <p className="gallery-lb-caption">{item.caption}</p>}
              <p className="gallery-lb-counter">{active + 1} / {sketches.length}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

//   /$$$$$$   /$$$$$$  /$$      /$$ /$$$$$$$$        /$$$$$$  /$$$$$$$$  /$$$$$$  /$$$$$$$$ /$$$$$$  /$$$$$$  /$$   /$$
//  /$$__  $$ /$$__  $$| $$$    /$$$| $$_____/       /$$__  $$| $$_____/ /$$__  $$|__  $$__/|_  $$_/ /$$__  $$| $$$ | $$
// | $$  \__/| $$  \ $$| $$$$  /$$$$| $$            | $$  \__/| $$      | $$  \__/   | $$     | $$  | $$  \ $$| $$$$| $$
// | $$ /$$$$| $$$$$$$$| $$ $$/$$ $$| $$$$$         |  $$$$$$ | $$$$$   | $$         | $$     | $$  | $$  | $$| $$ $$ $$
// | $$|_  $$| $$__  $$| $$  $$$| $$| $$__/          \____  $$| $$__/   | $$         | $$     | $$  | $$  | $$| $$  $$$$
// | $$  \ $$| $$  | $$| $$\  $ | $$| $$             /$$  \ $$| $$      | $$    $$   | $$     | $$  | $$  | $$| $$\  $$$
// |  $$$$$$/| $$  | $$| $$ \/  | $$| $$$$$$$$      |  $$$$$$/| $$$$$$$$|  $$$$$$/   | $$    /$$$$$$|  $$$$$$/| $$ \  $$
//  \______/ |__/  |__/|__/     |__/|________/       \______/ |________/ \______/    |__/   |______/ \______/ |__/  \__/
function GameSection() {
  const [muted, setMuted] = useState(true);

  return (
    <section id="game" className="game-section" aria-label="2019 Game Project">
      <div className="container">
        <div className="game-section-header">
          <div>
            <p className="section-label">2019 Project</p>
            <SectionHeading text="Game Development & Design Class" />
          </div>
          <button
            className="game-mute-btn"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? 'Unmute game' : 'Mute game'}
            title={muted ? 'Unmute game' : 'Mute game'}
          >
            {muted ? '🔇 Unmute' : '🔊 Mute'}
          </button>
        </div>
        <iframe
          key={muted ? 'muted' : 'unmuted'}
          className="game-frame"
          title="Kada Tipon"
          allow={`fullscreen; encrypted-media${muted ? '' : '; autoplay'}`}
          src="https://games.construct.net/67490/latest"
          allowFullScreen
          sandbox="allow-same-origin allow-forms allow-scripts allow-pointer-lock allow-orientation-lock allow-popups"
          scrolling="no"
        />
      </div>
    </section>
  );
}

//   /$$$$$$  /$$$$$$$  /$$$$$$$ 
//  /$$__  $$| $$__  $$| $$__  $$
// | $$  \ $$| $$  \ $$| $$  \ $$
// | $$$$$$$$| $$$$$$$/| $$$$$$$/
// | $$__  $$| $$____/ | $$____/
// | $$  | $$| $$      | $$
// | $$  | $$| $$      | $$
// |__/  |__/|__/      |__/

// ─── Section heading with SplitText scroll-triggered animation ───────────────
function SectionHeading({ text }) {
  return (
    <SplitText
      tag="h2"
      text={text}
      className="section-title"
      splitType="words"
      delay={60}
      duration={0.6}
      ease="power3.out"
      from={{ opacity: 0, y: 28 }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.15}
      rootMargin="-40px"
      textAlign="left"
    />
  );
}

// ─── Shared Framer Motion variants (same as ResumePage) ──────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.09 } },
};

function App() {
  const [page, setPage]         = useState(
    () => new URLSearchParams(window.location.search).has('admin') ? 'admin' : 'home'
  );
  const [typeKey, setTypeKey]   = useState(0); // kept for hover cooldown logic
  // Tracks whether viewport is ≤ 900px for responsive SplitText textAlign
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  const headlineAlign = isMobile ? 'center' : 'left';
  const [badgeKey, setBadgeKey] = useState(0);
  const [visitors, setVisitors] = useState(null);
  const hoverCooldown           = useRef(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const savedScrollY = useRef(0);

  // ── Scroll-to-top handler ───────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Visitor counter (proxied via /api/visitors to avoid CORS) ─────────────
  useEffect(() => {
    fetch('/api/visitors')
      .then((r) => r.json())
      .then((d) => { if (d.count !== null) setVisitors(d.count); })
      .catch(() => {});
  }, []);

  // ── Dark mode + diagonal wipe ──────────────────────────────
  const [dark, setDark]           = useState(false);
  const [wipeState, setWipeState] = useState('hidden'); // 'hidden' | 'in' | 'out'

  const toggleDark = () => {
    // 1. Show the overlay covering the screen (wipe-in = full cover)
    setWipeState('in');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // 2. On next frame flip the theme under the overlay
        const next = !dark;
        setDark(next);
        document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
        // 3. Sweep the overlay away diagonally (wipe-out)
        setWipeState('out');
        // 4. Hide overlay completely after animation ends
        setTimeout(() => setWipeState('hidden'), 700);
      });
    });
  };

  // Re-trigger typewriter on headline hover (with cooldown so it doesn't spam)
  const handleHeadlineHover = () => {
    if (hoverCooldown.current) return;
    hoverCooldown.current = true;
    setTypeKey((k) => k + 1);
    setTimeout(() => { hoverCooldown.current = false; }, 2200);
  };

  if (page === 'resume') {
    return <ResumePage
      dark={dark}
      onToggleDark={toggleDark}
      onBack={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
    />;
  }

  if (page === 'project') {
    return (
      <ProjectPage
        project={selectedProject}
        dark={dark}
        onToggleDark={toggleDark}
        onBack={() => {
          setPage('home');
          // Restore the scroll position the user was at before opening
          requestAnimationFrame(() => {
            window.scrollTo({ top: savedScrollY.current, behavior: 'instant' });
          });
        }}
      />
    );
  }

  if (page === 'admin') {
    return <AdminPanel />;
  }

  return (
    <div className="site-wrapper">

      {/* ── DarkVeil WebGL background ── */}
      <div className="darkveil-bg">
        <DarkVeil
          hueShift={105}
          speed={0.35}
          warpAmount={0.5}
          noiseIntensity={0.04}
          scanlineIntensity={0.12}
          scanlineFrequency={800}
          resolutionScale={0.6}
        />
        <Particles
          particleColors={['#a78bfa', '#818cf8', '#ffffff']}
          particleCount={180}
          particleSpread={12}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          particleHoverFactor={0.6}
          alphaParticles={true}
          sizeRandomness={0.8}
          disableRotation={false}
        />
      </div>

      {/* ── Diagonal wipe overlay ── */}
      {wipeState !== 'hidden' && (
        <div className={`wipe-overlay ${wipeState === 'out' ? 'wipe-out' : ''}`} aria-hidden="true" />
      )}

      {/*
      //  /$$   /$$  /$$$$$$  /$$    /$$
      // | $$$ | $$ /$$__  $$| $$   | $$
      // | $$$$| $$| $$  \ $$| $$   | $$
      // | $$ $$ $$| $$$$$$$$|  $$ / $$/
      // | $$  $$$$| $$__  $$ \  $$ $$/ 
      // | $$\  $$$| $$  | $$  \  $$$/  
      // | $$ \  $$| $$  | $$   \  $/   
      // |__/  \__/|__/  |__/    \_/ 
      */}
      <header className="masthead">
        <div className="masthead-inner">
          <a href="#" className="navbar-brand" aria-label="JEL Home">
            <img src={dark ? logoWhite : logo} alt="JEL logo" style={{ height: 48, width: 70 }} />
          </a>
          <nav aria-label="Main navigation">
            <ul className="masthead-nav">
              <li><a href="#work" onClick={() => setMenuOpen(false)}>Work</a></li>
              <li><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
              {/* <li><a href="#certs">Certifications</a></li> */}
              <li><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a></li>
              <li><a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a></li>
              <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
              <li>
                <a
                  href="#"
                  className="nav-cta"
                  onClick={(e) => { e.preventDefault(); setMenuOpen(false); setPage('resume'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
                >
                  Resume
                </a>
              </li>
              <li>
                <button
                  className="dm-toggle"
                  onClick={toggleDark}
                  aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                  title={dark ? 'Light mode' : 'Dark mode'}
                >
                  <span className="dm-toggle-thumb">
                    {dark ? '☀' : '☾'}
                  </span>
                </button>
              </li>
            </ul>
          </nav>

          {/* ── Mobile controls ── */}
          <div className="masthead-mobile-controls">
            <button
              className="dm-toggle"
              onClick={toggleDark}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={dark ? 'Light mode' : 'Dark mode'}
            >
              <span className="dm-toggle-thumb">
                {dark ? '☀' : '☾'}
              </span>
            </button>
            <button
              className="hamburger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`hamburger-line${menuOpen ? ' open' : ''}`} />
              <span className={`hamburger-line${menuOpen ? ' open' : ''}`} />
              <span className={`hamburger-line${menuOpen ? ' open' : ''}`} />
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown menu ── */}
        {menuOpen && (
          <div className="mobile-menu" role="menu">
            <a href="#work"       className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Work</a>
            <a href="#skills"     className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#experience" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Experience</a>
            <a href="#gallery"    className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Gallery</a>
            <a href="#contact"    className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Contact</a>
            <a
              href="#"
              className="mobile-menu-link mobile-menu-cta"
              onClick={(e) => { e.preventDefault(); setMenuOpen(false); setPage('resume'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
            >
              Resume
            </a>
          </div>
        )}
      </header>

      {/* 
      //  /$$   /$$ /$$$$$$$$ /$$$$$$$   /$$$$$$ 
      // | $$  | $$| $$_____/| $$__  $$ /$$__  $$
      // | $$  | $$| $$      | $$  \ $$| $$  \ $$
      // | $$$$$$$$| $$$$$   | $$$$$$$/| $$  | $$
      // | $$__  $$| $$__/   | $$__  $$| $$  | $$
      // | $$  | $$| $$      | $$  \ $$| $$  | $$
      // | $$  | $$| $$$$$$$$| $$  | $$|  $$$$$$/
      // |__/  |__/|________/|__/  |__/ \______/       
      */}
      <section className="hero" aria-label="Introduction">
        <div className="hero-content">
        <div className="hero-inner">

          {/* -- HERO LEFT -- */}
          <div className="hero-left">
            <span className="hero-label">
              <span className="hero-label-dot" aria-hidden="true" />
              QA Analyst &amp; Automation
            </span>

            <h1 className="hero-headline">
              <SplitText
                key={`line1-${typeKey}`}
                tag="span"
                text="Ensuring quality."
                className="hero-headline-line"
                splitType="chars"
                delay={18}
                duration={0.55}
                ease="power3.out"
                from={{ opacity: 0, y: 36 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign={headlineAlign}
              />
              <SplitText
                key={`line2a-${typeKey}`}
                tag="span"
                text="Building "
                className="hero-headline-line"
                splitType="chars"
                delay={18}
                duration={0.55}
                ease="power3.out"
                from={{ opacity: 0, y: 36 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign={headlineAlign}
              /><span className="hero-headline-confidence-wrap">
                <SplitText
                  key={`line2b-${typeKey}`}
                  tag="span"
                  text="confidence."
                  className="hero-headline-line hero-headline-line--blue"
                  splitType="chars"
                  delay={18}
                  duration={0.55}
                  ease="power3.out"
                  from={{ opacity: 0, y: 36 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
                  textAlign={headlineAlign}
                />
              </span>
              <SplitText
                key={`line3-${typeKey}`}
                tag="span"
                text="Improving experiences."
                className="hero-headline-line"
                splitType="chars"
                delay={18}
                duration={0.55}
                ease="power3.out"
                from={{ opacity: 0, y: 36 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign={headlineAlign}
              />
            </h1>

            <p className="hero-sub">
              Philippine-based QA Analyst specialising in Salesforce testing,
              quality assurance, and user experience optimisation.
            </p>

            <div className="hero-actions">
              <a href="#work" className="btn-primary">View Projects →</a>
              <a
                href="#"
                className="btn-secondary"
                onClick={(e) => { e.preventDefault(); setPage('resume'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
              >
                View Resume
              </a>
            </div>
          </div>

          {/* -- HERO RIGHT -- */}
          <div className="hero-right">
            <div
              className="hero-visual"
              onMouseEnter={() => setBadgeKey((k) => k + 1)}
            >
              <img src={dark ? logoFaceWhite : logoFace} alt="John Emman Lanusga" className="hero-logo-img" />

              <div className="floating-badges" aria-hidden="true" key={badgeKey}>
                <div className="badge badge--sf" style={{ animationDelay: '0.05s' }}>
                  <span className="badge-dot" style={{ background: '#0176D3' }} />
                  Salesforce
                </div>
                <div className="badge badge--test" style={{ animationDelay: '0.25s' }}>
                  <span className="badge-dot" style={{ background: '#7BCB6D' }} />
                  Testing
                </div>
                <div className="badge badge--qa" style={{ animationDelay: '0.15s' }}>
                  <span className="badge-dot" style={{ background: '#e05c2a' }} />
                  Quality
                </div>
                <div className="badge badge--auto" style={{ animationDelay: '0s' }}>
                  <span className="badge-dot" style={{ background: '#9b59b6' }} />
                  Automation
                </div>
              </div>
            </div>

            <p className="hero-fullname">John Emman Lanusga</p>
          </div>

        </div>
        </div>

        {/* ── Marquee separator ─────────────────────────────────────── */}
        <div className="sv-strip">
          <ScrollVelocity
            texts={[
              <>QA Analyst <span className="sv-sep"><img src={spaceCat} alt="" aria-hidden="true" className="sv-sep-img" /></span> Automation <span className="sv-sep"><img src={spaceCat} alt="" aria-hidden="true" className="sv-sep-img" /></span> Quality Assurance <span className="sv-sep"><img src={spaceCat} alt="" aria-hidden="true" className="sv-sep-img" /></span> Jira <span className="sv-sep"><img src={spaceCat} alt="" aria-hidden="true" className="sv-sep-img" /></span> Process Improvement <span className="sv-sep"><img src={spaceCat} alt="" aria-hidden="true" className="sv-sep-img" /></span></>,
            ]}
            velocity={60}
            numCopies={4}
            parallaxClassName="parallax"
            scrollerClassName="scroller"
          />
        </div>
      </section>

      {/*
      //  /$$$$$$$  /$$$$$$$   /$$$$$$     /$$$$$ /$$$$$$$$  /$$$$$$  /$$$$$$$$ /$$$$$$
      // | $$__  $$| $$__  $$ /$$__  $$   |__  $$| $$_____/ /$$__  $$|__  $$__//$$__  $$
      // | $$  \ $$| $$  \ $$| $$  \ $$      | $$| $$      | $$  \__/   | $$  | $$  \__/
      // | $$$$$$$/| $$$$$$$/| $$  | $$      | $$| $$$$$   | $$         | $$  |  $$$$$$ 
      // | $$____/ | $$__  $$| $$  | $$ /$$  | $$| $$__/   | $$         | $$   \____  $$
      // | $$      | $$  \ $$| $$  | $$| $$  | $$| $$      | $$    $$   | $$   /$$  \ $$
      // | $$      | $$  | $$|  $$$$$$/|  $$$$$$/| $$$$$$$$|  $$$$$$/   | $$  |  $$$$$$/
      // |__/      |__/  |__/ \______/  \______/ |________/ \______/    |__/   \______/       
      */}
      <motion.section
        id="work" className="section" aria-label="Featured Projects"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={stagger}
      >
        <div className="container">
          <motion.p className="section-label" variants={fadeUp}>Featured Work</motion.p>
          <SectionHeading text="Projects & Outcomes" />
          <motion.p className="section-sub" variants={fadeUp}>
            A selection of quality engineering work across Salesforce, API testing, and process improvement.
          </motion.p>
          <div className="projects-grid">
            {projects.map((p) => (
              <motion.article key={p.title} className="project-card" variants={fadeUp}>
                <div className="project-thumb--screenshots">
                  {p.isCustomVisual ? (
                    <TiosShowcase dark={dark} />
                  ) : (
                    p.images.slice(0, 2).map((src, i) => (
                      <img key={i} src={src} alt={`${p.title} screenshot ${i + 1}`} className="project-thumb-img" />
                    ))
                  )}
                </div>
                <div className="project-body">
                  <span className="project-tag">{p.tag}</span>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>
                  {p.tech && (
                    <div className="project-tech">
                      {p.tech.map((t) => (
                        <span key={t.name} className="project-tech-badge">
                          <img src={t.logo} alt="" className="project-tech-icon" />
                          {t.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="project-outcome">✦ {p.outcome}</p>
                  <button
                    className="project-view-btn"
                    onClick={() => {
                      savedScrollY.current = window.scrollY;
                      setSelectedProject(p);
                      setPage('project');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                  >
                    View Details →
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 
      //   /$$$$$$  /$$   /$$ /$$$$$$ /$$       /$$        /$$$$$$ 
      //  /$$__  $$| $$  /$$/|_  $$_/| $$      | $$       /$$__  $$
      // | $$  \__/| $$ /$$/   | $$  | $$      | $$      | $$  \__/
      // |  $$$$$$ | $$$$$/    | $$  | $$      | $$      |  $$$$$$ 
      //  \____  $$| $$  $$    | $$  | $$      | $$       \____  $$
      //  /$$  \ $$| $$\  $$   | $$  | $$      | $$       /$$  \ $$
      // |  $$$$$$/| $$ \  $$ /$$$$$$| $$$$$$$$| $$$$$$$$|  $$$$$$/
      //  \______/ |__/  \__/|______/|________/|________/ \______/       
      */}
      <motion.section
        id="skills" className="section" aria-label="Skills and Tools"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={stagger}
      >
        <div className="container">
          <motion.p className="section-label" variants={fadeUp}>Capabilities</motion.p>
          <SectionHeading text="Skills & Tools" />
          <motion.p className="section-sub" variants={fadeUp}>
            Core competencies spanning QA methodologies, Salesforce administration, and test tooling.
          </motion.p>
          <div className="skills-grid">
            {skills.map((s) => (
              <motion.div key={s.name} variants={fadeUp}>
                <SpotlightCard className="skill-card" spotlightColor="var(--skill-spotlight)">
                  <div className="skill-icon" aria-label={s.name}>
                    {s.img
                      ? <img src={s.img} alt={s.name} width="32" height="32" loading="lazy" />
                      : <span dangerouslySetInnerHTML={{ __html: s.svg }} />}
                  </div>
                  <div className="skill-name">{s.name}</div>
                  <div className="skill-type">{s.type}</div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {
    /* 
      /$$$$$$  /$$$$$$$$ /$$$$$$$  /$$$$$$$$ /$$$$$$ /$$$$$$$$ /$$$$$$  /$$$$$$   /$$$$$$  /$$$$$$$$ /$$$$$$  /$$$$$$  /$$   /$$  /$$$$$$ 
     /$$__  $$| $$_____/| $$__  $$|__  $$__/|_  $$_/| $$_____/|_  $$_/ /$$__  $$ /$$__  $$|__  $$__/|_  $$_/ /$$__  $$| $$$ | $$ /$$__  $$
    | $$  \__/| $$      | $$  \ $$   | $$     | $$  | $$        | $$  | $$  \__/| $$  \ $$   | $$     | $$  | $$  \ $$| $$$$| $$| $$  \__/
    | $$      | $$$$$   | $$$$$$$/   | $$     | $$  | $$$$$     | $$  | $$      | $$$$$$$$   | $$     | $$  | $$  | $$| $$ $$ $$|  $$$$$$ 
    | $$      | $$__/   | $$__  $$   | $$     | $$  | $$__/     | $$  | $$      | $$__  $$   | $$     | $$  | $$  | $$| $$  $$$$ \____  $$
    | $$    $$| $$      | $$  \ $$   | $$     | $$  | $$        | $$  | $$    $$| $$  | $$   | $$     | $$  | $$  | $$| $$\  $$$ /$$  \ $$
    |  $$$$$$/| $$$$$$$$| $$  | $$   | $$    /$$$$$$| $$       /$$$$$$|  $$$$$$/| $$  | $$   | $$    /$$$$$$|  $$$$$$/| $$ \  $$|  $$$$$$/
    \______/ |________/|__/  |__/   |__/   |______/|__/      |______/ \______/ |__/  |__/   |__/   |______/ \______/ |__/  \__/ \______/  
    */}
      
      {/* -- CERTIFICATIONS (commented out) --
      <section id="certs" className="section" aria-label="Certifications">
        <div className="container">
          <p className="section-label">Credentials</p>
          <h2 className="section-title">Certifications</h2>
          <p className="section-sub">
            Industry certifications validating expertise in Salesforce administration and quality assurance.
          </p>
          <div className="certs-grid">
            {certs.map((c) => (
              <div key={c.title} className="cert-card">
                <div className="cert-badge-icon" role="img" aria-label={c.title}>{c.icon}</div>
                <div>
                  <div className="cert-title">{c.title}</div>
                  <div className="cert-issuer">{c.issuer}</div>
                  <span className="cert-year">{c.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* 
    //  /$$$$$$$$ /$$   /$$ /$$$$$$$  /$$$$$$$$ /$$$$$$$  /$$$$$$ /$$$$$$$$ /$$   /$$  /$$$$$$  /$$$$$$$$
    // | $$_____/| $$  / $$| $$__  $$| $$_____/| $$__  $$|_  $$_/| $$_____/| $$$ | $$ /$$__  $$| $$_____/
    // | $$      |  $$/ $$/| $$  \ $$| $$      | $$  \ $$  | $$  | $$      | $$$$| $$| $$  \__/| $$      
    // | $$$$$    \  $$$$/ | $$$$$$$/| $$$$$   | $$$$$$$/  | $$  | $$$$$   | $$ $$ $$| $$      | $$$$$   
    // | $$__/     >$$  $$ | $$____/ | $$__/   | $$__  $$  | $$  | $$__/   | $$  $$$$| $$      | $$__/   
    // | $$       /$$/\  $$| $$      | $$      | $$  \ $$  | $$  | $$      | $$\  $$$| $$    $$| $$      
    // | $$$$$$$$| $$  \ $$| $$      | $$$$$$$$| $$  | $$ /$$$$$$| $$$$$$$$| $$ \  $$|  $$$$$$/| $$$$$$$$
    // |________/|__/  |__/|__/      |________/|__/  |__/|______/|________/|__/  \__/ \______/ |________/
      */}
      <motion.section
        id="experience" className="section" aria-label="Experience"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={stagger}
      >
        <div className="container">
          <motion.p className="section-label" variants={fadeUp}>Career</motion.p>
          <SectionHeading text="Experience" />
          <div className="timeline">
            {timeline.map((t) => (
              <motion.div key={t.role} className="timeline-item" variants={fadeUp}>
                <div className="timeline-dot" aria-hidden="true" />
                <div className="timeline-date">{t.date}</div>
                <div className="timeline-role">{t.role}</div>
                <div className="timeline-company">{t.company}</div>
                <p className="timeline-desc">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/*
      //   /$$$$$$  /$$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$$$
      //  /$$__  $$| $$__  $$ /$$__  $$| $$  | $$|__  $$__/
      // | $$  \ $$| $$  \ $$| $$  \ $$| $$  | $$   | $$   
      // | $$$$$$$$| $$$$$$$ | $$  | $$| $$  | $$   | $$   
      // | $$__  $$| $$__  $$| $$  | $$| $$  | $$   | $$   
      // | $$  | $$| $$  \ $$| $$  | $$| $$  | $$   | $$   
      // | $$  | $$| $$$$$$$/|  $$$$$$/|  $$$$$$/   | $$   
      // |__/  |__/|_______/  \______/  \______/    |__/ 
      */}
      <motion.section
        className="section" aria-label="About"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={stagger}
      >
        <div className="container">
          <div className="about-grid">
            <motion.div className="portal-wrap" variants={fadeUp}>
              <PortalGateway portalSrc={portal} />
            </motion.div>
            <div>
              <motion.p className="section-label" variants={fadeUp}>About</motion.p>
              <SectionHeading text="Detail-oriented. Systematic. Creative." />
              <motion.p className="section-sub" style={{ maxWidth: '100%' }} variants={fadeUp}>
                I'm John Emman Lanusga – a Philippine-based QA Analyst with a passion for building
                reliable software. As a Certified Salesforce Administrator and Test Analyst, I bridge
                the gap between technical execution and business value, ensuring every release ships
                with confidence.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 
      //   /$$$$$$   /$$$$$$  /$$      /$$ /$$$$$$$$
      //  /$$__  $$ /$$__  $$| $$$    /$$$| $$_____/
      // | $$  \__/| $$  \ $$| $$$$  /$$$$| $$      
      // | $$ /$$$$| $$$$$$$$| $$ $$/$$ $$| $$$$$   
      // | $$|_  $$| $$__  $$| $$  $$$| $$| $$__/   
      // | $$  \ $$| $$  | $$| $$\  $ | $$| $$      
      // |  $$$$$$/| $$  | $$| $$ \/  | $$| $$$$$$$$
      //  \______/ |__/  |__/|__/     |__/|________/      
      */}
      <GameSection />

      {/* 
      //   /$$$$$$   /$$$$$$  /$$       /$$       /$$$$$$$$ /$$$$$$$  /$$     /$$
      //  /$$__  $$ /$$__  $$| $$      | $$      | $$_____/| $$__  $$|  $$   /$$/
      // | $$  \__/| $$  \ $$| $$      | $$      | $$      | $$  \ $$ \  $$ /$$/ 
      // | $$ /$$$$| $$$$$$$$| $$      | $$      | $$$$$   | $$$$$$$/  \  $$$$/  
      // | $$|_  $$| $$__  $$| $$      | $$      | $$__/   | $$__  $$   \  $$/   
      // | $$  \ $$| $$  | $$| $$      | $$      | $$      | $$  \ $$    | $$    
      // |  $$$$$$/| $$  | $$| $$$$$$$$| $$$$$$$$| $$$$$$$$| $$  | $$    | $$    
      //  \______/ |__/  |__/|________/|________/|________/|__/  |__/    |__/       
      */}
      <GallerySection />

      {/* 
      //   /$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$$$ /$$$$$$   /$$$$$$  /$$$$$$$$
      //  /$$__  $$ /$$__  $$| $$$ | $$|__  $$__//$$__  $$ /$$__  $$|__  $$__/
      // | $$  \__/| $$  \ $$| $$$$| $$   | $$  | $$  \ $$| $$  \__/   | $$   
      // | $$      | $$  | $$| $$ $$ $$   | $$  | $$$$$$$$| $$         | $$   
      // | $$      | $$  | $$| $$  $$$$   | $$  | $$__  $$| $$         | $$   
      // | $$    $$| $$  | $$| $$\  $$$   | $$  | $$  | $$| $$    $$   | $$   
      // |  $$$$$$/|  $$$$$$/| $$ \  $$   | $$  | $$  | $$|  $$$$$$/   | $$   
      //  \______/  \______/ |__/  \__/   |__/  |__/  |__/ \______/    |__/        
      */}
      <motion.section
        id="contact" className="section" aria-label="Contact"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={stagger}
      >
        <div className="container">
          <motion.p className="section-label" variants={fadeUp}>Get in Touch</motion.p>
          <SectionHeading text="Let's work together." />
          <div className="contact-grid">

            <motion.div className="contact-card contact-card--cta" variants={fadeUp}>
              <div>
                <h3 className="section-title">Open to new opportunities.</h3>
                <p className="section-sub">
                  Available for QA consulting, Salesforce testing projects, and full-time roles.
                </p>
              </div>
              <a href="mailto:emmanlanusga@gmail.com" className="btn-white">
                Say Hello →
              </a>
            </motion.div>

            <motion.div className="contact-card" variants={fadeUp}>
              <p className="section-label">Socials</p>
              <div className="social-row">
                <a
                  href="https://www.linkedin.com/in/jelanusga/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  LinkedIn
                  <span className="social-link-arrow" aria-hidden="true">↗</span>
                </a>
                <a
                  href="https://www.facebook.com/emmaniy0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  Facebook
                  <span className="social-link-arrow" aria-hidden="true">↗</span>
                </a>
                <a
                  href="https://www.instagram.com/garu_emani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  Instagram
                  <span className="social-link-arrow" aria-hidden="true">↗</span>
                </a>
                <a
                  href="https://www.tiktok.com/@emnswsw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  TikTok
                  <span className="social-link-arrow" aria-hidden="true">↗</span>
                </a>
                <a
                  href="mailto:emmanlanusga@gmail.com"
                  className="social-link"
                >
                  emmanlanusga@gmail.com
                  <span className="social-link-arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* 
      //  /$$$$$$$$ /$$$$$$   /$$$$$$  /$$$$$$$$ /$$$$$$$$ /$$$$$$$ 
      // | $$_____//$$__  $$ /$$__  $$|__  $$__/| $$_____/| $$__  $$
      // | $$     | $$  \ $$| $$  \ $$   | $$   | $$      | $$  \ $$
      // | $$$$$  | $$  | $$| $$  | $$   | $$   | $$$$$   | $$$$$$$/
      // | $$__/  | $$  | $$| $$  | $$   | $$   | $$__/   | $$__  $$
      // | $$     | $$  | $$| $$  | $$   | $$   | $$      | $$  \ $$
      // | $$     |  $$$$$$/|  $$$$$$/   | $$   | $$$$$$$$| $$  | $$
      // |__/      \______/  \______/    |__/   |________/|__/  |__/      
      */}
      <footer className="mastfoot">
        <p>
          Portfolio <a href="/">site</a> of{' '}
          <a href="mailto:emmanlanusga@gmail.com">emmanlanusga@gmail.com</a>
          {' '}· <strong>John Emman Lanusga</strong> · Philippines
        </p>
        {visitors !== null && (
          <p className="mastfoot-visitors">
            <strong>{visitors.toLocaleString()} Visitors</strong>
          </p>
        )}
      </footer>

      {/* 
      //  /$$   /$$  /$$$$$$  /$$$$$$ /$$$$$$$   /$$$$$$   /$$$$$$         /$$$$$$  /$$   /$$  /$$$$$$  /$$$$$$$$
      // | $$  /$$/ /$$__  $$|_  $$_/| $$__  $$ /$$__  $$ /$$__  $$       /$$__  $$| $$  | $$ /$$__  $$|__  $$__/
      // | $$ /$$/ | $$  \ $$  | $$  | $$  \ $$| $$  \ $$| $$  \__/      | $$  \__/| $$  | $$| $$  \ $$   | $$   
      // | $$$$$/  | $$$$$$$$  | $$  | $$$$$$$/| $$  | $$|  $$$$$$       | $$      | $$$$$$$$| $$$$$$$$   | $$   
      // | $$  $$  | $$__  $$  | $$  | $$__  $$| $$  | $$ \____  $$      | $$      | $$__  $$| $$__  $$   | $$   
      // | $$\  $$ | $$  | $$  | $$  | $$  \ $$| $$  | $$ /$$  \ $$      | $$    $$| $$  | $$| $$  | $$   | $$   
      // | $$ \  $$| $$  | $$ /$$$$$$| $$  | $$|  $$$$$$/|  $$$$$$/      |  $$$$$$/| $$  | $$| $$  | $$   | $$   
      // |__/  \__/|__/  |__/|______/|__/  |__/ \______/  \______/        \______/ |__/  |__/|__/  |__/   |__/
      */}
      <KairosChat />

      {/* ── Scroll to Top button ── */}
      <button
        className={`scroll-up-btn${showScrollUp ? ' scroll-up-btn--visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

    </div>
  );
}

export default App;
