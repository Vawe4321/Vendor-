import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { mockAnalyticsData } from '../../utils/mockData';

const AnalyticsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Analytics Dashboard</Text>
          <Text style={styles.subtitle}>Business insights and performance metrics</Text>
        </View>

        {/* Revenue Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue Overview</Text>
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>₹18,000</Text>
              <Text style={styles.metricLabel}>Today's Revenue</Text>
              <Text style={styles.metricTrend}>+12% from yesterday</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>₹110,000</Text>
              <Text style={styles.metricLabel}>This Week</Text>
              <Text style={styles.metricTrend}>+8% from last week</Text>
            </View>
          </View>
        </View>

        {/* Orders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Statistics</Text>
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>20</Text>
              <Text style={styles.metricLabel}>Today's Orders</Text>
              <Text style={styles.metricTrend}>+5 from yesterday</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>85</Text>
              <Text style={styles.metricLabel}>This Week</Text>
              <Text style={styles.metricTrend}>+12 from last week</Text>
            </View>
          </View>
        </View>

        {/* Customer Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Insights</Text>
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>15</Text>
              <Text style={styles.metricLabel}>New Customers</Text>
              <Text style={styles.metricTrend}>This week</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>22</Text>
              <Text style={styles.metricLabel}>Returning Customers</Text>
              <Text style={styles.metricTrend}>This week</Text>
            </View>
          </View>
        </View>

        {/* Ratings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Ratings</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingHeader}>
              <Text style={styles.ratingValue}>4.5</Text>
              <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
            </View>
            <View style={styles.ratingBreakdown}>
              <View style={styles.ratingBar}>
                <Text style={styles.ratingLabel}>5 stars</Text>
                <View style={styles.ratingBarContainer}>
                  <View style={[styles.ratingBarFill, { width: '65%' }]} />
                </View>
                <Text style={styles.ratingCount}>65%</Text>
              </View>
              <View style={styles.ratingBar}>
                <Text style={styles.ratingLabel}>4 stars</Text>
                <View style={styles.ratingBarContainer}>
                  <View style={[styles.ratingBarFill, { width: '25%' }]} />
                </View>
                <Text style={styles.ratingCount}>25%</Text>
              </View>
              <View style={styles.ratingBar}>
                <Text style={styles.ratingLabel}>3 stars</Text>
                <View style={styles.ratingBarContainer}>
                  <View style={[styles.ratingBarFill, { width: '8%' }]} />
                </View>
                <Text style={styles.ratingCount}>8%</Text>
              </View>
              <View style={styles.ratingBar}>
                <Text style={styles.ratingLabel}>2 stars</Text>
                <View style={styles.ratingBarContainer}>
                  <View style={[styles.ratingBarFill, { width: '2%' }]} />
                </View>
                <Text style={styles.ratingCount}>2%</Text>
              </View>
              <View style={styles.ratingBar}>
                <Text style={styles.ratingLabel}>1 star</Text>
                <View style={styles.ratingBarContainer}>
                  <View style={[styles.ratingBarFill, { width: '0%' }]} />
                </View>
                <Text style={styles.ratingCount}>0%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Top Items Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Performing Items</Text>
          {mockAnalyticsData.topItems.map((item, index) => (
            <View key={index} style={styles.topItemCard}>
              <View style={styles.topItemHeader}>
                <Text style={styles.topItemName}>{item.name}</Text>
                <Text style={styles.topItemOrders}>{item.orders} orders</Text>
              </View>
              <View style={styles.topItemDetails}>
                <Text style={styles.topItemRevenue}>₹{item.revenue}</Text>
                <Text style={styles.topItemRevenueLabel}>Revenue</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  title: {
    fontSize: 24, // FONT_SIZES.xxxl
    fontWeight: '700', // Bold
    color: '#212121', // text.primary
    marginBottom: 8, // SPACING.sm
  },
  subtitle: {
    fontSize: 14, // FONT_SIZES.md
    fontWeight: '400', // Regular
    color: '#757575', // text.secondary
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
  
  // Metrics Row - Following Design System
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12, // SPACING.md
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#F8F9FA', // gray.100
    padding: 16, // SPACING.lg
    borderRadius: 8, // BORDER_RADIUS.md
    borderWidth: 1,
    borderColor: '#E0E0E0', // gray.300
  },
  metricValue: {
    fontSize: 20, // FONT_SIZES.xxl
    fontWeight: '700', // Bold
    color: '#212121', // text.primary
    marginBottom: 4, // SPACING.xs
  },
  metricLabel: {
    fontSize: 12, // FONT_SIZES.sm
    fontWeight: '500', // Medium
    color: '#757575', // text.secondary
    marginBottom: 4, // SPACING.xs
  },
  metricTrend: {
    fontSize: 10, // FONT_SIZES.xs
    fontWeight: '400', // Regular
    color: '#699f38', // primary
  },
  
  // Rating Section - Following Design System
  ratingContainer: {
    alignItems: 'center',
  },
  ratingHeader: {
    alignItems: 'center',
    marginBottom: 20, // SPACING.xl
  },
  ratingValue: {
    fontSize: 32, // FONT_SIZES.xxxxl
    fontWeight: '700', // Bold
    color: '#212121', // text.primary
    marginBottom: 8, // SPACING.sm
  },
  ratingStars: {
    fontSize: 20, // FONT_SIZES.xxl
  },
  ratingBreakdown: {
    width: '100%',
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, // SPACING.sm
  },
  ratingLabel: {
    fontSize: 12, // FONT_SIZES.sm
    fontWeight: '500', // Medium
    color: '#212121', // text.primary
    width: 50,
  },
  ratingBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0', // gray.300
    borderRadius: 4, // BORDER_RADIUS.sm
    marginHorizontal: 12, // SPACING.md
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#699f38', // primary
  },
  ratingCount: {
    fontSize: 12, // FONT_SIZES.sm
    fontWeight: '500', // Medium
    color: '#757575', // text.secondary
    width: 30,
    textAlign: 'right',
  },
  
  // Top Items Section - Following Design System
  topItemCard: {
    backgroundColor: '#F8F9FA', // gray.100
    padding: 16, // SPACING.lg
    borderRadius: 8, // BORDER_RADIUS.md
    marginBottom: 12, // SPACING.md
    borderWidth: 1,
    borderColor: '#E0E0E0', // gray.300
  },
  topItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8, // SPACING.sm
  },
  topItemName: {
    fontSize: 16, // FONT_SIZES.lg
    fontWeight: '600', // Semi-Bold
    color: '#212121', // text.primary
  },
  topItemOrders: {
    fontSize: 12, // FONT_SIZES.sm
    fontWeight: '500', // Medium
    color: '#757575', // text.secondary
  },
  topItemDetails: {
    alignItems: 'flex-end',
  },
  topItemRevenue: {
    fontSize: 18, // FONT_SIZES.xl
    fontWeight: '700', // Bold
    color: '#699f38', // primary
  },
  topItemRevenueLabel: {
    fontSize: 10, // FONT_SIZES.xs
    fontWeight: '400', // Regular
    color: '#757575', // text.secondary
  },
});

export default AnalyticsScreen;