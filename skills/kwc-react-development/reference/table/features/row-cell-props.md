# 行/单元格属性定制

[返回目录](../index.md)

## 功能说明

Table 组件支持通过 `onRow`、`onHeaderRow`（Table 属性）以及 `onCell`、`onHeaderCell`（Column 配置）回调函数自定义行和单元格的属性，包括 className、style、事件监听器等。

> **注意**：`onRow` / `onHeaderRow` 已作为 JSX 属性直接支持，返回对象中事件名用小写形式（`onclick`、`onmouseenter`）。

## API 属性

### Table 属性

| 属性 | 说明 | 类型 |
|------|------|------|
| `onRow` | 设置行属性 | `(record, index) => object` |
| `onHeaderRow` | 设置表头行属性 | `(columns, index) => object` |

### Column 配置

| 属性 | 说明 | 类型 |
|------|------|------|
| `onCell` | 设置单元格属性 | `(record, rowIndex) => object` |
| `onHeaderCell` | 设置表头单元格属性 | `(record, rowIndex) => object` |

### 返回对象支持的属性

| 属性 | 说明 |
|------|------|
| `className` | CSS 类名 |
| `style` | 行内样式（字符串或对象） |
| `onclick` | 点击事件 |
| `onmouseenter` | 鼠标进入事件 |
| `onmouseleave` | 鼠标离开事件 |

---

## 代码示例

### 示例1：onRow 设置行属性

为行添加自定义类名、样式和点击事件。

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
      className: record.status === 'inactive' ? 'inactive-row' : '',
      style: index % 2 === 0 ? 'background-color: var(--sl-color-neutral-50);' : '',
      onclick: () => {
        setClickedRow(`${record.name} (ID: ${record.id})`);
      }
    };
  }, []);

  const logStyle = {
    marginBottom: "var(--sl-spacing-medium)",
    padding: "var(--sl-spacing-small)",
    background: "var(--sl-color-primary-100)",
    borderRadius: "var(--sl-border-radius-medium)",
    color: "var(--sl-color-primary-600)"
  };
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <div style={logStyle}>点击的行: {clickedRow}</div>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource} onRow={handleRow} />
    </div>
  );
};
```

---

### 示例2：onHeaderRow 设置表头行属性

自定义表头行的样式和属性。

```jsx
import React, { useCallback } from "react";
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
  className: 'custom-header-row',
  style: {
    'background-color': 'var(--sl-color-primary-600)',
    'color': 'var(--sl-color-neutral-0)'
  }
});

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource} onHeaderRow={handleHeaderRow} />
    </div>
  );
};
```

---

### 示例3：onCell 设置单元格属性

根据单元格数据值动态设置样式。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  {
    title: '分数',
    dataIndex: 'score',
    width: 100,
    onCell: (record) => {
      let color = 'var(--sl-color-success-600)';
      if (record.score < 60) {
        color = 'var(--sl-color-danger-600)';
      } else if (record.score < 80) {
        color = 'var(--sl-color-warning-600)';
      }
      return {
        style: { color: color, 'font-weight': 'bold' }
      };
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    onCell: (record) => ({
      className: `status-${record.status}`
    })
  }
];

const dataSource = [
  { id: '1', name: '张三', score: 95, status: 'pass' },
  { id: '2', name: '李四', score: 58, status: 'fail' },
  { id: '3', name: '王五', score: 72, status: 'pass' },
  { id: '4', name: '赵六', score: 88, status: 'pass' }
];

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable rowKey="id" bordered columns={columns} dataSource={dataSource} />
    </div>
  );
};
```

---

### 示例4：onHeaderCell 设置表头单元格属性

自定义表头单元格的样式。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  {
    title: '必填项 *',
    dataIndex: 'name',
    width: 150,
    onHeaderCell: () => ({
      style: 'color: var(--sl-color-danger-600);'
    })
  },
  { title: '年龄', dataIndex: 'age', width: 100 },
  {
    title: '重要信息',
    dataIndex: 'important',
    width: 200,
    onHeaderCell: () => ({
      className: 'important-header',
      style: {
        'background-color': 'var(--sl-color-warning-50)',
        'font-weight': 'bold'
      }
    })
  }
];

const dataSource = [
  { id: '1', name: '张三', age: 28, important: '核心成员' },
  { id: '2', name: '李四', age: 32, important: '项目负责人' },
  { id: '3', name: '王五', age: 25, important: '新人培训中' }
];

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable rowKey="id" bordered columns={columns} dataSource={dataSource} />
    </div>
  );
};
```

---

### 示例5：综合示例

组合使用所有属性定制功能，通过 `useState` 追踪悬停状态。

```jsx
import React, { useState, useCallback } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const dataSource = [
  { id: '1', name: '张三', performance: 92, department: '研发部', years: 6 },
  { id: '2', name: '李四', performance: 55, department: '产品部', years: 2 },
  { id: '3', name: '王五', performance: 78, department: '设计部', years: 4 },
  { id: '4', name: '赵六', performance: 88, department: '研发部', years: 8 }
];

export default () => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const columns = [
    {
      title: '员工姓名',
      dataIndex: 'name',
      width: 150,
      onHeaderCell: () => ({
        style: 'font-weight: bold; color: var(--sl-color-primary-600);'
      })
    },
    {
      title: '绩效评分',
      dataIndex: 'performance',
      width: 120,
      onCell: (record) => {
        const score = record.performance;
        let bgColor = 'var(--sl-color-success-100)';
        if (score < 60) bgColor = 'var(--sl-color-danger-50)';
        else if (score < 80) bgColor = 'var(--sl-color-warning-50)';
        return {
          style: {
            'background-color': bgColor,
            'text-align': 'center',
            'font-weight': 'bold'
          }
        };
      }
    },
    { title: '部门', dataIndex: 'department', width: 120 },
    {
      title: '入职年限',
      dataIndex: 'years',
      width: 100,
      onCell: (record) => ({
        style: record.years >= 5 ? 'color: #722ed1;' : ''
      })
    }
  ];

  const handleRow = useCallback((record) => {
    const isHovered = hoveredRow === record.id;
    return {
      style: isHovered ? 'box-shadow: 0 2px 8px rgba(0,0,0,0.15);' : '',
      onmouseenter: () => setHoveredRow(record.id),
      onmouseleave: () => setHoveredRow(null)
    };
  }, [hoveredRow]);

  const handleHeaderRow = useCallback(() => ({
    style: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: var(--sl-color-neutral-0);'
  }), []);

  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  const infoStyle = { marginBottom: "var(--sl-spacing-small)", color: "var(--sl-color-neutral-600)", fontSize: "var(--sl-font-size-small)" };
  return (
    <div style={style}>
      <div style={infoStyle}>悬停或点击行查看效果</div>
      <SlTable
        rowKey="id"
        bordered
        columns={columns}
        dataSource={dataSource}
        onRow={handleRow}
        onHeaderRow={handleHeaderRow}
      />
    </div>
  );
};
```

---

## 注意事项

1. **style 格式**：`style` 属性支持字符串（如 `'color: red;'`）或对象（如 `{ color: 'red' }`）两种格式
2. **onRow 事件名小写**：`onRow` 返回对象中的事件名为小写形式（`onclick`、`onmouseenter`），最终绑定到原生 DOM
3. **onChange 是特例**：`onChange` 是映射到 React wrapper 的属性，直接在 JSX 中使用；而 `onRow`/`onHeaderRow` 是传给 `sl-table` 的回调函数，功能完全不同
4. **hoveredRow 状态与 onRow**：当 `onRow` 依赖 `useState` 状态时，需用 `useCallback` 并将状态作为依赖，确保每次状态变化后 `onRow` 能感知到最新值
5. **事件冲突**：自定义的点击事件可能与行选择等内置功能冲突，需注意处理
6. **性能注意**：`onRow` / `onHeaderRow` 会在每次渲染时调用，建议用 `useCallback` 包裹

[返回目录](../index.md)
