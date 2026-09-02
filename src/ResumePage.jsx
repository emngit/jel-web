import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import badge      from './assets/images/BADGE.jpg';
import surprised  from './assets/images/Suprised.png';
import sleepy     from './assets/images/Sleepy.png';
import sunglasses from './assets/images/Sunglasses.png';
import mib        from './assets/images/MIB.png';
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
    type: 'Full-Time',
    period: 'July 2025 – Present',
    location: 'Naga City, Philippines',
    roles: [
      {
        role: 'Automation',
        period: 'Sep 2026 – Present',
        bullets: [
          'Responsible for driving operational process improvements and automating manual processes to increase efficiency.',
          'Identifies automation opportunities through workflow analysis and leads manual-to-digital transition initiatives.',
          'Develops and maintains automation pipelines that eliminate repetitive tasks and streamline operations.',
          'Collaborates with cross-functional teams to align automation deliverables with business and client objectives.',
        ],
      },
      {
        role: 'Process Delivery Specialist – Order To Cash',
        period: 'Jul 2025 – Aug 2026',
        bullets: [
          'Responsible for executing daily process transactions and driving process and operational improvements that meet both client and IBM requirements.',
          'Applies skills in business operations, process management, compliance, and best-practice tools to support clients\' core processes.',
          'Collaborated with cross-functional teams to identify and eliminate workflow inefficiencies.',
        ],
      },
    ],
  },
  {
    company: 'Concentrix',
    logo: 'CNX',
    type: 'Full-Time',
    period: 'November 2024 – July 2025',
    location: 'Naga City, Philippines',
    roles: [
      {
        role: 'Advisor I',
        period: 'Nov 2024 – Jul 2025',
        bullets: [
          'Responsible for managing insurance policies, claims, benefits, and customer service through the Salesforce platform.',
          'Delivered high-quality customer support across insurance product lines.',
          'Maintained detailed case records and followed escalation protocols for claims assistance and stakeholder communication.',
        ],
      },
    ],
  },
  {
    company: 'Accenture',
    logo: 'ACN',
    type: 'Full-Time',
    period: 'June 2022 – July 2024',
    location: 'Mandaluyong, Cybergate',
    roles: [
      {
        role: 'Application Development Associate',
        period: 'Jun 2022 – Jul 2024',
        bullets: [
          'In charge of maintaining and enhancing client Salesforce applications through Salesforce Configuration & Setup, Object Manager, and Lightning App Builder.',
          'Performed manual test execution, defect management via JIRA, and test case planning using Agile methodologies.',
          'Executed manual test cases, managed defects in Jira, and authored regression test plans.',
          'Supported user acceptance testing (UAT) and provided post-release user support.',
          'Collaborated within Agile sprints using Jira, contributing to sprint planning and retrospectives.',
        ],
      },
    ],
  },
  {
    company: 'Hyundai Alabang (Naga)',
    logo: 'HYD',
    type: 'Full-Time',
    period: 'December 2021 – April 2022',
    location: 'Del Rosario, Naga City',
    roles: [
      {
        role: 'Digital Marketing Administrator',
        period: 'Dec 2021 – Apr 2022',
        bullets: [
          'Handled digital marketing and advertising using Adobe Illustrator, Photoshop, and Premiere.',
          'In charge of sales marketing and promoting various products, services, units, and limited-time offers.',
          'Coordinated with the sales team to align digital content with monthly targets and brand promotion goals.',
        ],
      },
    ],
  },
  {
    company: '3GX Computers & Solutions',
    logo: '3GX',
    type: 'Internship',
    period: 'January 2020 – March 2020',
    location: 'Naga City, Philippines',
    roles: [
      {
        role: 'Junior Web Developer (Internship)',
        period: 'Jan 2020 – Mar 2020',
        bullets: [
          "Maintained, documented, and resolved issues within the BullGuardPH application — the Philippines' official antivirus distributor.",
          'Utilized Laravel Framework with AJAX, plugins, and Git for web application maintenance and bug tracking.',
          'Implemented AJAX-driven UI enhancements, integrated third-party plugins, and maintained version control using Git.',
        ],
      },
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

const certifications = [
  {
    title: 'Salesforce Certified Administrator (SCA)',
    issuer: 'Salesforce',
    year: 'June 2024',
  },
];

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
            {/* Base photo — always underneath */}
            <img
              src={badge}
              alt="John Emman Lanusga"
              className="rp-hero-photo rp-hero-photo--base"
            />
            {/* Light mode hover: Surprised */}
            <img
              src={surprised}
              alt=""
              aria-hidden="true"
              className={`rp-hero-photo rp-hero-photo--overlay rp-hero-photo--surprised${!dark && photoHovered ? ' rp-hero-photo--visible' : ''}`}
            />
            {/* Dark mode idle: Sunglasses */}
            <img
              src={sunglasses}
              alt=""
              aria-hidden="true"
              className={`rp-hero-photo rp-hero-photo--overlay rp-hero-photo--sunglasses${dark && !photoHovered ? ' rp-hero-photo--visible' : ''}`}
            />
            {/* Dark mode hover: MIB */}
            <img
              src={mib}
              alt=""
              aria-hidden="true"
              className={`rp-hero-photo rp-hero-photo--overlay rp-hero-photo--mib${dark && photoHovered ? ' rp-hero-photo--visible' : ''}`}
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
              Results-driven professional with experience spanning Salesforce administration, QA, Order-to-Cash
              process delivery, and business process automation. In my role, I bridge
              technical execution and business value - delivering process improvements, automation solutions, and
              structured testing methodologies that drive efficiency across enterprise operations.
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
                  {/* ── Company header ── */}
                  <div className="rp-job-header">
                    <div className="rp-job-logo" aria-hidden="true">{job.logo}</div>
                    <div className="rp-job-meta">
                      <h3 className="rp-job-company-name">{job.company}</h3>
                      <div className="rp-job-company">
                        <span>{job.type}</span>
                        <span className="rp-job-sep">·</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <span className="rp-job-period">{job.period}</span>
                  </div>
                  {/* ── Nested roles ── */}
                  <div className="rp-roles-list">
                    {job.roles.map((r, j) => (
                      <div key={j} className="rp-role-item">
                        <div className="rp-role-connector" aria-hidden="true">
                          <div className="rp-role-line" />
                          <div className="rp-role-dot" />
                        </div>
                        <div className="rp-role-body">
                          <div className="rp-role-header">
                            <span className="rp-role-title">{r.role}</span>
                            <span className="rp-role-period">{r.period}</span>
                          </div>
                          <ul className="rp-job-bullets">
                            {r.bullets.map((b, k) => (
                              <li key={k}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
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
                {/* <div className="rp-cert-badge" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                </div> */}
                {/* <div className="rp-cert-body">
                  <div className="rp-cert-name">{cert.name}</div>
                  <div className="rp-cert-meta">
                    <span className="rp-cert-issuer">{cert.issuer}</span>
                    <span className="rp-cert-date">{cert.date}</span>
                    <span className="rp-cert-credential">#{cert.credential}</span>
                  </div>
                </div> */}
                {/* <div className="rp-cert-verified" aria-label="Verified">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div> */}
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
