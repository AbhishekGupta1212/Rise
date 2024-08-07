import React from 'react';
import { Card, Typography, Tag, Row, Col, Progress } from 'antd';
import { TeamOutlined } from '@ant-design/icons';

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

const textContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const statStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
};

const processTagStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const processTag = (color) => (
  <Tag color={color} style={{ fontSize: '12px' }}>
    {color === 'green' ? 'Clocked In' : 'Clocked Out'}
  </Tag>
);

const TeamMembersOverviewCard = () => {
  return (
    <Card style={gridoverview}>
      <div style={headerStyle}>
        <TeamOutlined style={iconStyle} />
        <Title level={4} style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#4e5e6a', textAlign: 'center'}}>
          Team Members Overview
        </Title>
      </div>
      <div style={textContainerStyle}>
        <Row gutter={[16, 16]}>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Title level={2} style={{ margin: 0, fontSize: '18px' ,paddingRight:'40px'}}>5</Title>
            <Text>Team members</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Title level={2} style={{ margin: 0, fontSize: '18px',paddingRight:'40px' }}>0</Title>
            <Text>On leave today</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Title level={2} style={{ margin: 0, fontSize: '18px',paddingRight:'40px' }}>2</Title>
            <Progress percent={40} size="small" showInfo={false} status="exception" />
            <Text style={{fontSize:'10px'}}>Members Clocked In</Text>
            
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Title level={2} style={{ margin: 0, fontSize: '18px',paddingRight:'40px' }}>3</Title>
            <Progress percent={70} size="small" showInfo={false}  />
            <Text style={{fontSize:'10px'}}>Members Clocked Out</Text>
            
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default TeamMembersOverviewCard;
