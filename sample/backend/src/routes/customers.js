const express = require('express');
const { body, query } = require('express-validator');
const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerOrders,
  getCustomerAnalytics,
  getCustomerPreferences,
  updateCustomerPreferences,
  getCustomerAddresses,
  addCustomerAddress,
  updateCustomerAddress,
  deleteCustomerAddress,
  getCustomerLoyalty,
  updateCustomerLoyalty,
  getCustomerNotes,
  addCustomerNote,
  updateCustomerNote,
  deleteCustomerNote,
  searchCustomers,
  exportCustomers,
  getCustomerStats,
  getCustomerSegments,
  getCustomerInsights
} = require('../controllers/customerController');
const { protect, authorize } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

// Validation rules
const createCustomerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('addresses')
    .optional()
    .isArray()
    .withMessage('Addresses must be an array'),
  body('addresses.*.type')
    .optional()
    .isIn(['HOME', 'WORK', 'OTHER'])
    .withMessage('Address type must be HOME, WORK, or OTHER'),
  body('addresses.*.label')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Address label must be between 1 and 50 characters'),
  body('addresses.*.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
  body('addresses.*.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('addresses.*.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('addresses.*.zipCode')
    .trim()
    .notEmpty()
    .withMessage('Zip code is required'),
  body('addresses.*.country')
    .trim()
    .notEmpty()
    .withMessage('Country is required')
];

const updateCustomerValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Date of birth must be in ISO 8601 format'),
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other', 'prefer_not_to_say'])
    .withMessage('Invalid gender value')
];

const addAddressValidation = [
  body('type')
    .isIn(['HOME', 'WORK', 'OTHER'])
    .withMessage('Address type must be HOME, WORK, or OTHER'),
  body('label')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Address label must be between 1 and 50 characters'),
  body('street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('zipCode')
    .trim()
    .notEmpty()
    .withMessage('Zip code is required'),
  body('country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  body('isDefault')
    .optional()
    .isBoolean()
    .withMessage('isDefault must be a boolean')
];

const updatePreferencesValidation = [
  body('dietaryRestrictions')
    .optional()
    .isArray()
    .withMessage('Dietary restrictions must be an array'),
  body('dietaryRestrictions.*')
    .optional()
    .isIn(['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'nut_free', 'halal', 'kosher'])
    .withMessage('Invalid dietary restriction'),
  body('spiceLevel')
    .optional()
    .isIn(['mild', 'medium', 'hot', 'extra_hot'])
    .withMessage('Spice level must be mild, medium, hot, or extra_hot'),
  body('favoriteItems')
    .optional()
    .isArray()
    .withMessage('Favorite items must be an array'),
  body('favoriteItems.*')
    .optional()
    .isMongoId()
    .withMessage('Invalid menu item ID'),
  body('communicationPreferences')
    .optional()
    .isObject()
    .withMessage('Communication preferences must be an object'),
  body('communicationPreferences.email')
    .optional()
    .isBoolean()
    .withMessage('Email preference must be a boolean'),
  body('communicationPreferences.sms')
    .optional()
    .isBoolean()
    .withMessage('SMS preference must be a boolean'),
  body('communicationPreferences.push')
    .optional()
    .isBoolean()
    .withMessage('Push notification preference must be a boolean')
];

const addNoteValidation = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Note content must be between 1 and 1000 characters'),
  body('type')
    .optional()
    .isIn(['general', 'preference', 'allergy', 'special_request', 'complaint'])
    .withMessage('Note type must be general, preference, allergy, special_request, or complaint'),
  body('isPrivate')
    .optional()
    .isBoolean()
    .withMessage('isPrivate must be a boolean')
];

const customerQueryValidation = [
  query('search')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Search term must be at least 2 characters'),
  query('status')
    .optional()
    .isIn(['active', 'inactive', 'vip', 'new'])
    .withMessage('Invalid status filter'),
  query('loyaltyTier')
    .optional()
    .isIn(['bronze', 'silver', 'gold', 'platinum'])
    .withMessage('Invalid loyalty tier filter'),
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
    .isIn(['name', 'email', 'createdAt', 'lastOrder', 'totalSpent', 'orderCount'])
    .withMessage('Invalid sort parameter'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc')
];

// All routes require authentication
router.use(protect);

// Customer management routes
router.get('/', customerQueryValidation, validateRequest, getCustomers);
router.get('/search', searchCustomers);
router.get('/stats', authorize('owner', 'manager'), getCustomerStats);
router.get('/segments', authorize('owner', 'manager'), getCustomerSegments);
router.get('/insights', authorize('owner', 'manager'), getCustomerInsights);
router.get('/export', authorize('owner', 'manager'), exportCustomers);

router.post('/', authorize('owner', 'manager'), createCustomerValidation, validateRequest, createCustomer);
router.get('/:id', getCustomer);
router.put('/:id', authorize('owner', 'manager'), updateCustomerValidation, validateRequest, updateCustomer);
router.delete('/:id', authorize('owner'), deleteCustomer);

// Customer orders
router.get('/:id/orders', getCustomerOrders);

// Customer analytics
router.get('/:id/analytics', authorize('owner', 'manager'), getCustomerAnalytics);

// Customer preferences
router.get('/:id/preferences', getCustomerPreferences);
router.put('/:id/preferences', authorize('owner', 'manager'), updatePreferencesValidation, validateRequest, updateCustomerPreferences);

// Customer addresses
router.get('/:id/addresses', getCustomerAddresses);
router.post('/:id/addresses', authorize('owner', 'manager'), addAddressValidation, validateRequest, addCustomerAddress);
router.put('/:id/addresses/:addressId', authorize('owner', 'manager'), addAddressValidation, validateRequest, updateCustomerAddress);
router.delete('/:id/addresses/:addressId', authorize('owner', 'manager'), deleteCustomerAddress);

// Customer loyalty
router.get('/:id/loyalty', getCustomerLoyalty);
router.put('/:id/loyalty', authorize('owner', 'manager'), updateCustomerLoyalty);

// Customer notes
router.get('/:id/notes', getCustomerNotes);
router.post('/:id/notes', authorize('owner', 'manager'), addNoteValidation, validateRequest, addCustomerNote);
router.put('/:id/notes/:noteId', authorize('owner', 'manager'), addNoteValidation, validateRequest, updateCustomerNote);
router.delete('/:id/notes/:noteId', authorize('owner', 'manager'), deleteCustomerNote);

module.exports = router;


