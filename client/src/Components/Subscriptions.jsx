import React,{useState} from 'react';
import { Button, Input, DatePicker, Select, Space, Flex } from 'antd';
import { SearchOutlined, PlusOutlined, TagsOutlined, FileExcelOutlined, PrinterOutlined } from '@ant-design/icons';
import CustomTable from '../Utils/CustomTable';
import CustomModal from '../Utils/CustomModal';

const { Option } = Select;
const initialColumns = ['Name', 'Age', 'Location'];
const data = [
  ['John', 28, 'New York'],
  ['Jane', 32, 'Chicago'],
  ['Doe', 22, 'San Francisco'],
];
const Subscriptions = () => {
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

    const subFormFields = [

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
      ];
  return (
<div>
<div style={{ padding: '20px', background: '#fff' }}>
        <div >   
      <Flex align="center" justify="space-between" >
         <h2>Subscriptions</h2>
         <Flex gap="middle">
         <Button icon={<TagsOutlined />}>Manage labels</Button>
        <Button type="primary" icon={<PlusOutlined />}onClick={showModal}>Add subscription</Button>
         </Flex>
      </Flex>
        </div>
      <Flex style={{ marginBottom: 16 }} align='centre' justify='space-between'>
        <Flex gap="middle">
               <Select placeholder="Currency" style={{ width: 120 }}>
          <Option value="usd">USD</Option>
          <Option value="eur">EUR</Option>
          <Option value="gbp">GBP</Option>
        </Select>
        <Select placeholder="Repeat type" style={{ width: 120 }}>
        <Option value="Days">Days</Option>
          <Option value="Weeks">Weeks</Option>
          <Option value="monthly">Monthly</Option>
          <Option value="yearly">Yearly</Option>
        </Select>
        <DatePicker placeholder="Next billing date" />
        </Flex>
     
     <Flex gap="middle">
             <Button icon={<FileExcelOutlined />}>Excel</Button>
        <Button icon={<PrinterOutlined />}>Print</Button>
        <Input placeholder="Search" prefix={<SearchOutlined />} style={{ width: 200 }} />
     </Flex>
   
      </Flex>
    </div>
    <CustomTable columns={initialColumns} data={data}/>
    <CustomModal
        visible={isModalVisible}
        onCreate={handleCreate}
        onCancel={handleCancel}
        title="Add Lead"
        fields={subFormFields}
      />
</div>
    
  );
};

export default Subscriptions;



