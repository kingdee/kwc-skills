# 加载状态与空数据

[返回目录](../index.md)

## 功能说明

Table 组件提供加载状态展示和空数据处理功能。`loading` 属性用于显示加载中的遮罩和 Spinner；当数据为空时，组件会自动显示空状态提示，支持通过 `table-empty` slot 自定义空状态内容。

## API 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `loading` | 是否显示加载状态 | `boolean` | `false` |

### Slots

| Slot | 说明 |
|------|------|
| `table-empty` | 空数据时显示的自定义内容 |

---

## 代码示例

### 示例1：加载状态

设置 `loading` 属性显示加载中状态，表格内容会被遮罩覆盖并显示 Spinner。

```vue
<template>
  <sl-table
    rowKey="id"
    loading
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
  { id: '2', name: '李四', age: 28, address: '上海市浦东新区' }
];
</script>
```

---

### 示例2：切换加载状态

通过按钮动态控制加载状态，模拟异步数据请求场景。

```vue
<template>
  <div class="toolbar">
    <sl-button variant="primary" @click="loadData">
      {{ isLoading ? '加载中...' : '加载数据' }}
    </sl-button>
  </div>
  <sl-table
    rowKey="id"
    :loading="isLoading"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
  ></sl-table>
</template>

<script setup>
import { ref } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

const isLoading = ref(false);
const dataSource = ref([]);

const columns = [
  { title: '商品', dataIndex: 'product', width: 200 },
  { title: '价格', dataIndex: 'price', width: 100 },
  { title: '库存', dataIndex: 'stock', width: 100 }
];

function loadData() {
  isLoading.value = true;
  dataSource.value = [];

  // 模拟异步请求
  setTimeout(() => {
    dataSource.value = [
      { id: '1', product: '商品A', price: 100, stock: 50 },
      { id: '2', product: '商品B', price: 200, stock: 30 },
      { id: '3', product: '商品C', price: 150, stock: 20 }
    ];
    isLoading.value = false;
  }, 2000);
}
</script>

<style scoped>
.toolbar {
  margin-bottom: var(--sl-spacing-medium);
}
</style>
```

---

### 示例3：空数据默认展示

当 `dataSource` 为空数组时，表格自动显示默认的空数据提示。

```vue
<template>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="emptyData"
  ></sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '地址', dataIndex: 'address' }
];

const emptyData = [];
</script>
```

---

### 示例4：自定义空状态

通过 `table-empty` slot 自定义空数据时的展示内容。

```vue
<template>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="emptyData"
  >
    <div slot="table-empty" class="custom-empty">
      <sl-icon name="inbox" style="font-size: var(--sl-font-size-3x-large); color: var(--sl-color-neutral-300);"></sl-icon>
      <p class="empty-title">暂无数据</p>
      <p class="empty-desc">请尝试调整筛选条件或添加新数据</p>
      <sl-button variant="primary" size="small" @click="handleAdd">
        添加数据
      </sl-button>
    </div>
  </sl-table>
</template>

<script setup>
import { ref } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/icon/icon.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

const emptyData = ref([]);

const columns = [
  { title: '任务名称', dataIndex: 'task', width: 200 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '创建时间', dataIndex: 'createdAt' }
];

function handleAdd() {
  emptyData.value = [
    { id: '1', task: '新任务', status: '进行中', createdAt: '2024-01-15' }
  ];
}
</script>

<style scoped>
.custom-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--sl-spacing-3x-large) 24px;
}

.empty-title {
  margin: var(--sl-spacing-medium) 0 var(--sl-spacing-x-small);
  font-size: var(--sl-font-size-medium);
  color: var(--sl-color-neutral-700);
}

.empty-desc {
  margin: 0 0 var(--sl-spacing-medium);
  font-size: var(--sl-font-size-small);
  color: var(--sl-color-neutral-500);
}
</style>
```

---

## 注意事项

1. **loading 覆盖整个表格**：`loading` 状态会在表格上方显示半透明遮罩和 Spinner，用户无法与表格交互
2. **Vue 中 loading 绑定**：静态 loading 直接写 `loading` 属性（表示 true），动态控制使用 `:loading="isLoading"`
3. **空数据判断**：当 `dataSource` 为空数组 `[]` 或经过筛选后无数据时，都会触发空状态展示
4. **自定义空状态样式**：使用 `table-empty` slot 时，需要自行设置内容的布局和样式
5. **加载完成后清除状态**：异步请求完成后记得将 `loading` 对应的响应式变量设置为 `false`

[返回目录](../index.md)
