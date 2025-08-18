import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { theme } from '../../theme';
import MetricCard from '../../components/business/MetricCard';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const DashboardScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { dashboardData, isLoading } = useSelector((state: RootState) => state.analytics);
  const { newOrders } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    // Fetch dashboard data on component mount
    // dispatch(fetchDashboardData());
  }, [dispatch]);

  const handleRefresh = () => {
    // Refresh dashboard data
    // dispatch(fetchDashboardData());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            Welcome, {user?.businessName || 'Vendor'}
          </Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Status:</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: user?.isOnline ? theme.colors.success : theme.colors.error }
            ]}>
              <Text style={styles.statusText}>
                {user?.isOnline ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>
        </View>

        {/* Metrics Cards */}
        <View style={styles.metricsContainer}>
          <MetricCard
            title="Today's Orders"
            value={dashboardData?.todayOrders || 0}
            trend="up"
            trendValue="+12%"
            icon="shopping-cart"
            color={theme.colors.primary}
          />
          
          <MetricCard
            title="Today's Revenue"
            value={`₹${dashboardData?.todayRevenue || 0}`}
            trend="up"
            trendValue="+8%"
            icon="attach-money"
            color={theme.colors.success}
          />
          
          <MetricCard
            title="Average Rating"
            value={`${dashboardData?.averageRating || 4.5}`}
            subtitle="⭐⭐⭐⭐⭐"
            trend="neutral"
            trendValue="4.5/5"
            icon="star"
            color={theme.colors.secondary}
          />
          
          <MetricCard
            title="Pending Orders"
            value={newOrders.length}
            subtitle="Awaiting response"
            icon="schedule"
            color={theme.colors.warning}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <Button
              title="View New Orders"
              variant="outline"
              size="medium"
              leftIcon="notifications"
              onPress={() => {/* Navigate to new orders */}}
              style={styles.actionButton}
            />
            <Button
              title="Add Menu Item"
              variant="primary"
              size="medium"
              leftIcon="add"
              onPress={() => {/* Navigate to add menu item */}}
              style={styles.actionButton}
            />
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          {newOrders.length > 0 ? (
            newOrders.slice(0, 3).map((order, index) => (
              <Card key={index} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
                  <Text style={styles.orderAmount}>₹{order.totalAmount}</Text>
                </View>
                <Text style={styles.customerName}>{order.customer.name}</Text>
                <Text style={styles.orderTime}>
                  {new Date(order.createdAt).toLocaleTimeString()}
                </Text>
              </Card>
            ))
          ) : (
            <Card style={styles.emptyState}>
              <Text style={styles.emptyText}>No recent orders</Text>
              <Text style={styles.emptySubtext}>
                New orders will appear here when customers place them
              </Text>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
    ...theme.shadows.sm,
  },
  welcomeText: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.md,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    ...theme.shadows.xs,
  },
  statusText: {
    ...theme.typography.bodySmallMedium,
    color: theme.colors.textInverse,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  section: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
    marginTop: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  orderCard: {
    marginBottom: theme.spacing.lg,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  orderNumber: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  orderAmount: {
    ...theme.typography.h3,
    color: theme.colors.primary,
  },
  customerName: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  orderTime: {
    ...theme.typography.captionMedium,
    color: theme.colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    padding: theme.spacing.xxxl,
  },
  emptyText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  emptySubtext: {
    ...theme.typography.body,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default DashboardScreen;