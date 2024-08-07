import React, { useState } from 'react';
import { Dropdown, Button, Input, Space, Menu } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import './Styles/SalesStore.css'; // Add your custom styles if any

const { SubMenu } = Menu;

const SalesStore = () => {
  const [category, setCategory] = useState('design');

  const handleCategoryChange = (e) => {
    setCategory(e.key);
  };

  const categoryMenu = (
    <Menu onClick={handleCategoryChange}>
      <Menu.Item key="design">Design</Menu.Item>
      <Menu.Item key="development">Development</Menu.Item>
      <Menu.Item key="service">Service</Menu.Item>
    </Menu>
  );

  return (
    <div className="store-container">
      <div className="store-header">
        <div className="left-title">
          <span className="store-title">Store</span>
        </div>
        <div className="right-controls">
          <Dropdown overlay={categoryMenu} trigger={['click']}>
            <Button>
              {category.charAt(0).toUpperCase() + category.slice(1)}<DownOutlined />
            </Button>
          </Dropdown>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="search-bar"
          />
        </div>
      </div>

      {/* Add your store content here */}
      <div className="content-container">
        {/* Store Content */}
      </div>
    </div>
  );
};

export default SalesStore;
