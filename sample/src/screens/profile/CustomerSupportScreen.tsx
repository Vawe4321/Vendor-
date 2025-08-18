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

const CustomerSupportScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    console.log('CustomerSupportScreen: Back button pressed');
    navigation.navigate('Hub', { screen: 'HelpCentre' });
  };

  const supportTopics = [
    {
      id: 1,
      title: 'Contact Support Team',
      description: 'Get in touch with our customer support representatives',
      icon: 'support-agent',
    },
    {
      id: 2,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: 'chat',
    },
    {
      id: 3,
      title: 'Email Support',
      description: 'Send us an email and get a response within 24 hours',
      icon: 'email',
    },
    {
      id: 4,
      title: 'Phone Support',
      description: 'Call our support hotline for immediate assistance',
      icon: 'phone',
    },
    {
      id: 5,
      title: 'FAQ Section',
      description: 'Find answers to commonly asked questions',
      icon: 'help',
    },
  ];

  const contactInfo = [
    {
      type: 'Email',
      value: 'support@grooso.com',
      icon: 'email',
    },
    {
      type: 'Phone',
      value: '+91 1800-123-4567',
      icon: 'phone',
    },
    {
      type: 'WhatsApp',
      value: '+91 98765-43210',
      icon: 'whatsapp',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer Support</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>How can we help you?</Text>
        
        {/* Support Topics */}
        <View style={styles.topicsContainer}>
          {supportTopics.map((topic) => (
            <TouchableOpacity 
              key={topic.id} 
              style={styles.topicItem}
              onPress={() => {
                console.log('CustomerSupport: Topic pressed:', topic.title);
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

        {/* Contact Information */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Contact Information</Text>
          {contactInfo.map((contact, index) => (
            <View key={index} style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Icon name={contact.icon} size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactType}>{contact.type}</Text>
                <Text style={styles.contactValue}>{contact.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Support Hours */}
        <View style={styles.hoursCard}>
          <Text style={styles.hoursTitle}>Support Hours</Text>
          <Text style={styles.hoursText}>
            Monday - Friday: 9:00 AM - 6:00 PM{'\n'}
            Saturday: 10:00 AM - 4:00 PM{'\n'}
            Sunday: Closed
          </Text>
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
  contactCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.light,
  },
  contactTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: SPACING.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  contactDetails: {
    flex: 1,
  },
  contactType: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  contactValue: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
  },
  hoursCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.light,
  },
  hoursTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: SPACING.md,
  },
  hoursText: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },
});

export default CustomerSupportScreen;
