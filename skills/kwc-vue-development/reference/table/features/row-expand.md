# 行展开

[返回目录](../index.md)

## 功能说明

Table 组件支持行展开功能，通过 `expandProps` 配置。展开后可以显示更多行详情内容，内容通过 `custom-row-{rowKeyValue}` slot 自定义。**正确写法**：在 `v-for` 循环元素上直接绑定 `:slot` 属性，而不是在 `<template>` 上使用 `v-for` + `#[动态表达式]` （会导致 Vite 编译错误）。

## API 属性

### ExpandProps 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `rowExpandable` | 是否开启行展开 | `boolean` | `false` |
| `expendableRowKeys` | 可展开的行 key 数组（不传则所有行可展开） | `any[]` | - |
| `expandRowByClick` | 是否可通过点击行展开 | `boolean` | `false` |
| `defaultExpandedRowKeys` | 默认展开的行 key 数组 | `any[]` | - |
| `defaultExpandAllRows` | 是否默认展开所有可展开行 | `boolean` | `false` |

### Slot 命名规则

| Slot 格式 | 说明 |
|-----------|------|
| `custom-row-{rowKeyValue}` | 展开行内容 |

---

## 代码示例

### 示例1：基础展开行

开启行展开功能，点击展开图标显示详情。在 `v-for` 循环元素上绑定 `:slot` 属性渲染展开内容，可直接访问当前行数据。

```vue
<template>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :expandProps.prop="expandProps"
  >
    <div
      v-for="row in dataSource"
      :key="row.id"
      :slot="`custom-row-${row.id}`"
      class="expand-content"
    >
      <p><strong>详细地址：</strong>{{ row.address }}</p>
      <p><strong>联系电话：</strong>{{ row.phone }}</p>
      <p><strong>备注信息：</strong>{{ row.remark }}</p>
    </div>
  </sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '邮箱', dataIndex: 'email' }
];

const dataSource = [
  { id: '1', name: '张三', age: 32, email: 'zhangsan@example.com', address: '北京市朝阳区建国路88号SOHO现代城A座1001室', phone: '13800138001', remark: 'VIP客户，需优先处理' },
  { id: '2', name: '李四', age: 28, email: 'lisi@example.com', address: '上海市浦东新区张江高科技园区碧波路100号', phone: '13800138002', remark: '新客户，首次合作' },
  { id: '3', name: '王五', age: 35, email: 'wangwu@example.com', address: '广州市天河区珠江新城华夏路30号', phone: '13800138003', remark: '老客户，合作3年以上' }
];

const expandProps = {
  rowExpandable: true
};
</script>

<style scoped>
.expand-content {
  padding: var(--sl-spacing-medium) 24px;
  background-color: var(--sl-color-neutral-50);
}
.expand-content p {
  margin: var(--sl-spacing-x-small) 0;
}
</style>
```

---

### 示例2：点击行展开

设置 `expandRowByClick: true`，点击整行即可展开/收起。

```vue
<template>
  <p class="tip">点击任意行即可展开/收起</p>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :expandProps.prop="expandProps"
  >
    <div
      v-for="row in dataSource"
      :key="row.id"
      :slot="`custom-row-${row.id}`"
      class="expand-content"
    >
      <h4>订单详情</h4>
      <p>订单号：{{ row.orderNo }}</p>
      <p>下单时间：{{ row.orderTime }}</p>
    </div>
  </sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: '客户名称', dataIndex: 'customer', width: 150 },
  { title: '订单金额', dataIndex: 'amount', width: 120 },
  { title: '状态', dataIndex: 'status', width: 100 }
];

const dataSource = [
  { id: '1', customer: '客户A', amount: '¥1,299.00', status: '已完成', orderNo: 'ORD-2024-001', orderTime: '2024-01-15 10:30:00' },
  { id: '2', customer: '客户B', amount: '¥2,599.00', status: '进行中', orderNo: 'ORD-2024-002', orderTime: '2024-01-16 14:20:00' },
  { id: '3', customer: '客户C', amount: '¥899.00', status: '待付款', orderNo: 'ORD-2024-003', orderTime: '2024-01-17 09:15:00' }
];

const expandProps = {
  rowExpandable: true,
  expandRowByClick: true
};
</script>

<style scoped>
.tip {
  margin-bottom: var(--sl-spacing-small);
  color: var(--sl-color-primary-600);
  font-size: var(--sl-font-size-small);
}
.expand-content {
  padding: var(--sl-spacing-medium) 24px;
  background-color: var(--sl-color-neutral-50);
}
.expand-content h4 {
  margin: 0 0 var(--sl-spacing-small);
  color: var(--sl-color-neutral-700);
}
.expand-content p {
  margin: var(--sl-spacing-2x-small) 0;
  color: var(--sl-color-neutral-600);
}
</style>
```

---

### 示例3：v-for + :slot 绑定展开内容

在 `v-for` 循环元素上绑定 `:slot` 属性声明展开内容，可直接从行数据中读取字段，默认展开所有行。

```vue
<template>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :expandProps.prop="expandProps"
  >
    <div
      v-for="row in dataSource"
      :key="row.id"
      :slot="`custom-row-${row.id}`"
      class="expand-content"
    >
      <p>这是 {{ row.name }} 的详细信息</p>
      <p>部门：{{ row.department }}，职位：{{ row.position }}</p>
    </div>
  </sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '部门', dataIndex: 'department', width: 150 }
];

const dataSource = [
  { id: '1', name: '张三', department: '研发部', position: '工程师' },
  { id: '2', name: '李四', department: '产品部', position: '产品经理' },
  { id: '3', name: '王五', department: '设计部', position: '设计师' }
];

const expandProps = {
  rowExpandable: true,
  defaultExpandAllRows: true  // 默认展开所有行
};
</script>

<style scoped>
.expand-content {
  padding: var(--sl-spacing-small) var(--sl-spacing-medium);
  background-color: var(--sl-color-warning-50);
  border-left: 3px solid var(--sl-color-warning-600);
}
</style>
```

---

### 示例4：默认展开指定行

通过 `defaultExpandedRowKeys` 设置初始展开的行。在循环元素上绑定 `:slot` 属性，模板不需要逐行声明。

```vue
<template>
  <sl-table
    rowKey="id"
    :columns.prop="columns"
    :dataSource.prop="dataSource"
    :expandProps.prop="expandProps"
  >
    <div
      v-for="row in dataSource"
      :key="row.id"
      :slot="`custom-row-${row.id}`"
      class="expand-content"
    >
      {{ row.detail }}
    </div>
  </sl-table>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '职位', dataIndex: 'position', width: 150 }
];

const dataSource = [
  { id: '1', name: '张三', position: '工程师', detail: '第1行内容（默认展开）' },
  { id: '2', name: '李四', position: '产品经理', detail: '第2行内容（默认展开）' },
  { id: '3', name: '王五', position: '设计师', detail: '第3行内容（需手动展开）' }
];

const expandProps = {
  rowExpandable: true,
  defaultExpandedRowKeys: ['1', '2']  // 默认展开前两行
};
</script>

<style scoped>
.expand-content {
  padding: var(--sl-spacing-small) var(--sl-spacing-medium);
  background-color: var(--sl-color-neutral-100);
}
</style>
```

---

## 注意事项

1. **Slot 名称格式**：展开行内容 slot 必须遵循 `custom-row-{rowKeyValue}` 格式
2. **正确的 slot 写法**：在 `v-for` 循环的元素上直接绑定 `:slot="\`custom-row-${row.id}\`"`，**禁止**在 `<template>` 上使用 `v-for` + `#[动态表达式]` 动态插槽语法（会导致 Vite 编译错误）
3. **展开图标列**：启用行展开后会自动添加一个展开图标列在最左侧
4. **expandRowByClick 与按钮点击**：启用点击行展开时，注意处理单元格内按钮等元素的点击冲突
5. **展开状态不受控**：当前展开状态为非受控模式，由组件内部管理

[返回目录](../index.md)
