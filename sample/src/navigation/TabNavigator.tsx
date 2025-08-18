import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, Image } from 'react-native';

import { TabParamList } from './types';
import { theme } from '../theme';
import { SPACING, FONT_SIZES, SHADOWS } from '../utils/responsive';
import OrdersNavigator from './OrdersNavigator';
import InventoryNavigator from './InventoryNavigator';
import FeedbackNavigator from './FeedbackNavigator';
import HubNavigator from './HubNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator<TabParamList>();

// Custom Restaurant Icon Component
const RestaurantIcon: React.FC<{ focused: boolean; color: string; size: number }> = ({ focused, color, size }) => {
  return (
    <Image 
      source={require('../assets/images/Groosologo.jpeg')}
      style={[
        styles.restaurantLogo,
        { 
          width: size, 
          height: size
        }
      ]}
      resizeMode="contain"
    />
  );
};

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
            case 'Hub':
              iconName = 'hub';
              break;
            case 'Profile':
              return <RestaurantIcon focused={focused} color={color} size={size} />;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background.paper,
          borderTopColor: theme.colors.border.light,
          borderTopWidth: 1,
          paddingBottom: SPACING.sm,
          paddingTop: SPACING.sm,
          height: 72, // Increased for better touch targets
          ...SHADOWS.medium,
        },
        tabBarLabelStyle: {
          fontSize: FONT_SIZES.sm,
          fontWeight: '500',
          marginTop: SPACING.xs,
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
        name="Hub" 
        component={HubNavigator}
        options={{ tabBarLabel: 'Hub' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileNavigator}
        options={{ tabBarLabel: 'Restaurant' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  restaurantLogo: {
    borderRadius: 4,
  },
});

export default TabNavigator;