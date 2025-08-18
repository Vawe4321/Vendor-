# Vendor App API Documentation

This document provides comprehensive documentation for all API endpoints used in the Grooso Vendor App.

## Table of Contents

1. [Authentication](#authentication)
2. [Orders](#orders)
3. [Inventory](#inventory)
4. [Analytics](#analytics)
5. [Feedback](#feedback)
6. [Profile](#profile)
7. [Error Handling](#error-handling)
8. [Usage Examples](#usage-examples)

## Base Configuration

- **Base URL**: `https://api.grooso.com/v1`
- **Content-Type**: `application/json`
- **Authentication**: Bearer Token (JWT)

## Authentication

### Login
```typescript
POST /auth/login
{
  "email": "restaurant@example.com",
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
  "restaurantName": "Grooso's Kitchen",
  "phone": "+1234567890",
  "address": "123 Main St, City, State"
}
```

### Logout
```typescript
POST /auth/logout
```

## Orders

### Get All Orders
```typescript
GET /orders?status=NEW&page=1&limit=20
```

### Get Orders by Status
```typescript
GET /orders/status/NEW?page=1&limit=20
```

### Update Order Status
```typescript
PUT /orders/{orderId}/status
{
  "orderId": "order123",
  "status": "PREPARING",
  "estimatedTime": "30 minutes"
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

## Inventory

### Get All Menu Items
```typescript
GET /inventory/items?category=biryani&inStock=true&page=1&limit=20
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

### Update Stock Status
```typescript
PUT /inventory/items/{itemId}/stock
{
  "itemId": "item123",
  "isInStock": false
}
```

### Upload Item Image
```typescript
POST /inventory/items/{itemId}/image
Content-Type: multipart/form-data
```

## Analytics

### Get Dashboard Analytics
```typescript
GET /analytics/dashboard?startDate=2025-01-01&endDate=2025-01-31
```

### Get Revenue Analytics
```typescript
GET /analytics/revenue?period=monthly&startDate=2025-01-01&endDate=2025-01-31
```

### Get Real-time Analytics
```typescript
GET /analytics/realtime
```

### Get Sales Report
```typescript
GET /analytics/sales-report?startDate=2025-01-01&endDate=2025-01-31&format=pdf
```

## Feedback

### Get Reviews
```typescript
GET /feedback/reviews?rating=4&page=1&limit=20
```

### Reply to Review
```typescript
POST /feedback/reviews/{reviewId}/reply
{
  "reviewId": "review123",
  "reply": "Thank you for your feedback! We're glad you enjoyed our food."
}
```

### Get Complaints
```typescript
GET /feedback/complaints?status=OPEN&priority=HIGH&page=1&limit=20
```

### Update Complaint Status
```typescript
PUT /feedback/complaints/{complaintId}/status
{
  "complaintId": "complaint123",
  "status": "RESOLVED",
  "resolution": "Issue has been resolved and customer compensated"
}
```

### Get Dish Ratings
```typescript
GET /feedback/dish-ratings?category=biryani&minRating=4
```

## Profile

### Get Restaurant Profile
```typescript
GET /profile
```

### Update Profile
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

### Upload Logo
```typescript
POST /profile/logo
Content-Type: multipart/form-data
```

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Usage Examples

### Using the API in React Native

```typescript
import { authAPI, ordersAPI, inventoryAPI } from '../api';

// Login
const login = async () => {
  try {
    const response = await authAPI.login({
      email: 'restaurant@example.com',
      password: 'password123'
    });
    console.log('Login successful:', response);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Get new orders
const getNewOrders = async () => {
  try {
    const response = await ordersAPI.getNewOrders(1, 20);
    console.log('New orders:', response.orders);
  } catch (error) {
    console.error('Failed to get orders:', error);
  }
};

// Update order status
const updateOrderStatus = async (orderId: string) => {
  try {
    const response = await ordersAPI.updateOrderStatus({
      orderId,
      status: 'PREPARING'
    });
    console.log('Order status updated:', response);
  } catch (error) {
    console.error('Failed to update order:', error);
  }
};

// Get inventory
const getInventory = async () => {
  try {
    const response = await inventoryAPI.getInventory();
    console.log('Inventory:', response.categories);
  } catch (error) {
    console.error('Failed to get inventory:', error);
  }
};
```

### Error Handling Example

```typescript
import { authAPI } from '../api';

const handleLogin = async () => {
  try {
    const response = await authAPI.login({
      email: 'restaurant@example.com',
      password: 'password123'
    });
    
    if (response.success) {
      // Store token and navigate to main app
      await AsyncStorage.setItem('authToken', response.token);
      navigation.navigate('MainApp');
    }
  } catch (error) {
    if (error.response?.status === 401) {
      // Handle unauthorized error
      Alert.alert('Error', 'Invalid credentials');
    } else if (error.response?.status === 500) {
      // Handle server error
      Alert.alert('Error', 'Server error. Please try again later.');
    } else {
      // Handle network error
      Alert.alert('Error', 'Network error. Please check your connection.');
    }
  }
};
```

## Rate Limiting

- **Standard Rate Limit**: 100 requests per minute
- **Burst Rate Limit**: 10 requests per second
- **Rate Limit Headers**:
  - `X-RateLimit-Limit`: Total requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time when rate limit resets

## Pagination

Most list endpoints support pagination with the following parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

Response includes:
- `totalCount`: Total number of items
- `hasMore`: Whether there are more items
- `page`: Current page number
- `limit`: Items per page

## File Upload

For file uploads (images, documents), use `multipart/form-data`:

```typescript
const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await api.post('/inventory/items/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
```

## WebSocket Support

For real-time updates (new orders, status changes), WebSocket connections are available at:
- **WebSocket URL**: `wss://api.grooso.com/v1/ws`
- **Authentication**: Include token in query parameter: `?token=YOUR_JWT_TOKEN`

## Support

For API support and questions:
- **Email**: api-support@grooso.com
- **Documentation**: https://docs.grooso.com/api
- **Status Page**: https://status.grooso.com
