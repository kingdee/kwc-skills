# 行展开

[返回目录](../SKILL.md)

## 功能说明

Table 组件支持行展开功能，通过 `expand-props` 配置。展开后可以显示更多行详情内容，内容通过 `custom-row-{rowKeyValue}` slot 自定义。支持点击展开图标或点击整行展开、指定可展开行、默认展开等功能。

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

开启行展开功能，点击展开图标显示详情。

**index.html**
```html
<template>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        expand-props={expandProps}
    >
        <div slot="custom-row-1" class="expand-content">
            <p><strong>详细地址：</strong>北京市朝阳区建国路88号SOHO现代城A座1001室</p>
            <p><strong>联系电话：</strong>13800138001</p>
            <p><strong>备注信息：</strong>VIP客户，需优先处理</p>
        </div>
        <div slot="custom-row-2" class="expand-content">
            <p><strong>详细地址：</strong>上海市浦东新区张江高科技园区碧波路100号</p>
            <p><strong>联系电话：</strong>13800138002</p>
            <p><strong>备注信息：</strong>新客户，首次合作</p>
        </div>
        <div slot="custom-row-3" class="expand-content">
            <p><strong>详细地址：</strong>广州市天河区珠江新城华夏路30号</p>
            <p><strong>联系电话：</strong>13800138003</p>
            <p><strong>备注信息：</strong>老客户，合作3年以上</p>
        </div>
    </sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class ExpandTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 },
        { title: '邮箱', dataIndex: 'email' }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, email: 'zhangsan@example.com' },
        { id: '2', name: '李四', age: 28, email: 'lisi@example.com' },
        { id: '3', name: '王五', age: 35, email: 'wangwu@example.com' }
    ];

    expandProps = {
        rowExpandable: true
    };
}
```

**index.css**
```css
.expand-content {
    padding: 16px 24px;
    background-color: #fafafa;
}
.expand-content p {
    margin: 8px 0;
}
```

---

### 示例2：点击行展开

设置 `expandRowByClick: true`，点击整行即可展开/收起。

**index.html**
```html
<template>
    <p class="tip">点击任意行即可展开/收起</p>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        expand-props={expandProps}
    >
        <div slot="custom-row-1" class="expand-content">
            <h4>订单详情</h4>
            <p>订单号：ORD-2024-001</p>
            <p>下单时间：2024-01-15 10:30:00</p>
        </div>
        <div slot="custom-row-2" class="expand-content">
            <h4>订单详情</h4>
            <p>订单号：ORD-2024-002</p>
            <p>下单时间：2024-01-16 14:20:00</p>
        </div>
        <div slot="custom-row-3" class="expand-content">
            <h4>订单详情</h4>
            <p>订单号：ORD-2024-003</p>
            <p>下单时间：2024-01-17 09:15:00</p>
        </div>
    </sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class ExpandByClickTable extends LightningElement {
    columns = [
        { title: '客户名称', dataIndex: 'customer', width: 150 },
        { title: '订单金额', dataIndex: 'amount', width: 120 },
        { title: '状态', dataIndex: 'status', width: 100 }
    ];

    dataSource = [
        { id: '1', customer: '客户A', amount: '¥1,299.00', status: '已完成' },
        { id: '2', customer: '客户B', amount: '¥2,599.00', status: '进行中' },
        { id: '3', customer: '客户C', amount: '¥899.00', status: '待付款' }
    ];

    expandProps = {
        rowExpandable: true,
        expandRowByClick: true
    };
}
```

**index.css**
```css
.tip {
    margin-bottom: 12px;
    color: #1890ff;
    font-size: 14px;
}
.expand-content {
    padding: 16px 24px;
    background-color: #fafafa;
}
.expand-content h4 {
    margin: 0 0 12px;
    color: #333;
}
.expand-content p {
    margin: 4px 0;
    color: #666;
}
```

---

### 示例3：指定可展开行

通过 `expendableRowKeys` 指定哪些行可以展开。

**index.html**
```html
<template>
    <p class="tip">只有ID为1和3的行可以展开</p>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        expand-props={expandProps}
    >
        <div slot="custom-row-1" class="expand-content">
            <p>这是第1行的展开内容</p>
        </div>
        <div slot="custom-row-3" class="expand-content">
            <p>这是第3行的展开内容</p>
        </div>
    </sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class PartialExpandTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 },
        { title: '部门', dataIndex: 'department' }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, department: '研发部' },
        { id: '2', name: '李四', age: 28, department: '产品部' },
        { id: '3', name: '王五', age: 35, department: '设计部' },
        { id: '4', name: '赵六', age: 26, department: '市场部' }
    ];

    expandProps = {
        rowExpandable: true,
        expendableRowKeys: ['1', '3']  // 只有这两行可展开
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
.expand-content {
    padding: 16px;
    background-color: #e6f7ff;
}
```

---

### 示例4：默认展开指定行

通过 `defaultExpandedRowKeys` 设置初始展开的行。

**index.html**
```html
<template>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        expand-props={expandProps}
    >
        <div slot="custom-row-1" class="expand-content">第1行默认展开</div>
        <div slot="custom-row-2" class="expand-content">第2行默认展开</div>
        <div slot="custom-row-3" class="expand-content">第3行需手动展开</div>
    </sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class DefaultExpandedTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '职位', dataIndex: 'position', width: 150 }
    ];

    dataSource = [
        { id: '1', name: '张三', position: '工程师' },
        { id: '2', name: '李四', position: '产品经理' },
        { id: '3', name: '王五', position: '设计师' }
    ];

    expandProps = {
        rowExpandable: true,
        defaultExpandedRowKeys: ['1', '2']  // 默认展开前两行
    };
}
```

**index.css**
```css
.expand-content {
    padding: 12px 16px;
    background-color: #f5f5f5;
}
```

---

### 示例5：默认展开所有行

设置 `defaultExpandAllRows: true` 默认展开所有可展开行。

**index.html**
```html
<template>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        expand-props={expandProps}
    >
        <template for:each={dataSource} for:item="row">
            <div key={row.id} slot={row.expandSlot} class="expand-content">
                <p>这是 {row.name} 的详细信息</p>
            </div>
        </template>
    </sl-table>
</template>
```

**index.js**
```js
import { LightningElement } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class ExpandAllTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '部门', dataIndex: 'department', width: 150 }
    ];

    rawData = [
        { id: '1', name: '张三', department: '研发部' },
        { id: '2', name: '李四', department: '产品部' },
        { id: '3', name: '王五', department: '设计部' }
    ];

    get dataSource() {
        return this.rawData.map(item => ({
            ...item,
            expandSlot: `custom-row-${item.id}`
        }));
    }

    expandProps = {
        rowExpandable: true,
        defaultExpandAllRows: true  // 默认展开所有行
    };
}
```

**index.css**
```css
.expand-content {
    padding: 12px 16px;
    background-color: #fffbe6;
    border-left: 3px solid #faad14;
}
```

---

## 注意事项

1. **Slot 名称格式**：展开行内容 slot 必须遵循 `custom-row-{rowKeyValue}` 格式
2. **expendableRowKeys 与 slot**：只有在 `expendableRowKeys` 中的行才会渲染对应的 slot
3. **展开图标列**：启用行展开后会自动添加一个展开图标列在最左侧
4. **expandRowByClick 与单元格点击**：启用点击行展开时，注意处理单元格内按钮等元素的点击冲突
5. **展开状态不受控**：当前展开状态为非受控模式，由组件内部管理

[返回目录](../SKILL.md)
