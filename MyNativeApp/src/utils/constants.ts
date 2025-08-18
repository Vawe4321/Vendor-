export const API_BASE_URL = 'https://api.vendorapp.com/v1';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
} as const;

export const PAYMENT_METHODS = {
  CASH: 'cash',
  ONLINE: 'online',
  CARD: 'card',
} as const;

export const ORDER_TYPES = {
  DELIVERY: 'delivery',
  PICKUP: 'pickup',
} as const;

export const BUSINESS_TYPES = [
  'Restaurant',
  'Cafe',
  'Bakery',
  'Fast Food',
  'Cloud Kitchen',
  'Sweet Shop',
  'Juice Bar',
  'Other',
] as const;

export const SPICE_LEVELS = {
  MILD: 'mild',
  MEDIUM: 'medium',
  HOT: 'hot',
  VERY_HOT: 'very-hot',
} as const;

export const NOTIFICATION_TYPES = {
  NEW_ORDER: 'new_order',
  ORDER_UPDATE: 'order_update',
  PAYMENT_RECEIVED: 'payment_received',
  SYSTEM_ALERT: 'system_alert',
} as const;

export const SCREEN_NAMES = {
  // Auth
  LOGIN: 'Login',
  REGISTER: 'Register',
  OTP: 'OTP',
  
  // Main
  DASHBOARD: 'Dashboard',
  NEW_ORDERS: 'NewOrders',
  ACTIVE_ORDERS: 'ActiveOrders',
  ORDER_DETAILS: 'OrderDetails',
  ORDER_HISTORY: 'OrderHistory',
  MENU_OVERVIEW: 'MenuOverview',
  ADD_PRODUCT: 'AddProduct',
  EDIT_PRODUCT: 'EditProduct',
  ANALYTICS: 'Analytics',
  PROFILE: 'ProfileMain',
  SETTINGS: 'Settings',
  SUPPORT: 'Support',
} as const;

export const VALIDATION_RULES = {
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 10,
  PASSWORD_MIN_LENGTH: 6,
  OTP_LENGTH: 6,
  BUSINESS_NAME_MIN_LENGTH: 2,
  OWNER_NAME_MIN_LENGTH: 2,
} as const;

export const DEFAULT_PREPARATION_TIMES = {
  FAST_FOOD: 15,
  REGULAR: 30,
  COMPLEX: 45,
} as const;