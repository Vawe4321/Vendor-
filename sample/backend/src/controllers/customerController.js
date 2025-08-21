const Customer = require('../models/Customer');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all customers
// @route   GET /api/v1/customers
// @access  Private
exports.getCustomers = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Customer.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Customer.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const customers = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: customers.length,
    pagination,
    data: customers
  });
});

// @desc    Get single customer
// @route   GET /api/v1/customers/:id
// @access  Private
exports.getCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Create new customer
// @route   POST /api/v1/customers
// @access  Public
exports.createCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.create(req.body);

  res.status(201).json({
    success: true,
    data: customer
  });
});

// @desc    Update customer
// @route   PUT /api/v1/customers/:id
// @access  Private
exports.updateCustomer = asyncHandler(async (req, res, next) => {
  let customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Delete customer
// @route   DELETE /api/v1/customers/:id
// @access  Private
exports.deleteCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  await customer.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get customer by email
// @route   GET /api/v1/customers/email/:email
// @access  Private
exports.getCustomerByEmail = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findByEmail(req.params.email);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with email of ${req.params.email}`, 404));
  }

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Get customer by phone
// @route   GET /api/v1/customers/phone/:phone
// @access  Private
exports.getCustomerByPhone = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findByPhone(req.params.phone);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with phone of ${req.params.phone}`, 404));
  }

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Get customer by referral code
// @route   GET /api/v1/customers/referral/:code
// @access  Private
exports.getCustomerByReferralCode = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findByReferralCode(req.params.code);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with referral code of ${req.params.code}`, 404));
  }

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Get top customers
// @route   GET /api/v1/customers/top
// @access  Private
exports.getTopCustomers = asyncHandler(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const customers = await Customer.getTopCustomers(limit);

  res.status(200).json({
    success: true,
    count: customers.length,
    data: customers
  });
});

// @desc    Get customers by tier
// @route   GET /api/v1/customers/tier/:tier
// @access  Private
exports.getCustomersByTier = asyncHandler(async (req, res, next) => {
  const customers = await Customer.getCustomersByTier(req.params.tier);

  res.status(200).json({
    success: true,
    count: customers.length,
    data: customers
  });
});

// @desc    Search customers
// @route   GET /api/v1/customers/search
// @access  Private
exports.searchCustomers = asyncHandler(async (req, res, next) => {
  const { q } = req.query;

  if (!q) {
    return next(new ErrorResponse('Please provide a search query', 400));
  }

  const customers = await Customer.searchCustomers(q);

  res.status(200).json({
    success: true,
    count: customers.length,
    data: customers
  });
});

// @desc    Add address to customer
// @route   POST /api/v1/customers/:id/addresses
// @access  Private
exports.addCustomerAddress = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  await customer.addAddress(req.body);

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Update customer address
// @route   PUT /api/v1/customers/:id/addresses/:addressId
// @access  Private
exports.updateCustomerAddress = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  await customer.updateAddress(req.params.addressId, req.body);

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Remove customer address
// @route   DELETE /api/v1/customers/:id/addresses/:addressId
// @access  Private
exports.removeCustomerAddress = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  await customer.removeAddress(req.params.addressId);

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Add payment method to customer
// @route   POST /api/v1/customers/:id/payment-methods
// @access  Private
exports.addCustomerPaymentMethod = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  await customer.addPaymentMethod(req.body);

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Update customer payment method
// @route   PUT /api/v1/customers/:id/payment-methods/:paymentId
// @access  Private
exports.updateCustomerPaymentMethod = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  await customer.updatePaymentMethod(req.params.paymentId, req.body);

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Remove customer payment method
// @route   DELETE /api/v1/customers/:id/payment-methods/:paymentId
// @access  Private
exports.removeCustomerPaymentMethod = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  await customer.removePaymentMethod(req.params.paymentId);

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Add favorite restaurant
// @route   POST /api/v1/customers/:id/favorite-restaurants
// @access  Private
exports.addFavoriteRestaurant = asyncHandler(async (req, res, next) => {
  const { restaurantId } = req.body;

  if (!restaurantId) {
    return next(new ErrorResponse('Please provide restaurantId', 400));
  }

  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  await customer.addFavoriteRestaurant(restaurantId);

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Remove favorite restaurant
// @route   DELETE /api/v1/customers/:id/favorite-restaurants/:restaurantId
// @access  Private
exports.removeFavoriteRestaurant = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  await customer.removeFavoriteRestaurant(req.params.restaurantId);

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Add favorite item
// @route   POST /api/v1/customers/:id/favorite-items
// @access  Private
exports.addFavoriteItem = asyncHandler(async (req, res, next) => {
  const { menuItemId } = req.body;

  if (!menuItemId) {
    return next(new ErrorResponse('Please provide menuItemId', 400));
  }

  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  await customer.addFavoriteItem(menuItemId);

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Remove favorite item
// @route   DELETE /api/v1/customers/:id/favorite-items/:menuItemId
// @access  Private
exports.removeFavoriteItem = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  await customer.removeFavoriteItem(req.params.menuItemId);

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Add device token
// @route   POST /api/v1/customers/:id/device-tokens
// @access  Private
exports.addDeviceToken = asyncHandler(async (req, res, next) => {
  const { token, platform } = req.body;

  if (!token || !platform) {
    return next(new ErrorResponse('Please provide token and platform', 400));
  }

  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  await customer.addDeviceToken(token, platform);

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Remove device token
// @route   DELETE /api/v1/customers/:id/device-tokens/:token
// @access  Private
exports.removeDeviceToken = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  await customer.removeDeviceToken(req.params.token);

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Update loyalty points
// @route   PUT /api/v1/customers/:id/loyalty-points
// @access  Private
exports.updateLoyaltyPoints = asyncHandler(async (req, res, next) => {
  const { points } = req.body;

  if (!points) {
    return next(new ErrorResponse('Please provide points', 400));
  }

  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  await customer.updateLoyaltyPoints(points);

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Redeem loyalty points
// @route   PUT /api/v1/customers/:id/redeem-points
// @access  Private
exports.redeemLoyaltyPoints = asyncHandler(async (req, res, next) => {
  const { points } = req.body;

  if (!points) {
    return next(new ErrorResponse('Please provide points', 400));
  }

  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  try {
    await customer.redeemLoyaltyPoints(points);
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Get customer statistics
// @route   GET /api/v1/customers/:id/stats
// @access  Private
exports.getCustomerStats = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  const stats = {
    totalOrders: customer.stats.totalOrders,
    totalSpent: customer.stats.totalSpent,
    averageOrderValue: customer.stats.averageOrderValue,
    loyaltyPoints: customer.stats.loyaltyPoints,
    tier: customer.stats.tier,
    memberSince: customer.stats.memberSince,
    lastOrderDate: customer.stats.lastOrderDate
  };

  res.status(200).json({
    success: true,
    data: stats
  });
});

// @desc    Update customer preferences
// @route   PUT /api/v1/customers/:id/preferences
// @access  Private
exports.updateCustomerPreferences = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  customer.preferences = { ...customer.preferences, ...req.body };
  await customer.save();

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Update customer notifications
// @route   PUT /api/v1/customers/:id/notifications
// @access  Private
exports.updateCustomerNotifications = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
  }

  customer.notifications = { ...customer.notifications, ...req.body };
  await customer.save();

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Verify customer email
// @route   GET /api/v1/customers/verify/:token
// @access  Public
exports.verifyCustomerEmail = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findOne({
    verificationToken: req.params.token,
    verificationExpires: { $gt: Date.now() }
  });

  if (!customer) {
    return next(new ErrorResponse('Invalid or expired verification token', 400));
  }

  customer.isVerified = true;
  customer.verificationToken = undefined;
  customer.verificationExpires = undefined;
  await customer.save();

  res.status(200).json({
    success: true,
    message: 'Email verified successfully'
  });
});

// @desc    Request password reset
// @route   POST /api/v1/customers/forgot-password
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const customer = await Customer.findByEmail(email);

  if (!customer) {
    return next(new ErrorResponse('There is no customer with that email', 404));
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  customer.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  customer.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  await customer.save();

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/customers/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    // await sendEmail({
    //   email: customer.email,
    //   subject: 'Password reset token',
    //   message
    // });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    customer.resetPasswordToken = undefined;
    customer.resetPasswordExpires = undefined;

    await customer.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc    Reset password
// @route   PUT /api/v1/customers/reset-password/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const customer = await Customer.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!customer) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  customer.password = req.body.password;
  customer.resetPasswordToken = undefined;
  customer.resetPasswordExpires = undefined;
  await customer.save();

  res.status(200).json({
    success: true,
    message: 'Password reset successful'
  });
});

// @desc    Get customer orders
// @route   GET /api/customers/:id/orders
// @access  Private
exports.getCustomerOrders = asyncHandler(async (req, res, next) => {
  const Order = require('../models/Order');
  const orders = await Order.find({ customer: req.params.id })
    .populate('items.menuItem', 'name price')
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    data: orders
  });
});

// @desc    Get customer analytics
// @route   GET /api/customers/:id/analytics
// @access  Private
exports.getCustomerAnalytics = asyncHandler(async (req, res, next) => {
  const Order = require('../models/Order');
  const analytics = await Order.aggregate([
    {
      $match: { customer: req.params.id }
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: '$pricing.total' },
        averageOrderValue: { $avg: '$pricing.total' }
      }
    }
  ]);

  res.status(200).json({
    success: true,
    data: analytics[0] || { totalOrders: 0, totalSpent: 0, averageOrderValue: 0 }
  });
});

// @desc    Get customer preferences
// @route   GET /api/customers/:id/preferences
// @access  Private
exports.getCustomerPreferences = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id)
    .select('preferences');

  res.status(200).json({
    success: true,
    data: customer.preferences
  });
});

// @desc    Update customer preferences
// @route   PUT /api/customers/:id/preferences
// @access  Private
exports.updateCustomerPreferences = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { preferences: req.body },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: customer.preferences
  });
});

// @desc    Get customer addresses
// @route   GET /api/customers/:id/addresses
// @access  Private
exports.getCustomerAddresses = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id)
    .select('addresses');

  res.status(200).json({
    success: true,
    data: customer.addresses
  });
});

// @desc    Add customer address
// @route   POST /api/customers/:id/addresses
// @access  Private
exports.addCustomerAddress = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { $push: { addresses: req.body } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: customer.addresses
  });
});

// @desc    Update customer address
// @route   PUT /api/customers/:id/addresses/:addressId
// @access  Private
exports.updateCustomerAddress = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { $set: { [`addresses.${req.params.addressId}`]: req.body } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: customer.addresses
  });
});

// @desc    Delete customer address
// @route   DELETE /api/customers/:id/addresses/:addressId
// @access  Private
exports.deleteCustomerAddress = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { $pull: { addresses: { _id: req.params.addressId } } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: customer.addresses
  });
});

// @desc    Get customer loyalty
// @route   GET /api/customers/:id/loyalty
// @access  Private
exports.getCustomerLoyalty = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id)
    .select('loyalty');

  res.status(200).json({
    success: true,
    data: customer.loyalty
  });
});

// @desc    Update customer loyalty
// @route   PUT /api/customers/:id/loyalty
// @access  Private
exports.updateCustomerLoyalty = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { loyalty: req.body },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: customer.loyalty
  });
});

// @desc    Get customer notes
// @route   GET /api/customers/:id/notes
// @access  Private
exports.getCustomerNotes = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id)
    .select('notes');

  res.status(200).json({
    success: true,
    data: customer.notes
  });
});

// @desc    Add customer note
// @route   POST /api/customers/:id/notes
// @access  Private
exports.addCustomerNote = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { $push: { notes: req.body } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: customer.notes
  });
});

// @desc    Update customer note
// @route   PUT /api/customers/:id/notes/:noteId
// @access  Private
exports.updateCustomerNote = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { $set: { [`notes.${req.params.noteId}`]: req.body } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: customer.notes
  });
});

// @desc    Delete customer note
// @route   DELETE /api/customers/:id/notes/:noteId
// @access  Private
exports.deleteCustomerNote = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { $pull: { notes: { _id: req.params.noteId } } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: customer.notes
  });
});

// @desc    Search customers
// @route   GET /api/customers/search
// @access  Private
exports.searchCustomers = asyncHandler(async (req, res, next) => {
  const { q } = req.query;
  
  const customers = await Customer.find({
    $or: [
      { name: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } },
      { phone: { $regex: q, $options: 'i' } }
    ]
  }).limit(10);

  res.status(200).json({
    success: true,
    data: customers
  });
});

// @desc    Export customers
// @route   GET /api/customers/export
// @access  Private
exports.exportCustomers = asyncHandler(async (req, res, next) => {
  const customers = await Customer.find({ restaurant: req.user.restaurant })
    .sort('name');

  res.status(200).json({
    success: true,
    data: customers
  });
});

// @desc    Get customer stats
// @route   GET /api/customers/stats
// @access  Private
exports.getCustomerStats = asyncHandler(async (req, res, next) => {
  const stats = await Customer.aggregate([
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
    data: stats[0] || { totalCustomers: 0, newCustomers: 0 }
  });
});

// @desc    Get customer segments
// @route   GET /api/customers/segments
// @access  Private
exports.getCustomerSegments = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: []
  });
});

// @desc    Get customer insights
// @route   GET /api/customers/insights
// @access  Private
exports.getCustomerInsights = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: []
  });
});
