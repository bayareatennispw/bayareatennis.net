# BAT Website Brand Design Guidelines

## 1. Brand and Visual Direction

- Full brand name: Bay Area Tennis. Abbreviation: BAT. Chinese name: 湾区网事.
- Visual qualities: clear, energetic, authentic, restrained and welcoming.
- Use a white background throughout the website, near-black headings and dark gray body text. Tennis yellow, court green and court blue provide brand recognition.
- Apply the light theme consistently to navigation, page content, product pages, event pages, articles and footers.
- Use brand colors for emphasis, actions and content sections. Build the main visual composition through whitespace, typographic hierarchy and authentic photography.
- Avoid decorative gradients, glow, colored shadows, frosted glass, textures and grain backgrounds.
- Use dark translucent overlays on photographs only when needed to keep overlaid text readable.

## 2. Color System

### 2.1 Backgrounds, Text and Borders

| Role | Value | CSS Token |
| --- | --- | --- |
| Page background | `#FFFFFF` | `--bg-base` |
| Card background | `#FFFFFF` | `--surface-card` |
| Subtle section background | `#F7F8F7` | `--surface-subtle` |
| Secondary surface | `#F0F2F1` | `--surface-secondary` |
| Raised surface | `#FFFFFF` | `--surface-raised` |
| Headings and primary text | `#121212` | `--text-primary` |
| Body text | `#3D4540` | `--text-body` |
| Secondary text | `#59635D` | `--text-secondary` |
| Supporting text | `#66716A` | `--text-muted` |
| Text on dark colored surfaces | `#FFFFFF` | `--text-inverse` |
| Default border | `#DDE3DF` | `--border-default` |
| Form and control border | `#7A857E` | `--border-control` |
| Subtle divider | `#E9EDEA` | `--border-subtle` |

- Keep page backgrounds and footers light. Reserve near-black primarily for text and selected icons.
- Distinguish white cards through spacing, fine borders or subtle gray sections. Avoid heavy shadows.
- Use body or primary text colors for product prices, entry requirements, form labels and essential information.
- Do not use faint gray text for information users must read.

### 2.2 Brand Colors

| Color | Value | CSS Token | Application |
| --- | --- | --- | --- |
| Tennis yellow | `#E5F04D` | `--accent` | Primary buttons, emphasis labels and selective highlight fills |
| Yellow hover | `#D9E538` | `--accent-hover` | Yellow control hover state |
| Yellow active | `#CCD926` | `--accent-active` | Yellow control pressed state |
| Court green | `#1D7C53` | `--brand-green` | Brand expression, featured content and green panels |
| Deep court green | `#145A3B` | `--brand-green-deep` | Green control hover state and dark text |
| Court blue | `#176BBF` | `--brand-blue` | Text links, information entry points and blue panels |
| Deep court blue | `#0C3D6E` | `--brand-blue-deep` | Link hover state and blue control pressed state |
| Yellow tint | `#FAFCE3` | `--tint-yellow` | Light backgrounds for highlighted information |
| Green tint | `#EDF6F0` | `--tint-green` | Light backgrounds for featured content |
| Blue tint | `#EEF5FC` | `--tint-blue` | Light backgrounds for informational messages |

- Do not use tennis yellow for ordinary text, thin icons, form borders or focus outlines on white backgrounds.
- Use near-black text on yellow fills. Do not place white text on yellow fills.
- On white backgrounds, use court green, court blue or near-black for emphasized text. Express yellow emphasis through fills or color blocks.
- Use white headings and body text on solid green or blue panels. Use dark text on tinted panels.
- Establish one primary action hierarchy per hero or distinct content section. Blue and green support the primary yellow emphasis.
- All three brand colors may appear across the website. Avoid stacking them as decoration or combining them in a three-color gradient.

### 2.3 Semantic States

| State | Text and Icons | Light Background | CSS Tokens |
| --- | --- | --- | --- |
| Positive / Success | `#176641` | `#EDF7F0` | `--status-success` / `--status-success-bg` |
| Negative / Error | `#B42335` | `#FFF0F2` | `--status-error` / `--status-error-bg` |
| Warning | `#805600` | `#FFF7DF` | `--status-warning` / `--status-warning-bg` |
| Information | `#155A9D` | `#EEF5FC` | `--status-info` / `--status-info-bg` |
| Neutral | `#59635D` | `#F0F2F1` | `--status-neutral` / `--status-neutral-bg` |

- Use dark status text with light backgrounds appropriate to the white theme.
- Pair status colors with text labels or icons. Color alone must not convey meaning.
- Use success for completion and confirmation, error for failures and invalid input, and neutral for general information or unselected states.
- Label states such as not yet open, registration closed and sold out explicitly.
- Do not automatically color editorial opinions according to positive, negative or neutral sentiment.

## 3. Typography

### 3.1 Font Families

- English headings and body text: Figtree.
- Chinese headings and body text: Noto Sans SC, with system Chinese font fallbacks.
- Technical code, specification identifiers and essential monospaced data: JetBrains Mono. Do not use it for ordinary body text.
- Standard weights: 400 for body text, 600 for functional labels and 700 for headings. Large brand headlines may use 800.
- Coordinate English and Chinese sizes and weights. Do not shrink either language merely to force visual alignment.
- Prefer locally hosted WOFF2 assets with `font-display: swap` so text remains visible while fonts load.

```css
font-family: "Figtree", "Noto Sans SC", "PingFang SC",
  "Microsoft YaHei", Arial, sans-serif;
```

### 3.2 Responsive Type Scale

| Level | Mobile | Desktop | Line Height | Weight |
| --- | --- | --- | --- | --- |
| Hero headline | 40–48px | 64–80px | 1.05–1.15 | 700–800 |
| Page title H1 | 32–40px | 48–64px | 1.1–1.2 | 700 |
| Section heading H2 | 28–32px | 36–44px | 1.15–1.25 | 700 |
| Card / subsection heading H3 | 20–24px | 24–28px | 1.25–1.35 | 700 |
| Body text | 16–18px | 18px | 1.6–1.8 | 400 |
| Functional text / navigation | 16px | 16px | 1.4–1.5 | 600 |
| Supporting text | 14px | 14px | 1.5–1.6 | 400 |
| Short labels | 12–13px | 12–13px | 1.4 | 600 |

- Use responsive sizing. Do not scale the entire page or horizontally compress type to fit content.
- Use `65ch` as the baseline maximum reading width for long-form text. Chinese articles may use approximately `38em`.
- Break headings at meaningful boundaries. Keep brand names, short dates and fixed phrases intact.
- Avoid `word-break: break-all` for body text. Use `overflow-wrap: anywhere` when necessary for URLs and other long strings.
- Default to left alignment. Reserve centered text for short headings, brief introductions and standalone action areas.
- Avoid all caps or excessive letter spacing in long passages. Short English labels may use modest tracking.
- Do not hide essential product names, event names or information with single-line truncation.

## 4. Layout and Spacing

- Use a fluid, responsive layout rather than a fixed poster canvas.
- Center the main container with a maximum width of `1280px`.
- Horizontal page padding: `20px` on mobile, `32px` on tablet and `48px` on desktop.
- Spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96px`.
- Vertical section spacing: `48–64px` on mobile and `80–96px` on desktop.
- Card padding: `20px` on mobile and `24–32px` on desktop.
- Grid gaps: `16–20px` on mobile and `24–32px` on desktop.
- Adapt breakpoints to content needs, using `640px / 960px / 1280px` as baseline breakpoints.
- Favor one column on mobile. Product grids may use two columns when information remains readable. Desktop lists may use 2–4 columns.
- Keep the hero focused on a clear heading, short description, primary action and visual subject.
- Preserve logical reading order when desktop image-and-text layouts stack on mobile.
- Sticky navigation must not obscure anchor targets, keyboard focus or dialog content.

## 5. Shapes, Borders and Depth

| Element | Rule |
| --- | --- |
| Standard cards | `8px` radius; a consistent value within `6–8px` may be selected |
| Large panels / dialogs | `16px` radius; values within `10–20px` may be selected |
| Inputs / select controls | `6px` radius with a 1px control border |
| Primary and secondary buttons | Pill shape with `999px` radius |
| Icon buttons / avatars | Circular |
| Tables / compact data areas | Square internal cells; the outer container may use the card radius |
| Images | Follow the parent container radius without adding a conflicting radius |

- Keep each component's radius consistent across the website.
- Cards have no shadow by default. Use a 1px default border when needed.
- Raised surfaces may use `0 12px 32px rgba(18,18,18,0.10)`.
- Prefer border or surface changes for card hover states. Avoid large scale changes and strong shadows.
- Use default borders to separate containers and stronger control borders for interactive elements.

## 6. Brand Marks and Icons

- Use Bay Area Tennis / BAT as the website brand name and use approved brand marks.
- Use the PureWave mark only where its brand endorsement is appropriate. It must not replace the BAT name.
- On white backgrounds, use approved black or green marks. Use black marks on yellow and white marks on solid blue or green.
- Preserve original proportions, approved color variants and internal composition. Do not crop, stretch or redraw marks.
- Maintain clear space around each mark of at least approximately one letter height.
- When using Chinese or English taglines, preserve their approved wording and lockup relationships.
- Use one consistent monochrome outline icon set, with `20px / 24px` baseline sizes and consistent stroke weight.
- Give icon buttons accessible names. Do not substitute emoji for functional icons or brand marks.

## 7. Images, Photography and Video

- Use authentic player, match, community and product photography. Favor natural scenes, vivid colors and clear people and action.
- Preserve original image proportions by default. Review faces, rackets, movements, apparel marks and product details before cropping.
- Prefer consistent white or light backgrounds for primary product images. Supporting images may show real use and courtside settings.
- Product cards may use a consistent `1:1` or `4:5` image frame. Do not crop essential product parts merely to fill the frame.
- Event and article cards may use `3:2` frames. Video covers should follow the video aspect ratio or a clearly defined cover format.
- Portrait and event photography may use `object-fit: cover` with an appropriate focal point. Prefer `contain` for logos and complete product views.
- Set image dimensions or `aspect-ratio` to reduce layout shifts during loading.
- Lazy-load images below the initial viewport and supply image sizes appropriate to their display size.
- Provide meaningful alternative text. Use empty alternative text for purely decorative images.
- Give videos a poster image and clear playback controls. Do not autoplay audible video. Provide captions for spoken content.
- Provide a pause control for looping photo strips. Offer a static or manually browsed version when reduced motion is preferred.
- Do not make text embedded in images the only source of event details, product descriptions or entry requirements.

## 8. Component Guidelines

### 8.1 Buttons and Links

- Primary buttons: yellow fill and near-black text. Use a clear near-black outline to define the button on white backgrounds.
- Secondary buttons: white fill, deep green text and a deep green border.
- Text links: court blue. Underline links in body text and use deep court blue on hover.
- Do not use yellow link text on white backgrounds.
- Minimum button height: `44px`. Horizontal padding: `20–24px`. Label: `16px / 600`.
- Action labels should describe the result, such as View events, Register on UTR or Add to cart.
- Disabled states use a light gray fill and a clear unavailable state. Do not simply lower the entire component's opacity and reduce text readability.
- Loading states preserve button width and display a loading indicator to discourage duplicate submissions.

### 8.2 Forms and Selection Controls

- Keep field labels visible. Placeholders must not replace labels.
- Field text must be at least `16px`, with an input height of at least `44px`.
- Use a white background, near-black text and the control border. Show a blue outer outline on focus.
- Place error text beneath the relevant field, supported by error color and an icon. Preserve entered values.
- Indicate selected sizes, colors and filters through outlines, text or selection marks as well as color.
- Checkboxes, radio buttons, select menus and switches follow the same color and state semantics.

### 8.3 Cards and Lists

- Use consistent, distinct templates for event, product and article cards.
- Maintain a clear order for titles, supporting details, prices or dates, and actions.
- Events display date, location and a registration entry point. Products display name, price and available options. Articles display title and necessary metadata.
- Use labels only for meaningful categories and states. Avoid stacking multiple colored tags on every card.
- Empty lists, no-result searches and loading failures provide clear text and an appropriate next step.

### 8.4 Navigation, Dialogs and Notifications

- Keep headers and footers white, separated from content through fine dividers or whitespace.
- Keep the Contact section background white. Use brand colors for its headings, labels, links and actions rather than a colored section fill.
- Identify the current navigation item through weight, an underline or a marker as well as color.
- Mobile navigation, dialogs and drawers support keyboard interaction. Return focus to the trigger after closing.
- Dialogs use white surfaces, near-black headings and subtle shadows. Background scrims may use translucent near-black.
- Toasts and notifications use status labels, concise text and an appropriate dismiss control or action.
- Provide default, hover, focus, pressed and disabled states wherever applicable.

### 8.5 About and Community

- On desktop, keep the About copy in a narrow column beside a larger community-photo carousel.
- On tablet and mobile, stack the copy first and the carousel below it.
- Keep the audience list compact and the carousel controls visible over its photography.

## 9. Motion and Accessibility

- Use `100ms` for subtle feedback, `200ms` for standard color and border changes, and `300ms` for larger expansions.
- Favor fades, small movements and surface changes. Avoid exaggerated bouncing and continuous flashing.
- Disable nonessential animation and automatic scrolling for `prefers-reduced-motion: reduce`.
- Provide visible keyboard focus for all interactive elements. Use a court blue outline with a `3px` offset.
- Check text contrast against the actual background combination. A brand color value alone does not establish readability.
- Communicate states, selections and links through text, shapes or markers as well as color.
- Use semantic headings, logical reading order, explicit form labels and accessible control names.
- Preserve browser zoom. Enlarging text must not hide essential content or controls.

## 10. Voice and Information

- Write in a direct, friendly and specific voice that reflects a real community and active sport.
- Give figures a time period and unit. Distinguish player entries, unique participants, members and followers.
- Use confirmed information for event descriptions, prices, inventory, partnership benefits and personal identities.
- Functional copy should explain the next step. Name the destination platform on external registration buttons.
- Organize English and Chinese according to the reading context rather than mechanically alternating every line.
- Avoid unnatural line breaks, repeated spaces for alignment, full-paragraph highlighting and vague action labels.

## 11. Global CSS Variables

```css
:root {
  color-scheme: light;

  --bg-base: #ffffff;
  --surface-card: #ffffff;
  --surface-subtle: #f7f8f7;
  --surface-secondary: #f0f2f1;
  --surface-raised: #ffffff;
  --text-primary: #121212;
  --text-body: #3d4540;
  --text-secondary: #59635d;
  --text-muted: #66716a;
  --text-inverse: #ffffff;
  --border-default: #dde3df;
  --border-control: #7a857e;
  --border-subtle: #e9edea;

  --accent: #e5f04d;
  --accent-hover: #d9e538;
  --accent-active: #ccd926;
  --brand-green: #1d7c53;
  --brand-green-deep: #145a3b;
  --brand-blue: #176bbf;
  --brand-blue-deep: #0c3d6e;
  --tint-yellow: #fafce3;
  --tint-green: #edf6f0;
  --tint-blue: #eef5fc;

  --status-success: #176641;
  --status-success-bg: #edf7f0;
  --status-error: #b42335;
  --status-error-bg: #fff0f2;
  --status-warning: #805600;
  --status-warning-bg: #fff7df;
  --status-info: #155a9d;
  --status-info-bg: #eef5fc;
  --status-neutral: #59635d;
  --status-neutral-bg: #f0f2f1;

  --font-sans: "Figtree", "Noto Sans SC", "PingFang SC",
    "Microsoft YaHei", Arial, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --radius-card: 8px;
  --radius-panel: 16px;
  --radius-input: 6px;
  --radius-pill: 999px;
  --container-max: 1280px;
  --reading-max: 65ch;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 80px;
  --space-10: 96px;
  --shadow-raised: 0 12px 32px rgba(18, 18, 18, 0.10);
  --focus-color: var(--brand-blue);
  --motion-fast: 100ms;
  --motion-base: 200ms;
  --motion-slow: 300ms;
}

html {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-sans);
}

body {
  margin: 0;
  background: var(--bg-base);
  color: var(--text-body);
  font-size: 18px;
  line-height: 1.7;
}

*, *::before, *::after {
  box-sizing: border-box;
}

:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 3px;
}

::selection {
  background: var(--accent);
  color: var(--text-primary);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- Manage colors, fonts, spacing, radii and motion through global variables. Components reference semantic tokens.
- Components must not redefine the website background or introduce a separate dark theme.
- Update tokens and documentation together when approved color values change. Avoid scattered, inconsistent hard-coded values.
