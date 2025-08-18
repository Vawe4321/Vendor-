import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../theme';
import { SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../utils/responsive';

const PaymentBillingScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    console.log('PaymentBillingScreen: Back button pressed');
    navigation.navigate('Hub', { screen: 'HelpCentre' });
  };

  const paymentTopics = [
    {
      id: 1,
      title: 'Payment Methods',
      description: 'Learn about accepted payment methods and how to update them',
      icon: 'payment',
    },
    {
      id: 2,
      title: 'Invoice Management',
      description: 'View and download invoices, understand billing cycles',
      icon: 'receipt',
    },
    {
      id: 3,
      title: 'Payment Issues',
      description: 'Troubleshoot payment failures and transaction problems',
      icon: 'error',
    },
    {
      id: 4,
      title: 'Refund Process',
      description: 'How to request and track refunds for orders',
      icon: 'money-off',
    },
    {
      id: 5,
      title: 'Bank Account Details',
      description: 'Update your bank account for payouts and settlements',
      icon: 'account-balance',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment & Billing</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>Payment & Billing Help</Text>
        
        {/* Payment Topics */}
        <View style={styles.topicsContainer}>
          {paymentTopics.map((topic) => (
            <TouchableOpacity 
              key={topic.id} 
              style={styles.topicItem}
              onPress={() => {
                console.log('PaymentBilling: Topic pressed:', topic.title);
                // Here you can add specific navigation for each topic
              }}
            >
              <View style={styles.topicLeft}>
                <View style={styles.topicIcon}>
                  <Icon name={topic.icon} size={20} color={theme.colors.primary} />
                </View>
                <View style={styles.topicContent}>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Text style={styles.topicDescription}>{topic.description}</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Additional Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Need Immediate Help?</Text>
          <Text style={styles.infoDescription}>
            For urgent payment issues, contact our support team at billing@grooso.com
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  greeting: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  topicsContainer: {
    marginBottom: SPACING.xl,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  topicLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  topicIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.xs,
  },
  topicDescription: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
  },
  infoCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.light,
  },
  infoTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: SPACING.sm,
  },
  infoDescription: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.md,
  },
  contactButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  contactButtonText: {
    color: theme.colors.text.inverse,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

export default PaymentBillingScreen;
