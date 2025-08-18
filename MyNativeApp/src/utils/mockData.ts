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
  ];

  const activeOrders: Order[] = [
    {
      id: 'active-1',
      orderNumber: 'ORD-003',
      customer: mockCustomers[2]!,
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
      orderNumber: 'ORD-004',
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
  ];

  const orderHistory: Order[] = [
    {
      id: 'history-1',
      orderNumber: 'ORD-005',
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
      orderNumber: 'ORD-006',
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
      orderNumber: 'ORD-007',
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
  ];

  return { newOrders, activeOrders, orderHistory };
};

// Mock user data
export const mockUser: User = {
  id: '1',
  email: 'vendor@example.com',
  phone: '+91 99999 88888',
  businessName: 'Delicious Bites Restaurant',
  ownerName: 'Rajesh Kumar',
  address: '123 Food Street, Mumbai, Maharashtra 400001',
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