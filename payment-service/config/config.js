// payment-service/config/config.js
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const config = {
  // Server configuration
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database configuration
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/paymentdb',
  
  // JWT Authentication
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '30d',
  
  // PayHere Configuration
  PAYHERE_MERCHANT_ID: process.env.PAYHERE_MERCHANT_ID || '4OVxzCaot9s4JFnJVGY1vE3LF',
  PAYHERE_SECRET: process.env.PAYHERE_SECRET || '8cLHS90KbKu4TvNxO7ptcB4DpK9pUPE4D4Tz0RJAe8Dh',
  PAYHERE_API_TOKEN: process.env.PAYHERE_API_TOKEN || 'your_payhere_api_token',
  
  // Application URLs
  BASE_URL: process.env.BASE_URL || 'http://localhost:3001',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  
  // CORS settings
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  
  // Payment settings
  DEFAULT_CURRENCY: 'LKR',
  
  // Other settings
  API_VERSION: 'v1'
};

// Validate required configuration
const requiredConfig = [
  'MONGODB_URI',
  'JWT_SECRET'
];

// In production, ensure all required config values are set
if (config.NODE_ENV === 'production') {
  requiredConfig.forEach((key) => {
    if (!config[key]) {
      throw new Error(`Missing required config: ${key}`);
    }
  });
}

module.exports = config;