# 基础用法

[返回目录](../index.md)

## 功能说明

Table 组件的基础用法包括：定义列配置（columns）、传入数据源（dataSource）、指定行唯一标识（rowKey）、显示边框等基础功能。

## API 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `rowKey` | 唯一标识行数据的字段名 | `string` | `'key'` |
| `columns` | 表格列配置 | `ColumnProps[]` | `[]` |
| `dataSource` | 表格数据源 | `TData[]` | `[]` |
| `bordered` | 是否显示边框 | `boolean` | `false` |
| `showHeader` | 是否显示表头 | `boolean` | `true` |

---

## 代码示例

### 示例1：最简表格

指定表格的数据源 `dataSource` 和列的定义 `columns`，以及 `rowKey` 用于表格行 key 的取值字段。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';
import { dataSource, columns } from "./data";

export default () => {
  const style = {
    width: "70%",
    margin: "0 auto",
    padding: "20px",
  };
  return (
    <div style={style}>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource} />
    </div>
  );
};
```

---

### 示例2：带边框表格

添加 `bordered` 属性显示表格边框线。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';
import { dataSource, columns } from "./data";

export default () => {
  const style = {
    width: "70%",
    margin: "0 auto",
    padding: "20px",
  };
  return (
    <div style={style}>
      <SlTable
        rowKey="id"
        bordered
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};
```

---

## 注意事项

1. **rowKey 必须唯一**：`rowKey` 指定的字段在数据中必须唯一，否则会导致行选择、展开等功能异常
2. **columns 必须包含 dataIndex**：每列配置必须指定 `dataIndex`，且需与数据源中的字段名对应
3. **建议设置列宽**：为每列设置 `width` 可避免列宽分配不合理的问题，未设置宽度的列会自动分配剩余空间

[返回目录](../index.md)
