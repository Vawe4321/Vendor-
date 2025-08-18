import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockDashboardData } from '../../utils/mockData';

interface DashboardData {
  todayOrders: number;
  todayRevenue: number;
  averageRating: number;
  pendingOrders: number;
  totalCustomers: number;
  monthlyRevenue: number;
}

interface AnalyticsState {
  dashboardData: DashboardData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  dashboardData: mockDashboardData,
  isLoading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setDashboardData: (state, action: PayloadAction<DashboardData>) => {
      state.dashboardData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setDashboardData,
  setLoading,
  setError,
  clearError,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;