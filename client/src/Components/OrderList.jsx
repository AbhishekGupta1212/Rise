import React, { useState } from 'react';
import { Menu, Button, Dropdown, Space, Input } from 'antd';
import {
  PlusCircleOutlined,
  BlockOutlined,
  DownOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import './OrderList.css'; // Add your custom styles if any

const { SubMenu } = Menu;

const OrderList = () => {
  const [current, setCurrent] = useState('invoices');

  const handleClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const statusMenu = (
    <Menu>
      <Menu.Item key="overdue">New</Menu.Item>
      <Menu.Item key="draft">Processing</Menu.Item>
      <Menu.Item key="not-paid">Confirmed</Menu.Item>
    </Menu>
  );

  return (
    <div className="sales-invoice-container">
      <div className="menu-bar">
        <div className="left-menu">
          <span className="invoices-title">Orders</span>
          <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className="menu-items">
            <Menu.Item key="monthly">Monthly</Menu.Item>
            <Menu.Item key="yearly">Yearly</Menu.Item>
            <Menu.Item key="custom">Custom</Menu.Item>
          </Menu>
        </div>
        <div className="right-buttons">
          <Button type="text" className="menu-button"><PlusCircleOutlined />Add Order</Button>
        </div>
      </div>

      <div className="filter-bar">
        <div className="left-filters">
          <BlockOutlined style={{ fontSize: 16, marginRight: 16 }} />
          <Dropdown overlay={statusMenu} trigger={['click']}>
            <Button>Status<DownOutlined /></Button>
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
        {current === 'invoices' && <div>Orders Content</div>}
        {current === 'monthly' && <div>Monthly Content</div>}
        {current === 'yearly' && <div>Yearly Content</div>}
      </div>
    </div>
  );
};

export default OrderList;
