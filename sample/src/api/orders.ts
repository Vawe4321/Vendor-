import api from './index';
import { 
  Order, 
  OrdersResponse, 
  OrderStatusUpdateRequest, 
  PaginatedResponse,
  ApiResponse 
} from './types';

// Orders API endpoints
export const ordersAPI = {
  // Get all orders with filters
  getOrders: async (params?: {
    status?: Order['status'];
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
    search?: string;
  }): Promise<OrdersResponse> => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  // Get orders by status
  getOrdersByStatus: async (status: Order['status'], page = 1, limit = 20): Promise<OrdersResponse> => {
    const response = await api.get(`/orders/status/${status}`, {
      params: { page, limit }
    });
    return response.data;
  },

  // Get new orders
  getNewOrders: async (page = 1, limit = 20): Promise<OrdersResponse> => {
    return ordersAPI.getOrdersByStatus('NEW', page, limit);
  },

  // Get preparing orders
  getPreparingOrders: async (page = 1, limit = 20): Promise<OrdersResponse> => {
    return ordersAPI.getOrdersByStatus('PREPARING', page, limit);
  },

  // Get ready orders
  getReadyOrders: async (page = 1, limit = 20): Promise<OrdersResponse> => {
    return ordersAPI.getOrdersByStatus('READY', page, limit);
  },

  // Get out for delivery orders
  getOutForDeliveryOrders: async (page = 1, limit = 20): Promise<OrdersResponse> => {
    return ordersAPI.getOrdersByStatus('OUT_FOR_DELIVERY', page, limit);
  },

  // Get completed orders
  getCompletedOrders: async (page = 1, limit = 20): Promise<OrdersResponse> => {
    const response = await api.get('/orders/completed', {
      params: { page, limit }
    });
    return response.data;
  },

  // Get single order details
  getOrder: async (orderId: string): Promise<ApiResponse<Order>> => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (data: OrderStatusUpdateRequest): Promise<ApiResponse> => {
    const response = await api.put(`/orders/${data.orderId}/status`, data);
    return response.data;
  },

  // Accept order
  acceptOrder: async (orderId: string, estimatedTime?: string): Promise<ApiResponse> => {
    const response = await api.post(`/orders/${orderId}/accept`, {
      estimatedTime
    });
    return response.data;
  },

  // Reject order
  rejectOrder: async (orderId: string, reason: string): Promise<ApiResponse> => {
    const response = await api.post(`/orders/${orderId}/reject`, {
      reason
    });
    return response.data;
  },

  // Start preparing order
  startPreparing: async (orderId: string): Promise<ApiResponse> => {
    return ordersAPI.updateOrderStatus({
      orderId,
      status: 'PREPARING'
    });
  },

  // Mark order as ready
  markAsReady: async (orderId: string): Promise<ApiResponse> => {
    return ordersAPI.updateOrderStatus({
      orderId,
      status: 'READY'
    });
  },

  // Assign driver
  assignDriver: async (orderId: string, driverId: string): Promise<ApiResponse> => {
    const response = await api.post(`/orders/${orderId}/assign-driver`, {
      driverId
    });
    return response.data;
  },

  // Mark order as out for delivery
  markOutForDelivery: async (orderId: string): Promise<ApiResponse> => {
    return ordersAPI.updateOrderStatus({
      orderId,
      status: 'OUT_FOR_DELIVERY'
    });
  },

  // Mark order as delivered
  markAsDelivered: async (orderId: string): Promise<ApiResponse> => {
    return ordersAPI.updateOrderStatus({
      orderId,
      status: 'DELIVERED'
    });
  },

  // Get order statistics
  getOrderStats: async (params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    statusBreakdown: {
      new: number;
      preparing: number;
      ready: number;
      outForDelivery: number;
      delivered: number;
      cancelled: number;
    };
  }>> => {
    const response = await api.get('/orders/stats', { params });
    return response.data;
  },

  // Get order history
  getOrderHistory: async (params?: {
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
    customerId?: string;
  }): Promise<PaginatedResponse<Order>> => {
    const response = await api.get('/orders/history', { params });
    return response.data;
  },

  // Search orders
  searchOrders: async (query: string, page = 1, limit = 20): Promise<OrdersResponse> => {
    const response = await api.get('/orders/search', {
      params: { query, page, limit }
    });
    return response.data;
  },

  // Get orders by date range
  getOrdersByDateRange: async (startDate: string, endDate: string, page = 1, limit = 20): Promise<OrdersResponse> => {
    const response = await api.get('/orders/by-date', {
      params: { startDate, endDate, page, limit }
    });
    return response.data;
  },

  // Get urgent orders (high priority)
  getUrgentOrders: async (): Promise<OrdersResponse> => {
    const response = await api.get('/orders/urgent');
    return response.data;
  },

  // Bulk update order status
  bulkUpdateStatus: async (orderIds: string[], status: Order['status']): Promise<ApiResponse> => {
    const response = await api.put('/orders/bulk-update-status', {
      orderIds,
      status
    });
    return response.data;
  },
};
