

import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Space, Button, Typography, Progress, Table, Tag, Avatar, Input, Dropdown, Menu as AntMenu, Modal, Form, Select, Checkbox, Upload, message, List } from 'antd';
import { UserOutlined, TeamOutlined, SolutionOutlined, FileAddOutlined, UploadOutlined, EditOutlined, DeleteOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import Papa from 'papaparse'; // For parsing CSV files

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// Dummy Data
let initialClientData = [
  { key: '1', name: 'John Doe', primaryContact: 'Jane Smith', phone: '+1 234 567 890', clientGroup: 'VIP', labels: ['Important'], projects: ['Project Alpha'], totalInvoiced: 5000, paymentReceived: 3000, due: 2000, hasDue: true },
  { key: '2', name: 'Alice Johnson', primaryContact: 'Bob Brown', phone: '+1 987 654 321', clientGroup: 'Silver', labels: ['Regular'], projects: ['Project Beta'], totalInvoiced: 3000, paymentReceived: 1500, due: 1500, hasDue: true },
];

let  initialContactData = [
  { key: '1', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 234 567 891', client: 'John Doe', status: 'Active' },
  { key: '2', name: 'Bob Brown', email: 'bob.brown@example.com', phone: '+1 987 654 322', client: 'Alice Johnson', status: 'Inactive' },
];

const overviewData = [
  { title: 'Total clients', value: 50, icon: <TeamOutlined />, color: '#4e73df' },
  { title: 'Total contacts', value: 150, icon: <UserOutlined />, color: '#f6c23e' },
  { title: 'Contacts logged in today', value: 10, icon: <SolutionOutlined />, color: '#36b9cc' },
  { title: 'Contacts logged in last 7 days', value: 35, icon: <SolutionOutlined />, color: '#36b9cc' },
];

const clientGroupMenu = (
  <AntMenu>
    <AntMenu.Item key="VIP">VIP</AntMenu.Item>
    <AntMenu.Item key="Silver">Silver</AntMenu.Item>
    <AntMenu.Item key="Bronze">Bronze</AntMenu.Item>
  </AntMenu>
);

const quickFilterMenu = (
  <AntMenu>
    <AntMenu.Item key="All">All</AntMenu.Item>
    <AntMenu.Item key="Active">Active</AntMenu.Item>
    <AntMenu.Item key="Inactive">Inactive</AntMenu.Item>
  </AntMenu>
);


const ClientTable = ({ data, onUpdate }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [hasDue, setHasDue] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Primary Contact', dataIndex: 'primaryContact', key: 'primaryContact' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Client Group', dataIndex: 'clientGroup', key: 'clientGroup' },
    { title: 'Labels', dataIndex: 'labels', key: 'labels', render: labels => labels.join(', ') },
    { title: 'Projects', dataIndex: 'projects', key: 'projects', render: projects => projects.join(', ') },
    { title: 'Total Invoiced', dataIndex: 'totalInvoiced', key: 'totalInvoiced' },
    { title: 'Payment Received', dataIndex: 'paymentReceived', key: 'paymentReceived' },
    { title: 'Due', dataIndex: 'due', key: 'due' },
    { title: 'Has Due', dataIndex: 'hasDue', key: 'hasDue', render: hasDue => (hasDue ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>) },
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
    applyFilters(value, selectedGroup, hasDue);
  };
  const handleDelete = key => {
    const updatedData = filteredData.filter(item => item.key !== key);
    setFilteredData(updatedData);
    onUpdate(updatedData); // Notify parent component
  };
  const handleGroupFilter = e => {
    const value = e.key;
    setSelectedGroup(value);
    applyFilters(searchTerm, value, hasDue);
  };

  const handleHasDueFilter = () => {
    setHasDue(prev => prev === null ? true : prev === true ? false : null);
  };

  const handleEdit = client => {
    setCurrentClient(client);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const onEditFinish = values => {
    const updatedData = filteredData.map(item =>
      item.key === currentClient.key
        ? { ...item, ...values }
        : item
    );
    setFilteredData(updatedData);
    setIsEditModalVisible(false);
    onUpdate(updatedData); // Notify parent component
  };

  const applyFilters = (search, group, hasDue) => {
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(search) ||
      item.primaryContact.toLowerCase().includes(search) ||
      item.phone.toLowerCase().includes(search)
    ).filter(item =>
      (group === 'All Clients' || item.clientGroup === group) &&
      (hasDue === null || item.hasDue === hasDue)
    );
    setFilteredData(filtered);
  };

  // Dropdown menu definitions for group filter
  const clientGroupMenu = (
    <Menu>
      <Menu.Item key="All Clients">All Clients</Menu.Item>
      <Menu.Item key="Has due">Has due</Menu.Item>
      <Menu.Item key="Has open projects">Has open projects</Menu.Item>
      <Menu.Item key="My Clients">My Clients</Menu.Item>
      <Menu.Item key="VIP">VIP</Menu.Item>
    </Menu>
    
  );




  return (
    <Card>
      <Title level={4}>Clients</Title>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <Space>
          <Dropdown overlay={clientGroupMenu} onClick={handleGroupFilter}>
            <Button>
              {selectedGroup} <FilterOutlined />
            </Button>
          </Dropdown>
          <Button icon={<FilterOutlined />} onClick={handleHasDueFilter}>
            {hasDue === null ? 'Has Due' : hasDue ? 'Has Due: Yes' : 'Has Due: No'}
          </Button>
          <Button  size="large" style={{ padding: 0, width: 'auto', height: 'auto' }}>🍵</Button>

          <Button size="small" style={{ padding: 0, width: 'auto', height: 'auto' }}>
      <Avatar shape="square" size="small" icon={<UserOutlined />} />
    </Button>
    <Button  size="large" style={{ padding: 0, width: 'auto', height: 'auto' }}>🎗️</Button>

        </Space>
        <Space>
          <Button>Excel</Button>
          <Button>Print</Button>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={handleSearch}
          />
        </Space>
      </Space>
      <Table columns={columns} dataSource={filteredData} rowKey="key" />
      <Modal title="Edit Client" visible={isEditModalVisible} onCancel={handleEditCancel} footer={null}>
        <Form
          layout="vertical"
          initialValues={currentClient}
          onFinish={onEditFinish}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter client name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="primaryContact"
            label="Primary Contact"
            rules={[{ required: true, message: 'Please enter primary contact' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="clientGroup"
            label="Client Group"
            rules={[{ required: true, message: 'Please select client group' }]}
          >
            <Select>
              <Option value="VIP">VIP</Option>
              <Option value="Silver">Silver</Option>
              <Option value="Bronze">Bronze</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="labels"
            label="Labels"
            rules={[{ required: true, message: 'Please select labels' }]}
          >
            <Select mode="multiple">
              <Option value="Important">Important</Option>
              <Option value="Regular">Regular</Option>
              <Option value="Prospective">Prospective</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="projects"
            label="Projects"
            rules={[{ required: true, message: 'Please enter projects' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="totalInvoiced"
            label="Total Invoiced"
            rules={[{ required: true, message: 'Please enter total invoiced amount' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="paymentReceived"
            label="Payment Received"
            rules={[{ required: true, message: 'Please enter payment received amount' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="due"
            label="Due"
            rules={[{ required: true, message: 'Please enter due amount' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="hasDue"
            label="Has Due"
            rules={[{ required: false}]}
            valuePropName="checked"
          >
            <Checkbox>Yes</Checkbox><Checkbox>No</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Update Client</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};


const ContactTable = ({ data, onUpdate }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [quickFilter, setQuickFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Client', dataIndex: 'client', key: 'client' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: status => <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag> },
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
    applyFilters(value, selectedGroup, quickFilter);
  };

  const handleGroupFilter = e => {
    const value = e.key;
    setSelectedGroup(value);
    applyFilters(searchTerm, value, quickFilter);
  };

  const handleQuickFilter = e => {
    const value = e.key;
    setQuickFilter(value);
    applyFilters(searchTerm, selectedGroup, value);
  };

  const handleEdit = contact => {
    setCurrentContact(contact);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const onEditFinish = values => {
    const updatedData = filteredData.map(item =>
      item.key === currentContact.key
        ? { ...item, ...values }
        : item
    );
    setFilteredData(updatedData);
    setIsEditModalVisible(false);
    onUpdate(updatedData); // Notify parent component
  };

  const handleDelete = key => {
    const updatedData = filteredData.filter(item => item.key !== key);
    setFilteredData(updatedData);
    onUpdate(updatedData); // Notify parent component
  };

  const applyFilters = (search, group, filter) => {
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(search) &&
      (group === 'All' || item.clientGroup === group) &&
      (filter === 'All' || filter === item.status)
    );
    setFilteredData(filtered);
  };

  // Dropdown menu definitions
  const clientGroupMenu = (
    <Menu onClick={handleGroupFilter}>
      <Menu.Item key="All">All</Menu.Item>
      <Menu.Item key="Group 1">Group 1</Menu.Item>
      <Menu.Item key="Group 2">Group 2</Menu.Item>
    </Menu>
  );

  const quickFilterMenu = (
    <Menu onClick={handleQuickFilter}>
      <Menu.Item key="All">All</Menu.Item>
      <Menu.Item key="Active">Active</Menu.Item>
      <Menu.Item key="Inactive">Inactive</Menu.Item>
    </Menu>
  );

  return (
    <Card>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <Space>
          <Dropdown overlay={clientGroupMenu}>
            <Button>
              {selectedGroup} <FilterOutlined />
            </Button>
          </Dropdown>
          <Dropdown overlay={quickFilterMenu}>
            <Button>
              Quick Filter <FilterOutlined />
            </Button>
          </Dropdown>
        </Space>
        <Space>
          <Button>Excel</Button>
          <Button>Print</Button>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={handleSearch}
          />
        </Space>
      </Space>
      <Table columns={columns} dataSource={filteredData} rowKey="key" />
      <Modal
        title="Edit Contact"
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={currentContact}
          onFinish={onEditFinish}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter contact name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="client"
            label="Client"
            rules={[{ required: true, message: 'Please select a client' }]}
          >
            <Select>
              <Option value="Client 1">Client 1</Option>
              <Option value="Client 2">Client 2</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Update Contact</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};


const Overview = () => (
  <>
    <Row gutter={16}>
      {overviewData.map((item, index) => (
        <Col span={6} key={index}>
          <Card>
            <Space>
              <Avatar style={{ backgroundColor: item.color, verticalAlign: 'middle' }} size="large" icon={item.icon} />
              <div>
                <Title level={4}>{item.value}</Title>
                <Text>{item.title}</Text>
              </div>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
    <Row gutter={16} style={{ marginTop: 16 }}>
      <Col span={8}>
        <Card>
          <Title level={5}>Clients has unpaid invoices</Title>
          <Progress percent={8} />
          <Title level={4}>4</Title>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Title level={5}>Clients has partially paid invoices</Title>
          <Progress percent={10} />
          <Title level={4}>5</Title>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Title level={5}>Clients has overdue invoices</Title>
          <Progress percent={14} status="exception" />
          <Title level={4}>7</Title>
        </Card>
      </Col>
    </Row>
    <Row gutter={16} style={{ marginTop: 16 }}>
      <Col span={12}>
        <Card title="Projects">
          <List
            itemLayout="horizontal"
            dataSource={[
              { title: 'Clients has open projects', value: 19, color: '#4e73df' },
              { title: 'Clients has completed projects', value: 5, color: '#1cc88a' },
              { title: 'Clients has hold projects', value: 0, color: '#f6c23e' },
              { title: 'Clients has canceled projects', value: 0, color: '#e74a3b' },
            ]}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                />
                <Text style={{ color: item.color }}>{item.value}</Text>
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Estimates">
          <List
            itemLayout="horizontal"
            dataSource={[
              { title: 'Client has open estimates', value: 5, color: '#f6c23e' },
              { title: 'Clients has accepted estimates', value: 10, color: '#1cc88a' },
              { title: 'Clients has new estimate requests', value: 1, color: '#4e73df' },
              { title: 'Clients has estimate requests in progress', value: 1, color: '#36b9cc' },
            ]}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                />
                <Text style={{ color: item.color }}>{item.value}</Text>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  </>
);

const MainClient = () => {
  const [current, setCurrent] = useState('overview');
  const [isClientModalVisible, setIsClientModalVisible] = useState(false);
  const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const [clientData, setClientData] = useState(initialClientData);
  const [contactData, setContactData] = useState(initialContactData);
  const [fileList, setFileList] = useState([]);

  const handleClick = e => {
    setCurrent(e.key);
  };

  const showClientModal = () => {
    setIsClientModalVisible(true);
  };

  const handleClientCancel = () => {
    setIsClientModalVisible(false);
  };

  const onClientFinish = values => {
    console.log('Form values:', values);
    const newClient = {
      key: `${clientData.length + 1}`, // Ensure this key is unique
      name: values.name,
      primaryContact: values.primaryContact,
      phone: values.phone,
      clientGroup: values.clientGroup,
      labels: values.labels || [], // Default to an empty array if labels are not provided
      projects: values.projects || [], // Default to an empty array if projects are not provided
      totalInvoiced: values.totalInvoiced,
      paymentReceived: values.paymentReceived,
      due: values.due,
      hasDue: values.hasDue === true // Ensure this is boolean
    };
    
    // Add the new client to the existing data
    setClientData(prevData => [...prevData, newClient]);
  
    // Close the modal
    setIsClientModalVisible(false);
  };
  
  const showLabelModal = () => {
    setIsLabelModalVisible(true);
  };

  const handleLabelCancel = () => {
    setIsLabelModalVisible(false);
  };

  const showImportModal = () => {
    setIsImportModalVisible(true);
  };

  const handleImportCancel = () => {
    setIsImportModalVisible(false);
  };

  const handleFileChange = (e) => {
    const files = e.fileList;
    setFileList(files);
    if (files.length > 0) {
      const file = files[0].originFileObj;
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          console.log('Parsed :', result.data);
          // Add the parsed data to clientData
          setClientData([...clientData, ...result.data.map((item, index) => ({ key: (clientData.length + index + 1).toString(), ...item }))]);
          message.success('File parsed successfully!');
        },
        error: (error) => {
          message.error('Failed to parse file.');
        },
      });
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Menu theme="dark" mode="horizontal" selectedKeys={[current]} onClick={handleClick} style={{ lineHeight: '64px' }}>
            <Menu.Item key="overview">Overview</Menu.Item>
            <Menu.Item key="clients">Clients</Menu.Item>
            <Menu.Item key="contacts">Contacts</Menu.Item>
          </Menu>
        
          <Space>
            <Button onClick={showLabelModal}>Manage labels</Button>
            <Button icon={<UploadOutlined />} onClick={showImportModal}>Import clients</Button>
            <Button type="primary" icon={<FileAddOutlined />} onClick={showClientModal}>
              Add Client
            </Button>
          </Space>
        </Space>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 16 }}>
        {current === 'overview' && <Overview />}
        {current === 'clients' && <ClientTable data={clientData} onUpdate={setClientData} />}
        {current === 'contacts' && <ContactTable data={contactData} />}
      </Content>
      <Modal title="Add Client" visible={isClientModalVisible} onCancel={handleClientCancel} footer={null}>
        <Form
          layout="vertical"
          onFinish={onClientFinish}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter client name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="primaryContact"
            label="Primary Contact"
            rules={[{ required: true, message: 'Please enter primary contact' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="clientGroup"
            label="Client Group"
            rules={[{ required: true, message: 'Please select client group' }]}
          >
            <Select>
              <Option value="VIP">VIP</Option>
              <Option value="Silver">Silver</Option>
              <Option value="Bronze">Bronze</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="labels"
            label="Labels"
            rules={[{ required: true, message: 'Please select labels' }]}
          >
            <Select mode="multiple">
              <Option value="Important">Important</Option>
              <Option value="Regular">Regular</Option>
              <Option value="Prospective">Prospective</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="projects"
            label="Projects"
            rules={[{ required: true, message: 'Please enter projects' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="totalInvoiced"
            label="Total Invoiced"
            rules={[{ required: true, message: 'Please enter total invoiced amount' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="paymentReceived"
            label="Payment Received"
            rules={[{ required: true, message: 'Please enter payment received amount' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="due"
            label="Due"
            rules={[{ required: true, message: 'Please enter due amount' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="hasDue"
            label="Has Due"
            valuePropName="checked"
            rules={[{ required: false, message: 'Please indicate if there is a due amount' }]}
          >
            <Checkbox>Yes</Checkbox><Checkbox>No</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" >Add Client</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Manage Labels" visible={isLabelModalVisible} onCancel={handleLabelCancel} footer={null}>
        <Form>
          <Form.Item label="Client Labels from File Explorer">
            <Checkbox.Group>
              <Row>
                <Col span={8}><Checkbox value="important">Important</Checkbox></Col>
                <Col span={8}><Checkbox value="regular">Regular</Checkbox></Col>
                <Col span={8}><Checkbox value="prospective">Prospective</Checkbox></Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleLabelCancel}>Save</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Import Clients" visible={isImportModalVisible} onCancel={handleImportCancel} footer={null}>
        <Upload
          beforeUpload={() => false}
          onChange={handleFileChange}
          fileList={fileList}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Modal>
    </Layout>
  );
};

export default MainClient;
