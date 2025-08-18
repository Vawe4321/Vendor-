import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <View style={styles.logo}>
                  <Text style={styles.logoText}>G</Text>
                </View>
              </View>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Sign in to your vendor account to manage orders and grow your business
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.form}>
              <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={handlePhoneChange}
                type="phone"
                leftIcon="phone"
                required
                error={errors.phone}
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={handlePasswordChange}
                type="password"
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
                title={isLoading ? "Signing In..." : "Sign In"}
                onPress={handleLogin}
                variant="primary"
                size="large"
                loading={isLoading}
                disabled={isLoading}
                style={styles.loginButton}
              />

              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account? </Text>
                <Button
                  title="Register"
                  onPress={handleRegister}
                  variant="ghost"
                  size="small"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.responsivePadding.screen,
    paddingVertical: theme.spacing.xxxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxxl,
  },
  logoContainer: {
    marginBottom: theme.spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  logoText: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
  },
  title: {
    fontSize: theme.fontSizes.title,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: theme.spacing.lg,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  loginButton: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
  },
  registerText: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.text.secondary,
  },
  errorContainer: {
    backgroundColor: theme.colors.error.light,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  errorText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.error.main,
    textAlign: 'center',
  },
});

export default LoginScreen;