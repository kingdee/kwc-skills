# 筛选

[返回目录](../index.md)

## 功能说明

Table 组件支持列筛选功能，通过列配置的 `filters` 和 `onFilter` 开启。支持非受控模式（组件内部管理状态）和受控模式（外部管理 `filteredValue`）。支持单选和多选筛选。

> **注意**：此文档专注于筛选功能。排序与筛选的综合使用场景请参考 [filter-sort.md](./filter-sort.md)。

## API 属性

### Column 筛选配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `filters` | 筛选项配置 | `{ text: string; value: any }[]` | - |
| `onFilter` | 筛选函数 | `(value, record) => boolean` | - |
| `filterMultiple` | 是否支持多选筛选 | `boolean` | `true` |
| `defaultFilters` | 默认筛选值（非受控） | `string[]` | - |
| `filteredValue` | 受控的筛选值 | `string[]` | - |

### onChange 事件

| 字段 | 说明 | 类型 |
|------|------|------|
| `e.detail.columnFilters` | 当前筛选状态 | `{ id: string, value: any[] }[]` |
| `e.detail.changeType` | 变化类型（筛选时为 `'filters'`） | `string` |

---

## 代码示例

### 示例1：非受控筛选

`filters` + `onFilter` 开启筛选，组件内部管理筛选状态。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  {
    title: '部门',
    dataIndex: 'department',
    width: 150,
    filters: [
      { text: '研发部', value: '研发部' },
      { text: '产品部', value: '产品部' },
      { text: '设计部', value: '设计部' },
      { text: '市场部', value: '市场部' }
    ],
    onFilter: (value, record) => record.department === value
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    filters: [
      { text: '在职', value: 'active' },
      { text: '离职', value: 'inactive' }
    ],
    onFilter: (value, record) => record.status === value,
    filterMultiple: false   // 单选筛选
  }
];

const dataSource = Array.from({ length: 20 }, (_, index) => ({
  id: String(index + 1),
  name: `员工${index + 1}`,
  age: 22 + (index % 20),
  department: ['研发部', '产品部', '设计部', '市场部'][index % 4],
  status: index % 3 === 0 ? 'inactive' : 'active'
}));

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource} />
    </div>
  );
};
```

---

### 示例2：默认筛选值

使用 `defaultFilters` 设置初始筛选状态。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  {
    title: '部门',
    dataIndex: 'department',
    width: 150,
    filters: [
      { text: '研发部', value: '研发部' },
      { text: '产品部', value: '产品部' },
      { text: '设计部', value: '设计部' }
    ],
    onFilter: (value, record) => record.department === value,
    defaultFilters: ['研发部']   // 默认只显示研发部
  },
  { title: '年龄', dataIndex: 'age', width: 100 }
];

const dataSource = [
  { id: '1', name: '张三', department: '研发部', age: 28 },
  { id: '2', name: '李四', department: '产品部', age: 32 },
  { id: '3', name: '王五', department: '研发部', age: 25 },
  { id: '4', name: '赵六', department: '设计部', age: 30 },
  { id: '5', name: '钱七', department: '研发部', age: 27 }
];

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource} />
    </div>
  );
};
```

---

### 示例3：受控筛选

外部管理筛选状态，通过 `onChange` 更新受控的 `filteredValue`。

```jsx
import React, { useState, useMemo, useCallback } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const baseColumns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  {
    title: '部门',
    dataIndex: 'department',
    width: 150,
    filters: [
      { text: '研发部', value: '研发部' },
      { text: '产品部', value: '产品部' },
      { text: '设计部', value: '设计部' },
      { text: '市场部', value: '市场部' }
    ],
    onFilter: (value, record) => record.department === value
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    filters: [
      { text: '在职', value: 'active' },
      { text: '离职', value: 'inactive' }
    ],
    onFilter: (value, record) => record.status === value
  },
  { title: '年龄', dataIndex: 'age', width: 100 }
];

const allData = Array.from({ length: 20 }, (_, index) => ({
  id: String(index + 1),
  name: `员工${index + 1}`,
  age: 22 + (index % 20),
  department: ['研发部', '产品部', '设计部', '市场部'][index % 4],
  status: index % 3 === 0 ? 'inactive' : 'active'
}));

export default () => {
  const [filterInfo, setFilterInfo] = useState([]);

  const columns = useMemo(() => {
    return baseColumns.map(col => {
      const colCopy = { ...col };
      const matchFilter = filterInfo.find(f => f.id === col.dataIndex);
      if (matchFilter) {
        colCopy.filteredValue = matchFilter.value;
      }
      return colCopy;
    });
  }, [filterInfo]);

  const handleChange = useCallback((e) => {
    const { columnFilters, changeType } = e.detail;
    if (changeType === 'filters') {
      setFilterInfo(columnFilters || []);
    }
  }, []);

  const handleReset = useCallback(() => {
    setFilterInfo([]);
  }, []);

  const infoStyle = {
    marginBottom: "12px", padding: "8px", background: "#f5f5f5", borderRadius: "4px", fontSize: "13px"
  };
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <div style={infoStyle}>
        当前筛选: {filterInfo.length > 0 ? JSON.stringify(filterInfo) : '无'}
        &nbsp;&nbsp;
        <button onClick={handleReset} style={{ cursor: "pointer" }}>重置</button>
      </div>
      <SlTable
        rowKey="id"
        columns={columns}
        dataSource={allData}
        onChange={handleChange}
      />
    </div>
  );
};
```

---

## 注意事项

1. **filters 和 onFilter 配合使用**：必须同时配置 `filters` 和 `onFilter` 才能使筛选功能生效
2. **多选筛选逻辑**：多选模式下，只要满足任一筛选条件即显示该行（OR 逻辑）
3. **filterMultiple: false**：设置单选模式，一次只能选择一个筛选值
4. **非受控 vs 受控**：
   - 非受控：使用 `defaultFilters`，由组件内部管理
   - 受控：使用 `filteredValue`，需手动通过 `onChange` 更新
5. **onChange 已映射**：Table 的 React wrapper 已映射 `change` 事件为 `onChange`，可直接在 JSX 使用
6. **useMemo 缓存**：受控模式下，columns 依赖 filterInfo 状态，使用 `useMemo` 避免不必要的重新计算

[返回目录](../index.md)
