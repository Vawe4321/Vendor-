import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../../theme';

interface StatusBadgeProps {
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  size?: 'small' | 'medium';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'medium',
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          color: theme.colors.warningDark,
          backgroundColor: theme.colors.warningSurface,
          text: 'Pending',
          icon: 'schedule',
        };
      case 'accepted':
        return {
          color: theme.colors.primaryDark,
          backgroundColor: theme.colors.primarySurface,
          text: 'Accepted',
          icon: 'check-circle',
        };
      case 'preparing':
        return {
          color: theme.colors.secondaryDark,
          backgroundColor: theme.colors.secondarySurface,
          text: 'Preparing',
          icon: 'restaurant',
        };
      case 'ready':
        return {
          color: theme.colors.successDark,
          backgroundColor: theme.colors.successSurface,
          text: 'Ready',
          icon: 'done-all',
        };
      case 'delivered':
        return {
          color: theme.colors.successDark,
          backgroundColor: theme.colors.successSurface,
          text: 'Delivered',
          icon: 'local-shipping',
        };
      case 'cancelled':
        return {
          color: theme.colors.errorDark,
          backgroundColor: theme.colors.errorSurface,
          text: 'Cancelled',
          icon: 'cancel',
        };
      default:
        return {
          color: theme.colors.textSecondary,
          backgroundColor: theme.colors.surface,
          text: 'Unknown',
          icon: 'help',
        };
    }
  };

  const config = getStatusConfig();
  const badgeStyle = size === 'small' ? styles.smallBadge : styles.mediumBadge;
  const textStyle = size === 'small' ? styles.smallText : styles.mediumText;

  return (
    <View style={[
      styles.badge,
      badgeStyle,
      { backgroundColor: config.backgroundColor }
    ]}>
      <Icon
        name={config.icon}
        size={size === 'small' ? 12 : 14}
        color={config.color}
        style={styles.icon}
      />
      <Text style={[
        textStyle,
        { color: config.color }
      ]}>
        {config.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  smallBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  mediumBadge: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  smallText: {
    ...theme.typography.captionMedium,
    letterSpacing: 0.3,
  },
  mediumText: {
    ...theme.typography.bodySmallMedium,
    letterSpacing: 0.3,
  },
  icon: {
    marginRight: theme.spacing.xs,
  },
});

export default StatusBadge;