import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
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
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...styles[`${size}Button`],
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? theme.colors.textLight : theme.colors.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? theme.colors.textLight : theme.colors.secondary,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? theme.colors.textLight : theme.colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...styles.text,
      ...styles[`${size}Text`],
    };

    switch (variant) {
      case 'primary':
      case 'secondary':
        return {
          ...baseStyle,
          color: disabled ? theme.colors.textSecondary : theme.colors.textInverse,
        };
      case 'outline':
      case 'ghost':
        return {
          ...baseStyle,
          color: disabled ? theme.colors.textLight : theme.colors.primary,
        };
      default:
        return baseStyle;
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

  const iconColor = variant === 'primary' || variant === 'secondary' 
    ? theme.colors.textInverse 
    : theme.colors.primary;

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'secondary' 
            ? theme.colors.textInverse 
            : theme.colors.primary
          }
        />
      ) : (
        <>
          {leftIcon && (
            <Icon
              name={leftIcon}
              size={getIconSize()}
              color={iconColor}
              style={styles.leftIcon}
            />
          )}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {rightIcon && (
            <Icon
              name={rightIcon}
              size={getIconSize()}
              color={iconColor}
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
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  smallButton: {
    height: theme.layout.buttonHeight.small,
    paddingHorizontal: theme.spacing.md,
  },
  mediumButton: {
    height: theme.layout.buttonHeight.medium,
    paddingHorizontal: theme.spacing.lg,
  },
  largeButton: {
    height: theme.layout.buttonHeight.large,
    paddingHorizontal: theme.spacing.xl,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    ...theme.typography.bodySmall,
  },
  mediumText: {
    ...theme.typography.body,
  },
  largeText: {
    ...theme.typography.bodyMedium,
  },
  leftIcon: {
    marginRight: theme.spacing.sm,
  },
  rightIcon: {
    marginLeft: theme.spacing.sm,
  },
});

export default Button;