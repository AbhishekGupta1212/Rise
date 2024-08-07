import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContent from '../Components/MainContent';
import DashboardContent from '../Components/DashboardContent';
import SalesInvoice from '../Components/Sales/SalesInvoice';
import OrderList from '../Components/Sales/OrderList';
import Payments from '../Components/Sales/Payments';
import SalesStore from '../Components/Sales/SalesStore';
import TeamMembersOverviewCard from '../Components/Team/TeamMembersOverviewCard';
import Tickets from '../Components/Tickets/Tickets';
// import AllTasksOverviewCard from '../Components/AllTasksOverviewCard';
import TimeCardsPage from '../Components/Team/TimeCards';
import TimelinePage from '../Components/Team/Timeline';
import AnnouncementsPage from '../Components/Team/Announcement';
import MainClient from '../Components/ClientPage';
import EventsCard from '../Components/EventsCard';
import ProjectPage from '../Components/Project/ProjectPage';
import ProjectTimelineCard from '../Components/Project/ProjectTimeline';
import ProjectsOverview from '../Components/Project/ProjectsOverview';
import IncomeVsExpensesOverviewCard from '../Components/IncomeVsExpensesOverviewCard';
import TodoPrivateCard from '../Components/TodoPrivateCard';
import TicketStatusCard from '../Components/Tickets/TicketStatusCard';
import Leads from '../Components/Leads';
import Subscriptions from '../Components/Subscriptions';
import Tasks from '../Components/Tasks';

const Dashboard = () => <div><DashboardContent/></div>;
const Task = () => <div><Tasks/></div>;
const Invoices = () => <div><SalesInvoice/></div>;
const OrdersList = () => <div><OrderList/></div>;
const Store = () => <div><SalesStore/></div>;
const Payment = () => <div><Payments/></div>;
const TeamMembers = () => <div><TeamMembersOverviewCard/></div>;
const TimeCards = () => <div><TimeCardsPage/></div>;
const Leave = () => <div></div>;
const Timeline = () => <div><TimelinePage/></div>;
const Announcement = () => <div><AnnouncementsPage/></div>;
const Ticket = () => <div><Tickets/></div>
const Clients=()=><div><MainClient/></div>
const Events=()=><div><EventsCard/></div>
const TicketStatus=()=><div><TicketStatusCard/></div>
const Todo=()=><div><TodoPrivateCard/></div>
const Comparison=()=><div><IncomeVsExpensesOverviewCard/></div>
const Projects=()=><div><ProjectPage/></div>
const ProjectTimeline=()=><div><ProjectTimelineCard/></div>
const ProjectOverview=()=><div><ProjectsOverview/></div>
const Lead=()=><div><Leads/></div>
const Subscription=()=><div><Subscriptions/></div>






const AllRoutes = () => (
  <Routes>
    <Route path="/" element={<MainContent />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<Tasks/>} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/orders-list" element={<OrdersList />} />
      <Route path="/store" element={<Store />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/team-members" element={<TeamMembers />} />
      <Route path="/time-cards" element={<TimeCards />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/announcement" element={<Announcement />} />
      <Route path="/ticket" element={<Ticket />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/events" element={<Events />} />
      <Route path="/ticket" element={<Ticket />} />
      <Route path="/ticketStatus" element={<TicketStatus />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/comparison" element={<Ticket />} />
      <Route path="/ticket" element={<Comparison />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projectTimeline" element={<ProjectTimeline />} />
      <Route path="/projectOverview" element={<ProjectOverview />} />
      <Route path="/lead" element={<Lead/>} />
      <Route path="/subscribe" element={<Subscription/>} />

    </Route>
  </Routes>
);

export default AllRoutes;
