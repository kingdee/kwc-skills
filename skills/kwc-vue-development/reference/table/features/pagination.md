# 分页

[返回目录](../index.md)

## 功能说明

Table 组件支持分页功能，通过 `pagination` 属性配置。支持设置分页位置、每页条数、页码、每页条数选项等，并提供分页变化回调。在 Vue 中，分页回调通过 `@sl-change` 事件监听，或在 `pagination` 配置对象中设置 `sl-page-change` 回调。

## API 属性

### Pagination 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `position` | 分页位置 | `'topStart' \| 'topCenter' \| 'topEnd' \| 'bottomStart' \| 'bottomCenter' \| 'bottomEnd'` | `'bottomEnd'` |
| `total` | 数据总条数 | `number` | - |
| `pageSize` | 每页条数 | `number` | `20` |
| `currentPage` | 当前页码（受控） | `number` | - |
| `defaultCurrentPage` | 默认当前页码 | `number` | `1` |
| `pageSizeOpts` | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| `simpleMode` | 是否简洁模式 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |

---

## 代码示例

### 示例1：基础分页

配置 `pagination` 属性开启分页功能。

```vue
<template>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :pagination.prop="pagination"
  ></sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '邮箱', dataIndex: 'email' }
];

// 生成 100 条数据
const dataSource = Array.from({ length: 100 }, (_, index) => ({
  id: String(index + 1),
  name: `用户${index + 1}`,
  email: `user${index + 1}@example.com`
}));

const pagination = {
  total: 100,
  pageSize: 10,
  defaultCurrentPage: 1
};
</script>
```

---

### 示例2：分页位置

通过 `position` 设置分页器的位置，支持 6 种位置。

```vue
<template>
  <div class="demo-group">
    <h4>顶部居右 (topEnd)</h4>
    <sl-table
      rowKey="id"
      :columns.prop="columns"
      :dataSource.prop="dataSource"
      :pagination.prop="paginationTopEnd"
    ></sl-table>
  </div>
  
  <div class="demo-group">
    <h4>底部居中 (bottomCenter)</h4>
    <sl-table
      rowKey="id"
      :columns.prop="columns"
      :dataSource.prop="dataSource"
      :pagination.prop="paginationBottomCenter"
    ></sl-table>
  </div>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 }
];

const dataSource = Array.from({ length: 50 }, (_, index) => ({
  id: String(index + 1),
  name: `用户${index + 1}`,
  age: 20 + (index % 30)
}));

const paginationTopEnd = {
  total: 50,
  pageSize: 5,
  position: 'topEnd'
};

const paginationBottomCenter = {
  total: 50,
  pageSize: 5,
  position: 'bottomCenter'
};
</script>

<style scoped>
.demo-group {
  margin-bottom: var(--sl-spacing-x-large);
}
.demo-group h4 {
  margin: 0 0 var(--sl-spacing-small);
  color: var(--sl-color-neutral-700);
}
</style>
```

---

### 示例3：自定义每页条数选项

通过 `pageSizeOpts` 自定义每页条数的下拉选项。

```vue
<template>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :pagination.prop="pagination"
  ></sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '部门', dataIndex: 'department' }
];

const dataSource = Array.from({ length: 200 }, (_, index) => ({
  id: String(index + 1),
  name: `员工${index + 1}`,
  department: ['研发部', '产品部', '设计部'][index % 3]
}));

const pagination = {
  total: 200,
  pageSize: 15,
  pageSizeOpts: [15, 30, 50, 100, 200]  // 自定义选项
};
</script>
```

---

### 示例4：分页回调

通过 `@sl-change` 监听分页变化，处理页码切换。

```vue
<template>
  <div class="info">
    当前页: {{ currentPage }}, 每页: {{ pageSize }} 条
  </div>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :pagination.prop="pagination"
    @sl-change="handleChange"
  ></sl-table>
</template>

<script setup>
import { ref } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const currentPage = ref(1);
const pageSize = ref(10);

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '状态', dataIndex: 'status' }
];

const dataSource = Array.from({ length: 100 }, (_, index) => ({
  id: String(index + 1),
  name: `用户${index + 1}`,
  status: index % 2 === 0 ? '活跃' : '非活跃'
}));

const pagination = {
  total: 100,
  pageSize: 10,
  defaultCurrentPage: 1
};

function handleChange(event) {
  const { changeType, pagination: page } = event.detail;
  if (changeType === 'pagination') {
    currentPage.value = page.pageNumber;
    pageSize.value = page.pageSize;
    console.log('分页变化:', page);
  }
}
</script>

<style scoped>
.info {
  margin-bottom: var(--sl-spacing-small);
  padding: var(--sl-spacing-x-small) var(--sl-spacing-small);
  background: var(--sl-color-neutral-100);
  border-radius: var(--sl-border-radius-medium);
}
</style>
```

---

### 示例5：服务端分页

配合服务端进行分页数据请求，使用受控的 `currentPage`。

```vue
<template>
  <sl-table
    rowKey="id"
    :loading="isLoading"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :pagination.prop="paginationConfig"
    @sl-change="handleChange"
  ></sl-table>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const isLoading = ref(false);
const dataSource = ref([]);
const state = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
});

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '邮箱', dataIndex: 'email' }
];

const paginationConfig = computed(() => ({
  total: state.total,
  pageSize: state.pageSize,
  currentPage: state.currentPage
}));

onMounted(() => {
  fetchData();
});

function handleChange(event) {
  const { changeType, pagination } = event.detail;
  if (changeType === 'pagination') {
    state.currentPage = pagination.pageNumber;
    state.pageSize = pagination.pageSize;
    fetchData();
  }
}

async function fetchData() {
  isLoading.value = true;
  
  // 模拟服务端请求
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 模拟服务端响应
  const mockTotal = 156;
  const start = (state.currentPage - 1) * state.pageSize;
  dataSource.value = Array.from(
    { length: Math.min(state.pageSize, mockTotal - start) }, 
    (_, index) => ({
      id: String(start + index + 1),
      name: `用户${start + index + 1}`,
      email: `user${start + index + 1}@example.com`
    })
  );
  
  state.total = mockTotal;
  isLoading.value = false;
}
</script>
```

---

## 注意事项

1. **total 属性**：`total` 用于计算总页数，如果不设置，将使用 `dataSource.length`
2. **前端分页 vs 服务端分页**：默认为前端分页（组件自动切片数据），服务端分页需手动管理数据
3. **分页位置**：6 种位置分别是 `topStart`、`topCenter`、`topEnd`、`bottomStart`、`bottomCenter`、`bottomEnd`
4. **currentPage 受控**：设置 `currentPage` 后进入受控模式，需手动管理页码变化
5. **Vue 事件绑定**：在模板中使用 `@sl-change` 监听，通过 `event.detail.changeType === 'pagination'` 判断是否为分页变化
6. **computed 分页配置**：服务端分页场景下，使用 `computed` 根据响应式状态动态返回 `pagination` 配置

[返回目录](../index.md)
