import React from 'react';
import { Card, Typography, Row, Col, Progress } from 'antd';
import { TeamOutlined, AudioOutlined } from '@ant-design/icons'; // Import the AudioOutlined icon

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

const announcementContainerStyle = {
  marginTop: '50px',
  paddingTop: '18px',
  borderTop: '1px solid #dcdcdc',
};

const announcementHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '4px',
};

const announcementTextStyle = {
  marginLeft: '8px',
};

const announcementDetailsStyle = {
  marginLeft: '28px', // Align the detail text under the "Last announcement" text
  fontSize: '14px',
  color: '#595959',
};

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
            <Progress percent={70} size="small" showInfo={false} />
            <Text style={{fontSize:'10px'}}>Members Clocked Out</Text>
          </Col>
        </Row>
      </div>
      {/* Last announcement section */}
      <div style={announcementContainerStyle}>
        <div style={announcementHeaderStyle}>
          <AudioOutlined style={iconStyle} />
          <Text style={announcementTextStyle}>Last announcement:</Text>
        </div>
        <Text style={announcementDetailsStyle}>Tomorrow is holiday!</Text>
      </div>
    </Card>
  );
};

export default TeamMembersOverviewCard;
