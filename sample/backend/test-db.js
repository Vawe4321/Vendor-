const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./src/models/User');
const Restaurant = require('./src/models/Restaurant');
const Category = require('./src/models/Category');
const MenuItem = require('./src/models/MenuItem');
const Customer = require('./src/models/Customer');
const Order = require('./src/models/Order');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vendor_app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    return false;
  }
};

const createSampleData = async () => {
  try {
    console.log('🧪 Creating sample data...');

    // Check if data already exists
    const existingRestaurant = await Restaurant.findOne({ name: 'Test Restaurant' });
    if (existingRestaurant) {
      console.log('✅ Sample data already exists!');
      console.log('\n📊 Existing Data Summary:');
      console.log(`- Restaurant: ${existingRestaurant.name} (ID: ${existingRestaurant._id})`);
      
      const existingUser = await User.findOne({ email: 'test@example.com' });
      const existingCategory = await Category.findOne({ name: 'Main Course' });
      const existingMenuItem = await MenuItem.findOne({ name: 'Butter Chicken' });
      const existingCustomer = await Customer.findOne({ email: 'customer@example.com' });
      const existingOrder = await Order.findOne({ orderNumber: { $regex: /^ORD/ } });
      
      if (existingUser) console.log(`- User: ${existingUser.name} (ID: ${existingUser._id})`);
      if (existingCategory) console.log(`- Category: ${existingCategory.name} (ID: ${existingCategory._id})`);
      if (existingMenuItem) console.log(`- Menu Item: ${existingMenuItem.name} (ID: ${existingMenuItem._id})`);
      if (existingCustomer) console.log(`- Customer: ${existingCustomer.name} (ID: ${existingCustomer._id})`);
      if (existingOrder) console.log(`- Order: ${existingOrder.orderNumber} (ID: ${existingOrder._id})`);
      
      return {
        restaurant: existingRestaurant._id,
        user: existingUser?._id,
        category: existingCategory?._id,
        menuItem: existingMenuItem?._id,
        customer: existingCustomer?._id,
        order: existingOrder?._id
      };
    }

    // Create a sample restaurant
    const restaurant = await Restaurant.create({
      name: 'Test Restaurant',
      description: 'A test restaurant for API testing',
      cuisine: 'Indian',
      address: {
        street: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'India',
        coordinates: {
          type: 'Point',
          coordinates: [0, 0]
        }
      },
      contact: {
        phone: '+1234567890',
        email: 'test@restaurant.com'
      },
      status: {
        isOnline: true,
        isVerified: true,
        isActive: true
      }
    });

    console.log('✅ Restaurant created:', restaurant.name);

    // Create a sample user
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      phone: '+1234567890',
      role: 'owner',
      restaurant: restaurant._id,
      isEmailVerified: true
    });

    console.log('✅ User created:', user.name);

    // Create a sample category
    const category = await Category.create({
      name: 'Main Course',
      description: 'Main course items',
      restaurant: restaurant._id,
      displayOrder: 1
    });

    console.log('✅ Category created:', category.name);

    // Create a sample menu item
    const menuItem = await MenuItem.create({
      name: 'Butter Chicken',
      description: 'Creamy and delicious butter chicken',
      restaurant: restaurant._id,
      category: category._id,
      price: 15.99,
      originalPrice: 18.99,
      images: [{
        url: 'https://example.com/butter-chicken.jpg',
        alt: 'Butter Chicken',
        isPrimary: true
      }],
      dietaryInfo: {
        isVeg: false,
        isSpicy: true,
        spiceLevel: 3
      },
      preparation: {
        time: 20,
        instructions: 'Cook chicken with spices'
      },
      availability: {
        isAvailable: true,
        stockQuantity: 50
      }
    });

    console.log('✅ Menu item created:', menuItem.name);

    // Create a sample customer
    const customer = await Customer.create({
      name: 'Test Customer',
      email: 'customer@example.com',
      phone: '+1234567891',
      addresses: [{
        type: 'HOME',
        label: 'Home',
        street: '456 Customer St',
        city: 'Customer City',
        state: 'Customer State',
        zipCode: '54321',
        country: 'India',
        coordinates: {
          type: 'Point',
          coordinates: [0, 0]
        },
        isDefault: true
      }]
    });

    console.log('✅ Customer created:', customer.name);

    // Create a sample order
    const order = await Order.create({
      orderNumber: 'ORD' + Date.now(),
      restaurant: restaurant._id,
      customer: customer._id,
      items: [{
        menuItem: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: 2,
        specialInstructions: 'Extra spicy'
      }],
      orderType: 'delivery',
      paymentMethod: 'CASH',
      deliveryAddress: {
        street: '456 Customer St',
        city: 'Customer City',
        state: 'Customer State',
        zipCode: '54321'
      },
      specialRequests: 'Please deliver quickly',
      status: 'PENDING',
      totalAmount: menuItem.price * 2,
      netAmount: menuItem.price * 2
    });

    console.log('✅ Order created:', order.orderNumber);

    console.log('\n🎉 Sample data created successfully!');
    console.log('\n📊 Sample Data Summary:');
    console.log(`- Restaurant: ${restaurant.name} (ID: ${restaurant._id})`);
    console.log(`- User: ${user.name} (ID: ${user._id})`);
    console.log(`- Category: ${category.name} (ID: ${category._id})`);
    console.log(`- Menu Item: ${menuItem.name} (ID: ${menuItem._id})`);
    console.log(`- Customer: ${customer.name} (ID: ${customer._id})`);
    console.log(`- Order: ${order.orderNumber} (ID: ${order._id})`);

    return {
      restaurant: restaurant._id,
      user: user._id,
      category: category._id,
      menuItem: menuItem._id,
      customer: customer._id,
      order: order._id
    };

  } catch (error) {
    console.error('❌ Error creating sample data:', error);
    throw error;
  }
};

const testDatabase = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.log('❌ Cannot proceed without database connection');
    process.exit(1);
  }

  try {
    await createSampleData();
    console.log('\n✅ Database test completed successfully!');
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the test if this file is executed directly
if (require.main === module) {
  testDatabase();
}

module.exports = { connectDB, createSampleData };
