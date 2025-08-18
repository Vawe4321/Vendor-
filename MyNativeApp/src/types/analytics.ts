export interface DashboardMetrics {
  todayOrders: number;
  todayRevenue: number;
  averageRating: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface OrderTrend {
  period: string;
  orders: number;
  revenue: number;
  averageOrderValue: number;
}

export interface PopularItem {
  id: string;
  name: string;
  orderCount: number;
  revenue: number;
  category: string;
}

export interface CustomerInsight {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  averageOrdersPerCustomer: number;
}

export interface PerformanceMetrics {
  averagePreparationTime: number;
  onTimeDeliveryRate: number;
  customerSatisfactionScore: number;
  orderAcceptanceRate: number;
}

export interface AnalyticsFilters {
  dateRange: {
    start: string;
    end: string;
  };
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  category?: string[];
}