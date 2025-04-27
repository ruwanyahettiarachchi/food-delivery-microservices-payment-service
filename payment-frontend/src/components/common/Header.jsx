import React from 'react';
import { Layout, Menu, Button, Dropdown, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined, ShoppingCartOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const Header = () => {
  const location = useLocation();
  
  // Mock user data - in a real app, this would come from auth context
  const user = {
    name: 'John Doe',
    isLoggedIn: true
  };
  
  const userMenu = (
    <Menu
      items={[
        {
          key: 'profile',
          icon: <UserOutlined />,
          label: <Link to="/profile">My Profile</Link>,
        },
        {
          key: 'orders',
          icon: <ShoppingCartOutlined />,
          label: <Link to="/orders">My Orders</Link>,
        },
        {
          key: 'payments',
          icon: <HistoryOutlined />,
          label: <Link to="/payment/history">Payment History</Link>,
        },
        {
          type: 'divider',
        },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'Logout',
        },
      ]}
    />
  );
  
  return (
    <AntHeader className="app-header">
      <div className="logo-container">
        <Link to="/">
          <h1 className="app-logo">FoodExpress</h1>
        </Link>
      </div>
      
      <div className="header-right">
        {user.isLoggedIn ? (
          <Dropdown overlay={userMenu} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
              <Space className="user-dropdown">
                <UserOutlined />
                <span>{user.name}</span>
              </Space>
            </a>
          </Dropdown>
        ) : (
          <Button type="primary" href="/login">Login</Button>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;