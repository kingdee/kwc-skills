# 样式定制

[返回目录](../index.md)

Table 组件提供丰富的 CSS 自定义属性和 CSS Part，允许深度定制表格样式，包括主题切换、品牌色适配、暗黑模式等。

## CSS 自定义属性

| 属性名 | 说明 | 默认值 |
|--------|------|--------|
| `--sl-table-font-size` | 表格字体大小 | `14px` |
| `--sl-table-cell-color` | 单元格文字颜色 | `var(--sl-color-neutral-700)` |
| `--sl-table-cell-background` | 单元格背景颜色 | `var(--sl-color-neutral-0)` |
| `--sl-table-cell-border` | 单元格边框颜色 | `var(--sl-color-neutral-200)` |
| `--sl-table-cell-border-width` | 单元格边框宽度 | `1px` |
| `--sl-table-cell-padding` | 数据单元格内边距 | `16px` |
| `--sl-table-cell-line-height` | 数据单元格行高 | `48px` |
| `--sl-table-header-background` | 表头背景颜色 | `var(--sl-color-neutral-50)` |
| `--sl-table-header-line-height` | 表头行高 | `44px` |
| `--sl-table-column-header-padding` | 表头单元格内边距 | `16px` |
| `--sl-table-row-background-hover` | 行悬停背景颜色 | `var(--sl-color-neutral-50)` |
| `--sl-table-row-background-active` | 选中行背景颜色 | `var(--sl-color-primary-50)` |
| `--sl-table-icon-color-default` | 图标默认颜色（排序/筛选） | `var(--sl-color-neutral-400)` |
| `--sl-table-icon-color-active` | 图标激活颜色（排序/筛选） | `var(--sl-color-primary-600)` |
| `--sl-table-mask` | Loading 遮罩背景颜色 | `rgba(255,255,255,0.6)` |
| `--sl-table-default-text-color` | 空状态文字颜色 | `var(--sl-color-neutral-400)` |

## CSS Parts

| Part 名称 | 说明 |
|-----------|------|
| `table-wrapper` | 表格最外层容器 |
| `table-container` | 表格主内容容器 |
| `table-head` | 表头区域容器 |
| `table-body` | 表体区域容器 |
| `table-row` | 表格行（表头行和数据行通用） |
| `table-row-cell` | 表格单元格（表头单元格和数据单元格通用） |
| `row-all-select` | 全选复选框容器 |
| `row-check-select` | 行选择复选框 |
| `row-radio-select` | 行选择单选框 |

---

## 示例1：自定义主题色

通过 CSS 自定义属性修改表格的主题色彩。

```vue
<template>
  <div class="custom-theme-table">
    <sl-table
      rowKey="id"
      :columns.prop="columns"
      :dataSource.prop="dataSource"
      bordered
    ></sl-table>
  </div>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { dataIndex: 'id', title: 'ID', width: 80 },
  { dataIndex: 'name', title: '姓名', width: 150 },
  { dataIndex: 'age', title: '年龄', width: 100 },
  { dataIndex: 'department', title: '部门' }
];

const dataSource = [
  { id: '1', name: '张三', age: 28, department: '研发部' },
  { id: '2', name: '李四', age: 32, department: '市场部' },
  { id: '3', name: '王五', age: 25, department: '设计部' }
];
</script>

<style scoped>
.custom-theme-table {
  /* 主题色 - 使用紫色调 */
  --sl-table-header-background: #f3e8ff;
  --sl-table-row-background-hover: #faf5ff;
  --sl-table-row-background-active: #ede9fe;
  --sl-table-icon-color-active: #7c3aed;
  --sl-table-cell-border: #e9d5ff;
}
</style>
```

---

## 示例2：暗黑模式样式

适配暗黑模式的表格样式配置。

```vue
<template>
  <div :class="['table-wrapper', isDarkMode ? 'dark-mode' : 'light-mode']">
    <div class="toolbar">
      <sl-button @click="isDarkMode = !isDarkMode">
        {{ isDarkMode ? '切换浅色模式' : '切换暗黑模式' }}
      </sl-button>
    </div>
    <sl-table
      rowKey="id"
      :columns.prop="columns"
      :dataSource.prop="dataSource"
      bordered
    ></sl-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

const isDarkMode = ref(false);

const columns = [
  { dataIndex: 'id', title: 'ID', width: 80 },
  { dataIndex: 'name', title: '产品名称', width: 200 },
  { dataIndex: 'price', title: '价格', width: 120 },
  { dataIndex: 'stock', title: '库存' }
];

const dataSource = [
  { id: '1', name: 'MacBook Pro', price: '12999', stock: 50 },
  { id: '2', name: 'iPhone 15', price: '6999', stock: 200 },
  { id: '3', name: 'iPad Air', price: '4799', stock: 80 }
];
</script>

<style scoped>
.table-wrapper {
  padding: var(--sl-spacing-medium);
  border-radius: var(--sl-border-radius-large);
  transition: all 0.3s ease;
}
.toolbar {
  margin-bottom: var(--sl-spacing-medium);
}
.light-mode {
  background-color: var(--sl-color-neutral-0);
}
.light-mode sl-table {
  --sl-table-cell-color: #374151;
  --sl-table-cell-background: var(--sl-color-neutral-0);
  --sl-table-header-background: #f9fafb;
  --sl-table-cell-border: #e5e7eb;
  --sl-table-row-background-hover: #f3f4f6;
}
.dark-mode {
  background-color: #1f2937;
}
.dark-mode sl-table {
  --sl-table-cell-color: #f3f4f6;
  --sl-table-cell-background: #111827;
  --sl-table-header-background: #1f2937;
  --sl-table-cell-border: #374151;
  --sl-table-row-background-hover: #374151;
  --sl-table-row-background-active: #4338ca;
  --sl-table-mask: rgba(0, 0, 0, 0.7);
}
</style>
```

---

## 示例3：使用 CSS Parts 深度定制

通过 `::part()` 选择器精细控制表格各部分样式。注意 `::part()` 不支持 `scoped`，需要写全局样式。

```vue
<template>
  <div class="parts-styled-table">
    <sl-table
      rowKey="id"
      :columns.prop="columns"
      :dataSource.prop="dataSource"
      bordered
    ></sl-table>
  </div>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { dataIndex: 'rank', title: '排名', width: 80 },
  { dataIndex: 'team', title: '球队', width: 200 },
  { dataIndex: 'wins', title: '胜', width: 80 },
  { dataIndex: 'losses', title: '负', width: 80 },
  { dataIndex: 'points', title: '积分' }
];

const dataSource = [
  { id: '1', rank: 1, team: '曼城', wins: 28, losses: 3, points: 89 },
  { id: '2', rank: 2, team: '阿森纳', wins: 26, losses: 4, points: 84 },
  { id: '3', rank: 3, team: '利物浦', wins: 24, losses: 6, points: 78 },
  { id: '4', rank: 4, team: '切尔西', wins: 20, losses: 10, points: 63 }
];
</script>

<!-- ::part() 不支持 scoped，需要全局样式 -->
<style>
.parts-styled-table sl-table::part(table-wrapper) {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
.parts-styled-table sl-table::part(table-head) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
.parts-styled-table sl-table::part(table-row-cell) {
  border-color: #e2e8f0;
}
.parts-styled-table sl-table::part(table-row):hover {
  transform: scale(1.01);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.parts-styled-table sl-table {
  --sl-table-cell-color: #1e293b;
  --sl-table-header-background: transparent;
}
</style>
```

---

## 示例4：紧凑与宽松模式

通过调整内边距和行高创建不同密度的表格。

```vue
<template>
  <div class="density-demo">
    <div class="toolbar">
      <sl-button-group>
        <sl-button :variant="density === 'compact' ? 'primary' : 'default'" @click="density = 'compact'">紧凑</sl-button>
        <sl-button :variant="density === 'default' ? 'primary' : 'default'" @click="density = 'default'">默认</sl-button>
        <sl-button :variant="density === 'loose' ? 'primary' : 'default'" @click="density = 'loose'">宽松</sl-button>
      </sl-button-group>
    </div>
    <div :class="`table-${density}`">
      <sl-table
        rowKey="id"
        :columns.prop="columns"
        :dataSource.prop="dataSource"
        bordered
      ></sl-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';
import '@kdcloudjs/shoelace/dist/components/button-group/button-group.js';

const density = ref('default');

const columns = [
  { dataIndex: 'code', title: '编号', width: 100 },
  { dataIndex: 'name', title: '名称', width: 200 },
  { dataIndex: 'category', title: '分类', width: 150 },
  { dataIndex: 'price', title: '单价' }
];

const dataSource = [
  { id: '1', code: 'P001', name: '办公椅', category: '办公家具', price: '¥599' },
  { id: '2', code: 'P002', name: '显示器', category: '电子设备', price: '¥1999' },
  { id: '3', code: 'P003', name: '打印机', category: '办公设备', price: '¥899' }
];
</script>

<style scoped>
.density-demo .toolbar {
  margin-bottom: var(--sl-spacing-medium);
}
.table-compact sl-table {
  --sl-table-font-size: var(--sl-font-size-x-small);
  --sl-table-cell-padding: var(--sl-spacing-x-small);
  --sl-table-cell-line-height: 32px;
  --sl-table-header-line-height: 36px;
  --sl-table-column-header-padding: var(--sl-spacing-x-small);
}
.table-default sl-table {
  --sl-table-font-size: var(--sl-font-size-small);
  --sl-table-cell-padding: var(--sl-spacing-medium);
  --sl-table-cell-line-height: 48px;
  --sl-table-header-line-height: 44px;
  --sl-table-column-header-padding: var(--sl-spacing-medium);
}
.table-loose sl-table {
  --sl-table-font-size: var(--sl-font-size-medium);
  --sl-table-cell-padding: 24px;
  --sl-table-cell-line-height: 64px;
  --sl-table-header-line-height: 56px;
  --sl-table-column-header-padding: 24px;
}
</style>
```

---

## 示例5：品牌色适配

为不同品牌快速适配表格主题色。

```vue
<template>
  <div class="brand-demo">
    <div class="toolbar">
      <sl-select :value="brand" @sl-change="brand = $event.target.value" style="width: 200px">
        <sl-option value="default">默认品牌</sl-option>
        <sl-option value="brand-a">品牌 A（蓝色）</sl-option>
        <sl-option value="brand-b">品牌 B（绿色）</sl-option>
        <sl-option value="brand-c">品牌 C（橙色）</sl-option>
      </sl-select>
    </div>
    <div :class="brand">
      <sl-table
        rowKey="id"
        :columns.prop="columns"
        :dataSource.prop="dataSource"
        bordered
        :rowSelection.prop="rowSelection"
      ></sl-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/select/select.js';
import '@kdcloudjs/shoelace/dist/components/option/option.js';

const brand = ref('default');

const columns = [
  { dataIndex: 'id', title: 'ID', width: 80 },
  { dataIndex: 'product', title: '产品', width: 200 },
  { dataIndex: 'sales', title: '销量', width: 120 },
  { dataIndex: 'revenue', title: '营收' }
];

const dataSource = [
  { id: '1', product: '产品 A', sales: 1520, revenue: '¥152,000' },
  { id: '2', product: '产品 B', sales: 980, revenue: '¥98,000' },
  { id: '3', product: '产品 C', sales: 2100, revenue: '¥210,000' }
];

const rowSelection = { type: 'checkbox' };
</script>

<style scoped>
.brand-demo .toolbar {
  margin-bottom: var(--sl-spacing-medium);
}
.default sl-table {
  --sl-table-header-background: #f8fafc;
  --sl-table-row-background-active: #e0f2fe;
  --sl-table-icon-color-active: #0284c7;
}
.brand-a sl-table {
  --sl-table-header-background: #dbeafe;
  --sl-table-row-background-hover: #eff6ff;
  --sl-table-row-background-active: #bfdbfe;
  --sl-table-icon-color-active: #2563eb;
  --sl-table-cell-border: #bfdbfe;
}
.brand-b sl-table {
  --sl-table-header-background: #dcfce7;
  --sl-table-row-background-hover: #f0fdf4;
  --sl-table-row-background-active: #bbf7d0;
  --sl-table-icon-color-active: #16a34a;
  --sl-table-cell-border: #bbf7d0;
}
.brand-c sl-table {
  --sl-table-header-background: #ffedd5;
  --sl-table-row-background-hover: #fff7ed;
  --sl-table-row-background-active: #fed7aa;
  --sl-table-icon-color-active: #ea580c;
  --sl-table-cell-border: #fed7aa;
}
</style>
```

---

## 示例6：条纹行样式

通过 `:onRow` 实现斑马纹表格效果。

```vue
<template>
  <div class="striped-table">
    <sl-table
      rowKey="id"
      :columns.prop="columns"
      :dataSource.prop="dataSource"
      :onRow.prop="handleOnRow"
    ></sl-table>
  </div>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/table/table.js';

const columns = [
  { dataIndex: 'date', title: '日期', width: 150 },
  { dataIndex: 'event', title: '事件', width: 250 },
  { dataIndex: 'location', title: '地点', width: 150 },
  { dataIndex: 'status', title: '状态' }
];

const dataSource = [
  { id: '1', date: '2024-01-15', event: '年度总结会议', location: '会议室A', status: '已完成' },
  { id: '2', date: '2024-01-20', event: '产品发布会', location: '展览中心', status: '已完成' },
  { id: '3', date: '2024-02-01', event: '团队培训', location: '培训室', status: '进行中' },
  { id: '4', date: '2024-02-15', event: '客户拜访', location: '客户公司', status: '待开始' },
  { id: '5', date: '2024-03-01', event: '季度评审', location: '会议室B', status: '待开始' }
];

function handleOnRow(record, index) {
  return {
    className: index % 2 === 0 ? 'row-even' : 'row-odd'
  };
}
</script>

<style scoped>
.striped-table sl-table {
  --sl-table-cell-border: #f1f5f9;
}
</style>
<!-- 条纹类名需要全局样式，不加 scoped -->
<style>
.row-even td {
  background-color: var(--sl-color-neutral-0) !important;
}
.row-odd td {
  background-color: #f8fafc !important;
}
.row-even:hover td,
.row-odd:hover td {
  background-color: #e2e8f0 !important;
}
</style>
```

---

## 注意事项

1. **CSS 变量作用域**：CSS 自定义属性应设置在 `sl-table` 元素或其父容器上，确保样式能正确继承
2. **::part() 选择器**：使用 CSS Parts 时不能加 `scoped`，需要写全局样式块（`<style>` 不加 scoped）
3. **样式优先级**：组件内部样式使用 Shadow DOM 隔离，外部 CSS 无法直接覆盖，需通过 CSS 变量或 CSS Parts 进行定制
4. **性能考虑**：避免在表格上使用复杂的 CSS 动画或过渡效果，尤其是大数据量场景
5. **主题一致性**：建议在应用级别统一定义 CSS 变量，确保所有表格组件样式一致
6. **暗黑模式**：实现暗黑模式时，还需考虑 Loading 遮罩（`--sl-table-mask`）和空状态文字（`--sl-table-default-text-color`）的适配

[返回目录](../index.md)
