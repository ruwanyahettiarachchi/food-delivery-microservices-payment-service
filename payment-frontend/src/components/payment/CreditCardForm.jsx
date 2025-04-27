import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Card, Divider } from 'antd';
import { CreditCardOutlined, LockOutlined, UserOutlined, CalendarOutlined, SafetyOutlined } from '@ant-design/icons';

const CreditCardForm = ({ onSubmit, loading }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  
  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date with slash
  const formatExpiryDate = (value) => {
    const v = value.replace(/\//g, '').replace(/[^0-9]/gi, '');
    
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return value;
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
  };

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Card 
      title="Enter Card Details" 
      className="credit-card-form"
      extra={<div className="secure-badge"><LockOutlined /> Secure Payment</div>}
    >
      <Form
        name="credit_card"
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          name="cardholderName"
          label="Cardholder Name"
          rules={[{ required: true, message: 'Please enter the cardholder name' }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Name as it appears on card" 
            className="card-input"
          />
        </Form.Item>

        <Form.Item
          name="cardNumber"
          label="Card Number"
          rules={[
            { required: true, message: 'Please enter your card number' },
            { pattern: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, message: 'Please enter a valid card number' }
          ]}
        >
          <Input 
            prefix={<CreditCardOutlined />} 
            placeholder="1234 5678 9012 3456" 
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength={19}
            className="card-input"
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="expiryDate"
              label="Expiry Date"
              rules={[
                { required: true, message: 'Required' },
                { pattern: /^\d{2}\/\d{2}$/, message: 'Format: MM/YY' }
              ]}
            >
              <Input 
                prefix={<CalendarOutlined />}
                placeholder="MM/YY" 
                value={expiryDate}
                onChange={handleExpiryDateChange}
                maxLength={5}
                className="card-input"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="cvv"
              label="Security Code (CVV)"
              rules={[
                { required: true, message: 'Required' },
                { pattern: /^\d{3,4}$/, message: 'Invalid CVV' }
              ]}
            >
              <Input 
                prefix={<SafetyOutlined />}
                placeholder="123" 
                maxLength={4}
                className="card-input" 
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <div className="card-form-footer">
          <p className="secure-payment-note">
            <LockOutlined /> Your payment information is secure. We use encryption to protect your data.
          </p>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="payment-submit-button" 
              block
              loading={loading}
            >
              Pay Now
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};

export default CreditCardForm;