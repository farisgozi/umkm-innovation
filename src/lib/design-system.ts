// Design System berdasarkan Figma - Warm Sunset Theme

export const colors = {
  // Primary Colors
  primary: {
    50: '#FFF8F3',   // Cream background
    100: '#FFD194',  // Light yellow
    200: '#FF9E6B',  // Light orange
    500: '#FF885B',  // Main orange
    600: '#FF7E5F',  // Darker orange
    700: '#FF6F61',  // Red orange
  },

  // Neutral Colors
  neutral: {
    50: '#FFF8F3',   // Light cream
    100: '#EAE2DC',  // Light gray
    200: '#FFF2E7',  // Very light gray
    500: '#6B6B6B',  // Medium gray
    900: '#2E2E2E',  // Dark text
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#FFF8F3',
    tertiary: '#FFD194',
  },

  // Text Colors
  text: {
    primary: '#2E2E2E',
    secondary: '#6B6B6B',
    inverse: '#FFFFFF',
  },

  // Status Colors
  warning: '#FF885B',
  success: '#FF7E5F',
  info: '#6B6B6B',
} as const;

export const typography = {
  // Font Families
  fontFamily: {
    heading: 'var(--font-clash-display)',
    body: 'var(--font-dm-sans)',
    accent: 'var(--font-space-grotesk)',
  },

  // Font Sizes
  fontSize: {
    xs: '0.625rem',    // 10px
    sm: '0.75rem',     // 12px
    base: '0.875rem',  // 14px
    lg: '1rem',        // 16px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '2rem',     // 32px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '4rem',     // 64px
    '7xl': '6rem',     // 96px
  },

  // Font Weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line Heights
  lineHeight: {
    tight: 1.23,
    normal: 1.302,
    relaxed: 1.5,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0',
    wide: '0.04em',
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
} as const;

export const borderRadius = {
  sm: '0.375rem',   // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
  '3xl': '2rem',    // 32px
  '4xl': '2.625rem', // 42px
  full: '9999px',
} as const;

export const shadows = {
  sm: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  md: '6px 0px 8px 0px rgba(107, 107, 107, 0.25), -6px 0px 8px 0px rgba(107, 107, 107, 0.25), 0px 6px 8px 0px rgba(107, 107, 107, 0.25), 0px -6px 8px 0px rgba(107, 107, 107, 0.25)',
  lg: '9px 9px 4px 0px rgba(0, 0, 0, 0.25)',
  xl: '0px 9px 4px 0px rgba(0, 0, 0, 0.25)',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Component Variants
export const componentVariants = {
  button: {
    sizes: {
      sm: {
        padding: '6px 15px',
        fontSize: typography.fontSize.xs,
        borderRadius: borderRadius['3xl'],
      },
      md: {
        padding: '10px 25px',
        fontSize: typography.fontSize.xl,
        borderRadius: borderRadius['3xl'],
      },
      lg: {
        padding: '10px 32px',
        fontSize: typography.fontSize['2xl'],
        borderRadius: borderRadius['3xl'],
      },
    },
    variants: {
      primary: {
        backgroundColor: colors.primary[100],
        color: colors.text.primary,
        fontWeight: typography.fontWeight.bold,
      },
      secondary: {
        backgroundColor: colors.primary[500],
        color: colors.text.inverse,
        fontWeight: typography.fontWeight.bold,
      },
      outline: {
        backgroundColor: 'transparent',
        color: colors.text.primary,
        border: `2px solid ${colors.neutral[500]}`,
        fontWeight: typography.fontWeight.bold,
      },
    },
  },
  
  card: {
    variants: {
      default: {
        backgroundColor: colors.background.primary,
        borderRadius: borderRadius['4xl'],
        padding: spacing[6],
      },
      featured: {
        backgroundColor: colors.primary[100],
        borderRadius: borderRadius['4xl'],
        padding: spacing[6],
        boxShadow: shadows.md,
      },
    },
  },
} as const;

// Helper function untuk membuat class names
export const cn = (...classes: (string | undefined | false | null)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Type exports
export type ColorKey = keyof typeof colors;
export type TypographyKey = keyof typeof typography;
export type SpacingKey = keyof typeof spacing;