# E-Mail-Konfiguration Test - Comet Anleitung

## Ziel
Testen, ob das Contact-Formular nach der Änderung (`contact@` → `info@`) korrekt funktioniert und E-Mails ankommen.

## Änderung
- **Vorher:** `from: 'Xenia Snapiro <contact@xeniasnapiro.com>'`
- **Jetzt:** `from: 'Xenia Snapiro <info@xeniasnapiro.com>'`
- **Commit:** `3f30e8e` - "Fix: Change email sender from contact@ to info@xeniasnapiro.com"

## Schritt 1: Warte auf Vercel Deployment

1. Prüfe Vercel Dashboard: https://vercel.com/dashboard → Projekt `xenia-portfolio`
2. Warte, bis das neueste Deployment "Ready" ist (ca. 1-2 Minuten nach git push)
3. Notiere die Deployment-URL (sollte `xenia-portfolio-ten.vercel.app` sein)

## Schritt 2: Website öffnen

1. Navigiere zu: `https://xenia-portfolio-ten.vercel.app`
2. Warte, bis die Seite vollständig geladen ist
3. Prüfe, ob alle Sections funktionieren

## Schritt 3: Contact-Section finden

1. Scrolle zur Contact-Section (oder klicke auf "Contact" in der Navbar)
2. Warte, bis das Formular sichtbar ist
3. Stelle sicher, dass alle Formular-Felder sichtbar sind

## Schritt 4: Test-Formular ausfüllen

1. Klicke auf das "Your name" Feld
2. Tippe: `Test User Comet - Email Fix`
3. Klicke auf das "Your email address" Feld
4. Tippe: `comet-test-email-fix@example.com` (oder eine echte Test-E-Mail)
5. Klicke auf das "Leave your Message here" Feld
6. Tippe: `This is a test after fixing the email sender from contact@ to info@. Please verify receipt at info@xeniasnapiro.com.`
7. Klicke auf "Send message" Button

## Schritt 5: Erfolg prüfen

1. Warte 3-5 Sekunden
2. **Erwartete Meldung:** "Thank you! Your message has been sent."
3. **Wenn Erfolg:**
   - Notiere: "Formular sendet erfolgreich"
   - Weiter zu Schritt 6
4. **Wenn Fehler:**
   - Notiere die Fehlermeldung
   - Öffne Browser Console (F12 → Console)
   - Notiere alle Fehler
   - Prüfe Network Tab (F12 → Network) für API-Fehler

## Schritt 6: Vercel Logs prüfen

1. Gehe zu: https://vercel.com/dashboard → Projekt `xenia-portfolio` → "Logs"
2. Prüfe die neuesten Logs (sollten von vor 1-2 Minuten sein)
3. Suche nach: `POST /api/contact`
4. **Erwartetes Ergebnis:**
   - Status: `200` (Erfolgreich)
   - External API Call: `POST api.resend.com/emails` ✅
   - Keine Fehler in den Logs
5. **Wenn Fehler:**
   - Notiere die Fehlermeldung
   - Prüfe, ob `RESEND_API_KEY` korrekt gesetzt ist

## Schritt 7: Resend Logs prüfen

1. Gehe zu: https://resend.com/dashboard → "Logs" (linke Sidebar)
2. Prüfe die neuesten E-Mail-Versuche
3. **Erwartetes Ergebnis:**
   - **To:** `info@xeniasnapiro.com`
   - **From:** `info@xeniasnapiro.com` (nicht mehr `contact@`)
   - **Status:** `Delivered` (Zugestellt)
   - **Subject:** `New Contact: Test User Comet - Email Fix`
   - **Zeitpunkt:** Sollte mit Test-Zeit übereinstimmen
4. **Wenn Status nicht "Delivered":**
   - Notiere den Status (Bounced, Failed, etc.)
   - Prüfe die Fehlermeldung

## Schritt 8: E-Mail-Postfach prüfen

1. Öffne das E-Mail-Postfach für `info@xeniasnapiro.com`
2. Prüfe Inbox (und Spam-Ordner)
3. Suche nach E-Mail mit Betreff: "New Contact: Test User Comet - Email Fix"
4. **Wenn E-Mail vorhanden:**
   - Öffne die E-Mail
   - Prüfe Absender: Sollte `info@xeniasnapiro.com` sein (nicht mehr `contact@`)
   - Prüfe Inhalt: Name, E-Mail, Message sollten korrekt sein
   - Notiere: "✅ E-Mail erfolgreich empfangen mit korrektem Absender"
5. **Wenn E-Mail NICHT vorhanden:**
   - Warte 5-10 Minuten (E-Mail-Delivery kann verzögert sein)
   - Prüfe Spam-Ordner erneut
   - Prüfe Resend Logs nochmal (Schritt 7)

## Schritt 9: Vergleich mit vorherigem Test

**Vorheriger Test (mit contact@):**
- Resend meldete "Delivered"
- Aber E-Mail kam nicht an (weil contact@ nicht existiert)

**Jetziger Test (mit info@):**
- Resend sollte "Delivered" melden
- E-Mail sollte tatsächlich ankommen (weil info@ existiert)

## Checkliste

- [ ] Vercel Deployment ist "Ready"
- [ ] Formular sendet erfolgreich
- [ ] Vercel Logs zeigen Status 200
- [ ] Resend Logs zeigen "Delivered"
- [ ] Resend Logs zeigen `from: info@xeniasnapiro.com` (nicht contact@)
- [ ] E-Mail landet in `info@xeniasnapiro.com` Inbox
- [ ] E-Mail-Absender ist `info@xeniasnapiro.com`

## Erwartetes Ergebnis

✅ **Erfolgreich:**
- Formular sendet ohne Fehler
- Vercel Logs: Status 200
- Resend Logs: Status "Delivered", From: `info@xeniasnapiro.com`
- E-Mail landet in `info@xeniasnapiro.com` Inbox
- Absender ist korrekt: `info@xeniasnapiro.com`

❌ **Wenn Probleme:**
- Notiere alle Fehlermeldungen
- Prüfe Vercel Logs für API-Fehler
- Prüfe Resend Logs für Delivery-Status
- Prüfe, ob `info@xeniasnapiro.com` in Resend verifiziert ist

## Wichtige URLs

- **Test-Website:** https://xenia-portfolio-ten.vercel.app
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Logs:** https://vercel.com/dashboard → Projekt → Logs
- **Resend Dashboard:** https://resend.com/dashboard
- **Resend Logs:** https://resend.com/emails

## Notizen für Comet

- **Wartezeiten:** Nach Formular-Submit: 3-5 Sekunden für Bestätigung, 5-10 Minuten für E-Mail-Delivery
- **Screenshots:** Mache Screenshots von Vercel Logs, Resend Logs und E-Mail-Inbox
- **Browser Console:** F12 → Console für JavaScript-Fehler, Network Tab für API-Fehler

