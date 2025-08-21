const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please add a valid phone number']
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg'
  },
  addresses: [{
    type: {
      type: String,
      enum: ['HOME', 'WORK', 'OTHER'],
      default: 'HOME'
    },
    label: {
      type: String,
      required: true,
      maxlength: [50, 'Address label cannot exceed 50 characters']
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    landmark: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  preferences: {
    cuisine: [String],
    dietaryRestrictions: [{
      type: String,
      enum: ['VEGETARIAN', 'VEGAN', 'GLUTEN_FREE', 'DAIRY_FREE', 'NUT_FREE', 'HALAL', 'KOSHER']
    }],
    spiceLevel: {
      type: String,
      enum: ['MILD', 'MEDIUM', 'HOT', 'EXTRA_HOT'],
      default: 'MEDIUM'
    },
    deliveryInstructions: String,
    favoriteRestaurants: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Restaurant'
    }],
    favoriteItems: [{
      type: mongoose.Schema.ObjectId,
      ref: 'MenuItem'
    }]
  },
  loyalty: {
    points: {
      type: Number,
      default: 0,
      min: [0, 'Loyalty points cannot be negative']
    },
    tier: {
      type: String,
      enum: ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'],
      default: 'BRONZE'
    },
    totalSpent: {
      type: Number,
      default: 0,
      min: [0, 'Total spent cannot be negative']
    }
  },
  paymentMethods: [{
    type: {
      type: String,
      enum: ['CARD', 'UPI', 'WALLET', 'NET_BANKING'],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    details: {
      cardNumber: String,
      cardType: String,
      upiId: String,
      walletName: String
    },
    isDefault: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  statistics: {
    totalOrders: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0
    },
    averageOrderValue: {
      type: Number,
      default: 0
    },
    lastOrderDate: Date,
    joinDate: {
      type: Date,
      default: Date.now
    }
  },
  status: {
    isActive: {
      type: Boolean,
      default: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isBlocked: {
      type: Boolean,
      default: false
    }
  },
  notificationSettings: {
    email: {
      type: Boolean,
      default: true
    },
    push: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: false
    },
    orderUpdates: {
      type: Boolean,
      default: true
    },
    promotions: {
      type: Boolean,
      default: true
    },
    reviews: {
      type: Boolean,
      default: true
    }
  },
  fcmToken: String,
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
CustomerSchema.index({ email: 1 });
CustomerSchema.index({ phone: 1 });
CustomerSchema.index({ 'addresses.coordinates': '2dsphere' });
CustomerSchema.index({ 'statistics.totalOrders': -1 });
CustomerSchema.index({ 'loyalty.tier': 1 });

// Virtual for default address
CustomerSchema.virtual('defaultAddress').get(function() {
  const addresses = Array.isArray(this.addresses) ? this.addresses : [];
  return addresses.find(addr => addr && addr.isDefault) || addresses[0] || null;
});

// Virtual for default payment method
CustomerSchema.virtual('defaultPaymentMethod').get(function() {
  const methods = Array.isArray(this.paymentMethods) ? this.paymentMethods : [];
  return methods.find(pm => pm && pm.isDefault && pm.isActive) || methods[0] || null;
});

// Method to add address
CustomerSchema.methods.addAddress = function(addressData) {
  if (addressData.isDefault) {
    // Remove default from other addresses
    this.addresses.forEach(addr => addr.isDefault = false);
  }
  this.addresses.push(addressData);
  return this.save();
};

// Method to update address
CustomerSchema.methods.updateAddress = function(addressId, addressData) {
  const addressIndex = this.addresses.findIndex(addr => addr._id.toString() === addressId);
  if (addressIndex === -1) {
    throw new Error('Address not found');
  }
  
  if (addressData.isDefault) {
    // Remove default from other addresses
    this.addresses.forEach(addr => addr.isDefault = false);
  }
  
  this.addresses[addressIndex] = { ...this.addresses[addressIndex], ...addressData };
  return this.save();
};

// Method to remove address
CustomerSchema.methods.removeAddress = function(addressId) {
  this.addresses = this.addresses.filter(addr => addr._id.toString() !== addressId);
  return this.save();
};

// Method to add payment method
CustomerSchema.methods.addPaymentMethod = function(paymentData) {
  if (paymentData.isDefault) {
    // Remove default from other payment methods
    this.paymentMethods.forEach(pm => pm.isDefault = false);
  }
  this.paymentMethods.push(paymentData);
  return this.save();
};

// Method to update loyalty points
CustomerSchema.methods.updateLoyaltyPoints = function(points, orderAmount = 0) {
  this.loyalty.points += points;
  this.loyalty.totalSpent += orderAmount;
  
  // Update tier based on total spent
  if (this.loyalty.totalSpent >= 10000) {
    this.loyalty.tier = 'PLATINUM';
  } else if (this.loyalty.totalSpent >= 5000) {
    this.loyalty.tier = 'GOLD';
  } else if (this.loyalty.totalSpent >= 2000) {
    this.loyalty.tier = 'SILVER';
  } else {
    this.loyalty.tier = 'BRONZE';
  }
  
  return this.save();
};

// Method to update order statistics
CustomerSchema.methods.updateOrderStats = function(orderData) {
  this.statistics.totalOrders += 1;
  this.statistics.totalSpent += orderData.totalAmount;
  this.statistics.averageOrderValue = this.statistics.totalSpent / this.statistics.totalOrders;
  this.statistics.lastOrderDate = new Date();
  
  return this.save();
};

// Method to add favorite restaurant
CustomerSchema.methods.addFavoriteRestaurant = function(restaurantId) {
  if (!this.preferences.favoriteRestaurants.includes(restaurantId)) {
    this.preferences.favoriteRestaurants.push(restaurantId);
  }
  return this.save();
};

// Method to remove favorite restaurant
CustomerSchema.methods.removeFavoriteRestaurant = function(restaurantId) {
  this.preferences.favoriteRestaurants = this.preferences.favoriteRestaurants.filter(
    id => id.toString() !== restaurantId.toString()
  );
  return this.save();
};

// Method to add favorite item
CustomerSchema.methods.addFavoriteItem = function(itemId) {
  if (!this.preferences.favoriteItems.includes(itemId)) {
    this.preferences.favoriteItems.push(itemId);
  }
  return this.save();
};

// Method to remove favorite item
CustomerSchema.methods.removeFavoriteItem = function(itemId) {
  this.preferences.favoriteItems = this.preferences.favoriteItems.filter(
    id => id.toString() !== itemId.toString()
  );
  return this.save();
};

// Static method to get top customers
CustomerSchema.statics.getTopCustomers = function(limit = 10) {
  return this.find({ 'status.isActive': true })
    .sort({ 'statistics.totalSpent': -1 })
    .limit(limit);
};

// Static method to get customers by tier
CustomerSchema.statics.getCustomersByTier = function(tier) {
  return this.find({
    'status.isActive': true,
    'loyalty.tier': tier
  }).sort({ 'statistics.totalSpent': -1 });
};

module.exports = mongoose.model('Customer', CustomerSchema);
