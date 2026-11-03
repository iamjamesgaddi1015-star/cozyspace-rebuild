# Project instructions: CozySpace

Shared rules: [workspace](../../../AGENTS.md) and [personal projects](../../AGENTS.md). This file adds only project-specific guidance.

## Scope

Local, editable reconstruction of the public CozySpace interior-design site. Preserve the approved photography-led composition and real contact destinations.

## Architecture

React and strict TypeScript, bundled with esbuild. A loopback Node server serves the generated site. Content and media are centralized in `src/content.ts` and `src/media.ts`; there is no application database or submission backend.

## Commands

Run from this directory; `package.json` is the command source of truth. Node 22+ is declared.

| Task                                            | Command                         |
| ----------------------------------------------- | ------------------------------- |
| Install locked dependencies on a fresh checkout | `npm ci`                        |
| Start local server                              | `npm run dev`                   |
| Type check                                      | `npm run typecheck`             |
| Rebuild                                         | `npm run build`                 |
| Check local-server behavior                     | `node scripts/server-check.mjs` |

Browser-check prerequisites and commands are in README.md. Rebuild after source changes; restarting the launcher alone serves the existing build. Existing tooling can fall back to a sibling installation; a standalone checkout must install its own declared dependencies.

## Project restrictions

- Keep assets local and route media changes through `src/media.ts` and MEDIA-GUIDE.md.
- Preserve explicit visitor action for WhatsApp/Instagram contact; the current app collects no inquiry records and sends no messages automatically.
- Confirm asset rights and contact-destination ownership before publication. A local reconstruction is not permission to alter the original site.
- Preserve the contact dialog and photo viewer's keyboard/focus behavior when editing them.

## Documentation

- Setup and current verification: [README.md](README.md).
- Design and interactions: [DESIGN.md](DESIGN.md), [UX-CONTRACT.md](UX-CONTRACT.md).
- Media replacement: [MEDIA-GUIDE.md](MEDIA-GUIDE.md).
- Work status: [TASKS.md](TASKS.md).
