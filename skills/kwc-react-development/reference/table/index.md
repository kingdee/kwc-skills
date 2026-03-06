# Table 数据表格组件 Skill

## 组件概述

`SlTable` 是一个功能丰富的数据表格组件，用于数据收集展示、分析整理和操作处理。基于 `@tanstack/lit-table` 构建，提供排序、筛选、分页、行选择、列固定、行展开、虚拟滚动、列宽调整等完整的表格功能。

## 功能列表

| 功能 | 说明 | 详细文档 |
|------|------|----------|
| 基础用法 | columns、dataSource、rowKey、边框 | [basic-usage.md](./features/basic-usage.md) |
| 行选择 | checkbox 多选、radio 单选、默认选中、禁用、回调等 | [row-selection.md](./features/row-selection.md) |
| 排序 | 非受控/受控排序、字符串排序 | [sorting.md](./features/sorting.md) |
| 筛选 | 非受控/受控筛选、单选/多选筛选 | [filtering.md](./features/filtering.md) |
| 过滤排序（综合） | 非受控和受控模式的排序与筛选综合用法 | [filter-sort.md](./features/filter-sort.md) |
| 自定义单元格 | slot 自定义渲染、generateCustomSlot | [custom-cell.md](./features/custom-cell.md) |
| 可编辑单元格 | 点击编辑、输入/选择/多行文本 | [editable.md](./features/editable.md) |
| 行展开 | 展开行、嵌套子表格、点击行展开 | [row-expand.md](./features/row-expand.md) |
| 列宽调整 | 拖拽调整列宽 | [column-resizing.md](./features/column-resizing.md) |
| 固定列 | 左侧/右侧固定列、左右同时固定 | [fixed-column.md](./features/fixed-column.md) |
| 固定表头 | tableScroll.y 固定表头、动态高度 | [fixed-header.md](./features/fixed-header.md) |
| 分页 | 受控和非受控分页 | [pagination.md](./features/pagination.md) |
| 加载状态与空数据 | loading、空数据展示、自定义空状态 | [loading-empty.md](./features/loading-empty.md) |
| 事件与行属性 | onChange、onRow、onHeaderRow | [events.md](./features/events.md) |
| 行/单元格属性定制 | onRow、onHeaderRow、onCell、onHeaderCell 深度定制 | [row-cell-props.md](./features/row-cell-props.md) |
| 动态数据更新 | 添加/删除/清空/编辑数据 | [dynamic-data.md](./features/dynamic-data.md) |
| 文本省略与列对齐 | ellipsis、align、className | [ellipsis-align.md](./features/ellipsis-align.md) |
| RTL 方向支持 | direction="rtl"、动态切换方向 | [rtl.md](./features/rtl.md) |
| 样式定制 | CSS 变量、CSS Parts、主题/暗黑模式 | [styling.md](./features/styling.md) |
| 虚拟滚动 | 大数据量虚拟渲染、自定义行高 | [virtualized.md](./features/virtualized.md) |

## 核心约束

### 必须遵守的规则

1. **rowKey 必须设置**
   - 每行数据必须有唯一标识字段，通过 `rowKey` 属性指定
   - 默认值为 `'key'`，实际使用时建议显式指定如 `'id'`

2. **columns 配置规范**
   - `dataIndex` 为列的唯一标识，必须与数据源中的字段名对应
   - `title` 为表头显示文字
   - 建议为每列设置 `width`，未设置宽度的列会自动分配剩余空间

3. **React 框架规范**
   - 导入必须从 `@kdcloudjs/shoelace/dist/react/table/index.js` 默认导入
   - 自定义单元格渲染使用 `generateCustomSlot` 工具函数，从 `@kdcloudjs/shoelace/dist/components/table/utils.js` 导入

4. **自定义 Slot 命名规范**
   - 自定义单元格 slot 名称格式：`custom-cell-{dataIndex}-{rowKeyValue}`
   - 展开行 slot 名称格式：`custom-row-{rowKeyValue}`

## 快速开始

### 组件导入

```jsx
// 默认导入 React 包装组件
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

// 自定义单元格渲染工具
import { generateCustomSlot } from "@kdcloudjs/shoelace/dist/components/table/utils.js";
```

### 最简示例

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
  { id: '2', name: '李四', age: 28, address: '上海市浦东新区' },
  { id: '3', name: '王五', age: 35, address: '广州市天河区' }
];

export default () => (
  <SlTable rowKey="id" columns={columns} dataSource={dataSource} />
);
```

## API 概览

### Table 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `rowKey` | 唯一标识行数据的字段名 | `string` | `'key'` |
| `columns` | 表格列配置 | `ColumnProps[]` | `[]` |
| `dataSource` | 表格数据源 | `TData[]` | `[]` |
| `loading` | 是否显示加载状态 | `boolean` | `false` |
| `bordered` | 是否显示边框 | `boolean` | `false` |
| `showHeader` | 是否显示表头 | `boolean` | `true` |
| `direction` | 表格方向 | `'ltr' \| 'rtl'` | `'ltr'` |
| `rowSelection` | 行选择配置 | `TableRowSelection` | - |
| `tableScroll` | 表格滚动配置 | `{ x?: number \| string; y?: number \| string; scrollToFirstRowOnChange?: boolean }` | `{}` |
| `pagination` | 分页配置 | `PaginationProps` | - |
| `expandProps` | 展开行配置 | `ExpandProps` | - |
| `enableColumnResizing` | 是否启用列宽调整 | `boolean` | `false` |
| `virtualized` | 虚拟滚动配置 | `boolean \| { itemHeight?: number }` | `false` |
| `onRow` | 设置行属性 | `(record, index) => object` | - |
| `onHeaderRow` | 设置头部行属性 | `(columns, index) => object` | - |
| `onChange` | 分页、排序、筛选时的回调 | `(e: CustomEvent) => void` | - |

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
| `enableResizing` | 是否允许拖拽调整该列宽度 | `boolean` | - |
| `sorter` | 排序函数 | `(a, b) => number` | - |
| `defaultSortOrder` | 默认排序方向 | `'asc' \| 'desc'` | - |
| `sortOrder` | 受控的排序方向 | `'asc' \| 'desc'` | - |
| `filters` | 筛选项配置 | `{ text: string; value: any }[]` | - |
| `onFilter` | 筛选函数 | `(value, record) => boolean` | - |
| `filterMultiple` | 是否支持多选筛选 | `boolean` | `true` |
| `defaultFilters` | 默认筛选值 | `string[]` | - |
| `filteredValue` | 受控的筛选值 | `string[]` | - |
| `onCell` | 设置单元格属性 | `(colKey, record, rowIndex) => object` | - |
| `onHeaderCell` | 设置头部单元格属性 | `(colKey, columns, columnIndex) => object` | - |

### RowSelection 行选择配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `type` | 选择类型 | `'checkbox' \| 'radio'` | `'checkbox'` |
| `hidden` | 是否隐藏选择列 | `boolean` | `false` |
| `width` | 选择列宽度 | `number` | `50` |
| `disabled` | 是否禁用表头全选 | `boolean` | `false` |
| `defaultSelectedRowKeys` | 默认选中的行 key 数组 | `string[]` | - |
| `onChange` | 选择变化回调 | `(selectedRowKeys, selectedRows) => void` | - |
| `onSelect` | 点击行选择框回调 | `(record, selected, selectedRows, event) => void` | - |
| `onSelectAll` | 点击全选框回调 | `(selected, selectedRows) => void` | - |
| `getCheckboxProps` | 自定义选择框属性 | `(record) => { disabled?, className?, style? }` | - |

### ExpandProps 展开行配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `rowExpandable` | 是否开启行展开 | `boolean` | `false` |
| `expendableRowKeys` | 可展开的行 key 数组 | `any[]` | - |
| `expandRowByClick` | 是否通过点击行展开 | `boolean` | `false` |
| `defaultExpandedRowKeys` | 默认展开的行 key 数组 | `any[]` | - |
| `defaultExpandAllRows` | 是否默认展开所有可展开行 | `boolean` | `false` |

### TableScroll 滚动配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `x` | 横向滚动区域宽度 | `number \| string` | - |
| `y` | 纵向滚动区域高度 | `number \| string` | - |
| `scrollToFirstRowOnChange` | 分页/排序/筛选变化后是否滚动到顶部 | `boolean` | `false` |

### Pagination 分页配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `placement` | 分页位置 | `'topStart' \| 'topCenter' \| 'topEnd' \| 'bottomStart' \| 'bottomCenter' \| 'bottomEnd'` | `'bottomStart'` |
| `currentPage` | 当前页码（受控） | `number` | - |
| `pageSize` | 每页条数 | `number` | `20` |
| `pageSizeOpts` | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| `simpleMode` | 是否简洁模式 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |

### Slots（插槽）

| Slot | 说明 |
|------|------|
| `table-empty` | 空数据时显示的内容 |
| `custom-cell-{dataIndex}-{rowKey}` | 自定义单元格内容 |
| `custom-row-{rowKey}` | 展开行内容 |

### CSS Parts

| Part 名称 | 说明 |
|-----------|------|
| `table-wrapper` | 表格外层容器 |
| `table-container` | 表格内层容器 |
| `table-head` | 表头区域 |
| `table-body` | 表体区域 |
| `table-row` | 表格行 |
| `table-row-cell` | 表格单元格 |
| `row-all-select` | 全选 Checkbox |
| `row-check-select` | 行选择 Checkbox |
| `row-radio-select` | 行选择 Radio |

### CSS 设计变量

| Token 名称 | 说明 |
|-----------|------|
| `--sl-table-cell-border` | 单元格边框颜色 |
| `--sl-table-cell-border-width` | 单元格边框宽度 |
| `--sl-table-cell-color` | 单元格文字颜色 |
| `--sl-table-cell-background` | 单元格背景色 |
| `--sl-table-cell-line-height` | 单元格行高 |
| `--sl-table-cell-padding` | 单元格内边距 |
| `--sl-table-header-background` | 表头背景色 |
| `--sl-table-font-size` | 表格字体大小 |
| `--sl-table-row-background-hover` | 行悬停背景色 |
| `--sl-table-row-background-active` | 选中行背景色 |
| `--sl-table-icon-color-default` | 排序图标默认颜色 |
| `--sl-table-icon-color-active` | 排序图标激活颜色 |
| `--sl-table-mask` | 加载遮罩背景色 |

## 使用建议

1. **rowKey 设置**：务必为 `rowKey` 指定一个在数据中唯一的字段名（如 `'id'`），这是行选择、展开、排序等功能正常工作的基础
2. **列宽设置**：建议为每列设置 `width`，可避免列宽分配不合理的问题
3. **大数据量**：数据量超过 100 条时，建议开启 `virtualized` 虚拟滚动或配合 `pagination` 分页使用
4. **自定义单元格**：通过 `slot: true` 配合 `generateCustomSlot` 工具函数实现自定义渲染
5. **服务端数据**：通过监听 `onChange` 事件，结合 `sortOrder`、`filteredValue` 受控属性实现服务端排序/筛选
