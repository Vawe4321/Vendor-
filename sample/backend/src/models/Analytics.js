const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  period: {
    type: String,
    enum: ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'],
    required: true
  },
  orders: {
    total: {
      type: Number,
      default: 0
    },
    completed: {
      type: Number,
      default: 0
    },
    cancelled: {
      type: Number,
      default: 0
    },
    averageOrderValue: {
      type: Number,
      default: 0
    },
    peakHours: [{
      hour: Number,
      count: Number
    }]
  },
  revenue: {
    total: {
      type: Number,
      default: 0
    },
    net: {
      type: Number,
      default: 0
    },
    average: {
      type: Number,
      default: 0
    },
    byPaymentMethod: [{
      method: String,
      amount: Number,
      count: Number
    }]
  },
  customers: {
    new: {
      type: Number,
      default: 0
    },
    returning: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    averageOrderFrequency: {
      type: Number,
      default: 0
    }
  },
  menuItems: {
    topSelling: [{
      item: {
        type: mongoose.Schema.ObjectId,
        ref: 'MenuItem'
      },
      name: String,
      quantity: Number,
      revenue: Number
    }],
    lowPerforming: [{
      item: {
        type: mongoose.Schema.ObjectId,
        ref: 'MenuItem'
      },
      name: String,
      quantity: Number,
      revenue: Number
    }]
  },
  categories: {
    performance: [{
      category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
      },
      name: String,
      orders: Number,
      revenue: Number,
      averageRating: Number
    }]
  },
  delivery: {
    totalDeliveries: {
      type: Number,
      default: 0
    },
    averageDeliveryTime: {
      type: Number,
      default: 0
    },
    deliveryAreas: [{
      area: String,
      orders: Number,
      revenue: Number
    }]
  },
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    total: {
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
  performance: {
    preparationTime: {
      average: {
        type: Number,
        default: 0
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 0
      }
    },
    orderAcceptanceRate: {
      type: Number,
      default: 0
    },
    cancellationRate: {
      type: Number,
      default: 0
    },
    customerSatisfaction: {
      type: Number,
      default: 0
    }
  },
  trends: {
    orderGrowth: {
      type: Number,
      default: 0
    },
    revenueGrowth: {
      type: Number,
      default: 0
    },
    customerGrowth: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound index for efficient queries
AnalyticsSchema.index({ restaurant: 1, date: 1, period: 1 }, { unique: true });
AnalyticsSchema.index({ restaurant: 1, period: 1, date: -1 });

// Virtual for completion rate
AnalyticsSchema.virtual('completionRate').get(function() {
  if (this.orders.total === 0) return 0;
  return (this.orders.completed / this.orders.total) * 100;
});

// Virtual for cancellation rate
AnalyticsSchema.virtual('cancellationRate').get(function() {
  if (this.orders.total === 0) return 0;
  return (this.orders.cancelled / this.orders.total) * 100;
});

// Virtual for customer retention rate
AnalyticsSchema.virtual('retentionRate').get(function() {
  if (this.customers.total === 0) return 0;
  return (this.customers.returning / this.customers.total) * 100;
});

// Method to update order statistics
AnalyticsSchema.methods.updateOrderStats = function(orderData) {
  this.orders.total += 1;
  
  if (orderData.status === 'DELIVERED') {
    this.orders.completed += 1;
  } else if (orderData.status === 'CANCELLED') {
    this.orders.cancelled += 1;
  }
  
  // Update average order value
  const totalRevenue = this.revenue.total + orderData.totalAmount;
  const totalOrders = this.orders.total;
  this.orders.averageOrderValue = totalRevenue / totalOrders;
  
  // Update peak hours
  const orderHour = new Date(orderData.orderPlaced).getHours();
  const peakHour = this.orders.peakHours.find(ph => ph.hour === orderHour);
  if (peakHour) {
    peakHour.count += 1;
  } else {
    this.orders.peakHours.push({ hour: orderHour, count: 1 });
  }
  
  return this.save();
};

// Method to update revenue statistics
AnalyticsSchema.methods.updateRevenueStats = function(revenueData) {
  this.revenue.total += revenueData.amount;
  this.revenue.net += revenueData.netAmount;
  this.revenue.average = this.revenue.total / this.orders.total;
  
  // Update payment method breakdown
  const paymentMethod = this.revenue.byPaymentMethod.find(pm => pm.method === revenueData.paymentMethod);
  if (paymentMethod) {
    paymentMethod.amount += revenueData.amount;
    paymentMethod.count += 1;
  } else {
    this.revenue.byPaymentMethod.push({
      method: revenueData.paymentMethod,
      amount: revenueData.amount,
      count: 1
    });
  }
  
  return this.save();
};

// Method to update customer statistics
AnalyticsSchema.methods.updateCustomerStats = function(customerData) {
  if (customerData.isNew) {
    this.customers.new += 1;
  } else {
    this.customers.returning += 1;
  }
  
  this.customers.total = this.customers.new + this.customers.returning;
  this.customers.averageOrderFrequency = this.orders.total / this.customers.total;
  
  return this.save();
};

// Method to update rating statistics
AnalyticsSchema.methods.updateRatingStats = function(ratingData) {
  const oldRating = this.ratings.average;
  const totalRatings = this.ratings.total;
  
  this.ratings.total += 1;
  this.ratings.average = ((oldRating * totalRatings) + ratingData.overall) / this.ratings.total;
  
  // Update rating distribution
  if (ratingData.overall >= 4.5) this.ratings.distribution.five += 1;
  else if (ratingData.overall >= 3.5) this.ratings.distribution.four += 1;
  else if (ratingData.overall >= 2.5) this.ratings.distribution.three += 1;
  else if (ratingData.overall >= 1.5) this.ratings.distribution.two += 1;
  else this.ratings.distribution.one += 1;
  
  return this.save();
};

// Static method to get analytics by date range
AnalyticsSchema.statics.getByDateRange = function(restaurantId, startDate, endDate, period = 'DAILY') {
  return this.find({
    restaurant: restaurantId,
    date: {
      $gte: startDate,
      $lte: endDate
    },
    period: period
  }).sort({ date: 1 });
};

// Static method to get latest analytics
AnalyticsSchema.statics.getLatest = function(restaurantId, period = 'DAILY') {
  return this.findOne({
    restaurant: restaurantId,
    period: period
  }).sort({ date: -1 });
};

// Static method to get analytics summary
AnalyticsSchema.statics.getSummary = function(restaurantId, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return this.aggregate([
    {
      $match: {
        restaurant: new mongoose.Types.ObjectId(String(restaurantId)),
        date: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: '$orders.total' },
        totalRevenue: { $sum: '$revenue.total' },
        totalCustomers: { $sum: '$customers.total' },
        averageRating: { $avg: '$ratings.average' }
      }
    }
  ]);
};

module.exports = mongoose.model('Analytics', AnalyticsSchema);
