# Fresh Athletic Style | Tennis Event Website Design Specification

Version: 1.0 · October 20, 2026

## 1. Reference and Scope

Visual reference: [ProServe – Tennis Community Landing Page](https://dribbble.com/shots/26227740-ProServe-Tennis-Community-Landing-Page) by Dimas Has. Intended for tennis clubs, community events, and tournament registration homepages.

Design goal: Help visitors quickly understand an event, find its date and location, and register, while conveying a youthful, clean, welcoming sports atmosphere.

This is an implementation specification inspired by the reference, rather than a pixel-perfect reconstruction. The reference page lists colors including #FEFEFE, #052063, #5B6468, #0B1B12, #1E4B0C, #A2A6AE, and #699D5D. The palette below standardizes these for a project. Fonts, lime accents, dimensions, breakpoints, and interactions are proposed specifications; the original does not publish those parameters.

## 2. Visual Principles

- Use large, authentic court photography as the visual anchor; keep headlines and buttons simple.
- Build the identity around court green and deep blue, reserving bright lime for priority actions.
- Keep the main page white, concentrating darker areas in the hero and footer.
- Use bold sans-serif typography, generous whitespace, and pill-shaped buttons.
- Treat court lines and rackets as supporting elements that never obscure headlines or registration information.

## 3. Color System

| Token | Hex | Usage |
|---|---|---|
| brand-green | #1E4B0C | Brand green, dark sections, label text |
| brand-blue | #052063 | Brand blue, supporting blocks, links |
| accent-lime | #D7F75B | Primary buttons, active navigation, key numbers; proposed addition |
| ink | #0B1B12 | Headlines, body copy, text on lime buttons |
| muted | #5B6468 | Dates, locations, supporting text |
| canvas | #FEFEFE | Main page background |
| surface | #F3F6EF | Event card backgrounds, alternating sections; proposed addition |
| border | #DCE4D8 | Dividers and input borders; proposed addition |
| on-dark | #FFFFFF | Headlines and descriptions over dark imagery |

Suggested page balance: approximately 65% white and light backgrounds, 30% photography and green/blue areas, and 5% lime accents. Hero photography is exempt from the solid-color allocation.

Text pairings: Use ink on light backgrounds and lime buttons, and white on dark green or deep blue. Do not use lime for small text on white. Text over photographs requires a dark overlay; verify a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text against the final image.

## 4. Typography

Use Manrope for English and Noto Sans SC for Chinese. Self-host WOFF2 files, load only the weights actually used, and set font-display: swap. Keep system fallback fonts readable during loading.

Font stack: Manrope, "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif.

| Role | Desktop size / line height | Mobile size / line height | Weight |
|---|---|---|---|
| English hero H1 | 80 / 84 px | 42 / 46 px | 800 |
| Chinese hero H1 | 64 / 77 px | 36 / 45 px | 700 |
| Section heading H2 | 44 / 53 px | 30 / 39 px | 700 |
| Card heading H3 | 24 / 32 px | 22 / 30 px | 700 |
| Hero description | 18 / 29 px | 16 / 26 px | 400 |
| Body text | 16 / 26 px | 16 / 26 px | 400 |
| Navigation and buttons | 15 / 22 px | 15 / 22 px | 600 |
| Dates and labels | 14 / 20 px | 14 / 20 px | 500 |

Use -0.04em letter spacing for English H1 and -0.025em for English H2; keep Chinese letter spacing at 0. Aim for 2–3 lines in English hero headlines and approximately 8–12 Chinese characters per line in Chinese headlines. For Chinese body copy, target approximately 28–36 characters per line; avoid descriptions spanning the entire screen.

## 5. Grid and Spacing

| Property | Desktop ≥1200 px | Tablet 768–1199 px | Mobile <768 px |
|---|---|---|---|
| Maximum content width | 1280 px | 100% | 100% |
| Horizontal page padding | 48 px | 32 px | 20 px |
| Grid | 12 columns | 8 columns | 4 columns |
| Column gap | 24 px | 24 px | 16 px |
| Section vertical padding | 96 px | 72 px | 56 px |
| Event card columns | 3 | 2 | 1 |

Use an 8 px spacing system: 8, 16, 24, 32, 48, 64, and 96 px. Reserve 4 px adjustments for icon and label details. Desktop gaps: headline to description 24 px; description to buttons 32 px; section heading to cards 40 px. Mobile equivalents: 16, 24, and 24 px.

## 6. Homepage Hero

### Composition

On desktop, use a wide court photograph or green-and-blue court color fields. Position the racket on the right and reserve space on the left for the headline. The image fills the hero, with content aligned to the page grid. Apply a dark-to-light overlay from left to right: approximately 65% opacity in black-green on the left and 10% on the right, adjusted to suit the photograph.

Minimum hero height, including navigation: 760 px on desktop and 680 px on mobile. Allow the section to grow with its content; do not fix its height or crop buttons. Set the desktop text area to a maximum width of 680 px; use the available width on mobile. Adjust the mobile image focal point separately to prevent the racket from overlapping text.

### Navigation

- Height: 80 px desktop, 64 px mobile; suggested logo height: 32 px.
- Desktop navigation gap: 28 px. Highlight the active item with a lime pill or a thin underline.
- Suggested links: Events, About Us, Past Events, Contact; place “Register Now” on the right.
- Collapse navigation into a menu button on mobile. The expanded menu must support closing, keyboard focus, and Escape.

### Sample Copy

Eyebrow: BAY AREA TENNIS COMMUNITY

Headline, split across two lines:

Take the Court.  
Make It Yours.

Description: Meet fellow players, join tournaments, and enjoy every swing.

Primary button: Explore Upcoming Events  
Secondary button: About the Club

For a single-event promotion, replace the headline with the event name, clearly display the date, location, and divisions in the supporting area, and use “Register Now” as the primary action. Do not publish unconfirmed dates or participant counts.

The bottom of the hero may include verified community statistics or participant avatars. Without reliable figures, use “Open Events · Level-Based Match Play · Community Connections.”

## 7. Component Specifications

| Component | Suggested specification |
|---|---|
| Primary button | Lime background with dark text; 52 px height; 28 px horizontal padding; 999 px radius |
| Secondary button | Transparent background; 1 px border; 52 px height; dark text on light areas, white text on dark areas |
| Mobile buttons | 48 px height; stack at full width when space is limited; 12 px gap |
| Event card | 1 px light border; 20 px radius; 24 px internal spacing; 4:3 image ratio |
| Event status label | 28 px height; 12 px horizontal padding; 999 px radius; 14 px text / 500 weight |
| Input | 48 px height; 12 px radius; 16 px horizontal padding; persistent label above |
| Icons | 20 px standard, 24 px emphasis; consistent stroke width of approximately 1.75 px |

Event card order: image → status/category → title → date and location → view details. Limit titles to two lines; keep the date, location, and registration status visible. Clearly label closed or full events in text and retain a details link.

Avoid heavy default card shadows. On hover, use 0 8px 24px rgba(11,27,18,0.08). Primary button hover background: #C9EA48; pressed background: #BBDD38. Use a neutral background for disabled states and explain why the action is unavailable.

## 8. Corners, Imagery, and Decoration

- Card radius: 20 px; large image radius: 24 px; input radius: 12 px; buttons use a pill shape.
- Favor authentic daylight court photography, action shots, and community group photos. Maintain natural white balance and modest saturation.
- Avoid strong HDR, complex collages, and layered gradients; retain the natural character of court greens and blues.
- Decorative court lines: 1–2 px at low opacity; no more than one major decorative element per section.
- Supply desktop and mobile hero crops. Define image dimensions or aspect ratios to prevent layout shifts. Prioritize the hero image and lazy-load other images.

## 9. Homepage Content Order

1. Hero: brand, headline, event value, and registration entry point.
2. Upcoming events: three cards showing date, location, division, and status.
3. Community introduction: short copy and an authentic group photo explaining who can join and how.
4. Past events: selected photographs and links to tournament results.
5. Partners: show approved logos at consistent heights without forcing equal widths.
6. Footer: contact details, social links, and necessary privacy information.

## 10. Interaction and Accessibility

- Use 180 ms ease-out transitions for colors and shadows; hover movement should not exceed 2 px.
- Avoid autoplay carousels and large animations that distract from registration. Respect prefers-reduced-motion.
- Provide touch targets of at least 44×44 px for buttons and menus. Use a visible 3 px focus outline with a 3 px offset; select a contrasting outline color for each background.
- Provide appropriate image alt text; decorative images use empty alt text. Never communicate status through color alone.
- Display registration errors beneath the relevant fields and preserve entered values.

## 11. CSS Tokens for Development

```css
:root {
  --brand-green: #1e4b0c;
  --brand-blue: #052063;
  --accent: #d7f75b;
  --ink: #0b1b12;
  --muted: #5b6468;
  --canvas: #fefefe;
  --surface: #f3f6ef;
  --border: #dce4d8;
  --on-dark: #fff;
  --font-sans: "Manrope", "Noto Sans SC", "PingFang SC",
    "Microsoft YaHei", sans-serif;
  --container: 1280px;
  --page-pad: 48px;
  --section-space: 96px;
  --radius-card: 20px;
  --radius-control: 12px;
  --radius-pill: 999px;
}
.container {
  width: min(var(--container), calc(100% - 2 * var(--page-pad)));
  margin-inline: auto;
}
.hero-title {
  font-size: clamp(42px, 5.56vw, 80px);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -.04em;
}
.hero-title:lang(zh) {
  font-size: clamp(36px, 4.45vw, 64px);
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: 0;
}
@media (max-width: 1199px) {
  :root { --page-pad: 32px; --section-space: 72px; }
}
@media (max-width: 767px) {
  :root { --page-pad: 20px; --section-space: 56px; }
}
```

## 12. Acceptance Checklist

- Check widths of 1440, 1024, 768, 390, and 320 px: no horizontal overflow, clipped headlines, or obscured buttons.
- Test Chinese and English headlines, long event names, and font-loading failures.
- Verify text contrast over actual images, keyboard menu operation, and visible button focus.
- Ensure dates, locations, statuses, and primary actions are clear, and registration links work.
- Obtain appropriate permissions for event content, photographs, likenesses, and logos. Use the reference artwork for style research only.
