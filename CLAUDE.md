# Vesper & Hale — Development Guide for AI SWE Agents

Cinematic landing page for "Vesper & Hale" — a bespoke wealth intelligence platform for family offices. Built as a
single-page React app with luxury aesthetics, GSAP-driven animations, and interactive micro-UI components.

Read more about the brand, design vision, and agent team build process in
[cinematic-landing-page-agent-team-prompt.md](cinematic-landing-page-agent-team-prompt.md).

## Tech Stack

- **Framework:** React 19 + Vite 7 (SPA, ESM modules)
- **Styling:** Tailwind CSS 3.4 + PostCSS + Autoprefixer
- **Animations:** GSAP 3 with ScrollTrigger plugin + @gsap/react
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Inter, Playfair Display, JetBrains Mono) — loaded via `<link>` in `index.html`

## Environment

- Dev container based on Ubuntu with Node.js 22
- Claude Code is pre-installed globally via npm
- Agent Teams are enabled (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`)
- Model: `claude-opus-4-6`

## Project Structure

All source code lives inside the `vesper-hale/` subdirectory:

```
vesper-hale/
├── index.html                      # Entry HTML with Google Fonts links
├── vite.config.js                  # Vite build config (React plugin)
├── tailwind.config.js              # Tailwind theme: colors, fonts, border-radius
├── postcss.config.js               # PostCSS (Tailwind + Autoprefixer)
├── eslint.config.js                # ESLint for .js/.jsx
├── src/
│   ├── main.jsx                    # React entry point
│   ├── App.jsx                     # Root component — imports all sections in order
│   ├── index.css                   # Tailwind directives, noise overlay, font utilities, button animations
│   ├── designTokens.js             # Centralized design system (colors, fonts, easings, stagger)
│   └── components/
│       ├── Navbar.jsx              # Fixed morphing navigation (IntersectionObserver)
│       ├── Hero.jsx                # Full-screen hero (100dvh, GSAP fade-up)
│       ├── Features.jsx            # Expandable tabs with 3 interactive micro-UI cards
│       ├── Philosophy.jsx          # Parallax section with word-by-word fade
│       ├── Protocol.jsx            # Sticky stacking cards with SVG animations
│       ├── Pricing.jsx             # 3-tier pricing grid
│       └── Footer.jsx              # Dark footer with system status indicator
```

## Commands

All commands run from `vesper-hale/`:

```bash
cd vesper-hale
npm run dev         # Start Vite dev server with HMR
npm run build       # Production build (outputs to dist/)
npm run lint        # Run ESLint on .js/.jsx files
npm run preview     # Preview production build locally
npm install         # Install dependencies (run first if node_modules missing)
```

If `vite` is not found, run `npm install` first. Nearly all changes trigger hot reload. Changes to `vite.config.js` or
`tailwind.config.js` require a dev server restart.

## Design System

All design tokens are centralized in [designTokens.js](vesper-hale/src/designTokens.js). Always import from here
instead of hardcoding values.

### Midnight Luxe Palette

| Token       | Hex       | Usage                          |
|-------------|-----------|--------------------------------|
| `obsidian`  | `#0D0D12` | Primary dark backgrounds       |
| `champagne` | `#C9A84C` | Gold accent, CTAs, highlights  |
| `ivory`     | `#FAF8F5` | Light section backgrounds      |
| `slate`     | `#2A2A35` | Body text, dark UI elements    |

### Typography

| Class          | Font              | Usage                              |
|----------------|-------------------|------------------------------------|
| `font-heading` | Inter             | Headings, UI text (tracking -0.03) |
| `font-drama`   | Playfair Display  | Dramatic statements (italic)       |
| `font-mono`    | JetBrains Mono    | Telemetry, system text, labels     |

### Animation Tokens

| Token                | Value                               | Usage                    |
|----------------------|-------------------------------------|--------------------------|
| `easings.entrance`   | `power3.out`                        | Element entrances        |
| `easings.morph`      | `power2.inOut`                      | Smooth transitions       |
| `easings.springBounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Elastic effects        |
| `stagger.text`       | `0.08`                              | Text element stagger     |
| `stagger.cards`      | `0.15`                              | Card group stagger       |

## Architecture Patterns

### Component Structure

`App.jsx` imports and renders all section components in visual order (Navbar → Hero → Features → Philosophy →
Protocol → Pricing → Footer). Each component is self-contained in a single file with its own animations.

### GSAP Animation Pattern

All GSAP animations follow this cleanup pattern:

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // animations here
  }, containerRef);
  return () => ctx.revert();
}, []);
```

ScrollTrigger animations use `trigger` + `start: 'top 80%'` for scroll-driven entrances. Manual timers
(`setInterval`, `setTimeout`) must be cleared in the `useEffect` return.

### Responsive Approach

Mobile-first using Tailwind breakpoints (`md:`, `lg:`). Common patterns:
- `flex-col md:flex-row` for layout direction
- `grid-cols-1 md:grid-cols-3` for card grids
- `text-3xl md:text-5xl lg:text-6xl` for responsive typography

### Styling Conventions

- Border radius: `rounded-[2rem]` to `rounded-[3rem]` for the luxury aesthetic
- Shadows: `shadow-lg shadow-black/5` for subtle depth
- Glass morphism: `backdrop-blur-xl` + semi-transparent backgrounds
- All Unsplash images use real URLs (`w=1920&q=80`), hero images `loading="eager"`, below-fold `loading="lazy"`

## Key Files Reference

| File | Purpose |
|------|---------|
| [designTokens.js](vesper-hale/src/designTokens.js) | Colors, fonts, easings, stagger — import from here |
| [index.css](vesper-hale/src/index.css) | Tailwind directives, noise overlay, font utilities, button hover |
| [App.jsx](vesper-hale/src/App.jsx) | Root component, section ordering |
| [Features.jsx](vesper-hale/src/components/Features.jsx) | Expandable tabs with interactive micro-UIs (most complex component) |
| [Protocol.jsx](vesper-hale/src/components/Protocol.jsx) | Sticky stacking cards with SVG animations (ScrollTrigger pinning) |
| [tailwind.config.js](vesper-hale/tailwind.config.js) | Theme extensions (colors, fonts, border-radius) |

## Agent Teams

This project was built using Claude Code Agent Teams. The build prompt is in
[cinematic-landing-page-agent-team-prompt.md](cinematic-landing-page-agent-team-prompt.md). The team topology:
- **Scaffolder** — project setup, config, design tokens
- **Above the Fold** — Navbar, Hero, Footer
- **Interactive Cards** — Features, Philosophy
- **Deep Scroll** — Protocol, Pricing

When building new features with Agent Teams, follow the same pattern: define file ownership per teammate, share
`designTokens.js` as the common interface, and have a Team Lead coordinate integration.

## Quality Standards

- No placeholders, no TODOs, no half-built sections
- Every GSAP animation must use `gsap.context()` with cleanup in `useEffect` return
- Every image must be a real Unsplash URL (dark marble, gold, luxury aesthetic)
- All components must be mobile responsive
- Validate with `npm run build` — zero errors before committing
- This is a digital instrument, not a website. Every scroll intentional, every animation weighted.
