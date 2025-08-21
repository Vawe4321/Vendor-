const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const menuRoutes = require('./routes/menu');
const analyticsRoutes = require('./routes/analytics');
const feedbackRoutes = require('./routes/feedback');
const profileRoutes = require('./routes/profile');
const notificationRoutes = require('./routes/notifications');
const customersRoutes = require('./routes/customers');

const app = express();

// Connect to database
connectDB();

// Import database test utilities
const { testDatabaseConnection, testAPIDataAccess } = require('./utils/dbTest');

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, process.env.ADMIN_URL].filter(Boolean)
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8081'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil(15 * 60 / 60) // minutes
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
app.use('/api/', limiter);

// Speed limiting
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // allow 50 requests per 15 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request above 50
});
app.use('/api/', speedLimiter);

// Body parsing middleware
app.use(express.json({ 
  limit: process.env.MAX_FILE_SIZE || '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: process.env.MAX_FILE_SIZE || '10mb' 
}));

// Compression middleware
app.use(compression());

// Request timestamp middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Vendor App API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      orders: '/api/orders',
      menu: '/api/menu',
      analytics: '/api/analytics',
      feedback: '/api/feedback',
      profile: '/api/profile',
      notifications: '/api/notifications',
      customers: '/api/customers'
    },
    documentation: '/api/docs',
    database: 'Connected to MongoDB',
    collections: ['users', 'restaurants', 'orders', 'menuitems', 'categories', 'customers', 'analytics']
  });
});

// Database status endpoint
app.get('/api/db-status', async (req, res) => {
  try {
    const dbStatus = await testDatabaseConnection();
    res.json({
      success: true,
      message: 'Database Status',
      ...dbStatus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database status check failed',
      details: error.message
    });
  }
});

// API data test endpoint
app.get('/api/test-data', async (req, res) => {
  try {
    const apiData = await testAPIDataAccess();
    res.json({
      success: true,
      message: 'API Data Test',
      ...apiData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'API data test failed',
      details: error.message
    });
  }
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/customers', customersRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API docs: http://localhost:${PORT}/api`);
  console.log(`🗄️ Database status: http://localhost:${PORT}/api/db-status`);
  console.log(`📊 API data test: http://localhost:${PORT}/api/test-data`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  
  // Test database connection on startup
  try {
    console.log('\n🔍 Testing database connection on startup...');
    const dbStatus = await testDatabaseConnection();
    if (dbStatus.success) {
      console.log('✅ Database connection verified successfully!');
      console.log(`📊 Total records: ${Object.values(dbStatus.counts).reduce((a, b) => a + b, 0)}`);
    } else {
      console.log('⚠️ Database connection test failed:', dbStatus.error);
    }
  } catch (error) {
    console.log('⚠️ Database connection test error:', error.message);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
