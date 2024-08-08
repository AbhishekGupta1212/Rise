import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Space, Tabs, Dropdown, Menu, Flex, Modal, message } from 'antd';
import { SearchOutlined, PlusOutlined, TagsOutlined, UploadOutlined, FilterOutlined, TableOutlined, UserOutlined, PhoneOutlined, PrinterOutlined, FileExcelOutlined } from '@ant-design/icons';
import CustomTable from '../Utils/CustomTable';
import CustomModal from '../Utils/CustomModal';
let arr=[]
const { TabPane } = Tabs;
const initialColumns = ['Name', 'Primary contact', 'Owner', 'Labels', 'Created Date', 'Status'];
const Leads = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [leadData, setLeadData] = useState([]);
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://rise-backened-1.onrender.com/leads');
      
      if (response.data && Array.isArray(response.data.leads)) {
       setLeadData(response.data.leads);
        console.log(response.data.leads);
      } else {
        console.error('Unexpected data structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log(leadData)

  const showModal = () => {
    setEditRecord(null);
    setIsModalVisible(true);
  };
  const handleChange = (value, filterType) => {
    const updatedFilters = { ...filters, [filterType]: value };
    setFilters(updatedFilters);
    fetchTickets(updatedFilters);
};
  const handleCreate = async (values) => {
    try {
      if (editRecord) {
        await axios.put(`https://rise-backened-1.onrender.com/leads/${editRecord.id}`, values);
        message.success('Lead updated successfully');
      } else {
        await axios.post('https://rise-backened-1.onrender.com/leads', [...values]);
        message.success('Lead added successfully');
        console.log(values)
      }
      fetchData();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error creating/updating lead:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    const updatedFilters = { ...filters, search: searchQuery };
    setFilters(updatedFilters);
    fetchData(updatedFilters);
};

  const handleEdit = (record) => {
    setEditRecord(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    console.log(id)
    try {
      await axios.delete(`https://rise-backened-1.onrender.com/leads/${id}`);
      message.success('Lead deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">50%</Menu.Item>
      <Menu.Item key="2">90%</Menu.Item>
      <Menu.Item key="3">All leads</Menu.Item>
      <Menu.Item key="4">Call this week</Menu.Item>
      <Menu.Item key="5">My leads</Menu.Item>
    </Menu>
  );

  const leadFormFields = [
    {
      name: 'type',
      label: 'Type',
      type: 'radio',
      options: [
        { value: 'online', label: 'Organization' },
        { value: 'offline', label: 'Company' },
      ],
      rules: [{ required: true, message: 'Please select a Type!' }],
      props: {},
    },
    {
      name: 'CompanyName',
      label: 'Company Name',
      type: 'input',
      rules: [{ required: true, message: 'Please input the name of the lead!' }],
      props: { placeholder: 'Enter lead name' },
    },
    {
      name: 'Status',
      label: 'Status',
      type: 'select',
      placeholder: 'Select a status',
      options: [
        { value: 'new', label: 'New' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
      ],
      rules: [{ required: true, message: 'Please select the status!' }],
      props: { placeholder: 'Select lead status' },
    },
    {
      name: 'Owner',
      label: 'Owner',
      type: 'select',
      placeholder: 'Owner',
      options: [
        { value: 'john', label: 'John Doe' },
        { value: 'michael', label: 'Michael Wood' },
        { value: 'sara', label: 'Sara Ann' },
        { value: 'richard', label: 'Richard Gray' },
        { value: 'mark', label: 'Mark Thomas' },
      ],
      rules: [{ required: true, message: 'Please select the Owner!' }],
      props: { placeholder: 'Owner' },
    },
    {
      name: 'Source',
      label: 'Source',
      type: 'select',
      placeholder: 'Source',
      options: [
        { value: 'google', label: 'Google' },
        { value: 'fb', label: 'Facebook' },
        { value: 'x', label: 'Twitter' },
        { value: 'ytube', label: 'Youtube' },
        { value: 'else', label: 'Elsewhere' },
        { value: 'site', label: 'Site' },
        { value: 'ads', label: 'Google Ads' },
      ],
      rules: [{ required: true, message: 'Please select the Source!' }],
      props: { placeholder: 'Source' },
    },
    {
      name: 'Address',
      label: 'Address',
      type: 'input',
      rules: [{ required: true, message: 'Please input the address of the lead!' }],
      props: { placeholder: 'Enter address' },
    },
    {
      name: 'City',
      label: 'City',
      type: 'input',
      rules: [{ required: true, message: 'Please input the City!' }],
      props: { placeholder: 'Enter City' },
    },
    {
      name: 'State',
      label: 'State',
      type: 'input',
      rules: [{ required: true, message: 'Please input the State!' }],
      props: { placeholder: 'Enter State' },
    },
    {
      name: 'Zip',
      label: 'Zip',
      type: 'input',
      rules: [{ required: true, message: 'Please input the ZIP!' }],
      props: { placeholder: 'Enter Zip' },
    },
    {
      name: 'Country',
      label: 'Country',
      type: 'input',
      rules: [{ required: true, message: 'Please input the Country!' }],
      props: { placeholder: 'Enter Country' },
    },
    {
      name: 'Phone',
      label: 'Phone',
      type: 'input',
      rules: [{ required: true, message: 'Please input the Phone Number!' }],
      props: { placeholder: 'Enter Phone' },
    },
    {
      name: 'Website',
      label: 'Website',
      type: 'input',
      rules: [{ required: true, message: 'Please input the Phone Number!' }],
      props: { placeholder: 'Enter Website' },
    },
    {
      name: 'VATNumber',
      label: 'VAT Number',
      type: 'input',
      rules: [{ required: true, message: 'Please input the Phone Number!' }],
      props: { placeholder: 'Enter VAT Number' },
    },
    {
      name: 'GSTNumber',
      label: 'GST Number',
      type: 'input',
      rules: [{ required: true, message: 'Please input the Phone Number!' }],
      props: { placeholder: 'Enter GST Number' },
    },
    {
      name: 'Currency',
      label: 'Currency',
      type: 'input',
      rules: [{ required: true, message: 'Please input the Phone Number!' }],
      props: { placeholder: 'Enter currency' },
    },
    {
      name: 'CurrencySymbol',
      label: 'Currency Symbol',
      type: 'input',
      rules: [{ required: true, message: 'Please input the Phone Number!' }],
      props: { placeholder: 'Enter Symbol' },
    },
    {
      name: 'Labels',
      label: 'Labels',
      type: 'input',
      rules: [{ required: true, message: 'Please input the Phone Number!' }],
      props: { placeholder: 'Enter Label' },
    },
  ];

  return (
    <div style={{ padding: '20px', background: '#fff' }}>
      <Flex align='center' justify='space-between'>
        <Flex gap='middle' align='center'>
          <h2 style={{ paddingBottom: '13px' }}>Leads</h2>
          <Tabs defaultActiveKey="1">
            <TabPane tab="List" key="1" />
            <TabPane tab="Kanban" key="2" />
          </Tabs>
        </Flex>

        <Flex gap='middle'>
          <Button icon={<TagsOutlined />}>Manage labels</Button>
          <Button icon={<UploadOutlined />}>Import leads</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Add lead</Button>
        </Flex>
      </Flex>

      <Flex align='center' justify='space-between'>
        <Flex style={{ marginBottom: 16 }} gap='middle'>
          <Button icon={<TableOutlined />} />
          <Dropdown overlay={menu}>
            <Button icon={<FilterOutlined /> }onChange={(value) => handleChange(value, 'status')}>Filters</Button>
          </Dropdown>
          <Button icon={<PlusOutlined />} />
          <Button>50%</Button>
          <Button>90%</Button>
          <Button icon={<PhoneOutlined />} />
          <Button icon={<UserOutlined />} />
        </Flex>

        <Flex style={{ marginBottom: 16 }} gap='middle'>
          <Button icon={<FileExcelOutlined />}>Excel</Button>
          <Button icon={<PrinterOutlined />}>Print</Button>
          <Input placeholder="Search" prefix={<SearchOutlined />} style={{ width: 200 }} onChange={handleSearch}/>
        </Flex>
      </Flex>
      
      <CustomTable
        columns={initialColumns}
        data={leadData}
        showButtons={true}
        onButtonEdit={handleEdit}
        onButtonDelete={handleDelete}
      />
      
      <CustomModal
        visible={isModalVisible}
        onCreate={handleCreate}
        onCancel={handleCancel}
        title="Add Lead"
        fields={leadFormFields}
        initialValues={editRecord}
      />
    </div>
  );
};

export default Leads;
