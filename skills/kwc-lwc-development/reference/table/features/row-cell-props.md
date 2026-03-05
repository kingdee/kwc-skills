# 行/单元格属性定制

[返回目录](../index.md)

## 功能说明

Table 组件支持通过 `onRow`、`onHeaderRow`、`onCell`、`onHeaderCell` 回调函数自定义行和单元格的属性，包括 className、style、事件监听器等。

## API 属性

### Table 属性

| 属性 | 说明 | 类型 |
|------|------|------|
| `on-row` | 设置行属性 | `(record, index) => object` |
| `on-header-row` | 设置表头行属性 | `(columns, index) => object` |

### Column 配置

| 属性 | 说明 | 类型 |
|------|------|------|
| `onCell` | 设置单元格属性 | `(record, rowIndex) => object` |
| `onHeaderCell` | 设置表头单元格属性 | `(record, rowIndex) => object` |

### 返回对象支持的属性

| 属性 | 说明 |
|------|------|
| `className` | CSS 类名 |
| `style` | 行内样式（字符串或对象） |
| `onClick` | 点击事件 |
| `onMouseEnter` | 鼠标进入事件 |
| `onMouseLeave` | 鼠标离开事件 |
| 其他 | 其他原生 HTML 属性 |

---

## 代码示例

### 示例1：onRow 设置行属性

为行添加自定义类名、样式和点击事件。

**index.html**
```html
<template>
    <div class="log-panel">点击的行: {clickedRow}</div>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
        on-row={handleRow}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement, track } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class OnRowTable extends KingdeeElement {
    @track clickedRow = '无';

    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 },
        { title: '状态', dataIndex: 'status', width: 100 }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 28, status: 'active' },
        { id: '2', name: '李四', age: 32, status: 'inactive' },
        { id: '3', name: '王五', age: 25, status: 'active' },
        { id: '4', name: '赵六', age: 30, status: 'inactive' }
    ];

    handleRow = (record, index) => {
        const self = this;
        return {
            className: record.status === 'inactive' ? 'inactive-row' : '',
            style: index % 2 === 0 ? 'background-color: var(--sl-color-neutral-50);' : '',
            onClick: () => {
                self.clickedRow = `${record.name} (ID: ${record.id})`;
            }
        };
    }
}
```

**index.css**
```css
.log-panel {
    margin-bottom: var(--sl-spacing-medium);
    padding: var(--sl-spacing-small);
    background: var(--sl-color-primary-100);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-primary-600);
}
```

---

### 示例2：onHeaderRow 设置表头行属性

自定义表头行的样式和属性。

**index.html**
```html
<template>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
        on-header-row={handleHeaderRow}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class OnHeaderRowTable extends KingdeeElement {
    columns = [
        { title: '商品名称', dataIndex: 'product', width: 200 },
        { title: '价格', dataIndex: 'price', width: 100 },
        { title: '库存', dataIndex: 'stock', width: 100 }
    ];

    dataSource = [
        { id: '1', product: '商品A', price: '¥99', stock: 100 },
        { id: '2', product: '商品B', price: '¥199', stock: 50 },
        { id: '3', product: '商品C', price: '¥299', stock: 30 }
    ];

    handleHeaderRow = (columns, index) => {
        return {
            className: 'custom-header-row',
            style: {
                'background-color': 'var(--sl-color-primary-600)',
                'color': 'var(--sl-color-neutral-0)'
            }
        };
    }
}
```

---

### 示例3：onCell 设置单元格属性

根据单元格数据值动态设置样式。

**index.html**
```html
<template>
    <sl-table kwc:external
        row-key="id"
        bordered="true"
        columns={columns}
        data-source={dataSource}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class OnCellTable extends KingdeeElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { 
            title: '分数', 
            dataIndex: 'score', 
            width: 100,
            onCell: (record) => {
                // 根据分数设置不同颜色
                let color = 'var(--sl-color-success-600)';  // 绿色 - 优秀
                if (record.score < 60) {
                    color = 'var(--sl-color-danger-600)';  // 红色 - 不及格
                } else if (record.score < 80) {
                    color = 'var(--sl-color-warning-600)';  // 黄色 - 中等
                }
                return {
                    style: {
                        color: color,
                        'font-weight': 'bold'
                    }
                };
            }
        },
        { 
            title: '状态', 
            dataIndex: 'status', 
            width: 100,
            onCell: (record) => ({
                className: `status-${record.status}`
            })
        }
    ];

    dataSource = [
        { id: '1', name: '张三', score: 95, status: 'pass' },
        { id: '2', name: '李四', score: 58, status: 'fail' },
        { id: '3', name: '王五', score: 72, status: 'pass' },
        { id: '4', name: '赵六', score: 88, status: 'pass' }
    ];
}
```

---

### 示例4：onHeaderCell 设置表头单元格属性

自定义表头单元格的样式。

**index.html**
```html
<template>
    <sl-table kwc:external
        row-key="id"
        bordered="true"
        columns={columns}
        data-source={dataSource}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class OnHeaderCellTable extends KingdeeElement {
    columns = [
        { 
            title: '必填项 *', 
            dataIndex: 'name', 
            width: 150,
            onHeaderCell: () => ({
                style: 'color: var(--sl-color-danger-600);'
            })
        },
        { 
            title: '年龄', 
            dataIndex: 'age', 
            width: 100 
        },
        { 
            title: '重要信息', 
            dataIndex: 'important', 
            width: 200,
            onHeaderCell: () => ({
                className: 'important-header',
                style: {
                    'background-color': 'var(--sl-color-warning-50)',
                    'font-weight': 'bold'
                }
            })
        }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 28, important: '核心成员' },
        { id: '2', name: '李四', age: 32, important: '项目负责人' },
        { id: '3', name: '王五', age: 25, important: '新人培训中' }
    ];
}
```

---

### 示例5：综合示例

组合使用所有属性定制功能。

**index.html**
```html
<template>
    <div class="info">悬停或点击行查看效果</div>
    <sl-table kwc:external
        row-key="id"
        bordered="true"
        columns={columns}
        data-source={dataSource}
        on-row={handleRow}
        on-header-row={handleHeaderRow}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement, track } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class CombinedPropsTable extends KingdeeElement {
    @track hoveredRow = null;

    columns = [
        { 
            title: '员工姓名', 
            dataIndex: 'name', 
            width: 150,
            onHeaderCell: () => ({
                style: 'font-weight: bold; color: var(--sl-color-primary-600);'
            })
        },
        { 
            title: '绩效评分', 
            dataIndex: 'performance', 
            width: 120,
            onCell: (record) => {
                const score = record.performance;
                let bgColor = 'var(--sl-color-success-100)';  // 浅绿
                if (score < 60) bgColor = 'var(--sl-color-danger-50)';  // 浅红
                else if (score < 80) bgColor = 'var(--sl-color-warning-50)';  // 浅黄
                return {
                    style: {
                        'background-color': bgColor,
                        'text-align': 'center',
                        'font-weight': 'bold'
                    }
                };
            }
        },
        { 
            title: '部门', 
            dataIndex: 'department', 
            width: 120 
        },
        { 
            title: '入职年限', 
            dataIndex: 'years', 
            width: 100,
            onCell: (record) => ({
                style: record.years >= 5 ? 'color: #722ed1;' : ''
            })
        }
    ];

    dataSource = [
        { id: '1', name: '张三', performance: 92, department: '研发部', years: 6 },
        { id: '2', name: '李四', performance: 55, department: '产品部', years: 2 },
        { id: '3', name: '王五', performance: 78, department: '设计部', years: 4 },
        { id: '4', name: '赵六', performance: 88, department: '研发部', years: 8 }
    ];

    handleRow = (record, index) => {
        const self = this;
        const isHovered = this.hoveredRow === record.id;
        return {
            style: isHovered ? 'box-shadow: 0 2px 8px rgba(0,0,0,0.15);' : '',
            onMouseEnter: () => { self.hoveredRow = record.id; },
            onMouseLeave: () => { self.hoveredRow = null; }
        };
    }

    handleHeaderRow = () => ({
        style: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: var(--sl-color-neutral-0);'
    })
}
```

**index.css**
```css
.info {
    margin-bottom: var(--sl-spacing-small);
    color: var(--sl-color-neutral-600);
    font-size: var(--sl-font-size-small);
}
```

---

## 注意事项

1. **style 格式**：`style` 属性支持字符串（如 `'color: red;'`）或对象（如 `{ color: 'red' }`）两种格式
2. **this 引用**：回调函数中使用组件属性时，需要提前保存 `this` 引用（如 `const self = this`）
3. **事件冲突**：自定义的点击事件可能与行选择等内置功能冲突，需注意处理
4. **性能影响**：回调函数会在每次渲染时调用，避免在其中执行复杂计算
5. **CSS 优先级**：通过 `style` 设置的样式优先级较高，可能覆盖 `className` 中的样式

[返回目录](../index.md)
