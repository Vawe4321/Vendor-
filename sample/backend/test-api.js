const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
let authToken = '';

// Test configuration
const testConfig = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Utility function to log test results
const logTest = (testName, success, data = null, error = null) => {
  const status = success ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} ${testName}`);
  if (data) console.log('   Data:', JSON.stringify(data, null, 2));
  if (error) console.log('   Error:', error.message || error);
  console.log('');
};

// Test health endpoint
const testHealth = async () => {
  try {
    const response = await axios.get('http://localhost:5000/health', testConfig);
    logTest('Health Check', true, response.data);
    return true;
  } catch (error) {
    logTest('Health Check', false, null, error);
    return false;
  }
};

// Test API info endpoint
const testApiInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`, testConfig);
    logTest('API Info', true, response.data);
    return true;
  } catch (error) {
    logTest('API Info', false, null, error);
    return false;
  }
};

// Test user registration
const testRegister = async () => {
  try {
    const userData = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
      phone: '+91-9876543200',
      role: 'owner'
    };
    
    const response = await axios.post(`${BASE_URL}/auth/register`, userData, testConfig);
    logTest('User Registration', true, { message: 'User registered successfully' });
    return true;
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.error?.includes('already exists')) {
      logTest('User Registration', true, { message: 'User already exists (expected)' });
      return true;
    }
    logTest('User Registration', false, null, error);
    return false;
  }
};

// Test user login
const testLogin = async () => {
  try {
    const loginData = {
      email: 'owner@test.com',
      password: 'password123'
    };
    
    const response = await axios.post(`${BASE_URL}/auth/login`, loginData, testConfig);
    authToken = response.data.data.token;
    
    logTest('User Login', true, { 
      message: 'Login successful',
      user: response.data.data.user.email,
      role: response.data.data.user.role
    });
    return true;
  } catch (error) {
    logTest('User Login', false, null, error);
    return false;
  }
};

// Test get profile
const testGetProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/profile`, {
      ...testConfig,
      headers: {
        ...testConfig.headers,
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    logTest('Get Profile', true, {
      user: response.data.data.email,
      role: response.data.data.role
    });
    return true;
  } catch (error) {
    logTest('Get Profile', false, null, error);
    return false;
  }
};

// Test get restaurant profile
const testGetRestaurant = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/restaurant`, {
      ...testConfig,
      headers: {
        ...testConfig.headers,
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    logTest('Get Restaurant Profile', true, {
      name: response.data.data.name,
      cuisine: response.data.data.cuisine
    });
    return true;
  } catch (error) {
    logTest('Get Restaurant Profile', false, null, error);
    return false;
  }
};

// Test get categories
const testGetCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/menu/categories`, {
      ...testConfig,
      headers: {
        ...testConfig.headers,
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    logTest('Get Categories', true, {
      count: response.data.data.length,
      categories: response.data.data.map(cat => cat.name)
    });
    return true;
  } catch (error) {
    logTest('Get Categories', false, null, error);
    return false;
  }
};

// Test get menu items
const testGetMenuItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/menu/items`, {
      ...testConfig,
      headers: {
        ...testConfig.headers,
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    logTest('Get Menu Items', true, {
      count: response.data.data.length,
      items: response.data.data.map(item => item.name)
    });
    return true;
  } catch (error) {
    logTest('Get Menu Items', false, null, error);
    return false;
  }
};

// Test get orders
const testGetOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders`, {
      ...testConfig,
      headers: {
        ...testConfig.headers,
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    logTest('Get Orders', true, {
      count: response.data.data.length,
      orders: response.data.data.map(order => ({
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total
      }))
    });
    return true;
  } catch (error) {
    logTest('Get Orders', false, null, error);
    return false;
  }
};

// Test get analytics
const testGetAnalytics = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/analytics/dashboard`, {
      ...testConfig,
      headers: {
        ...testConfig.headers,
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    logTest('Get Analytics', true, {
      orders: response.data.data.orders,
      revenue: response.data.data.revenue
    });
    return true;
  } catch (error) {
    logTest('Get Analytics', false, null, error);
    return false;
  }
};

// Test unauthorized access
const testUnauthorizedAccess = async () => {
  try {
    await axios.get(`${BASE_URL}/orders`, testConfig);
    logTest('Unauthorized Access', false, null, 'Should have failed');
    return false;
  } catch (error) {
    if (error.response?.status === 401) {
      logTest('Unauthorized Access', true, { message: 'Correctly blocked unauthorized access' });
      return true;
    }
    logTest('Unauthorized Access', false, null, error);
    return false;
  }
};

// Main test runner
const runTests = async () => {
  console.log('🚀 Starting API Tests...\n');
  
  const tests = [
    { name: 'Health Check', fn: testHealth },
    { name: 'API Info', fn: testApiInfo },
    { name: 'User Registration', fn: testRegister },
    { name: 'User Login', fn: testLogin },
    { name: 'Get Profile', fn: testGetProfile },
    { name: 'Get Restaurant Profile', fn: testGetRestaurant },
    { name: 'Get Categories', fn: testGetCategories },
    { name: 'Get Menu Items', fn: testGetMenuItems },
    { name: 'Get Orders', fn: testGetOrders },
    { name: 'Get Analytics', fn: testGetAnalytics },
    { name: 'Unauthorized Access', fn: testUnauthorizedAccess }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) passed++;
      else failed++;
    } catch (error) {
      console.log(`❌ FAIL ${test.name} - Unexpected error:`, error.message);
      failed++;
    }
  }
  
  console.log('📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! Backend is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. Please check the backend setup.');
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  runTests,
  testHealth,
  testLogin,
  testGetProfile
};
