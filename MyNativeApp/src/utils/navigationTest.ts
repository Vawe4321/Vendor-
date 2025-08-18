import { store } from '../store';
import { loginUser, logout } from '../store/slices/authSlice';

/**
 * Navigation Test Utilities
 * These functions help test the navigation flow and authentication state
 */

export const testAuthFlow = async () => {
  console.log('🧪 Testing Authentication Flow...');
  
  // Test initial state
  const initialState = store.getState();
  console.log('Initial auth state:', {
    isAuthenticated: initialState.auth?.isAuthenticated || false,
    user: initialState.auth?.user?.businessName || 'None',
  });

  // Test login
  console.log('🔐 Testing login...');
  try {
    await store.dispatch(loginUser({ phone: '9876543210', password: 'test123' }));
    const loginState = store.getState();
    console.log('After login:', {
      isAuthenticated: loginState.auth?.isAuthenticated || false,
      user: loginState.auth?.user?.businessName || 'None',
      hasToken: !!loginState.auth?.token,
    });
  } catch (error) {
    console.error('Login test failed:', error);
  }

  // Test logout
  console.log('🚪 Testing logout...');
  store.dispatch(logout());
  const logoutState = store.getState();
  console.log('After logout:', {
    isAuthenticated: logoutState.auth?.isAuthenticated || false,
    user: logoutState.auth?.user?.businessName || 'None',
    hasToken: !!logoutState.auth?.token,
  });

  console.log('✅ Authentication flow test completed');
};

export const logNavigationState = () => {
  const state = store.getState();
  console.log('📱 Current Navigation State:', {
    auth: {
      isAuthenticated: state.auth?.isAuthenticated || false,
      isLoading: state.auth?.isLoading || false,
      user: state.auth?.user?.businessName || 'None',
    },
    ui: {
      isLoading: state.ui?.isLoading || false,
      activeTab: state.ui?.activeTab || 'dashboard',
    },
    orders: {
      newOrdersCount: state.orders?.newOrders?.length || 0,
      activeOrdersCount: state.orders?.activeOrders?.length || 0,
    },
  });
};

export const testStoreIntegration = () => {
  console.log('🏪 Testing Store Integration...');
  
  const state = store.getState();
  const requiredSlices = ['auth', 'orders', 'menu', 'analytics', 'ui'];
  
  requiredSlices.forEach(slice => {
    if ((state as any)[slice]) {
      console.log(`✅ ${slice} slice: OK`);
    } else {
      console.error(`❌ ${slice} slice: MISSING`);
    }
  });
  
  console.log('Store integration test completed');
};

// Auto-run tests in development
if (__DEV__) {
  // Run tests after a short delay to ensure store is initialized
  setTimeout(() => {
    console.log('🚀 Running Navigation Tests...');
    testStoreIntegration();
    logNavigationState();
  }, 1000);
}