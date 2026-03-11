# 列宽调整

[返回目录](../index.md)

## 功能说明

Table 组件支持通过拖拽调整列宽。通过设置 `enableColumnResizing` 全局开启，也可以在列配置中单独设置 `enableResizing` 控制某列是否允许调整。列宽调整后会触发 `:onColumnResize` 回调。

## API 属性

### Table 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `enableColumnResizing` | 是否启用列宽调整 | `boolean` | `false` |
| `:onColumnResize` | 列宽调整回调 | `(sizes: Record<string, number>) => void` | - |

### Column 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `enableResizing` | 是否允许该列调整宽度 | `boolean` | 继承全局设置 |

---

## 代码示例

### 示例1：全局启用列宽调整

设置 `enableColumnResizing` 允许所有列拖拽调整宽度。

```vue
<template>
  <p class="tip">拖拽列边框可调整列宽</p>
  <sl-table
    rowKey="id"
    bordered
    enableColumnResizing
    :columns.prop="columns"
    :dataSource.prop="dataSource"
  ></sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '邮箱', dataIndex: 'email', width: 200 },
  { title: '地址', dataIndex: 'address', width: 250 }
];

const dataSource = [
  { id: '1', name: '张三', age: 32, email: 'zhangsan@example.com', address: '北京市朝阳区' },
  { id: '2', name: '李四', age: 28, email: 'lisi@example.com', address: '上海市浦东新区' },
  { id: '3', name: '王五', age: 35, email: 'wangwu@example.com', address: '广州市天河区' }
];
</script>

<style scoped>
.tip {
  margin-bottom: var(--sl-spacing-small);
  color: var(--sl-color-neutral-600);
  font-size: var(--sl-font-size-small);
}
</style>
```

---

### 示例2：禁止某列调整

在特定列设置 `enableResizing: false` 禁止该列调整宽度。

```vue
<template>
  <p class="tip">「年龄」列不可调整宽度</p>
  <sl-table
    rowKey="id"
    bordered
    enableColumnResizing
    :columns.prop="columns"
    :dataSource.prop="dataSource"
  ></sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100, enableResizing: false },  // 禁止调整
  { title: '邮箱', dataIndex: 'email', width: 200 },
  { title: '地址', dataIndex: 'address', width: 250 }
];

const dataSource = [
  { id: '1', name: '张三', age: 32, email: 'zhangsan@example.com', address: '北京市朝阳区' },
  { id: '2', name: '李四', age: 28, email: 'lisi@example.com', address: '上海市浦东新区' },
  { id: '3', name: '王五', age: 35, email: 'wangwu@example.com', address: '广州市天河区' }
];
</script>

<style scoped>
.tip {
  margin-bottom: var(--sl-spacing-small);
  color: var(--sl-color-warning-600);
  font-size: var(--sl-font-size-small);
}
</style>
```

---

### 示例3：列宽调整回调

通过 `:onColumnResize.prop` 监听列宽变化，可用于持久化用户的列宽设置。

```vue
<template>
  <div class="info-panel">
    <p>列宽信息:</p>
    <pre>{{ columnSizes }}</pre>
  </div>
  <sl-table
    rowKey="id"
    bordered
    enableColumnResizing
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :onColumnResize.prop="handleColumnResize"
  ></sl-table>
</template>

<script setup>
import { ref } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columnSizes = ref('{}');

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '邮箱', dataIndex: 'email', width: 200 },
  { title: '地址', dataIndex: 'address', width: 250 }
];

const dataSource = [
  { id: '1', name: '张三', age: 32, email: 'zhangsan@example.com', address: '北京市朝阳区' },
  { id: '2', name: '李四', age: 28, email: 'lisi@example.com', address: '上海市浦东新区' },
  { id: '3', name: '王五', age: 35, email: 'wangwu@example.com', address: '广州市天河区' }
];

function handleColumnResize(sizes) {
  columnSizes.value = JSON.stringify(sizes, null, 2);
  // 可以将列宽保存到 localStorage
  // localStorage.setItem('tableColumnSizes', JSON.stringify(sizes));
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
  margin: 0 0 var(--sl-spacing-x-small);
}
.info-panel pre {
  margin: 0;
  padding: var(--sl-spacing-x-small);
  background: var(--sl-color-neutral-0);
  border: 1px solid var(--sl-color-neutral-300);
  border-radius: var(--sl-border-radius-medium);
  font-size: var(--sl-font-size-x-small);
  max-height: 100px;
  overflow: auto;
}
</style>
```

---

### 示例4：持久化列宽设置

将用户调整的列宽保存到 localStorage，页面刷新后恢复。

```vue
<template>
  <div class="toolbar">
    <sl-button size="small" @click="resetColumnWidths">重置列宽</sl-button>
  </div>
  <sl-table
    rowKey="id"
    bordered
    enableColumnResizing
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :onColumnResize.prop="handleColumnResize"
  ></sl-table>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

const STORAGE_KEY = 'myTableColumnWidths';
const DEFAULT_WIDTHS = { name: 150, age: 100, email: 200, address: 250 };

const savedWidths = ref({ ...DEFAULT_WIDTHS });

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    savedWidths.value = JSON.parse(saved);
  }
});

const columns = computed(() => [
  { title: '姓名', dataIndex: 'name', width: savedWidths.value.name || DEFAULT_WIDTHS.name },
  { title: '年龄', dataIndex: 'age', width: savedWidths.value.age || DEFAULT_WIDTHS.age },
  { title: '邮箱', dataIndex: 'email', width: savedWidths.value.email || DEFAULT_WIDTHS.email },
  { title: '地址', dataIndex: 'address', width: savedWidths.value.address || DEFAULT_WIDTHS.address }
]);

const dataSource = [
  { id: '1', name: '张三', age: 32, email: 'zhangsan@example.com', address: '北京市朝阳区' },
  { id: '2', name: '李四', age: 28, email: 'lisi@example.com', address: '上海市浦东新区' },
  { id: '3', name: '王五', age: 35, email: 'wangwu@example.com', address: '广州市天河区' }
];

function handleColumnResize(sizes) {
  savedWidths.value = { ...savedWidths.value, ...sizes };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedWidths.value));
}

function resetColumnWidths() {
  savedWidths.value = { ...DEFAULT_WIDTHS };
  localStorage.removeItem(STORAGE_KEY);
}
</script>

<style scoped>
.toolbar {
  margin-bottom: var(--sl-spacing-medium);
}
</style>
```

---

## 注意事项

1. **列宽限制**：列宽调整有最小值（60px）和最大值（500px）限制
2. **拖拽手柄**：鼠标悬停在列边框时会显示拖拽手柄（col-resize 光标）
3. **bordered 建议开启**：开启 `bordered` 时列边框更明显，便于拖拽
4. **table-layout**：启用列宽调整后，表格使用 `table-layout: auto`，不启用时使用 `table-layout: fixed`
5. **回调参数**：`:onColumnResize.prop` 回调参数是一个对象，key 为 dataIndex，value 为新的宽度值
6. **持久化**：Vue 中配合 `computed` 可方便地将 localStorage 保存的宽度映射为 columns 配置

[返回目录](../index.md)
