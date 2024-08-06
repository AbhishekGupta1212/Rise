import React, { useState } from 'react';
import { Table, Button } from 'antd';

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
                <Button onClick={() => alert(`Edit row ${rowIndex}`)} type="link">
                  Edit
                </Button>
                <Button onClick={() => alert(`Delete row ${rowIndex}`)} type="link">
                  Delete
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
