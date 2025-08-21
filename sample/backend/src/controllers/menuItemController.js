const MenuItem = require('../models/MenuItem');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all menu items for a restaurant
// @route   GET /api/v1/restaurants/:restaurantId/menu-items
// @access  Public
exports.getMenuItems = asyncHandler(async (req, res, next) => {
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
  query = MenuItem.find({
    restaurantId: req.params.restaurantId,
    ...JSON.parse(queryStr)
  });

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
    query = query.sort('category name');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await MenuItem.countDocuments({ restaurantId: req.params.restaurantId });

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const menuItems = await query;

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
    count: menuItems.length,
    pagination,
    data: menuItems
  });
});

// @desc    Get single menu item
// @route   GET /api/v1/menu-items/:id
// @access  Public
exports.getMenuItem = asyncHandler(async (req, res, next) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return next(new ErrorResponse(`Menu item not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: menuItem
  });
});

// @desc    Create new menu item
// @route   POST /api/v1/restaurants/:restaurantId/menu-items
// @access  Private
exports.createMenuItem = asyncHandler(async (req, res, next) => {
  // Add restaurantId to req.body
  req.body.restaurantId = req.params.restaurantId;

  const menuItem = await MenuItem.create(req.body);

  res.status(201).json({
    success: true,
    data: menuItem
  });
});

// @desc    Update menu item
// @route   PUT /api/v1/menu-items/:id
// @access  Private
exports.updateMenuItem = asyncHandler(async (req, res, next) => {
  let menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return next(new ErrorResponse(`Menu item not found with id of ${req.params.id}`, 404));
  }

  menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: menuItem
  });
});

// @desc    Delete menu item
// @route   DELETE /api/v1/menu-items/:id
// @access  Private
exports.deleteMenuItem = asyncHandler(async (req, res, next) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return next(new ErrorResponse(`Menu item not found with id of ${req.params.id}`, 404));
  }

  await menuItem.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get menu items by category
// @route   GET /api/v1/restaurants/:restaurantId/menu-items/category/:category
// @access  Public
exports.getMenuItemsByCategory = asyncHandler(async (req, res, next) => {
  const menuItems = await MenuItem.getItemsByCategory(
    req.params.restaurantId,
    req.params.category
  );

  res.status(200).json({
    success: true,
    count: menuItems.length,
    data: menuItems
  });
});

// @desc    Get popular menu items
// @route   GET /api/v1/restaurants/:restaurantId/menu-items/popular
// @access  Public
exports.getPopularMenuItems = asyncHandler(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const menuItems = await MenuItem.getPopularItems(req.params.restaurantId, limit);

  res.status(200).json({
    success: true,
    count: menuItems.length,
    data: menuItems
  });
});

// @desc    Get recommended menu items
// @route   GET /api/v1/restaurants/:restaurantId/menu-items/recommended
// @access  Public
exports.getRecommendedMenuItems = asyncHandler(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const menuItems = await MenuItem.getRecommendedItems(req.params.restaurantId, limit);

  res.status(200).json({
    success: true,
    count: menuItems.length,
    data: menuItems
  });
});

// @desc    Search menu items
// @route   GET /api/v1/restaurants/:restaurantId/menu-items/search
// @access  Public
exports.searchMenuItems = asyncHandler(async (req, res, next) => {
  const { q } = req.query;

  if (!q) {
    return next(new ErrorResponse('Please provide a search query', 400));
  }

  const menuItems = await MenuItem.searchItems(req.params.restaurantId, q);

  res.status(200).json({
    success: true,
    count: menuItems.length,
    data: menuItems
  });
});

// @desc    Get out of stock menu items
// @route   GET /api/v1/restaurants/:restaurantId/menu-items/out-of-stock
// @access  Private
exports.getOutOfStockMenuItems = asyncHandler(async (req, res, next) => {
  const menuItems = await MenuItem.getOutOfStockItems(req.params.restaurantId);

  res.status(200).json({
    success: true,
    count: menuItems.length,
    data: menuItems
  });
});

// @desc    Toggle menu item stock status
// @route   PUT /api/v1/menu-items/:id/toggle-stock
// @access  Private
exports.toggleMenuItemStock = asyncHandler(async (req, res, next) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return next(new ErrorResponse(`Menu item not found with id of ${req.params.id}`, 404));
  }

  await menuItem.toggleStock();

  res.status(200).json({
    success: true,
    data: menuItem
  });
});

// @desc    Toggle menu item popularity
// @route   PUT /api/v1/menu-items/:id/toggle-popularity
// @access  Private
exports.toggleMenuItemPopularity = asyncHandler(async (req, res, next) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return next(new ErrorResponse(`Menu item not found with id of ${req.params.id}`, 404));
  }

  await menuItem.togglePopularity();

  res.status(200).json({
    success: true,
    data: menuItem
  });
});

// @desc    Toggle menu item recommendation
// @route   PUT /api/v1/menu-items/:id/toggle-recommendation
// @access  Private
exports.toggleMenuItemRecommendation = asyncHandler(async (req, res, next) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return next(new ErrorResponse(`Menu item not found with id of ${req.params.id}`, 404));
  }

  await menuItem.toggleRecommendation();

  res.status(200).json({
    success: true,
    data: menuItem
  });
});

// @desc    Update menu item rating
// @route   PUT /api/v1/menu-items/:id/rating
// @access  Private
exports.updateMenuItemRating = asyncHandler(async (req, res, next) => {
  const { rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return next(new ErrorResponse('Please provide a valid rating between 1 and 5', 400));
  }

  const menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return next(new ErrorResponse(`Menu item not found with id of ${req.params.id}`, 404));
  }

  await menuItem.updateRating(rating);

  res.status(200).json({
    success: true,
    data: menuItem
  });
});

// @desc    Upload photo for menu item
// @route   PUT /api/v1/menu-items/:id/photo
// @access  Private
exports.menuItemPhotoUpload = asyncHandler(async (req, res, next) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return next(new ErrorResponse(`Menu item not found with id of ${req.params.id}`, 404));
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
  }

  // Create custom filename
  file.name = `menu_${menuItem._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await MenuItem.findByIdAndUpdate(req.params.id, { image: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});

// @desc    Get menu item statistics
// @route   GET /api/v1/menu-items/:id/stats
// @access  Private
exports.getMenuItemStats = asyncHandler(async (req, res, next) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return next(new ErrorResponse(`Menu item not found with id of ${req.params.id}`, 404));
  }

  const stats = {
    orderCount: menuItem.orderCount,
    revenue: menuItem.revenue,
    averageRating: menuItem.averageRating,
    totalRatings: menuItem.totalRatings,
    isPopular: menuItem.isPopular,
    isRecommended: menuItem.isRecommended
  };

  res.status(200).json({
    success: true,
    data: stats
  });
});

// @desc    Get menu items by dietary preference
// @route   GET /api/v1/restaurants/:restaurantId/menu-items/dietary/:preference
// @access  Public
exports.getMenuItemsByDietaryPreference = asyncHandler(async (req, res, next) => {
  const { preference } = req.params;
  let query = { restaurantId: req.params.restaurantId, isActive: true };

  switch (preference.toLowerCase()) {
    case 'vegetarian':
      query.isVeg = true;
      break;
    case 'non-vegetarian':
      query.isVeg = false;
      break;
    default:
      return next(new ErrorResponse('Invalid dietary preference', 400));
  }

  const menuItems = await MenuItem.find(query).sort('category name');

  res.status(200).json({
    success: true,
    count: menuItems.length,
    data: menuItems
  });
});

// @desc    Get menu items by price range
// @route   GET /api/v1/restaurants/:restaurantId/menu-items/price-range
// @access  Public
exports.getMenuItemsByPriceRange = asyncHandler(async (req, res, next) => {
  const { min, max } = req.query;

  if (!min || !max) {
    return next(new ErrorResponse('Please provide min and max price', 400));
  }

  const menuItems = await MenuItem.find({
    restaurantId: req.params.restaurantId,
    isActive: true,
    price: { $gte: parseFloat(min), $lte: parseFloat(max) }
  }).sort('price');

  res.status(200).json({
    success: true,
    count: menuItems.length,
    data: menuItems
  });
});

// @desc    Get menu items by spice level
// @route   GET /api/v1/restaurants/:restaurantId/menu-items/spice-level/:level
// @access  Public
exports.getMenuItemsBySpiceLevel = asyncHandler(async (req, res, next) => {
  const { level } = req.params;
  const validLevels = ['MILD', 'MEDIUM', 'HOT', 'EXTRA_HOT'];

  if (!validLevels.includes(level.toUpperCase())) {
    return next(new ErrorResponse('Invalid spice level', 400));
  }

  const menuItems = await MenuItem.find({
    restaurantId: req.params.restaurantId,
    isActive: true,
    spiceLevel: level.toUpperCase()
  }).sort('name');

  res.status(200).json({
    success: true,
    count: menuItems.length,
    data: menuItems
  });
});

// @desc    Bulk update menu items
// @route   PUT /api/v1/restaurants/:restaurantId/menu-items/bulk-update
// @access  Private
exports.bulkUpdateMenuItems = asyncHandler(async (req, res, next) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
    return next(new ErrorResponse('Please provide an array of items to update', 400));
  }

  const updatePromises = items.map(item => {
    return MenuItem.findByIdAndUpdate(
      item.id,
      { $set: item.updates },
      { new: true, runValidators: true }
    );
  });

  const updatedItems = await Promise.all(updatePromises);

  res.status(200).json({
    success: true,
    count: updatedItems.length,
    data: updatedItems
  });
});

// @desc    Get menu item categories
// @route   GET /api/v1/restaurants/:restaurantId/menu-items/categories
// @access  Public
exports.getMenuItemCategories = asyncHandler(async (req, res, next) => {
  const categories = await MenuItem.distinct('category', {
    restaurantId: req.params.restaurantId,
    isActive: true
  });

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});
