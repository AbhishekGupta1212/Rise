import React from 'react';
import { Layout, Menu, Breadcrumb, Row, Col, Input, Button, Dropdown, Space, Tag, Typography, Modal } from 'antd';
import { DownOutlined, UserOutlined, LaptopOutlined, NotificationOutlined, PlusOutlined, SearchOutlined, FilterOutlined, DownCircleOutlined, BugOutlined, UpOutlined, UsergroupAddOutlined, SunOutlined,TagOutlined,UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph } = Typography;

const Tasks = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const showModal2 = () => {
    setVisible2(true);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleOk2 = () => {
    setVisible2(false);
  };
  const handleCancel2 = () => {
    setVisible2(false);
  };

  const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: <a key={key}>list{key}</a>,
  }));
  const items2 = ['4', '5', '6'].map((key) => ({
    key,
    label: <a key={key}>list{key}</a>,
  }));

  return (
    <Layout>
      <Header className="site-layout-background" style={{ padding: 0 ,backgroundColor:'rgb(255 255 255)' }}  >
        <Row justify="space-between" align="middle" style={{ padding: '0 24px' }}>
          <Col>
            <Title level={4} style={{ color: 'black' }}>Tasks</Title>
          </Col>
          <Col>
            <Space size="middle">
              <Button type="link" style={{ color: 'black' }}>List</Button>
              <Button type="link" style={{ color: 'black' }}>Kanban</Button>
              <Button type="link" style={{ color: 'black' }}>Gantt</Button>
            </Space>
          </Col>
          <Col>
            <Space size="middle">
              <Button type="primary" icon={<TagOutlined />} onClick={showModal} style={{backgroundColor:'white' ,color:'black'}}>
                Manage labels
              </Button>
              <Button type="primary" icon={<UploadOutlined />} onClick={showModal2} style={{backgroundColor:'white' ,color:'black'}}>
                Import tasks
              </Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => {}} style={{backgroundColor:'white' ,color:'black'}}>
                Add multiple tasks
              </Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => {}} style={{backgroundColor:'white' ,color:'black'}}>
                Add task
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Row justify="space-between" align="middle" style={{ paddingBottom: 24 }}>
          <Col>
            <Space size="middle">
              <Button type="primary" icon={<FilterOutlined />} onClick={() => {}} style={{backgroundColor:'white' ,color:'black'}}>
                Filters▾
              </Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => {}} style={{backgroundColor:'white' ,color:'black'}}>
                +
              </Button>
              <Button type="primary" onClick={() => {}} style={{backgroundColor:'white' ,color:'black'}}>
                All tasks
              </Button>
              <Button type="primary" icon={<BugOutlined />} onClick={() => {}} style={{backgroundColor:'white' ,color:'black'}}>
                Bug
              </Button>
              <Button type="primary" icon={<UpOutlined />} onClick={() => {}} style={{backgroundColor:'white' ,color:'black'}}>
                ↑
              </Button>
              <Button type="primary" icon={<UsergroupAddOutlined />} onClick={() => {}} style={{backgroundColor:'white' ,color:'black'}}>
                
              </Button>
              <Button type="primary" icon={<SunOutlined />} onClick={() => {}} style={{backgroundColor:'white' ,color:'black'}}>
                
              </Button>
            </Space>
          </Col>
          <Col>
            <Space size="middle">
          
            </Space>
          </Col>
          <Col>
            <Space size="middle">
              <Button type="primary" onClick={() => {}} style={{backgroundColor:'white' ,color:'black'}}>
                Excel
              </Button>
              <Button type="primary" onClick={() => {}} style={{backgroundColor:'white' ,color:'black'}}>
                Print
              </Button>
              <Input placeholder="Search" prefix={<SearchOutlined />} size="large" />
            </Space>
          </Col>
        </Row>
      </Content>

      <Modal title="Manage labels" visible={visible} onOk={handleOk} onCancel={handleCancel} footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      <Modal title="Import tasks" visible={visible2} onOk={handleOk2} onCancel={handleCancel2} footer={[
        <Button key="back" onClick={handleCancel2}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk2}>
          Submit
        </Button>,
      ]}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Layout>
  );
};

export default Tasks;