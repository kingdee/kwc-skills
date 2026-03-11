# 自定义单元格

[返回目录](../index.md)

## 功能说明

Table 组件支持通过 slot 自定义单元格内容。在列配置中设置 `slot: true`，然后使用对应的 slot 名称 `custom-cell-{dataIndex}-{rowKeyValue}` 来渲染自定义内容。

**Vue 3 自定义单元格的正确写法**：在 `v-for` 循环的元素上直接绑定 `:slot` 属性，而不是在 `<template>` 上使用 `v-for` + 动态插槽指令 `#[slotName]`（后者在 Vite 编译时会报错）。

## API 属性

### Column 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `slot` | 是否启用自定义渲染 | `boolean` | `false` |

### Slot 命名规则

| Slot 格式 | 说明 |
|-----------|------|
| `custom-cell-{dataIndex}-{rowKeyValue}` | 自定义单元格内容 |

- `dataIndex`：列的 dataIndex 值
- `rowKeyValue`：该行数据的 rowKey 字段值

---

## 代码示例

### 示例1：使用 v-for + :slot 属性渲染操作列

在 `v-for` 循环的元素上直接绑定 `:slot` 属性，为每一行渲染自定义操作列内容。

```vue
<template>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
  >
    <div
      v-for="row in dataSource"
      :key="row.id"
      :slot="`custom-cell-action-${row.id}`"
      class="action-cell"
    >
      <sl-button size="small" variant="primary" @click="handleEdit(row.id)">编辑</sl-button>
      <sl-button size="small" variant="danger" @click="handleDelete(row.id)">删除</sl-button>
    </div>
  </sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '邮箱', dataIndex: 'email', width: 200 },
  { title: '操作', dataIndex: 'action', width: 180, slot: true }
];

const dataSource = [
  { id: '1', name: '张三', age: 32, email: 'zhangsan@example.com' },
  { id: '2', name: '李四', age: 28, email: 'lisi@example.com' },
  { id: '3', name: '王五', age: 35, email: 'wangwu@example.com' }
];

function handleEdit(id) {
  console.log('编辑:', id);
}

function handleDelete(id) {
  console.log('删除:', id);
}
</script>

<style scoped>
.action-cell {
  display: flex;
  gap: var(--sl-spacing-x-small);
}
</style>
```

---

### 示例2：:slot 绑定结合行数据的查看/编辑操作

在 `v-for` 循环的元素上绑定 `:slot`，可以直接访问当前行的完整数据对象，无需通过 id 查找。

```vue
<template>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
  >
    <div
      v-for="row in dataSource"
      :key="row.id"
      :slot="`custom-cell-action-${row.id}`"
      class="action-cell"
    >
      <sl-button size="small" variant="text" @click="handleView(row)">查看</sl-button>
      <sl-button size="small" variant="text" @click="handleEdit(row)">编辑</sl-button>
    </div>
  </sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

const columns = [
  { title: '任务名称', dataIndex: 'task', width: 200 },
  { title: '负责人', dataIndex: 'owner', width: 120 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '操作', dataIndex: 'action', width: 150, slot: true }
];

const dataSource = [
  { id: '1', task: '需求分析', owner: '张三', status: '进行中' },
  { id: '2', task: '技术设计', owner: '李四', status: '已完成' },
  { id: '3', task: '代码开发', owner: '王五', status: '待开始' },
  { id: '4', task: '测试验证', owner: '赵六', status: '待开始' }
];

function handleView(row) {
  alert(`查看任务: ${row.task}`);
}

function handleEdit(row) {
  alert(`编辑任务: ${row.task}`);
}
</script>

<style scoped>
.action-cell {
  display: flex;
  gap: var(--sl-spacing-2x-small);
}
</style>
```

---

### 示例3：多列自定义渲染（v-for + :slot 绑定）

为多个列添加自定义渲染，如状态标签。在循环元素上直接绑定 `:slot`，直接从行数据中读取所需字段，代码简洁易维护。

```vue
<template>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
  >
    <!-- 状态列：在循环元素上绑定 :slot，直接访问行数据 -->
    <div
      v-for="row in dataSource"
      :key="row.id"
      :slot="`custom-cell-status-${row.id}`"
      class="status-cell"
    >
      <sl-tag :variant="getStatusVariant(row.status)">{{ row.statusText }}</sl-tag>
    </div>
  </sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/tag/tag.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '部门', dataIndex: 'department', width: 120 },
  { title: '状态', dataIndex: 'status', width: 100, slot: true }
];

const dataSource = [
  { id: '1', name: '张三', department: '研发部', status: 'active', statusText: '在职' },
  { id: '2', name: '李四', department: '产品部', status: 'inactive', statusText: '离职' },
  { id: '3', name: '王五', department: '设计部', status: 'vacation', statusText: '休假' }
];

function getStatusVariant(status) {
  const variantMap = {
    active: 'success',
    inactive: 'danger',
    vacation: 'warning'
  };
  return variantMap[status] || 'neutral';
}
</script>

<style scoped>
.status-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

---

### 示例4：自定义单元格与数据联动（:slot 绑定 + 响应式数据）

根据数据内容动态渲染不同的自定义内容，如进度条。在循环元素上绑定 `:slot`，结合 `ref` 响应式数据，代码既简洁又支持实时更新。

```vue
<template>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
  >
    <div
      v-for="row in dataSource"
      :key="row.id"
      :slot="`custom-cell-progress-${row.id}`"
      class="progress-cell"
    >
      <sl-progress-bar :value="row.progress"></sl-progress-bar>
      <span class="progress-text">{{ row.progress }}%</span>
    </div>
  </sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/progress-bar/progress-bar.js';

const columns = [
  { title: '项目名称', dataIndex: 'project', width: 200 },
  { title: '负责人', dataIndex: 'owner', width: 120 },
  { title: '进度', dataIndex: 'progress', width: 200, slot: true }
];

const dataSource = [
  { id: '1', project: '项目A', owner: '张三', progress: 80 },
  { id: '2', project: '项目B', owner: '李四', progress: 45 },
  { id: '3', project: '项目C', owner: '王五', progress: 100 },
  { id: '4', project: '项目D', owner: '赵六', progress: 20 }
];
</script>

<style scoped>
.progress-cell {
  display: flex;
  align-items: center;
  gap: var(--sl-spacing-x-small);
}
.progress-cell sl-progress-bar {
  flex: 1;
}
.progress-text {
  min-width: 40px;
  text-align: right;
  font-size: var(--sl-font-size-x-small);
  color: var(--sl-color-neutral-600);
}
</style>
```

---

## 注意事项

1. **Slot 名称格式**：必须严格遵循 `custom-cell-{dataIndex}-{rowKeyValue}` 格式
2. **rowKey 值**：slot 名称中的 rowKeyValue 是数据中 rowKey 字段的实际值
3. **正确的 slot 写法**：在 `v-for` 循环的元素上直接绑定 `:slot="\`custom-cell-{dataIndex}-${row.id}\`"`，**禁止**在 `<template>` 上使用 `v-for` + `#[动态表达式]` 动态插槽语法（会导致 Vite 编译错误）
4. **动态数据处理**：表格数据动态变化时（如分页加载），`v-for` 会自动根据当前数据渲染对应的 slot，无需手动管理
5. **slot 内容为空**：如果某个 slot 没有提供内容，会显示该单元格的原始数据值
6. **Vue 中不需要 kwc:external**：Vue 组件中的子组件（如 `sl-button`）不需要添加 `kwc:external` 属性

[返回目录](../index.md)
