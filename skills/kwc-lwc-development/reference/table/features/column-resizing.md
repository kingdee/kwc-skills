# 列宽调整

[返回目录](../SKILL.md)

## 功能说明

Table 组件支持通过拖拽调整列宽。通过设置 `enable-column-resizing` 全局开启，也可以在列配置中单独设置 `enableResizing` 控制某列是否允许调整。列宽调整后会触发 `on-column-resize` 回调。

## API 属性

### Table 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `enable-column-resizing` | 是否启用列宽调整 | `boolean` | `false` |
| `on-column-resize` | 列宽调整回调 | `(sizes: Record<string, number>) => void` | - |

### Column 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `enableResizing` | 是否允许该列调整宽度 | `boolean` | 继承全局设置 |

---

## 代码示例

### 示例1：全局启用列宽调整

设置 `enable-column-resizing` 允许所有列拖拽调整宽度。

**index.html**
```html
<template>
    <p class="tip">拖拽列边框可调整列宽</p>
    <sl-table
        row-key="id"
        bordered="true"
        enable-column-resizing="true"
        columns={columns}
        data-source={dataSource}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class ResizableTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 },
        { title: '邮箱', dataIndex: 'email', width: 200 },
        { title: '地址', dataIndex: 'address', width: 250 }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, email: 'zhangsan@example.com', address: '北京市朝阳区' },
        { id: '2', name: '李四', age: 28, email: 'lisi@example.com', address: '上海市浦东新区' },
        { id: '3', name: '王五', age: 35, email: 'wangwu@example.com', address: '广州市天河区' }
    ];
}
```

**index.css**
```css
.tip {
    margin-bottom: 12px;
    color: #666;
    font-size: 14px;
}
```

---

### 示例2：禁止某列调整

在特定列设置 `enableResizing: false` 禁止该列调整宽度。

**index.html**
```html
<template>
    <p class="tip">「年龄」列不可调整宽度</p>
    <sl-table
        row-key="id"
        bordered="true"
        enable-column-resizing="true"
        columns={columns}
        data-source={dataSource}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class PartialResizableTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100, enableResizing: false },  // 禁止调整
        { title: '邮箱', dataIndex: 'email', width: 200 },
        { title: '地址', dataIndex: 'address', width: 250 }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, email: 'zhangsan@example.com', address: '北京市朝阳区' },
        { id: '2', name: '李四', age: 28, email: 'lisi@example.com', address: '上海市浦东新区' },
        { id: '3', name: '王五', age: 35, email: 'wangwu@example.com', address: '广州市天河区' }
    ];
}
```

**index.css**
```css
.tip {
    margin-bottom: 12px;
    color: #faad14;
    font-size: 14px;
}
```

---

### 示例3：列宽调整回调

通过 `on-column-resize` 监听列宽变化，可用于持久化用户的列宽设置。

**index.html**
```html
<template>
    <div class="info-panel">
        <p>列宽信息:</p>
        <pre>{columnSizes}</pre>
    </div>
    <sl-table
        row-key="id"
        bordered="true"
        enable-column-resizing="true"
        columns={columns}
        data-source={dataSource}
        on-column-resize={handleColumnResize}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class ResizeCallbackTable extends LightningElement {
    @track columnSizes = '{}';

    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 },
        { title: '邮箱', dataIndex: 'email', width: 200 },
        { title: '地址', dataIndex: 'address', width: 250 }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, email: 'zhangsan@example.com', address: '北京市朝阳区' },
        { id: '2', name: '李四', age: 28, email: 'lisi@example.com', address: '上海市浦东新区' },
        { id: '3', name: '王五', age: 35, email: 'wangwu@example.com', address: '广州市天河区' }
    ];

    handleColumnResize = (sizes) => {
        this.columnSizes = JSON.stringify(sizes, null, 2);
        
        // 可以将列宽保存到 localStorage
        // localStorage.setItem('tableColumnSizes', JSON.stringify(sizes));
    }
}
```

**index.css**
```css
.info-panel {
    margin-bottom: 16px;
    padding: 12px;
    background: #f5f5f5;
    border-radius: 4px;
}
.info-panel p {
    margin: 0 0 8px;
}
.info-panel pre {
    margin: 0;
    padding: 8px;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 12px;
    max-height: 100px;
    overflow: auto;
}
```

---

### 示例4：持久化列宽设置

将用户调整的列宽保存到 localStorage，页面刷新后恢复。

**index.html**
```html
<template>
    <div class="toolbar">
        <sl-button size="small" onclick={resetColumnWidths}>重置列宽</sl-button>
    </div>
    <sl-table
        row-key="id"
        bordered="true"
        enable-column-resizing="true"
        columns={columns}
        data-source={dataSource}
        on-column-resize={handleColumnResize}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

const STORAGE_KEY = 'myTableColumnWidths';
const DEFAULT_WIDTHS = {
    name: 150,
    age: 100,
    email: 200,
    address: 250
};

export default class PersistentWidthTable extends LightningElement {
    @track savedWidths = {};

    dataSource = [
        { id: '1', name: '张三', age: 32, email: 'zhangsan@example.com', address: '北京市朝阳区' },
        { id: '2', name: '李四', age: 28, email: 'lisi@example.com', address: '上海市浦东新区' },
        { id: '3', name: '王五', age: 35, email: 'wangwu@example.com', address: '广州市天河区' }
    ];

    connectedCallback() {
        // 从 localStorage 读取保存的列宽
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            this.savedWidths = JSON.parse(saved);
        } else {
            this.savedWidths = { ...DEFAULT_WIDTHS };
        }
    }

    get columns() {
        return [
            { title: '姓名', dataIndex: 'name', width: this.savedWidths.name || DEFAULT_WIDTHS.name },
            { title: '年龄', dataIndex: 'age', width: this.savedWidths.age || DEFAULT_WIDTHS.age },
            { title: '邮箱', dataIndex: 'email', width: this.savedWidths.email || DEFAULT_WIDTHS.email },
            { title: '地址', dataIndex: 'address', width: this.savedWidths.address || DEFAULT_WIDTHS.address }
        ];
    }

    handleColumnResize = (sizes) => {
        this.savedWidths = { ...this.savedWidths, ...sizes };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.savedWidths));
    }

    resetColumnWidths() {
        this.savedWidths = { ...DEFAULT_WIDTHS };
        localStorage.removeItem(STORAGE_KEY);
    }
}
```

**index.css**
```css
.toolbar {
    margin-bottom: 16px;
}
```

---

## 注意事项

1. **列宽限制**：列宽调整有最小值（60px）和最大值（500px）限制
2. **拖拽手柄**：鼠标悬停在列边框时会显示拖拽手柄（col-resize 光标）
3. **bordered 建议开启**：开启 `bordered` 时列边框更明显，便于拖拽
4. **table-layout**：启用列宽调整后，表格使用 `table-layout: auto`，不启用时使用 `table-layout: fixed`
5. **回调参数**：`on-column-resize` 回调参数是一个对象，key 为 dataIndex，value 为新的宽度值

[返回目录](../SKILL.md)
