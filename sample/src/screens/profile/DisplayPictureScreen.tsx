import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

const DisplayPictureScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.messageText}>
            To get your restaurant's display picture updated, please write to us.
          </Text>
          
          {/* Ticket Link */}
          <TouchableOpacity style={styles.ticketLink}>
            <Text style={styles.ticketIcon}>📄</Text>
            <Text style={styles.ticketText}>Raise a ticket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Feedback Section */}
      <View style={styles.feedbackSection}>
        <Text style={styles.feedbackQuestion}>
          Was this helpful in resolving your query?
        </Text>
        
        <View style={styles.feedbackButtons}>
          <TouchableOpacity style={styles.positiveButton}>
            <Text style={styles.positiveIcon}>👍</Text>
            <Text style={styles.positiveText}>Yes, thank you</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.negativeButton}>
            <Text style={styles.negativeIcon}>👎</Text>
            <Text style={styles.negativeText}>Not helpful</Text>
          </TouchableOpacity>
        </View>
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
  
  // Main Content
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  messageText: {
    fontSize: 16,
    color: '#212121',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  ticketLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  ticketIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  ticketText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  // Feedback Section
  feedbackSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  feedbackQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 16,
  },
  feedbackButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  positiveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1976D2',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  positiveIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  positiveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
  },
  negativeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1976D2',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  negativeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  negativeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
  },
});

export default DisplayPictureScreen; 