import React, { useState } from 'react';
import { Dropdown, Button, Input, Menu, Card, Modal, Table, notification } from 'antd';
import { DownOutlined, SearchOutlined, CloseOutlined, EditOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './SalesStore.css';

const { Meta } = Card;

const SalesStore = () => {
  const [category, setCategory] = useState('design');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.key);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const showProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const showCheckout = () => {
    setIsCheckoutVisible(true);
  };

  const closeCheckout = () => {
    setIsCheckoutVisible(false);
  };

  const handlePlaceOrder = () => {
    setIsOrderPlaced(true);
    setIsCheckoutVisible(false);
    setCart([]);
    notification.success({
      message: 'Order Placed',
      description: 'Your order has been placed successfully.',
    });
  };

  const categoryMenu = (
    <Menu onClick={handleCategoryChange}>
      <Menu.Item key="design">Design</Menu.Item>
      <Menu.Item key="development">Development</Menu.Item>
      <Menu.Item key="service">Service</Menu.Item>
    </Menu>
  );

  const products = [
    {
      title: 'Logo Design',
      price: '$100/PC',
      description: 'Professional logo design services',
      details: [
        'High-resolution logo',
        'Multiple design concepts',
        'Unlimited revisions',
      ],
      imgSrc: 'https://rise.fairsketch.com/files/timeline_files/item_file64be410b9e038-logo.jpg',
    },
    {
      title: '10GB Hosting',
      price: '$200/PC',
      description: 'Cloud Hosting service 10GB Space',
      details: [
        'Free support',
        '24 hours up time',
        'Super fast',
      ],
      imgSrc: 'https://rise.fairsketch.com/files/timeline_files/item_file64be42061593e-cloud.jpg',
    },
    {
      title: 'Art pictures',
      price: '$40/PC',
      description: 'Beautiful art pictures for decoration',
      details: [
        'High-quality print',
        'Framed options available',
        'Multiple sizes',
      ],
      imgSrc: 'https://rise.fairsketch.com/files/timeline_files/item_file64be42c3ba29c-art.jpg',
    },
    {
      title: 'Content writing',
      price: '$15/Hour',
      description: 'Professional content writing services',
      details: [
        'SEO optimized',
        'Engaging content',
        'Tailored to your needs',
      ],
      imgSrc: 'https://rise.fairsketch.com/files/timeline_files/item_file62af3c3e297db-item_file5f88b338f178b-item--11-.jpg',
    },
    {
      title: 'Custom app development',
      price: '$1000/PC',
      description: 'Tailored app development services',
      details: [
        'Full-stack development',
        'User-friendly design',
        'Ongoing support',
      ],
      imgSrc: 'https://rise.fairsketch.com/files/timeline_files/item_file64be3dea43b2b-app-development.jpg',
    },
    {
      title: 'Domain .com',
      price: '$11/PC',
      description: 'Get your own .com domain',
      details: [
        'Easy setup',
        'DNS management',
        'Free WHOIS protection',
      ],
      imgSrc: 'https://rise.fairsketch.com/files/timeline_files/item_file64be4a7486f31-domain.jpg',
    },
    {
      title: 'SEO',
      price: '$10/Hour',
      description: 'Professional SEO services',
      details: [
        'Increase website traffic',
        'On-page optimization',
        'Link building',
      ],
      imgSrc: 'https://rise.fairsketch.com/files/timeline_files/item_file64be3f6b9f4c9-seo.jpg',
    },
    {
      title: 'Website Design',
      price: '$20/Hour',
      description: 'Custom website design services',
      details: [
        'Responsive design',
        'UX/UI design',
        'Ongoing maintenance',
      ],
      imgSrc: 'https://rise.fairsketch.com/files/timeline_files/item_file64be400ece378-website.jpg',
    },
  ];

  const columns = [
    {
      title: 'Item',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: () => '1 PC', // For simplicity, quantity is always 1
    },
    {
      title: 'Rate',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Total',
      dataIndex: 'price',
      key: 'total',
    },
  ];

  const cartData = cart.map((product, index) => ({
    key: index,
    title: product.title,
    price: product.price,
    total: product.price,
  }));

  const subtotal = cart.reduce((sum, product) => sum + parseFloat(product.price.replace('$', '')), 0);

  return (
    <div className="store-container">
      <div className="store-header">
        <div className="left-title">
          <span className="store-title">Store</span>
        </div>
        <div className="right-controls">
          <Dropdown overlay={categoryMenu} trigger={['click']}>
            <Button>
              {category.charAt(0).toUpperCase() + category.slice(1)} <DownOutlined />
            </Button>
          </Dropdown>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="search-bar"
          />
          {cart.length > 0 && (
            <Button type="primary" style={{ backgroundColor: '#0abb87' }} icon={<ShoppingCartOutlined />} onClick={showCheckout}>
              Checkout
            </Button>
          )}
        </div>
      </div>

      <div className="content-container">
        {products.map((product, index) => (
          <Card
            key={index}
            hoverable
            className="product-card"
            cover={
              <div className="product-image-container" onClick={() => showProductDetails(product)}>
                <img alt={product.title} src={product.imgSrc} className="product-image" />
                <div className="view-details">View Details</div>
              </div>
            }
          >
            <Meta title={product.title} description={product.price} />
            <Button type="primary" className="add-to-cart-button" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </Card>
        ))}
      </div>

      <Modal
        visible={!!selectedProduct}
        onCancel={closeProductDetails}
        footer={null}
        closeIcon={<CloseOutlined />}
        centered
        width={600}
      >
        {selectedProduct && (
          <div className="product-detail">
            <img alt={selectedProduct.title} src={selectedProduct.imgSrc} className="product-detail-image" />
            <h2>{selectedProduct.title}</h2>
            <p className="product-detail-price">{selectedProduct.price}</p>
            <p>{selectedProduct.description}</p>
            <ul className="product-detail-list">
              {selectedProduct.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
            <Button type="primary" icon={<EditOutlined />} className="edit-button">
              Edit
            </Button>
          </div>
        )}
      </Modal>

      <Modal
        visible={isCheckoutVisible}
        onCancel={closeCheckout}
        footer={null}
        closeIcon={<CloseOutlined />}
        centered
        width={800}
      >
        <h2>Process Order</h2>
        <p>You are about to create the order. Please check details before submitting.</p>
        <Table columns={columns} dataSource={cartData} pagination={false} />
        <div className="checkout-summary">
          <div className="checkout-total">
            <span>Sub Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="checkout-total">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
        <Button type="primary" className="place-order-button" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Modal>

      <Modal
        visible={isOrderPlaced}
        onCancel={() => setIsOrderPlaced(false)}
        footer={null}
        closeIcon={<CloseOutlined />}
        centered
        width={600}
      >
        <h2>Order Confirmation</h2>
        <p>Your order has been successfully placed. Thank you for shopping with us!</p>
        <Button type="primary" onClick={() => setIsOrderPlaced(false)}>
          OK
        </Button>
      </Modal>
    </div>
  );
};

export default SalesStore;
