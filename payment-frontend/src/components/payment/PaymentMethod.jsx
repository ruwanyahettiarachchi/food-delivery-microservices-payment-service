import React from 'react';
import { Radio, Card, Space } from 'antd';
import { DollarOutlined, BankOutlined } from '@ant-design/icons';

const PaymentMethod = ({ selectedMethod, onSelectMethod }) => {
  return (
    <div className="payment-method-container">
      <Radio.Group 
        onChange={(e) => onSelectMethod(e.target.value)} 
        value={selectedMethod}
        className="payment-method-group"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card 
            className={`payment-method-card ${selectedMethod === 'payhere' ? 'selected' : ''}`}
            hoverable
          >
            <Radio value="payhere">
              <div className="payment-method-content">
                <BankOutlined className="payment-method-icon" />
                <div className="payment-method-details">
                  <h3>PayHere</h3>
                  <p>Pay using credit/debit cards, mobile banking, eZ Cash and more</p>
                </div>
                <div className="payment-method-logos">
                  <img 
                    src="/src/assets/images/payhere.png" 
                    alt="PayHere" 
                    className="payment-provider-logo" 
                  />
                </div>
              </div>
            </Radio>
          </Card>
          
          <Card 
            className={`payment-method-card ${selectedMethod === 'cod' ? 'selected' : ''}`}
            hoverable
          >
            <Radio value="cod">
              <div className="payment-method-content">
                <DollarOutlined className="payment-method-icon" />
                <div className="payment-method-details">
                  <h3>Cash On Delivery</h3>
                  <p>Pay when your order arrives</p>
                </div>
              </div>
            </Radio>
          </Card>
        </Space>
      </Radio.Group>
    </div>
  );
};

export default PaymentMethod;