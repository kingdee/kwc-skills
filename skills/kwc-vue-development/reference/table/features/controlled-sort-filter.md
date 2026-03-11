# 受控排序筛选与服务端数据

[返回目录](../index.md)

## 功能说明

当需要与服务端数据联动时，可使用受控的排序（`sortOrder`）和筛选（`filteredValue`）属性。受控模式下，组件不会自动进行排序/筛选，而是通过 `@sl-change` 回调通知外部状态变化，由外部发起服务端请求并更新数据。在 Vue 中，使用 `computed` 动态返回包含受控属性的 columns 配置。

## API 属性

### Column 受控配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `sortOrder` | 受控的排序方向 | `'asc' \| 'desc' \| null` | - |
| `filteredValue` | 受控的筛选值 | `string[]` | - |

---

## 代码示例

### 示例1：受控排序

通过 `sortOrder` 属性控制排序状态，配合 `@sl-change` 事件手动管理排序。

```vue
<template>
  <div class="info-panel">
    <p>当前排序: {{ sortInfo }}</p>
    <sl-button size="small" @click="clearSort">清除排序</sl-button>
  </div>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    @sl-change="handleChange"
  ></sl-table>
</template>

<script setup>
import { ref, computed } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

const currentSortOrder = ref(null);
const sortInfo = ref('无');

const dataSource = [
  { id: '1', name: '张三', age: 32 },
  { id: '2', name: '李四', age: 28 },
  { id: '3', name: '王五', age: 35 },
  { id: '4', name: '赵六', age: 26 }
];

const columns = computed(() => [
  { title: '姓名', dataIndex: 'name', width: 150 },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 100,
    sorter: (a, b) => a.age - b.age,
    sortOrder: currentSortOrder.value  // 受控排序
  }
]);

function handleChange(event) {
  const { sorting, changeType } = event.detail;

  if (changeType === 'sorter') {
    if (sorting && sorting.length > 0) {
      currentSortOrder.value = sorting[0].desc ? 'desc' : 'asc';
      sortInfo.value = `年龄 ${currentSortOrder.value === 'desc' ? '降序' : '升序'}`;
    } else {
      currentSortOrder.value = null;
      sortInfo.value = '无';
    }
  }
}

function clearSort() {
  currentSortOrder.value = null;
  sortInfo.value = '无';
}
</script>

<style scoped>
.info-panel {
  display: flex;
  align-items: center;
  gap: var(--sl-spacing-medium);
  margin-bottom: var(--sl-spacing-medium);
  padding: var(--sl-spacing-small);
  background: var(--sl-color-neutral-100);
  border-radius: var(--sl-border-radius-medium);
}
.info-panel p {
  margin: 0;
}
</style>
```

---

### 示例2：受控筛选

通过 `filteredValue` 属性控制筛选状态，配合 `@sl-change` 事件手动管理筛选。

```vue
<template>
  <div class="info-panel">
    <p>当前筛选: {{ filterInfo }}</p>
    <sl-button size="small" @click="clearFilter">清除筛选</sl-button>
  </div>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    @sl-change="handleChange"
  ></sl-table>
</template>

<script setup>
import { ref, computed } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

const currentFilterValue = ref([]);
const filterInfo = ref('无');

const dataSource = [
  { id: '1', name: '张三', status: 'active' },
  { id: '2', name: '李四', status: 'inactive' },
  { id: '3', name: '王五', status: 'active' },
  { id: '4', name: '赵六', status: 'pending' }
];

const columns = computed(() => [
  { title: '姓名', dataIndex: 'name', width: 150 },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    filters: [
      { text: '在职', value: 'active' },
      { text: '离职', value: 'inactive' },
      { text: '待入职', value: 'pending' }
    ],
    onFilter: (value, record) => record.status === value,
    filteredValue: currentFilterValue.value  // 受控筛选
  }
]);

function handleChange(event) {
  const { columnFilters, changeType } = event.detail;

  if (changeType === 'filters') {
    const statusFilter = columnFilters.find(f => f.id === 'status');
    if (statusFilter && statusFilter.value.length > 0) {
      currentFilterValue.value = statusFilter.value;
      filterInfo.value = statusFilter.value.join(', ');
    } else {
      currentFilterValue.value = [];
      filterInfo.value = '无';
    }
  }
}

function clearFilter() {
  currentFilterValue.value = [];
  filterInfo.value = '无';
}
</script>

<style scoped>
.info-panel {
  display: flex;
  align-items: center;
  gap: var(--sl-spacing-medium);
  margin-bottom: var(--sl-spacing-medium);
  padding: var(--sl-spacing-small);
  background: var(--sl-color-neutral-100);
  border-radius: var(--sl-border-radius-medium);
}
.info-panel p {
  margin: 0;
}
</style>
```

---

### 示例3：服务端排序/筛选综合示例

完整的服务端数据联动示例，排序和筛选都由服务端处理。

```vue
<template>
  <div class="info-panel">
    <p>请求参数: {{ requestParams }}</p>
  </div>
  <sl-table
    rowKey="id"
    :loading="isLoading"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    @sl-change="handleChange"
  ></sl-table>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const isLoading = ref(false);
const dataSource = ref([]);
const currentSortOrder = ref(null);
const currentFilterValue = ref([]);
const requestParams = ref('{}');

const columns = computed(() => [
  { title: '姓名', dataIndex: 'name', width: 150 },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 100,
    sorter: (a, b) => a.age - b.age,
    sortOrder: currentSortOrder.value
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    filters: [
      { text: '在职', value: 'active' },
      { text: '离职', value: 'inactive' }
    ],
    onFilter: (value, record) => record.status === value,
    filteredValue: currentFilterValue.value
  }
]);

onMounted(() => {
  fetchData();
});

function handleChange(event) {
  const { sorting, columnFilters, changeType } = event.detail;

  // 更新受控状态
  if (changeType === 'sorter') {
    currentSortOrder.value = (sorting && sorting.length > 0)
      ? (sorting[0].desc ? 'desc' : 'asc')
      : null;
  }

  if (changeType === 'filters') {
    const statusFilter = columnFilters.find(f => f.id === 'status');
    currentFilterValue.value = statusFilter?.value || [];
  }

  // 重新请求数据
  fetchData();
}

async function fetchData() {
  isLoading.value = true;

  const params = {
    sort: currentSortOrder.value ? { field: 'age', order: currentSortOrder.value } : null,
    filter: currentFilterValue.value.length > 0
      ? { field: 'status', values: currentFilterValue.value }
      : null
  };

  requestParams.value = JSON.stringify(params, null, 2);

  // 模拟服务端请求
  await new Promise(resolve => setTimeout(resolve, 500));

  let mockData = [
    { id: '1', name: '张三', age: 32, status: 'active' },
    { id: '2', name: '李四', age: 28, status: 'inactive' },
    { id: '3', name: '王五', age: 35, status: 'active' },
    { id: '4', name: '赵六', age: 26, status: 'inactive' }
  ];

  // 模拟服务端筛选
  if (currentFilterValue.value.length > 0) {
    mockData = mockData.filter(item => currentFilterValue.value.includes(item.status));
  }

  // 模拟服务端排序
  if (currentSortOrder.value) {
    mockData.sort((a, b) => {
      const diff = a.age - b.age;
      return currentSortOrder.value === 'desc' ? -diff : diff;
    });
  }

  dataSource.value = mockData;
  isLoading.value = false;
}
</script>

<style scoped>
.info-panel {
  margin-bottom: var(--sl-spacing-medium);
  padding: var(--sl-spacing-small);
  background: var(--sl-color-neutral-100);
  border-radius: var(--sl-border-radius-medium);
}
.info-panel p {
  margin: 0;
  white-space: pre-wrap;
  font-family: monospace;
  font-size: var(--sl-font-size-x-small);
}
</style>
```

---

## 注意事项

1. **受控模式切换**：一旦设置了 `sortOrder` 或 `filteredValue`，该列就进入受控模式，组件不会自动排序/筛选
2. **必须配合回调使用**：受控模式下需要监听 `@sl-change` 事件并手动更新状态
3. **Vue computed 配置**：使用 `computed` 动态返回 columns 配置，确保受控状态变化后 columns 随之更新
4. **服务端分页联动**：通常服务端排序/筛选需要配合服务端分页使用，每次变化都重新请求第一页数据
5. **loading 状态**：服务端请求时建议设置 `loading` 状态，提升用户体验
6. **清空受控值**：将 `sortOrder` 设为 `null`、`filteredValue` 设为空数组可清除对应状态

[返回目录](../index.md)
