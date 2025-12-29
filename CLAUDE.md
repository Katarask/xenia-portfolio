# Xenia Snapiro Portfolio

React-basierte Portfolio-Website (Vite) - Nachbau der originalen Webflow-Seite.

## Projektstruktur

- `/src/components/` - React-Komponenten (Portfolio, Contact, Services, About, Navbar)
- `/src/App.css` - Haupt-Stylesheet
- `/public/images/portfolio/` - Portfolio-Bilder

## Design System

### Typografie (CSS Variablen in :root)

Responsive Typografie-System mit Breakpoints:

- `--text-xs: 12px` (tagline, labels)
- `--text-sm: 14px` (navbar links, subtitles)
- `--text-base: 16px` (body, services)
- `--text-lg: 18px` (mobile menu)
- `--text-xl: 24px` (navbar name)
- `--text-2xl: 28px` (story titles)
- `--text-3xl: 32px` (about heading)
- `--text-4xl: 48px` (large headings)
- `--text-5xl: 80px` (contact heading)

Die Werte passen sich automatisch an Breakpoints an (siehe App.css :root).

### Spacing System ✅

Einheitliches Alignment-System basierend auf Portfolio-Bilder-Padding:

**CSS Variablen:**
- `--image-padding: 10px` - Portfolio-Bilder Padding (Referenzwert)
- `--content-padding-x: 10px` - Horizontal padding für alle Content-Sektionen
- `--content-padding-y: 48px` - Vertikales padding (Desktop)
- `--content-padding-y-mobile: 24px` - Vertikales padding (Mobile)

**Anwendung:**
- Navbar: Links und rechts mit `var(--content-padding-x)` ausgerichtet
- Portfolio: Bilder haben `var(--image-padding)` (10px)
- Services, About, Contact: Alle verwenden `var(--content-padding-x)` für horizontales Padding
- Einheitliche Ausrichtung auf der gesamten Website

## Offene Aufgaben

### Portfolio Bilder/Text Zuordnung

Die Reihenfolge und Texte der Portfolio-Bilder müssen korrigiert werden.

**Gewünschte Reihenfolge:**

**Column 1 (LINE 1):**
1. Video: Safira Robens (actress) campaign video for fashion brand
2. Soap & Skin (musician, actress) Interview for C/O Magazine
3. Santino (das deck agency) fashion campaign
4. Rick Owens (designer) portrait
5. Loewe (fashion brand) product shooting test

**Column 2 (LINE 2):**
1. Eric Joham (artist) Interview for C/O Magazine
2. Orania (model) for brand Laura Gerte
3. Joanna (das deck agency) editorial shooting Martin Niklas Wieser
4. Santino (das deck agency) fashion campaign
5. Video: Ernst Lima (artist) for DAS WEISSE HAUS

**Column 3 (LINE 3):**
1. Bonnie Strange (model, DJ) Campaign for Spotify/Sony Music
2. das deck model editorial campaign for fashion brand
3. Bonnie Strange (model, DJ) Campaign for Spotify/Sony Music
4. das deck model editorial campaign for fashion brand
5. Video: Mood Video fashion show curated by Wales Bonner

**Column 4 (LINE 4):**
1. AFA Awards Fashion show by Austrian Fashion Association
2. Soap & Skin (musician, actress) Interview for C/O Magazine
3. das deck model editorial campaign for fashion brand
4. Mood Video (Fashion Campaign)
5. Wendy & Jim brand owners Interview for C/O Magazine
6. Video (kein Text)

### About Section (zurückgestellt)

- Letzte Expertise-Card wird auf Mobile abgeschnitten
- Mehrere Lösungsversuche waren nicht erfolgreich
- Vorerst zurückgestellt

## Erledigte Aufgaben

- [x] Services Section: Row-based Layout (Label + Content auf einer Linie)
- [x] Services Section: Responsive Typografie-Variablen implementiert
- [x] Contact Heading: Beide Zeilen am rechten Rand ausgerichtet
- [x] **Spacing System**: Einheitliches Alignment-System mit CSS-Variablen implementiert
  - Navbar links/rechts mit Portfolio-Bilder-Padding ausgerichtet
  - Alle Sektionen (Services, About, Contact) verwenden einheitliches horizontales Padding
- [x] **Expertise Card Animationen**: Smoothere und koordinierte Animationen
  - Synchronisiertes Timing: 550ms für Card-Expansion
  - Elegante easing curve: `cubic-bezier(0.4, 0, 0.2, 1)`
  - GPU-Beschleunigung mit `will-change` Properties
- [x] **Expertise Card Text**: Weißer Text mit elegantem Fade-In
  - Text-Farbe: `var(--white)` (wie Headline)
  - Fade-In: 700ms mit 600ms Delay (startet nach Card-Expansion)
  - Elegante easing: `cubic-bezier(0.22, 1, 0.36, 1)`

## Wichtige Dateien

- `src/components/Portfolio.jsx` - Portfolio-Daten in `PORTFOLIO_DATA` Objekt (column1-4)
- `src/components/Services.jsx` - Services mit row-based Layout
- `src/components/Contact.jsx` - Contact-Formular und Heading
- `src/App.css` - Alle Styles inkl. responsive Breakpoints und CSS Variablen

## Breakpoints

- Desktop: default
- Tablet: ≤991px
- Mobile Landscape: ≤767px
- Mobile Portrait: ≤478px

## Deployment

- Vercel (automatisch bei git push)
- Repo: https://github.com/Katarask/xenia-portfolio
