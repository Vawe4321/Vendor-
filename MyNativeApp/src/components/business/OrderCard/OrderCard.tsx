import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../common/Card';
import Button from '../../common/Button';
import StatusBadge from '../StatusBadge/StatusBadge';
import { Order } from '../../../types/orders';
import { theme } from '../../../theme';

interface OrderCardProps {
  order: Order;
  onAccept?: (orderId: string) => void;
  onReject?: (orderId: string) => void;
  onViewDetails?: (orderId: string) => void;
  showActions?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onAccept,
  onReject,
  onViewDetails,
  showActions = false,
}) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getItemsText = () => {
    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
    return `${itemCount} item${itemCount > 1 ? 's' : ''}`;
  };

  return (
    <Card style={styles.card} onPress={() => onViewDetails?.(order.id)} variant="elevated">
      <View style={styles.header}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
          <Text style={styles.orderTime}>{formatTime(order.createdAt)}</Text>
        </View>
        <StatusBadge status={order.status} size="small" />
      </View>

      <View style={styles.divider} />

      <View style={styles.customerSection}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{order.customer.name}</Text>
          <Text style={styles.customerPhone}>{order.customer.phone}</Text>
        </View>
        
        <View style={styles.orderDetails}>
          <Text style={styles.amount}>₹{order.totalAmount}</Text>
          <Text style={styles.itemsText}>{getItemsText()}</Text>
        </View>
      </View>

      <View style={styles.orderMeta}>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>
            {order.orderType === 'delivery' ? '🚚' : '🏪'}
          </Text>
          <Text style={styles.metaText}>
            {order.orderType === 'delivery' ? 'Delivery' : 'Pickup'}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>
            {order.paymentMethod === 'online' ? '💳' :
             order.paymentMethod === 'card' ? '💳' : '💵'}
          </Text>
          <Text style={styles.metaText}>
            {order.paymentMethod === 'online' ? 'Online' :
             order.paymentMethod === 'card' ? 'Card' : 'Cash'}
          </Text>
        </View>
      </View>

      {order.specialInstructions && (
        <View style={styles.instructions}>
          <Text style={styles.instructionsLabel}>Special Instructions</Text>
          <Text style={styles.instructionsText}>{order.specialInstructions}</Text>
        </View>
      )}

      {showActions && order.status === 'pending' && (
        <View style={styles.actions}>
          <Button
            title="Reject"
            variant="outline"
            size="small"
            onPress={() => onReject?.(order.id)}
            style={styles.rejectButton}
          />
          <Button
            title="Accept"
            variant="primary"
            size="small"
            onPress={() => onAccept?.(order.id)}
            style={styles.acceptButton}
          />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  orderTime: {
    ...theme.typography.captionMedium,
    color: theme.colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderLight,
    marginBottom: theme.spacing.lg,
  },
  customerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  customerPhone: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  orderDetails: {
    alignItems: 'flex-end',
  },
  amount: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  itemsText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  orderMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
  },
  metaIcon: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  metaText: {
    ...theme.typography.bodySmallMedium,
    color: theme.colors.textSecondary,
  },
  instructions: {
    backgroundColor: theme.colors.infoSurface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.info,
  },
  instructionsLabel: {
    ...theme.typography.bodySmallMedium,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  instructionsText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  rejectButton: {
    flex: 1,
  },
  acceptButton: {
    flex: 1,
  },
});

export default OrderCard;