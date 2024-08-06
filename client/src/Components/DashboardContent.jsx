import React from 'react';
import {
  UnorderedListOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  CompassOutlined,
  AppstoreOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Card, Progress, Typography } from 'antd';
import './DashboardContent.css'; 
import InvoiceOverviewCard from './InvoiceOverviewCard';
import IncomeVsExpensesOverviewCard from './IncomeVsExpensesOverviewCard';
import AllTasksOverviewCard from './AllTasksOverviewCard';
import TeamMembersOverviewCard from './TeamMembersOverviewCard';
import TicketStatusCard from './TicketStatusCard';
import ProjectTimeline from "./ProjectTimeline";
import EventsCard from "./EventsCard";
import TodoPrivateCard from "./TodoPrivateCard"
import ProjectsOverview from './ProjectsOverview';

const { Title, Text } = Typography;

const gridStyle = {
  width: '223px',
  height: '110px',
  textAlign: 'center',
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  margin: '8px', 
};

const gridoverview = {
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  width: '310px',
  height: 'auto',
  textAlign: 'center',
  padding: '16px',
  margin: '8px',
}

const textContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginLeft: '16px',
};

const cardStyle = {
  width: '328px',
  padding: '16px',
  boxShadow: 'none',
  border: '1px solid #f0f0f0',
  borderRadius: '8px',
  marginBottom: '16px',
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
  justifyContent: 'space-between',
  marginBottom: '16px',
};

const statStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
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
  flex: 1,
};

const ProjectsOverviewCard = () => (
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

const DashboardContent = () => {
  return (
    <>
      <Card>
        <Card.Grid className="custom-grid" style={gridStyle}>
          <ClockCircleOutlined style={{
            color: "#ffffff",
            backgroundColor: "#22b9ff",
            borderRadius: 0,
            fontSize: 24,
            padding: 8,
          }}/>
          <div style={textContainerStyle}>
            <Title level={1} style={{ margin: 0 }}>
              {/* Add your amount here if needed */}
            </Title>
            <Text>Started at : 09:15:29 am</Text>
          </div>
        </Card.Grid>
        <Card.Grid className="custom-grid" style={gridStyle}>
          <UnorderedListOutlined style={{
            color: "#ffffff",
            backgroundColor: "#22b9ff",
            borderRadius: 0,
            fontSize: 24,
            padding: 8,
          }} />
          <div style={textContainerStyle}>
            <Title level={1} style={{ margin: 0 , fontWeight: 400}}>
              12
            </Title>
            <Text>My opens tasks</Text>
          </div>
        </Card.Grid>
        <Card.Grid className="custom-grid" style={gridStyle}>
          <CalendarOutlined style={{
            color: "#ffffff",
            backgroundColor: "#485bbd",
            borderRadius: 0,
            fontSize: 24,
            padding: 8,
          }} />
          <div style={textContainerStyle}>
            <Title level={1} style={{ margin: 0 , fontWeight: 400}}>
              0
            </Title>
            <Text>Events today</Text>
          </div>
        </Card.Grid>
        <Card.Grid className="custom-grid" style={gridStyle}>
          <CompassOutlined style={{
            color: "#ffffff",
            backgroundColor: "#fd397a",
            borderRadius: 0,
            fontSize: 24,
            padding: 8,
          }} />
          <div style={textContainerStyle}>
            <Title level={1} style={{ margin: 0 , fontWeight: 400}}>
              89,000
            </Title>
            <Text>Due</Text>
          </div>
        </Card.Grid>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <ProjectsOverviewCard />
        <InvoiceOverviewCard />
        <IncomeVsExpensesOverviewCard />
        <AllTasksOverviewCard />
        <TeamMembersOverviewCard />
        <TicketStatusCard />
        <ProjectTimeline />
        <EventsCard />
        <TodoPrivateCard />
      </div>
    </>
  );
};

export default DashboardContent;
