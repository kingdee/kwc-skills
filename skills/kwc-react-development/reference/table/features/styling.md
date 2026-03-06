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

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

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

// 全局 CSS 或 styled 中定义:
// .custom-theme-table {
//   --sl-table-header-background: #f3e8ff;
//   --sl-table-row-background-hover: #faf5ff;
//   --sl-table-row-background-active: #ede9fe;
//   --sl-table-icon-color-active: #7c3aed;
//   --sl-table-cell-border: #e9d5ff;
// }

export default () => {
  const wrapperStyle = {
    "--sl-table-header-background": "#f3e8ff",
    "--sl-table-row-background-hover": "#faf5ff",
    "--sl-table-row-background-active": "#ede9fe",
    "--sl-table-icon-color-active": "#7c3aed",
    "--sl-table-cell-border": "#e9d5ff"
  };
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <div style={wrapperStyle}>
        <SlTable rowKey="id" bordered columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};
```

---

## 示例2：暗黑模式样式

适配暗黑模式的表格样式配置。

```jsx
import React, { useState } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

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

const lightStyle = {
  backgroundColor: "var(--sl-color-neutral-0)",
  padding: "var(--sl-spacing-medium)",
  borderRadius: "var(--sl-border-radius-large)"
};

const darkStyle = {
  backgroundColor: "#1f2937",
  padding: "var(--sl-spacing-medium)",
  borderRadius: "var(--sl-border-radius-large)",
  "--sl-table-cell-color": "#f3f4f6",
  "--sl-table-cell-background": "#111827",
  "--sl-table-header-background": "#1f2937",
  "--sl-table-cell-border": "#374151",
  "--sl-table-row-background-hover": "#374151",
  "--sl-table-row-background-active": "#4338ca",
  "--sl-table-mask": "rgba(0, 0, 0, 0.7)"
};

export default () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const outerStyle = { width: "70%", margin: "0 auto", padding: "20px" };
  const toolbarStyle = { marginBottom: "var(--sl-spacing-medium)" };
  return (
    <div style={outerStyle}>
      <div style={isDarkMode ? darkStyle : lightStyle}>
        <div style={toolbarStyle}>
          <button onClick={() => setIsDarkMode(v => !v)} style={{ cursor: "pointer", padding: "6px 12px" }}>
            {isDarkMode ? '切换浅色模式' : '切换暗黑模式'}
          </button>
        </div>
        <SlTable rowKey="id" bordered columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};
```

---

## 示例3：使用 CSS Parts 深度定制

通过 `::part()` 选择器精细控制表格各部分样式。

> **注意**：`::part()` 选择器穿透 Shadow DOM，在 React 中需要将对应样式写在全局 CSS 文件中（不使用 CSS Modules 的局部作用域）。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

// 全局 CSS 文件中（如 index.css 或 globals.css）添加:
// .parts-styled-table sl-table::part(table-wrapper) {
//   border-radius: 12px;
//   overflow: hidden;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
// }
// .parts-styled-table sl-table::part(table-head) {
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   color: white;
// }
// .parts-styled-table sl-table::part(table-row-cell) {
//   border-color: #e2e8f0;
// }
// .parts-styled-table sl-table::part(table-row):hover {
//   transform: scale(1.01);
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// }

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

export default () => {
  const tableStyle = {
    "--sl-table-cell-color": "#1e293b",
    "--sl-table-header-background": "transparent"
  };
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <div className="parts-styled-table">
        <SlTable rowKey="id" bordered columns={columns} dataSource={dataSource} style={tableStyle} />
      </div>
    </div>
  );
};
```

---

## 示例4：紧凑与宽松模式

通过调整内边距和行高创建不同密度的表格。

```jsx
import React, { useState } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

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

const densityStyles = {
  compact: {
    "--sl-table-font-size": "var(--sl-font-size-x-small)",
    "--sl-table-cell-padding": "var(--sl-spacing-x-small)",
    "--sl-table-cell-line-height": "32px",
    "--sl-table-header-line-height": "36px",
    "--sl-table-column-header-padding": "var(--sl-spacing-x-small)"
  },
  default: {
    "--sl-table-font-size": "var(--sl-font-size-small)",
    "--sl-table-cell-padding": "var(--sl-spacing-medium)",
    "--sl-table-cell-line-height": "48px",
    "--sl-table-header-line-height": "44px",
    "--sl-table-column-header-padding": "var(--sl-spacing-medium)"
  },
  loose: {
    "--sl-table-font-size": "var(--sl-font-size-medium)",
    "--sl-table-cell-padding": "24px",
    "--sl-table-cell-line-height": "64px",
    "--sl-table-header-line-height": "56px",
    "--sl-table-column-header-padding": "24px"
  }
};

export default () => {
  const [density, setDensity] = useState('default');

  const toolbarStyle = { display: "flex", gap: "8px", marginBottom: "var(--sl-spacing-medium)" };
  const btnStyle = (active) => ({
    padding: "6px 12px", cursor: "pointer",
    background: active ? "var(--sl-color-primary-600)" : "#fff",
    color: active ? "#fff" : "var(--sl-color-neutral-700)",
    border: "1px solid var(--sl-color-neutral-300)",
    borderRadius: "4px"
  });
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <div style={toolbarStyle}>
        {['compact', 'default', 'loose'].map(d => (
          <button key={d} style={btnStyle(density === d)} onClick={() => setDensity(d)}>
            {{ compact: '紧凑', default: '默认', loose: '宽松' }[d]}
          </button>
        ))}
      </div>
      <div style={densityStyles[density]}>
        <SlTable rowKey="id" bordered columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};
```

---

## 注意事项

1. **CSS 变量作用域**：CSS 自定义属性可设置在 `sl-table` 元素或其父容器上（通过 `style` 属性或全局 CSS）
2. **::part() 全局样式**：`::part()` 选择器需写在全局 CSS 文件中，不能使用 CSS Modules 的局部作用域
3. **React style 属性**：可通过父容器的 `style` 属性传递 CSS 变量（如 `style={{ "--sl-table-header-background": "#f3e8ff" }}`）
4. **样式优先级**：组件内部样式使用 Shadow DOM 隔离，外部 CSS 无法直接覆盖，需通过 CSS 变量或 CSS Parts 进行定制
5. **主题一致性**：建议在应用级别统一定义 CSS 变量，确保所有表格组件样式一致
6. **暗黑模式**：实现暗黑模式时，还需考虑 Loading 遮罩（`--sl-table-mask`）和空状态文字（`--sl-table-default-text-color`）的适配

[返回目录](../index.md)
