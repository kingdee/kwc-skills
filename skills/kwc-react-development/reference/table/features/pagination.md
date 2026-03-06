# 分页

[返回目录](../index.md)

## 功能说明

Table 组件支持分页功能，通过 `pagination` 属性配置。支持设置分页位置、每页条数、页码、简洁模式等，并提供分页变化回调。分页变化也会触发表格的 `onChange` 事件。

## API 属性

### Pagination 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `placement` | 分页位置 | `'topStart' \| 'topCenter' \| 'topEnd' \| 'bottomStart' \| 'bottomCenter' \| 'bottomEnd'` | `'bottomStart'` |
| `total` | 数据总条数 | `number` | - |
| `currentPage` | 当前页码（受控） | `number` | - |
| `defaultCurrentPage` | 默认当前页码 | `number` | `1` |
| `pageSize` | 每页条数 | `number` | `20` |
| `pageSizeOpts` | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| `simpleMode` | 是否简洁模式 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |

---

## 代码示例

### 示例1：基础分页

配置 `pagination` 属性开启分页功能，使用大量数据生成器。引用外部数据文件 `makeData.js`。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';
import { getData, columns } from "./makeData";

const dataSource = getData(100);

const pagination = {
  total: 100,
  pageSize: 10,
  defaultCurrentPage: 1
};

export default () => {
  const style = { width: "80%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
      />
    </div>
  );
};
```

---

### 示例2：分页位置与简洁模式

通过 `placement` 设置分页器位置，通过 `simpleMode` 启用简洁模式。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '邮箱', dataIndex: 'email' }
];

const dataSource = Array.from({ length: 50 }, (_, index) => ({
  id: String(index + 1),
  name: `用户${index + 1}`,
  age: 20 + (index % 30),
  email: `user${index + 1}@example.com`
}));

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <h4>底部居中</h4>
      <SlTable
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={{ total: 50, pageSize: 5, placement: "bottomCenter" }}
      />

      <h4 style={{ marginTop: "32px" }}>简洁模式</h4>
      <SlTable
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={{ total: 50, pageSize: 5, simpleMode: true }}
      />
    </div>
  );
};
```

---

### 示例3：分页回调 + 受控分页

通过 `onChange` 事件监听分页变化，结合 `currentPage` 实现受控分页。

```jsx
import React, { useState, useMemo, useCallback } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '状态', dataIndex: 'status' }
];

const allData = Array.from({ length: 100 }, (_, index) => ({
  id: String(index + 1),
  name: `用户${index + 1}`,
  status: index % 2 === 0 ? '活跃' : '非活跃'
}));

export default () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const pagination = useMemo(() => ({
    total: 100,
    pageSize,
    currentPage
  }), [pageSize, currentPage]);

  const handleChange = useCallback((e) => {
    const { changeType, pagination: pageInfo } = e.detail;
    if (changeType === "pagination") {
      setCurrentPage(pageInfo.pageNumber);
      setPageSize(pageInfo.pageSize);
    }
  }, []);

  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <div style={{ marginBottom: "12px", padding: "8px", background: "#f5f5f5", borderRadius: "4px" }}>
        当前页: {currentPage}, 每页: {pageSize} 条
      </div>
      <SlTable
        rowKey="id"
        columns={columns}
        dataSource={allData}
        pagination={pagination}
        onChange={handleChange}
      />
    </div>
  );
};
```

---

### 示例4：服务端分页

配合服务端进行分页数据请求，每次翻页重新拉取数据。

```jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '邮箱', dataIndex: 'email' }
];

export default () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(async (page, size) => {
    setLoading(true);
    // 模拟服务端请求
    await new Promise((resolve) => setTimeout(resolve, 500));
    const mockTotal = 156;
    const start = (page - 1) * size;
    const mockData = Array.from(
      { length: Math.min(size, mockTotal - start) },
      (_, index) => ({
        id: String(start + index + 1),
        name: `用户${start + index + 1}`,
        email: `user${start + index + 1}@example.com`
      })
    );
    setDataSource(mockData);
    setTotal(mockTotal);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize, fetchData]);

  const pagination = useMemo(() => ({
    total,
    pageSize,
    currentPage
  }), [total, pageSize, currentPage]);

  const handleChange = useCallback((e) => {
    const { changeType, pagination: pageInfo } = e.detail;
    if (changeType === "pagination") {
      setCurrentPage(pageInfo.pageNumber);
      setPageSize(pageInfo.pageSize);
    }
  }, []);

  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        onChange={handleChange}
      />
    </div>
  );
};
```

---

## 注意事项

1. **total 属性**：`total` 用于计算总页数，如果不设置，将使用 `dataSource.length`
2. **前端分页 vs 服务端分页**：默认为前端分页（组件自动切片数据），服务端分页需手动管理数据
3. **分页位置**：6 种位置：`topStart`、`topCenter`、`topEnd`、`bottomStart`、`bottomCenter`、`bottomEnd`
4. **currentPage 受控**：设置 `currentPage` 后进入受控模式，需通过 `onChange` 手动管理页码
5. **onChange 联动**：分页变化会触发表格的 `onChange` 事件，`e.detail.changeType` 为 `'pagination'`
6. **onChange 已映射**：Table 的 React wrapper 已映射 `change` 事件为 `onChange`，可直接在 JSX 使用

[返回目录](../index.md)
