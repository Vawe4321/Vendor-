import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const getButtonStyle = (): ViewStyle => {
    const baseStyle = styles.button;
    const sizeStyle = styles[`${size}Button` as keyof typeof styles] as ViewStyle;
    const variantStyle = styles[`${variant}Button` as keyof typeof styles] as ViewStyle;
    
    return {
      ...baseStyle,
      ...sizeStyle,
      ...variantStyle,
      ...(disabled && styles.disabledButton),
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle = styles.text;
    const sizeStyle = styles[`${size}Text` as keyof typeof styles] as TextStyle;
    const variantStyle = styles[`${variant}Text` as keyof typeof styles] as TextStyle;
    
    return {
      ...baseStyle,
      ...sizeStyle,
      ...variantStyle,
      ...(disabled && styles.disabledText),
    };
  };

  const getIconColor = (): string => {
    if (disabled) return theme.colors.text.disabled;
    
    switch (variant) {
      case 'primary':
        return theme.colors.text.inverse;
      case 'secondary':
        return theme.colors.text.inverse;
      case 'outline':
        return theme.colors.primary;
      case 'text':
        return theme.colors.primary;
      default:
        return theme.colors.text.inverse;
    }
  };

  const getIconSize = (): number => {
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 18;
      case 'large':
        return 20;
      default:
        return 18;
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={[getButtonStyle(), style]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getIconColor()}
        />
      ) : (
        <>
          {leftIcon && (
            <Icon
              name={leftIcon}
              size={getIconSize()}
              color={getIconColor()}
              style={styles.leftIcon}
            />
          )}
          
          <Text style={[getTextStyle(), textStyle]}>
            {title}
          </Text>
          
          {rightIcon && (
            <Icon
              name={rightIcon}
              size={getIconSize()}
              color={getIconColor()}
              style={styles.rightIcon}
            />
          )}
        </>
      )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.light,
  },
  
  // Size variants
  smallButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    minHeight: theme.layout.buttonHeight.small,
  },
  mediumButton: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    minHeight: theme.layout.buttonHeight.medium,
  },
  largeButton: {
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.xl,
    minHeight: theme.layout.buttonHeight.large,
  },
  
  // Color variants with improved styling
  primaryButton: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.medium,
  },
  secondaryButton: {
    backgroundColor: theme.colors.secondary,
    ...theme.shadows.medium,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
  },
  
  disabledButton: {
    backgroundColor: theme.colors.background.level2,
    borderColor: theme.colors.border.light,
  },
  
  // Text styles with improved typography
  text: {
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  
  smallText: {
    ...theme.typography.bodySmallMedium,
  },
  mediumText: {
    ...theme.typography.bodyMedium,
  },
  largeText: {
    ...theme.typography.h5,
  },
  
  primaryText: {
    color: theme.colors.text.inverse,
  },
  secondaryText: {
    color: theme.colors.text.inverse,
  },
  outlineText: {
    color: theme.colors.primary,
  },
  textText: {
    color: theme.colors.primary,
  },
  
  disabledText: {
    color: theme.colors.text.disabled,
  },
  
  leftIcon: {
    marginRight: theme.spacing.sm,
  },
  rightIcon: {
    marginLeft: theme.spacing.sm,
  },
});

export default Button;