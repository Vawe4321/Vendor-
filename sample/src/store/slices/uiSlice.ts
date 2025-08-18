import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isLoading: boolean;
  activeTab: string;
  notifications: any[];
  theme: 'light' | 'dark';
  language: string;
}

const initialState: UIState = {
  isLoading: false,
  activeTab: 'dashboard',
  notifications: [],
  theme: 'light',
  language: 'en',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    addNotification: (state, action: PayloadAction<any>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const {
  setLoading,
  setActiveTab,
  addNotification,
  removeNotification,
  clearNotifications,
  setTheme,
  setLanguage,
} = uiSlice.actions;

export default uiSlice.reducer;