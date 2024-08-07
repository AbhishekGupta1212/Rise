import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Space, Tabs, Dropdown, Menu, Flex, Modal, message } from 'antd';
import { SearchOutlined, PlusOutlined, TagsOutlined, UploadOutlined, FilterOutlined, TableOutlined, UserOutlined, PhoneOutlined, PrinterOutlined, FileExcelOutlined } from '@ant-design/icons';
import CustomTable from '../Utils/CustomTable';
import CustomModal from '../Utils/CustomModal';

const { TabPane } = Tabs;
const initialColumns = ['Name', 'Primary contact', 'Owner', 'Labels', 'Created Date', 'Status'];

const Leads = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://rise-backened-1.onrender.com/leads');
      
      if (response.data && Array.isArray(response.data.leads)) {
        setData(response.data.leads);
        console.log(response.data.leads[id]);
      } else {
        console.error('Unexpected data structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log()

  const showModal = () => {
    setEditRecord(null);a
    setIsModalVisible(true);
  };

  const handleCreate = async (values) => {
    try {
      if (editRecord) {
        await axios.put(`https://rise-backened-1.onrender.com/leads/${editRecord.id}`, values);
        message.success('Lead updated successfully');
      } else {
        await axios.post('https://rise-backened-1.onrender.com/leads', values);
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
      <Menu.Item key="1">Filter Option 1</Menu.Item>
      <Menu.Item key="2">Filter Option 2</Menu.Item>
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
      name: 'Cname',
      label: 'Company Name',
      type: 'input',
      rules: [{ required: true, message: 'Please input the name of the lead!' }],
      props: { placeholder: 'Enter lead name' },
    },
    {
      name: 'status',
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
      name: 'owner',
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
      name: 'source',
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
      name: 'add',
      label: 'Address',
      type: 'input',
      rules: [{ required: true, message: 'Please input the address of the lead!' }],
      props: { placeholder: 'Enter address' },
    },
    {
      name: 'city',
      label: 'City',
      type: 'input',
      rules: [{ required: true, message: 'Please input the City!' }],
      props: { placeholder: 'Enter City' },
    },
    {
      name: 'state',
      label: 'State',
      type: 'input',
      rules: [{ required: true, message: 'Please input the State!' }],
      props: { placeholder: 'Enter State' },
    },
    {
      name: 'zip',
      label: 'Zip',
      type: 'input',
      rules: [{ required: true, message: 'Please input the ZIP!' }],
      props: { placeholder: 'Enter Zip' },
    },
    {
      name: 'country',
      label: 'Country',
      type: 'input',
      rules: [{ required: true, message: 'Please input the Country!' }],
      props: { placeholder: 'Enter Country' },
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'input',
      rules: [{ required: true, message: 'Please input the Phone Number!' }],
      props: { placeholder: 'Enter Phone' },
    },
    {
      name: 'website',
      label: 'Website',
      type: 'input',
      rules: [{ required: true, message: 'Please input the Phone Number!' }],
      props: { placeholder: 'Enter Website' },
    },
    {
      name: 'vat',
      label: 'VAT Number',
      type: 'input',
      rules: [{ required: true, message: 'Please input the Phone Number!' }],
      props: { placeholder: 'Enter VAT Number' },
    },
    {
      name: 'gst',
      label: 'GST Number',
      type: 'input',
      rules: [{ required: true, message: 'Please input the Phone Number!' }],
      props: { placeholder: 'Enter GST Number' },
    },
    {
      name: 'currency',
      label: 'Currency',
      type: 'input',
      rules: [{ required: true, message: 'Please input the Phone Number!' }],
      props: { placeholder: 'Enter currency' },
    },
    {
      name: 'symbol',
      label: 'Currency Symbol',
      type: 'input',
      rules: [{ required: true, message: 'Please input the Phone Number!' }],
      props: { placeholder: 'Enter Symbol' },
    },
    {
      name: 'label',
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
            <Button icon={<FilterOutlined />}>Filters</Button>
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
          <Input placeholder="Search" prefix={<SearchOutlined />} style={{ width: 200 }} />
        </Flex>
      </Flex>
      
      <CustomTable
        columns={initialColumns}
        data={data}
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
