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
              { backgroundColor: user?.isOnline ? theme.colors.success.main : theme.colors.error.main }
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
            color={theme.colors.success.main}
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
            color={theme.colors.warning.main}
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
  // Design System Colors
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // gray.50
  },
  content: {
    flex: 1,
  },
  
  // Header Section - Following Design System
  header: {
    paddingHorizontal: 20, // SPACING.xl
    paddingVertical: 15, // SPACING.lg
    backgroundColor: '#FFFFFF', // background.paper
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeText: {
    fontSize: 24, // FONT_SIZES.xxxl
    fontWeight: '700', // Bold
    color: '#212121', // text.primary
    marginBottom: 16, // SPACING.lg
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14, // FONT_SIZES.md
    fontWeight: '500', // Medium
    color: '#757575', // text.secondary
    marginRight: 12, // SPACING.md
  },
  statusBadge: {
    paddingHorizontal: 12, // SPACING.md
    paddingVertical: 6, // SPACING.sm
    borderRadius: 16, // BORDER_RADIUS.xl
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusText: {
    fontSize: 12, // FONT_SIZES.sm
    fontWeight: '600', // Semi-Bold
    color: '#FFFFFF', // text.inverse
  },
  
  // Metrics Container - Following Design System
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16, // SPACING.lg
    justifyContent: 'space-between',
  },
  
  // Section - Following Design System
  section: {
    paddingHorizontal: 20, // SPACING.xl
    paddingVertical: 16, // SPACING.lg
    backgroundColor: '#FFFFFF', // background.paper
    marginTop: 8, // SPACING.sm
    marginHorizontal: 16, // SPACING.lg
    borderRadius: 12, // BORDER_RADIUS.lg
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0', // gray.300
  },
  sectionTitle: {
    fontSize: 18, // FONT_SIZES.xl
    fontWeight: '600', // Semi-Bold
    color: '#212121', // text.primary
    marginBottom: 16, // SPACING.lg
  },
  
  // Action Buttons - Following Design System
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12, // SPACING.md
  },
  actionButton: {
    flex: 1,
  },
  
  // Order Card - Following Design System
  orderCard: {
    marginBottom: 16, // SPACING.lg
    backgroundColor: '#FFFFFF', // background.paper
    borderRadius: 8, // BORDER_RADIUS.md
    padding: 16, // SPACING.lg
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0', // gray.300
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12, // SPACING.md
  },
  orderNumber: {
    fontSize: 16, // FONT_SIZES.lg
    fontWeight: '600', // Semi-Bold
    color: '#212121', // text.primary
  },
  orderAmount: {
    fontSize: 16, // FONT_SIZES.lg
    fontWeight: '600', // Semi-Bold
    color: '#699f38', // primary
  },
  customerName: {
    fontSize: 14, // FONT_SIZES.md
    fontWeight: '500', // Medium
    color: '#212121', // text.primary
    marginBottom: 8, // SPACING.sm
  },
  orderTime: {
    fontSize: 12, // FONT_SIZES.sm
    fontWeight: '500', // Medium
    color: '#757575', // text.secondary
  },
  
  // Empty State - Following Design System
  emptyState: {
    alignItems: 'center',
    padding: 32, // SPACING.xxxl
  },
  emptyText: {
    fontSize: 14, // FONT_SIZES.md
    fontWeight: '500', // Medium
    color: '#757575', // text.secondary
    marginBottom: 12, // SPACING.md
  },
  emptySubtext: {
    fontSize: 14, // FONT_SIZES.md
    fontWeight: '400', // Regular
    color: '#9E9E9E', // gray.500
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default DashboardScreen;