import { useEffect, useRef, useState, useCallback } from 'react';

/* ── Easter-egg icons ──────────────────────────────────────── */
const EGG_ICONS = [
  /* bug */
  'M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v1h-2v-1a1 1 0 0 0-1-1h-1v2a6 6 0 0 1-12 0V9H3a1 1 0 0 0-1 1v1H0v-1a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v1h4V6a2 2 0 0 0-2-2zm-1 7v2h2v-2h-2zm-4 0H5v2h2v-2zm8 0v2h2v-2h-2z',
  /* checkmark */
  'M20 6L9 17l-5-5',
  /* cloud */
  'M18 10a4 4 0 0 0-7.74-1.37A3.5 3.5 0 1 0 7 15h11a3 3 0 0 0 0-6z',
  /* gear */
  'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.07-2.29l1.27-.74a1 1 0 0 0 .36-1.36l-2-3.46a1 1 0 0 0-1.36-.37l-1.27.74a7 7 0 0 0-1.41-.82L14 5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1l-.2 1.7a7 7 0 0 0-1.4.82l-1.28-.74a1 1 0 0 0-1.36.37l-2 3.46a1 1 0 0 0 .36 1.36l1.27.74A7.1 7.1 0 0 0 5 12a7.1 7.1 0 0 0 .07 1l-1.27.74a1 1 0 0 0-.36 1.36l2 3.46a1 1 0 0 0 1.36.37l1.27-.74a7 7 0 0 0 1.41.82L10 21a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1l.2-1.7a7 7 0 0 0 1.4-.82l1.28.74a1 1 0 0 0 1.36-.37l2-3.46a1 1 0 0 0-.36-1.36L19 13c.04-.33.07-.66.07-1s-.03-.67-.07-1z',
];

function rand(min, max) { return Math.random() * (max - min) + min; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

/* ── Particle ──────────────────────────────────────────────── */
class Particle {
  constructor(cx, cy, scale = 1, energy = 1) { this.reset(cx, cy, scale, energy); }
  reset(cx, cy, scale = 1, energy = 1) {
    const angle = rand(0, Math.PI * 2);
    // orbit radius: just outside the portal image (portal ~150px radius at base scale)
    this.orbitRadius = rand(155, 185) * scale * Math.min(energy, 1.4);
    this.orbitAngle  = angle;
    this.orbitSpeed  = rand(0.006, 0.018) * (Math.random() > 0.5 ? 1 : -1);
    this.cx   = cx;
    this.cy   = cy;
    this.x    = cx + Math.cos(angle) * this.orbitRadius;
    this.y    = cy + Math.sin(angle) * this.orbitRadius;
    this.life  = rand(0.6, 1);
    this.decay = rand(0.004, 0.014);
    this.size  = rand(1.2, 3.5) * scale;
    this.type  = Math.random() > 0.25 ? 'orbit' : 'absorb';
    if (this.type === 'absorb') {
      // drifts inward toward the centre
      this.vx = Math.cos(angle + Math.PI) * rand(0.5, 1.5) * scale;
      this.vy = Math.sin(angle + Math.PI) * rand(0.5, 1.5) * scale;
    }
  }
  update(scale = 1) {
    if (this.type === 'orbit') {
      this.orbitAngle  += this.orbitSpeed;
      this.orbitRadius += rand(-0.3, 0.3) * scale;
      this.orbitRadius  = clamp(this.orbitRadius, 148 * scale, 200 * scale);
      this.x = this.cx + Math.cos(this.orbitAngle) * this.orbitRadius;
      this.y = this.cy + Math.sin(this.orbitAngle) * this.orbitRadius;
    } else {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.97;
      this.vy *= 0.97;
    }
    this.life -= this.decay;
  }
  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.life * 0.85;
    const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2.5);
    g.addColorStop(0,   '#d4ffce');
    g.addColorStop(0.5, '#4ade80');
    g.addColorStop(1,   'rgba(74,222,128,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

/* ── Ripple ────────────────────────────────────────────────── */
class Ripple {
  constructor(cx, cy, scale = 1) {
    this.cx = cx; this.cy = cy;
    this.r     = 148 * scale;
    this.life  = 1;
    this.decay = rand(0.005, 0.011);
  }
  update(scale = 1) { this.r += 0.9 * scale; this.life -= this.decay; }
  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.life * 0.14;
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

/* ── Component ─────────────────────────────────────────────── */
export default function PortalGateway({ portalSrc }) {
  const wrapRef   = useRef(null);
  const canvasRef = useRef(null);
  const imgRef    = useRef(null);
  const rafRef    = useRef(null);
  const s         = useRef({
    particles: [], ripples: [],
    hovered: false, clicked: false, clickT: 0,
    scrollE: 0, rippleT: 0,
  });

  const [eggPath,  setEggPath]  = useState('');
  const [eggAlpha, setEggAlpha] = useState(0);

  /* ── Draw loop ─────────────────────────────────────────── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) { rafRef.current = requestAnimationFrame(draw); return; }
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const now = performance.now() / 1000;
    const st  = s.current;

    /* Base design is 460px container. Calculate scale multiplier. */
    const scale = W / 460;

    ctx.clearRect(0, 0, W, H);

    const energy = 1
      + st.scrollE * 0.5
      + (st.hovered  ? 0.6  : 0)
      + (st.clicked  ? 1.8  : 0);

    /* spawn particles */
    if (Math.random() < 0.22 + energy * 0.10) {
      st.particles.push(new Particle(cx, cy, scale, energy * 0.8));
    }
    /* spawn ripples */
    st.rippleT++;
    if (st.rippleT > (st.hovered ? 40 : 90)) {
      st.ripples.push(new Ripple(cx, cy, scale));
      st.rippleT = 0;
    }
    /* click burst */
    if (st.clicked) {
      const el = now - st.clickT;
      if (el < 0.8) { if (Math.random() < 0.55) st.particles.push(new Particle(cx, cy, scale, energy)); }
      else           { st.clicked = false; }
    }

    /* ── Outer soft glow — pure radial, fully transparent at edge ── */
    const glowR = (148 + Math.sin(now * 0.8) * 5) * scale;
    const gStr  = st.hovered
      ? 0.30 + st.scrollE * 0.1
      : 0.14 + st.scrollE * 0.08;

    const glow = ctx.createRadialGradient(cx, cy, glowR * 0.5, cx, cy, glowR * 1.6);
    glow.addColorStop(0,   `rgba(74,222,128,${gStr})`);
    glow.addColorStop(0.6, `rgba(74,222,128,${gStr * 0.3})`);
    glow.addColorStop(1,   'rgba(74,222,128,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, glowR * 1.6, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    /* ── Ripples ── */
    st.ripples = st.ripples.filter(r => r.life > 0);
    st.ripples.forEach(r => { r.update(scale); r.draw(ctx); });

    /* ── Particles — clip to annular region so they never bleed inside the image ── */
    st.particles = st.particles.filter(p => p.life > 0);
    st.particles.forEach(p => { p.update(scale); p.draw(ctx); });

    /* ── Hover sparks on the portal rim ── */
    if (st.hovered && Math.random() < 0.35) {
      const a  = rand(0, Math.PI * 2);
      const r  = rand(148, 165) * scale;
      const sx = cx + Math.cos(a) * r;
      const sy = cy + Math.sin(a) * r;
      ctx.save();
      ctx.globalAlpha = rand(0.4, 0.95);
      ctx.fillStyle   = '#d4ffce';
      ctx.beginPath();
      ctx.arc(sx, sy, rand(0.8, 2.2), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  /* ── Easter egg ─────────────────────────────────────────── */
  useEffect(() => {
    let to;
    function schedule() {
      to = setTimeout(() => {
        const idx = Math.floor(Math.random() * EGG_ICONS.length);
        setEggPath(EGG_ICONS[idx]);
        let a = 0;
        const fi = setInterval(() => {
          a = Math.min(1, a + 0.06);
          setEggAlpha(a);
          if (a >= 1) {
            clearInterval(fi);
            setTimeout(() => {
              let b = 1;
              const fo = setInterval(() => {
                b = Math.max(0, b - 0.04);
                setEggAlpha(b);
                if (b <= 0) { clearInterval(fo); setEggPath(''); schedule(); }
              }, 50);
            }, 2000);
          }
        }, 50);
      }, rand(30000, 60000));
    }
    schedule();
    return () => clearTimeout(to);
  }, []);

  /* ── Scroll energy ────────────────────────────────────────── */
  useEffect(() => {
    const fn = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      s.current.scrollE = max > 0 ? clamp((window.scrollY / max) * 2, 0, 1) : 0;
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* ── Resize canvas to exact container size ────────────────── */
  useEffect(() => {
    const resize = () => {
      const el = canvasRef.current;
      if (!el) return;
      el.width  = el.offsetWidth;
      el.height = el.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvasRef.current) ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, []);

  /* ── RAF ──────────────────────────────────────────────────── */
  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  /* ── Mouse follow — 15px max ──────────────────────────────── */
  const onMouseMove = useCallback((e) => {
    const el = wrapRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const tx = clamp(((e.clientX - r.left  - r.width  / 2) / r.width)  * 30, -15, 15);
    const ty = clamp(((e.clientY - r.top   - r.height / 2) / r.height) * 30, -15, 15);
    if (imgRef.current) imgRef.current.style.transform = `translate(${tx}px,${ty}px)`;
  }, []);

  const onMouseEnter  = useCallback(() => { s.current.hovered = true;  }, []);
  const onMouseLeave  = useCallback(() => {
    s.current.hovered = false;
    if (imgRef.current) imgRef.current.style.transform = 'translate(0,0)';
  }, []);
  const onClick = useCallback(() => {
    s.current.clicked = true;
    s.current.clickT  = performance.now() / 1000;
  }, []);

  return (
    <div
      ref={wrapRef}
      className="portal-gateway"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      role="img"
      aria-label="Dimensional portal"
    >
      {/* Hidden SVG filter — turbulence warp on the portal image */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <filter id="portal-turbulence" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.010" numOctaves="3" seed="7" result="n">
              <animate attributeName="baseFrequency"
                values="0.012 0.010;0.016 0.013;0.010 0.008;0.012 0.010"
                dur="9s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="5"
              xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Canvas — glow + ripples + particles (sits behind image) */}
      <canvas ref={canvasRef} className="portal-canvas" aria-hidden="true" />

      {/* Portal image + easter egg */}
      <div className="portal-img-wrap">
        <img
          ref={imgRef}
          src={portalSrc}
          alt="Portal gateway"
          className="portal-img App-logo"
        />
        {eggPath && (
          <svg
            className="portal-egg-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b6ffb0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: eggAlpha }}
            aria-hidden="true"
          >
            <path d={eggPath} />
          </svg>
        )}
      </div>
    </div>
  );
}
