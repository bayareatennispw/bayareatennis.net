# Bay Area Tennis · PureWave

Static website for Bay Area Tennis community events, history, products, and UTR registration.

**Repo:** [bayareatennispw/bayareatennis.net](https://github.com/bayareatennispw/bayareatennis.net)

## Pages

| Page | File | Content |
|------|------|---------|
| Home | `index.html` | Hero, featured events, about, history preview, products preview, partners, contact |
| Events | `events.html` | Full event list from JSON + Register on UTR |
| History | `history.html` | Community stories (English / 中文) |
| Products | `products.html` | Product catalog with Front / Back / Side image switching |

**Register link:** [UTR Club #3156](https://app.utrsports.net/club/3156?tab=info)  
Configured in `resources/site.json` and applied via `data-register` links.

## Project structure

```text
bat/
├── index.html / events.html / history.html / products.html
├── styles.css
├── js/
│   ├── site.js       # Nav, register URL
│   ├── events.js
│   ├── history.js
│   └── products.js
├── resources/
│   ├── content.md           # Editorial copy source
│   ├── design_doc.md        # Visual design spec
│   ├── site.json            # Brand, social, register URL
│   ├── events/events.json
│   ├── history/             # Stories + index.json
│   ├── products/            # products.json + images/
│   └── images/              # Logo, hero background
└── serve.sh
```

## Run locally

```bash
./serve.sh
```

Open **http://localhost:8080**

- Events: http://localhost:8080/events.html
- History: http://localhost:8080/history.html
- Products: http://localhost:8080/products.html

## Update content

- **Club copy** → edit `resources/content.md`, then update matching HTML sections if needed
- **Events** → `resources/events/events.json`
- **History** → add `YYYY-MM-DD_English.json` / `_Chinese.json` and list the date in `resources/history/index.json`
- **Products** → `resources/products/products.json` and images under `resources/products/images/`
- **Register / social** → `resources/site.json`

Product image naming: `{product-id}_{color}_{view}.png`  
Examples: `BAT-DL27-01_black_front.png`, `BAT-TEE-27-N1_back.png`

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
