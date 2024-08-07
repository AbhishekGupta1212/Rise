import React, { useState } from 'react';
import { Card, Table, Space, Button, Input, Modal, Form, Select, Tag, Row, Col, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, PrinterOutlined, ReadOutlined } from '@ant-design/icons';
import printJS from 'print-js';

// Constants
const { Option } = Select;
const statusColors = {
  Published: 'green',
  Draft: 'orange',
};

// Dummy Data
const initialAnnouncementsData = [
  { key: '1', title: 'Tomorrow is holiday! ', createdBy: 'Admin', startDate: '2024-08-01', endDate: '2024-08-31', status: 'Published' },
  { key: '2', title: 'Tomorrow is holiday!', createdBy: 'User', startDate: '2024-08-05', endDate: '2024-09-05', status: 'Draft' },
  { key: '3', title: 'Tomorrow is holiday!', createdBy: 'Admin', startDate: '2024-08-10', endDate: '2024-09-10', status: 'Published' },
  { key: '4', title: 'Today is holiday!', createdBy: 'Admin', startDate: '2024-08-15', endDate: '2024-09-15', status: 'Draft' },
];

const AnnouncementsPage = () => {
  const [filteredData, setFilteredData] = useState(initialAnnouncementsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    {
      title: 'Created By', 
      dataIndex: 'createdBy', 
      key: 'createdBy',
      render: text => (
        <Space>
          <Avatar style={{ backgroundColor: '#f56a00' }}>
            {text.charAt(0).toUpperCase()}
          </Avatar>
          {text}
        </Space>
      )
    },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: status => (
      <Tag color={statusColors[status]}>{status}</Tag>
    ) },
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
    applyFilters(value);
  };

  const applyFilters = (search) => {
    const filtered = initialAnnouncementsData.filter(item =>
      item.title.toLowerCase().includes(search) ||
      item.createdBy.toLowerCase().includes(search)
    );
    setFilteredData(filtered);
  };

  const handleEdit = announcement => {
    setCurrentAnnouncement(announcement);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const onEditFinish = values => {
    const updatedData = filteredData.map(item =>
      item.key === currentAnnouncement.key ? { ...item, ...values } : item
    );
    setFilteredData(updatedData);
    setIsEditModalVisible(false);
  };

  const handleDelete = key => {
    const updatedData = filteredData.filter(item => item.key !== key);
    setFilteredData(updatedData);
  };

  const handleAddAnnouncement = () => {
    setIsAddModalVisible(true);
  };

  const handleAddAnnouncementCancel = () => {
    setIsAddModalVisible(false);
  };

  const onAddAnnouncementFinish = values => {
    const newAnnouncement = {
      key: `${filteredData.length + 1}`,
      ...values,
    };
    setFilteredData([...filteredData, newAnnouncement]);
    setIsAddModalVisible(false);
  };

  const handlePrint = () => {
    printJS({
      printable: filteredData,
      properties: ['title', 'createdBy', 'startDate', 'endDate', 'status'],
      type: 'json',
      header: 'Announcements',
    });
  };

  return (
    <Card>
      <Row gutter={16} align="middle">
        <Col span={12}>
          <h1>Announcements</h1>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={handleAddAnnouncement} type="primary">Add Announcement</Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={24} style={{ marginBottom: 16 }}>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Button icon={<ReadOutlined />} />
            <Space>
              <Button onClick={handlePrint} icon={<PrinterOutlined />}>Print</Button>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </Space>
          </Space>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
      />

      {/* Edit Announcement Modal */}
      <Modal
        title="Edit Announcement"
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={currentAnnouncement}
          onFinish={onEditFinish}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter announcement title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="createdBy"
            label="Created By"
            rules={[{ required: true, message: 'Please enter the creator name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select start date' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select end date' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select announcement status' }]}
          >
            <Select>
              <Option value="Published">Published</Option>
              <Option value="Draft">Draft</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
            <Button style={{ margin: '0 8px' }} onClick={handleEditCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Announcement Modal */}
      <Modal
        title="Add New Announcement"
        visible={isAddModalVisible}
        onCancel={handleAddAnnouncementCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={onAddAnnouncementFinish}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter announcement title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="createdBy"
            label="Created By"
            rules={[{ required: true, message: 'Please enter the creator name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select start date' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select end date' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select announcement status' }]}
          >
            <Select>
              <Option value="Published">Published</Option>
              <Option value="Draft">Draft</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add</Button>
            <Button style={{ margin: '0 8px' }} onClick={handleAddAnnouncementCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default AnnouncementsPage;
