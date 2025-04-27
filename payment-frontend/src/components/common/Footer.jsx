import React from 'react';
import { Layout, Row, Col, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="app-footer">
      <Row justify="space-between">
        <Col xs={24} md={8}>
          <div className="footer-section">
            <h3>FoodExpress</h3>
            <p>Your favorite food, delivered fast and fresh.</p>
          </div>
        </Col>
        
        <Col xs={12} md={8}>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/restaurants">Restaurants</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </Col>
        
        <Col xs={12} md={8}>
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <Space size="middle" className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookOutlined />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterOutlined />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramOutlined />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedinOutlined />
              </a>
            </Space>
          </div>
        </Col>
      </Row>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FoodExpress. All rights reserved.</p>
      </div>
    </AntFooter>
  );
};

export default Footer;