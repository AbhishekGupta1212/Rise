import React, { useState } from 'react';
import { Card, Table, Space, Button, Input, Modal, Form, Select, Dropdown, Menu, Row, Col, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, FilterOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import * as XLSX from 'xlsx';

const { Option } = Select;
const { Text } = Typography;

const initialTimeCardsData = [
  { key: '1', member: 'John Doe', inDate: '2024-08-06', inTime: '06:45:33 am', outDate: '2024-08-06', outTime: '07:32:00 am', duration: '00:46:27' },
  // Add more data as needed
];

const TimeCardsPage = () => {
  const [filteredData, setFilteredData] = useState(initialTimeCardsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState('All');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddTimeModalVisible, setIsAddTimeModalVisible] = useState(false);
  const [currentTimeCard, setCurrentTimeCard] = useState(null);
  const [currentDate, setCurrentDate] = useState(moment());

  const columns = [
    { title: 'Team Member', dataIndex: 'member', key: 'member' },
    { title: 'In Date', dataIndex: 'inDate', key: 'inDate' },
    { title: 'In Time', dataIndex: 'inTime', key: 'inTime' },
    { title: 'Out Date', dataIndex: 'outDate', key: 'outDate' },
    { title: 'Out Time', dataIndex: 'outTime', key: 'outTime' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration' },
    { title: 'Action', key: 'action', render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
      </Space>
    ) },
  ];

  const handleSearch = e => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    applyFilters(value, selectedMember);
  };

  const handleMemberFilter = ({ key }) => {
    setSelectedMember(key);
    applyFilters(searchTerm, key);
  };

  const handleEdit = timeCard => {
    setCurrentTimeCard(timeCard);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const onEditFinish = values => {
    const updatedData = filteredData.map(item =>
      item.key === currentTimeCard.key ? { ...item, ...values } : item
    );
    setFilteredData(updatedData);
    setIsEditModalVisible(false);
  };

  const handleDelete = key => {
    const updatedData = filteredData.filter(item => item.key !== key);
    setFilteredData(updatedData);
  };

  const applyFilters = (search, member) => {
    const filtered = initialTimeCardsData.filter(item =>
      item.member.toLowerCase().includes(search) &&
      (member === 'All' || item.member === member) &&
      moment(item.inDate).isSame(currentDate, 'day')
    );
    setFilteredData(filtered);
  };

  const handleAddTime = () => {
    setIsAddTimeModalVisible(true);
  };

  const handleAddTimeCancel = () => {
    setIsAddTimeModalVisible(false);
  };

  const onAddTimeFinish = values => {
    const newTimeCard = {
      key: `${filteredData.length + 1}`,
      ...values,
    };
    setFilteredData([...filteredData, newTimeCard]);
    setIsAddTimeModalVisible(false);
  };

  const memberMenu = (
    <Menu onClick={handleMemberFilter}>
      <Menu.Item key="All">All</Menu.Item>
      <Menu.Item key="John Doe">John Doe</Menu.Item>
      {/* Add more members as needed */}
    </Menu>
  );

  const handleDateChange = direction => {
    const newDate = direction === 'prev' ? currentDate.clone().subtract(1, 'days') : currentDate.clone().add(1, 'days');
    setCurrentDate(newDate);
    applyFilters(searchTerm, selectedMember);
  };

  const handleExcelExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TimeCards');
    XLSX.writeFile(workbook, 'timecards.xlsx');
  };

  const handlePrint = () => {
    window.print();
  };

  const calculateTotalDuration = () => {
    const totalDuration = filteredData.reduce((total, card) => {
      const [hours, minutes, seconds] = card.duration.split(':').map(Number);
      return total + moment.duration({ hours, minutes, seconds }).asSeconds();
    }, 0);

    const duration = moment.duration(totalDuration, 'seconds');
    const hours = String(duration.hours()).padStart(2, '0');
    const minutes = String(duration.minutes()).padStart(2, '0');
    const seconds = String(duration.seconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Card>
      <Row gutter={16} align="middle">
        <Col span={12}>
          <Row align="middle" justify="space-between">
          <Space >
                <h3>TimeCards</h3>
                <Button>Daily</Button>
                <Button>Custom</Button>
                <Button>Summary</Button>
                <Button>Summary Details</Button>
                <Button>Members Clocked In</Button>
                <Button>Clock In-Out</Button>
              </Space>
            <Col>
         
            </Col>
          </Row>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={handleAddTime} type="primary" icon={<PlusOutlined />}>Add Time Manually</Button>
          </Space>
        </Col>
      </Row>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <Space>
          <Dropdown overlay={memberMenu}>
            <Button>
              {selectedMember} <FilterOutlined />
            </Button>
          </Dropdown>
          <Button onClick={() => handleDateChange('prev')}>{'<'}</Button>
          <Button>{currentDate.format('YYYY-MM-DD')}</Button>
          <Button onClick={() => handleDateChange('next')}>{'>'}</Button>
        </Space>
        <Space>
          <Button onClick={handleExcelExport}>Excel</Button>
          <Button onClick={handlePrint}>Print</Button>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={handleSearch}
          />
        </Space>
      </Space>
      <Table columns={columns} dataSource={filteredData} rowKey="key" pagination={false} />
      <Row style={{ marginTop: 16 }}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Text strong>Total Duration: {calculateTotalDuration()}</Text>
        </Col>
      </Row>

      {/* Edit Time Modal */}
      <Modal
        title="Edit Time Card"
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={currentTimeCard}
          onFinish={onEditFinish}
        >
          <Form.Item
            name="member"
            label="Team Member"
            rules={[{ required: true, message: 'Please enter team member' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="inDate"
            label="In Date"
            rules={[{ required: true, message: 'Please select in date' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="inTime"
            label="In Time"
            rules={[{ required: true, message: 'Please enter in time' }]}
          >
            <Input type="time" />
          </Form.Item>
          <Form.Item
            name="outDate"
            label="Out Date"
            rules={[{ required: true, message: 'Please select out date' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="outTime"
            label="Out Time"
            rules={[{ required: true, message: 'Please enter out time' }]}
          >
            <Input type="time" />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: 'Please enter duration' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Update Time Card</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Time Modal */}
      <Modal
        title="Add Time Card"
        visible={isAddTimeModalVisible}
        onCancel={handleAddTimeCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={onAddTimeFinish}
        >
          <Form.Item
            name="member"
            label="Team Member"
            rules={[{ required: true, message: 'Please enter team member' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="inDate"
            label="In Date"
            rules={[{ required: true, message: 'Please select in date' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="inTime"
            label="In Time"
            rules={[{ required: true, message: 'Please enter in time' }]}
          >
            <Input type="time" />
          </Form.Item>
          <Form.Item
            name="outDate"
            label="Out Date"
            rules={[{ required: true, message: 'Please select out date' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="outTime"
            label="Out Time"
            rules={[{ required: true, message: 'Please enter out time' }]}
          >
            <Input type="time" />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: 'Please enter duration' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add Time Card</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default TimeCardsPage;
