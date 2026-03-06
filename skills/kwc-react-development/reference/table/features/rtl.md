# RTL 方向支持

[返回目录](../index.md)

## 功能说明

Table 组件支持从右到左（RTL）的布局方向，通过设置 `direction="rtl"` 开启。适用于阿拉伯语、希伯来语等从右到左书写的语言环境。

## API 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `direction` | 表格方向 | `'ltr' \| 'rtl'` | `'ltr'` |

---

## 代码示例

### 示例1：RTL 基础表格

设置 `direction="rtl"` 开启 RTL 布局。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: 'الاسم', dataIndex: 'name', width: 150 },
  { title: 'العمر', dataIndex: 'age', width: 100 },
  { title: 'المدينة', dataIndex: 'city', width: 150 },
  { title: 'البريد الإلكتروني', dataIndex: 'email' }
];

const dataSource = [
  { id: '1', name: 'أحمد محمد', age: 28, city: 'القاهرة', email: 'ahmed@example.com' },
  { id: '2', name: 'محمد علي', age: 35, city: 'الإسكندرية', email: 'mohamed@example.com' },
  { id: '3', name: 'فاطمة حسن', age: 30, city: 'الجيزة', email: 'fatima@example.com' }
];

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable rowKey="id" direction="rtl" bordered columns={columns} dataSource={dataSource} />
    </div>
  );
};
```

---

### 示例2：RTL + 固定列

RTL 模式下使用固定列功能。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: 'الاسم', dataIndex: 'name', width: 100, fixed: 'right' },
  { title: 'العمر', dataIndex: 'age', width: 80 },
  { title: 'المدينة', dataIndex: 'city', width: 150 },
  { title: 'البريد', dataIndex: 'email', width: 200 },
  { title: 'الهاتف', dataIndex: 'phone', width: 150 },
  { title: 'القسم', dataIndex: 'department', width: 120 },
  { title: 'الإجراءات', dataIndex: 'action', width: 100, fixed: 'left' }
];

const dataSource = [
  {
    id: '1', name: 'أحمد', age: 28, city: 'القاهرة',
    email: 'ahmed@example.com', phone: '01012345678',
    department: 'التطوير', action: ''
  },
  {
    id: '2', name: 'محمد', age: 35, city: 'الإسكندرية',
    email: 'mohamed@example.com', phone: '01087654321',
    department: 'التصميم', action: ''
  },
  {
    id: '3', name: 'فاطمة', age: 30, city: 'الجيزة',
    email: 'fatima@example.com', phone: '01055556666',
    department: 'المنتج', action: ''
  }
];

const tableScroll = { x: 1000 };

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable rowKey="id" direction="rtl" columns={columns} dataSource={dataSource} tableScroll={tableScroll} />
    </div>
  );
};
```

---

### 示例3：RTL + 排序筛选

RTL 模式下使用排序和筛选功能，通过 `onChange` 监听变化。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: 'الاسم', dataIndex: 'name', width: 150 },
  {
    title: 'العمر',
    dataIndex: 'age',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    title: 'الحالة',
    dataIndex: 'status',
    width: 120,
    filters: [
      { text: 'نشط', value: 'active' },
      { text: 'غير نشط', value: 'inactive' }
    ],
    onFilter: (value, record) => record.status === value
  },
  { title: 'البريد الإلكتروني', dataIndex: 'email' }
];

const dataSource = [
  { id: '1', name: 'أحمد', age: 28, status: 'active', email: 'ahmed@example.com' },
  { id: '2', name: 'محمد', age: 35, status: 'inactive', email: 'mohamed@example.com' },
  { id: '3', name: 'فاطمة', age: 30, status: 'active', email: 'fatima@example.com' },
  { id: '4', name: 'علي', age: 25, status: 'active', email: 'ali@example.com' }
];

export default () => {
  const handleChange = (e) => {
    console.log('Table changed:', e.detail);
  };

  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable
        rowKey="id"
        direction="rtl"
        columns={columns}
        dataSource={dataSource}
        onChange={handleChange}
      />
    </div>
  );
};
```

---

### 示例4：动态切换方向

根据语言设置动态切换表格方向。

```jsx
import React, { useState, useMemo } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const ltrColumns = [
  { title: 'Name', dataIndex: 'name', width: 150 },
  { title: 'Age', dataIndex: 'age', width: 100 },
  { title: 'City', dataIndex: 'city' }
];

const rtlColumns = [
  { title: 'الاسم', dataIndex: 'name', width: 150 },
  { title: 'العمر', dataIndex: 'age', width: 100 },
  { title: 'المدينة', dataIndex: 'city' }
];

const ltrData = [
  { id: '1', name: 'John', age: 28, city: 'New York' },
  { id: '2', name: 'Jane', age: 35, city: 'Los Angeles' },
  { id: '3', name: 'Bob', age: 30, city: 'Chicago' }
];

const rtlData = [
  { id: '1', name: 'أحمد', age: 28, city: 'القاهرة' },
  { id: '2', name: 'محمد', age: 35, city: 'الإسكندرية' },
  { id: '3', name: 'فاطمة', age: 30, city: 'الجيزة' }
];

export default () => {
  const [direction, setDirection] = useState('ltr');

  const columns = useMemo(() => direction === 'rtl' ? rtlColumns : ltrColumns, [direction]);
  const dataSource = useMemo(() => direction === 'rtl' ? rtlData : ltrData, [direction]);

  const toolbarStyle = { marginBottom: "var(--sl-spacing-medium)", display: "flex", gap: "8px" };
  const activeBtnStyle = {
    padding: "6px 12px", cursor: "pointer",
    background: "var(--sl-color-primary-600)", color: "#fff", border: "none", borderRadius: "4px"
  };
  const inactiveBtnStyle = {
    padding: "6px 12px", cursor: "pointer",
    background: "#fff", color: "var(--sl-color-neutral-700)", border: "1px solid var(--sl-color-neutral-300)", borderRadius: "4px"
  };
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <div style={toolbarStyle}>
        <button
          style={direction === 'ltr' ? activeBtnStyle : inactiveBtnStyle}
          onClick={() => setDirection('ltr')}
        >
          LTR (English)
        </button>
        <button
          style={direction === 'rtl' ? activeBtnStyle : inactiveBtnStyle}
          onClick={() => setDirection('rtl')}
        >
          RTL (العربية)
        </button>
      </div>
      <SlTable rowKey="id" direction={direction} bordered columns={columns} dataSource={dataSource} />
    </div>
  );
};
```

---

## 注意事项

1. **固定列方向**：RTL 模式下，`fixed: 'left'` 和 `fixed: 'right'` 的视觉位置会互换
2. **滚动阴影**：固定列的滚动阴影会根据 RTL 模式自动调整方向
3. **排序筛选图标**：排序和筛选图标的位置会自动适配 RTL 布局
4. **onChange 事件**：React wrapper 已映射 `change` 事件为 `onChange`，直接在 JSX 中使用
5. **字体支持**：确保使用的字体支持 RTL 语言的正确显示
6. **动态方向**：使用 `useMemo` 缓存 columns 和 dataSource，避免方向切换时不必要的计算

[返回目录](../index.md)
