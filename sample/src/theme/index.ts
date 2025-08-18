import { Dimensions } from 'react-native';
import { typography } from './typography';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive helpers
export const wp = (percentage: number) => (screenWidth * percentage) / 100;
export const hp = (percentage: number) => (screenHeight * percentage) / 100;
export const rf = (size: number) => Math.round((screenWidth * size) / 375); // Base on iPhone 11 Pro
export const rs = (size: number) => Math.round((screenWidth * size) / 375);

// Device size detection
export const getDeviceSize = () => {
  if (screenWidth >= 768) return 'tablet';
  if (screenWidth >= 414) return 'large';
  if (screenWidth >= 375) return 'medium';
  return 'small';
};

export const getResponsiveValue = <T>(values: {
  small?: T;
  medium?: T;
  large?: T;
  tablet?: T;
  default: T;
}): T => {
  const deviceSize = getDeviceSize();
  return values[deviceSize] || values.default;
};

// Design Tokens
export const SPACING = {
  xs: 4,    // Minimal spacing
  sm: 8,    // Small spacing
  md: 12,   // Medium spacing
  lg: 16,   // Large spacing
  xl: 20,   // Extra large spacing
  xxl: 24,  // Double extra large
  xxxl: 32, // Triple extra large
};

export const FONT_SIZES = {
  xs: rf(10),      // Captions, badges
  sm: rf(12),      // Small text, labels
  md: rf(14),      // Body text
  lg: rf(16),      // Subtitle
  xl: rf(18),      // Subtitle large
  xxl: rf(20),     // Heading 6
  xxxl: rf(24),    // Heading 5
  title: rf(28),   // Heading 4
  heading: rf(32), // Heading 3
};

export const BORDER_RADIUS = {
  xs: 2,    // Minimal rounding
  sm: 4,    // Small rounding
  md: 8,    // Medium rounding
  lg: 12,   // Large rounding
  xl: 16,   // Extra large rounding
  xxl: 20,  // Double extra large
  round: 50, // Circular elements
};

export const ICON_SIZES = {
  xs: 12,   // Very small icons
  sm: 16,   // Small icons
  md: 20,   // Medium icons
  lg: 24,   // Large icons (standard)
  xl: 28,   // Extra large icons
  xxl: 32,  // Double extra large
};

export const BUTTON_HEIGHTS = {
  small: 32,
  medium: 44,    // Minimum touch target
  large: 56,
};

export const INPUT_HEIGHTS = {
  small: 36,
  medium: 48,
  large: 56,
};

export const HEADER_HEIGHTS = {
  default: 56,
  large: 64,
};

export const TOUCH_TARGET = {
  small: 32,   // Minimum for small elements
  medium: 44,  // Standard touch target
  large: 56,   // Large touch target
};

export const ANIMATION_DURATION = {
  fast: 150,    // Quick interactions
  normal: 250,  // Standard animations
  slow: 350,    // Complex animations
};

export const LAYOUT = {
  inputHeight: 48,
  buttonHeight: 48,
  headerHeight: 56,
  tabBarHeight: 60,
};

export const Z_INDEX = {
  background: -1,
  default: 0,
  content: 1,
  header: 10,
  overlay: 100,
  modal: 1000,
  toast: 2000,
};

export const SHADOWS = {
  light: {
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  heavy: {
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Responsive padding
export const responsivePadding = {
  screen: getResponsiveValue({
    small: SPACING.md,
    medium: SPACING.lg,
    large: SPACING.xl,
    tablet: SPACING.xxl,
    default: SPACING.lg,
  }),
};

export const theme = {
  colors: {
    // Primary Brand Colors - Fresh & Natural Green
    primary: '#699f38',           // Main brand green
    primaryDark: '#245e34',       // Dark green for emphasis
    primaryLight: '#e8f5d8',      // Light green for backgrounds

    // Secondary Colors - Teal
    secondary: '#13766f',         // Teal for secondary actions
    secondaryDark: '#042f34',     // Dark teal for depth
    secondaryLight: '#d4f1ef',    // Light teal for backgrounds

    // Accent Color - Orange
    accent: '#dd5e25',            // Orange for highlights

    // Status Colors
    success: {
      light: '#C8E6C9',
      main: '#4CAF50',
      dark: '#388E3C',
    },
    warning: {
      light: '#FFF3C4',
      main: '#FFC107',
      dark: '#F57C00',
    },
    error: {
      light: '#FFCDD2',
      main: '#F44336',
      dark: '#D32F2F',
    },
    info: {
      light: '#BBDEFB',
      main: '#2196F3',
      dark: '#1976D2',
    },

    // Neutral Colors - Gray Scale
    gray: {
      50: '#FAFAFA',    // Lightest background
      100: '#F5F5F5',   // Light background
      200: '#EEEEEE',   // Border light
      300: '#E0E0E0',   // Border medium
      400: '#BDBDBD',   // Border dark
      500: '#9E9E9E',   // Text secondary
      600: '#757575',   // Text primary
      700: '#616161',   // Text emphasis
      800: '#424242',   // Text strong
      900: '#212121',   // Text primary
    },

    // Text Colors
    text: {
      primary: '#212121',     // Main text color
      secondary: '#757575',   // Secondary text
      disabled: '#BDBDBD',    // Disabled text
      hint: '#9E9E9E',        // Placeholder text
      inverse: '#FFFFFF',      // Text on dark backgrounds
      link: '#1976D2',        // Link color
    },

    // Background Colors
    background: {
      default: '#FFFFFF',      // Main background
      paper: '#FFFFFF',        // Card backgrounds
      level1: '#F5F5F5',      // Subtle background
      level2: '#EEEEEE',       // Medium background
      level3: '#E0E0E0',       // Strong background
    },

    // Border Colors
    border: {
      light: '#E0E0E0',
      medium: '#BDBDBD',
      dark: '#9E9E9E',
    },

    // Shadow Colors
    shadow: {
      light: 'rgba(0, 0, 0, 0.08)',
      medium: 'rgba(0, 0, 0, 0.12)',
      heavy: 'rgba(0, 0, 0, 0.16)',
    },

    // Legacy support
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceDark: '#F5F5F5',
    textSecondary: '#757575',
    textTertiary: '#9E9E9E',
    textLight: '#BDBDBD',
    textInverse: '#FFFFFF',
    divider: '#E0E0E0',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  spacing: SPACING,
  fontSizes: FONT_SIZES,
  borderRadius: BORDER_RADIUS,
  iconSizes: ICON_SIZES,
  buttonHeights: BUTTON_HEIGHTS,
  inputHeights: INPUT_HEIGHTS,
  headerHeights: HEADER_HEIGHTS,
  touchTarget: TOUCH_TARGET,
  animationDuration: ANIMATION_DURATION,
  zIndex: Z_INDEX,
  shadows: SHADOWS,
  responsivePadding,
  typography,
  layout: LAYOUT,
};

export type Theme = typeof theme;