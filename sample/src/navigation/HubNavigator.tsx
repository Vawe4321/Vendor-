import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, CommonActions } from '@react-navigation/native';

import { HubStackParamList } from './types';
import { theme } from '../theme';
import { SPACING, FONT_SIZES, SHADOWS, BORDER_RADIUS } from '../utils/responsive';
import ContactAccountManagerScreen from '../screens/profile/ContactAccountManagerScreen';
import OrderHistoryScreen from '../screens/profile/OrderHistoryScreen';
import PayoutsScreen from '../screens/profile/PayoutsScreen';
import ShareFeedbackScreen from '../screens/profile/ShareFeedbackScreen';
import SmartLinkScreen from '../screens/profile/SmartLinkScreen';
import ExploreMoreScreen from '../screens/profile/ExploreMoreScreen';
import OutletInfoScreen from '../screens/profile/OutletInfoScreen';
import TimingsScreen from '../screens/profile/TimingsScreen';
import ContactDetailsScreen from '../screens/profile/ContactDetailsScreen';
import ImportantContactsScreen from '../screens/profile/ImportantContactsScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import NotificationSettingsScreen from '../screens/profile/NotificationSettingsScreen';
import TroubleshootingGuideScreen from '../screens/profile/TroubleshootingGuideScreen';
import ManageCommunicationsScreen from '../screens/profile/ManageCommunicationsScreen';
import DeliverySettingsScreen from '../screens/profile/DeliverySettingsScreen';
import RushHourScreen from '../screens/profile/RushHourScreen';
import ScheduleOffScreen from '../screens/profile/ScheduleOffScreen';
import ComplaintsScreen from '../screens/profile/ComplaintsScreen';
import ReviewsScreen from '../screens/profile/ReviewsScreen';
import HelpCentreScreen from '../screens/profile/HelpCentreScreen';
import OutletStatusScreen from '../screens/profile/OutletStatusScreen';
import PaymentBillingScreen from '../screens/profile/PaymentBillingScreen';
import CustomerSupportScreen from '../screens/profile/CustomerSupportScreen';
import GeneralInformationScreen from '../screens/profile/GeneralInformationScreen';
import InvoicesScreen from '../screens/profile/InvoicesScreen';
import TaxesScreen from '../screens/profile/TaxesScreen';
import ProfileDataScreen from '../screens/profile/ProfileDataScreen';

import TestScreen from '../screens/profile/TestScreen';

const Stack = createStackNavigator<HubStackParamList>();

const HubScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('My Feed');
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedHelpTopic, setSelectedHelpTopic] = useState(null);
  const [showHelpDetailModal, setShowHelpDetailModal] = useState(false);

  const tabs = ['My Feed', 'Sales', 'Funnel', 'Service quality', 'Kitchen efficiency', 'Customer', 'Offers'];

  // Mock data for notifications
  const notificationsData = [
    {
      id: 'notif_001',
      type: 'sales',
      title: 'Sales Milestone Reached!',
      message: 'Congratulations! You\'ve achieved ₹10,000 in sales this week',
      isRead: false,
      timestamp: '2 minutes ago',
      priority: 'high',
      icon: '🎉',
    },
    {
      id: 'notif_002',
      type: 'order',
      title: 'New Order Alert',
      message: 'Order #ORD-2025-015 received with items worth ₹450',
      isRead: false,
      timestamp: '5 minutes ago',
      priority: 'medium',
      icon: '📦',
    },
    {
      id: 'notif_003',
      type: 'analytics',
      title: 'Weekly Report Available',
      message: 'Your detailed analytics report for this week is ready',
      isRead: false,
      timestamp: '1 hour ago',
      priority: 'medium',
      icon: '📊',
    },
    {
      id: 'notif_004',
      type: 'system',
      title: 'App Update Available',
      message: 'New version 2.1.0 is available with performance improvements',
      isRead: true,
      timestamp: '2 hours ago',
      priority: 'low',
      icon: '🔄',
    },
    {
      id: 'notif_005',
      type: 'promotion',
      title: 'Special Offer Campaign',
      message: 'Boost your sales with our new promotional campaign',
      isRead: true,
      timestamp: '3 hours ago',
      priority: 'low',
      icon: '🎯',
    },
  ];

  // Mock data for help & support
  const helpData = [
    {
      id: 'help_001',
      category: 'Analytics',
      title: 'Understanding Sales Metrics',
      description: 'Learn how to interpret your sales data and trends',
      icon: '📈',
      content: {
        steps: [
          {
            step: 1,
            title: 'Access Your Dashboard',
            description: 'Navigate to the Sales tab in your main dashboard to view all sales metrics.'
          },
          {
            step: 2,
            title: 'Review Net Sales',
            description: 'Check your net sales figure which represents total revenue after discounts and refunds.'
          },
          {
            step: 3,
            title: 'Analyze Order Volume',
            description: 'Monitor the number of orders delivered to understand your business volume.'
          },
          {
            step: 4,
            title: 'Calculate Average Order Value',
            description: 'Divide net sales by total orders to understand customer spending patterns.'
          },
          {
            step: 5,
            title: 'Compare Periods',
            description: 'Use the week-over-week comparison to identify trends and growth patterns.'
          }
        ],
        tips: [
          'Focus on net sales growth rather than just order volume',
          'Monitor average order value trends for pricing strategy',
          'Set up alerts for significant sales drops',
          'Use the insights button for deeper analysis',
          'Export data regularly for external analysis'
        ],
        faqs: [
          {
            question: 'What is the difference between gross and net sales?',
            answer: 'Gross sales include all revenue before discounts and refunds, while net sales represent actual revenue after these deductions.'
          },
          {
            question: 'How often is the data updated?',
            answer: 'Sales data is updated in real-time, with the last update timestamp shown at the top of each section.'
          },
          {
            question: 'Can I export this data?',
            answer: 'Yes, use the three-dot menu in the top-right corner of each section to export data in various formats.'
          }
        ]
      }
    },
    {
      id: 'help_002',
      category: 'Orders',
      title: 'Managing Orders Efficiently',
      description: 'Best practices for handling orders and customer service',
      icon: '📋',
      content: {
        steps: [
          {
            step: 1,
            title: 'Monitor Order Dashboard',
            description: 'Regularly check your order dashboard for new incoming orders and status updates.'
          },
          {
            step: 2,
            title: 'Set Preparation Times',
            description: 'Accurately set kitchen preparation times to manage customer expectations.'
          },
          {
            step: 3,
            title: 'Update Order Status',
            description: 'Promptly update order status from "Preparing" to "Ready" to "Out for Delivery".'
          },
          {
            step: 4,
            title: 'Handle Rejections',
            description: 'Only reject orders when absolutely necessary and provide clear reasons.'
          },
          {
            step: 5,
            title: 'Track Delivery',
            description: 'Monitor delivery times and ensure smooth handover to delivery partners.'
          }
        ],
        tips: [
          'Keep preparation times realistic to avoid delays',
          'Communicate with customers for any delays',
          'Train staff on proper order status updates',
          'Use the search function to quickly find specific orders',
          'Set up notifications for high-value orders'
        ],
        faqs: [
          {
            question: 'What should I do if an order is delayed?',
            answer: 'Update the order status immediately and consider contacting the customer to inform them of the delay.'
          },
          {
            question: 'How do I handle customer complaints?',
            answer: 'Address complaints promptly through the Feedback section and take corrective action when needed.'
          },
          {
            question: 'Can I modify an order after accepting it?',
            answer: 'Contact customer support immediately if you need to modify an accepted order.'
          }
        ]
      }
    },
    {
      id: 'help_003',
      category: 'Promotions',
      title: 'Creating Effective Campaigns',
      description: 'How to design promotions that drive sales',
      icon: '🎯',
      content: {
        steps: [
          {
            step: 1,
            title: 'Define Your Goals',
            description: 'Clearly identify what you want to achieve: increase orders, boost average order value, or attract new customers.'
          },
          {
            step: 2,
            title: 'Choose Promotion Type',
            description: 'Select from percentage discounts, flat rate discounts, buy-one-get-one, or free delivery offers.'
          },
          {
            step: 3,
            title: 'Set Time Limits',
            description: 'Create urgency with limited-time offers, typically 24-72 hours for best results.'
          },
          {
            step: 4,
            title: 'Target Right Items',
            description: 'Promote high-margin items or slow-moving inventory to maximize profitability.'
          },
          {
            step: 5,
            title: 'Monitor Performance',
            description: 'Track promotion effectiveness through the Offers tab in your analytics dashboard.'
          }
        ],
        tips: [
          'Start with small discounts and increase based on performance',
          'Avoid promoting already popular items',
          'Use clear, compelling offer descriptions',
          'Test different discount percentages',
          'Schedule promotions during peak hours'
        ],
        faqs: [
          {
            question: 'What discount percentage works best?',
            answer: 'Start with 10-15% discounts and adjust based on your profit margins and customer response.'
          },
          {
            question: 'How long should a promotion run?',
            answer: 'Most effective promotions run for 24-72 hours to create urgency without losing momentum.'
          },
          {
            question: 'Can I run multiple promotions simultaneously?',
            answer: 'Yes, but avoid overlapping promotions on the same items to prevent confusion.'
          }
        ]
      }
    },
    {
      id: 'help_004',
      category: 'Reports',
      title: 'Generating Business Reports',
      description: 'Step-by-step guide to creating comprehensive reports',
      icon: '📊',
      content: {
        steps: [
          {
            step: 1,
            title: 'Select Report Type',
            description: 'Choose from sales reports, order analytics, customer insights, or performance metrics.'
          },
          {
            step: 2,
            title: 'Set Date Range',
            description: 'Select the time period for your report: daily, weekly, monthly, or custom range.'
          },
          {
            step: 3,
            title: 'Choose Metrics',
            description: 'Select specific metrics to include: revenue, orders, customer data, or operational metrics.'
          },
          {
            step: 4,
            title: 'Generate Report',
            description: 'Click the "Get deeper insights" button to create your comprehensive report.'
          },
          {
            step: 5,
            title: 'Export and Share',
            description: 'Download the report in PDF or Excel format and share with your team or stakeholders.'
          }
        ],
        tips: [
          'Generate reports regularly to track trends',
          'Compare periods to identify growth patterns',
          'Focus on actionable insights',
          'Share reports with your team',
          'Use reports for business planning'
        ],
        faqs: [
          {
            question: 'How often should I generate reports?',
            answer: 'Generate weekly reports for regular monitoring and monthly reports for strategic planning.'
          },
          {
            question: 'What format are reports available in?',
            answer: 'Reports can be exported in PDF, Excel, and CSV formats for easy sharing and analysis.'
          },
          {
            question: 'Can I customize report metrics?',
            answer: 'Yes, you can select specific metrics and date ranges to create customized reports.'
          }
        ]
      }
    },
    {
      id: 'help_005',
      category: 'Technical',
      title: 'App Troubleshooting',
      description: 'Common issues and solutions for the Grooso app',
      icon: '🔧',
      content: {
        steps: [
          {
            step: 1,
            title: 'Check Internet Connection',
            description: 'Ensure you have a stable internet connection as the app requires constant connectivity.'
          },
          {
            step: 2,
            title: 'Restart the App',
            description: 'Close the app completely and reopen it to resolve most temporary issues.'
          },
          {
            step: 3,
            title: 'Clear App Cache',
            description: 'Go to your device settings and clear the app cache if issues persist.'
          },
          {
            step: 4,
            title: 'Update the App',
            description: 'Ensure you have the latest version of the Grooso app installed.'
          },
          {
            step: 5,
            title: 'Contact Support',
            description: 'If problems continue, contact our technical support team through the help section.'
          }
        ],
        tips: [
          'Keep your device updated with the latest OS version',
          'Use a stable Wi-Fi connection when possible',
          'Don\'t force-close the app during order processing',
          'Enable notifications for important updates',
          'Backup your data regularly'
        ],
        faqs: [
          {
            question: 'The app is not loading orders. What should I do?',
            answer: 'First check your internet connection, then restart the app. If the issue persists, clear the app cache.'
          },
          {
            question: 'How do I update the app?',
            answer: 'Go to your device\'s app store and check for updates, or enable automatic updates.'
          },
          {
            question: 'What if I can\'t log in?',
            answer: 'Verify your credentials, check your internet connection, and contact support if the issue continues.'
          }
        ]
      }
    },
  ];

  const handleNotificationsPress = () => {
    setShowNotificationsModal(true);
  };

  const handleHelpPress = () => {
    setShowHelpModal(true);
  };

  const handleHelpTopicPress = (helpTopic) => {
    setSelectedHelpTopic(helpTopic);
    setShowHelpDetailModal(true);
  };

  const renderMyFeedContent = () => (
    <>
      {/* Today so far */}
      <View style={styles.todaySection}>
        <View style={styles.todayHeader}>
          <Text style={styles.todayTitle}>Today so far</Text>
          <View style={styles.liveIndicator}>
            <Text style={styles.liveText}>• Live</Text>
          </View>
        </View>
        <View style={styles.todayStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total sales</Text>
            <Text style={styles.statValue}>₹306</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total orders</Text>
            <Text style={styles.statValue}>2</Text>
          </View>
        </View>
        <View style={styles.timelineChart}>
          <View style={styles.timelineLabels}>
            <Text style={styles.timelineLabel}>12am</Text>
            <Text style={styles.timelineLabel}>4am</Text>
            <Text style={styles.timelineLabel}>8am</Text>
            <Text style={styles.timelineLabel}>12pm</Text>
            <Text style={styles.timelineLabel}>4pm</Text>
            <Text style={styles.timelineLabel}>8pm</Text>
          </View>
          <View style={styles.timelineBars}>
            <View style={[styles.timelineBar, { left: '50%' }]} />
            <View style={[styles.timelineBar, { left: '55%' }]} />
          </View>
        </View>
      </View>

      {/* Quick links */}
      <View style={styles.quickLinksSection}>
        <Text style={styles.sectionTitle}>Quick links</Text>
        <View style={styles.quickLinksGrid}>
          <TouchableOpacity 
            style={styles.quickLinkItem}
            onPress={() => navigation.navigate('ContactAccountManager' as never)}
          >
            <Icon name="work" size={24} color={theme.colors.text.secondary} />
            <Text style={styles.quickLinkText}>Grooso manager</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickLinkItem}
            onPress={() => navigation.navigate('OrderHistory' as never)}
          >
            <Icon name="inbox" size={24} color={theme.colors.text.secondary} />
            <Text style={styles.quickLinkText}>Order history</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickLinkItem}
            onPress={() => navigation.navigate('Payouts' as never)}
          >
            <Icon name="account-balance-wallet" size={24} color={theme.colors.text.secondary} />
            <Text style={styles.quickLinkText}>Payout</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickLinkItem}
            onPress={() => {
              navigation.dispatch(
                CommonActions.navigate({
                  name: 'Feedback',
                })
              );
            }}
          >
            <Icon name="chat" size={24} color={theme.colors.text.secondary} />
            <Text style={styles.quickLinkText}>Complaints</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickLinkItem}
            onPress={() => {
              navigation.dispatch(
                CommonActions.navigate({
                  name: 'Feedback',
                  params: {
                    FeedbackOverview: {
                      initialTab: 'Reviews'
                    }
                  }
                })
              );
            }}
          >
            <Icon name="star" size={24} color={theme.colors.text.secondary} />
            <Text style={styles.quickLinkText}>Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickLinkItem}
            onPress={() => navigation.navigate('ShareFeedback')}
          >
            <Icon name="comment" size={24} color={theme.colors.text.secondary} />
            <Text style={styles.quickLinkText}>Share your feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickLinkItem}
            onPress={() => navigation.navigate('SmartLink')}
          >
            <Icon name="link" size={24} color={theme.colors.text.secondary} />
            <Text style={styles.quickLinkText}>Smart link</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickLinkItem}
            onPress={() => navigation.navigate('ExploreMore')}
          >
            <Icon name="apps" size={24} color={theme.colors.text.secondary} />
            <Text style={styles.quickLinkText}>Show all</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  const renderSalesContent = () => (
    <View style={styles.salesContainer}>
      {/* Header */}
      <View style={styles.salesHeader}>
        <View style={styles.salesHeaderLeft}>
          <Text style={styles.salesTitle}>Sales</Text>
          <Text style={styles.lastUpdated}>Last updated: few seconds ago</Text>
        </View>
        <TouchableOpacity style={styles.optionsButton}>
          <Icon name="more-vert" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Metrics */}
      <View style={styles.salesMetrics}>
        {/* Net Sales */}
        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricLabel}>Net sales</Text>
            <View style={styles.metricValueContainer}>
              <Text style={styles.metricValue}>₹3,044</Text>
              <View style={styles.changeIndicator}>
                <Icon name="keyboard-arrow-down" size={16} color="#F44336" />
                <Text style={styles.changeText}>50%</Text>
              </View>
            </View>
          </View>
          <View style={styles.lineChart}>
            <View style={styles.chartLabels}>
              <Text style={styles.chartLabel}>M</Text>
              <Text style={styles.chartLabel}>T</Text>
              <Text style={styles.chartLabel}>W</Text>
              <Text style={styles.chartLabel}>T</Text>
              <Text style={styles.chartLabel}>F</Text>
              <Text style={styles.chartLabel}>S</Text>
              <Text style={styles.chartLabel}>S</Text>
            </View>
            <View style={styles.chartLines}>
              <View style={styles.thisWeekLine} />
              <View style={styles.lastWeekLine} />
            </View>
          </View>
        </View>

        {/* Orders Delivered */}
        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricLabel}>Orders delivered</Text>
            <View style={styles.metricValueContainer}>
              <Text style={styles.metricValue}>13</Text>
              <View style={styles.changeIndicator}>
                <Icon name="keyboard-arrow-down" size={16} color="#F44336" />
                <Text style={styles.changeText}>48%</Text>
              </View>
            </View>
          </View>
          <View style={styles.lineChart}>
            <View style={styles.chartLabels}>
              <Text style={styles.chartLabel}>M</Text>
              <Text style={styles.chartLabel}>T</Text>
              <Text style={styles.chartLabel}>W</Text>
              <Text style={styles.chartLabel}>T</Text>
              <Text style={styles.chartLabel}>F</Text>
              <Text style={styles.chartLabel}>S</Text>
              <Text style={styles.chartLabel}>S</Text>
            </View>
            <View style={styles.chartLines}>
              <View style={styles.thisWeekLine} />
              <View style={styles.lastWeekLine} />
            </View>
          </View>
        </View>

        {/* Avg Order Value */}
        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricLabel}>Avg. order value</Text>
            <View style={styles.metricValueContainer}>
              <Text style={styles.metricValue}>₹234</Text>
              <View style={styles.changeIndicator}>
                <Icon name="keyboard-arrow-down" size={16} color="#F44336" />
                <Text style={styles.changeText}>4%</Text>
              </View>
            </View>
          </View>
          <View style={styles.lineChart}>
            <View style={styles.chartLabels}>
              <Text style={styles.chartLabel}>M</Text>
              <Text style={styles.chartLabel}>T</Text>
              <Text style={styles.chartLabel}>W</Text>
              <Text style={styles.chartLabel}>T</Text>
              <Text style={styles.chartLabel}>F</Text>
              <Text style={styles.chartLabel}>S</Text>
              <Text style={styles.chartLabel}>S</Text>
            </View>
            <View style={styles.chartLines}>
              <View style={styles.thisWeekLine} />
              <View style={styles.lastWeekLine} />
            </View>
          </View>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={styles.legendLine} />
          <Text style={styles.legendText}>- This week</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendLine, styles.legendDashed]} />
          <Text style={styles.legendText}>--- Last week</Text>
        </View>
      </View>

      {/* Get Deeper Insights Button */}
      <TouchableOpacity style={styles.insightsButton}>
        <Text style={styles.insightsButtonText}>Get deeper insights</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFunnelContent = () => (
    <View style={styles.funnelContainer}>
      {/* Header */}
      <View style={styles.funnelHeader}>
        <View style={styles.funnelHeaderLeft}>
          <Text style={styles.funnelTitle}>Funnel</Text>
          <Text style={styles.lastUpdated}>Last updated: an hour ago</Text>
        </View>
        <TouchableOpacity style={styles.optionsButton}>
          <Icon name="more-vert" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Funnel Metrics */}
      <View style={styles.funnelMetrics}>
        {/* Impressions */}
        <View style={styles.funnelMetricCard}>
          <View style={styles.funnelMetricRow}>
            <View style={styles.funnelMetricInfo}>
              <Text style={styles.funnelMetricLabel}>Impressions (I)</Text>
              <View style={styles.funnelMetricValueRow}>
                <Text style={styles.funnelMetricValue}>581</Text>
                <View style={styles.funnelChangeIndicator}>
                  <Icon name="keyboard-arrow-down" size={16} color="#F44336" />
                  <Text style={styles.funnelChangeText}>26%</Text>
                </View>
              </View>
            </View>
            <View style={styles.funnelBarContainer}>
              <View style={styles.funnelBar} />
            </View>
            <View style={styles.funnelConversionInfo}>
              <Text style={styles.funnelConversionLabel}>I2M</Text>
              <Text style={styles.funnelConversionValue}>20.5%</Text>
              <View style={styles.funnelConversionChange}>
                <Icon name="keyboard-arrow-up" size={12} color="#4CAF50" />
                <Text style={styles.funnelConversionChangeText}>5%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu opens */}
        <View style={styles.funnelMetricCard}>
          <View style={styles.funnelMetricRow}>
            <View style={styles.funnelMetricInfo}>
              <Text style={styles.funnelMetricLabel}>Menu opens (M)</Text>
              <View style={styles.funnelMetricValueRow}>
                <Text style={styles.funnelMetricValue}>119</Text>
                <View style={styles.funnelChangeIndicator}>
                  <Icon name="keyboard-arrow-down" size={16} color="#F44336" />
                  <Text style={styles.funnelChangeText}>23%</Text>
                </View>
              </View>
            </View>
            <View style={styles.funnelBarContainer}>
              <View style={[styles.funnelBar, { width: '20%' }]} />
            </View>
            <View style={styles.funnelConversionInfo}>
              <Text style={styles.funnelConversionLabel}>M2C</Text>
              <Text style={styles.funnelConversionValue}>39.5%</Text>
              <View style={styles.funnelConversionChange}>
                <Icon name="keyboard-arrow-down" size={12} color="#F44336" />
                <Text style={styles.funnelConversionChangeText}>14%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Cart builds */}
        <View style={styles.funnelMetricCard}>
          <View style={styles.funnelMetricRow}>
            <View style={styles.funnelMetricInfo}>
              <Text style={styles.funnelMetricLabel}>Cart builds (C)</Text>
              <View style={styles.funnelMetricValueRow}>
                <Text style={styles.funnelMetricValue}>47</Text>
                <View style={styles.funnelChangeIndicator}>
                  <Icon name="keyboard-arrow-down" size={16} color="#F44336" />
                  <Text style={styles.funnelChangeText}>34%</Text>
                </View>
              </View>
            </View>
            <View style={styles.funnelBarContainer}>
              <View style={[styles.funnelBar, { width: '8%' }]} />
            </View>
            <View style={styles.funnelConversionInfo}>
              <Text style={styles.funnelConversionLabel}>C2O</Text>
              <Text style={styles.funnelConversionValue}>38.3%</Text>
              <View style={styles.funnelConversionChange}>
                <Icon name="keyboard-arrow-down" size={12} color="#F44336" />
                <Text style={styles.funnelConversionChangeText}>6%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Orders placed */}
        <View style={styles.funnelMetricCard}>
          <View style={styles.funnelMetricRow}>
            <View style={styles.funnelMetricInfo}>
              <Text style={styles.funnelMetricLabel}>Orders placed (O)</Text>
              <View style={styles.funnelMetricValueRow}>
                <Text style={styles.funnelMetricValue}>18</Text>
                <View style={styles.funnelChangeIndicator}>
                  <Icon name="keyboard-arrow-down" size={16} color="#F44336" />
                  <Text style={styles.funnelChangeText}>38%</Text>
                </View>
              </View>
            </View>
            <View style={styles.funnelBarContainer}>
              <View style={[styles.funnelBar, { width: '3%' }]} />
            </View>
            <View style={styles.funnelConversionInfo}>
              <Text style={styles.funnelConversionLabel}>Delivered</Text>
              <Text style={styles.funnelConversionValue}>72.2%</Text>
              <View style={styles.funnelConversionChange}>
                <Icon name="keyboard-arrow-down" size={12} color="#F44336" />
                <Text style={styles.funnelConversionChangeText}>16%</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Get Deeper Insights Button */}
      <TouchableOpacity style={styles.insightsButton}>
        <Text style={styles.insightsButtonText}>Get deeper insights</Text>
      </TouchableOpacity>
    </View>
  );

  const renderServiceQualityContent = () => (
    <View style={styles.serviceQualityContainer}>
      {/* Header */}
      <View style={styles.serviceQualityHeader}>
        <View style={styles.serviceQualityHeaderLeft}>
          <Text style={styles.serviceQualityTitle}>Service quality</Text>
          <Text style={styles.lastUpdated}>Last updated: an hour ago</Text>
        </View>
        <TouchableOpacity style={styles.optionsButton}>
          <Icon name="more-vert" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Service Quality Metrics Grid */}
      <View style={styles.serviceQualityGrid}>
        {/* Top Row */}
        <View style={styles.serviceQualityRow}>
          {/* Rejected orders */}
          <View style={styles.serviceQualityCard}>
            <Text style={styles.serviceQualityLabel}>Rejected orders</Text>
            <Text style={styles.serviceQualityValue}>27.8%</Text>
            <View style={styles.serviceQualityChange}>
              <Icon name="keyboard-arrow-up" size={16} color="#F44336" />
              <Text style={styles.serviceQualityChangeText}>169%</Text>
            </View>
            <Text style={styles.serviceQualitySubtext}>Rejected sales ₹1,024</Text>
          </View>

          {/* Complaints */}
          <View style={styles.serviceQualityCard}>
            <Text style={styles.serviceQualityLabel}>Complaints</Text>
            <Text style={styles.serviceQualityValue}>0%</Text>
            <View style={styles.serviceQualityChange}>
              <Text style={styles.serviceQualityChangeText}>-</Text>
              <Text style={styles.serviceQualityChangeText}>0%</Text>
            </View>
            <Text style={styles.serviceQualitySubtext}>0% refunded</Text>
          </View>
        </View>

        {/* Bottom Row */}
        <View style={styles.serviceQualityRow}>
          {/* Poor rated orders */}
          <View style={styles.serviceQualityCard}>
            <Text style={styles.serviceQualityLabel}>Poor rated orders</Text>
            <Text style={styles.serviceQualityValue}>0%</Text>
            <View style={styles.serviceQualityChange}>
              <Icon name="keyboard-arrow-right" size={16} color="#4CAF50" />
              <Text style={styles.serviceQualityChangeTextGreen}>100%</Text>
            </View>
            <Text style={styles.serviceQualitySubtext}>1 or 2 star rated</Text>
          </View>

          {/* Online time % */}
          <View style={styles.serviceQualityCard}>
            <Text style={styles.serviceQualityLabel}>Online time %</Text>
            <Text style={styles.serviceQualityValue}>87.4%</Text>
            <View style={styles.serviceQualityChange}>
              <Icon name="keyboard-arrow-down" size={16} color="#F44336" />
              <Text style={styles.serviceQualityChangeText}>5%</Text>
            </View>
            <Text style={styles.serviceQualitySubtext}>Est. lost sales ₹183</Text>
          </View>
        </View>
      </View>

      {/* Get Deeper Insights Button */}
      <TouchableOpacity style={styles.insightsButton}>
        <Text style={styles.insightsButtonText}>Get deeper insights</Text>
      </TouchableOpacity>
    </View>
  );

  const renderKitchenEfficiencyContent = () => (
    <View style={styles.kitchenEfficiencyContainer}>
      {/* Header */}
      <View style={styles.kitchenEfficiencyHeader}>
        <View style={styles.kitchenEfficiencyHeaderLeft}>
          <Text style={styles.kitchenEfficiencyTitle}>Kitchen efficiency</Text>
          <Text style={styles.lastUpdated}>Last updated: few seconds ago</Text>
        </View>
        <TouchableOpacity style={styles.optionsButton}>
          <Icon name="more-vert" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Kitchen Efficiency Metrics Grid */}
      <View style={styles.kitchenEfficiencyGrid}>
        {/* Top Row */}
        <View style={styles.kitchenEfficiencyRow}>
          {/* Avg. kitchen preparation time */}
          <View style={styles.kitchenEfficiencyCard}>
            <Text style={styles.kitchenEfficiencyLabel}>Avg. kitchen preparation time</Text>
            <Text style={styles.kitchenEfficiencyValue}>30 mins</Text>
            <View style={styles.kitchenEfficiencyChange}>
              <Icon name="keyboard-arrow-up" size={16} color="#F44336" />
              <Text style={styles.kitchenEfficiencyChangeText}>1%</Text>
            </View>
          </View>

          {/* KPT delayed orders */}
          <View style={styles.kitchenEfficiencyCard}>
            <Text style={styles.kitchenEfficiencyLabel}>KPT delayed orders</Text>
            <Text style={styles.kitchenEfficiencyValue}>0%</Text>
            <View style={styles.kitchenEfficiencyChange}>
              <Icon name="keyboard-arrow-right" size={16} color="#4CAF50" />
              <Text style={styles.kitchenEfficiencyChangeTextGreen}>100%</Text>
            </View>
            <Text style={styles.kitchenEfficiencySubtext}>0 min avg. delay</Text>
          </View>
        </View>

        {/* Bottom Row */}
        <View style={styles.kitchenEfficiencyRow}>
          {/* Food order ready accuracy */}
          <View style={styles.kitchenEfficiencyCard}>
            <Text style={styles.kitchenEfficiencyLabel}>Food order ready accuracy</Text>
            <Text style={styles.kitchenEfficiencyValue}>11.1%</Text>
            <View style={styles.kitchenEfficiencyChange}>
              <Icon name="keyboard-arrow-down" size={16} color="#F44336" />
              <Text style={styles.kitchenEfficiencyChangeText}>19%</Text>
            </View>
          </View>

          {/* Orders with high rider handover time */}
          <View style={styles.kitchenEfficiencyCard}>
            <Text style={styles.kitchenEfficiencyLabel}>Orders with high rider handover time</Text>
            <Text style={styles.kitchenEfficiencyValue}>5</Text>
            <View style={styles.kitchenEfficiencyChange}>
              <Icon name="keyboard-arrow-down" size={16} color="#4CAF50" />
              <Text style={styles.kitchenEfficiencyChangeTextGreen}>64%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Get Deeper Insights Button */}
      <TouchableOpacity style={styles.insightsButton}>
        <Text style={styles.insightsButtonText}>Get deeper insights</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCustomerContent = () => (
    <View style={styles.customerContainer}>
      {/* Header */}
      <View style={styles.customerHeader}>
        <View style={styles.customerHeaderLeft}>
          <Text style={styles.customerTitle}>Customers</Text>
          <Text style={styles.lastUpdated}>Last updated: a day ago</Text>
        </View>
        <TouchableOpacity style={styles.optionsButton}>
          <Icon name="more-vert" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Total Customers Overview */}
      <View style={styles.customerOverview}>
        <View style={styles.donutChartContainer}>
          <View style={styles.donutChart}>
            <View style={styles.donutSegmentRed} />
            <View style={styles.donutSegmentBlack} />
            <View style={styles.donutSegmentBlue} />
          </View>
        </View>
        <View style={styles.customerOverviewInfo}>
          <Text style={styles.customerOverviewLabel}>Total customers</Text>
          <View style={styles.customerOverviewValueRow}>
            <Text style={styles.customerOverviewValue}>16</Text>
            <View style={styles.customerOverviewChange}>
              <Icon name="keyboard-arrow-down" size={16} color="#F44336" />
              <Text style={styles.customerOverviewChangeText}>47%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Customer Categories */}
      <View style={styles.customerCategories}>
        {/* New customers */}
        <View style={styles.customerCategory}>
          <View style={styles.customerCategoryHeader}>
            <View style={styles.customerCategoryBullet} />
            <Text style={styles.customerCategoryLabel}>New customers</Text>
          </View>
          <Text style={styles.customerCategoryDescription}>No orders in last 365 days</Text>
          <View style={styles.customerCategoryValueRow}>
            <Text style={styles.customerCategoryValue}>7</Text>
            <View style={styles.customerCategoryChange}>
              <Icon name="keyboard-arrow-down" size={16} color="#F44336" />
              <Text style={styles.customerCategoryChangeText}>68%</Text>
            </View>
          </View>
        </View>

        {/* Repeat customers */}
        <View style={styles.customerCategory}>
          <View style={styles.customerCategoryHeader}>
            <View style={[styles.customerCategoryBullet, styles.customerCategoryBulletRed]} />
            <Text style={styles.customerCategoryLabel}>Repeat customers</Text>
          </View>
          <Text style={styles.customerCategoryDescription}>Ordered in last 60 days</Text>
          <View style={styles.customerCategoryValueRow}>
            <Text style={styles.customerCategoryValue}>8</Text>
            <View style={styles.customerCategoryChange}>
              <Icon name="keyboard-arrow-up" size={16} color="#4CAF50" />
              <Text style={styles.customerCategoryChangeTextGreen}>14%</Text>
            </View>
          </View>
        </View>

        {/* Lapsed customers */}
        <View style={styles.customerCategory}>
          <View style={styles.customerCategoryHeader}>
            <View style={[styles.customerCategoryBullet, styles.customerCategoryBulletBlue]} />
            <Text style={styles.customerCategoryLabel}>Lapsed customers</Text>
          </View>
          <Text style={styles.customerCategoryDescription}>Last order 60 to 365 days ago</Text>
          <View style={styles.customerCategoryValueRow}>
            <Text style={styles.customerCategoryValue}>1</Text>
            <View style={styles.customerCategoryChange}>
              <Text style={styles.customerCategoryChangeText}>-</Text>
              <Text style={styles.customerCategoryChangeText}>0%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Get Deeper Insights Button */}
      <TouchableOpacity style={styles.insightsButton}>
        <Text style={styles.insightsButtonText}>Get deeper insights</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOffersContent = () => (
    <View style={styles.offersContainer}>
      {/* Header */}
      <View style={styles.offersHeader}>
        <View style={styles.offersHeaderLeft}>
          <Text style={styles.offersTitle}>Offers</Text>
          <Text style={styles.lastUpdated}>Last updated: a day ago</Text>
        </View>
        <TouchableOpacity style={styles.optionsButton}>
          <Icon name="more-vert" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Offers Metrics Grid */}
      <View style={styles.offersGrid}>
        {/* Top Row */}
        <View style={styles.offersRow}>
          {/* Gross sales from offers */}
          <View style={styles.offersCard}>
            <Text style={styles.offersLabel}>Gross sales from offers</Text>
            <Text style={styles.offersValue}>₹4,471</Text>
            <View style={styles.offersChange}>
              <Icon name="keyboard-arrow-down" size={16} color="#F44336" />
              <Text style={styles.offersChangeText}>46%</Text>
            </View>
            <Text style={styles.offersSubtext}>129.7% of total gross sales</Text>
          </View>

          {/* Discount given */}
          <View style={styles.offersCard}>
            <Text style={styles.offersLabel}>Discount given</Text>
            <Text style={styles.offersValue}>₹709</Text>
            <View style={styles.offersChange}>
              <Icon name="keyboard-arrow-down" size={16} color="#F44336" />
              <Text style={styles.offersChangeText}>38%</Text>
            </View>
            <Text style={styles.offersSubtext}>₹64 discount per order</Text>
          </View>
        </View>

        {/* Separator */}
        <View style={styles.offersSeparator} />

        {/* Bottom Row */}
        <View style={styles.offersRow}>
          {/* Orders from offers */}
          <View style={styles.offersCard}>
            <Text style={styles.offersLabel}>Orders from offers</Text>
            <Text style={styles.offersValue}>16</Text>
            <View style={styles.offersChange}>
              <Icon name="keyboard-arrow-down" size={16} color="#F44336" />
              <Text style={styles.offersChangeText}>38%</Text>
            </View>
            <Text style={styles.offersSubtext}>145.5% of total orders</Text>
          </View>

          {/* Effective discount */}
          <View style={styles.offersCard}>
            <Text style={styles.offersLabel}>Effective discount</Text>
            <Text style={styles.offersValue}>15.9%</Text>
            <View style={styles.offersChange}>
              <Icon name="keyboard-arrow-up" size={16} color="#4CAF50" />
              <Text style={styles.offersChangeTextGreen}>16%</Text>
            </View>
            <Text style={styles.offersSubtext}>Discount given/Gross sales from offers</Text>
          </View>
        </View>
      </View>

      {/* Get Deeper Insights Button */}
      <TouchableOpacity style={styles.insightsButton}>
        <Text style={styles.insightsButtonText}>Get deeper insights</Text>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'My Feed':
        return renderMyFeedContent();
      case 'Sales':
        return renderSalesContent();
      case 'Funnel':
        return renderFunnelContent();
      case 'Service quality':
        return renderServiceQualityContent();
      case 'Kitchen efficiency':
        return renderKitchenEfficiencyContent();
      case 'Customer':
        return renderCustomerContent();
      case 'Offers':
        return renderOffersContent();
      default:
        return renderMyFeedContent();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerMain}>
            <View style={styles.restaurantInfo}>
              <Text style={styles.showingData}>SHOWING DATA FOR</Text>
              <Text style={styles.restaurantName}>Grooso's Kitchen</Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton} onPress={handleNotificationsPress}>
                <View style={styles.notificationContainer}>
                  <Icon name="notifications" size={24} color={theme.colors.text.primary} />
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationBadgeText}>3</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={handleHelpPress}>
                <Icon name="help" size={24} color={theme.colors.text.primary} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => navigation.navigate('Hub', { screen: 'ExploreMore' })}
              >
                <Icon name="menu" size={24} color={theme.colors.text.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Navigation Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          style={styles.tabScrollContainer}
          contentContainerStyle={styles.tabScrollContent}
          bounces={false}
          decelerationRate="fast"
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {renderContent()}

        {/* Branding */}
        <View style={styles.branding}>
          <Text style={styles.brandingText}>grooso</Text>
        </View>
      </ScrollView>

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
                    {selectedHelpTopic.content.steps.map((step, index) => (
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
                    {selectedHelpTopic.content.tips.map((tip, index) => (
                      <View key={index} style={styles.tipItem}>
                        <Text style={styles.tipBullet}>•</Text>
                        <Text style={styles.tipText}>{tip}</Text>
                      </View>
                    ))}
                  </View>

                  {/* FAQ Section */}
                  <View style={styles.helpSection}>
                    <Text style={styles.helpSectionTitle}>Frequently Asked Questions</Text>
                    {selectedHelpTopic.content.faqs.map((faq, index) => (
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

const HubNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="HubMain" 
        component={HubScreen}
      />
      <Stack.Screen 
        name="ContactAccountManager" 
        component={ContactAccountManagerScreen}
        options={{ title: 'Contact account manager' }}
      />
      <Stack.Screen 
        name="OrderHistory" 
        component={OrderHistoryScreen}
        options={{ title: 'Order history' }}
      />
      <Stack.Screen 
        name="Payouts" 
        component={PayoutsScreen}
        options={{ title: 'Payouts' }}
      />
      <Stack.Screen 
        name="ShareFeedback" 
        component={ShareFeedbackScreen}
        options={{ title: 'Share your feedback' }}
      />
      <Stack.Screen 
        name="SmartLink" 
        component={SmartLinkScreen}
        options={{ title: 'Partner Smart Link' }}
      />
      <Stack.Screen 
        name="ExploreMore" 
        component={ExploreMoreScreen}
        options={{ title: 'Explore more' }}
      />
      <Stack.Screen 
        name="OutletInfo" 
        component={OutletInfoScreen}
        options={{ title: 'Outlet Info' }}
      />
      <Stack.Screen 
        name="Timings" 
        component={TimingsScreen}
        options={{ title: 'Outlet Timings' }}
      />
      <Stack.Screen 
        name="ContactDetails" 
        component={ContactDetailsScreen}
        options={{ title: 'Contact Details' }}
      />
      <Stack.Screen 
        name="ImportantContacts" 
        component={ImportantContactsScreen}
        options={{ title: 'Important Contacts' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
              <Stack.Screen
          name="NotificationSettings"
          component={NotificationSettingsScreen}
          options={{ title: 'Notification Settings' }}
        />
        <Stack.Screen
          name="Troubleshoot"
          component={TroubleshootingGuideScreen}
          options={{ title: 'Troubleshooting Guide' }}
        />
        <Stack.Screen
          name="ManageCommunications"
          component={ManageCommunicationsScreen}
          options={{ title: 'Manage Communications' }}
        />
        <Stack.Screen
          name="DeliverySettings"
          component={DeliverySettingsScreen}
          options={{ title: 'Delivery Settings' }}
        />

        <Stack.Screen
          name="RushHour"
          component={RushHourScreen}
          options={{ title: 'Rush Hour' }}
        />

        <Stack.Screen
          name="ScheduleOff"
          component={ScheduleOffScreen}
          options={{ title: 'Schedule Off' }}
        />

        <Stack.Screen
          name="Complaints"
          component={ComplaintsScreen}
          options={{ title: 'Complaints' }}
        />

        <Stack.Screen
          name="Reviews"
          component={ReviewsScreen}
          options={{ title: 'Reviews' }}
        />

        <Stack.Screen
          name="HelpCentre"
          component={HelpCentreScreen}
          options={{ title: 'Help Centre' }}
        />

        <Stack.Screen
          name="OutletStatus"
          component={OutletStatusScreen}
          options={{ title: 'Outlet Status' }}
        />

        <Stack.Screen
          name="PaymentBilling"
          component={PaymentBillingScreen}
          options={{ title: 'Payment & Billing' }}
        />

        <Stack.Screen
          name="CustomerSupport"
          component={CustomerSupportScreen}
          options={{ title: 'Customer Support' }}
        />

        <Stack.Screen
          name="GeneralInformation"
          component={GeneralInformationScreen}
          options={{ title: 'General Information' }}
        />

        <Stack.Screen
          name="Invoices"
          component={InvoicesScreen}
          options={{ title: 'Invoices' }}
        />

        <Stack.Screen
          name="Taxes"
          component={TaxesScreen}
          options={{ title: 'Taxes' }}
        />

        <Stack.Screen
          name="ProfileData"
          component={ProfileDataScreen}
          options={{ title: 'Profile Data' }}
        />

      <Stack.Screen 
        name="Test" 
        component={TestScreen}
        options={{ title: 'Test Screen' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.paper,
  },
  scrollView: {
    flex: 1,
  },
  
  // Header
  header: {
    backgroundColor: theme.colors.background.paper,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
  },
  headerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantInfo: {
    flex: 1,
  },
  showingData: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.xs,
  },
  restaurantName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  iconButton: {
    padding: SPACING.sm,
  },
  
  // Navigation Tabs
  tabScrollContainer: {
    marginHorizontal: SPACING.xl,
    marginVertical: SPACING.sm,
  },
  tabScrollContent: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  tab: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
    minWidth: 120,
    backgroundColor: theme.colors.background.level1,
  },
  activeTab: {
    backgroundColor: theme.colors.text.primary,
    ...SHADOWS.medium,
  },
  tabText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  activeTabText: {
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
  
  // Today Section
  todaySection: {
    backgroundColor: theme.colors.background.paper,
    margin: SPACING.xl,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.light,
  },
  todayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  todayTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  liveIndicator: {
    backgroundColor: theme.colors.success.main,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  liveText: {
    color: theme.colors.text.inverse,
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  todayStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.lg,
  },
  timelineChart: {
    marginTop: SPACING.sm,
  },
  timelineLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  timelineLabel: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
  },
  timelineBars: {
    height: 20,
    backgroundColor: theme.colors.background.level1,
    borderRadius: BORDER_RADIUS.sm,
    position: 'relative',
  },
  timelineBar: {
    position: 'absolute',
    width: 8,
    height: 16,
    backgroundColor: theme.colors.text.primary,
    borderRadius: BORDER_RADIUS.xs,
    top: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  
  // Quick Links
  quickLinksSection: {
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: SPACING.lg,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.lg,
  },
  quickLinkItem: {
    width: '21%',
    aspectRatio: 1,
    backgroundColor: theme.colors.background.level1,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  quickLinkText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  
  // Business Insights
  businessInsightsSection: {
    marginHorizontal: 20,
  },
  insightsCard: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 12,
    position: 'relative',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  compareText: {
    fontSize: 12,
    color: '#666',
  },
  exportButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    padding: 5,
  },
  
  // Insight Subsections
  insightSubsection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  metricInfo: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  metricChange: {
    fontSize: 12,
    color: '#F44336',
  },
  miniChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 40,
  },
  chartBar: {
    width: 8,
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  legend: {
    marginBottom: 15,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  insightButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  insightButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Funnel Metrics
  funnelMetric: {
    marginBottom: 15,
  },
  funnelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  funnelLabel: {
    fontSize: 14,
    color: '#666',
  },
  funnelValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  funnelChange: {
    fontSize: 12,
    color: '#F44336',
  },
  funnelBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 5,
  },
  funnelProgress: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    width: '20.5%',
  },
  funnelRate: {
    fontSize: 12,
    color: '#666',
  },
  
  // Quality Metrics
  qualityMetric: {
    marginBottom: 15,
  },
  qualityLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  qualityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  qualityChange: {
    fontSize: 12,
    color: '#F44336',
  },
  qualitySubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  
  // Efficiency Metrics
  efficiencyMetric: {
    marginBottom: 15,
  },
  efficiencyLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  efficiencyValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  efficiencyChange: {
    fontSize: 12,
    color: '#F44336',
  },
  efficiencySubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  
  // Customer Metrics
  customerChart: {
    alignItems: 'center',
    marginBottom: 20,
  },
  donutChart: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutSegment: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: '#F44336',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '-45deg' }],
  },
  customerMetric: {
    marginBottom: 15,
  },
  customerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  customerValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  customerChange: {
    fontSize: 12,
    color: '#F44336',
  },
  customerSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  
  // Offer Metrics
  offerMetric: {
    marginBottom: 15,
  },
  offerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  offerValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  offerChange: {
    fontSize: 12,
    color: '#F44336',
  },
  offerSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  
  // Ad Metrics
  adMetric: {
    marginBottom: 15,
  },
  adLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  adValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  adChange: {
    fontSize: 12,
    color: '#F44336',
  },
  adSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  
  // Sales Content
  salesContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  salesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  salesHeaderLeft: {
    flex: 1,
  },
  salesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#666',
  },
  optionsButton: {
    padding: 5,
  },
  salesMetrics: {
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  metricLabel: {
    fontSize: 16,
    color: '#666',
  },
  metricValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: '500',
  },
  lineChart: {
    marginTop: 15,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  chartLabel: {
    fontSize: 12,
    color: '#666',
  },
  chartLines: {
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    position: 'relative',
  },
  thisWeekLine: {
    position: 'absolute',
    width: '60%',
    height: 3,
    backgroundColor: '#FF9800',
    borderRadius: 2,
    top: 10,
    left: '10%',
  },
  lastWeekLine: {
    position: 'absolute',
    width: '50%',
    height: 3,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    top: 20,
    left: '15%',
    borderStyle: 'dashed',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendLine: {
    width: 20,
    height: 2,
    backgroundColor: '#FF9800',
    marginRight: 8,
  },
  legendDashed: {
    backgroundColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  insightsButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  insightsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  // Funnel Content
  funnelContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  funnelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  funnelHeaderLeft: {
    flex: 1,
  },
  funnelTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  funnelMetrics: {
    marginBottom: 20,
  },
  funnelMetricCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  funnelMetricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  funnelMetricInfo: {
    flex: 1,
  },
  funnelMetricLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  funnelMetricValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  funnelMetricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
  },
  funnelChangeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  funnelChangeText: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: '500',
  },
  funnelBarContainer: {
    width: 60,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginHorizontal: 15,
  },
  funnelBar: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 4,
    width: '100%',
  },
  funnelConversionInfo: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  funnelConversionLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  funnelConversionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  funnelConversionChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  funnelConversionChangeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 2,
  },

  // Service Quality Content
  serviceQualityContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  serviceQualityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceQualityHeaderLeft: {
    flex: 1,
  },
  serviceQualityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  serviceQualityGrid: {
    marginBottom: 20,
  },
  serviceQualityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  serviceQualityCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    width: '48%',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceQualityLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  serviceQualityValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  serviceQualityChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceQualityChangeText: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: '500',
    marginLeft: 4,
  },
  serviceQualityChangeTextGreen: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 4,
  },
  serviceQualitySubtext: {
    fontSize: 12,
    color: '#666',
  },

  // Kitchen Efficiency Content
  kitchenEfficiencyContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  kitchenEfficiencyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  kitchenEfficiencyHeaderLeft: {
    flex: 1,
  },
  kitchenEfficiencyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  kitchenEfficiencyGrid: {
    marginBottom: 20,
  },
  kitchenEfficiencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  kitchenEfficiencyCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    width: '48%',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  kitchenEfficiencyLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  kitchenEfficiencyValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  kitchenEfficiencyChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  kitchenEfficiencyChangeText: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: '500',
    marginLeft: 4,
  },
  kitchenEfficiencyChangeTextGreen: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 4,
  },
  kitchenEfficiencySubtext: {
    fontSize: 12,
    color: '#666',
  },

  // Customer Content
  customerContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  customerHeaderLeft: {
    flex: 1,
  },
  customerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  customerOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  donutChartContainer: {
    marginRight: 20,
  },
  donutChart: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  donutSegmentRed: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: '#F44336',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '-45deg' }],
  },
  donutSegmentBlack: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: '#000',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  donutSegmentBlue: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: '#2196F3',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '135deg' }],
  },
  customerOverviewInfo: {
    flex: 1,
  },
  customerOverviewLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  customerOverviewValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerOverviewValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
  },
  customerOverviewChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerOverviewChangeText: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: '500',
    marginLeft: 4,
  },
  customerCategories: {
    marginBottom: 20,
  },
  customerCategory: {
    marginBottom: 20,
  },
  customerCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  customerCategoryBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginRight: 8,
  },
  customerCategoryBulletRed: {
    backgroundColor: '#F44336',
  },
  customerCategoryBulletBlue: {
    backgroundColor: '#2196F3',
  },
  customerCategoryLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  customerCategoryDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  customerCategoryValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerCategoryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
  },
  customerCategoryChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerCategoryChangeText: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: '500',
    marginLeft: 4,
  },
  customerCategoryChangeTextGreen: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 4,
  },

  // Offers Content
  offersContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  offersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  offersHeaderLeft: {
    flex: 1,
  },
  offersTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  offersGrid: {
    marginBottom: 20,
  },
  offersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  offersCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    width: '48%',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  offersLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  offersValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  offersChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  offersChangeText: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: '500',
    marginLeft: 4,
  },
  offersChangeTextGreen: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 4,
  },
  offersSubtext: {
    fontSize: 12,
    color: '#666',
  },
  offersSeparator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
    borderStyle: 'dashed',
  },
  
  // My Feed Content
  myFeedContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  summaryDate: {
    fontSize: 14,
    color: '#666',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  orderCard: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  preparingBadge: {
    backgroundColor: '#FF9800',
  },
  readyBadge: {
    backgroundColor: '#4CAF50',
  },
  out_for_deliveryBadge: {
    backgroundColor: '#2196F3',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  customerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 5,
  },
  orderItems: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationCard: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },
  urgentNotification: {
    backgroundColor: '#FFEBEE',
    borderLeftWidth: 5,
    borderLeftColor: '#F44336',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 3,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    width: '30%',
    aspectRatio: 1.2,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.sm,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: SPACING.xs,
  },
  actionText: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },

  

   
  // Branding
  branding: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  brandingText: {
    fontSize: FONT_SIZES.lg,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },

  // Notification Badge Styles
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#F44336',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background.paper,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background.level1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseIcon: {
    fontSize: 16,
    color: theme.colors.text.primary,
    fontWeight: 'bold',
  },
  modalTitle: {
    flex: 1,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginHorizontal: SPACING.lg,
  },
  modalSpacer: {
    width: 32,
  },
  modalScrollContainer: {
    flex: 1,
  },
  modalScrollContent: {
    padding: SPACING.xl,
  },

  // Notification Item Styles
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: SPACING.lg,
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  unreadNotification: {
    backgroundColor: '#F0F9FF',
    borderColor: '#BFDBFE',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background.level1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  notificationIconText: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.xs,
  },
  notificationMessage: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.xs,
    lineHeight: 20,
  },
  notificationTimestamp: {
    fontSize: FONT_SIZES.xs,
    color: theme.colors.text.secondary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginLeft: SPACING.sm,
    marginTop: SPACING.xs,
  },
  emptyNotifications: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyNotificationsIcon: {
    fontSize: 48,
    marginBottom: SPACING.lg,
  },
  emptyNotificationsTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: SPACING.sm,
  },
  emptyNotificationsSubtitle: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Help Topic Styles
  helpTopicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  helpTopicIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  helpTopicContent: {
    flex: 1,
  },
  helpTopicTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.xs,
  },
  helpTopicDescription: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  helpTopicArrow: {
    fontSize: 18,
    color: theme.colors.text.secondary,
    fontWeight: 'bold',
  },

  // Help Detail Modal Styles
  helpSection: {
    marginBottom: SPACING.xl,
  },
  helpSectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: SPACING.lg,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.text.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    flexShrink: 0,
  },
  stepNumberText: {
    color: theme.colors.text.inverse,
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.xs,
  },
  stepDescription: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  tipBullet: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.primary,
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  faqItem: {
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
    backgroundColor: theme.colors.background.level1,
    borderRadius: BORDER_RADIUS.md,
  },
  faqQuestion: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.sm,
  },
  faqAnswer: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
});

export default HubNavigator; 