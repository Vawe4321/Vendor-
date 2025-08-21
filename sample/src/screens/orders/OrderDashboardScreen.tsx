import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { OrdersStackParamList, TabParamList } from '../../navigation/types';

const OrderDashboardScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<OrdersStackParamList>>();
  const tabNavigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const [activeTab, setActiveTab] = useState('New Orders');
  const [isOnline, setIsOnline] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const tabRefs = useRef<{ [key: string]: any }>({});
  
  // Store the last active tab in a ref to persist across navigation
  const lastActiveTabRef = useRef('New Orders');

  // Update active tab when going online/offline (only when user manually toggles)
  const [hasUserToggled, setHasUserToggled] = useState(false);
  
  useEffect(() => {
    // When user goes online and is on a different tab, switch to New Orders
    if (hasUserToggled && isOnline && activeTab !== 'New Orders') {
      setActiveTab('New Orders');
      lastActiveTabRef.current = 'New Orders';
    }
  }, [isOnline, activeTab, hasUserToggled]);

  const tabs = ['New Orders', 'Preparing', 'Ready', 'Out for delivery', 'Scheduled', 'Completed'];

  // Use focus effect to restore the last active tab when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      // Only restore the last active tab if user has manually changed it
      // For fresh login, always start with New Orders
      if (lastActiveTabRef.current !== 'New Orders') {
        setActiveTab(lastActiveTabRef.current);
      }
    }, [])
  );

  const handleStatusToggle = () => {
    setIsOnline(!isOnline);
    setHasUserToggled(true);
    // When going online, show a brief notification
    if (!isOnline) {
      // Simulate receiving new orders when going online
      console.log('🟢 Going online - Restaurant is now accepting orders');
    } else {
      console.log('🔴 Going offline - Restaurant is now closed for orders');
    }
  };

  const handleSearchPress = () => {
    setShowSearchModal(true);
  };

  const handleHamburgerPress = () => {
    tabNavigation.navigate('Hub', { screen: 'ExploreMore' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredOrders([]);
      return;
    }

    // Get current orders based on active tab
    let currentOrders: any[] = [];
    switch (activeTab) {
      case 'New Orders':
        currentOrders = newOrders;
        break;
      case 'Preparing':
        currentOrders = preparingOrders;
        break;
      case 'Ready':
        currentOrders = readyOrders;
        break;
      case 'Out for delivery':
        currentOrders = outForDeliveryOrders;
        break;
      case 'Completed':
        currentOrders = completedOrders;
        break;
      default:
        currentOrders = newOrders;
    }

    // Filter orders based on search query
    const filtered = currentOrders.filter(order => 
      order.id.toLowerCase().includes(query.toLowerCase()) ||
      order.customerName.toLowerCase().includes(query.toLowerCase()) ||
      order.location.toLowerCase().includes(query.toLowerCase()) ||
      order.items.some((item: string) => item.toLowerCase().includes(query.toLowerCase()))
    );

    setFilteredOrders(filtered);
  };

  const getCurrentOrders = () => {
    if (searchQuery.trim() && filteredOrders.length > 0) {
      return filteredOrders;
    }

    switch (activeTab) {
      case 'New Orders':
        return newOrders;
      case 'Preparing':
        return preparingOrders;
      case 'Ready':
        return readyOrders;
      case 'Out for delivery':
        return outForDeliveryOrders;
      case 'Completed':
        return completedOrders;
      default:
        return newOrders;
    }
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    // Store the selected tab in the ref for persistence
    lastActiveTabRef.current = tab;
    
    // Scroll to the selected tab
    setTimeout(() => {
      if (tabRefs.current[tab] && scrollViewRef.current) {
        tabRefs.current[tab]?.measureLayout(
          scrollViewRef.current as any,
          (x: number) => {
            const screenWidth = 400; // Approximate screen width
            const tabWidth = 120; // Approximate tab width
            const scrollToX = Math.max(0, x - (screenWidth - tabWidth) / 2);
            
            scrollViewRef.current?.scrollTo({
              x: scrollToX,
              animated: true,
            });
          },
          () => {
            // Fallback if measureLayout fails
            const tabIndex = tabs.indexOf(tab);
            const estimatedScrollX = tabIndex * 140; // Approximate tab width + margin
            
            scrollViewRef.current?.scrollTo({
              x: estimatedScrollX,
              animated: true,
            });
          }
        );
      }
    }, 100);
  };

  const renderTab = (tab: string) => (
    <TouchableOpacity
      key={tab}
      ref={(ref) => {
        tabRefs.current[tab] = ref;
      }}
      style={[styles.tab, activeTab === tab && styles.activeTab]}
      onPress={() => handleTabPress(tab)}
    >
      <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
        {tab}
      </Text>
    </TouchableOpacity>
  );

  // Mock data for different order states (similar to Zomato restaurant partner app)
  const [newOrders, setNewOrders] = useState<any[]>([
    {
      id: '849120',
      status: 'NEW',
      customerName: 'Rahul Kumar',
      location: 'Banjara Hills, Hyderabad',
      timestamp: 'Just now',
      items: ['Chicken Biryani', 'Raita', 'Gulab Jamun'],
      price: '₹450',
      preparationTime: '25-30 mins',
      isUrgent: false,
    },
    {
      id: '849121',
      status: 'NEW',
      customerName: 'Priya Sharma',
      location: 'Jubilee Hills, Hyderabad',
      timestamp: '2 mins ago',
      items: ['Veg Biryani', 'Dal Fry', 'Tandoori Roti'],
      price: '₹380',
      preparationTime: '20-25 mins',
      isUrgent: true,
    },
    {
      id: '849122',
      status: 'NEW',
      customerName: 'Amit Patel',
      location: 'Gachibowli, Hyderabad',
      timestamp: '5 mins ago',
      items: ['Mutton Biryani', 'Mirchi Ka Salan', 'Onion Raita'],
      price: '₹520',
      preparationTime: '30-35 mins',
      isUrgent: false,
    },
  ]);

  const [preparingOrders, setPreparingOrders] = useState<any[]>([
    {
      id: '849115',
      status: 'PREPARING',
      customerName: 'Sneha Reddy',
      location: 'Madhapur, Hyderabad',
      timestamp: 'Started 5 mins ago',
      items: ['Paneer Biryani', 'Mixed Veg Curry'],
      price: '₹420',
      estimatedTime: '15 mins remaining',
      progress: 60,
    },
    {
      id: '849116',
      status: 'PREPARING',
      customerName: 'Vikram Singh',
      location: 'Hitech City, Hyderabad',
      timestamp: 'Started 8 mins ago',
      items: ['Chicken 65', 'Biryani', 'Coke'],
      price: '₹580',
      estimatedTime: '12 mins remaining',
      progress: 75,
    },
  ]);

  const [readyOrders, setReadyOrders] = useState<any[]>([
    {
      id: '849113',
      status: 'READY',
      customerName: 'Kavya Nair',
      location: 'Kondapur, Hyderabad',
      timestamp: 'Ready 2 mins ago',
      items: ['Veg Fried Rice', 'Manchurian'],
      price: '₹320',
      waitingTime: '2 mins',
      isHot: true,
    },
    {
      id: '849114',
      status: 'READY',
      customerName: 'Arjun Mehta',
      location: 'Kukatpally, Hyderabad',
      timestamp: 'Ready 5 mins ago',
      items: ['Chicken Curry', 'Naan', 'Dal'],
      price: '₹480',
      waitingTime: '5 mins',
      isHot: false,
    },
  ]);

  const [outForDeliveryOrders, setOutForDeliveryOrders] = useState<any[]>([
    {
      id: '849111',
      status: 'OUT FOR DELIVERY',
      customerName: 'Meera Iyer',
      location: 'Secunderabad, Hyderabad',
      timestamp: 'Picked up 10 mins ago',
      items: ['Fish Curry', 'Steamed Rice'],
      price: '₹390',
      estimatedDelivery: '8 mins',
      driverName: 'Rajesh Kumar',
      driverPhone: '+91 98765 43210',
    },
    {
      id: '849112',
      status: 'OUT FOR DELIVERY',
      customerName: 'Aditya Verma',
      location: 'Begumpet, Hyderabad',
      timestamp: 'Picked up 15 mins ago',
      items: ['Butter Chicken', 'Naan', 'Raita'],
      price: '₹550',
      estimatedDelivery: '3 mins',
      driverName: 'Suresh Reddy',
      driverPhone: '+91 98765 43211',
    },
  ]);

  // Order data for completed orders
  const [completedOrders, setCompletedOrders] = useState<any[]>([
    {
      id: '849110',
      status: 'DELIVERED',
      customerName: 'Venkatesh Goud',
      location: 'Ibrahimpatnam',
      timestamp: '28 Jul, 5:45 pm',
      items: ['Biryani', 'Special boti'],
      price: '₹544',
      warning: 'Order was not received timely',
      isDelivered: true,
    },
    {
      id: '849109',
      status: 'DELIVERED',
      customerName: 'Gopi',
      location: 'Gangaram, Hyderabad',
      timestamp: '28 Jul, 5:43 pm',
      items: ['Biryani', 'Special boti'],
      price: '₹752',
      warning: 'Order was not received timely',
      isDelivered: true,
    },
    {
      id: '849108',
      status: 'DELIVERED',
      customerName: 'Zoya',
      location: 'Ibrahimpatnam',
      timestamp: '28 Jul, 5:42 pm',
      items: ['Biryani', 'Special boti'],
      price: '₹754',
      warning: 'Order was not received timely',
      isDelivered: true,
    },
    {
      id: '849107',
      status: 'REJECTED BY RESTAURANT',
      customerName: 'Ramesh Goud',
      location: 'Ibrahimpatnam',
      timestamp: '28 Jul, 5:41 pm',
      items: ['Biryani', 'Special boti'],
      price: '₹700',
      warning: 'Order closed',
      rejectionReason: 'The order was closed as per the rejection policy.',
      isDelivered: false,
    },
    {
      id: '849106',
      status: 'DELIVERED',
      customerName: 'Mahesh',
      location: 'GVK One, Hyderabad',
      timestamp: '28 Jul, 4:46 pm',
      items: ['Biryani', 'Special boti'],
      price: '₹900',
      warning: 'Order was not received timely',
      isDelivered: true,
    },
    {
      id: '849105',
      status: 'DELIVERED',
      customerName: 'Suresh',
      location: 'Banjara Hills',
      timestamp: '28 Jul, 4:42 pm',
      items: ['Biryani', 'Special boti'],
      price: '₹950',
      warning: 'Order was not received timely',
      isDelivered: true,
    },
    {
      id: '849104',
      status: 'REJECTED BY RESTAURANT',
      customerName: 'Girish',
      location: 'LB Nagar',
      timestamp: '28 Jul, 3:40 pm',
      items: ['Biryani', 'Special boti'],
      warning: 'Item was out of stock',
      rejectionReason: 'The order was closed as per the rejection policy.',
      isDelivered: false,
    },
    {
      id: '849103',
      status: 'DELIVERED',
      customerName: 'Ravi Kumar',
      location: 'Ameerpet',
      timestamp: '28 Jul, 3:30 pm',
      items: ['Biryani', 'Special boti'],
      price: '₹945',
      warning: 'Order was not received timely',
      isDelivered: true,
    },
    {
      id: '849102',
      status: 'DELIVERED',
      customerName: 'Rajesh',
      location: 'SR Nagar',
      timestamp: '28 Jul, 2:45 pm',
      items: ['Biryani', 'Special boti'],
      price: '₹612',
      warning: 'Order was not received timely',
      isDelivered: true,
    },
    {
      id: '849101',
      status: 'REJECTED BY RESTAURANT',
      customerName: 'Goutham',
      location: 'Tarnaka',
      timestamp: '28 Jul, 2:30 pm',
      items: ['Biryani', 'Special boti'],
      warning: 'Item out of stock',
      rejectionReason: 'The order was closed as per the rejection policy.',
      isDelivered: false,
    },
    {
      id: '849100',
      status: 'DELIVERED',
      customerName: 'Anoop',
      location: 'Kukatpally',
      timestamp: '28 Jul, 2:00 pm',
      items: ['Biryani', 'Special boti'],
      price: '₹734',
      success: 'Prepared in 18 mins, 5 success',
      isDelivered: true,
    },
    {
      id: '849099',
      status: 'DELIVERED',
      customerName: 'Manoj',
      location: 'Kothapet',
      timestamp: '28 Jul, 12:45 pm',
      items: ['Biryani', 'Special boti'],
      price: '₹800',
      warning: 'Order was not received timely',
      isDelivered: true,
    },
  ]);

  // Handlers to move orders across statuses without changing active tab
  const startPreparing = (orderId: string) => {
    setNewOrders(prev => {
      const index = prev.findIndex(o => o.id === orderId);
      if (index === -1) return prev;
      const order = {
        ...prev[index],
        status: 'PREPARING',
        timestamp: 'Started just now',
        estimatedTime: '20 mins remaining',
        progress: 10,
      };
      setPreparingOrders(p => [order, ...p]);
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const markReady = (orderId: string) => {
    setPreparingOrders(prev => {
      const index = prev.findIndex(o => o.id === orderId);
      if (index === -1) return prev;
      const order = {
        ...prev[index],
        status: 'READY',
        timestamp: 'Ready just now',
        waitingTime: 'Just now',
        isHot: true,
      } as any;
      setReadyOrders(p => [order, ...p]);
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const markOutForDelivery = (orderId: string) => {
    setReadyOrders(prev => {
      const index = prev.findIndex(o => o.id === orderId);
      if (index === -1) return prev;
      const order = {
        ...prev[index],
        status: 'OUT FOR DELIVERY',
        timestamp: 'Picked up just now',
        estimatedDelivery: '20 mins',
        driverName: 'Assigned Driver',
        driverPhone: '+91 90000 00000',
      } as any;
      setOutForDeliveryOrders(p => [order, ...p]);
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const markDelivered = (orderId: string) => {
    setOutForDeliveryOrders(prev => {
      const index = prev.findIndex(o => o.id === orderId);
      if (index === -1) return prev;
      const order = {
        ...prev[index],
        status: 'DELIVERED',
        timestamp: 'Delivered just now',
        isDelivered: true,
      } as any;
      setCompletedOrders(p => [order, ...p]);
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const rejectOrder = (orderId: string) => {
    setNewOrders(prev => {
      const index = prev.findIndex(o => o.id === orderId);
      if (index === -1) return prev;
      const order = {
        ...prev[index],
        status: 'REJECTED BY RESTAURANT',
        timestamp: 'Rejected just now',
        warning: 'Order closed',
        rejectionReason: 'The order was closed as per the rejection policy.',
        isDelivered: false,
      } as any;
      setCompletedOrders(p => [order, ...p]);
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const renderOrderCard = ({ item }: { item: any }) => {
    const renderStatusActions = (order: any) => {
      if (!isOnline) return null;

      const onPress = (label: string) => () => {
        // Apply local state transitions to keep the user on the same tab
        switch (label) {
          case 'Start Preparing':
            startPreparing(order.id);
            break;
          case 'Mark Ready':
            markReady(order.id);
            break;
          case 'Out for delivery':
            markOutForDelivery(order.id);
            break;
          case 'Mark Delivered':
            markDelivered(order.id);
            break;
          case 'Reject':
            rejectOrder(order.id);
            break;
        }
      };

      switch (order.status) {
        case 'NEW':
          return (
            <View style={styles.actionRow}>
              <TouchableOpacity style={[styles.ctaButton, styles.secondaryCta]} onPress={onPress('Reject')}>
                <Text style={[styles.ctaText, styles.secondaryCtaText]}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.ctaButton, styles.primaryCta]} onPress={onPress('Start Preparing')}>
                <Text style={styles.ctaText}>Start Preparing</Text>
              </TouchableOpacity>
            </View>
          );
        case 'PREPARING':
          return (
            <View style={styles.actionRow}>
              <TouchableOpacity style={[styles.ctaButton, styles.primaryCta]} onPress={onPress('Mark Ready')}>
                <Text style={styles.ctaText}>Mark Ready</Text>
              </TouchableOpacity>
            </View>
          );
        case 'READY':
          return (
            <View style={styles.actionRow}>
              <TouchableOpacity style={[styles.ctaButton, styles.primaryCta]} onPress={onPress('Out for delivery')}>
                <Text style={styles.ctaText}>Out for delivery</Text>
              </TouchableOpacity>
            </View>
          );
        case 'OUT FOR DELIVERY':
          return (
            <View style={styles.actionRow}>
              <TouchableOpacity style={[styles.ctaButton, styles.primaryCta]} onPress={onPress('Mark Delivered')}>
                <Text style={styles.ctaText}>Mark Delivered</Text>
              </TouchableOpacity>
            </View>
          );
        default:
          return null;
      }
    };
    // Determine status badge style based on order status
    const getStatusBadgeStyle = () => {
      switch (item.status) {
        case 'NEW':
          return [styles.statusBadge, styles.newBadge];
        case 'PREPARING':
          return [styles.statusBadge, styles.preparingBadge];
        case 'READY':
          return [styles.statusBadge, styles.readyBadge];
        case 'OUT FOR DELIVERY':
          return [styles.statusBadge, styles.deliveryBadge];
        case 'DELIVERED':
          return [styles.statusBadge, styles.deliveredBadge];
        case 'REJECTED':
          return [styles.statusBadge, styles.rejectedBadge];
        default:
          return [styles.statusBadge, styles.newBadge];
      }
    };

    const getStatusTextStyle = () => {
      switch (item.status) {
        case 'NEW':
          return [styles.statusText, styles.newText];
        case 'PREPARING':
          return [styles.statusText, styles.preparingText];
        case 'READY':
          return [styles.statusText, styles.readyText];
        case 'OUT FOR DELIVERY':
          return [styles.statusText, styles.deliveryText];
        case 'DELIVERED':
          return [styles.statusText, styles.deliveredText];
        case 'REJECTED':
          return [styles.statusText, styles.rejectedText];
        default:
          return [styles.statusText, styles.newText];
      }
    };

    const getStatusIcon = () => {
      switch (item.status) {
        case 'NEW':
          return '🆕';
        case 'PREPARING':
          return '👨‍🍳';
        case 'READY':
          return '✅';
        case 'OUT FOR DELIVERY':
          return '🚚';
        case 'DELIVERED':
          return '✅';
        case 'REJECTED':
          return '❌';
        default:
          return '🆕';
      }
    };

    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View style={styles.orderStatus}>
            <View style={getStatusBadgeStyle()}>
              <Text style={getStatusTextStyle()}>
                {getStatusIcon()} {item.status}
              </Text>
            </View>
          </View>
          <View style={styles.orderActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📞</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📋</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>⋮</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>#{item.id}</Text>
          <Text style={styles.customerInfo}>{item.customerName} | {item.location}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>

        <View style={styles.itemsSection}>
          <Text style={styles.itemsTitle}>Items:</Text>
          {item.items.map((itemName: string, index: number) => (
            <Text key={`${item.id}-item-${index}`} style={styles.itemName}>• {itemName}</Text>
          ))}
        </View>

        {item.price && (
          <Text style={styles.price}>{item.price}</Text>
        )}

        {/* Show preparation time for preparing orders */}
        {item.status === 'PREPARING' && item.estimatedTime && (
          <View style={styles.preparationInfo}>
            <Text style={styles.preparationText}>⏱️ {item.estimatedTime}</Text>
          </View>
        )}

        {/* Show waiting time for ready orders */}
        {item.status === 'READY' && item.waitingTime && (
          <View style={styles.waitingInfo}>
            <Text style={styles.waitingText}>⏰ Ready for {item.waitingTime}</Text>
          </View>
        )}

        {/* Show delivery info for out for delivery orders */}
        {item.status === 'OUT FOR DELIVERY' && item.driverName && (
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryInfoText}>🚚 {item.driverName} • {item.estimatedDelivery}</Text>
          </View>
        )}

        {item.warning && (
          <View style={styles.warningSection}>
            <Text style={styles.warningText}>⚠️ {item.warning}</Text>
            {item.rejectionReason && (
              <Text style={styles.rejectionReason}>{item.rejectionReason}</Text>
            )}
            {item.rejectionReason && (
              <TouchableOpacity style={styles.policyLink}>
                <Text style={styles.policyLinkText}>🔗 View rejection policy</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {item.success && (
          <View style={styles.successSection}>
            <Text style={styles.successText}>✅ {item.success}</Text>
          </View>
        )}

        {renderStatusActions(item)}
      </View>
    );
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
              style={[styles.statusButton, isOnline && styles.onlineStatusButton]}
              onPress={handleStatusToggle}
            >
              <Text style={[styles.statusButtonText, isOnline && styles.onlineStatusText]}>
                {isOnline ? 'Online >' : 'Offline >'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleSearchPress}>
              <Text style={styles.iconText}>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleHamburgerPress}>
              <Text style={styles.iconText}>☰</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView 
          ref={scrollViewRef}
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContainer}
        >
          {tabs.map(renderTab)}
        </ScrollView>
      </View>

      {/* Body Content */}
      <View style={styles.body}>
        {activeTab === 'New Orders' && (
          isOnline ? (
            <View style={styles.ordersContainer}>
              <FlatList
                data={getCurrentOrders()}
                keyExtractor={(item) => item.id}
                renderItem={renderOrderCard}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ordersList}
              />
            </View>
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.stoveIllustration}>
                <Text style={styles.stoveIcon}>🔴</Text>
              </View>
              <Text style={styles.emptyStateTitle}>Restaurant is offline!</Text>
              <Text style={styles.emptyStateSubtitle}>Go online to receive new orders</Text>
            </View>
          )
        )}
        
        {activeTab === 'Preparing' && (
          isOnline ? (
            <View style={styles.ordersContainer}>
              <FlatList
                data={getCurrentOrders()}
                keyExtractor={(item) => item.id}
                renderItem={renderOrderCard}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ordersList}
              />
            </View>
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.stoveIllustration}>
                <View style={styles.stoveDesign}>
                  <View style={styles.stoveTop}>
                    <View style={styles.burner} />
                    <View style={styles.burner} />
                    <View style={styles.burner} />
                    <View style={styles.burner} />
                  </View>
                  <View style={styles.stoveBottom}>
                    <View style={styles.knob} />
                    <View style={styles.knob} />
                    <View style={styles.knob} />
                    <View style={styles.knob} />
                  </View>
                </View>
              </View>
              <Text style={styles.emptyStateTitle}>No orders are currently being prepared!</Text>
            </View>
          )
        )}
        
        {activeTab === 'Ready' && (
          isOnline ? (
            <View style={styles.ordersContainer}>
              <FlatList
                data={getCurrentOrders()}
                keyExtractor={(item) => item.id}
                renderItem={renderOrderCard}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ordersList}
              />
            </View>
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.stoveIllustration}>
                <Text style={styles.stoveIcon}>✅</Text>
              </View>
              <Text style={styles.emptyStateTitle}>No orders are ready for pickup!</Text>
            </View>
          )
        )}
        
        {activeTab === 'Out for delivery' && (
          isOnline ? (
            <View style={styles.ordersContainer}>
              <FlatList
                data={getCurrentOrders()}
                keyExtractor={(item) => item.id}
                renderItem={renderOrderCard}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ordersList}
              />
            </View>
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.stoveIllustration}>
                <Text style={styles.stoveIcon}>🚚</Text>
              </View>
              <Text style={styles.emptyStateTitle}>No orders are out for delivery!</Text>
            </View>
          )
        )}
        
        {activeTab === 'Scheduled' && (
          <View style={styles.emptyState}>
            <View style={styles.stoveIllustration}>
              <Text style={styles.stoveIcon}>📅</Text>
            </View>
            <Text style={styles.emptyStateTitle}>No scheduled orders found!</Text>
          </View>
        )}
        
        {activeTab === 'Completed' && (
          <View style={styles.completedOrdersContainer}>
            {/* Top Notice Line */}
            <TouchableOpacity 
              style={styles.noticeLine}
              onPress={() => navigation.navigate('OrderHistory')}
            >
              <View style={styles.noticeContent}>
                <Text style={styles.noticeText}>Want to see orders older than 24 hours?</Text>
                <Text style={styles.noticeAction}>(Tap to open → "Post orders")</Text>
              </View>
            </TouchableOpacity>
            
            <FlatList
              data={getCurrentOrders()}
              keyExtractor={(item) => item.id}
              renderItem={renderOrderCard}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.ordersList}
            />
          </View>
        )}
      </View>

      {/* Search Modal */}
      <Modal
        visible={showSearchModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowSearchModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowSearchModal(false)}
            >
              <Text style={styles.modalCloseIcon}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Search Orders</Text>
            <View style={styles.modalSpacer} />
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by order ID, customer name, location, or items..."
                placeholderTextColor="#999999"
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus={true}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => {
                    setSearchQuery('');
                    setFilteredOrders([]);
                  }}
                >
                  <Text style={styles.clearButtonText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {searchQuery.length > 0 && (
              <View style={styles.searchResults}>
                <Text style={styles.searchResultsTitle}>
                  {filteredOrders.length > 0 
                    ? `Found ${filteredOrders.length} order${filteredOrders.length === 1 ? '' : 's'}`
                    : 'No orders found'
                  }
                </Text>
                {filteredOrders.length > 0 && (
                  <FlatList
                    data={filteredOrders}
                    keyExtractor={(item) => item.id}
                    renderItem={renderOrderCard}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.searchResultsList}
                  />
                )}
              </View>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  outletInfo: {
    flex: 1,
  },
  outletName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6B7280',
    marginRight: 6,
  },
  location: {
    fontSize: 14,
    color: '#6B7280',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  statusButtonText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  onlineStatusButton: {
    backgroundColor: '#D1FAE5',
  },
  onlineStatusText: {
    color: '#065F46',
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconText: {
    fontSize: 18,
  },
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabsScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    minWidth: 100,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#111827',
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
  },
  stoveIllustration: {
    width: 120,
    height: 120,
    backgroundColor: '#F3F4F6',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  stoveDesign: {
    width: 80,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'space-between',
    padding: 8,
  },
  stoveTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  burner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#9CA3AF',
  },
  stoveBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  knob: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  stoveIcon: {
    fontSize: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
  },
  completedOrdersContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    width: '100%',
  },
  ordersContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    width: '100%',
  },
  ordersList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderStatus: {
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  deliveredBadge: {
    backgroundColor: '#D1FAE5',
  },
  rejectedBadge: {
    backgroundColor: '#FEE2E2',
  },
  newBadge: {
    backgroundColor: '#DBEAFE',
  },
  preparingBadge: {
    backgroundColor: '#FEF3C7',
  },
  readyBadge: {
    backgroundColor: '#D1FAE5',
  },
  deliveryBadge: {
    backgroundColor: '#E0E7FF',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  deliveredText: {
    color: '#065F46',
  },
  rejectedText: {
    color: '#DC2626',
  },
  newText: {
    color: '#1E40AF',
  },
  preparingText: {
    color: '#92400E',
  },
  readyText: {
    color: '#065F46',
  },
  deliveryText: {
    color: '#3730A3',
  },
  orderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    borderRadius: 18,
    backgroundColor: '#F9FAFB',
  },
  actionIcon: {
    fontSize: 18,
    color: '#6B7280',
  },
  orderInfo: {
    marginBottom: 16,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  customerInfo: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
  },
  itemsSection: {
    marginBottom: 12,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  warningSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  warningText: {
    fontSize: 12,
    color: '#DC2626',
    marginBottom: 4,
  },
  rejectionReason: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  policyLink: {
    marginTop: 4,
  },
  policyLinkText: {
    fontSize: 12,
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
  successSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  successText: {
    fontSize: 12,
    color: '#059669',
  },
  preparationInfo: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  preparationText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '500',
  },
  waitingInfo: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  waitingText: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '500',
  },
  deliveryInfo: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  deliveryInfoText: {
    fontSize: 12,
    color: '#3730A3',
    fontWeight: '500',
  },
  noticeLine: {
    backgroundColor: '#DBEAFE',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 8,
    padding: 16,
  },
  noticeContent: {
    alignItems: 'center',
  },
  noticeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
    textAlign: 'center',
    marginBottom: 4,
  },
  noticeAction: {
    fontSize: 12,
    color: '#3B82F6',
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 12,
  },
  ctaButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  primaryCta: {
    backgroundColor: '#111827',
  },
  secondaryCta: {
    backgroundColor: '#E5E7EB',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  secondaryCtaText: {
    color: '#111827',
  },
  notificationContainer: {
    position: 'relative',
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
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
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
  // Help Modal Styles
  helpSection: {
    marginBottom: 32,
  },
  helpSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
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
  supportContactCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  supportContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  supportContactIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  supportContactInfo: {
    flex: 1,
  },
  supportContactLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  supportContactValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  supportResponseTime: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  supportResponseTimeText: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  // Search Modal Styles
  searchContainer: {
    flex: 1,
    padding: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchIcon: {
    fontSize: 18,
    color: '#999999',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#666666',
  },
  searchResults: {
    flex: 1,
  },
  searchResultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  searchResultsList: {
    paddingBottom: 20,
  },
});

export default OrderDashboardScreen; 