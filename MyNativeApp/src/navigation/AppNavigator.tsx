import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';

import { RootState, AppDispatch } from '../store';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { RootStackParamList } from './types';
import { theme } from '../theme';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isLoading, user } = useSelector((state: RootState) => state.auth);

  console.log('🧭 AppNavigator rendering with state:', {
    isAuthenticated,
    isLoading,
    hasUser: !!user,
    userDetails: user ? { id: user.id, businessName: user.businessName } : null
  });

  // Show loading screen while checking authentication state
  if (isLoading) {
    console.log('⏳ AppNavigator showing loading screen - auth is loading');
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const shouldShowMainApp = isAuthenticated && user;
  console.log(`🎯 Navigation decision: ${shouldShowMainApp ? 'Main App (TabNavigator)' : 'Auth Flow (AuthNavigator)'}`);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: theme.colors.background },
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
    </NavigationContainer>
  );
};

export default AppNavigator;