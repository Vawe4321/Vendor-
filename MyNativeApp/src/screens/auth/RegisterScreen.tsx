import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthStackParamList } from '../../navigation/types';
import { RootState, AppDispatch } from '../../store';
import { registerUser } from '../../store/slices/authSlice';
import { theme } from '../../theme';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { validateRegistrationForm, formatPhoneNumber, formatGSTNumber } from '../../utils/validation';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    businessType: '',
    gstNumber: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    // Apply formatting for specific fields
    if (field === 'phone') {
      formattedValue = formatPhoneNumber(value);
    } else if (field === 'gstNumber') {
      formattedValue = formatGSTNumber(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRegister = () => {
    const validation = validateRegistrationForm(formData);
    
    if (validation.isValid) {
      setErrors({});
      const { gstNumber, ...requiredData } = formData;
      const registerData = {
        ...requiredData,
        ...(gstNumber && { gstNumber }),
      };
      
      dispatch(registerUser(registerData)).then((result: any) => {
        if (registerUser.fulfilled.match(result)) {
          navigation.navigate('OTP', { phone: formData.phone });
        }
      });
    } else {
      setErrors(validation.errors);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Register your business with us</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Business Name"
              placeholder="Enter your business name"
              value={formData.businessName}
              onChangeText={(value) => handleInputChange('businessName', value)}
              leftIcon="store"
              required
              error={errors.businessName}
            />

            <Input
              label="Owner Name"
              placeholder="Enter owner's full name"
              value={formData.ownerName}
              onChangeText={(value) => handleInputChange('ownerName', value)}
              leftIcon="person"
              required
              error={errors.ownerName}
            />

            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
              leftIcon="phone"
              required
              error={errors.phone}
            />

            <Input
              label="Email Address"
              placeholder="Enter your email address"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="email"
              required
              error={errors.email}
            />

            <Input
              label="Business Address"
              placeholder="Enter your business address"
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              multiline
              numberOfLines={3}
              leftIcon="location-on"
              required
              error={errors.address}
            />

            <Input
              label="Business Type"
              placeholder="e.g., Restaurant, Grocery, etc."
              value={formData.businessType}
              onChangeText={(value) => handleInputChange('businessType', value)}
              leftIcon="business"
              required
              error={errors.businessType}
            />

            <Input
              label="GST Number (Optional)"
              placeholder="Enter GST number if applicable"
              value={formData.gstNumber}
              onChangeText={(value) => handleInputChange('gstNumber', value)}
              leftIcon="receipt"
              error={errors.gstNumber}
            />

            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <Button
              title="Create Account"
              onPress={handleRegister}
              loading={isLoading}
              disabled={isLoading}
              style={styles.registerButton}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <Text style={styles.loginLink} onPress={handleLogin}>
                Sign In
              </Text>
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
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    fontWeight: '600',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  placeholder: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    fontStyle: 'italic',
  },
  errorText: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  registerButton: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  loginLink: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default RegisterScreen;