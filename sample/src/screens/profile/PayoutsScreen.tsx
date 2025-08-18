import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { mockAccountingData } from '../../utils/mockData';

const PayoutsScreen = () => {
  const navigation = useNavigation();
  const [selectedDateRange, setSelectedDateRange] = useState('27 Jun - 27 Jul, 25');
  
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSendToEmailPress = () => {
    Alert.alert('Email Sent', 'Payout details have been sent to your registered email address.');
  };

  const handleDateRangePress = () => {
    Alert.alert('Date Range', 'Select date range for payout history');
  };

  const handleShowBreakupPress = (cycleId: string) => {
    const cycle = cycleId === 'current' 
      ? mockAccountingData.payouts.currentCycle 
      : mockAccountingData.payouts.pastCycles.find(c => c.id === cycleId);
    
    if (cycle) {
      Alert.alert(
        'Payout Breakdown',
        `Gross Amount: ${cycle.breakdown.grossAmount}\n` +
        `Commission: ${cycle.breakdown.commission}\n` +
        `Delivery Fee: ${cycle.breakdown.deliveryFee}\n` +
        `Net Payout: ${cycle.breakdown.netPayout}`,
        [{ text: 'OK' }]
      );
    }
  };

  const currentCycle = mockAccountingData.payouts.currentCycle;
  const pastCycles = mockAccountingData.payouts.pastCycles;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payouts</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Cycle Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current cycle</Text>
          <Text style={styles.cycleDescription}>
            Payouts are credited to your account every Wednesday by 9 PM for all transactions from the previous Monday-Sunday
          </Text>
          
          <View style={styles.currentCycleCard}>
            <View style={styles.payoutRow}>
              <View style={styles.payoutLeft}>
                <Text style={styles.payoutLabel}>Net payout</Text>
                <Text style={styles.payoutAmount}>{currentCycle.netPayout}</Text>
              </View>
              <Text style={styles.ordersCount}>{currentCycle.orders}</Text>
            </View>
            
            <View style={styles.cycleRow}>
              <View style={styles.cycleLeft}>
                <Text style={styles.cycleLabel}>Payout cycle</Text>
                <Text style={styles.cycleValue}>{currentCycle.payoutCycle}</Text>
              </View>
              <View style={styles.cycleRight}>
                <Text style={styles.cycleLabel}>Est. Payout date</Text>
                <Text style={styles.cycleValue}>{currentCycle.estimatedPayoutDate}</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.showBreakupButton}
              onPress={() => handleShowBreakupPress('current')}
            >
              <Text style={styles.showBreakupText}>Show breakup</Text>
              <Icon name="chevron-right" size={20} color="#2196F3" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Past Cycles Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past cycles</Text>
          
          <View style={styles.pastCyclesHeader}>
            <TouchableOpacity style={styles.sendToEmailButton} onPress={handleSendToEmailPress}>
              <Icon name="email" size={20} color="#2196F3" />
              <Text style={styles.sendToEmailText}>Send to email</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.dateRangeButton} onPress={handleDateRangePress}>
              <Text style={styles.dateRangeText}>{selectedDateRange}</Text>
              <Icon name="keyboard-arrow-down" size={20} color="#2196F3" />
            </TouchableOpacity>
          </View>

          {pastCycles.map((cycle) => (
            <View key={cycle.id} style={styles.pastCycleCard}>
              <View style={styles.payoutRow}>
                <View style={styles.payoutLeft}>
                  <Text style={styles.payoutLabel}>Net payout</Text>
                  <Text style={styles.payoutAmount}>{cycle.netPayout}</Text>
                </View>
                <View style={styles.statusContainer}>
                  <Text style={styles.statusLabel}>Status</Text>
                  <Text style={styles.statusText}>{cycle.status}</Text>
                </View>
              </View>
              
              <View style={styles.cycleRow}>
                <View style={styles.cycleLeft}>
                  <Text style={styles.cycleLabel}>Payout cycle</Text>
                  <Text style={styles.cycleValue}>{cycle.payoutCycle}</Text>
                </View>
                <View style={styles.cycleRight}>
                  <Text style={styles.cycleLabel}>Payout date</Text>
                  <Text style={styles.cycleValue}>{cycle.payoutDate}</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.showBreakupButton}
                onPress={() => handleShowBreakupPress(cycle.id)}
              >
                <Text style={styles.showBreakupText}>Show breakup</Text>
                <Icon name="chevron-right" size={20} color="#2196F3" />
              </TouchableOpacity>
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
  headerSpacer: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  cycleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  currentCycleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  pastCycleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  payoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  payoutLeft: {
    flex: 1,
  },
  payoutLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  payoutAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  ordersCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  cycleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cycleLeft: {
    flex: 1,
  },
  cycleRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  cycleLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cycleValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  showBreakupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showBreakupText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '500',
    marginRight: 4,
  },
  pastCyclesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sendToEmailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendToEmailText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
    marginLeft: 8,
  },
  dateRangeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  dateRangeText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
    marginRight: 8,
  },
});

export default PayoutsScreen; 