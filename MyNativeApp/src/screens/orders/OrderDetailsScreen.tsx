import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { OrdersStackParamList } from '../../navigation/types';
import { RootState } from '../../store';
import { theme } from '../../theme';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/business/StatusBadge';

type OrderDetailsScreenNavigationProp = StackNavigationProp<OrdersStackParamList, 'OrderDetails'>;
type OrderDetailsScreenRouteProp = RouteProp<OrdersStackParamList, 'OrderDetails'>;

interface Props {
  navigation: OrderDetailsScreenNavigationProp;
  route: OrderDetailsScreenRouteProp;
}

const OrderDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { orderId } = route.params;
  const { newOrders, activeOrders, orderHistory } = useSelector((state: RootState) => state.orders);
  
  // Find the order from all order lists
  const order = [...newOrders, ...activeOrders, ...orderHistory].find(o => o.id === orderId);

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Order not found</Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
        </View>
      </SafeAreaView>
    );
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Card style={styles.headerCard}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
              <Text style={styles.orderTime}>{formatTime(order.createdAt)}</Text>
            </View>
            <StatusBadge status={order.status} />
          </View>
        </Card>

        {/* Customer Information */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{order.customer.name}</Text>
            <Text style={styles.customerPhone}>{order.customer.phone}</Text>
            <Text style={styles.customerAddress}>{order.customer.address}</Text>
          </View>
        </Card>

        {/* Order Items */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                {item.customizations && item.customizations.length > 0 && (
                  <Text style={styles.itemCustomizations}>
                    {item.customizations.join(', ')}
                  </Text>
                )}
                {item.specialInstructions && (
                  <Text style={styles.itemInstructions}>
                    Note: {item.specialInstructions}
                  </Text>
                )}
              </View>
              <View style={styles.itemPricing}>
                <Text style={styles.itemQuantity}>×{item.quantity}</Text>
                <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
              </View>
            </View>
          ))}
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ₹{order.totalAmount}</Text>
          </View>
        </Card>

        {/* Order Details */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Type:</Text>
            <Text style={styles.detailValue}>
              {order.orderType === 'delivery' ? '🚚 Delivery' : '🏪 Pickup'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Method:</Text>
            <Text style={styles.detailValue}>
              {order.paymentMethod === 'online' ? '💳 Online' : 
               order.paymentMethod === 'card' ? '💳 Card' : '💵 Cash'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Status:</Text>
            <Text style={[
              styles.detailValue,
              { color: order.paymentStatus === 'paid' ? theme.colors.success : theme.colors.warning }
            ]}>
              {order.paymentStatus.toUpperCase()}
            </Text>
          </View>
          {order.estimatedTime && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Estimated Time:</Text>
              <Text style={styles.detailValue}>{order.estimatedTime} minutes</Text>
            </View>
          )}
        </Card>

        {/* Special Instructions */}
        {order.specialInstructions && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Special Instructions</Text>
            <Text style={styles.instructionsText}>{order.specialInstructions}</Text>
          </Card>
        )}

        {/* Timeline */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Order Timeline</Text>
          <View style={styles.timelineItem}>
            <Text style={styles.timelineLabel}>Order Placed:</Text>
            <Text style={styles.timelineTime}>{formatTime(order.createdAt)}</Text>
          </View>
          {order.acceptedAt && (
            <View style={styles.timelineItem}>
              <Text style={styles.timelineLabel}>Order Accepted:</Text>
              <Text style={styles.timelineTime}>{formatTime(order.acceptedAt)}</Text>
            </View>
          )}
          {order.readyAt && (
            <View style={styles.timelineItem}>
              <Text style={styles.timelineLabel}>Order Ready:</Text>
              <Text style={styles.timelineTime}>{formatTime(order.readyAt)}</Text>
            </View>
          )}
          {order.deliveredAt && (
            <View style={styles.timelineItem}>
              <Text style={styles.timelineLabel}>Order Delivered:</Text>
              <Text style={styles.timelineTime}>{formatTime(order.deliveredAt)}</Text>
            </View>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
    padding: theme.spacing.md,
  },
  headerCard: {
    marginBottom: theme.spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    ...theme.typography.h2,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  orderTime: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  customerInfo: {
    gap: theme.spacing.xs,
  },
  customerName: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  customerPhone: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  customerAddress: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  itemCustomizations: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  itemInstructions: {
    ...theme.typography.bodySmall,
    color: theme.colors.secondary,
    marginTop: theme.spacing.xs,
    fontStyle: 'italic',
  },
  itemPricing: {
    alignItems: 'flex-end',
  },
  itemQuantity: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  itemPrice: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  totalContainer: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 2,
    borderTopColor: theme.colors.primary,
  },
  totalText: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  detailLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  detailValue: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  instructionsText: {
    ...theme.typography.body,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  timelineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  timelineLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  timelineTime: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  errorText: {
    ...theme.typography.h3,
    color: theme.colors.error,
    marginBottom: theme.spacing.lg,
  },
});

export default OrderDetailsScreen;