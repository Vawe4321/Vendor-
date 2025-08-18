import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../theme';
import { SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../utils/responsive';

const NotificationSettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [allowNotifications, setAllowNotifications] = useState(true);
  const [notificationType, setNotificationType] = useState('default');
  const [lockScreen, setLockScreen] = useState(true);
  const [popUp, setPopUp] = useState(true);
  const [badges, setBadges] = useState(true);
  const [showNotificationDetails, setShowNotificationDetails] = useState(true);
  const [restaurantOnlineStatus, setRestaurantOnlineStatus] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [criticalCommunication, setCriticalCommunication] = useState(true);
  const [insightsOffers, setInsightsOffers] = useState(true);
  const [fileDownloads, setFileDownloads] = useState(true);
  const [fullScreenNotifications, setFullScreenNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Hub', { screen: 'Settings' })}
        >
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Grooso Restaurant Partner</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Allow Notifications Section */}
        <View style={styles.section}>
          <View style={styles.settingRow}>
            <Text style={styles.settingTitle}>Allow notifications</Text>
            <Switch
              value={allowNotifications}
              onValueChange={setAllowNotifications}
              trackColor={{ false: theme.colors.border.light, true: theme.colors.primary }}
              thumbColor={theme.colors.background.paper}
            />
          </View>

          {/* Notification Type Options */}
          <View style={styles.notificationTypeContainer}>
            <TouchableOpacity 
              style={[
                styles.notificationTypeOption,
                notificationType === 'default' && styles.selectedOption
              ]}
              onPress={() => setNotificationType('default')}
            >
              <Icon name="notifications" size={20} color={theme.colors.primary} />
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Default</Text>
                <Text style={styles.optionSubtitle}>May ring or vibrate based on device settings</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.notificationTypeOption,
                notificationType === 'silent' && styles.selectedOption
              ]}
              onPress={() => setNotificationType('silent')}
            >
              <Icon name="notifications-off" size={20} color={theme.colors.text.secondary} />
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Silent</Text>
                <Text style={styles.optionSubtitle}>Silent notifications</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Alerts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alerts</Text>
          <View style={styles.alertsContainer}>
            <View style={styles.alertItem}>
              <View style={styles.phoneOutline}>
                <Text style={styles.phoneTime}>09:40</Text>
                <View style={styles.notificationBar} />
              </View>
              <View style={styles.alertInfo}>
                <Text style={styles.alertTitle}>Lock screen</Text>
                <Icon name="check-circle" size={16} color={theme.colors.primary} />
              </View>
            </View>

            <View style={styles.alertItem}>
              <View style={styles.phoneOutline}>
                <View style={styles.popupNotification} />
              </View>
              <View style={styles.alertInfo}>
                <Text style={styles.alertTitle}>Pop-up</Text>
                <Icon name="check-circle" size={16} color={theme.colors.primary} />
              </View>
            </View>

            <View style={styles.alertItem}>
              <View style={styles.phoneOutline}>
                <View style={styles.badgeContainer}>
                  <View style={styles.badge} />
                  <View style={styles.appIcons}>
                    <View style={styles.appIcon} />
                    <View style={styles.appIcon} />
                    <View style={styles.appIcon} />
                  </View>
                </View>
              </View>
              <View style={styles.alertInfo}>
                <Text style={styles.alertTitle}>Badges</Text>
                <Icon name="check-circle" size={16} color={theme.colors.primary} />
              </View>
            </View>
          </View>
          <Text style={styles.alertNote}>
            If an app doesn't support count badges, the badge cannot be displayed.
          </Text>
        </View>

        {/* Show Notification Details Section */}
        <View style={styles.section}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Show notification details on lock screen</Text>
              <Text style={styles.settingSubtitle}>Always</Text>
            </View>
          </View>
        </View>

        {/* Hyperpure Group Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hyperpure Group</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="notifications" size={20} color={theme.colors.primary} />
              <Text style={styles.settingTitle}>Restaurant online status</Text>
            </View>
            <Switch
              value={restaurantOnlineStatus}
              onValueChange={setRestaurantOnlineStatus}
              trackColor={{ false: theme.colors.border.light, true: theme.colors.primary }}
              thumbColor={theme.colors.background.paper}
            />
          </View>
        </View>

        {/* Others Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Others</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="notifications" size={20} color={theme.colors.primary} />
              <Text style={styles.settingTitle}>Order alerts</Text>
            </View>
            <Switch
              value={orderAlerts}
              onValueChange={setOrderAlerts}
              trackColor={{ false: theme.colors.border.light, true: theme.colors.primary }}
              thumbColor={theme.colors.background.paper}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="notifications" size={20} color={theme.colors.primary} />
              <Text style={styles.settingTitle}>Critical communication alerts</Text>
            </View>
            <Switch
              value={criticalCommunication}
              onValueChange={setCriticalCommunication}
              trackColor={{ false: theme.colors.border.light, true: theme.colors.primary }}
              thumbColor={theme.colors.background.paper}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="notifications" size={20} color={theme.colors.primary} />
              <Text style={styles.settingTitle}>Insights, offers and general info alerts</Text>
            </View>
            <Switch
              value={insightsOffers}
              onValueChange={setInsightsOffers}
              trackColor={{ false: theme.colors.border.light, true: theme.colors.primary }}
              thumbColor={theme.colors.background.paper}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="notifications-off" size={20} color={theme.colors.text.secondary} />
              <Text style={styles.settingTitle}>File Downloads</Text>
            </View>
            <Switch
              value={fileDownloads}
              onValueChange={setFileDownloads}
              trackColor={{ false: theme.colors.border.light, true: theme.colors.primary }}
              thumbColor={theme.colors.background.paper}
            />
          </View>
        </View>

        {/* Allow Full Screen Notifications Section */}
        <View style={styles.section}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Allow full screen notifications</Text>
              <Text style={styles.settingSubtitle}>
                Allow notifications that take up the entire screen space to be displayed when the device is locked
              </Text>
            </View>
            <Switch
              value={fullScreenNotifications}
              onValueChange={setFullScreenNotifications}
              trackColor={{ false: theme.colors.border.light, true: theme.colors.primary }}
              thumbColor={theme.colors.background.paper}
            />
          </View>
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
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
  },
  settingInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: theme.colors.text.primary,
    marginLeft: SPACING.sm,
  },
  settingSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginLeft: SPACING.sm,
  },
  notificationTypeContainer: {
    marginTop: SPACING.md,
  },
  notificationTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  selectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background.level1,
  },
  optionContent: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  optionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: theme.colors.text.primary,
  },
  optionSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginTop: SPACING.xs,
  },
  alertsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  alertItem: {
    alignItems: 'center',
    flex: 1,
  },
  phoneOutline: {
    width: 60,
    height: 80,
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: theme.colors.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  phoneTime: {
    fontSize: FONT_SIZES.xs,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  notificationBar: {
    width: 40,
    height: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    marginTop: SPACING.xs,
  },
  popupNotification: {
    width: 50,
    height: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: BORDER_RADIUS.sm,
  },
  badgeContainer: {
    alignItems: 'center',
  },
  badge: {
    width: 8,
    height: 8,
    backgroundColor: theme.colors.error.main,
    borderRadius: 4,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  appIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },
  appIcon: {
    width: 8,
    height: 8,
    backgroundColor: theme.colors.border.light,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  alertInfo: {
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.primary,
    marginBottom: SPACING.xs,
  },
  alertNote: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default NotificationSettingsScreen;
