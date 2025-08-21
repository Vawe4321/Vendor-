const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a restaurant name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  cuisine: {
    type: String,
    required: [true, 'Please add cuisine type']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Please add street address']
    },
    city: {
      type: String,
      required: [true, 'Please add city']
    },
    state: {
      type: String,
      required: [true, 'Please add state']
    },
    zipCode: {
      type: String,
      required: [true, 'Please add zip code']
    },
    country: {
      type: String,
      default: 'India'
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0] // Default coordinates (longitude, latitude)
      }
    }
  },
  contact: {
    phone: {
      type: String,
      required: [true, 'Please add phone number'],
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please add a valid phone number']
    },
    email: {
      type: String,
      required: [true, 'Please add email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    website: String
  },
  images: {
    logo: {
      type: String,
      default: 'default-logo.jpg'
    },
    banner: {
      type: String,
      default: 'default-banner.jpg'
    },
    gallery: [String]
  },
  operatingHours: {
    monday: {
      open: { type: String, default: '09:00' },
      close: { type: String, default: '22:00' },
      isOpen: { type: Boolean, default: true }
    },
    tuesday: {
      open: { type: String, default: '09:00' },
      close: { type: String, default: '22:00' },
      isOpen: { type: Boolean, default: true }
    },
    wednesday: {
      open: { type: String, default: '09:00' },
      close: { type: String, default: '22:00' },
      isOpen: { type: Boolean, default: true }
    },
    thursday: {
      open: { type: String, default: '09:00' },
      close: { type: String, default: '22:00' },
      isOpen: { type: Boolean, default: true }
    },
    friday: {
      open: { type: String, default: '09:00' },
      close: { type: String, default: '22:00' },
      isOpen: { type: Boolean, default: true }
    },
    saturday: {
      open: { type: String, default: '09:00' },
      close: { type: String, default: '22:00' },
      isOpen: { type: Boolean, default: true }
    },
    sunday: {
      open: { type: String, default: '09:00' },
      close: { type: String, default: '22:00' },
      isOpen: { type: Boolean, default: true }
    }
  },
  deliverySettings: {
    isDeliveryAvailable: {
      type: Boolean,
      default: true
    },
    isPickupAvailable: {
      type: Boolean,
      default: true
    },
    deliveryRadius: {
      type: Number,
      default: 5, // in kilometers
      min: [1, 'Delivery radius must be at least 1 km'],
      max: [20, 'Delivery radius cannot exceed 20 km']
    },
    deliveryFee: {
      type: Number,
      default: 0,
      min: [0, 'Delivery fee cannot be negative']
    },
    minimumOrderAmount: {
      type: Number,
      default: 0,
      min: [0, 'Minimum order amount cannot be negative']
    },
    estimatedDeliveryTime: {
      type: Number,
      default: 30, // in minutes
      min: [15, 'Estimated delivery time must be at least 15 minutes'],
      max: [120, 'Estimated delivery time cannot exceed 120 minutes']
    }
  },
  status: {
    isOnline: {
      type: Boolean,
      default: false
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5']
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    distribution: {
      five: { type: Number, default: 0 },
      four: { type: Number, default: 0 },
      three: { type: Number, default: 0 },
      two: { type: Number, default: 0 },
      one: { type: Number, default: 0 }
    }
  },
  statistics: {
    totalOrders: {
      type: Number,
      default: 0
    },
    totalRevenue: {
      type: Number,
      default: 0
    },
    averageOrderValue: {
      type: Number,
      default: 0
    },
    totalCustomers: {
      type: Number,
      default: 0
    },
    repeatCustomers: {
      type: Number,
      default: 0
    }
  },
  settings: {
    autoAcceptOrders: {
      type: Boolean,
      default: false
    },
    notificationPreferences: {
      newOrders: { type: Boolean, default: true },
      orderUpdates: { type: Boolean, default: true },
      customerReviews: { type: Boolean, default: true },
      complaints: { type: Boolean, default: true },
      analytics: { type: Boolean, default: true }
    },
    taxSettings: {
      gstPercentage: {
        type: Number,
        default: 5,
        min: [0, 'GST percentage cannot be negative'],
        max: [28, 'GST percentage cannot exceed 28%']
      },
      includeTaxInPrice: {
        type: Boolean,
        default: false
      }
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for geospatial queries
RestaurantSchema.index({ 'address.coordinates': '2dsphere' });

// Virtual for checking if restaurant is open
RestaurantSchema.methods.isOpen = function() {
  const now = new Date();
  const dayOfWeek = now.toLocaleLowerCase().slice(0, 3);
  const currentTime = now.toTimeString().slice(0, 5);
  
  const todayHours = this.operatingHours[dayOfWeek];
  
  if (!todayHours || !todayHours.isOpen) {
    return false;
  }
  
  return currentTime >= todayHours.open && currentTime <= todayHours.close;
};

// Method to update restaurant statistics
RestaurantSchema.methods.updateStats = function(orderData) {
  this.statistics.totalOrders += 1;
  this.statistics.totalRevenue += orderData.totalAmount;
  this.statistics.averageOrderValue = this.statistics.totalRevenue / this.statistics.totalOrders;
  
  return this.save();
};

// Method to update ratings
RestaurantSchema.methods.updateRating = function(newRating) {
  const oldRating = this.ratings.average;
  const totalReviews = this.ratings.totalReviews;
  
  this.ratings.totalReviews += 1;
  this.ratings.average = ((oldRating * totalReviews) + newRating) / this.ratings.totalReviews;
  
  // Update rating distribution
  if (newRating >= 4.5) this.ratings.distribution.five += 1;
  else if (newRating >= 3.5) this.ratings.distribution.four += 1;
  else if (newRating >= 2.5) this.ratings.distribution.three += 1;
  else if (newRating >= 1.5) this.ratings.distribution.two += 1;
  else this.ratings.distribution.one += 1;
  
  return this.save();
};

module.exports = mongoose.model('Restaurant', RestaurantSchema);
