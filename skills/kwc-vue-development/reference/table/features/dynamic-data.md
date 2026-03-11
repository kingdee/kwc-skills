# 动态数据更新

[返回目录](../index.md)

## 功能说明

Table 组件支持动态更新数据源，包括添加数据、删除数据、清空并重新加载等操作。在 Vue 中，使用 `ref` 或 `reactive` 声明响应式数据，修改后视图会自动更新。推荐使用不可变更新方式（如展开运算符）创建新数组。

## 代码示例

### 示例1：添加数据

动态向表格添加新数据行。

```vue
<template>
  <div class="toolbar">
    <sl-button variant="primary" @click="handleAdd">添加一行</sl-button>
    <sl-button @click="handleAddMultiple">添加多行</sl-button>
    <span class="count">共 {{ dataSource.length }} 条数据</span>
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
import '@kdcloudjs/shoelace/dist/components/button/button.js';

const dataSource = ref([
  { id: '1', name: '张三', age: 28, department: '研发部' },
  { id: '2', name: '李四', age: 32, department: '产品部' }
]);

let counter = 3;

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '部门', dataIndex: 'department' }
];

function handleAdd() {
  const newItem = {
    id: String(counter),
    name: `新员工${counter}`,
    age: 20 + Math.floor(Math.random() * 20),
    department: ['研发部', '产品部', '设计部'][Math.floor(Math.random() * 3)]
  };
  dataSource.value = [...dataSource.value, newItem];
  counter++;
}

function handleAddMultiple() {
  const newItems = Array.from({ length: 5 }, (_, i) => ({
    id: String(counter + i),
    name: `批量员工${counter + i}`,
    age: 20 + Math.floor(Math.random() * 20),
    department: ['研发部', '产品部', '设计部'][Math.floor(Math.random() * 3)]
  }));
  dataSource.value = [...dataSource.value, ...newItems];
  counter += 5;
}
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: var(--sl-spacing-small);
  margin-bottom: var(--sl-spacing-medium);
}
.count {
  color: var(--sl-color-neutral-600);
  font-size: var(--sl-font-size-small);
}
</style>
```

---

### 示例2：删除数据

从表格中删除指定数据行。在 `v-for` 循环元素上绑定 `:slot` 属性渲染操作列，可直接访问当前行数据，无需通过 id 查找。

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
      <sl-button size="small" variant="danger" @click="handleDelete(row.id)">删除</sl-button>
    </div>
  </sl-table>
</template>

<script setup>
import { ref } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

const dataSource = ref([
  { id: '1', name: '张三', email: 'zhangsan@example.com' },
  { id: '2', name: '李四', email: 'lisi@example.com' },
  { id: '3', name: '王五', email: 'wangwu@example.com' },
  { id: '4', name: '赵六', email: 'zhaoliu@example.com' }
]);

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '邮箱', dataIndex: 'email', width: 250 },
  { title: '操作', dataIndex: 'action', width: 100, slot: true }
];

function handleDelete(id) {
  dataSource.value = dataSource.value.filter(item => item.id !== id);
}
</script>

<style scoped>
.action-cell {
  display: flex;
  justify-content: center;
}
</style>
```

---

### 示例3：清空并重新加载

清空表格数据并重新加载。

```vue
<template>
  <div class="toolbar">
    <sl-button variant="primary" @click="handleReload">重新加载</sl-button>
    <sl-button variant="default" @click="handleClear">清空数据</sl-button>
  </div>
  <sl-table
    rowKey="id"
    :loading="isLoading"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
  ></sl-table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

const isLoading = ref(false);
const dataSource = ref([]);

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '任务名称', dataIndex: 'task', width: 200 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '创建时间', dataIndex: 'createdAt' }
];

onMounted(() => {
  loadData();
});

function handleClear() {
  dataSource.value = [];
}

function handleReload() {
  loadData();
}

async function loadData() {
  isLoading.value = true;
  dataSource.value = [];  // 先清空
  
  // 模拟异步请求
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 生成新数据
  const now = new Date();
  dataSource.value = Array.from({ length: 10 }, (_, index) => ({
    id: String(index + 1),
    task: `任务${index + 1}`,
    status: ['待处理', '进行中', '已完成'][index % 3],
    createdAt: new Date(now - index * 86400000).toLocaleDateString()
  }));
  
  isLoading.value = false;
}
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: var(--sl-spacing-small);
  margin-bottom: var(--sl-spacing-medium);
}
</style>
```

---

### 示例4：编辑数据

实现行数据的编辑功能，使用 sl-dialog 弹窗进行数据编辑。在 `v-for` 循环元素上绑定 `:slot` 属性渲染操作列，直接将行数据对象传入编辑函数。

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
      <sl-button size="small" variant="text" @click="handleEdit(row)">编辑</sl-button>
    </div>
  </sl-table>
  
  <!-- 编辑弹窗 -->
  <sl-dialog label="编辑用户" :open="isDialogOpen" @sl-hide="handleDialogClose">
    <div class="form-item">
      <label>姓名:</label>
      <sl-input :value="editingItem.name" @sl-input="handleNameInput"></sl-input>
    </div>
    <div class="form-item">
      <label>年龄:</label>
      <sl-input type="number" :value="editingItem.age" @sl-input="handleAgeInput"></sl-input>
    </div>
    <sl-button slot="footer" variant="primary" @click="handleSave">保存</sl-button>
    <sl-button slot="footer" @click="handleDialogClose">取消</sl-button>
  </sl-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';
import '@kdcloudjs/shoelace/dist/components/dialog/dialog.js';
import '@kdcloudjs/shoelace/dist/components/input/input.js';

const dataSource = ref([
  { id: '1', name: '张三', age: 28 },
  { id: '2', name: '李四', age: 32 },
  { id: '3', name: '王五', age: 25 }
]);

const isDialogOpen = ref(false);
const editingItem = reactive({ id: null, name: '', age: '' });

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '操作', dataIndex: 'action', width: 100, slot: true }
];

function handleEdit(row) {
  editingItem.id = row.id;
  editingItem.name = row.name;
  editingItem.age = String(row.age);
  isDialogOpen.value = true;
}

function handleNameInput(event) {
  editingItem.name = event.target.value;
}

function handleAgeInput(event) {
  editingItem.age = event.target.value;
}

function handleSave() {
  dataSource.value = dataSource.value.map(item => {
    if (item.id === editingItem.id) {
      return {
        ...item,
        name: editingItem.name,
        age: parseInt(editingItem.age, 10)
      };
    }
    return item;
  });
  handleDialogClose();
}

function handleDialogClose() {
  isDialogOpen.value = false;
  editingItem.id = null;
  editingItem.name = '';
  editingItem.age = '';
}
</script>

<style scoped>
.action-cell {
  display: flex;
  justify-content: center;
}
.form-item {
  margin-bottom: var(--sl-spacing-medium);
}
.form-item label {
  display: block;
  margin-bottom: var(--sl-spacing-2x-small);
  font-size: var(--sl-font-size-small);
  color: var(--sl-color-neutral-700);
}
</style>
```

---

## 注意事项

1. **Vue 响应式与 Web Components 更新**：向 `<sl-table>` 等 Web Component 传递数组或对象数据时，由于底层（Lit）采用 `===` 严格浅比对检测属性变更，**绝对禁止**原地修改响应式数据（如调用 `push`、`splice` 等方法）。即便是使用 Vue 的 `reactive` 包装的数组，直接修改也**不会**触发组件重新渲染。
2. **必须产生全新引用**：强制使用不可变数据模式，每次更新数据源都必须将包含新数据的全新数组赋值给状态（例如：`dataSource.value = [...dataSource.value, newItem]` 或 `dataSource.value = dataSource.value.filter(...)`），只有引用的改变才能正确触发视图重新渲染。
3. **rowKey 唯一性**：添加新数据时确保 `rowKey` 字段值唯一
4. **Vue 中的弹窗事件**：sl-dialog 的 `@sl-hide` 事件在模板中直接绑定，无需手动 `addEventListener`
5. **正确的 slot 写法**：在 `v-for` 循环的元素上直接绑定 `:slot="\`custom-cell-{dataIndex}-${row.id}\`"`，**禁止**在 `<template>` 上使用 `v-for` + `#[动态表达式]` 动态插槽语法（会导致 Vite 编译错误）

[返回目录](../index.md)
