import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, message, Row, Col, Tabs, Dropdown, Menu, Space } from 'antd';
import { SearchOutlined, FilterOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import TabPane from 'antd/es/tabs/TabPane';


const { Option } = Select;
const options = ["John Doe", "Mark Thomas", "Michael Wood", "Sara Ann", "Richard Gray"];


const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [clients, setClients] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTicket, setEditingTicket] = useState(null);
    const [form] = Form.useForm();

    const [filters, setFilters] = useState({
        status: '',
        search: '',
    });


    useEffect(() => {
        fetchTickets();
        fetchClients();
    }, []);

    const fetchTickets = async (query) => {
        try {
            const res = await axios.get('http://localhost:8080/tickets', {
                params: query
            });
            setTickets(res.data.tickets);
        } catch (error) {
            message.error('Failed to fetch tickets');
        }
    };

    const handleChange = (value, filterType) => {
        const updatedFilters = { ...filters, [filterType]: value };
        setFilters(updatedFilters);
        fetchTickets(updatedFilters);
    };

    const handleSearch = (e) => {
        const searchQuery = e.target.value;
        const updatedFilters = { ...filters, search: searchQuery };
        setFilters(updatedFilters);
        fetchTickets(updatedFilters);
    };


    const fetchClients = async () => {
        try {
            const res = await axios.get('http://localhost:8080/clients');
            setClients(res.data.clients);
        } catch (error) {
            message.error('Failed to fetch clients');
        }
    };

    const handleEdit = (ticket) => {
        setEditingTicket(ticket);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...ticket,
            lastActivity: moment(ticket.lastActivity),
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/tickets/${id}`);
            message.success('Ticket deleted successfully');
            fetchTickets();
        } catch (error) {
            message.error('Failed to delete ticket');
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingTicket) {
                await axios.patch(`http://localhost:8080/tickets/${editingTicket._id}`, {
                    ...values,
                    lastActivity: values.lastActivity.format('YYYY-MM-DD HH:mm:ss'),
                });
                message.success('Ticket updated successfully');
            } else {
                await axios.post('http://localhost:8080/tickets', {
                    ...values,
                    lastActivity: values.lastActivity.format('YYYY-MM-DD HH:mm:ss'),
                });
                message.success('Ticket created successfully');
            }
            fetchTickets();
            setIsModalVisible(false);
            form.resetFields();
            setEditingTicket(null);
        } catch (error) {
            console.error(error.response?.data || error.message);
            message.error('Failed to save ticket');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setEditingTicket(null);
    };

    const columns = [
        {
            title: 'Ticket ID',
            dataIndex: 'ticketID',
            key: 'ticketId',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Client',
            dataIndex: ['client', 'name'],
            key: 'client',
        },
        {
            title: 'Ticket Type',
            dataIndex: 'ticketType',
            key: 'ticketType',
        },
        {
            title: 'Assigned To',
            dataIndex: 'assignedTo',
            key: 'assignedTo',
        },
        {
            title: 'Last Activity',
            dataIndex: 'lastActivity',
            key: 'lastActivity',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="link" danger onClick={() => handleDelete(record._id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div className="container">

            <Row justify="space-between" align="middle" style={{ padding: '15px' }}>
                <Col style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', gap: '10%' }}>

                    <h2>Tickets</h2>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="Tickets list" key="1">

                        </TabPane>
                        <TabPane tab="Ticket templates" key="2">
                        </TabPane>
                    </Tabs>
                </Col>
                <Col>
                    <Space>
                    <Button>Manage labels</Button>
                    <Button>Batch update</Button>
                    <Button>Settings</Button>
                    <Button type="default" onClick={() => setIsModalVisible(true)}>Add ticket</Button>
                    </Space>
                </Col>
            </Row>

            <Row justify="space-between" align="middle" style={{ padding: '15px' }}>
                <Col>
                <Space>
                    <Button icon={<FilterOutlined />} >
                        <Select icon={<FilterOutlined />} placeholder="Filters" onChange={(value) => handleChange(value, 'status')}>
                            <Option  >All Tickets</Option>
                            <Option value="Open" >Open</Option>
                            <Option value="Closed" >Closed</Option>
                            <Option value="New">Newest</Option>
                        </Select>
                    </Button>

                    <Button icon={<PlusOutlined />} onClick={() => handleChange('New', 'status')}>Important</Button>
                    <Button icon={<UserOutlined />} onClick={() => handleChange('Open', 'status')}>Open</Button>

                    </Space>
                </Col>

                <Col>
                    <Space>
                    <Button>Excel</Button>
                    <Button>Print</Button>
                    <Input
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        style={{ width: 200 }}
                        onChange={handleSearch}
                    />
                    </Space>
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={tickets}
                rowKey="_id"
                pagination={{ pageSize: 5 }}
                style={{ marginTop: 20 }}
            />
            <Modal
                title={editingTicket ? 'Edit Ticket' : 'Add Ticket'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="ticketID" label="Ticket ID" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="client" label="Client" rules={[{ required: true }]}>
                        <Select placeholder="Select a client">
                            {clients.map((client) => (
                                <Option key={client._id} value={client._id}>
                                    {client.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="ticketType" label="Ticket Type" rules={[{ required: true }]}>
                        <Select placeholder="Select ticket type">
                            <Option value="Bug Reports">Bug Reports</Option>
                            <Option value="General Support">General Support</Option>
                            <Option value="Sales Enquiry">Sales Enquiry</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="assignedTo"
                        label="Assigned To"
                        rules={[{ required: true, message: 'Please select a person to assign' }]}
                    >
                        <Select placeholder="Select a person">
                            {options.map((name) => (
                                <Option key={name} value={name}>
                                    {name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="lastActivity" label="Last Activity" rules={[{ required: true }]}>
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                        <Select placeholder="Select status">
                            <Option value="Open">Open</Option>
                            <Option value="New">New</Option>
                            <Option value="Client Replied">Client Replied</Option>
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
};

export default Tickets;
