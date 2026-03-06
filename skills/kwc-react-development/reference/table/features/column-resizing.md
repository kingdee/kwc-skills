# 列宽调整

[返回目录](../index.md)

## 功能说明

Table 组件支持通过拖拽调整列宽。通过设置 `enableColumnResizing` 全局开启，也可以在列配置中单独设置 `enableResizing` 控制某列是否允许调整。

## API 属性

### Table 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `enableColumnResizing` | 是否启用列宽调整 | `boolean` | `false` |

### Column 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `enableResizing` | 是否允许该列调整宽度 | `boolean` | 继承全局设置 |

---

## 代码示例

### 示例1：全局启用列宽调整

设置 `enableColumnResizing` 允许所有列拖拽调整宽度。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '邮箱', dataIndex: 'email', width: 200 },
  { title: '地址', dataIndex: 'address', width: 250 }
];

const dataSource = [
  { id: '1', name: '张三', age: 32, email: 'zhangsan@example.com', address: '北京市朝阳区' },
  { id: '2', name: '李四', age: 28, email: 'lisi@example.com', address: '上海市浦东新区' },
  { id: '3', name: '王五', age: 35, email: 'wangwu@example.com', address: '广州市天河区' }
];

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <p style={{ color: "#666", fontSize: "14px", marginBottom: "8px" }}>
        拖拽列边框可调整列宽
      </p>
      <SlTable
        rowKey="id"
        bordered
        enableColumnResizing
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};
```

---

### 示例2：禁止某列调整

在特定列设置 `enableResizing: false` 禁止该列调整宽度。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100, enableResizing: false },  // 禁止调整
  { title: '邮箱', dataIndex: 'email', width: 200 },
  { title: '地址', dataIndex: 'address', width: 250 }
];

const dataSource = [
  { id: '1', name: '张三', age: 32, email: 'zhangsan@example.com', address: '北京市朝阳区' },
  { id: '2', name: '李四', age: 28, email: 'lisi@example.com', address: '上海市浦东新区' },
  { id: '3', name: '王五', age: 35, email: 'wangwu@example.com', address: '广州市天河区' }
];

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <p style={{ color: "#faad14", fontSize: "14px", marginBottom: "8px" }}>
        「年龄」列不可调整宽度
      </p>
      <SlTable
        rowKey="id"
        bordered
        enableColumnResizing
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};
```

---

## 注意事项

1. **列宽限制**：列宽调整有最小值（60px）和最大值（500px）限制
2. **拖拽手柄**：鼠标悬停在列边框时会显示拖拽手柄（col-resize 光标）
3. **bordered 建议开启**：开启 `bordered` 时列边框更明显，便于拖拽
4. **table-layout**：启用列宽调整后，表格使用 `table-layout: auto`，不启用时使用 `table-layout: fixed`
5. **建议设置列宽**：启用列宽调整时建议为所有列都设置 `width`

[返回目录](../index.md)
