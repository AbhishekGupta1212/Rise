
import React, { useState } from 'react';
import { Card, Table, Space, Button, Input, Modal, Form, Select, Tag, Dropdown, Menu, Row, Col, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, FilterOutlined, SearchOutlined, FileAddOutlined, ExportOutlined, PrinterOutlined, UnorderedListOutlined, AppstoreOutlined, MenuOutlined, CalendarOutlined, ReadOutlined, BgColorsOutlined, UploadOutlined, MailTwoTone } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import printJS from 'print-js';
import emailjs from 'emailjs-com';

// Constants
const { Option } = Select;
const statusColors = {
  Active: 'green',
  Inactive: 'red',
};

// Dummy Data
const initialTeamData = [
  { key: '1', id: '101', name: 'John Doe', role: 'Developer', email: 'john.doe@example.com', status: 'Active' },
  { key: '2', id: '102', name: 'Jane Smith', role: 'Designer', email: 'jane.smith@example.com', status: 'Inactive' },
  { key: '3', id: '103', name: 'Alice Johnson', role: 'Project Manager', email: 'alice.johnson@example.com', status: 'Active' },
  { key: '4', id: '104', name: 'Bob Brown', role: 'QA Engineer', email: 'bob.brown@example.com', status: 'Active' },
];

const TeamMemberPage = () => {
  const [filteredData, setFilteredData] = useState(initialTeamData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddMemberModalVisible, setIsAddMemberModalVisible] = useState(false);
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
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
    applyFilters(value, selectedStatus);
  };

  const handleStatusFilter = ({ key }) => {
    setSelectedStatus(key);
    applyFilters(searchTerm, key);
  };

  const handleEdit = member => {
    setCurrentMember(member);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const onEditFinish = values => {
    const updatedData = filteredData.map(item =>
      item.key === currentMember.key ? { ...item, ...values } : item
    );
    setFilteredData(updatedData);
    setIsEditModalVisible(false);
  };

  const handleDelete = key => {
    const updatedData = filteredData.filter(item => item.key !== key);
    setFilteredData(updatedData);
  };

  const applyFilters = (search, status) => {
    const filtered = initialTeamData.filter(item =>
      (item.name.toLowerCase().includes(search) ||
      item.email.toLowerCase().includes(search)) &&
      (status === 'All' || item.status === status)
    );
    setFilteredData(filtered);
  };

  const handleAddMember = () => {
    setIsAddMemberModalVisible(true);
  };

  const handleAddMemberCancel = () => {
    setIsAddMemberModalVisible(false);
  };

  const onAddMemberFinish = values => {
    const newMember = {
      key: `${filteredData.length + 1}`,
      ...values,
    };
    setFilteredData([...filteredData, newMember]);
    setIsAddMemberModalVisible(false);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Team Members');
    XLSX.writeFile(wb, 'team_members.xlsx');
  };

  const handlePrint = () => {
    printJS({
      printable: filteredData,
      properties: ['id', 'name', 'role', 'email', 'status'],
      type: 'json',
      header: 'Team Members',
    });
  };

  const handleImport = (info) => {
    if (info.file.status === 'done') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const wb = XLSX.read(e.target.result, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws);
        setFilteredData([...filteredData, ...data]);
      };
      reader.readAsBinaryString(info.file.originFileObj);
    }
  };

  const handleSendInvitation = (values) => {
    const { email, role, message } = values;
    
    emailjs.send('service_p1n05u5', 'template_imtrxbc', {
      to_email: email,  // Recipient's email address
      role,
      message
    }, 'kEGQse1OiHP4_rj-I')
    .then((response) => {
      console.log('Invitation sent successfully:', response);
      setIsInviteModalVisible(false);
    })
    .catch((error) => {
      console.error('Error sending invitation:', error);
      alert('Failed to send invitation. Please try again later.');
      setIsInviteModalVisible(false);
    });
  };
  
  

  const statusMenu = (
    <Menu onClick={handleStatusFilter}>
      <Menu.Item key="All">All</Menu.Item>
      <Menu.Item key="Active">Active</Menu.Item>
      <Menu.Item key="Inactive">Inactive</Menu.Item>
    </Menu>
  );

  return (
    <Card>
      <Row gutter={16} align="middle">
        <Col span={12}>
          <h1>Team Members</h1>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Space>
            <Button icon={<MenuOutlined />} />
            <Button icon={<AppstoreOutlined />} />
            <Button onClick={() => setIsImportModalVisible(true)} icon={<UploadOutlined />}>Import Team Members</Button>
            <Button onClick={() => setIsInviteModalVisible(true)} type="default" icon={<MailTwoTone />}>Send Invitation</Button>
            <Button onClick={handleAddMember} type="primary">Add Member</Button>
          </Space>
        </Col>
      </Row>   
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={24} style={{ marginBottom: 16 }}>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>           
            <Space> 
              <Button icon={<ReadOutlined />} />
              <Dropdown overlay={statusMenu}>      
                <Button>
                  {selectedStatus} <FilterOutlined />
                </Button>    
              </Dropdown>
              <Button style={{ backgroundColor: '#f0f0f0' }} onClick={() => applyFilters(searchTerm, 'Active')}>Active Members</Button>
              <Button onClick={() => applyFilters(searchTerm, 'Inactive')}>Inactive Members</Button>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </Space>
            <Space>
              <Button onClick={handlePrint} icon={<PrinterOutlined />}>Print</Button>
              <Button onClick={handleExport} icon={<ExportOutlined />}>Export</Button>
            </Space>
          </Space>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
      />

      {/* Edit Member Modal */}
      <Modal
        title="Edit Team Member"
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={currentMember}
          onFinish={onEditFinish}
        >
          <Form.Item
            name="id"
            label="ID"
            rules={[{ required: true, message: 'Please enter member ID' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter member name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please enter member role' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select member status' }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
            <Button style={{ margin: '0 8px' }} onClick={handleEditCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Member Modal */}
      <Modal
        title="Add New Team Member"
        visible={isAddMemberModalVisible}
        onCancel={handleAddMemberCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={onAddMemberFinish}
        >
          <Form.Item
            name="id"
            label="ID"
            rules={[{ required: true, message: 'Please enter member ID' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter member name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please enter member role' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select member status' }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add</Button>
            <Button style={{ margin: '0 8px' }} onClick={handleAddMemberCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Import Modal */}
      <Modal
        title="Import Team Members"
        visible={isImportModalVisible}
        onCancel={() => setIsImportModalVisible(false)}
        footer={null}
      >
        <Upload
          accept=".xlsx, .xls"
          showUploadList={false}
          customRequest={handleImport}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Modal>

      {/* Invite Modal */}
      <Modal
        title="Send Invitation"
        visible={isInviteModalVisible}
        onCancel={() => setIsInviteModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSendInvitation}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please enter the role' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: 'Please enter the invitation message' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Send Invitation</Button>
            <Button style={{ margin: '0 8px' }} onClick={() => setIsInviteModalVisible(false)}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default TeamMemberPage;
