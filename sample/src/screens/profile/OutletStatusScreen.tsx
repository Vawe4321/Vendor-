import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../theme';
import { SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../utils/responsive';

const OutletStatusScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleUpdateTimings = () => {
    // Navigate to timings screen
    navigation.navigate('Hub', { screen: 'Timings' });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Outlet status</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBackground}>
            {/* Building outlines */}
            <View style={styles.buildingOutlines}>
              <View style={styles.building1} />
              <View style={styles.building2} />
              <View style={styles.building3} />
            </View>
            
            {/* Character */}
            <View style={styles.character}>
              <View style={styles.characterHead} />
              <View style={styles.characterBody} />
              <View style={styles.characterArms} />
            </View>
            
            {/* Store */}
            <View style={styles.store}>
              <View style={styles.storeFront}>
                <View style={styles.storeWindow} />
                <View style={styles.storeAwning} />
                <View style={styles.closedSign}>
                  <Text style={styles.closedText}>CLOSED</Text>
                </View>
              </View>
            </View>
            
            {/* Restaurant icon */}
            <View style={styles.restaurantIcon}>
              <Icon name="restaurant" size={16} color={theme.colors.text.inverse} />
            </View>
          </View>
        </View>

        {/* Status Message */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusMessage}>
            Your outlet is outside the delivery timings
          </Text>
          
          <Text style={styles.statusDescription}>
            Your outlet timings are (12:00 PM - 10:00 PM). Kindly wait until the next timeslot to go online or update your timings to receive orders right now
          </Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateTimings}>
          <Text style={styles.updateButtonText}>Update timings</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  illustrationBackground: {
    width: 300,
    height: 200,
    backgroundColor: '#E3F2FD',
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...SHADOWS.medium,
  },
  buildingOutlines: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  building1: {
    width: 40,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
  },
  building2: {
    width: 50,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
  },
  building3: {
    width: 35,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
  },
  character: {
    position: 'absolute',
    left: 60,
    bottom: 40,
  },
  characterHead: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#424242',
    marginBottom: 5,
  },
  characterBody: {
    width: 30,
    height: 40,
    backgroundColor: '#9E9E9E',
    borderRadius: 15,
  },
  characterArms: {
    position: 'absolute',
    top: 25,
    left: -5,
    right: -5,
    height: 20,
    backgroundColor: '#9E9E9E',
    borderRadius: 10,
  },
  store: {
    position: 'absolute',
    right: 60,
    bottom: 40,
  },
  storeFront: {
    width: 80,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    position: 'relative',
  },
  storeWindow: {
    width: 60,
    height: 30,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  storeAwning: {
    width: 90,
    height: 15,
    backgroundColor: '#2196F3',
    position: 'absolute',
    top: -15,
    left: -5,
    borderRadius: 8,
  },
  closedSign: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#F44336',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  closedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  restaurantIcon: {
    position: 'absolute',
    top: 50,
    left: 140,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  statusMessage: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: '#F44336',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  statusDescription: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.primary,
    textAlign: 'center',
    lineHeight: 24,
  },
  updateButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  updateButtonText: {
    color: theme.colors.text.inverse,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

export default OutletStatusScreen;
