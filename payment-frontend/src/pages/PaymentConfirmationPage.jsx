import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Result, Button, Spin, Card } from 'antd';
import { getOrderDetails } from '../services/paymentService';

const PaymentConfirmationPage = ({ success = true }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      // Get order_id from URL params
      const searchParams = new URLSearchParams(location.search);
      const orderId = searchParams.get('order_id');
      
      if (orderId) {
        try {
          setLoading(true);
          const orderData = await getOrderDetails(orderId);
          setOrder(orderData);
        } catch (error) {
          console.error('Error fetching order details:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [location]);
  
  const handleViewOrder = () => {
    // In a real app, this would navigate to the order tracking page
    navigate('/order/track');
  };
  
  const handleReturnToHome = () => {
    // Navigate to the home page
    navigate('/');
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <p>Processing your payment...</p>
      </div>
    );
  }
  
  if (success) {
    return (
      <div className="payment-confirmation">
        <Card className="confirmation-card">
          <Result
            status="success"
            title="Payment Successful!"
            subTitle={order ? `Your order #${order.id} has been confirmed.` : 'Your payment has been processed successfully.'}
            extra={[
              <Button type="primary" key="track" onClick={handleViewOrder}>
                Track Your Order
              </Button>,
              <Button key="home" onClick={handleReturnToHome}>
                Return to Home
              </Button>,
            ]}
          />
          
          {order && (
            <div className="confirmation-details">
              <h3>Order Summary</h3>
              <p><strong>Restaurant:</strong> {order.restaurant.name}</p>
              <p><strong>Total Amount:</strong> LKR {order.total.toFixed(2)}</p>
              <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
              <p><strong>Estimated Delivery Time:</strong> 30-45 minutes</p>
            </div>
          )}
        </Card>
      </div>
    );
  } else {
    return (
      <div className="payment-confirmation">
        <Card className="confirmation-card">
          <Result
            status="error"
            title="Payment Cancelled"
            subTitle="Your payment was not completed. Please try again."
            extra={[
              <Button type="primary" key="retry" onClick={() => window.history.back()}>
                Try Again
              </Button>,
              <Button key="home" onClick={handleReturnToHome}>
                Return to Home
              </Button>,
            ]}
          />
        </Card>
      </div>
    );
  }
};

export default PaymentConfirmationPage;