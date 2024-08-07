import React from 'react';
import { Card, Typography } from 'antd';
import { AccountBookOutlined } from '@ant-design/icons';
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
  fontSize: '20px',
  marginRight: '8px',
};

const statusContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const statusStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px', // Reduced gap between items
};

const categoryStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px', // Reduced gap between items
};

const statItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px', // Space between circle and text
  marginBottom: '8px',
};

const circleStyle = (color) => ({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: color,
});

const textStyle = {
  fontSize: '14px', // Smaller font size for text
  marginRight: '10px', // Space between text and number
  whiteSpace: 'nowrap', // Ensure text stays in one line
  overflow: 'hidden', // Hide overflow text
  textOverflow: 'ellipsis', // Add ellipsis if text overflows
};

const numberStyle = {
  fontSize: '14px', // Smaller font size for numbers
  fontWeight: '700',
};

const chartContainerStyle = {
  marginTop: '16px',
  width: '100%', // Ensure the chart container uses the full width of the card
  height: '160px', // Adjust height to fit the chart properly
  overflow:'hidden',
  
};

const sampleData = [
  { day: '2', new: 12, resolved: 18 },
  
  { day: '4', new: 11, resolved: 14 },
  
  { day: '6', new: 15, resolved: 10 },
  
  { day: '8', new: 14, resolved: 14 },
  
  { day: '10', new: 13, resolved: 18 },
  
  { day: '12', new: 17, resolved: 22 },
  
  { day: '14', new: 18, resolved: 22 },
  
  { day: '16', new: 22, resolved: 18 },
  
  { day: '18', new: 23, resolved: 14 },
  
  { day: '20', new: 22, resolved: 10 },
  
  { day: '22', new: 19, resolved: 14 },
  
  { day: '24', new: 20, resolved: 18 },
  
  { day: '26', new: 23, resolved: 22 },
  
  { day: '28', new: 25, resolved: 22 },
  
  { day: '30', new: 27, resolved: 18 },
];

const TicketStatusCard = () => {
  return (
    <Card style={gridoverview}>
      
      <div style={statusContainerStyle}>
      <div style={headerStyle}>
        <AccountBookOutlined style={iconStyle} />
        <Title level={4} style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#4e5e6a' }}>
          Ticket Status
        </Title>
      </div>
        <div style={statusStyle}>
          <div style={statItemStyle}>
            <div style={circleStyle('#fadb14')} /> {/* Yellow for New */}
            <Text style={textStyle}>New</Text>
            <Text level={4} style={numberStyle}>21</Text>
          </div>
          <div style={statItemStyle}>
            <div style={circleStyle('#ff4d4f')} /> {/* Red for Open */}
            <Text style={textStyle}>Open</Text>
            <Text level={4} style={numberStyle}>15</Text>
          </div>
          <div style={statItemStyle}>
            <div style={circleStyle('#003b5c')} /> {/* Blue for Closed */}
            <Text style={textStyle}>Closed</Text>
            <Text level={4} style={numberStyle}>69</Text>
          </div>
        </div>
        
        
        {/* <div style={categoryStyle}>
          <div style={statItemStyle}>
            <div style={circleStyle('#e0e0e0')} /> 
            <Text style={textStyle}>Gen. Support</Text> 
          </div>
          <div style={statItemStyle}>
            <div style={circleStyle('#d4a5a5')} /> 
            <Text style={textStyle}>Bug Reports</Text>
            <Text level={4} style={numberStyle}>25</Text>
          </div>
          <div style={statItemStyle}>
            <div style={circleStyle('#b0c4de')} /> 
            <Text style={textStyle}>Sales Inquiry</Text>
            <Text level={4} style={numberStyle}>19</Text>
          </div>
        </div> */}
      </div>
      <div style={chartContainerStyle}>
        <Title level={5} style={{ margin: 0, fontSize: '13px',color: '#4e5e6a' }}>New Tickets in Last 30 Days</Title>
        <LineChart width={280} height={140} data={sampleData} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="new" stroke="#8884d8" strokeWidth={2} dot={{ fill: '#8884d8' }} />
          <Line type="monotone" dataKey="resolved" stroke="#82ca9d" strokeWidth={2} dot={{ fill: '#82ca9d' }} />
        </LineChart>
      </div>
    </Card>
  );
};

export default TicketStatusCard;
