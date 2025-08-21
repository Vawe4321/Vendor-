const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc    Get restaurant profile
// @route   GET /api/profile/restaurant
// @access  Private
const getRestaurantProfile = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.user.restaurant)
      .populate('owner', 'name email phone');

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: 'Restaurant not found'
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    console.error('Get restaurant profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update restaurant profile
// @route   PUT /api/profile/restaurant
// @access  Private
const updateRestaurantProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.user.restaurant,
      req.body,
      { new: true, runValidators: true }
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: 'Restaurant not found'
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    console.error('Update restaurant profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get user profile
// @route   GET /api/profile/user
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('restaurant', 'name cuisine address');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile/user
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update restaurant settings
// @route   PUT /api/profile/settings
// @access  Private
const updateRestaurantSettings = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.user.restaurant,
      { settings: req.body },
      { new: true, runValidators: true }
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: 'Restaurant not found'
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant.settings
    });
  } catch (error) {
    console.error('Update restaurant settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get restaurant settings
// @route   GET /api/profile/settings
// @access  Private
const getRestaurantSettings = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.user.restaurant)
      .select('settings');

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: 'Restaurant not found'
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant.settings
    });
  } catch (error) {
    console.error('Get restaurant settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Upload restaurant logo
// @route   POST /api/profile/logo
// @access  Private
const uploadRestaurantLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a file'
      });
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.user.restaurant,
      { logo: req.file.path },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: {
        logo: restaurant.logo
      }
    });
  } catch (error) {
    console.error('Upload restaurant logo error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get restaurant statistics
// @route   GET /api/profile/statistics
// @access  Private
const getRestaurantStatistics = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.user.restaurant);
    
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: 'Restaurant not found'
      });
    }

    // Get basic statistics
    const stats = {
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      status: restaurant.status,
      address: restaurant.address,
      contact: restaurant.contact,
      createdAt: restaurant.createdAt,
      isVerified: restaurant.status.isVerified,
      isActive: restaurant.status.isActive
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get restaurant statistics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update online status
// @route   PUT /api/profile/restaurant/online-status
// @access  Private
const updateOnlineStatus = async (req, res) => {
  try {
    const { isOnline } = req.body;

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.user.restaurant,
      { 'status.isOnline': isOnline },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: { isOnline: restaurant.status.isOnline }
    });
  } catch (error) {
    console.error('Update online status error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Upload restaurant image
// @route   POST /api/profile/restaurant/image
// @access  Private
const uploadRestaurantImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a file'
      });
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.user.restaurant,
      { $push: { images: req.file.path } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: { images: restaurant.images }
    });
  } catch (error) {
    console.error('Upload restaurant image error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get restaurant images
// @route   GET /api/profile/restaurant/images
// @access  Private
const getRestaurantImages = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.user.restaurant)
      .select('images');

    res.status(200).json({
      success: true,
      data: { images: restaurant.images || [] }
    });
  } catch (error) {
    console.error('Get restaurant images error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Delete restaurant image
// @route   DELETE /api/profile/restaurant/images/:imageId
// @access  Private
const deleteRestaurantImage = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.user.restaurant,
      { $pull: { images: req.params.imageId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: { images: restaurant.images }
    });
  } catch (error) {
    console.error('Delete restaurant image error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update contact info
// @route   PUT /api/profile/restaurant/contact
// @access  Private
const updateContactInfo = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.user.restaurant,
      { contact: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: restaurant.contact
    });
  } catch (error) {
    console.error('Update contact info error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update address
// @route   PUT /api/profile/restaurant/address
// @access  Private
const updateAddress = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.user.restaurant,
      { address: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: restaurant.address
    });
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update operating hours
// @route   PUT /api/profile/restaurant/hours
// @access  Private
const updateOperatingHours = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.user.restaurant,
      { operatingHours: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: restaurant.operatingHours
    });
  } catch (error) {
    console.error('Update operating hours error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update settings
// @route   PUT /api/profile/restaurant/settings
// @access  Private
const updateSettings = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.user.restaurant,
      { settings: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: restaurant.settings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update delivery settings
// @route   PUT /api/profile/restaurant/delivery-settings
// @access  Private
const updateDeliverySettings = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.user.restaurant,
      { 'settings.delivery': req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: restaurant.settings.delivery
    });
  } catch (error) {
    console.error('Update delivery settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update payment settings
// @route   PUT /api/profile/restaurant/payment-settings
// @access  Private
const updatePaymentSettings = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.user.restaurant,
      { 'settings.payment': req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: restaurant.settings.payment
    });
  } catch (error) {
    console.error('Update payment settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get restaurant stats
// @route   GET /api/profile/restaurant/stats
// @access  Private
const getRestaurantStats = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.user.restaurant);
    
    const stats = {
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      status: restaurant.status,
      address: restaurant.address,
      contact: restaurant.contact,
      createdAt: restaurant.createdAt,
      isVerified: restaurant.status.isVerified,
      isActive: restaurant.status.isActive
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get restaurant stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get restaurant analytics
// @route   GET /api/profile/restaurant/analytics
// @access  Private
const getRestaurantAnalytics = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        totalOrders: 0,
        totalRevenue: 0,
        averageRating: 0,
        totalCustomers: 0
      }
    });
  } catch (error) {
    console.error('Get restaurant analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

module.exports = {
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
};
