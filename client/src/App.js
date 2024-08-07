import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DesktopOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  CheckCircleOutlined,
  RetweetOutlined,
  ShoppingCartOutlined,
  UsergroupAddOutlined,
  AccountBookOutlined,
  SettingOutlined,
  AuditOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
  BellOutlined,
  MailOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Input, Layout, Menu, Space, theme,} from 'antd';
import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import DashboardContent from './components/DashboardContent';
import SalesInvoice from './components/SalesInvoice';
import OrderList from './components/OrderList';
import Payments from './components/Payments';
import SalesStore from './components/SalesStore';

const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => <div style={{fontSize:'18px', fontWeight:'600',color:'#4e5e6a'}}>Dashboard<DashboardContent/></div>;
const Tasks = () => <div>Tasks Content</div>;
const Invoices = () => <div><SalesInvoice/></div>;
const OrdersList = () => <div><OrderList/></div>;
const Store = () => <div><SalesStore/></div>;
const Payment = () => <div><Payments/></div>;
const TeamMembers = () => <div>Team Members Content</div>;
const TimeCards = () => <div>Time Cards Content</div>;
const Leave = () => <div>Leave Content</div>;
const Timeline = () => <div>Timeline Content</div>;
const Announcement = () => <div>Announcement Content</div>;

const MainContent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '64px', backgroundColor: '#fff' }}>
          <img src="./default-stie-logo (2).png" alt="RICE Logo" style={{ height: '40px' }} />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1" icon={<DesktopOutlined />} onClick={() => navigate('/dashboard')}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingOutlined />}>
            Clients
          </Menu.Item>
          <Menu.Item key="3" icon={<AppstoreOutlined />}>
            Projects
          </Menu.Item>
          <Menu.Item key="4" icon={<CheckCircleOutlined />} onClick={() => navigate('/tasks')}>
            Tasks
          </Menu.Item>
          <Menu.Item key="5" icon={<MenuUnfoldOutlined />}>
            Leads
          </Menu.Item>
          <Menu.Item key="6" icon={<RetweetOutlined />}>
            Subscriptions
          </Menu.Item>
          <SubMenu key="7" icon={<ShoppingCartOutlined />} title="Sales">
            <Menu.Item key="7.1" onClick={() => navigate('/invoices')}>
              Invoices
            </Menu.Item>
            <Menu.Item key="7.2" onClick={() => navigate('/orders-list')}>
              Orders List
            </Menu.Item>
            <Menu.Item key="7.3" onClick={() => navigate('/store')}>
              Store
            </Menu.Item>
            <Menu.Item key="7.4" onClick={() => navigate('/payment')}>
              Payment
            </Menu.Item>
          </SubMenu>
          <SubMenu key="8" icon={<UsergroupAddOutlined />} title="Team">
            <Menu.Item key="8.1" onClick={() => navigate('/team-members')}>
              Team Members
            </Menu.Item>
            <Menu.Item key="8.2" onClick={() => navigate('/time-cards')}>
              Time Cards
            </Menu.Item>
            <Menu.Item key="8.3" onClick={() => navigate('/leave')}>
              Leave
            </Menu.Item>
            <Menu.Item key="8.4" onClick={() => navigate('/timeline')}>
              Timeline
            </Menu.Item>
            <Menu.Item key="8.5" onClick={() => navigate('/announcement')}>
              Announcement
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<AccountBookOutlined />}>
            Tickets
          </Menu.Item>
          <Menu.Item key="9" icon={<AuditOutlined />}>
            Reports
          </Menu.Item>
          <Menu.Item key="9" icon={<SettingOutlined />}>
            Setting
          </Menu.Item>
          <Menu.Item key="9" icon={<AccountBookOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer, position: 'fixed',zIndex: 1, marginTop:'-15px'}}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 66, height: 64 }}
          />
          <CheckCircleOutlined style={{fontSize: '16px', width: 66, height: 64, color:'#4e5e6a'}}/>
          <AppstoreOutlined style={{fontSize: '16px', width: 66, height: 64, color:'#4e5e6a'}}/>
          <ShoppingOutlined style={{fontSize: '16px', width: 66, height: 64, color:'#4e5e6a'}}/>
          <DesktopOutlined style={{fontSize: '16px', width: 66, height: 64, color:'#4e5e6a'}}/>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="search-bar"
          />
          <Dropdown menu={{ items }} trigger={['click']} style={{fontSize: '16px', width: 66, height: 64, color:'#4e5e6a'}}>
            <a onClick={(e) => e.preventDefault()}>
            <Space>
              <PlusCircleOutlined style={{fontSize: '16px', width: 66, height: 64, color:'#4e5e6a'}}/>
            </Space>
            </a>
          </Dropdown>
          <GlobalOutlined style={{fontSize: '16px', width: 66, height: 64, color:'#4e5e6a'}}/>
          <ClockCircleOutlined style={{fontSize: '16px', width: 66, height: 64, color:'#4e5e6a'}}/>
          <BellOutlined style={{fontSize: '16px', width: 66, height: 64, color:'#4e5e6a'}}/>
          <MailOutlined style={{fontSize: '16px', width: 66, height: 64, color:'#4e5e6a'}}/>
          <Space wrap size={16} style={{fontSize: '16px', width: 36, height: 64, color:'#4e5e6a'}}>
          <Avatar shape="square" size="small" style={{
        backgroundColor: '#87d068',
      }} icon={<UserOutlined />} />
          </Space>
          <span style={{fontSize: '16px', width: 36, height: 64, color:'#4e5e6a'}}
          >John Doe</span>
          
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
  <Button
    style={{ backgroundColor: '#dbdfe6' }} // Apply button color using inline style
    size="small"
    onClick={() => navigate('/dashboard')}
  />
  <Button
    style={{ backgroundColor: '#1677ff' }} // Apply button color using inline style
    size="small"
    className="blinking" // Apply the blinking class
    onClick={() => navigate('/tasks')}
  />
  <Button
    style={{ backgroundColor: '#1677ff' }} // Apply button color using inline style
    size="small"
  />
</div>

          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainContent />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="orders-list" element={<OrdersList />} />
        <Route path="store" element={<Store />} />
        <Route path="payment" element={<Payment />} />
        <Route path="team-members" element={<TeamMembers />} />
        <Route path="time-cards" element={<TimeCards />} />
        <Route path="leave" element={<Leave />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="announcement" element={<Announcement />} />
      </Route>
    </Routes>
  </Router>
);

export default App;