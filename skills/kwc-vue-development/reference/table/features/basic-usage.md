# 基础用法

[返回目录](../index.md)

## 功能说明

Table 组件的基础用法包括：定义列配置（columns）、传入数据源（dataSource）、指定行唯一标识（rowKey）、显示边框、隐藏表头等基础功能。

## API 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `rowKey` | 唯一标识行数据的字段名 | `string` | `'key'` |
| `columns` | 表格列配置 | `ColumnProps[]` | `[]` |
| `dataSource` | 表格数据源 | `TData[]` | `[]` |
| `bordered` | 是否显示边框 | `boolean` | `false` |
| `showHeader` | 是否显示表头 | `boolean` | `true` |

### Column 基础配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `title` | 列头显示文字 | `string` | - |
| `dataIndex` | 列数据字段名（唯一标识） | `string` | - |
| `width` | 列宽度 | `number` | - |

---

## 代码示例

### 示例1：最简表格

最基础的用法，定义列配置和数据源即可渲染表格。

```vue
<template>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
  ></sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '地址', dataIndex: 'address' }
];

const dataSource = [
  { id: '1', name: '张三', age: 32, address: '北京市朝阳区' },
  { id: '2', name: '李四', age: 28, address: '上海市浦东新区' },
  { id: '3', name: '王五', age: 35, address: '广州市天河区' }
];
</script>
```

---

### 示例2：带边框表格

设置 `bordered` 属性显示表格边框，使表格更加清晰。

```vue
<template>
  <sl-table
    rowKey="id"
    bordered
    :columns.prop="columns"
    :dataSource.prop="dataSource"
  ></sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: '商品名称', dataIndex: 'product', width: 200 },
  { title: '价格', dataIndex: 'price', width: 100 },
  { title: '库存', dataIndex: 'stock', width: 100 },
  { title: '描述', dataIndex: 'description' }
];

const dataSource = [
  { id: '1', product: '笔记本电脑', price: 5999, stock: 100, description: '高性能商务本' },
  { id: '2', product: '无线鼠标', price: 99, stock: 500, description: '人体工学设计' },
  { id: '3', product: '机械键盘', price: 299, stock: 200, description: '青轴手感' }
];
</script>
```

---

### 示例3：隐藏表头

设置 `:showHeader="false"` 隐藏表头，适用于简洁展示场景。

```vue
<template>
  <sl-table
    rowKey="id"
    :showHeader="false"
    bordered
    :columns.prop="columns"
    :dataSource.prop="dataSource"
  ></sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: '属性', dataIndex: 'label', width: 120 },
  { title: '值', dataIndex: 'value' }
];

const dataSource = [
  { id: '1', label: '姓名', value: '张三' },
  { id: '2', label: '年龄', value: '28岁' },
  { id: '3', label: '职位', value: '前端工程师' },
  { id: '4', label: '部门', value: '研发部' }
];
</script>
```

---

### 示例4：指定不同的 rowKey

当数据中唯一标识字段不是 `id` 时，需要通过 `row-key` 指定正确的字段名。

```vue
<template>
  <sl-table
    rowKey="userId"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
  ></sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: '用户ID', dataIndex: 'userId', width: 100 },
  { title: '用户名', dataIndex: 'username', width: 150 },
  { title: '邮箱', dataIndex: 'email' }
];

const dataSource = [
  { userId: 'U001', username: 'admin', email: 'admin@example.com' },
  { userId: 'U002', username: 'guest', email: 'guest@example.com' },
  { userId: 'U003', username: 'test', email: 'test@example.com' }
];
</script>
```

---

## 注意事项

1. **rowKey 必须唯一**：`rowKey` 指定的字段在数据中必须唯一，否则会导致行选择、展开等功能异常
2. **columns 必须包含 dataIndex**：每列配置必须指定 `dataIndex`，且需与数据源中的字段名对应
3. **建议设置列宽**：为每列设置 `width` 可避免列宽分配不合理的问题，未设置宽度的列会自动分配剩余空间
4. **响应式数据**：在 Vue 中使用 `ref` 或 `reactive` 包裹数据，修改后视图会自动更新

[返回目录](../index.md)
