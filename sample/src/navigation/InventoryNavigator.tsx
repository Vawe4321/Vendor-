import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../theme';
import InventoryOverviewScreen from '../screens/inventory/InventoryOverviewScreen';
import AddInventoryScreen from '../screens/inventory/AddInventoryScreen';
import EditInventoryScreen from '../screens/inventory/EditInventoryScreen';

export type InventoryStackParamList = {
  InventoryOverview: undefined;
  AddInventory: undefined;
  EditInventory: {
    itemId: string;
  };
};

const Stack = createStackNavigator<InventoryStackParamList>();

const InventoryNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
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
        name="InventoryOverview"
        component={InventoryOverviewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddInventory"
        component={AddInventoryScreen}
        options={{ title: 'Add Item' }}
      />
      <Stack.Screen
        name="EditInventory"
        component={EditInventoryScreen}
        options={{ title: 'Edit Item' }}
      />
    </Stack.Navigator>
  );
};

export default InventoryNavigator; 