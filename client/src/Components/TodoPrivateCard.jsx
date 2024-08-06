import React, { useState } from 'react';
import { Input, Button, List, Typography, Divider, Popconfirm, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, CheckSquareOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const initialTasks = [
  { id: 1, title: 'Check monthly expenses', date: '2024-08-01' },
  { id: 2, title: 'Discuss with team members', date: '2024-08-02' },
  { id: 3, title: 'Followup project progression', date: '2024-08-03' },
  { id: 4, title: 'Re-arrange the widgets of my dashboard', date: '2024-08-04' },
  { id: 5, title: 'Set roles and permissions for team members', date: '2024-08-05' },
  { id: 6, title: 'Setup IP restriction for time logs', date: '2024-08-06' },
  { id: 7, title: 'Setup notifications for tasks', date: '2024-08-07' },
];

const TodoPrivateCard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title: newTask,
        date: new Date().toISOString().split('T')[0]
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const handleEditTask = (id, newTitle) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title: newTitle } : task
    ));
    setEditingTask(null);
    setEditText('');
  };

  const handleDeleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
    message.success('Task deleted successfully');
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      width: '310px',
      height: '400px',
      padding: '16px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      overflowY: 'auto',
      scrollbarWidth: 'thin', // For Firefox
      scrollbarColor: '#d9d9d9 #f0f0f0', // For Firefox
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      cursor: 'pointer',
      margin: '8px',
    }}>
      {/* Custom scrollbar for WebKit browsers */}
      <style>
        {`
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: #f0f0f0;
          }
          ::-webkit-scrollbar-thumb {
            background: #d9d9d9;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #c0c0c0;
          }
        `}
      </style>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <CheckSquareOutlined style={{ fontSize: '20px', marginRight: '8px', color: '#4e5e6a' }} />
        <Title level={4} style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#4e5e6a' }}>To do (Private)</Title>
      </div>

      <Input
        placeholder="Add a to do..."
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        suffix={<PlusOutlined onClick={handleAddTask} />}
        style={{ marginBottom: '16px' }}
      />

      <Input
        placeholder="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        suffix={<SearchOutlined />}
        style={{ marginBottom: '16px' }}
      />

      <List
        dataSource={filteredTasks}
        renderItem={item => (
          <List.Item
            key={item.id}
            style={{ padding: '8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            {editingTask === item.id ? (
              <Input
                value={editText || item.title}
                onChange={e => setEditText(e.target.value)}
                onPressEnter={() => handleEditTask(item.id, editText)}
                style={{ flex: 1 }}
              />
            ) : (
              <>
                <div>
                  <Text>{item.title}</Text>
                  <Text type="secondary" style={{ marginLeft: '8px' }}>{item.date}</Text>
                </div>
                <div>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => { setEditingTask(item.id); setEditText(item.title); }}
                    size="small"
                    style={{ marginRight: '8px', borderRadius: '50%' }}
                    type="default"
                  />
                  <Popconfirm
                    title="Are you sure you want to delete this task?"
                    onConfirm={() => handleDeleteTask(item.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      icon={<DeleteOutlined />}
                      size="small"
                      danger
                      style={{ borderRadius: '50%' }}
                    />
                  </Popconfirm>
                </div>
              </>
            )}
          </List.Item>
        )}
        locale={{ emptyText: 'No tasks found' }}
      />

      <Divider style={{ margin: '16px 0' }} />
      <Text type="secondary" style={{ textAlign: 'center', display: 'block' }}>
        {filteredTasks.length} / {tasks.length}
      </Text>
    </div>
  );
};

export default TodoPrivateCard;
