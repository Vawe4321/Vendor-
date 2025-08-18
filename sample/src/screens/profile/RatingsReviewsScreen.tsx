import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';

const RatingsReviewsScreen: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const faqItems = [
    {
      question: "How is my restaurant's rating calculated",
      answer: "Your restaurant rating is calculated based on customer feedback received after each order. The rating considers factors like food quality, delivery time, packaging, and overall customer satisfaction. The final rating is an average of all ratings received in the last 30 days."
    },
    {
      question: "Why am I not getting rating on all orders",
      answer: "Not all customers leave ratings after their orders. This is normal behavior as rating is optional. On average, about 30-40% of customers provide ratings. To encourage more ratings, ensure excellent service quality and timely delivery."
    },
    {
      question: "Can I call customer to discuss rating",
      answer: "No, you cannot directly call customers to discuss ratings. This is to protect customer privacy. However, you can respond to reviews through the app, and if you believe a rating is unfair, you can raise a concern through our support system."
    },
    {
      question: "How to raise a concern if I think rating was bad due to delivery partner",
      answer: "If you believe a low rating was due to delivery partner issues, you can raise a concern through the 'Support' section. Provide order details, delivery time, and specific issues. Our team will investigate and may adjust the rating if delivery issues are confirmed."
    },
    {
      question: "What if I don't agree with the rating",
      answer: "If you disagree with a rating, you can appeal through the support system. Provide evidence of good service quality, photos of the food, and any relevant documentation. Our team will review your case and may adjust the rating if justified."
    },
    {
      question: "How can I reply on a customer review",
      answer: "You can reply to customer reviews through the 'Reviews' section in your dashboard. Click on any review and use the 'Reply' button to respond professionally. Keep responses courteous and address any concerns raised by the customer."
    }
  ];

  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Promotional Section */}
        <View style={styles.promotionalSection}>
          <View style={styles.phoneContainer}>
            <View style={styles.phoneOutline}>
                             <View style={styles.foodImageContainer}>
                 <Image 
                   source={{ uri: 'https://images.unsplash.com/photo-1504674900240-9c3c3c414635?w=200&h=150&fit=crop&crop=center' }}
                   style={styles.foodImage}
                   resizeMode="cover"
                 />
                 <View style={styles.ratingBadge}>
                   <Text style={styles.ratingText}>4.9★</Text>
                 </View>
               </View>
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>Dumtua Cafe</Text>
                <Text style={styles.restaurantType}>Cafe, European, Italian</Text>
              </View>
              <View style={styles.offersContainer}>
                <Text style={styles.offerText}>40% OFF</Text>
                <Text style={styles.proOfferText}>PRO extra 20% OFF</Text>
              </View>
              <Text style={styles.safetyText}>
                Follows all Max Safety measures to ensure a safe delivery experience
              </Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Ratings represent customer opinion about your food quality
            </Text>
            <View style={styles.arrow} />
          </View>
        </View>

        {/* Restaurant Rating Section */}
        <View style={styles.ratingSection}>
          <View style={styles.ratingHeader}>
            <Text style={styles.ratingTitle}>Your restaurant's rating</Text>
            <View style={styles.currentRatingBadge}>
              <Text style={styles.currentRatingText}>3.7★</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewRatingsLink}>
            <Text style={styles.viewRatingsText}>View order ratings ▸</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>Select your concern</Text>
          {faqItems.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.faqItem}
                onPress={() => toggleItem(index)}
              >
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Text style={[
                  styles.expandIcon,
                  expandedItems.includes(index) && styles.expandIconRotated
                ]}>
                  {expandedItems.includes(index) ? '∧' : '∨'}
                </Text>
              </TouchableOpacity>
              {expandedItems.includes(index) && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.answerText}>{item.answer}</Text>
                </View>
              )}
            </View>
          ))}
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
  
  // Promotional Section
  promotionalSection: {
    backgroundColor: '#1E90FF',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneContainer: {
    flex: 1,
    alignItems: 'center',
  },
  phoneOutline: {
    width: 120,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  foodImageContainer: {
    position: 'relative',
    height: 80,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 8,
  },
  foodImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  restaurantInfo: {
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  restaurantType: {
    fontSize: 10,
    color: '#666666',
  },
  offersContainer: {
    marginBottom: 4,
  },
  offerText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  proOfferText: {
    fontSize: 8,
    color: '#FF9800',
    fontWeight: 'bold',
  },
  safetyText: {
    fontSize: 8,
    color: '#666666',
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 20,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 0,
    borderBottomWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: '#FFFFFF',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    alignSelf: 'flex-start',
  },
  
  // Rating Section
  ratingSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  currentRatingBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  currentRatingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewRatingsLink: {
    marginTop: 8,
  },
  viewRatingsText: {
    color: '#1E90FF',
    fontSize: 14,
    fontWeight: '500',
  },
  
  // FAQ Section
  faqSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    marginRight: 16,
  },
  expandIcon: {
    fontSize: 16,
    color: '#666666',
  },
  expandIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  faqAnswer: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  answerText: {
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
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginLeft: 8,
    alignItems: 'center',
  },
  noButtonText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RatingsReviewsScreen; 