import { Order, Customer, OrderItem } from '../types/orders';
import { User } from '../types/auth';

// Mock customers
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+91 98765 43210',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '+91 87654 32109',
    address: '456 Park Avenue, Delhi, Delhi 110001',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    phone: '+91 76543 21098',
    address: '789 Oak Road, Bangalore, Karnataka 560001',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    phone: '+91 65432 10987',
    address: '321 Pine Street, Chennai, Tamil Nadu 600001',
  },
  {
    id: '5',
    name: 'David Brown',
    phone: '+91 54321 09876',
    address: '654 Elm Avenue, Kolkata, West Bengal 700001',
  },
];

// Mock order items
const mockOrderItems: OrderItem[] = [
  {
    id: '1',
    name: 'Chicken Biryani',
    quantity: 2,
    price: 250,
    specialInstructions: 'Extra spicy',
    customizations: ['Extra raita', 'No onions'],
  },
  {
    id: '2',
    name: 'Paneer Butter Masala',
    quantity: 1,
    price: 180,
    customizations: ['Less oil'],
  },
  {
    id: '3',
    name: 'Garlic Naan',
    quantity: 3,
    price: 45,
  },
  {
    id: '4',
    name: 'Dal Tadka',
    quantity: 1,
    price: 120,
  },
  {
    id: '5',
    name: 'Gulab Jamun',
    quantity: 4,
    price: 30,
  },
  {
    id: '6',
    name: 'Butter Chicken',
    quantity: 1,
    price: 220,
    customizations: ['Extra gravy'],
  },
  {
    id: '7',
    name: 'Veg Fried Rice',
    quantity: 2,
    price: 150,
  },
  {
    id: '8',
    name: 'Chicken 65',
    quantity: 1,
    price: 180,
  },
];

// Generate mock orders
export const generateMockOrders = (): {
  newOrders: Order[];
  activeOrders: Order[];
  orderHistory: Order[];
} => {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const newOrders: Order[] = [
    {
      id: 'new-1',
      orderNumber: 'ORD-001',
      customer: mockCustomers[0]!,
      items: [mockOrderItems[0]!, mockOrderItems[2]!],
      totalAmount: 635,
      status: 'pending',
      paymentStatus: 'paid',
      paymentMethod: 'online',
      orderType: 'delivery',
      specialInstructions: 'Please ring the doorbell twice',
      createdAt: oneHourAgo.toISOString(),
      updatedAt: oneHourAgo.toISOString(),
    },
    {
      id: 'new-2',
      orderNumber: 'ORD-002',
      customer: mockCustomers[1]!,
      items: [mockOrderItems[1]!, mockOrderItems[3]!],
      totalAmount: 300,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'cash',
      orderType: 'pickup',
      createdAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: 'new-3',
      orderNumber: 'ORD-003',
      customer: mockCustomers[2]!,
      items: [mockOrderItems[6]!, mockOrderItems[7]!],
      totalAmount: 330,
      status: 'pending',
      paymentStatus: 'paid',
      paymentMethod: 'online',
      orderType: 'delivery',
      createdAt: new Date(now.getTime() - 15 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 15 * 60 * 1000).toISOString(),
    },
  ];

  const activeOrders: Order[] = [
    {
      id: 'active-1',
      orderNumber: 'ORD-004',
      customer: mockCustomers[3]!,
      items: [mockOrderItems[0]!, mockOrderItems[1]!, mockOrderItems[4]!],
      totalAmount: 550,
      status: 'preparing',
      paymentStatus: 'paid',
      paymentMethod: 'card',
      orderType: 'delivery',
      estimatedTime: 25,
      createdAt: twoHoursAgo.toISOString(),
      updatedAt: oneHourAgo.toISOString(),
      acceptedAt: new Date(twoHoursAgo.getTime() + 5 * 60 * 1000).toISOString(),
    },
    {
      id: 'active-2',
      orderNumber: 'ORD-005',
      customer: mockCustomers[0]!,
      items: [mockOrderItems[2]!, mockOrderItems[3]!],
      totalAmount: 255,
      status: 'ready',
      paymentStatus: 'paid',
      paymentMethod: 'online',
      orderType: 'pickup',
      estimatedTime: 15,
      createdAt: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
      acceptedAt: new Date(now.getTime() - 40 * 60 * 1000).toISOString(),
      readyAt: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
    },
    {
      id: 'active-3',
      orderNumber: 'ORD-006',
      customer: mockCustomers[4]!,
      items: [mockOrderItems[5]!, mockOrderItems[7]!],
      totalAmount: 400,
      status: 'preparing',
      paymentStatus: 'paid',
      paymentMethod: 'online',
      orderType: 'delivery',
      estimatedTime: 30,
      createdAt: new Date(now.getTime() - 20 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 20 * 60 * 1000).toISOString(),
      acceptedAt: new Date(now.getTime() - 18 * 60 * 1000).toISOString(),
    },
  ];

  const orderHistory: Order[] = [
    {
      id: 'history-1',
      orderNumber: 'ORD-007',
      customer: mockCustomers[1]!,
      items: [mockOrderItems[0]!, mockOrderItems[2]!, mockOrderItems[4]!],
      totalAmount: 455,
      status: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'online',
      orderType: 'delivery',
      estimatedTime: 30,
      actualTime: 28,
      createdAt: yesterday.toISOString(),
      updatedAt: new Date(yesterday.getTime() + 35 * 60 * 1000).toISOString(),
      acceptedAt: new Date(yesterday.getTime() + 3 * 60 * 1000).toISOString(),
      readyAt: new Date(yesterday.getTime() + 25 * 60 * 1000).toISOString(),
      deliveredAt: new Date(yesterday.getTime() + 35 * 60 * 1000).toISOString(),
    },
    {
      id: 'history-2',
      orderNumber: 'ORD-008',
      customer: mockCustomers[2]!,
      items: [mockOrderItems[1]!, mockOrderItems[3]!],
      totalAmount: 300,
      status: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'cash',
      orderType: 'pickup',
      estimatedTime: 20,
      actualTime: 18,
      createdAt: new Date(yesterday.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(yesterday.getTime() - 60 * 60 * 1000).toISOString(),
      acceptedAt: new Date(yesterday.getTime() - 115 * 60 * 1000).toISOString(),
      readyAt: new Date(yesterday.getTime() - 80 * 60 * 1000).toISOString(),
      deliveredAt: new Date(yesterday.getTime() - 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'history-3',
      orderNumber: 'ORD-009',
      customer: mockCustomers[0]!,
      items: [mockOrderItems[0]!],
      totalAmount: 500,
      status: 'cancelled',
      paymentStatus: 'paid',
      paymentMethod: 'online',
      orderType: 'delivery',
      createdAt: new Date(yesterday.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(yesterday.getTime() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'history-4',
      orderNumber: 'ORD-010',
      customer: mockCustomers[3]!,
      items: [mockOrderItems[5]!, mockOrderItems[6]!],
      totalAmount: 370,
      status: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'online',
      orderType: 'delivery',
      estimatedTime: 25,
      actualTime: 22,
      createdAt: new Date(yesterday.getTime() - 6 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(yesterday.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      acceptedAt: new Date(yesterday.getTime() - 5 * 60 * 60 * 1000).toISOString(),
      readyAt: new Date(yesterday.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      deliveredAt: new Date(yesterday.getTime() - 3 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return { newOrders, activeOrders, orderHistory };
};

// Mock user data
export const mockUser: User = {
  id: '1',
  email: 'vendor@example.com',
  phone: '+91 99999 88888',
  businessName: 'Grooso\'s Kitchen',
  ownerName: 'Rajesh Kumar',
  address: '123 Food Street, Hyderabad, Telangana 500001',
  isOnline: true,
  isVerified: true,
  rating: 4.5,
  totalOrders: 1250,
  createdAt: '2023-01-15T10:00:00.000Z',
  updatedAt: new Date().toISOString(),
};

// Mock dashboard data
export const mockDashboardData = {
  todayOrders: 12,
  todayRevenue: 3450,
  averageRating: 4.5,
  pendingOrders: 3,
  totalCustomers: 450,
  monthlyRevenue: 85000,
};

// Mock analytics data
export const mockAnalyticsData = {
  revenue: {
    daily: [1200, 1350, 1100, 1450, 1600, 1400, 1800],
    weekly: [8500, 9200, 8800, 9500, 10200, 9800, 11000],
    monthly: [85000, 92000, 88000, 95000, 102000, 98000, 110000],
  },
  orders: {
    daily: [8, 12, 10, 15, 18, 14, 20],
    weekly: [65, 72, 68, 75, 82, 78, 85],
    monthly: [650, 720, 680, 750, 820, 780, 850],
  },
  customers: {
    new: [5, 8, 6, 10, 12, 9, 15],
    returning: [12, 15, 13, 18, 20, 17, 22],
  },
  ratings: {
    average: 4.5,
    distribution: {
      '5': 65,
      '4': 25,
      '3': 8,
      '2': 2,
      '1': 0,
    },
  },
  topItems: [
    { name: 'Chicken Biryani', orders: 45, revenue: 11250 },
    { name: 'Paneer Butter Masala', orders: 38, revenue: 6840 },
    { name: 'Butter Chicken', orders: 32, revenue: 7040 },
    { name: 'Dal Tadka', orders: 28, revenue: 3360 },
    { name: 'Garlic Naan', orders: 25, revenue: 1125 },
  ],
};

// Mock feedback data
export const mockFeedbackData = {
  complaints: [
    {
      id: '1',
      customerName: 'John Doe',
      orderNumber: 'ORD-001',
      complaint: 'Food was delivered cold',
      rating: 2,
      date: '2024-01-15T10:30:00.000Z',
      status: 'resolved',
      response: 'We apologize for the inconvenience. We have offered a discount on your next order.',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      orderNumber: 'ORD-002',
      complaint: 'Wrong items delivered',
      rating: 1,
      date: '2024-01-14T15:45:00.000Z',
      status: 'pending',
      response: null,
    },
    {
      id: '3',
      customerName: 'Mike Johnson',
      orderNumber: 'ORD-003',
      complaint: 'Delivery was late',
      rating: 3,
      date: '2024-01-13T12:20:00.000Z',
      status: 'resolved',
      response: 'We have improved our delivery process. Thank you for your feedback.',
    },
  ],
  reviews: [
    {
      id: '1',
      customerName: 'Sarah Wilson',
      orderNumber: 'ORD-004',
      review: 'Excellent food quality and fast delivery!',
      rating: 5,
      date: '2024-01-15T18:30:00.000Z',
      response: 'Thank you for your kind words!',
    },
    {
      id: '2',
      customerName: 'David Brown',
      orderNumber: 'ORD-005',
      review: 'Good food but could be spicier',
      rating: 4,
      date: '2024-01-14T20:15:00.000Z',
      response: 'We will note your preference for spicier food.',
    },
    {
      id: '3',
      customerName: 'Emily Davis',
      orderNumber: 'ORD-006',
      review: 'Amazing taste and portion size',
      rating: 5,
      date: '2024-01-13T19:45:00.000Z',
      response: 'We are glad you enjoyed your meal!',
    },
  ],
};

// Mock Hyperpure data
export const mockHyperpureData = {
  orders: [
    {
      id: '1',
      orderNumber: 'HP-001',
      supplier: 'Fresh Vegetables Co.',
      items: [
        { name: 'Tomatoes', quantity: 10, unit: 'kg', price: 200 },
        { name: 'Onions', quantity: 15, unit: 'kg', price: 150 },
        { name: 'Potatoes', quantity: 20, unit: 'kg', price: 300 },
      ],
      totalAmount: 650,
      status: 'pending',
      deliveryDate: '2024-01-16T10:00:00.000Z',
      createdAt: '2024-01-15T14:30:00.000Z',
    },
    {
      id: '2',
      orderNumber: 'HP-002',
      supplier: 'Quality Meats Ltd.',
      items: [
        { name: 'Chicken Breast', quantity: 5, unit: 'kg', price: 400 },
        { name: 'Mutton', quantity: 3, unit: 'kg', price: 600 },
      ],
      totalAmount: 1000,
      status: 'delivered',
      deliveryDate: '2024-01-15T09:00:00.000Z',
      createdAt: '2024-01-14T16:00:00.000Z',
      deliveredAt: '2024-01-15T09:30:00.000Z',
    },
    {
      id: '3',
      orderNumber: 'HP-003',
      supplier: 'Dairy Products Inc.',
      items: [
        { name: 'Milk', quantity: 20, unit: 'liters', price: 120 },
        { name: 'Butter', quantity: 5, unit: 'kg', price: 250 },
        { name: 'Cheese', quantity: 2, unit: 'kg', price: 300 },
      ],
      totalAmount: 670,
      status: 'in_transit',
      deliveryDate: '2024-01-16T14:00:00.000Z',
      createdAt: '2024-01-15T10:00:00.000Z',
    },
  ],
  products: [
    {
      id: '1',
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      supplier: 'Fresh Vegetables Co.',
      price: 20,
      unit: 'kg',
      stock: 50,
      minStock: 10,
      lastOrdered: '2024-01-15T14:30:00.000Z',
    },
    {
      id: '2',
      name: 'Chicken Breast',
      category: 'Meat',
      supplier: 'Quality Meats Ltd.',
      price: 80,
      unit: 'kg',
      stock: 25,
      minStock: 5,
      lastOrdered: '2024-01-14T16:00:00.000Z',
    },
    {
      id: '3',
      name: 'Fresh Milk',
      category: 'Dairy',
      supplier: 'Dairy Products Inc.',
      price: 6,
      unit: 'liter',
      stock: 100,
      minStock: 20,
      lastOrdered: '2024-01-15T10:00:00.000Z',
    },
  ],
};

// Mock inventory data
export const mockInventoryData = {
  categories: [
    {
      id: '1',
      name: 'Vegetables',
      itemCount: 15,
      lowStockItems: 3,
    },
    {
      id: '2',
      name: 'Meat & Poultry',
      itemCount: 8,
      lowStockItems: 1,
    },
    {
      id: '3',
      name: 'Dairy',
      itemCount: 12,
      lowStockItems: 2,
    },
    {
      id: '4',
      name: 'Grains & Pulses',
      itemCount: 20,
      lowStockItems: 5,
    },
  ],
  items: [
    {
      id: '1',
      name: 'Tomatoes',
      category: 'Vegetables',
      currentStock: 25,
      minStock: 10,
      unit: 'kg',
      price: 20,
      lastUpdated: '2024-01-15T10:30:00.000Z',
    },
    {
      id: '2',
      name: 'Chicken Breast',
      category: 'Meat & Poultry',
      currentStock: 8,
      minStock: 5,
      unit: 'kg',
      price: 80,
      lastUpdated: '2024-01-15T09:15:00.000Z',
    },
    {
      id: '3',
      name: 'Milk',
      category: 'Dairy',
      currentStock: 50,
      minStock: 20,
      unit: 'liters',
      price: 6,
      lastUpdated: '2024-01-15T08:45:00.000Z',
    },
  ],
};

// Mock notification data
export const mockNotificationData = [
  {
    id: '1',
    title: 'New Order Received',
    message: 'Order #ORD-001 has been placed by John Doe',
    type: 'order',
    isRead: false,
    timestamp: '2024-01-15T10:30:00.000Z',
  },
  {
    id: '2',
    title: 'Low Stock Alert',
    message: 'Chicken Breast is running low on stock',
    type: 'inventory',
    isRead: true,
    timestamp: '2024-01-15T09:15:00.000Z',
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'Payment of ₹635 received for Order #ORD-001',
    type: 'payment',
    isRead: false,
    timestamp: '2024-01-15T10:35:00.000Z',
  },
  {
    id: '4',
    title: 'Customer Review',
    message: 'New 5-star review from Sarah Wilson',
    type: 'review',
    isRead: true,
    timestamp: '2024-01-15T08:20:00.000Z',
  },
];

// Mock settings data
export const mockSettingsData = {
  notifications: {
    pushNotifications: true,
    soundNotifications: true,
    emailNotifications: false,
  },
  orderManagement: {
    autoAccept: false,
    autoReject: false,
    minOrderAmount: 100,
    maxDeliveryDistance: 5,
  },
  appearance: {
    darkMode: false,
    fontSize: 'medium',
    language: 'English',
  },
  business: {
    businessHours: {
      monday: { open: '09:00', close: '22:00' },
      tuesday: { open: '09:00', close: '22:00' },
      wednesday: { open: '09:00', close: '22:00' },
      thursday: { open: '09:00', close: '22:00' },
      friday: { open: '09:00', close: '23:00' },
      saturday: { open: '10:00', close: '23:00' },
      sunday: { open: '10:00', close: '22:00' },
    },
    deliverySettings: {
      deliveryFee: 30,
      freeDeliveryThreshold: 200,
      estimatedDeliveryTime: 30,
    },
  },
};

// Mock feedback data for ShareFeedbackScreen
export const mockFeedbackSubmissionData = {
  recentSubmissions: [
    {
      id: '1',
      feedback: 'The app interface is very user-friendly and intuitive. Great job on the design!',
      phoneNumber: '+91 98765 43210',
      status: 'submitted',
      submittedAt: '2024-01-15T14:30:00.000Z',
      response: 'Thank you for your positive feedback! We appreciate your kind words.',
    },
    {
      id: '2',
      feedback: 'Could you add more payment options? Currently limited to online payments.',
      phoneNumber: '+91 87654 32109',
      status: 'in_review',
      submittedAt: '2024-01-14T16:45:00.000Z',
      response: null,
    },
    {
      id: '3',
      feedback: 'The order tracking feature is excellent. Real-time updates are very helpful.',
      phoneNumber: '+91 76543 21098',
      status: 'submitted',
      submittedAt: '2024-01-13T11:20:00.000Z',
      response: 'We are glad you find the tracking feature useful!',
    },
  ],
  feedbackStats: {
    totalSubmissions: 45,
    respondedTo: 38,
    averageResponseTime: '2.5 hours',
    satisfactionRate: 4.2,
  },
};

// Mock accounting data for Payouts, Invoices, and Taxes
export const mockAccountingData = {
  payouts: {
    currentCycle: {
      netPayout: '₹1,774.73',
      orders: '11 Orders',
      payoutCycle: '28 Jul - 03 Aug, 25',
      estimatedPayoutDate: '06 Aug, 25',
      breakdown: {
        grossAmount: '₹2,150.00',
        commission: '₹225.27',
        deliveryFee: '₹150.00',
        netPayout: '₹1,774.73',
      },
    },
    pastCycles: [
      {
        id: '1',
        netPayout: '₹6,100.18',
        status: 'PAID',
        payoutCycle: '21 Jul - 27 Jul, 25',
        payoutDate: '30 Jul, 25',
        breakdown: {
          grossAmount: '₹7,200.00',
          commission: '₹750.82',
          deliveryFee: '₹349.00',
          netPayout: '₹6,100.18',
        },
      },
      {
        id: '2',
        netPayout: '₹5,748.55',
        status: 'PAID',
        payoutCycle: '14 Jul - 20 Jul, 25',
        payoutDate: '23 Jul, 25',
        breakdown: {
          grossAmount: '₹6,800.00',
          commission: '₹701.45',
          deliveryFee: '₹350.00',
          netPayout: '₹5,748.55',
        },
      },
      {
        id: '3',
        netPayout: '₹4,920.30',
        status: 'PAID',
        payoutCycle: '07 Jul - 13 Jul, 25',
        payoutDate: '16 Jul, 25',
        breakdown: {
          grossAmount: '₹5,900.00',
          commission: '₹629.70',
          deliveryFee: '₹350.00',
          netPayout: '₹4,920.30',
        },
      },
    ],
    summary: {
      totalPayouts: '₹17,543.76',
      totalOrders: 156,
      averagePayout: '₹4,385.94',
      totalCommission: '₹1,306.24',
    },
  },
  invoices: {
    currentMonth: {
      totalInvoiced: '₹45,200.00',
      totalPaid: '₹42,150.00',
      pendingAmount: '₹3,050.00',
      invoiceCount: 23,
    },
    recentInvoices: [
      {
        id: 'INV-001',
        invoiceNumber: 'INV-2024-001',
        amount: '₹2,150.00',
        status: 'PAID',
        issueDate: '2024-01-15T00:00:00.000Z',
        dueDate: '2024-01-22T00:00:00.000Z',
        paidDate: '2024-01-18T00:00:00.000Z',
        description: 'Weekly payout for orders 28 Jul - 03 Aug, 25',
      },
      {
        id: 'INV-002',
        invoiceNumber: 'INV-2024-002',
        amount: '₹6,100.18',
        status: 'PAID',
        issueDate: '2024-01-08T00:00:00.000Z',
        dueDate: '2024-01-15T00:00:00.000Z',
        paidDate: '2024-01-12T00:00:00.000Z',
        description: 'Weekly payout for orders 21 Jul - 27 Jul, 25',
      },
      {
        id: 'INV-003',
        invoiceNumber: 'INV-2024-003',
        amount: '₹5,748.55',
        status: 'PAID',
        issueDate: '2024-01-01T00:00:00.000Z',
        dueDate: '2024-01-08T00:00:00.000Z',
        paidDate: '2024-01-05T00:00:00.000Z',
        description: 'Weekly payout for orders 14 Jul - 20 Jul, 25',
      },
      {
        id: 'INV-004',
        invoiceNumber: 'INV-2024-004',
        amount: '₹3,050.00',
        status: 'PENDING',
        issueDate: '2024-01-22T00:00:00.000Z',
        dueDate: '2024-01-29T00:00:00.000Z',
        paidDate: null,
        description: 'Weekly payout for orders 04 Aug - 10 Aug, 25',
      },
    ],
  },
  taxes: {
    currentYear: {
      totalRevenue: '₹2,450,000.00',
      totalTaxLiability: '₹367,500.00',
      taxPaid: '₹245,000.00',
      pendingTax: '₹122,500.00',
      gstCollected: '₹441,000.00',
      gstPaid: '₹294,000.00',
      gstPending: '₹147,000.00',
    },
    quarterlyBreakdown: [
      {
        quarter: 'Q1 2024',
        revenue: '₹580,000.00',
        taxLiability: '₹87,000.00',
        taxPaid: '₹58,000.00',
        pendingTax: '₹29,000.00',
        gstCollected: '₹104,400.00',
        gstPaid: '₹69,600.00',
        gstPending: '₹34,800.00',
      },
      {
        quarter: 'Q2 2024',
        revenue: '₹620,000.00',
        taxLiability: '₹93,000.00',
        taxPaid: '₹62,000.00',
        pendingTax: '₹31,000.00',
        gstCollected: '₹111,600.00',
        gstPaid: '₹74,400.00',
        gstPending: '₹37,200.00',
      },
      {
        quarter: 'Q3 2024',
        revenue: '₹650,000.00',
        taxLiability: '₹97,500.00',
        taxPaid: '₹65,000.00',
        pendingTax: '₹32,500.00',
        gstCollected: '₹117,000.00',
        gstPaid: '₹78,000.00',
        gstPending: '₹39,000.00',
      },
      {
        quarter: 'Q4 2024',
        revenue: '₹600,000.00',
        taxLiability: '₹90,000.00',
        taxPaid: '₹60,000.00',
        pendingTax: '₹30,000.00',
        gstCollected: '₹108,000.00',
        gstPaid: '₹72,000.00',
        gstPending: '₹36,000.00',
      },
    ],
    taxDocuments: [
      {
        id: '1',
        documentType: 'GST Return',
        period: 'July 2024',
        status: 'FILED',
        dueDate: '2024-08-20T00:00:00.000Z',
        filedDate: '2024-08-15T00:00:00.000Z',
        amount: '₹34,800.00',
      },
      {
        id: '2',
        documentType: 'Income Tax Return',
        period: 'FY 2023-24',
        status: 'FILED',
        dueDate: '2024-07-31T00:00:00.000Z',
        filedDate: '2024-07-25T00:00:00.000Z',
        amount: '₹87,000.00',
      },
      {
        id: '3',
        documentType: 'GST Return',
        period: 'June 2024',
        status: 'FILED',
        dueDate: '2024-07-20T00:00:00.000Z',
        filedDate: '2024-07-18T00:00:00.000Z',
        amount: '₹37,200.00',
      },
      {
        id: '4',
        documentType: 'GST Return',
        period: 'August 2024',
        status: 'PENDING',
        dueDate: '2024-09-20T00:00:00.000Z',
        filedDate: null,
        amount: '₹36,000.00',
      },
    ],
  },
  bankDetails: {
    accountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    bankName: 'State Bank of India',
    branchName: 'Hyderabad Main Branch',
    accountHolderName: 'Grooso\'s Kitchen',
    accountType: 'Current Account',
    isVerified: true,
    lastUpdated: '2024-01-15T10:30:00.000Z',
  },
};

// Mock profile data
export const mockProfileData = {
  userInfo: {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@grooso.com',
    phone: '+91 98765 43210',
    role: 'Restaurant Owner',
    restaurantName: 'Grooso\'s Kitchen',
    location: 'Hyderabad, Telangana',
    profileImage: null,
    joinDate: '2023-03-15T00:00:00.000Z',
    lastActive: '2024-01-20T14:30:00.000Z',
  },
  statistics: {
    totalOrders: 1247,
    totalRevenue: '₹8,45,600.00',
    averageRating: 4.6,
    totalReviews: 342,
    completionRate: 98.5,
    responseTime: '12 minutes',
  },
  achievements: [
    {
      id: '1',
      title: 'Top Performer',
      description: 'Consistently high ratings for 3 months',
      icon: 'star',
      earnedDate: '2024-01-15T00:00:00.000Z',
    },
    {
      id: '2',
      title: 'Quick Responder',
      description: 'Average response time under 10 minutes',
      icon: 'speed',
      earnedDate: '2024-01-10T00:00:00.000Z',
    },
    {
      id: '3',
      title: 'Customer Favorite',
      description: '100+ positive reviews',
      icon: 'favorite',
      earnedDate: '2024-01-05T00:00:00.000Z',
    },
  ],
  recentActivity: [
    {
      id: '1',
      type: 'order',
      title: 'New order received',
      description: 'Order #12345 - ₹450',
      timestamp: '2024-01-20T14:25:00.000Z',
      icon: 'receipt',
    },
    {
      id: '2',
      type: 'review',
      title: 'New review received',
      description: '5-star rating from customer',
      timestamp: '2024-01-20T13:45:00.000Z',
      icon: 'star',
    },
    {
      id: '3',
      type: 'payout',
      title: 'Payout processed',
      description: '₹12,450 credited to account',
      timestamp: '2024-01-20T10:30:00.000Z',
      icon: 'account-balance-wallet',
    },
    {
      id: '4',
      type: 'update',
      title: 'Menu updated',
      description: 'Added 3 new dishes',
      timestamp: '2024-01-20T09:15:00.000Z',
      icon: 'restaurant-menu',
    },
  ],
  preferences: {
    notifications: {
      newOrders: true,
      orderUpdates: true,
      reviews: true,
      payouts: true,
      promotions: false,
    },
    language: 'English',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
  },
};