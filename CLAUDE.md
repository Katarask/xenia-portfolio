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

### Spacing (TODO)

Aktuell kein einheitliches Spacing-System. Verschiedene feste Pixelwerte werden verwendet.

**Ziel:** Einheitlicher Seitenrand basierend auf Portfolio-Bilder-Padding.
- Portfolio-Bilder sollen ein rundum-Padding haben
- Dieser Wert soll als `--page-margin` Variable definiert werden
- Alle Sections (Navbar, Services, About, Contact) sollen diesen Wert für Seitenränder nutzen

## Offene Aufgaben

### Spacing System (PRIORITÄT)

- Einheitlichen Seitenrand definieren basierend auf Portfolio-Bilder-Abstand
- `--page-margin` Variable erstellen
- Navbar, Services, About, Contact auf einheitlichen Seitenrand umstellen

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
