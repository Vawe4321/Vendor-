import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  isPassword?: boolean;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  isPassword = false,
  required = false,
  style,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const borderColorAnim = React.useRef(new Animated.Value(0)).current;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    Animated.timing(borderColorAnim, {
      toValue: 1,
      duration: theme.animationDuration.normal,
      useNativeDriver: false,
    }).start();
    props.onFocus && props.onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    Animated.timing(borderColorAnim, {
      toValue: 0,
      duration: theme.animationDuration.normal,
      useNativeDriver: false,
    }).start();
    props.onBlur && props.onBlur(e);
  };

  const animatedBorderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border.light, theme.colors.primary],
  });

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <Animated.View style={[
        styles.inputContainer,
        { borderColor: error ? theme.colors.error.main : animatedBorderColor },
        error && styles.inputContainerError,
      ]}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={20}
            color={theme.colors.text.secondary}
            style={styles.leftIcon}
          />
        )}
        
        <TextInput
          style={[styles.input, style]}
          secureTextEntry={isPassword && !isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={theme.colors.text.disabled}
          {...props}
        />
        
        {isPassword && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.rightIcon}
          >
            <Icon
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={20}
              color={theme.colors.text.secondary}
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
              color={theme.colors.text.secondary}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
      
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
    ...theme.typography.bodySmallMedium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  required: {
    color: theme.colors.error.main,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.background.default,
    paddingHorizontal: theme.spacing.lg,
    minHeight: theme.layout.inputHeight,
    ...theme.shadows.light,
  },
  inputContainerError: {
    borderColor: theme.colors.error.main,
    backgroundColor: theme.colors.error.light,
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text.primary,
    paddingVertical: 0, // Remove default padding for better control
  },
  leftIcon: {
    marginRight: theme.spacing.md,
  },
  rightIcon: {
    marginLeft: theme.spacing.md,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  errorText: {
    ...theme.typography.captionMedium,
    color: theme.colors.error.main,
    marginTop: theme.spacing.sm,
  },
});

export default Input;