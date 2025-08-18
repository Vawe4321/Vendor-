import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { theme } from '../../theme';
import { SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../utils/responsive';
import { logout } from '../../store/slices/authSlice';

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [automaticKOTPrinting, setAutomaticKOTPrinting] = useState(false);

  const handleCheckSystemNotificationSettings = () => {
    // Navigation will be handled by parent component
    console.log('Navigate to NotificationSettings');
  };

  const handleTroubleshootingGuide = () => {
    // Navigation will be handled by parent component
    console.log('Navigate to Troubleshoot');
  };

  const handleHelpCentre = () => {
    // Navigation will be handled by parent component
    console.log('Navigate to HelpCentre');
  };

  const handleShareFeedback = () => {
    // Navigation will be handled by parent component
    console.log('Navigate to ShareFeedback');
  };

  const handlePayouts = () => {
    // Navigation will be handled by parent component
    console.log('Navigate to Payouts');
  };

  const handleInvoices = () => {
    // Navigation will be handled by parent component
    console.log('Navigate to Invoices');
  };

  const handleTaxes = () => {
    // Navigation will be handled by parent component
    console.log('Navigate to Taxes');
  };

  const handleBackPress = () => {
    // Navigation will be handled by parent component
    console.log('Navigate back to ExploreMore');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout? You will be redirected to the login page.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            console.log('Logging out user');
            dispatch(logout());
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* KOT Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>KOT settings</Text>
          
          {/* Automatic KOT Printing */}
          <View style={styles.settingCard}>
            <View style={styles.settingHeader}>
              <Text style={styles.settingIcon}>🖨️</Text>
              <Text style={styles.settingTitle}>Automatic KOT printing</Text>
            </View>
            <Text style={styles.settingDescription}>
              Choose whether you want KOTs to be printed automatically when you accept new orders
            </Text>
            <View style={styles.settingToggle}>
              <Switch
                value={automaticKOTPrinting}
                onValueChange={setAutomaticKOTPrinting}
                trackColor={{ false: theme.colors.border.light, true: theme.colors.primary }}
                thumbColor={theme.colors.background.paper}
              />
            </View>
          </View>
        </View>

        {/* Navigation Links */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.navigationLink}
            onPress={handleCheckSystemNotificationSettings}
          >
            <Text style={styles.navigationLinkText}>Check system notification settings</Text>
            <Text style={styles.chevronIcon}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navigationLink}
            onPress={handleTroubleshootingGuide}
          >
            <Text style={styles.navigationLinkText}>Still having problems? Open troubleshooting guide</Text>
            <Text style={styles.chevronIcon}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navigationLink}
            onPress={handleHelpCentre}
          >
            <Text style={styles.navigationLinkText}>Help Centre</Text>
            <Text style={styles.chevronIcon}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navigationLink}
            onPress={handleShareFeedback}
          >
            <Text style={styles.navigationLinkText}>Share your feedback</Text>
            <Text style={styles.chevronIcon}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Accounting Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accounting</Text>
          
          <TouchableOpacity 
            style={styles.navigationLink}
            onPress={handlePayouts}
          >
            <Text style={styles.navigationLinkText}>Payouts</Text>
            <Text style={styles.chevronIcon}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navigationLink}
            onPress={handleInvoices}
          >
            <Text style={styles.navigationLinkText}>Invoices</Text>
            <Text style={styles.chevronIcon}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navigationLink}
            onPress={handleTaxes}
          >
            <Text style={styles.navigationLinkText}>Taxes</Text>
            <Text style={styles.chevronIcon}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>Logout</Text>
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
  backIcon: {
    fontSize: 24,
    color: theme.colors.text.primary,
    fontWeight: '600',
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
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.lg,
  },
  settingCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    ...SHADOWS.light,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  settingTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  settingDescription: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.md,
    lineHeight: 18,
  },
  settingToggle: {
    alignSelf: 'flex-end',
  },
  navigationLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    marginBottom: SPACING.sm,
  },
  navigationLinkText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.primary,
    fontWeight: '500',
    flex: 1,
  },
  chevronIcon: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    ...SHADOWS.light,
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  logoutText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.error.main,
  },
});

export default SettingsScreen;