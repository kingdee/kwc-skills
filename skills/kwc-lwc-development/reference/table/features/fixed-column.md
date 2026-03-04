# 固定列

[返回目录](../SKILL.md)

## 功能说明

Table 组件支持固定列功能，通过在列配置中设置 `fixed` 属性实现。支持左侧固定（`'left'`）和右侧固定（`'right'`）两种方式。固定列时需要配合 `table-scroll.x` 设置横向滚动区域宽度。

## API 属性

### Column 固定列配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `fixed` | 列固定位置 | `false \| 'left' \| 'right'` | `false` |

### table-scroll 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `x` | 横向滚动区域宽度 | `number \| string` | - |

---

## 代码示例

### 示例1：左侧固定列

将列固定在表格左侧，横向滚动时保持可见。

**index.html**
```html
<template>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        table-scroll={tableScroll}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class FixedLeftTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 100, fixed: 'left' },
        { title: '年龄', dataIndex: 'age', width: 80 },
        { title: '地址', dataIndex: 'address', width: 200 },
        { title: '邮箱', dataIndex: 'email', width: 200 },
        { title: '电话', dataIndex: 'phone', width: 150 },
        { title: '公司', dataIndex: 'company', width: 200 },
        { title: '职位', dataIndex: 'position', width: 150 }
    ];

    dataSource = [
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

    tableScroll = { x: 1200 };  // 设置横向滚动宽度
}
```

---

### 示例2：右侧固定列

将操作列固定在表格右侧，便于用户操作。

**index.html**
```html
<template>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        table-scroll={tableScroll}
    >
        <div slot="custom-cell-action-1" class="action-cell">
            <sl-button size="small" variant="text">编辑</sl-button>
            <sl-button size="small" variant="text" class="danger">删除</sl-button>
        </div>
        <div slot="custom-cell-action-2" class="action-cell">
            <sl-button size="small" variant="text">编辑</sl-button>
            <sl-button size="small" variant="text" class="danger">删除</sl-button>
        </div>
        <div slot="custom-cell-action-3" class="action-cell">
            <sl-button size="small" variant="text">编辑</sl-button>
            <sl-button size="small" variant="text" class="danger">删除</sl-button>
        </div>
    </sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

export default class FixedRightTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 100 },
        { title: '年龄', dataIndex: 'age', width: 80 },
        { title: '地址', dataIndex: 'address', width: 200 },
        { title: '邮箱', dataIndex: 'email', width: 200 },
        { title: '电话', dataIndex: 'phone', width: 150 },
        { title: '操作', dataIndex: 'action', width: 120, fixed: 'right', slot: true }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, address: '北京市朝阳区', email: 'zhangsan@example.com', phone: '13800138001' },
        { id: '2', name: '李四', age: 28, address: '上海市浦东新区', email: 'lisi@example.com', phone: '13800138002' },
        { id: '3', name: '王五', age: 35, address: '广州市天河区', email: 'wangwu@example.com', phone: '13800138003' }
    ];

    tableScroll = { x: 900 };
}
```

**index.css**
```css
.action-cell {
    display: flex;
    gap: 4px;
}
.action-cell .danger {
    color: #ff4d4f;
}
```

---

### 示例3：左右两侧同时固定

同时固定左侧和右侧的列。

**index.html**
```html
<template>
    <sl-table
        row-key="id"
        bordered="true"
        columns={columns}
        data-source={dataSource}
        table-scroll={tableScroll}
    >
        <div slot="custom-cell-action-1" class="action-cell">
            <sl-button size="small" variant="primary">查看</sl-button>
        </div>
        <div slot="custom-cell-action-2" class="action-cell">
            <sl-button size="small" variant="primary">查看</sl-button>
        </div>
        <div slot="custom-cell-action-3" class="action-cell">
            <sl-button size="small" variant="primary">查看</sl-button>
        </div>
    </sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

export default class FixedBothTable extends LightningElement {
    columns = [
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

    dataSource = [
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

    tableScroll = { x: 1400 };
}
```

**index.css**
```css
.action-cell {
    display: flex;
    justify-content: center;
}
```

---

## 注意事项

1. **必须设置 table-scroll.x**：固定列时需要设置 `table-scroll.x`，否则没有横向滚动效果
2. **固定列顺序**：左侧固定列应放在 columns 数组的前面，右侧固定列放在后面
3. **固定列阴影**：滚动时固定列边缘会显示阴影效果，提示用户可滚动
4. **宽度设置**：固定列建议设置明确的 `width`，避免列宽计算问题
5. **性能考虑**：固定列会增加 DOM 复杂度，大数据量时建议配合虚拟滚动使用

[返回目录](../SKILL.md)
