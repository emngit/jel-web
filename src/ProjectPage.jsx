import { useState } from 'react';
import './ProjectPage.css';                      

//  /$$$$$$$$ /$$$$$$  /$$$$$$$   /$$$$$$ 
// |__  $$__//$$__  $$| $$__  $$ /$$__  $$
//    | $$  | $$  \ $$| $$  \ $$| $$  \__/
//    | $$  | $$$$$$$$| $$$$$$$ |  $$$$$$ 
//    | $$  | $$__  $$| $$__  $$ \____  $$
//    | $$  | $$  | $$| $$  \ $$ /$$  \ $$
//    | $$  | $$  | $$| $$$$$$$/|  $$$$$$/
//    |__/  |__/  |__/|_______/  \______/ 
// ─── Key Features: Tabs (web) ─────────────────────────────────────────────────
function FeatureTabs({ features }) {
  const [active, setActive] = useState(0);
  const f = features[active];
  return (
    <div className="pp-feat-tabs">
      <div className="pp-feat-tab-bar" role="tablist">
        {features.map((feat, i) => (
          <button
            key={feat.tab}
            role="tab"
            aria-selected={i === active}
            className={`pp-feat-tab${i === active ? ' pp-feat-tab--active' : ''}`}
            onClick={() => setActive(i)}
          >
            {feat.tab}
          </button>
        ))}
      </div>
      <div className="pp-feat-tab-body" role="tabpanel">
        <span className="pp-feat-use">{f.use}</span>
        <p className="pp-feat-desc">{f.desc}</p>
      </div>
    </div>
  );
}

//  /$$$$$$$  /$$   /$$ /$$       /$$$$$$$$  /$$$$$$ 
// | $$__  $$| $$  | $$| $$      | $$_____/ /$$__  $$
// | $$  \ $$| $$  | $$| $$      | $$      | $$  \__/
// | $$$$$$$/| $$  | $$| $$      | $$$$$   |  $$$$$$ 
// | $$__  $$| $$  | $$| $$      | $$__/    \____  $$
// | $$  \ $$| $$  | $$| $$      | $$       /$$  \ $$
// | $$  | $$|  $$$$$$/| $$$$$$$$| $$$$$$$$|  $$$$$$/
// |__/  |__/ \______/ |________/|________/ \______/ 
// ─── Key Features: Rules (game / concept) ────────────────────────────────────
function FeatureRules({ features }) {
  return (
    <ul className="pp-feat-rules">
      {features.map((f) => (
        <li key={f.rule} className="pp-feat-rule-item">
          <span className="pp-feat-rule-label">{f.rule}</span>
          <span className="pp-feat-rule-desc">{f.desc}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Release date helper ──────────────────────────────────────────────────────
const RELEASE_DATES = {
  'Kairos – Jira Copilot Assistant':    'July 2026',
  'Kada Tipon Game':                    'September 2019',
  'TIOS – Track It. Own It. Save It.':  'TBD (Concept)',
};

export default function ProjectPage({ project, dark, onToggleDark, onBack }) {
  const images    = project.images ?? [];
  const [active, setActive] = useState(0);
  const [exiting, setExiting] = useState(false);

  const hasThumbs = images.length > 0;
  const activeSrc = images[active];

  const handleBack = () => {
    setExiting(true);
    setTimeout(onBack, 280);
  };

  const handleDemo = () => {
    if (!project.demoUrl) return;
    setExiting(true);
    setTimeout(() => {
      onBack();
      // After navigation lands on home, scroll to the anchor
      requestAnimationFrame(() => {
        const id = project.demoUrl.replace('#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }, 280);
  };

  return (
    <div className={`pp-root${exiting ? ' pp-root--exit' : ''}`} data-theme={dark ? 'dark' : undefined}>

    {
    //  /$$   /$$ /$$$$$$$$  /$$$$$$  /$$$$$$$  /$$$$$$$$ /$$$$$$$        /$$$$$$$   /$$$$$$  /$$$$$$$ 
    // | $$  | $$| $$_____/ /$$__  $$| $$__  $$| $$_____/| $$__  $$      | $$__  $$ /$$__  $$| $$__  $$
    // | $$  | $$| $$      | $$  \ $$| $$  \ $$| $$      | $$  \ $$      | $$  \ $$| $$  \ $$| $$  \ $$
    // | $$$$$$$$| $$$$$   | $$$$$$$$| $$  | $$| $$$$$   | $$$$$$$/      | $$$$$$$ | $$$$$$$$| $$$$$$$/
    // | $$__  $$| $$__/   | $$__  $$| $$  | $$| $$__/   | $$__  $$      | $$__  $$| $$__  $$| $$__  $$
    // | $$  | $$| $$      | $$  | $$| $$  | $$| $$      | $$  \ $$      | $$  \ $$| $$  | $$| $$  \ $$
    // | $$  | $$| $$$$$$$$| $$  | $$| $$$$$$$/| $$$$$$$$| $$  | $$      | $$$$$$$/| $$  | $$| $$  | $$
    // |__/  |__/|________/|__/  |__/|_______/ |________/|__/  |__/      |_______/ |__/  |__/|__/  |__/                                                                                           
    }
      <header className="pp-header">
        <div className="pp-header-inner">
          <div className="pp-header-title">
            <span className="pp-header-tag">{project.tag}</span>
            <h1 className="pp-header-name">{project.title}</h1>
          </div>
          <div className="pp-header-actions">
            <button
              className="dm-toggle"
              onClick={onToggleDark}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={dark ? 'Light mode' : 'Dark mode'}
            >
              <span className="dm-toggle-thumb">{dark ? '☀' : '☾'}</span>
            </button>
            <button className="pp-back-btn" onClick={handleBack} aria-label="Back to Portfolio">
              ← Portfolio
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ──────────────────────────────────────── */}
      <main className="pp-main">
        <div className="pp-content">

          {/* ── LEFT COLUMN (70%) ─────────────────────────────── */}
          <div className="pp-left">

            {/* Media Viewer */}
            <div className="pp-media-viewer">
              {hasThumbs ? (
                <img
                  key={activeSrc}
                  src={activeSrc}
                  alt={`${project.title} screenshot ${active + 1}`}
                  className="pp-media-img"
                />
              ) : (
                <div className="pp-media-placeholder">
                  <div className="pp-media-placeholder-inner">
                    <span className="pp-media-placeholder-icon">🔬</span>
                    <span>Preview not available</span>
                    <span className="pp-media-placeholder-sub">
                      {project.isCustomVisual ? 'Interactive concept demo' : 'Coming soon'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {hasThumbs && (
              <div className="pp-thumbstrip" role="list" aria-label="Screenshots">
                {images.map((src, i) => (
                  <button
                    key={i}
                    className={`pp-thumb${i === active ? ' pp-thumb--active' : ''}`}
                    onClick={() => setActive(i)}
                    aria-label={`Screenshot ${i + 1}`}
                    role="listitem"
                  >
                    <img src={src} alt="" className="pp-thumb-img" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN (30%) ────────────────────────────── */}
          <aside className="pp-right">

            {/* Cover Image Banner */}
            <div className="pp-cover">
              {hasThumbs ? (
                <img src={images[0]} alt={`${project.title} cover`} className="pp-cover-img" />
              ) : (
                <div className="pp-cover-placeholder">
                  <span className="pp-cover-placeholder-text">{project.title}</span>
                </div>
              )}
              <div className="pp-cover-overlay">
                <span className="pp-cover-tag">{project.tag}</span>
              </div>
            </div>

            {/* Description */}
            <div className="pp-info-section">
              <h2 className="pp-info-label">About this Project</h2>
              <p className="pp-info-desc">{project.desc}</p>
            </div>

            {/* Metadata Grid */}
            <div className="pp-meta-grid">
              <div className="pp-meta-row">
                <span className="pp-meta-label">Users</span>
                <span className="pp-meta-value pp-meta-value--highlight">{project.outcome}</span>
              </div>
              <div className="pp-meta-row">
                <span className="pp-meta-label">Release Date</span>
                <span className="pp-meta-value">
                  {RELEASE_DATES[project.title] ?? 'N/A'}
                </span>
              </div>
              <div className="pp-meta-row">
                <span className="pp-meta-label">
                  {project.developers && project.developers.length > 1 ? 'Developers' : 'Developer'}
                </span>
                <span className="pp-meta-value pp-meta-value--me">
                  {(project.developers ?? ['John Emman Lanusga']).join(' · ')}
                </span>
              </div>
            </div>

            {/* Tags / Tech Stack */}
            {project.tech && project.tech.length > 0 && (
              <div className="pp-tags-section">
                <h2 className="pp-info-label">Tech Stack</h2>
                <div className="pp-tags">
                  {project.tech.map((t) => (
                    <span key={t.name} className="pp-tag">
                      <img src={t.logo} alt="" className="pp-tag-icon" />
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Demo Button */}
            {project.demoUrl && (
              <div className="pp-demo-section">
                <button className="pp-demo-btn" onClick={handleDemo}>
                  ▶ Play Demo
                </button>
              </div>
            )}

          </aside>
        </div>

        {
        //  /$$   /$$ /$$$$$$$$ /$$     /$$       /$$$$$$$$ /$$$$$$$$  /$$$$$$  /$$$$$$$$ /$$   /$$ /$$$$$$$  /$$$$$$$$  /$$$$$$ 
        // | $$  /$$/| $$_____/|  $$   /$$/      | $$_____/| $$_____/ /$$__  $$|__  $$__/| $$  | $$| $$__  $$| $$_____/ /$$__  $$
        // | $$ /$$/ | $$       \  $$ /$$/       | $$      | $$      | $$  \ $$   | $$   | $$  | $$| $$  \ $$| $$      | $$  \__/
        // | $$$$$/  | $$$$$     \  $$$$/        | $$$$$   | $$$$$   | $$$$$$$$   | $$   | $$  | $$| $$$$$$$/| $$$$$   |  $$$$$$ 
        // | $$  $$  | $$__/      \  $$/         | $$__/   | $$__/   | $$__  $$   | $$   | $$  | $$| $$__  $$| $$__/    \____  $$
        // | $$\  $$ | $$          | $$          | $$      | $$      | $$  | $$   | $$   | $$  | $$| $$  \ $$| $$       /$$  \ $$
        // | $$ \  $$| $$$$$$$$    | $$          | $$      | $$$$$$$$| $$  | $$   | $$   |  $$$$$$/| $$  | $$| $$$$$$$$|  $$$$$$/
        // |__/  \__/|________/    |__/          |__/      |________/|__/  |__/   |__/    \______/ |__/  |__/|________/ \______/ 
        }
        {project.features && project.features.length > 0 && (
          <section className="pp-features">
            <h2 className="pp-features-heading">Key Features</h2>
            {project.featuresType === 'tabs'
              ? <FeatureTabs features={project.features} />
              : <FeatureRules features={project.features} />
            }
          </section>
        )}
      </main>
    </div>
  );
}
