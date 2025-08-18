import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { OrdersStackParamList } from './types';
import { theme } from '../theme';
import NewOrdersScreen from '../screens/orders/NewOrdersScreen';
import ActiveOrdersScreen from '../screens/orders/ActiveOrdersScreen';
import OrderDetailsScreen from '../screens/orders/OrderDetailsScreen';
import OrderHistoryScreen from '../screens/orders/OrderHistoryScreen';

const Stack = createStackNavigator<OrdersStackParamList>();

const OrdersNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.background,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="NewOrders" 
        component={NewOrdersScreen}
        options={{ title: 'New Orders' }}
      />
      <Stack.Screen 
        name="ActiveOrders" 
        component={ActiveOrdersScreen}
        options={{ title: 'Active Orders' }}
      />
      <Stack.Screen 
        name="OrderDetails" 
        component={OrderDetailsScreen}
        options={{ title: 'Order Details' }}
      />
      <Stack.Screen 
        name="OrderHistory" 
        component={OrderHistoryScreen}
        options={{ title: 'Order History' }}
      />
    </Stack.Navigator>
  );
};

export default OrdersNavigator;