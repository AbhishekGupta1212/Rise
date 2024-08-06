import React from 'react';
import {
  Layout,
  Typography,
  Tabs,
  Button,
  Table,
  Input,
  Space,
  Pagination,
  Select,
} from 'antd';
import { SearchOutlined, UploadOutlined, PlusOutlined, UserAddOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Search } = Input;
const { Title } = Typography;

const LeaveManagement = () => {
  const columns = [
    {
      title: 'Applicant',
      dataIndex: 'applicant',
      key: 'applicant',
    },
    {
      title: 'Leave type',
      dataIndex: 'leaveType',
      key: 'leaveType',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const data = []; // No record found

  return (
    <Layout style={{ padding: '24px', minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        <Space style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Title level={3} style={{ margin: 0 }}>Leave</Title>
          <Space>
            <Button key="import" icon={<UploadOutlined />} type="primary">
              Import leaves
            </Button>
            <Button key="apply" icon={<PlusOutlined />} type="primary">
              Apply leave
            </Button>
            <Button key="assign" icon={<UserAddOutlined />} type="primary">
              Assign leave
            </Button>
          </Space>
        </Space>
      </Header>
      <Content style={{ padding: '24px', background: '#fff' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Pending approval" key="1">
            <Space style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
              <Search
                placeholder="Search"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
                enterButton
              />
              <Space>
                <Button>Excel</Button>
                <Button>Print</Button>
              </Space>
            </Space>
            <Table columns={columns} dataSource={data} pagination={false} locale={{ emptyText: 'No record found.' }} />
            <Space style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
              <Select defaultValue="10" style={{ width: 80 }}>
                <Select.Option value="10">10</Select.Option>
                <Select.Option value="20">20</Select.Option>
                <Select.Option value="30">30</Select.Option>
              </Select>
              <Pagination
                simple
                defaultCurrent={1}
                total={0}
                itemRender={(current, type, originalElement) => {
                  if (type === 'prev') {
                    return <Button icon={<LeftOutlined />} />;
                  }
                  if (type === 'next') {
                    return <Button icon={<RightOutlined />} />;
                  }
                  return originalElement;
                }}
              />
            </Space>
          </TabPane>
          <TabPane tab="All applications" key="2">
            All applications content
          </TabPane>
          <TabPane tab="Summary" key="3">
            Summary content
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default LeaveManagement;
