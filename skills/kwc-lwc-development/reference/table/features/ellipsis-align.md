# 文本省略与列对齐

[返回目录](../SKILL.md)

## 功能说明

Table 组件支持单元格内容超出时自动省略显示（`ellipsis`），以及设置列内容的对齐方式（`align`）和列样式类名（`className`）。

## API 属性

### Column 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `ellipsis` | 内容超出是否省略 | `boolean` | `false` |
| `align` | 列对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| `className` | 列样式类名 | `string` | - |

---

## 代码示例

### 示例1：文本省略

设置 `ellipsis: true`，当单元格内容超出列宽时显示省略号。

**index.html**
```html
<template>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class EllipsisTable extends LightningElement {
    columns = [
        { title: '标题', dataIndex: 'title', width: 150, ellipsis: true },
        { title: '描述', dataIndex: 'description', width: 200, ellipsis: true },
        { title: '备注', dataIndex: 'remark', width: 150, ellipsis: true }
    ];

    dataSource = [
        { 
            id: '1', 
            title: '这是一个很长很长的标题内容', 
            description: '这是一段非常非常长的描述文本，用来测试省略功能是否正常工作',
            remark: '备注信息也很长很长很长'
        },
        { 
            id: '2', 
            title: '短标题', 
            description: '短描述',
            remark: '短备注'
        },
        { 
            id: '3', 
            title: '另一个超级无敌长的标题', 
            description: '又一段超级超级长的描述文本内容',
            remark: '这个备注也是相当的长啊'
        }
    ];
}
```

---

### 示例2：列对齐方式

设置 `align` 属性控制列内容的水平对齐方式。

**index.html**
```html
<template>
    <sl-table
        row-key="id"
        bordered="true"
        columns={columns}
        data-source={dataSource}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class AlignTable extends LightningElement {
    columns = [
        { title: '商品名称', dataIndex: 'name', width: 200, align: 'left' },
        { title: '数量', dataIndex: 'quantity', width: 100, align: 'center' },
        { title: '单价', dataIndex: 'price', width: 120, align: 'right' },
        { title: '总价', dataIndex: 'total', width: 120, align: 'right' }
    ];

    dataSource = [
        { id: '1', name: '笔记本电脑', quantity: 2, price: '¥5,999.00', total: '¥11,998.00' },
        { id: '2', name: '无线鼠标', quantity: 5, price: '¥99.00', total: '¥495.00' },
        { id: '3', name: '机械键盘', quantity: 3, price: '¥299.00', total: '¥897.00' }
    ];
}
```

---

### 示例3：列样式类名

通过 `className` 为特定列添加自定义样式。

**index.html**
```html
<template>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class ClassNameTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '状态', dataIndex: 'status', width: 100, className: 'status-column' },
        { title: '得分', dataIndex: 'score', width: 100, className: 'score-column' },
        { title: '备注', dataIndex: 'remark', width: 200 }
    ];

    dataSource = [
        { id: '1', name: '张三', status: '通过', score: 95, remark: '优秀' },
        { id: '2', name: '李四', status: '未通过', score: 58, remark: '需补考' },
        { id: '3', name: '王五', status: '通过', score: 82, remark: '良好' }
    ];
}
```

**index.css**
```css
/* 需要使用 ::part 或在全局样式中定义 */
.status-column {
    font-weight: bold;
}
.score-column {
    color: #1890ff;
}
```

---

### 示例4：综合示例

组合使用省略、对齐和样式类名。

**index.html**
```html
<template>
    <sl-table
        row-key="id"
        bordered="true"
        columns={columns}
        data-source={dataSource}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class CombinedTable extends LightningElement {
    columns = [
        { 
            title: 'ID', 
            dataIndex: 'id', 
            width: 80, 
            align: 'center',
            className: 'id-column'
        },
        { 
            title: '项目名称', 
            dataIndex: 'project', 
            width: 200, 
            ellipsis: true 
        },
        { 
            title: '描述', 
            dataIndex: 'description', 
            width: 250, 
            ellipsis: true 
        },
        { 
            title: '进度', 
            dataIndex: 'progress', 
            width: 100, 
            align: 'center' 
        },
        { 
            title: '预算', 
            dataIndex: 'budget', 
            width: 120, 
            align: 'right',
            className: 'budget-column'
        },
        { 
            title: '状态', 
            dataIndex: 'status', 
            width: 100, 
            align: 'center' 
        }
    ];

    dataSource = [
        { 
            id: '001', 
            project: '企业级后台管理系统开发项目', 
            description: '该项目旨在为企业提供一套完整的后台管理解决方案，包括用户管理、权限控制、数据分析等功能',
            progress: '80%',
            budget: '¥500,000',
            status: '进行中'
        },
        { 
            id: '002', 
            project: '移动端App重构', 
            description: '对现有App进行技术架构升级，采用新的跨平台框架开发',
            progress: '45%',
            budget: '¥200,000',
            status: '进行中'
        },
        { 
            id: '003', 
            project: '数据中台建设项目第一期工程', 
            description: '构建企业级数据中台，实现数据的统一采集、存储、加工和服务',
            progress: '100%',
            budget: '¥1,000,000',
            status: '已完成'
        }
    ];
}
```

**index.css**
```css
.id-column {
    background-color: #fafafa;
}
.budget-column {
    font-family: 'Courier New', monospace;
    color: #52c41a;
}
```

---

## 注意事项

1. **ellipsis 需要设置宽度**：`ellipsis` 需要配合固定的列 `width` 使用才能生效
2. **省略文本查看**：省略的文本可以通过鼠标悬停查看完整内容（浏览器原生 title 提示）
3. **align 作用范围**：`align` 同时影响表头和表体单元格的对齐方式
4. **className 作用范围**：`className` 会应用到该列的所有单元格（包括表头）
5. **样式优先级**：通过 `className` 添加的样式可能需要适当提高优先级才能覆盖默认样式

[返回目录](../SKILL.md)
