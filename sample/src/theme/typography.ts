export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    lineHeight: 34,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 30,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 22,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    lineHeight: 20,
  },
  bodySmallMedium: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    lineHeight: 16,
  },
  captionMedium: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
};

export type Typography = typeof typography;