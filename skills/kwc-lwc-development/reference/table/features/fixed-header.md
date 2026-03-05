# 固定表头

[返回目录](../index.md)

## 功能说明

Table 组件支持固定表头功能，通过设置 `table-scroll.y` 指定表体的最大高度，当数据超出高度时表体可纵向滚动，表头保持固定不动。还可以通过 `scrollToFirstRowOnChange` 设置分页/排序/筛选变化后自动滚动到顶部。

## API 属性

### table-scroll 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `y` | 纵向滚动区域高度 | `number \| string` | - |
| `scrollToFirstRowOnChange` | 分页/排序/筛选变化后是否滚动到顶部 | `boolean` | `false` |

---

## 代码示例

### 示例1：基础固定表头

设置 `table-scroll.y` 限制表体高度，实现固定表头效果。

**index.html**
```html
<template>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
        table-scroll={tableScroll}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class FixedHeaderTable extends KingdeeElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 },
        { title: '地址', dataIndex: 'address' }
    ];

    // 生成 30 条数据
    dataSource = Array.from({ length: 30 }, (_, index) => ({
        id: String(index + 1),
        name: `用户${index + 1}`,
        age: 20 + (index % 30),
        address: `地址${index + 1}`
    }));

    tableScroll = { y: 300 };  // 限制表体高度为 300px
}
```

---

### 示例2：固定表头 + 固定列组合

同时使用固定表头和固定列，适用于大型数据表格。

**index.html**
```html
<template>
    <sl-table kwc:external
        row-key="id"
        bordered="true"
        columns={columns}
        data-source={dataSource}
        table-scroll={tableScroll}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class FixedHeaderColumnTable extends KingdeeElement {
    columns = [
        { title: 'ID', dataIndex: 'id', width: 80, fixed: 'left' },
        { title: '姓名', dataIndex: 'name', width: 100, fixed: 'left' },
        { title: '年龄', dataIndex: 'age', width: 80 },
        { title: '地址', dataIndex: 'address', width: 200 },
        { title: '邮箱', dataIndex: 'email', width: 200 },
        { title: '电话', dataIndex: 'phone', width: 150 },
        { title: '公司', dataIndex: 'company', width: 180 },
        { title: '部门', dataIndex: 'department', width: 120 },
        { title: '状态', dataIndex: 'status', width: 100, fixed: 'right' }
    ];

    // 生成 50 条数据
    dataSource = Array.from({ length: 50 }, (_, index) => ({
        id: String(index + 1).padStart(3, '0'),
        name: `用户${index + 1}`,
        age: 22 + (index % 20),
        address: `城市${(index % 5) + 1}区街道${index + 1}号`,
        email: `user${index + 1}@example.com`,
        phone: `138${String(index).padStart(8, '0')}`,
        company: `公司${(index % 3) + 1}`,
        department: ['研发部', '产品部', '设计部', '市场部'][index % 4],
        status: index % 3 === 0 ? '在职' : index % 3 === 1 ? '休假' : '出差'
    }));

    tableScroll = { 
        x: 1300,  // 横向滚动
        y: 400    // 纵向滚动
    };
}
```

---

### 示例3：scrollToFirstRowOnChange

设置分页、排序、筛选变化后自动滚动到表格顶部。

**index.html**
```html
<template>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
        table-scroll={tableScroll}
        pagination={pagination}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class ScrollToTopTable extends KingdeeElement {
    columns = [
        { title: '序号', dataIndex: 'index', width: 80 },
        { title: '姓名', dataIndex: 'name', width: 150 },
        { 
            title: '年龄', 
            dataIndex: 'age', 
            width: 100,
            sorter: (a, b) => a.age - b.age
        },
        { title: '地址', dataIndex: 'address' }
    ];

    // 生成 100 条数据
    dataSource = Array.from({ length: 100 }, (_, index) => ({
        id: String(index + 1),
        index: index + 1,
        name: `用户${index + 1}`,
        age: 20 + (index % 40),
        address: `地址${index + 1}`
    }));

    tableScroll = { 
        y: 300,
        scrollToFirstRowOnChange: true  // 变化后滚动到顶部
    };

    pagination = {
        pageSize: 20,
        total: 100
    };
}
```

---

### 示例4：动态调整高度

根据容器或窗口大小动态调整表格高度。

**index.html**
```html
<template>
    <div class="table-container">
        <sl-table kwc:external
            row-key="id"
            columns={columns}
            data-source={dataSource}
            table-scroll={tableScroll}
        ></sl-table>
    </div>
</template>
```

**index.js**
```js
import { KingdeeElement, track } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class DynamicHeightTable extends KingdeeElement {
    @track tableHeight = 400;

    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 },
        { title: '邮箱', dataIndex: 'email' }
    ];

    dataSource = Array.from({ length: 50 }, (_, index) => ({
        id: String(index + 1),
        name: `用户${index + 1}`,
        age: 20 + (index % 30),
        email: `user${index + 1}@example.com`
    }));

    get tableScroll() {
        return { y: this.tableHeight };
    }

    connectedCallback() {
        this.updateTableHeight();
        window.addEventListener('resize', this.handleResize);
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.updateTableHeight();
    }

    updateTableHeight() {
        // 根据窗口高度动态计算表格高度
        // 预留 200px 给其他内容
        this.tableHeight = Math.max(200, window.innerHeight - 200);
    }
}
```

**index.css**
```css
.table-container {
    padding: var(--sl-spacing-medium);
}
```

---

## 注意事项

1. **y 值单位**：`table-scroll.y` 支持数字（默认 px）或字符串（如 `'50vh'`）
2. **表头滚动条对齐**：固定表头时，表头区域会自动显示与表体对齐的滚动条占位
3. **空数据高度**：数据为空时，空状态区域不受 `y` 限制，会正常显示
4. **结合固定列使用**：同时使用固定表头和固定列时，需要同时设置 `x` 和 `y`
5. **滚动性能**：大数据量时建议配合虚拟滚动（`virtualized`）使用

[返回目录](../index.md)
