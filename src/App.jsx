import { useState } from 'react';
import logo from './assets/images/My_LOGO.png';
import logoFace from './assets/images/My_LOGO_FINAL-for_DECALS.png';
import portal from './assets/images/PORTAL.png';
import resume from './assets/images/LANUSGA_JEL_CV.pdf';
import PortalGateway from './PortalGateway.jsx';
import kairosPriority from './assets/images/Kairos/JIRA-Priority.png';
import kairosLogin from './assets/images/Kairos/Login-Page.png';
import kadaTiponStart from './assets/images/Kada Tipon/Kada-Tipon-Start.png';
import kadaTiponHowTo from './assets/images/Kada Tipon/Kada-Tipon-How-To.png';
import './App.css';
import Typewriter from 'typewriter-effect';

/* ── Data ────────────────────────────────────────────────── */
const skills = [
  { icon: '☁️', name: 'Salesforce',             type: 'Platform' },
  { icon: '🧪', name: 'Manual Testing',          type: 'QA' },
  { icon: '📋', name: 'Test Case Planning',       type: 'QA' },
  { icon: '🔍', name: 'Defect Management',        type: 'QA' },
  { icon: '🔁', name: 'Regression Testing',       type: 'QA' },
  { icon: '🗂️', name: 'Jira',                    type: 'Tool' },
  { icon: '🟨', name: 'JavaScript',              type: 'Language' },
  { icon: '🐍', name: 'Python',                  type: 'Language' },
  { icon: '☕', name: 'Java',                     type: 'Language' },
  { icon: '🔵', name: 'Apex (Salesforce)',        type: 'Language' },
  { icon: '🌐', name: 'HTML / CSS',              type: 'Web' },
  { icon: '🐘', name: 'PHP',                     type: 'Language' },
  { icon: '🟢', name: 'Node.js',                 type: 'Runtime' },
  { icon: '💠', name: 'C++',                     type: 'Language' },
  { icon: '🗄️', name: 'MySQL / SQL',             type: 'Database' },
  { icon: '📊', name: 'Data Visualization',      type: 'Data' },
  { icon: '🔗', name: 'ER Modeling',             type: 'Data' },
  { icon: '🐙', name: 'Git',                     type: 'Version Control' },
  { icon: '🔄', name: 'Agile / SDLC',            type: 'Methodology' },
  { icon: '📦', name: 'Order To Cash (OTC)',      type: 'Operations' },
  { icon: '⚙️', name: 'Process Management',       type: 'Operations' },
  { icon: '🎨', name: 'Adobe Illustrator',        type: 'Creative' },
  { icon: '🖼️', name: 'Adobe Photoshop',          type: 'Creative' },
  { icon: '🎬', name: 'Adobe Premiere',           type: 'Creative' },
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
    desc: 'Responsible for executing daily process transactions and driving process and operational improvements that meet both client and IBM requirements. Applies skills in business operations, process management, compliance, and best-practice tools to support clients\u2019 core processes.',
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
    desc: 'Maintained, documented, and resolved issues within the BullGuardPH application \u2014 the Philippines\u2019 official antivirus distributor. Utilized Laravel Framework with AJAX, plugins, and Git.',
  },
];

const projects = [
  {
    images: [kairosPriority, kairosLogin],
    tag: 'Full-Stack App',
    title: 'Kairos — Jira Copilot Assistant',
    desc: 'Internal IBM OTC team tool built with Vue.js 3 + FastAPI. Features a JIRA Standardizer, live Priority List enrichment, Resolve360 quality/RCA workflow (two-stage Compliance → EM approval), Monday.com workforce analytics, and an AI chat assistant powered by GitHub Copilot and IBM ICA.',
    outcome: 'IBM OTC Team · In Active Use',
  },
  {
    images: [kadaTiponStart, kadaTiponHowTo],
    tag: 'Game Dev',
    title: 'Kada Tipon Game',
    desc: 'A 2D running game where you, as a student, collect and save coins while avoiding obstacles (expenses) within a time limit. Presented at ADNU DCS–CS Week.',
    outcome: 'ADNU DCS–CS Week Booth',
  },
];

/* ── Component ───────────────────────────────────────────── */
/* ── GameSection ─────────────────────────────────────────── */
function GameSection() {
  const [muted, setMuted] = useState(true);

  // Re-keying the iframe forces a reload with the updated allow attribute,
  // which is the only reliable way to toggle audio permission on an iframe.
  return (
    <section className="game-section" aria-label="2019 Game Project">
      <div className="container">
        <div className="game-section-header">
          <div>
            <p className="section-label">2019 Project</p>
            <h2 className="section-title">Game Development &amp; Design Class</h2>
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


function App() {
  return (
    <div className="site-wrapper">

      {/* ── Navbar ── */}
      <header className="masthead">
        <div className="masthead-inner">
          <a href="#" className="navbar-brand" aria-label="JEL Home">
            <img src={logo} alt="JEL logo" style={{ height: 36, width: 52 }} />
          </a>
          <nav aria-label="Main navigation">
            <ul className="masthead-nav">
              <li><a href="#work">Work</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#certs">Certifications</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href={resume} target="_blank" rel="noreferrer" className="nav-cta">Resume</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="hero" aria-label="Introduction">
        <div className="hero-inner">

          {/* Left */}
          <div className="hero-left">
            <span className="hero-label">
              <span className="hero-label-dot" aria-hidden="true" />
              QA Analyst &amp; Automation
            </span>

            <h1 className="hero-headline">
              Ensuring quality.<br />
              Building <em>confidence.</em><br />
              Improving experiences.
            </h1>

            <p className="hero-sub">
              Philippine-based QA Analyst specialising in Salesforce testing,
              quality assurance, and user experience optimisation.
            </p>

            <div className="hero-actions">
              <a href="#work" className="btn-primary">View Projects →</a>
              <a href={resume} target="_blank" rel="noreferrer" className="btn-secondary">
                Download Resume
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="hero-right">
            <div className="hero-visual">
              <img src={logoFace} alt="John Emman Lanusga" className="hero-logo-img" />

              <div className="floating-badges" aria-hidden="true">
                <div className="badge badge--sf">
                  <span className="badge-dot" style={{ background: '#0176D3' }} />
                  Salesforce
                </div>
                <div className="badge badge--test">
                  <span className="badge-dot" style={{ background: '#7BCB6D' }} />
                  Testing
                </div>
                <div className="badge badge--qa">
                  <span className="badge-dot" style={{ background: '#e05c2a' }} />
                  Quality
                </div>
                <div className="badge badge--auto">
                  <span className="badge-dot" style={{ background: '#9b59b6' }} />
                  Automation
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Projects ── */}
      <section id="work" className="section" aria-label="Featured Projects">
        <div className="container">
          <p className="section-label">Featured Work</p>
          <h2 className="section-title">Projects &amp; Outcomes</h2>
          <p className="section-sub">
            A selection of quality engineering work across Salesforce, API testing, and process improvement.
          </p>
          <div className="projects-grid">
            {projects.map((p) => (
              <article key={p.title} className="project-card">
                <div className="project-thumb project-thumb--screenshots">
                  {p.images.map((src, i) => (
                    <img key={i} src={src} alt={`${p.title} screenshot ${i + 1}`} className="project-thumb-img" />
                  ))}
                </div>
                <div className="project-body">
                  <span className="project-tag">{p.tag}</span>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <p className="project-outcome">✦ {p.outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="section" aria-label="Skills and Tools">
        <div className="container">
          <p className="section-label">Capabilities</p>
          <h2 className="section-title">Skills &amp; Tools</h2>
          <p className="section-sub">
            Core competencies spanning QA methodologies, Salesforce administration, and test tooling.
          </p>
          <div className="skills-grid">
            {skills.map((s) => (
              <div key={s.name} className="skill-card">
                <div className="skill-icon" role="img" aria-label={s.name}>{s.icon}</div>
                <div className="skill-name">{s.name}</div>
                <div className="skill-type">{s.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
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

      {/* ── Experience ── */}
      <section id="experience" className="section" aria-label="Experience">
        <div className="container">
          <p className="section-label">Career</p>
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            {timeline.map((t) => (
              <div key={t.role} className="timeline-item">
                <div className="timeline-dot" aria-hidden="true" />
                <div className="timeline-date">{t.date}</div>
                <div className="timeline-role">{t.role}</div>
                <div className="timeline-company">{t.company}</div>
                <p className="timeline-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About (Portal easter egg) ── */}
      <section className="section" aria-label="About">
        <div className="container">
          <div className="about-grid">
            <div className="portal-wrap">
              <PortalGateway portalSrc={portal} />
            </div>
            <div>
              <p className="section-label">About</p>
              <h2 className="section-title">
                Detail-oriented. Systematic. Creative.
              </h2>
              <p className="section-sub" style={{ maxWidth: '100%' }}>
                I'm John Emman Lanusga — a Philippine-based QA Analyst with a passion for building
                reliable software. As a Certified Salesforce Administrator and Test Analyst, I bridge
                the gap between technical execution and business value, ensuring every release ships
                with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Game ── */}
      <GameSection />

      {/* ── Contact ── */}
      <section id="contact" className="section" aria-label="Contact">
        <div className="container">
          <p className="section-label">Get in Touch</p>
          <h2 className="section-title">Let's work together.</h2>
          <div className="contact-grid">

            <div className="contact-card contact-card--cta">
              <div>
                <h3 className="section-title">Open to new opportunities.</h3>
                <p className="section-sub">
                  Available for QA consulting, Salesforce testing projects, and full-time roles.
                </p>
              </div>
              <a href="mailto:emmanlanusga@gmail.com" className="btn-white">
                Say Hello →
              </a>
            </div>

            <div className="contact-card">
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
                  href="mailto:emmanlanusga@gmail.com"
                  className="social-link"
                >
                  emmanlanusga@gmail.com
                  <span className="social-link-arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mastfoot">
        <p>
          Portfolio <a href="/">site</a> of{' '}
          <a href="mailto:emmanlanusga@gmail.com">emmanlanusga@gmail.com</a>
          {' '}· John Emman Lanusga · Philippines
        </p>
      </footer>

    </div>
  );
}

export default App;
