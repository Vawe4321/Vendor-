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
import { fetchNewOrders, acceptOrder, rejectOrder } from '../../store/slices/ordersSlice';
import { theme } from '../../theme';
import OrderCard from '../../components/business/OrderCard';
import { Order } from '../../types/orders';

const NewOrdersScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { newOrders, isLoading } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchNewOrders());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchNewOrders());
  };

  const handleAcceptOrder = (orderId: string) => {
    // In a real app, you might show a modal to set preparation time
    const preparationTime = 30; // minutes
    dispatch(acceptOrder({ orderId, preparationTime }));
  };

  const handleRejectOrder = (orderId: string) => {
    // In a real app, you might show a modal to select rejection reason
    const reason = 'Unable to fulfill order at this time';
    dispatch(rejectOrder({ orderId, reason }));
  };

  const handleViewDetails = (orderId: string) => {
    // Navigate to order details screen
    console.log('View order details:', orderId);
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <OrderCard
      order={item}
      onAccept={handleAcceptOrder}
      onReject={handleRejectOrder}
      onViewDetails={handleViewDetails}
      showActions={true}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No New Orders</Text>
      <Text style={styles.emptyText}>
        New orders from customers will appear here
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New Orders</Text>
        <Text style={styles.subtitle}>
          {newOrders.length} pending order{newOrders.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={newOrders}
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

export default NewOrdersScreen;