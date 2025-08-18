import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

const OrderDashboardScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Preparing');

  const tabs = ['Preparing', 'Ready', 'Out for delivery', 'Scheduled'];

  const renderTab = (tab: string) => (
    <TouchableOpacity
      key={tab}
      style={[styles.tab, activeTab === tab && styles.activeTab]}
      onPress={() => setActiveTab(tab)}
    >
      <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
        {tab}
      </Text>
    </TouchableOpacity>
  );

  const renderBottomNavItem = (icon: string, label: string, isActive: boolean = false) => (
    <TouchableOpacity style={styles.bottomNavItem}>
      <Text style={[styles.bottomNavIcon, isActive && styles.activeBottomNavIcon]}>
        {icon}
      </Text>
      <Text style={[styles.bottomNavLabel, isActive && styles.activeBottomNavLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.outletInfo}>
            <Text style={styles.outletName}>Brother's Kitchen</Text>
            <Text style={styles.location}>Ibrahimpatnam</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.offlineIndicator} />
            <Text style={styles.statusText}>Offline</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map(renderTab)}
        </ScrollView>
      </View>

      {/* Body Content */}
      <View style={styles.body}>
        <View style={styles.emptyState}>
          <View style={styles.stoveIllustration}>
            <Text style={styles.stoveIcon}>🔥</Text>
          </View>
          <Text style={styles.emptyStateTitle}>No orders are currently being prepared!</Text>
          <TouchableOpacity style={styles.openButton}>
            <Text style={styles.openButtonText}>Open</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        {renderBottomNavItem('📋', 'Orders', true)}
        {renderBottomNavItem('📦', 'Inventory')}
        {renderBottomNavItem('💬', 'Feedback')}
        {renderBottomNavItem('🛒', 'Hyperpure')}
        {renderBottomNavItem('🏪', 'To Hub')}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  outletInfo: {
    flex: 1,
  },
  outletName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '500',
  },
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2563EB',
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyState: {
    alignItems: 'center',
  },
  stoveIllustration: {
    width: 120,
    height: 120,
    backgroundColor: '#F3F4F6',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  stoveIcon: {
    fontSize: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  openButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  openButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 8,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  bottomNavIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  activeBottomNavIcon: {
    color: '#2563EB',
  },
  bottomNavLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  activeBottomNavLabel: {
    color: '#2563EB',
    fontWeight: '500',
  },
});

export default OrderDashboardScreen; 