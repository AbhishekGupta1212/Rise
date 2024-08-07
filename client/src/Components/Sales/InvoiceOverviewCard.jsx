import React from 'react';
import { Card, Typography, Progress } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

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
  fontSize: '24px',
  marginRight: '8px',
};

const statContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const statStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '12px',
  marginBottom: '8px', // Add margin bottom for spacing between elements
};

const textStyle = {
  fontWeight: '600',
};

const amountStyle = {
  fontWeight: '600',
  marginLeft: '10px',
};

const progressStyle = {
  flex: 1,
  marginLeft: '10px', // Add margin left to separate from text
};

const InvoiceOverviewCard = () => {
  return (
    <Card style={gridoverview}>
      <div style={headerStyle}>
        <FileTextOutlined style={iconStyle} />
        <Title level={4} style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#4e5e6a' }}>
          Invoice Overview
        </Title>
      </div>
      <div style={statContainerStyle}>
        <div style={statStyle}>
          <Text style={{ ...textStyle, color: '#d71c44' }}>Overdue</Text>
          <Text style={amountStyle}>$14,078.50</Text>
          <Progress percent={50} status="active" showInfo={false} style={{ ...progressStyle, backgroundColor: '#ffd4d4', color: '#d71c44', width:'130px' }} />
        </div>
        <div style={statStyle}>
          <Text style={{ ...textStyle, color: '#ffb822' }}>Not paid</Text>
          <Text style={amountStyle}>$9,376.00</Text>
          <Progress percent={30} status="active" showInfo={false} style={{ ...progressStyle, backgroundColor: '#fff5cc', color: '#ffb822' }} />
        </div>
        <div style={statStyle}>
          <Text style={{ ...textStyle, color: '#00c6ff' }}>Partially paid</Text>
          <Text style={amountStyle}>$10,720.00</Text>
          <Progress percent={70} status="active" showInfo={false} style={{ ...progressStyle, backgroundColor: '#e0f7ff', color: '#00c6ff' }} />
        </div>
        <div style={statStyle}>
          <Text style={{ ...textStyle, color: '#001f3f' }}>Fully paid</Text>
          <Text style={amountStyle}>$12,470.00</Text>
          <Progress percent={100} status="active" showInfo={false} style={{ ...progressStyle, backgroundColor: '#cce5ff', color: '#001f3f' }} />
        </div>
        <div style={statStyle}>
          <Text style={{ ...textStyle, color: '#a0a0a0' }}>Draft</Text>
          <Text style={amountStyle}>$0.00</Text>
          <Progress percent={0} status="active" showInfo={false} style={{ ...progressStyle, backgroundColor: '#f2f2f2', color: '#a0a0a0' }} />
        </div>
        <div style={statStyle}>
          <Text style={{ ...textStyle, color: '#4e5e6a' }}>Total invoiced</Text>
          <Text style={amountStyle}>$32,566.00</Text>
        </div>
        <div style={statStyle}>
          <Text style={{ ...textStyle, color: '#4e5e6a' }}>Due</Text>
          <Text style={amountStyle}>$14,736.00</Text>
        </div>
        <div style={statStyle}>
          <Text style={{ ...textStyle, color: '#4e5e6a' }}>Last 12 months</Text>
        </div>
      </div>
    </Card>
  );
};

export default InvoiceOverviewCard;
