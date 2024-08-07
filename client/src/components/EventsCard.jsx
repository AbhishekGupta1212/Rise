import React from 'react';
import { Timeline, Typography, Button, Divider } from 'antd';
import { CalendarOutlined, ShoppingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const eventsData = [
  { date: 'Tomorrow', time: '05:37:00 am – 06:47:00 am', event: 'Leadership Summit' },
  { date: 'Wed, August 07', time: '06:41:00 am – 07:31:00 am', event: 'Cultural Diversity Symposium' },
  { date: 'Mon, August 12', time: '08:21:00 am – 08:31:00 am', event: 'Work-Life Balance Workshop' },
  { date: 'Tue, August 13', time: '02:06:00 pm – 02:56:00 pm', event: 'Networking Mixer' },
  { date: 'Wed, August 14', time: '03:18:00 am – 04:18:00 am', event: 'Influencer Marketing Summit' },
  { date: 'Wed, August 14', time: '04:17:00 pm – 05:07:00 pm', event: 'Vendor Meet and Greet' },
  { date: 'Thu, August 15', time: '06:35:00 pm – 08:05:00 pm', event: 'Job Training Fair' },
  { date: 'Sat, August 17', time: '12:18:00 pm – 01:08:00 pm', event: 'Women in Leadership Forum' },
  { date: 'Sun, August 18', time: '06:59:00 am – 08:09:00 am', event: 'Customer Appreciation Day' },
  { date: 'Sun, August 18', time: '06:33:00 am – 07:53:00 am', event: 'Sales Training Workshop' },
  { date: 'Tue, August 20', time: '08:46:00 pm – 10:16:00 pm', event: 'Health and Wellness Fair' },
];

const EventsCard = () => {
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
        <CalendarOutlined style={{ fontSize: '20px', color: '#4e5e6a', marginRight: '8px' }} />
        <Title level={4} style={{ margin: 0, fontSize:'14px', color:'#4e5e6a'}}>Events</Title>
      </div>
      <Timeline mode="left">
        {eventsData.map((item, index) => (
          <Timeline.Item
            key={index}
            dot={<ShoppingOutlined style={{ fontSize: '16px', color: '#1890ff' }} />}
            style={{ paddingBottom: '16px' }}
          >
            <Text strong>{item.event}</Text>
            <div style={{ margin: '8px 0' }}>
              <Text type="secondary">{item.date}</Text> - <Text type="secondary">{item.time}</Text>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
      <Divider style={{ margin: '16px 0' }} />
      <Button type="link" style={{ display: 'block', margin: '0 auto' }}>Load more like this</Button>
    </div>
  );
};

export default EventsCard;
