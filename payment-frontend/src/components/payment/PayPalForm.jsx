// payment-frontend/src/components/payment/PayPalForm.jsx
import React from 'react';
import { Button, Card } from 'antd';

const PayPalForm = ({ paymentDetails, loading }) => {
  const handlePayPalRedirect = () => {
    if (paymentDetails && paymentDetails.approveUrl) {
      window.location.href = paymentDetails.approveUrl;
    }
  };
  
  return (
    <Card title="PayPal Checkout" className="paypal-form">
      <div className="payment-provider-info">
        <img 
          src="/src/assets/images/paypal.png" 
          alt="PayPal" 
          className="payment-provider-logo" 
        />
        <p>You will be redirected to PayPal to complete your payment securely.</p>
        <Button 
          type="primary" 
          onClick={handlePayPalRedirect}
          loading={loading}
          className="payment-button"
        >
          Pay with PayPal
        </Button>
      </div>
    </Card>
  );
};

export default PayPalForm;