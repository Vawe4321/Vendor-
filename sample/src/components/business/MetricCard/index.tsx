import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../../theme';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: string;
  color?: string;
  style?: ViewStyle;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  color = theme.colors.primary,
  style,
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      case 'neutral':
        return 'trending-flat';
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return theme.colors.success;
      case 'down':
        return theme.colors.error;
      case 'neutral':
        return theme.colors.textSecondary;
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
            <Icon name={icon} size={24} color={color} />
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.value, { color }]}>{value}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>

      {(trend || trendValue) && (
        <View style={styles.trendContainer}>
          {trend && getTrendIcon() && (
            <Icon
              name={getTrendIcon()!}
              size={16}
              color={getTrendColor()}
              style={styles.trendIcon}
            />
          )}
          {trendValue && (
            <Text style={[styles.trendValue, { color: getTrendColor() }]}>
              {trendValue}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    width: '48%',
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  title: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  content: {
    marginBottom: theme.spacing.sm,
  },
  value: {
    ...theme.typography.h2,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textTertiary,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    marginRight: theme.spacing.xs,
  },
  trendValue: {
    ...theme.typography.captionMedium,
  },
});

export default MetricCard;