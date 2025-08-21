const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vendor_app';
    
                const options = {
              maxPoolSize: 10, // Maintain up to 10 socket connections
              serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
              socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
              bufferCommands: false, // Disable mongoose buffering
              useNewUrlParser: true,
              useUnifiedTopology: true,
            };

    const conn = await mongoose.connect(mongoURI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Connection State: ${conn.connection.readyState}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🛑 MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('Error during graceful shutdown:', err);
        process.exit(1);
      }
    });

    process.on('SIGTERM', async () => {
      try {
        await mongoose.connection.close();
        console.log('🛑 MongoDB connection closed through SIGTERM');
        process.exit(0);
      } catch (err) {
        console.error('Error during graceful shutdown:', err);
        process.exit(1);
      }
    });

    return conn;

  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
