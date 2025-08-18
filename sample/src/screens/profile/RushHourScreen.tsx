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

const RushHourScreen: React.FC = () => {
  const navigation = useNavigation();
  const [rushHourEnabled, setRushHourEnabled] = useState(false);

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
        <Text style={styles.headerTitle}>Rush hour</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        {/* Main Content */}
        <View style={styles.mainContent}>
          <Icon name="schedule" size={48} color={theme.colors.text.secondary} />
          <Text style={styles.title}>Rush Hour</Text>
          <Text style={styles.description}>
            Automatically adjust your menu prices during peak hours to maximize profits
          </Text>
        </View>

        {/* Toggle Section */}
        <View style={styles.toggleSection}>
          <View style={styles.toggleContent}>
            <Text style={styles.toggleTitle}>Enable Rush Hour</Text>
            <Text style={styles.toggleDescription}>
              Turn on dynamic pricing during busy periods
            </Text>
          </View>
          <Switch
            value={rushHourEnabled}
            onValueChange={setRushHourEnabled}
            trackColor={{ false: theme.colors.border.light, true: theme.colors.success.main }}
            thumbColor={rushHourEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Icon name="info" size={20} color={theme.colors.text.secondary} />
          <Text style={styles.infoText}>
            Rush hour pricing helps you earn more during peak demand periods
          </Text>
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
    paddingTop: SPACING.xl,
  },
  mainContent: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: SPACING.md,
  },
  toggleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.light,
  },
  toggleContent: {
    flex: 1,
    marginRight: SPACING.md,
  },
  toggleTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.xs,
  },
  toggleDescription: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.info.light,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  infoText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginLeft: SPACING.sm,
    flex: 1,
    lineHeight: 20,
  },
});

export default RushHourScreen;
