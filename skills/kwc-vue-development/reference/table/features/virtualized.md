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

设置 `virtualized` 开启虚拟滚动，需配合 `:tableScroll` 设置滚动区域高度。

```vue
<template>
  <p class="info">共 {{ dataSource.length }} 条数据，仅渲染可视区域内的行</p>
  <sl-table
    rowKey="id"
    virtualized
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :tableScroll.prop="tableScroll"
  ></sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

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
</script>

<style scoped>
.info {
  margin-bottom: var(--sl-spacing-small);
  color: var(--sl-color-primary-600);
  font-size: var(--sl-font-size-small);
}
</style>
```

---

### 示例2：自定义行高

通过对象形式的 `:virtualized` 配置自定义行高。

```vue
<template>
  <sl-table
    rowKey="id"
    :virtualized.prop="virtualizedConfig"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :tableScroll.prop="tableScroll"
  ></sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

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
</script>
```

---

### 示例3：大数据量场景

展示 10 万条数据的虚拟滚动效果，通过 `ref` 获取组件实例实现编程式滚动。

```vue
<template>
  <div class="toolbar">
    <p>数据量：100,000 条</p>
    <sl-button size="small" @click="scrollToTop">滚动到顶部</sl-button>
    <sl-button size="small" @click="scrollToMiddle">滚动到中间</sl-button>
    <sl-button size="small" @click="scrollToBottom">滚动到底部</sl-button>
  </div>
  <sl-table
    ref="tableRef"
    rowKey="id"
    virtualized
    :columns.prop="columns"
    :dataSource.prop="largeDataSource"
    :tableScroll.prop="tableScroll"
  ></sl-table>
</template>

<script setup>
import { ref } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

const tableRef = ref(null);

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

function getBodyWrapper() {
  return tableRef.value?.shadowRoot?.querySelector('.table-body');
}

function scrollToTop() {
  const body = getBodyWrapper();
  if (body) body.scrollTop = 0;
}

function scrollToMiddle() {
  const body = getBodyWrapper();
  if (body) body.scrollTop = body.scrollHeight / 2;
}

function scrollToBottom() {
  const body = getBodyWrapper();
  if (body) body.scrollTop = body.scrollHeight;
}
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: var(--sl-spacing-medium);
  margin-bottom: var(--sl-spacing-medium);
}
.toolbar p {
  margin: 0;
  color: var(--sl-color-neutral-600);
}
</style>
```

---

### 示例4：虚拟滚动 + 行选择

虚拟滚动与行选择功能配合使用。

```vue
<template>
  <div class="info">
    已选择 {{ selectedCount }} 条数据
  </div>
  <sl-table
    rowKey="id"
    virtualized
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :tableScroll.prop="tableScroll"
    :rowSelection.prop="rowSelection"
  ></sl-table>
</template>

<script setup>
import { ref } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const selectedCount = ref(0);

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

const rowSelection = {
  type: 'checkbox',
  onChange: (selectedRowKeys) => {
    selectedCount.value = selectedRowKeys.length;
  }
};
</script>

<style scoped>
.info {
  margin-bottom: var(--sl-spacing-small);
  padding: var(--sl-spacing-x-small) var(--sl-spacing-small);
  background: var(--sl-color-primary-100);
  border-radius: var(--sl-border-radius-medium);
  color: var(--sl-color-primary-600);
}
</style>
```

---

## 注意事项

1. **必须设置 tableScroll.y**：虚拟滚动需要固定高度才能计算可视区域
2. **默认行高**：不设置 `itemHeight` 时默认行高为 32px
3. **行高一致性**：虚拟滚动要求所有行高度一致，动态高度的场景不适用
4. **自定义单元格**：虚拟滚动与自定义单元格（slot）兼容，但需注意 slot 内容不要过于复杂
5. **滚动性能**：虚拟滚动大幅提升渲染性能，推荐数据量超过 100 条时使用
6. **编程式滚动**：通过 `ref` 获取组件实例后访问 shadowRoot 内的 `.table-body` 实现编程式滚动

[返回目录](../index.md)
