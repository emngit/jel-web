import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminPanel from './AdminPanel.jsx';
import ProjectPage from './ProjectPage.jsx';
import Aurora from './Aurora.jsx';
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
import tiosLogo              from './assets/images/Tios/TIOS-SAMPLE-LOGO.jpg';
import tiosLogoHrzl          from './assets/images/Tios/TIOS-SAMPLE-LOGO-hrzl.png';
import tiosLogoHrzlWhite     from './assets/images/Tios/TIOS-SAMPLE-LOGO-hrzl-white.png';
import tiosInitialPlan1      from './assets/images/Tios/Tios-initial-plan (1).jpg';
import tiosInitialPlan2      from './assets/images/Tios/Tios-initial-plan (2).jpg';
import tiosInitialPlan3      from './assets/images/Tios/Tios-initial-plan (3).jpg';
import spaceship from './assets/images/spaceship.png';
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
        desc: 'Pulls headcount and task data from Monday.com boards to surface utilization rates, bandwidth gaps, and team availability - presented as a dashboard for capacity planning.',
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
    images: [tiosLogo, tiosInitialPlan1, tiosInitialPlan2, tiosInitialPlan3],
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
  { src: tiosInitialPlan1, title: 'TIOS – Initial Plan #1' },
  { src: tiosInitialPlan2, title: 'TIOS – Initial Plan #2' },
  { src: tiosInitialPlan3, title: 'TIOS – Initial Plan #3' },
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
              A personal collection of sketches, illustrations, photography, creative concepts, and a few random snapshots taken along the way. 
              Each piece reflects a different stage of my growth, whether it's an idea I wanted to explore, a moment I wanted to capture, or simply something that caught my eye and felt worth remembering. 
              Through these works, I continue to learn, experiment, and find inspiration in both the ordinary and the unexpected.
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

  // ── Contact modal ───────────────────────────────────────────────────────
  const [contactOpen, setContactOpen]   = useState(false);
  const [contactForm, setContactForm]   = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState('idle'); // 'idle'|'sending'|'sent'|'error'|'rate-limited'|'blocked'
  const [honeypot, setHoneypot]         = useState('');       // must stay empty — bots fill this
  const contactFirstFieldRef = useRef(null);
  const formOpenedAt         = useRef(0);                     // timestamp when modal opens

  // ── Rate limiter: max 2 sends per 10 min, stored in localStorage ────────
  const RATE_LIMIT_MAX       = 2;
  const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

  const getRateMeta = () => {
    try { return JSON.parse(localStorage.getItem('contact_rl') || '{"count":0,"window_start":0}'); }
    catch { return { count: 0, window_start: 0 }; }
  };
  const checkRateLimit = () => {
    const now  = Date.now();
    const meta = getRateMeta();
    if (now - meta.window_start > RATE_LIMIT_WINDOW_MS) return { allowed: true, remaining: RATE_LIMIT_MAX };
    return { allowed: meta.count < RATE_LIMIT_MAX, remaining: Math.max(0, RATE_LIMIT_MAX - meta.count) };
  };
  const recordSubmission = () => {
    const now      = Date.now();
    const meta     = getRateMeta();
    const inWindow = now - meta.window_start <= RATE_LIMIT_WINDOW_MS;
    localStorage.setItem('contact_rl', JSON.stringify({
      count:        inWindow ? meta.count + 1 : 1,
      window_start: inWindow ? meta.window_start : now,
    }));
  };

  // ── Sanitizer: strip HTML tags, control chars, flag spam URLs ───────────
  const sanitize = (str, maxLen) => {
    if (typeof str !== 'string') return '';
    return str
      .slice(0, maxLen)                          // enforce max length
      .replace(/<[^>]*>/g, '')                   // strip any HTML tags
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '') // strip control chars (keep \t \n \r)
      .trim();
  };
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  // Patterns that signal spam/phishing regardless of content
  const SPAM_RE  = /\b(viagra|cialis|casino|crypto|nft|click here|unsubscribe|free money|earn \$|bit\.ly|tinyurl\.com|https?:\/\/[^\s]{60,})/i;

  const openContact = () => {
    setContactForm({ name: '', email: '', message: '' });
    setHoneypot('');
    setContactStatus('idle');
    formOpenedAt.current = Date.now();
    setContactOpen(true);
    setTimeout(() => contactFirstFieldRef.current?.focus(), 80);
  };
  const closeContact = () => setContactOpen(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    // 1. Honeypot — bots fill hidden fields, humans never do
    if (honeypot) { setContactStatus('sent'); return; } // silently fake success

    // 2. Timing — real humans take >2 s to fill a form
    if (Date.now() - formOpenedAt.current < 2000) { setContactStatus('sent'); return; }

    // 3. Rate limit
    const { allowed } = checkRateLimit();
    if (!allowed) { setContactStatus('rate-limited'); return; }

    // 4. Sanitize & validate
    const name    = sanitize(contactForm.name,    100);
    const email   = sanitize(contactForm.email,   254);
    const message = sanitize(contactForm.message, 2000);

    if (!name || !EMAIL_RE.test(email) || !message) { setContactStatus('error'); return; }
    if (SPAM_RE.test(name) || SPAM_RE.test(message)) { setContactStatus('sent'); return; } // silently drop spam

    setContactStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/mnpqqaep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) { recordSubmission(); setContactStatus('sent'); }
      else { setContactStatus('error'); }
    } catch { setContactStatus('error'); }
  };

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
        onDemo={(anchor) => {
          setPage('home');
          // Wait for home to mount then scroll to the anchor
          setTimeout(() => {
            const id = anchor.replace('#', '');
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 80);
        }}
      />
    );
  }

  if (page === 'admin') {
    return <AdminPanel />;
  }

  return (
    <div className="site-wrapper">

      {/* ── Aurora WebGL background ── */}
      <div className="darkveil-bg">
        {/* Light mode: blue "confidence" aurora */}
        <div className="aurora-layer aurora-layer--light">
          <Aurora
            colorStops={['#0055CC', '#0078FF', '#38BDF8']}
            amplitude={1.4}
            blend={0.85}
            speed={0.4}
          />
        </div>
        {/* Dark mode: green aurora */}
        <div className="aurora-layer aurora-layer--dark">
          <Aurora
            colorStops={['#1E6B1E', '#8DC63F', '#4DAB2A']}
            amplitude={1.2}
            blend={0.6}
            speed={0.5}
          />
        </div>
        <Particles
          particleColors={['#a78bfa', '#818cf8', '#ffffff']}
          particleCount={280}
          particleSpread={12}
          speed={0.08}
          particleBaseSize={120}
          moveParticlesOnHover={true}
          particleHoverFactor={1.8}
          alphaParticles={true}
          sizeRandomness={0.6}
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
            <motion.img
              src={dark ? '/jemman-logo-dark.svg' : '/jemman-logo.svg'}
              alt="J.EMMAN"
              className="jemman-logo-svg"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            />
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

          </div>

          {/* -- HERO RIGHT -- */}
          <div className="hero-right">

            {/* ── Spaceship: starts in hero center gap, flies right into landing ── */}
            <motion.div
              className="hero-ship-wrap"
              aria-hidden="true"
              initial={{ x: -460, y: 20, rotate: -28, opacity: 0 }}
              animate={{ x: 0,    y: 0,  rotate: -22, opacity: 1 }}
              transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <img src={spaceship} alt="" className="hero-ship-img" draggable="false" />
              {/* Trail points left — ship moves right */}
              <motion.div
                className="hero-ship-trail"
                initial={{ opacity: 0.9, scaleX: 1 }}
                animate={{ opacity: 0,   scaleX: 0.05 }}
                transition={{ duration: 2.4, ease: 'easeOut', delay: 0.5 }}
              />
            </motion.div>

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

            <p className="hero-sub">
              Philippine-based QA Analyst specializing in Salesforce testing,
              quality assurance, and user experience optimization.
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

        </div>
        </div>

        {/* ── Marquee separator ─────────────────────────────────────── */}
        <div className="sv-strip" role="marquee" aria-label="Skills ticker">
          <ScrollVelocity
            texts={[
              <>QA Analyst <span className="sv-sep" aria-hidden="true">▸</span> Automation <span className="sv-sep" aria-hidden="true">▸</span> Quality Assurance <span className="sv-sep" aria-hidden="true">▸</span> Process Improvement <span className="sv-sep" aria-hidden="true">▸</span> Salesforce Testing <span className="sv-sep" aria-hidden="true">▸</span> User Experience Testing <span className="sv-sep" aria-hidden="true">▸</span></>,
            ]}
            velocity={45}
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
        id="work" className="section cs-section" aria-label="Featured Projects"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={stagger}
      >
        <div className="container">
          <motion.p className="section-label" variants={fadeUp}>Featured Work</motion.p>
          <SectionHeading text="Projects & Outcomes" />
          <motion.p className="section-sub" variants={fadeUp}>
            A selection of engineering work focused on business impact, outcomes, and storytelling.
          </motion.p>

          {/* ── FEATURED: Kairos ────────────────────────────── */}
          <motion.div className="cs-featured-wrap" variants={fadeUp}>
            <div
              className="cs-featured-card"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
              }}
            >
              {/* Browser mockup */}
              <div className="cs-browser">
                <div className="cs-browser-bar">
                  <span className="cs-browser-dot cs-dot-red" />
                  <span className="cs-browser-dot cs-dot-yellow" />
                  <span className="cs-browser-dot cs-dot-green" />
                  <span className="cs-browser-address">kairos.ibm-otc.internal</span>
                </div>
                <div className="cs-browser-screen">
                  <img
                    src={kairosPriority}
                    alt="Kairos dashboard – Priority List"
                    className="cs-browser-img cs-browser-img--primary"
                  />
                  <img
                    src={kairosResolve360Stats}
                    alt="Kairos – Resolve360 Analytics"
                    className="cs-browser-img cs-browser-img--secondary"
                  />
                </div>
              </div>

              {/* Content below browser */}
              <div className="cs-featured-body">
                {/* Left: meta + description */}
                <div className="cs-featured-info">
                  <span className="cs-category-label">Internal Enterprise Platform</span>
                  <h3 className="cs-featured-title">Kairos – Jira Copilot Assistant</h3>
                  <p className="cs-featured-desc">
                    AI-powered Jira workflow platform helping IBM OTC teams manage ticket
                    prioritization, compliance workflows, workforce analytics, and RCA processes.
                  </p>

                  {/* Tech stack */}
                  <div className="cs-tech-row">
                    {projects[0].tech.map((t) => (
                      <span key={t.name} className="cs-tech-pill">
                        <img src={t.logo} alt="" className="cs-tech-pill-icon" />
                        {t.name}
                      </span>
                    ))}
                  </div>

                  <button
                    className="cs-cta-btn"
                    onClick={() => {
                      savedScrollY.current = window.scrollY;
                      setSelectedProject(projects[0]);
                      setPage('project');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                  >
                    View Details →
                  </button>
                </div>

                {/* Right: impact panel */}
                <div className="cs-impact-panel">
                  <p className="cs-impact-header">Business Impact</p>
                  <div className="cs-impact-grid">
                    <div className="cs-impact-item">
                      <strong className="cs-impact-num">3,800+</strong>
                      <span className="cs-impact-label">Tickets Processed</span>
                    </div>
                    <div className="cs-impact-item">
                      <strong className="cs-impact-num">2,927</strong>
                      <span className="cs-impact-label">Resolutions Supported</span>
                    </div>
                    <div className="cs-impact-item">
                      <strong className="cs-impact-num">77%</strong>
                      <span className="cs-impact-label">Workflow Compliance</span>
                    </div>
                    <div className="cs-impact-item cs-impact-item--live">
                      <strong className="cs-impact-num cs-impact-num--live">
                        <span className="cs-live-dot" />Active
                      </strong>
                      <span className="cs-impact-label">IBM Internal Usage</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── SECONDARY: bento grid ──────────────────────── */}
          <motion.div className="cs-bento-grid" variants={fadeUp}>

            {/* Kada Tipon */}
            <div
              className="cs-bento-card cs-bento-card--game"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
              }}
            >
              <div className="cs-bento-thumb">
                <img src={kadaTiponStart} alt="Kada Tipon start screen" className="cs-bento-img" />
                <img src={kadaTiponPlaying} alt="Kada Tipon gameplay" className="cs-bento-img cs-bento-img--overlay" />
              </div>
              <div className="cs-bento-body">
                <span className="cs-category-label">Game Dev</span>
                <h3 className="cs-bento-title">Kada Tipon Game</h3>
                <p className="cs-bento-desc">
                  A 2D runner where students collect coins while dodging expense obstacles—
                  financial literacy through play.
                </p>
                <div className="cs-tech-row">
                  {projects[1].tech.map((t) => (
                    <span key={t.name} className="cs-tech-pill">
                      <img src={t.logo} alt="" className="cs-tech-pill-icon" />
                      {t.name}
                    </span>
                  ))}
                </div>
                <div className="cs-bento-footer">
                  <span className="cs-outcome-badge">🏛 Presented at ADNU DCS - CS Week</span>
                  <button
                    className="cs-bento-btn"
                    onClick={() => {
                      savedScrollY.current = window.scrollY;
                      setSelectedProject(projects[1]);
                      setPage('project');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>

            {/* TIOS */}
            <div
              className="cs-bento-card cs-bento-card--fintech"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
              }}
            >
              <div className="cs-tios-visual">
                <img src={dark ? tiosLogoHrzlWhite : tiosLogoHrzl} alt="TIOS logo" className="cs-tios-logo" />
                <div className="cs-tios-roadmap">
                  <div className="cs-roadmap-track">
                    <div className="cs-roadmap-node cs-roadmap-node--on">
                      <span className="cs-roadmap-icon">
                        {/* Shield / foundation */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                      </span>
                      <span>Foundation</span>
                    </div>
                    <div className="cs-roadmap-line" />
                    <div className="cs-roadmap-node cs-roadmap-node--on">
                      <span className="cs-roadmap-icon">
                        {/* Trending up / invest */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                          <polyline points="17 6 23 6 23 12"/>
                        </svg>
                      </span>
                      <span>Invest</span>
                    </div>
                    <div className="cs-roadmap-line" />
                    <div className="cs-roadmap-node">
                      <span className="cs-roadmap-icon">
                        {/* Star / freedom */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      </span>
                      <span>Freedom</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cs-bento-body">
                <span className="cs-category-label cs-category-label--concept">Fintech & Game Concept</span>
                <h3 className="cs-bento-title">TIOS - Track It. Own It. Save It.</h3>
                <p className="cs-bento-desc">
                  Gamified wealth-planning concept inspired by Rich Dad, Poor Dad - two
                  financial paths, missions, and a growing world as your wealth builds.
                </p>
                <div className="cs-bento-footer">
                  <span className="cs-outcome-badge cs-outcome-badge--concept">⚗ Brainstorming Concept</span>
                  <button
                    className="cs-bento-btn"
                    onClick={() => {
                      savedScrollY.current = window.scrollY;
                      setSelectedProject(projects[2]);
                      setPage('project');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
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
            Core competencies spanning QA methodologies, Salesforce, test tooling, and developement.
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
                  I'm John Emman Lanusga, a graduate of Ateneo de Naga University with a Bachelor of Science in Information Technology. 
                  I am a Philippine-based QA Analyst with a passion for building reliable software. 
                  In my role, I bridge the gap between technical execution and business value, helping ensure that every release is delivered with confidence and quality.
                  Outside of IDE, I recharge through physical activities and travel, which help me refresh my mind and gain new perspectives. 
                  I also enjoy graphic design, drawing, and brainstorming ideas for potential projects. These creative pursuits allow me to continuously learn, explore, and bring fresh ideas into both my professional and personal life.
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

            <motion.div
              className="contact-card contact-card--cta"
              variants={fadeUp}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
              }}
            >
              {/* Top: heading + sub */}
              <div>
                <h3 className="section-title">Open to new opportunities.</h3>
                <p className="section-sub">
                  Available for QA consulting, Process Improvement, Salesforce testing projects, and full-time roles.
                </p>
              </div>

              {/* Stats row */}
              <div className="cta-stats">
                <div className="cta-stat">
                  <span className="cta-stat-num">3+</span>
                  <span className="cta-stat-label">Years Experience</span>
                </div>
                <div className="cta-stat-divider" aria-hidden="true" />
                <div className="cta-stat">
                  <span className="cta-stat-num">∞</span>
                  <span className="cta-stat-label">Bugs Squashed</span>
                </div>
              </div>

              {/* Tags */}
              <div className="cta-tags" aria-label="Specialisations">
                <span className="cta-tag">QA</span>
                <span className="cta-tag">Testing</span>
                <span className="cta-tag">Automation</span>
                <span className="cta-tag cta-tag--open">
                  <span className="cta-tag-dot" aria-hidden="true" />
                  Open
                </span>
                <span className="cta-tag">Worldwide</span>
              </div>

              {/* CTA */}
              <button className="btn-white" onClick={openContact}>
                Say Hello →
              </button>
            </motion.div>

            <motion.div
              className="contact-card"
              variants={fadeUp}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
              }}
            >
              <p className="section-label">Socials</p>
              <div className="social-row">

                <a href="https://www.linkedin.com/in/jelanusga/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="social-link-left">
                    <span className="social-link-icon social-link-icon--linkedin" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.975 1.975 0 1 1 0-3.95 1.975 1.975 0 0 1 0 3.95zm1.71 13.019H3.624V9h3.423v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </span>
                    LinkedIn
                  </span>
                  <span className="social-link-arrow" aria-hidden="true">↗</span>
                </a>

                <a href="https://www.facebook.com/emmaniy0" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="social-link-left">
                    <span className="social-link-icon social-link-icon--facebook" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.93-1.956 1.886v2.286h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                    </span>
                    Facebook
                  </span>
                  <span className="social-link-arrow" aria-hidden="true">↗</span>
                </a>

                <a href="https://www.instagram.com/garu_emani/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="social-link-left">
                    <span className="social-link-icon social-link-icon--instagram" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                    </span>
                    Instagram
                  </span>
                  <span className="social-link-arrow" aria-hidden="true">↗</span>
                </a>

                <a href="https://www.tiktok.com/@emnswsw" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="social-link-left">
                    <span className="social-link-icon social-link-icon--tiktok" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
                    </span>
                    TikTok
                  </span>
                  <span className="social-link-arrow" aria-hidden="true">↗</span>
                </a>

                <a href="mailto:emmanlanusga@gmail.com" className="social-link">
                  <span className="social-link-left">
                    <span className="social-link-icon social-link-icon--email" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>
                    </span>
                    emmanlanusga@gmail.com
                  </span>
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

      {/* ── Contact Modal ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            className="cm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => { if (e.target === e.currentTarget) closeContact(); }}
            role="dialog"
            aria-modal="true"
            aria-label="Contact form"
          >
            <motion.div
              className="cm-panel"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              onKeyDown={(e) => { if (e.key === 'Escape') closeContact(); }}
            >
              {/* Header */}
              <div className="cm-header">
                <div>
                  <p className="cm-eyebrow">Get in touch</p>
                  <h2 className="cm-title">Say Hello</h2>
                </div>
                <button className="cm-close" onClick={closeContact} aria-label="Close modal">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              {/* Form */}
              {contactStatus === 'sent' ? (
                <motion.div
                  className="cm-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="cm-success-icon" aria-hidden="true">✓</div>
                  <p className="cm-success-title">Message sent!</p>
                  <p className="cm-success-sub">I'll get back to you as soon as possible.</p>
                  <button className="cm-btn-primary" onClick={closeContact} style={{ marginTop: '1.5rem' }}>Close</button>
                </motion.div>
              ) : (
                <form className="cm-form" onSubmit={handleContactSubmit} noValidate>
                  {/* Honeypot — hidden from humans, bots fill it, submission is silently dropped */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                  />
                  <div className="cm-field">
                    <label className="cm-label" htmlFor="cm-name">Name</label>
                    <input
                      ref={contactFirstFieldRef}
                      id="cm-name"
                      className="cm-input"
                      type="text"
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(f => ({ ...f, name: e.target.value }))}
                      required
                      disabled={contactStatus === 'sending'}
                    />
                  </div>
                  <div className="cm-field">
                    <label className="cm-label" htmlFor="cm-email">Email</label>
                    <input
                      id="cm-email"
                      className="cm-input"
                      type="email"
                      placeholder="your@email.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))}
                      required
                      disabled={contactStatus === 'sending'}
                    />
                  </div>
                  <div className="cm-field">
                    <label className="cm-label" htmlFor="cm-message">Message</label>
                    <textarea
                      id="cm-message"
                      className="cm-input cm-textarea"
                      placeholder="What's on your mind?"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm(f => ({ ...f, message: e.target.value }))}
                      required
                      disabled={contactStatus === 'sending'}
                    />
                  </div>

                  {contactStatus === 'rate-limited' && (
                    <p className="cm-status cm-status--warn">
                      Too many messages. Please wait a few minutes before trying again.
                    </p>
                  )}
                  {contactStatus === 'error' && (
                    <p className="cm-status cm-status--error">
                      Something went wrong. Please try again or email me directly.
                    </p>
                  )}

                  <div className="cm-footer">
                    <span className="cm-rate-hint">
                      {(() => { const { remaining } = checkRateLimit(); return `${remaining} of ${RATE_LIMIT_MAX} sends remaining`; })()}
                    </span>
                    <button
                      type="submit"
                      className="cm-btn-primary"
                      disabled={contactStatus === 'sending' || !contactForm.name || !contactForm.email || !contactForm.message}
                    >
                      {contactStatus === 'sending' ? 'Sending…' : 'Send Message →'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
