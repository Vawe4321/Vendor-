const express = require('express');
const { query } = require('express-validator');
const {
  getDashboardAnalytics,
  getRevenueAnalytics,
  getOrderAnalytics,
  getTopItems,
  getCustomerAnalytics,
  getHourlyDistribution,
  getPerformanceMetrics,
  getSalesReport,
  getInventoryAnalytics,
  getDeliveryAnalytics,
  getCustomerInsights,
  getTrendAnalysis,
  exportAnalytics
} = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

// Validation rules
const analyticsQueryValidation = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be in ISO 8601 format'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be in ISO 8601 format'),
  query('period')
    .optional()
    .isIn(['daily', 'weekly', 'monthly', 'yearly'])
    .withMessage('Period must be daily, weekly, monthly, or yearly'),
  query('groupBy')
    .optional()
    .isIn(['hour', 'day', 'week', 'month', 'category', 'item'])
    .withMessage('Invalid group by parameter'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

const reportQueryValidation = [
  query('startDate')
    .isISO8601()
    .withMessage('Start date is required and must be in ISO 8601 format'),
  query('endDate')
    .isISO8601()
    .withMessage('End date is required and must be in ISO 8601 format'),
  query('type')
    .isIn(['sales', 'orders', 'customers', 'inventory', 'delivery'])
    .withMessage('Report type must be sales, orders, customers, inventory, or delivery'),
  query('format')
    .optional()
    .isIn(['json', 'csv', 'pdf'])
    .withMessage('Format must be json, csv, or pdf')
];

// All routes require authentication and owner/manager role
router.use(protect);
router.use(authorize('owner', 'manager'));

// Dashboard analytics
router.get('/dashboard', getDashboardAnalytics);

// Revenue analytics
router.get('/revenue', analyticsQueryValidation, validateRequest, getRevenueAnalytics);

// Order analytics
router.get('/orders', analyticsQueryValidation, validateRequest, getOrderAnalytics);

// Top performing items
router.get('/top-items', analyticsQueryValidation, validateRequest, getTopItems);

// Customer analytics
router.get('/customers', analyticsQueryValidation, validateRequest, getCustomerAnalytics);

// Hourly distribution
router.get('/hourly', analyticsQueryValidation, validateRequest, getHourlyDistribution);

// Performance metrics
router.get('/performance', analyticsQueryValidation, validateRequest, getPerformanceMetrics);

// Sales reports
router.get('/sales-report', reportQueryValidation, validateRequest, getSalesReport);

// Inventory analytics
router.get('/inventory', analyticsQueryValidation, validateRequest, getInventoryAnalytics);

// Delivery analytics
router.get('/delivery', analyticsQueryValidation, validateRequest, getDeliveryAnalytics);

// Customer insights
router.get('/customer-insights', analyticsQueryValidation, validateRequest, getCustomerInsights);

// Trend analysis
router.get('/trends', analyticsQueryValidation, validateRequest, getTrendAnalysis);

// Export analytics
router.get('/export', analyticsQueryValidation, validateRequest, exportAnalytics);

module.exports = router;
