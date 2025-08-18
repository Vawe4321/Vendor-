import React, { useEffect, useState } from 'react';
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
import Card from '../../components/common/Card';
import { Order } from '../../types/orders';

const OrderHistoryScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orderHistory, isLoading } = useSelector((state: RootState) => state.orders);
  const [filter, setFilter] = useState<'all' | 'delivered' | 'cancelled'>('all');

  useEffect(() => {
    // Fetch order history
    // dispatch(fetchOrderHistory());
  }, [dispatch]);

  const handleRefresh = () => {
    // dispatch(fetchOrderHistory());
  };

  const handleViewDetails = (orderId: string) => {
    // Navigate to order details screen
    console.log('View order details:', orderId);
  };

  const getFilteredOrders = () => {
    if (filter === 'all') return orderHistory;
    return orderHistory.filter(order => order.status === filter);
  };

  const renderFilterButton = (filterType: 'all' | 'delivered' | 'cancelled', title: string) => (
    <Button
      title={title}
      variant={filter === filterType ? 'primary' : 'outline'}
      size="small"
      onPress={() => setFilter(filterType)}
      style={styles.filterButton}
    />
  );

  const renderOrderItem = ({ item }: { item: Order }) => (
    <OrderCard
      order={item}
      onViewDetails={handleViewDetails}
      showActions={false}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No Order History</Text>
      <Text style={styles.emptyText}>
        {filter === 'all' 
          ? 'Completed orders will appear here'
          : `No ${filter} orders found`
        }
      </Text>
    </View>
  );

  const filteredOrders = getFilteredOrders();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order History</Text>
        <Text style={styles.subtitle}>
          {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Filter Buttons */}
      <Card style={styles.filterContainer}>
        <View style={styles.filterButtons}>
          {renderFilterButton('all', 'All')}
          {renderFilterButton('delivered', 'Delivered')}
          {renderFilterButton('cancelled', 'Cancelled')}
        </View>
      </Card>

      {/* Order Statistics */}
      <Card style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{orderHistory.length}</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {orderHistory.filter(o => o.status === 'delivered').length}
            </Text>
            <Text style={styles.statLabel}>Delivered</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {orderHistory.filter(o => o.status === 'cancelled').length}
            </Text>
            <Text style={styles.statLabel}>Cancelled</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              ₹{orderHistory
                .filter(o => o.status === 'delivered')
                .reduce((sum, o) => sum + o.totalAmount, 0)
              }
            </Text>
            <Text style={styles.statLabel}>Total Revenue</Text>
          </View>
        </View>
      </Card>

      <FlatList
        data={filteredOrders}
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
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  filterContainer: {
    margin: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  statsContainer: {
    margin: theme.spacing.md,
    marginTop: 0,
    marginBottom: theme.spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  listContainer: {
    padding: theme.spacing.md,
    paddingTop: 0,
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
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default OrderHistoryScreen;