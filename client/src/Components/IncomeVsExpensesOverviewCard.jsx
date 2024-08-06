import React from 'react';
import { Card, Typography, Progress, Row, Col } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

const progressContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const textContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginLeft: '16px',
};

const chartContainerStyle = {
  marginTop: '16px',
  height: '200px', // Adjust height as needed
  overflow: 'hidden', // Ensure it does not overflow the card
};

const data = [
  { name: 'Jan', income: 4000, expenses: 2400 },
  { name: 'Feb', income: 3000, expenses: 1398 },
  { name: 'Mar', income: 2000, expenses: 9800 },
  { name: 'Apr', income: 2780, expenses: 3908 },
  { name: 'May', income: 1890, expenses: 4800 },
  { name: 'Jun', income: 2390, expenses: 3800 },
  { name: 'Jul', income: 3490, expenses: 4300 },
];

const IncomeVsExpensesOverviewCard = () => {
  return (
    <Card style={gridoverview}>
      <div style={headerStyle}>
        <ClockCircleOutlined style={iconStyle} />
        <Title level={4} style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#4e5e6a' }}>
          Income vs Expenses Overview
        </Title>
      </div>
      <Row align="middle">
        <Col>
          <Progress
            type="circle"
            percent={65}
            format={() => (
              <div>
                <Text style={{ color: '#52c41a' }}>Income</Text>
                <br />
                <Text style={{ color: '#f5222d' }}>Expenses</Text>
              </div>
            )}
            strokeColor={{
              '0%': '#f5222d',
              '100%': '#52c41a',
            }}
            strokeWidth={12}
          />
        </Col>
        <Col style={textContainerStyle}>
          <div>
            <Text>This Year</Text>
            <Title level={5} style={{ margin: 0, color: '#52c41a' }}>$17,830.00</Title>
            <Title level={5} style={{ margin: 0, color: '#f5222d' }}>$9,120.00</Title>
          </div>
          <div>
            <Text>Last Year</Text>
            <Title level={5} style={{ margin: 0, color: '#52c41a' }}>$0.00</Title>
            <Title level={5} style={{ margin: 0, color: '#f5222d' }}>$0.00</Title>
          </div>
        </Col>
      </Row>
      <div style={chartContainerStyle}>
        <LineChart width={280} height={180} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#52c41a" />
          <Line type="monotone" dataKey="expenses" stroke="#f5222d" />
        </LineChart>
      </div>
    </Card>
  );
};

export default IncomeVsExpensesOverviewCard;
