import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Steps, Button, Spin, Alert, Card } from 'antd';
import { ShoppingOutlined, CreditCardOutlined, CheckOutlined } from '@ant-design/icons';

import PaymentMethod from '../components/payment/PaymentMethod';
import CreditCardForm from '../components/payment/CreditCardForm';
import PaymentSummary from '../components/payment/PaymentSummary';
import PayHereForm from '../components/payment/PayHereForm'; // Add this import
import { getOrderDetails, initializePayment, confirmPayment } from '../services/paymentService';
import { getAuthToken } from '../utils/auth';

const { Step } = Steps;

const CheckoutPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState('payhere'); // Default to PayHere
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null); // Add this state
  
  // For demo purposes, create a mock order if no orderId is provided
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        let orderData;
        
        if (orderId) {
          // Fetch real order from API
          orderData = await getOrderDetails(orderId);
        } else {
          // Mock order for testing
          orderData = {
            id: 'ORDER' + Math.floor(Math.random() * 1000),
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
        }
        
        setOrder(orderData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Unable to load order details. Please try again.');
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId]);
  
  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };
  
  const handleContinue = () => {
    setCurrentStep(1);
  };
  
  const handleBack = () => {
    setCurrentStep(0);
  };
  
  const handlePaymentSubmit = async (cardDetails) => {
    try {
      setSubmitting(true);
      setError(null);
      
      // Get auth token
      const token = getAuthToken();
      if (!token) {
        // Handle unauthenticated user
        setError('Please login to continue with payment');
        setSubmitting(false);
        return;
      }
      
      // Customer details - in a real app, this would come from user context
      const customerDetails = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '0771234567',
        address: '123 Main St',
        city: 'Colombo'
      };
      
      // Step 1: Initialize payment
      const paymentResponse = await initializePayment({
        orderId: order.id,
        amount: order.total,
        currency: 'LKR',
        paymentMethod: selectedMethod,
        customerDetails
      });
      
      setPaymentId(paymentResponse.payment.id);
      
      // Step 2: Handle different payment methods
      if (selectedMethod === 'payhere') {
        // Store payment details for PayHere form to use
        setPaymentDetails(paymentResponse.payment.paymentDetails);
      } else if (selectedMethod === 'cod') {
        // For Cash on Delivery, confirm the order directly
        await confirmPayment(paymentResponse.payment.id, {
          status: 'pending'  // COD payments stay pending until delivery
        });
        
        // Redirect to success page
        navigate(`/payment/success?order_id=${order.id}&method=cod`);
      }
    } catch (err) {
      console.error('Payment submission error:', err);
      setError('Payment processing failed. Please try again.');
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <p>Loading checkout details...</p>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="error-container">
        <Alert 
          message="Checkout Error" 
          description="Could not load order details. Please try again or contact support." 
          type="error" 
          showIcon 
        />
        <Button 
          type="primary" 
          onClick={() => window.history.back()} 
          className="back-button"
        >
          Go Back
        </Button>
      </div>
    );
  }
  
  return (
    <div className="checkout-page">
      <Card className="checkout-card">
        <h1 className="page-title">Checkout</h1>
        
        <Steps current={currentStep} className="checkout-steps">
          <Step title="Order Summary" icon={<ShoppingOutlined />} />
          <Step title="Payment" icon={<CreditCardOutlined />} />
          <Step title="Confirmation" icon={<CheckOutlined />} />
        </Steps>
        
        {error && (
          <Alert
            message="Payment Error"
            description={error}
            type="error"
            showIcon
            closable
            className="error-alert"
          />
        )}
        
        <Row gutter={[24, 24]} className="checkout-content">
          <Col xs={24} lg={currentStep === 0 ? 24 : 16}>
            {currentStep === 0 && (
              <>
                <PaymentSummary order={order} />
                <div className="checkout-actions">
                  <Button 
                    type="primary" 
                    size="large"
                    className="continue-button"
                    onClick={handleContinue}
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </>
            )}
            
            {currentStep === 1 && (
              <>
                <div className="payment-section">
                  <h2>Select Payment Method</h2>
                  <PaymentMethod 
                    selectedMethod={selectedMethod} 
                    onSelectMethod={handleMethodSelect} 
                  />
                  
                  {selectedMethod === 'payhere' && (
                    paymentDetails ? (
                      <PayHereForm 
                        paymentDetails={paymentDetails} 
                        loading={submitting} 
                      />
                    ) : (
                      <div className="payment-provider-info">
                        <img 
                          src="/src/assets/images/payhere.png" 
                          alt="PayHere" 
                          className="payment-provider-logo" 
                        />
                        <p>You will be redirected to PayHere to complete your payment.</p>
                        <Button 
                          type="primary" 
                          size="large" 
                          className="payment-button"
                          onClick={() => handlePaymentSubmit()}
                          loading={submitting}
                        >
                          Pay with PayHere
                        </Button>
                      </div>
                    )
                  )}
                  
                  {selectedMethod === 'cod' && (
                    <div className="payment-provider-info">
                      <div className="cod-icon">💵</div>
                      <h3>Cash On Delivery</h3>
                      <p>Pay in cash when your order is delivered.</p>
                      <Button 
                        type="primary" 
                        size="large" 
                        className="payment-button"
                        onClick={() => handlePaymentSubmit()}
                        loading={submitting}
                      >
                        Place Order (Pay on Delivery)
                      </Button>
                    </div>
                  )}
                  
                  <div className="payment-actions">
                    <Button 
                      onClick={handleBack} 
                      disabled={submitting}
                      className="back-button"
                    >
                      Back to Order Summary
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Col>
          
          {currentStep === 1 && (
            <Col xs={24} lg={8}>
              <PaymentSummary order={order} />
            </Col>
          )}
        </Row>
      </Card>
    </div>
  );
};

export default CheckoutPage;