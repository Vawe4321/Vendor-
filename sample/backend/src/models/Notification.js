const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  type: {
    type: String,
    enum: ['ORDER', 'SYSTEM', 'PROMOTION', 'ALERT', 'INFO'],
    default: 'INFO'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  actionUrl: {
    type: String,
    trim: true
  },
  actionText: {
    type: String,
    trim: true,
    maxlength: [50, 'Action text cannot exceed 50 characters']
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
    default: 'MEDIUM'
  },
  expiresAt: {
    type: Date
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
NotificationSchema.index({ user: 1, createdAt: -1 });
NotificationSchema.index({ user: 1, isRead: 1 });
NotificationSchema.index({ user: 1, type: 1 });
NotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Virtual for time since creation
NotificationSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const diffInSeconds = Math.floor((now - this.createdAt) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
});

// Virtual for isExpired
NotificationSchema.virtual('isExpired').get(function() {
  if (!this.expiresAt) return false;
  return new Date() > this.expiresAt;
});

// Method to mark as read
NotificationSchema.methods.markAsRead = function() {
  this.isRead = true;
  this.readAt = new Date();
  return this.save();
};

// Static method to create notification
NotificationSchema.statics.createNotification = function(data) {
  return this.create({
    user: data.user,
    title: data.title,
    message: data.message,
    type: data.type || 'INFO',
    priority: data.priority || 'MEDIUM',
    actionUrl: data.actionUrl,
    actionText: data.actionText,
    expiresAt: data.expiresAt,
    metadata: data.metadata || {}
  });
};

// Static method to get unread count
NotificationSchema.statics.getUnreadCount = function(userId) {
  return this.countDocuments({ user: userId, isRead: false });
};

// Static method to mark all as read
NotificationSchema.statics.markAllAsRead = function(userId) {
  return this.updateMany(
    { user: userId, isRead: false },
    { isRead: true, readAt: new Date() }
  );
};

// Static method to delete expired notifications
NotificationSchema.statics.deleteExpired = function() {
  return this.deleteMany({
    expiresAt: { $lt: new Date() }
  });
};

// Static method to get recent notifications
NotificationSchema.statics.getRecent = function(userId, limit = 10) {
  return this.find({ user: userId })
    .sort('-createdAt')
    .limit(limit);
};

module.exports = mongoose.model('Notification', NotificationSchema);
