# Bay Area Tennis · PureWave

Static website for Bay Area Tennis community events, history, and UTR registration.

**Repo:** [bayareatennispw/bayareatennis.net](https://github.com/bayareatennispw/bayareatennis.net)

## Pages

| Page | File | Content |
|------|------|---------|
| Home | `index.html` | Hero, featured events, about, history preview, partners, contact |
| Events | `events.html` | Upcoming, ongoing, and past event lists from JSON |
| Event detail | `events/2026-27-bat-doubles.html` | Stable, reusable event announcement page |
| History | `history.html` | Community stories (English / 中文) |

**Register link:** [UTR Club #3156](https://app.utrsports.net/club/3156?tab=info)  
Configured in `resources/site.json` and applied via `data-register` links.

## Project structure

```text
bat/
├── index.html / events.html / history.html
├── styles.css
├── events/
│   └── 2026-27-bat-doubles.html
├── js/
│   ├── site.js       # Nav, register URL
│   ├── events.js
│   ├── event-detail.js
│   ├── history.js
│   ├── community-highlights.js # Homepage photo carousel
├── resources/
│   ├── content.md           # Editorial copy source
│   ├── design_doc.md        # Visual design spec
│   ├── site.json            # Brand, social, register URL
│   ├── events/events.json       # Shared event index and detail content
│   ├── history/             # Stories + index.json
│   └── images/              # Logo, hero background, community photos
└── serve.sh
```

## Run locally

```bash
./serve.sh
```

Open **http://localhost:8080**

- Events: http://localhost:8080/events.html
- History: http://localhost:8080/history.html

## Update content

- **Club copy** → edit `resources/content.md`, then update matching HTML sections if needed
- **Events** → `resources/events/events.json`. Add a new event object with a stable
  `detail_url`, `lifecycle` (`upcoming`, `ongoing`, or `past`), and its content.
  Update `lifecycle` as an event progresses so its dedicated URL stays unchanged.
- **History** → add `YYYY-MM-DD_English.json` / `_Chinese.json` and list the date in `resources/history/index.json`
- **Register / social** → `resources/site.json`

## GitHub Pages

1. **Settings** → **Pages** → Source: **Deploy from a branch**
2. Branch: `main`, folder: **/ (root)** → Save
3. Custom domain in `CNAME`: `purewavesports.com`

Site URL after Pages is on: **https://bayareatennispw.github.io/bayareatennis.net/**  
(or **https://purewavesports.com** once DNS is configured)

### DNS (custom domain)

| Type | Name | Value |
|------|------|--------|
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |
| CNAME | www | `bayareatennispw.github.io` |
