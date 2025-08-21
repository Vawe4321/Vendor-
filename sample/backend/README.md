# Vendor App Backend API

A robust Node.js, Express, and MongoDB backend API for restaurant management and order processing.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Restaurant Management**: Complete restaurant profile and settings management
- **Menu Management**: Categories, menu items with customization options
- **Order Processing**: Real-time order tracking and status management
- **Customer Management**: Customer profiles and order history
- **Analytics**: Sales reports and business insights
- **Real-time Updates**: WebSocket support for live updates
- **File Upload**: Image upload with Cloudinary integration
- **Email Notifications**: Automated email notifications
- **Security**: Rate limiting, input validation, and security headers

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- Redis (optional, for caching)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sample/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/vendor_app
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   JWT_EXPIRE=30d
   
   # Email Configuration (optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # Cloudinary Configuration (optional)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env
   ```

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+91-9876543210",
  "role": "owner"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>
```

### Restaurant Endpoints

#### Get Restaurant Profile
```http
GET /profile/restaurant
Authorization: Bearer <token>
```

#### Update Restaurant Profile
```http
PUT /profile/restaurant
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Restaurant Name",
  "description": "Updated description",
  "cuisine": "Indian"
}
```

### Menu Management

#### Get Categories
```http
GET /menu/categories
Authorization: Bearer <token>
```

#### Create Category
```http
POST /menu/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Desserts",
  "description": "Sweet treats",
  "displayOrder": 4
}
```

#### Get Menu Items
```http
GET /menu/items
Authorization: Bearer <token>
```

#### Create Menu Item
```http
POST /menu/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Butter Chicken",
  "description": "Creamy and delicious",
  "category": "category_id",
  "price": 299,
  "dietaryInfo": {
    "isVeg": false,
    "isSpicy": true,
    "spiceLevel": 3
  }
}
```

### Order Management

#### Get Orders
```http
GET /orders
Authorization: Bearer <token>
```

#### Get Order by ID
```http
GET /orders/:orderId
Authorization: Bearer <token>
```

#### Update Order Status
```http
PUT /orders/:orderId/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "preparing"
}
```

### Analytics

#### Get Dashboard Analytics
```http
GET /analytics/dashboard
Authorization: Bearer <token>
```

#### Get Sales Report
```http
GET /analytics/sales?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer <token>
```

## 🔑 Test Credentials

After running the seed script, you can use these test accounts:

- **Owner**: `owner@test.com` / `password123`
- **Manager**: `manager@test.com` / `password123`
- **Staff**: `staff@test.com` / `password123`

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📊 Database Schema

### User
- Authentication details
- Role-based permissions
- Restaurant association

### Restaurant
- Basic information
- Operating hours
- Settings and preferences

### Category
- Menu categories
- Display order
- Restaurant association

### MenuItem
- Item details
- Pricing
- Dietary information
- Customization options

### Order
- Order details
- Items and quantities
- Status tracking
- Customer information

### Customer
- Customer profiles
- Addresses
- Order history

### Analytics
- Sales data
- Popular items
- Revenue tracking

## 🔧 Development

### Project Structure
```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── database/        # Database scripts
├── middleware/      # Custom middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── utils/           # Utility functions
└── server.js        # Main server file
```

### Adding New Features

1. **Create Model** (if needed)
   ```javascript
   // src/models/NewModel.js
   const mongoose = require('mongoose');
   
   const NewModelSchema = new mongoose.Schema({
     // schema definition
   });
   
   module.exports = mongoose.model('NewModel', NewModelSchema);
   ```

2. **Create Controller**
   ```javascript
   // src/controllers/newController.js
   const NewModel = require('../models/NewModel');
   
   exports.create = async (req, res) => {
     // controller logic
   };
   ```

3. **Create Routes**
   ```javascript
   // src/routes/new.js
   const express = require('express');
   const { protect, authorize } = require('../middleware/auth');
   const { create } = require('../controllers/newController');
   
   const router = express.Router();
   
   router.post('/', protect, authorize('owner', 'manager'), create);
   
   module.exports = router;
   ```

4. **Register Routes**
   ```javascript
   // src/server.js
   const newRoutes = require('./routes/new');
   app.use('/api/new', newRoutes);
   ```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vendor_app
JWT_SECRET=your_production_jwt_secret
```

### PM2 Deployment
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start src/server.js --name "vendor-app-backend"

# Monitor
pm2 monit

# Logs
pm2 logs vendor-app-backend
```

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for different roles
- **Rate Limiting**: Prevent abuse with request rate limiting
- **Input Validation**: Comprehensive input validation and sanitization
- **Security Headers**: Helmet.js for security headers
- **CORS Protection**: Configurable CORS settings
- **Password Hashing**: bcrypt for secure password storage

## 📝 Error Handling

The API uses standardized error responses:

```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/endpoint",
  "method": "POST"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Updates

### Recent Updates
- Enhanced error handling and logging
- Improved authentication middleware
- Added comprehensive test data seeding
- Updated dependencies to latest versions
- Added security improvements
- Enhanced API documentation

### Upcoming Features
- Real-time notifications
- Advanced analytics
- Payment integration
- Multi-language support
- Mobile app API endpoints
