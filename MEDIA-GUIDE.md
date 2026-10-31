# CozySpace media setup

**Folder for your files:** `public/media/`  
**File to edit:** `src/media.ts`

The existing photos remain configured by default. You can replace one at a time without changing components or business copy.

1. Copy your photo into `public/media/`, for example `kitchen.webp`.
2. Open `src/media.ts` and update its slot:

```ts
kitchen: {
  src: '/media/kitchen.webp',
  alt: 'Describe what is actually shown in your new kitchen photo',
},
```

3. Run `npm run build` from the CozySpace folder. This uses the existing workspace tools and installs nothing.
4. Refresh your browser. If the preview is stopped, double-click `Start CozySpace.cmd`.

| Setting | Used for |
| --- | --- |
| `kitchen` | Opening hero photo, kitchen chapter, selector thumbnail and full-size viewer |
| `wardrobe` | Wardrobe chapter, hero selection, thumbnail and viewer |
| `bathroom` | Bathroom chapter, hero selection, thumbnail and viewer |
| `laundry` | Laundry chapter, hero selection, thumbnail and viewer |
| `storage` | Storage chapter, hero selection, thumbnail and viewer |
| `office` | Office chapter, hero selection, thumbnail and viewer |
| `moveIns` | Move-ins chapter, hero selection, thumbnail and viewer |
| `contact.src` | Optional separate background for the final contact section; blank follows `kitchen.src` |

Use landscape photos around **1536 × 1024** or larger. The page crops images to its responsive layout; the viewer shows the complete image. WebP/JPEG are good photo formats; PNG and AVIF are supported too. Avoid important details at the extreme edges of a photo because mobile crops differ. Keep filenames case-sensitive and preferably lowercase with hyphens. Paths start with `/media/`, never `public/media/`.

The hero thumbnails, service chapters and photo viewer all follow the same setting automatically. The contact background is decorative, so it uses empty alternative text; each room's `alt` should describe its actual photograph. The wordmark remains editable text, and fonts stay in `public/fonts/`.

To undo a replacement, restore that slot's previous `/images/...` URL and rebuild. No original photos need to be deleted or moved. This is file-based setup, not a browser upload or CMS.
