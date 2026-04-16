// lib/images.ts
// Centralised image registry. Every Unsplash URL on the site is defined here
// so swapping to commissioned photography later is a one-file change.
//
// TODO: Phase B — Replace all Unsplash imagery with commissioned photography.
// Photography brief to be written separately.

function unsplash(id: string, w = 1200, q = 80) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`
}

// ─── Homepage ──────────────────────────────────────────────────────────────

export const HERO_IMAGE = {
  src: unsplash('1540497077202-7c8a3999166f', 1400),
  alt: 'Gym interior with rack of weights and training equipment',
}

// ─── Who-we-work-with segment tiles ────────────────────────────────────────
// Six visually distinct images — one per segment. A prospect scanning the
// grid must immediately understand which tile is which without reading labels.

export const SEGMENT_IMAGES = {
  independentGyms: {
    src: unsplash('1534438327276-14e5300c3a48', 900),
    alt: 'Independent gym with free weights and athletes training',
  },
  boutiqueStudios: {
    src: unsplash('1518611012118-696072aa579a', 900),
    alt: 'Boutique fitness studio with warm lighting and curated equipment',
  },
  crossfitBoxes: {
    src: unsplash('1534368420009-621bfab424a8', 900),
    alt: 'Barbell loaded with bumper plates in a CrossFit box',
  },
  hyroxFacilities: {
    src: unsplash('1526506118085-60ce8714f8c5', 900),
    alt: 'Athlete training with a weighted sled in a functional fitness facility',
  },
  boxingGyms: {
    src: unsplash('1549719386-882f20f39ad8', 900),
    alt: 'Heavy bags hanging in a boxing gym',
  },
  pilatesYoga: {
    src: unsplash('1544367567-0f2fcb009e0b', 900),
    alt: 'Pilates reformer in a clean modern studio',
  },
}

// ─── Who-we-work-with page hero ────────────────────────────────────────────

export const WHO_WE_WORK_WITH_HERO = {
  src: unsplash('1534438327276-14e5300c3a48', 1800),
  alt: 'Modern gym facility',
}

// ─── Per-segment images on /who-we-work-with page ──────────────────────────

export const SEGMENT_PAGE_IMAGES = {
  independentGyms: {
    src: unsplash('1540497077202-7c8a3999166f', 1000),
    alt: 'Independent gym with free weights and training equipment',
  },
  boutiqueStudios: {
    src: unsplash('1518611012118-696072aa579a', 1000),
    alt: 'Boutique fitness studio with curated equipment',
  },
  crossfitBoxes: {
    src: unsplash('1534368420009-621bfab424a8', 1000),
    alt: 'Barbell loaded with bumper plates in a CrossFit box',
  },
  hyroxFacilities: {
    src: unsplash('1526506118085-60ce8714f8c5', 1000),
    alt: 'Athlete training with a weighted sled in a functional fitness facility',
  },
  preOpeningGyms: {
    src: unsplash('1517963879433-6ad2b056d712', 1000),
    alt: 'New gym being fitted out ahead of opening day',
  },
  franchiseGyms: {
    src: unsplash('1558618666-fcd25c85cd64', 1000),
    alt: 'Large modern gym facility',
  },
}

// ─── Services page ─────────────────────────────────────────────────────────

export const SERVICES_HERO = {
  src: unsplash('1571902943202-507ec2618e8f', 1600),
  alt: 'Professional gym facility with members training',
}

// ─── Process section (homepage) background ─────────────────────────────────

export const PROCESS_BG = {
  src: unsplash('1517836357463-d25dfeac3438', 1600),
  alt: '', // decorative
}

// ─── Results page header ───────────────────────────────────────────────────

export const RESULTS_HERO = {
  src: unsplash('1517836357463-d25dfeac3438', 1800),
  alt: '', // decorative
}

// ─── Contact page ──────────────────────────────────────────────────────────

export const CONTACT_IMAGE = {
  src: unsplash('1571902943202-507ec2618e8f', 1200),
  alt: 'Modern gym facility',
}
