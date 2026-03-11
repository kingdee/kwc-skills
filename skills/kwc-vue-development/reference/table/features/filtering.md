# 列筛选

[返回目录](../index.md)

## 功能说明

Table 组件支持列筛选功能，通过在列配置中设置 `filters` 筛选项和 `onFilter` 筛选函数开启。支持多选和单选筛选模式，可设置默认筛选值，筛选下拉框显隐回调等。筛选状态变化通过 `@sl-change` 事件获取。

## API 属性

### Column 筛选配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `filters` | 筛选项配置 | `{ text: string; value: any }[]` | - |
| `onFilter` | 筛选函数 | `(value, record) => boolean` | - |
| `filterMultiple` | 是否支持多选筛选 | `boolean` | `true` |
| `defaultFilters` | 默认筛选值 | `string[]` | - |
| `filteredValue` | 受控的筛选值 | `string[]` | - |
| `filterDropdownProps` | 传递给筛选下拉框的属性 | `object` | - |
| `onFilterDropdownVisibleChange` | 筛选下拉框显隐变化回调 | `(visible) => void` | - |

### sl-change 事件 detail

| 属性 | 说明 | 类型 |
|------|------|------|
| `columnFilters` | 当前筛选状态数组 | `{ id: string, value: any[] }[]` |
| `changeType` | 变化类型，筛选时为 `'filters'` | `string` |

---

## 代码示例

### 示例1：基础多选筛选

配置 `filters` 筛选项和 `onFilter` 筛选函数，默认为多选模式。

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
  { 
    title: '姓名', 
    dataIndex: 'name', 
    width: 150,
    filters: [
      { text: '张三', value: '张三' },
      { text: '李四', value: '李四' },
      { text: '王五', value: '王五' }
    ],
    onFilter: (value, record) => record.name === value
  },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { 
    title: '部门', 
    dataIndex: 'department',
    filters: [
      { text: '研发部', value: '研发部' },
      { text: '产品部', value: '产品部' },
      { text: '设计部', value: '设计部' }
    ],
    onFilter: (value, record) => record.department === value
  }
];

const dataSource = [
  { id: '1', name: '张三', age: 32, department: '研发部' },
  { id: '2', name: '李四', age: 28, department: '产品部' },
  { id: '3', name: '王五', age: 35, department: '设计部' },
  { id: '4', name: '张三', age: 26, department: '研发部' },
  { id: '5', name: '李四', age: 30, department: '设计部' }
];
</script>
```

---

### 示例2：单选筛选

设置 `filterMultiple: false` 开启单选筛选模式。

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
  { title: '商品名称', dataIndex: 'name', width: 200 },
  { title: '价格', dataIndex: 'price', width: 100 },
  { 
    title: '状态', 
    dataIndex: 'status',
    width: 120,
    filters: [
      { text: '在售', value: 'active' },
      { text: '下架', value: 'inactive' },
      { text: '售罄', value: 'soldout' }
    ],
    onFilter: (value, record) => record.status === value,
    filterMultiple: false  // 单选筛选
  }
];

const dataSource = [
  { id: '1', name: '商品A', price: 299, status: 'active' },
  { id: '2', name: '商品B', price: 199, status: 'inactive' },
  { id: '3', name: '商品C', price: 599, status: 'active' },
  { id: '4', name: '商品D', price: 99, status: 'soldout' },
  { id: '5', name: '商品E', price: 399, status: 'active' }
];
</script>
```

---

### 示例3：默认筛选值

通过 `defaultFilters` 设置初始筛选条件。

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
  { title: '任务名称', dataIndex: 'task', width: 200 },
  { title: '负责人', dataIndex: 'owner', width: 120 },
  { 
    title: '优先级', 
    dataIndex: 'priority',
    width: 120,
    filters: [
      { text: '高', value: 'high' },
      { text: '中', value: 'medium' },
      { text: '低', value: 'low' }
    ],
    onFilter: (value, record) => record.priority === value,
    defaultFilters: ['high', 'medium']  // 默认筛选高和中优先级
  }
];

const dataSource = [
  { id: '1', task: '需求分析', owner: '张三', priority: 'high' },
  { id: '2', task: '代码评审', owner: '李四', priority: 'medium' },
  { id: '3', task: '文档编写', owner: '王五', priority: 'low' },
  { id: '4', task: 'Bug修复', owner: '张三', priority: 'high' },
  { id: '5', task: '单元测试', owner: '李四', priority: 'low' }
];
</script>
```

---

### 示例4：筛选下拉框显隐回调

通过 `onFilterDropdownVisibleChange` 监听筛选下拉框的显隐状态。在 Vue 中，列配置中的回调函数可以直接访问响应式变量。

```vue
<template>
  <div class="log-panel">
    筛选框状态: {{ filterStatus }}
  </div>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
  ></sl-table>
</template>

<script setup>
import { ref } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const filterStatus = ref('已关闭');

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { 
    title: '状态', 
    dataIndex: 'status',
    width: 120,
    filters: [
      { text: '在线', value: 'online' },
      { text: '离线', value: 'offline' },
      { text: '忙碌', value: 'busy' }
    ],
    onFilter: (value, record) => record.status === value,
    onFilterDropdownVisibleChange: (visible) => {
      filterStatus.value = visible ? '已打开' : '已关闭';
    }
  }
];

const dataSource = [
  { id: '1', name: '张三', status: 'online' },
  { id: '2', name: '李四', status: 'offline' },
  { id: '3', name: '王五', status: 'busy' }
];
</script>

<style scoped>
.log-panel {
  margin-bottom: var(--sl-spacing-medium);
  padding: var(--sl-spacing-small);
  background: var(--sl-color-primary-100);
  border: 1px solid var(--sl-color-primary-300);
  border-radius: var(--sl-border-radius-medium);
  color: var(--sl-color-primary-600);
}
</style>
```

---

### 示例5：筛选状态变化监听

通过模板中的 `@sl-change` 监听筛选状态变化，获取当前筛选状态。

```vue
<template>
  <div class="filter-info">
    <p>当前筛选条件:</p>
    <pre>{{ filterJson }}</pre>
  </div>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    @sl-change="handleChange"
  ></sl-table>
</template>

<script setup>
import { ref } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const filterJson = ref('无');

const columns = [
  { 
    title: '姓名', 
    dataIndex: 'name', 
    width: 150,
    filters: [
      { text: '张三', value: '张三' },
      { text: '李四', value: '李四' }
    ],
    onFilter: (value, record) => record.name === value
  },
  { 
    title: '部门', 
    dataIndex: 'department',
    width: 150,
    filters: [
      { text: '研发部', value: '研发部' },
      { text: '产品部', value: '产品部' }
    ],
    onFilter: (value, record) => record.department === value
  }
];

const dataSource = [
  { id: '1', name: '张三', department: '研发部' },
  { id: '2', name: '李四', department: '产品部' },
  { id: '3', name: '张三', department: '产品部' },
  { id: '4', name: '李四', department: '研发部' }
];

function handleChange(event) {
  const { columnFilters, changeType } = event.detail;
  
  if (changeType === 'filters') {
    if (columnFilters && columnFilters.length > 0) {
      filterJson.value = JSON.stringify(columnFilters, null, 2);
    } else {
      filterJson.value = '无';
    }
  }
}
</script>

<style scoped>
.filter-info {
  margin-bottom: var(--sl-spacing-medium);
  padding: var(--sl-spacing-small);
  background: var(--sl-color-neutral-100);
  border-radius: var(--sl-border-radius-medium);
}
.filter-info pre {
  margin: var(--sl-spacing-x-small) 0 0;
  padding: var(--sl-spacing-x-small);
  background: var(--sl-color-neutral-0);
  border: 1px solid var(--sl-color-neutral-300);
  border-radius: var(--sl-border-radius-medium);
  font-size: var(--sl-font-size-x-small);
}
</style>
```

---

## 注意事项

1. **filters 和 onFilter 配合使用**：必须同时配置 `filters` 和 `onFilter` 才能使筛选功能生效
2. **onFilter 返回布尔值**：`onFilter` 函数返回 `true` 表示该行数据符合筛选条件
3. **多选筛选逻辑**：多选模式下，只要满足任一筛选条件即显示该行（OR 逻辑）
4. **筛选图标**：有筛选功能的列会显示筛选图标，悬停时显示，筛选激活时高亮
5. **重置筛选**：点击筛选下拉框中的「重置」按钮可清空当前列的筛选条件
6. **Vue 事件绑定**：在模板中使用 `@sl-change` 绑定，通过 `event.detail.changeType` 判断变化类型

[返回目录](../index.md)
