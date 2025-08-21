# Quick Start Guide

Get your Vendor App Backend running in minutes!

## 🚀 One-Command Setup

```bash
# Navigate to backend directory
cd sample/backend

# Run the automated setup
npm run setup
```

This will:
- ✅ Create `.env` file from template
- ✅ Install dependencies
- ✅ Check MongoDB connection
- ✅ Seed database with test data
- ✅ Start the development server

## 📋 Manual Setup (if needed)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp env.example .env

# Edit .env with your settings
# At minimum, set JWT_SECRET
```

### 3. Start MongoDB
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env
```

### 4. Seed Database
```bash
npm run seed
```

### 5. Start Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🧪 Test the API

```bash
# Run API tests
npm run test:api
```

## 🔑 Test Credentials

After seeding, use these accounts:
- **Owner**: `owner@test.com` / `password123`
- **Manager**: `manager@test.com` / `password123`
- **Staff**: `staff@test.com` / `password123`

## 📡 API Endpoints

- **Health Check**: `http://localhost:5000/health`
- **API Info**: `http://localhost:5000/api`
- **Login**: `POST http://localhost:5000/api/auth/login`

## 🛠️ Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# Or start MongoDB
mongod
```

### Port Already in Use
```bash
# Change port in .env
PORT=5001
```

### Dependencies Issues
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

1. **Read the full documentation**: [README.md](README.md)
2. **Explore the API**: Use the test script or Postman
3. **Connect your frontend**: Update API base URL
4. **Customize**: Modify models and controllers as needed

## 🆘 Need Help?

- Check the [README.md](README.md) for detailed documentation
- Run `npm run test:api` to verify everything is working
- Check the console logs for error messages
- Ensure MongoDB is running and accessible

---

**Happy Coding! 🎉**
