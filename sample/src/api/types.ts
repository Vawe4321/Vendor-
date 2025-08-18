// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    restaurantName: string;
    restaurantId: string;
    role: 'owner' | 'manager' | 'staff';
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  restaurantName: string;
  phone: string;
  address: string;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'NEW' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  paymentMethod: 'CASH' | 'CARD' | 'UPI' | 'WALLET';
  orderTime: string;
  estimatedDeliveryTime: string;
  actualDeliveryTime?: string;
  specialInstructions?: string;
  driverName?: string;
  driverPhone?: string;
  rating?: number;
  review?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
  specialInstructions?: string;
  isVeg: boolean;
}

export interface OrderStatusUpdateRequest {
  orderId: string;
  status: Order['status'];
  estimatedTime?: string;
  driverId?: string;
}

export interface OrdersResponse {
  success: boolean;
  orders: Order[];
  totalCount: number;
  hasMore: boolean;
}

// Inventory Types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isVeg: boolean;
  isInStock: boolean;
  image?: string;
  preparationTime: number;
  calories?: number;
  allergens?: string[];
  isPopular: boolean;
  isRecommended: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
  isActive: boolean;
  displayOrder: number;
}

export interface InventoryResponse {
  success: boolean;
  categories: MenuCategory[];
  totalItems: number;
}

export interface UpdateStockRequest {
  itemId: string;
  isInStock: boolean;
}

// Analytics Types
export interface AnalyticsData {
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
  };
  orders: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
  };
  averageOrderValue: number;
  topSellingItems: Array<{
    itemId: string;
    name: string;
    quantity: number;
    revenue: number;
  }>;
  orderStatusBreakdown: {
    new: number;
    preparing: number;
    ready: number;
    outForDelivery: number;
    delivered: number;
    cancelled: number;
  };
  hourlyOrderDistribution: Array<{
    hour: number;
    orders: number;
  }>;
}

export interface AnalyticsResponse {
  success: boolean;
  data: AnalyticsData;
}

// Feedback Types
export interface Review {
  id: string;
  orderId: string;
  customerName: string;
  customerId: string;
  ordersCount: number;
  rating: number;
  review: string;
  date: string;
  isReplied: boolean;
  reply?: string;
  replyDate?: string;
}

export interface Complaint {
  id: string;
  orderId: string;
  customerName: string;
  customerId: string;
  subject: string;
  description: string;
  category: 'FOOD_QUALITY' | 'DELIVERY' | 'SERVICE' | 'PACKAGING' | 'OTHER';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  date: string;
  resolvedDate?: string;
  resolution?: string;
}

export interface DishRating {
  id: string;
  name: string;
  image?: string;
  rating: number;
  totalRatings: number;
  positiveReviews: number;
  negativeReviews: number;
  category: string;
}

export interface FeedbackResponse {
  success: boolean;
  reviews: Review[];
  complaints: Complaint[];
  dishRatings: DishRating[];
  totalReviews: number;
  totalComplaints: number;
  averageRating: number;
}

export interface ReplyToReviewRequest {
  reviewId: string;
  reply: string;
}

export interface UpdateComplaintStatusRequest {
  complaintId: string;
  status: Complaint['status'];
  resolution?: string;
}

// Profile Types
export interface RestaurantProfile {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  cuisine: string[];
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  deliveryRadius: number;
  minimumOrder: number;
  deliveryFee: number;
  averagePreparationTime: number;
  isOnline: boolean;
  logo?: string;
  banner?: string;
  rating: number;
  totalReviews: number;
}

export interface UpdateProfileRequest {
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  cuisine?: string[];
  openingHours?: RestaurantProfile['openingHours'];
  deliveryRadius?: number;
  minimumOrder?: number;
  deliveryFee?: number;
  averagePreparationTime?: number;
}

// Settings Types
export interface NotificationSettings {
  newOrders: boolean;
  orderUpdates: boolean;
  customerReviews: boolean;
  complaints: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface UpdateNotificationSettingsRequest {
  newOrders?: boolean;
  orderUpdates?: boolean;
  customerReviews?: boolean;
  complaints?: boolean;
  analytics?: boolean;
  marketing?: boolean;
}

// Common Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  totalCount: number;
  hasMore: boolean;
  page: number;
  limit: number;
}
