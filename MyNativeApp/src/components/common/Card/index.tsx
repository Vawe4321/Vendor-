import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
  padding = 'medium',
}) => {
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.card,
      ...styles[`${padding}Padding`],
    };

    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          ...theme.shadows.md,
          backgroundColor: theme.colors.surfaceElevated,
        };
      case 'outlined':
        return {
          ...baseStyle,
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.background,
        };
      case 'default':
      default:
        return {
          ...baseStyle,
          backgroundColor: theme.colors.background,
          ...theme.shadows.sm,
        };
    }
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[getCardStyle(), style]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[getCardStyle(), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.lg,
    minHeight: theme.layout.cardMinHeight,
  },
  nonePadding: {
    padding: 0,
  },
  smallPadding: {
    padding: theme.spacing.md,
  },
  mediumPadding: {
    padding: theme.spacing.lg,
  },
  largePadding: {
    padding: theme.spacing.xl,
  },
});

export default Card;