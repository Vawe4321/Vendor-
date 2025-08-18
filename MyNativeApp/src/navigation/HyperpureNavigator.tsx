import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../theme';

// Import hyperpure screens (we'll create these)
import HyperpureOverviewScreen from '../screens/hyperpure/HyperpureOverviewScreen';
import HyperpureOrdersScreen from '../screens/hyperpure/HyperpureOrdersScreen';
import HyperpureProductsScreen from '../screens/hyperpure/HyperpureProductsScreen';

export type HyperpureStackParamList = {
  HyperpureOverview: undefined;
  HyperpureOrders: undefined;
  HyperpureProducts: undefined;
};

const Stack = createStackNavigator<HyperpureStackParamList>();

const HyperpureNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="HyperpureOverview"
        component={HyperpureOverviewScreen}
        options={{ title: 'Hyperpure' }}
      />
      <Stack.Screen
        name="HyperpureOrders"
        component={HyperpureOrdersScreen}
        options={{ title: 'Hyperpure Orders' }}
      />
      <Stack.Screen
        name="HyperpureProducts"
        component={HyperpureProductsScreen}
        options={{ title: 'Hyperpure Products' }}
      />
    </Stack.Navigator>
  );
};

export default HyperpureNavigator; 