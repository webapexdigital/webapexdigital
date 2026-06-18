# CLAUDE.md — Apex Digital Portfolio Website

---

## What We Are Building

The Apex Digital portfolio website — a scroll-driven experience that IS the proof of work.
Every section should feel like a premium agency site. This site sells three services:
**AI Video Ads · AI Business Automation · 3D Scroll-Driven Websites**

The site itself demonstrates the 3D website service. When a prospect visits, they should immediately understand what Apex Digital does and want to hire us.

**Design reference:** `brand-guideline/sample-reference-web.png` — light theme, white/lavender background, electric blue + purple gradient accents, large bold typography, 3D Apex logo centerpiece.

---

## Tech Stack

| Tool                     | Version | Purpose                              |
| ------------------------ | ------- | ------------------------------------ |
| React                    | 18+     | UI framework                         |
| Vite                     | 5+      | Build tool, dev server               |
| TypeScript               | 5+      | Type safety                          |
| Tailwind CSS             | 3+      | Styling (config via tailwind.config.js) |
| GSAP                     | 3+      | All scroll animations and timelines  |
| @gsap/react              | latest  | useGSAP hook for React               |
| ScrollTrigger            | (GSAP)  | Scroll-driven animations             |
| Lenis                    | latest  | Smooth scroll with momentum          |
| @splinetool/react-spline | latest  | 3D scenes from Spline                |

### Install command

```bash
npm create vite@latest apex-digital -- --template react-ts
cd apex-digital
npm install gsap @gsap/react lenis @splinetool/react-spline
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

### GSAP Registration (src/lib/gsap.ts)

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
```

---

## Project Structure

```
apex-digital/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── src/
│   ├── main.tsx            ← Entry point: mounts App
│   ├── App.tsx             ← Root: Lenis provider + all sections
│   ├── index.css           ← Tailwind directives + CSS variables + base styles
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Work.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── Process.tsx
│   │   │   ├── Team.tsx
│   │   │   ├── Pricing.tsx
│   │   │   └── Contact.tsx
│   │   ├── ui/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Button.tsx
│   │   │   └── MagneticButton.tsx
│   │   └── providers/
│   │       └── LenisProvider.tsx
│   ├── hooks/
│   │   ├── useLenis.ts
│   │   └── useScrollProgress.ts
│   ├── lib/
│   │   └── gsap.ts
│   └── assets/             ← Images, SVGs
├── public/
│   ├── spline/
│   └── videos/
```

---

## Brand & Design System

### Theme: LIGHT

The site uses a **light theme** matching `sample-reference-web.png`. White and soft lavender backgrounds, dark navy text, electric blue + purple gradient accents.

### Colors

```css
:root {
  /* Backgrounds */
  --bg:          #FFFFFF;        /* primary white */
  --bg-alt:      #F0F0FF;        /* soft lavender for alternating sections */
  --bg-card:     #FFFFFF;        /* card backgrounds */

  /* Text */
  --navy:        #0D0D2B;        /* primary headings */
  --body:        #4B5563;        /* body text */
  --muted:       #9CA3AF;        /* captions, labels */

  /* Accent */
  --blue:        #0099FF;        /* primary CTA, links */
  --blue-deep:   #185fa5;        /* hover states */
  --purple:      #7B3CE8;        /* secondary accent */
  --purple-deep: #3c3489;        /* deep purple */

  /* Gradient */
  --gradient:    linear-gradient(135deg, #0099FF, #7B3CE8);
  --gradient-soft: linear-gradient(135deg, rgba(0,153,255,0.08), rgba(123,60,232,0.08));

  /* Borders & shadows */
  --border:      #E5E7EB;
  --shadow-sm:   0 2px 8px rgba(13,13,43,0.06);
  --shadow-md:   0 8px 32px rgba(13,13,43,0.10);
  --shadow-glow: 0 0 60px rgba(0,153,255,0.20);
}
```

### Tailwind config extension (tailwind.config.js)

```js
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:          'var(--bg)',
        'bg-alt':    'var(--bg-alt)',
        navy:        'var(--navy)',
        blue:        'var(--blue)',
        'blue-deep': 'var(--blue-deep)',
        purple:      'var(--purple)',
        muted:       'var(--muted)',
        border:      'var(--border)',
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### Typography (Google Fonts via index.html)

```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
```

- **Headings:** Syne — geometric, futuristic, bold
- **Body:** Inter — clean, readable

### Spacing

- Section padding: `py-24 md:py-32`
- Container: `max-w-7xl mx-auto px-6`

---

## Section Specs (from sample-reference-web.png)

### Hero
- Left: tag chip "AI · 3D · AUTOMATION", large headline "Creating AI Experiences That Convert.", subtext, two CTA buttons
- Right: 3D Apex logo (triangle mark) with gradient glow halo + floating spheres/orbs
- Background: white with subtle lavender gradient blob

### Stats Bar
- Row of 4 stats: `50M+` Impressions, `100+` Projects, `10x` ROI, `98%` Satisfaction
- Thin separator lines between stats
- Light lavender `--bg-alt` background strip

### Services
- Section title + 4 service cards in a 2×2 grid (or 4-col on desktop)
- Cards: icon, service name, short description, "Learn More →"
- Services: AI Video Ads, AI Automation, 3D Websites, Real Experiences (brand identity)

### Process ("Our Proven Process")
- Numbered horizontal steps with icons and connecting lines
- Steps: Discovery → Strategy → AI Development → Launch → Scale
- Zigzag or arc connector between steps on desktop

### Team
- Grid of team member avatars with name + role
- Subtle card or avatar-only layout

### CTA (bottom)
- Full-width section with gradient background (blue → purple)
- Large headline: "Ready To Build The Future?"
- 3D Apex logo centered
- Two CTA buttons

---

## Animation Patterns

### Text Reveal
```ts
gsap.from(selector, { y: 60, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
  scrollTrigger: { trigger, start: 'top 80%' } });
```

### Fade Up (cards)
```ts
gsap.from(selector, { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out', stagger: 0.15,
  scrollTrigger: { trigger, start: 'top 75%' } });
```

### Number Counter
```ts
gsap.to(obj, { val: target, duration: 1.5, ease: 'power1.out', onUpdate: () => { el.textContent = Math.round(obj.val) + suffix },
  scrollTrigger: { trigger: el, start: 'top 80%' } });
```

### Navbar Hide/Show
```ts
ScrollTrigger.create({ start: 'top -80', onUpdate: (self) => {
  if (self.direction === 1) gsap.to(nav, { yPercent: -110, duration: 0.35 });
  else gsap.to(nav, { yPercent: 0, duration: 0.35 });
}});
```

---

## Lenis Setup

```ts
// src/components/providers/LenisProvider.tsx
import Lenis from 'lenis';
import { useEffect } from 'react';
import { ScrollTrigger } from '../lib/gsap';

export default function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
  return <>{children}</>;
}
```

---

## Build Workflow

Components are built **one at a time** — the user provides each component prompt individually. When a component is requested:

1. Read this CLAUDE.md for brand/design rules
2. Read `brand-guideline/sample-reference-web.png` for visual reference
3. Build the component matching the reference design
4. Use brand tokens from the color system above
5. Apply GSAP animations per the patterns above
6. Keep components under 200 lines; extract sub-components if needed

---

## Performance Rules

- Lazy load Spline scenes: `React.lazy()` + `Suspense`
- Use `useGSAP()` from `@gsap/react` — never raw `useEffect` for GSAP
- Use `gsap.context()` for cleanup inside `useGSAP`
- Kill ScrollTrigger on unmount
- `will-change: transform` only on actively animating elements
- Compress videos under 5MB

---

## Mobile Rules

- Disable pinned/horizontal scroll on mobile — use vertical stack
- Spline 3D: show on desktop, fallback gradient on mobile
- Min touch target: 44px height
- Responsive headings: `text-4xl md:text-6xl lg:text-7xl`

---

## Key Constraints

- Hand-coded only — no Webflow, Framer, Wix templates
- **Light theme** — white/lavender backgrounds (overrides any previous dark-only rule)
- Never more than 3 core services (AI Video Ads, 3D Websites, AI Automation)
- Never block the main thread with heavy 3D
- Never commit `.env` files
- Always run `ScrollTrigger.refresh()` after layout changes
- Always use `useGSAP()` for all GSAP animations in React

---

## Deployment

Deploy to Vercel or Netlify — both support Vite out of the box.

```bash
npm run build   # dist/ folder
vercel          # or: netlify deploy --prod --dir=dist
```

Custom domain: `apexdigital.in`
