const express = require('express');
const { body, query } = require('express-validator');
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  acceptOrder,
  rejectOrder,
  startPreparing,
  markAsReady,
  markOutForDelivery,
  markAsDelivered,
  cancelOrder,
  getOrderStats,
  getOrderAnalytics,
  updateOrderNotes,
  assignDeliveryPartner,
  getOrderHistory,
  exportOrders
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

// Validation rules
const createOrderValidation = [
  body('customerId')
    .isMongoId()
    .withMessage('Valid customer ID is required'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one item is required'),
  body('items.*.menuItemId')
    .isMongoId()
    .withMessage('Valid menu item ID is required'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('deliveryAddress')
    .isObject()
    .withMessage('Delivery address is required'),
  body('deliveryAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
  body('deliveryAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('orderType')
    .isIn(['delivery', 'pickup'])
    .withMessage('Order type must be delivery or pickup'),
  body('paymentMethod')
    .isIn(['cash', 'card', 'online'])
    .withMessage('Payment method must be cash, card, or online')
];

const updateStatusValidation = [
  body('status')
    .isIn(['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'])
    .withMessage('Invalid status'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters')
];

const orderQueryValidation = [
  query('status')
    .optional()
    .isIn(['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'])
    .withMessage('Invalid status filter'),
  query('dateFrom')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
  query('dateTo')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

const assignDeliveryValidation = [
  body('deliveryPartnerId')
    .isMongoId()
    .withMessage('Valid delivery partner ID is required'),
  body('estimatedDeliveryTime')
    .optional()
    .isISO8601()
    .withMessage('Invalid estimated delivery time format')
];

// All routes require authentication
router.use(protect);

// Order management routes
router.get('/', orderQueryValidation, validateRequest, getOrders);
router.get('/stats', getOrderStats);
router.get('/analytics', getOrderAnalytics);
router.get('/history', getOrderHistory);
router.get('/export', authorize('owner', 'manager'), exportOrders);
router.get('/:id', getOrder);

// Order creation and updates
router.post('/', authorize('owner', 'manager'), createOrderValidation, validateRequest, createOrder);
router.put('/:id/status', updateStatusValidation, validateRequest, updateOrderStatus);
router.put('/:id/notes', updateOrderNotes);

// Order workflow routes
router.put('/:id/accept', authorize('owner', 'manager'), acceptOrder);
router.put('/:id/reject', authorize('owner', 'manager'), rejectOrder);
router.put('/:id/start-preparing', authorize('owner', 'manager', 'staff'), startPreparing);
router.put('/:id/mark-ready', authorize('owner', 'manager', 'staff'), markAsReady);
router.put('/:id/out-for-delivery', authorize('owner', 'manager'), markOutForDelivery);
router.put('/:id/mark-delivered', authorize('owner', 'manager'), markAsDelivered);
router.put('/:id/cancel', authorize('owner', 'manager'), cancelOrder);

// Delivery management
router.put('/:id/assign-delivery', authorize('owner', 'manager'), assignDeliveryValidation, validateRequest, assignDeliveryPartner);

module.exports = router;
