import { useEffect, useRef } from 'react';
import badgeSrc from './assets/images/BADGE.jpg';

const GITHUB_COLORS = [
  '#161b22', // 0 — empty / very dark background
  '#0e4429', // 1 — level 1 (darkest green)
  '#006d32', // 2 — level 2
  '#26a641', // 3 — level 3
  '#39d353', // 4 — level 4 (brightest)
];

function toGrayscale(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export default function PixelPortrait({ gridSize = 200, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = badgeSrc;

    img.onload = () => {
      const CELL = 3;
      const GAP = 1;

      const tmp = document.createElement('canvas');
      tmp.width = gridSize;
      tmp.height = gridSize;
      const tmpCtx = tmp.getContext('2d');
      tmpCtx.drawImage(img, 0, 0, gridSize, gridSize);
      const data = tmpCtx.getImageData(0, 0, gridSize, gridSize).data;

      const totalSize = gridSize * (CELL + GAP) + GAP;
      canvas.width = totalSize;
      canvas.height = totalSize;

      // Dark background matching GitHub terminal/card theme
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, totalSize, totalSize);

      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const idx = (row * gridSize + col) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const gray = toGrayscale(r, g, b);

          const inv = 255 - gray;
          let level;
          if (inv < 40)       level = 0;
          else if (inv < 100) level = 1;
          else if (inv < 155) level = 2;
          else if (inv < 210) level = 3;
          else                level = 4;

          const x = GAP + col * (CELL + GAP);
          const y = GAP + row * (CELL + GAP);

          ctx.fillStyle = GITHUB_COLORS[level];
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(x, y, CELL, CELL, 0.5);
          } else {
            ctx.rect(x, y, CELL, CELL);
          }
          ctx.fill();
        }
      }
    };
  }, [gridSize]);

  return (
    <div className={`pixel-portrait-frame ${className}`}>
      <canvas ref={canvasRef} className="pixel-portrait-canvas" />
    </div>
  );
}
