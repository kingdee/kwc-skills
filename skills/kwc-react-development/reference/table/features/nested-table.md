# 嵌套子表格

[返回目录](../index.md)

## 功能说明

在展开行中再放置一个 `SlTable`，用于展示子数据。

## 示例代码（React）

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { dataIndex: 'name', title: '姓名', width: 160 },
  { dataIndex: 'email', title: '邮箱' }
];

const subColumns = [
  { dataIndex: 'task', title: '任务', width: 180 },
  { dataIndex: 'status', title: '状态' }
];

const dataSource = [
  {
    id: '1',
    name: 'Alice Smith',
    email: 'alice@example.com',
    children: [{ subId: '1-1', task: '需求评审', status: '完成' }]
  }
];

const expandProps = {
  rowExpandable: true,
  expandableRowKeys: ['1'],
  defaultExpandedRowKeys: ['1']
};

export default () => {
  return (
    <SlTable
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      expandProps={expandProps}
    >
      {dataSource.map((row) => (
        <div key={row.id} slot={`custom-row-${row.id}`} className="expand-wrap">
          <SlTable
            rowKey="subId"
            columns={subColumns}
            dataSource={row.children || []}
            showHeader={false}
          />
        </div>
      ))}
    </SlTable>
  );
};
```

---

## 注意事项

1. **rowKey 必须唯一**：`rowKey` 指定的字段在数据中必须唯一，否则会导致行展开功能异常
