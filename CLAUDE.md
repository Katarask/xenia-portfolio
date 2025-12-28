# Xenia Snapiro Portfolio

React-basierte Portfolio-Website (Vite) - Nachbau der originalen Webflow-Seite.

## Projektstruktur

- `/src/components/` - React-Komponenten (Portfolio, Contact, Services, About, Navbar)
- `/src/App.css` - Haupt-Stylesheet
- `/public/images/portfolio/` - Portfolio-Bilder
- `/Users/denizlevent/Desktop/xeniasnapiro_backup/` - Original Webflow-Backup

## Offene Aufgaben

### Portfolio Bilder/Text Zuordnung (PRIORITÄT)

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

### Contact Section

- Heading "LEAVE YOUR / CONTACT BELOW" - beide Zeilen sollen am rechten Rand abschließen
- Aktuell: `.contact_heading-wrapper` mit `flex-direction: column` und `align-items: flex-end`
- Jede Zeile ist ein eigenes `div.contact_heading-line`

### About Section (deferred)

- Letzte Expertise-Card wird auf Mobile abgeschnitten
- Mehrere Lösungsversuche waren nicht erfolgreich
- Vorerst zurückgestellt

## Wichtige Dateien

- `src/components/Portfolio.jsx` - Portfolio-Daten in `PORTFOLIO_DATA` Objekt (column1-4)
- `src/components/Contact.jsx` - Contact-Formular und Heading
- `src/App.css` - Alle Styles inkl. responsive Breakpoints

## Breakpoints

- Desktop: default
- Tablet: ≤991px
- Mobile Landscape: ≤767px
- Mobile Portrait: ≤478px

## Deployment

- Vercel (automatisch bei git push)
- Repo: https://github.com/Katarask/xenia-portfolio
