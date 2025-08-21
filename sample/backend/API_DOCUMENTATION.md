# Vendor App Backend API Documentation

Complete API documentation for the Vendor App backend with Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Authentication](#authentication)
- [Orders](#orders)
- [Menu Management](#menu-management)
- [Analytics](#analytics)
- [Profile Management](#profile-management)
- [Feedback](#feedback)
- [Customers](#customers)
- [Notifications](#notifications)
- [Error Handling](#error-handling)
- [Response Format](#response-format)

## 🔐 Authentication

### Base URL
```
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
PUT /api/auth/updatedetails
PUT /api/auth/updatepassword
POST /api/auth/forgotpassword
PUT /api/auth/resetpassword/:resettoken
GET /api/auth/verify-email/:token
POST /api/auth/logout
POST /api/auth/refresh-token
```

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "phone": "+91-9876543210",
  "role": "owner",
  "restaurantName": "My Restaurant",
  "cuisine": "Indian",
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001",
    "country": "India"
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Get Profile
```http
GET /api/auth/me
Authorization: Bearer <token>
```

## 📦 Orders

### Base URL
```
GET /api/orders
GET /api/orders/stats
GET /api/orders/analytics
GET /api/orders/history
GET /api/orders/export
GET /api/orders/:id
POST /api/orders
PUT /api/orders/:id/status
PUT /api/orders/:id/notes
PUT /api/orders/:id/accept
PUT /api/orders/:id/reject
PUT /api/orders/:id/start-preparing
PUT /api/orders/:id/mark-ready
PUT /api/orders/:id/out-for-delivery
PUT /api/orders/:id/mark-delivered
PUT /api/orders/:id/cancel
PUT /api/orders/:id/assign-delivery
```

### Get Orders
```http
GET /api/orders?status=pending&page=1&limit=10
Authorization: Bearer <token>
```

### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "customerId": "customer_id",
  "items": [
    {
      "menuItemId": "menu_item_id",
      "quantity": 2,
      "customization": {
        "Spice Level": "Medium"
      }
    }
  ],
  "deliveryAddress": {
    "street": "123 Customer St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  },
  "orderType": "delivery",
  "paymentMethod": "cash"
}
```

### Update Order Status
```http
PUT /api/orders/:orderId/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "preparing",
  "notes": "Started preparing the order"
}
```

## 🍽️ Menu Management

### Base URL
```
GET /api/menu/items
GET /api/menu/items/popular
GET /api/menu/items/recommended
GET /api/menu/items/search
GET /api/menu/items/:id
GET /api/menu/analytics
GET /api/menu/export
POST /api/menu/items
PUT /api/menu/items/:id
DELETE /api/menu/items/:id
PUT /api/menu/items/:id/availability
PUT /api/menu/items/:id/popular
PUT /api/menu/items/bulk-update
POST /api/menu/items/import
GET /api/menu/categories
POST /api/menu/categories
PUT /api/menu/categories/:id
DELETE /api/menu/categories/:id
PUT /api/menu/categories/reorder
```

### Get Menu Items
```http
GET /api/menu/items?category=category_id&isVeg=true&minPrice=100&maxPrice=500
Authorization: Bearer <token>
```

### Create Menu Item
```http
POST /api/menu/items
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "Butter Chicken",
  "description": "Creamy and delicious butter chicken",
  "category": "category_id",
  "price": 299,
  "originalPrice": 349,
  "dietaryInfo": {
    "isVeg": false,
    "isSpicy": true,
    "spiceLevel": 3
  },
  "preparation": {
    "time": 20
  },
  "availability": {
    "isAvailable": true,
    "stockQuantity": 50
  },
  "images": [file1, file2]
}
```

### Create Category
```http
POST /api/menu/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Main Course",
  "description": "Main course dishes",
  "displayOrder": 2
}
```

## 📊 Analytics

### Base URL
```
GET /api/analytics/dashboard
GET /api/analytics/revenue
GET /api/analytics/orders
GET /api/analytics/top-items
GET /api/analytics/customers
GET /api/analytics/hourly
GET /api/analytics/performance
GET /api/analytics/sales-report
GET /api/analytics/inventory
GET /api/analytics/delivery
GET /api/analytics/customer-insights
GET /api/analytics/trends
GET /api/analytics/export
```

### Get Dashboard Analytics
```http
GET /api/analytics/dashboard
Authorization: Bearer <token>
```

### Get Revenue Analytics
```http
GET /api/analytics/revenue?startDate=2024-01-01&endDate=2024-01-31&period=daily
Authorization: Bearer <token>
```

### Get Sales Report
```http
GET /api/analytics/sales-report?startDate=2024-01-01&endDate=2024-01-31&type=sales&format=csv
Authorization: Bearer <token>
```

## 👤 Profile Management

### Base URL
```
GET /api/profile/restaurant
PUT /api/profile/restaurant
PUT /api/profile/restaurant/online-status
POST /api/profile/restaurant/image
GET /api/profile/restaurant/images
DELETE /api/profile/restaurant/images/:imageId
PUT /api/profile/restaurant/contact
PUT /api/profile/restaurant/address
PUT /api/profile/restaurant/hours
PUT /api/profile/restaurant/settings
PUT /api/profile/restaurant/delivery-settings
PUT /api/profile/restaurant/payment-settings
GET /api/profile/restaurant/stats
GET /api/profile/restaurant/analytics
```

### Get Restaurant Profile
```http
GET /api/profile/restaurant
Authorization: Bearer <token>
```

### Update Restaurant Profile
```http
PUT /api/profile/restaurant
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Restaurant Name",
  "description": "Updated description",
  "cuisine": "Indian",
  "tags": ["spicy", "traditional"]
}
```

### Update Operating Hours
```http
PUT /api/profile/restaurant/hours
Authorization: Bearer <token>
Content-Type: application/json

{
  "monday": {
    "open": "09:00",
    "close": "22:00",
    "isOpen": true
  },
  "tuesday": {
    "open": "09:00",
    "close": "22:00",
    "isOpen": true
  }
}
```

## 💬 Feedback

### Base URL
```
GET /api/feedback/reviews
GET /api/feedback/reviews/:id
POST /api/feedback/reviews/:id/reply
PUT /api/feedback/reviews/:id/status
PUT /api/feedback/reviews/:id/helpful
POST /api/feedback/reviews/:id/report
GET /api/feedback/complaints
GET /api/feedback/complaints/:id
POST /api/feedback/complaints/:id/reply
PUT /api/feedback/complaints/:id/status
GET /api/feedback/customer/:customerId
GET /api/feedback/analytics
GET /api/feedback/stats
GET /api/feedback/export
GET /api/feedback/settings
PUT /api/feedback/settings
```

### Get Reviews
```http
GET /api/feedback/reviews?type=reviews&status=pending&rating=4&page=1&limit=10
Authorization: Bearer <token>
```

### Reply to Review
```http
POST /api/feedback/reviews/:reviewId/reply
Authorization: Bearer <token>
Content-Type: application/json

{
  "reply": "Thank you for your feedback. We appreciate your business!"
}
```

## 👥 Customers

### Base URL
```
GET /api/customers
GET /api/customers/search
GET /api/customers/stats
GET /api/customers/segments
GET /api/customers/insights
GET /api/customers/export
POST /api/customers
GET /api/customers/:id
PUT /api/customers/:id
DELETE /api/customers/:id
GET /api/customers/:id/orders
GET /api/customers/:id/analytics
GET /api/customers/:id/preferences
PUT /api/customers/:id/preferences
GET /api/customers/:id/addresses
POST /api/customers/:id/addresses
PUT /api/customers/:id/addresses/:addressId
DELETE /api/customers/:id/addresses/:addressId
GET /api/customers/:id/loyalty
PUT /api/customers/:id/loyalty
GET /api/customers/:id/notes
POST /api/customers/:id/notes
PUT /api/customers/:id/notes/:noteId
DELETE /api/customers/:id/notes/:noteId
```

### Get Customers
```http
GET /api/customers?search=john&status=active&loyaltyTier=gold&page=1&limit=10
Authorization: Bearer <token>
```

### Create Customer
```http
POST /api/customers
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "addresses": [
    {
      "type": "HOME",
      "label": "Home",
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400001",
      "country": "India",
      "isDefault": true
    }
  ]
}
```

### Update Customer Preferences
```http
PUT /api/customers/:customerId/preferences
Authorization: Bearer <token>
Content-Type: application/json

{
  "dietaryRestrictions": ["vegetarian"],
  "spiceLevel": "medium",
  "favoriteItems": ["menu_item_id_1", "menu_item_id_2"],
  "communicationPreferences": {
    "email": true,
    "sms": false,
    "push": true
  }
}
```

## 🔔 Notifications

### Base URL
```
GET /api/notifications
GET /api/notifications/stats
GET /api/notifications/history
GET /api/notifications/:id
PUT /api/notifications/:id/read
PUT /api/notifications/read-all
DELETE /api/notifications/:id
DELETE /api/notifications
PUT /api/notifications/fcm-token
GET /api/notifications/settings
PUT /api/notifications/settings
POST /api/notifications/send
POST /api/notifications/test
GET /api/notifications/templates
POST /api/notifications/templates
PUT /api/notifications/templates/:id
DELETE /api/notifications/templates/:id
```

### Get Notifications
```http
GET /api/notifications?type=order_update&read=false&page=1&limit=10
Authorization: Bearer <token>
```

### Update FCM Token
```http
PUT /api/notifications/fcm-token
Authorization: Bearer <token>
Content-Type: application/json

{
  "fcmToken": "fcm_token_here",
  "deviceType": "android"
}
```

### Send Notification
```http
POST /api/notifications/send
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Order Update",
  "message": "Your order is ready for pickup",
  "type": "order_update",
  "recipients": ["customer_id_1", "customer_id_2"],
  "data": {
    "orderId": "order_id",
    "status": "ready"
  }
}
```

## ❌ Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/endpoint",
  "method": "POST",
  "details": [
    {
      "field": "email",
      "message": "Please provide a valid email",
      "value": "invalid-email"
    }
  ]
}
```

### Common Error Codes
- `400` - Bad Request (Validation errors)
- `401` - Unauthorized (Authentication required)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found (Resource not found)
- `409` - Conflict (Duplicate resource)
- `422` - Unprocessable Entity (Business logic errors)
- `429` - Too Many Requests (Rate limit exceeded)
- `500` - Internal Server Error

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### Pagination
When endpoints return paginated results:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🔧 Query Parameters

### Common Query Parameters
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sortBy` - Sort field
- `sortOrder` - Sort direction (asc/desc)
- `search` - Search term
- `startDate` - Start date (ISO 8601)
- `endDate` - End date (ISO 8601)

### Date Format
All dates should be in ISO 8601 format: `YYYY-MM-DDTHH:mm:ss.sssZ`

### Authentication
Most endpoints require authentication via Bearer token:
```http
Authorization: Bearer <your_jwt_token>
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start the server:**
   ```bash
   npm run dev
   ```

4. **Test the API:**
   ```bash
   npm run test:api
   ```

## 📚 Additional Resources

- [Quick Start Guide](QUICK_START.md)
- [Database Schema](README.md#database-schema)
- [Security Features](README.md#security-features)
- [Deployment Guide](README.md#deployment)

---

**Happy Coding! 🎉**
