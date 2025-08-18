export const theme = {
  colors: {
    // Primary brand colors - Professional blue palette
    primary: '#2563EB',
    primaryLight: '#3B82F6',
    primaryDark: '#1D4ED8',
    primarySurface: '#EFF6FF',
    
    // Secondary colors - Complementary orange
    secondary: '#F59E0B',
    secondaryLight: '#FBBF24',
    secondaryDark: '#D97706',
    secondarySurface: '#FEF3C7',
    
    // Status colors
    success: '#10B981',
    successLight: '#34D399',
    successDark: '#059669',
    successSurface: '#D1FAE5',
    
    warning: '#F59E0B',
    warningLight: '#FBBF24',
    warningDark: '#D97706',
    warningSurface: '#FEF3C7',
    
    error: '#EF4444',
    errorLight: '#F87171',
    errorDark: '#DC2626',
    errorSurface: '#FEE2E2',
    
    info: '#3B82F6',
    infoLight: '#60A5FA',
    infoDark: '#2563EB',
    infoSurface: '#DBEAFE',
    
    // Neutral colors - Clean and modern
    background: '#FFFFFF',
    surface: '#F9FAFB',
    surfaceElevated: '#FFFFFF',
    surfaceDark: '#F3F4F6',
    
    // Text colors with better contrast
    text: '#111827',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    textLight: '#D1D5DB',
    textInverse: '#FFFFFF',
    
    // Border and divider colors
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    borderDark: '#D1D5DB',
    divider: '#E5E7EB',
    
    // Overlay and shadow colors
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowDark: 'rgba(0, 0, 0, 0.25)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    xxxxl: 40,
    xxxxxl: 48,
  },
  typography: {
    // Display text - for hero sections
    display: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      lineHeight: 40,
      letterSpacing: -0.5,
    },
    // Headings with better hierarchy
    h1: {
      fontSize: 28,
      fontWeight: 'bold' as const,
      lineHeight: 36,
      letterSpacing: -0.3,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 32,
      letterSpacing: -0.2,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
      letterSpacing: -0.1,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 26,
    },
    h5: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 24,
    },
    h6: {
      fontSize: 14,
      fontWeight: '600' as const,
      lineHeight: 20,
    },
    // Body text with improved readability
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    bodyMedium: {
      fontSize: 16,
      fontWeight: '500' as const,
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    bodySmallMedium: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 20,
    },
    // Caption and labels
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
    captionMedium: {
      fontSize: 12,
      fontWeight: '500' as const,
      lineHeight: 16,
    },
    label: {
      fontSize: 11,
      fontWeight: '500' as const,
      lineHeight: 16,
      letterSpacing: 0.5,
      textTransform: 'uppercase' as const,
    },
  },
  borderRadius: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    xxl: 16,
    xxxl: 20,
    full: 9999,
  },
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    xs: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 1,
      elevation: 1,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 16,
    },
  },
  // Animation and transition values
  animation: {
    duration: {
      fast: 150,
      normal: 200,
      slow: 300,
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
  // Layout constants
  layout: {
    headerHeight: 56,
    tabBarHeight: 60,
    buttonHeight: {
      small: 36,
      medium: 44,
      large: 52,
    },
    inputHeight: 48,
    cardMinHeight: 80,
  },
};

export type Theme = typeof theme;