# MongoDB Integration Guide

Complete guide on how all APIs are connected to MongoDB and working with real database data.

## 🗄️ Database Connection

### Connection Setup
The application connects to MongoDB using Mongoose ODM in `src/config/database.js`:

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vendor_app';
    
    const conn = await mongoose.connect(mongoURI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0,
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
```

### Database Collections
The application uses the following MongoDB collections:

1. **users** - User accounts and authentication
2. **restaurants** - Restaurant profiles and settings
3. **orders** - Order management and tracking
4. **menuitems** - Menu items and products
5. **categories** - Menu categories
6. **customers** - Customer profiles and data
7. **analytics** - Analytics and reporting data

## 🔗 API-MongoDB Integration

### 1. Authentication APIs (`/api/auth`)

**Models Used:**
- `User.js` - User accounts
- `Restaurant.js` - Restaurant data

**Key Operations:**
```javascript
// User registration
const user = await User.create({
  name, email, password, phone, role, restaurant: restaurant._id
});

// User login
const user = await User.findOne({ email }).select('+password');
const isMatch = await user.matchPassword(password);

// Get profile
const user = await User.findById(req.user.id).populate('restaurant');
```

**MongoDB Data Flow:**
- Registration creates both User and Restaurant documents
- Login validates against User collection
- Profile retrieval joins User and Restaurant data

### 2. Orders APIs (`/api/orders`)

**Models Used:**
- `Order.js` - Order management
- `Customer.js` - Customer data
- `MenuItem.js` - Menu items
- `Restaurant.js` - Restaurant data

**Key Operations:**
```javascript
// Get orders with populated data
const orders = await Order.find({ restaurant: req.user.restaurant })
  .populate('customer', 'name phone email')
  .populate('items.menuItem', 'name price images')
  .sort(sort)
  .limit(limit * 1)
  .skip((page - 1) * limit);

// Create order
const order = await Order.create({
  customer: customerId,
  restaurant: req.user.restaurant,
  items: orderItems,
  total: calculatedTotal,
  status: 'PENDING'
});
```

**MongoDB Data Flow:**
- Orders reference customers, menu items, and restaurants
- Population retrieves related data from multiple collections
- Status updates modify the order document in real-time

### 3. Menu Management APIs (`/api/menu`)

**Models Used:**
- `MenuItem.js` - Menu items
- `Category.js` - Categories
- `Restaurant.js` - Restaurant data

**Key Operations:**
```javascript
// Get menu items with filters
const menuItems = await MenuItem.find(query)
  .populate('category', 'name')
  .sort(sort)
  .limit(limit * 1)
  .skip((page - 1) * limit);

// Create menu item
const menuItem = await MenuItem.create({
  name, description, category, price,
  dietaryInfo, preparation, availability,
  restaurant: req.user.restaurant
});
```

**MongoDB Data Flow:**
- Menu items are scoped to specific restaurants
- Categories are shared across restaurants
- File uploads store image URLs in the database

### 4. Analytics APIs (`/api/analytics`)

**Models Used:**
- `Analytics.js` - Analytics data
- `Order.js` - Order statistics
- `Customer.js` - Customer analytics
- `MenuItem.js` - Menu performance

**Key Operations:**
```javascript
// Dashboard analytics
const orders = await Order.aggregate([
  { $match: { restaurant: mongoose.Types.ObjectId(req.user.restaurant) } },
  { $group: { _id: null, total: { $sum: '$total' }, count: { $sum: 1 } } }
]);

// Revenue analytics
const revenue = await Order.aggregate([
  { $match: { 
    restaurant: mongoose.Types.ObjectId(req.user.restaurant),
    createdAt: { $gte: startDate, $lte: endDate }
  }},
  { $group: { 
    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
    revenue: { $sum: '$total' },
    orders: { $sum: 1 }
  }}
]);
```

**MongoDB Data Flow:**
- Uses MongoDB aggregation pipeline for complex queries
- Real-time calculations from order data
- Historical data analysis with date ranges

### 5. Customer Management APIs (`/api/customers`)

**Models Used:**
- `Customer.js` - Customer profiles
- `Order.js` - Order history
- `Restaurant.js` - Restaurant data

**Key Operations:**
```javascript
// Get customers with search
const customers = await Customer.find(query)
  .sort(sort)
  .limit(limit * 1)
  .skip((page - 1) * limit);

// Get customer orders
const orders = await Order.find({ 
  customer: customerId,
  restaurant: req.user.restaurant 
}).populate('items.menuItem');
```

**MongoDB Data Flow:**
- Customers are linked to restaurants
- Order history is retrieved through customer ID
- Preferences and addresses stored as embedded documents

### 6. Profile Management APIs (`/api/profile`)

**Models Used:**
- `Restaurant.js` - Restaurant profiles
- `User.js` - User data

**Key Operations:**
```javascript
// Get restaurant profile
const restaurant = await Restaurant.findById(req.user.restaurant);

// Update restaurant settings
const restaurant = await Restaurant.findByIdAndUpdate(
  req.user.restaurant,
  updateData,
  { new: true, runValidators: true }
);
```

**MongoDB Data Flow:**
- Restaurant data is updated in real-time
- Settings and configurations stored as embedded objects
- Image uploads update restaurant document

## 📊 Data Relationships

### One-to-Many Relationships
```
Restaurant → Users (Owner, Manager, Staff)
Restaurant → Orders
Restaurant → Menu Items
Restaurant → Customers
Category → Menu Items
Customer → Orders
```

### Embedded Documents
```javascript
// Restaurant settings
restaurant: {
  name: "Restaurant Name",
  settings: {
    autoAcceptOrders: true,
    deliveryRadius: 5,
    operatingHours: { ... }
  }
}

// Customer addresses
customer: {
  name: "Customer Name",
  addresses: [
    { type: "HOME", street: "...", city: "..." }
  ]
}

// Order items
order: {
  items: [
    { menuItem: ObjectId, quantity: 2, customization: {...} }
  ]
}
```

## 🔍 Database Testing

### Test Database Connection
```bash
# Test basic connection
npm run test:mongodb

# Test specific endpoints
curl http://localhost:5000/api/db-status
curl http://localhost:5000/api/test-data
```

### Database Status Endpoint
```javascript
GET /api/db-status
Response: {
  "success": true,
  "connectionState": "connected",
  "collections": ["users", "restaurants", "orders", ...],
  "counts": {
    "users": 5,
    "restaurants": 2,
    "orders": 25,
    ...
  }
}
```

### API Data Test Endpoint
```javascript
GET /api/test-data
Response: {
  "success": true,
  "data": {
    "users": [...],
    "restaurants": [...],
    "categories": [...],
    "menuItems": [...],
    "orders": [...],
    "customers": [...]
  }
}
```

## 🚀 Performance Optimization

### Indexing
```javascript
// User model indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ restaurant: 1 });

// Order model indexes
orderSchema.index({ restaurant: 1, createdAt: -1 });
orderSchema.index({ customer: 1 });
orderSchema.index({ status: 1 });

// Menu item indexes
menuItemSchema.index({ restaurant: 1, category: 1 });
menuItemSchema.index({ name: 'text', description: 'text' });
```

### Population Optimization
```javascript
// Selective population
.populate('customer', 'name phone email')
.populate('items.menuItem', 'name price images')

// Nested population
.populate({
  path: 'items.menuItem',
  select: 'name price category',
  populate: { path: 'category', select: 'name' }
})
```

### Aggregation Pipeline
```javascript
// Efficient analytics queries
const analytics = await Order.aggregate([
  { $match: { restaurant: restaurantId } },
  { $group: { 
    _id: '$status', 
    count: { $sum: 1 },
    revenue: { $sum: '$total' }
  }}
]);
```

## 🔧 Environment Configuration

### MongoDB Connection String
```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/vendor_app

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vendor_app

# With authentication
MONGODB_URI=mongodb://username:password@localhost:27017/vendor_app?authSource=admin
```

### Connection Options
```javascript
const options = {
  maxPoolSize: 10,           // Connection pool size
  serverSelectionTimeoutMS: 5000,  // Server selection timeout
  socketTimeoutMS: 45000,    // Socket timeout
  bufferMaxEntries: 0,       // Disable mongoose buffering
  bufferCommands: false      // Disable mongoose buffering
};
```

## 📈 Monitoring and Logging

### Database Monitoring
```javascript
// Connection events
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});
```

### Query Logging (Development)
```javascript
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}
```

## 🛠️ Troubleshooting

### Common Issues

1. **Connection Timeout**
   ```bash
   # Check MongoDB service
   sudo systemctl status mongod
   
   # Check connection string
   echo $MONGODB_URI
   ```

2. **Authentication Errors**
   ```bash
   # Test connection manually
   mongosh "mongodb://localhost:27017/vendor_app"
   ```

3. **Data Not Loading**
   ```bash
   # Check if data exists
   npm run seed
   
   # Test database status
   curl http://localhost:5000/api/db-status
   ```

### Debug Commands
```bash
# Test database connection
npm run test:mongodb

# Check API endpoints
npm run test:api

# View database collections
mongosh vendor_app --eval "db.getCollectionNames()"

# Check document counts
mongosh vendor_app --eval "db.users.countDocuments()"
```

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [API Documentation](API_DOCUMENTATION.md)
- [Quick Start Guide](QUICK_START.md)

---

**All APIs are now fully connected to MongoDB and working with real database data! 🎉**
