const axios = require('axios');

const BASE = 'http://localhost:5000';

async function main() {
  try {
    const health = await axios.get(`${BASE}/health`);
    console.log('Health:', health.data.success);

    const login = await axios.post(`${BASE}/api/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    const token = login.data.data.token;
    console.log('Login token len:', token.length);
    const auth = { headers: { Authorization: `Bearer ${token}` } };

    const me = await axios.get(`${BASE}/api/auth/me`, auth);
    console.log('Me restaurant:', me.data.data.restaurant?._id || me.data.data.restaurant);

    const categories = await axios.get(`${BASE}/api/menu/categories`, auth);
    console.log('Categories count:', categories.data.data.length);

    const menuList = await axios.get(`${BASE}/api/menu`, auth);
    console.log('Menu items count:', menuList.data.data.length);

    // Use timestamp to make email unique
    const timestamp = Date.now();
    const uniqueEmail = `api_customer_${timestamp}@example.com`;
    
    const customer = await axios.post(`${BASE}/api/customers`, {
      name: 'API Test Customer',
      email: uniqueEmail,
      phone: '+1234567890',
      addresses: [{
        type: 'HOME',
        label: 'Home',
        street: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345'
      }]
    }, auth);
    console.log('Customer created:', customer.data.data._id);

    const analytics = await axios.get(`${BASE}/api/analytics/overview?period=today`, auth);
    console.log('Analytics overview:', analytics.data.success);

    console.log('✅ All API tests passed!');
  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

main();


