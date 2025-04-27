import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Input, DatePicker, Card, Space, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getPaymentHistory } from '../services/paymentService';

const { RangePicker } = DatePicker;

const PaymentHistoryPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState(null);
  
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        setLoading(true);
        // In a real app, the user ID would come from auth context
        const customerId = 'user123';
        const data = await getPaymentHistory(customerId);
        setPayments(data.payments);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPaymentHistory();
  }, []);
  
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  
  const handleDateChange = (dates) => {
    setDateRange(dates);
  };
  
  // Filter payments based on search text and date range
  const filteredPayments = payments.filter(payment => {
    // Filter by search text
    const searchMatch = searchText === '' || 
      payment.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
      payment.paymentMethod.toLowerCase().includes(searchText.toLowerCase());
    
    // Filter by date range
    let dateMatch = true;
    if (dateRange && dateRange[0] && dateRange[1]) {
      const paymentDate = new Date(payment.createdAt);
      dateMatch = paymentDate >= dateRange[0].startOf('day') && 
                  paymentDate <= dateRange[1].endOf('day');
    }
    
    return searchMatch && dateMatch;
  });
  
  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => `${record.currency} ${text.toFixed(2)}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: text => {
        let color = 'blue';
        if (text === 'card') color = 'green';
        if (text === 'payhere') color = 'purple';
        if (text === 'frimi') color = 'orange';
        if (text === 'cod') color = 'grey';
        
        return (
          <Tag color={color}>
            {text === 'card' ? 'Credit/Debit Card' : 
             text === 'payhere' ? 'PayHere' : 
             text === 'frimi' ? 'FriMi' : 
             text === 'cod' ? 'Cash On Delivery' : text}
          </Tag>
        );
      },
      filters: [
        { text: 'Credit/Debit Card', value: 'card' },
        { text: 'PayHere', value: 'payhere' },
        { text: 'FriMi', value: 'frimi' },
        { text: 'Cash On Delivery', value: 'cod' },
      ],
      onFilter: (value, record) => record.paymentMethod === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        let color = 'blue';
        if (status === 'completed') color = 'green';
        if (status === 'failed') color = 'red';
        if (status === 'pending') color = 'orange';
        if (status === 'refunded') color = 'grey';
        
        return (
          <Tag color={color}>
            {status.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        { text: 'Completed', value: 'completed' },
        { text: 'Pending', value: 'pending' },
        { text: 'Failed', value: 'failed' },
        { text: 'Refunded', value: 'refunded' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => window.open(`/receipt/${record._id}`, '_blank')}>
            View Receipt
          </Button>
          {record.status === 'completed' && (
            <Button type="link" danger disabled={record.status === 'refunded'}>
              Request Refund
            </Button>
          )}
        </Space>
      ),
    },
  ];
  
  return (
    <div className="payment-history-page">
      <Card 
        title="Payment History" 
        className="payment-history-card"
        extra={
          <div className="payment-history-filters">
            <Space>
              <Input
                placeholder="Search orders"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={handleSearch}
                className="search-input"
              />
              <RangePicker
                onChange={handleDateChange}
                placeholder={['Start Date', 'End Date']}
              />
            </Space>
          </div>
        }
      >
        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
            <p>Loading payment history...</p>
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredPayments}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
            className="payment-history-table"
          />
        )}
      </Card>
    </div>
  );
};

export default PaymentHistoryPage;