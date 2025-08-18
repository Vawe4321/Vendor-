import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { theme } from '../../theme';
import OrderCard from '../../components/business/OrderCard';
import Button from '../../components/common/Button';
import { Order } from '../../types/orders';

const ActiveOrdersScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeOrders, isLoading } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    // Fetch active orders
    // dispatch(fetchActiveOrders());
  }, [dispatch]);

  const handleRefresh = () => {
    // dispatch(fetchActiveOrders());
  };

  const handleUpdateStatus = (orderId: string, status: string) => {
    // Update order status
    console.log('Update order status:', orderId, status);
  };

  const handleViewDetails = (orderId: string) => {
    // Navigate to order details screen
    console.log('View order details:', orderId);
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <View style={styles.orderContainer}>
      <OrderCard
        order={item}
        onViewDetails={handleViewDetails}
        showActions={false}
      />
      
      {/* Status Update Actions */}
      <View style={styles.statusActions}>
        {item.status === 'accepted' && (
          <Button
            title="Start Preparing"
            variant="primary"
            size="small"
            onPress={() => handleUpdateStatus(item.id, 'preparing')}
            style={styles.statusButton}
          />
        )}
        
        {item.status === 'preparing' && (
          <Button
            title="Mark Ready"
            variant="secondary"
            size="small"
            onPress={() => handleUpdateStatus(item.id, 'ready')}
            style={styles.statusButton}
          />
        )}
        
        {item.status === 'ready' && (
          <Button
            title="Mark Delivered"
            variant="outline"
            size="small"
            onPress={() => handleUpdateStatus(item.id, 'delivered')}
            style={styles.statusButton}
          />
        )}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No Active Orders</Text>
      <Text style={styles.emptyText}>
        Orders you've accepted will appear here
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Active Orders</Text>
        <Text style={styles.subtitle}>
          {activeOrders.length} active order{activeOrders.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={activeOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  listContainer: {
    padding: theme.spacing.md,
    flexGrow: 1,
  },
  orderContainer: {
    marginBottom: theme.spacing.md,
  },
  statusActions: {
    marginTop: theme.spacing.sm,
    alignItems: 'flex-end',
  },
  statusButton: {
    minWidth: 120,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});

export default ActiveOrdersScreen;