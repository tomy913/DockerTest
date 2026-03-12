Du bist der Orchestrator für das Vesper & Hale Website-Projekt — eine Premium-Plattform für Family Offices. Das Projekt besteht aus einer Multi-Page-Website mit interaktiven Mega-Dropdowns, animierten Sektionen und einem Request-Access-Flow.

Erstelle und koordiniere die folgenden Sub-Agents. Jeder Agent arbeitet an seinem Bereich parallel und liefert Production-Grade-Code.

---

## AGENT 1: "Design System & Layout Agent"
AUFGABE: Erstelle das globale Design-System und die Seitenstruktur.
- CSS-Variablen für Farben: Dark (#0f0b14, #1a1520), Gold (#c9a84c, #dfc06e), Teal (#1a6b6a), Purple (#6b3fa0)
- Typography: Cormorant Garamond (Display/Headlines, italic für Akzente) + Outfit (Body, Navigation, UI)
- Globale Animationen: Scroll-Reveal mit IntersectionObserver, smooth cubic-bezier Transitions
- Responsive Breakpoints (Mobile-First, Breakpoint bei 900px)
- Fixed Navbar mit Glasmorphism-Effekt (backdrop-filter: blur) und scroll-basierter Hintergrund-Änderung
- Background: Layered radial gradients + animierte "Wave"-Elemente mit CSS-only rotation
OUTPUT: globals.css, layout.html (Grundgerüst mit Nav + Hero + Footer)

## AGENT 2: "Navigation & Mega-Dropdown Agent"  
AUFGABE: Baue die komplette interaktive Navigation.
- 3 Mega-Dropdowns für "Intelligence", "Governance", "Access"
- Jedes Dropdown hat: Intro-Text (links) + 3 interaktive Cards (rechts, Grid-Layout)
- Dropdown öffnet/schließt mit max-height Animation + staggered content fade-in
- Cards mit hover-Effekt (translateY, border-glow, Pfeil-Animation)
- Click auf Card → smooth scroll zur jeweiligen Section
- Click außerhalb → Dropdown schließt
- ESC-Taste schließt alles
- Active-State-Indikator (Gold underline) für aktuell offenes Dropdown
- Intelligence Cards: Signal Engine, Scenario Lab, Insight Reports
- Governance Cards: Decision Ledger, Mandate Tracker, Succession Planner  
- Access Cards: Deal Room, Family Circle, Advisory Network
OUTPUT: navigation.js, mega-dropdowns.html

## AGENT 3: "Content Sections Agent"
AUFGABE: Erstelle die 3 Haupt-Content-Sections als eigenständige Bereiche.
- Section "Intelligence": Label "Intelligence Platform", Headline "Your capital deserves sharper vision.", 3 Feature-Cards mit Nummern (01, 02, 03), hover-Effekte
- Section "Governance": Label "Governance Framework", Headline "Stewardship with structure.", 3 Feature-Cards, leicht dunklerer Hintergrund
- Section "Access": Label "Private Access", Headline "Join a circle built on trust.", 2-Column-Layout: Links Text, rechts eingebettetes Kontaktformular (Name, Entity, Email, Select-Dropdown, Textarea, Submit-Button)
- Jede Section: min-height 100vh, dezentes Grid-Overlay als ::before, Glow-Orb Elemente für Tiefenwirkung
- Alle Elemente nutzen scroll-reveal Animation (opacity + translateY)
OUTPUT: sections.html, sections.css

## AGENT 4: "Modal & Interactions Agent"
AUFGABE: Baue den "Request Private Access" Modal und alle Micro-Interactions.
- Modal-Overlay mit Blur-Background, centered Content-Box mit Slide-Up-Animation
- Modal enthält: Headline, Subtext, Formular (Name, Email, Entity, Textarea), Submit-Button, Close-Button (X)
- Toast-Notification-System: Slide-up vom unteren rechten Rand, auto-dismiss nach 3.5s
- Formular-Validierung: Focus-States mit Gold-Border-Glow
- Keyboard-Support: ESC schließt Modal und Dropdowns
- Alle CTA-Buttons ("Request Private Access" in Nav und Hero) öffnen den Modal
- Submit im Modal → Modal schließt + Toast erscheint
- Submit im Access-Section-Formular → Toast erscheint
OUTPUT: modal.js, toast.js, interactions.css

---

## INTEGRATION
Nach Fertigstellung aller Agents: Kombiniere alle Outputs zu einer einzigen, funktionsfähigen index.html Datei. Nutze inline <style> und <script> Tags. Externe Abhängigkeiten nur: Google Fonts (Cormorant Garamond + Outfit). Keine Frameworks, kein Build-System — reines HTML/CSS/JS.

QUALITÄTSKRITERIEN:
- Luxury-Aesthetic: Dunkel, Gold-Akzente, subtile Animationen, Cormorant Garamond für elegante Headlines
- Performance: CSS-only Animationen wo möglich, minimaler JS-Footprint
- Accessibility: Keyboard-Navigation, Focus-States, semantisches HTML
- Mobile: Voll responsiv, Touch-friendly Targets
