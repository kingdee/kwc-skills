# Table 数据表格组件

## 组件概述

`sl-table` 是一个功能丰富的数据表格组件，用于数据收集展示、分析整理和操作处理。基于 `@tanstack/lit-table` 构建，支持在 KWC Vue 框架中使用。组件提供排序、筛选、分页、行选择、列固定、行展开、虚拟滚动、列宽调整等完整的表格功能。

## 功能列表

| 功能 | 说明 | 详细文档 |
|------|------|----------|
| 基础用法 | columns、dataSource、rowKey、边框、隐藏表头 | [basic-usage.md](./features/basic-usage.md) |
| 加载状态与空数据 | loading 加载中、空数据展示、自定义空状态 | [loading-empty.md](./features/loading-empty.md) |
| 行选择 | checkbox 多选、radio 单选、默认选中、禁用、回调等 | [row-selection.md](./features/row-selection.md) |
| 列排序 | sorter 排序函数、默认排序方向、排序状态监听 | [sorting.md](./features/sorting.md) |
| 列筛选 | filters 筛选项、多选/单选筛选、默认筛选值 | [filtering.md](./features/filtering.md) |
| 固定列 | 左侧固定、右侧固定、两侧同时固定 | [fixed-column.md](./features/fixed-column.md) |
| 固定表头 | 纵向滚动、固定表头、滚动到顶部 | [fixed-header.md](./features/fixed-header.md) |
| 自定义单元格 | slot 自定义渲染 | [custom-cell.md](./features/custom-cell.md) |
| 文本省略与对齐 | ellipsis 省略、align 对齐、列样式类名 | [ellipsis-align.md](./features/ellipsis-align.md) |
| 行展开 | 展开行、点击行展开、默认展开 | [row-expand.md](./features/row-expand.md) |
| 分页 | 分页配置、分页位置、每页条数、分页回调 | [pagination.md](./features/pagination.md) |
| 事件监听 | change 事件、changeType 区分、事件联动 | [events.md](./features/events.md) |
| 动态数据 | 添加数据、删除数据、清空重载 | [dynamic-data.md](./features/dynamic-data.md) |
| 列宽调整 | 拖拽调整列宽、禁止某列调整、列宽持久化 | [column-resizing.md](./features/column-resizing.md) |
| 受控排序筛选 | 受控 sortOrder/filteredValue、服务端数据联动 | [controlled-sort-filter.md](./features/controlled-sort-filter.md) |
| 行/单元格属性定制 | onRow、onHeaderRow、onCell、onHeaderCell | [row-cell-props.md](./features/row-cell-props.md) |
| RTL 方向支持 | 从右到左布局、动态切换方向 | [rtl.md](./features/rtl.md) |
| 样式定制 | CSS 变量、CSS Parts、暗黑模式、密度配置 | [styling.md](./features/styling.md) |
| 虚拟滚动 | 大数据量虚拟渲染、自定义行高 | [virtualized.md](./features/virtualized.md) |

## 核心约束

### 必须遵守的规则

1. **rowKey 必须设置**
   - 每行数据必须有唯一标识字段，通过 `rowKey` 属性指定
   - 如果数据中没有对应字段，控制台会报错
   - 默认值为 `'key'`，实际使用时建议显式指定如 `'id'`

2. **columns 配置规范**
   - `dataIndex` 为列的唯一标识，必须与数据源中的字段名对应
   - `title` 为表头显示文字
   - 建议为每列设置 `width`，未设置宽度的列会自动分配剩余空间

3. **Vue 框架规范**
   - 属性绑定使用 `:prop` 语法
   - **对象/数组类型属性必须使用 camelCase + `.prop` 修饰符**：`columns`、`dataSource`、`rowSelection` 等均必须用 `:camelCase.prop` 方式传递
     ```html
     <sl-table :dataSource.prop="data" :columns.prop="cols" :rowSelection.prop="sel"></sl-table>
     ```
   - 若发现属性在 DOM 上展示为 `[object Object]`/`[object Array]`，说明缺少 `.prop` 修饰符
   - 事件绑定使用 `@sl-change` 监听表格变化
   - `sl-change` 事件通过 `event.detail` 获取数据
   - Boolean 属性直接写属性名表示 `true`（如 `bordered`）

4. **组件标签名**
   - 标签名为 `sl-table`

5. **自定义 Slot 命名规范**
   - 自定义单元格 slot 名称格式：`custom-cell-{dataIndex}-{rowKeyValue}`
   - 展开行 slot 名称格式：`custom-row-{rowKeyValue}`

## 快速开始

### 组件导入

```js
// 必须导入 - Table 核心组件
import '@kdcloudjs/shoelace/dist/components/table/table.js';
```

### 最简示例

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

## API 概览

### Table 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `rowKey` | 唯一标识行数据的字段名 | `string` | `'key'` |
| `columns` | 表格列配置 | `ColumnProps[]` | `[]` | 对象数组，用 `:columns.prop` |
| `dataSource` | 表格数据源 | `TData[]` | `[]` | 数组，用 `:dataSource.prop` |
| `loading` | 是否显示加载状态 | `boolean` | `false` |
| `bordered` | 是否显示边框 | `boolean` | `false` |
| `showHeader` | 是否显示表头 | `boolean` | `true` |
| `direction` | 表格方向 | `'ltr' \| 'rtl'` | `'ltr'` |
| `rowSelection` | 行选择配置 | `TableRowSelection` | - | 对象，用 `:rowSelection.prop` |
| `tableScroll` | 表格滚动配置 | `{ x?: number \| string; y?: number \| string }` | `{}` | 对象，用 `:tableScroll.prop` |
| `pagination` | 分页配置 | `PaginationProps` | - | 对象，用 `:pagination.prop` |
| `expandProps` | 展开行配置 | `ExpandProps` | - | 对象，用 `:expandProps.prop` |
| `enableColumnResizing` | 是否启用列宽调整 | `boolean` | `false` |
| `virtualized` | 虚拟滚动配置 | `boolean \| { itemHeight?: number }` | `false` |
| `onRow` | 设置行属性 | `(record, index) => object` | - |
| `onColumnResize` | 列宽调整回调 | `(sizes) => void` | - |

### Column 列配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `title` | 列头显示文字 | `string` | - |
| `dataIndex` | 列数据字段名（唯一标识） | `string` | - |
| `width` | 列宽度 | `number` | - |
| `align` | 列对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| `className` | 列样式类名 | `string` | - |
| `fixed` | 列固定位置 | `false \| 'left' \| 'right'` | `false` |
| `ellipsis` | 内容超出是否省略 | `boolean` | `false` |
| `slot` | 是否启用自定义渲染 | `boolean` | `false` |
| `sorter` | 排序函数 | `(a, b) => number` | - |
| `defaultSortOrder` | 默认排序方向 | `'asc' \| 'desc'` | - |
| `filters` | 筛选项配置 | `{ text: string; value: any }[]` | - |
| `onFilter` | 筛选函数 | `(value, record) => boolean` | - |
| `filterMultiple` | 是否支持多选筛选 | `boolean` | `true` |

### 主要事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `sl-change` | 分页、排序、筛选变化时触发 | `event.detail: { sorting, columnFilters, changeType, pagination? }` |

### Slots（插槽）

| Slot | 说明 |
|------|------|
| `table-empty` | 空数据时显示的内容 |
| `custom-cell-{dataIndex}-{rowKey}` | 自定义单元格内容 |
| `custom-row-{rowKey}` | 展开行内容 |

## 使用建议

1. **rowKey 设置**：务必为 `rowKey` 指定一个在数据中唯一的字段名（如 `'id'`），这是行选择、展开、排序等功能正常工作的基础
2. **列宽设置**：建议为每列设置 `width`，可避免列宽分配不合理的问题
3. **大数据量**：数据量超过 100 条时，建议开启 `virtualized` 虚拟滚动或配合 `pagination` 分页使用
4. **固定列**：使用 `fixed` 固定列时，需要配合 `tableScroll.x` 设置横向滚动宽度
5. **自定义单元格**：通过 `slot: true` 配合对应 slot 名称实现自定义渲染
6. **服务端数据**：通过监听 `@sl-change` 事件，结合受控属性实现服务端排序/筛选
