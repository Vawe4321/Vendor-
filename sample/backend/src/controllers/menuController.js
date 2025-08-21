const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Private
const getMenuItems = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10, sort = 'name' } = req.query;
    
    const query = { restaurant: req.user.restaurant };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const menuItems = await MenuItem.find(query)
      .populate('category', 'name')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await MenuItem.countDocuments(query);

    res.status(200).json({
      success: true,
      data: menuItems,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Private
const getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id)
      .populate('category', 'name description');

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found'
      });
    }

    if (menuItem.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this menu item'
      });
    }

    res.status(200).json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Create menu item
// @route   POST /api/menu
// @access  Private
const createMenuItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const menuItem = await MenuItem.create({
      ...req.body,
      restaurant: req.user.restaurant
    });

    const populatedMenuItem = await MenuItem.findById(menuItem._id)
      .populate('category', 'name');

    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: populatedMenuItem
    });
  } catch (error) {
    console.error('Create menu item error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private
const updateMenuItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    let menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found'
      });
    }

    if (menuItem.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this menu item'
      });
    }

    menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('category', 'name');

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      data: menuItem
    });
  } catch (error) {
    console.error('Update menu item error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private
const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found'
      });
    }

    if (menuItem.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this menu item'
      });
    }

    await menuItem.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Toggle menu item availability
// @route   PUT /api/menu/:id/toggle-availability
// @access  Private
const toggleAvailability = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found'
      });
    }

    if (menuItem.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this menu item'
      });
    }

    await menuItem.toggleAvailability();

    res.status(200).json({
      success: true,
      message: 'Menu item availability toggled successfully',
      data: menuItem
    });
  } catch (error) {
    console.error('Toggle availability error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Toggle menu item popular status
// @route   PUT /api/menu/:id/toggle-popular
// @access  Private
const togglePopular = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found'
      });
    }

    if (menuItem.restaurant.toString() !== req.user.restaurant.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this menu item'
      });
    }

    await menuItem.togglePopular();

    res.status(200).json({
      success: true,
      message: 'Menu item popular status toggled successfully',
      data: menuItem
    });
  } catch (error) {
    console.error('Toggle popular error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get popular menu items
// @route   GET /api/menu/popular
// @access  Private
const getPopularItems = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const popularItems = await MenuItem.getPopularItems(req.user.restaurant, limit);

    res.status(200).json({
      success: true,
      data: popularItems
    });
  } catch (error) {
    console.error('Get popular items error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get recommended menu items
// @route   GET /api/menu/recommended
// @access  Private
const getRecommendedItems = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const recommendedItems = await MenuItem.getRecommendedItems(req.user.restaurant, limit);

    res.status(200).json({
      success: true,
      data: recommendedItems
    });
  } catch (error) {
    console.error('Get recommended items error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Search menu items
// @route   GET /api/menu/search
// @access  Private
const searchMenuItems = async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    
    const query = { 
      restaurant: req.user.restaurant,
      $text: { $search: q }
    };

    const items = await MenuItem.find(query)
      .populate('category', 'name')
      .limit(limit);

    res.status(200).json({
      success: true,
      data: items
    });
  } catch (error) {
    console.error('Search menu items error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get menu analytics
// @route   GET /api/menu/analytics
// @access  Private
const getMenuAnalytics = async (req, res) => {
  try {
    const analytics = await MenuItem.aggregate([
      {
        $match: { restaurant: req.user.restaurant }
      },
      {
        $group: {
          _id: null,
          totalItems: { $sum: 1 },
          averagePrice: { $avg: '$price' },
          totalCategories: { $addToSet: '$category' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: analytics[0] || { totalItems: 0, averagePrice: 0, totalCategories: 0 }
    });
  } catch (error) {
    console.error('Get menu analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Export menu items
// @route   GET /api/menu/export
// @access  Private
const exportMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find({ restaurant: req.user.restaurant })
      .populate('category', 'name')
      .sort('name');

    res.status(200).json({
      success: true,
      data: items
    });
  } catch (error) {
    console.error('Export menu items error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Bulk update menu items
// @route   PUT /api/menu/bulk-update
// @access  Private
const bulkUpdateItems = async (req, res) => {
  try {
    const { items, updates } = req.body;
    
    const updatePromises = items.map(item => 
      MenuItem.findByIdAndUpdate(item.id, updates, { new: true })
    );
    
    const updatedItems = await Promise.all(updatePromises);

    res.status(200).json({
      success: true,
      data: updatedItems
    });
  } catch (error) {
    console.error('Bulk update items error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Import menu items
// @route   POST /api/menu/import
// @access  Private
const importMenuItems = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Import functionality not implemented yet'
    });
  } catch (error) {
    console.error('Import menu items error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get menu categories
// @route   GET /api/menu/categories
// @access  Private
const getMenuCategories = async (req, res) => {
  try {
    const categories = await Category.find({ restaurant: req.user.restaurant })
      .sort('displayOrder name');

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Create category
// @route   POST /api/menu/categories
// @access  Private
const createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      description: req.body.description,
      restaurant: req.user.restaurant,
      displayOrder: req.body.displayOrder || 0
    });

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update category
// @route   PUT /api/menu/categories/:id
// @access  Private
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/menu/categories/:id
// @access  Private
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Reorder categories
// @route   PUT /api/menu/categories/reorder
// @access  Private
const reorderCategories = async (req, res) => {
  try {
    const { categories } = req.body;
    
    const updatePromises = categories.map(cat => 
      Category.findByIdAndUpdate(cat.id, { displayOrder: cat.displayOrder })
    );
    
    await Promise.all(updatePromises);

    res.status(200).json({
      success: true,
      message: 'Categories reordered successfully'
    });
  } catch (error) {
    console.error('Reorder categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

module.exports = {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
  togglePopular,
  getPopularItems,
  getRecommendedItems,
  searchMenuItems,
  getMenuAnalytics,
  exportMenuItems,
  bulkUpdateItems,
  importMenuItems,
  getMenuCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories
};

// Additional Category helpers for menu namespace
const getCategoriesForMenu = async (req, res) => {
  try {
    const categories = await Category.find({ restaurant: req.user.restaurant })
      .sort('displayOrder name');

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

const createCategoryForMenu = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ success: false, error: 'Name is required' });
    }

    const category = await Category.create({
      name: req.body.name,
      description: req.body.description,
      restaurant: req.user.restaurant,
      displayOrder: req.body.displayOrder || 0
    });

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

module.exports.getCategoriesForMenu = getCategoriesForMenu;
module.exports.createCategoryForMenu = createCategoryForMenu;