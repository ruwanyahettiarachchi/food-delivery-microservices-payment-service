import React from 'react';
import { Card, Descriptions, Divider, Tag } from 'antd';

const PaymentSummary = ({ order }) => {
  return (
    <Card title="Order Summary" className="payment-summary-card">
      <Descriptions column={1} bordered size="small" className="payment-summary-descriptions">
        <Descriptions.Item label="Order ID" className="order-id-item">
          <span className="order-id">{order.id}</span>
        </Descriptions.Item>
        
        <Descriptions.Item label="Restaurant">
          <div className="restaurant-info">
            <span className="restaurant-name">{order.restaurant.name}</span>
          </div>
        </Descriptions.Item>
        
        <Descriptions.Item label="Items" className="order-items">
          {order.items.map((item, index) => (
            <div key={index} className="order-item">
              <div className="item-quantity">x{item.quantity}</div>
              <div className="item-name">{item.name}</div>
              <div className="item-price">LKR {item.price.toFixed(2)}</div>
            </div>
          ))}
        </Descriptions.Item>
      </Descriptions>
      
      <Divider className="payment-summary-divider" />
      
      <div className="payment-summary-totals">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>LKR {order.subtotal.toFixed(2)}</span>
        </div>
        
        <div className="summary-row">
          <span>Delivery Fee:</span>
          <span>LKR {order.deliveryFee.toFixed(2)}</span>
        </div>
        
        {order.discount > 0 && (
          <div className="summary-row discount">
            <span>Discount:</span>
            <span>- LKR {order.discount.toFixed(2)}</span>
          </div>
        )}
        
        <Divider className="total-divider" />
        
        <div className="summary-row total">
          <span>Total:</span>
          <span className="total-amount">LKR {order.total.toFixed(2)}</span>
        </div>
      </div>
      
      <Divider className="payment-summary-divider" />
      
      <div className="additional-info">
        <div className="info-row">
          <span className="info-label">Delivery Address:</span>
          <span className="info-value">{order.deliveryAddress}</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">Status:</span>
          <Tag color={
            order.status === 'pending' ? 'orange' : 
            order.status === 'confirmed' ? 'green' : 
            order.status === 'cancelled' ? 'red' : 'blue'
          }>
            {order.status.toUpperCase()}
          </Tag>
        </div>
      </div>
    </Card>
  );
};

export default PaymentSummary;
