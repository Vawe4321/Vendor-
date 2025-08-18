export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  // Check if it's a valid Indian phone number (10 digits)
  return cleanPhone.length === 10 && /^[6-9]/.test(cleanPhone);
};

export const validatePassword = (password: string): boolean => {
  // At least 6 characters
  return password.length >= 6;
};

export const validateOTP = (otp: string): boolean => {
  // Exactly 6 digits
  return /^\d{6}$/.test(otp);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateLoginForm = (phone: string, password: string): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!validateRequired(phone)) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }

  if (!validateRequired(password)) {
    errors.password = 'Password is required';
  } else if (!validatePassword(password)) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateRegistrationForm = (formData: {
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  businessType: string;
  gstNumber?: string;
}): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!validateRequired(formData.businessName)) {
    errors.businessName = 'Business name is required';
  }

  if (!validateRequired(formData.ownerName)) {
    errors.ownerName = 'Owner name is required';
  }

  if (!validateRequired(formData.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }

  if (!validateRequired(formData.email)) {
    errors.email = 'Email address is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validateRequired(formData.address)) {
    errors.address = 'Business address is required';
  }

  if (!validateRequired(formData.businessType)) {
    errors.businessType = 'Business type is required';
  }

  // GST number is optional, but if provided, validate format
  if (formData.gstNumber && formData.gstNumber.trim()) {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gstRegex.test(formData.gstNumber.trim())) {
      errors.gstNumber = 'Please enter a valid GST number';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateOTPForm = (otp: string): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!validateRequired(otp)) {
    errors.otp = 'OTP is required';
  } else if (!validateOTP(otp)) {
    errors.otp = 'Please enter a valid 6-digit OTP';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Limit to 10 digits
  const limitedPhone = cleanPhone.slice(0, 10);
  
  // Format as XXX XXX XXXX
  if (limitedPhone.length >= 6) {
    return `${limitedPhone.slice(0, 3)} ${limitedPhone.slice(3, 6)} ${limitedPhone.slice(6)}`;
  } else if (limitedPhone.length >= 3) {
    return `${limitedPhone.slice(0, 3)} ${limitedPhone.slice(3)}`;
  }
  
  return limitedPhone;
};

export const formatGSTNumber = (gst: string): string => {
  // Remove all non-alphanumeric characters and convert to uppercase
  return gst.replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 15);
};