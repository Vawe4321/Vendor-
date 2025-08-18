import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Animated,
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
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const shadowValue = React.useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    if (onPress) {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 0.98,
          useNativeDriver: true,
        }),
        Animated.timing(shadowValue, {
          toValue: 1,
          duration: theme.animation.duration.fast,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(shadowValue, {
          toValue: 0,
          duration: theme.animation.duration.fast,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };
  const getCardStyle = (): ViewStyle => {
    const baseStyle = styles.card;
    const variantStyle = styles[`${variant}Card` as keyof typeof styles] as ViewStyle;
    const paddingStyle = styles[`${padding}Padding` as keyof typeof styles] as ViewStyle;
    
    return {
      ...baseStyle,
      ...variantStyle,
      ...paddingStyle,
    };
  };

  const animatedStyle = onPress ? {
    transform: [{ scale: scaleValue }],
    ...theme.shadows.md,
  } : {};

  if (onPress) {
    return (
      <Animated.View style={[animatedStyle]}>
        <TouchableOpacity
          style={[getCardStyle(), style]}
          onPress={onPress}
          activeOpacity={0.9}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
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
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.background,
  },
  
  // Variant styles with improved shadows
  defaultCard: {
    ...theme.shadows.sm,
    borderWidth: 0.5,
    borderColor: theme.colors.borderLight,
  },
  elevatedCard: {
    ...theme.shadows.lg,
  },
  outlinedCard: {
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    ...theme.shadows.xs,
  },
  
  // Padding styles with better spacing
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