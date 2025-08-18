/**
 * Vendor App - Restaurant Management System
 * Main entry point with Redux store and navigation setup
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store, persistor } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/theme';
import LoadingSpinner from './src/components/common/LoadingSpinner';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  console.log('🚀 App starting up...');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
            <StatusBar 
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={theme.colors.background.default}
            />
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
