const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - require authentication
const protect = async (req, res, next) => {
  let token;

  // Check for token in headers or cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access denied. No token provided.',
      code: 'NO_TOKEN'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    const user = await User.findById(decoded.id)
      .select('-password')
      .populate('restaurant', 'name status');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found or token invalid.',
        code: 'USER_NOT_FOUND'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account is deactivated. Please contact support.',
        code: 'ACCOUNT_DEACTIVATED'
      });
    }

    // Check if user is locked
    if (user.isLocked) {
      return res.status(401).json({
        success: false,
        error: 'Account is temporarily locked. Please try again later.',
        code: 'ACCOUNT_LOCKED'
      });
    }

    // Check email verification (optional based on requirements)
    if (!user.isEmailVerified) {
      return res.status(401).json({
        success: false,
        error: 'Please verify your email address first.',
        code: 'EMAIL_NOT_VERIFIED'
      });
    }

    // Check if restaurant is active
    if (user.restaurant && !user.restaurant.status.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Restaurant is not active.',
        code: 'RESTAURANT_INACTIVE'
      });
    }

    // Add user to request
    req.user = user;
    
    // Log successful authentication
    console.log(`🔐 User authenticated: ${user.email} (${user.role})`);
    
    next();
  } catch (error) {
    console.error('❌ Authentication error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired. Please log in again.',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token. Please log in again.',
        code: 'INVALID_TOKEN'
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Authentication failed.',
      code: 'AUTH_FAILED'
    });
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required.',
        code: 'AUTH_REQUIRED'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Role '${req.user.role}' is not authorized for this action.`,
        code: 'INSUFFICIENT_PERMISSIONS',
        requiredRoles: roles,
        userRole: req.user.role
      });
    }
    
    console.log(`🔓 Role authorization passed: ${req.user.role} for ${req.originalUrl}`);
    next();
  };
};

// Optional authentication - doesn't require token but adds user if present
const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id)
        .select('-password')
        .populate('restaurant', 'name status');
        
      if (user && user.isActive && user.isEmailVerified && !user.isLocked) {
        req.user = user;
        console.log(`👤 Optional auth: User ${user.email} authenticated`);
      }
    } catch (error) {
      // Token is invalid, but we don't fail the request
      console.log('⚠️ Invalid token in optional auth:', error.message);
    }
  }

  next();
};

// Check if user owns the resource (for restaurant-specific operations)
const checkRestaurantOwnership = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required.',
      code: 'AUTH_REQUIRED'
    });
  }

  const restaurantId = req.params.restaurantId || req.body.restaurantId || req.query.restaurantId;
  
  if (!restaurantId) {
    return res.status(400).json({
      success: false,
      error: 'Restaurant ID is required.',
      code: 'RESTAURANT_ID_REQUIRED'
    });
  }

  if (req.user.restaurant.toString() !== restaurantId) {
    return res.status(403).json({
      success: false,
      error: 'Access denied. You can only access your own restaurant data.',
      code: 'RESTAURANT_ACCESS_DENIED'
    });
  }

  next();
};

// Rate limiting for authentication attempts
const authRateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth attempts per windowMs
  message: {
    success: false,
    error: 'Too many authentication attempts. Please try again later.',
    code: 'AUTH_RATE_LIMIT'
  },
  standardHeaders: true,
  legacyHeaders: false,
};

module.exports = {
  protect,
  authorize,
  optionalAuth,
  checkRestaurantOwnership,
  authRateLimit
};
