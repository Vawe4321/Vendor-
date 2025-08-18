import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { mockAccountingData } from '../../utils/mockData';

const InvoicesScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleInvoicePress = (invoice: any) => {
    Alert.alert(
      'Invoice Details',
      `Invoice Number: ${invoice.invoiceNumber}\n` +
      `Amount: ${invoice.amount}\n` +
      `Status: ${invoice.status}\n` +
      `Issue Date: ${new Date(invoice.issueDate).toLocaleDateString()}\n` +
      `Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}\n` +
      `Description: ${invoice.description}`,
      [{ text: 'OK' }]
    );
  };

  const handleDownloadPress = (invoice: any) => {
    Alert.alert('Download', `Downloading invoice ${invoice.invoiceNumber}`);
  };

  const filteredInvoices = selectedFilter === 'all' 
    ? mockAccountingData.invoices.recentInvoices
    : mockAccountingData.invoices.recentInvoices.filter(invoice => 
        selectedFilter === 'paid' ? invoice.status === 'PAID' : invoice.status === 'PENDING'
      );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invoices</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Invoiced</Text>
            <Text style={styles.summaryAmount}>{mockAccountingData.invoices.currentMonth.totalInvoiced}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Paid</Text>
            <Text style={styles.summaryAmount}>{mockAccountingData.invoices.currentMonth.totalPaid}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Pending</Text>
            <Text style={[styles.summaryAmount, styles.pendingAmount]}>{mockAccountingData.invoices.currentMonth.pendingAmount}</Text>
          </View>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, selectedFilter === 'all' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.filterText, selectedFilter === 'all' && styles.filterTextActive]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, selectedFilter === 'paid' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('paid')}
          >
            <Text style={[styles.filterText, selectedFilter === 'paid' && styles.filterTextActive]}>Paid</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, selectedFilter === 'pending' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('pending')}
          >
            <Text style={[styles.filterText, selectedFilter === 'pending' && styles.filterTextActive]}>Pending</Text>
          </TouchableOpacity>
        </View>

        {/* Invoices List */}
        <View style={styles.invoicesContainer}>
          <Text style={styles.sectionTitle}>Recent Invoices</Text>
          
          {filteredInvoices.map((invoice) => (
            <TouchableOpacity 
              key={invoice.id} 
              style={styles.invoiceCard}
              onPress={() => handleInvoicePress(invoice)}
            >
              <View style={styles.invoiceHeader}>
                <View style={styles.invoiceLeft}>
                  <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
                  <Text style={styles.invoiceDescription}>{invoice.description}</Text>
                </View>
                <View style={styles.invoiceRight}>
                  <Text style={styles.invoiceAmount}>{invoice.amount}</Text>
                  <View style={[
                    styles.statusBadge,
                    invoice.status === 'PAID' ? styles.statusPaid : styles.statusPending
                  ]}>
                    <Text style={[
                      styles.statusText,
                      invoice.status === 'PAID' ? styles.statusTextPaid : styles.statusTextPending
                    ]}>
                      {invoice.status}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.invoiceDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Issue Date:</Text>
                  <Text style={styles.detailValue}>{new Date(invoice.issueDate).toLocaleDateString()}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Due Date:</Text>
                  <Text style={styles.detailValue}>{new Date(invoice.dueDate).toLocaleDateString()}</Text>
                </View>
                {invoice.paidDate && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Paid Date:</Text>
                    <Text style={styles.detailValue}>{new Date(invoice.paidDate).toLocaleDateString()}</Text>
                  </View>
                )}
              </View>
              
              <TouchableOpacity 
                style={styles.downloadButton}
                onPress={() => handleDownloadPress(invoice)}
              >
                <Icon name="download" size={16} color="#2196F3" />
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            </TouchableOpacity>
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
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  pendingAmount: {
    color: '#FF9800',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterButtonActive: {
    backgroundColor: '#2196F3',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  invoicesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  invoiceCard: {
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
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  invoiceLeft: {
    flex: 1,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  invoiceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  invoiceRight: {
    alignItems: 'flex-end',
  },
  invoiceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPaid: {
    backgroundColor: '#E8F5E8',
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextPaid: {
    color: '#4CAF50',
  },
  statusTextPending: {
    color: '#FF9800',
  },
  invoiceDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  downloadText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
    marginLeft: 5,
  },
});

export default InvoicesScreen;
