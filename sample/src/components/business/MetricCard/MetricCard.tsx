import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../../common/Card';
import { theme } from '../../../theme';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: string;
  color?: string;
  onPress?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  color,
  onPress,
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return theme.colors.success;
      case 'down':
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <Card style={styles.card} onPress={onPress} variant="elevated">
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            {icon && (
              <View style={[styles.iconContainer, { backgroundColor: color || theme.colors.primarySurface }]}>
                <Icon
                  name={icon}
                  size={20}
                  color={color || theme.colors.primary}
                />
              </View>
            )}
            <Text style={styles.title}>{title}</Text>
          </View>
          
          {trend && trendValue && (
            <View style={[styles.trendContainer, { backgroundColor: getTrendColor() + '20' }]}>
              <Icon
                name={trend === 'up' ? 'trending-up' : trend === 'down' ? 'trending-down' : 'trending-flat'}
                size={16}
                color={getTrendColor()}
              />
              <Text style={[styles.trendText, { color: getTrendColor() }]}>
                {trendValue}
              </Text>
            </View>
          )}
        </View>
        
        <Text style={[styles.value, { color: color || theme.colors.primary }]}>{value}</Text>
        
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: theme.spacing.sm,
    minHeight: theme.layout.cardMinHeight + 40,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  title: {
    ...theme.typography.bodySmallMedium,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  value: {
    ...theme.typography.h1,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.captionMedium,
    color: theme.colors.textTertiary,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  trendText: {
    ...theme.typography.captionMedium,
    marginLeft: theme.spacing.xs,
  },
});

export default MetricCard;