import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { AuthStackParamList } from '../../navigation/types';
import { RootState, AppDispatch } from '../../store';
import { verifyOTP } from '../../store/slices/authSlice';
import { theme } from '../../theme';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { validateOTPForm } from '../../utils/validation';

type OTPScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'OTP'>;
type OTPScreenRouteProp = RouteProp<AuthStackParamList, 'OTP'>;

interface Props {
  navigation: OTPScreenNavigationProp;
  route: OTPScreenRouteProp;
}

const OTPScreen: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const { phone } = route.params;
  
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerifyOTP = () => {
    const validation = validateOTPForm(otp);
    
    if (validation.isValid) {
      setErrors({});
      dispatch(verifyOTP({ phone, otp: otp.trim() }));
    } else {
      setErrors(validation.errors);
    }
  };

  const handleOTPChange = (text: string) => {
    // Only allow digits and limit to 6 characters
    const numericText = text.replace(/[^0-9]/g, '').slice(0, 6);
    setOtp(numericText);
    
    // Clear error when user starts typing
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: '' }));
    }
  };

  const handleResendOTP = () => {
    setTimer(60);
    setCanResend(false);
    setOtp('');
    // Here you would typically call an API to resend OTP
  };

  const formatPhone = (phoneNumber: string) => {
    return phoneNumber.replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2 $3');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Verify Phone Number</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit verification code to
          </Text>
          <Text style={styles.phoneNumber}>{formatPhone(phone)}</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Enter OTP"
            placeholder="000000"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={6}
            style={styles.otpInput}
            required
          />

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <Button
            title="Verify OTP"
            onPress={handleVerifyOTP}
            loading={isLoading}
            disabled={isLoading}
            style={styles.verifyButton}
          />

          <View style={styles.resendContainer}>
            {canResend ? (
              <Text style={styles.resendLink} onPress={handleResendOTP}>
                Resend OTP
              </Text>
            ) : (
              <Text style={styles.timerText}>
                Resend OTP in {timer}s
              </Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  phoneNumber: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginTop: theme.spacing.sm,
  },
  form: {
    width: '100%',
  },
  otpInput: {
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 8,
    fontWeight: 'bold',
  },
  errorText: {
    ...theme.typography.bodySmall,
    color: theme.colors.error.main,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  verifyButton: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  timerText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  resendLink: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default OTPScreen;