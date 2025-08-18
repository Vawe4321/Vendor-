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

const TroubleshootingGuideScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate('Hub', { screen: 'Settings' });
  };

  const handleRingInSilentMode = () => {
    // Navigate to silent mode settings
    console.log('Navigate to silent mode settings');
  };

  const handleSendTestNotification = () => {
    // Send test notification
    console.log('Send test notification');
  };

  const handleRestartApp = () => {
    // Restart app functionality
    console.log('Restart app');
  };

  const handleVerifyPhoneNumbers = () => {
    // Navigate to phone number verification
    console.log('Verify phone numbers');
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Troubleshoot</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.checkItem}>
            <View style={styles.checkContent}>
              <Text style={styles.checkText}>Battery permission not given</Text>
            </View>
            <Icon name="error" size={20} color={theme.colors.error.main} />
          </View>

          <View style={styles.checkItem}>
            <View style={styles.checkContent}>
              <Text style={styles.checkText}>Notifications enabled</Text>
            </View>
            <Icon name="check-circle" size={20} color={theme.colors.success.main} />
          </View>

          <View style={styles.checkItem}>
            <View style={styles.checkContent}>
              <Text style={styles.checkText}>Google play services are installed</Text>
            </View>
            <Icon name="check-circle" size={20} color={theme.colors.success.main} />
          </View>

          <View style={styles.checkItem}>
            <View style={styles.checkContent}>
              <Text style={styles.checkText}>Order notifications enabled</Text>
            </View>
            <Icon name="check-circle" size={20} color={theme.colors.success.main} />
          </View>

          <TouchableOpacity style={styles.checkItem} onPress={handleRingInSilentMode}>
            <View style={styles.checkContent}>
              <Text style={styles.checkText}>Ring in silent mode is disabled</Text>
            </View>
            <View style={styles.checkAction}>
              <Icon name="error" size={20} color={theme.colors.error.main} />
              <Icon name="chevron-right" size={20} color={theme.colors.primary} />
            </View>
          </TouchableOpacity>

          <View style={styles.checkItem}>
            <View style={styles.checkContent}>
              <Text style={styles.checkText}>Order notifications should be audible</Text>
            </View>
            <Icon name="check-circle" size={20} color={theme.colors.success.main} />
          </View>

          <TouchableOpacity style={styles.checkItem} onPress={handleSendTestNotification}>
            <View style={styles.checkContent}>
              <Text style={styles.checkText}>Send a test notification to ensure you receive order alerts</Text>
            </View>
            <Icon name="chevron-right" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* System Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System</Text>

          <View style={styles.checkItem}>
            <View style={styles.checkContent}>
              <Text style={styles.checkText}>Background data is not restricted</Text>
            </View>
            <Icon name="check-circle" size={20} color={theme.colors.success.main} />
          </View>

          <View style={styles.checkItem}>
            <View style={styles.checkContent}>
              <Text style={styles.checkText}>Background restrictions are disabled</Text>
            </View>
            <Icon name="check-circle" size={20} color={theme.colors.success.main} />
          </View>

          <View style={styles.checkItem}>
            <View style={styles.checkContent}>
              <Text style={styles.checkText}>Overlay permission granted</Text>
            </View>
            <Icon name="check-circle" size={20} color={theme.colors.success.main} />
          </View>

          <TouchableOpacity style={styles.checkItem} onPress={handleRestartApp}>
            <View style={styles.checkContent}>
              <Text style={styles.checkText}>Something isn't working? try restarting the app</Text>
            </View>
            <Icon name="chevron-right" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* IVR calls Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IVR calls</Text>

          <TouchableOpacity style={styles.checkItem} onPress={handleVerifyPhoneNumbers}>
            <View style={styles.checkContent}>
              <Text style={styles.checkText}>Verify order reminder phone numbers</Text>
            </View>
            <Icon name="chevron-right" size={20} color={theme.colors.primary} />
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
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.md,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  checkContent: {
    flex: 1,
  },
  checkText: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.primary,
    lineHeight: 20,
  },
  checkAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },

});

export default TroubleshootingGuideScreen;
