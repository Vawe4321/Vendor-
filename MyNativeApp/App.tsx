import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { store, persistor } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/common/ErrorBoundary';
import { theme } from './src/theme';

// Create React Native Paper theme from our custom theme
const paperTheme = {
  colors: {
    primary: theme.colors.primary,
    accent: theme.colors.secondary,
    background: theme.colors.background,
    surface: theme.colors.surface,
    text: theme.colors.text,
    disabled: theme.colors.textLight,
    placeholder: theme.colors.textSecondary,
    backdrop: 'rgba(0, 0, 0, 0.5)',
    onSurface: theme.colors.text,
    notification: theme.colors.error,
  },
};

// Loading component for PersistGate
const LoadingScreen: React.FC = () => {
  console.log('⏳ LoadingScreen rendering - PersistGate is loading...');
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
};

const App: React.FC = () => {
  console.log('🚀 App component rendering...');
  
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <PaperProvider theme={paperTheme}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor={theme.colors.background}
              translucent={false}
            />
            <AppNavigator />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
