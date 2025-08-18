import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import ordersSlice from './slices/ordersSlice';
import menuSlice from './slices/menuSlice';
import analyticsSlice from './slices/analyticsSlice';
import uiSlice from './slices/uiSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'menu'], // Only persist auth and menu data
};

const rootReducer = combineReducers({
  auth: authSlice,
  orders: ordersSlice,
  menu: menuSlice,
  analytics: analyticsSlice,
  ui: uiSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

console.log('🏪 Configuring Redux store...');

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

console.log('🏪 Redux store configured successfully');
console.log('💾 Creating persistor...');

export const persistor = persistStore(store);

console.log('💾 Persistor created successfully');
console.log('🏪 Initial store state:', store.getState());

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;