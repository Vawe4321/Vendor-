import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthStackParamList } from '../../navigation/types';
import { RootState, AppDispatch } from '../../store';
import { loginUser } from '../../store/slices/authSlice';
import { theme } from '../../theme';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { validateLoginForm, formatPhoneNumber } from '../../utils/validation';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  console.log('📱 LoginScreen rendering');
  
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  
  console.log('🔐 LoginScreen auth state:', { isLoading, hasError: !!error });
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleLogin = () => {
    const validation = validateLoginForm(phone, password);
    
    if (validation.isValid) {
      setErrors({});
      dispatch(loginUser({ phone: phone.trim(), password }));
    } else {
      setErrors(validation.errors);
    }
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhone(formatted);
    // Clear phone error when user starts typing
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    // Clear password error when user starts typing
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>V</Text>
              </View>
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your vendor account to manage orders and grow your business</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
              leftIcon="phone"
              required
              error={errors.phone}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={handlePasswordChange}
              isPassword
              leftIcon="lock"
              required
              error={errors.password}
            />

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              style={styles.loginButton}
              size="large"
            />

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <Text style={styles.registerLink} onPress={handleRegister}>
                Sign Up
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxxxxl,
  },
  logoContainer: {
    marginBottom: theme.spacing.xxxl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.xxl,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  logoText: {
    ...theme.typography.display,
    color: theme.colors.textInverse,
    fontWeight: 'bold',
  },
  title: {
    ...theme.typography.display,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: theme.spacing.lg,
  },
  form: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: theme.colors.errorSurface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.error,
  },
  errorText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.errorDark,
    textAlign: 'center',
  },
  loginButton: {
    marginTop: theme.spacing.xxxl,
    marginBottom: theme.spacing.xxxl,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  registerText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  registerLink: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary,
  },
});

export default LoginScreen;