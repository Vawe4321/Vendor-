const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Customer = require('../models/Customer');
const { validationResult } = require('express-validator');

// @desc    Get all orders for restaurant
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, sort = '-createdAt' } = req.query;
    
    const query = { restaurant: req.user.restaurant };
    if (status) {
      query.status = status.toUpperCase();
    }

    const orders = await Order.find(query)
      .populate('customer', 'name phone email')
      .populate('items.menuItem', 'name price images')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalOrders: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name phone email addresses')
      .populate('items.menuItem', 'name price images dietaryInfo')
      .populate('restaurant', 'name address contact');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Check if order belongs to user's restaurant
    if (order.restaurant._id.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { customer, items, deliveryAddress, orderType, paymentMethod, specialRequests } = req.body;

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Order must contain at least one item'
      });
    }

    // Calculate order total
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) {
        return res.status(400).json({
          success: false,
          error: `Menu item ${item.menuItem} not found`
        });
      }

      if (!menuItem.availability.isAvailable) {
        return res.status(400).json({
          success: false,
          error: `Item ${menuItem.name} is not available`
        });
      }

      const itemTotal = (menuItem.price + (item.addOns?.reduce((sum, addon) => sum + addon.price, 0) || 0)) * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions,
        addOns: item.addOns || [],
        totalItemPrice: itemTotal
      });
    }

    // Calculate taxes and fees
    const tax = subtotal * 0.05; // 5% GST
    const deliveryFee = orderType === 'delivery' ? 30 : 0; // Delivery fee
    const total = subtotal + tax + deliveryFee;

    // Normalize delivery address coordinates if delivery
    let normalizedDeliveryAddress = deliveryAddress;
    if (orderType === 'delivery') {
      const coords = deliveryAddress?.coordinates?.coordinates || [0, 0];
      normalizedDeliveryAddress = {
        ...deliveryAddress,
        coordinates: {
          type: 'Point',
          coordinates: coords
        }
      };
    }

    const order = await Order.create({
      restaurant: req.user.restaurant,
      customer,
      items: orderItems,
      deliveryAddress: normalizedDeliveryAddress,
      orderType,
      payment: {
        method: paymentMethod,
        amount: total
      },
      pricing: {
        subtotal,
        tax,
        deliveryFee,
        total
      },
      specialRequests
    });

    // Update restaurant statistics
    const restaurant = await Restaurant.findById(req.user.restaurant);
    await restaurant.updateStats({ totalAmount: total });

    // Update menu item statistics
    for (const item of orderItems) {
      const menuItem = await MenuItem.findById(item.menuItem);
      await menuItem.updateOrderStats({
        quantity: item.quantity,
        totalAmount: item.totalItemPrice
      });
    }

    const populatedOrder = await Order.findById(order._id)
      .populate('customer', 'name phone email')
      .populate('items.menuItem', 'name price images');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: populatedOrder
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
const updateOrderStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Check if order belongs to user's restaurant
    if (order.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this order'
      });
    }

    // Update order status
    await order.updateStatus(status, req.user.name);

    const updatedOrder = await Order.findById(order._id)
      .populate('customer', 'name phone email')
      .populate('items.menuItem', 'name price images');

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Accept order
// @route   PUT /api/orders/:id/accept
// @access  Private
const acceptOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    if (order.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to accept this order'
      });
    }

    if (order.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        error: 'Order cannot be accepted in current status'
      });
    }

    await order.updateStatus('ACCEPTED', req.user.name);

    const updatedOrder = await Order.findById(order._id)
      .populate('customer', 'name phone email')
      .populate('items.menuItem', 'name price images');

    res.status(200).json({
      success: true,
      message: 'Order accepted successfully',
      data: updatedOrder
    });
  } catch (error) {
    console.error('Accept order error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Reject order
// @route   PUT /api/orders/:id/reject
// @access  Private
const rejectOrder = async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    if (order.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to reject this order'
      });
    }

    if (order.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        error: 'Order cannot be rejected in current status'
      });
    }

    await order.updateStatus('REJECTED', req.user.name);

    const updatedOrder = await Order.findById(order._id)
      .populate('customer', 'name phone email')
      .populate('items.menuItem', 'name price images');

    res.status(200).json({
      success: true,
      message: 'Order rejected successfully',
      data: updatedOrder
    });
  } catch (error) {
    console.error('Reject order error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Start preparing order
// @route   PUT /api/orders/:id/start-preparing
// @access  Private
const startPreparing = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    if (order.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this order'
      });
    }

    if (order.status !== 'ACCEPTED') {
      return res.status(400).json({
        success: false,
        error: 'Order must be accepted before starting preparation'
      });
    }

    await order.updateStatus('PREPARING', req.user.name);

    const updatedOrder = await Order.findById(order._id)
      .populate('customer', 'name phone email')
      .populate('items.menuItem', 'name price images');

    res.status(200).json({
      success: true,
      message: 'Order preparation started',
      data: updatedOrder
    });
  } catch (error) {
    console.error('Start preparing error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Mark order as ready
// @route   PUT /api/orders/:id/mark-ready
// @access  Private
const markAsReady = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    if (order.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this order'
      });
    }

    if (order.status !== 'PREPARING') {
      return res.status(400).json({
        success: false,
        error: 'Order must be in preparing status'
      });
    }

    await order.updateStatus('READY', req.user.name);

    const updatedOrder = await Order.findById(order._id)
      .populate('customer', 'name phone email')
      .populate('items.menuItem', 'name price images');

    res.status(200).json({
      success: true,
      message: 'Order marked as ready',
      data: updatedOrder
    });
  } catch (error) {
    console.error('Mark as ready error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Mark order as out for delivery
// @route   PUT /api/orders/:id/out-for-delivery
// @access  Private
const markOutForDelivery = async (req, res) => {
  try {
    const { driverDetails } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    if (order.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this order'
      });
    }

    if (order.status !== 'READY') {
      return res.status(400).json({
        success: false,
        error: 'Order must be ready before marking out for delivery'
      });
    }

    if (order.orderType === 'delivery') {
      order.driver = driverDetails;
    }

    await order.updateStatus('OUT_FOR_DELIVERY', req.user.name);

    const updatedOrder = await Order.findById(order._id)
      .populate('customer', 'name phone email')
      .populate('items.menuItem', 'name price images');

    res.status(200).json({
      success: true,
      message: 'Order marked as out for delivery',
      data: updatedOrder
    });
  } catch (error) {
    console.error('Mark out for delivery error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Mark order as delivered
// @route   PUT /api/orders/:id/delivered
// @access  Private
const markAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    if (order.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this order'
      });
    }

    if (order.status !== 'OUT_FOR_DELIVERY' && order.status !== 'READY') {
      return res.status(400).json({
        success: false,
        error: 'Order must be out for delivery or ready'
      });
    }

    await order.updateStatus('DELIVERED', req.user.name);

    const updatedOrder = await Order.findById(order._id)
      .populate('customer', 'name phone email')
      .populate('items.menuItem', 'name price images');

    res.status(200).json({
      success: true,
      message: 'Order marked as delivered',
      data: updatedOrder
    });
  } catch (error) {
    console.error('Mark as delivered error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    if (order.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to cancel this order'
      });
    }

    if (order.status === 'DELIVERED' || order.status === 'CANCELLED') {
      return res.status(400).json({
        success: false,
        error: 'Order cannot be cancelled in current status'
      });
    }

    await order.cancelOrder(reason, 'RESTAURANT');

    const updatedOrder = await Order.findById(order._id)
      .populate('customer', 'name phone email')
      .populate('items.menuItem', 'name price images');

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: updatedOrder
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get order statistics
// @route   GET /api/orders/stats
// @access  Private
const getOrderStats = async (req, res) => {
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

    const stats = await Order.aggregate([
      {
        $match: {
          restaurant: req.user.restaurant,
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$pricing.total' },
          averageOrderValue: { $avg: '$pricing.total' },
          ordersByStatus: {
            $push: '$status'
          }
        }
      }
    ]);

    const statusCounts = await Order.aggregate([
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

    const result = {
      period,
      totalOrders: stats[0]?.totalOrders || 0,
      totalRevenue: stats[0]?.totalRevenue || 0,
      averageOrderValue: stats[0]?.averageOrderValue || 0,
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
    console.error('Get order stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get order analytics
// @route   GET /api/orders/analytics
// @access  Private
const getOrderAnalytics = async (req, res) => {
  try {
    const analytics = await Order.aggregate([
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
      data: analytics[0] || { totalOrders: 0, totalRevenue: 0, averageOrderValue: 0 }
    });
  } catch (error) {
    console.error('Get order analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get order history
// @route   GET /api/orders/history
// @access  Private
const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ restaurant: req.user.restaurant })
      .populate('customer', 'name')
      .sort('-createdAt')
      .limit(50);

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Get order history error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Export orders
// @route   GET /api/orders/export
// @access  Private
const exportOrders = async (req, res) => {
  try {
    const orders = await Order.find({ restaurant: req.user.restaurant })
      .populate('customer', 'name email phone')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Export orders error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update order notes
// @route   PUT /api/orders/:id/notes
// @access  Private
const updateOrderNotes = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    order.specialRequests = req.body.notes;
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order notes updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Update order notes error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Assign delivery partner
// @route   PUT /api/orders/:id/assign-delivery
// @access  Private
const assignDeliveryPartner = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    order.driver = {
      id: req.body.deliveryPartnerId,
      name: req.body.deliveryPartnerName || 'Delivery Partner',
      phone: req.body.deliveryPartnerPhone || ''
    };

    if (req.body.estimatedDeliveryTime) {
      order.timing.estimatedDelivery = new Date(req.body.estimatedDeliveryTime);
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Delivery partner assigned successfully',
      data: order
    });
  } catch (error) {
    console.error('Assign delivery partner error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

module.exports = {
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
  getOrderHistory,
  exportOrders,
  updateOrderNotes,
  assignDeliveryPartner
};
