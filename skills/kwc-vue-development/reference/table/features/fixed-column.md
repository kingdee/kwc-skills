# 固定列

[返回目录](../index.md)

## 功能说明

Table 组件支持固定列功能，通过在列配置中设置 `fixed` 属性实现。支持左侧固定（`'left'`）和右侧固定（`'right'`）两种方式。固定列时需要配合 `tableScroll.x` 设置横向滚动区域宽度。

## API 属性

### Column 固定列配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `fixed` | 列固定位置 | `false \| 'left' \| 'right'` | `false` |

### tableScroll 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `x` | 横向滚动区域宽度 | `number \| string` | - |

---

## 代码示例

### 示例1：左侧固定列

将列固定在表格左侧，横向滚动时保持可见。

```vue
<template>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :tableScroll.prop="tableScroll"
  ></sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 100, fixed: 'left' },
  { title: '年龄', dataIndex: 'age', width: 80 },
  { title: '地址', dataIndex: 'address', width: 200 },
  { title: '邮箱', dataIndex: 'email', width: 200 },
  { title: '电话', dataIndex: 'phone', width: 150 },
  { title: '公司', dataIndex: 'company', width: 200 },
  { title: '职位', dataIndex: 'position', width: 150 }
];

const dataSource = [
  { 
    id: '1', name: '张三', age: 32, address: '北京市朝阳区建国路88号', 
    email: 'zhangsan@example.com', phone: '13800138001', 
    company: '科技有限公司', position: '高级工程师' 
  },
  { 
    id: '2', name: '李四', age: 28, address: '上海市浦东新区张江路100号', 
    email: 'lisi@example.com', phone: '13800138002', 
    company: '互联网有限公司', position: '产品经理' 
  },
  { 
    id: '3', name: '王五', age: 35, address: '广州市天河区珠江新城', 
    email: 'wangwu@example.com', phone: '13800138003', 
    company: '软件有限公司', position: '技术总监' 
  }
];

const tableScroll = { x: 1200 };  // 设置横向滚动宽度
</script>
```

---

### 示例2：右侧固定列

将操作列固定在表格右侧，便于用户操作。在 `v-for` 循环元素上绑定 `:slot` 属性渲染自定义单元格。

```vue
<template>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :tableScroll.prop="tableScroll"
  >
    <div
      v-for="row in dataSource"
      :key="row.id"
      :slot="`custom-cell-action-${row.id}`"
      class="action-cell"
    >
      <sl-button size="small" variant="text" @click="handleEdit(row.id)">编辑</sl-button>
      <sl-button size="small" variant="text" class="danger" @click="handleDelete(row.id)">删除</sl-button>
    </div>
  </sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 100 },
  { title: '年龄', dataIndex: 'age', width: 80 },
  { title: '地址', dataIndex: 'address', width: 200 },
  { title: '邮箱', dataIndex: 'email', width: 200 },
  { title: '电话', dataIndex: 'phone', width: 150 },
  { title: '操作', dataIndex: 'action', width: 120, fixed: 'right', slot: true }
];

const dataSource = [
  { id: '1', name: '张三', age: 32, address: '北京市朝阳区', email: 'zhangsan@example.com', phone: '13800138001' },
  { id: '2', name: '李四', age: 28, address: '上海市浦东新区', email: 'lisi@example.com', phone: '13800138002' },
  { id: '3', name: '王五', age: 35, address: '广州市天河区', email: 'wangwu@example.com', phone: '13800138003' }
];

const tableScroll = { x: 900 };

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
  gap: var(--sl-spacing-2x-small);
}
.action-cell .danger {
  color: var(--sl-color-danger-600);
}
</style>
```

---

### 示例3：左右两侧同时固定

同时固定左侧和右侧的列。在 `v-for` 循环元素上绑定 `:slot` 属性渲染操作列。

```vue
<template>
  <sl-table
    rowKey="id"
    bordered
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :tableScroll.prop="tableScroll"
  >
    <div
      v-for="row in dataSource"
      :key="row.id"
      :slot="`custom-cell-action-${row.id}`"
      class="action-cell"
    >
      <sl-button size="small" variant="primary" @click="handleView(row.id)">查看</sl-button>
    </div>
  </sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80, fixed: 'left' },
  { title: '姓名', dataIndex: 'name', width: 100, fixed: 'left' },
  { title: '年龄', dataIndex: 'age', width: 80 },
  { title: '地址', dataIndex: 'address', width: 200 },
  { title: '邮箱', dataIndex: 'email', width: 200 },
  { title: '电话', dataIndex: 'phone', width: 150 },
  { title: '公司', dataIndex: 'company', width: 180 },
  { title: '部门', dataIndex: 'department', width: 120 },
  { title: '职位', dataIndex: 'position', width: 120 },
  { title: '操作', dataIndex: 'action', width: 100, fixed: 'right', slot: true }
];

const dataSource = [
  { 
    id: '001', name: '张三', age: 32, address: '北京市朝阳区', 
    email: 'zhangsan@example.com', phone: '13800138001', 
    company: '科技公司', department: '研发部', position: '工程师' 
  },
  { 
    id: '002', name: '李四', age: 28, address: '上海市浦东新区', 
    email: 'lisi@example.com', phone: '13800138002', 
    company: '互联网公司', department: '产品部', position: '经理' 
  },
  { 
    id: '003', name: '王五', age: 35, address: '广州市天河区', 
    email: 'wangwu@example.com', phone: '13800138003', 
    company: '软件公司', department: '设计部', position: '总监' 
  }
];

const tableScroll = { x: 1400 };

function handleView(id) {
  console.log('查看:', id);
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

## 注意事项

1. **必须设置 tableScroll.x**：固定列时需要设置 `:tableScroll.prop="{ x: ... }"`，否则没有横向滚动效果
2. **固定列顺序**：左侧固定列应放在 columns 数组的前面，右侧固定列放在后面
3. **固定列阴影**：滚动时固定列边缘会显示阴影效果，提示用户可滚动
4. **宽度设置**：固定列建议设置明确的 `width`，避免列宽计算问题
5. **Vue 中 bordered**：直接写 `bordered` 属性（不需要赋值），表示 `true`

[返回目录](../index.md)

