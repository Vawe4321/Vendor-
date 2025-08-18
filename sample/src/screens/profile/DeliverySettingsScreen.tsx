import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../theme';
import { SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../utils/responsive';

const DeliverySettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [deliveryStatus, setDeliveryStatus] = useState(true);

  const handleBackPress = () => {
    navigation.navigate('Hub', { screen: 'ExploreMore' });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery settings</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        {/* Delivery Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusContent}>
            <Icon name="restaurant" size={24} color={theme.colors.text.secondary} />
            <View style={styles.statusText}>
              <Text style={styles.statusTitle}>Delivery Status</Text>
              <Text style={styles.statusDescription}>
                Outlet is live to take orders right now
              </Text>
            </View>
          </View>
          <Switch
            value={deliveryStatus}
            onValueChange={setDeliveryStatus}
            trackColor={{ false: theme.colors.border.light, true: theme.colors.success.main }}
            thumbColor={deliveryStatus ? '#fff' : '#f4f3f4'}
          />
        </View>
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
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    ...SHADOWS.light,
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusText: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  statusTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.xs,
  },
  statusDescription: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.success.main,
    fontWeight: '500',
  },
});

export default DeliverySettingsScreen;
