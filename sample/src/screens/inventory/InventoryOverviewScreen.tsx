import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { theme } from '../../theme';
import { InventoryStackParamList, TabParamList } from '../../navigation/types';

const { width: screenWidth } = Dimensions.get('window');

type InventoryOverviewScreenNavigationProp = StackNavigationProp<
  InventoryStackParamList,
  'InventoryOverview'
>;

const InventoryOverviewScreen: React.FC = () => {
  const navigation = useNavigation<InventoryOverviewScreenNavigationProp>();
  const tabNavigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchTab, setActiveSearchTab] = useState('All items');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('out-of-stock');
  const [activeTab, setActiveTab] = useState('All items');
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedHelpTopic, setSelectedHelpTopic] = useState<any>(null);
  const [showHelpDetailModal, setShowHelpDetailModal] = useState(false);
  const tabsScrollRef = useRef<ScrollView>(null);
  const menuScrollRef = useRef<ScrollView>(null);

  // Mock data for notifications
  const notificationsData = [
    {
      id: 'notif_001',
      type: 'inventory',
      title: 'Low Stock Alert',
      message: 'Veg Manchow Soup is running low on stock',
      isRead: false,
      timestamp: '2 minutes ago',
      priority: 'high',
      icon: '⚠️',
    },
    {
      id: 'notif_002',
      type: 'order',
      title: 'New Order Received',
      message: 'Order #ORD-2025-001 includes items from your menu',
      isRead: false,
      timestamp: '5 minutes ago',
      priority: 'medium',
      icon: '📦',
    },
    {
      id: 'notif_003',
      type: 'system',
      title: 'Menu Update Available',
      message: 'New menu items have been added to your category',
      isRead: true,
      timestamp: '1 hour ago',
      priority: 'low',
      icon: '📝',
    },
    {
      id: 'notif_004',
      type: 'analytics',
      title: 'Daily Report Ready',
      message: 'Your inventory performance report is available',
      isRead: true,
      timestamp: '2 hours ago',
      priority: 'low',
      icon: '📊',
    },
    {
      id: 'notif_005',
      type: 'maintenance',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight at 2 AM',
      isRead: false,
      timestamp: '3 hours ago',
      priority: 'medium',
      icon: '🔧',
    },
  ];

  // Mock data for help & support
  const helpData = [
    {
      id: 'help_001',
      category: 'Inventory Management',
      title: 'How to add new menu items?',
      description: 'Step-by-step guide to adding new items to your menu',
      icon: '➕',
      content: {
        steps: [
          {
            step: 1,
            title: 'Navigate to Inventory',
            description: 'Go to the Inventory tab in your app dashboard'
          },
          {
            step: 2,
            title: 'Click Add Item',
            description: 'Tap the "+" button or "Add Item" option'
          },
          {
            step: 3,
            title: 'Fill Item Details',
            description: 'Enter item name, description, price, and category'
          },
          {
            step: 4,
            title: 'Upload Image',
            description: 'Add a high-quality photo of your menu item'
          },
          {
            step: 5,
            title: 'Set Stock Status',
            description: 'Choose if the item is in stock or out of stock'
          },
          {
            step: 6,
            title: 'Save Item',
            description: 'Review all details and tap "Save" to add the item'
          }
        ],
        tips: [
          'Use clear, descriptive names for your items',
          'Add detailed descriptions to help customers understand your dishes',
          'Set competitive prices based on your market',
          'Upload high-quality images to attract customers',
          'Keep stock levels updated regularly'
        ],
        faqs: [
          {
            question: 'Can I edit an item after adding it?',
            answer: 'Yes, you can edit any item by tapping on it in the inventory list and selecting "Edit".'
          },
          {
            question: 'How many items can I add?',
            answer: 'There is no limit to the number of items you can add to your menu.'
          },
          {
            question: 'Can I add items in bulk?',
            answer: 'Currently, items need to be added one by one, but bulk import feature is coming soon.'
          }
        ]
      }
    },
    {
      id: 'help_002',
      category: 'Stock Management',
      title: 'Managing item stock levels',
      description: 'Learn how to set and manage stock levels for your items',
      icon: '📦',
      content: {
        steps: [
          {
            step: 1,
            title: 'Access Stock Settings',
            description: 'Go to the item you want to manage and tap "Stock Settings"'
          },
          {
            step: 2,
            title: 'Set Stock Level',
            description: 'Enter the current quantity available for the item'
          },
          {
            step: 3,
            title: 'Set Low Stock Alert',
            description: 'Configure when you want to receive low stock notifications'
          },
          {
            step: 4,
            title: 'Enable Auto-Out of Stock',
            description: 'Choose if the item should automatically go out of stock when quantity reaches zero'
          },
          {
            step: 5,
            title: 'Save Settings',
            description: 'Tap "Save" to apply your stock management settings'
          }
        ],
        tips: [
          'Update stock levels daily to avoid order issues',
          'Set low stock alerts at 20% of your usual stock',
          'Use the bulk stock update feature for efficiency',
          'Monitor stock levels during peak hours',
          'Keep backup stock for popular items'
        ],
        faqs: [
          {
            question: 'How often should I update stock levels?',
            answer: 'It\'s recommended to update stock levels at least once daily, or more frequently during busy periods.'
          },
          {
            question: 'What happens when an item goes out of stock?',
            answer: 'The item will be automatically hidden from customer orders and you\'ll receive a notification.'
          },
          {
            question: 'Can I set different stock levels for different times?',
            answer: 'Currently, stock levels are set globally, but time-based stock management is in development.'
          }
        ]
      }
    },
    {
      id: 'help_003',
      category: 'Menu Categories',
      title: 'Creating and organizing categories',
      description: 'How to create and organize your menu categories effectively',
      icon: '📋',
      content: {
        steps: [
          {
            step: 1,
            title: 'Access Category Management',
            description: 'Go to Inventory > Categories or tap "Manage Categories"'
          },
          {
            step: 2,
            title: 'Create New Category',
            description: 'Tap "Add Category" and enter a name for your new category'
          },
          {
            step: 3,
            title: 'Set Category Order',
            description: 'Drag and drop categories to arrange them in your preferred order'
          },
          {
            step: 4,
            title: 'Add Items to Category',
            description: 'Select items and assign them to the appropriate category'
          },
          {
            step: 5,
            title: 'Customize Category Display',
            description: 'Choose if the category should be visible to customers'
          }
        ],
        tips: [
          'Use clear, descriptive category names',
          'Group similar items together',
          'Limit categories to 8-10 for better organization',
          'Consider customer browsing patterns when organizing',
          'Use seasonal categories for special menus'
        ],
        faqs: [
          {
            question: 'How many categories can I create?',
            answer: 'You can create up to 20 categories, but we recommend keeping it under 10 for better user experience.'
          },
          {
            question: 'Can I move items between categories?',
            answer: 'Yes, you can easily move items between categories by editing the item and changing its category.'
          },
          {
            question: 'Do customers see category names?',
            answer: 'Yes, category names are visible to customers and help them navigate your menu easily.'
          }
        ]
      }
    },
    {
      id: 'help_004',
      category: 'Pricing',
      title: 'Setting item prices',
      description: 'Guide to setting competitive prices for your menu items',
      icon: '💰',
      content: {
        steps: [
          {
            step: 1,
            title: 'Research Market Prices',
            description: 'Check competitor prices for similar items in your area'
          },
          {
            step: 2,
            title: 'Calculate Costs',
            description: 'Include ingredient costs, preparation time, and overhead expenses'
          },
          {
            step: 3,
            title: 'Set Base Price',
            description: 'Enter the price that covers your costs and desired profit margin'
          },
          {
            step: 4,
            title: 'Consider Demand',
            description: 'Adjust prices based on item popularity and demand'
          },
          {
            step: 5,
            title: 'Review and Update',
            description: 'Regularly review prices and adjust based on market changes'
          }
        ],
        tips: [
          'Start with competitive pricing to attract customers',
          'Consider offering combo deals for better value',
          'Use psychological pricing (e.g., ₹99 instead of ₹100)',
          'Regularly review and adjust prices based on costs',
          'Offer premium pricing for signature dishes'
        ],
        faqs: [
          {
            question: 'How often should I update prices?',
            answer: 'Review prices monthly, but update immediately if ingredient costs change significantly.'
          },
          {
            question: 'Can I set different prices for different times?',
            answer: 'Currently, prices are set globally, but dynamic pricing features are coming soon.'
          },
          {
            question: 'What if my prices are too high?',
            answer: 'Monitor order volume and customer feedback. Consider adjusting prices if sales are low.'
          }
        ]
      }
    },
    {
      id: 'help_005',
      category: 'Technical Support',
      title: 'App troubleshooting',
      description: 'Common issues and solutions for the Grooso app',
      icon: '🔧',
      content: {
        steps: [
          {
            step: 1,
            title: 'Check Internet Connection',
            description: 'Ensure you have a stable internet connection'
          },
          {
            step: 2,
            title: 'Restart the App',
            description: 'Close the app completely and reopen it'
          },
          {
            step: 3,
            title: 'Clear App Cache',
            description: 'Go to Settings > Apps > Grooso > Clear Cache'
          },
          {
            step: 4,
            title: 'Update the App',
            description: 'Check for app updates in your device\'s app store'
          },
          {
            step: 5,
            title: 'Contact Support',
            description: 'If issues persist, contact our support team'
          }
        ],
        tips: [
          'Keep your app updated to the latest version',
          'Ensure your device has sufficient storage space',
          'Use a stable Wi-Fi connection when possible',
          'Restart your device if the app becomes unresponsive',
          'Check our status page for any ongoing issues'
        ],
        faqs: [
          {
            question: 'The app is slow, what should I do?',
            answer: 'Try clearing the app cache, restarting the app, or checking your internet connection.'
          },
          {
            question: 'I can\'t log in to my account',
            answer: 'Verify your credentials, check your internet connection, or try resetting your password.'
          },
          {
            question: 'Orders are not updating in real-time',
            answer: 'Ensure you have a stable internet connection and that notifications are enabled.'
          }
        ]
      }
    },
  ];

  // Handlers for notifications and help
  const handleNotificationsPress = () => {
    setShowNotificationsModal(true);
  };

  const handleHelpPress = () => {
    setShowHelpModal(true);
  };

  const handleHelpTopicPress = (helpItem: any) => {
    setSelectedHelpTopic(helpItem);
    setShowHelpDetailModal(true);
  };

  const handleHamburgerPress = () => {
    tabNavigation.navigate('Hub', { screen: 'ExploreMore' });
  };

  // Menu data structure for inventory
  const [menuCategories, setMenuCategories] = useState([
    {
      id: 'soups',
      name: 'Soups',
      itemCount: 6,
      outOfStockCount: 3,
      isExpanded: true,
      isActive: true,
      items: [
        {
          id: 'veg-manchow',
          name: 'Veg Manchow Soup',
          isVeg: true,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'veg-hot-sour',
          name: 'Veg Hot and Sour Soup',
          isVeg: true,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'tomato-soup',
          name: 'Tomato Soup',
          isVeg: true,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'lemon-coriander',
          name: 'Lemon Coriander Soup',
          isVeg: true,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'chicken-hot-sour',
          name: 'Chicken Hot and Sour Soup',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-manchow',
          name: 'Chicken Manchow Soup',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
      ],
    },
    {
      id: 'veg-starters',
      name: 'Veg Starters',
      itemCount: 9,
      outOfStockCount: 5,
      isExpanded: true,
      isActive: true,
      items: [
        {
          id: 'spring-rolls',
          name: 'Spring Rolls',
          isVeg: true,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'paneer-tikka',
      name: 'Paneer Tikka',
          isVeg: true,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'aloo-65',
          name: 'Aloo 65',
          isVeg: true,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'veg-65',
          name: 'Veg 65',
          isVeg: true,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'paneer-65',
          name: 'Paneer 65',
          isVeg: true,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'paneer-majestic',
          name: 'Paneer Majestic',
          isVeg: true,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chilli-paneer',
          name: 'Chilli Paneer',
          isVeg: true,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'gobi-65',
          name: 'Gobi 65',
          isVeg: true,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'dragon-paneer',
          name: 'Dragon Paneer',
          isVeg: true,
          isInStock: true,
          status: 'In stock',
        },
      ],
    },
    {
      id: 'egg-starters',
      name: 'Egg Starters',
      itemCount: 4,
      outOfStockCount: 0,
      isExpanded: true,
      isActive: true,
      items: [
        {
          id: 'dragon-egg',
          name: 'Dragon Egg',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'egg-manchuria',
          name: 'Egg Manchuria',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'egg-65',
          name: 'Egg 65',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'egg-majestic',
          name: 'Egg Majestic',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
      ],
    },
    {
      id: 'non-veg-starters',
      name: 'Non Veg Starters',
      itemCount: 14,
      outOfStockCount: 0,
      isExpanded: true,
      isActive: true,
      items: [
        {
          id: 'chicken-wings',
          name: 'Chicken Wings',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-lollipop-wet',
          name: 'Chicken Lollipop [Wet]',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'salt-pepper-chicken',
          name: 'Salt and Pepper Chicken',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'schezwan-chicken',
          name: 'Schezwan Chicken',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'crispy-chicken',
          name: 'Crispy Chicken',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'ginger-chicken',
          name: 'Ginger Chicken',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'garlic-chicken',
          name: 'Garlic Chicken',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'dragon-chicken',
          name: 'Dragon Chicken',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chilli-chicken',
          name: 'Chilli Chicken',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-majestic',
          name: 'Chicken Majestic',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-domastic-dry',
          name: 'Chicken Domastic [Dry]',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-manchuria',
          name: 'Chicken Manchuria',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-65',
          name: 'Chicken 65',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-555',
          name: 'Chicken 555',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
      ],
    },
    {
      id: 'curries',
      name: 'Curries',
      itemCount: 8,
      outOfStockCount: 3,
      isExpanded: true,
      isActive: true,
      items: [
        {
          id: 'butter-chicken-curry',
          name: 'Butter Chicken Curry',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-tikka-masala',
          name: 'Chicken Tikka Masala',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-curry',
          name: 'Chicken Curry',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'spl-chicken-curry',
          name: 'Spl Chicken Curry',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'methi-chicken-curry',
          name: 'Methi Chicken Curry',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'mutton-curry',
          name: 'Mutton Curry',
          isVeg: false,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'fish-curry',
          name: 'Fish Curry',
          isVeg: false,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'prawns-curry',
          name: 'Prawns Curry',
          isVeg: false,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
      ],
    },
    {
      id: 'breads',
      name: 'Breads',
      itemCount: 5,
      outOfStockCount: 0,
      isExpanded: true,
      isActive: true,
      items: [
        {
          id: 'tandoori-roti',
          name: 'Tandoori Roti',
          isVeg: true,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'butter-tandoori-roti',
          name: 'Butter Tandoori Roti',
          isVeg: true,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'butter-naan',
          name: 'Butter Naan',
          isVeg: true,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'garlic-naan',
          name: 'Garlic Naan',
          isVeg: true,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'pulka',
          name: 'Pulka',
          isVeg: true,
          isInStock: true,
          status: 'In stock',
        },
      ],
    },
    {
      id: 'family-pack-biryani',
      name: 'Family Pack Biryani',
      itemCount: 10,
      outOfStockCount: 4,
      isExpanded: true,
      isActive: true,
      items: [
        {
          id: 'veg-biryani-family-pack',
          name: 'Veg Biryani Family Pack',
          isVeg: true,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'paneer-biryani-family-pack',
          name: 'Paneer Biryani Family Pack',
          isVeg: true,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'mushroom-biryani-family-pack',
          name: 'Mushroom Biryani Family Pack',
          isVeg: true,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'egg-biryani-family-pack',
          name: 'Egg Biryani Family Pack',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-dum-biryani-family-pack',
          name: 'Chicken Dum Biryani Family Pack',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-fry-biryani-family-pack',
          name: 'Chicken Fry Biryani Family Pack',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-wings-biryani-family-pack',
          name: 'Chicken Wings Biryani Family Pack',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'single-dum-biryani',
          name: 'Single Dum Biryani',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'single-fry-biryani',
          name: 'Single Fry Biryani',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-dum-biryani',
          name: 'Chicken Dum Biryani',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-fry-biryani',
          name: 'Chicken Fry Biryani',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-wings-biryani',
          name: 'Chicken Wings Biryani',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-lollipop-biryani',
          name: 'Chicken Lollipop Biryani',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'spl-chicken-biryani',
          name: 'Spl Chicken Biryani',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'brothers-spl-biryani',
          name: 'Brothers Spl Biryani',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'mutton-dum-biryani',
          name: 'Mutton Dum Biryani',
          isVeg: false,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'fish-biryani',
          name: 'Fish Biryani',
          isVeg: false,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'prawns-biryani',
          name: 'Prawns Biryani',
          isVeg: false,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
      ],
    },
    {
      id: 'seafood',
      name: 'Seafood',
      itemCount: 8,
      outOfStockCount: 8,
      isExpanded: true,
      isActive: false,
      items: [
        {
          id: 'finger-fish',
          name: 'Finger Fish',
          isVeg: false,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'apollo-fish',
          name: 'Apollo Fish',
          isVeg: false,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'chilli-fish',
          name: 'Chilli Fish',
          isVeg: false,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'fish-65',
          name: 'Fish 65',
          isVeg: false,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'kfc-fish',
          name: 'KFC Fish',
          isVeg: false,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'chilli-prawns',
          name: 'Chilli Prawns',
          isVeg: false,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'golden-fried-prawns',
          name: 'Golden Fried Prawns',
          isVeg: false,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
        {
          id: 'loose-prawns',
          name: 'Loose Prawns',
          isVeg: false,
          isInStock: false,
          status: 'No time set. Turn item in stock manually',
        },
      ],
    },
    {
      id: 'non-veg-fried-rice',
      name: 'Non Veg Fried Rice',
      itemCount: 3,
      outOfStockCount: 0,
      isExpanded: true,
      isActive: true,
      items: [
        {
          id: 'egg-fried-rice',
          name: 'Egg Fried Rice',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'chicken-fried-rice',
          name: 'Chicken Fried Rice',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'schezwan-chicken-fried-rice',
          name: 'Schezwan Chicken Fried Rice',
          isVeg: false,
          isInStock: true,
          status: 'In stock',
        },
      ],
    },
    {
      id: 'veg-noodles',
      name: 'Veg Noodles',
      itemCount: 3,
      outOfStockCount: 0,
      isExpanded: true,
      isActive: true,
      items: [
        {
          id: 'veg-noodles',
          name: 'Veg Noodles',
          isVeg: true,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'veg-soft-noodles',
          name: 'Veg Soft Noodles',
          isVeg: true,
          isInStock: true,
          status: 'In stock',
        },
        {
          id: 'veg-hakka-noodles',
          name: 'Veg Hakka Noodles',
          isVeg: true,
          isInStock: true,
          status: 'In stock',
        },
      ],
    },
  ]);

  const handleSearchTabPress = (tab: string) => {
    setActiveSearchTab(tab);
    setActiveTab(tab);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setMenuCategories(prev => 
      prev.map(category => 
        category.id === categoryId 
          ? { ...category, isExpanded: !category.isExpanded }
          : category
      )
    );
  };

  const handleCategoryActiveToggle = (categoryId: string) => {
    setMenuCategories(prev => 
      prev.map(category => 
        category.id === categoryId 
          ? { ...category, isActive: !category.isActive }
          : category
      )
    );
  };

  const handleItemStockToggle = (categoryId: string, itemId: string) => {
    setMenuCategories(prev => 
      prev.map(category => 
        category.id === categoryId 
          ? {
              ...category,
              items: category.items.map(item => 
                item.id === itemId 
                  ? { ...item, isInStock: !item.isInStock }
                  : item
              )
            }
          : category
      )
    );
  };

  const scrollToTab = (index: number) => {
    if (tabsScrollRef.current) {
      tabsScrollRef.current.scrollTo({ x: index * 140, animated: true });
    }
  };

  const handleCloseModal = () => {
    console.log('Close button pressed - closing modal');
    setShowFiltersModal(false);
  };

  const handleApplyFilter = () => {
    console.log('Apply button pressed - applying filter:', selectedFilter);
    setShowFiltersModal(false);
  };




  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.outletInfo}>
            <Text style={styles.outletName}>Grooso's Kitchen</Text>
            <View style={styles.locationContainer}>
              <View style={styles.locationDot} />
              <Text style={styles.location}>Hyderabadh</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={handleNotificationsPress}
            >
              <Text style={styles.iconText}>🔔</Text>
              {notificationsData.filter(n => !n.isRead).length > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {notificationsData.filter(n => !n.isRead).length}
        </Text>
      </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={handleHelpPress}
            >
              <Text style={styles.iconText}>❓</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={handleHamburgerPress}
            >
              <Text style={styles.iconText}>☰</Text>
            </TouchableOpacity>
        </View>
        </View>
        </View>

      {/* Tabs with Enhanced Horizontal Scrolling */}
      <View style={styles.tabsContainer}>
        <ScrollView 
          ref={tabsScrollRef}
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContent}
          snapToInterval={140}
          decelerationRate="fast"
          bounces={false}
          overScrollMode="never"
        >
          {['All items', 'Add ons'].map((tab, index) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeSearchTab === tab && styles.activeTab
              ]}
              onPress={() => {
                handleSearchTabPress(tab);
                scrollToTab(index);
              }}
            >
              <Text style={[
                styles.tabText,
                activeSearchTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
                              {activeSearchTab === tab && tab === 'All items' && (
                                  <View style={styles.tabBadge}>
                    <Text style={styles.tabBadgeText}>100</Text>
        </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Search Bar */}
      {activeTab !== 'Add ons' && (
        <View style={styles.searchBarContainer}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search menu"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFiltersModal(true)}
          >
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Menu Categories with Enhanced Vertical Scrolling */}
      {activeTab === 'Add ons' ? (
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyStateBox}>
            <Text style={styles.emptyStateBoxText}>📦</Text>
          </View>
          <Text style={styles.emptyStateText}>No matching items found</Text>
        </View>
      ) : (
        <ScrollView 
          ref={menuScrollRef}
          style={styles.menuContainer} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.menuScrollContent}
          bounces={true}
          overScrollMode="always"
          scrollEventThrottle={16}
        >
          {menuCategories.map((category) => (
          <View key={category.id} style={styles.categoryContainer}>
            {/* Category Header */}
            <View style={styles.categoryHeader}>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{category.itemCount}</Text>
                </View>
              </View>
              <View style={styles.categoryActions}>
          <TouchableOpacity
                  style={[styles.categoryToggle, category.isActive && styles.activeCategoryToggle]}
                  onPress={() => handleCategoryActiveToggle(category.id)}
                >
                  <View style={[styles.toggleSwitch, category.isActive && styles.activeToggleSwitch]} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.expandButton}
                  onPress={() => handleCategoryToggle(category.id)}
                >
                  <Text style={styles.expandIcon}>^</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Category Status */}
            <View style={styles.categoryStatus}>
              <Text style={styles.categoryStatusText}>{category.name}</Text>
              <Text style={styles.outOfStockText}>
                {category.outOfStockCount} out of {category.itemCount} items are out of stock
              </Text>
            </View>

            {/* Category Items */}
            {category.isExpanded && (
              <View style={styles.itemsContainer}>
                {category.items.map((item) => (
                  <View key={item.id} style={styles.itemContainer}>
            <View style={styles.itemInfo}>
                      <View style={[styles.vegIcon, !item.isVeg && styles.nonVegIcon]}>
                        <Text style={styles.vegIconText}>{item.isVeg ? '🟢' : '🔺'}</Text>
            </View>
            <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{item.name}</Text>
              <Text style={[
                styles.itemStatus,
                          item.isInStock ? styles.inStockText : styles.outOfStockStatusText
              ]}>
                {item.status}
              </Text>
            </View>
                    </View>
                    <TouchableOpacity
                      style={[styles.itemToggle, item.isInStock && styles.activeItemToggle]}
                      onPress={() => handleItemStockToggle(category.id, item.id)}
                    >
                      <View style={[styles.itemToggleSwitch, item.isInStock && styles.activeItemToggleSwitch]} />
          </TouchableOpacity>
                  </View>
        ))}
      </View>
            )}
                      </View>
          ))}
        </ScrollView>
      )}

      {/* Filters Modal */}
      {showFiltersModal && (
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleCloseModal}
        >
          <TouchableOpacity 
            style={styles.filtersModal}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleCloseModal}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
            
            {/* Modal Title */}
            <Text style={styles.modalTitle}>Filters</Text>
            
            {/* Filter Options */}
            <View style={styles.filterOptions}>
        <TouchableOpacity
                style={styles.filterOption}
                onPress={() => setSelectedFilter('out-of-stock')}
              >
                <Text style={styles.filterOptionText}>Out of stock items only</Text>
                <View style={[
                  styles.radioButton,
                  selectedFilter === 'out-of-stock' && styles.selectedRadioButton
                ]}>
                  {selectedFilter === 'out-of-stock' && <View style={styles.radioButtonInner} />}
                </View>
        </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.filterOption}
                onPress={() => setSelectedFilter('in-stock')}
              >
                <Text style={styles.filterOptionText}>In stock items only</Text>
                <View style={[
                  styles.radioButton,
                  selectedFilter === 'in-stock' && styles.selectedRadioButton
                ]}>
                  {selectedFilter === 'in-stock' && <View style={styles.radioButtonInner} />}
      </View>
              </TouchableOpacity>
            </View>
            
            {/* Apply Button */}
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={handleApplyFilter}
              activeOpacity={0.8}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      )}

      {/* Notifications Modal */}
      <Modal
        visible={showNotificationsModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowNotificationsModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowNotificationsModal(false)}
            >
              <Text style={styles.modalCloseIcon}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Notifications</Text>
            <View style={styles.modalSpacer} />
          </View>

          <ScrollView style={styles.modalScrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.modalScrollContent}>
              {notificationsData.length > 0 ? (
                notificationsData.map((notification) => (
                  <TouchableOpacity
                    key={notification.id}
                    style={[
                      styles.notificationItem,
                      !notification.isRead && styles.unreadNotification
                    ]}
                    onPress={() => {
                      // Mark as read logic here
                      console.log('Notification pressed:', notification.title);
                    }}
                  >
                    <View style={styles.notificationIcon}>
                      <Text style={styles.notificationIconText}>{notification.icon}</Text>
                    </View>
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      <Text style={styles.notificationMessage}>{notification.message}</Text>
                      <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
                    </View>
                    {!notification.isRead && <View style={styles.unreadDot} />}
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.emptyNotifications}>
                  <Text style={styles.emptyNotificationsIcon}>🔔</Text>
                  <Text style={styles.emptyNotificationsTitle}>No notifications</Text>
                  <Text style={styles.emptyNotificationsSubtitle}>
                    You're all caught up! Check back later for updates.
                  </Text>
                </View>
              )}
      </View>
    </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Help & Support Modal */}
      <Modal
        visible={showHelpModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowHelpModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowHelpModal(false)}
            >
              <Text style={styles.modalCloseIcon}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Help & Support</Text>
            <View style={styles.modalSpacer} />
          </View>

          <ScrollView style={styles.modalScrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.modalScrollContent}>
              {helpData.map((helpItem) => (
                <TouchableOpacity
                  key={helpItem.id}
                  style={styles.helpTopicItem}
                  onPress={() => handleHelpTopicPress(helpItem)}
                >
                  <Text style={styles.helpTopicIcon}>{helpItem.icon}</Text>
                  <View style={styles.helpTopicContent}>
                    <Text style={styles.helpTopicTitle}>{helpItem.title}</Text>
                    <Text style={styles.helpTopicDescription}>{helpItem.description}</Text>
                  </View>
                  <Text style={styles.helpTopicArrow}>→</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Help Detail Modal */}
      <Modal
        visible={showHelpDetailModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowHelpDetailModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowHelpDetailModal(false)}
            >
              <Text style={styles.modalCloseIcon}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedHelpTopic?.title}</Text>
            <View style={styles.modalSpacer} />
          </View>

          <ScrollView style={styles.modalScrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.modalScrollContent}>
              {selectedHelpTopic && (
                <>
                  {/* Steps Section */}
                  <View style={styles.helpSection}>
                    <Text style={styles.helpSectionTitle}>Step-by-Step Guide</Text>
                    {selectedHelpTopic.content.steps.map((step: any, index: number) => (
                      <View key={index} style={styles.stepItem}>
                        <View style={styles.stepNumber}>
                          <Text style={styles.stepNumberText}>{step.step}</Text>
                        </View>
                        <View style={styles.stepContent}>
                          <Text style={styles.stepTitle}>{step.title}</Text>
                          <Text style={styles.stepDescription}>{step.description}</Text>
                        </View>
                      </View>
                    ))}
                  </View>

                  {/* Tips Section */}
                  <View style={styles.helpSection}>
                    <Text style={styles.helpSectionTitle}>Pro Tips</Text>
                    {selectedHelpTopic.content.tips.map((tip: string, index: number) => (
                      <View key={index} style={styles.tipItem}>
                        <Text style={styles.tipBullet}>•</Text>
                        <Text style={styles.tipText}>{tip}</Text>
                      </View>
                    ))}
                  </View>

                  {/* FAQ Section */}
                  <View style={styles.helpSection}>
                    <Text style={styles.helpSectionTitle}>Frequently Asked Questions</Text>
                    {selectedHelpTopic.content.faqs.map((faq: any, index: number) => (
                      <View key={index} style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>{faq.question}</Text>
                        <Text style={styles.faqAnswer}>{faq.answer}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 56, // HEADER_HEIGHTS.default
  },
  outletInfo: {
    flex: 1,
    marginRight: 12, // SPACING.md
  },
  outletName: {
    fontSize: 20, // FONT_SIZES.xxl
    fontWeight: '700', // Bold
    color: '#212121', // text.primary
    marginBottom: 4, // SPACING.xs
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDot: {
    width: 6,
    height: 6,
    borderRadius: 3, // BORDER_RADIUS.xs
    backgroundColor: '#9E9E9E', // gray.500
    marginRight: 6, // SPACING.sm
  },
  location: {
    fontSize: 14, // FONT_SIZES.md
    color: '#757575', // text.secondary
    fontWeight: '400',
  },
  iconButton: {
    width: 44, // TOUCH_TARGET.medium
    height: 44, // TOUCH_TARGET.medium
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // BORDER_RADIUS.md
    backgroundColor: '#F5F5F5', // gray.100
  },
  iconText: {
    fontSize: 20, // FONT_SIZES.lg
    color: '#212121', // text.primary
  },
  // Tabs Section - Following Design System
  tabsContainer: {
    backgroundColor: '#FFFFFF', // background.paper
    paddingVertical: 8, // SPACING.sm
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // gray.300
  },
  tabsScrollContent: {
    paddingHorizontal: 16, // SPACING.lg
  },
  tab: {
    paddingHorizontal: 20, // SPACING.xl
    paddingVertical: 15, // SPACING.lg
    marginHorizontal: 4, // SPACING.xs
    borderRadius: 8, // BORDER_RADIUS.md
    backgroundColor: '#F5F5F5', // gray.100
    minWidth: 100,
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44, // BUTTON_HEIGHTS.medium
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeTab: {
    backgroundColor: '#699f38', // primary
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  tabText: {
    fontSize: 16, // FONT_SIZES.lg
    color: '#757575', // text.secondary
    fontWeight: '500', // Medium
  },
  activeTabText: {
    color: '#FFFFFF', // text.inverse
    fontWeight: '600', // Semi-Bold
  },
  tabBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabBadgeText: {
    fontSize: 11,
    color: '#111827',
    fontWeight: '700',
  },
  searchBarContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 16,
    color: '#9CA3AF',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    fontWeight: '400',
  },
  filterButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterIcon: {
    fontSize: 20,
    color: '#6B7280',
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  menuScrollContent: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    paddingBottom: 20,
  },
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginRight: 8,
    letterSpacing: -0.2,
  },
  categoryBadge: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryBadgeText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  categoryActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'flex-end',
  },
  categoryToggle: {
    width: 44,
    height: 28,
    backgroundColor: '#D1D5DB',
    borderRadius: 14,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCategoryToggle: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOpacity: 0.3,
  },
  toggleSwitch: {
    width: 22,
    height: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeToggleSwitch: {
    transform: [{ translateX: 16 }],
  },
  expandButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  expandIcon: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  categoryStatus: {
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryStatusText: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
    fontWeight: '500',
  },
  outOfStockText: {
    fontSize: 11,
    color: '#DC2626',
    fontWeight: '500',
  },
  itemsContainer: {
    marginTop: 8,
    gap: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  vegIcon: {
    width: 18,
    height: 18,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  nonVegIcon: {
    backgroundColor: '#FEF3C7',
    borderRadius: 6,
    padding: 2,
  },
  vegIconText: {
    fontSize: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  itemStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  inStockText: {
    color: '#059669',
  },
  outOfStockStatusText: {
    color: '#DC2626',
  },
  itemToggle: {
    width: 44,
    height: 28,
    backgroundColor: '#D1D5DB',
    borderRadius: 14,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeItemToggle: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOpacity: 0.3,
  },
  itemToggleSwitch: {
    width: 22,
    height: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeItemToggleSwitch: {
    transform: [{ translateX: 16 }],
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filtersModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    minHeight: 300,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#111827',
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 30,
  },
  filterOptions: {
    marginBottom: 30,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioButton: {
    borderColor: '#111827',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#111827',
  },
  applyButton: {
    backgroundColor: '#111827',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
  },
  emptyStateBox: {
    width: 120,
    height: 120,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyStateBoxText: {
    fontSize: 48,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  // Header Actions
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  modalCloseIcon: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  modalSpacer: {
    width: 32,
  },
  modalScrollContainer: {
    flex: 1,
  },
  modalScrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  // Notification Modal Styles
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  unreadNotification: {
    backgroundColor: '#F0F9FF',
    borderColor: '#3B82F6',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationIconText: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationTimestamp: {
    fontSize: 12,
    color: '#6B7280',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginLeft: 8,
    marginTop: 4,
  },
  emptyNotifications: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyNotificationsIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyNotificationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptyNotificationsSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  // Help Modal Styles
  helpTopicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  helpTopicIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  helpTopicContent: {
    flex: 1,
  },
  helpTopicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  helpTopicDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  helpTopicArrow: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  // Help Detail Modal Styles
  helpSection: {
    marginBottom: 32,
  },
  helpSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  tipBullet: {
    fontSize: 16,
    color: '#3B82F6',
    marginRight: 12,
    marginTop: 2,
    fontWeight: 'bold',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  },
  faqItem: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});

export default InventoryOverviewScreen; 