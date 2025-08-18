import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

const SupportScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Support</Text>
      </View>

      {/* Support Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Contact Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          
          <TouchableOpacity style={styles.supportItem}>
            <Text style={styles.supportIcon}>📞</Text>
            <View style={styles.supportText}>
              <Text style={styles.supportTitle}>Call Support</Text>
              <Text style={styles.supportDescription}>+91 1800-123-4567</Text>
            </View>
            <Text style={styles.supportArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportItem}>
            <Text style={styles.supportIcon}>💬</Text>
            <View style={styles.supportText}>
              <Text style={styles.supportTitle}>Live Chat</Text>
              <Text style={styles.supportDescription}>Chat with our support team</Text>
            </View>
            <Text style={styles.supportArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportItem}>
            <Text style={styles.supportIcon}>📧</Text>
            <View style={styles.supportText}>
              <Text style={styles.supportTitle}>Email Support</Text>
              <Text style={styles.supportDescription}>support@grooso.com</Text>
            </View>
            <Text style={styles.supportArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Help Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help Topics</Text>
          
          <TouchableOpacity style={styles.supportItem}>
            <Text style={styles.supportIcon}>❓</Text>
            <View style={styles.supportText}>
              <Text style={styles.supportTitle}>FAQ</Text>
              <Text style={styles.supportDescription}>Frequently asked questions</Text>
            </View>
            <Text style={styles.supportArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportItem}>
            <Text style={styles.supportIcon}>📖</Text>
            <View style={styles.supportText}>
              <Text style={styles.supportTitle}>User Guide</Text>
              <Text style={styles.supportDescription}>How to use the app</Text>
            </View>
            <Text style={styles.supportArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportItem}>
            <Text style={styles.supportIcon}>🔧</Text>
            <View style={styles.supportText}>
              <Text style={styles.supportTitle}>Troubleshooting</Text>
              <Text style={styles.supportDescription}>Common issues and solutions</Text>
            </View>
            <Text style={styles.supportArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Business Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Hours</Text>
          <View style={styles.businessHours}>
            <Text style={styles.hoursText}>Monday - Friday: 9:00 AM - 6:00 PM</Text>
            <Text style={styles.hoursText}>Saturday: 10:00 AM - 4:00 PM</Text>
            <Text style={styles.hoursText}>Sunday: Closed</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Design System Colors
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // gray.50
  },
  
  // Header Section - Following Design System
  header: {
    backgroundColor: '#FFFFFF', // background.paper
    paddingHorizontal: 20, // SPACING.xl
    paddingVertical: 15, // SPACING.lg
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // gray.300
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20, // FONT_SIZES.xxl
    fontWeight: '700', // Bold
    color: '#212121', // text.primary
    textAlign: 'center',
  },
  
  // Content Section - Following Design System
  content: {
    flex: 1,
    paddingHorizontal: 20, // SPACING.xl
    paddingVertical: 16, // SPACING.lg
  },
  
  // Section - Following Design System
  section: {
    backgroundColor: '#FFFFFF', // background.paper
    borderRadius: 12, // BORDER_RADIUS.lg
    marginBottom: 24, // SPACING.xxl
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0', // gray.300
  },
  sectionTitle: {
    fontSize: 16, // FONT_SIZES.lg
    fontWeight: '600', // Semi-Bold
    color: '#212121', // text.primary
    paddingHorizontal: 20, // SPACING.xl
    paddingVertical: 16, // SPACING.lg
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5', // gray.100
  },
  
  // Support Item - Following Design System
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20, // SPACING.xl
    paddingVertical: 16, // SPACING.lg
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5', // gray.100
    minHeight: 44, // BUTTON_HEIGHTS.medium
  },
  supportIcon: {
    fontSize: 20, // FONT_SIZES.lg
    marginRight: 16, // SPACING.lg
    width: 24,
    textAlign: 'center',
  },
  supportText: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16, // FONT_SIZES.lg
    fontWeight: '500', // Medium
    color: '#212121', // text.primary
    marginBottom: 2, // SPACING.xs
  },
  supportDescription: {
    fontSize: 14, // FONT_SIZES.md
    color: '#757575', // text.secondary
  },
  supportArrow: {
    fontSize: 18, // FONT_SIZES.lg
    color: '#9E9E9E', // gray.500
    fontWeight: '600', // Semi-Bold
  },
  
  // Business Hours - Following Design System
  businessHours: {
    paddingHorizontal: 20, // SPACING.xl
    paddingVertical: 16, // SPACING.lg
  },
  hoursText: {
    fontSize: 14, // FONT_SIZES.md
    color: '#757575', // text.secondary
    marginBottom: 8, // SPACING.sm
  },
});

export default SupportScreen;