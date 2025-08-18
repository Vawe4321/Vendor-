import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'standard' | 'elevated' | 'outlined';
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'standard',
  padding = 'lg',
  margin = 'md',
  style,
}) => {
  const cardStyle = [
    styles.card,
    styles[variant],
    padding === 'xs' && styles.paddingXS,
    padding === 'sm' && styles.paddingSM,
    padding === 'md' && styles.paddingMD,
    padding === 'lg' && styles.paddingLG,
    padding === 'xl' && styles.paddingXL,
    margin === 'xs' && styles.marginXS,
    margin === 'sm' && styles.marginSM,
    margin === 'md' && styles.marginMD,
    margin === 'lg' && styles.marginLG,
    margin === 'xl' && styles.marginXL,
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.lg,
  },

  // Variants
  standard: {
    ...theme.shadows.light,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  elevated: {
    ...theme.shadows.medium,
  },
  outlined: {
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
  },

  // Padding variants
  paddingXS: {
    padding: theme.spacing.xs,
  },
  paddingSM: {
    padding: theme.spacing.sm,
  },
  paddingMD: {
    padding: theme.spacing.md,
  },
  paddingLG: {
    padding: theme.spacing.lg,
  },
  paddingXL: {
    padding: theme.spacing.xl,
  },

  // Margin variants
  marginXS: {
    margin: theme.spacing.xs,
  },
  marginSM: {
    margin: theme.spacing.sm,
  },
  marginMD: {
    margin: theme.spacing.md,
  },
  marginLG: {
    margin: theme.spacing.lg,
  },
  marginXL: {
    margin: theme.spacing.xl,
  },
});

export default Card; 