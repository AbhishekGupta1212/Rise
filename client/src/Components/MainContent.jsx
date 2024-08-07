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
  CalendarOutlined,
  PieChartOutlined,
  EllipsisOutlined,
  BookOutlined ,
  MessageOutlined,
  ArrowRightOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { Button, ColorPicker, Layout, Menu, theme } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const MainContent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '64px', backgroundColor: '#fff' }}>
          <img src="/path-to-your-logo.png" alt="RICE Logo" style={{ height: '40px' }} />
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DesktopOutlined />} onClick={() => navigate('/dashboard')}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="3" icon={<ShoppingOutlined />} onClick={() => navigate('/clients')}>
            Clients
          </Menu.Item>
          <Menu.Item key="4" icon={<AppstoreOutlined />} onClick={()=>navigate('/projects')}>
            Projects
          </Menu.Item>
          <Menu.Item key="5" icon={<CheckCircleOutlined />} onClick={() => navigate('/tasks')}>
            Tasks
          </Menu.Item>
          <Menu.Item key="6" icon={<MenuUnfoldOutlined />} onClick={()=>navigate('/lead')}>
            Leads
          </Menu.Item>
          <Menu.Item key="7" icon={<RetweetOutlined />} onClick={()=>navigate('/subscribe')}>
            Subscriptions
          </Menu.Item>
          <SubMenu key="8" icon={<ShoppingCartOutlined />} title="Sales">
            <Menu.Item key="8.1" onClick={() => navigate('/invoices')}>
              Invoices
            </Menu.Item>
            <Menu.Item key="8.2" onClick={() => navigate('/orders-list')}>
              Orders List
            </Menu.Item>
            <Menu.Item key="8.3" onClick={() => navigate('/store')}>
              Store
            </Menu.Item>
            <Menu.Item key="8.4" onClick={() => navigate('/payment')}>
              Payment
            </Menu.Item>
          </SubMenu>
 
          <SubMenu key="11" icon={<UsergroupAddOutlined />} title="Team">
            <Menu.Item key="11.1" onClick={() => navigate('/team-members')}>
              Team Members
            </Menu.Item>
            <Menu.Item key="11.2" onClick={() => navigate('/time-cards')}>
              Time Cards
            </Menu.Item>
            <Menu.Item key="11.3" onClick={() => navigate('/leave')}>
              Leave
            </Menu.Item>
            <Menu.Item key="11.4" onClick={() => navigate('/timeline')}>
              Timeline
            </Menu.Item>
            <Menu.Item key="11.5" onClick={() => navigate('/announcement')}>
              Announcement
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="12" icon={<AccountBookOutlined />} onClick={() => navigate('/ticket')}>
            Tickets
          </Menu.Item>
          
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer, position: 'fixed', zIndex: 1, marginTop:'-15px'}}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
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
            <ColorPicker
              defaultValue="#DBDFE6"
              size="small"
              onClick={() => navigate('/dashboard')}
            />
            <ColorPicker
              defaultValue="#1677FF"
              size="small"
              className="blinking"
              onClick={() => navigate('/tasks')}
            />
            <ColorPicker defaultValue="#1677FF" size="small" />
          </div>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainContent;
