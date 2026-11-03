# CozySpace

Editable React/TypeScript reconstruction of https://cozyspacedesignservices.com/, inspected using REA 6.8.0 on October 25, 2026. Replaces the original placeholder scaffold with the source site's photography, typography, service content, and verified public contact destinations.

## Run locally — no installation needed on this workspace

Double-click **Start CozySpace.cmd**, then open the address printed in its window, normally **http://127.0.0.1:5175/**.
The launcher serves the built site immediately using the existing Node runtime. Keep that window open; Ctrl+C stops it.
If CozySpace is already running, it prints the existing address and safely exits. If another application occupies the port,
it tries the following ports. No existing application is stopped, no package installer runs, and no message is sent.

```powershell
npm run dev
```

Open http://127.0.0.1:5175/. The server binds to loopback. This task did not deploy or modify the live site.

```powershell
npm run typecheck
npm run build
npm run preview
```

## What changed

### October 29 revamp

- Seven named hero photo selectors, a direct room index, larger service text and simpler chapter labels.
- Full-size photo viewer with previous/next controls, arrow keys, Escape, focus containment and trigger restoration.
- Per-room contact actions reuse the existing contact dialog. Mobile navigation also closes on outside clicks.
- Preserved original local photography, Manrope/Caslon typography and the warm reference palette.
- `scripts/server.mjs` and Start CozySpace.cmd provide the fast, collision-safe local launcher.
- Rebuild tools reuse existing packages from this project's node_modules or the sibling solution-doc-chat installation.
  React/ReactDOM 19.3.1, TypeScript 5.9.3 and esbuild 0.28.2 were already installed in the workspace; no packages were installed or copied.
  Native SVG icons replace the unavailable Lucide package. The source remains React/TypeScript; esbuild replaces the unavailable Vite tooling.
  Package/lock metadata matches these actual local versions. The built site needs only Node to launch; rebuilding needs the documented tools.
- Build with `npm run build` after editing. Restarting the launcher alone serves the existing build rather than recompiling it.
- Fresh reference/browser and before/after screenshots are under ignored `inspection/revamp-*` folders.
  REA itself was not exposed in this session; previous REA evidence was supplemented with fresh Playwright inspection.

The following describes the preceding reconstruction and remains useful context:

- Full photographic hero with manually selectable room images, seven alternating service chapters, story, approach, contact section, and footer.
- Original Manrope and Libre Caslon Display fonts and seven room images stored locally under `public/`. No remote fonts, analytics, or image hotlinks in the rendered page.
- Responsive navigation, named controls, keyboard support, skip link, reduced motion, stable image geometry, and accessible contact dialog.
- Real WhatsApp and Instagram destinations replace the placeholder inquiry form. No personal information is collected or stored. Nothing sends a message automatically.
- Correct CozySpace metadata replaces the reference site's unrelated studio title/email. Slightly darker small-text colors meet measured contrast thresholds.
- Direct scrolling replaces the source's extended sticky hero; the room selector is an intentional enhancement. This is an evidence-based reconstruction, not a promise of exact original animation or pixel identity.

## Edit

Media setup: place new files in **public/media/** and edit **src/media.ts**. See [MEDIA-GUIDE.md](MEDIA-GUIDE.md) for all slots, recommended sizes and rebuild instructions. All hero photos, thumbnails, room chapters and gallery images follow that one configuration.

- `src/content.ts`: service copy and contact destinations.
- `src/media.ts`: centralized image paths and alternative text.
- `src/main.tsx`: React page sections and shared contact dialog.
- `src/styles.css`: canonical visual tokens, responsive layout, accessibility states.
- `src/revamp.css`: revamp layer loaded after the base styles, including room navigation and photo viewer.
- `src/icons.tsx`: local SVG icons, without an extra library.
- `DESIGN.md`: design intent and token-to-runtime mapping.
- `inspection/FINDINGS.md`: REA evidence identity, observations, and limitations.
- `inspection/REVIEW.md`: final check results and review coverage.
- `inspection/REVAMP-REVIEW.md`: current revamp evidence and limitations.

Current checks: `npm run typecheck`, `npm run build`, `node scripts/server-check.mjs`, and `node scripts/verify.cjs`.
The moved workspace layout now resolves shared Playwright from the category's `playwright-tests` folder. New capture/verification output goes to workspace `audits/cozyspace-rebuild/`; existing `inspection/` review files are historical records. Set browser temporary/profile paths under that audit directory before running captures.
The browser check uses the existing sibling `playwright-tests/node_modules/playwright` installation and requires the local server at port 5175.

REA capture inputs and browser verification scripts live in `inspection/`. Browser scripts accept `PLAYWRIGHT_MODULE`, an absolute path to an existing Playwright/Playwright Core `index.mjs`, and use installed Chrome. `verify-local.mjs` accepts `COZYSPACE_URL` for the local dev/preview address. They do not add testing dependencies to this project.

## Rollback

Original source/configuration files are preserved locally in `inspection/before/`. Copy `main.tsx`, `content.ts`, and `styles.css` back to `src/`; copy `index.html`, `README.md`, and `package.json` to the project root. The prior configuration did not use the added `tsconfig.json`. See `inspection/FINDINGS.md` for details. No destructive Git command is required.

Before publishing, confirm rights to the reference assets and ownership of the public contact destinations. Live message delivery and production hosting are outside this local reconstruction.
