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
import './SalesInvoice.css'; // Add your custom styles if any

const { SubMenu } = Menu;

const SalesInvoice = () => {
  const [current, setCurrent] = useState('invoices');

  const handleClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const typeMenu = (
    <Menu>
      <Menu.Item key="invoice">Invoice</Menu.Item>
      <Menu.Item key="credit-note">Credit Note</Menu.Item>
    </Menu>
  );

  const statusMenu = (
    <Menu>
      <Menu.Item key="overdue">Overdue</Menu.Item>
      <Menu.Item key="draft">Draft</Menu.Item>
      <Menu.Item key="not-paid">Not Paid</Menu.Item>
      <Menu.Item key="partially-paid">Partially Paid</Menu.Item>
      <Menu.Item key="fully-paid">Fully Paid</Menu.Item>
      <Menu.Item key="canceled">Canceled</Menu.Item>
      <Menu.Item key="credited">Credited</Menu.Item>
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
          <span className="invoices-title">Invoices</span>
          <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className="menu-items">
            <Menu.Item key="monthly">Monthly</Menu.Item>
            <Menu.Item key="yearly">Yearly</Menu.Item>
            <Menu.Item key="custom">Custom</Menu.Item>
            <Menu.Item key="recurring">Recurring</Menu.Item>
          </Menu>
        </div>
        <div className="right-buttons">
          <Button type="text" className="menu-button"><TagOutlined />Manage Level</Button>
          <Button type="text" className="menu-button"><PlusCircleOutlined />Add Payment</Button>
          <Button type="text" className="menu-button"><PlusCircleOutlined />Add Invoice</Button>
        </div>
      </div>

      <div className="filter-bar">
        <div className="left-filters">
          <BlockOutlined style={{ fontSize: 16, marginRight: 16 }} />
          <Dropdown overlay={typeMenu} trigger={['click']}>
            <Button>Type<DownOutlined /></Button>
          </Dropdown>
          <Dropdown overlay={statusMenu} trigger={['click']}>
            <Button>Status<DownOutlined /></Button>
          </Dropdown>
          <Dropdown overlay={currencyMenu} trigger={['click']}>
            <Button>Currency<DownOutlined /></Button>
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
        {current === 'invoices' && <div>Invoices Content</div>}
        {current === 'monthly' && <div>Monthly Content</div>}
        {current === 'yearly' && <div>Yearly Content</div>}
        {current === 'custom' && <div>Custom Content</div>}
        {current === 'recurring' && <div>Recurring Content</div>}
      </div>
    </div>
  );
};

export default SalesInvoice;
