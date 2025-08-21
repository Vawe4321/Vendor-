const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  dietaryInfo: {
    isVeg: {
      type: Boolean,
      default: true
    },
    isGlutenFree: {
      type: Boolean,
      default: false
    },
    isSpicy: {
      type: Boolean,
      default: false
    },
    spiceLevel: {
      type: Number,
      min: [0, 'Spice level cannot be negative'],
      max: [5, 'Spice level cannot exceed 5'],
      default: 0
    },
    allergens: [{
      type: String,
      enum: ['NUTS', 'DAIRY', 'EGGS', 'SOY', 'WHEAT', 'FISH', 'SHELLFISH']
    }]
  },
  preparation: {
    time: {
      type: Number,
      default: 15, // in minutes
      min: [1, 'Preparation time must be at least 1 minute'],
      max: [120, 'Preparation time cannot exceed 120 minutes']
    },
    instructions: String
  },
  customization: {
    isCustomizable: {
      type: Boolean,
      default: false
    },
    addOns: [{
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true,
        min: [0, 'Add-on price cannot be negative']
      },
      isAvailable: {
        type: Boolean,
        default: true
      }
    }],
    variants: [{
      name: {
        type: String,
        required: true
      },
      priceModifier: {
        type: Number,
        default: 0
      },
      isAvailable: {
        type: Boolean,
        default: true
      }
    }]
  },
  availability: {
    isAvailable: {
      type: Boolean,
      default: true
    },
    stockQuantity: {
      type: Number,
      default: -1, // -1 means unlimited
      min: [-1, 'Stock quantity cannot be less than -1']
    },
    isOutOfStock: {
      type: Boolean,
      default: false
    }
  },
  status: {
    isActive: {
      type: Boolean,
      default: true
    },
    isPopular: {
      type: Boolean,
      default: false
    },
    isRecommended: {
      type: Boolean,
      default: false
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  nutrition: {
    calories: {
      type: Number,
      min: [0, 'Calories cannot be negative']
    },
    protein: {
      type: Number,
      min: [0, 'Protein cannot be negative']
    },
    carbs: {
      type: Number,
      min: [0, 'Carbs cannot be negative']
    },
    fat: {
      type: Number,
      min: [0, 'Fat cannot be negative']
    },
    fiber: {
      type: Number,
      min: [0, 'Fiber cannot be negative']
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
    averageRating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot exceed 5']
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  tags: [String],
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
MenuItemSchema.index({ restaurant: 1, category: 1 });
MenuItemSchema.index({ restaurant: 1, 'status.isActive': 1 });
MenuItemSchema.index({ restaurant: 1, 'status.isPopular': 1 });
MenuItemSchema.index({ restaurant: 1, 'status.isRecommended': 1 });
MenuItemSchema.index({ name: 'text', description: 'text' });

// Virtual for discount percentage
MenuItemSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Virtual for availability status
MenuItemSchema.virtual('availabilityStatus').get(function() {
  if (!this.availability.isAvailable || this.status.isActive === false) {
    return 'UNAVAILABLE';
  }
  if (this.availability.isOutOfStock) {
    return 'OUT_OF_STOCK';
  }
  if (this.availability.stockQuantity > 0) {
    return 'LOW_STOCK';
  }
  return 'AVAILABLE';
});

// Method to update stock
MenuItemSchema.methods.updateStock = function(quantity) {
  if (this.availability.stockQuantity !== -1) {
    this.availability.stockQuantity = Math.max(0, this.availability.stockQuantity - quantity);
    this.availability.isOutOfStock = this.availability.stockQuantity === 0;
  }
  return this.save();
};

// Method to update order statistics
MenuItemSchema.methods.updateOrderStats = function(orderData) {
  this.statistics.totalOrders += orderData.quantity;
  this.statistics.totalRevenue += orderData.totalAmount;
  return this.save();
};

// Method to update rating
MenuItemSchema.methods.updateRating = function(newRating) {
  const oldRating = this.statistics.averageRating;
  const totalReviews = this.statistics.totalReviews;
  
  this.statistics.totalReviews += 1;
  this.statistics.averageRating = ((oldRating * totalReviews) + newRating) / this.statistics.totalReviews;
  
  return this.save();
};

// Method to toggle availability
MenuItemSchema.methods.toggleAvailability = function() {
  this.availability.isAvailable = !this.availability.isAvailable;
  return this.save();
};

// Method to toggle popular status
MenuItemSchema.methods.togglePopular = function() {
  this.status.isPopular = !this.status.isPopular;
  return this.save();
};

// Method to toggle recommended status
MenuItemSchema.methods.toggleRecommended = function() {
  this.status.isRecommended = !this.status.isRecommended;
  return this.save();
};

// Static method to get popular items
MenuItemSchema.statics.getPopularItems = function(restaurantId, limit = 10) {
  return this.find({
    restaurant: restaurantId,
    'status.isActive': true,
    'availability.isAvailable': true,
    'status.isPopular': true
  })
    .sort({ 'statistics.totalOrders': -1 })
    .limit(limit)
    .populate('category', 'name');
};

// Static method to get recommended items
MenuItemSchema.statics.getRecommendedItems = function(restaurantId, limit = 10) {
  return this.find({
    restaurant: restaurantId,
    'status.isActive': true,
    'availability.isAvailable': true,
    'status.isRecommended': true
  })
    .sort({ 'statistics.averageRating': -1 })
    .limit(limit)
    .populate('category', 'name');
};

module.exports = mongoose.model('MenuItem', MenuItemSchema);
