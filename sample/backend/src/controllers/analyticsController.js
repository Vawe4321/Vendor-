const Analytics = require('../models/Analytics');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const Customer = require('../models/Customer');

// @desc    Get overall analytics
// @route   GET /api/analytics/overview
// @access  Private
const getOverview = async (req, res) => {
  try {
    const { period = 'today' } = req.query;
    
    let startDate = new Date();
    let endDate = new Date();

    switch (period) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      default:
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
    }

    const analytics = await Analytics.getSummary(req.user.restaurant, period);

    res.status(200).json({
      success: true,
      data: analytics[0] || {
        totalOrders: 0,
        totalRevenue: 0,
        totalCustomers: 0,
        averageRating: 0
      }
    });
  } catch (error) {
    console.error('Get overview error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get revenue analytics
// @route   GET /api/analytics/revenue
// @access  Private
const getRevenueAnalytics = async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    
    let startDate = new Date();
    let endDate = new Date();

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
        startDate.setDate(startDate.getDate() - 7);
    }

    const revenueData = await Order.aggregate([
      {
        $match: {
          restaurant: req.user.restaurant,
          createdAt: { $gte: startDate, $lte: endDate },
          status: 'DELIVERED'
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          revenue: { $sum: '$pricing.total' },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: revenueData
    });
  } catch (error) {
    console.error('Get revenue analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get order analytics
// @route   GET /api/analytics/orders
// @access  Private
const getOrderAnalytics = async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    
    let startDate = new Date();
    let endDate = new Date();

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
        startDate.setDate(startDate.getDate() - 7);
    }

    const orderStats = await Order.aggregate([
      {
        $match: {
          restaurant: req.user.restaurant,
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const orderTrends = await Order.aggregate([
      {
        $match: {
          restaurant: req.user.restaurant,
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        statusBreakdown: orderStats,
        trends: orderTrends
      }
    });
  } catch (error) {
    console.error('Get order analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get top selling items
// @route   GET /api/analytics/top-items
// @access  Private
const getTopItems = async (req, res) => {
  try {
    const { period = 'month', limit = 10 } = req.query;
    
    let startDate = new Date();
    let endDate = new Date();

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

    const topItems = await Order.aggregate([
      {
        $match: {
          restaurant: req.user.restaurant,
          createdAt: { $gte: startDate, $lte: endDate },
          status: 'DELIVERED'
        }
      },
      {
        $unwind: '$items'
      },
      {
        $group: {
          _id: '$items.menuItem',
          name: { $first: '$items.name' },
          quantity: { $sum: '$items.quantity' },
          revenue: { $sum: '$items.totalItemPrice' }
        }
      },
      {
        $sort: { revenue: -1 }
      },
      {
        $limit: parseInt(limit)
      }
    ]);

    res.status(200).json({
      success: true,
      data: topItems
    });
  } catch (error) {
    console.error('Get top items error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get customer analytics
// @route   GET /api/analytics/customers
// @access  Private
const getCustomerAnalytics = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let startDate = new Date();
    let endDate = new Date();

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

    const customerStats = await Order.aggregate([
      {
        $match: {
          restaurant: req.user.restaurant,
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$customer',
          orderCount: { $sum: 1 },
          totalSpent: { $sum: '$pricing.total' }
        }
      },
      {
        $lookup: {
          from: 'customers',
          localField: '_id',
          foreignField: '_id',
          as: 'customerInfo'
        }
      },
      {
        $unwind: '$customerInfo'
      },
      {
        $project: {
          customerId: '$_id',
          customerName: '$customerInfo.name',
          orderCount: 1,
          totalSpent: 1,
          averageOrderValue: { $divide: ['$totalSpent', '$orderCount'] }
        }
      },
      {
        $sort: { totalSpent: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.status(200).json({
      success: true,
      data: customerStats
    });
  } catch (error) {
    console.error('Get customer analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get hourly distribution
// @route   GET /api/analytics/hourly
// @access  Private
const getHourlyDistribution = async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    
    let startDate = new Date();
    let endDate = new Date();

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
        startDate.setDate(startDate.getDate() - 7);
    }

    const hourlyData = await Order.aggregate([
      {
        $match: {
          restaurant: req.user.restaurant,
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $hour: '$createdAt' },
          orders: { $sum: 1 },
          revenue: { $sum: '$pricing.total' }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: hourlyData
    });
  } catch (error) {
    console.error('Get hourly distribution error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private
const getDashboardAnalytics = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayStats = await Order.aggregate([
      {
        $match: {
          restaurant: req.user.restaurant,
          createdAt: { $gte: today, $lt: tomorrow }
        }
      },
      {
        $group: {
          _id: null,
          orders: { $sum: 1 },
          revenue: { $sum: '$pricing.total' }
        }
      }
    ]);

    const totalCustomers = await Customer.countDocuments({ restaurant: req.user.restaurant });
    const totalMenuItems = await MenuItem.countDocuments({ restaurant: req.user.restaurant });

    res.status(200).json({
      success: true,
      data: {
        today: {
          orders: todayStats[0]?.orders || 0,
          revenue: todayStats[0]?.revenue || 0
        },
        total: {
          customers: totalCustomers,
          menuItems: totalMenuItems
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get performance metrics
// @route   GET /api/analytics/performance
// @access  Private
const getPerformanceMetrics = async (req, res) => {
  try {
    const metrics = await Order.aggregate([
      {
        $match: { restaurant: req.user.restaurant }
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$pricing.total' },
          averageOrderValue: { $avg: '$pricing.total' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: metrics[0] || { totalOrders: 0, totalRevenue: 0, averageOrderValue: 0 }
    });
  } catch (error) {
    console.error('Get performance metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get sales report
// @route   GET /api/analytics/sales-report
// @access  Private
const getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;
    
    const report = await Order.aggregate([
      {
        $match: {
          restaurant: req.user.restaurant,
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          orders: { $sum: 1 },
          revenue: { $sum: '$pricing.total' }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Get sales report error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get inventory analytics
// @route   GET /api/analytics/inventory
// @access  Private
const getInventoryAnalytics = async (req, res) => {
  try {
    const inventory = await MenuItem.aggregate([
      {
        $match: { restaurant: req.user.restaurant }
      },
      {
        $group: {
          _id: null,
          totalItems: { $sum: 1 },
          availableItems: { $sum: { $cond: ['$availability.isAvailable', 1, 0] } },
          outOfStockItems: { $sum: { $cond: ['$availability.isOutOfStock', 1, 0] } }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: inventory[0] || { totalItems: 0, availableItems: 0, outOfStockItems: 0 }
    });
  } catch (error) {
    console.error('Get inventory analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get delivery analytics
// @route   GET /api/analytics/delivery
// @access  Private
const getDeliveryAnalytics = async (req, res) => {
  try {
    const delivery = await Order.aggregate([
      {
        $match: { 
          restaurant: req.user.restaurant,
          orderType: 'delivery'
        }
      },
      {
        $group: {
          _id: null,
          totalDeliveries: { $sum: 1 },
          averageDeliveryTime: { $avg: '$deliveryTime' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: delivery[0] || { totalDeliveries: 0, averageDeliveryTime: 0 }
    });
  } catch (error) {
    console.error('Get delivery analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get customer insights
// @route   GET /api/analytics/customer-insights
// @access  Private
const getCustomerInsights = async (req, res) => {
  try {
    const insights = await Customer.aggregate([
      {
        $match: { restaurant: req.user.restaurant }
      },
      {
        $group: {
          _id: null,
          totalCustomers: { $sum: 1 },
          newCustomers: { $sum: { $cond: [{ $gte: ['$createdAt', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)] }, 1, 0] } }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: insights[0] || { totalCustomers: 0, newCustomers: 0 }
    });
  } catch (error) {
    console.error('Get customer insights error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get trend analysis
// @route   GET /api/analytics/trends
// @access  Private
const getTrendAnalysis = async (req, res) => {
  try {
    const trends = await Order.aggregate([
      {
        $match: { restaurant: req.user.restaurant }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m', date: '$createdAt' }
          },
          orders: { $sum: 1 },
          revenue: { $sum: '$pricing.total' }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: trends
    });
  } catch (error) {
    console.error('Get trend analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Export analytics
// @route   GET /api/analytics/export
// @access  Private
const exportAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find({ restaurant: req.user.restaurant })
      .sort('-date')
      .limit(100);

    res.status(200).json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Export analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

module.exports = {
  getOverview,
  getRevenueAnalytics,
  getOrderAnalytics,
  getTopItems,
  getCustomerAnalytics,
  getHourlyDistribution,
  getDashboardAnalytics,
  getPerformanceMetrics,
  getSalesReport,
  getInventoryAnalytics,
  getDeliveryAnalytics,
  getCustomerInsights,
  getTrendAnalysis,
  exportAnalytics
};
