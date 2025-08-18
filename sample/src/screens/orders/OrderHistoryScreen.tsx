import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
} from 'react-native';

const OrderHistoryScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 2 days');
  const [selectedFilter, setSelectedFilter] = useState('Filter');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(3);
  const [selectedEndDate, setSelectedEndDate] = useState(4);
  const [currentMonth, setCurrentMonth] = useState('AUGUST 2025');
  const [isSelectingStart, setIsSelectingStart] = useState(true);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(7); // August is month 7 (0-indexed)
  
  // Filter states
  const [activeFilterTab, setActiveFilterTab] = useState('Order status');
  const [orderStatusFilters, setOrderStatusFilters] = useState({
    preparing: false,
    ready: false,
    pickedUp: false,
    delivered: false,
    timedOut: false,
    rejected: false,
  });

  // Order data for past orders
  const pastOrders = [
    {
      id: '7116440670',
      status: 'DELIVERED',
      customerName: 'Vikas Reddy',
      timestamp: '8:54 PM | 30 July',
      items: ['2 x Butter Naan', '1 x Butter Tandoori Roti', '1 x ...'],
      price: '₹346.00',
      warning: 'Order ready not marked',
      isDelivered: true,
    },
    {
      id: '7119342009',
      status: 'DELIVERED',
      customerName: 'Gopichand',
      timestamp: '6:58 PM | 30 July',
      items: ['2 x Single Fry Biryani', '1 x Chicken 65'],
      price: '₹525.00',
      warning: 'Order ready not marked',
      isDelivered: true,
    },
    {
      id: '7119082094',
      status: 'DELIVERED',
      customerName: 'Jaya Joellyn',
      timestamp: '6:19 PM | 30 July',
      items: ['1 x Schezwan Chicken Fried Rice'],
      price: '₹144.00',
      warning: 'Order ready not marked',
      isDelivered: true,
    },
    {
      id: '7114334855',
      status: 'REJECTED',
      customerName: 'Jaya Joellyn',
      timestamp: '6:01 PM | 30 July',
      items: ['1 x Schezwan Chicken Fried Rice'],
      price: '₹144.00',
      rejectionReason: 'Rejected by restaurant',
      isDelivered: false,
    },
    {
      id: '7117588135',
      status: 'DELIVERED',
      customerName: 'Samreen',
      timestamp: '3:58 PM | 30 July',
      items: ['1 x Brothers Spl Biryani'],
      price: '₹200.00',
      warning: 'Order ready not marked',
      isDelivered: true,
    },
    {
      id: '7088736076',
      status: 'DELIVERED',
      customerName: 'Sumith Sandesh',
      timestamp: '2:32 PM | 30 July',
      items: ['1 x Chicken Dum Biryani', '1 x Chicken Fry Biry...'],
      price: '₹530.00',
      warning: 'Order ready not marked',
      isDelivered: true,
    },
  ];

  const renderOrderCard = ({ item }: { item: any }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderStatus}>
          <View style={[styles.statusBadge, item.isDelivered ? styles.deliveredBadge : styles.rejectedBadge]}>
            <Text style={[styles.statusText, item.isDelivered ? styles.deliveredText : styles.rejectedText]}>
              {item.isDelivered ? '✅' : '❌'} {item.status}
            </Text>
          </View>
        </View>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>

      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>ID: {item.id}</Text>
        <Text style={styles.customerInfo}>By {item.customerName}</Text>
      </View>

      <View style={styles.itemsSection}>
        <Text style={styles.itemsTitle}>Items:</Text>
        {item.items.map((itemName: string, index: number) => (
          <Text key={`${item.id}-item-${index}`} style={styles.itemName}>{itemName}</Text>
        ))}
      </View>

      <View style={styles.priceSection}>
        <Text style={styles.price}>{item.price}</Text>
      </View>

      {item.warning && (
        <View style={styles.warningSection}>
          <Text style={styles.warningText}>⚠️ {item.warning}</Text>
        </View>
      )}

      {item.rejectionReason && (
        <View style={styles.rejectionSection}>
          <Text style={styles.rejectionText}>❌ {item.rejectionReason}</Text>
        </View>
      )}
    </View>
  );

    const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const monthShortNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const handleDatePress = (date: number) => {
    if (isSelectingStart) {
      setSelectedStartDate(date);
      setSelectedEndDate(date);
      setIsSelectingStart(false);
    } else {
      if (date >= selectedStartDate) {
        setSelectedEndDate(date);
      } else {
        setSelectedStartDate(date);
        setSelectedEndDate(date);
      }
    }
  };

  const handlePreviousMonth = () => {
    const newMonthIndex = currentMonthIndex - 1;
    if (newMonthIndex >= 0) {
      setCurrentMonthIndex(newMonthIndex);
      setCurrentMonth(`${monthNames[newMonthIndex]} 2025`);
      // Reset selected dates when changing month
      setSelectedStartDate(1);
      setSelectedEndDate(1);
      setIsSelectingStart(true);
    }
  };

  const handleNextMonth = () => {
    const newMonthIndex = currentMonthIndex + 1;
    if (newMonthIndex < 12) {
      setCurrentMonthIndex(newMonthIndex);
      setCurrentMonth(`${monthNames[newMonthIndex]} 2025`);
      // Reset selected dates when changing month
      setSelectedStartDate(1);
      setSelectedEndDate(1);
      setIsSelectingStart(true);
    }
  };

  const handleOKPress = () => {
    const startDate = selectedStartDate;
    const endDate = selectedEndDate;
    const monthShort = monthShortNames[currentMonthIndex];
    const dateRange = `${monthShort} ${startDate} - ${monthShort} ${endDate}`;
    setSelectedPeriod(dateRange);
    setShowCalendar(false);
    setIsSelectingStart(true);
  };

  const handleCancelPress = () => {
    setShowCalendar(false);
    setIsSelectingStart(true);
  };

  const handleFilterPress = () => {
    setShowFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
  };

  const handleFilterTabPress = (tab: string) => {
    setActiveFilterTab(tab);
  };

  const handleOrderStatusToggle = (status: string) => {
    setOrderStatusFilters(prev => ({
      ...prev,
      [status]: !prev[status as keyof typeof prev]
    }));
  };

  const handleClearAllFilters = () => {
    setOrderStatusFilters({
      preparing: false,
      ready: false,
      pickedUp: false,
      delivered: false,
      timedOut: false,
      rejected: false,
    });
  };

  const handleApplyFilters = () => {
    // Apply the filters logic here
    setShowFilterModal(false);
  };

  const getDaysInMonth = (monthIndex: number) => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[monthIndex];
  };

  const renderCalendarPopup = () => {
    const daysInMonth = getDaysInMonth(currentMonthIndex);
    const monthShort = monthShortNames[currentMonthIndex];
    
    return (
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelPress}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarPopup}>
            <Text style={styles.selectRangeText}>SELECT RANGE</Text>
            <Text style={styles.dateRangeText}>{monthShort} {selectedStartDate} - {monthShort} {selectedEndDate}</Text>
            
            <View style={styles.monthHeader}>
              <Text style={styles.monthText}>{currentMonth}</Text>
              <Text style={styles.monthArrow}>▼</Text>
              <View style={styles.monthNavigation}>
                <TouchableOpacity 
                  style={[styles.navButton, currentMonthIndex === 0 && styles.disabledNavButton]}
                  onPress={handlePreviousMonth}
                  disabled={currentMonthIndex === 0}
                >
                  <Text style={[styles.navArrow, currentMonthIndex === 0 && styles.disabledNavArrow]}>‹</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.navButton, currentMonthIndex === 11 && styles.disabledNavButton]}
                  onPress={handleNextMonth}
                  disabled={currentMonthIndex === 11}
                >
                  <Text style={[styles.navArrow, currentMonthIndex === 11 && styles.disabledNavArrow]}>›</Text>
                </TouchableOpacity>
              </View>
    </View>

            <View style={styles.calendarGrid}>
              <View style={styles.weekDays}>
                <Text style={styles.weekDay}>S</Text>
                <Text style={styles.weekDay}>M</Text>
                <Text style={styles.weekDay}>T</Text>
                <Text style={styles.weekDay}>W</Text>
                <Text style={styles.weekDay}>T</Text>
                <Text style={styles.weekDay}>F</Text>
                <Text style={styles.weekDay}>S</Text>
              </View>
              
              <View style={styles.datesGrid}>
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((date) => (
                  <TouchableOpacity
                    key={date}
                    style={[
                      styles.dateCell,
                      date >= selectedStartDate && date <= selectedEndDate && styles.selectedDateCell,
                      date === selectedStartDate && styles.startDateCell,
                      date === selectedEndDate && styles.endDateCell,
                    ]}
                    onPress={() => handleDatePress(date)}
                  >
                    <Text style={[
                      styles.dateText,
                      date >= selectedStartDate && date <= selectedEndDate && styles.selectedDateText,
                      date === selectedStartDate && styles.startDateText,
                      date === selectedEndDate && styles.endDateText,
                    ]}>
                      {date}
        </Text>
                  </TouchableOpacity>
                ))}
              </View>
      </View>

            <View style={styles.calendarActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={handleCancelPress}
              >
                <Text style={styles.cancelButtonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.okButton}
                onPress={handleOKPress}
              >
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderFilterModal = () => {
    const filterTabs = ['Order status', 'Order type', 'Ratings'];
    
    return (
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseFilterModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModal}>
            {/* Header */}
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Filters</Text>
              <TouchableOpacity onPress={handleCloseFilterModal}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
          </View>

            {/* Content */}
            <View style={styles.filterContent}>
              {/* Left Tabs */}
              <View style={styles.filterTabs}>
                {filterTabs.map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={[
                      styles.filterTab,
                      activeFilterTab === tab && styles.activeFilterTab
                    ]}
                    onPress={() => handleFilterTabPress(tab)}
                  >
                    <Text style={[
                      styles.filterTabText,
                      activeFilterTab === tab && styles.activeFilterTabText
                    ]}>
                      {tab}
            </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Right Content */}
              <View style={styles.filterOptions}>
                {activeFilterTab === 'Order status' && (
                  <View>
                    {Object.entries({
                      preparing: 'Preparing',
                      ready: 'Ready',
                      pickedUp: 'Picked up',
                      delivered: 'Delivered',
                      timedOut: 'Timed out',
                      rejected: 'Rejected'
                    }).map(([key, label]) => (
                      <TouchableOpacity
                        key={key}
                        style={styles.filterOption}
                        onPress={() => handleOrderStatusToggle(key)}
                      >
                        <View style={[
                          styles.checkbox,
                          orderStatusFilters[key as keyof typeof orderStatusFilters] && styles.checkedCheckbox
                        ]}>
                          {orderStatusFilters[key as keyof typeof orderStatusFilters] && (
                            <Text style={styles.checkmark}>✓</Text>
                          )}
                        </View>
                        <Text style={styles.filterOptionText}>{label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
          </View>

            {/* Bottom Actions */}
            <View style={styles.filterActions}>
              <TouchableOpacity 
                style={styles.clearAllButton}
                onPress={handleClearAllFilters}
              >
                <Text style={styles.clearAllText}>Clear all</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={handleApplyFilters}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
          </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={styles.filterDropdown}
            onPress={() => setShowCalendar(true)}
          >
            <Text style={styles.filterText}>{selectedPeriod}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.filterDropdown}
            onPress={handleFilterPress}
          >
            <Text style={styles.filterText}>{selectedFilter}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Order List */}
      <FlatList
        data={pastOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ordersList}
      />

      {/* Calendar Popup */}
      {renderCalendarPopup()}
      
      {/* Filter Modal */}
      {renderFilterModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Design System Colors
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // gray.50
  },
  
  // Filters Section - Following Design System
  filtersContainer: {
    backgroundColor: '#FFFFFF', // background.paper
    paddingHorizontal: 20, // SPACING.xl
    paddingVertical: 12, // SPACING.md
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // gray.300
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // gray.100
    paddingHorizontal: 16, // SPACING.lg
    paddingVertical: 8, // SPACING.sm
    borderRadius: 8, // BORDER_RADIUS.md
    marginRight: 12, // SPACING.md
    minHeight: 44, // BUTTON_HEIGHTS.medium
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterText: {
    fontSize: 14, // FONT_SIZES.md
    color: '#424242', // gray.800
    marginRight: 8, // SPACING.sm
    fontWeight: '500', // Medium
  },
  dropdownArrow: {
    fontSize: 12, // FONT_SIZES.sm
    color: '#9E9E9E', // gray.500
  },
  // Orders List Section - Following Design System
  ordersList: {
    paddingHorizontal: 16, // SPACING.lg
    paddingVertical: 16, // SPACING.lg
  },
  orderCard: {
    backgroundColor: '#FFFFFF', // background.paper
    borderRadius: 12, // BORDER_RADIUS.lg
    padding: 16, // SPACING.lg
    marginBottom: 12, // SPACING.md
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0', // gray.300
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12, // SPACING.md
  },
  orderStatus: {
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8, // SPACING.sm
    paddingVertical: 4, // SPACING.xs
    borderRadius: 6, // BORDER_RADIUS.sm
    alignSelf: 'flex-start',
  },
  deliveredBadge: {
    backgroundColor: '#4CAF50', // success.main
  },
  rejectedBadge: {
    backgroundColor: '#F44336', // error.main
  },
  statusText: {
    fontSize: 12, // FONT_SIZES.sm
    fontWeight: '600', // Semi-Bold
  },
  deliveredText: {
    color: '#FFFFFF', // text.inverse
  },
  rejectedText: {
    color: '#FFFFFF', // text.inverse
  },
  timestamp: {
    fontSize: 12, // FONT_SIZES.sm
    color: '#9E9E9E', // gray.500
  },
  orderInfo: {
    marginBottom: 12,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  customerInfo: {
    fontSize: 14,
    color: '#374151',
  },
  itemsSection: {
    marginBottom: 12,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  priceSection: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  warningSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  warningText: {
    fontSize: 12,
    color: '#DC2626',
  },
  rejectionSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  rejectionText: {
    fontSize: 12,
    color: '#DC2626',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarPopup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    maxWidth: 350,
  },
  selectRangeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
    textAlign: 'center',
    marginBottom: 8,
  },
  dateRangeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
    textAlign: 'center',
    marginBottom: 20,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  monthArrow: {
    fontSize: 12,
    color: '#6B7280',
  },
  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  navArrow: {
    fontSize: 18,
    color: '#2563EB',
  },
  disabledNavButton: {
    opacity: 0.3,
  },
  disabledNavArrow: {
    color: '#9CA3AF',
  },
  calendarGrid: {
    marginBottom: 20,
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateCell: {
    width: '14.28%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  selectedDateCell: {
    backgroundColor: '#DBEAFE',
  },
  startDateCell: {
    backgroundColor: '#2563EB',
    borderRadius: 18,
  },
  endDateCell: {
    backgroundColor: '#2563EB',
    borderRadius: 18,
  },
  dateText: {
    fontSize: 14,
    color: '#111827',
  },
  selectedDateText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  startDateText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  endDateText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  calendarActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
    textAlign: 'center',
  },
  okButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
  },
  okButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
    textAlign: 'center',
  },
  // Filter Modal Styles
  filterModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '80%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeIcon: {
    fontSize: 20,
    color: '#6B7280',
    fontWeight: '600',
  },
  filterContent: {
    flexDirection: 'row',
    flex: 1,
  },
  filterTabs: {
    width: 120,
    backgroundColor: '#F9FAFB',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  filterTab: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  activeFilterTab: {
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#2563EB',
  },
  filterTabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeFilterTabText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  filterOptions: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#2563EB',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  clearAllButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  clearAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  applyButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default OrderHistoryScreen;