const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const paymentController = require('../controllers/paymentController');

// Initialize a payment
router.post('/initialize', protect, paymentController.initializePayment);

// Confirm a payment
router.put('/confirm/:paymentId', protect, paymentController.confirmPayment);

// Get payment by ID
router.get('/:paymentId', protect, paymentController.getPaymentById);

// Get payments by order ID
router.get('/order/:orderId', protect, paymentController.getPaymentsByOrderId);

// In payment-service/routes/paymentRoutes.js

// PayHere return and cancel URLs
router.get('/payhere/return', (req, res) => {
  // Redirect to frontend success page
  res.redirect(`${config.FRONTEND_URL}/payment/success?order_id=${req.query.order_id}`);
});

router.get('/payhere/cancel', (req, res) => {
  // Redirect to frontend cancel page
  res.redirect(`${config.FRONTEND_URL}/payment/cancel?order_id=${req.query.order_id}`);
});

// Webhook route for payment providers
router.post('/webhook/:provider', paymentController.handlePaymentWebhook);

// Webhook route for payment providers (typically no auth required)
router.post('/webhook', (req, res) => {
  // Process webhook notifications from payment providers
  console.log('Webhook received:', req.body);
  res.status(200).end();
});

module.exports = router;