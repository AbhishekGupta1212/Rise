

// import React, { useState } from 'react';
// import { Card, Table, Space, Button, Input, Modal, Form, Select, Tag, Dropdown, Menu, Upload, Checkbox, Row, Col } from 'antd';
// import { EditOutlined, DeleteOutlined, FilterOutlined, SearchOutlined, UploadOutlined, FileAddOutlined } from '@ant-design/icons';

// const { Option } = Select;

// // Dummy Data
// const initialProjectData = [
//   { key: '1', id: '23', title: 'Online Course Creation and Launch', client: 'Zoila Hauck', price: '-', startDate: '2024-07-28', endDate: '2024-08-09', progress: '0%', status: 'Upcoming' },
//   { key: '2', id: '13', title: 'Social Media Influencer Collaboration', client: 'Alta Cassin', price: '$2,500.00', startDate: '2024-07-27', endDate: '2023-09-02', progress: '0%', status: 'Processing' },
//   { key: '3', id: '15', title: 'Website Redesign', client: 'John Doe', price: '$5,000.00', startDate: '2024-08-01', endDate: '2024-08-15', progress: '50%', status: 'Open' },
//   { key: '4', id: '16', title: 'SEO Optimization', client: 'Jane Smith', price: '$3,000.00', startDate: '2024-07-20', endDate: '2024-07-30', progress: '100%', status: 'Complete' },
//    {key: '5', id: '17', title: 'Mobile App Development', client: 'Acme Corp', price: '$10,000.00', startDate: '2024-08-05', endDate: '2024-09-05', progress: '0%', status: 'Pending' },
//   // Add more data as needed
// ];

// const statusColors = {
//   Upcoming: 'orange',
//   Open: 'blue',
//   Complete: 'green',
//   Processing: 'purple',
//   Pending: 'red'
// };

// const ProjectPage = () => {
//   const [filteredData, setFilteredData] = useState(initialProjectData);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('All');
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);
//   const [isImportModalVisible, setIsImportModalVisible] = useState(false);
//   const [isAddProjectModalVisible, setIsAddProjectModalVisible] = useState(false);
//   const [currentProject, setCurrentProject] = useState(null);
//   const [fileList, setFileList] = useState([]);

//   const columns = [
//     { title: 'ID', dataIndex: 'id', key: 'id' },
//     { title: 'Title', dataIndex: 'title', key: 'title' },
//     { title: 'Client', dataIndex: 'client', key: 'client' },
//     { title: 'Price', dataIndex: 'price', key: 'price' },
//     { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
//     { title: 'Deadline', dataIndex: 'endDate', key: 'endDate' },
//     { title: 'Progress', dataIndex: 'progress', key: 'progress' },
//     { title: 'Status', dataIndex: 'status', key: 'status', render: status => (
//       <Tag color={statusColors[status]}>{status}</Tag>
//     ) },
//     { title: 'Action', key: 'action', render: (_, record) => (
//       <Space size="middle">
//         <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
//         <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
//       </Space>
//     ) },
//   ];

//   const handleSearch = e => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//     applyFilters(value, selectedStatus);
//   };

//   const handleStatusFilter = ({ key }) => {
//     setSelectedStatus(key);
//     applyFilters(searchTerm, key);
//   };

//   const handleEdit = project => {
//     setCurrentProject(project);
//     setIsEditModalVisible(true);
//   };

//   const handleEditCancel = () => {
//     setIsEditModalVisible(false);
//   };

//   const onEditFinish = values => {
//     const updatedData = filteredData.map(item =>
//       item.key === currentProject.key ? { ...item, ...values } : item
//     );
//     setFilteredData(updatedData);
//     setIsEditModalVisible(false);
//   };

//   const handleDelete = key => {
//     const updatedData = filteredData.filter(item => item.key !== key);
//     setFilteredData(updatedData);
//   };

//   const applyFilters = (search, status) => {
//     const filtered = initialProjectData.filter(item =>
//       (item.title.toLowerCase().includes(search) ||
//       item.client.toLowerCase().includes(search)) &&
//       (status === 'All' || item.status === status)
//     );
//     setFilteredData(filtered);
//   };

//   const handleManageLabels = () => {
//     setIsLabelModalVisible(true);
//   };

//   const handleLabelCancel = () => {
//     setIsLabelModalVisible(false);
//   };

//   const handleImportProjects = () => {
//     setIsImportModalVisible(true);
//   };

//   const handleImportCancel = () => {
//     setIsImportModalVisible(false);
//   };

//   const handleAddProject = () => {
//     setIsAddProjectModalVisible(true);
//   };

//   const handleAddProjectCancel = () => {
//     setIsAddProjectModalVisible(false);
//   };

//   const handleFileChange = ({ fileList }) => setFileList(fileList);

//   const onAddProjectFinish = values => {
//     const newProject = {
//       key: `${filteredData.length + 1}`,
//       ...values,
//       progress: '0%',
//       status: 'Upcoming'
//     };
//     setFilteredData([...filteredData, newProject]);
//     setIsAddProjectModalVisible(false);
//   };

//   const statusMenu = (
//     <Menu onClick={handleStatusFilter}>
//       <Menu.Item key="All">All</Menu.Item>
//       <Menu.Item key="Upcoming">Upcoming</Menu.Item>
//       <Menu.Item key="Open">Open</Menu.Item>
//       <Menu.Item key="Complete">Complete</Menu.Item>
//       <Menu.Item key="Processing">Processing</Menu.Item>
//       <Menu.Item key="Pending">Pending</Menu.Item>
//     </Menu>
//   );

//   return (
//     <Card>
//       <Row gutter={16} align="middle">
//         <Col span={12}>
//           <h1>Projects</h1>
//         </Col>
//         <Col span={12} style={{ textAlign: 'right' }}>
//           <Space>
//             <Button onClick={handleManageLabels}>Manage Labels</Button>
//             <Button onClick={handleImportProjects}>Import Projects</Button>
//             <Button onClick={handleAddProject} type="primary">Add Project</Button>
//           </Space>
//         </Col>
//       </Row>
//       <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
//         <Space>
//           <Dropdown overlay={statusMenu}>
//             <Button>
//               {selectedStatus} <FilterOutlined />
//             </Button>
//           </Dropdown>
//           <Button>All Projects</Button>
//           <Button>High Priority</Button>
//           <Button  size="large" style={{ padding: 0, width: 'auto', height: 'auto' }}>🍵</Button>
//           <Button>Upcoming</Button>
//         </Space>
//         <Space>
//           <Button>Excel</Button>
//           <Button>Print</Button>
//           <Input
//             placeholder="Search"
//             prefix={<SearchOutlined />}
//             onChange={handleSearch}
//           />
//         </Space>
//       </Space>
//       <Table columns={columns} dataSource={filteredData} rowKey="key" />
      
//       {/* Edit Project Modal */}
//       <Modal
//         title="Edit Project"
//         visible={isEditModalVisible}
//         onCancel={handleEditCancel}
//         footer={null}
//       >
//         <Form
//           layout="vertical"
//           initialValues={currentProject}
//           onFinish={onEditFinish}
//         >
//           <Form.Item
//             name="id"
//             label="ID"
//             rules={[{ required: true, message: 'Please enter project ID' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="title"
//             label="Title"
//             rules={[{ required: true, message: 'Please enter project title' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="client"
//             label="Client"
//             rules={[{ required: true, message: 'Please enter client name' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="price"
//             label="Price"
//             rules={[{ required: true, message: 'Please enter price' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="startDate"
//             label="Start Date"
//             rules={[{ required: true, message: 'Please select start date' }]}
//           >
//             <Input type="date" />
//           </Form.Item>
//           <Form.Item
//             name="endDate"
//             label="Deadline"
//             rules={[{ required: true, message: 'Please select end date' }]}
//           >
//             <Input type="date" />
//           </Form.Item>
//           <Form.Item
//             name="progress"
//             label="Progress"
//             rules={[{ required: true, message: 'Please enter progress' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="status"
//             label="Status"
//             rules={[{ required: true, message: 'Please select status' }]}
//           >
//             <Select>
//               <Option value="Upcoming">Upcoming</Option>
//               <Option value="Open">Open</Option>
//               <Option value="Complete">Complete</Option>
//               <Option value="Processing">Processing</Option>
//               <Option value="Pending">Pending</Option>
//               {/* Add more statuses as needed */}
//             </Select>
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">Update Project</Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* Manage Labels Modal */}
//       <Modal
//         title="Manage Labels"
//         visible={isLabelModalVisible}
//         onCancel={handleLabelCancel}
//         footer={null}
//       >
      
//         <Form>
//           <Form.Item label="Project Labels">
//             <Checkbox.Group>
//               <Row>
//                 <Col span={8}><Checkbox value="Important">Important</Checkbox></Col>
//                 <Col span={8}><Checkbox value="Regular">Regular</Checkbox></Col>
//                 <Col span={8}><Checkbox value="Prospective">Prospective</Checkbox></Col>
//               </Row>
//             </Checkbox.Group>
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" onClick={handleLabelCancel}>Save</Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* Import Projects Modal */}
//       <Modal
//         title="Import Projects"
//         visible={isImportModalVisible}
//         onCancel={handleImportCancel}
//         footer={null}
//       >
//         <Upload
//           beforeUpload={() => false}
//           onChange={handleFileChange}
//           fileList={fileList}
//         >
//           <Button icon={<UploadOutlined />}>Select File</Button>
//         </Upload>
//       </Modal>

//       {/* Add Project Modal */}
//       <Modal
//         title="Add Project"
//         visible={isAddProjectModalVisible}
//         onCancel={handleAddProjectCancel}
//         footer={null}
//       >
//         <Form
//           layout="vertical"
//           onFinish={onAddProjectFinish}
//         >
//           <Form.Item
//             name="id"
//             label="ID"
//             rules={[{ required: true, message: 'Please enter project ID' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="title"
//             label="Title"
//             rules={[{ required: true, message: 'Please enter project title' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="client"
//             label="Client"
//             rules={[{ required: true, message: 'Please enter client name' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="price"
//             label="Price"
//             rules={[{ required: true, message: 'Please enter price' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="startDate"
//             label="Start Date"
//             rules={[{ required: true, message: 'Please select start date' }]}
//           >
//             <Input type="date" />
//           </Form.Item>
//           <Form.Item
//             name="endDate"
//             label="Deadline"
//             rules={[{ required: true, message: 'Please select end date' }]}
//           >
//             <Input type="date" />
//           </Form.Item>
          
//           <Form.Item>
//             <Button type="primary" htmlType="submit">Add Project</Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </Card>
//   );
// };

// export default ProjectPage;
import React, { useState } from 'react';
import { Card, Table, Space, Button, Input, Modal, Form, Select, Tag, Dropdown, Menu, Upload, Checkbox, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, FilterOutlined, SearchOutlined, UploadOutlined, FileAddOutlined } from '@ant-design/icons';

const { Option } = Select;


const initialProjectData = [
  { key: '1', id: '23', title: 'Online Course Creation and Launch', client: 'Zoila Hauck', price: '-', startDate: '2024-07-28', endDate: '2024-08-09', progress: '0%', status: 'Upcoming' },
  { key: '2', id: '13', title: 'Social Media Influencer Collaboration', client: 'Alta Cassin', price: '$2,500.00', startDate: '2024-07-27', endDate: '2023-09-02', progress: '0%', status: 'Processing' },
  { key: '3', id: '15', title: 'Website Redesign', client: 'John Doe', price: '$5,000.00', startDate: '2024-08-01', endDate: '2024-08-15', progress: '50%', status: 'Open' },
  { key: '4', id: '16', title: 'SEO Optimization', client: 'Jane Smith', price: '$3,000.00', startDate: '2024-07-20', endDate: '2024-07-30', progress: '100%', status: 'Complete' },
   {key: '5', id: '17', title: 'Mobile App Development', client: 'Acme Corp', price: '$10,000.00', startDate: '2024-08-05', endDate: '2024-09-05', progress: '0%', status: 'Pending' },
];

const statusColors = {
  Upcoming: 'orange',
  Open: 'blue',
  Complete: 'green',
  Processing: 'purple',
  Pending: 'red'
};

const ProjectPage = () => {
  const [filteredData, setFilteredData] = useState(initialProjectData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const [isAddProjectModalVisible, setIsAddProjectModalVisible] = useState(false);
  const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [fileList, setFileList] = useState([]);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Client', dataIndex: 'client', key: 'client' },
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

  const handleEdit = project => {
    setCurrentProject(project);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const onEditFinish = values => {
    const updatedData = filteredData.map(item =>
      item.key === currentProject.key ? { ...item, ...values } : item
    );
    setFilteredData(updatedData);
    setIsEditModalVisible(false);
  };

  const handleDelete = key => {
    const updatedData = filteredData.filter(item => item.key !== key);
    setFilteredData(updatedData);
  };

  const applyFilters = (search, status) => {
    const filtered = initialProjectData.filter(item =>
      (item.title.toLowerCase().includes(search) ||
      item.client.toLowerCase().includes(search)) &&
      (status === 'All' || item.status === status)
    );
    setFilteredData(filtered);
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
    const newProject = {
      key: `${filteredData.length + 1}`,
      ...values,
      progress: '0%',
      status: 'Upcoming'
    };
    setFilteredData([...filteredData, newProject]);
    setIsAddProjectModalVisible(false);
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
          <Button  size="large" style={{ padding: 0, width: 'auto', height: 'auto' }}>🍵</Button>

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
      <Table columns={columns} dataSource={filteredData} rowKey="key" />
      
      {/* Edit Project Modal */}
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
              {/* Add more statuses as needed */}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Update Project</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Manage Labels Modal */}
      <Modal
        title="Manage Labels"
        visible={isLabelModalVisible}
        onCancel={handleLabelCancel}
        footer={null}
      >
      
        <Form>
          <Form.Item label="Project Labels">
            <Checkbox.Group>
              <Row>
                <Col span={8}><Checkbox value="Important">Important</Checkbox></Col>
                <Col span={8}><Checkbox value="Regular">Regular</Checkbox></Col>
                <Col span={8}><Checkbox value="Prospective">Prospective</Checkbox></Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleLabelCancel}>Save</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Import Projects Modal */}
      <Modal
        title="Import Projects"
        visible={isImportModalVisible}
        onCancel={handleImportCancel}
        footer={null}
      >
        <Upload
          beforeUpload={() => false}
          onChange={handleFileChange}
          fileList={fileList}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Modal>

      {/* Print Projects Modal */}
      <Modal
        title="Print Projects"
        visible={isPrintModalVisible}
        onCancel={handlePrintCancel}
        footer={null}
      >
        <Upload
          beforeUpload={() => false}
          onChange={handleFileChange}
          fileList={fileList}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Modal>

      {/* Add Project Modal */}
      <Modal
        title="Add Project"
        visible={isAddProjectModalVisible}
        onCancel={handleAddProjectCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={onAddProjectFinish}
        >
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
          
          <Form.Item>
            <Button type="primary" htmlType="submit">Add Project</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ProjectPage;
