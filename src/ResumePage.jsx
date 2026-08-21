import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import badge    from './assets/images/BADGE.jpg';
import surprised from './assets/images/Suprised.png';
import sleepy    from './assets/images/Sleepy.png';
import logoDark  from './assets/images/My_LOGO-white.png';
import logoLight from './assets/images/My_LOGO.png';
import resumePdf from './assets/images/LANUSGA_JEL_CV.pdf';
import './ResumePage.css';

/*
//  /$$$$$$$   /$$$$$$  /$$$$$$$$ /$$$$$$
// | $$__  $$ /$$__  $$|__  $$__//$$__  $$
// | $$  \ $$| $$  \ $$   | $$  | $$  \ $$
// | $$  | $$| $$$$$$$$   | $$  | $$$$$$$$
// | $$  | $$| $$__  $$   | $$  | $$__  $$
// | $$  | $$| $$  | $$   | $$  | $$  | $$
// | $$$$$$$/| $$  | $$   | $$  | $$  | $$
// |_______/ |__/  |__/   |__/  |__/  |__/
 */
const experience = [
  {
    company: 'IBM',
    logo: 'IBM',
    role: 'Process Delivery Specialist — Order to Cash',
    period: 'July 2025 – Present',
    location: 'Naga City, Philippines',
    bullets: [
      'Execute daily Order-to-Cash process transactions with accuracy and SLA compliance.',
      'Drive process and operational improvements that align with client requirements and IBM standards.',
      'Apply best-practice tools for business operations, compliance, and process management.',
      'Collaborate with cross-functional teams to identify and eliminate workflow inefficiencies.',
    ],
  },
  {
    company: 'Concentrix',
    logo: 'CNX',
    role: 'Advisor I',
    period: 'November 2024 – July 2025',
    location: 'Naga City, Philippines',
    bullets: [
      'Managed insurance policies, claims, and benefits through the Salesforce CRM platform.',
      'Delivered high-quality customer support across insurance product lines.',
      'Maintained detailed case records and followed escalation protocols.',
    ],
  },
  {
    company: 'Accenture',
    logo: 'ACN',
    role: 'Application Development Associate',
    period: 'June 2022 – July 2024',
    location: 'Mandaluyong, Metro Manila',
    bullets: [
      'Maintained and enhanced client Salesforce applications via Configuration & Setup and Object Manager.',
      'Built and deployed features using Lightning App Builder and Lightning Components.',
      'Executed manual test cases, managed defects in Jira, and authored regression test plans.',
      'Supported user acceptance testing (UAT) and provided post-release user support.',
      'Collaborated within Agile sprints using Jira, contributing to sprint planning and retrospectives.',
    ],
  },
  {
    company: 'Hyundai Alabang',
    logo: 'HYD',
    role: 'Digital Marketing Administrator',
    period: 'December 2021 – April 2022',
    location: 'Naga City, Philippines',
    bullets: [
      'Designed marketing campaigns and promotional materials using Adobe Illustrator, Photoshop, and Premiere.',
      'Managed digital advertising and social media promotion for vehicle units and limited-time offers.',
      'Coordinated with the sales team to align digital content with monthly targets.',
    ],
  },
  {
    company: '3GX Computers & Solutions',
    logo: '3GX',
    role: 'Junior Web Developer — Internship',
    period: 'January 2020 – March 2020',
    location: 'Naga City, Philippines',
    bullets: [
      'Maintained and documented the BullGuardPH antivirus web application built on Laravel.',
      'Implemented AJAX-driven UI enhancements and integrated third-party plugins.',
      'Resolved application issues, tracked bugs, and maintained version control using Git.',
    ],
  },
];

const education = [
  {
    school: 'Ateneo de Naga University',
    degree: 'Bachelor of Science in Information Technology',
    year: '2016 – 2020',
    highlights: [
      'Tailor Shop Management System — Capstone project using PHP, MySQL, and Bootstrap.',
      'KADA TIPON — 2D runner game developed for DCS–CS Week using Construct 3.',
    ],
  },
];

const skillCategories = [
  {
    label: 'QA & Testing',
    skills: ['Manual Testing', 'Test Case Design', 'Defect Management', 'Regression Testing', 'UAT', 'Jira'],
  },
  {
    label: 'Salesforce',
    skills: ['Salesforce Administration', 'Salesforce Apex', 'Lightning Components', 'CRM Configuration'],
  },
  {
    label: 'Development',
    skills: ['JavaScript', 'Python', 'Java', 'C++', 'Node.js', 'HTML', 'CSS', 'PHP'],
  },
  {
    label: 'Database',
    skills: ['SQL', 'MySQL'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'Postman', 'Adobe Creative Suite'],
  },
];

const certifications = [];

/*
//   /$$$$$$  /$$   /$$ /$$$$$$ /$$      /$$  /$$$$$$  /$$$$$$$$ /$$$$$$  /$$$$$$  /$$   /$$  /$$$$$$
//  /$$__  $$| $$$ | $$|_  $$_/| $$$    /$$$ /$$__  $$|__  $$__/|_  $$_/ /$$__  $$| $$$ | $$ /$$__  $$
// | $$  \ $$| $$$$| $$  | $$  | $$$$  /$$$$| $$  \ $$   | $$     | $$  | $$  \ $$| $$$$| $$| $$  \__/
// | $$$$$$$$| $$ $$ $$  | $$  | $$ $$/$$ $$| $$$$$$$$   | $$     | $$  | $$  | $$| $$ $$ $$|  $$$$$$
// | $$__  $$| $$  $$$$  | $$  | $$  $$$| $$| $$__  $$   | $$     | $$  | $$  | $$| $$  $$$$ \____  $$
// | $$  | $$| $$\  $$$  | $$  | $$\  $ | $$| $$  | $$   | $$     | $$  | $$  | $$| $$\  $$$ /$$  \ $$
// | $$  | $$| $$ \  $$ /$$$$$$| $$ \/  | $$| $$  | $$   | $$    /$$$$$$|  $$$$$$/| $$ \  $$|  $$$$$$/
// |__/  |__/|__/  \__/|______/|__/     |__/|__/  |__/   |__/   |______/ \______/ |__/  \__/ \______/
 */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/*
//  /$$$$$$  /$$   /$$ /$$$$$$$        /$$$$$$   /$$$$$$  /$$      /$$ /$$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$$$ /$$   /$$ /$$$$$$$$ /$$$$$$$
// /$$__  $$| $$  | $$| $$__  $$      /$$__  $$ /$$__  $$| $$$    /$$$| $$__  $$ /$$__  $$| $$$ | $$| $$_____/| $$$ | $$|__  $$__/| $$____/
//| $$  \__/| $$  | $$| $$  \ $$     | $$  \__/| $$  \ $$| $$$$  /$$$$| $$  \ $$| $$  \ $$| $$$$| $$| $$      | $$$$| $$   | $$  | $$
//|  $$$$$$ | $$  | $$| $$$$$$$ /    | $$      | $$  | $$| $$ $$/$$ $$| $$$$$$$/| $$  | $$| $$ $$ $$| $$$$$   | $$ $$ $$   | $$  |  $$$$$
// \____  $$| $$  | $$| $$__  $$     | $$      | $$  | $$| $$  $$$| $$| $$____/ | $$  | $$| $$  $$$$| $$__/   | $$  $$$$   | $$   \____  $$
// /$$  \ $$| $$  | $$| $$  \ $$     | $$    $$| $$  | $$| $$\  $ | $$| $$      | $$  | $$| $$\  $$$| $$      | $$\  $$$   | $$   /$$  \ $$
//|  $$$$$$/|  $$$$$$/| $$$$$$$/     |  $$$$$$/|  $$$$$$/| $$ \/  | $$| $$      |  $$$$$$/| $$ \  $$| $$$$$$$$| $$ \  $$   | $$  |  $$$$$$/
// \______/  \______/ |_______/       \______/  \______/ |__/     |__/|__/       \______/ |__/  \__/|________/|__/  \__/   |__/   \______/
 */
function Section({ id, children }) {
  return (
    <motion.section
      id={id}
      className="rp-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={stagger}
    >
      {children}
    </motion.section>
  );
}

function SectionHeader({ label, title }) {
  return (
    <motion.div className="rp-section-header" variants={fadeUp}>
      <span className="rp-section-label">{label}</span>
      <h2 className="rp-section-title">{title}</h2>
    </motion.div>
  );
}

/*
//  /$$      /$$  /$$$$$$  /$$$$$$ /$$   /$$
// | $$$    /$$$ /$$__  $$|_  $$_/| $$$ | $$
// | $$$$  /$$$$| $$  \ $$  | $$  | $$$$| $$
// | $$ $$/$$ $$| $$$$$$$$  | $$  | $$ $$ $$
// | $$  $$$| $$| $$__  $$  | $$  | $$  $$$$
// | $$\  $ | $$| $$  | $$  | $$  | $$\  $$$
// | $$ \/  | $$| $$  | $$ /$$$$$$| $$ \  $$
// |__/     |__/|__/  |__/|______/|__/  \__/
 */
export default function ResumePage({ onBack, dark, onToggleDark }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const [photoHovered, setPhotoHovered] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="rp-wrapper" data-theme={dark ? 'dark' : undefined}>

      {/*
      //  /$$$$$$$  /$$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$$  /$$$$$$$$ /$$$$$$  /$$$$$$
      // | $$__  $$| $$__  $$ /$$__  $$ /$$__  $$| $$__  $$| $$_____//$$__  $$/$$__  $$
      // | $$  \ $$| $$  \ $$| $$  \ $$| $$  \__/| $$  \ $$| $$     | $$  \__/ $$  \__/
      // | $$$$$$$/| $$$$$$$/| $$  | $$| $$ /$$$$| $$$$$$$/| $$$$$  |  $$$$$$|  $$$$$$
      // | $$____/ | $$__  $$| $$  | $$| $$|_  $$| $$__  $$| $$__/   \____  $$\____  $$
      // | $$      | $$  \ $$| $$  | $$| $$  \ $$| $$  \ $$| $$      /$$  \ $$/$$  \ $$
      // | $$      | $$  | $$|  $$$$$$/|  $$$$$$/| $$  | $$| $$$$$$$$|  $$$$$$/  $$$$$$/
      // |__/      |__/  |__/ \______/  \______/ |__/  |__/|________/ \______/ \______/
      //  /$$$$$$$   /$$$$$$  /$$$$$$$
      // | $$__  $$ /$$__  $$| $$__  $$
      // | $$  \ $$| $$  \ $$| $$  \ $$
      // | $$$$$$$ | $$$$$$$$| $$$$$$$/
      // | $$__  $$| $$__  $$| $$__  $$
      // | $$  \ $$| $$  | $$| $$  \ $$
      // | $$$$$$$/| $$  | $$| $$  | $$
      // |_______/ |__/  |__/|__/  |__/
      */}
      <motion.div className="rp-progress" style={{ scaleX }} />

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
      <header className={`rp-nav${scrolled ? ' rp-nav--scrolled' : ''}`}>
        <div className="rp-nav-inner">
          <a href="#" className="rp-nav-brand" aria-label="JEL Home" onClick={(e) => { e.preventDefault(); onBack(); }}>
            <img src={dark ? logoDark : logoLight} alt="JEL logo" style={{ height: 38, width: 56 }} />
          </a>
          <nav className="rp-nav-links" aria-label="Resume navigation">
            <a href="#summary">Summary</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#skills">Skills</a>
            <a href="#certifications">Certifications</a>
          </nav>
          <button
            className="dm-toggle"
            onClick={onToggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            <span className="dm-toggle-thumb">{dark ? '☀' : '☾'}</span>
          </button>
          <button className="rp-back-btn" onClick={onBack} aria-label="Back to portfolio">
            ← Portfolio
          </button>
        </div>
      </header>

      {/*
      //  /$$   /$$ /$$$$$$$$ /$$$$$$$   /$$$$$$        /$$   /$$ /$$$$$$$$  /$$$$$$  /$$$$$$$  /$$$$$$$$ /$$$$$$$
      // | $$  | $$| $$_____/| $$__  $$ /$$__  $$      | $$  | $$| $$_____/ /$$__  $$| $$__  $$| $$_____/| $$__  $$
      // | $$  | $$| $$      | $$  \ $$| $$  \ $$      | $$  | $$| $$      | $$  \ $$| $$  \ $$| $$      | $$  \ $$
      // | $$$$$$$$| $$$$$   | $$$$$$$/| $$  | $$      | $$$$$$$$| $$$$$   | $$$$$$$$| $$  | $$| $$$$$   | $$$$$$$/
      // | $$__  $$| $$__/   | $$__  $$| $$  | $$      | $$__  $$| $$__/   | $$__  $$| $$  | $$| $$__/   | $$__  $$
      // | $$  | $$| $$      | $$  \ $$| $$  | $$      | $$  | $$| $$      | $$  | $$| $$  | $$| $$      | $$  \ $$
      // | $$  | $$| $$$$$$$$| $$  | $$|  $$$$$$/      | $$  | $$| $$$$$$$$| $$  | $$| $$$$$$$/| $$$$$$$$| $$  | $$
      // |__/  |__/|________/|__/  |__/ \______/       |__/  |__/|________/|__/  |__/|_______/ |________/|__/  |__/
      */}
      <div className="rp-grid-bg" aria-hidden="true" />
      <motion.header
        className="rp-hero"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div
          className="rp-hero-photo-wrap"
          variants={fadeUp}
          onMouseEnter={() => setPhotoHovered(true)}
          onMouseLeave={() => setPhotoHovered(false)}
        >
          {/* Base photo */}
          <img
            src={badge}
            alt="John Emman Lanusga"
            className="rp-hero-photo rp-hero-photo--base"
          />
          {/* Hover (both modes): Surprised */}
          <img
            src={surprised}
            alt=""
            aria-hidden="true"
            className={`rp-hero-photo rp-hero-photo--overlay rp-hero-photo--surprised${photoHovered ? ' rp-hero-photo--visible' : ''}`}
          />
          {/* Dark mode idle (no hover): Sleepy */}
          <img
            src={sleepy}
            alt=""
            aria-hidden="true"
            className={`rp-hero-photo rp-hero-photo--overlay rp-hero-photo--sleepy${dark && !photoHovered ? ' rp-hero-photo--visible' : ''}`}
          />
        </motion.div>

        <motion.div className="rp-hero-identity" variants={fadeUp}>
          <h1 className="rp-name">John Emman Lanusga</h1>
          <p className="rp-title-line">
            Process Delivery Specialist – Order-To-Cash&nbsp;&nbsp;·&nbsp;&nbsp;Automation&nbsp;&nbsp;·&nbsp;&nbsp;QA Analyst&nbsp;&nbsp;·&nbsp;&nbsp;Salesforce Analyst&nbsp;&nbsp;
          </p>

          <div className="rp-contact-row">
            <span className="rp-contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              Naga City, Philippines
            </span>
            <span className="rp-contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>
              <a href="mailto:emmanlanusga@gmail.com">emmanlanusga@gmail.com</a>
            </span>
            <span className="rp-contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              <a href="https://www.linkedin.com/in/jelanusga/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </span>
            <span className="rp-contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              <a href="https://github.com/emngit" target="_blank" rel="noopener noreferrer">GitHub</a>
            </span>
          </div>

          <div className="rp-hero-actions">
            <a href={resumePdf} download="Resume 2026 - John Emman Lanusga.pdf" className="rp-btn-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Resume PDF
            </a>
            <button className="rp-btn-secondary" onClick={onBack}>
              ← Back to Portfolio
            </button>
          </div>
        </motion.div>
      </motion.header>

      <main className="rp-main">

        {/*
          //   /$$$$$$  /$$   /$$ /$$      /$$ /$$      /$$  /$$$$$$  /$$$$$$$  /$$     /$$
          //  /$$__  $$| $$  | $$| $$$    /$$$| $$$    /$$$ /$$__  $$| $$__  $$|  $$   /$$/
          // | $$  \__/| $$  | $$| $$$$  /$$$$| $$$$  /$$$$| $$  \ $$| $$  \ $$ \  $$ /$$/ 
          // |  $$$$$$ | $$  | $$| $$ $$/$$ $$| $$ $$/$$ $$| $$$$$$$$| $$$$$$$/  \  $$$$/  
          //  \____  $$| $$  | $$| $$  $$$| $$| $$  $$$| $$| $$__  $$| $$__  $$   \  $$/   
          //  /$$  \ $$| $$  | $$| $$\  $ | $$| $$\  $ | $$| $$  | $$| $$  \ $$    | $$    
          // |  $$$$$$/|  $$$$$$/| $$ \/  | $$| $$ \/  | $$| $$  | $$| $$  | $$    | $$    
          //  \______/  \______/ |__/     |__/|__/     |__/|__/  |__/|__/  |__/    |__/   
        */}
        <Section id="summary">
          <SectionHeader label="Overview" title="Professional Summary" />
          <motion.div className="rp-summary-card" variants={fadeUp}>
            <p className="rp-summary-text">
              Detail-oriented QA Analyst with hands-on experience in Salesforce administration, manual testing,
              defect management, and Order-to-Cash process optimization. As a Certified Salesforce Administrator,
              I bridge the gap between technical execution and business value — ensuring every release ships with
              confidence through structured testing methodologies, cross-functional collaboration, and a commitment
              to continuous improvement. Currently contributing to enterprise-scale operations at IBM while
              maintaining a track record of delivering high-quality software experiences.
            </p>
          </motion.div>
        </Section>

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
        <Section id="experience">
          <SectionHeader label="Career" title="Work Experience" />
          <div className="rp-timeline">
            {experience.map((job, i) => (
              <motion.div key={i} className="rp-timeline-item" variants={fadeUp}>
                <div className="rp-timeline-marker" aria-hidden="true">
                  <div className="rp-timeline-dot" />
                </div>
                <div className="rp-timeline-body">
                  <div className="rp-job-header">
                    <div className="rp-job-logo" aria-hidden="true">{job.logo}</div>
                    <div className="rp-job-meta">
                      <h3 className="rp-job-role">{job.role}</h3>
                      <div className="rp-job-company">
                        <strong>{job.company}</strong>
                        <span className="rp-job-sep">·</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <span className="rp-job-period">{job.period}</span>
                  </div>
                  <ul className="rp-job-bullets">
                    {job.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/*
        //  /$$$$$$$$ /$$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$  /$$$$$$$$ /$$$$$$  /$$$$$$  /$$   /$$
        // | $$_____/| $$__  $$| $$  | $$ /$$__  $$ /$$__  $$|__  $$__/|_  $$_/ /$$__  $$| $$$ | $$
        // | $$      | $$  \ $$| $$  | $$| $$  \__/| $$  \ $$   | $$     | $$  | $$  \ $$| $$$$| $$
        // | $$$$$   | $$  | $$| $$  | $$| $$      | $$$$$$$$   | $$     | $$  | $$  | $$| $$ $$ $$
        // | $$__/   | $$  | $$| $$  | $$| $$      | $$__  $$   | $$     | $$  | $$  | $$| $$  $$$$
        // | $$      | $$  | $$| $$  | $$| $$    $$| $$  | $$   | $$     | $$  | $$  | $$| $$\  $$$
        // | $$$$$$$$| $$$$$$$/|  $$$$$$/|  $$$$$$/| $$  | $$   | $$    /$$$$$$|  $$$$$$/| $$ \  $$
        // |________/|_______/  \______/  \______/ |__/  |__/   |__/   |______/ \______/ |__/  \__/
        */}
        <Section id="education">
          <SectionHeader label="Academic" title="Education" />
          <div className="rp-edu-grid">
            {education.map((e, i) => (
              <motion.div key={i} className="rp-edu-card" variants={fadeUp}>
                <div className="rp-edu-top">
                  <div>
                    <h3 className="rp-edu-degree">{e.degree}</h3>
                    <div className="rp-edu-school">{e.school}</div>
                  </div>
                  <span className="rp-edu-year">{e.year}</span>
                </div>
                <ul className="rp-edu-highlights">
                  {e.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Section>

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
        <Section id="skills">
          <SectionHeader label="Capabilities" title="Skills & Expertise" />
          <div className="rp-skills-grid">
            {skillCategories.map((cat, i) => (
              <motion.div key={i} className="rp-skill-category" variants={fadeUp}>
                <h3 className="rp-skill-cat-label">{cat.label}</h3>
                <div className="rp-skill-pills">
                  {cat.skills.map((skill, j) => (
                    <span key={j} className="rp-skill-pill">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/*
        //   /$$$$$$  /$$$$$$$$ /$$$$$$$  /$$$$$$$$ /$$$$$$ /$$$$$$$$ /$$$$$$  /$$$$$$   /$$$$$$  /$$$$$$$$ /$$$$$$  /$$$$$$  /$$   /$$  /$$$$$$ 
        //  /$$__  $$| $$_____/| $$__  $$|__  $$__/|_  $$_/| $$_____/|_  $$_/ /$$__  $$ /$$__  $$|__  $$__/|_  $$_/ /$$__  $$| $$$ | $$ /$$__  $$
        // | $$  \__/| $$      | $$  \ $$   | $$     | $$  | $$        | $$  | $$  \__/| $$  \ $$   | $$     | $$  | $$  \ $$| $$$$| $$| $$  \__/
        // | $$      | $$$$$   | $$$$$$$/   | $$     | $$  | $$$$$     | $$  | $$      | $$$$$$$$   | $$     | $$  | $$  | $$| $$ $$ $$|  $$$$$$ 
        // | $$      | $$__/   | $$__  $$   | $$     | $$  | $$__/     | $$  | $$      | $$__  $$   | $$     | $$  | $$  | $$| $$  $$$$ \____  $$
        // | $$    $$| $$      | $$  \ $$   | $$     | $$  | $$        | $$  | $$    $$| $$  | $$   | $$     | $$  | $$  | $$| $$\  $$$ /$$  \ $$
        // |  $$$$$$/| $$$$$$$$| $$  | $$   | $$    /$$$$$$| $$       /$$$$$$|  $$$$$$/| $$  | $$   | $$    /$$$$$$|  $$$$$$/| $$ \  $$|  $$$$$$/
        //  \______/ |________/|__/  |__/   |__/   |______/|__/      |______/ \______/ |__/  |__/   |__/   |______/ \______/ |__/  \__/ \______/ 
        */}
        <Section id="certifications">
          <SectionHeader label="Credentials" title="Certifications" />
          <div className="rp-certs-grid">
            {certifications.map((cert, i) => (
              <motion.div key={i} className="rp-cert-card" variants={fadeUp}>
                <div className="rp-cert-badge" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                </div>
                <div className="rp-cert-body">
                  <div className="rp-cert-name">{cert.name}</div>
                  <div className="rp-cert-meta">
                    <span className="rp-cert-issuer">{cert.issuer}</span>
                    <span className="rp-cert-date">{cert.date}</span>
                    <span className="rp-cert-credential">#{cert.credential}</span>
                  </div>
                </div>
                <div className="rp-cert-verified" aria-label="Verified">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/*
        //  /$$$$$$$   /$$$$$$  /$$      /$$ /$$   /$$ /$$        /$$$$$$   /$$$$$$  /$$$$$$$ 
        // | $$__  $$ /$$__  $$| $$  /$ | $$| $$$ | $$| $$       /$$__  $$ /$$__  $$| $$__  $$
        // | $$  \ $$| $$  \ $$| $$ /$$$| $$| $$$$| $$| $$      | $$  \ $$| $$  \ $$| $$  \ $$
        // | $$  | $$| $$  | $$| $$/$$ $$ $$| $$ $$ $$| $$      | $$  | $$| $$$$$$$$| $$  | $$
        // | $$  | $$| $$  | $$| $$$$_  $$$$| $$  $$$$| $$      | $$  | $$| $$__  $$| $$  | $$
        // | $$  | $$| $$  | $$| $$$/ \  $$$| $$\  $$$| $$      | $$  | $$| $$  | $$| $$  | $$
        // | $$$$$$$/|  $$$$$$/| $$/   \  $$| $$ \  $$| $$$$$$$$|  $$$$$$/| $$  | $$| $$$$$$$/
        // |_______/  \______/ |__/     \__/|__/  \__/|________/ \______/ |__/  |__/|_______/ 
        */}
        <Section id="download">
          <motion.div className="rp-download-card" variants={fadeUp}>
            <div className="rp-download-text">
              <h2 className="rp-download-title">Interested in learning more?</h2>
              <p className="rp-download-sub">
                Download a copy of my full resume — formatted and ready for recruitment teams.
              </p>
            </div>
            <a
              href={resumePdf}
              download="Resume 2026 - John Emman Lanusga.pdf"
              className="rp-btn-primary rp-btn-large"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download PDF Resume
            </a>
          </motion.div>
        </Section>

      </main>

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
      <footer className="rp-footer">
        <p>
          John Emman Lanusga · Automation · Naga City, Philippines ·{' '}
          <a href="mailto:emmanlanusga@gmail.com">emmanlanusga@gmail.com</a>
        </p>
      </footer>

    </div>
  );
}
