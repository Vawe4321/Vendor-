import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { OrdersStackParamList } from './types';
import { theme } from '../theme';
import OrderDashboardScreen from '../screens/orders/OrderDashboardScreen';
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
          backgroundColor: '#FFFFFF', // background.paper
          shadowColor: 'rgba(0, 0, 0, 0.08)',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 8,
          elevation: 4,
        },
        headerTintColor: '#212121', // text.primary
        headerTitleStyle: {
          fontWeight: '700', // Bold
          fontSize: 18, // FONT_SIZES.xl
        },
      }}
    >
      <Stack.Screen 
        name="OrderDashboard" 
        component={OrderDashboardScreen}
        options={{ 
          title: 'Orders',
          headerShown: false
        }}
      />
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