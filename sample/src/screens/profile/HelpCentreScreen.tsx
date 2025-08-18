import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../theme';
import { SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../utils/responsive';

const HelpCentreScreen: React.FC = () => {
  const navigation = useNavigation();
  console.log('HelpCentreScreen: Component rendered');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English - EN');
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  const handleBackPress = () => {
    console.log('HelpCentreScreen: Back button pressed');
    navigation.navigate('Hub', { screen: 'ExploreMore' });
  };

  const handleLanguagePress = () => {
    setShowLanguageModal(true);
  };

  const handleCloseModal = () => {
    setShowLanguageModal(false);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleApplyChanges = () => {
    // Extract language code from selected language
    const languageCode = selectedLanguage.split(' - ')[1];
    setCurrentLanguage(languageCode);
    setShowLanguageModal(false);
  };

  const helpTopicsData = {
    EN: [
      {
        id: 1,
        icon: 'power-settings-new',
        title: 'Outlet online / offline status',
        description: 'Current status & details',
      },
      {
        id: 2,
        icon: 'notifications',
        title: 'Order related issues',
        description: 'Cancellations & delivery related concerns',
      },
      {
        id: 3,
        icon: 'store',
        title: 'Restaurant',
        description: 'Timings, contacts, FSSAI, bank details, location etc.',
      },
      {
        id: 4,
        icon: 'home',
        title: 'Address, location',
        description: 'Update Outlet\'s address and location.',
      },
             {
         id: 5,
         icon: 'payment',
         title: 'Payment & billing',
         description: 'Payment methods, invoices, and billing issues',
       },
       {
         id: 6,
         icon: 'support-agent',
         title: 'Customer support',
         description: 'Contact support team and get assistance',
       },
       {
         id: 7,
         icon: 'info',
         title: 'General information',
         description: 'Frequently asked questions and general help',
       },
    ],
    HI: [
      {
        id: 1,
        icon: 'power-settings-new',
        title: 'आउटलेट ऑनलाइन / ऑफलाइन स्थिति',
        description: 'वर्तमान स्थिति और विवरण',
      },
      {
        id: 2,
        icon: 'notifications',
        title: 'ऑर्डर संबंधित समस्याएं',
        description: 'रद्दीकरण और डिलीवरी संबंधित चिंताएं',
      },
      {
        id: 3,
        icon: 'store',
        title: 'रेस्तरां',
        description: 'समय, संपर्क, FSSAI, बैंक विवरण, स्थान आदि।',
      },
      {
        id: 4,
        icon: 'home',
        title: 'पता, स्थान',
        description: 'आउटलेट का पता और स्थान अपडेट करें।',
      },
             {
         id: 5,
         icon: 'payment',
         title: 'भुगतान और बिलिंग',
         description: 'भुगतान विधियां, चालान और बिलिंग समस्याएं',
       },
       {
         id: 6,
         icon: 'support-agent',
         title: 'ग्राहक सहायता',
         description: 'सहायता टीम से संपर्क करें और सहायता प्राप्त करें',
       },
       {
         id: 7,
         icon: 'info',
         title: 'सामान्य जानकारी',
         description: 'अक्सर पूछे जाने वाले प्रश्न और सामान्य सहायता',
       },
    ],
    KN: [
      {
        id: 1,
        icon: 'power-settings-new',
        title: 'ಔಟ್ಲೆಟ್ ಆನ್‌ಲೈನ್ / ಆಫ್‌ಲೈನ್ ಸ್ಥಿತಿ',
        description: 'ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ ಮತ್ತು ವಿವರಗಳು',
      },
      {
        id: 2,
        icon: 'notifications',
        title: 'ಆರ್ಡರ್ ಸಂಬಂಧಿತ ಸಮಸ್ಯೆಗಳು',
        description: 'ರದ್ದತಿ ಮತ್ತು ಡೆಲಿವರಿ ಸಂಬಂಧಿತ ಕಾಳಜಿಗಳು',
      },
      {
        id: 3,
        icon: 'store',
        title: 'ರೆಸ್ಟೋರೆಂಟ್',
        description: 'ಸಮಯಗಳು, ಸಂಪರ್ಕಗಳು, FSSAI, ಬ್ಯಾಂಕ್ ವಿವರಗಳು, ಸ್ಥಳ ಇತ್ಯಾದಿ.',
      },
      {
        id: 4,
        icon: 'home',
        title: 'ವಿಳಾಸ, ಸ್ಥಳ',
        description: 'ಔಟ್ಲೆಟ್‌ನ ವಿಳಾಸ ಮತ್ತು ಸ್ಥಳವನ್ನು ನವೀಕರಿಸಿ.',
      },
             {
         id: 5,
         icon: 'payment',
         title: 'ಪಾವತಿ ಮತ್ತು ಬಿಲ್ಲಿಂಗ್',
         description: 'ಪಾವತಿ ವಿಧಾನಗಳು, ಚಲನಚಿತ್ರಗಳು ಮತ್ತು ಬಿಲ್ಲಿಂಗ್ ಸಮಸ್ಯೆಗಳು',
       },
       {
         id: 6,
         icon: 'support-agent',
         title: 'ಗ್ರಾಹಕ ಸಹಾಯ',
         description: 'ಸಹಾಯ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ ಮತ್ತು ಸಹಾಯ ಪಡೆಯಿರಿ',
       },
       {
         id: 7,
         icon: 'info',
         title: 'ಸಾಮಾನ್ಯ ಮಾಹಿತಿ',
         description: 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಸಾಮಾನ್ಯ ಸಹಾಯ',
       },
    ],
  };

  const allHelpTopics = helpTopicsData[currentLanguage as keyof typeof helpTopicsData] || helpTopicsData.EN;

  // Filter help topics based on search query
  const filteredHelpTopics = allHelpTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Language-specific text content
  const textContent = {
    EN: {
      headerTitle: 'Help centre',
      greeting: 'How can we help you',
      searchPlaceholder: 'Search by issue',
      modalTitle: 'Select the language',
      applyButton: 'Apply changes',
    },
    HI: {
      headerTitle: 'सहायता केंद्र',
      greeting: 'हम आपकी कैसे मदद कर सकते हैं',
      searchPlaceholder: 'समस्या से खोजें',
      modalTitle: 'भाषा चुनें',
      applyButton: 'परिवर्तन लागू करें',
    },
    KN: {
      headerTitle: 'ಸಹಾಯ ಕೇಂದ್ರ',
      greeting: 'ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು',
      searchPlaceholder: 'ಸಮಸ್ಯೆಯಿಂದ ಹುಡುಕಿ',
      modalTitle: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      applyButton: 'ಬದಲಾವಣೆಗಳನ್ನು ಅನ್ವಯಿಸಿ',
    },
  };

  const currentText = textContent[currentLanguage as keyof typeof textContent] || textContent.EN;

  const languages = [
    { code: 'EN', name: 'English - EN' },
    { code: 'HI', name: 'हिंदी - HI' },
    { code: 'KN', name: 'ಕನ್ನಡ - Kannada' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentText.headerTitle}</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleLanguagePress} style={styles.headerIcon}>
            <Text style={styles.languageIcon}>अ A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="local-offer" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>{currentText.greeting}</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={theme.colors.text.secondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={currentText.searchPlaceholder}
            placeholderTextColor={theme.colors.text.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

                 {/* Help Topics */}
         <View style={styles.topicsContainer}>
           {filteredHelpTopics.map((topic) => (
             <TouchableOpacity 
               key={topic.id} 
               style={styles.topicItem}
               onPress={() => {
                 console.log('HelpCentre: Navigating to topic:', topic.title);
                 if (topic.title.includes('Outlet online / offline status') || 
                     topic.title.includes('आउटलेट ऑनलाइन / ऑफलाइन स्थिति') ||
                     topic.title.includes('ಔಟ್ಲೆಟ್ ಆನ್‌ಲೈನ್ / ಆಫ್‌ಲೈನ್ ಸ್ಥितಿ')) {
                   console.log('HelpCentre: Navigating to OutletStatus');
                   navigation.navigate('Hub', { screen: 'OutletStatus' });
                 } else if (topic.title.includes('Order related issues') || 
                           topic.title.includes('ऑर्डर संबंधित समस्याएं') ||
                           topic.title.includes('ಆರ್ಡರ್ ಸಂಬಂಧಿತ ಸಮಸ್ಯೆಗಳು')) {
                   console.log('HelpCentre: Navigating to OrderHistory');
                   navigation.navigate('Hub', { screen: 'OrderHistory' });
                 } else if (topic.title.includes('Restaurant') || 
                           topic.title.includes('रेस्तरां') ||
                           topic.title.includes('ರೆಸ್ಟೋರೆಂಟ್')) {
                   console.log('HelpCentre: Navigating to ProfileMain');
                   navigation.navigate('Profile', { screen: 'ProfileMain' });
                                   } else if (topic.title.includes('Address, location') || 
                            topic.title.includes('पता, स्थान') ||
                            topic.title.includes('ವಿಳಾಸ, ಸ್ಥಳ')) {
                    console.log('HelpCentre: Navigating to NameAddressLocation');
                    navigation.navigate('Profile', { screen: 'NameAddressLocation' });
                  } else if (topic.title.includes('Payment & billing') || 
                            topic.title.includes('भुगतान और बिलिंग') ||
                            topic.title.includes('ಪಾವತಿ ಮತ್ತು ಬಿಲ್ಲಿಂಗ್')) {
                    console.log('HelpCentre: Navigating to PaymentBilling');
                    navigation.navigate('Hub', { screen: 'PaymentBilling' });
                  } else if (topic.title.includes('Customer support') || 
                            topic.title.includes('ग्राहक सहायता') ||
                            topic.title.includes('ಗ್ರಾಹಕ ಸಹಾಯ')) {
                    console.log('HelpCentre: Navigating to CustomerSupport');
                    navigation.navigate('Hub', { screen: 'CustomerSupport' });
                  } else if (topic.title.includes('General information') || 
                            topic.title.includes('सामान्य जानकारी') ||
                            topic.title.includes('ಸಾಮಾನ್ಯ ಮಾಹಿತಿ')) {
                    console.log('HelpCentre: Navigating to GeneralInformation');
                    navigation.navigate('Hub', { screen: 'GeneralInformation' });
                  }
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
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{currentText.modalTitle}</Text>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Icon name="close" size={24} color={theme.colors.text.primary} />
              </TouchableOpacity>
            </View>

            {/* Language Options */}
            <View style={styles.languageOptions}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={styles.languageOption}
                  onPress={() => handleLanguageSelect(language.name)}
                >
                  <View style={styles.radioContainer}>
                    <View style={[
                      styles.radioButton,
                      selectedLanguage === language.name && styles.radioButtonSelected
                    ]}>
                      {selectedLanguage === language.name && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                  </View>
                  <Text style={styles.languageText}>{language.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Apply Button */}
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyChanges}>
              <Text style={styles.applyButtonText}>{currentText.applyButton}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    padding: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  languageIcon: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.level1,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    ...SHADOWS.light,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.primary,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background.default,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    paddingBottom: SPACING.xl,
    ...SHADOWS.large,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  modalTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  languageOptions: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  radioContainer: {
    marginRight: SPACING.md,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.border.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: theme.colors.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  languageText: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.primary,
  },
  applyButton: {
    backgroundColor: theme.colors.primary,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  applyButtonText: {
    color: theme.colors.text.inverse,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

export default HelpCentreScreen;
