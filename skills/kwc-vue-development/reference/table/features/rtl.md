# RTL 方向支持

[返回目录](../index.md)

## 功能说明

Table 组件支持从右到左（RTL）的布局方向，通过设置 `direction="rtl"` 开启。适用于阿拉伯语、希伯来语等从右到左书写的语言环境。

## API 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `direction` | 表格方向 | `'ltr' \| 'rtl'` | `'ltr'` |

---

## 代码示例

### 示例1：RTL 基础表格

设置 `direction="rtl"` 开启 RTL 布局。

```vue
<template>
  <sl-table
    rowKey="id"
    direction="rtl"
    bordered
    :columns.prop="columns"
    :dataSource.prop="dataSource"
  ></sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: 'الاسم', dataIndex: 'name', width: 150 },   // 姓名
  { title: 'العمر', dataIndex: 'age', width: 100 },    // 年龄
  { title: 'المدينة', dataIndex: 'city', width: 150 }, // 城市
  { title: 'البريد الإلكتروني', dataIndex: 'email' }   // 邮箱
];

const dataSource = [
  { id: '1', name: 'أحمد محمد', age: 28, city: 'القاهرة', email: 'ahmed@example.com' },
  { id: '2', name: 'محمد علي', age: 35, city: 'الإسكندرية', email: 'mohamed@example.com' },
  { id: '3', name: 'فاطمة حسن', age: 30, city: 'الجيزة', email: 'fatima@example.com' }
];
</script>
```

---

### 示例2：RTL + 固定列

RTL 模式下使用固定列功能。

```vue
<template>
  <sl-table
    rowKey="id"
    direction="rtl"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :tableScroll.prop="tableScroll"
  ></sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: 'الاسم', dataIndex: 'name', width: 100, fixed: 'right' },  // RTL 下固定在右侧
  { title: 'العمر', dataIndex: 'age', width: 80 },
  { title: 'المدينة', dataIndex: 'city', width: 150 },
  { title: 'البريد', dataIndex: 'email', width: 200 },
  { title: 'الهاتف', dataIndex: 'phone', width: 150 },
  { title: 'القسم', dataIndex: 'department', width: 120 },
  { title: 'الإجراءات', dataIndex: 'action', width: 100, fixed: 'left' }  // 固定在左侧
];

const dataSource = [
  {
    id: '1', name: 'أحمد', age: 28, city: 'القاهرة',
    email: 'ahmed@example.com', phone: '01012345678',
    department: 'التطوير', action: ''
  },
  {
    id: '2', name: 'محمد', age: 35, city: 'الإسكندرية',
    email: 'mohamed@example.com', phone: '01087654321',
    department: 'التصميم', action: ''
  },
  {
    id: '3', name: 'فاطمة', age: 30, city: 'الجيزة',
    email: 'fatima@example.com', phone: '01055556666',
    department: 'المنتج', action: ''
  }
];

const tableScroll = { x: 1000 };
</script>
```

---

### 示例3：RTL + 排序筛选

RTL 模式下使用排序和筛选功能，通过 `@sl-change` 监听变化。

```vue
<template>
  <sl-table
    rowKey="id"
    direction="rtl"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    @sl-change="handleChange"
  ></sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: 'الاسم', dataIndex: 'name', width: 150 },
  {
    title: 'العمر',
    dataIndex: 'age',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    title: 'الحالة',
    dataIndex: 'status',
    width: 120,
    filters: [
      { text: 'نشط', value: 'active' },
      { text: 'غير نشط', value: 'inactive' }
    ],
    onFilter: (value, record) => record.status === value
  },
  { title: 'البريد الإلكتروني', dataIndex: 'email' }
];

const dataSource = [
  { id: '1', name: 'أحمد', age: 28, status: 'active', email: 'ahmed@example.com' },
  { id: '2', name: 'محمد', age: 35, status: 'inactive', email: 'mohamed@example.com' },
  { id: '3', name: 'فاطمة', age: 30, status: 'active', email: 'fatima@example.com' },
  { id: '4', name: 'علي', age: 25, status: 'active', email: 'ali@example.com' }
];

function handleChange(event) {
  console.log('Table changed:', event.detail);
}
</script>
```

---

### 示例4：动态切换方向

根据语言设置动态切换表格方向。

```vue
<template>
  <div class="toolbar">
    <sl-button-group>
      <sl-button
        :variant="direction === 'ltr' ? 'primary' : 'default'"
        @click="direction = 'ltr'"
      >
        LTR (English)
      </sl-button>
      <sl-button
        :variant="direction === 'rtl' ? 'primary' : 'default'"
        @click="direction = 'rtl'"
      >
        RTL (العربية)
      </sl-button>
    </sl-button-group>
  </div>
  <sl-table
    rowKey="id"
    :direction="direction"
    bordered
    :columns.prop="columns"
    :dataSource.prop="dataSource"
  ></sl-table>
</template>

<script setup>
import { ref, computed } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';
import '@kdcloudjs/shoelace/dist/components/button-group/button-group.js';

const direction = ref('ltr');

const columns = computed(() => {
  if (direction.value === 'rtl') {
    return [
      { title: 'الاسم', dataIndex: 'name', width: 150 },
      { title: 'العمر', dataIndex: 'age', width: 100 },
      { title: 'المدينة', dataIndex: 'city' }
    ];
  }
  return [
    { title: 'Name', dataIndex: 'name', width: 150 },
    { title: 'Age', dataIndex: 'age', width: 100 },
    { title: 'City', dataIndex: 'city' }
  ];
});

const dataSource = computed(() => {
  if (direction.value === 'rtl') {
    return [
      { id: '1', name: 'أحمد', age: 28, city: 'القاهرة' },
      { id: '2', name: 'محمد', age: 35, city: 'الإسكندرية' },
      { id: '3', name: 'فاطمة', age: 30, city: 'الجيزة' }
    ];
  }
  return [
    { id: '1', name: 'John', age: 28, city: 'New York' },
    { id: '2', name: 'Jane', age: 35, city: 'Los Angeles' },
    { id: '3', name: 'Bob', age: 30, city: 'Chicago' }
  ];
});
</script>

<style scoped>
.toolbar {
  margin-bottom: var(--sl-spacing-medium);
}
</style>
```

---

## 注意事项

1. **固定列方向**：RTL 模式下，`fixed: 'left'` 和 `fixed: 'right'` 的视觉位置会互换
2. **滚动阴影**：固定列的滚动阴影会根据 RTL 模式自动调整方向
3. **排序筛选图标**：排序和筛选图标的位置会自动适配 RTL 布局
4. **CSS 变量**：组件内部使用 `--sl-c-table-direction` CSS 变量控制方向
5. **字体支持**：确保使用的字体支持 RTL 语言的正确显示

[返回目录](../index.md)
