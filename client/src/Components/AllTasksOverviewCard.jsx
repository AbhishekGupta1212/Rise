import React from 'react';
import { Card, Typography, Progress, Row, Col } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

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
  fontSize: '20px',
  marginRight: '8px',
};

const progressContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '45px', // Increased gap between circle and text
};

const progressCircleStyle = {
  width: '80px',
  height: '80px',
};

const textContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const segmentStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const circleContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const AllTasksOverviewCard = () => {
  return (
    <Card style={gridoverview}>
      <div style={headerStyle}>
        <UnorderedListOutlined style={iconStyle} />
        <Title level={4} style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#4e5e6a' }}>
          All Tasks Overview
        </Title>
      </div>
      <div style={progressContainerStyle}>
        <div style={circleContainerStyle}>
          <Progress
            type="circle"
            percent={100} // Show all segments together
            strokeColor={{
              '0%': '#fadb14', // Yellow for Todo
              '25%': '#003b5c', // Deep blue for In Progress
              '50%': '#6f42c1', // Violet for Review
              '75%': '#ff4d4f', // Red for Expired
              '100%': '#ff4d4f', // Red for Expired
            }}
            strokeWidth={12}
            trailColor="#f0f0f0"
            style={progressCircleStyle}
          />
        </div>
        <div style={textContainerStyle}>
          <div style={segmentStyle}>
            <Text style={{ color: '#fadb14' }}>• Todo</Text>
            <Text>40</Text>
          </div>
          <div style={segmentStyle}>
            <Text style={{ color: '#003b5c' }}>• In Progress</Text>
            <Text>58</Text>
          </div>
          <div style={segmentStyle}>
            <Text style={{ color: '#6f42c1' }}>• Review</Text>
            <Text>69</Text>
          </div>
          <div style={segmentStyle}>
            <Text style={{ color: '#ff4d4f' }}>• Expired</Text>
            <Text>161</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AllTasksOverviewCard;
