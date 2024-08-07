import React, { useEffect, useState } from 'react';
import { Card, Table, Space, Button, Input, Modal, Form, Select, Tag, Dropdown, Menu, Upload, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, FilterOutlined, SearchOutlined, UploadOutlined, FileAddOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Option } = Select;

const statusColors = {
  Upcoming: 'orange',
  Open: 'blue',
  Complete: 'green',
  Processing: 'purple',
  Pending: 'red'
};

const ProjectPage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const [isAddProjectModalVisible, setIsAddProjectModalVisible] = useState(false);
  const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    axios.get('https://rise-backened-1.onrender.com/projects')
      .then(response => {
        if (Array.isArray(response.data.projects)) {
          setFilteredData(response.data.projects);
        } else {
          console.error('Fetched data is not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the projects!', error);
      });
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Client', dataIndex: 'client', key: 'client', render: client => client.name },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'Deadline', dataIndex: 'endDate', key: 'endDate' },
    { title: 'Progress', dataIndex: 'progress', key: 'progress' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: status => (
      <Tag color={statusColors[status]}>{status}</Tag>
    ) },
    { title: 'Action', key: 'action', render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
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

  const handleEdit = project => {
    setCurrentProject(project);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const onEditFinish = values => {
    axios.patch(`https://rise-backened-1.onrender.com/projects/${currentProject._id}`, values)
      .then(response => {
        const updatedData = filteredData.map(item =>
          item._id === currentProject._id ? { ...item, ...response.data } : item
        );
        setFilteredData(updatedData);
        setIsEditModalVisible(false);
      })
      .catch(error => {
        console.error('There was an error updating the project!', error);
      });
  };

  const handleDelete = id => {
    axios.delete(`https://rise-backened-1.onrender.com/projects/${id}`)
      .then(() => {
        const updatedData = filteredData.filter(item => item.id !== id);
        setFilteredData(updatedData);
      })
      .catch(error => {
        console.error('There was an error deleting the project!', error);
      });
  };

  const applyFilters = (search, status) => {
    axios.get('https://rise-backened-1.onrender.com/projects')
      .then(response => {
        const filtered = response.data.projects.filter(item =>
          (item.title.toLowerCase().includes(search) ||
          item.client.name.toLowerCase().includes(search)) &&
          (status === 'All' || item.status === status)
        );
        setFilteredData(filtered);
      })
      .catch(error => {
        console.error('There was an error fetching the projects!', error);
      });
  };

  const handleManageLabels = () => {
    setIsLabelModalVisible(true);
  };

  const handleLabelCancel = () => {
    setIsLabelModalVisible(false);
  };

  const handleImportProjects = () => {
    setIsImportModalVisible(true);
  };

  const handleImportCancel = () => {
    setIsImportModalVisible(false);
  };

  const handleAddProject = () => {
    setIsAddProjectModalVisible(true);
  };

  const handleAddProjectCancel = () => {
    setIsAddProjectModalVisible(false);
  };

  const handlePrintProjects = () => {
    setIsPrintModalVisible(true);
  };

  const handlePrintCancel = () => {
    setIsPrintModalVisible(false);
  };

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  const onAddProjectFinish = values => {
    axios.post('https://rise-backened-1.onrender.com/projects', values)
      .then(response => {
        setFilteredData([...filteredData, response.data]);
        setIsAddProjectModalVisible(false);
      })
      .catch(error => {
        console.error('There was an error adding the project!', error);
      });
  };

  const statusMenu = (
    <Menu onClick={handleStatusFilter}>
      <Menu.Item key="All">All</Menu.Item>
      <Menu.Item key="Upcoming">Upcoming</Menu.Item>
      <Menu.Item key="Open">Open</Menu.Item>
      <Menu.Item key="Complete">Complete</Menu.Item>
      <Menu.Item key="Processing">Processing</Menu.Item>
      <Menu.Item key="Pending">Pending</Menu.Item>
    </Menu>
  );

  return (
    <Card>
      <Row gutter={16} align="middle">
        <Col span={12}>
          <h1>Projects</h1>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={handleManageLabels}>Manage Labels</Button>
            <Button onClick={handleImportProjects}>Import Projects</Button>
            <Button onClick={handleAddProject} type="primary">Add Project</Button>
          </Space>
        </Col>
      </Row>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <Space>
          <Dropdown overlay={statusMenu}>
            <Button>
              {selectedStatus} <FilterOutlined />
            </Button>
          </Dropdown>
          <Button>All Projects</Button>
          <Button>High Priority</Button>
          <Button size="large" style={{ padding: 0, width: 'auto', height: 'auto' }}>🍵</Button>
          <Button>Upcoming</Button>
        </Space>
        <Space>
          <Button>Excel</Button>
          <Button onClick={handlePrintProjects}>Print</Button>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={handleSearch}
          />
        </Space>
      </Space>
      <Table columns={columns} dataSource={filteredData} rowKey="id" />

      <Modal
        title="Edit Project"
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={currentProject}
          onFinish={onEditFinish}
        >
          <Form.Item
            name="id"
            label="ID"
            rules={[{ required: true, message: 'Please enter project ID' }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter project title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="client"
            label="Client"
            rules={[{ required: true, message: 'Please enter client name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
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
            label="Deadline"
            rules={[{ required: true, message: 'Please select end date' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="progress"
            label="Progress"
            rules={[{ required: true, message: 'Please enter progress' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Option value="Upcoming">Upcoming</Option>
              <Option value="Open">Open</Option>
              <Option value="Complete">Complete</Option>
              <Option value="Processing">Processing</Option>
              <Option value="Pending">Pending</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Manage Labels"
        visible={isLabelModalVisible}
        onCancel={handleLabelCancel}
        footer={null}
      >
        {/* Label management form goes here */}
      </Modal>

      <Modal
        title="Import Projects"
        visible={isImportModalVisible}
        onCancel={handleImportCancel}
        footer={null}
      >
        <Upload
          fileList={fileList}
          onChange={handleFileChange}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Modal>

      <Modal
        title="Add Project"
        visible={isAddProjectModalVisible}
        onCancel={handleAddProjectCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={onAddProjectFinish}>
          <Form.Item
            name="id"
            label="ID"
            rules={[{ required: true, message: 'Please enter project ID' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter project title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="client"
            label="Client"
            rules={[{ required: true, message: 'Please enter client name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
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
            label="Deadline"
            rules={[{ required: true, message: 'Please select end date' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="progress"
            label="Progress"
            rules={[{ required: true, message: 'Please enter progress' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Option value="Upcoming">Upcoming</Option>
              <Option value="Open">Open</Option>
              <Option value="Complete">Complete</Option>
              <Option value="Processing">Processing</Option>
              <Option value="Pending">Pending</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Project
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Print Projects"
        visible={isPrintModalVisible}
        onCancel={handlePrintCancel}
        footer={null}
      >
        {/* Print projects form goes here */}
      </Modal>
    </Card>
  );
};

export default ProjectPage;
