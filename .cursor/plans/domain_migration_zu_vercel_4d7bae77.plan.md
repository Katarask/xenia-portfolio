---
name: Domain Migration zu Vercel
overview: Sicherer Umzug der Domain www.xeniasnapiro.com von Webflow zu Vercel mit Schritt-für-Schritt-Anleitung für DNS-Konfiguration, Testing und Rollback-Strategie.
todos: []
---

# Dom

ain Migration: Webflow → Vercel

## Ziel

Sichere Migration der Domain `www.xeniasnapiro.com` (und `xeniasnapiro.com`) von Webflow zu Vercel, ohne Downtime und mit Rollback-Möglichkeit.

## Voraussetzungen

- Domain bei IONOS verwaltet
- Aktuell: DNS bei IONOS zeigt auf Webflow
- Ziel: DNS bei IONOS zeigt auf Vercel
- Vercel-Projekt: `xenia-portfolio` (bereits deployed auf `xenia-portfolio-ten.vercel.app`)

## Schritt 1: Vercel Domain hinzufügen

### 1.1 Domain in Vercel Dashboard hinzufügen

1. Gehe zu: https://vercel.com/dashboard → Projekt `xenia-portfolio` → Settings → Domains
2. Klicke auf "Add Domain"
3. Füge hinzu:

- `www.xeniasnapiro.com`
- `xeniasnapiro.com` (für non-www Redirect)

4. Vercel zeigt DNS-Einstellungen an (notieren!)

### 1.2 Vercel DNS-Konfiguration notieren

Vercel zeigt typischerweise:

- **A Record** oder **CNAME** für `www.xeniasnapiro.com` → `cname.vercel-dns.com` oder IP-Adresse
- **Redirect** für `xeniasnapiro.com` → `www.xeniasnapiro.com`

**WICHTIG:** Notiere die exakten Werte, die Vercel anzeigt!

## Schritt 2: DNS bei IONOS vorbereiten (ohne zu ändern)

### 2.1 Aktuelle DNS-Einstellungen dokumentieren

1. Login bei IONOS
2. Gehe zu: Domain-Verwaltung → DNS-Einstellungen
3. **Screenshot/Notiz** aller aktuellen DNS-Records (für Rollback!)
4. Notiere besonders:

- Alle A-Records
- Alle CNAME-Records
- Alle TXT-Records (falls vorhanden)

### 2.2 Neue DNS-Records vorbereiten

Erstelle eine Liste der neuen Records (basierend auf Vercel-Anweisungen):

- **CNAME Record:** `www` → `cname.vercel-dns.com` (oder was Vercel anzeigt)
- **A Record oder CNAME:** `@` (root) → Vercel IP oder CNAME (für non-www)

## Schritt 3: Staging-Test mit Subdomain (optional, aber empfohlen)

### 3.1 Test-Subdomain bei Vercel

1. In Vercel: Füge `staging.xeniasnapiro.com` hinzu
2. Notiere DNS-Einstellungen

### 3.2 Test-Subdomain bei IONOS

1. Erstelle CNAME: `staging` → `cname.vercel-dns.com`
2. Warte auf DNS-Propagation (5-60 Minuten)
3. Teste: `staging.xeniasnapiro.com` sollte auf Vercel zeigen
4. **Verifiziere:** Alle Funktionen, Bilder, Links funktionieren

## Schritt 4: Hauptdomain umstellen

### 4.1 DNS bei IONOS ändern

1. **WICHTIG:** Mache Screenshot der aktuellen Einstellungen (Rollback!)
2. Ändere/Erstelle Records:

- **CNAME:** `www` → `cname.vercel-dns.com` (Vercel-Wert)
- **A Record oder CNAME:** `@` → Vercel IP/CNAME (für non-www)

3. **Lösche NICHT** alte Webflow-Records sofort (für Rollback)

### 4.2 DNS-Propagation abwarten

- **TTL:** Normalerweise 1-4 Stunden, kann bis 48h dauern
- **Check-Tool:** https://dnschecker.org
- Prüfe: `www.xeniasnapiro.com` und `xeniasnapiro.com`

## Schritt 5: Testing nach DNS-Änderung

### 5.1 Funktionstests

- [ ] Homepage lädt korrekt
- [ ] Portfolio-Section funktioniert
- [ ] Services, About, Contact funktionieren
- [ ] Bilder laden (alle responsive Varianten)
- [ ] Videos (Vimeo) funktionieren
- [ ] Contact-Formular funktioniert
- [ ] Navigation funktioniert
- [ ] Mobile Responsive funktioniert

### 5.2 Performance-Test

- [ ] PageSpeed Insights Test: https://pagespeed.web.dev
- [ ] Lighthouse Test (Desktop & Mobile)
- [ ] Vergleiche Scores mit vorherigen Werten

### 5.3 SEO-Check

- [ ] `www.xeniasnapiro.com` und `xeniasnapiro.com` funktionieren
- [ ] Redirect von non-www zu www funktioniert
- [ ] SSL-Zertifikat aktiv (https://)
- [ ] Keine Mixed-Content-Warnungen

## Schritt 6: Rollback-Plan (falls Probleme)

### 6.1 Wenn etwas nicht funktioniert

1. **Sofort:** Gehe zu IONOS DNS-Einstellungen
2. **Wiederherstelle** die alten DNS-Records (aus Screenshot/Notizen)
3. **Warte** auf DNS-Propagation (1-4 Stunden)
4. Website sollte wieder auf Webflow zeigen

### 6.2 Probleme identifizieren

- DNS-Propagation noch nicht abgeschlossen? → Warten
- Vercel-Konfiguration falsch? → Vercel Settings prüfen
- SSL-Zertifikat fehlt? → Vercel generiert automatisch (kann 1-24h dauern)

## Schritt 7: Finalisierung

### 7.1 Nach erfolgreichem Test (24-48h)

1. **Lösche** alte Webflow DNS-Records bei IONOS (falls noch vorhanden)
2. **Verifiziere** nochmal alle Funktionen
3. **Monitor** für 1 Woche: Fehler, Performance, Analytics

### 7.2 Webflow deaktivieren (optional)

- Wenn alles stabil läuft: Webflow-Projekt kann archiviert werden
- **NICHT löschen** (als Backup behalten)

## Wichtige Notizen für Comet

### DNS-Propagation

- **TTL (Time To Live):** Wie lange DNS-Änderungen brauchen
- **Typisch:** 1-4 Stunden, kann bis 48h dauern
- **Check:** https://dnschecker.org zeigt globale DNS-Propagation

### Vercel SSL

- Vercel generiert automatisch SSL-Zertifikate (Let's Encrypt)
- **Dauer:** 1-24 Stunden nach DNS-Änderung
- **Check:** Browser zeigt grünes Schloss

### Monitoring

- **Vercel Analytics:** Aktivieren für Monitoring
- **Error Tracking:** Vercel Logs prüfen
- **Performance:** Vercel Speed Insights aktivieren

## Checkliste für Comet

**Vor der Migration:**

- [ ] Vercel Domain hinzugefügt (`www.xeniasnapiro.com` und `xeniasnapiro.com`)
- [ ] Vercel DNS-Werte notiert
- [ ] Aktuelle IONOS DNS-Einstellungen dokumentiert (Screenshot)
- [ ] Staging-Test durchgeführt (optional)

**Während der Migration:**

- [ ] DNS bei IONOS geändert
- [ ] DNS-Propagation überwacht (dnschecker.org)
- [ ] SSL-Zertifikat aktiv (kann 1-24h dauern)

**Nach der Migration:**

- [ ] Alle Funktionen getestet
- [ ] PageSpeed Test durchgeführt
- [ ] 24-48h Monitoring
- [ ] Alte DNS-Records gelöscht (nach erfolgreichem Test)

## Support-Links

- **Vercel DNS Docs:** https://vercel.com/docs/concepts/projects/domains
- **IONOS DNS:** IONOS Dashboard → Domain-Verwaltung