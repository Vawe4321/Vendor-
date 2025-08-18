import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types/orders';
import { generateMockOrders } from '../../utils/mockData';

interface OrdersState {
  newOrders: Order[];
  activeOrders: Order[];
  orderHistory: Order[];
  isLoading: boolean;
  error: string | null;
}

const mockData = generateMockOrders();

const initialState: OrdersState = {
  newOrders: mockData.newOrders,
  activeOrders: mockData.activeOrders,
  orderHistory: mockData.orderHistory,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchNewOrders = createAsyncThunk(
  'orders/fetchNew',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      return generateMockOrders().newOrders;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch orders');
    }
  }
);

export const acceptOrder = createAsyncThunk(
  'orders/accept',
  async ({ orderId, preparationTime }: { orderId: string; preparationTime: number }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 500));
      return { orderId, preparationTime };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to accept order');
    }
  }
);

export const rejectOrder = createAsyncThunk(
  'orders/reject',
  async ({ orderId, reason }: { orderId: string; reason: string }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 500));
      return { orderId, reason };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to reject order');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addNewOrder: (state, action: PayloadAction<Order>) => {
      state.newOrders.push(action.payload);
    },
    removeNewOrder: (state, action: PayloadAction<string>) => {
      state.newOrders = state.newOrders.filter(order => order.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch new orders
      .addCase(fetchNewOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNewOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newOrders = action.payload;
      })
      .addCase(fetchNewOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Accept order
      .addCase(acceptOrder.fulfilled, (state, action) => {
        const { orderId } = action.payload;
        const order = state.newOrders.find(o => o.id === orderId);
        if (order) {
          state.newOrders = state.newOrders.filter(o => o.id !== orderId);
          state.activeOrders.push({ ...order, status: 'accepted' });
        }
      })
      // Reject order
      .addCase(rejectOrder.fulfilled, (state, action) => {
        const { orderId } = action.payload;
        state.newOrders = state.newOrders.filter(o => o.id !== orderId);
      });
  },
});

export const { clearError, addNewOrder, removeNewOrder } = ordersSlice.actions;
export default ordersSlice.reducer;