const express = require('express');
const { body } = require('express-validator');
const {
  getRestaurantProfile,
  updateRestaurantProfile,
  updateOnlineStatus,
  uploadRestaurantImage,
  updateOperatingHours,
  updateSettings,
  getRestaurantStats,
  updateContactInfo,
  updateAddress,
  getRestaurantImages,
  deleteRestaurantImage,
  updateRestaurantSettings,
  getRestaurantAnalytics,
  updateDeliverySettings,
  updatePaymentSettings
} = require('../controllers/profileController');
const { protect, authorize } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');
const { upload } = require('../middleware/upload');

const router = express.Router();

// Validation rules
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Restaurant name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('cuisine')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Cuisine must be between 2 and 50 characters'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Each tag must be between 1 and 20 characters')
];

const updateContactValidation = [
  body('phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('website')
    .optional()
    .isURL()
    .withMessage('Website must be a valid URL')
];

const updateAddressValidation = [
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
  body('coordinates.lat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  body('coordinates.lng')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180')
];

const updateHoursValidation = [
  body('monday.open')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM)'),
  body('monday.close')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM)'),
  body('monday.isOpen')
    .isBoolean()
    .withMessage('isOpen must be a boolean'),
  body('tuesday.open')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM)'),
  body('tuesday.close')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM)'),
  body('tuesday.isOpen')
    .isBoolean()
    .withMessage('isOpen must be a boolean'),
  body('wednesday.open')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM)'),
  body('wednesday.close')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM)'),
  body('wednesday.isOpen')
    .isBoolean()
    .withMessage('isOpen must be a boolean'),
  body('thursday.open')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM)'),
  body('thursday.close')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM)'),
  body('thursday.isOpen')
    .isBoolean()
    .withMessage('isOpen must be a boolean'),
  body('friday.open')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM)'),
  body('friday.close')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM)'),
  body('friday.isOpen')
    .isBoolean()
    .withMessage('isOpen must be a boolean'),
  body('saturday.open')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM)'),
  body('saturday.close')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM)'),
  body('saturday.isOpen')
    .isBoolean()
    .withMessage('isOpen must be a boolean'),
  body('sunday.open')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM)'),
  body('sunday.close')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM)'),
  body('sunday.isOpen')
    .isBoolean()
    .withMessage('isOpen must be a boolean')
];

const updateSettingsValidation = [
  body('autoAcceptOrders')
    .isBoolean()
    .withMessage('autoAcceptOrders must be a boolean'),
  body('maxPreparationTime')
    .isInt({ min: 5, max: 120 })
    .withMessage('Max preparation time must be between 5 and 120 minutes'),
  body('minOrderAmount')
    .isFloat({ min: 0 })
    .withMessage('Minimum order amount must be a positive number'),
  body('deliveryRadius')
    .isFloat({ min: 0, max: 50 })
    .withMessage('Delivery radius must be between 0 and 50 km'),
  body('deliveryFee')
    .isFloat({ min: 0 })
    .withMessage('Delivery fee must be a positive number'),
  body('freeDeliveryThreshold')
    .isFloat({ min: 0 })
    .withMessage('Free delivery threshold must be a positive number')
];

const updateDeliverySettingsValidation = [
  body('deliveryRadius')
    .isFloat({ min: 0, max: 50 })
    .withMessage('Delivery radius must be between 0 and 50 km'),
  body('deliveryFee')
    .isFloat({ min: 0 })
    .withMessage('Delivery fee must be a positive number'),
  body('freeDeliveryThreshold')
    .isFloat({ min: 0 })
    .withMessage('Free delivery threshold must be a positive number'),
  body('deliveryTime')
    .isInt({ min: 15, max: 120 })
    .withMessage('Delivery time must be between 15 and 120 minutes'),
  body('allowPickup')
    .isBoolean()
    .withMessage('allowPickup must be a boolean'),
  body('allowDelivery')
    .isBoolean()
    .withMessage('allowDelivery must be a boolean')
];

const updatePaymentSettingsValidation = [
  body('acceptCash')
    .isBoolean()
    .withMessage('acceptCash must be a boolean'),
  body('acceptCard')
    .isBoolean()
    .withMessage('acceptCard must be a boolean'),
  body('acceptOnline')
    .isBoolean()
    .withMessage('acceptOnline must be a boolean'),
  body('paymentMethods')
    .isArray()
    .withMessage('Payment methods must be an array'),
  body('paymentMethods.*')
    .isIn(['cash', 'card', 'upi', 'wallet', 'netbanking'])
    .withMessage('Invalid payment method')
];

// All routes require authentication
router.use(protect);

// Restaurant profile routes
router.get('/restaurant', getRestaurantProfile);
router.put('/restaurant', authorize('owner', 'manager'), updateProfileValidation, validateRequest, updateRestaurantProfile);
router.put('/restaurant/online-status', authorize('owner', 'manager'), updateOnlineStatus);
router.post('/restaurant/image', authorize('owner', 'manager'), upload.single('image'), uploadRestaurantImage);
router.get('/restaurant/images', getRestaurantImages);
router.delete('/restaurant/images/:imageId', authorize('owner', 'manager'), deleteRestaurantImage);

// Contact and address
router.put('/restaurant/contact', authorize('owner', 'manager'), updateContactValidation, validateRequest, updateContactInfo);
router.put('/restaurant/address', authorize('owner', 'manager'), updateAddressValidation, validateRequest, updateAddress);

// Operating hours
router.put('/restaurant/hours', authorize('owner', 'manager'), updateHoursValidation, validateRequest, updateOperatingHours);

// Settings
router.put('/restaurant/settings', authorize('owner', 'manager'), updateSettingsValidation, validateRequest, updateSettings);
router.put('/restaurant/delivery-settings', authorize('owner', 'manager'), updateDeliverySettingsValidation, validateRequest, updateDeliverySettings);
router.put('/restaurant/payment-settings', authorize('owner', 'manager'), updatePaymentSettingsValidation, validateRequest, updatePaymentSettings);

// Analytics and stats
router.get('/restaurant/stats', getRestaurantStats);
router.get('/restaurant/analytics', authorize('owner', 'manager'), getRestaurantAnalytics);

module.exports = router;
