const o = require('opentype.js');
const fs = require('fs');
const italic  = o.parse(fs.readFileSync('src/assets/font/Megazoid-Italic-Testing.otf').buffer);
const regular = o.parse(fs.readFileSync('src/assets/font/Megazoid-Regular-Testing.otf').buffer);
const map = {'J':italic,'.':italic,'E':italic,'M':regular,'A':regular,'N':regular};
const scale = 200 / italic.unitsPerEm;
let cx = 64;
for (const c of 'J.EMMAN') {
  const font = map[c] || regular;
  const g = font.stringToGlyphs(c)[0];
  // Round cx to avoid floating point issues with composite glyphs
  const roundedCx = Math.round(cx);
  const p = g.getPath(roundedCx, 264, 200);
  const d = p.toPathData(2);
  console.log(c, 'cx:', roundedCx, 'NaN:', d.includes('NaN'));
  cx += (g.advanceWidth || 0) * scale;
}
