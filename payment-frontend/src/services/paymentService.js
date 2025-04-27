import axios from 'axios';
import { getAuthToken } from '../utils/auth';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
});

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get order details
export const getOrderDetails = async (orderId) => {
  try {
    // In a real app, this would be an API call to the order service
    // For demonstration, we'll return mock data
    
    // If you want to test with a real API:
    // const response = await api.get(`/orders/${orderId}`);
    // return response.data.order;
    
    return {
      id: orderId || 'ORDER123',
      restaurant: {
        id: 'rest123',
        name: 'Delicious Bites Restaurant'
      },
      items: [
        { name: 'Chicken Biryani', quantity: 2, price: 850 },
        { name: 'Vegetable Curry', quantity: 1, price: 550 },
        { name: 'Mango Lassi', quantity: 2, price: 250 }
      ],
      subtotal: 2750,
      deliveryFee: 250,
      discount: 300,
      total: 2700,
      deliveryAddress: '123 Main St, Colombo 05, Sri Lanka',
      status: 'pending'
    };
  } catch (error) {
    console.error('Error getting order details', error);
    throw error;
  }
};

// Initialize payment
export const initializePayment = async (paymentData) => {
  try {
    const response = await api.post('/payments/initialize', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error initializing payment', error);
    throw error;
  }
};

// Confirm payment
export const confirmPayment = async (paymentId, confirmationData) => {
  try {
    const response = await api.put(`/payments/confirm/${paymentId}`, confirmationData);
    return response.data;
  } catch (error) {
    console.error('Error confirming payment', error);
    throw error;
  }
};

// Get payment history
export const getPaymentHistory = async (customerId) => {
  try {
    // In a real app, this would call the API
    // const response = await api.get(`/payments/customer/${customerId}`);
    // return response.data;
    
    // For demonstration, we'll return mock data
    return {
      success: true,
      count: 5,
      payments: [
        {
          _id: 'pay1',
          orderId: 'ORDER123',
          amount: 2700,
          currency: 'LKR',
          paymentMethod: 'card',
          status: 'completed',
          createdAt: '2023-05-15T08:30:00Z'
        },
        {
          _id: 'pay2',
          orderId: 'ORDER456',
          amount: 1850,
          currency: 'LKR',
          paymentMethod: 'payhere',
          status: 'completed',
          createdAt: '2023-05-10T12:45:00Z'
        },
        {
          _id: 'pay3',
          orderId: 'ORDER789',
          amount: 3200,
          currency: 'LKR',
          paymentMethod: 'frimi',
          status: 'failed',
          createdAt: '2023-05-05T18:15:00Z'
        },
        {
          _id: 'pay4',
          orderId: 'ORDER101',
          amount: 1500,
          currency: 'LKR',
          paymentMethod: 'cod',
          status: 'pending',
          createdAt: '2023-05-01T09:20:00Z'
        },
        {
          _id: 'pay5',
          orderId: 'ORDER202',
          amount: 2100,
          currency: 'LKR',
          paymentMethod: 'card',
          status: 'refunded',
          createdAt: '2023-04-25T14:10:00Z'
        }
      ]
    };
  } catch (error) {
    console.error('Error getting payment history', error);
    throw error;
  }
};

// Get payment by ID
export const getPaymentById = async (paymentId) => {
  try {
    const response = await api.get(`/payments/${paymentId}`);
    return response.data.payment;
  } catch (error) {
    console.error('Error getting payment', error);
    throw error;
  }
};

// Request refund
export const requestRefund = async (paymentId, refundData) => {
  try {
    const response = await api.post(`/payments/${paymentId}/refund`, refundData);
    return response.data;
  } catch (error) {
    console.error('Error requesting refund', error);
    throw error;
  }
};