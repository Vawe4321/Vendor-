import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MenuStackParamList } from './types';
import { theme } from '../theme';
import MenuOverviewScreen from '../screens/menu/MenuOverviewScreen';
import AddProductScreen from '../screens/menu/AddProductScreen';
import EditProductScreen from '../screens/menu/EditProductScreen';

const Stack = createStackNavigator<MenuStackParamList>();

const MenuNavigator: React.FC = () => {
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
        name="MenuOverview" 
        component={MenuOverviewScreen}
        options={{ title: 'Menu Management' }}
      />
      <Stack.Screen 
        name="AddProduct" 
        component={AddProductScreen}
        options={{ title: 'Add Product' }}
      />
      <Stack.Screen 
        name="EditProduct" 
        component={EditProductScreen}
        options={{ title: 'Edit Product' }}
      />
    </Stack.Navigator>
  );
};

export default MenuNavigator;