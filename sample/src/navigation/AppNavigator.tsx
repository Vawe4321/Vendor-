import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';

import { RootState, AppDispatch } from '../store';
import { initializeAuth } from '../store/slices/authSlice';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import SplashScreen from '../screens/SplashScreen';
import { RootStackParamList } from './types';
import { theme } from '../theme';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isLoading, user, isFreshLogin } = useSelector((state: RootState) => state.auth);
  const [showSplash, setShowSplash] = useState(true); // Always show splash on app start
  const [isInitialized, setIsInitialized] = useState(false);

  console.log('🧭 AppNavigator rendering with state:', {
    isAuthenticated,
    isLoading,
    hasUser: !!user,
    userDetails: user ? { id: user.id, businessName: user.businessName } : null,
    isInitialized,
    isFreshLogin
  });

  // Initialize auth state from storage on app start
  useEffect(() => {
    const initAuth = async () => {
      try {
        await dispatch(initializeAuth()).unwrap();
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initAuth();
  }, [dispatch]);

  const shouldShowMainApp = isAuthenticated && user;

  // Show splash screen on app start
  useEffect(() => {
    if (showSplash && isInitialized) {
      // Hide splash screen after 3 seconds
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSplash, isInitialized]);

  // Show splash screen on app start
  if (showSplash && isInitialized) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: theme.colors.background.default },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    );
  }

  // Show loading screen while checking authentication state or initializing
  if (isLoading || !isInitialized) {
    console.log('⏳ AppNavigator showing loading screen - auth is loading or initializing');
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background.default,
      }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  console.log(`🎯 Navigation decision: ${shouldShowMainApp ? 'Main App (TabNavigator)' : 'Auth Flow (AuthNavigator)'}`);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background.default },
      }}
    >
      {shouldShowMainApp ? (
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{
            animationTypeForReplace: 'push',
          }}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;