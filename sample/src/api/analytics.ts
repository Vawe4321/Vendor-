import api from './index';
import { AnalyticsData, AnalyticsResponse, ApiResponse } from './types';

// Analytics API endpoints
export const analyticsAPI = {
  // Get dashboard analytics
  getDashboardAnalytics: async (params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<AnalyticsResponse> => {
    const response = await api.get('/analytics/dashboard', { params });
    return response.data;
  },

  // Get revenue analytics
  getRevenueAnalytics: async (params?: {
    startDate?: string;
    endDate?: string;
    period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  }): Promise<ApiResponse<{
    totalRevenue: number;
    averageOrderValue: number;
    revenueTrend: Array<{
      date: string;
      revenue: number;
      orders: number;
    }>;
    revenueByPaymentMethod: Array<{
      method: string;
      revenue: number;
      percentage: number;
    }>;
  }>> => {
    const response = await api.get('/analytics/revenue', { params });
    return response.data;
  },

  // Get order analytics
  getOrderAnalytics: async (params?: {
    startDate?: string;
    endDate?: string;
    status?: string;
  }): Promise<ApiResponse<{
    totalOrders: number;
    averageOrdersPerDay: number;
    orderTrend: Array<{
      date: string;
      orders: number;
    }>;
    orderStatusBreakdown: {
      new: number;
      preparing: number;
      ready: number;
      outForDelivery: number;
      delivered: number;
      cancelled: number;
    };
    peakHours: Array<{
      hour: number;
      orders: number;
    }>;
  }>> => {
    const response = await api.get('/analytics/orders', { params });
    return response.data;
  },

  // Get customer analytics
  getCustomerAnalytics: async (params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<{
    totalCustomers: number;
    newCustomers: number;
    returningCustomers: number;
    averageCustomerRating: number;
    topCustomers: Array<{
      customerId: string;
      customerName: string;
      totalOrders: number;
      totalSpent: number;
      averageRating: number;
    }>;
    customerRetentionRate: number;
  }>> => {
    const response = await api.get('/analytics/customers', { params });
    return response.data;
  },

  // Get menu performance analytics
  getMenuAnalytics: async (params?: {
    startDate?: string;
    endDate?: string;
    category?: string;
  }): Promise<ApiResponse<{
    topSellingItems: Array<{
      itemId: string;
      name: string;
      quantity: number;
      revenue: number;
      rating: number;
    }>;
    categoryPerformance: Array<{
      category: string;
      orders: number;
      revenue: number;
      averageRating: number;
    }>;
    lowPerformingItems: Array<{
      itemId: string;
      name: string;
      quantity: number;
      revenue: number;
    }>;
  }>> => {
    const response = await api.get('/analytics/menu', { params });
    return response.data;
  },

  // Get delivery analytics
  getDeliveryAnalytics: async (params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<{
    averageDeliveryTime: number;
    deliveryTimeTrend: Array<{
      date: string;
      averageTime: number;
    }>;
    deliveryPerformance: {
      onTime: number;
      delayed: number;
      cancelled: number;
    };
    topDrivers: Array<{
      driverId: string;
      driverName: string;
      deliveries: number;
      averageRating: number;
      onTimePercentage: number;
    }>;
  }>> => {
    const response = await api.get('/analytics/delivery', { params });
    return response.data;
  },

  // Get real-time analytics
  getRealTimeAnalytics: async (): Promise<ApiResponse<{
    currentOrders: number;
    ordersInLastHour: number;
    revenueToday: number;
    averagePreparationTime: number;
    onlineStatus: boolean;
    activeDrivers: number;
  }>> => {
    const response = await api.get('/analytics/realtime');
    return response.data;
  },

  // Get comparison analytics
  getComparisonAnalytics: async (params: {
    currentStartDate: string;
    currentEndDate: string;
    previousStartDate: string;
    previousEndDate: string;
  }): Promise<ApiResponse<{
    revenue: {
      current: number;
      previous: number;
      change: number;
      percentageChange: number;
    };
    orders: {
      current: number;
      previous: number;
      change: number;
      percentageChange: number;
    };
    averageOrderValue: {
      current: number;
      previous: number;
      change: number;
      percentageChange: number;
    };
  }>> => {
    const response = await api.get('/analytics/comparison', { params });
    return response.data;
  },

  // Get sales report
  getSalesReport: async (params?: {
    startDate?: string;
    endDate?: string;
    format?: 'pdf' | 'csv' | 'excel';
  }): Promise<ApiResponse<{
    downloadUrl?: string;
    data?: {
      summary: {
        totalSales: number;
        totalOrders: number;
        averageOrderValue: number;
      };
      dailySales: Array<{
        date: string;
        sales: number;
        orders: number;
      }>;
      topItems: Array<{
        itemName: string;
        quantity: number;
        revenue: number;
      }>;
    };
  }>> => {
    const response = await api.get('/analytics/sales-report', { params });
    return response.data;
  },

  // Get performance metrics
  getPerformanceMetrics: async (params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<{
    orderAcceptanceRate: number;
    averagePreparationTime: number;
    customerSatisfactionScore: number;
    repeatCustomerRate: number;
    averageDeliveryTime: number;
    cancellationRate: number;
  }>> => {
    const response = await api.get('/analytics/performance', { params });
    return response.data;
  },

  // Get insights and recommendations
  getInsights: async (): Promise<ApiResponse<{
    insights: Array<{
      type: 'revenue' | 'orders' | 'customers' | 'menu' | 'delivery';
      title: string;
      description: string;
      impact: 'positive' | 'negative' | 'neutral';
      value: number;
      recommendation?: string;
    }>;
    trends: Array<{
      metric: string;
      trend: 'up' | 'down' | 'stable';
      percentage: number;
      description: string;
    }>;
  }>> => {
    const response = await api.get('/analytics/insights');
    return response.data;
  },

  // Export analytics data
  exportAnalytics: async (params: {
    type: 'revenue' | 'orders' | 'customers' | 'menu' | 'delivery';
    startDate: string;
    endDate: string;
    format: 'csv' | 'json' | 'excel';
  }): Promise<ApiResponse<{ downloadUrl: string }>> => {
    const response = await api.get('/analytics/export', { params });
    return response.data;
  },
};
