const opentype = require('opentype.js');
const fs = require('fs');

const italicFont  = opentype.parse(fs.readFileSync('src/assets/font/Megazoid-Italic-Testing.otf').buffer);
const regularFont = opentype.parse(fs.readFileSync('src/assets/font/Megazoid-Regular-Testing.otf').buffer);
const fillFont    = opentype.parse(fs.readFileSync('src/assets/font/Megazoid-Fill-Testing.otf').buffer);

const text     = 'J.EMMAN';
const fontSize = 200;
const outline  = 8;
const shadow   = 36;
const pad      = outline + shadow + 20;

const x = pad;
const y = fontSize + pad;

// Use italic font for all chars — MUST round curX to avoid NaN in composite glyphs
// Fill uses fillFont for yellow interior shape
function buildPath(text, x, y, fontSize) {
  const scale = fontSize / italicFont.unitsPerEm;
  let curX = x;
  let outlineD = '';
  let fillD = '';

  for (let i = 0; i < text.length; i++) {
    const char   = text[i];
    const glyph  = italicFont.stringToGlyphs(char)[0];
    const fglyph = fillFont.stringToGlyphs(char)[0];
    if (!glyph) { curX += 50; continue; }

    const rx = Math.round(curX);
    outlineD += glyph.getPath(rx, y, fontSize).toPathData(2) + ' ';
    // Use italic fill path too for consistent vertical metrics
    fillD    += glyph.getPath(rx, y, fontSize).toPathData(2) + ' ';

    curX += (glyph.advanceWidth || 0) * scale;
  }
  return { outlineD: outlineD.trim(), fillD: fillD.trim(), endX: curX };
}

const { outlineD, fillD, endX } = buildPath(text, x, y, fontSize);

console.log('Outline NaN:', outlineD.split('NaN').length - 1);
console.log('Fill NaN:', fillD.split('NaN').length - 1);
console.log('endX:', endX);

const W = Math.ceil(endX) + pad + shadow + outline + 50;
const H = y + pad + shadow + outline + 20;

function buildFilter(shadowColor) {
  const steps = shadow;
  const prims = [
    '      <feMorphology operator="dilate" radius="' + outline + '" in="SourceGraphic" result="dilated"/>',
    '      <feFlood flood-color="' + shadowColor + '" result="sc"/>',
    '      <feComposite in="sc" in2="dilated" operator="in" result="base"/>',
  ];
  for (let i = 1; i <= steps; i++) {
    prims.push('      <feOffset dx="' + i + '" dy="' + i + '" in="base" result="s' + i + '"/>');
  }
  prims.push('      <feMerge>');
  prims.push('        <feMergeNode in="base"/>');
  for (let i = 1; i <= steps; i++) {
    prims.push('        <feMergeNode in="s' + i + '"/>');
  }
  prims.push('      </feMerge>');
  return prims;
}

function buildSVG(shadowColor, fillColor) {
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="J.EMMAN">',
    '  <title>J.EMMAN</title>',
    '  <defs>',
    '    <filter id="extrude" x="-2%" y="-2%" width="140%" height="140%">',
    ...buildFilter(shadowColor),
    '    </filter>',
    '  </defs>',
    '  <path d="' + outlineD + '" filter="url(#extrude)"/>',
    '  <path d="' + fillD + '" fill="' + fillColor + '"/>',
    '</svg>'
  ].join('\n');
}

// Light mode: black shadow, yellow fill
const svgLight = buildSVG('#000', '#F5E642');
// Dark mode: medium grey shadow (readable on dark bg), same yellow fill
const svgDark  = buildSVG('#3a3a3a', '#F5E642');

fs.writeFileSync('public/jemman-logo.svg', svgLight);
fs.writeFileSync('public/jemman-logo-dark.svg', svgDark);
fs.writeFileSync('src/assets/images/jemman-logo.svg', svgLight);
fs.writeFileSync('src/assets/images/jemman-logo-dark.svg', svgDark);
console.log('Done. W=' + W + ' H=' + H);
