import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { ROBOT_SVG } from './assets/robotSvg.js';

const NS = 'http://www.w3.org/2000/svg';

const MOODS = ['idle','happy','excited','sad','confuse','thinking','angry'];

const MOUTH = {
  smile:   'M-34.743,-41.62C-34.743,-41.62,-33.656,-8.105,0.764,-9.373C28.846,-10.408,31.199,-40.533,31.199,-40.533C31.199,-40.533,-34.743,-41.62,-34.743,-41.62Z',
  frown:   'M-34.743,-8.38C-34.743,-8.38,-33.656,-41.895,0.764,-40.627C28.846,-39.592,31.199,-9.467,31.199,-9.467C31.199,-9.467,-34.743,-8.38,-34.743,-8.38Z',
  flat:    'M-28,-25C-28,-25,-28,-22,0,-22C28,-22,28,-25,28,-25C28,-25,28,-28,0,-28C-28,-28,-28,-25,-28,-25Z',
  open:    'M-18,-42C-18,-42,-18,-8,0,-8C18,-8,18,-42,18,-42C18,-42,18,-42,0,-44C-18,-44,-18,-42,-18,-42Z',
  excited: 'M-36,-44C-36,-44,-34,-2,0,-2C34,-2,36,-44,36,-44C36,-44,-34,-44,-36,-44Z',
  angry:   'M-28,-20C-28,-20,-14,-28,0,-28C14,-28,28,-20,28,-20C28,-20,28,-23,0,-26C-28,-26,-28,-20,-28,-20Z',
};

function svgEl(tag, attrs) {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}
function svgAnim(el, tag, attrs) {
  const a = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) a.setAttribute(k, v);
  el.appendChild(a);
  return a;
}

const KairosMascot = forwardRef(function KairosMascot({ idleDelay = 4000 }, ref) {
  const stageRef = useRef(null);

  // engine state — mutable, not reactive
  const eng = useRef({
    robotSVG: null,
    moodOverlayG: null,
    mouthPath: null,
    leftEyePath: null,
    rightEyePath: null,
    allBubbleEls: [],
    stillAnimators: [],
    currentMood: 'none',
    idleSettleTimer: null,
    confuseBubbleInterval: null,
    moodReturnTimer: null,
  });

  // ── helpers ────────────────────────────────────────────────────────────────
  function clearOverlay() {
    const e = eng.current;
    if (e.moodOverlayG) e.moodOverlayG.innerHTML = '';
    e.allBubbleEls.forEach(({ el }) => { el.style.animation = ''; el.style.filter = ''; });
  }

  function setEyeColor(col, glowCol) {
    const e = eng.current;
    [e.leftEyePath, e.rightEyePath].forEach(p => {
      if (!p) return;
      p.setAttribute('fill', col);
      p.style.filter = glowCol ? `drop-shadow(0 0 8px ${glowCol})` : '';
    });
  }

  function setMouthShape(shape, fill) {
    const { mouthPath } = eng.current;
    if (!mouthPath) return;
    mouthPath.setAttribute('d', MOUTH[shape] ?? MOUTH.smile);
    mouthPath.setAttribute('fill', fill);
    mouthPath.style.opacity = '1';
  }

  function hideMouth() {
    const { mouthPath } = eng.current;
    if (mouthPath) mouthPath.style.opacity = '0';
  }

  function showBubbles(...ids) {
    eng.current.allBubbleEls.forEach(({ id, el }) => {
      if (ids.includes(id)) el.classList.remove('bubble-hidden');
      else el.classList.add('bubble-hidden');
    });
  }

  function hideAllBubbles() {
    eng.current.allBubbleEls.forEach(({ el }) => el.classList.add('bubble-hidden'));
  }

  function startConfuseBubbles() {
    const ids = ['i30','i33','i36','i38'];
    hideAllBubbles();
    function cycle() {
      const count = 1 + Math.floor(Math.random() * 3);
      const active = ids.slice().sort(() => Math.random() - 0.5).slice(0, count);
      eng.current.allBubbleEls.forEach(({ id, el }) => {
        if (active.includes(id)) el.classList.remove('bubble-hidden');
        else el.classList.add('bubble-hidden');
      });
      eng.current.confuseBubbleInterval = setTimeout(cycle, 600 + Math.random() * 1200);
    }
    cycle();
  }

  function stopConfuseBubbles() {
    const e = eng.current;
    if (e.confuseBubbleInterval) { clearTimeout(e.confuseBubbleInterval); e.confuseBubbleInterval = null; }
  }

  function freezeMotion() {
    const e = eng.current;
    if (!e.robotSVG) return;
    e.stillAnimators.forEach(entry => {
      if (entry.el.parentNode) {
        entry.parentNode = entry.el.parentNode;
        entry.nextSibling = entry.el.nextSibling;
        entry.el.parentNode.removeChild(entry.el);
      }
    });
    hideAllBubbles();
  }

  function unfreezeMotion() {
    const e = eng.current;
    if (!e.robotSVG) return;
    cancelIdleSettle();
    stopBreathing();
    e.stillAnimators.forEach(entry => {
      if (entry.parentNode && !entry.el.parentNode)
        entry.parentNode.insertBefore(entry.el, entry.nextSibling ?? null);
    });
  }

  function startBreathing() {
    const e = eng.current;
    if (!e.robotSVG) return;
    e.robotSVG.style.transformOrigin = 'center 65%';
    e.robotSVG.style.animation = 'km-breathe 3.8s ease-in-out infinite';
    [e.leftEyePath, e.rightEyePath].forEach((p, i) => {
      if (p) p.style.animation = `km-eye-blink 3.2s ease-in-out ${i * 0.4}s infinite`;
    });
  }

  function stopBreathing() {
    const e = eng.current;
    if (!e.robotSVG) return;
    e.robotSVG.style.transformOrigin = '';
    e.robotSVG.style.animation = '';
    [e.leftEyePath, e.rightEyePath].forEach(p => { if (p) p.style.animation = ''; });
  }

  function cancelIdleSettle() {
    const e = eng.current;
    if (e.idleSettleTimer) { clearTimeout(e.idleSettleTimer); e.idleSettleTimer = null; }
    if (e.robotSVG) {
      e.robotSVG.classList.remove('km-settling');
      e.allBubbleEls.forEach(({ el }) => el.classList.remove('bubble-fading'));
    }
  }

  function drawSpiralOnEye(cx, cy, color) {
    const { moodOverlayG } = eng.current;
    if (!moodOverlayG) return;
    const g = svgEl('g', { transform: `translate(${cx},${cy})` });
    const p = svgEl('path', {
      d: 'M 0,-18 C 12,-18 20,-8 20,0 C 20,11 11,20 0,20 C -11,20 -20,11 -20,0 C -20,-11 -9,-20 0,-15 C 7,-12 11,-5 8,0 C 5,6 -1,8 -5,4',
      fill: 'none', stroke: color, 'stroke-width': '3.5', 'stroke-linecap': 'round', opacity: '0.92',
    });
    const anim = document.createElementNS(NS, 'animateTransform');
    anim.setAttribute('type', 'rotate'); anim.setAttribute('attributeName', 'transform');
    anim.setAttribute('additive', 'sum'); anim.setAttribute('from', '0 0 0');
    anim.setAttribute('to', '360 0 0'); anim.setAttribute('dur', '1.8s');
    anim.setAttribute('repeatCount', 'indefinite');
    g.appendChild(p); g.appendChild(anim);
    moodOverlayG.appendChild(g);
  }

  // ── main mood applicator ───────────────────────────────────────────────────
  function applyMood(mood) {
    const e = eng.current;
    if (!e.robotSVG) return;

    if (e.moodReturnTimer) { clearTimeout(e.moodReturnTimer); e.moodReturnTimer = null; }

    if (mood === 'idle') {
      stopConfuseBubbles();
      if (e.currentMood === 'none') {
        hideAllBubbles(); freezeMotion(); hideMouth(); startBreathing();
      } else {
        cancelIdleSettle();
        e.allBubbleEls.forEach(({ el }) => {
          if (!el.classList.contains('bubble-hidden')) el.classList.add('bubble-fading');
        });
        MOODS.forEach(m => e.robotSVG.classList.remove('km-mood-' + m));
        e.robotSVG.style.filter = '';
        e.robotSVG.classList.add('km-settling');
        clearOverlay(); setEyeColor('#7afffb', '#7afffb'); hideMouth();
        [e.leftEyePath, e.rightEyePath].forEach(p => { if (p) p.style.opacity = ''; });
        e.idleSettleTimer = setTimeout(() => {
          e.idleSettleTimer = null;
          if (!e.robotSVG) return;
          e.allBubbleEls.forEach(({ el }) => {
            el.classList.remove('bubble-fading'); el.classList.add('bubble-hidden');
          });
          e.robotSVG.classList.remove('km-settling');
          freezeMotion(); startBreathing();
        }, 560);
      }
      e.currentMood = 'idle';
      return;
    }

    cancelIdleSettle(); stopConfuseBubbles(); clearOverlay();
    if (e.currentMood === 'idle' || e.currentMood === 'sad') unfreezeMotion();
    else stopBreathing();

    MOODS.forEach(m => e.robotSVG.classList.remove('km-mood-' + m));
    e.robotSVG.style.filter = '';
    if (e.robotSVG.setCurrentTime) e.robotSVG.setCurrentTime(0);
    setEyeColor('#7afffb', '#7afffb'); setMouthShape('smile', '#ffffff');
    [e.leftEyePath, e.rightEyePath].forEach(p => {
      if (p) { p.style.opacity = ''; p.style.animation = ''; }
    });
    hideAllBubbles();

    switch (mood) {
      case 'happy':
        e.robotSVG.classList.add('km-mood-happy');
        setEyeColor('#7afffb', '#7afffb'); setMouthShape('smile', '#ffffff');
        showBubbles('i38'); break;

      case 'excited':
        e.robotSVG.classList.add('km-mood-excited');
        setEyeColor('#ffe87a', '#ffe060'); setMouthShape('excited', '#ffffff');
        showBubbles('i30','i33','i36','i38');
        if (e.moodOverlayG) {
          [-88,-66,66,88].forEach((x, i) => {
            const sp = svgEl('circle', { cx: String(x), cy: '-118', r: '4.5', fill: '#ffe87a', opacity: '0.85' });
            svgAnim(sp, 'animate', { attributeName: 'r', values: '3;5.5;3', dur: '0.55s', begin: `${i*0.13}s`, repeatCount: 'indefinite' });
            svgAnim(sp, 'animate', { attributeName: 'opacity', values: '0.85;0.2;0.85', dur: '0.55s', begin: `${i*0.13}s`, repeatCount: 'indefinite' });
            e.moodOverlayG.appendChild(sp);
          });
        }
        break;

      case 'sad':
        e.robotSVG.classList.add('km-mood-sad');
        freezeMotion(); startBreathing();
        setEyeColor('#6ab4d0', '#4488aa');
        [e.leftEyePath, e.rightEyePath].forEach(p => { if (p) p.style.opacity = '0.6'; });
        setMouthShape('frown', '#7ab8d0');
        if (e.moodOverlayG) {
          [[-72,-120],[72,-120]].forEach(([cx,cy], i) => {
            const d = i === 0
              ? `M ${cx-20},${cy-6} Q ${cx},${cy+8} ${cx+20},${cy+2}`
              : `M ${cx-20},${cy+2} Q ${cx},${cy+8} ${cx+20},${cy-6}`;
            e.moodOverlayG.appendChild(svgEl('path', { d, fill:'none', stroke:'#6ab4d0', 'stroke-width':'5.5', 'stroke-linecap':'round', opacity:'0.75' }));
          });
        }
        break;

      case 'confuse':
        e.robotSVG.classList.add('km-mood-confuse');
        setEyeColor('#c47aff', '#b060ff'); setMouthShape('open', '#c47aff');
        startConfuseBubbles();
        if (e.moodOverlayG) {
          e.moodOverlayG.appendChild(svgEl('path', { d:'M -92,-120 Q -72,-140 -52,-124', fill:'none', stroke:'#c47aff', 'stroke-width':'5', 'stroke-linecap':'round', opacity:'0.9' }));
          e.moodOverlayG.appendChild(svgEl('path', { d:'M 52,-110 L 92,-110', fill:'none', stroke:'#c47aff', 'stroke-width':'5', 'stroke-linecap':'round', opacity:'0.9' }));
          drawSpiralOnEye(-72, -72, '#c47aff'); drawSpiralOnEye(72, -72, '#c47aff');
        }
        break;

      case 'angry':
        e.robotSVG.classList.add('km-mood-angry');
        setEyeColor('#ff4500', '#ff2200'); setMouthShape('angry', '#ff6622');
        showBubbles('i38');
        e.allBubbleEls.filter(b => b.id === 'i38').forEach(({ el }) => {
          el.style.filter = 'hue-rotate(165deg) saturate(2.2) brightness(1.1)';
        });
        if (e.moodOverlayG) {
          e.moodOverlayG.appendChild(svgEl('path', { d:'M -100,-117 L -44,-107', fill:'none', stroke:'#ff4500', 'stroke-width':'7', 'stroke-linecap':'round', opacity:'0.92' }));
          e.moodOverlayG.appendChild(svgEl('path', { d:'M 44,-107 L 100,-117', fill:'none', stroke:'#ff4500', 'stroke-width':'7', 'stroke-linecap':'round', opacity:'0.92' }));
          [[-40,-128],[0,-136],[40,-128]].forEach(([x,y], i) => {
            const line = svgEl('path', { d:`M ${x},${y} L ${x},${y-18}`, fill:'none', stroke:'#ff6600', 'stroke-width':'4', 'stroke-linecap':'round', opacity:'0' });
            const anim = document.createElementNS(NS, 'animate');
            anim.setAttribute('attributeName','opacity'); anim.setAttribute('values','0;0.9;0');
            anim.setAttribute('dur','0.6s'); anim.setAttribute('begin',`${i*0.18}s`);
            anim.setAttribute('repeatCount','indefinite');
            line.appendChild(anim); e.moodOverlayG.appendChild(line);
          });
        }
        break;

      case 'thinking':
        e.robotSVG.classList.add('km-mood-thinking');
        setEyeColor('#7afffb', '#7afffb'); setMouthShape('flat', '#7afffb');
        showBubbles('i30');
        e.allBubbleEls.filter(b => b.id === 'i30').forEach(({ el }) => {
          el.style.animation = 'km-think-pulse 1.4s ease-in-out infinite';
        });
        if (e.moodOverlayG) {
          e.moodOverlayG.appendChild(svgEl('path', { d:'M 52,-120 Q 72,-134 92,-122', fill:'none', stroke:'#7afffb', 'stroke-width':'4.5', 'stroke-linecap':'round', opacity:'0.65' }));
        }
        break;
    }

    e.currentMood = mood;
    e.moodReturnTimer = setTimeout(() => applyMood('idle'), idleDelay);
  }

  // ── load SVG from bundled JS string ──────────────────────────────────────
  function loadRobot() {
    const stage = stageRef.current;
    if (!stage) return;
    const e = eng.current;
    try {
      const doc = new DOMParser().parseFromString(ROBOT_SVG, 'image/svg+xml');
      const svg = doc.documentElement;
      if (!svg) throw new Error('SVG not found');

      svg.setAttribute('id', 'km-robot-svg');
      svg.style.width = '100%'; svg.style.height = '100%';
      stage.innerHTML = '';
      stage.appendChild(svg);
      e.robotSVG = stage.querySelector('#km-robot-svg');

      // face scale group
      const face = e.robotSVG.querySelector('#i24');
      let faceScaleG = null;
      if (face) {
        for (const ch of face.children) { if (ch.tagName.toLowerCase() === 'g') { faceScaleG = ch; break; } }
        if (faceScaleG) {
          for (const ch of faceScaleG.children) { if (ch.tagName.toLowerCase() === 'g') { faceScaleG = ch; break; } }
        }
      }

      // eye paths
      const eyePaths = faceScaleG ? [...faceScaleG.querySelectorAll('path[fill="#7afffb"]')] : [];
      e.leftEyePath  = eyePaths[0] ?? null;
      e.rightEyePath = eyePaths[1] ?? null;

      // mouth
      const mouthG = [...e.robotSVG.querySelectorAll('[id="i23"]')].find(g => g.querySelector('path[fill="#ffffff"]'));
      if (mouthG) e.mouthPath = mouthG.querySelector('path[fill="#ffffff"]');

      // bubbles
      e.allBubbleEls = [];
      ['i30','i33','i36','i38'].forEach(id => {
        e.robotSVG.querySelectorAll(`[id="${id}"]`).forEach(el => e.allBubbleEls.push({ id, el }));
      });

      // overlay group
      if (faceScaleG) {
        e.moodOverlayG = svgEl('g', { id: 'km-mood-overlay' });
        faceScaleG.appendChild(e.moodOverlayG);
      }

      // still animators
      e.stillAnimators = [];
      e.robotSVG.querySelectorAll('[id="i16"]').forEach(i16 => {
        const cg = i16.firstElementChild; if (!cg) return;
        for (const ch of cg.childNodes) {
          if (ch.localName === 'animateTransform') e.stillAnimators.push({ el: ch });
        }
      });
      const i17el = e.robotSVG.querySelector('[id="i17"]');
      if (i17el) { const cg = i17el.firstElementChild; if (cg) for (const ch of cg.childNodes) { if (ch.localName === 'animateTransform') e.stillAnimators.push({ el: ch }); } }
      e.robotSVG.querySelectorAll('[id="i28"],[id="i29"]').forEach(armG => {
        ['animateTransform','animateMotion'].forEach(tag => {
          [...armG.getElementsByTagNameNS(NS, tag)].forEach(el => e.stillAnimators.push({ el }));
        });
      });
      e.robotSVG.querySelectorAll('[id="i22"],[id="i24"]').forEach(g => {
        const cg = g.firstElementChild; if (!cg) return;
        for (const ch of cg.childNodes) { if (ch.localName === 'animateMotion') e.stillAnimators.push({ el: ch }); }
      });

      e.currentMood = 'none';
      applyMood('idle');
    } catch (err) {
      console.error('[KairosMascot] load failed:', err);
    }
  }

  useEffect(() => {
    // inject keyframes once globally
    if (!document.getElementById('km-keyframes')) {
      const style = document.createElement('style');
      style.id = 'km-keyframes';
      style.textContent = `
        @keyframes km-breathe      { 0%,100%{transform:scaleY(1) scaleX(1)} 50%{transform:scaleY(1.022) scaleX(0.993)} }
        @keyframes km-eye-blink    { 0%,90%,100%{opacity:1} 95%{opacity:0.05} }
        @keyframes km-happy-bob    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes km-excited-vibe { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-3px) rotate(-.4deg)} 75%{transform:translateX(3px) rotate(.4deg)} }
        @keyframes km-confuse-tilt { 0%,100%{transform:rotate(-3.5deg)} 50%{transform:rotate(3.5deg)} }
        @keyframes km-think-lean   { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg) translateY(-3px)} }
        @keyframes km-angry-jitter { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-2px) rotate(-.3deg)} 75%{transform:translateX(2px) rotate(.3deg)} }
        @keyframes km-think-pulse  { 0%,100%{filter:drop-shadow(0 0 6px #7afffb) drop-shadow(0 0 14px #00d8f4)} 50%{filter:drop-shadow(0 0 18px #7afffb) drop-shadow(0 0 36px #00d8f4)} }
        #km-robot-svg { transform-origin: bottom center; display: block; }
        #km-robot-svg.km-mood-happy    { animation: km-happy-bob   1.65s ease-in-out infinite; }
        #km-robot-svg.km-mood-excited  { animation: km-excited-vibe 0.19s linear     infinite; }
        #km-robot-svg.km-mood-sad      { filter: brightness(0.82) saturate(0.6); }
        #km-robot-svg.km-mood-confuse  { animation: km-confuse-tilt 2.1s  ease-in-out infinite; }
        #km-robot-svg.km-mood-thinking { animation: km-think-lean   2.6s  ease-in-out infinite; }
        #km-robot-svg.km-mood-angry    { animation: km-angry-jitter 0.09s linear     infinite; filter: brightness(1.05) saturate(1.3); }
        #km-robot-svg.km-settling      { animation: none !important; transform: translate(0,0) rotate(0deg) scale(1) !important; transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.55s ease; }
        .bubble-hidden { display: none !important; }
        .bubble-fading { transition: opacity 0.35s ease; opacity: 0 !important; }
      `;
      document.head.appendChild(style);
    }
    loadRobot();
    return () => {
      const e = eng.current;
      if (e.idleSettleTimer)       clearTimeout(e.idleSettleTimer);
      if (e.confuseBubbleInterval) clearTimeout(e.confuseBubbleInterval);
      if (e.moodReturnTimer)       clearTimeout(e.moodReturnTimer);
    };
  }, []);

  // expose setMood to parent via ref
  useImperativeHandle(ref, () => ({ setMood: applyMood }));

  return (
    <div
      ref={stageRef}
      className="km-stage"
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', overflow: 'hidden' }}
    />
  );
});

export default KairosMascot;
