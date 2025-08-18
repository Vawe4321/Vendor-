import api from './index';
import { 
  Review, 
  Complaint, 
  DishRating, 
  FeedbackResponse, 
  ReplyToReviewRequest,
  UpdateComplaintStatusRequest,
  ApiResponse,
  PaginatedResponse 
} from './types';

// Feedback API endpoints
export const feedbackAPI = {
  // Get all feedback data
  getFeedback: async (params?: {
    startDate?: string;
    endDate?: string;
    type?: 'reviews' | 'complaints' | 'all';
  }): Promise<FeedbackResponse> => {
    const response = await api.get('/feedback', { params });
    return response.data;
  },

  // Get reviews
  getReviews: async (params?: {
    page?: number;
    limit?: number;
    rating?: number;
    startDate?: string;
    endDate?: string;
    search?: string;
    isReplied?: boolean;
  }): Promise<PaginatedResponse<Review>> => {
    const response = await api.get('/feedback/reviews', { params });
    return response.data;
  },

  // Get single review
  getReview: async (reviewId: string): Promise<ApiResponse<Review>> => {
    const response = await api.get(`/feedback/reviews/${reviewId}`);
    return response.data;
  },

  // Reply to review
  replyToReview: async (data: ReplyToReviewRequest): Promise<ApiResponse> => {
    const response = await api.post(`/feedback/reviews/${data.reviewId}/reply`, data);
    return response.data;
  },

  // Get complaints
  getComplaints: async (params?: {
    page?: number;
    limit?: number;
    status?: Complaint['status'];
    priority?: Complaint['priority'];
    category?: Complaint['category'];
    startDate?: string;
    endDate?: string;
    search?: string;
  }): Promise<PaginatedResponse<Complaint>> => {
    const response = await api.get('/feedback/complaints', { params });
    return response.data;
  },

  // Get single complaint
  getComplaint: async (complaintId: string): Promise<ApiResponse<Complaint>> => {
    const response = await api.get(`/feedback/complaints/${complaintId}`);
    return response.data;
  },

  // Update complaint status
  updateComplaintStatus: async (data: UpdateComplaintStatusRequest): Promise<ApiResponse> => {
    const response = await api.put(`/feedback/complaints/${data.complaintId}/status`, data);
    return response.data;
  },

  // Get dish ratings
  getDishRatings: async (params?: {
    category?: string;
    minRating?: number;
    maxRating?: number;
  }): Promise<ApiResponse<DishRating[]>> => {
    const response = await api.get('/feedback/dish-ratings', { params });
    return response.data;
  },

  // Get single dish rating
  getDishRating: async (dishId: string): Promise<ApiResponse<DishRating>> => {
    const response = await api.get(`/feedback/dish-ratings/${dishId}`);
    return response.data;
  },

  // Get feedback statistics
  getFeedbackStats: async (params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<{
    totalReviews: number;
    totalComplaints: number;
    averageRating: number;
    ratingDistribution: {
      '1': number;
      '2': number;
      '3': number;
      '4': number;
      '5': number;
    };
    complaintStatusBreakdown: {
      open: number;
      inProgress: number;
      resolved: number;
      closed: number;
    };
    complaintPriorityBreakdown: {
      low: number;
      medium: number;
      high: number;
      urgent: number;
    };
    topRatedDishes: Array<{
      dishId: string;
      name: string;
      rating: number;
      totalReviews: number;
    }>;
  }>> => {
    const response = await api.get('/feedback/stats', { params });
    return response.data;
  },

  // Search reviews
  searchReviews: async (query: string, page = 1, limit = 20): Promise<PaginatedResponse<Review>> => {
    const response = await api.get('/feedback/reviews/search', {
      params: { query, page, limit }
    });
    return response.data;
  },

  // Search complaints
  searchComplaints: async (query: string, page = 1, limit = 20): Promise<PaginatedResponse<Complaint>> => {
    const response = await api.get('/feedback/complaints/search', {
      params: { query, page, limit }
    });
    return response.data;
  },

  // Get reviews by rating
  getReviewsByRating: async (rating: number, page = 1, limit = 20): Promise<PaginatedResponse<Review>> => {
    const response = await api.get(`/feedback/reviews/rating/${rating}`, {
      params: { page, limit }
    });
    return response.data;
  },

  // Get complaints by status
  getComplaintsByStatus: async (status: Complaint['status'], page = 1, limit = 20): Promise<PaginatedResponse<Complaint>> => {
    const response = await api.get(`/feedback/complaints/status/${status}`, {
      params: { page, limit }
    });
    return response.data;
  },

  // Get complaints by priority
  getComplaintsByPriority: async (priority: Complaint['priority'], page = 1, limit = 20): Promise<PaginatedResponse<Complaint>> => {
    const response = await api.get(`/feedback/complaints/priority/${priority}`, {
      params: { page, limit }
    });
    return response.data;
  },

  // Get urgent complaints
  getUrgentComplaints: async (): Promise<ApiResponse<Complaint[]>> => {
    const response = await api.get('/feedback/complaints/urgent');
    return response.data;
  },

  // Get unread reviews
  getUnreadReviews: async (page = 1, limit = 20): Promise<PaginatedResponse<Review>> => {
    const response = await api.get('/feedback/reviews/unread', {
      params: { page, limit }
    });
    return response.data;
  },

  // Mark review as read
  markReviewAsRead: async (reviewId: string): Promise<ApiResponse> => {
    const response = await api.put(`/feedback/reviews/${reviewId}/read`);
    return response.data;
  },

  // Mark complaint as read
  markComplaintAsRead: async (complaintId: string): Promise<ApiResponse> => {
    const response = await api.put(`/feedback/complaints/${complaintId}/read`);
    return response.data;
  },

  // Get feedback trends
  getFeedbackTrends: async (params?: {
    startDate?: string;
    endDate?: string;
    period?: 'daily' | 'weekly' | 'monthly';
  }): Promise<ApiResponse<{
    ratingTrend: Array<{
      date: string;
      averageRating: number;
      totalReviews: number;
    }>;
    complaintTrend: Array<{
      date: string;
      totalComplaints: number;
      resolvedComplaints: number;
    }>;
  }>> => {
    const response = await api.get('/feedback/trends', { params });
    return response.data;
  },

  // Export feedback data
  exportFeedback: async (params: {
    type: 'reviews' | 'complaints' | 'dish-ratings';
    startDate: string;
    endDate: string;
    format: 'csv' | 'json' | 'excel';
  }): Promise<ApiResponse<{ downloadUrl: string }>> => {
    const response = await api.get('/feedback/export', { params });
    return response.data;
  },

  // Get customer feedback history
  getCustomerFeedbackHistory: async (customerId: string): Promise<ApiResponse<{
    reviews: Review[];
    complaints: Complaint[];
    totalReviews: number;
    totalComplaints: number;
    averageRating: number;
  }>> => {
    const response = await api.get(`/feedback/customer/${customerId}`);
    return response.data;
  },

  // Get order feedback
  getOrderFeedback: async (orderId: string): Promise<ApiResponse<{
    review?: Review;
    complaints: Complaint[];
  }>> => {
    const response = await api.get(`/feedback/order/${orderId}`);
    return response.data;
  },
};
