import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

const BankDetailsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Account Information Section */}
        <View style={styles.accountSection}>
          <Text style={styles.sectionTitle}>Account information</Text>
          <Text style={styles.lastUpdated}>Last updated on 6 Mar, 2025</Text>
          
          {/* Account Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Beneficiary name</Text>
              <Text style={styles.detailValue}>Mr. VALLAMSETTY NAVEEN</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Account number</Text>
              <Text style={styles.detailValue}>20382697153</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>IFSC code</Text>
              <Text style={styles.detailValue}>SBIN0001881</Text>
            </View>
          </View>
        </View>

        {/* Issue Prompt */}
        <View style={styles.issueSection}>
          <Text style={styles.issueText}>Have any issue related to bank details?</Text>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit bank details</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  

  
  // Content Section
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  
  // Account Information Section
  accountSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 16,
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  detailLabel: {
    fontSize: 14,
    color: '#757575',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    textAlign: 'right',
    flex: 1,
  },
  
  // Issue Section
  issueSection: {
    marginBottom: 24,
  },
  issueText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
  },
  
  // Bottom Action Button
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  editButton: {
    backgroundColor: '#1976D2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default BankDetailsScreen; 