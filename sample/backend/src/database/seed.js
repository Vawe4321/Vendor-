const mongoose = require('mongoose');
require('dotenv').config();

const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const Category = require('../models/Category');
const MenuItem = require('../models/MenuItem');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Analytics = require('../models/Analytics');

async function connect() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vendor_app';
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

async function clearDatabase() {
  try {
    console.log('🧹 Clearing existing data...');
    await Promise.all([
      Restaurant.deleteMany({}),
      User.deleteMany({}),
      Category.deleteMany({}),
      MenuItem.deleteMany({}),
      Customer.deleteMany({}),
      Order.deleteMany({}),
      Analytics.deleteMany({})
    ]);
    console.log('✅ Database cleared');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    throw error;
  }
}

async function createTestData() {
  try {
    console.log('🌱 Creating test data...');

    // Create restaurant
    const restaurant = await Restaurant.create({
      name: 'Test Restaurant',
      description: 'A test restaurant for development and testing',
      cuisine: 'Indian',
      address: {
        street: '123 Test Street',
        city: 'Test City',
        state: 'TS',
        zipCode: '12345',
        country: 'India',
        coordinates: { type: 'Point', coordinates: [77.2090, 28.6139] } // Delhi coordinates
      },
      contact: {
        phone: '+919876543210',
        email: 'test@restaurant.com',
        website: 'https://testrestaurant.com'
      },
      status: {
        isOnline: true,
        isVerified: true,
        isActive: true,
        isOpen: true
      },
      operatingHours: {
        monday: { open: '09:00', close: '22:00', isOpen: true },
        tuesday: { open: '09:00', close: '22:00', isOpen: true },
        wednesday: { open: '09:00', close: '22:00', isOpen: true },
        thursday: { open: '09:00', close: '22:00', isOpen: true },
        friday: { open: '09:00', close: '23:00', isOpen: true },
        saturday: { open: '10:00', close: '23:00', isOpen: true },
        sunday: { open: '10:00', close: '22:00', isOpen: true }
      },
      settings: {
        autoAcceptOrders: false,
        maxPreparationTime: 30,
        minOrderAmount: 100,
        deliveryRadius: 5000
      }
    });

    console.log('✅ Restaurant created:', restaurant.name);

    // Create users
    const users = await User.create([
      {
        name: 'Test Owner',
        email: 'owner@test.com',
        password: 'password123',
        phone: '+919876543210',
        role: 'owner',
        restaurant: restaurant._id,
        isEmailVerified: true,
        isActive: true
      },
      {
        name: 'Test Manager',
        email: 'manager@test.com',
        password: 'password123',
        phone: '+919876543211',
        role: 'manager',
        restaurant: restaurant._id,
        isEmailVerified: true,
        isActive: true
      },
      {
        name: 'Test Staff',
        email: 'staff@test.com',
        password: 'password123',
        phone: '+919876543212',
        role: 'staff',
        restaurant: restaurant._id,
        isEmailVerified: true,
        isActive: true
      }
    ]);

    console.log('✅ Users created:', users.length);

    // Create categories
    const categories = await Category.create([
      {
        name: 'Starters',
        description: 'Appetizers and starters',
        restaurant: restaurant._id,
        displayOrder: 1,
        isActive: true
      },
      {
        name: 'Main Course',
        description: 'Main course dishes',
        restaurant: restaurant._id,
        displayOrder: 2,
        isActive: true
      },
      {
        name: 'Breads',
        description: 'Indian breads',
        restaurant: restaurant._id,
        displayOrder: 3,
        isActive: true
      },
      {
        name: 'Desserts',
        description: 'Sweet treats',
        restaurant: restaurant._id,
        displayOrder: 4,
        isActive: true
      },
      {
        name: 'Beverages',
        description: 'Drinks and beverages',
        restaurant: restaurant._id,
        displayOrder: 5,
        isActive: true
      }
    ]);

    console.log('✅ Categories created:', categories.length);

    // Create menu items
    const menuItems = await MenuItem.create([
      {
        name: 'Butter Chicken',
        description: 'Creamy and delicious butter chicken with rich gravy',
        restaurant: restaurant._id,
        category: categories[1]._id, // Main Course
        price: 299,
        originalPrice: 349,
        images: [
          { url: 'https://example.com/butter-chicken.jpg', alt: 'Butter Chicken', isPrimary: true }
        ],
        dietaryInfo: {
          isVeg: false,
          isSpicy: true,
          spiceLevel: 3,
          allergens: ['DAIRY', 'NUTS'],
          calories: 450
        },
        preparation: {
          time: 20,
          instructions: 'Cook chicken with spices and butter sauce'
        },
        availability: {
          isAvailable: true,
          stockQuantity: 50,
          maxQuantity: 10
        },
        customization: {
          allowCustomization: true,
          options: [
            { name: 'Spice Level', type: 'radio', required: true, choices: ['Mild', 'Medium', 'Hot'] },
            { name: 'Extra Gravy', type: 'checkbox', required: false, price: 50 }
          ]
        }
      },
      {
        name: 'Paneer Tikka',
        description: 'Grilled cottage cheese with spices',
        restaurant: restaurant._id,
        category: categories[0]._id, // Starters
        price: 199,
        originalPrice: 249,
        images: [
          { url: 'https://example.com/paneer-tikka.jpg', alt: 'Paneer Tikka', isPrimary: true }
        ],
        dietaryInfo: {
          isVeg: true,
          isSpicy: true,
          spiceLevel: 2,
          allergens: ['DAIRY'],
          calories: 280
        },
        preparation: {
          time: 15,
          instructions: 'Marinate paneer and grill'
        },
        availability: {
          isAvailable: true,
          stockQuantity: 30,
          maxQuantity: 8
        }
      },
      {
        name: 'Naan',
        description: 'Soft and fluffy Indian bread',
        restaurant: restaurant._id,
        category: categories[2]._id, // Breads
        price: 49,
        originalPrice: 59,
        images: [
          { url: 'https://example.com/naan.jpg', alt: 'Naan', isPrimary: true }
        ],
        dietaryInfo: {
          isVeg: true,
          isSpicy: false,
          spiceLevel: 0,
          allergens: ['WHEAT'],
          calories: 150
        },
        preparation: {
          time: 8,
          instructions: 'Bake in tandoor'
        },
        availability: {
          isAvailable: true,
          stockQuantity: 100,
          maxQuantity: 20
        }
      }
    ]);

    console.log('✅ Menu items created:', menuItems.length);

    // Create customers
    const customers = await Customer.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+919876543200',
        addresses: [
          {
            type: 'HOME',
            label: 'Home',
            street: '456 Customer Street',
            city: 'Customer City',
            state: 'CS',
            zipCode: '54321',
            country: 'India',
            coordinates: { type: 'Point', coordinates: [77.2090, 28.6139] },
            isDefault: true
          }
        ],
        preferences: {
          dietaryRestrictions: [],
          spiceLevel: 'MEDIUM',
          favoriteItems: []
        }
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+919876543201',
        addresses: [
          {
            type: 'WORK',
            label: 'Office',
            street: '789 Business Avenue',
            city: 'Business City',
            state: 'BC',
            zipCode: '67890',
            country: 'India',
            coordinates: { type: 'Point', coordinates: [77.2090, 28.6139] },
            isDefault: true
          }
        ],
        preferences: {
          dietaryRestrictions: ['VEGETARIAN'],
          spiceLevel: 'MILD',
          favoriteItems: []
        }
      }
    ]);

    console.log('✅ Customers created:', customers.length);

    // Create sample orders
    const firstItems = [
      {
        menuItem: menuItems[0]._id,
        name: menuItems[0].name,
        price: menuItems[0].price,
        quantity: 2,
        specialInstructions: 'Spice Level: Medium',
        totalItemPrice: menuItems[0].price * 2
      },
      {
        menuItem: menuItems[2]._id,
        name: menuItems[2].name,
        price: menuItems[2].price,
        quantity: 3,
        totalItemPrice: menuItems[2].price * 3
      }
    ];
    const firstSubtotal = firstItems.reduce((sum, it) => sum + it.totalItemPrice, 0);
    const firstTax = +(firstSubtotal * 0.05).toFixed(2);
    const firstTotal = firstSubtotal + firstTax;

    const secondItems = [
      {
        menuItem: menuItems[1]._id,
        name: menuItems[1].name,
        price: menuItems[1].price,
        quantity: 1,
        totalItemPrice: menuItems[1].price
      }
    ];
    const secondSubtotal = secondItems.reduce((sum, it) => sum + it.totalItemPrice, 0);
    const secondTax = +(secondSubtotal * 0.05).toFixed(2);
    const secondTotal = secondSubtotal + secondTax;

    const orders = await Order.create([
      {
        orderNumber: 'ORD-001',
        customer: customers[0]._id,
        restaurant: restaurant._id,
        items: firstItems,
        deliveryAddress: customers[0].addresses[0],
        orderType: 'delivery',
        status: 'ACCEPTED',
        payment: {
          method: 'CASH',
          status: 'COMPLETED',
          amount: firstTotal
        },
        pricing: {
          subtotal: firstSubtotal,
          tax: firstTax,
          deliveryFee: 0,
          discount: 0,
          total: firstTotal
        },
        timing: {
          estimatedDelivery: new Date(Date.now() + 45 * 60000)
        },
        specialRequests: 'Please deliver to the main gate'
      },
      {
        orderNumber: 'ORD-002',
        customer: customers[1]._id,
        restaurant: restaurant._id,
        items: secondItems,
        deliveryAddress: customers[1].addresses[0],
        orderType: 'delivery',
        status: 'PREPARING',
        payment: {
          method: 'CASH',
          status: 'PENDING',
          amount: secondTotal
        },
        pricing: {
          subtotal: secondSubtotal,
          tax: secondTax,
          deliveryFee: 0,
          discount: 0,
          total: secondTotal
        },
        timing: {
          estimatedDelivery: new Date(Date.now() + 30 * 60000)
        }
      }
    ]);

    console.log('✅ Orders created:', orders.length);

    // Create analytics data
    const totalRevenue = orders.reduce((sum, order) => sum + (order.pricing?.total || 0), 0);
    const averageRevenue = orders.length > 0 ? +(totalRevenue / orders.length).toFixed(2) : 0;
    const completedCount = orders.filter(o => o.status === 'DELIVERED').length;
    const cancelledCount = orders.filter(o => o.status === 'CANCELLED').length;
    const byPayment = orders.reduce((acc, o) => {
      const method = o.payment?.method || 'CASH';
      const amount = o.payment?.amount || 0;
      if (!acc[method]) acc[method] = { method, amount: 0, count: 0 };
      acc[method].amount += amount;
      acc[method].count += 1;
      return acc;
    }, {});

    const analytics = await Analytics.create({
      restaurant: restaurant._id,
      date: new Date(),
      period: 'DAILY',
      orders: {
        total: orders.length,
        completed: completedCount,
        cancelled: cancelledCount,
        averageOrderValue: averageRevenue,
        peakHours: []
      },
      revenue: {
        total: +totalRevenue.toFixed(2),
        net: +totalRevenue.toFixed(2),
        average: averageRevenue,
        byPaymentMethod: Object.values(byPayment)
      },
      customers: {
        new: customers.length,
        returning: 0,
        total: customers.length,
        averageOrderFrequency: orders.length / customers.length
      },
      menuItems: {
        topSelling: [
          { item: menuItems[0]._id, name: menuItems[0].name, quantity: 2, revenue: menuItems[0].price * 2 },
          { item: menuItems[2]._id, name: menuItems[2].name, quantity: 3, revenue: menuItems[2].price * 3 },
          { item: menuItems[1]._id, name: menuItems[1].name, quantity: 1, revenue: menuItems[1].price * 1 }
        ],
        lowPerforming: []
      },
      categories: {
        performance: categories.map((c) => ({
          category: c._id,
          name: c.name,
          orders: 0,
          revenue: 0,
          averageRating: 0
        }))
      },
      delivery: {
        totalDeliveries: orders.length,
        averageDeliveryTime: 40,
        deliveryAreas: []
      },
      ratings: {
        average: 4.5,
        total: 2,
        distribution: { five: 1, four: 1, three: 0, two: 0, one: 0 }
      },
      performance: {
        preparationTime: { average: 20, min: 10, max: 30 },
        orderAcceptanceRate: 95,
        cancellationRate: 5,
        customerSatisfaction: 90
      },
      trends: {
        orderGrowth: 10,
        revenueGrowth: 12,
        customerGrowth: 8
      }
    });

    console.log('✅ Analytics data created');

    console.log('\n🎉 Test data creation completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   Restaurant: ${restaurant.name}`);
    console.log(`   Users: ${users.length} (owner, manager, staff)`);
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Menu Items: ${menuItems.length}`);
    console.log(`   Customers: ${customers.length}`);
    console.log(`   Orders: ${orders.length}`);
    console.log('\n🔑 Test Credentials:');
    console.log('   Owner: owner@test.com / password123');
    console.log('   Manager: manager@test.com / password123');
    console.log('   Staff: staff@test.com / password123');

  } catch (error) {
    console.error('❌ Error creating test data:', error);
    throw error;
  }
}

async function seed() {
  try {
    await connect();
    
    // Check if data already exists
    const existingRestaurant = await Restaurant.findOne({ name: 'Test Restaurant' });
    if (existingRestaurant) {
      console.log('⚠️ Test data already exists. Use --force to recreate.');
      process.exit(0);
    }

    await createTestData();
    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Handle command line arguments
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--force')) {
    connect().then(clearDatabase).then(createTestData).then(() => {
      console.log('\n✅ Database reseeded successfully!');
      process.exit(0);
    }).catch((error) => {
      console.error('❌ Reseeding failed:', error);
      process.exit(1);
    });
  } else {
    seed();
  }
}

module.exports = { seed, createTestData, clearDatabase };


