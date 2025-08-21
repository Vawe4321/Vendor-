const express = require('express');
const { body, query } = require('express-validator');
const {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
  togglePopular,
  getPopularItems,
  getRecommendedItems,
  searchMenuItems,
  getMenuCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
  getMenuAnalytics,
  bulkUpdateItems,
  importMenuItems,
  exportMenuItems
} = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');
const { upload } = require('../middleware/upload');

const router = express.Router();

// Validation rules
const createMenuItemValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('category')
    .isMongoId()
    .withMessage('Valid category ID is required'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('originalPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Original price must be a positive number'),
  body('dietaryInfo.isVeg')
    .isBoolean()
    .withMessage('Vegetarian status is required'),
  body('dietaryInfo.isSpicy')
    .isBoolean()
    .withMessage('Spicy status is required'),
  body('dietaryInfo.spiceLevel')
    .optional()
    .isInt({ min: 0, max: 5 })
    .withMessage('Spice level must be between 0 and 5'),
  body('preparation.time')
    .isInt({ min: 1, max: 120 })
    .withMessage('Preparation time must be between 1 and 120 minutes'),
  body('availability.isAvailable')
    .isBoolean()
    .withMessage('Availability status is required'),
  body('availability.stockQuantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock quantity must be a positive number')
];

const updateMenuItemValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('dietaryInfo.spiceLevel')
    .optional()
    .isInt({ min: 0, max: 5 })
    .withMessage('Spice level must be between 0 and 5'),
  body('preparation.time')
    .optional()
    .isInt({ min: 1, max: 120 })
    .withMessage('Preparation time must be between 1 and 120 minutes'),
  body('availability.stockQuantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock quantity must be a positive number')
];

const createCategoryValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category name must be between 2 and 50 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Description cannot exceed 200 characters'),
  body('displayOrder')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Display order must be a positive integer')
];

const updateCategoryValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category name must be between 2 and 50 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Description cannot exceed 200 characters'),
  body('displayOrder')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Display order must be a positive integer')
];

const menuQueryValidation = [
  query('category')
    .optional()
    .isMongoId()
    .withMessage('Invalid category ID'),
  query('search')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Search term must be at least 2 characters'),
  query('isVeg')
    .optional()
    .isBoolean()
    .withMessage('Invalid vegetarian filter'),
  query('isSpicy')
    .optional()
    .isBoolean()
    .withMessage('Invalid spicy filter'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Invalid minimum price'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Invalid maximum price'),
  query('available')
    .optional()
    .isBoolean()
    .withMessage('Invalid availability filter'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

const bulkUpdateValidation = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one item is required'),
  body('items.*.id')
    .isMongoId()
    .withMessage('Valid item ID is required'),
  body('updates')
    .isObject()
    .withMessage('Updates object is required')
];

// All routes require authentication
router.use(protect);

// Menu items routes
router.get('/items', menuQueryValidation, validateRequest, getMenuItems);
router.get('/items/popular', getPopularItems);
router.get('/items/recommended', getRecommendedItems);
router.get('/items/search', searchMenuItems);
router.get('/items/:id', getMenuItem);
router.get('/analytics', authorize('owner', 'manager'), getMenuAnalytics);
router.get('/export', authorize('owner', 'manager'), exportMenuItems);

// Menu item management (owner/manager only)
router.post('/items', authorize('owner', 'manager'), upload.array('images', 5), createMenuItemValidation, validateRequest, createMenuItem);
router.put('/items/:id', authorize('owner', 'manager'), upload.array('images', 5), updateMenuItemValidation, validateRequest, updateMenuItem);
router.delete('/items/:id', authorize('owner', 'manager'), deleteMenuItem);
router.put('/items/:id/availability', authorize('owner', 'manager'), toggleAvailability);
router.put('/items/:id/popular', authorize('owner', 'manager'), togglePopular);

// Bulk operations (owner/manager only)
router.put('/items/bulk-update', authorize('owner', 'manager'), bulkUpdateValidation, validateRequest, bulkUpdateItems);
router.post('/items/import', authorize('owner', 'manager'), upload.single('file'), importMenuItems);

// Categories routes
router.get('/categories', getMenuCategories);
router.post('/categories', authorize('owner', 'manager'), createCategoryValidation, validateRequest, createCategory);
router.put('/categories/:id', authorize('owner', 'manager'), updateCategoryValidation, validateRequest, updateCategory);
router.delete('/categories/:id', authorize('owner', 'manager'), deleteCategory);
router.put('/categories/reorder', authorize('owner', 'manager'), reorderCategories);

module.exports = router;
