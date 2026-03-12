# Table 数据表格组件 Skill

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
| 受控排序筛选 | 受控排序/筛选、服务端数据联动 | [controlled-sort-filter.md](./features/controlled-sort-filter.md) |
| 固定列 | 左侧固定、右侧固定、两侧同时固定 | [fixed-column.md](./features/fixed-column.md) |
| 列宽调整 | 拖拽调整列宽、禁止某列调整、调整回调 | [column-resizing.md](./features/column-resizing.md) |
| 自定义单元格 | slot 自定义渲染、动态 slot 生成 | [custom-cell.md](./features/custom-cell.md) |
| 可编辑单元格 | 点击单元格进入编辑态，失焦后保存 | [editable-cell.md](./features/editable-cell.md) |
| 文本省略与对齐 | ellipsis 省略、align 对齐、列样式类名 | [ellipsis-align.md](./features/ellipsis-align.md) |
| 行展开 | 展开行、点击行展开、指定可展开行、默认展开 | [row-expand.md](./features/row-expand.md) |
| 嵌套子表格 | 在展开行内渲染子表格 | [nested-table.md](./features/nested-table.md) |
| 行拖拽 | 拖拽排序并监听 sl-row-reorder | [row-drag.md](./features/row-drag.md) |
| 虚拟滚动 | 大数据量虚拟滚动、自定义行高 | [virtualized.md](./features/virtualized.md) |
| 分页 | 分页配置、分页位置、每页条数、分页回调 | [pagination.md](./features/pagination.md) |
| 事件监听 | change 事件、changeType 区分、事件联动，包含排序、筛选、分页 | [events.md](./features/events.md) |
| 动态数据更新 | 添加数据、删除数据、清空重载 | [dynamic-data.md](./features/dynamic-data.md) |
| RTL 方向 | 从右到左布局、RTL + 固定列 | [rtl.md](./features/rtl.md) |
| 行/单元格属性 | slRow、slHeaderRow、slCell、slHeaderCell | [row-cell-props.md](./features/row-cell-props.md) |

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

6. **行拖拽规范**
   - 通过 `rowDrag` 属性开启行拖拽功能
   - 监听 `@sl-row-reorder` 事件获取拖拽排序结果

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

## 使用建议

1. **rowKey 设置**：务必为 `rowKey` 指定一个在数据中唯一的字段名（如 `'id'`），这是行选择、展开、排序等功能正常工作的基础
2. **列宽设置**：建议为每列设置 `width`，可避免列宽分配不合理的问题
3. **大数据量**：数据量超过 100 条时，建议开启 `virtualized` 虚拟滚动或配合 `pagination` 分页使用
4. **固定列**：使用 `fixed` 固定列时，需要配合 `tableScroll.x` 设置横向滚动宽度
5. **自定义单元格**：通过 `slot: true` 配合对应 slot 名称实现自定义渲染
6. **服务端数据**：通过监听 `@sl-change` 事件，结合受控属性实现服务端排序/筛选
