#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Vendor App Backend Startup Script\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from template...');
  try {
    const envExamplePath = path.join(__dirname, 'env.example');
    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      console.log('✅ .env file created successfully');
      console.log('⚠️  Please edit .env file with your configuration before continuing');
      process.exit(0);
    } else {
      console.log('❌ env.example file not found');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
    process.exit(1);
  }
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Error installing dependencies:', error.message);
    process.exit(1);
  }
}

// Check if MongoDB is running (basic check)
console.log('🔍 Checking MongoDB connection...');
try {
  const mongoose = require('mongoose');
  require('dotenv').config();
  
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vendor_app';
  
  mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }).then(() => {
    console.log('✅ MongoDB connection successful');
    mongoose.connection.close();
    
    // Check if database is seeded
    console.log('🌱 Checking if database is seeded...');
    mongoose.connect(mongoURI).then(async () => {
      try {
        const Restaurant = require('./src/models/Restaurant');
        const existingRestaurant = await Restaurant.findOne({ name: 'Test Restaurant' });
        
        if (!existingRestaurant) {
          console.log('📊 Seeding database with test data...');
          execSync('npm run seed', { stdio: 'inherit', cwd: __dirname });
          console.log('✅ Database seeded successfully');
        } else {
          console.log('✅ Database already contains test data');
        }
        
        mongoose.connection.close();
        
        // Start the server
        console.log('🚀 Starting the server...');
        console.log('📡 Server will be available at: http://localhost:5000');
        console.log('🔗 Health check: http://localhost:5000/health');
        console.log('📚 API docs: http://localhost:5000/api');
        console.log('\n🛑 Press Ctrl+C to stop the server\n');
        
        execSync('npm run dev', { stdio: 'inherit', cwd: __dirname });
        
      } catch (error) {
        console.error('❌ Error during startup:', error.message);
        mongoose.connection.close();
        process.exit(1);
      }
    }).catch((error) => {
      console.error('❌ Error connecting to MongoDB:', error.message);
      console.log('\n💡 Make sure MongoDB is running:');
      console.log('   - Local: mongod');
      console.log('   - Or update MONGODB_URI in .env for cloud database');
      process.exit(1);
    });
    
  }).catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error.message);
    console.log('\n💡 Make sure MongoDB is running:');
    console.log('   - Local: mongod');
    console.log('   - Or update MONGODB_URI in .env for cloud database');
    process.exit(1);
  });
  
} catch (error) {
  console.error('❌ Error loading dependencies:', error.message);
  console.log('💡 Try running: npm install');
  process.exit(1);
}
