import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

const FSSAIScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* FSSAI Details Card */}
        <View style={styles.fssaiCard}>
          {/* FSSAI Registration Number */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>FSSAI registration number</Text>
            <Text style={styles.registrationNumber}>20125132000401</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Document Section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Document</Text>
            <View style={styles.documentContainer}>
              <Text style={styles.documentName}>21781923.pdf</Text>
              <TouchableOpacity style={styles.downloadButton}>
                <Text style={styles.downloadIcon}>↓</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Valid Up To Section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Valid up to</Text>
            <Text style={styles.validityDate}>04-03-2026</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update FSSAI license</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  

  
  // Content Section
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  
  // FSSAI Card
  fssaiCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  registrationNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  documentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  documentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
  },
  downloadButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadIcon: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '600',
  },
  validityDate: {
    fontSize: 16,
    fontWeight: '500',
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
  updateButton: {
    backgroundColor: '#212121',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default FSSAIScreen; 