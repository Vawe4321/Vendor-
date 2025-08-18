import api from './index';
import { 
  MenuItem, 
  MenuCategory, 
  InventoryResponse, 
  UpdateStockRequest,
  ApiResponse,
  PaginatedResponse 
} from './types';

// Inventory API endpoints
export const inventoryAPI = {
  // Get all menu categories and items
  getInventory: async (): Promise<InventoryResponse> => {
    const response = await api.get('/inventory');
    return response.data;
  },

  // Get menu categories
  getCategories: async (): Promise<ApiResponse<MenuCategory[]>> => {
    const response = await api.get('/inventory/categories');
    return response.data;
  },

  // Get menu items by category
  getItemsByCategory: async (categoryId: string): Promise<ApiResponse<MenuItem[]>> => {
    const response = await api.get(`/inventory/categories/${categoryId}/items`);
    return response.data;
  },

  // Get all menu items
  getAllItems: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    inStock?: boolean;
  }): Promise<PaginatedResponse<MenuItem>> => {
    const response = await api.get('/inventory/items', { params });
    return response.data;
  },

  // Get single menu item
  getItem: async (itemId: string): Promise<ApiResponse<MenuItem>> => {
    const response = await api.get(`/inventory/items/${itemId}`);
    return response.data;
  },

  // Create new menu item
  createItem: async (data: Omit<MenuItem, 'id'>): Promise<ApiResponse<MenuItem>> => {
    const response = await api.post('/inventory/items', data);
    return response.data;
  },

  // Update menu item
  updateItem: async (itemId: string, data: Partial<MenuItem>): Promise<ApiResponse<MenuItem>> => {
    const response = await api.put(`/inventory/items/${itemId}`, data);
    return response.data;
  },

  // Delete menu item
  deleteItem: async (itemId: string): Promise<ApiResponse> => {
    const response = await api.delete(`/inventory/items/${itemId}`);
    return response.data;
  },

  // Update item stock status
  updateStock: async (data: UpdateStockRequest): Promise<ApiResponse> => {
    const response = await api.put(`/inventory/items/${data.itemId}/stock`, data);
    return response.data;
  },

  // Bulk update stock status
  bulkUpdateStock: async (updates: UpdateStockRequest[]): Promise<ApiResponse> => {
    const response = await api.put('/inventory/items/bulk-stock-update', { updates });
    return response.data;
  },

  // Create new category
  createCategory: async (data: Omit<MenuCategory, 'id' | 'items'>): Promise<ApiResponse<MenuCategory>> => {
    const response = await api.post('/inventory/categories', data);
    return response.data;
  },

  // Update category
  updateCategory: async (categoryId: string, data: Partial<MenuCategory>): Promise<ApiResponse<MenuCategory>> => {
    const response = await api.put(`/inventory/categories/${categoryId}`, data);
    return response.data;
  },

  // Delete category
  deleteCategory: async (categoryId: string): Promise<ApiResponse> => {
    const response = await api.delete(`/inventory/categories/${categoryId}`);
    return response.data;
  },

  // Reorder categories
  reorderCategories: async (categoryIds: string[]): Promise<ApiResponse> => {
    const response = await api.put('/inventory/categories/reorder', { categoryIds });
    return response.data;
  },

  // Search menu items
  searchItems: async (query: string, page = 1, limit = 20): Promise<PaginatedResponse<MenuItem>> => {
    const response = await api.get('/inventory/items/search', {
      params: { query, page, limit }
    });
    return response.data;
  },

  // Get popular items
  getPopularItems: async (limit = 10): Promise<ApiResponse<MenuItem[]>> => {
    const response = await api.get('/inventory/items/popular', {
      params: { limit }
    });
    return response.data;
  },

  // Get recommended items
  getRecommendedItems: async (limit = 10): Promise<ApiResponse<MenuItem[]>> => {
    const response = await api.get('/inventory/items/recommended', {
      params: { limit }
    });
    return response.data;
  },

  // Get out of stock items
  getOutOfStockItems: async (page = 1, limit = 20): Promise<PaginatedResponse<MenuItem>> => {
    const response = await api.get('/inventory/items/out-of-stock', {
      params: { page, limit }
    });
    return response.data;
  },

  // Get low stock items
  getLowStockItems: async (threshold = 5, page = 1, limit = 20): Promise<PaginatedResponse<MenuItem>> => {
    const response = await api.get('/inventory/items/low-stock', {
      params: { threshold, page, limit }
    });
    return response.data;
  },

  // Upload item image
  uploadItemImage: async (itemId: string, imageFile: any): Promise<ApiResponse<{ imageUrl: string }>> => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await api.post(`/inventory/items/${itemId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get inventory statistics
  getInventoryStats: async (): Promise<ApiResponse<{
    totalItems: number;
    totalCategories: number;
    inStockItems: number;
    outOfStockItems: number;
    lowStockItems: number;
    popularItems: number;
  }>> => {
    const response = await api.get('/inventory/stats');
    return response.data;
  },

  // Import menu items (bulk upload)
  importItems: async (items: Omit<MenuItem, 'id'>[]): Promise<ApiResponse<{
    imported: number;
    failed: number;
    errors: string[];
  }>> => {
    const response = await api.post('/inventory/items/import', { items });
    return response.data;
  },

  // Export menu items
  exportItems: async (format: 'csv' | 'json' = 'csv'): Promise<ApiResponse<{ downloadUrl: string }>> => {
    const response = await api.get('/inventory/items/export', {
      params: { format }
    });
    return response.data;
  },

  // Get item analytics
  getItemAnalytics: async (itemId: string, params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<{
    totalOrders: number;
    totalRevenue: number;
    averageRating: number;
    totalReviews: number;
    orderTrend: Array<{
      date: string;
      orders: number;
      revenue: number;
    }>;
  }>> => {
    const response = await api.get(`/inventory/items/${itemId}/analytics`, { params });
    return response.data;
  },
};
