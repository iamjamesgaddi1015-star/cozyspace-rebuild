import {media} from './media';

export interface Space {
  id: string;
  name: string;
  heading: string;
  description: string;
  detail: string;
  image: string;
  alt: string;
}

// Public content observed on cozyspacedesignservices.com with REA.
export const content = {
  brand: 'CozySpace',
  tagline: 'Organized for living, styled for comfort.',
  introduction: 'Transforming clutter into calm, beautiful spaces you love to settle into.',
  instagramUrl: 'https://www.instagram.com/cozyspace.ae',
  contacts: [
    { label: 'WhatsApp 1', phone: '+971 55 769 8577', url: 'https://wa.me/message/U2FXIPFM2PVQL1' },
    { label: 'WhatsApp 2', phone: '+971 55 722 0923', url: 'https://wa.me/message/JRT7BRKW4MI5J1' },
  ],
};

export const spaces: Space[] = [
  {
    id: 'kitchen', name: 'The kitchen', heading: 'A place for everything.',
    description: 'Neatly stored together. Cooking surfaces remain clear for prep, while drawers and cabinets use organizers to keep contents visible and easy to access. Everything is quick to find and effortless to put back, preparing meals and cleaning up stays simple, efficient, and stress-free.',
    detail: 'Airtight · Customized labels · Sized to your shelf',
    image: media.kitchen.src, alt: media.kitchen.alt,
  },
  {
    id: 'wardrobe', name: 'The wardrobe', heading: 'A calmer way to begin.',
    description: 'Folded into matching stacks or put in organizers, then sorted in color order from light to dark so you can see all your choices at a glance. Hanging clothes are grouped by type, while shoes and accessories have their own neat spots. Because everything is clear, color-coded, and easy to reach, choosing an outfit and putting clothes away takes no time at all.',
    detail: 'Closets · Drawers · Clothing',
    image: media.wardrobe.src, alt: media.wardrobe.alt,
  },
  {
    id: 'bathroom', name: 'The bathroom', heading: 'Space to breathe.',
    description: 'Past the tiled wall, a clean porcelain sink comes into view. Behind the cabinet door or under the sink storage, skincare lives in storage organizer boxes, ready for the day ahead.',
    detail: 'Vanities · Skincare · Small spaces',
    image: media.bathroom.src, alt: media.bathroom.alt,
  },
  {
    id: 'utility', name: 'The laundry room', heading: 'Only what belongs.',
    description: 'Tools and clothes are easy to find, see, and put away, handling laundry becomes a quick, simple, and hassle-free task.',
    detail: 'Linen · Laundry · Decluttering',
    image: media.laundry.src, alt: media.laundry.alt,
  },
  {
    id: 'storage-room', name: 'The storage room', heading: 'Everything in its place.',
    description: 'Seasonal pieces, linens, and everyday essentials are grouped into clear, easy-to-reach zones. Thoughtful shelving and labeled containers make the room feel lighter and every item simple to find.',
    detail: 'Shelving · Baskets · Seasonal storage',
    image: media.storage.src, alt: media.storage.alt,
  },
  {
    id: 'office-room', name: 'The office room', heading: 'Clarity to focus.',
    description: 'A calm workspace gives every tool a home. Papers, stationery, cables, and project materials are sorted into simple systems, leaving the desk clear for the work that matters.',
    detail: 'Workspaces · Filing · Daily systems',
    image: media.office.src, alt: media.office.alt,
  },
  {
    id: 'move-ins', name: 'Move-ins', heading: 'A softer beginning.',
    description: 'From the first open box to the final thoughtful detail, belongings are unpacked, sorted, and placed with intention so your new home feels settled, personal, and ready to live in.',
    detail: 'Unpacking · Sorting · Fresh starts',
    image: media.moveIns.src, alt: media.moveIns.alt,
  },
];
