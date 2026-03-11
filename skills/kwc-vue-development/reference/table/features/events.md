# 事件监听

[返回目录](../index.md)

## 功能说明

Table 组件提供统一的 `sl-change` 事件，用于监听排序、筛选、分页等状态的变化。在 Vue 中通过模板中的 `@sl-change` 直接绑定，通过 `changeType` 字段区分变化类型，便于统一处理各类状态变化。

## API 属性

### sl-change 事件 detail

| 属性 | 说明 | 类型 |
|------|------|------|
| `sorting` | 当前排序状态 | `{ id: string, desc: boolean }[]` |
| `columnFilters` | 当前筛选状态 | `{ id: string, value: any[] }[]` |
| `changeType` | 变化类型 | `'sorter' \| 'filters' \| 'pagination'` |
| `pagination` | 分页信息（仅分页变化时） | `{ pageNumber: number, pageSize: number, total: number }` |

---

## 代码示例

### 示例1：sl-change 事件统一监听

通过 `@sl-change` 监听所有状态变化，无需在 JS 中手动调用 `addEventListener`。

```vue
<template>
  <div class="log-panel">
    <h4>事件日志</h4>
    <div class="log-content">{{ logContent }}</div>
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

const logContent = ref('等待操作...');

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { 
    title: '年龄', 
    dataIndex: 'age', 
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  { 
    title: '状态', 
    dataIndex: 'status',
    width: 120,
    filters: [
      { text: '在职', value: 'active' },
      { text: '离职', value: 'inactive' }
    ],
    onFilter: (value, record) => record.status === value
  }
];

const dataSource = Array.from({ length: 50 }, (_, index) => ({
  id: String(index + 1),
  name: `用户${index + 1}`,
  age: 20 + (index % 30),
  status: index % 3 === 0 ? 'inactive' : 'active'
}));

const pagination = {
  total: 50,
  pageSize: 10
};

function handleChange(event) {
  const { changeType } = event.detail;
  const time = new Date().toLocaleTimeString();
  logContent.value = `[${time}] 变化类型: ${changeType}\n${JSON.stringify(event.detail, null, 2)}`;
}
</script>

<style scoped>
.log-panel {
  margin-bottom: var(--sl-spacing-medium);
  padding: var(--sl-spacing-small);
  background: var(--sl-color-neutral-100);
  border-radius: var(--sl-border-radius-medium);
}
.log-panel h4 {
  margin: 0 0 var(--sl-spacing-x-small);
  font-size: var(--sl-font-size-small);
}
.log-content {
  padding: var(--sl-spacing-x-small);
  background: var(--sl-color-neutral-0);
  border: 1px solid var(--sl-color-neutral-300);
  border-radius: var(--sl-border-radius-medium);
  font-family: monospace;
  font-size: var(--sl-font-size-x-small);
  white-space: pre-wrap;
  max-height: 150px;
  overflow: auto;
}
</style>
```

---

### 示例2：区分 changeType

根据不同的 `changeType` 执行不同的处理逻辑。

```vue
<template>
  <div class="status-bar">
    <span class="status-item">排序: {{ sortStatus }}</span>
    <span class="status-item">筛选: {{ filterStatus }}</span>
    <span class="status-item">分页: {{ pageStatus }}</span>
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

const sortStatus = ref('无');
const filterStatus = ref('无');
const pageStatus = ref('第1页');

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { 
    title: '年龄', 
    dataIndex: 'age', 
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  { 
    title: '部门', 
    dataIndex: 'department',
    width: 120,
    filters: [
      { text: '研发部', value: '研发部' },
      { text: '产品部', value: '产品部' },
      { text: '设计部', value: '设计部' }
    ],
    onFilter: (value, record) => record.department === value
  }
];

const dataSource = Array.from({ length: 50 }, (_, index) => ({
  id: String(index + 1),
  name: `员工${index + 1}`,
  age: 22 + (index % 20),
  department: ['研发部', '产品部', '设计部'][index % 3]
}));

const pagination = {
  total: 50,
  pageSize: 10
};

function handleChange(event) {
  const { sorting, columnFilters, changeType, pagination: page } = event.detail;
  
  switch (changeType) {
    case 'sorter':
      if (sorting && sorting.length > 0) {
        const sort = sorting[0];
        sortStatus.value = `${sort.id} ${sort.desc ? '降序' : '升序'}`;
      } else {
        sortStatus.value = '无';
      }
      break;
      
    case 'filters':
      if (columnFilters && columnFilters.length > 0) {
        const filters = columnFilters.map(f => 
          `${f.id}: ${f.value.join(',')}`
        ).join('; ');
        filterStatus.value = filters;
      } else {
        filterStatus.value = '无';
      }
      break;
      
    case 'pagination':
      pageStatus.value = `第${page.pageNumber}页，每页${page.pageSize}条`;
      break;
  }
}
</script>

<style scoped>
.status-bar {
  display: flex;
  gap: var(--sl-spacing-large);
  margin-bottom: var(--sl-spacing-medium);
  padding: var(--sl-spacing-small);
  background: var(--sl-color-primary-100);
  border-radius: var(--sl-border-radius-medium);
}
.status-item {
  font-size: var(--sl-font-size-small);
  color: var(--sl-color-primary-600);
}
</style>
```

---

### 示例3：事件联动场景（服务端数据请求）

多个表格状态变化的联动处理，如服务端数据请求。

```vue
<template>
  <div class="request-info">
    <p>最近请求参数:</p>
    <pre>{{ requestParams }}</pre>
  </div>
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
const requestParams = ref('{}');

// 状态管理
const state = reactive({
  currentSort: null,
  currentFilters: [],
  currentPage: 1,
  pageSize: 10,
  total: 0
});

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { 
    title: '年龄', 
    dataIndex: 'age', 
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  { 
    title: '状态', 
    dataIndex: 'status',
    width: 120,
    filters: [
      { text: '在线', value: 'online' },
      { text: '离线', value: 'offline' }
    ],
    onFilter: (value, record) => record.status === value
  }
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
  const { sorting, columnFilters, changeType, pagination } = event.detail;
  
  if (changeType === 'sorter') {
    state.currentSort = sorting && sorting.length > 0 ? sorting[0] : null;
    state.currentPage = 1;  // 排序变化重置到第一页
  }
  
  if (changeType === 'filters') {
    state.currentFilters = columnFilters || [];
    state.currentPage = 1;  // 筛选变化重置到第一页
  }
  
  if (changeType === 'pagination') {
    state.currentPage = pagination.pageNumber;
    state.pageSize = pagination.pageSize;
  }
  
  fetchData();
}

async function fetchData() {
  isLoading.value = true;
  
  const params = {
    page: state.currentPage,
    pageSize: state.pageSize,
    sort: state.currentSort,
    filters: state.currentFilters
  };
  
  requestParams.value = JSON.stringify(params, null, 2);
  
  // 模拟请求
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 模拟响应
  const mockTotal = 86;
  state.total = mockTotal;
  dataSource.value = Array.from(
    { length: Math.min(state.pageSize, mockTotal - (state.currentPage - 1) * state.pageSize) },
    (_, index) => {
      const realIndex = (state.currentPage - 1) * state.pageSize + index;
      return {
        id: String(realIndex + 1),
        name: `用户${realIndex + 1}`,
        age: 20 + (realIndex % 30),
        status: realIndex % 2 === 0 ? 'online' : 'offline'
      };
    }
  );
  
  isLoading.value = false;
}
</script>

<style scoped>
.request-info {
  margin-bottom: var(--sl-spacing-medium);
  padding: var(--sl-spacing-small);
  background: var(--sl-color-neutral-100);
  border-radius: var(--sl-border-radius-medium);
}
.request-info p {
  margin: 0 0 var(--sl-spacing-x-small);
  font-weight: bold;
}
.request-info pre {
  margin: 0;
  padding: var(--sl-spacing-x-small);
  background: var(--sl-color-neutral-0);
  border: 1px solid var(--sl-color-neutral-300);
  border-radius: var(--sl-border-radius-medium);
  font-size: var(--sl-font-size-x-small);
  max-height: 120px;
  overflow: auto;
}
</style>
```

---

## 注意事项

1. **事件统一入口**：所有状态变化都通过 `sl-change` 事件触发，通过 `changeType` 区分类型
2. **Vue 事件绑定方式**：在模板中使用 `@sl-change="handleChange"` 绑定，不需要在 JS 中手动调用 `addEventListener`
3. **changeType 值**：`'sorter'` 表示排序变化，`'filters'` 表示筛选变化，`'pagination'` 表示分页变化
4. **pagination 字段**：只有 `changeType === 'pagination'` 时才有 `pagination` 字段
5. **重置页码**：排序和筛选变化时，通常需要重置页码到第一页
6. **防抖处理**：如果事件处理中涉及服务端请求，建议添加防抖避免频繁请求

[返回目录](../index.md)
