import React, { useState } from 'react';
import { Table, Button } from 'antd';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
const CustomTable = ({ columns, data, showButtons }) => {
  const [headers, setHeaders] = useState(columns);

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
            render: (_,rowIndex) => (
              <span>
                <Button icon={<EditOutlined />} onClick={() => alert(`Edit row ${rowIndex}`)} type="link">
                
                </Button>
                <Button icon={<DeleteOutlined />} onClick={() => alert(`Delete row ${rowIndex}`)} type="link">
               
                </Button>
              </span>
            ),
          },
        ]
      : []),
  ];

  const tableData = data.map((row, rowIndex) =>
    row.reduce(
      (acc, cell, cellIndex) => ({
        ...acc,
        [`column${cellIndex}`]: cell,
        key: rowIndex,
      }),
      {}
    )
  );

  return <Table columns={columnsWithActions} dataSource={tableData} />;
};

export default CustomTable;
