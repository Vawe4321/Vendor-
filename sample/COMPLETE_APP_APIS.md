# 🚀 Grooso Vendor App - Complete API Documentation

## Overview
- **Base URL**: `https://api.grooso.com/v1`
- **Authentication**: Bearer Token (JWT)
- **Content-Type**: `application/json`
- **API Version**: v1.0.0

---

## Authentication APIs

### Login
```typescript
POST /auth/login
{
  "email": "restaurant@grooso.com",
  "password": "password123"
}
```

### Register
```typescript
POST /auth/register
{
  "name": "Restaurant Owner",
  "email": "owner@restaurant.com",
  "password": "password123",
  "restaurantName": "New Restaurant",
  "phone": "+1234567890",
  "address": "123 Main St, City, State"
}
```

### Logout
```typescript
POST /auth/logout
Authorization: Bearer {token}
```

### Refresh Token
```typescript
POST /auth/refresh
Authorization: Bearer {token}
```

### Forgot Password
```typescript
POST /auth/forgot-password
{
  "email": "restaurant@grooso.com"
}
```

### Reset Password
```typescript
POST /auth/reset-password
{
  "token": "reset_token_here",
  "newPassword": "new_secure_password"
}
```

---

## Orders Management APIs

### Get All Orders
```typescript
GET /orders?status=NEW&page=1&limit=20
```

### Get Orders by Status
```typescript
GET /orders/status/NEW?page=1&limit=20
GET /orders/status/PREPARING?page=1&limit=20
GET /orders/status/READY?page=1&limit=20
GET /orders/status/OUT_FOR_DELIVERY?page=1&limit=20
GET /orders/status/DELIVERED?page=1&limit=20
```

### Get Single Order
```typescript
GET /orders/{orderId}
```

### Update Order Status
```typescript
PUT /orders/{orderId}/status
{
  "orderId": "order_123",
  "status": "PREPARING",
  "estimatedTime": "25 minutes"
}
```

### Accept Order
```typescript
POST /orders/{orderId}/accept
{
  "estimatedTime": "25 minutes"
}
```

### Reject Order
```typescript
POST /orders/{orderId}/reject
{
  "reason": "Item out of stock"
}
```

### Assign Driver
```typescript
POST /orders/{orderId}/assign-driver
{
  "driverId": "driver_123"
}
```

### Get Order Statistics
```typescript
GET /orders/stats?startDate=2025-01-01&endDate=2025-01-31
```

### Search Orders
```typescript
GET /orders/search?query=john&page=1&limit=20
```

### Bulk Update Order Status
```typescript
PUT /orders/bulk-update-status
{
  "orderIds": ["order_1", "order_2", "order_3"],
  "status": "PREPARING"
}
```

### Get Order History
```typescript
GET /orders/history?page=1&limit=20&startDate=2025-01-01&endDate=2025-01-31
```

### Get Urgent Orders
```typescript
GET /orders/urgent
```

---

## Inventory Management APIs

### Get All Inventory
```typescript
GET /inventory
```

### Get Menu Categories
```typescript
GET /inventory/categories
```

### Get Items by Category
```typescript
GET /inventory/categories/{categoryId}/items
```

### Get All Menu Items
```typescript
GET /inventory/items?page=1&limit=20&category=biryani&inStock=true
```

### Create Menu Item
```typescript
POST /inventory/items
{
  "name": "Chicken Biryani",
  "description": "Aromatic rice with tender chicken",
  "price": 299,
  "category": "Biryani",
  "isVeg": false,
  "isInStock": true,
  "preparationTime": 25
}
```

### Update Menu Item
```typescript
PUT /inventory/items/{itemId}
{
  "name": "Updated Dish Name",
  "price": 349
}
```

### Delete Menu Item
```typescript
DELETE /inventory/items/{itemId}
```

### Update Stock Status
```typescript
PUT /inventory/items/{itemId}/stock
{
  "itemId": "item_123",
  "isInStock": false
}
```

### Bulk Update Stock
```typescript
PUT /inventory/items/bulk-stock-update
{
  "updates": [
    {
      "itemId": "item_001",
      "isInStock": false
    },
    {
      "itemId": "item_002",
      "isInStock": true
    }
  ]
}
```

### Upload Item Image
```typescript
POST /inventory/items/{itemId}/image
Content-Type: multipart/form-data
```

### Get Popular Items
```typescript
GET /inventory/items/popular?limit=10
```

### Get Out of Stock Items
```typescript
GET /inventory/items/out-of-stock?page=1&limit=20
```

### Search Menu Items
```typescript
GET /inventory/items/search?query=biryani&page=1&limit=20
```

### Get Inventory Statistics
```typescript
GET /inventory/stats
```

### Import Menu Items
```typescript
POST /inventory/items/import
{
  "items": [
    {
      "name": "Imported Dish 1",
      "description": "Description",
      "price": 199,
      "category": "Main Course",
      "isVeg": true,
      "isInStock": true,
      "preparationTime": 20
    }
  ]
}
```

### Export Menu Items
```typescript
GET /inventory/items/export?format=csv
```

---

## Analytics & Reports APIs

### Get Dashboard Analytics
```typescript
GET /analytics/dashboard?startDate=2025-01-01&endDate=2025-01-31
```

### Get Revenue Analytics
```typescript
GET /analytics/revenue?period=monthly&startDate=2025-01-01&endDate=2025-01-31
```

### Get Order Analytics
```typescript
GET /analytics/orders?startDate=2025-01-01&endDate=2025-01-31
```

### Get Customer Analytics
```typescript
GET /analytics/customers?startDate=2025-01-01&endDate=2025-01-31
```

### Get Menu Performance Analytics
```typescript
GET /analytics/menu?startDate=2025-01-01&endDate=2025-01-31
```

### Get Delivery Analytics
```typescript
GET /analytics/delivery?startDate=2025-01-01&endDate=2025-01-31
```

### Get Real-time Analytics
```typescript
GET /analytics/realtime
```

### Get Comparison Analytics
```typescript
GET /analytics/comparison
{
  "currentStartDate": "2025-01-01",
  "currentEndDate": "2025-01-31",
  "previousStartDate": "2024-12-01",
  "previousEndDate": "2024-12-31"
}
```

### Get Sales Report
```typescript
GET /analytics/sales-report?startDate=2025-01-01&endDate=2025-01-31&format=pdf
```

### Get Performance Metrics
```typescript
GET /analytics/performance?startDate=2025-01-01&endDate=2025-01-31
```

### Get Insights and Recommendations
```typescript
GET /analytics/insights
```

### Export Analytics Data
```typescript
GET /analytics/export?type=revenue&startDate=2025-01-01&endDate=2025-01-31&format=csv
```

---

## Feedback & Reviews APIs

### Get All Feedback
```typescript
GET /feedback?startDate=2025-01-01&endDate=2025-01-31&type=all
```

### Get Reviews
```typescript
GET /feedback/reviews?rating=4&page=1&limit=20
```

### Get Single Review
```typescript
GET /feedback/reviews/{reviewId}
```

### Reply to Review
```typescript
POST /feedback/reviews/{reviewId}/reply
{
  "reviewId": "review_123",
  "reply": "Thank you for your feedback!"
}
```

### Get Complaints
```typescript
GET /feedback/complaints?status=OPEN&priority=HIGH&page=1&limit=20
```

### Get Single Complaint
```typescript
GET /feedback/complaints/{complaintId}
```

### Update Complaint Status
```typescript
PUT /feedback/complaints/{complaintId}/status
{
  "complaintId": "complaint_123",
  "status": "RESOLVED",
  "resolution": "Issue resolved"
}
```

### Get Dish Ratings
```typescript
GET /feedback/dish-ratings?category=biryani&minRating=4
```

### Get Single Dish Rating
```typescript
GET /feedback/dish-ratings/{dishId}
```

### Get Feedback Statistics
```typescript
GET /feedback/stats?startDate=2025-01-01&endDate=2025-01-31
```

### Search Reviews
```typescript
GET /feedback/reviews/search?query=great&page=1&limit=20
```

### Search Complaints
```typescript
GET /feedback/complaints/search?query=late&page=1&limit=20
```

### Get Reviews by Rating
```typescript
GET /feedback/reviews/rating/4?page=1&limit=20
```

### Get Complaints by Status
```typescript
GET /feedback/complaints/status/OPEN?page=1&limit=20
```

### Get Complaints by Priority
```typescript
GET /feedback/complaints/priority/HIGH?page=1&limit=20
```

### Get Urgent Complaints
```typescript
GET /feedback/complaints/urgent
```

### Get Unread Reviews
```typescript
GET /feedback/reviews/unread?page=1&limit=20
```

### Mark Review as Read
```typescript
PUT /feedback/reviews/{reviewId}/read
```

### Mark Complaint as Read
```typescript
PUT /feedback/complaints/{complaintId}/read
```

### Get Feedback Trends
```typescript
GET /feedback/trends?startDate=2025-01-01&endDate=2025-01-31&period=daily
```

### Export Feedback Data
```typescript
GET /feedback/export?type=reviews&startDate=2025-01-01&endDate=2025-01-31&format=csv
```

### Get Customer Feedback History
```typescript
GET /feedback/customer/{customerId}
```

### Get Order Feedback
```typescript
GET /feedback/order/{orderId}
```

---

## Profile & Settings APIs

### Get Restaurant Profile
```typescript
GET /profile
```

### Update Restaurant Profile
```typescript
PUT /profile
{
  "name": "Updated Restaurant Name",
  "description": "Updated description",
  "phone": "+1234567890"
}
```

### Update Online Status
```typescript
PUT /profile/status
{
  "isOnline": true
}
```

### Get Notification Settings
```typescript
GET /profile/notifications
```

### Update Notification Settings
```typescript
PUT /profile/notifications
{
  "newOrders": true,
  "orderUpdates": true,
  "customerReviews": false
}
```

### Upload Restaurant Logo
```typescript
POST /profile/logo
Content-Type: multipart/form-data
```

### Upload Restaurant Banner
```typescript
POST /profile/banner
Content-Type: multipart/form-data
```

### Get Business Hours
```typescript
GET /profile/business-hours
```

### Update Business Hours
```typescript
PUT /profile/business-hours
{
  "hours": {
    "monday": {
      "open": "10:00",
      "close": "22:00",
      "isOpen": true
    }
  }
}
```

### Get Delivery Settings
```typescript
GET /profile/delivery-settings
```

### Update Delivery Settings
```typescript
PUT /profile/delivery-settings
{
  "deliveryRadius": 5,
  "minimumOrder": 100,
  "deliveryFee": 30,
  "averagePreparationTime": 25
}
```

### Get Cuisine Preferences
```typescript
GET /profile/cuisine-preferences
```

### Update Cuisine Preferences
```typescript
PUT /profile/cuisine-preferences
{
  "cuisines": ["Indian", "Biryani", "Tandoori"]
}
```

### Get Account Settings
```typescript
GET /profile/account-settings
```

### Update Account Settings
```typescript
PUT /profile/account-settings
{
  "email": "newemail@restaurant.com",
  "phone": "+1234567890",
  "language": "en",
  "timezone": "UTC+5:30",
  "currency": "INR"
}
```

### Get Security Settings
```typescript
GET /profile/security-settings
```

### Toggle Two-Factor Authentication
```typescript
PUT /profile/security-settings/two-factor
{
  "enabled": true
}
```

### Get Privacy Settings
```typescript
GET /profile/privacy-settings
```

### Update Privacy Settings
```typescript
PUT /profile/privacy-settings
{
  "dataSharing": true,
  "marketingEmails": false,
  "analyticsTracking": true
}
```

### Get Support Information
```typescript
GET /profile/support-info
```

### Submit Support Ticket
```typescript
POST /profile/support-ticket
{
  "subject": "Technical Issue",
  "description": "Unable to update menu items",
  "priority": "high",
  "category": "technical"
}
```

### Get System Preferences
```typescript
GET /profile/system-preferences
```

### Update System Preferences
```typescript
PUT /profile/system-preferences
{
  "theme": "dark",
  "language": "en",
  "timezone": "UTC+5:30",
  "dateFormat": "DD/MM/YYYY",
  "timeFormat": "24h"
}
```

### Export Profile Data
```typescript
GET /profile/export
```

### Delete Account
```typescript
DELETE /profile/account
{
  "reason": "Closing business"
}
```

---

## Dashboard APIs

### Get Dashboard Overview
```typescript
GET /dashboard/overview
```

### Get Dashboard Stats
```typescript
GET /dashboard/stats?period=today
```

### Get Recent Orders
```typescript
GET /dashboard/recent-orders?limit=10
```

### Get Top Selling Items
```typescript
GET /dashboard/top-selling?limit=5
```

### Get Revenue Summary
```typescript
GET /dashboard/revenue-summary?period=week
```

### Get Order Status Summary
```typescript
GET /dashboard/order-status-summary
```

---

## Splash Screen APIs

### Get App Version
```typescript
GET /app/version
```

### Get App Configuration
```typescript
GET /app/config
```

### Check App Updates
```typescript
GET /app/updates
```

---

## Login Screen APIs

### Validate Login Credentials
```typescript
POST /auth/validate
{
  "email": "restaurant@grooso.com",
  "password": "password123"
}
```

### Get Login Attempts
```typescript
GET /auth/login-attempts
```

### Reset Login Attempts
```typescript
POST /auth/reset-login-attempts
```

---

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": "Error message description",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional error details"
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error
- `503` - Service Unavailable

### Common Error Codes
- `AUTH_INVALID_CREDENTIALS` - Invalid email or password
- `AUTH_TOKEN_EXPIRED` - Authentication token has expired
- `ORDER_NOT_FOUND` - Order with specified ID not found
- `ITEM_NOT_FOUND` - Menu item not found
- `VALIDATION_ERROR` - Request validation failed
- `RATE_LIMIT_EXCEEDED` - Too many requests

---

## Rate Limiting

### Rate Limit Rules
- **Standard Rate Limit**: 100 requests per minute
- **Burst Rate Limit**: 10 requests per second
- **Upload Rate Limit**: 5 file uploads per minute

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642234567
```

---

## WebSocket Support

### WebSocket Connection
**URL**: `wss://api.grooso.com/v1/ws?token=YOUR_JWT_TOKEN`

### WebSocket Events
- `new_order` - New order received
- `order_status_update` - Order status changed
- `new_review` - New customer review
- `new_complaint` - New customer complaint

### WebSocket Connection Example
```typescript
const connectWebSocket = () => {
  const token = await AsyncStorage.getItem('authToken');
  const ws = new WebSocket(`wss://api.grooso.com/v1/ws?token=${token}`);
  
  ws.onopen = () => {
    console.log('WebSocket connected');
  };
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received:', data.event, data.data);
  };
};
```

---

## SDK Integration

### Installation
```bash
npm install @grooso/vendor-sdk
```

### Basic Usage
```typescript
import { GroosoVendorSDK } from '@grooso/vendor-sdk';

const sdk = new GroosoVendorSDK({
  apiKey: 'your_api_key',
  baseURL: 'https://api.grooso.com/v1'
});

// Login
const auth = await sdk.auth.login({
  email: 'restaurant@grooso.com',
  password: 'password123'
});

// Get new orders
const orders = await sdk.orders.getNewOrders();

// Update order status
await sdk.orders.updateStatus('order_123', 'PREPARING');

// Get inventory
const inventory = await sdk.inventory.getAll();

// Get analytics
const analytics = await sdk.analytics.getDashboard();

// Get reviews
const reviews = await sdk.feedback.getReviews();

// Get profile
const profile = await sdk.profile.get();
```

---

## Support

### Documentation
- **API Documentation**: https://docs.grooso.com/api
- **SDK Documentation**: https://docs.grooso.com/sdk
- **Webhook Documentation**: https://docs.grooso.com/webhooks

### Support Channels
- **Email**: api-support@grooso.com
- **Phone**: +1-800-GROOSO-1
- **Live Chat**: Available in vendor dashboard

### Status & Updates
- **Status Page**: https://status.grooso.com
- **API Changelog**: https://docs.grooso.com/changelog
- **Release Notes**: https://docs.grooso.com/releases

### Community
- **Developer Forum**: https://community.grooso.com
- **GitHub Repository**: https://github.com/grooso/vendor-api
- **Stack Overflow**: Tagged with `grooso-api`

---

## Version History

### v1.0.0 (Current)
- Initial API release
- Complete CRUD operations for all modules
- Real-time WebSocket support
- Comprehensive analytics
- Full feedback management system

### Upcoming Features
- **v1.1.0**: Advanced reporting and insights
- **v1.2.0**: Multi-location support
- **v1.3.0**: Advanced inventory management
- **v2.0.0**: AI-powered recommendations

---

*Last Updated: January 2025*
*API Version: v1.0.0*
