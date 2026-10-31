---
version: alpha
name: CozySpace
description: A photographic journey through thoughtful home organization.
colors:
  paper: "#f7f3ed"
  sand: "#eee5da"
  ink: "#192638"
  muted: "#716155"
  copper: "#8d593a"
  wood: "#3f2d22"
  cream: "#fffaf3"
  ochre: "#e0b78d"
  line: "#d4c5b4"
typography:
  sans:
    fontFamily: "Manrope, Arial, sans-serif"
  display:
    fontFamily: "Libre Caslon Display, Georgia, serif"
rounded:
  DEFAULT: "0px"
spacing:
  page-gutter: "clamp(24px, 5.2vw, 88px)"
  chapter-gap: "22px"
components:
  button: {}
  scene: {}
  dialog: {}
---

# CozySpace Design System

## Overview

### October 29 refinement

Preserve the original brand direction and photographs. Apply Taste, Emil design engineering and frontend-design/premium
guidance to clearer navigation, legible body copy and meaningful interactions. Fresh browser inspection supplements
the existing REA evidence; REA tooling is unavailable in this session. Reference fidelity overrides random new art direction.
The base tokens remain in src/styles.css; src/revamp.css is the deliberate shared refinement layer imported afterward.
Service body copy is 16px desktop/15px mobile; chapter labels are 12–13px, sentence-style section labels are 13px.
Hero controls now show all seven photos with names, and a flat room index provides direct navigation.
Remove redundant roman section numbering, photo-corner ornaments, decorative dashes and the large background watermark.
The new gallery uses a native dialog, contained keyboard focus, arrow-key navigation, Escape and trigger restoration.
No autoplay or decorative motion was added. Shared contact behavior and external destinations are preserved.

### Creative North Star

Sunlight on glass jars and oak shelves. The live reference at https://cozyspacedesignservices.com/ supplies the identity: expansive room photography, close-set Manrope headlines, and restrained Caslon emphasis. Preserve the reference rather than inventing a new brand.

### Product context and register

- Audience and job: people exploring home organization services and contacting CozySpace.
- Market evidence: the public site uses UAE +971 contacts and the cozyspace.ae Instagram account. No service coverage beyond that is assumed.
- Locale: English. Brand marketing site; no authenticated or transactional application.
- Usage: browsing seven room services on desktop and mobile, then choosing a WhatsApp contact.
- Signature: oversized typography against full-frame kitchen photography, followed by alternating photographic room chapters.
- Anti-reference: generic service-card grids, placeholder images, invented testimonials, and unrelated studio branding.
- Ownership: Model B. `src/styles.css :root` is canonical. This document mirrors semantic colors and explains their use. Tokens feed shared components directly; there is no theme adapter or generated token system.

## Colors

`paper` is the story and card surface; `sand` is the services background. `ink` owns headings; `muted` owns supporting copy. `copper` marks section labels and text emphasis. `wood` and `cream` supply the approach and photographic sections; `ochre` provides light-on-dark emphasis. `line` is the reserved image fallback and neutral border. Focus inherits foreground color against its surface. Forced-colors mode retains system-operable controls.

The observed source copper and muted colors were darkened slightly after independent QA measured sub-4.5:1 contrast for small text on sand. This is an intentional accessibility correction; both the canonical CSS and mirrored tokens change together.

Runtime mapping: frontmatter color names map one-to-one to `--paper`, `--sand`, `--ink`, `--muted`, `--copper`, `--wood`, `--cream`, `--ochre`, `--line`. Typography maps to `--font-body` and `--font-display`; page gutter maps to `--gutter`. Scene gap and square corners are implemented in `.scenes-list` and the global reset. Scrollbar thumb, track, hover, active states have explicit global tokens.

## Typography

Self-hosted Manrope 400–800 supplies navigation, content, and close-set display headings. Libre Caslon Display 400 supplies visual emphasis, with synthetic italic explicitly permitted only on `em` to match the original. Courier New preserves the observed header wordmark. Body copy is 13–15px with generous line height; headlines scale with viewport width. Labels are small uppercase text with tracking. No invented service or business claims.

## Layout

One landing page: hero, story, seven service chapters, approach, contact, footer. Full-width photo hero; services use 58/42 alternating columns. At 800px and below, image precedes copy in every chapter and navigation becomes a disclosure. Additional 420px and 350px rules protect narrow-screen typography. Natural document scrolling; no 220vh sticky scroll trap. Images reserve dimensions and containers reserve height. Global stable scrollbar gutter prevents overlay layout shifts.

## Elevation & Depth

Static cards have no shadow. Hierarchy comes from paper/sand/wood surfaces and image overlays. Only the native modal has a dimmed, blurred backdrop. No persistent sticky header covers anchor destinations.

## Shapes

Square cards, actions, and dialog. Fine rules, photographic corner marks, and generous whitespace reflect the reference. Scrollbar rounding is a geometry exception.

## Components

- Buttons: square light primary actions, underlined secondary actions, 44px minimum major touch controls. Hover changes color; focus has a visible 2px outline; pressed state reduces opacity.
- Scene: shared `SpaceChapter` component, semantic article and heading, descriptive image alt, numbered position, content, next-section anchor. Numbers encode an actual ordered tour.
- Header: accessible non-modal mobile disclosure, Escape close, breakpoint reset. No hidden desktop controls in mobile focus order.
- Dialog: native `dialog.showModal()` owns focus containment, inert background, Escape, and trigger restoration. The close button receives initial focus. WhatsApp options are actual external links with new-tab announcements and safe rel attributes. No submission, local storage, or contact-data collection.
- Iconography: local SVG line icons in src/icons.tsx, 15–28px, decorative SVGs hidden from assistive technology, explicit names for icon-only buttons.
- Motion: deliberate user-selected room-image crossfade; no autoplay. Reduced motion disables transitions, hover zoom, and smooth scrolling.
- Content: observed service copy and public contacts. The incorrect source studio email and unrelated metadata are replaced with CozySpace branding and verified WhatsApp destinations.

## Do's and Don'ts

- Do keep all seven services, the source photography, and the calm pacing of the original.
- Do keep contact destinations in `src/content.ts` and use the shared dialog for contact actions.
- Don't invent delivery promises, pricing, reviews, or success messages.
- Don't add analytics or external network dependencies to the rendered page. Fonts and images are local.
- Don't treat static screenshots as proof of untested original runtime behavior.
