# 加载状态与空数据

[返回目录](../index.md)

## 功能说明

Table 组件提供加载状态展示和空数据处理功能。`loading` 属性用于显示加载中的遮罩和 Spinner；当数据为空时，组件会自动显示空状态提示，支持通过 `table-empty` slot 自定义空状态内容。

## API 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `loading` | 是否显示加载状态 | `boolean` | `false` |

### Slots

| Slot | 说明 |
|------|------|
| `table-empty` | 空数据时显示的自定义内容 |

---

## 代码示例

### 示例1：加载状态

设置 `loading` 属性显示加载中状态，表格内容会被遮罩覆盖并显示 Spinner。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '地址', dataIndex: 'address' }
];

const dataSource = [
  { id: '1', name: '张三', age: 32, address: '北京市朝阳区' },
  { id: '2', name: '李四', age: 28, address: '上海市浦东新区' }
];

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable
        rowKey="id"
        loading
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};
```

---

### 示例2：切换加载状态

通过按钮动态控制加载状态，模拟异步数据请求场景。

```jsx
import React, { useState } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';
import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';

const columns = [
  { title: '商品', dataIndex: 'product', width: 200 },
  { title: '价格', dataIndex: 'price', width: 100 },
  { title: '库存', dataIndex: 'stock', width: 100 }
];

export default () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const handleLoad = () => {
    setLoading(true);
    setDataSource([]);
    // 模拟异步请求
    setTimeout(() => {
      setDataSource([
        { id: '1', product: '商品A', price: 100, stock: 50 },
        { id: '2', product: '商品B', price: 200, stock: 30 },
        { id: '3', product: '商品C', price: 150, stock: 20 }
      ]);
      setLoading(false);
    }, 2000);
  };

  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <div style={{ marginBottom: "12px" }}>
        <SlButton variant="primary" onClick={handleLoad}>
          {loading ? "加载中..." : "加载数据"}
        </SlButton>
      </div>
      <SlTable
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};
```

---

### 示例3：空数据默认展示

当 `dataSource` 为空数组时，表格自动显示默认的空数据提示。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '地址', dataIndex: 'address' }
];

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable rowKey="id" columns={columns} dataSource={[]} />
    </div>
  );
};
```

---

### 示例4：自定义空状态

通过 `table-empty` slot 自定义空数据时的展示内容。

```jsx
import React, { useState } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';
import SlIcon from '@kdcloudjs/shoelace/dist/react/icon/index.js';
import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';

const columns = [
  { title: '任务名称', dataIndex: 'task', width: 200 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '创建时间', dataIndex: 'createdAt' }
];

export default () => {
  const [dataSource, setDataSource] = useState([]);

  const handleAdd = () => {
    setDataSource([
      { id: '1', task: '新任务', status: '进行中', createdAt: '2024-01-15' }
    ]);
  };

  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource}>
        <div
          slot="table-empty"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 24px"
          }}
        >
          <SlIcon
            name="inbox"
            style={{ fontSize: "48px", color: "#d9d9d9" }}
          />
          <p style={{ margin: "16px 0 4px", fontSize: "16px", color: "#555" }}>
            暂无数据
          </p>
          <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#999" }}>
            请尝试调整筛选条件或添加新数据
          </p>
          <SlButton variant="primary" size="small" onClick={handleAdd}>
            添加数据
          </SlButton>
        </div>
      </SlTable>
    </div>
  );
};
```

---

## 注意事项

1. **loading 覆盖整个表格**：`loading` 状态会在表格上方显示半透明遮罩和 Spinner，用户无法与表格交互
2. **空数据判断**：当 `dataSource` 为空数组 `[]` 或经过筛选后无数据时，都会触发空状态展示
3. **自定义空状态样式**：使用 `table-empty` slot 时，需要自行设置内容的布局和样式
4. **加载完成后清除状态**：异步请求完成后记得将 `loading` 设置为 `false`
5. **SlButton 的 onClick**：`SlButton` 的 React wrapper 已映射 `click` 事件，可直接使用 `onClick`

[返回目录](../index.md)
