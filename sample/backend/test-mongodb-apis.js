#!/usr/bin/env node

const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

const BASE_URL = 'http://localhost:5000/api';
let authToken = '';
let testUserId = '';
let testRestaurantId = '';
let testCustomerId = '';
let testCategoryId = '';
let testMenuItemId = '';
let testOrderId = '';

// Test configuration
const testConfig = {
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Utility function to log test results
const logTest = (testName, success, data = null, error = null) => {
  const status = success ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} ${testName}`);
  if (data && Object.keys(data).length > 0) {
    console.log('   Data:', JSON.stringify(data, null, 2));
  }
  if (error) {
    console.log('   Error:', error.message || error);
  }
  console.log('');
};

// Test database connection
const testDatabaseConnection = async () => {
  try {
    console.log('🔍 Testing MongoDB connection...');
    
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vendor_app';
    await mongoose.connect(mongoURI);
    
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 1) {
      logTest('MongoDB Connection', true, { status: 'connected' });
      return true;
    } else {
      logTest('MongoDB Connection', false, null, 'Database not connected');
      return false;
    }
  } catch (error) {
    logTest('MongoDB Connection', false, null, error);
    return false;
  }
};

// Test database status endpoint
const testDatabaseStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/db-status`, testConfig);
    logTest('Database Status API', true, {
      connectionState: response.data.connectionState,
      collections: response.data.collections,
      counts: response.data.counts
    });
    return true;
  } catch (error) {
    logTest('Database Status API', false, null, error);
    return false;
  }
};

// Test API data endpoint
const testAPIData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/test-data`, testConfig);
    logTest('API Data Test', true, {
      users: response.data.data.users.length,
      restaurants: response.data.data.restaurants.length,
      categories: response.data.data.categories.length,
      menuItems: response.data.data.menuItems.length,
      orders: response.data.data.orders.length,
      customers: response.data.data.customers.length
    });
    return true;
  } catch (error) {
    logTest('API Data Test', false, null, error);
    return false;
  }
};

// Test user registration
const testRegister = async () => {
  try {
    const userData = {
      name: 'Test API User',
      email: 'testapi@example.com',
      password: 'Password123',
      phone: '+91-9876543210',
      role: 'owner',
      restaurantName: 'Test API Restaurant',
      cuisine: 'Indian',
      address: {
        street: '123 Test St',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
        country: 'India'
      }
    };
    
    const response = await axios.post(`${BASE_URL}/auth/register`, userData, testConfig);
    testUserId = response.data.data.user.id;
    testRestaurantId = response.data.data.restaurant.id;
    
    logTest('User Registration', true, {
      userId: testUserId,
      restaurantId: testRestaurantId,
      email: response.data.data.user.email
    });
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
      user: response.data.data.user.email,
      role: response.data.data.user.role,
      token: authToken.substring(0, 20) + '...'
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
    const response = await axios.get(`${BASE_URL}/auth/me`, {
      ...testConfig,
      headers: {
        ...testConfig.headers,
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    logTest('Get Profile', true, {
      user: response.data.data.email,
      role: response.data.data.role,
      restaurant: response.data.data.restaurant
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
      cuisine: response.data.data.cuisine,
      status: response.data.data.status
    });
    return true;
  } catch (error) {
    logTest('Get Restaurant Profile', false, null, error);
    return false;
  }
};

// Test create customer
const testCreateCustomer = async () => {
  try {
    const customerData = {
      name: 'Test Customer',
      email: 'customer@test.com',
      phone: '+91-9876543211',
      addresses: [
        {
          type: 'HOME',
          label: 'Home',
          street: '456 Customer St',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400002',
          country: 'India',
          isDefault: true
        }
      ]
    };
    
    const response = await axios.post(`${BASE_URL}/customers`, customerData, {
      ...testConfig,
      headers: {
        ...testConfig.headers,
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    testCustomerId = response.data.data._id;
    
    logTest('Create Customer', true, {
      customerId: testCustomerId,
      name: response.data.data.name,
      email: response.data.data.email
    });
    return true;
  } catch (error) {
    logTest('Create Customer', false, null, error);
    return false;
  }
};

// Test create category
const testCreateCategory = async () => {
  try {
    const categoryData = {
      name: 'Test Category',
      description: 'Test category for API testing',
      displayOrder: 1
    };
    
    const response = await axios.post(`${BASE_URL}/menu/categories`, categoryData, {
      ...testConfig,
      headers: {
        ...testConfig.headers,
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    testCategoryId = response.data.data._id;
    
    logTest('Create Category', true, {
      categoryId: testCategoryId,
      name: response.data.data.name,
      description: response.data.data.description
    });
    return true;
  } catch (error) {
    logTest('Create Category', false, null, error);
    return false;
  }
};

// Test create menu item
const testCreateMenuItem = async () => {
  try {
    const menuItemData = {
      name: 'Test Menu Item',
      description: 'Test menu item for API testing',
      category: testCategoryId,
      price: 299,
      originalPrice: 349,
      dietaryInfo: {
        isVeg: true,
        isSpicy: false,
        spiceLevel: 1
      },
      preparation: {
        time: 15
      },
      availability: {
        isAvailable: true,
        stockQuantity: 50
      }
    };
    
    const response = await axios.post(`${BASE_URL}/menu/items`, menuItemData, {
      ...testConfig,
      headers: {
        ...testConfig.headers,
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    testMenuItemId = response.data.data._id;
    
    logTest('Create Menu Item', true, {
      menuItemId: testMenuItemId,
      name: response.data.data.name,
      price: response.data.data.price,
      category: response.data.data.category
    });
    return true;
  } catch (error) {
    logTest('Create Menu Item', false, null, error);
    return false;
  }
};

// Test create order
const testCreateOrder = async () => {
  try {
    const orderData = {
      customerId: testCustomerId,
      items: [
        {
          menuItemId: testMenuItemId,
          quantity: 2,
          customization: {
            'Spice Level': 'Medium'
          }
        }
      ],
      deliveryAddress: {
        street: '456 Customer St',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400002'
      },
      orderType: 'delivery',
      paymentMethod: 'cash'
    };
    
    const response = await axios.post(`${BASE_URL}/orders`, orderData, {
      ...testConfig,
      headers: {
        ...testConfig.headers,
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    testOrderId = response.data.data._id;
    
    logTest('Create Order', true, {
      orderId: testOrderId,
      orderNumber: response.data.data.orderNumber,
      status: response.data.data.status,
      total: response.data.data.total
    });
    return true;
  } catch (error) {
    logTest('Create Order', false, null, error);
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
      items: response.data.data.map(item => ({
        name: item.name,
        price: item.price,
        category: item.category
      }))
    });
    return true;
  } catch (error) {
    logTest('Get Menu Items', false, null, error);
    return false;
  }
};

// Test get customers
const testGetCustomers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customers`, {
      ...testConfig,
      headers: {
        ...testConfig.headers,
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    logTest('Get Customers', true, {
      count: response.data.data.length,
      customers: response.data.data.map(customer => ({
        name: customer.name,
        email: customer.email,
        phone: customer.phone
      }))
    });
    return true;
  } catch (error) {
    logTest('Get Customers', false, null, error);
    return false;
  }
};

// Test analytics
const testAnalytics = async () => {
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
      revenue: response.data.data.revenue,
      customers: response.data.data.customers
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
  console.log('🚀 Starting MongoDB API Tests...\n');
  
  const tests = [
    { name: 'MongoDB Connection', fn: testDatabaseConnection },
    { name: 'Database Status API', fn: testDatabaseStatus },
    { name: 'API Data Test', fn: testAPIData },
    { name: 'User Registration', fn: testRegister },
    { name: 'User Login', fn: testLogin },
    { name: 'Get Profile', fn: testGetProfile },
    { name: 'Get Restaurant Profile', fn: testGetRestaurant },
    { name: 'Create Customer', fn: testCreateCustomer },
    { name: 'Create Category', fn: testCreateCategory },
    { name: 'Create Menu Item', fn: testCreateMenuItem },
    { name: 'Create Order', fn: testCreateOrder },
    { name: 'Get Orders', fn: testGetOrders },
    { name: 'Get Menu Items', fn: testGetMenuItems },
    { name: 'Get Customers', fn: testGetCustomers },
    { name: 'Get Analytics', fn: testAnalytics },
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
    console.log('\n🎉 All tests passed! All APIs are working with MongoDB data.');
  } else {
    console.log('\n⚠️ Some tests failed. Please check the API implementation.');
  }
  
  // Close database connection
  await mongoose.connection.close();
  console.log('\n🔌 Database connection closed.');
};

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  runTests,
  testDatabaseConnection,
  testLogin,
  testGetProfile
};
