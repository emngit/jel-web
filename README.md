# jel-web — John Emman Lanusga's Portfolio

Personal portfolio website for John Emman Lanusga — IBM Process Delivery Specialist, QA Analyst, Salesforce Certified Administrator, and full-stack developer.

![Portfolio Preview](https://github.com/user-attachments/assets/d4920dba-371c-4ff0-9168-dbc51a44bf86)

**Live at:** [emmanlanusga@gmail.com](mailto:emmanlanusga@gmail.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + JSX |
| Build tool | Vite 8 |
| Styling | Plain CSS (custom properties, grid, flexbox) |
| Animation | CSS keyframes · Canvas 2D API · SVG filters |
| Typewriter | `typewriter-effect` |

---

## Project Structure

```
jel-web/
├── src/
│   ├── App.jsx                  # Main single-page layout (all sections)
│   ├── App.css                  # Global styles & design tokens
│   ├── PortalGateway.jsx        # Interactive dimensional portal component
│   ├── main.jsx                 # React entry point
│   └── assets/
│       └── images/
│           ├── Kairos/          # Kairos project screenshots
│           │   ├── JIRA-Priority.png
│           │   └── Login-Page.png
│           ├── Kada Tipon/      # Kada Tipon game screenshots
│           │   ├── Kada-Tipon-Start.png
│           │   └── Kada-Tipon-How-To.png
│           ├── PORTAL.png       # Portal gateway source image
│           ├── My_LOGO*.png     # Brand logo variants
│           └── LANUSGA_JEL_CV.pdf
├── index.html
├── vite.config.js
└── package.json
```

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Name, title, typewriter role, CTA buttons |
| **Projects & Outcomes** | Featured project cards with screenshot thumbnails and hover reveal |
| **Skills & Tools** | 24-skill grid covering QA, languages, data, ops, and creative tools |
| **Certifications** | Salesforce Certified Administrator badge |
| **Experience** | Career timeline (IBM · Concentrix · Accenture · Hyundai · 3GX internship) |
| **About + Portal** | Bio text alongside the interactive dimensional portal easter egg |
| **Game** | Embedded Kada Tipon game (Construct, playable in-browser) |
| **Contact** | Email CTA + social links (LinkedIn, Facebook, Instagram) |

---

## Featured Components

### `PortalGateway.jsx`

An interactive Canvas 2D + SVG portal animation with:

- **Continuous rotation** via CSS `@keyframes portal-rotate` (18 s base, 5 s on hover)
- **Breathing pulse** — subtle `scale(1) → scale(1.04)` every 5 s
- **Orbital particles** — spawn on the portal rim (r ≈ 150 px), orbit at randomised speeds; `absorb` particles drift inward
- **Ripple rings** — concentric rings expand from the portal edge, blend with the background grid
- **Radial glow** — soft atmospheric halo, intensity tied to hover + scroll position
- **SVG turbulence filter** (`feTurbulence` + `feDisplacementMap`) — liquid warp distortion on the portal image, animated continuously
- **Mouse follow** — portal image tracks cursor up to ±15 px
- **Click burst** — 0.8 s particle surge on click
- **Scroll energy** — glow and particle rate increase as the user scrolls
- **Easter egg** — every 30–60 s a QA-themed icon (bug · checkmark · Salesforce cloud · gear) fades in over the portal and disappears
- **`prefers-reduced-motion`** — all animations and canvas disabled when the OS setting is on

### Project Cards

- **Kairos** card: full-width horizontal layout (thumbnail 58%, body 42%)
- **Kada Tipon** card: same horizontal layout
- Thumbnail shows two screenshots side-by-side; on hover the second expands via flex transition
- Fully responsive — stacks vertically at ≤ 900 px

---

## Experience (Resume 2026)

| Period | Role | Company |
|---|---|---|
| July 2025 – Present | Process Delivery Specialist – Order To Cash | IBM, Naga City |
| Nov 2024 – Jul 2025 | Advisor I | Concentrix, Naga City |
| Jun 2022 – Jul 2024 | Application Development Associate | Accenture, Mandaluyong |
| Dec 2021 – Apr 2022 | Digital Marketing Administrator | Hyundai Alabang (Naga) |
| Jan 2020 – Mar 2020 | Junior Web Developer (Internship) | 3GX Computers & Solutions |

---

## Skills

`Salesforce` · `Manual Testing` · `Test Case Planning` · `Defect Management` · `Regression Testing` · `Jira` · `JavaScript` · `Python` · `Java` · `Apex` · `HTML/CSS` · `PHP` · `Node.js` · `C++` · `MySQL/SQL` · `Data Visualization` · `ER Modeling` · `Git` · `Agile/SDLC` · `Order To Cash (OTC)` · `Process Management` · `Adobe Illustrator` · `Adobe Photoshop` · `Adobe Premiere`

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Contact

**John Emman Lanusga**
- Email: [emmanlanusga@gmail.com](mailto:emmanlanusga@gmail.com)
- LinkedIn: [linkedin.com/in/jelanusga](https://www.linkedin.com/in/jelanusga/)
- Location: Naga City, Camarines Sur, Philippines
