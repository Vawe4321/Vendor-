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

const TroubleshootScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
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
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
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
            <Icon name="error" size={20} color={theme.colors.error} />
            <Text style={styles.checkText}>Battery permission not given</Text>
          </View>

          <View style={styles.checkItem}>
            <Icon name="check-circle" size={20} color={theme.colors.success} />
            <Text style={styles.checkText}>Notifications enabled</Text>
          </View>

          <View style={styles.checkItem}>
            <Icon name="check-circle" size={20} color={theme.colors.success} />
            <Text style={styles.checkText}>Google play services are installed</Text>
          </View>

          <View style={styles.checkItem}>
            <Icon name="check-circle" size={20} color={theme.colors.success} />
            <Text style={styles.checkText}>Order notifications enabled</Text>
          </View>

          <TouchableOpacity style={styles.checkItem} onPress={handleRingInSilentMode}>
            <Icon name="error" size={20} color={theme.colors.error} />
            <Text style={styles.checkText}>Ring in silent mode is disabled</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.primary} />
          </TouchableOpacity>

          <View style={styles.checkItem}>
            <Icon name="check-circle" size={20} color={theme.colors.success} />
            <Text style={styles.checkText}>Order notifications should be audible</Text>
          </View>

          <TouchableOpacity style={styles.checkItem} onPress={handleSendTestNotification}>
            <Text style={styles.checkText}>Send a test notification to ensure you receive order alerts</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* System Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System</Text>
          
          <View style={styles.checkItem}>
            <Icon name="check-circle" size={20} color={theme.colors.success} />
            <Text style={styles.checkText}>Background data is not restricted</Text>
          </View>

          <View style={styles.checkItem}>
            <Icon name="check-circle" size={20} color={theme.colors.success} />
            <Text style={styles.checkText}>Background restrictions are disabled</Text>
          </View>

          <View style={styles.checkItem}>
            <Icon name="check-circle" size={20} color={theme.colors.success} />
            <Text style={styles.checkText}>Overlay permission granted</Text>
          </View>

          <TouchableOpacity style={styles.checkItem} onPress={handleRestartApp}>
            <Text style={styles.checkText}>Something isn't working? try restarting the app</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* IVR calls Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IVR calls</Text>
          
          <TouchableOpacity style={styles.checkItem} onPress={handleVerifyPhoneNumbers}>
            <Text style={styles.checkText}>Verify order reminder phone numbers</Text>
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
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.xs,
    ...SHADOWS.light,
  },
  checkText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.primary,
    flex: 1,
    marginLeft: SPACING.sm,
  },
});

export default TroubleshootScreen;
