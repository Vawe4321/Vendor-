const Customer = require('../models/Customer');

const getCustomersBasic = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const customers = await Customer.find({})
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const total = await Customer.countDocuments({});

    res.status(200).json({
      success: true,
      data: customers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    });
  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const createCustomerBasic = async (req, res) => {
  try {
    const { name, email, phone, addresses } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        error: 'name, email, phone are required' 
      });
    }

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ 
        success: false, 
        error: 'Customer with this email already exists' 
      });
    }

    const customer = await Customer.create({ 
      name, 
      email, 
      phone, 
      addresses: addresses || [] 
    });

    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    console.error('Create customer error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        error: 'Customer with this email already exists' 
      });
    }
    
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { getCustomersBasic, createCustomerBasic };


