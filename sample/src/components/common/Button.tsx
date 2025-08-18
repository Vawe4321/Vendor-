import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
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
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyleArray = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? theme.colors.text.inverse : theme.colors.primary}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Icon
              name={icon as any}
              size={iconSize}
              color={variant === 'primary' ? theme.colors.text.inverse : theme.colors.primary}
              style={styles.leftIcon}
            />
          )}
          <Text style={textStyleArray}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Icon
              name={icon as any}
              size={iconSize}
              color={variant === 'primary' ? theme.colors.text.inverse : theme.colors.primary}
              style={styles.rightIcon}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.light,
  },

  // Variants
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: theme.colors.error.main,
  },

  // Sizes
  small: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    minHeight: theme.buttonHeights.small,
  },
  medium: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    minHeight: theme.buttonHeights.medium,
  },
  large: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xxl,
    minHeight: theme.buttonHeights.large,
  },

  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
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
  ghostText: {
    color: theme.colors.primary,
  },
  dangerText: {
    color: theme.colors.text.inverse,
  },

  // Size text styles
  smallText: {
    fontSize: theme.fontSizes.sm,
  },
  mediumText: {
    fontSize: theme.fontSizes.md,
  },
  largeText: {
    fontSize: theme.fontSizes.lg,
  },

  // Disabled state
  disabled: {
    opacity: 0.6,
  },
  disabledText: {
    color: theme.colors.text.disabled,
  },

  // Icon styles
  leftIcon: {
    marginRight: theme.spacing.sm,
  },
  rightIcon: {
    marginLeft: theme.spacing.sm,
  },
});

export default Button; 