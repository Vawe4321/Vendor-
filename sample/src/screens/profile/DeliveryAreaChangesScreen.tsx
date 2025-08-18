import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';

const DeliveryAreaChangesScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Illustration Section */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/images/image.png')}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.mainText}>
            You can not modify the delivery areas of your restaurant
          </Text>
          <Text style={styles.descriptionText}>
            Delivery area is defined by the appropriate distance our delivery partners can travel to deliver your orders in time. This can vary basis the time of the day or external conditions like rain etc.
          </Text>
        </View>

        {/* Feedback Section */}
        <View style={styles.feedbackSection}>
          <Text style={styles.feedbackQuestion}>
            Was this helpful in resolving your query?
          </Text>
          <View style={styles.feedbackButtons}>
            <TouchableOpacity style={styles.yesButton}>
              <Text style={styles.yesButtonText}>👍 Yes, thank you</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.noButton}>
              <Text style={styles.noButtonText}>👎 Not helpful</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  
  // Illustration Section
  illustrationContainer: {
    height: 200,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  
  // Content Section
  contentSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    lineHeight: 24,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  
  // Feedback Section
  feedbackSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 20,
  },
  feedbackQuestion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 16,
  },
  feedbackButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yesButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1E90FF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    alignItems: 'center',
  },
  yesButtonText: {
    color: '#1E90FF',
    fontSize: 14,
    fontWeight: '500',
  },
  noButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1E90FF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginLeft: 8,
    alignItems: 'center',
  },
  noButtonText: {
    color: '#1E90FF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default DeliveryAreaChangesScreen; 