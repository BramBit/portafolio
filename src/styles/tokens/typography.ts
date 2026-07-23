export const typography = {
  fontFamily: "'Space Grotesk', sans-serif",
  sizes: {
    hero: '72px',
    h1: '56px',
    h2: '40px',
    h3: '32px',
    h4: '24px',
    bodyLg: '20px',
    body: '18px',
    small: '16px',
    caption: '14px',
  },
} as const;

export type TypographySize = keyof typeof typography.sizes;
