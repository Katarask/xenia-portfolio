# Domain-Migration: www.xeniasnapiro.com von Webflow (IONOS) zu Vercel

## Übersicht

**Aktuelle Situation:**
- Domain: `www.xeniasnapiro.com`
- Aktuell gehostet bei: Webflow (über IONOS)
- Ziel: Vercel
- Domain-Registrar: IONOS
- E-Mail: `info@xeniasnapiro.com` (funktioniert bereits auf IONOS)

**Vercel Deployment:**
- URL: `xenia-portfolio-ten.vercel.app`
- GitHub Repo: `https://github.com/Katarask/xenia-portfolio`
- Automatisches Deployment bei git push

## Schritt-für-Schritt Protokoll für Comet

### Phase 1: Vorbereitung (VOR der Migration)

1. **Backup der aktuellen Webflow-Seite**
   - Screenshots der wichtigsten Seiten machen
   - Alle Inhalte dokumentieren
   - ✅ Bereits vorhanden in `/public/webflow-backup/`

2. **Vercel Domain-Verifizierung**
   - In Vercel Dashboard: Project Settings → Domains
   - Domain `www.xeniasnapiro.com` hinzufügen
   - DNS-Einträge von Vercel notieren (werden angezeigt)

3. **IONOS DNS-Zugriff prüfen**
   - Login zu IONOS Dashboard
   - DNS-Verwaltung für `xeniasnapiro.com` öffnen
   - Aktuelle DNS-Einträge dokumentieren (für Rollback)

### Phase 2: DNS-Konfiguration in IONOS

**WICHTIG:** Diese Schritte müssen in IONOS durchgeführt werden.

1. **IONOS Dashboard öffnen**
   - URL: `https://www.ionos.de/`
   - Login mit IONOS-Zugangsdaten
   - Domain `xeniasnapiro.com` auswählen

2. **DNS-Verwaltung öffnen**
   - Navigation: Domain & SSL → DNS-Verwaltung
   - Oder: Domain-Verwaltung → DNS-Einträge

3. **Aktuelle DNS-Einträge dokumentieren**
   - Screenshot oder Liste aller aktuellen Einträge
   - Besonders wichtig: MX-Einträge für E-Mail (info@xeniasnapiro.com)

4. **Vercel DNS-Einträge hinzufügen**
   
   **Für www.xeniasnapiro.com:**
   - **Typ:** CNAME
   - **Name:** www
   - **Wert:** `cname.vercel-dns.com`
   - **TTL:** 3600 (oder Standard)

   **Für Root-Domain (xeniasnapiro.com):**
   - **Typ:** A
   - **Name:** @ (oder leer)
   - **Wert:** `76.76.21.21` (Vercel IP - kann variieren, in Vercel Dashboard prüfen!)
   - **TTL:** 3600

   **ODER alternativ (empfohlen):**
   - **Typ:** ALIAS/ANAME (falls von IONOS unterstützt)
   - **Name:** @
   - **Wert:** `cname.vercel-dns.com`

5. **MX-Einträge BEIBEHALTEN** (für E-Mail)
   - **NICHT löschen oder ändern!**
   - Diese sind für `info@xeniasnapiro.com` notwendig
   - Aktuelle MX-Einträge dokumentieren und unverändert lassen

6. **DNS-Änderungen speichern**
   - Alle Änderungen speichern
   - Wartezeit: DNS-Propagierung kann 24-48 Stunden dauern
   - Normalerweise aber innerhalb von 1-2 Stunden sichtbar

### Phase 3: Vercel Domain-Konfiguration

1. **Domain in Vercel hinzufügen**
   - Vercel Dashboard: Project Settings → Domains
   - Domain `www.xeniasnapiro.com` hinzufügen
   - Vercel zeigt DNS-Einträge an (bereits in Phase 2 verwendet)

2. **SSL-Zertifikat prüfen**
   - Vercel erstellt automatisch SSL-Zertifikat (Let's Encrypt)
   - Status in Vercel Dashboard prüfen
   - Kann 1-2 Stunden dauern

### Phase 4: Verifizierung

1. **DNS-Propagierung prüfen**
   - Tool: `https://dnschecker.org/`
   - Domain: `www.xeniasnapiro.com`
   - Prüfen, ob CNAME auf `cname.vercel-dns.com` zeigt
   - Warten bis alle Server aktualisiert sind (kann 24-48h dauern)

2. **Website testen**
   - `https://www.xeniasnapiro.com` im Browser öffnen
   - Prüfen, ob Vercel-Version angezeigt wird
   - Alle Seiten testen (Portfolio, Services, About, Contact)

3. **E-Mail-Funktionalität testen**
   - Contact-Formular testen
   - Prüfen, ob E-Mails an `info@xeniasnapiro.com` ankommen
   - **WICHTIG:** E-Mail sollte weiterhin funktionieren, da MX-Einträge unverändert bleiben

4. **Performance testen**
   - Lighthouse-Test durchführen
   - PageSpeed Insights testen
   - Vergleich mit alter Webflow-Version

### Phase 5: Rollback-Plan (falls nötig)

**Falls etwas schief geht:**

1. **DNS-Einträge in IONOS zurücksetzen**
   - Alte DNS-Einträge wiederherstellen (aus Phase 1 Dokumentation)
   - Oder Webflow DNS-Einträge wiederherstellen

2. **Vercel Domain entfernen**
   - In Vercel Dashboard: Domain entfernen
   - Website bleibt auf `xenia-portfolio-ten.vercel.app` erreichbar

3. **Webflow wieder aktivieren**
   - Falls nötig, Webflow-Verbindung wiederherstellen

## Wichtige Notizen

### E-Mail-Konfiguration
- ✅ E-Mail `info@xeniasnapiro.com` funktioniert bereits auf IONOS
- ✅ Contact-Formular sendet an `info@xeniasnapiro.com` (bereits konfiguriert)
- ⚠️ **MX-Einträge NICHT ändern** - sonst funktioniert E-Mail nicht mehr!

### DNS-Propagierung
- Kann 24-48 Stunden dauern
- In der Zwischenzeit: Website kann auf beiden URLs erreichbar sein
- Alte Webflow-Version bleibt bis DNS vollständig propagiert ist

### Vercel-Konfiguration
- ✅ `vercel.json` bereits konfiguriert (Security Headers, Caching)
- ✅ API-Route `/api/contact` funktioniert
- ✅ Responsive Images optimiert
- ✅ Service Worker für Caching

## Checkliste für Comet

- [ ] Phase 1: Backup und Vorbereitung abgeschlossen
- [ ] Phase 2: DNS-Einträge in IONOS geändert
- [ ] Phase 3: Domain in Vercel hinzugefügt
- [ ] Phase 4: DNS-Propagierung geprüft
- [ ] Phase 4: Website auf www.xeniasnapiro.com getestet
- [ ] Phase 4: E-Mail-Funktionalität getestet
- [ ] Phase 4: Performance getestet
- [ ] Migration erfolgreich abgeschlossen

## Support & Troubleshooting

**Falls Probleme auftreten:**
1. DNS-Propagierung prüfen: `https://dnschecker.org/`
2. Vercel Logs prüfen: Vercel Dashboard → Logs
3. Browser-Cache leeren (Hard Refresh: Cmd+Shift+R)
4. In verschiedenen Browsern testen

**Kontakt:**
- Vercel Support: https://vercel.com/support
- IONOS Support: https://www.ionos.de/hilfe/

