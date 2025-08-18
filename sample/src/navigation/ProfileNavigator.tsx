import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileStackParamList } from './types';
import { theme } from '../theme';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import TroubleshootScreen from '../screens/profile/TroubleshootScreen';
import SupportScreen from '../screens/profile/SupportScreen';
import TimingsScreen from '../screens/profile/TimingsScreen';
import ContactDetailsScreen from '../screens/profile/ContactDetailsScreen';
import ViewPermissionsScreen from '../screens/profile/ViewPermissionsScreen';
import FSSAIScreen from '../screens/profile/FSSAIScreen';
import GSTINScreen from '../screens/profile/GSTINScreen';
import BankDetailsScreen from '../screens/profile/BankDetailsScreen';
import DisplayPictureScreen from '../screens/profile/DisplayPictureScreen';
import NameAddressLocationScreen from '../screens/profile/NameAddressLocationScreen';
import UpdateOutletNameScreen from '../screens/profile/UpdateOutletNameScreen';
import UpdateOutletAddressLocationScreen from '../screens/profile/UpdateOutletAddressLocationScreen';
import RatingsReviewsScreen from '../screens/profile/RatingsReviewsScreen';
import DeliveryAreaChangesScreen from '../screens/profile/DeliveryAreaChangesScreen';
import RestaurantOwnershipScreen from '../screens/profile/RestaurantOwnershipScreen';
import ContactAccountManagerScreen from '../screens/profile/ContactAccountManagerScreen';
import OutletInfoScreen from '../screens/profile/OutletInfoScreen';

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileNavigator: React.FC = () => {
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
        name="ProfileMain" 
        component={ProfileScreen}
        options={{ title: 'Restaurant' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Troubleshoot" 
        component={TroubleshootScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Support" 
        component={SupportScreen}
        options={{ title: 'Support' }}
      />
      <Stack.Screen 
        name="Timings" 
        component={TimingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ContactDetails" 
        component={ContactDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ViewPermissions" 
        component={ViewPermissionsScreen}
        options={{ title: 'View permissions' }}
      />
      <Stack.Screen 
        name="FSSAI" 
        component={FSSAIScreen}
        options={{ title: 'FSSAI Food License' }}
      />
      <Stack.Screen 
        name="GSTIN" 
        component={GSTINScreen}
        options={{ title: 'Update GSTIN' }}
      />
      <Stack.Screen 
        name="BankDetails" 
        component={BankDetailsScreen}
        options={{ title: 'Update bank details' }}
      />
      <Stack.Screen 
        name="DisplayPicture" 
        component={DisplayPictureScreen}
        options={{ title: 'Display picture' }}
      />
      <Stack.Screen 
        name="NameAddressLocation" 
        component={NameAddressLocationScreen}
        options={{ title: 'Name, address, location' }}
      />
      <Stack.Screen 
        name="UpdateOutletName" 
        component={UpdateOutletNameScreen}
        options={{ title: 'Update Outlet Name' }}
      />
              <Stack.Screen 
          name="UpdateOutletAddressLocation" 
          component={UpdateOutletAddressLocationScreen}
          options={{ title: 'Update Outlet Address & Location' }}
        />
        <Stack.Screen 
          name="RatingsReviews" 
          component={RatingsReviewsScreen}
          options={{ title: 'Ratings, reviews' }}
        />
        <Stack.Screen 
          name="DeliveryAreaChanges" 
          component={DeliveryAreaChangesScreen}
          options={{ title: 'Delivery area changes' }}
        />
        <Stack.Screen 
          name="RestaurantOwnership" 
          component={RestaurantOwnershipScreen}
          options={{ title: 'Restaurant ownership' }}
        />
        <Stack.Screen 
          name="ContactAccountManager" 
          component={ContactAccountManagerScreen}
          options={{ title: 'Contact account manager' }}
        />
        <Stack.Screen 
          name="OutletInfo" 
          component={OutletInfoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};

export default ProfileNavigator;