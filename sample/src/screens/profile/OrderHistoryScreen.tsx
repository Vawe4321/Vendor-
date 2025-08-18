import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const OrderHistoryScreen = () => {
  const navigation = useNavigation();
  const [selectedDateRange, setSelectedDateRange] = useState('Last 2 days');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('Order status');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const handleBackPress = () => {
    console.log('OrderHistory: Back button pressed, going back to HelpCentre');
    // Check if we came from ExploreMore, if so, navigate back to it
    // Otherwise use default goBack behavior
    navigation.goBack();
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
  };

  const handleDateRangePress = () => {
    console.log('Date range pressed');
  };

  const handleFilterPress = () => {
    setShowFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
  };

  const handleFilterCategoryPress = (category: string) => {
    setSelectedFilterCategory(category);
  };

  const handleFilterOptionToggle = (option: string) => {
    if (selectedFilters.includes(option)) {
      setSelectedFilters(selectedFilters.filter(filter => filter !== option));
    } else {
      setSelectedFilters([...selectedFilters, option]);
    }
  };

  const handleClearAll = () => {
    setSelectedFilters([]);
  };

  const handleApplyFilters = () => {
    setShowFilterModal(false);
    console.log('Applied filters:', selectedFilters);
  };

  const filterCategories = [
    'Order status',
    'Order type', 
    'Ratings'
  ];

  const filterOptions = {
    'Order status': [
      'Preparing',
      'Ready', 
      'Picked up',
      'Delivered',
      'Timed out',
      'Rejected'
    ],
    'Order type': [
      'Dine-in',
      'Takeaway',
      'Delivery'
    ],
    'Ratings': [
      '5 stars',
      '4 stars',
      '3 stars',
      '2 stars',
      '1 star'
    ]
  };

  const orders = [
    {
      id: '7116035516',
      status: 'DELIVERED',
      items: '1 x Single Fry Biryani',
      time: '2:05 PM | 31 July',
      customer: 'By Usha Jampani',
      price: '₹136.00',
      note: null
    },
    {
      id: '7119658577',
      status: 'DELIVERED',
      items: '1 x Single Fry Biryani',
      time: '12:37 PM | 31 July',
      customer: 'By chandu',
      price: '₹170.00',
      note: 'Order ready not marked'
    },
    {
      id: '7116440670',
      status: 'DELIVERED',
      items: '2 x Butter Naan, 1 x Butter Tandoori Roti, 1 x ...',
      time: '8:54 PM | 30 July',
      customer: 'By Vikas Reddy',
      price: '₹346.00',
      note: 'Order ready not marked'
    },
    {
      id: '7119342009',
      status: 'DELIVERED',
      items: '2 x Single Fry Biryani, 1 x Chicken 65',
      time: '6:58 PM | 30 July',
      customer: 'By Gopichand',
      price: '₹525.00',
      note: 'Order ready not marked'
    },
    {
      id: '7119082094',
      status: 'DELIVERED',
      items: '1 x Schezwan Chicken Fried Rice',
      time: '6:19 PM | 30 July',
      customer: 'By Jaya Joellyn',
      price: '₹144.00',
      note: 'Order ready not marked'
    },
    {
      id: '7114334855',
      status: 'REJECTED',
      items: '1 x Schezwan Chicken Fried Rice',
      time: '6:01 PM | 30 July',
      customer: 'By Jaya Joellyn',
      price: '₹144.00',
      note: 'Rejected by restaurant'
    },
    {
      id: '7117588135',
      status: 'DELIVERED',
      items: '1 x Brothers Spl Biryani',
      time: '3:58 PM | 30 July',
      customer: 'By samreen',
      price: '₹200.00',
      note: 'Order ready not marked'
    },
    {
      id: '7088736076',
      status: 'DELIVERED',
      items: '1 x Chicken Dum Biryani, 1 x Chicken Fry Biry...',
      time: '2:32 PM | 30 July',
      customer: 'By sumith sandesh',
      price: '₹530.00',
      note: 'Order ready not marked'
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'DELIVERED' ? '#00897B' : '#F44336';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order history</Text>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
          <Icon name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Filter and Date Range Controls */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.dateRangeButton} onPress={handleDateRangePress}>
          <Text style={styles.dateRangeText}>{selectedDateRange}</Text>
          <Icon name="keyboard-arrow-down" size={20} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
          <Icon name="filter-list" size={20} color="#666" />
          <Text style={styles.filterText}>Filter</Text>
          <Icon name="keyboard-arrow-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Order List */}
      <ScrollView style={styles.orderList} showsVerticalScrollIndicator={false}>
        {orders.map((order, index) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
              <Text style={styles.orderId}>ID: {order.id}</Text>
            </View>
            
            <Text style={styles.orderItems}>{order.items}</Text>
            <Text style={styles.orderTime}>{order.time}</Text>
            <Text style={styles.orderCustomer}>{order.customer}</Text>
            
            <View style={styles.orderFooter}>
              <Text style={styles.orderPrice}>{order.price}</Text>
              {order.note && (
                <Text style={styles.orderNote}>{order.note}</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseFilterModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={handleCloseFilterModal}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Two Panel Layout */}
            <View style={styles.modalContent}>
              {/* Left Panel - Filter Categories */}
              <View style={styles.filterCategoriesPanel}>
                {filterCategories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.filterCategoryItem,
                      selectedFilterCategory === category && styles.selectedFilterCategory
                    ]}
                    onPress={() => handleFilterCategoryPress(category)}
                  >
                    {selectedFilterCategory === category && (
                      <View style={styles.selectedIndicator} />
                    )}
                    <Text style={[
                      styles.filterCategoryText,
                      selectedFilterCategory === category && styles.selectedFilterCategoryText
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Right Panel - Filter Options */}
              <View style={styles.filterOptionsPanel}>
                {filterOptions[selectedFilterCategory as keyof typeof filterOptions]?.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.filterOptionItem}
                    onPress={() => handleFilterOptionToggle(option)}
                  >
                    <View style={[
                      styles.checkbox,
                      selectedFilters.includes(option) && styles.checkedCheckbox
                    ]}>
                      {selectedFilters.includes(option) && (
                        <Icon name="check" size={16} color="#FFFFFF" />
                      )}
                    </View>
                    <Text style={styles.filterOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Modal Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.clearAllButton} onPress={handleClearAll}>
                <Text style={styles.clearAllText}>Clear all</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  searchButton: {
    padding: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dateRangeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  dateRangeText: {
    fontSize: 14,
    color: '#000',
    marginRight: 4,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  filterText: {
    fontSize: 14,
    color: '#000',
    marginHorizontal: 4,
  },
  orderList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  orderId: {
    fontSize: 12,
    color: '#666',
  },
  orderItems: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    marginBottom: 4,
  },
  orderTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  orderCustomer: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  orderNote: {
    fontSize: 12,
    color: '#F44336',
  },

  // Filter Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '70%',
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  modalContent: {
    flex: 1,
    flexDirection: 'row',
  },
  filterCategoriesPanel: {
    width: '40%',
    backgroundColor: '#F5F5F5',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  filterCategoryItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  selectedFilterCategory: {
    backgroundColor: '#FFFFFF',
  },
  selectedIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#2196F3',
  },
  filterCategoryText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  selectedFilterCategoryText: {
    color: '#000',
    fontWeight: '500',
  },
  filterOptionsPanel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
  },
  filterOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#000',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  clearAllButton: {
    paddingVertical: 10,
  },
  clearAllText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  applyButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default OrderHistoryScreen; 