import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem } from '../../types/menu';

interface MenuState {
  items: MenuItem[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  categories: [],
  isLoading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
    },
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setMenuItems,
  addMenuItem,
  updateMenuItem,
  removeMenuItem,
  setCategories,
  clearError,
} = menuSlice.actions;

export default menuSlice.reducer;