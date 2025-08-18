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

const GeneralInformationScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    console.log('GeneralInformationScreen: Back button pressed');
    navigation.navigate('Hub', { screen: 'HelpCentre' });
  };

  const faqTopics = [
    {
      id: 1,
      title: 'How to get started with Grooso?',
      description: 'Learn the basics of setting up your restaurant on Grooso',
      icon: 'help',
    },
    {
      id: 2,
      title: 'Understanding commission structure',
      description: 'Learn about our commission rates and payment cycles',
      icon: 'account-balance-wallet',
    },
    {
      id: 3,
      title: 'Menu management guidelines',
      description: 'Best practices for managing your menu and items',
      icon: 'restaurant-menu',
    },
    {
      id: 4,
      title: 'Order management tips',
      description: 'How to efficiently handle incoming orders',
      icon: 'receipt-long',
    },
    {
      id: 5,
      title: 'Quality standards',
      description: 'Maintaining food quality and hygiene standards',
      icon: 'verified',
    },
    {
      id: 6,
      title: 'App features overview',
      description: 'Complete guide to all app features and functionalities',
      icon: 'apps',
    },
  ];

  const quickLinks = [
    {
      title: 'Terms of Service',
      icon: 'description',
    },
    {
      title: 'Privacy Policy',
      icon: 'security',
    },
    {
      title: 'Partner Guidelines',
      icon: 'business',
    },
    {
      title: 'Safety Standards',
      icon: 'health-and-safety',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>General Information</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>Frequently Asked Questions</Text>
        
        {/* FAQ Topics */}
        <View style={styles.topicsContainer}>
          {faqTopics.map((topic) => (
            <TouchableOpacity 
              key={topic.id} 
              style={styles.topicItem}
              onPress={() => {
                console.log('GeneralInformation: Topic pressed:', topic.title);
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

        {/* Quick Links */}
        <View style={styles.quickLinksCard}>
          <Text style={styles.quickLinksTitle}>Quick Links</Text>
          {quickLinks.map((link, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.quickLinkItem}
              onPress={() => {
                console.log('GeneralInformation: Quick link pressed:', link.title);
                // Here you can add specific navigation for each link
              }}
            >
              <View style={styles.quickLinkLeft}>
                <View style={styles.quickLinkIcon}>
                  <Icon name={link.icon} size={20} color={theme.colors.primary} />
                </View>
                <Text style={styles.quickLinkText}>{link.title}</Text>
              </View>
              <Icon name="open-in-new" size={20} color={theme.colors.text.secondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <View style={styles.versionCard}>
          <Text style={styles.versionText}>App Version: 1.0.0</Text>
          <Text style={styles.versionText}>Last Updated: December 2024</Text>
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
  quickLinksCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.light,
  },
  quickLinksTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: SPACING.md,
  },
  quickLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  quickLinkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quickLinkIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  quickLinkText: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.primary,
  },
  versionCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    alignItems: 'center',
    ...SHADOWS.light,
  },
  versionText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.xs,
  },
});

export default GeneralInformationScreen;
