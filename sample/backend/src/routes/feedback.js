const express = require('express');
const { body, query } = require('express-validator');
const {
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
} = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

// Validation rules
const replyValidation = [
  body('reply')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Reply must be between 10 and 1000 characters')
];

const updateStatusValidation = [
  body('status')
    .isIn(['pending', 'resolved', 'escalated', 'closed'])
    .withMessage('Status must be pending, resolved, escalated, or closed'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters')
];

const feedbackQueryValidation = [
  query('type')
    .optional()
    .isIn(['reviews', 'complaints', 'all'])
    .withMessage('Type must be reviews, complaints, or all'),
  query('status')
    .optional()
    .isIn(['pending', 'resolved', 'escalated', 'closed'])
    .withMessage('Invalid status filter'),
  query('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be in ISO 8601 format'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be in ISO 8601 format'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('sortBy')
    .optional()
    .isIn(['date', 'rating', 'status', 'customer'])
    .withMessage('Invalid sort parameter'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc')
];

const updateSettingsValidation = [
  body('autoReply')
    .isBoolean()
    .withMessage('autoReply must be a boolean'),
  body('autoReplyMessage')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Auto reply message cannot exceed 500 characters'),
  body('notificationEmail')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('responseTimeLimit')
    .optional()
    .isInt({ min: 1, max: 72 })
    .withMessage('Response time limit must be between 1 and 72 hours'),
  body('requireModeration')
    .isBoolean()
    .withMessage('requireModeration must be a boolean'),
  body('minRatingForAutoApproval')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Minimum rating must be between 1 and 5')
];

// All routes require authentication
router.use(protect);

// Reviews routes
router.get('/reviews', feedbackQueryValidation, validateRequest, getReviews);
router.get('/reviews/:id', getReview);
router.post('/reviews/:id/reply', authorize('owner', 'manager'), replyValidation, validateRequest, replyToReview);
router.put('/reviews/:id/status', authorize('owner', 'manager'), updateStatusValidation, validateRequest, updateReviewStatus);
router.put('/reviews/:id/helpful', markReviewAsHelpful);
router.post('/reviews/:id/report', reportReview);

// Complaints routes
router.get('/complaints', feedbackQueryValidation, validateRequest, getComplaints);
router.get('/complaints/:id', getComplaint);
router.post('/complaints/:id/reply', authorize('owner', 'manager'), replyValidation, validateRequest, replyToComplaint);
router.put('/complaints/:id/status', authorize('owner', 'manager'), updateStatusValidation, validateRequest, updateComplaintStatus);

// Customer feedback
router.get('/customer/:customerId', getCustomerFeedback);

// Analytics and stats (owner/manager only)
router.get('/analytics', authorize('owner', 'manager'), getFeedbackAnalytics);
router.get('/stats', authorize('owner', 'manager'), getFeedbackStats);
router.get('/export', authorize('owner', 'manager'), exportFeedback);

// Settings (owner only)
router.get('/settings', authorize('owner'), getFeedbackSettings);
router.put('/settings', authorize('owner'), updateSettingsValidation, validateRequest, updateFeedbackSettings);

module.exports = router;
