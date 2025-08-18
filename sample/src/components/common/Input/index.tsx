import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  isPassword?: boolean;
  onRightIconPress?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  required,
  leftIcon,
  rightIcon,
  isPassword,
  onRightIconPress,
  style,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError,
      ]}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={20}
            color={error ? theme.colors.error : theme.colors.textSecondary}
            style={styles.leftIcon}
          />
        )}
        
        <TextInput
          {...props}
          style={[styles.input, style]}
          secureTextEntry={isPassword && !isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={theme.colors.textTertiary}
        />
        
        {isPassword && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.rightIcon}
          >
            <Icon
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && !isPassword && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
          >
            <Icon
              name={rightIcon}
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  required: {
    color: theme.colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    height: theme.layout.inputHeight,
  },
  inputContainerFocused: {
    borderColor: theme.colors.primary,
    ...theme.shadows.sm,
  },
  inputContainerError: {
    borderColor: theme.colors.error,
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text,
    paddingVertical: 0,
  },
  leftIcon: {
    marginRight: theme.spacing.md,
  },
  rightIcon: {
    marginLeft: theme.spacing.md,
    padding: theme.spacing.xs,
  },
  errorText: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
});

export default Input;