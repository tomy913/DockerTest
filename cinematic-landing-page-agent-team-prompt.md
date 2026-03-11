# Cinematic Landing Page — Agent Team Build Prompt

> **Usage:** Paste this prompt into Claude Code. It will create an agent team with a Team Lead + 4 specialized teammates that build the landing page in parallel.

---

## Prompt (paste this into Claude Code)

```
Create an agent team to build a cinematic landing page for "Vesper & Hale" — a bespoke wealth intelligence platform for family offices.

Use delegate mode. You are the Team Lead. You coordinate only — no code writing.

## Shared Context (give this to ALL teammates)

### Brand
- Name: Vesper & Hale
- Purpose: Bespoke wealth intelligence for the next generation of family offices
- CTA: "Request Private Access"
- Value Props:
  1. Real-time Portfolio Synthesis — unified visibility across asset classes, jurisdictions, custodians
  2. Predictive Risk Narratives — AI scenario analyses that translate volatility into decision briefs
  3. Multi-Generational Governance — succession frameworks with role-based access and audit trails

### Design Tokens (Midnight Luxe)
- Primary (Obsidian): #0D0D12
- Accent (Champagne): #C9A84C
- Background (Ivory): #FAF8F5
- Text/Dark (Slate): #2A2A35
- Heading font: Inter (letter-spacing: -0.03em)
- Drama font: Playfair Display Italic
- Mono font: JetBrains Mono
- Border radius: rounded-[2rem] to rounded-[3rem] everywhere
- Noise overlay: inline SVG feTurbulence filter at 0.05 opacity
- Button hover: scale(1.03) with cubic-bezier(0.25, 0.46, 0.45, 0.94), sliding background span
- GSAP easing: power3.out (entrances), power2.inOut (morphs), stagger 0.08 text / 0.15 cards
- Images: real Unsplash URLs — dark marble, gold accents, architectural shadows, luxury interiors

### Tech Stack
- React 19 (Vite), Tailwind CSS v3.4.17, GSAP 3 + ScrollTrigger, Lucide React
- Google Fonts loaded via <link> in index.html: Inter, Playfair Display, JetBrains Mono

---

## Team Structure — Spawn 4 teammates

### Teammate 1: "Scaffolder"
**Task:** Project setup + shared infrastructure. Work in the project root.

1. Run: npm create vite@latest vesper-hale -- --template react
2. cd vesper-hale && npm install
3. npm install gsap @gsap/react lucide-react
4. Set up Tailwind CSS v3.4.17 (postcss, tailwind.config.js)
5. Add Google Fonts links to index.html (Inter, Playfair Display, JetBrains Mono)
6. Create src/index.css with:
   - Tailwind directives (@tailwind base/components/utilities)
   - Global noise overlay (SVG feTurbulence at 0.05 opacity, pointer-events-none, fixed, full-screen)
   - Custom font-family utilities (.font-heading, .font-drama, .font-mono)
   - Custom button magnetic hover animation classes
   - Smooth scroll behavior
7. Create src/designTokens.js exporting all colors, font classes, and shared constants
8. Create src/App.jsx with placeholder imports for all section components (Navbar, Hero, Features, Philosophy, Protocol, Pricing, Footer)
9. Message ALL other teammates when done: "Scaffold ready. designTokens.js is at src/designTokens.js. Start building your components."

**Files owned:** package.json, tailwind.config.js, postcss.config.js, index.html, src/index.css, src/designTokens.js, src/App.jsx, src/main.jsx

---

### Teammate 2: "Above the Fold"
**Task:** Navbar + Hero + Footer. Wait for Scaffolder's message before starting.

**src/components/Navbar.jsx:**
- Fixed pill-shaped container, horizontally centered
- Morphing: transparent + light text at top → bg-[#FAF8F5]/60 backdrop-blur-xl + dark text when scrolled past hero (use IntersectionObserver)
- Logo: "Vesper & Hale" text, 3 nav links (Intelligence, Governance, Access), CTA button in Champagne

**src/components/Hero.jsx:**
- 100dvh, full-bleed Unsplash background (dark marble/luxury interior), gradient overlay (Obsidian→black)
- Content at bottom-left third (flex + generous padding)
- Typography: "Legacy meets" in bold Inter (large) → "Precision." in massive Playfair Display Italic (3-5x size)
- GSAP staggered fade-up (y:40→0, opacity:0→1) for all text + CTA
- CTA: "Request Private Access" in Champagne with magnetic hover

**src/components/Footer.jsx:**
- Deep Obsidian background, rounded-t-[4rem]
- Grid: brand name + tagline column, nav columns, legal links
- "System Operational" indicator: pulsing green dot + JetBrains Mono label

**Files owned:** src/components/Navbar.jsx, src/components/Hero.jsx, src/components/Footer.jsx

---

### Teammate 3: "Interactive Cards"
**Task:** Features section + Philosophy section. Wait for Scaffolder's message before starting.

**src/components/Features.jsx — 3 interactive micro-UI cards:**

Card 1 — "Diagnostic Shuffler" (Value Prop 1):
- 3 overlapping cards cycling vertically every 3s, spring-bounce transition (cubic-bezier(0.34, 1.56, 0.64, 1))
- Sub-labels: "Equities & Alternatives", "Cross-Border Holdings", "Custodian Reconciliation"
- Heading: "Real-time Portfolio Synthesis"

Card 2 — "Telemetry Typewriter" (Value Prop 2):
- Monospace character-by-character typing with blinking Champagne cursor
- Messages cycle: "▸ Scenario: Fed +50bp — portfolio impact: -2.3%…", "▸ Hedge recommendation: rotate 12% into short-duration…", "▸ Risk narrative updated for Q3 review…"
- "Live Feed" label with pulsing accent dot
- Heading: "Predictive Risk Narratives"

Card 3 — "Cursor Protocol Scheduler" (Value Prop 3):
- Weekly grid (S M T W T F S), animated SVG cursor enters, moves to day, clicks (scale 0.95 press), activates day (Champagne highlight), moves to "Save", fades out
- Label: "Governance Calendar — Voting & Review Cadence"
- Heading: "Multi-Generational Governance"

All cards: Ivory bg, subtle border, rounded-[2rem], drop shadow, bold heading + descriptor text.

**src/components/Philosophy.jsx:**
- Full-width, Obsidian background
- Parallax texture image (dark marble, low opacity) behind text
- Two contrasting lines:
  - "Most wealth platforms focus on: dashboards and data dumps." — neutral, smaller
  - "We focus on: Decisions." — massive Playfair Display Italic, "Decisions" in Champagne
- GSAP word-by-word fade-up on scroll (ScrollTrigger)

**Files owned:** src/components/Features.jsx, src/components/Philosophy.jsx

---

### Teammate 4: "Deep Scroll"
**Task:** Protocol (sticky stacking) + Pricing section. Wait for Scaffolder's message before starting.

**src/components/Protocol.jsx — 3 sticky stacking full-screen cards:**
- GSAP ScrollTrigger with pin:true
- Each new card causes previous to scale(0.9), blur(20px), opacity(0.5)
- Each card has a unique SVG/canvas animation:
  1. "Step 01 — Discovery & Intake" → slowly rotating concentric circles
  2. "Step 02 — Portfolio Architecture" → scanning horizontal laser-line across dot grid
  3. "Step 03 — Governance Activation" → pulsing EKG-style SVG waveform (stroke-dashoffset)
- Card content: step number (JetBrains Mono), title (Inter bold), 2-line description

**src/components/Pricing.jsx — 3-tier grid:**
- Essential (standard), Performance (Obsidian bg + Champagne CTA, slightly larger), Enterprise (standard)
- Each: tier name, brief tagline, 4-5 bullet features, CTA button
- Subtle scale/ring highlight on middle card

**Files owned:** src/components/Protocol.jsx, src/components/Pricing.jsx

---

## Coordination Rules

1. Scaffolder starts immediately. All others wait for the "Scaffold ready" message.
2. Each teammate owns their files — no cross-editing.
3. All teammates import design tokens from src/designTokens.js for consistent colors/fonts.
4. When a teammate finishes, message the Team Lead: "Done — [component names] ready."
5. After all 4 teammates report done, Team Lead:
   - Updates src/App.jsx to wire all imports together in correct order
   - Runs npm run dev and verifies no errors
   - Checks that all animations fire and all Unsplash images load
   - Fixes any integration issues

## Quality Bar
- NO placeholders, NO TODOs, NO half-built sections
- Every animation must be fully wired with gsap.context() + cleanup
- Every image must be a real Unsplash URL (dark marble, gold, luxury)
- Mobile responsive: stack on mobile, reduce hero fonts, collapse navbar
- This is a digital instrument, not a website. Every scroll intentional, every animation weighted.
```

---

## How to Use

1. Make sure Agent Teams are enabled:
   ```json
   // settings.json
   { "experimental": { "agentTeams": true } }
   ```
   Or set the environment variable: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=true`

2. Open Claude Code in your terminal (tmux recommended for split panes)

3. Paste the entire prompt above (everything inside the ``` block)

4. Claude will spawn the Team Lead + 4 teammates. You'll see them working in parallel.

5. Use **Shift+Down** to cycle through teammates and check progress.

6. The Team Lead will do final integration and run `npm run dev` when all teammates report done.

---

## Team Topology

```
┌─────────────────────────────────────────────┐
│                 TEAM LEAD                    │
│         (delegate mode — no code)            │
│    Coordinates, reviews, integrates          │
└──────┬──────┬──────────┬──────────┬──────────┘
       │      │          │          │
  ┌────▼──┐ ┌─▼────────┐ ┌▼────────┐ ┌▼─────────┐
  │Scaff- │ │Above the │ │Interact-│ │Deep      │
  │older  │ │Fold      │ │ive Cards│ │Scroll    │
  │       │ │          │ │         │ │          │
  │setup  │ │Navbar    │ │Features │ │Protocol  │
  │config │ │Hero      │ │Philoso- │ │Pricing   │
  │tokens │ │Footer    │ │phy      │ │          │
  └───┬───┘ └──────────┘ └─────────┘ └──────────┘
      │
      ▼ "Scaffold ready" → unblocks all others
```

## Estimated Token Usage

Agent Teams use significantly more tokens than single sessions. This build with 4 teammates will likely use **5-8x** the tokens of a sequential build. The tradeoff is speed: what takes 20-30 minutes sequentially compresses to ~8-12 minutes in parallel.

## Tips

- **Use tmux** for visibility into all panes simultaneously
- **Delegate mode** keeps the Team Lead from trying to write code itself
- If a teammate gets stuck, message it directly with Shift+Down
- After the build, you can spawn a 5th "QA" teammate to audit animations and responsiveness
