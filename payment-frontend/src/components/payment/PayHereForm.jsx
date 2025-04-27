import React from 'react';
import { Button, Card } from 'antd';
import { BankOutlined } from '@ant-design/icons';

const PayHereForm = ({ paymentDetails, loading }) => {
  // Function to submit form to PayHere
  const handleSubmit = () => {
    if (!paymentDetails || !paymentDetails.redirectUrl || !paymentDetails.paymentData) {
      console.error('Missing payment details for PayHere');
      return;
    }
    
    const { redirectUrl, paymentData } = paymentDetails;
    
    // Create and submit a form to redirect to PayHere
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = redirectUrl;
    
    // Add all payment data as hidden fields
    Object.entries(paymentData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });
    
    // Add form to document and submit
    document.body.appendChild(form);
    form.submit();
  };
  
  return (
    <Card title="PayHere Payment" className="payhere-form">
      <div className="payment-provider-info">
        <img 
          src="/src/assets/images/payhere.png" 
          alt="PayHere" 
          className="payment-provider-logo" 
        />
        <h3>Pay with PayHere</h3>
        <p>You will be redirected to PayHere's secure payment gateway to complete your payment.</p>
        <p>PayHere accepts credit/debit cards, mobile banking, eZ Cash, mCash and more.</p>
        
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          className="payment-button"
          icon={<BankOutlined />}
          size="large"
        >
          Proceed to PayHere
        </Button>
      </div>
    </Card>
  );
};

export default PayHereForm;