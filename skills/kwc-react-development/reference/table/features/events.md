# 事件与行属性

[返回目录](../index.md)

## 功能说明

Table 组件提供 `onChange` 统一事件用于监听排序、筛选、分页等状态变化。同时支持 `onRow` 和 `onHeaderRow` 回调函数自定义行和表头行的属性（className、style、事件监听器等）。

> **重要**：`SlTable` 的 React wrapper **已映射** `change` 事件为 `onChange`，可直接在 JSX 中使用 `onChange` 属性。

## API 属性

### onChange 事件

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `onChange` | 分页、排序、筛选时的回调 | `(e: CustomEvent) => void` | - |

#### event.detail 字段

| 属性 | 说明 | 类型 |
|------|------|------|
| `sorting` | 当前排序状态 | `{ id: string, desc: boolean }[]` |
| `columnFilters` | 当前筛选状态 | `{ id: string, value: any[] }[]` |
| `changeType` | 变化类型 | `'sorter' \| 'filters' \| 'pagination'` |
| `pagination` | 分页信息（仅分页变化时） | `{ pageNumber: number, pageSize: number, total: number }` |

### onRow / onHeaderRow

| 属性 | 说明 | 类型 |
|------|------|------|
| `onRow` | 设置行属性 | `(record, index) => object` |
| `onHeaderRow` | 设置表头行属性 | `(columns, index) => object` |

#### 返回对象支持的属性

| 属性 | 说明 |
|------|------|
| `className` | CSS 类名 |
| `style` | 行内样式（字符串或对象） |
| `onclick` | 点击事件 |
| `onmouseenter` | 鼠标进入事件 |
| `onmouseleave` | 鼠标离开事件 |

---

## 代码示例

### 示例1：onChange 统一监听

通过 `onChange` 监听所有状态变化，根据 `changeType` 区分排序、筛选、分页。

```jsx
import React, { useState, useCallback } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    filters: [
      { text: '在职', value: 'active' },
      { text: '离职', value: 'inactive' }
    ],
    onFilter: (value, record) => record.status === value
  }
];

const dataSource = Array.from({ length: 50 }, (_, index) => ({
  id: String(index + 1),
  name: `用户${index + 1}`,
  age: 20 + (index % 30),
  status: index % 3 === 0 ? 'inactive' : 'active'
}));

export default () => {
  const [logContent, setLogContent] = useState("等待操作...");

  const handleChange = useCallback((e) => {
    const { sorting, columnFilters, changeType, pagination } = e.detail;
    const time = new Date().toLocaleTimeString();
    let log = `[${time}] 变化类型: ${changeType}\n`;
    log += JSON.stringify(e.detail, null, 2);
    setLogContent(log);
  }, []);

  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <div style={{ marginBottom: "12px", padding: "8px", background: "#f5f5f5", borderRadius: "4px" }}>
        <h4 style={{ margin: "0 0 4px" }}>事件日志</h4>
        <pre style={{
          margin: 0,
          padding: "8px",
          background: "#fff",
          border: "1px solid #d9d9d9",
          borderRadius: "4px",
          fontSize: "12px",
          whiteSpace: "pre-wrap",
          maxHeight: "150px",
          overflow: "auto"
        }}>
          {logContent}
        </pre>
      </div>
      <SlTable
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={{ total: 50, pageSize: 10 }}
        onChange={handleChange}
      />
    </div>
  );
};
```

---

### 示例2：onRow 设置行属性

为行添加自定义样式和点击事件。

```jsx
import React, { useState, useCallback } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '状态', dataIndex: 'status', width: 100 }
];

const dataSource = [
  { id: '1', name: '张三', age: 28, status: 'active' },
  { id: '2', name: '李四', age: 32, status: 'inactive' },
  { id: '3', name: '王五', age: 25, status: 'active' },
  { id: '4', name: '赵六', age: 30, status: 'inactive' }
];

export default () => {
  const [clickedRow, setClickedRow] = useState("无");

  const handleRow = useCallback((record, index) => {
    return {
      style: index % 2 === 0 ? 'background-color: #fafafa;' : '',
      onclick: () => {
        setClickedRow(`${record.name} (ID: ${record.id})`);
      }
    };
  }, []);

  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <div style={{
        marginBottom: "12px",
        padding: "8px",
        background: "#e6f7ff",
        borderRadius: "4px",
        color: "#1890ff"
      }}>
        点击的行: {clickedRow}
      </div>
      <SlTable
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        onRow={handleRow}
      />
    </div>
  );
};
```

---

### 示例3：onHeaderRow 设置表头行属性

自定义表头行的样式。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '商品名称', dataIndex: 'product', width: 200 },
  { title: '价格', dataIndex: 'price', width: 100 },
  { title: '库存', dataIndex: 'stock', width: 100 }
];

const dataSource = [
  { id: '1', product: '商品A', price: '¥99', stock: 100 },
  { id: '2', product: '商品B', price: '¥199', stock: 50 },
  { id: '3', product: '商品C', price: '¥299', stock: 30 }
];

const handleHeaderRow = (columns, index) => ({
  style: 'background-color: #1890ff; color: #fff;'
});

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        onHeaderRow={handleHeaderRow}
      />
    </div>
  );
};
```

---

### 示例4：综合联动场景

`onChange` 监听排序/筛选/分页变化，同时使用 `onRow` 处理行点击。

```jsx
import React, { useState, useCallback, useMemo } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    title: '部门',
    dataIndex: 'department',
    width: 120,
    filters: [
      { text: '研发部', value: '研发部' },
      { text: '产品部', value: '产品部' },
      { text: '设计部', value: '设计部' }
    ],
    onFilter: (value, record) => record.department === value
  }
];

const allData = Array.from({ length: 50 }, (_, index) => ({
  id: String(index + 1),
  name: `员工${index + 1}`,
  age: 22 + (index % 20),
  department: ['研发部', '产品部', '设计部'][index % 3]
}));

export default () => {
  const [sortStatus, setSortStatus] = useState("无");
  const [filterStatus, setFilterStatus] = useState("无");
  const [pageStatus, setPageStatus] = useState("第1页");
  const [selectedRow, setSelectedRow] = useState("无");

  const handleChange = useCallback((e) => {
    const { sorting, columnFilters, changeType, pagination } = e.detail;
    switch (changeType) {
      case "sorter":
        if (sorting?.length > 0) {
          setSortStatus(`${sorting[0].id} ${sorting[0].desc ? "降序" : "升序"}`);
        } else {
          setSortStatus("无");
        }
        break;
      case "filters":
        if (columnFilters?.length > 0) {
          setFilterStatus(columnFilters.map(f => `${f.id}: ${f.value.join(",")}`).join("; "));
        } else {
          setFilterStatus("无");
        }
        break;
      case "pagination":
        setPageStatus(`第${pagination.pageNumber}页，每页${pagination.pageSize}条`);
        break;
    }
  }, []);

  const handleRow = useCallback((record) => ({
    onclick: () => setSelectedRow(`${record.name} - ${record.department}`),
    style: 'cursor: pointer;'
  }), []);

  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <div style={{
        display: "flex",
        gap: "24px",
        marginBottom: "12px",
        padding: "8px",
        background: "#e6f7ff",
        borderRadius: "4px",
        fontSize: "14px",
        color: "#1890ff",
        flexWrap: "wrap"
      }}>
        <span>排序: {sortStatus}</span>
        <span>筛选: {filterStatus}</span>
        <span>分页: {pageStatus}</span>
        <span>选中行: {selectedRow}</span>
      </div>
      <SlTable
        rowKey="id"
        columns={columns}
        dataSource={allData}
        pagination={{ total: 50, pageSize: 10 }}
        onChange={handleChange}
        onRow={handleRow}
      />
    </div>
  );
};
```

---

## 注意事项

1. **onChange 已映射**：Table 的 React wrapper 已映射 `change` 事件为 `onChange`，可直接在 JSX 使用
2. **changeType 值**：`'sorter'` 表示排序变化，`'filters'` 表示筛选变化，`'pagination'` 表示分页变化
3. **pagination 字段**：只有 `changeType === 'pagination'` 时，`e.detail` 中才有 `pagination` 字段
4. **onRow 返回对象**：返回对象中的事件名为小写形式（`onclick`、`onmouseenter` 等），因为最终绑定到原生 DOM
5. **style 格式**：`onRow` / `onHeaderRow` 返回的 `style` 支持字符串（`'color: red;'`）或对象格式
6. **性能注意**：`onRow` / `onHeaderRow` 会在每次渲染时调用，避免在其中执行复杂计算，建议使用 `useCallback` 缓存

[返回目录](../index.md)
