# 虚拟滚动

[返回目录](../index.md)

## 功能说明

Table 组件支持虚拟滚动功能，用于优化大数据量场景下的渲染性能。通过设置 `virtualized` 属性开启，只渲染可视区域内的行，大幅减少 DOM 节点数量。支持自定义行高。

## API 属性

### Table 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `virtualized` | 虚拟滚动配置 | `boolean \| { itemHeight?: number }` | `false` |

### virtualized 配置（对象形式）

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `itemHeight` | 每行高度（px） | `number` | `32` |

---

## 代码示例

### 示例1：基础虚拟滚动

设置 `virtualized` 开启虚拟滚动，需配合 `tableScroll.y` 设置滚动区域高度。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '邮箱', dataIndex: 'email' }
];

// 生成 10000 条数据
const dataSource = Array.from({ length: 10000 }, (_, index) => ({
  id: String(index + 1),
  name: `用户${index + 1}`,
  age: 20 + (index % 50),
  email: `user${index + 1}@example.com`
}));

const tableScroll = { y: 400 };

export default () => {
  const infoStyle = {
    marginBottom: "var(--sl-spacing-small)",
    color: "var(--sl-color-primary-600)",
    fontSize: "var(--sl-font-size-small)"
  };
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <p style={infoStyle}>共 {dataSource.length} 条数据，仅渲染可视区域内的行</p>
      <SlTable rowKey="id" virtualized columns={columns} dataSource={dataSource} tableScroll={tableScroll} />
    </div>
  );
};
```

---

### 示例2：自定义行高

通过对象形式的 `virtualized` 配置自定义行高。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '标题', dataIndex: 'title', width: 200 },
  { title: '描述', dataIndex: 'description' }
];

// 生成 5000 条数据
const dataSource = Array.from({ length: 5000 }, (_, index) => ({
  id: String(index + 1),
  title: `标题 ${index + 1}`,
  description: `这是第 ${index + 1} 条数据的描述内容`
}));

// 自定义行高为 48px
const virtualizedConfig = { itemHeight: 48 };
const tableScroll = { y: 500 };

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable
        rowKey="id"
        virtualized={virtualizedConfig}
        columns={columns}
        dataSource={dataSource}
        tableScroll={tableScroll}
      />
    </div>
  );
};
```

---

### 示例3：大数据量场景

展示 10 万条数据的虚拟滚动效果，通过 `ref` 获取组件实例实现编程式滚动。

```jsx
import React, { useRef, useCallback } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '序号', dataIndex: 'index', width: 100 },
  { title: 'ID', dataIndex: 'id', width: 120 },
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '邮箱', dataIndex: 'email', width: 250 },
  { title: '状态', dataIndex: 'status', width: 100 }
];

// 生成 100000 条数据
const largeDataSource = Array.from({ length: 100000 }, (_, index) => ({
  id: `ID-${String(index + 1).padStart(6, '0')}`,
  index: index + 1,
  name: `用户${index + 1}`,
  email: `user${index + 1}@example.com`,
  status: index % 3 === 0 ? '在线' : index % 3 === 1 ? '离线' : '忙碌'
}));

const tableScroll = { y: 500 };

export default () => {
  const tableRef = useRef(null);

  const getBodyWrapper = useCallback(() => {
    return tableRef.current?.shadowRoot?.querySelector('.table-body');
  }, []);

  const scrollToTop = useCallback(() => {
    const body = getBodyWrapper();
    if (body) body.scrollTop = 0;
  }, [getBodyWrapper]);

  const scrollToMiddle = useCallback(() => {
    const body = getBodyWrapper();
    if (body) body.scrollTop = body.scrollHeight / 2;
  }, [getBodyWrapper]);

  const scrollToBottom = useCallback(() => {
    const body = getBodyWrapper();
    if (body) body.scrollTop = body.scrollHeight;
  }, [getBodyWrapper]);

  const toolbarStyle = {
    display: "flex", alignItems: "center",
    gap: "var(--sl-spacing-medium)",
    marginBottom: "var(--sl-spacing-medium)"
  };
  const btnStyle = { padding: "6px 12px", cursor: "pointer" };
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <div style={toolbarStyle}>
        <span style={{ color: "var(--sl-color-neutral-600)" }}>数据量：100,000 条</span>
        <button style={btnStyle} onClick={scrollToTop}>滚动到顶部</button>
        <button style={btnStyle} onClick={scrollToMiddle}>滚动到中间</button>
        <button style={btnStyle} onClick={scrollToBottom}>滚动到底部</button>
      </div>
      <SlTable
        ref={tableRef}
        rowKey="id"
        virtualized
        columns={columns}
        dataSource={largeDataSource}
        tableScroll={tableScroll}
      />
    </div>
  );
};
```

---

### 示例4：虚拟滚动 + 行选择

虚拟滚动与行选择功能配合使用。

```jsx
import React, { useState, useCallback, useMemo } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '部门', dataIndex: 'department', width: 120 },
  { title: '职位', dataIndex: 'position' }
];

// 生成 1000 条数据
const dataSource = Array.from({ length: 1000 }, (_, index) => ({
  id: String(index + 1),
  name: `员工${index + 1}`,
  department: ['研发部', '产品部', '设计部', '市场部'][index % 4],
  position: ['工程师', '经理', '总监', '专员'][index % 4]
}));

const tableScroll = { y: 400 };

export default () => {
  const [selectedCount, setSelectedCount] = useState(0);

  const rowSelection = useMemo(() => ({
    type: 'checkbox',
    onChange: (selectedRowKeys) => {
      setSelectedCount(selectedRowKeys.length);
    }
  }), []);

  const infoStyle = {
    marginBottom: "var(--sl-spacing-small)",
    padding: "var(--sl-spacing-x-small) var(--sl-spacing-small)",
    background: "var(--sl-color-primary-100)",
    borderRadius: "var(--sl-border-radius-medium)",
    color: "var(--sl-color-primary-600)"
  };
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <div style={infoStyle}>已选择 {selectedCount} 条数据</div>
      <SlTable
        rowKey="id"
        virtualized
        columns={columns}
        dataSource={dataSource}
        tableScroll={tableScroll}
        rowSelection={rowSelection}
      />
    </div>
  );
};
```

---

## 注意事项

1. **必须设置 tableScroll.y**：虚拟滚动需要固定高度才能计算可视区域
2. **默认行高**：不设置 `itemHeight` 时默认行高为 32px
3. **行高一致性**：虚拟滚动要求所有行高度一致，动态高度的场景不适用
4. **自定义单元格**：虚拟滚动与自定义单元格（slot）兼容，但需注意 slot 内容不要过于复杂
5. **滚动性能**：虚拟滚动大幅提升渲染性能，推荐数据量超过 100 条时使用
6. **编程式滚动**：通过 `ref` 获取组件实例后访问 `shadowRoot` 内的 `.table-body` 实现编程式滚动
7. **React 属性名**：React 中使用 `tableScroll` 属性（camelCase），不是 `table-scroll`

[返回目录](../index.md)
