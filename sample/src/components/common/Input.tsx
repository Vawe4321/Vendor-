import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'email' | 'password' | 'phone' | 'number';
  required?: boolean;
  error?: string;
  disabled?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  type = 'text',
  required = false,
  error,
  disabled = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
  labelStyle,
  errorStyle,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  autoCapitalize = 'sentences',
  keyboardType,
  secureTextEntry,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getKeyboardType = () => {
    if (keyboardType) return keyboardType;
    switch (type) {
      case 'email':
        return 'email-address';
      case 'phone':
        return 'phone-pad';
      case 'number':
        return 'numeric';
      default:
        return 'default';
    }
  };

  const getSecureTextEntry = () => {
    if (secureTextEntry !== undefined) return secureTextEntry;
    return type === 'password';
  };

  const containerStyle = [
    styles.container,
    isFocused && styles.focused,
    error && styles.error,
    disabled && styles.disabled,
    style,
  ];

  const inputContainerStyle = [
    styles.inputContainer,
    isFocused && styles.inputContainerFocused,
    error && styles.inputContainerError,
    disabled && styles.inputContainerDisabled,
  ];

  return (
    <View style={containerStyle}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}

      <View style={inputContainerStyle}>
        {leftIcon && (
          <Icon
            name={leftIcon as any}
            size={theme.iconSizes.md}
            color={error ? theme.colors.error.main : theme.colors.text.secondary}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.hint}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          keyboardType={getKeyboardType()}
          secureTextEntry={getSecureTextEntry()}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIconContainer}
            disabled={!onRightIconPress}
          >
            <Icon
              name={rightIcon as any}
              size={theme.iconSizes.md}
              color={error ? theme.colors.error.main : theme.colors.text.secondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Icon
            name="error-outline"
            size={theme.iconSizes.sm}
            color={theme.colors.error.main}
            style={styles.errorIcon}
          />
          <Text style={[styles.errorText, errorStyle]}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },

  labelContainer: {
    marginBottom: theme.spacing.xs,
  },

  label: {
    fontSize: theme.fontSizes.md,
    fontWeight: '500',
    color: theme.colors.text.primary,
  },

  required: {
    color: theme.colors.error.main,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.paper,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    minHeight: theme.inputHeights.medium,
    ...theme.shadows.light,
  },

  inputContainerFocused: {
    borderColor: theme.colors.primary,
    ...theme.shadows.medium,
  },

  inputContainerError: {
    borderColor: theme.colors.error.main,
  },

  inputContainerDisabled: {
    backgroundColor: theme.colors.background.level1,
    opacity: 0.6,
  },

  leftIcon: {
    marginRight: theme.spacing.sm,
  },

  input: {
    flex: 1,
    fontSize: theme.fontSizes.md,
    color: theme.colors.text.primary,
    paddingVertical: theme.spacing.sm,
  },

  rightIconContainer: {
    marginLeft: theme.spacing.sm,
    padding: theme.spacing.xs,
  },

  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },

  errorIcon: {
    marginRight: theme.spacing.xs,
  },

  errorText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.error.main,
    flex: 1,
  },

  focused: {
    // Additional focus styles if needed
  },

  error: {
    // Additional error styles if needed
  },

  disabled: {
    opacity: 0.6,
  },
});

export default Input; 