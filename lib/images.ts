// lib/images.ts
// Centralised image registry. Every Unsplash URL on the site is defined here
// so swapping to commissioned photography later is a one-file change.
//
// TODO: Phase B — Replace all Unsplash imagery with commissioned photography.
// Photography brief to be written separately.

function unsplash(id: string, w = 1200, q = 80) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`
}

/** Standard CSS treatment applied to all site images for visual cohesion. */
export const IMAGE_FILTER = 'saturate(0.85) contrast(1.05)'

// ─── Homepage ──────────────────────────────────────────────────────────────

export const HERO_IMAGE = {
  src: unsplash('1593079831268-3381b0db4a77', 1600),
  alt: 'Dark atmospheric gym interior with dramatic lighting and barbells in foreground',
}

// ─── Who-we-work-with segment tiles (homepage + segment page) ──────────────
// Six visually distinct images — one per segment. Each must be instantly
// distinguishable by segment type without reading the label.

export const SEGMENT_IMAGES = {
  independentGyms: {
    src: unsplash('1623874228601-f4193c7b1a30', 900),
    alt: 'Gritty independent gym with exposed brick and free weights',
  },
  boutiqueStudios: {
    src: unsplash('1518310952931-b1de897abd40', 900),
    alt: 'Clean minimal boutique studio with reformers and warm lighting',
  },
  crossfitBoxes: {
    src: unsplash('1517963628607-235ccdd5476c', 900),
    alt: 'CrossFit box with rig, bumper plates, and athletes mid-workout',
  },
  hyroxFacilities: {
    src: unsplash('1526506118085-60ce8714f8c5', 900),
    alt: 'Athlete pushing a weighted sled in a functional fitness facility',
  },
  boxingGyms: {
    src: unsplash('1615117972428-28de87a94938', 900),
    alt: 'Boxing gym interior with heavy bags and a ring visible',
  },
  pilatesYoga: {
    src: unsplash('1518310383802-640c2de311b2', 900),
    alt: 'Modern pilates reformer studio with mats and equipment in rows',
  },
}

// ─── Who-we-work-with page hero ────────────────────────────────────────────

export const WHO_WE_WORK_WITH_HERO = {
  src: unsplash('1558618666-fcd25c85cd64', 1800),
  alt: 'Wide-angle view of a large modern gym facility',
}

// ─── Per-segment images on /who-we-work-with page (same as tiles) ──────────

export const SEGMENT_PAGE_IMAGES = {
  independentGyms: SEGMENT_IMAGES.independentGyms,
  boutiqueStudios: SEGMENT_IMAGES.boutiqueStudios,
  crossfitBoxes: SEGMENT_IMAGES.crossfitBoxes,
  hyroxFacilities: SEGMENT_IMAGES.hyroxFacilities,
  preOpeningGyms: {
    src: unsplash('1517963879433-6ad2b056d712', 1000),
    alt: 'New gym being fitted out ahead of opening day',
  },
  franchiseGyms: {
    src: unsplash('1571902943202-507ec2618e8f', 1000),
    alt: 'Large commercial gym with rows of cardio and strength equipment',
  },
}

// ─── Results page header ───────────────────────────────────────────────────

export const RESULTS_HERO = {
  src: unsplash('1517836357463-d25dfeac3438', 1800),
  alt: '', // decorative
}

// ─── Contact page ──────────────────────────────────────────────────────────

export const CONTACT_IMAGE = {
  src: unsplash('1534438327276-14e5300c3a48', 1200),
  alt: 'Gym interior with weights and training equipment',
}

// ─── About page ────────────────────────────────────────────────────────────

export const ABOUT_WORKSPACE = {
  src: unsplash('1497366216548-37526070297c', 1200),
  alt: 'Modern workspace with laptop and coffee — the agency at work',
}

// ─── Video placeholder thumbnail ───────────────────────────────────────────

export const VIDEO_THUMBNAIL = HERO_IMAGE // same hero image, will get heavier overlay in component
