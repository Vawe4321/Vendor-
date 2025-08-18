import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { SPACING, BORDER_RADIUS, FONT_SIZES, SHADOWS, BUTTON_HEIGHTS } from '../../utils/responsive';
import Card from '../../components/common/Card';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ProfileScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'ProfileMain'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleTimingsPress = () => {
    navigation.navigate('Timings');
  };

  const handleContactsPress = () => {
    navigation.navigate('ContactDetails');
  };

  const handleFSSAIPress = () => {
    navigation.navigate('FSSAI');
  };

  const handleGSTINPress = () => {
    navigation.navigate('GSTIN');
  };

  const handleBankDetailsPress = () => {
    navigation.navigate('BankDetails');
  };

  const handleDisplayPicturePress = () => {
    navigation.navigate('DisplayPicture');
  };

  const handleNameAddressLocationPress = () => {
    navigation.navigate('NameAddressLocation');
  };

  const handleRatingsReviewsPress = () => {
    navigation.navigate('RatingsReviews');
  };

  const handleDeliveryAreaChangesPress = () => {
    navigation.navigate('DeliveryAreaChanges');
  };

  const handleRestaurantOwnershipPress = () => {
    navigation.navigate('RestaurantOwnership');
  };

  const handleBackPress = () => {
    console.log('ProfileScreen: Back button pressed');
    navigation.navigate('Hub', { screen: 'HelpCentre' });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restaurant</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Restaurant Options Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info Card with Logo */}
        <Card variant="elevated" padding="xl" margin="xxl">
          <View style={styles.profileCard}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={require('../../assets/images/Groosologo.jpeg')}
                style={styles.profileLogo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Grooso's Kitchen</Text>
              <Text style={styles.profileEmail}>grooso@kitchen.com</Text>
              <Text style={styles.profileLocation}>Hyderabad, India</Text>
            </View>
          </View>
        </Card>

        {/* Section Title */}
        <Text style={styles.sectionTitle}>Select an option</Text>

        {/* Restaurant Options */}
        <Card variant="standard" padding="none" margin="none">
          <View style={styles.optionsSection}>
            <TouchableOpacity style={styles.optionItem} onPress={handleTimingsPress}>
              <Text style={styles.optionText}>Timings</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem} onPress={handleContactsPress}>
              <Text style={styles.optionText}>Contacts</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem} onPress={handleFSSAIPress}>
              <Text style={styles.optionText}>FSSAI Food License</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem} onPress={handleGSTINPress}>
              <Text style={styles.optionText}>Update GSTIN</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem} onPress={handleBankDetailsPress}>
              <Text style={styles.optionText}>Bank account details</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem} onPress={handleDisplayPicturePress}>
              <Text style={styles.optionText}>Display picture</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem} onPress={handleNameAddressLocationPress}>
              <Text style={styles.optionText}>Name, address, location</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem} onPress={handleRatingsReviewsPress}>
              <Text style={styles.optionText}>Ratings, reviews</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem} onPress={handleDeliveryAreaChangesPress}>
              <Text style={styles.optionText}>Delivery area changes</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem} onPress={handleRestaurantOwnershipPress}>
              <Text style={styles.optionText}>Restaurant ownership</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.level1,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.paper,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    ...SHADOWS.medium,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerRight: {
    width: 40,
  },
  
  headerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: theme.colors.background.level1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  
  profileLogo: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.md,
  },
  
  profileInfo: {
    flex: 1,
  },
  
  profileName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: SPACING.xs,
  },
  
  profileEmail: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.xs,
  },
  
  profileLocation: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.secondary,
  },
  
  sectionTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: SPACING.lg,
  },
  
  optionsSection: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.level1,
    minHeight: BUTTON_HEIGHTS.medium,
  },
  
  optionText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '500',
    color: theme.colors.text.primary,
  },
  
  optionArrow: {
    fontSize: FONT_SIZES.lg,
    color: theme.colors.text.hint,
    fontWeight: '600',
  },
});

export default ProfileScreen;