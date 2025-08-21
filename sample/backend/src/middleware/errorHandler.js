const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error with request details
  console.error('❌ Error Details:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
    body: req.body,
    params: req.params,
    query: req.query
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Invalid ${err.path}: ${err.value}`;
    error = { message, statusCode: 400 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `Duplicate field value: ${field} = ${value}. Please use another value.`;
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please log in again.';
    error = { message, statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired. Please log in again.';
    error = { message, statusCode: 401 };
  }

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    const message = `File too large. Maximum size is ${process.env.MAX_FILE_SIZE || '10MB'}`;
    error = { message, statusCode: 400 };
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    const message = 'Unexpected file field';
    error = { message, statusCode: 400 };
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    const message = 'Too many files uploaded';
    error = { message, statusCode: 400 };
  }

  // Express validator errors
  if (err.type === 'entity.parse.failed') {
    const message = 'Invalid JSON format';
    error = { message, statusCode: 400 };
  }

  // Network errors
  if (err.code === 'ECONNREFUSED') {
    const message = 'Database connection refused';
    error = { message, statusCode: 503 };
  }

  if (err.code === 'ETIMEDOUT') {
    const message = 'Request timeout';
    error = { message, statusCode: 408 };
  }

  // Rate limiting errors
  if (err.status === 429) {
    const message = 'Too many requests. Please try again later.';
    error = { message, statusCode: 429 };
  }

  // Default error response
  const response = {
    success: false,
    error: error.message || 'Internal Server Error',
    statusCode: error.statusCode || 500,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  };

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
    response.details = {
      name: err.name,
      code: err.code,
      status: err.status
    };
  }

  res.status(error.statusCode || 500).json(response);
};

module.exports = errorHandler;
