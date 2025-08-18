import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../theme';
import { SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../utils/responsive';

const OutletInfoScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    // Navigate back to ExploreMore screen when accessed from Hub
    navigation.navigate('Hub', { screen: 'ExploreMore' });
  };

  const handleEditPhoto = () => {
    // Handle edit photo functionality
    console.log('Edit photo pressed');
  };

  const handleAddPhoto = () => {
    // Handle add photo functionality
    console.log('Add photo pressed');
  };

  const handleViewOnMap = () => {
    // Handle view on map functionality
    console.log('View on map pressed');
  };

  const handleRecordInstructions = () => {
    // Handle record instructions functionality
    console.log('Record instructions pressed');
  };

  const handleEditPress = (field: string) => {
    // Handle edit functionality for different fields
    console.log(`Edit ${field} pressed`);
  };

  const handleCardPress = (cardType: string) => {
    // Handle card press functionality
    console.log(`${cardType} card pressed`);
    
    if (cardType === 'outlet timings') {
      navigation.navigate('Profile', { screen: 'Timings' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Outlet info</Text>
        <View style={styles.headerRight}>
          <Text style={styles.resId}>Res id: 21781923</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Icon name="share" size={20} color={theme.colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Food Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400&h=300&fit=crop&crop=center' }}
              style={styles.foodImage}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.editPhotoButton} onPress={handleEditPhoto}>
              <Icon name="camera-alt" size={16} color={theme.colors.text.inverse} />
              <Text style={styles.editPhotoText}>Edit photo</Text>
            </TouchableOpacity>
          </View>

          {/* Photo Actions */}
          <View style={styles.photoActions}>
            <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
              <Icon name="add-a-photo" size={24} color={theme.colors.text.secondary} />
              <Text style={styles.addPhotoText}>Add photo</Text>
            </TouchableOpacity>

            {/* Reviews Section */}
            <View style={styles.reviewsSection}>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>3.7</Text>
                <Icon name="star" size={16} color={theme.colors.warning.main} />
              </View>
              <TouchableOpacity style={styles.reviewsButton}>
                <Text style={styles.reviewsText}>71 DELIVERY REVIEWS</Text>
                <Icon name="chevron-right" size={16} color={theme.colors.text.secondary} />
              </TouchableOpacity>
              <View style={styles.diningReviewsContainer}>
                <Text style={styles.diningReviewsText}>NOT ENOUGH DINING REVIEWS</Text>
                <Icon name="star" size={16} color={theme.colors.text.hint} />
              </View>
            </View>
          </View>
        </View>

        {/* Restaurant Information Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Restaurant information</Text>

          {/* Restaurant Name Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Restaurant's name</Text>
              <Text style={styles.cardValue}>Brother's Kitchen</Text>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => handleEditPress('restaurant name')}
            >
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
          </View>

          {/* Cuisine Tags Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Cuisine tags</Text>
              <Text style={styles.cardValue}>South Indian, Biryani, Chinese</Text>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => handleEditPress('cuisine tags')}
            >
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
          </View>

          {/* Address Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Address</Text>
              <View style={styles.addressContainer}>
                <Icon name="location-on" size={16} color={theme.colors.success.main} />
                <Text style={styles.addressText}>
                  21326933, Ibrahimpatnam, Ibrahimpatnam, N T R, Andhra Pradesh...
                </Text>
              </View>
              <TouchableOpacity style={styles.viewOnMapButton} onPress={handleViewOnMap}>
                <Text style={styles.viewOnMapText}>View on map</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => handleEditPress('address')}
            >
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
          </View>

          {/* Pickup Instructions Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Pickup instructions</Text>
              <Text style={styles.cardDescription}>
                Helps our delivery partner reach your outlet faster
              </Text>
              <TouchableOpacity style={styles.recordButton} onPress={handleRecordInstructions}>
                <Icon name="mic" size={16} color={theme.colors.primary} />
                <Text style={styles.recordText}>Tap here to record instructions</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Additional Cards */}
          <TouchableOpacity 
            style={styles.infoCard}
            onPress={() => handleCardPress('outlet timings')}
          >
            <View style={styles.cardContent}>
              <Icon name="schedule" size={20} color={theme.colors.text.secondary} />
              <Text style={styles.cardLabel}>Outlet timings</Text>
            </View>
            <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.infoCard}
            onPress={() => handleCardPress('contact details')}
          >
            <View style={styles.cardContent}>
              <Icon name="phone" size={20} color={theme.colors.text.secondary} />
              <Text style={styles.cardLabel}>Contact details</Text>
            </View>
            <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.infoCard}
            onPress={() => handleCardPress('view on zomato')}
          >
            <View style={styles.cardContent}>
              <Icon name="store" size={20} color={theme.colors.text.secondary} />
              <Text style={styles.cardLabel}>View on Zomato</Text>
            </View>
            <Icon name="open-in-new" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: theme.colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    ...SHADOWS.light,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resId: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginRight: SPACING.sm,
  },
  shareButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  imageSection: {
    backgroundColor: theme.colors.background.paper,
    paddingBottom: SPACING.lg,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  editPhotoButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: theme.colors.background.paper,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  editPhotoText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.primary,
    marginLeft: SPACING.xs,
    fontWeight: '500',
  },
  photoActions: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  addPhotoButton: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  addPhotoText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginTop: SPACING.xs,
  },
  reviewsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.success.main,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  ratingText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.inverse,
    marginRight: SPACING.xs,
  },
  reviewsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: SPACING.md,
  },
  reviewsText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.primary,
    fontWeight: '500',
    marginRight: SPACING.xs,
  },
  diningReviewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.level1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  diningReviewsText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.hint,
    marginRight: SPACING.xs,
  },
  infoSection: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.lg,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.paper,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    ...SHADOWS.light,
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.xs,
  },
  cardValue: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  cardDescription: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.sm,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  addressText: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.primary,
    fontWeight: '500',
    flex: 1,
    marginLeft: SPACING.xs,
  },
  viewOnMapButton: {
    alignSelf: 'flex-start',
  },
  viewOnMapText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  recordText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.primary,
    fontWeight: '500',
    marginLeft: SPACING.xs,
  },
  editButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  editButtonText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.primary,
    fontWeight: '500',
    textTransform: 'lowercase',
  },
});

export default OutletInfoScreen;
