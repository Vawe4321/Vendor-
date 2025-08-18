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

const ContactDetailsScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleViewPermissions = () => {
    navigation.navigate('Profile', { screen: 'ViewPermissions' });
  };

  const handleInviteUser = () => {
    // Handle invite user functionality
    console.log('Invite user pressed');
  };

  const handleInviteManager = () => {
    // Handle invite manager functionality
    console.log('Invite manager pressed');
  };

  const handleInviteStaff = () => {
    // Handle invite staff functionality
    console.log('Invite staff pressed');
  };

  const handleVerifyEmail = () => {
    // Handle verify email functionality
    console.log('Verify email pressed');
  };

  const handleEditOwner = () => {
    // Handle edit owner functionality
    console.log('Edit owner pressed');
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
        <Text style={styles.headerTitle}>Contact details</Text>
        <TouchableOpacity style={styles.viewPermissionsButton} onPress={handleViewPermissions}>
          <Text style={styles.viewPermissionsText}>View permissions</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Owner Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Owner</Text>
          <View style={styles.ownerCard}>
            <View style={styles.ownerInfo}>
              <View style={styles.avatar}>
                <Icon name="person" size={24} color={theme.colors.text.secondary} />
              </View>
              <View style={styles.ownerDetails}>
                <Text style={styles.ownerName}>Naveen Nve</Text>
                <Text style={styles.ownerPhone}>+91-7287806290</Text>
                <View style={styles.emailContainer}>
                  <Text style={styles.ownerEmail}>naveennve143@gmail.com</Text>
                  <TouchableOpacity style={styles.verifyEmailButton} onPress={handleVerifyEmail}>
                    <Text style={styles.verifyEmailText}>Verify email</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditOwner}>
              <Icon name="edit" size={20} color={theme.colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Manager Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manager</Text>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No one added as manager yet.</Text>
            <TouchableOpacity style={styles.inviteButton} onPress={handleInviteManager}>
              <Text style={styles.inviteText}>Invite someone now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Staff Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Staff</Text>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No one added as staff yet.</Text>
            <TouchableOpacity style={styles.inviteButton} onPress={handleInviteStaff}>
              <Text style={styles.inviteText}>Invite someone now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleInviteUser}>
        <Text style={styles.fabText}>Invite user</Text>
      </TouchableOpacity>
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
  viewPermissionsButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  viewPermissionsText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.md,
  },
  ownerCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...SHADOWS.light,
  },
  ownerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.background.level1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  ownerDetails: {
    flex: 1,
  },
  ownerName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: theme.colors.text.primary,
    marginBottom: SPACING.xs,
  },
  ownerPhone: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.xs,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerEmail: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.error.main,
    marginRight: SPACING.sm,
  },
  verifyEmailButton: {
    alignSelf: 'flex-start',
  },
  verifyEmailText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  editButton: {
    padding: SPACING.sm,
  },
  emptyCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    ...SHADOWS.light,
  },
  emptyText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.sm,
  },
  inviteButton: {
    alignSelf: 'flex-start',
  },
  inviteText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.lg,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.medium,
  },
  fabText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.inverse,
    fontWeight: '500',
  },
});

export default ContactDetailsScreen; 