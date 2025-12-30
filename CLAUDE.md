# Xenia Snapiro Portfolio

React-basierte Portfolio-Website (Vite) - Nachbau der originalen Webflow-Seite.

**Ziel:** Migration von Webflow (`www.xeniasnapiro.com`) zu Vercel für bessere Performance und günstigeres Hosting.

## Aktueller Status

### Performance (Lighthouse Desktop)
- **Performance:** 98/100 ✅
- **Accessibility:** 95/100 ✅
- **Best Practices:** 96/100 ✅
- **SEO:** 100/100 ✅

### Deployment
- **Vercel URL:** `xenia-portfolio-ten.vercel.app`
- **GitHub:** https://github.com/Katarask/xenia-portfolio
- **Domain (aktuell):** `www.xeniasnapiro.com` (noch auf Webflow)
- **Domain (geplant):** Migration zu Vercel geplant

### Portfolio Animationen
- **Desktop:** Alle 4 Spalten scrollen mit 60s (gleich schnell)
- **Mobile:** 2 Spalten mit 50s/56s
- **Richtung:** Spalte 1+3 down, Spalte 2+4 up

## Projektstruktur

- `/src/components/` - React-Komponenten (Portfolio, Contact, Services, About, Navbar)
- `/src/App.css` - Haupt-Stylesheet
- `/public/images/portfolio/` - Portfolio-Bilder (AVIF/WebP, responsive: 300w, 500w, 800w, 1000w)
- `/api/contact.js` - Contact-Formular API Route

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

## Prioritäten

### 🔴 HOCH: Domain Migration zu Vercel

**Ziel:** Migration von `www.xeniasnapiro.com` von Webflow zu Vercel

**Status:** Bereit für Migration
- ✅ Vercel-Deployment funktioniert
- ✅ Performance optimiert (98/100)
- ✅ Alle Funktionen getestet
- ✅ Rollback-Plan vorhanden

**Nächste Schritte:**
1. Domain in Vercel Dashboard hinzufügen (`www.xeniasnapiro.com` + `xeniasnapiro.com`)
2. DNS-Einstellungen bei IONOS dokumentieren (aktuell für Rollback)
3. DNS bei IONOS auf Vercel umstellen
4. Testing nach DNS-Propagation (1-4h)
5. Monitoring für 24-48h

**Detaillierter Plan:** Siehe `.cursor/plans/domain_migration_zu_vercel_4d7bae77.plan.md`

### 🟡 MITTEL: Portfolio Bilder/Text Zuordnung

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

**Datei:** `src/components/Portfolio.jsx` - `PORTFOLIO_DATA` Objekt

### 🟢 NIEDRIG: About Section Mobile

- Letzte Expertise-Card wird auf Mobile abgeschnitten
- Mehrere Lösungsversuche waren nicht erfolgreich
- Vorerst zurückgestellt (nicht kritisch)

## Erledigte Aufgaben

### Performance-Optimierungen ✅
- [x] **AVIF/WebP Bilder:** Responsive Bildformate mit srcset (300w, 500w, 800w, 1000w)
- [x] **Critical CSS:** Inline in index.html für schnelleren First Paint
- [x] **Service Worker:** Caching für bessere Performance bei wiederholten Besuchen
- [x] **Code Splitting:** Lazy Loading für Services, About, Contact, VitaModal
- [x] **Render-blocking Resources:** Eliminiert (Fonts async, CSS inline)
- [x] **LCP Optimierung:** Preload 500w Bild, eager load nur erstes Bild
- [x] **Image Optimization:** srcset max auf 1000w reduziert, sizes-Attribute präzisiert
- [x] **Video Poster:** Optimierte 500w Poster-Bilder
- [x] **Console Errors:** Alle behoben (Service Worker, Fetch, Image Loading)

### Security Headers ✅
- [x] **CSP (Content Security Policy):** XSS-Schutz
- [x] **COOP (Cross-Origin-Opener-Policy):** Isolation
- [x] **X-Content-Type-Options:** nosniff
- [x] **X-Frame-Options:** SAMEORIGIN
- [x] **X-XSS-Protection:** 1; mode=block
- [x] **Referrer-Policy:** strict-origin-when-cross-origin
- [x] **Permissions-Policy:** Geolocation, Microphone, Camera deaktiviert

### Design & UX ✅
- [x] Services Section: Row-based Layout (Label + Content auf einer Linie)
- [x] Services Section: Responsive Typografie-Variablen implementiert
- [x] Contact Heading: Beide Zeilen am rechten Rand ausgerichtet
- [x] **Spacing System:** Einheitliches Alignment-System mit CSS-Variablen implementiert
  - Navbar links/rechts mit Portfolio-Bilder-Padding ausgerichtet
  - Alle Sektionen (Services, About, Contact) verwenden einheitliches horizontales Padding
- [x] **Expertise Card Animationen:** Smoothere und koordinierte Animationen
  - Synchronisiertes Timing: 550ms für Card-Expansion
  - Elegante easing curve: `cubic-bezier(0.4, 0, 0.2, 1)`
  - GPU-Beschleunigung mit `will-change` Properties
- [x] **Expertise Card Text:** Weißer Text mit elegantem Fade-In
  - Text-Farbe: `var(--white)` (wie Headline)
  - Fade-In: 700ms mit 600ms Delay (startet nach Card-Expansion)
  - Elegante easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- [x] **Portfolio Animationen:** Alle Spalten gleich schnell (60s) für einheitliches Erscheinungsbild

## Wichtige Dateien

- `src/components/Portfolio.jsx` - Portfolio-Daten in `PORTFOLIO_DATA` Objekt (column1-4), Animation-Geschwindigkeiten
- `src/components/Services.jsx` - Services mit row-based Layout
- `src/components/Contact.jsx` - Contact-Formular und Heading
- `src/components/About.jsx` - About-Section mit Expertise-Cards
- `src/components/Navbar.jsx` - Navigation
- `src/components/Cursor.jsx` - Custom Cursor (Desktop only)
- `src/App.jsx` - Haupt-App mit Routing und Lazy Loading
- `src/App.css` - Alle Styles inkl. responsive Breakpoints und CSS Variablen
- `index.html` - HTML mit inline Critical CSS
- `vercel.json` - Vercel-Konfiguration (Security Headers, Caching)
- `public/sw.js` - Service Worker für Caching
- `api/contact.js` - Contact-Formular API Route (Resend)

## Breakpoints

- Desktop: default
- Tablet: ≤991px
- Mobile Landscape: ≤767px
- Mobile Portrait: ≤478px

## Deployment

### Vercel (automatisch bei git push)
- **Repo:** https://github.com/Katarask/xenia-portfolio
- **Branch:** main
- **Deployment:** Automatisch bei `git push origin main`
- **URL:** `xenia-portfolio-ten.vercel.app` (aktuell)
- **Domain:** `www.xeniasnapiro.com` (geplant, Migration ausstehend)

**WICHTIG:**
- NICHT `vercel` CLI direkt verwenden - nur über GitHub pushen
- Nach dem Push: Deployment-Status unter https://vercel.com prüfen
- Production URL: Wird von Vercel automatisch bereitgestellt

### Common Issues
- If push fails with "rejected": Run `git pull origin main --rebase` first
- If build fails on Vercel: Check the build logs in Vercel dashboard

## Technische Details

### Bildoptimierung
- **Formate:** AVIF (modern), WebP (Fallback), WebP (Legacy)
- **Größen:** 300w, 500w, 800w, 1000w
- **srcset:** Automatisch generiert mit `generate-responsive-images.js`
- **sizes:** Präzise Attribute für optimale Bildauswahl
- **Lazy Loading:** Alle Bilder außer erstes Portfolio-Bild
- **Error Handling:** Silent fallback bei fehlenden Bildern

### Performance-Features
- **Service Worker:** Caching für statische Assets und Bilder
- **Code Splitting:** Lazy Loading für nicht-kritische Komponenten
- **Critical CSS:** Inline in index.html
- **Font Loading:** Async mit Fallback
- **Resource Hints:** preconnect, dns-prefetch für externe Ressourcen

### Security
- **CSP:** Restriktive Content Security Policy
- **COOP:** Cross-Origin-Opener-Policy für Isolation
- **Headers:** X-Content-Type-Options, X-Frame-Options, etc.

## Migration-Plan

Siehe: `.cursor/plans/domain_migration_zu_vercel_4d7bae77.plan.md`

**Kurzfassung:**
1. Domain in Vercel hinzufügen
2. DNS bei IONOS dokumentieren (Rollback)
3. DNS auf Vercel umstellen
4. Testing nach Propagation
5. Monitoring 24-48h
