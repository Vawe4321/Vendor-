import { theme } from '../theme';
import { 
  SPACING, 
  FONT_SIZES, 
  BORDER_RADIUS, 
  SHADOWS, 
  ICON_SIZES, 
  BUTTON_HEIGHTS, 
  INPUT_HEIGHTS,
  TOUCH_TARGET,
  ANIMATION_DURATION,
  Z_INDEX,
  getResponsiveValue,
  getDeviceSize,
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  isTablet,
  wp,
  hp,
  rf,
  rs
} from './responsive';

// Design System Export
export const DesignSystem = {
  // Colors
  colors: theme.colors,
  
  // Spacing
  spacing: SPACING,
  
  // Typography
  typography: {
    ...theme.typography,
    fontSize: FONT_SIZES,
  },
  
  // Border Radius
  borderRadius: BORDER_RADIUS,
  
  // Shadows
  shadows: SHADOWS,
  
  // Icon Sizes
  iconSizes: ICON_SIZES,
  
  // Component Heights
  buttonHeights: BUTTON_HEIGHTS,
  inputHeights: INPUT_HEIGHTS,
  touchTarget: TOUCH_TARGET,
  
  // Animation
  animation: {
    duration: ANIMATION_DURATION,
    easing: theme.animation.easing,
  },
  
  // Z-Index
  zIndex: Z_INDEX,
  
  // Responsive Utilities
  responsive: {
    getResponsiveValue,
    getDeviceSize,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isTablet,
    wp,
    hp,
    rf,
    rs,
  },
  
  // Breakpoints
  breakpoints: theme.breakpoints,
};

// Common Style Patterns
export const CommonStyles = {
  // Layout Patterns
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  
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
  
  // Card Patterns
  card: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.light,
  },
  
  elevatedCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  
  // Button Patterns
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    minHeight: BUTTON_HEIGHTS.medium,
    ...SHADOWS.light,
  },
  
  secondaryButton: {
    backgroundColor: theme.colors.background.paper,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    minHeight: BUTTON_HEIGHTS.medium,
    ...SHADOWS.light,
  },
  
  // Input Patterns
  input: {
    backgroundColor: theme.colors.background.paper,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    minHeight: INPUT_HEIGHTS.medium,
    ...SHADOWS.light,
  },
  
  // Header Patterns
  header: {
    backgroundColor: theme.colors.background.paper,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    ...SHADOWS.medium,
  },
  
  // Section Patterns
  section: {
    marginBottom: SPACING.xxl,
  },
  
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: SPACING.lg,
  },
  
  // List Item Patterns
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.xs,
  },
  
  // Grid Patterns
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  gridItem: {
    width: '48%',
    backgroundColor: theme.colors.background.paper,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    ...SHADOWS.light,
  },
};

// Text Style Patterns
export const TextStyles = {
  // Headings
  h1: {
    fontSize: FONT_SIZES.title,
    fontWeight: '800',
    color: theme.colors.text.primary,
    lineHeight: 48,
  },
  
  h2: {
    fontSize: FONT_SIZES.heading,
    fontWeight: '700',
    color: theme.colors.text.primary,
    lineHeight: 44,
  },
  
  h3: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '700',
    color: theme.colors.text.primary,
    lineHeight: 40,
  },
  
  h4: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: theme.colors.text.primary,
    lineHeight: 36,
  },
  
  h5: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: theme.colors.text.primary,
    lineHeight: 32,
  },
  
  h6: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
    lineHeight: 28,
  },
  
  // Body Text
  body1: {
    fontSize: FONT_SIZES.md,
    fontWeight: '400',
    color: theme.colors.text.primary,
    lineHeight: 24,
  },
  
  body2: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '400',
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  
  // Captions
  caption: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '400',
    color: theme.colors.text.hint,
    lineHeight: 16,
  },
  
  // Button Text
  buttonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Link Text
  link: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: theme.colors.text.link,
  },
};

// Status Colors
export const StatusColors = {
  success: {
    background: theme.colors.success.light,
    text: theme.colors.success.dark,
    border: theme.colors.success.main,
  },
  
  warning: {
    background: theme.colors.warning.light,
    text: theme.colors.warning.dark,
    border: theme.colors.warning.main,
  },
  
  error: {
    background: theme.colors.error.light,
    text: theme.colors.error.dark,
    border: theme.colors.error.main,
  },
  
  info: {
    background: theme.colors.info.light,
    text: theme.colors.info.dark,
    border: theme.colors.info.main,
  },
};

// Component Style Generators
export const StyleGenerators = {
  // Generate responsive spacing
  spacing: (size: keyof typeof SPACING) => SPACING[size],
  
  // Generate responsive font size
  fontSize: (size: keyof typeof FONT_SIZES) => FONT_SIZES[size],
  
  // Generate responsive border radius
  borderRadius: (size: keyof typeof BORDER_RADIUS) => BORDER_RADIUS[size],
  
  // Generate responsive icon size
  iconSize: (size: keyof typeof ICON_SIZES) => ICON_SIZES[size],
  
  // Generate button height
  buttonHeight: (size: keyof typeof BUTTON_HEIGHTS) => BUTTON_HEIGHTS[size],
  
  // Generate input height
  inputHeight: (size: keyof typeof INPUT_HEIGHTS) => INPUT_HEIGHTS[size],
  
  // Generate shadow
  shadow: (level: keyof typeof SHADOWS) => SHADOWS[level],
  
  // Generate color
  color: (colorPath: string) => {
    const path = colorPath.split('.');
    let value: any = theme.colors;
    for (const key of path) {
      value = value[key];
    }
    return value;
  },
};

// Usage Examples
export const UsageExamples = {
  // Button with design system
  primaryButton: {
    ...CommonStyles.primaryButton,
    ...TextStyles.buttonText,
  },
  
  // Card with design system
  standardCard: {
    ...CommonStyles.card,
  },
  
  // Input with design system
  standardInput: {
    ...CommonStyles.input,
    ...TextStyles.body1,
  },
  
  // Header with design system
  standardHeader: {
    ...CommonStyles.header,
  },
  
  // Section with design system
  standardSection: {
    ...CommonStyles.section,
  },
  
  // List item with design system
  standardListItem: {
    ...CommonStyles.listItem,
  },
  
  // Grid item with design system
  standardGridItem: {
    ...CommonStyles.gridItem,
  },
};

// Export everything
export default DesignSystem; 