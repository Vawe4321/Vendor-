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

const ManageCommunicationsScreen: React.FC = () => {
  const navigation = useNavigation();
  
  // State for toggles
  const [whatsappNotifications, setWhatsappNotifications] = useState(true);
  const [dailyReportsWhatsapp, setDailyReportsWhatsapp] = useState(false);
  const [dailyReportsEmail, setDailyReportsEmail] = useState(false);
  const [weeklyReportsWhatsapp, setWeeklyReportsWhatsapp] = useState(true);
  const [weeklyReportsEmail, setWeeklyReportsEmail] = useState(false);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [ringVolume, setRingVolume] = useState(0.75);
  const [ringInSilentMode, setRingInSilentMode] = useState(false);
  const [liveComplaintNotifications, setLiveComplaintNotifications] = useState(false);
  const [riderNotifications, setRiderNotifications] = useState(true);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddEmail = () => {
    // Navigate to add email screen
    console.log('Add email functionality');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage communications</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* WhatsApp notifications */}
        <View style={styles.section}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="whatsapp" size={24} color="#25D366" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>WhatsApp notifications</Text>
                <Text style={styles.settingDescription}>
                  Receive updates and other reminders related to your restaurant on WhatsApp (+91 7287806290)
                </Text>
              </View>
            </View>
            <Switch
              value={whatsappNotifications}
              onValueChange={setWhatsappNotifications}
              trackColor={{ false: theme.colors.border.light, true: theme.colors.success.main }}
              thumbColor={whatsappNotifications ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Business Reports */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Reports</Text>
          
          {/* Daily Reports */}
          <View style={styles.reportSection}>
            <Text style={styles.reportTitle}>Daily Reports</Text>
            <Text style={styles.reportDescription}>Every morning for previous day</Text>
            
            <View style={styles.reportOptions}>
              <View style={styles.reportOption}>
                <View style={styles.reportOptionLeft}>
                  <Icon name="whatsapp" size={20} color="#25D366" />
                  <Text style={styles.reportOptionText}>Share on whatsapp</Text>
                </View>
                <Switch
                  value={dailyReportsWhatsapp}
                  onValueChange={setDailyReportsWhatsapp}
                  trackColor={{ false: theme.colors.border.light, true: theme.colors.success.main }}
                  thumbColor={dailyReportsWhatsapp ? '#fff' : '#f4f3f4'}
                />
              </View>
              
              <View style={styles.reportOption}>
                <View style={styles.reportOptionLeft}>
                  <Icon name="email" size={20} color={theme.colors.primary} />
                  <Text style={styles.reportOptionText}>Share on email</Text>
                </View>
                <Switch
                  value={dailyReportsEmail}
                  onValueChange={setDailyReportsEmail}
                  trackColor={{ false: theme.colors.border.light, true: theme.colors.success.main }}
                  thumbColor={dailyReportsEmail ? '#fff' : '#f4f3f4'}
                />
              </View>
              
              <TouchableOpacity style={styles.addEmailLink} onPress={handleAddEmail}>
                <Text style={styles.addEmailText}>Add email</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Weekly Reports */}
          <View style={styles.reportSection}>
            <Text style={styles.reportTitle}>Weekly Reports</Text>
            <Text style={styles.reportDescription}>Every Monday for previous week</Text>
            
            <View style={styles.reportOptions}>
              <View style={styles.reportOption}>
                <View style={styles.reportOptionLeft}>
                  <Icon name="whatsapp" size={20} color="#25D366" />
                  <Text style={styles.reportOptionText}>Share on whatsapp</Text>
                </View>
                <Switch
                  value={weeklyReportsWhatsapp}
                  onValueChange={setWeeklyReportsWhatsapp}
                  trackColor={{ false: theme.colors.border.light, true: theme.colors.success.main }}
                  thumbColor={weeklyReportsWhatsapp ? '#fff' : '#f4f3f4'}
                />
              </View>
              
              <View style={styles.reportOption}>
                <View style={styles.reportOptionLeft}>
                  <Icon name="email" size={20} color={theme.colors.primary} />
                  <Text style={styles.reportOptionText}>Share on email</Text>
                </View>
                <Switch
                  value={weeklyReportsEmail}
                  onValueChange={setWeeklyReportsEmail}
                  trackColor={{ false: theme.colors.border.light, true: theme.colors.success.main }}
                  thumbColor={weeklyReportsEmail ? '#fff' : '#f4f3f4'}
                />
              </View>
              
              <TouchableOpacity style={styles.addEmailLink} onPress={handleAddEmail}>
                <Text style={styles.addEmailText}>Add email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Order notifications */}
        <View style={styles.section}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="notifications" size={24} color={theme.colors.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Order notifications</Text>
                <Text style={styles.settingDescription}>
                  Receive order notifications on this device
                </Text>
              </View>
            </View>
            <Switch
              value={orderNotifications}
              onValueChange={setOrderNotifications}
              trackColor={{ false: theme.colors.border.light, true: theme.colors.success.main }}
              thumbColor={orderNotifications ? '#fff' : '#f4f3f4'}
            />
          </View>

          {/* Ring volume */}
          <View style={styles.volumeSection}>
            <View style={styles.volumeItem}>
              <Icon name="volume-up" size={20} color={theme.colors.text.secondary} />
              <Text style={styles.volumeText}>Ring volume</Text>
            </View>
            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrack}>
                <View style={[styles.sliderFill, { width: `${ringVolume * 100}%` }]} />
                <View style={[styles.sliderThumb, { left: `${ringVolume * 100}%` }]} />
              </View>
            </View>
          </View>

          {/* Ring in silent mode */}
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="phone" size={20} color={theme.colors.text.secondary} />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Ring in silent mode</Text>
                <Text style={styles.settingDescription}>
                  Ring for order notifications even when phone is on silent mode
                </Text>
              </View>
            </View>
            <Switch
              value={ringInSilentMode}
              onValueChange={setRingInSilentMode}
              trackColor={{ false: theme.colors.border.light, true: theme.colors.success.main }}
              thumbColor={ringInSilentMode ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Live complaint notifications */}
        <View style={styles.section}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="star" size={24} color={theme.colors.warning.main} />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Live complaint notifications</Text>
                <Text style={styles.settingDescription}>
                  Receive notification when a customer raises a complaint on an order
                </Text>
              </View>
            </View>
            <Switch
              value={liveComplaintNotifications}
              onValueChange={setLiveComplaintNotifications}
              trackColor={{ false: theme.colors.border.light, true: theme.colors.success.main }}
              thumbColor={liveComplaintNotifications ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Rider notifications */}
        <View style={styles.section}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="delivery-dining" size={24} color={theme.colors.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Rider notifications</Text>
                <Text style={styles.settingDescription}>
                  Receive notification when the rider arrives at your restaurant to pick an order
                </Text>
              </View>
            </View>
            <Switch
              value={riderNotifications}
              onValueChange={setRiderNotifications}
              trackColor={{ false: theme.colors.border.light, true: theme.colors.success.main }}
              thumbColor={riderNotifications ? '#fff' : '#f4f3f4'}
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: SPACING.md,
  },
  settingText: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  settingTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: theme.colors.text.primary,
    marginBottom: SPACING.xs,
  },
  settingDescription: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    lineHeight: 18,
  },
  reportSection: {
    marginBottom: SPACING.lg,
  },
  reportTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.xs,
  },
  reportDescription: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.md,
  },
  reportOptions: {
    marginLeft: SPACING.lg,
  },
  reportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  reportOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reportOptionText: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.primary,
    marginLeft: SPACING.sm,
  },
  addEmailLink: {
    marginTop: SPACING.xs,
  },
  addEmailText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  volumeSection: {
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  volumeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  volumeText: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.secondary,
    marginLeft: SPACING.sm,
  },
  sliderContainer: {
    marginLeft: SPACING.xl,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: theme.colors.border.light,
    borderRadius: 2,
    position: 'relative',
  },
  sliderFill: {
    height: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  sliderThumb: {
    width: 16,
    height: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    position: 'absolute',
    top: -6,
    marginLeft: -8,
  },
});

export default ManageCommunicationsScreen;
