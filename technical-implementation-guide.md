# Technical Implementation Guide - Vendor Application

## Project Setup and Configuration

### 1. React Native Project Initialization

```bash
# Create new React Native project with TypeScript
npx react-native@latest init VendorApp --template react-native-template-typescript

# Navigate to project directory
cd VendorApp

# Install additional dependencies
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npm install @reduxjs/toolkit react-redux redux-persist
npm install react-native-paper react-native-vector-icons
npm install react-native-chart-kit react-native-svg
npm install react-native-image-picker react-native-document-picker
npm install @react-native-async-storage/async-storage
npm install react-native-keychain react-native-biometrics
npm install react-native-push-notification @react-native-firebase/app @react-native-firebase/messaging
npm install axios react-query
npm install react-hook-form yup @hookform/resolvers
npm install react-native-reanimated react-native-gesture-handler
npm install react-native-safe-area-context react-native-screens

# Development dependencies
npm install --save-dev @types/react-native-vector-icons
npm install --save-dev reactotron-react-native reactotron-redux
```

### 2. Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Header/
│   │   └── LoadingSpinner/
│   ├── business/        # Business-specific components
│   │   ├── OrderCard/
│   │   ├── ProductCard/
│   │   ├── MetricCard/
│   │   └── StatusBadge/
│   └── forms/           # Form components
│       ├── LoginForm/
│       ├── ProductForm/
│       └── ProfileForm/
├── screens/             # Screen components
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── OTPScreen.tsx
│   ├── dashboard/
│   │   └── DashboardScreen.tsx
│   ├── orders/
│   │   ├── NewOrdersScreen.tsx
│   │   ├── ActiveOrdersScreen.tsx
│   │   ├── OrderDetailsScreen.tsx
│   │   └── OrderHistoryScreen.tsx
│   ├── menu/
│   │   ├── MenuOverviewScreen.tsx
│   │   ├── AddProductScreen.tsx
│   │   └── EditProductScreen.tsx
│   ├── analytics/
│   │   ├── EarningsScreen.tsx
│   │   └── AnalyticsScreen.tsx
│   └── profile/
│       ├── ProfileScreen.tsx
│       ├── SettingsScreen.tsx
│       └── SupportScreen.tsx
├── navigation/          # Navigation configuration
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── TabNavigator.tsx
│   └── types.ts
├── store/              # Redux store configuration
│   ├── index.ts
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── ordersSlice.ts
│   │   ├── menuSlice.ts
│   │   ├── analyticsSlice.ts
│   │   └── uiSlice.ts
│   └── middleware/
│       ├── apiMiddleware.ts
│       └── persistConfig.ts
├── services/           # API and external services
│   ├── api/
│   │   ├── client.ts
│   │   ├── auth.ts
│   │   ├── orders.ts
│   │   ├── menu.ts
│   │   └── analytics.ts
│   ├── storage/
│   │   ├── secureStorage.ts
│   │   └── asyncStorage.ts
│   ├── notifications/
│   │   └── pushNotifications.ts
│   └── realtime/
│       └── websocket.ts
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   ├── useOrders.ts
│   ├── useMenu.ts
│   └── useAnalytics.ts
├── utils/              # Utility functions
│   ├── constants.ts
│   ├── helpers.ts
│   ├── validation.ts
│   └── formatters.ts
├── types/              # TypeScript type definitions
│   ├── auth.ts
│   ├── orders.ts
│   ├── menu.ts
│   └── analytics.ts
└── theme/              # Theme and styling
    ├── colors.ts
    ├── typography.ts
    ├── spacing.ts
    └── index.ts
```

## Core Implementation Examples

### 3. Theme Configuration

```typescript
// src/theme/index.ts
export const theme = {
  colors: {
    primary: '#007AFF',
    primaryDark: '#0056CC',
    secondary: '#FF6B35',
    success: '#28A745',
    warning: '#FFC107',
    error: '#DC3545',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    surfaceDark: '#E9ECEF',
    text: '#212529',
    textSecondary: '#6C757D',
    textLight: '#ADB5BD',
    border: '#DEE2E6',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: 'bold' as const,
      lineHeight: 34,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 30,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 26,
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal' as const,
      lineHeight: 22,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: 'normal' as const,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: 'normal' as const,
      lineHeight: 16,
    },
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    xlarge: 16,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
  },
};

export type Theme = typeof theme;
```

### 4. Redux Store Setup

```typescript
// src/store/index.ts
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

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 5. Authentication Slice

```typescript
// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../../services/api/auth';
import { User, LoginCredentials, RegisterData } from '../../types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({ phone, otp }: { phone: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyOTP(phone, otp);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'OTP verification failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Don't set as authenticated until OTP verification
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // OTP Verification
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
```

### 6. API Client Setup

```typescript
// src/services/api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '../../store';
import { logout } from '../../store/slices/authSlice';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.vendorapp.com/v1',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const state = store.getState();
        const token = state.auth.token;
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          store.dispatch(logout());
        }
        
        return Promise.reject(error);
      }
    );
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get(url, config);
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post(url, data, config);
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put(url, data, config);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete(url, config);
  }
}

export const apiClient = new ApiClient();
```

### 7. Navigation Setup

```typescript
// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
```

### 8. Custom Hook Example

```typescript
// src/hooks/useOrders.ts
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { RootState, AppDispatch } from '../store';
import { fetchNewOrders, acceptOrder, rejectOrder } from '../store/slices/ordersSlice';

export const useOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    newOrders, 
    activeOrders, 
    orderHistory, 
    isLoading, 
    error 
  } = useSelector((state: RootState) => state.orders);

  const loadNewOrders = useCallback(() => {
    dispatch(fetchNewOrders());
  }, [dispatch]);

  const handleAcceptOrder = useCallback((orderId: string, preparationTime: number) => {
    dispatch(acceptOrder({ orderId, preparationTime }));
  }, [dispatch]);

  const handleRejectOrder = useCallback((orderId: string, reason: string) => {
    dispatch(rejectOrder({ orderId, reason }));
  }, [dispatch]);

  // Auto-refresh new orders every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadNewOrders();
    }, 30000);

    return () => clearInterval(interval);
  }, [loadNewOrders]);

  return {
    newOrders,
    activeOrders,
    orderHistory,
    isLoading,
    error,
    loadNewOrders,
    handleAcceptOrder,
    handleRejectOrder,
  };
};
```

### 9. Reusable Component Example

```typescript
// src/components/common/Button/Button.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '../../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const buttonTextStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? theme.colors.background : theme.colors.primary} 
          size="small" 
        />
      ) : (
        <Text style={buttonTextStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  small: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    minHeight: 56,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: theme.colors.background,
  },
  secondaryText: {
    color: theme.colors.background,
  },
  outlineText: {
    color: theme.colors.primary,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    opacity: 0.7,
  },
});

export default Button;
```

### 10. Screen Component Example

```typescript
// src/screens/dashboard/DashboardScreen.tsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { fetchDashboardData } from '../../store/slices/analyticsSlice';
import { theme } from '../../theme';
import Header from '../../components/common/Header/Header';
import MetricCard from '../../components/business/MetricCard/MetricCard';
import OrderCard from '../../components/business/OrderCard/OrderCard';
import Button from '../../components/common/Button/Button';

const DashboardScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { dashboardData, isLoading } = useSelector((state: RootState) => state.analytics);
  const { newOrders } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchDashboardData());
  };

  return (
    <View style={styles.container}>
      <Header 
        title={`Welcome, ${user?.businessName}`}
        showNotifications
        showProfile
      />
      
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      >
        {/* Status Toggle */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Button
            title={user?.isOnline ? 'Online' : 'Offline'}
            variant={user?.isOnline ? 'primary' : 'secondary'}
            size="small"
            onPress={() => {/* Toggle online status */}}
          />
        </View>

        {/* Metrics */}
        <View style={styles.metricsContainer}>
          <MetricCard
            title="Today's Orders"
            value={dashboardData?.todayOrders || 0}
            icon="receipt"
            color={theme.colors.primary}
          />
          <MetricCard
            title="Today's Revenue"
            value={`₹${dashboardData?.todayRevenue || 0}`}
            icon="currency-rupee"
            color={theme.colors.success}
          />
          <MetricCard
            title="Average Rating"
            value={dashboardData?.averageRating || 0}
            icon="star"
            color={theme.colors.warning}
          />
          <MetricCard
            title="Pending Orders"
            value={newOrders.length}
            icon="clock"
            color={theme.colors.error}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <Button
              title="View New Orders"
              variant="primary"
              onPress={() => {/* Navigate to new orders */}}
            />
            <Button
              title="Add Menu Item"
              variant="outline"
              onPress={() => {/* Navigate to add product */}}
            />
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.recentOrders}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          {newOrders.slice(0, 3).map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onAccept={() => {/* Handle accept */}}
              onReject={() => {/* Handle reject */}}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
  },
  statusLabel: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  quickActions: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  recentOrders: {
    marginBottom: theme.spacing.xl,
  },
});

export default DashboardScreen;
```

## Development Best Practices

### 11. Error Handling

```typescript
// src/utils/errorHandler.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleApiError = (error: any): AppError => {
  if (error.response) {
    // Server responded with error status
    return new AppError(
      error.response.data?.message || 'Server error',
      error.response.data?.code || 'SERVER_ERROR',
      error.response.status
    );
  } else if (error.request) {
    // Network error
    return new AppError(
      'Network error. Please check your connection.',
      'NETWORK_ERROR'
    );
  } else {
    // Other error
    return new AppError(
      error.message || 'An unexpected error occurred',
      'UNKNOWN_ERROR'
    );
  }
};
```

### 12. Performance Optimization

```typescript
// src/components/common/LazyImage/LazyImage.tsx
import React, { useState, memo } from 'react';
import { Image, View, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../../../theme';

interface LazyImageProps {
  source: { uri: string };
  style?: any;
  placeholder?: React.ReactNode;
}

const LazyImage: React.FC<LazyImageProps> = memo(({ source, style, placeholder }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {loading && (
        <View style={styles.placeholder}>
          {placeholder || <ActivityIndicator color={theme.colors.primary} />}
        </View>
      )}
      <Image
        source={source}
        style={[styles.image, style]}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        resizeMode="cover"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
});

export default LazyImage;
```

This technical implementation guide provides a solid foundation for building the vendor application with proper architecture, best practices, and scalable code structure.