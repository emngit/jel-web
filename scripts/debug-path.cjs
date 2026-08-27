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

console.log('x:', x, 'y:', y, 'pad:', pad);

const charFontMap = {
  'J': italicFont,
  '.': italicFont,
  'E': italicFont,
  'M': regularFont,
  'A': regularFont,
  'N': regularFont,
};

function buildMixedPath(text, x, y, fontSize) {
  const scale = fontSize / italicFont.unitsPerEm;
  let curX = x;
  let outlineD = '';
  let fillD = '';

  for (let i = 0; i < text.length; i++) {
    const char  = text[i];
    const font  = charFontMap[char] || regularFont;

    const glyphs = font.stringToGlyphs(char);
    const glyph  = glyphs[0];
    if (!glyph) { curX += 50; continue; }

    const fglyphs = fillFont.stringToGlyphs(char);
    const fglyph  = fglyphs[0];

    const p  = glyph.getPath(curX, y, fontSize, {}, font);
    const fp = fglyph.getPath(curX, y, fontSize, {}, fillFont);

    const od = p.toPathData(2);
    const fd = fp.toPathData(2);

    console.log(char, 'curX:', curX.toFixed(2), 'outline-NaN:', od.includes('NaN'), 'fill-NaN:', fd.includes('NaN'));

    outlineD += od + ' ';
    fillD    += fd + ' ';

    const adv = isNaN(glyph.advanceWidth) ? 0 : (glyph.advanceWidth || 0);
    curX += adv * scale;
    if (i < text.length - 1) {
      const nextGlyphs = font.stringToGlyphs(text[i + 1]);
      const kern = font.getKerningValue(glyph, nextGlyphs[0]) || 0;
      curX += isNaN(kern) ? 0 : kern * scale;
    }
  }
  return { outlineD: outlineD.trim(), fillD: fillD.trim(), endX: curX };
}

const { outlineD, fillD, endX } = buildMixedPath(text, x, y, fontSize);
console.log('Final outline NaN count:', outlineD.split('NaN').length - 1);
console.log('Final fill NaN count:', fillD.split('NaN').length - 1);
