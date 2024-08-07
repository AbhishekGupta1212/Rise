import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Button, Input, DatePicker, Select, Space, Flex } from 'antd';
import { SearchOutlined, PlusOutlined, TagsOutlined, FileExcelOutlined, PrinterOutlined } from '@ant-design/icons';
import CustomTable from '../Utils/CustomTable';
import CustomModal from '../Utils/CustomModal';

const { Option } = Select;
const initialColumns = ['Name', 'Age', 'Location'];
const initialData = [] ;
const Subscriptions = () => {
  const [data, setData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [subFormFields, setSubFormFields] = useState([
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
  ]);

  useEffect(() => {
    axios.get('https://rise-backened-1.onrender.com/subscription')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCreate = async(values) => {
    // if (editingRecord) {
    //   const updatedData = data.map(item =>
    //     item.key === editingRecord.key ? { ...item, ...values } : item
    //   );
    //   setData(updatedData);
    //   setEditingRecord(null);
    // } else {
    //   const newRecord = {
    //     key: data.length ? data[data.length - 1].key + 1 : 0,
    //     ...values,
    //   };
    //   axios.post('https://rise-backened-1.onrender.com/subscription', values)
    //     .then(response => {
    //       setData([...data, response.data]);
    //       console.log(response.data)
    //     })
    //     .catch(error => {
    //       console.error('There was an error posting the data!', error);
    //     });
    // }
    // setIsModalVisible(false);
    try {
      if (editingRecord) {
        await axios.put(`https://rise-backened-1.onrender.com/subscription/${editingRecord.id}`, values);
        // message.success('Subscription updated successfully');
      } else {
        await axios.post('https://rise-backened-1.onrender.com/subscription', values);
        // message.success('Subscription added successfully');
        console.log(values)
      }
      fetchData();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error creating/updating subscription:', error);
  };
  }
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    const fields = subFormFields.map(field => ({
      ...field,
      initialValue: record[field.name],
    }));
    setSubFormFields(fields);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    axios.delete(`https://rise-backened-1.onrender.com/subscription/${record.key}`)
    .then(() => {
      const updatedData = data.filter(item => item.key !== record.key);
      setData(updatedData);
    })
    .catch(error => {
      console.error('There was an error deleting the data!', error);
    });
  }
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
    <CustomTable columns={initialColumns} data={data} onButtonEdit={handleEdit} onButtonDelete={handleDelete} showButtons={true}/>
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



