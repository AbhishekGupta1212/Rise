import React from 'react';
import { Timeline, Typography, Button, Divider } from 'antd';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const timelineData = [
  { date: '23-07-2024 12:00:00 am', action: 'Added Milestone: Beta Release', project: 'Mobile App Development', user: 'John Doe' },
  { date: '23-07-2024 12:00:00 am', action: 'Added Milestone: Release', project: 'Mobile App Development', user: 'John Doe' },
  { date: '23-07-2024 12:00:00 am', action: 'Added Task: #3278 - Design wireframes for mobile app', project: 'Mobile App Development', user: 'John Doe' },
  { date: '23-07-2024 12:00:00 am', action: 'Added Task: #3279 - Develop UI/UX for mobile app', project: 'Mobile App Development', user: 'John Doe' },
  { date: '23-07-2024 12:00:00 am', action: 'Added Task: #3280 - Implement login and authentication', project: 'Mobile App Development', user: 'John Doe' },
  { date: '23-07-2024 12:00:00 am', action: 'Added Task: #3281 - Create database schema for app', project: 'Mobile App Development', user: 'John Doe' },
  { date: '23-07-2024 12:00:00 am', action: 'Added Task: #3282 - Integrate APIs for data retrieval', project: 'Mobile App Development', user: 'John Doe' },
  { date: '23-07-2024 12:00:00 am', action: 'Added Task: #3283 - Build user registration functionality', project: 'Mobile App Development', user: 'John Doe' },
  { date: '23-07-2024 12:00:00 am', action: 'Added Task: #3284 - Test app functionality on different devices', project: 'Mobile App Development', user: 'John Doe' },
  { date: '23-07-2024 12:00:00 am', action: 'Added Task: #3285 - Implement push notification feature', project: 'Mobile App Development', user: 'John Doe' },
];

const ProjectTimelineCard = () => {
  return (
    <div style={{
      width: '310px',
      height: '400px',
      padding: '16px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#d9d9d9 #f0f0f0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      cursor: 'pointer',
      margin: '8px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <ClockCircleOutlined style={{ fontSize: '20px', color: '#4e5e6a', marginRight: '8px' }} />
        <Title level={4} style={{ margin: 0, fontSize:'14px', color: '#4e5e6a'   }}>Project Timeline</Title>
      </div>
      <Timeline mode="left">
        {timelineData.map((item, index) => (
          <Timeline.Item
            key={index}
            dot={<UserOutlined style={{ fontSize: '16px', color: '#1890ff' }} />}
            style={{ paddingBottom: '16px' }}
          >
            <Text strong>{item.user} </Text>
            <Text type="secondary">{item.date}</Text>
            <div style={{ margin: '8px 0' }}>
              <Text>{item.action}</Text>
            </div>
            <Text type="secondary">Project: {item.project}</Text>
          </Timeline.Item>
        ))}
      </Timeline>
      <Divider style={{ margin: '16px 0' }} />
      <Button type="link" style={{ display: 'block', margin: '0 auto' }}>Load more like this</Button>
    </div>
  );
};

export default ProjectTimelineCard;
