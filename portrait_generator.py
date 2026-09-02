"""
GitHub Contribution Graph Portrait Generator
=============================================
Pipeline:
  1. Load BADGE.jpg
  2. Remove background via rembg
  3. Smart-crop to head + upper shoulders
  4. Resize to 106×14 (GitHub landscape layout) — internal canvas is 14 rows × 106 cols
  5. Grayscale + CLAHE contrast enhancement
  6. Canny edge detection, blended back in
  7. Quantize to 5 GitHub green levels
  8. Output portrait.svg, portrait.png, contribution-matrix.json
"""

import json
import math
import sys
from io import BytesIO
from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from rembg import remove

# ── Configuration ──────────────────────────────────────────────────────────────
INPUT_IMAGE   = Path("src/assets/images/BADGE.jpg")
OUT_SVG       = Path("portrait.svg")
OUT_PNG       = Path("portrait.png")
OUT_JSON      = Path("contribution-matrix.json")

# GitHub contribution graph layout
COLS          = 53    # weeks in ~1 year (standard GitHub width)
ROWS          = 70    # rows — tall enough for a recognizable portrait

# SVG render constants (exact GitHub style)
CELL_SIZE     = 10    # px per square
CELL_RADIUS   = 2     # border-radius
GAP           = 3     # gap between squares

# GitHub dark theme greens
COLORS = {
    0: "#161b22",
    1: "#0e4429",
    2: "#006d32",
    3: "#26a641",
    4: "#39d353",
}

# Quantization thresholds (brightness 0–255 → level 0–4)
# Tuned so dark regions (hair, jacket, glasses) = high levels
# and light regions (background) = level 0
THRESHOLDS = [30, 90, 150, 210]   # boundaries between levels 0↔1↔2↔3↔4


# ── Step 1: Load ───────────────────────────────────────────────────────────────
def load_image(path: Path) -> np.ndarray:
    print(f"[1/8] Loading {path} ...")
    img = Image.open(path).convert("RGB")
    return np.array(img)


# ── Step 2: Remove background ─────────────────────────────────────────────────
def remove_background(img_rgb: np.ndarray) -> np.ndarray:
    print("[2/8] Removing background (rembg) ...")
    pil_in  = Image.fromarray(img_rgb)
    buf     = BytesIO()
    pil_in.save(buf, format="PNG")
    buf.seek(0)
    out_bytes = remove(buf.read())
    rgba = np.array(Image.open(BytesIO(out_bytes)).convert("RGBA"))
    # Composite onto pure white so transparent → white
    white = np.ones_like(rgba[:, :, :3], dtype=np.uint8) * 255
    alpha = rgba[:, :, 3:4].astype(np.float32) / 255.0
    composited = (rgba[:, :, :3].astype(np.float32) * alpha
                  + white.astype(np.float32) * (1 - alpha)).astype(np.uint8)
    return composited, rgba[:, :, 3]  # also return alpha mask


# ── Step 3: Smart-crop to head + upper shoulders ──────────────────────────────
def smart_crop(img_rgb: np.ndarray, alpha_mask: np.ndarray) -> np.ndarray:
    print("[3/8] Smart-cropping to head + shoulders ...")
    h, w = alpha_mask.shape

    # Find bounding box of non-transparent region
    rows_with_content = np.any(alpha_mask > 10, axis=1)
    cols_with_content = np.any(alpha_mask > 10, axis=0)
    top    = np.argmax(rows_with_content)
    bottom = h - np.argmax(rows_with_content[::-1]) - 1
    left   = np.argmax(cols_with_content)
    right  = w - np.argmax(cols_with_content[::-1]) - 1

    content_h = bottom - top
    content_w = right - left

    # Keep only top 75% of detected body (head + upper shoulders, cut off chest)
    crop_bottom = top + int(content_h * 0.72)

    # Small horizontal padding
    pad_x = max(0, int(content_w * 0.04))
    crop_left  = max(0, left - pad_x)
    crop_right = min(w, right + pad_x)

    cropped = img_rgb[top:crop_bottom, crop_left:crop_right]
    return cropped


# ── Step 4: Resize to COLS×ROWS ───────────────────────────────────────────────
def resize_to_grid(img_rgb: np.ndarray) -> np.ndarray:
    print(f"[4/8] Resizing to {COLS}×{ROWS} grid cells ...")
    # Stretch to fit exactly — portrait will fill the grid
    resized = cv2.resize(img_rgb, (COLS, ROWS), interpolation=cv2.INTER_AREA)
    return resized


# ── Step 5: Grayscale + CLAHE ─────────────────────────────────────────────────
def grayscale_clahe(img_rgb: np.ndarray) -> np.ndarray:
    print("[5/8] Grayscale + CLAHE contrast enhancement ...")
    gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)
    clahe = cv2.createCLAHE(clipLimit=2.5, tileGridSize=(4, 4))
    enhanced = clahe.apply(gray)
    return enhanced


# ── Step 6: Edge detection + blend ────────────────────────────────────────────
def edge_blend(gray: np.ndarray) -> np.ndarray:
    print("[6/8] Edge detection + blend ...")
    # Canny on the small image — edges at this scale are structural features
    edges = cv2.Canny(gray, threshold1=40, threshold2=100)

    # Dilate edges slightly to thicken them (important at low resolution)
    kernel = np.ones((2, 2), np.uint8)
    edges_dilated = cv2.dilate(edges, kernel, iterations=1)

    # Blend: add edge energy as brightness boost (edges become darker in inverted world)
    # We want hair outline, glasses frames to be bright (high level)
    edge_float  = edges_dilated.astype(np.float32) / 255.0
    gray_float  = gray.astype(np.float32)

    # Edges boost brightness by up to +60
    blended = np.clip(gray_float + edge_float * 60.0, 0, 255).astype(np.uint8)
    return blended


# ── Step 7: Invert + quantize to 5 levels ─────────────────────────────────────
def quantize(gray: np.ndarray) -> np.ndarray:
    print("[7/8] Quantizing to 5 GitHub contribution levels ...")

    # Invert: dark pixels (hair, jacket, glasses) → high brightness → high level
    inv = 255 - gray.astype(np.int32)

    # Apply a mild gamma curve to push midtones (skin) toward level 1-2
    # so the face shape is still visible but the background is clearly level 0
    normalized = inv.astype(np.float32) / 255.0
    gamma = 0.75  # <1 compresses highlights, separates dark subject from bg
    gamma_corrected = np.power(normalized, gamma) * 255.0
    inv_corrected = gamma_corrected.astype(np.int32)

    # Quantize
    levels = np.zeros_like(gray, dtype=np.uint8)
    for i, t in enumerate(THRESHOLDS):
        levels[inv_corrected > t] = i + 1

    return levels


# ── Step 8: Render SVG ────────────────────────────────────────────────────────
def render_svg(matrix: np.ndarray) -> str:
    print("[8/8] Rendering SVG ...")
    rows, cols = matrix.shape
    svg_w = cols * (CELL_SIZE + GAP) + GAP
    svg_h = rows * (CELL_SIZE + GAP) + GAP

    lines = [
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'width="{svg_w}" height="{svg_h}" '
        f'viewBox="0 0 {svg_w} {svg_h}" '
        f'style="background:#0d1117;">',
    ]

    for row in range(rows):
        for col in range(cols):
            level = int(matrix[row, col])
            color = COLORS[level]
            x = GAP + col * (CELL_SIZE + GAP)
            y = GAP + row * (CELL_SIZE + GAP)
            lines.append(
                f'  <rect x="{x}" y="{y}" '
                f'width="{CELL_SIZE}" height="{CELL_SIZE}" '
                f'rx="{CELL_RADIUS}" ry="{CELL_RADIUS}" '
                f'fill="{color}"/>'
            )

    lines.append("</svg>")
    return "\n".join(lines)


# ── Step 9: Render PNG from SVG ───────────────────────────────────────────────
def render_png(matrix: np.ndarray) -> Image.Image:
    rows, cols = matrix.shape
    scale = 2   # 2× for crisp GitHub README display

    cell = CELL_SIZE * scale
    gap  = GAP * scale
    radius = CELL_RADIUS * scale

    img_w = cols * (cell + gap) + gap
    img_h = rows * (cell + gap) + gap

    from PIL import ImageDraw
    img = Image.new("RGB", (img_w, img_h), color=(13, 17, 23))
    draw = ImageDraw.Draw(img)

    color_map = {
        0: (22,  27,  34),
        1: (14,  68,  41),
        2: (0,  109,  50),
        3: (38, 166,  65),
        4: (57, 211,  83),
    }

    for row in range(rows):
        for col in range(cols):
            level = int(matrix[row, col])
            color = color_map[level]
            x = gap + col * (cell + gap)
            y = gap + row * (cell + gap)
            draw.rounded_rectangle(
                [x, y, x + cell, y + cell],
                radius=radius,
                fill=color
            )

    return img


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    # 1. Load
    img_rgb = load_image(INPUT_IMAGE)

    # 2. Remove background
    img_nobg, alpha = remove_background(img_rgb)

    # 3. Smart crop
    cropped = smart_crop(img_nobg, alpha)

    # 4. Resize to grid
    small = resize_to_grid(cropped)

    # 5. Grayscale + CLAHE
    gray = grayscale_clahe(small)

    # 6. Edge blend
    blended = edge_blend(gray)

    # 7. Quantize
    matrix = quantize(blended)

    # 8. Save SVG
    svg_content = render_svg(matrix)
    OUT_SVG.write_text(svg_content, encoding="utf-8")
    print(f"    Saved {OUT_SVG}")

    # 9. Save PNG
    png_img = render_png(matrix)
    png_img.save(OUT_PNG, "PNG", optimize=True)
    print(f"    Saved {OUT_PNG}")

    # 10. Save JSON matrix
    matrix_list = matrix.tolist()
    OUT_JSON.write_text(json.dumps({
        "rows": ROWS,
        "cols": COLS,
        "colors": COLORS,
        "matrix": matrix_list
    }, indent=2), encoding="utf-8")
    print(f"    Saved {OUT_JSON}")

    print("\nDone! Files written:")
    for f in [OUT_SVG, OUT_PNG, OUT_JSON]:
        size = f.stat().st_size
        print(f"  {f}  ({size:,} bytes)")


if __name__ == "__main__":
    main()
