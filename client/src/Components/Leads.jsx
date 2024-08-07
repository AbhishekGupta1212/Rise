import React,{useState} from 'react';
import { Button, Input, Space, Tabs, Dropdown, Menu, Flex } from 'antd';
import { SearchOutlined, PlusOutlined, TagsOutlined, UploadOutlined, FilterOutlined, TableOutlined, UserOutlined, PhoneOutlined, PrinterOutlined, FileExcelOutlined } from '@ant-design/icons';
import CustomTable from '../Utils/CustomTable';
import CustomModal from '../Utils/CustomModal';

const { TabPane } = Tabs;
const initialColumns = ['Name', 'Age', 'Location'];
const data = [
  ['John', 28, 'New York'],
  ['Jane', 32, 'Chicago'],
  ['Doe', 22, 'San Francisco'],
];
const Leads = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCreate = (values) => {
      console.log('Received values of form: ', values);
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
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
          { value: 'New', label: 'New' },
          { value: 'qualified', label: 'Qualified' },
          { value: 'discussion', label: 'Discussion' },
          { value: 'negotiation', label: 'Negotiation' },
          { value: 'won', label: 'Won' },
          { value: 'lost', label: 'Lost' },
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
   
  ];

  return (
    <div style={{ padding: '20px', background: '#fff' }}>
        <Flex align='center' justify='space-between'>
        <Flex gap='middle' align='center'>
           <h2 style={{paddingBottom:"13px"}}>Leads</h2>
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
  <CustomTable columns={initialColumns} data={data}/>
  <CustomModal
        visible={isModalVisible}
        onCreate={handleCreate}
        onCancel={handleCancel}
        title="Add Lead"
        fields={leadFormFields}
      />
    </div>
  );
};

export default Leads;

