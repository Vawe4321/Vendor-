import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SmartLinkScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedDateRange, setSelectedDateRange] = useState('15th Jul to 30th Jul');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState('Jul 15, 2025');
  const [endDate, setEndDate] = useState('Jul 30, 2025');
  const [currentMonth, setCurrentMonth] = useState('July');
  const [currentYear, setCurrentYear] = useState('2025');
  const [selectedStartDay, setSelectedStartDay] = useState(15);
  const [selectedEndDay, setSelectedEndDay] = useState(30);
  const [tempStartDay, setTempStartDay] = useState(15);
  const [tempEndDay, setTempEndDay] = useState(30);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);

  // Calendar navigation functions
  const navigateMonth = (direction: 'prev' | 'next') => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonthIndex = months.indexOf(currentMonth);
    let newMonthIndex = direction === 'next' ? currentMonthIndex + 1 : currentMonthIndex - 1;
    
    if (newMonthIndex >= 12) {
      newMonthIndex = 0;
      setCurrentYear(prev => (parseInt(prev) + 1).toString());
    } else if (newMonthIndex < 0) {
      newMonthIndex = 11;
      setCurrentYear(prev => (parseInt(prev) - 1).toString());
    }
    
    setCurrentMonth(months[newMonthIndex]);
  };

  // Date selection functions
  const handleDateSelect = (day: number) => {
    if (!isSelectingEnd) {
      // Selecting start date
      setTempStartDay(day);
      setTempEndDay(day);
      setIsSelectingEnd(true);
    } else {
      // Selecting end date
      if (day >= tempStartDay) {
        setTempEndDay(day);
      } else {
        // If end date is before start date, swap them
        setTempEndDay(tempStartDay);
        setTempStartDay(day);
      }
      setIsSelectingEnd(false);
    }
  };

  // Apply date selection
  const applyDateSelection = () => {
    setSelectedStartDay(tempStartDay);
    setSelectedEndDay(tempEndDay);
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'].indexOf(currentMonth);
    
    const newStartDate = `${months[monthIndex]} ${tempStartDay}, ${currentYear}`;
    const newEndDate = `${months[monthIndex]} ${tempEndDay}, ${currentYear}`;
    
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setSelectedDateRange(`${tempStartDay}th ${months[monthIndex]} to ${tempEndDay}th ${months[monthIndex]}`);
    setShowDatePicker(false);
  };

  // Get calendar days for current month
  const getCalendarDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(parseInt(currentYear), 
      ['January', 'February', 'March', 'April', 'May', 'June', 
       'July', 'August', 'September', 'October', 'November', 'December'].indexOf(currentMonth), 1);
    const lastDayOfMonth = new Date(parseInt(currentYear), 
      ['January', 'February', 'March', 'April', 'May', 'June', 
       'July', 'August', 'September', 'October', 'November', 'December'].indexOf(currentMonth) + 1, 0);
    
    const startDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();
    
    // Previous month days
    const prevMonthDays = new Date(parseInt(currentYear), 
      ['January', 'February', 'March', 'April', 'May', 'June', 
       'July', 'August', 'September', 'October', 'November', 'December'].indexOf(currentMonth), 0).getDate();
    
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrentMonth: false });
    }
    
    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }
    
    // Next month days
    const remainingSlots = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingSlots; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }
    
    return days;
  };

  // Get day style based on selection
  const getDayStyle = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return styles.otherMonthDay;
    if (day === tempStartDay) return styles.selectedStartDay;
    if (day === tempEndDay) return styles.selectedEndDay;
    if (day >= tempStartDay && day <= tempEndDay) return styles.selectedRangeDay;
    return styles.currentMonthDay;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with gradient background */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Partner Smart Link</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Description */}
        <Text style={styles.headerDescription}>
          Share your links effortlessly across all your favorite platforms like WhatsApp, Facebook, and Instagram with Zomato Partners Smart Link.
        </Text>

        {/* Restaurant Information Card */}
        <View style={styles.restaurantCard}>
          <View style={styles.restaurantInfo}>
            <Image 
              source={require('../../assets/images/Groosologo.jpeg')}
              style={styles.restaurantImage}
            />
            <Text style={styles.restaurantName}>Grooso's Kitchen</Text>
          </View>
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Purpose/Channel Dropdown */}
        <View style={styles.dropdownSection}>
          <Text style={styles.dropdownLabel}>Purpose/Channel</Text>
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownText}>Default social media link</Text>
            <Icon name="keyboard-arrow-down" size={24} color="#666" />
          </View>
        </View>

        {/* Smart Link Display */}
        <View style={styles.smartLinkSection}>
          <Text style={styles.smartLinkLabel}>Smart Link</Text>
          <View style={styles.smartLinkContainer}>
            <Icon name="link" size={20} color="#007AFF" />
            <Text style={styles.smartLinkText}>https://link.grooso.com/xqzv/rst</Text>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Smart Link Performance Section */}
        <View style={styles.performanceSection}>
          <Text style={styles.sectionTitle}>SMART LINK PERFORMANCE</Text>
          <Text style={styles.sectionSubtitle}>
            Monitor the performance of your default social media smart link
          </Text>

          {/* Date Range Selector */}
          <TouchableOpacity 
            style={styles.dateRangeContainer}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateRangeText}>Selected: {selectedDateRange}</Text>
            <Icon name="keyboard-arrow-up" size={20} color="#666" />
          </TouchableOpacity>

          {/* Conversion Funnel Card */}
          <View style={styles.performanceCard}>
            <Text style={styles.cardTitle}>Conversion funnel</Text>
            <Text style={styles.cardDescription}>
              Customers who have visited and ordered from Grooso app using your smart link
            </Text>
            <View style={styles.metricsContainer}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Menu visits</Text>
                <Text style={styles.metricValue}>0</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Number of orders</Text>
                <Text style={styles.metricValue}>0</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Menu to cart</Text>
                <Text style={styles.metricValue}>-</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Cart to order</Text>
                <Text style={styles.metricValue}>-</Text>
              </View>
            </View>
          </View>

          {/* Menu Visit by Customer Type Card */}
          <View style={styles.performanceCard}>
            <Text style={styles.cardTitle}>Menu visit by customer type</Text>
            
            {/* New Customers */}
            <View style={styles.customerTypeSection}>
              <Text style={styles.customerTypeTitle}>New Customers</Text>
              <Text style={styles.customerTypeDescription}>
                Customers on Grooso who have not placed an order at your restaurant/restaurants previously
              </Text>
              <View style={styles.metricsContainer}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Menu visits</Text>
                  <Text style={styles.metricValue}>0</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Number of orders</Text>
                  <Text style={styles.metricValue}>0</Text>
                </View>
              </View>
            </View>

            {/* Repeat Customers */}
            <View style={styles.customerTypeSection}>
              <Text style={styles.customerTypeTitle}>Repeat Customers</Text>
              <Text style={styles.customerTypeDescription}>
                Customers on Grooso who have placed an order at your restaurant/restaurants previously
              </Text>
              <View style={styles.metricsContainer}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Menu visits</Text>
                  <Text style={styles.metricValue}>0</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Number of orders</Text>
                  <Text style={styles.metricValue}>0</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Unserviceable Menu Visits Card */}
          <View style={styles.performanceCard}>
            <Text style={styles.cardTitle}>Unserviceable menu visits</Text>
            <Text style={styles.cardDescription}>
              Customers who clicked on your link when your restaurant wasn't operational or was outside their delivery area
            </Text>
            <Text style={styles.unserviceableValue}>0</Text>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>FEATURES</Text>
          
          <View style={styles.featureItem}>
            <Icon name="search" size={24} color="#007AFF" style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Smart Tracking</Text>
              <Text style={styles.featureDescription}>
                Gain valuable insights into clicks, engagement, and conversion rates to achieve your goals
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Icon name="share" size={24} color="#007AFF" style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Sharing Across Platforms</Text>
              <Text style={styles.featureDescription}>
                Share your links effortlessly across various platforms.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Icon name="link" size={24} color="#007AFF" style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Chain Sharing Availability</Text>
              <Text style={styles.featureDescription}>
                Smart links allow you to share your chain
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.datePickerModal}>
            {/* Date Input Fields */}
            <View style={styles.dateInputContainer}>
              <TouchableOpacity style={styles.dateInputField}>
                <Text style={styles.dateInputText}>{startDate}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dateInputField}>
                <Text style={styles.dateInputText}>{endDate}</Text>
              </TouchableOpacity>
            </View>

            {/* Calendar Navigation */}
            <View style={styles.calendarHeader}>
              <TouchableOpacity 
                style={styles.navButton}
                onPress={() => navigateMonth('prev')}
              >
                <Icon name="keyboard-arrow-left" size={24} color="#666" />
              </TouchableOpacity>
              <Text style={styles.calendarTitle}>{currentMonth}</Text>
              <Text style={styles.calendarYear}>{currentYear}</Text>
              <TouchableOpacity 
                style={styles.navButton}
                onPress={() => navigateMonth('next')}
              >
                <Icon name="keyboard-arrow-right" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Days of Week */}
            <View style={styles.daysOfWeek}>
              <Text style={styles.dayHeader}>Sun</Text>
              <Text style={styles.dayHeader}>Mon</Text>
              <Text style={styles.dayHeader}>Tue</Text>
              <Text style={styles.dayHeader}>Wed</Text>
              <Text style={styles.dayHeader}>Thu</Text>
              <Text style={styles.dayHeader}>Fri</Text>
              <Text style={styles.dayHeader}>Sat</Text>
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarGrid}>
              {getCalendarDays().map(({ day, isCurrentMonth }, index) => (
                <TouchableOpacity
                  key={index}
                  style={getDayStyle(day, isCurrentMonth)}
                  onPress={() => isCurrentMonth && handleDateSelect(day)}
                  disabled={!isCurrentMonth}
                >
                  <Text style={[
                    getDayStyle(day, isCurrentMonth) === styles.selectedStartDay || 
                    getDayStyle(day, isCurrentMonth) === styles.selectedEndDay
                      ? styles.selectedDayText
                      : getDayStyle(day, isCurrentMonth) === styles.otherMonthDay
                      ? styles.otherMonthDayText
                      : styles.currentMonthDayText
                  ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Apply Button */}
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={applyDateSelection}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#4A90E2',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  headerSpacer: {
    width: 44,
  },
  content: {
    flex: 1,
  },
  headerDescription: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: '#4A90E2',
  },
  restaurantCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
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
  restaurantImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  changeButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  dropdownSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  smartLinkSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  smartLinkLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  smartLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smartLinkText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  shareButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  performanceSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dateRangeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  performanceCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  customerTypeSection: {
    marginBottom: 20,
  },
  customerTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  customerTypeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  unserviceableValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
  featuresSection: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureIcon: {
    marginRight: 16,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  // Date Picker Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  datePickerModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 400,
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateInputField: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flex: 0.48,
  },
  dateInputText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    padding: 8,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  calendarYear: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  daysOfWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  dayHeader: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  otherMonthDay: {
    fontSize: 16,
    color: '#ccc',
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  currentMonthDay: {
    fontSize: 16,
    color: '#333',
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  selectedStartDay: {
    fontSize: 16,
    color: '#fff',
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 20,
    fontWeight: 'bold',
  },
  selectedEndDay: {
    fontSize: 16,
    color: '#fff',
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 20,
    fontWeight: 'bold',
  },
  selectedRangeDay: {
    fontSize: 16,
    color: '#333',
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 20,
  },
  selectedDayText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  otherMonthDayText: {
    fontSize: 16,
    color: '#ccc',
  },
  currentMonthDayText: {
    fontSize: 16,
    color: '#333',
  },
  applyButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  applyButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default SmartLinkScreen; 