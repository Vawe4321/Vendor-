const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a category name'],
    trim: true,
    maxlength: [50, 'Category name cannot be more than 50 characters']
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot be more than 200 characters']
  },
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  image: {
    type: String,
    default: 'default-category.jpg'
  },
  displayOrder: {
    type: Number,
    default: 0
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
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  statistics: {
    itemCount: {
      type: Number,
      default: 0
    },
    totalRevenue: {
      type: Number,
      default: 0
    },
    totalOrders: {
      type: Number,
      default: 0
    }
  },
  discount: {
    percentage: {
      type: Number,
      default: 0,
      min: [0, 'Discount percentage cannot be negative'],
      max: [100, 'Discount percentage cannot exceed 100']
    },
    isActive: {
      type: Boolean,
      default: false
    },
    validFrom: Date,
    validUntil: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
CategorySchema.index({ restaurant: 1, 'status.isActive': 1 });
CategorySchema.index({ restaurant: 1, displayOrder: 1 });

// Virtual for menu items in this category
CategorySchema.virtual('menuItems', {
  ref: 'MenuItem',
  localField: '_id',
  foreignField: 'category',
  justOne: false
});

// Method to update item count
CategorySchema.methods.updateItemCount = function() {
  return this.model('MenuItem').countDocuments({ category: this._id })
    .then(count => {
      this.statistics.itemCount = count;
      return this.save();
    });
};

// Method to update revenue statistics
CategorySchema.methods.updateRevenueStats = function(orderData) {
  this.statistics.totalOrders += 1;
  this.statistics.totalRevenue += orderData.totalAmount;
  return this.save();
};

// Method to toggle active status
CategorySchema.methods.toggleActive = function() {
  this.status.isActive = !this.status.isActive;
  return this.save();
};

// Method to toggle popular status
CategorySchema.methods.togglePopular = function() {
  this.status.isPopular = !this.status.isPopular;
  return this.save();
};

// Method to toggle featured status
CategorySchema.methods.toggleFeatured = function() {
  this.status.isFeatured = !this.status.isFeatured;
  return this.save();
};

// Static method to get active categories
CategorySchema.statics.getActiveCategories = function(restaurantId) {
  return this.find({
    restaurant: restaurantId,
    'status.isActive': true
  })
    .sort({ displayOrder: 1, name: 1 });
};

// Static method to get popular categories
CategorySchema.statics.getPopularCategories = function(restaurantId, limit = 5) {
  return this.find({
    restaurant: restaurantId,
    'status.isActive': true,
    'status.isPopular': true
  })
    .sort({ 'statistics.totalOrders': -1 })
    .limit(limit);
};

module.exports = mongoose.model('Category', CategorySchema);
