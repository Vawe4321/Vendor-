import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../theme';
import { SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../utils/responsive';

const ImportantContactsScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleAddOrderReminderNumber = () => {
    // Handle add order reminder number functionality
    console.log('Add order reminder number pressed');
  };

  const handleEditOrderReminderNumber = () => {
    // Handle edit order reminder number functionality
    console.log('Edit order reminder number pressed');
  };

  const handleEditRestaurantPageNumber = () => {
    // Handle edit restaurant page number functionality
    console.log('Edit restaurant page number pressed');
  };

  const handleManageContactDetails = () => {
    // Handle manage contact details functionality
    console.log('Manage contact details pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Hub', { screen: 'ExploreMore' })}
        >
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Important contacts</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Reminder Numbers Section */}
        <View style={styles.section}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="group" size={20} color={theme.colors.text.secondary} />
              <Text style={styles.cardTitle}>Order reminder numbers</Text>
            </View>
            <Text style={styles.cardDescription}>
              Should always be available for Grooso to reach out for live order support and order reminders
            </Text>
            <TouchableOpacity style={styles.actionLink} onPress={handleAddOrderReminderNumber}>
              <Text style={styles.actionLinkText}>Add order reminder number</Text>
            </TouchableOpacity>
            <View style={styles.existingNumber}>
              <View style={styles.numberInfo}>
                <Text style={styles.numberLabel}>Order reminder number #1</Text>
                <Text style={styles.phoneNumber}>+91-7287806290</Text>
              </View>
              <TouchableOpacity style={styles.editButton} onPress={handleEditOrderReminderNumber}>
                <Icon name="edit" size={16} color={theme.colors.text.secondary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Restaurant Page Number Section */}
        <View style={styles.section}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="location-on" size={20} color={theme.colors.text.secondary} />
              <Text style={styles.cardTitle}>Restaurant page number</Text>
            </View>
            <Text style={styles.cardDescription}>
              Number for Grooso customers to call your restaurant
            </Text>
            <View style={styles.restaurantNumber}>
              <Text style={styles.phoneNumber}>+91-7287806290</Text>
              <TouchableOpacity style={styles.editButton} onPress={handleEditRestaurantPageNumber}>
                <Icon name="edit" size={16} color={theme.colors.text.secondary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Manage Contact Details Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.manageCard} onPress={handleManageContactDetails}>
            <Text style={styles.manageText}>Manage contact details for your staff</Text>
            <View style={styles.arrowContainer}>
              <Icon name="chevron-right" size={20} color={theme.colors.primary} />
            </View>
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
    width: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    ...SHADOWS.light,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginLeft: SPACING.sm,
  },
  cardDescription: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.md,
    lineHeight: 18,
  },
  actionLink: {
    alignSelf: 'flex-start',
    marginBottom: SPACING.md,
  },
  actionLinkText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  existingNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  numberInfo: {
    flex: 1,
  },
  numberLabel: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.primary,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  phoneNumber: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  restaurantNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editButton: {
    padding: SPACING.sm,
  },
  manageCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOWS.light,
  },
  manageText: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background.level1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImportantContactsScreen;
