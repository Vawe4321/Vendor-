import { Dimensions, PixelRatio, Platform } from 'react-native';
import { theme } from '../theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive breakpoints
const BREAKPOINTS = {
  small: 320,    // iPhone SE
  medium: 375,   // iPhone 11 Pro
  large: 414,    // iPhone 11 Pro Max
  tablet: 768,   // iPad
};

// Device size detection
export const getDeviceSize = (): 'small' | 'medium' | 'large' | 'tablet' => {
  const width = SCREEN_WIDTH;
  
  if (width >= BREAKPOINTS.tablet) return 'tablet';
  if (width >= BREAKPOINTS.large) return 'large';
  if (width >= BREAKPOINTS.medium) return 'medium';
  return 'small';
};

// Device size helper functions
export const isSmallDevice = (): boolean => getDeviceSize() === 'small';
export const isMediumDevice = (): boolean => getDeviceSize() === 'medium';
export const isLargeDevice = (): boolean => getDeviceSize() === 'large';
export const isTablet = (): boolean => getDeviceSize() === 'tablet';

// Responsive value helper
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

// Width percentage
export const wp = (percentage: number): number => {
  return (SCREEN_WIDTH * percentage) / 100;
};

// Height percentage
export const hp = (percentage: number): number => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

// Responsive font size
export const rf = (size: number): number => {
  const scale = SCREEN_WIDTH / 375; // Base on iPhone 11 Pro
  const newSize = size * scale;
  
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

// Responsive spacing
export const rs = (size: number): number => {
  const deviceSize = getDeviceSize();
  let multiplier = 1;
  
  switch (deviceSize) {
    case 'small': multiplier = 0.85; break;
    case 'medium': multiplier = 1; break;
    case 'large': multiplier = 1.1; break;
    case 'tablet': multiplier = 1.3; break;
  }
  
  return Math.round(size * multiplier);
};

// Responsive padding for screens
export const responsivePadding = {
  screen: getResponsiveValue({
    small: theme.spacing.md,  // 12px
    medium: theme.spacing.lg, // 16px
    large: theme.spacing.xl,  // 20px
    tablet: theme.spacing.xxl, // 24px
    default: theme.spacing.lg, // 16px
  }),
};

// Grid columns based on device size
export const getGridColumns = (): number => {
  return getResponsiveValue({
    small: 2,
    medium: 2,
    large: 3,
    tablet: 4,
    default: 2,
  });
};

// Responsive spacing scale
export const SPACING = {
  xs: rs(4),    // Minimal spacing
  sm: rs(8),    // Small spacing
  md: rs(12),   // Medium spacing
  lg: rs(16),   // Large spacing
  xl: rs(20),   // Extra large spacing
  xxl: rs(24),  // Double extra large
  xxxl: rs(32), // Triple extra large
};

// Responsive font sizes
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

// Responsive border radius
export const BORDER_RADIUS = {
  xs: rs(2),    // Minimal rounding
  sm: rs(4),    // Small rounding
  md: rs(8),    // Medium rounding
  lg: rs(12),   // Large rounding
  xl: rs(16),   // Extra large rounding
  xxl: rs(20),  // Double extra large
  round: rs(50), // Circular elements
};

// Responsive icon sizes
export const ICON_SIZES = {
  xs: rs(12),   // Very small icons
  sm: rs(16),   // Small icons
  md: rs(20),   // Medium icons
  lg: rs(24),   // Large icons (standard)
  xl: rs(28),   // Extra large icons
  xxl: rs(32),  // Double extra large
};

// Responsive component heights
export const BUTTON_HEIGHTS = {
  small: rs(32),
  medium: rs(44),    // Minimum touch target
  large: rs(56),
};

export const INPUT_HEIGHTS = {
  small: rs(36),
  medium: rs(48),
  large: rs(56),
};

export const HEADER_HEIGHTS = {
  default: rs(56),
  large: rs(64),
};

// Touch target sizes
export const TOUCH_TARGET = {
  small: rs(32),   // Minimum for small elements
  medium: rs(44),  // Standard touch target
  large: rs(56),   // Large touch target
};

// Animation durations
export const ANIMATION_DURATION = {
  fast: 150,    // Quick interactions
  normal: 250,  // Standard animations
  slow: 350,    // Complex animations
};

// Z-Index values
export const Z_INDEX = {
  background: -1,
  default: 0,
  content: 1,
  header: 10,
  overlay: 100,
  modal: 1000,
  toast: 2000,
};

// Shadow system
export const SHADOWS = {
  light: {
    shadowColor: theme.shadows.light.shadowColor,
    shadowOffset: theme.shadows.light.shadowOffset,
    shadowOpacity: theme.shadows.light.shadowOpacity,
    shadowRadius: theme.shadows.light.shadowRadius,
    elevation: theme.shadows.light.elevation,
  },
  medium: {
    shadowColor: theme.shadows.medium.shadowColor,
    shadowOffset: theme.shadows.medium.shadowOffset,
    shadowOpacity: theme.shadows.medium.shadowOpacity,
    shadowRadius: theme.shadows.medium.shadowRadius,
    elevation: theme.shadows.medium.elevation,
  },
  heavy: {
    shadowColor: theme.shadows.heavy.shadowColor,
    shadowOffset: theme.shadows.heavy.shadowOffset,
    shadowOpacity: theme.shadows.heavy.shadowOpacity,
    shadowRadius: theme.shadows.heavy.shadowRadius,
    elevation: theme.shadows.heavy.elevation,
  },
};

// Common style helpers
export const commonStyles = {
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shadow: SHADOWS.light,
  card: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.light,
  },
}; 