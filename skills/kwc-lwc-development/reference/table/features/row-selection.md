# 行选择

[返回目录](../SKILL.md)

## 功能说明

Table 组件支持通过 `row-selection` 配置行选择功能，包括 checkbox 多选和 radio 单选两种模式。支持默认选中、禁用特定行、自定义选择列宽度、隐藏选择列等高级功能，并提供丰富的回调事件。

## API 属性

### RowSelection 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `type` | 选择类型 | `'checkbox' \| 'radio'` | `'checkbox'` |
| `hidden` | 是否隐藏选择列 | `boolean` | `false` |
| `width` | 选择列宽度 | `number` | `50` |
| `className` | 选择列样式类名 | `string` | - |
| `disabled` | 是否禁用表头全选 | `boolean` | `false` |
| `defaultSelectedRowKeys` | 默认选中的行 key 数组 | `string[]` | - |
| `onChange` | 选择变化回调 | `(selectedRowKeys, selectedRows) => void` | - |
| `onSelect` | 点击行选择框回调 | `(record, selected, selectedRows, event) => void` | - |
| `onSelectAll` | 点击全选框回调 | `(selected, selectedRows) => void` | - |
| `getCheckboxProps` | 自定义选择框属性 | `(record) => { disabled?, className?, style? }` | - |

---

## 代码示例

### 示例1：Checkbox 多选模式

基础多选功能，表头显示全选 Checkbox，每行显示选择 Checkbox。

**index.html**
```html
<template>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        row-selection={rowSelection}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class CheckboxTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 },
        { title: '地址', dataIndex: 'address' }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, address: '北京市朝阳区' },
        { id: '2', name: '李四', age: 28, address: '上海市浦东新区' },
        { id: '3', name: '王五', age: 35, address: '广州市天河区' }
    ];

    rowSelection = {
        type: 'checkbox'
    };
}
```

---

### 示例2：默认选中行

通过 `defaultSelectedRowKeys` 设置初始选中的行。

**index.html**
```html
<template>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        row-selection={rowSelection}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class DefaultSelectedTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 },
        { title: '地址', dataIndex: 'address' }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, address: '北京市朝阳区' },
        { id: '2', name: '李四', age: 28, address: '上海市浦东新区' },
        { id: '3', name: '王五', age: 35, address: '广州市天河区' }
    ];

    rowSelection = {
        type: 'checkbox',
        defaultSelectedRowKeys: ['1', '3']  // 默认选中第1行和第3行
    };
}
```

---

### 示例3：选择回调 onChange

监听选择变化，获取当前选中的行 key 和行数据。

**index.html**
```html
<template>
    <div class="selection-info">
        <p>已选择 {selectedCount} 项</p>
        <p>选中的姓名: {selectedNames}</p>
    </div>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        row-selection={rowSelection}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class OnChangeTable extends LightningElement {
    @track selectedCount = 0;
    @track selectedNames = '无';

    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 },
        { title: '地址', dataIndex: 'address' }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, address: '北京市朝阳区' },
        { id: '2', name: '李四', age: 28, address: '上海市浦东新区' },
        { id: '3', name: '王五', age: 35, address: '广州市天河区' }
    ];

    get rowSelection() {
        const self = this;
        return {
            type: 'checkbox',
            onChange: (selectedRowKeys, selectedRows) => {
                self.selectedCount = selectedRowKeys.length;
                self.selectedNames = selectedRows.map(row => row.name).join(', ') || '无';
            }
        };
    }
}
```

**index.css**
```css
.selection-info {
    margin-bottom: 16px;
    padding: 12px;
    background: #f5f5f5;
    border-radius: 4px;
}
.selection-info p {
    margin: 4px 0;
}
```

---

### 示例4：全选回调 onSelectAll

监听全选操作，区分全选和取消全选。

**index.html**
```html
<template>
    <div class="log-panel">
        <p>操作日志:</p>
        <div class="log-content">{logText}</div>
    </div>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        row-selection={rowSelection}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class OnSelectAllTable extends LightningElement {
    @track logText = '暂无操作';

    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '部门', dataIndex: 'department', width: 120 },
        { title: '职位', dataIndex: 'position' }
    ];

    dataSource = [
        { id: '1', name: '张三', department: '研发部', position: '工程师' },
        { id: '2', name: '李四', department: '产品部', position: '产品经理' },
        { id: '3', name: '王五', department: '设计部', position: '设计师' }
    ];

    get rowSelection() {
        const self = this;
        return {
            type: 'checkbox',
            onSelectAll: (selected, selectedRows) => {
                if (selected) {
                    self.logText = `全选了 ${selectedRows.length} 条数据`;
                } else {
                    self.logText = '取消了全选';
                }
            }
        };
    }
}
```

**index.css**
```css
.log-panel {
    margin-bottom: 16px;
    padding: 12px;
    background: #e6f7ff;
    border: 1px solid #91d5ff;
    border-radius: 4px;
}
.log-content {
    color: #1890ff;
}
```

---

### 示例5：Radio 单选模式

设置 `type: 'radio'` 开启单选模式，同时只能选中一行。

**index.html**
```html
<template>
    <div class="selection-info">
        当前选中: {selectedName}
    </div>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        row-selection={rowSelection}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class RadioTable extends LightningElement {
    @track selectedName = '无';

    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 },
        { title: '地址', dataIndex: 'address' }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, address: '北京市朝阳区' },
        { id: '2', name: '李四', age: 28, address: '上海市浦东新区' },
        { id: '3', name: '王五', age: 35, address: '广州市天河区' }
    ];

    get rowSelection() {
        const self = this;
        return {
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                self.selectedName = selectedRows[0]?.name || '无';
            }
        };
    }
}
```

**index.css**
```css
.selection-info {
    margin-bottom: 16px;
    padding: 12px;
    background: #f5f5f5;
    border-radius: 4px;
}
```

---

### 示例6：单选默认选中

单选模式下设置默认选中行。

**index.html**
```html
<template>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        row-selection={rowSelection}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class RadioDefaultTable extends LightningElement {
    columns = [
        { title: '套餐名称', dataIndex: 'name', width: 150 },
        { title: '价格', dataIndex: 'price', width: 100 },
        { title: '说明', dataIndex: 'description' }
    ];

    dataSource = [
        { id: 'basic', name: '基础版', price: '¥99/月', description: '适合个人使用' },
        { id: 'pro', name: '专业版', price: '¥299/月', description: '适合小团队' },
        { id: 'enterprise', name: '企业版', price: '¥999/月', description: '适合大企业' }
    ];

    rowSelection = {
        type: 'radio',
        defaultSelectedRowKeys: ['pro']  // 默认选中专业版
    };
}
```

---

### 示例7：禁用某些行

通过 `getCheckboxProps` 返回 `disabled: true` 禁用特定行的选择。

**index.html**
```html
<template>
    <p class="tip">注意：已离职员工无法选择</p>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        row-selection={rowSelection}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class DisabledRowTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '状态', dataIndex: 'status', width: 100 },
        { title: '部门', dataIndex: 'department' }
    ];

    dataSource = [
        { id: '1', name: '张三', status: '在职', department: '研发部' },
        { id: '2', name: '李四', status: '离职', department: '产品部' },
        { id: '3', name: '王五', status: '在职', department: '设计部' },
        { id: '4', name: '赵六', status: '离职', department: '市场部' }
    ];

    rowSelection = {
        type: 'checkbox',
        getCheckboxProps: (record) => ({
            disabled: record.status === '离职'
        })
    };
}
```

**index.css**
```css
.tip {
    margin-bottom: 12px;
    color: #ff4d4f;
    font-size: 14px;
}
```

---

### 示例8：隐藏选择列

设置 `hidden: true` 隐藏选择列，通常用于程序控制选中状态的场景。

**index.html**
```html
<template>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        row-selection={rowSelection}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class HiddenSelectionTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 },
        { title: '地址', dataIndex: 'address' }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, address: '北京市朝阳区' },
        { id: '2', name: '李四', age: 28, address: '上海市浦东新区' },
        { id: '3', name: '王五', age: 35, address: '广州市天河区' }
    ];

    rowSelection = {
        type: 'checkbox',
        hidden: true,
        defaultSelectedRowKeys: ['1', '2']  // 虽然隐藏了列，但仍可设置默认选中
    };
}
```

---

### 示例9：自定义选择列宽度

通过 `width` 属性自定义选择列的宽度。

**index.html**
```html
<template>
    <sl-table
        row-key="id"
        bordered="true"
        columns={columns}
        data-source={dataSource}
        row-selection={rowSelection}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class CustomWidthTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 },
        { title: '地址', dataIndex: 'address' }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, address: '北京市朝阳区' },
        { id: '2', name: '李四', age: 28, address: '上海市浦东新区' },
        { id: '3', name: '王五', age: 35, address: '广州市天河区' }
    ];

    rowSelection = {
        type: 'checkbox',
        width: 80  // 自定义选择列宽度为 80px
    };
}
```

---

### 示例10：禁用表头全选

设置 `disabled: true` 禁用表头的全选 Checkbox。

**index.html**
```html
<template>
    <p class="tip">表头全选已禁用，只能单独选择每行</p>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        row-selection={rowSelection}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class DisabledAllSelectTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 },
        { title: '地址', dataIndex: 'address' }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, address: '北京市朝阳区' },
        { id: '2', name: '李四', age: 28, address: '上海市浦东新区' },
        { id: '3', name: '王五', age: 35, address: '广州市天河区' }
    ];

    rowSelection = {
        type: 'checkbox',
        disabled: true  // 禁用表头全选
    };
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

## 注意事项

1. **rowKey 必须唯一**：行选择功能依赖 `row-key` 来标识行，确保每行数据的 key 值唯一
2. **单选模式无全选**：`type: 'radio'` 时表头不显示全选 Checkbox
3. **getCheckboxProps 返回值**：`getCheckboxProps` 函数需返回对象，支持 `disabled`、`className`、`style` 属性
4. **回调函数中的 this**：在 LWC 中使用 getter 返回 `rowSelection` 对象时，回调函数中需要通过闭包保存 `this` 引用
5. **defaultSelectedRowKeys 只在初始化时生效**：后续选择变化不会更新此属性，需要通过回调自行管理状态

[返回目录](../SKILL.md)
