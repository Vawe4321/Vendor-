const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true
  },
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Customer',
    required: true
  },
  items: [{
    menuItem: {
      type: mongoose.Schema.ObjectId,
      ref: 'MenuItem',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    specialInstructions: String,
    addOns: [{
      name: String,
      price: Number
    }],
    totalItemPrice: {
      type: Number,
      required: true
    }
  }],
  deliveryAddress: {
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
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  deliveryInstructions: String,
  orderType: {
    type: String,
    enum: ['delivery', 'pickup'],
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING'
  },
  payment: {
    method: {
      type: String,
      enum: ['CASH', 'CARD', 'UPI', 'WALLET', 'ONLINE'],
      required: true
    },
    status: {
      type: String,
      enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'],
      default: 'PENDING'
    },
    transactionId: String,
    amount: {
      type: Number,
      required: true,
      min: [0, 'Amount cannot be negative']
    }
  },
  pricing: {
    subtotal: {
      type: Number,
      required: true,
      min: [0, 'Subtotal cannot be negative']
    },
    tax: {
      type: Number,
      default: 0,
      min: [0, 'Tax cannot be negative']
    },
    deliveryFee: {
      type: Number,
      default: 0,
      min: [0, 'Delivery fee cannot be negative']
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative']
    },
    total: {
      type: Number,
      required: true,
      min: [0, 'Total cannot be negative']
    }
  },
  timing: {
    orderPlaced: {
      type: Date,
      default: Date.now
    },
    accepted: Date,
    preparationStarted: Date,
    ready: Date,
    outForDelivery: Date,
    delivered: Date,
    estimatedDelivery: Date,
    estimatedPreparation: Date
  },
  driver: {
    id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Driver'
    },
    name: String,
    phone: String,
    vehicleNumber: String
  },
  rating: {
    food: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    delivery: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    overall: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    review: String,
    reviewDate: Date
  },
  cancellation: {
    reason: String,
    cancelledBy: {
      type: String,
      enum: ['CUSTOMER', 'RESTAURANT', 'SYSTEM']
    },
    cancelledAt: Date,
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ['PENDING', 'PROCESSED', 'COMPLETED'],
      default: 'PENDING'
    }
  },
  specialRequests: String,
  isUrgent: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ restaurant: 1, status: 1 });
OrderSchema.index({ customer: 1 });
OrderSchema.index({ 'deliveryAddress.coordinates': '2dsphere' });
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ 'timing.delivered': -1 });

// Virtual for order duration
OrderSchema.virtual('duration').get(function() {
  if (this.timing.delivered) {
    return this.timing.delivered - this.timing.orderPlaced;
  }
  return Date.now() - this.timing.orderPlaced;
});

// Virtual for preparation time
OrderSchema.virtual('preparationTime').get(function() {
  if (this.timing.ready && this.timing.preparationStarted) {
    return this.timing.ready - this.timing.preparationStarted;
  }
  return null;
});

// Method to generate order number
OrderSchema.statics.generateOrderNumber = function() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD${year}${month}${day}${random}`;
};

// Method to update order status
OrderSchema.methods.updateStatus = function(newStatus, updatedBy = 'SYSTEM') {
  this.status = newStatus;
  
  // Update timing based on status
  switch (newStatus) {
    case 'ACCEPTED':
      this.timing.accepted = new Date();
      break;
    case 'PREPARING':
      this.timing.preparationStarted = new Date();
      break;
    case 'READY':
      this.timing.ready = new Date();
      break;
    case 'OUT_FOR_DELIVERY':
      this.timing.outForDelivery = new Date();
      break;
    case 'DELIVERED':
      this.timing.delivered = new Date();
      break;
    case 'CANCELLED':
      this.cancellation.cancelledAt = new Date();
      this.cancellation.cancelledBy = updatedBy;
      break;
  }
  
  return this.save();
};

// Method to calculate order total
OrderSchema.methods.calculateTotal = function() {
  const subtotal = this.items.reduce((sum, item) => sum + item.totalItemPrice, 0);
  const tax = (subtotal * 0.05); // 5% GST
  const total = subtotal + tax + this.pricing.deliveryFee - this.pricing.discount;
  
  this.pricing.subtotal = subtotal;
  this.pricing.tax = tax;
  this.pricing.total = total;
  this.payment.amount = total;
  
  return this.save();
};

// Method to add rating
OrderSchema.methods.addRating = function(ratingData) {
  this.rating = {
    food: ratingData.food,
    delivery: ratingData.delivery,
    overall: ratingData.overall,
    review: ratingData.review,
    reviewDate: new Date()
  };
  
  return this.save();
};

// Method to cancel order
OrderSchema.methods.cancelOrder = function(reason, cancelledBy) {
  this.status = 'CANCELLED';
  this.cancellation = {
    reason,
    cancelledBy,
    cancelledAt: new Date(),
    refundAmount: this.payment.status === 'COMPLETED' ? this.pricing.total : 0,
    refundStatus: this.payment.status === 'COMPLETED' ? 'PENDING' : 'PENDING'
  };
  
  return this.save();
};

// Ensure order number exists before validation for new documents
OrderSchema.pre('validate', function(next) {
  if (this.isNew && !this.orderNumber) {
    this.orderNumber = this.constructor.generateOrderNumber();
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
