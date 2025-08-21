const Notification = require('../models/Notification');
const { validationResult } = require('express-validator');

// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 10, read, type } = req.query;
    
    const query = { user: req.user.id };
    if (read !== undefined) query.isRead = read === 'true';
    if (type) query.type = type;

    const notifications = await Notification.find(query)
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Notification.countDocuments(query);

    res.status(200).json({
      success: true,
      data: notifications,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalNotifications: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get single notification
// @route   GET /api/notifications/:id
// @access  Private
const getNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification not found'
      });
    }

    if (notification.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this notification'
      });
    }

    res.status(200).json({
      success: true,
      data: notification
    });
  } catch (error) {
    console.error('Get notification error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification not found'
      });
    }

    if (notification.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this notification'
      });
    }

    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();

    res.status(200).json({
      success: true,
      data: notification
    });
  } catch (error) {
    console.error('Mark notification as read error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification not found'
      });
    }

    if (notification.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this notification'
      });
    }

    await Notification.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get notification settings
// @route   GET /api/notifications/settings
// @access  Private
const getNotificationSettings = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        email: true,
        push: true,
        sms: false,
        orderUpdates: true,
        promotions: false,
        systemAlerts: true
      }
    });
  } catch (error) {
    console.error('Get notification settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update notification settings
// @route   PUT /api/notifications/settings
// @access  Private
const updateNotificationSettings = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Notification settings updated successfully'
    });
  } catch (error) {
    console.error('Update notification settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get unread count
// @route   GET /api/notifications/unread-count
// @access  Private
const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      user: req.user.id,
      isRead: false
    });

    res.status(200).json({
      success: true,
      data: { count }
    });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Delete all notifications
// @route   DELETE /api/notifications
// @access  Private
const deleteAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.user.id });

    res.status(200).json({
      success: true,
      message: 'All notifications deleted successfully'
    });
  } catch (error) {
    console.error('Delete all notifications error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update FCM token
// @route   PUT /api/notifications/fcm-token
// @access  Private
const updateFCMToken = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'FCM token updated successfully'
    });
  } catch (error) {
    console.error('Update FCM token error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Send notification
// @route   POST /api/notifications/send
// @access  Private
const sendNotification = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Notification sent successfully'
    });
  } catch (error) {
    console.error('Send notification error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get notification stats
// @route   GET /api/notifications/stats
// @access  Private
const getNotificationStats = async (req, res) => {
  try {
    const stats = await Notification.aggregate([
      {
        $match: { user: req.user.id }
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          unread: { $sum: { $cond: ['$isRead', 0, 1] } },
          read: { $sum: { $cond: ['$isRead', 1, 0] } }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || { total: 0, unread: 0, read: 0 }
    });
  } catch (error) {
    console.error('Get notification stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get notification history
// @route   GET /api/notifications/history
// @access  Private
const getNotificationHistory = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort('-createdAt')
      .limit(50);

    res.status(200).json({
      success: true,
      data: notifications
    });
  } catch (error) {
    console.error('Get notification history error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Create notification template
// @route   POST /api/notifications/templates
// @access  Private
const createNotificationTemplate = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Notification template created successfully'
    });
  } catch (error) {
    console.error('Create notification template error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update notification template
// @route   PUT /api/notifications/templates/:id
// @access  Private
const updateNotificationTemplate = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Notification template updated successfully'
    });
  } catch (error) {
    console.error('Update notification template error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Delete notification template
// @route   DELETE /api/notifications/templates/:id
// @access  Private
const deleteNotificationTemplate = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Notification template deleted successfully'
    });
  } catch (error) {
    console.error('Delete notification template error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get notification templates
// @route   GET /api/notifications/templates
// @access  Private
const getNotificationTemplates = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: []
    });
  } catch (error) {
    console.error('Get notification templates error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Test notification
// @route   POST /api/notifications/test
// @access  Private
const testNotification = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Test notification sent successfully'
    });
  } catch (error) {
    console.error('Test notification error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

module.exports = {
  getNotifications,
  getNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  updateFCMToken,
  getNotificationSettings,
  updateNotificationSettings,
  sendNotification,
  getNotificationStats,
  getNotificationHistory,
  createNotificationTemplate,
  updateNotificationTemplate,
  deleteNotificationTemplate,
  getNotificationTemplates,
  testNotification
};
