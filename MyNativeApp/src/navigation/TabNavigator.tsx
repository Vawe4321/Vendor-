import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { TabParamList } from './types';
import { theme } from '../theme';
import OrdersNavigator from './OrdersNavigator';
import InventoryNavigator from './InventoryNavigator';
import FeedbackNavigator from './FeedbackNavigator';
import HyperpureNavigator from './HyperpureNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Orders':
              iconName = 'receipt';
              break;
            case 'Inventory':
              iconName = 'inventory';
              break;
            case 'Feedback':
              iconName = 'rate-review';
              break;
            case 'Hyperpure':
              iconName = 'shopping-cart';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen 
        name="Orders" 
        component={OrdersNavigator}
        options={{ tabBarLabel: 'Orders' }}
      />
      <Tab.Screen 
        name="Inventory" 
        component={InventoryNavigator}
        options={{ tabBarLabel: 'Inventory' }}
      />
      <Tab.Screen 
        name="Feedback" 
        component={FeedbackNavigator}
        options={{ tabBarLabel: 'Feedback' }}
      />
      <Tab.Screen 
        name="Hyperpure" 
        component={HyperpureNavigator}
        options={{ tabBarLabel: 'Hyperpure' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileNavigator}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;