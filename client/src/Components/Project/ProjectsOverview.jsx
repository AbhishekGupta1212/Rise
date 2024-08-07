import React from 'react';
import { AppstoreOutlined, BellOutlined } from '@ant-design/icons';
import { Card, Typography, Progress } from 'antd';

const { Title, Text } = Typography;

const ProjectsOverview = () => {
  const gridoverview = {
    width: '310px',
    height: 'auto',
    textAlign: 'left',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    margin: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  };

  const iconStyle = {
    fontSize: '24px',
    marginRight: '8px',
    color: '#4e5e6a',
  };

  const statContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  };

  const statStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const reminderContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px',
  };

  const reminderStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <Card style={gridoverview}>
      <div style={headerStyle}>
        <AppstoreOutlined style={iconStyle} />
        <Title level={4} style={{ margin: 0, fontSize: '13.5px', fontWeight: '700', color: '#4e5e6a' }}>
          Projects Overview
        </Title>
      </div>
      <div style={statContainerStyle}>
        <div style={statStyle}>
          <Title level={1} style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#01b393' }}>
            24
          </Title>
          <Text>Open</Text>
        </div>
        <div style={statStyle}>
          <Title level={1} style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#f5325c' }}>
            7
          </Title>
          <Text>Completed</Text>
        </div>
        <div style={statStyle}>
          <Title level={1} style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#ffb822' }}>
            0
          </Title>
          <Text>Hold</Text>
        </div>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Text>Progression</Text>
        <Progress percent={30} />
      </div>
      <div style={reminderContainerStyle}>
        <div style={reminderStyle}>
          <Title level={4} style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#f5325c' }}>
            0
          </Title>
          <Text>Reminder Today</Text>
        </div>
        <div style={reminderStyle}>
          <Text>
            <BellOutlined style={{ fontSize: '13.5px', fontWeight: '700', color: '#f5325c' }} /> Next reminder
          </Text>
          <Text disabled>No reminder</Text>
        </div>
      </div>
    </Card>
  );
};

export default ProjectsOverview;
