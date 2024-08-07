import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CustomTable = ({ columns, data = [], showButtons, onButtonDelete, onButtonEdit }) => {
  const [headers, setHeaders] = useState(columns);

  useEffect(() => {
    console.log('Columns:', headers);
    console.log('Data:', data);
  }, [headers, data]);

  const columnsWithActions = [
    ...headers.map((header, index) => ({
      title: header,
      dataIndex: `column${index}`,
      key: `column${index}`,
    })),
    ...(showButtons
      ? [
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <>
                <Button onClick={() => onButtonEdit(record._id)} type="link">
                  Edit
                </Button>
                <Button onClick={() => onButtonDelete(record._id)} type="link">
                  Delete
                </Button>
              </>
            ),
          },
        ]
      : []),
  ];

  // Ensure each row has a unique key
  const tableData = Array.isArray(data)
    ? data.map((row) => ({
        ...row,
        key: row._id || Math.random().toString(36).substr(2, 9), 
      }))
    : [];

  console.log('Table Data:', tableData);

  return <Table columns={columnsWithActions} dataSource={tableData} />;
};

export default CustomTable;
