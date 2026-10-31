# CozySpace behavior ownership

Reference-led React marketing site, English locale. No account system, backend, forms, analytics or personal data storage.

| Capability | Canonical owner | Contract |
| --- | --- | --- |
| Navigation | Header, navigation data, room-index in main.tsx | Native anchors; mobile disclosure; Escape and outside click; real section destinations |
| Room selection | Hero | Seven native buttons, named room labels, aria-pressed; no autoplay |
| Room photo viewer | PhotoGallery | Native modal dialog; previous/next and arrow keys; Tab containment; Escape; original trigger focus restored |
| Inquiry | ContactDialog | Existing two external WhatsApp destinations; no automatic message sending; native modal focus and Escape behavior |
| Feedback | Button states and native controls | Visible focus, pressed states, live gallery position; no success claims or transient errors |
| Media | content.ts plus local public/images | Existing reference photographs and meaningful alternative text; stable dimensions |
| Style | styles.css base tokens + revamp.css refinement | Shared palette, typography, responsive behavior, reduced-motion and visible scrollbars |
| Build and launch | scripts/build.mjs, scripts/server.mjs | Existing workspace tools, static local output, loopback only, no automatic installs; port collision handled |

No select, date, table, CRUD, toast, auth or external write capability is introduced. The gallery is separate from the inquiry dialog and cannot be opened above it through the inert page. Contact actions remain explicit external links; tests do not follow them or send messages.
