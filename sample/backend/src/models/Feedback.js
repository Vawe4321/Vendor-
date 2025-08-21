const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order',
    required: true
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Customer',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  category: {
    type: String,
    enum: ['GENERAL', 'FOOD_QUALITY', 'SERVICE', 'DELIVERY', 'PRICE', 'CLEANLINESS'],
    default: 'GENERAL'
  },
  status: {
    type: String,
    enum: ['PENDING', 'REVIEWED', 'RESOLVED', 'IGNORED'],
    default: 'PENDING'
  },
  response: {
    type: String,
    trim: true,
    maxlength: [500, 'Response cannot exceed 500 characters']
  },
  respondedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  respondedAt: {
    type: Date
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  helpful: {
    count: {
      type: Number,
      default: 0
    },
    users: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
FeedbackSchema.index({ restaurant: 1, createdAt: -1 });
FeedbackSchema.index({ restaurant: 1, status: 1 });
FeedbackSchema.index({ restaurant: 1, rating: 1 });
FeedbackSchema.index({ order: 1 });

// Virtual for response time
FeedbackSchema.virtual('responseTime').get(function() {
  if (this.respondedAt && this.createdAt) {
    return this.respondedAt - this.createdAt;
  }
  return null;
});

// Method to mark feedback as helpful
FeedbackSchema.methods.markHelpful = function(userId) {
  if (!this.helpful.users.includes(userId)) {
    this.helpful.users.push(userId);
    this.helpful.count += 1;
  }
  return this.save();
};

// Method to unmark feedback as helpful
FeedbackSchema.methods.unmarkHelpful = function(userId) {
  const index = this.helpful.users.indexOf(userId);
  if (index > -1) {
    this.helpful.users.splice(index, 1);
    this.helpful.count = Math.max(0, this.helpful.count - 1);
  }
  return this.save();
};

// Static method to get average rating for restaurant
FeedbackSchema.statics.getAverageRating = function(restaurantId) {
  return this.aggregate([
    {
      $match: { restaurant: restaurantId }
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalFeedback: { $sum: 1 }
      }
    }
  ]);
};

// Static method to get rating distribution
FeedbackSchema.statics.getRatingDistribution = function(restaurantId) {
  return this.aggregate([
    {
      $match: { restaurant: restaurantId }
    },
    {
      $group: {
        _id: '$rating',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id': 1 }
    }
  ]);
};

// Static method to get recent feedback
FeedbackSchema.statics.getRecentFeedback = function(restaurantId, limit = 10) {
  return this.find({ restaurant: restaurantId })
    .populate('customer', 'name')
    .populate('order', 'orderNumber')
    .sort('-createdAt')
    .limit(limit);
};

module.exports = mongoose.model('Feedback', FeedbackSchema);
