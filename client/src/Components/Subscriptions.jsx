import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Button, Input, DatePicker, Select, Space, Flex,Modal,Form, InputNumber } from 'antd';
import { SearchOutlined, PlusOutlined, TagsOutlined, FileExcelOutlined, PrinterOutlined } from '@ant-design/icons';
import CustomTable from '../Utils/CustomTable';
import CustomModal from '../Utils/CustomModal';
import moment from 'moment';
const { Option } = Select;
const initialColumns = ['Subscription ID','Title',"Type","Client",'First Billing Date','Next Billing Date','Cycles','Status',"Amount"];
const initialData = [] ;
const Subscriptions = () => {
  const [data, setData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clients, setClients] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  // const [subFormFields, setSubFormFields] = useState([

  // {
  //   name: 'Title',
  //   label: 'Title',
  //   type: 'input',
  //   rules: [{ required: true, message: 'Please input the name of the lead!' }],
  //   props: { placeholder: 'Enter lead name' },
  // },
  // {
  //     name: 'FirstBillDate',
  //     label: 'First Billing Date',
  //     type: 'date',
  //     placeholder: 'First Billing Date',
  //     rules: [{ required: true, message: 'Please select the status!' }],
  //     props: { placeholder: 'Select lead status' },
  //   },
  //   {
  //     name: 'Client',
  //     label: 'Client',
  //     type: 'select',
  //     placeholder: 'Owner',
  //     options: [
  //       { value: 'john', label: 'John Doe' },
  //       { value: 'michael', label: 'Michael Wood' },
  //       { value: 'sara', label: 'Sara Ann' },
  //       { value: 'richard', label: 'Richard Gray' },
  //       { value: 'mark', label: 'Mark Thomas' },
  //     ],
  //     rules: [{ required: true, message: 'Please select the Owner!' }],
  //     props: { placeholder: 'Owner' },
  //   },
  //   {
  //     name: 'Tax',
  //     label: 'Tax',
  //     type: 'select',
  //     placeholder: '-',
  //     options: [
  //       { value: '10', label: 'Tax(10%)' },
  //     ],
  //     rules: [{ required: true, message: 'Please select the Source!' }],
  //     props: { placeholder: 'Source' },
  //   },

  // {
  //   name: 'Repeat',
  //   label: 'Repeat Type',
  //   type: 'input',
  //   rules: [{ required: true, message: 'Please input the repeat!' }],
  //   props: { placeholder: 'Enter address' },
  // },
  // {
  //   name: 'Note',
  //   label: 'Note',
  //   type: 'input',
  //   rules: [{ required: true, message: 'Please input the City!' }],
  //   props: { placeholder: 'Enter City' },
  // },

  //   {
  //     name: 'Label',
  //     label: 'Labels',
  //     type: 'input',
  //     rules: [{ required: true, message: 'Please input the ZIP!' }],
  //     props: { placeholder: 'Enter Zip' },
  //   },
  // ]);
  useEffect(() => {
    fetchsubs();
    fetchClients();
}, []);

const fetchsubs=async () => {
    axios.get('https://rise-backened-1.onrender.com/subscription')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }

  
  const fetchClients = async () => {
    try {
        const res = await axios.get('https://rise-backened-1.onrender.com/clients');
        setClients(res.data.clients);
    } catch (error) {
        console.log('Failed to fetch clients');
    }
};

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCreate = async () => {
    try {
        const values = await form.validateFields();
        if (editingRecord) {
            await axios.patch(`https://rise-backened-1.onrender.com/subscription/${editingRecord._id}`, {
                ...values,
                // lastActivity: values.lastActivity.format('YYYY-MM-DD HH:mm:ss'),
            });
           console.log('Subscription updated successfully');
        } else {
            await axios.post('https://rise-backened-1.onrender.com/subscription', {
                ...values,
                // lastActivity: values.lastActivity.format('YYYY-MM-DD HH:mm:ss'),
            });
           console.log('Subscription created successfully');
        }
        fetchsubs();
        setIsModalVisible(false);
        form.resetFields();
        setEditingRecord(null);
    } catch (error) {
        console.error(error.response?.data || error.message);
        console.log('Failed to save ticket');
    }
};
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  const handleEdit = (sub) => {
    setEditingRecord(sub);
    setIsModalVisible(true);
    form.setFieldsValue({
        ...sub,
        lastActivity: moment(sub.lastActivity),
    });
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
    {/* <CustomModal
        visible={isModalVisible}
        onCreate={handleCreate}
        onCancel={handleCancel}
        title="Add Lead"
        fields={subFormFields}
      /> */}

<Modal
                title={editingRecord ? 'Edit Subscription' : 'Add Subscription'}
                visible={isModalVisible}
                onOk={handleCreate}
                onCancel={handleCancel}
                destroyOnClose
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="Title" label="Title" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='FirstBillDate' label='First Billing Date' rules={[{ required: true }]}>
                      <DatePicker showTime format='YYYY-MM-DD'/>
                        {/* <Input /> */}
                    </Form.Item>
                    <Form.Item name="Client" label="Client" rules={[{ required: true }]}>
                        <Select placeholder="Select a client">
                            {clients.map((client) => (
                                <Option key={client._id} value={client._id}>
                                    {client.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="Tax" label="Tax" rules={[{ required: true }]}>
                        <Select placeholder="-">
                            <Option value="10">Tax(10%)</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="Repeat"
                        label="Repeat Type"
          
                    >
                      <InputNumber/>
                      <DatePicker showWeek/>
                    </Form.Item>
                    <Form.Item name="Note" label="Note" rules={[{ required: true }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="Label" label="Labels" rules={[{ required: true }]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
</div>
    
  );
};

export default Subscriptions;



