const mongoose = require('mongoose');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');
const Customer = require('../models/Customer');
const Analytics = require('../models/Analytics');

const testDatabaseConnection = async () => {
  try {
    console.log('🔍 Testing MongoDB connection...');
    
    // Test basic connection
    const connectionState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    console.log(`📊 Connection state: ${states[connectionState]}`);
    
    if (connectionState !== 1) {
      throw new Error('Database not connected');
    }
    
    // Test collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Available collections:', collections.map(c => c.name));
    
    // Test data counts
    const userCount = await User.countDocuments();
    const restaurantCount = await Restaurant.countDocuments();
    const orderCount = await Order.countDocuments();
    const menuItemCount = await MenuItem.countDocuments();
    const categoryCount = await Category.countDocuments();
    const customerCount = await Customer.countDocuments();
    const analyticsCount = await Analytics.countDocuments();
    
    console.log('📈 Data counts:');
    console.log(`   Users: ${userCount}`);
    console.log(`   Restaurants: ${restaurantCount}`);
    console.log(`   Orders: ${orderCount}`);
    console.log(`   Menu Items: ${menuItemCount}`);
    console.log(`   Categories: ${categoryCount}`);
    console.log(`   Customers: ${customerCount}`);
    console.log(`   Analytics: ${analyticsCount}`);
    
    // Test sample data retrieval
    const sampleUser = await User.findOne().populate('restaurant');
    const sampleRestaurant = await Restaurant.findOne();
    const sampleOrder = await Order.findOne().populate('customer items.menuItem');
    const sampleMenuItem = await MenuItem.findOne().populate('category');
    
    console.log('✅ Database connection test completed successfully!');
    console.log('📋 Sample data available:');
    console.log(`   Sample User: ${sampleUser ? sampleUser.email : 'None'}`);
    console.log(`   Sample Restaurant: ${sampleRestaurant ? sampleRestaurant.name : 'None'}`);
    console.log(`   Sample Order: ${sampleOrder ? sampleOrder.orderNumber : 'None'}`);
    console.log(`   Sample Menu Item: ${sampleMenuItem ? sampleMenuItem.name : 'None'}`);
    
    return {
      success: true,
      connectionState: states[connectionState],
      collections: collections.map(c => c.name),
      counts: {
        users: userCount,
        restaurants: restaurantCount,
        orders: orderCount,
        menuItems: menuItemCount,
        categories: categoryCount,
        customers: customerCount,
        analytics: analyticsCount
      },
      sampleData: {
        user: sampleUser ? { id: sampleUser._id, email: sampleUser.email } : null,
        restaurant: sampleRestaurant ? { id: sampleRestaurant._id, name: sampleRestaurant.name } : null,
        order: sampleOrder ? { id: sampleOrder._id, orderNumber: sampleOrder.orderNumber } : null,
        menuItem: sampleMenuItem ? { id: sampleMenuItem._id, name: sampleMenuItem.name } : null
      }
    };
    
  } catch (error) {
    console.error('❌ Database connection test failed:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

const testAPIDataAccess = async () => {
  try {
    console.log('🔍 Testing API data access...');
    
    const results = {};
    
    // Test User/Admin data
    const users = await User.find().select('name email role').limit(3);
    results.users = users;
    
    // Test Restaurant data
    const restaurants = await Restaurant.find().select('name cuisine status').limit(3);
    results.restaurants = restaurants;
    
    // Test Menu data
    const categories = await Category.find().select('name description').limit(3);
    const menuItems = await MenuItem.find().select('name price category').populate('category', 'name').limit(3);
    results.categories = categories;
    results.menuItems = menuItems;
    
    // Test Order data
    const orders = await Order.find().select('orderNumber status total createdAt').limit(3);
    results.orders = orders;
    
    // Test Customer data
    const customers = await Customer.find().select('name email phone').limit(3);
    results.customers = customers;
    
    // Test Analytics data
    const analytics = await Analytics.find().select('type data createdAt').limit(3);
    results.analytics = analytics;
    
    console.log('✅ API data access test completed!');
    console.log('📊 Available data for APIs:');
    console.log(`   Users: ${users.length} records`);
    console.log(`   Restaurants: ${restaurants.length} records`);
    console.log(`   Categories: ${categories.length} records`);
    console.log(`   Menu Items: ${menuItems.length} records`);
    console.log(`   Orders: ${orders.length} records`);
    console.log(`   Customers: ${customers.length} records`);
    console.log(`   Analytics: ${analytics.length} records`);
    
    return {
      success: true,
      data: results
    };
    
  } catch (error) {
    console.error('❌ API data access test failed:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  testDatabaseConnection,
  testAPIDataAccess
};
