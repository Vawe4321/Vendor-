const Category = require('../models/Category');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all categories for a restaurant
// @route   GET /api/v1/restaurants/:restaurantId/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res, next) => {
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
  query = Category.find({
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
    query = query.sort('displayOrder name');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Category.countDocuments({ restaurantId: req.params.restaurantId });

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const categories = await query;

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
    count: categories.length,
    pagination,
    data: categories
  });
});

// @desc    Get single category
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Create new category
// @route   POST /api/v1/restaurants/:restaurantId/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res, next) => {
  // Add restaurantId to req.body
  req.body.restaurantId = req.params.restaurantId;

  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    data: category
  });
});

// @desc    Update category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Delete category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get active categories
// @route   GET /api/v1/restaurants/:restaurantId/categories/active
// @access  Public
exports.getActiveCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.getActiveCategories(req.params.restaurantId);

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// @desc    Get popular categories
// @route   GET /api/v1/restaurants/:restaurantId/categories/popular
// @access  Public
exports.getPopularCategories = asyncHandler(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const categories = await Category.getPopularCategories(req.params.restaurantId, limit);

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// @desc    Get featured categories
// @route   GET /api/v1/restaurants/:restaurantId/categories/featured
// @access  Public
exports.getFeaturedCategories = asyncHandler(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const categories = await Category.getFeaturedCategories(req.params.restaurantId, limit);

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// @desc    Get categories with items
// @route   GET /api/v1/restaurants/:restaurantId/categories/with-items
// @access  Public
exports.getCategoriesWithItems = asyncHandler(async (req, res, next) => {
  const categories = await Category.getCategoriesWithItems(req.params.restaurantId);

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// @desc    Search categories
// @route   GET /api/v1/restaurants/:restaurantId/categories/search
// @access  Public
exports.searchCategories = asyncHandler(async (req, res, next) => {
  const { q } = req.query;

  if (!q) {
    return next(new ErrorResponse('Please provide a search query', 400));
  }

  const categories = await Category.searchCategories(req.params.restaurantId, q);

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// @desc    Get categories by revenue
// @route   GET /api/v1/restaurants/:restaurantId/categories/by-revenue
// @access  Private
exports.getCategoriesByRevenue = asyncHandler(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const categories = await Category.getCategoriesByRevenue(req.params.restaurantId, limit);

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// @desc    Get categories by rating
// @route   GET /api/v1/restaurants/:restaurantId/categories/by-rating
// @access  Public
exports.getCategoriesByRating = asyncHandler(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const categories = await Category.getCategoriesByRating(req.params.restaurantId, limit);

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// @desc    Get categories with active discounts
// @route   GET /api/v1/restaurants/:restaurantId/categories/with-discounts
// @access  Public
exports.getCategoriesWithDiscounts = asyncHandler(async (req, res, next) => {
  const categories = await Category.getCategoriesWithDiscounts(req.params.restaurantId);

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// @desc    Toggle category active status
// @route   PUT /api/v1/categories/:id/toggle-active
// @access  Private
exports.toggleCategoryActive = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
  }

  await category.toggleActive();

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Toggle category popularity
// @route   PUT /api/v1/categories/:id/toggle-popularity
// @access  Private
exports.toggleCategoryPopularity = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
  }

  await category.togglePopularity();

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Toggle category featured status
// @route   PUT /api/v1/categories/:id/toggle-featured
// @access  Private
exports.toggleCategoryFeatured = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
  }

  await category.toggleFeatured();

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Update category display order
// @route   PUT /api/v1/categories/:id/display-order
// @access  Private
exports.updateCategoryDisplayOrder = asyncHandler(async (req, res, next) => {
  const { displayOrder } = req.body;

  if (!displayOrder && displayOrder !== 0) {
    return next(new ErrorResponse('Please provide displayOrder', 400));
  }

  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
  }

  await category.updateDisplayOrder(displayOrder);

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Set category discount
// @route   PUT /api/v1/categories/:id/discount
// @access  Private
exports.setCategoryDiscount = asyncHandler(async (req, res, next) => {
  const { percentage, validFrom, validUntil } = req.body;

  if (!percentage || !validFrom || !validUntil) {
    return next(new ErrorResponse('Please provide percentage, validFrom, and validUntil', 400));
  }

  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
  }

  await category.setDiscount(percentage, new Date(validFrom), new Date(validUntil));

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Remove category discount
// @route   DELETE /api/v1/categories/:id/discount
// @access  Private
exports.removeCategoryDiscount = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
  }

  await category.removeDiscount();

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Upload photo for category
// @route   PUT /api/v1/categories/:id/photo
// @access  Private
exports.categoryPhotoUpload = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
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
  file.name = `category_${category._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Category.findByIdAndUpdate(req.params.id, { image: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});

// @desc    Get category statistics
// @route   GET /api/v1/categories/:id/stats
// @access  Private
exports.getCategoryStats = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
  }

  const stats = {
    itemCount: category.itemCount,
    totalRevenue: category.totalRevenue,
    averageRating: category.averageRating,
    totalOrders: category.totalOrders,
    isPopular: category.isPopular,
    isFeatured: category.isFeatured
  };

  res.status(200).json({
    success: true,
    data: stats
  });
});

// @desc    Bulk update categories
// @route   PUT /api/v1/restaurants/:restaurantId/categories/bulk-update
// @access  Private
exports.bulkUpdateCategories = asyncHandler(async (req, res, next) => {
  const { categories } = req.body;

  if (!categories || !Array.isArray(categories)) {
    return next(new ErrorResponse('Please provide an array of categories to update', 400));
  }

  const updatePromises = categories.map(category => {
    return Category.findByIdAndUpdate(
      category.id,
      { $set: category.updates },
      { new: true, runValidators: true }
    );
  });

  const updatedCategories = await Promise.all(updatePromises);

  res.status(200).json({
    success: true,
    count: updatedCategories.length,
    data: updatedCategories
  });
});

// @desc    Reorder categories
// @route   PUT /api/v1/restaurants/:restaurantId/categories/reorder
// @access  Private
exports.reorderCategories = asyncHandler(async (req, res, next) => {
  const { categoryOrders } = req.body;

  if (!categoryOrders || !Array.isArray(categoryOrders)) {
    return next(new ErrorResponse('Please provide an array of category orders', 400));
  }

  const updatePromises = categoryOrders.map(({ id, displayOrder }) => {
    return Category.findByIdAndUpdate(
      id,
      { displayOrder },
      { new: true }
    );
  });

  const updatedCategories = await Promise.all(updatePromises);

  res.status(200).json({
    success: true,
    count: updatedCategories.length,
    data: updatedCategories
  });
});
