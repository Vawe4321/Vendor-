const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  logout,
  refreshToken,
  changeRole,
  deactivateAccount,
  activateAccount,
  getUsers,
  deleteUser
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('role')
    .isIn(['owner', 'manager', 'staff'])
    .withMessage('Role must be owner, manager, or staff'),
  body('restaurantName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Restaurant name must be between 2 and 100 characters'),
  body('cuisine')
    .trim()
    .notEmpty()
    .withMessage('Cuisine is required'),
  body('address.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
  body('address.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('address.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('address.zipCode')
    .trim()
    .notEmpty()
    .withMessage('Zip code is required'),
  body('address.country')
    .trim()
    .notEmpty()
    .withMessage('Country is required')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const updateDetailsValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('avatar')
    .optional()
    .isURL()
    .withMessage('Avatar must be a valid URL')
];

const updatePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

const forgotPasswordValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
];

const resetPasswordValidation = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

const changeRoleValidation = [
  body('userId')
    .isMongoId()
    .withMessage('Valid user ID is required'),
  body('newRole')
    .isIn(['owner', 'manager', 'staff'])
    .withMessage('Role must be owner, manager, or staff')
];

// Public routes
router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.post('/forgotpassword', forgotPasswordValidation, validateRequest, forgotPassword);
router.put('/resetpassword/:resettoken', resetPasswordValidation, validateRequest, resetPassword);
router.get('/verify-email/:token', verifyEmail);
router.post('/refresh-token', refreshToken);

// Protected routes
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetailsValidation, validateRequest, updateDetails);
router.put('/updatepassword', protect, updatePasswordValidation, validateRequest, updatePassword);
router.post('/logout', protect, logout);

// Admin routes
router.get('/users', protect, authorize('owner'), getUsers);
router.put('/users/:userId/role', protect, authorize('owner'), changeRoleValidation, validateRequest, changeRole);
router.put('/users/:userId/deactivate', protect, authorize('owner'), deactivateAccount);
router.put('/users/:userId/activate', protect, authorize('owner'), activateAccount);
router.delete('/users/:userId', protect, authorize('owner'), deleteUser);

module.exports = router;
