const express = require('express');
const { body, query } = require('express-validator');
const {
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
} = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

// Validation rules
const updateFCMTokenValidation = [
  body('fcmToken')
    .trim()
    .notEmpty()
    .withMessage('FCM token is required'),
  body('deviceType')
    .optional()
    .isIn(['android', 'ios', 'web'])
    .withMessage('Device type must be android, ios, or web')
];

const updateSettingsValidation = [
  body('email')
    .isBoolean()
    .withMessage('Email preference must be a boolean'),
  body('push')
    .isBoolean()
    .withMessage('Push notification preference must be a boolean'),
  body('sms')
    .isBoolean()
    .withMessage('SMS preference must be a boolean'),
  body('orderUpdates')
    .isBoolean()
    .withMessage('Order updates preference must be a boolean'),
  body('promotions')
    .isBoolean()
    .withMessage('Promotions preference must be a boolean'),
  body('newsletter')
    .isBoolean()
    .withMessage('Newsletter preference must be a boolean'),
  body('quietHours')
    .optional()
    .isObject()
    .withMessage('Quiet hours must be an object'),
  body('quietHours.enabled')
    .optional()
    .isBoolean()
    .withMessage('Quiet hours enabled must be a boolean'),
  body('quietHours.start')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Quiet hours start time must be in HH:MM format'),
  body('quietHours.end')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Quiet hours end time must be in HH:MM format')
];

const sendNotificationValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('message')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Message must be between 1 and 500 characters'),
  body('type')
    .isIn(['order_update', 'promotion', 'announcement', 'reminder', 'custom'])
    .withMessage('Type must be order_update, promotion, announcement, reminder, or custom'),
  body('recipients')
    .optional()
    .isArray()
    .withMessage('Recipients must be an array'),
  body('recipients.*')
    .optional()
    .isMongoId()
    .withMessage('Invalid recipient ID'),
  body('scheduledAt')
    .optional()
    .isISO8601()
    .withMessage('Scheduled time must be in ISO 8601 format'),
  body('data')
    .optional()
    .isObject()
    .withMessage('Data must be an object')
];

const createTemplateValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Template name must be between 1 and 100 characters'),
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('message')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Message must be between 1 and 500 characters'),
  body('type')
    .isIn(['order_update', 'promotion', 'announcement', 'reminder', 'custom'])
    .withMessage('Type must be order_update, promotion, announcement, reminder, or custom'),
  body('variables')
    .optional()
    .isArray()
    .withMessage('Variables must be an array'),
  body('variables.*')
    .optional()
    .isString()
    .withMessage('Variable must be a string'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

const notificationQueryValidation = [
  query('type')
    .optional()
    .isIn(['order_update', 'promotion', 'announcement', 'reminder', 'custom', 'all'])
    .withMessage('Invalid notification type'),
  query('read')
    .optional()
    .isBoolean()
    .withMessage('Read filter must be a boolean'),
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
    .isIn(['createdAt', 'readAt', 'type', 'priority'])
    .withMessage('Invalid sort parameter'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc')
];

// All routes require authentication
router.use(protect);

// Notification management routes
router.get('/', notificationQueryValidation, validateRequest, getNotifications);
// router.get('/stats', authorize('owner', 'manager'), getNotificationStats);
// router.get('/history', authorize('owner', 'manager'), getNotificationHistory);

router.get('/:id', getNotification);
router.put('/:id/read', markAsRead);
router.put('/read-all', markAllAsRead);
router.delete('/:id', deleteNotification);
router.delete('/', deleteAllNotifications);

// FCM token management
router.put('/fcm-token', updateFCMTokenValidation, validateRequest, updateFCMToken);

// Notification settings
router.get('/settings', getNotificationSettings);
router.put('/settings', updateSettingsValidation, validateRequest, updateNotificationSettings);

// Admin notification management (owner/manager only)
router.post('/send', authorize('owner', 'manager'), sendNotificationValidation, validateRequest, sendNotification);
router.post('/test', authorize('owner', 'manager'), sendNotificationValidation, validateRequest, testNotification);

// Notification templates (owner/manager only)
router.get('/templates', authorize('owner', 'manager'), getNotificationTemplates);
router.post('/templates', authorize('owner', 'manager'), createTemplateValidation, validateRequest, createNotificationTemplate);
router.put('/templates/:id', authorize('owner', 'manager'), createTemplateValidation, validateRequest, updateNotificationTemplate);
router.delete('/templates/:id', authorize('owner', 'manager'), deleteNotificationTemplate);

module.exports = router;
