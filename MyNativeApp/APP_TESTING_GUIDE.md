# Vendor App Testing Guide

## Overview
This guide provides comprehensive instructions for testing the Vendor Application, including setup, key features, and troubleshooting steps.

## Prerequisites

### System Requirements
- Node.js >= 18
- React Native CLI
- Android Studio (for Android testing)
- Xcode (for iOS testing, macOS only)
- Java Development Kit (JDK) 11 or newer

### Development Environment Setup
1. **Install Dependencies**
   ```bash
   cd MyNativeApp
   npm install
   ```

2. **iOS Setup (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Android Setup**
   - Ensure Android SDK is installed
   - Set ANDROID_HOME environment variable
   - Enable USB debugging on your device

## Running the Application

### Start Metro Bundler
```bash
npm start
# or if port 8081 is busy
npx react-native start --port 8082
```

### Run on Android
```bash
npm run android
# or
npx react-native run-android
```

### Run on iOS (macOS only)
```bash
npm run ios
# or
npx react-native run-ios
```

## Key Features to Test

### 1. Authentication Flow
**Test Cases:**
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Registration with new account
- [ ] OTP verification process
- [ ] Form validation (empty fields, invalid phone format)
- [ ] Error handling and display

**Test Steps:**
1. Launch the app
2. Navigate to Login screen
3. Test form validation by submitting empty fields
4. Enter invalid phone number format
5. Enter valid credentials and verify login
6. Test registration flow
7. Verify OTP screen functionality

### 2. Dashboard Screen
**Test Cases:**
- [ ] Metric cards display correctly
- [ ] Data updates properly
- [ ] Pull-to-refresh functionality
- [ ] Navigation to other screens
- [ ] Status indicator (Online/Offline)

**Test Steps:**
1. Login successfully
2. Verify dashboard loads with metric cards
3. Check metric card animations and interactions
4. Test pull-to-refresh
5. Verify quick action buttons work
6. Check recent orders section

### 3. Order Management
**Test Cases:**
- [ ] View order list
- [ ] Order card interactions
- [ ] Status badge display
- [ ] Accept/Reject order functionality
- [ ] Order details view
- [ ] Status updates

**Test Steps:**
1. Navigate to Orders section
2. Verify order cards display properly
3. Test order card tap interactions
4. Check status badges for different order states
5. Test accept/reject buttons (if available)
6. Verify order details screen

### 4. Navigation
**Test Cases:**
- [ ] Bottom tab navigation
- [ ] Stack navigation
- [ ] Back button functionality
- [ ] Deep linking (if implemented)

**Test Steps:**
1. Test all bottom tab items
2. Navigate through different screens
3. Use back button/gesture
4. Verify navigation state persistence

### 5. UI/UX Components
**Test Cases:**
- [ ] Button interactions and animations
- [ ] Input field focus states
- [ ] Card hover effects
- [ ] Loading states
- [ ] Error states
- [ ] Theme consistency

**Test Steps:**
1. Test all button variants and sizes
2. Check input field animations and validation
3. Verify card interactions
4. Test loading spinners
5. Check error message displays

## Redux State Management Testing

### Test Cases:
- [ ] Authentication state updates
- [ ] Order state management
- [ ] Analytics data handling
- [ ] State persistence
- [ ] Error state handling

### Testing Steps:
1. **Install Redux DevTools** (for debugging)
   ```bash
   npm install --save-dev reactotron-react-native reactotron-redux
   ```

2. **Monitor State Changes**
   - Use React Native Debugger
   - Check Redux DevTools for state updates
   - Verify actions are dispatched correctly

3. **Test State Persistence**
   - Close and reopen app
   - Verify login state persists
   - Check data persistence

## Form Validation Testing

### Login Form:
- [ ] Empty phone number
- [ ] Invalid phone format
- [ ] Empty password
- [ ] Minimum password length
- [ ] Network error handling

### Registration Form:
- [ ] All required fields validation
- [ ] Email format validation
- [ ] Password confirmation match
- [ ] Business name validation
- [ ] Phone number uniqueness

## Performance Testing

### Test Cases:
- [ ] App startup time
- [ ] Screen transition smoothness
- [ ] Memory usage
- [ ] Battery consumption
- [ ] Network request handling

### Tools:
- React Native Performance Monitor
- Flipper for debugging
- Android Studio Profiler
- Xcode Instruments

## Error Handling Testing

### Network Errors:
- [ ] No internet connection
- [ ] Server timeout
- [ ] API errors (4xx, 5xx)
- [ ] Malformed responses

### App Errors:
- [ ] JavaScript errors
- [ ] Native crashes
- [ ] Memory issues
- [ ] Permission errors

## Device Testing

### Screen Sizes:
- [ ] Small phones (iPhone SE, Android compact)
- [ ] Standard phones (iPhone 12, Pixel)
- [ ] Large phones (iPhone Pro Max, Android XL)
- [ ] Tablets (iPad, Android tablets)

### Operating Systems:
- [ ] iOS 14+
- [ ] Android 8+ (API level 26+)
- [ ] Different device manufacturers

## Accessibility Testing

### Test Cases:
- [ ] Screen reader compatibility
- [ ] Touch target sizes (minimum 44px)
- [ ] Color contrast ratios
- [ ] Focus indicators
- [ ] Alternative text for images

## Security Testing

### Test Cases:
- [ ] Secure storage of credentials
- [ ] API token handling
- [ ] Input sanitization
- [ ] Deep link security
- [ ] Biometric authentication (if implemented)

## Common Issues and Troubleshooting

### Metro Bundler Issues:
```bash
# Clear cache
npx react-native start --reset-cache

# Clean build
cd android && ./gradlew clean && cd ..
# or for iOS
cd ios && xcodebuild clean && cd ..
```

### Build Issues:
```bash
# Android
cd android && ./gradlew clean && cd .. && npm run android

# iOS
cd ios && pod install && cd .. && npm run ios
```

### Common Errors:

1. **Port Already in Use**
   ```bash
   npx react-native start --port 8082
   ```

2. **Android Build Fails**
   - Check ANDROID_HOME environment variable
   - Verify Android SDK installation
   - Clean and rebuild project

3. **iOS Build Fails**
   - Run `pod install` in ios directory
   - Check Xcode version compatibility
   - Verify iOS deployment target

4. **Metro Connection Issues**
   - Restart Metro bundler
   - Check device/emulator network connection
   - Verify firewall settings

## Test Data

### Sample Login Credentials:
```
Phone: +1234567890
Password: testpassword123
```

### Sample Orders:
- Order #1001 - Pending - ₹250
- Order #1002 - Accepted - ₹180
- Order #1003 - Delivered - ₹320

## Automated Testing

### Unit Tests:
```bash
npm test
```

### E2E Testing (if implemented):
```bash
# Using Detox or similar
npm run e2e:ios
npm run e2e:android
```

## Reporting Issues

When reporting bugs, include:
1. Device information (model, OS version)
2. App version
3. Steps to reproduce
4. Expected vs actual behavior
5. Screenshots/videos
6. Console logs/error messages

## Performance Benchmarks

### Target Metrics:
- App startup: < 3 seconds
- Screen transitions: < 300ms
- API responses: < 2 seconds
- Memory usage: < 150MB
- Battery drain: Minimal impact

## Conclusion

This testing guide covers all major aspects of the Vendor Application. Regular testing using this guide will ensure a high-quality, reliable application for vendors to manage their business operations effectively.

For additional support or questions, refer to the project documentation or contact the development team.