const Restaurant = require('../models/Restaurant');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all restaurants
// @route   GET /api/v1/restaurants
// @access  Public
exports.getRestaurants = asyncHandler(async (req, res, next) => {
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
  query = Restaurant.find(JSON.parse(queryStr));

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
  const total = await Restaurant.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const restaurants = await query;

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
    count: restaurants.length,
    pagination,
    data: restaurants
  });
});

// @desc    Get single restaurant
// @route   GET /api/v1/restaurants/:id
// @access  Public
exports.getRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: restaurant
  });
});

// @desc    Create new restaurant
// @route   POST /api/v1/restaurants
// @access  Private
exports.createRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.create(req.body);

  res.status(201).json({
    success: true,
    data: restaurant
  });
});

// @desc    Update restaurant
// @route   PUT /api/v1/restaurants/:id
// @access  Private
exports.updateRestaurant = asyncHandler(async (req, res, next) => {
  let restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404));
  }

  restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: restaurant
  });
});

// @desc    Delete restaurant
// @route   DELETE /api/v1/restaurants/:id
// @access  Private
exports.deleteRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404));
  }

  await restaurant.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get restaurants within a radius
// @route   GET /api/v1/restaurants/radius/:zipcode/:distance
// @access  Private
exports.getRestaurantsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const restaurants = await Restaurant.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    count: restaurants.length,
    data: restaurants
  });
});

// @desc    Upload photo for restaurant
// @route   PUT /api/v1/restaurants/:id/photo
// @access  Private
exports.restaurantPhotoUpload = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404));
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
  file.name = `photo_${restaurant._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Restaurant.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});

// @desc    Get restaurant statistics
// @route   GET /api/v1/restaurants/:id/stats
// @access  Private
exports.getRestaurantStats = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404));
  }

  // Get stats from analytics or calculate from orders
  const stats = {
    totalOrders: restaurant.stats.totalOrders,
    totalRevenue: restaurant.stats.totalRevenue,
    averageRating: restaurant.stats.averageRating,
    totalCustomers: restaurant.stats.totalCustomers,
    averageOrderValue: restaurant.stats.averageOrderValue,
    completionRate: restaurant.stats.completionRate,
    customerSatisfaction: restaurant.stats.customerSatisfaction
  };

  res.status(200).json({
    success: true,
    data: stats
  });
});

// @desc    Update restaurant status
// @route   PUT /api/v1/restaurants/:id/status
// @access  Private
exports.updateRestaurantStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404));
  }

  restaurant.status = status;
  await restaurant.save();

  res.status(200).json({
    success: true,
    data: restaurant
  });
});

// @desc    Get restaurant menu
// @route   GET /api/v1/restaurants/:id/menu
// @access  Public
exports.getRestaurantMenu = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id).populate({
    path: 'menuItems',
    select: 'name description price category isVeg isInStock image preparationTime'
  });

  if (!restaurant) {
    return next(new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: restaurant.menuItems
  });
});

// @desc    Search restaurants
// @route   GET /api/v1/restaurants/search
// @access  Public
exports.searchRestaurants = asyncHandler(async (req, res, next) => {
  const { q, cuisine, rating, priceRange, location } = req.query;

  let query = { isActive: true };

  // Search by name or description
  if (q) {
    query.$or = [
      { name: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { cuisine: { $in: [new RegExp(q, 'i')] } }
    ];
  }

  // Filter by cuisine
  if (cuisine) {
    query.cuisine = { $in: cuisine.split(',') };
  }

  // Filter by rating
  if (rating) {
    query['stats.averageRating'] = { $gte: parseFloat(rating) };
  }

  // Filter by price range
  if (priceRange) {
    const [min, max] = priceRange.split('-').map(Number);
    query['stats.averageOrderValue'] = { $gte: min, $lte: max };
  }

  // Filter by location (if coordinates provided)
  if (location) {
    const [lng, lat] = location.split(',').map(Number);
    query.location = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        $maxDistance: 10000 // 10km
      }
    };
  }

  const restaurants = await Restaurant.find(query)
    .select('name description cuisine stats.averageRating stats.averageOrderValue location photo')
    .limit(20);

  res.status(200).json({
    success: true,
    count: restaurants.length,
    data: restaurants
  });
});

// @desc    Get restaurant reviews
// @route   GET /api/v1/restaurants/:id/reviews
// @access  Public
exports.getRestaurantReviews = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id).populate({
    path: 'reviews',
    select: 'rating comment customer createdAt'
  });

  if (!restaurant) {
    return next(new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    count: restaurant.reviews.length,
    data: restaurant.reviews
  });
});

// @desc    Get restaurant operating hours
// @route   GET /api/v1/restaurants/:id/hours
// @access  Public
exports.getRestaurantHours = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: restaurant.operatingHours
  });
});

// @desc    Update restaurant operating hours
// @route   PUT /api/v1/restaurants/:id/hours
// @access  Private
exports.updateRestaurantHours = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404));
  }

  restaurant.operatingHours = req.body.operatingHours;
  await restaurant.save();

  res.status(200).json({
    success: true,
    data: restaurant.operatingHours
  });
});
