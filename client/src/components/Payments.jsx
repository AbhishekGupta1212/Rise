import React, { useState } from 'react';
import { Menu, Button, Dropdown, Space, Input } from 'antd';
import {
  TagOutlined,
  PlusCircleOutlined,
  BlockOutlined,
  DownOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import './Payments.css'; // Add your custom styles if any

const { SubMenu } = Menu;

const Payments = () => {
  const [current, setCurrent] = useState('invoices');

  const handleClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const typeMenu = (
    <Menu>
      <Menu.Item key="invoice">Cash</Menu.Item>
      <Menu.Item key="credit-note">Stripe</Menu.Item>
      <Menu.Item key="invoice">PayPal Payments Standards</Menu.Item>
      <Menu.Item key="credit-note">Paytm</Menu.Item>
    </Menu>
  );

  const statusMenu = (
    <Menu>
      <Menu.Item key="overdue">Event Planning and Management</Menu.Item>
      <Menu.Item key="draft">Brand Identity Creation</Menu.Item>
      <Menu.Item key="not-paid">E-Commerce Website Design</Menu.Item>
    </Menu>
  );

  const currencyMenu = (
    <Menu>
      <Menu.Item key="usd">USD</Menu.Item>
    </Menu>
  );

  return (
    <div className="sales-invoice-container">
      <div className="menu-bar">
        <div className="left-menu">
          <span className="invoices-title">Payment Received</span>
          <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className="menu-items">
            <Menu.Item key="monthly">Monthly</Menu.Item>
            <Menu.Item key="yearly">Yearly</Menu.Item>
            <Menu.Item key="custom">Custom</Menu.Item>
            <Menu.Item key="chart">Chart</Menu.Item>
          </Menu>
        </div>
        <div className="right-buttons">
          <Button type="text" className="menu-button"><PlusCircleOutlined />Add Payment</Button>
        </div>
      </div>

      <div className="filter-bar">
        <div className="left-filters">
          <BlockOutlined style={{ fontSize: 16, marginRight: 16 }} />
          <Dropdown overlay={typeMenu} trigger={['click']}>
            <Button>Payment method<DownOutlined /></Button>
          </Dropdown>
          <Dropdown overlay={currencyMenu} trigger={['click']}>
            <Button>Currency<DownOutlined /></Button>
          </Dropdown>
          <Dropdown overlay={statusMenu} trigger={['click']}>
            <Button>Project<DownOutlined /></Button>
          </Dropdown>
          
        </div>
        <div className="right-controls">
          
          <Button type="text" className="menu-button"><FileExcelOutlined />Excel</Button>
          <Button type="text" className="menu-button"><PrinterOutlined />Print</Button>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="search-bar"
          />
        </div>
      </div>

      <div className="content-container">
        {current === 'payments' && <div>Payments Content</div>}
        {current === 'monthly' && <div>Monthly Content</div>}
        {current === 'yearly' && <div>Yearly Content</div>}
        {current === 'custom' && <div>Custom Content</div>}
        {current === 'recurring' && <div>Chart Content</div>}
      </div>
    </div>
  );
};

export default Payments;
