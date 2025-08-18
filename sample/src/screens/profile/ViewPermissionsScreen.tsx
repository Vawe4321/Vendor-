import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

const ViewPermissionsScreen: React.FC = () => {
  const [activeRole, setActiveRole] = useState('Staff');

  const roles = [
    { id: 'Owner', name: 'Owner', icon: '👥' },
    { id: 'Manager', name: 'Manager', icon: '👤⚙️' },
    { id: 'Staff', name: 'Staff', icon: '👥' },
  ];

  const permissions = [
    { id: 'operations', title: 'Operations', subtitle: 'Orders & items management, action on complaints etc.', granted: true },
    { id: 'home', title: 'Home', subtitle: 'Business reports, payouts etc.', granted: false },
    { id: 'menu', title: 'Menu management', subtitle: 'Edit items and item details', granted: false },
    { id: 'marketing_promo', title: 'Marketing | Promo', subtitle: 'Create and manage discounts', granted: false },
    { id: 'marketing_ads', title: 'Marketing | Ads', subtitle: 'Create and manage ad campaigns', granted: false },
    { id: 'hyperpure', title: 'Manage Hyperpure', subtitle: 'Purchase and track food raw materials', granted: false },
    { id: 'users', title: 'Manage users', subtitle: 'Edit owner, manager, staff contact details', granted: false },
    { id: 'outlet', title: 'Manage outlet settings', subtitle: 'Adjust outlet timings, contact info & more', granted: false },
    { id: 'payouts', title: 'Manage payouts', subtitle: 'View payouts, invoices & tax certificates', granted: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>View permissions</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Role Tabs */}
      <View style={styles.tabContainer}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={[
              styles.tab,
              activeRole === role.id && styles.activeTab
            ]}
            onPress={() => setActiveRole(role.id)}
          >
            <Text style={[
              styles.tabIcon,
              activeRole === role.id && styles.activeTabIcon
            ]}>
              {role.icon}
            </Text>
            <Text style={[
              styles.tabText,
              activeRole === role.id && styles.activeTabText
            ]}>
              {role.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Permissions List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.permissionsContainer}>
                     {permissions.map((permission) => (
             <View key={permission.id} style={styles.permissionItem}>
               <View style={styles.permissionInfo}>
                 <Text style={[
                   styles.permissionTitle,
                   !permission.granted && styles.deniedPermissionTitle
                 ]}>
                   {permission.title}
                 </Text>
                 <Text style={[
                   styles.permissionSubtitle,
                   !permission.granted && styles.deniedPermissionSubtitle
                 ]}>
                   {permission.subtitle}
                 </Text>
               </View>
               <View style={[
                 permission.granted ? styles.checkmarkContainer : styles.deniedContainer
               ]}>
                 <Text style={[
                   permission.granted ? styles.checkmarkIcon : styles.deniedIcon
                 ]}>
                   {permission.granted ? '✓' : '✕'}
                 </Text>
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
    backgroundColor: '#FAFAFA',
  },
  
  // Header Section
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 20,
    color: '#212121',
    fontWeight: '600',
  },
  
  // Role Tabs
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeTab: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
  },
  tabIcon: {
    fontSize: 16,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  activeTabIcon: {
    color: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  
  // Content Section
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  
  // Permissions Container
  permissionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    minHeight: 44,
  },
  permissionInfo: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  permissionSubtitle: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 18,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkIcon: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  deniedContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deniedIcon: {
    fontSize: 14,
    color: '#9E9E9E',
    fontWeight: '600',
  },
  deniedPermissionTitle: {
    color: '#9E9E9E',
  },
  deniedPermissionSubtitle: {
    color: '#BDBDBD',
  },
});

export default ViewPermissionsScreen; 