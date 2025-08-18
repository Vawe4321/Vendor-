import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../theme';

// Import inventory screens (we'll create these)
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
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="InventoryOverview"
        component={InventoryOverviewScreen}
        options={{ title: 'Inventory' }}
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