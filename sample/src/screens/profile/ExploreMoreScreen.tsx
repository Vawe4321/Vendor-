import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ExploreMoreScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Define all sections and items
  const allSections = [
    {
      title: 'Manage outlet',
      items: [
        { icon: 'info', label: 'Outlet info', onPress: () => navigation.navigate('Hub', { screen: 'OutletInfo' }) },
        { icon: 'schedule', label: 'Outlet timings', onPress: () => navigation.navigate('Hub', { screen: 'Timings' }) },
        { icon: 'phone', label: 'Phone numbers', onPress: () => navigation.navigate('Hub', { screen: 'ContactDetails' }) },
        { icon: 'people', label: 'Manage staff', onPress: () => navigation.navigate('Hub', { screen: 'ImportantContacts' }) },
      ]
    },
    {
      title: 'Settings',
      items: [
        { icon: 'settings', label: 'Settings', onPress: () => navigation.navigate('Hub', { screen: 'Settings' }) },
        { icon: 'notifications', label: 'Manage communication', onPress: () => navigation.navigate('Hub', { screen: 'ManageCommunications' }) },
        { icon: 'store', label: 'Delivery settings', onPress: () => navigation.navigate('Hub', { screen: 'DeliverySettings' }) },
        { icon: 'hourglass-empty', label: 'Rush hour', badge: 'OFF', onPress: () => navigation.navigate('Hub', { screen: 'RushHour' }) },
        { icon: 'schedule', label: 'Schedule off', onPress: () => navigation.navigate('Hub', { screen: 'ScheduleOff' }) },
      ]
    },
    {
      title: 'Orders',
      items: [
        { icon: 'description', label: 'Order history', onPress: () => navigation.navigate('Hub', { screen: 'OrderHistory' }) },
        { icon: 'star', label: 'Complaints', onPress: () => navigation.navigate('Hub', { screen: 'Complaints' }) },
        { icon: 'chat-bubble', label: 'Reviews', onPress: () => navigation.navigate('Hub', { screen: 'Reviews' }) },
      ]
    },
    {
      title: 'Help',
      items: [
        { icon: 'person', label: 'Grooso manager', onPress: () => navigation.navigate('Hub', { screen: 'ContactAccountManager' }) },
        { icon: 'help', label: 'Help centre', onPress: () => navigation.navigate('Hub', { screen: 'HelpCentre' }) },
        { icon: 'edit', label: 'Share your feedback' },
      ]
    },
    {
      title: 'Accounting',
      items: [
        { icon: 'trending-up', label: 'Payout', onPress: () => navigation.navigate('Hub', { screen: 'Payouts' }) },
        { icon: 'description', label: 'Invoices', onPress: () => navigation.navigate('Hub', { screen: 'Invoices' }) },
        { icon: 'receipt', label: 'Taxes', onPress: () => navigation.navigate('Hub', { screen: 'Taxes' }) },
      ]
    }
  ];

  // Filter sections and items based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) {
      return allSections;
    }

    const query = searchQuery.toLowerCase().trim();
    
    return allSections.map(section => {
      const filteredItems = section.items.filter(item =>
        item.label.toLowerCase().includes(query) ||
        section.title.toLowerCase().includes(query)
      );
      
      return {
        ...section,
        items: filteredItems
      };
    }).filter(section => section.items.length > 0);
  }, [searchQuery]);

  const handleSearchPress = () => {
    setIsSearchActive(true);
  };

  const handleSearchCancel = () => {
    setIsSearchActive(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = () => {
    // Search is performed automatically as user types
    setIsSearchActive(false);
  };

  const renderSection = (title: string, items: Array<{ icon: string; label: string; badge?: string; onPress?: () => void }>) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.grid}>
        {items.map((item, index) => (
          <TouchableOpacity key={`${title}-${item.label}-${index}`} style={styles.gridItem} onPress={item.onPress}>
            <View style={styles.itemIcon}>
              <Icon name={item.icon as any} size={24} color="#666" />
            </View>
            <Text style={styles.itemLabel}>{item.label}</Text>
            {item.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {!isSearchActive ? (
          <>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.navigate('Hub', { screen: 'HubMain' })}
            >
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Explore more</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerIcon} onPress={handleSearchPress}>
                <Icon name="search" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerIcon}
                onPress={() => {
                  console.log('Opening profile data');
                  navigation.navigate('Hub', { screen: 'ProfileData' });
                }}
              >
                <Icon name="person" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.searchContainer}>
              <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search features..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearchSubmit}
                autoFocus={true}
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                  <Icon name="close" size={20} color="#666" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity style={styles.cancelButton} onPress={handleSearchCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Restaurant Information Card */}
        <TouchableOpacity style={styles.restaurantCard}>
          <View style={styles.restaurantInfo}>
            <Icon name="store" size={24} color="#666" style={styles.restaurantIcon} />
            <View style={styles.restaurantDetails}>
              <Text style={styles.restaurantName}>Grooso's Kitchen</Text>
              <Text style={styles.restaurantLocation}>Hyderabad</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        {/* Search Results or All Sections */}
        {searchQuery.trim() && filteredSections.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Icon name="search-off" size={48} color="#ccc" />
            <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
            <Text style={styles.noResultsSubtext}>Try searching with different keywords</Text>
          </View>
        ) : (
          filteredSections.map((section, index) => 
            <View key={`section-${section.title}-${index}`}>
              {renderSection(section.title, section.items)}
            </View>
          )
        )}

        {/* Show search results count */}
        {searchQuery.trim() && filteredSections.length > 0 && (
          <View style={styles.searchResultsInfo}>
            <Text style={styles.searchResultsText}>
              Found {filteredSections.reduce((total, section) => total + section.items.length, 0)} results
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  restaurantCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantIcon: {
    marginRight: 12,
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  restaurantLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemLabel: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  cancelText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '500',
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  searchResultsInfo: {
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 16,
  },
  searchResultsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default ExploreMoreScreen; 