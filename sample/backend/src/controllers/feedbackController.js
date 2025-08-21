const Feedback = require('../models/Feedback');
const Order = require('../models/Order');
const { validationResult } = require('express-validator');

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Private
const getFeedback = async (req, res) => {
  try {
    const { page = 1, limit = 10, rating, status } = req.query;
    
    const query = { restaurant: req.user.restaurant };
    if (rating) query.rating = parseInt(rating);
    if (status) query.status = status;

    const feedback = await Feedback.find(query)
      .populate('customer', 'name email')
      .populate('order', 'orderNumber')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Feedback.countDocuments(query);

    res.status(200).json({
      success: true,
      data: feedback,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalFeedback: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get single feedback
// @route   GET /api/feedback/:id
// @access  Private
const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('order', 'orderNumber items');

    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }

    if (feedback.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this feedback'
      });
    }

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Get feedback by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Create feedback
// @route   POST /api/feedback
// @access  Private
const createFeedback = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { orderId, rating, comment, category } = req.body;

    // Check if order exists and belongs to restaurant
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    if (order.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to create feedback for this order'
      });
    }

    const feedback = await Feedback.create({
      order: orderId,
      customer: order.customer,
      restaurant: req.user.restaurant,
      rating,
      comment,
      category: category || 'GENERAL',
      status: 'PENDING'
    });

    res.status(201).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Create feedback error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update feedback status
// @route   PUT /api/feedback/:id/status
// @access  Private
const updateFeedbackStatus = async (req, res) => {
  try {
    const { status, response } = req.body;

    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }

    if (feedback.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this feedback'
      });
    }

    feedback.status = status;
    if (response) {
      feedback.response = response;
      feedback.respondedAt = new Date();
      feedback.respondedBy = req.user._id;
    }

    await feedback.save();

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Update feedback status error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get feedback analytics
// @route   GET /api/feedback/analytics
// @access  Private
const getFeedbackAnalytics = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let startDate = new Date();
    switch (period) {
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(startDate.getMonth() - 1);
    }

    const analytics = await Feedback.aggregate([
      {
        $match: {
          restaurant: req.user.restaurant,
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalFeedback: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          ratingDistribution: {
            $push: '$rating'
          }
        }
      }
    ]);

    const statusCounts = await Feedback.aggregate([
      {
        $match: {
          restaurant: req.user.restaurant,
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      period,
      totalFeedback: analytics[0]?.totalFeedback || 0,
      averageRating: analytics[0]?.averageRating || 0,
      statusBreakdown: statusCounts.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    };

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get feedback analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Private
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }

    if (feedback.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this feedback'
      });
    }

    await Feedback.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully'
    });
  } catch (error) {
    console.error('Delete feedback error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get reviews
// @route   GET /api/feedback/reviews
// @access  Private
const getReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10, rating, status } = req.query;
    
    const query = { restaurant: req.user.restaurant, category: { $ne: 'COMPLAINT' } };
    if (rating) query.rating = parseInt(rating);
    if (status) query.status = status;

    const feedback = await Feedback.find(query)
      .populate('customer', 'name email')
      .populate('order', 'orderNumber')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Feedback.countDocuments(query);

    res.status(200).json({
      success: true,
      data: feedback,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalFeedback: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get single review
// @route   GET /api/feedback/reviews/:id
// @access  Private
const getReview = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('order', 'orderNumber items');

    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    if (feedback.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this review'
      });
    }

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Get review error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Reply to review
// @route   POST /api/feedback/reviews/:id/reply
// @access  Private
const replyToReview = async (req, res) => {
  try {
    const { reply } = req.body;

    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    if (feedback.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to reply to this review'
      });
    }

    feedback.response = reply;
    feedback.respondedAt = new Date();
    feedback.respondedBy = req.user._id;
    feedback.status = 'RESOLVED';

    await feedback.save();

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Reply to review error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update review status
// @route   PUT /api/feedback/reviews/:id/status
// @access  Private
const updateReviewStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    if (feedback.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this review'
      });
    }

    feedback.status = status;
    if (notes) {
      feedback.response = notes;
      feedback.respondedAt = new Date();
      feedback.respondedBy = req.user._id;
    }

    await feedback.save();

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Update review status error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get complaints
// @route   GET /api/feedback/complaints
// @access  Private
const getComplaints = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = { restaurant: req.user.restaurant, category: 'COMPLAINT' };
    if (status) query.status = status;

    const feedback = await Feedback.find(query)
      .populate('customer', 'name email')
      .populate('order', 'orderNumber')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Feedback.countDocuments(query);

    res.status(200).json({
      success: true,
      data: feedback,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalFeedback: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get complaints error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get single complaint
// @route   GET /api/feedback/complaints/:id
// @access  Private
const getComplaint = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('order', 'orderNumber items');

    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Complaint not found'
      });
    }

    if (feedback.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this complaint'
      });
    }

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Get complaint error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Reply to complaint
// @route   POST /api/feedback/complaints/:id/reply
// @access  Private
const replyToComplaint = async (req, res) => {
  try {
    const { reply } = req.body;

    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Complaint not found'
      });
    }

    if (feedback.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to reply to this complaint'
      });
    }

    feedback.response = reply;
    feedback.respondedAt = new Date();
    feedback.respondedBy = req.user._id;
    feedback.status = 'RESOLVED';

    await feedback.save();

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Reply to complaint error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update complaint status
// @route   PUT /api/feedback/complaints/:id/status
// @access  Private
const updateComplaintStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Complaint not found'
      });
    }

    if (feedback.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this complaint'
      });
    }

    feedback.status = status;
    if (notes) {
      feedback.response = notes;
      feedback.respondedAt = new Date();
      feedback.respondedBy = req.user._id;
    }

    await feedback.save();

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Update complaint status error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get customer feedback
// @route   GET /api/feedback/customer/:customerId
// @access  Private
const getCustomerFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({
      customer: req.params.customerId,
      restaurant: req.user.restaurant
    })
      .populate('order', 'orderNumber')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Get customer feedback error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Mark review as helpful
// @route   PUT /api/feedback/reviews/:id/helpful
// @access  Private
const markReviewAsHelpful = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    await feedback.markHelpful(req.user._id);

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Mark review as helpful error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Report review
// @route   POST /api/feedback/reviews/:id/report
// @access  Private
const reportReview = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Review reported successfully'
    });
  } catch (error) {
    console.error('Report review error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get feedback stats
// @route   GET /api/feedback/stats
// @access  Private
const getFeedbackStats = async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      {
        $match: { restaurant: req.user.restaurant }
      },
      {
        $group: {
          _id: null,
          totalFeedback: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: { $cond: [{ $ne: ['$category', 'COMPLAINT'] }, 1, 0] } },
          totalComplaints: { $sum: { $cond: [{ $eq: ['$category', 'COMPLAINT'] }, 1, 0] } }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || { totalFeedback: 0, averageRating: 0, totalReviews: 0, totalComplaints: 0 }
    });
  } catch (error) {
    console.error('Get feedback stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Export feedback
// @route   GET /api/feedback/export
// @access  Private
const exportFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ restaurant: req.user.restaurant })
      .populate('customer', 'name email')
      .populate('order', 'orderNumber')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Export feedback error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get feedback settings
// @route   GET /api/feedback/settings
// @access  Private
const getFeedbackSettings = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        autoReply: false,
        autoReplyMessage: '',
        notificationEmail: '',
        responseTimeLimit: 24,
        requireModeration: false,
        minRatingForAutoApproval: 4
      }
    });
  } catch (error) {
    console.error('Get feedback settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update feedback settings
// @route   PUT /api/feedback/settings
// @access  Private
const updateFeedbackSettings = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Feedback settings updated successfully'
    });
  } catch (error) {
    console.error('Update feedback settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

module.exports = {
  getReviews,
  getReview,
  replyToReview,
  updateReviewStatus,
  getComplaints,
  getComplaint,
  updateComplaintStatus,
  replyToComplaint,
  getFeedbackAnalytics,
  getFeedbackStats,
  exportFeedback,
  getCustomerFeedback,
  markReviewAsHelpful,
  reportReview,
  getFeedbackSettings,
  updateFeedbackSettings
};
