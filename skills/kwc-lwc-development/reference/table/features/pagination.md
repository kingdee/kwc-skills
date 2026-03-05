# 分页

[返回目录](../index.md)

## 功能说明

Table 组件支持分页功能，通过 `pagination` 属性配置。支持设置分页位置、每页条数、页码、每页条数选项等，并提供分页变化回调。

## API 属性

### Pagination 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `position` | 分页位置 | `'topStart' \| 'topCenter' \| 'topEnd' \| 'bottomStart' \| 'bottomCenter' \| 'bottomEnd'` | `'bottomEnd'` |
| `total` | 数据总条数 | `number` | - |
| `pageSize` | 每页条数 | `number` | `20` |
| `currentPage` | 当前页码（受控） | `number` | - |
| `defaultCurrentPage` | 默认当前页码 | `number` | `1` |
| `pageSizeOpts` | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| `simpleMode` | 是否简洁模式 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `className` | 分页样式类名 | `string` | - |
| `sl-page-change` | 分页变化回调 | `(event: CustomEvent) => void` | - |

---

## 代码示例

### 示例1：基础分页

配置 `pagination` 属性开启分页功能。

**index.html**
```html
<template>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
        pagination={pagination}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class PaginationTable extends KingdeeElement {
    columns = [
        { title: 'ID', dataIndex: 'id', width: 80 },
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '邮箱', dataIndex: 'email' }
    ];

    // 生成 100 条数据
    dataSource = Array.from({ length: 100 }, (_, index) => ({
        id: String(index + 1),
        name: `用户${index + 1}`,
        email: `user${index + 1}@example.com`
    }));

    pagination = {
        total: 100,
        pageSize: 10,
        defaultCurrentPage: 1
    };
}
```

---

### 示例2：分页位置

通过 `position` 设置分页器的位置，支持 6 种位置。

**index.html**
```html
<template>
    <div class="demo-group">
        <h4>顶部居右 (topEnd)</h4>
        <sl-table kwc:external
            row-key="id"
            columns={columns}
            data-source={dataSource}
            pagination={paginationTopEnd}
        ></sl-table>
    </div>
    
    <div class="demo-group">
        <h4>底部居中 (bottomCenter)</h4>
        <sl-table kwc:external
            row-key="id"
            columns={columns}
            data-source={dataSource}
            pagination={paginationBottomCenter}
        ></sl-table>
    </div>
</template>
```

**index.js**
```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class PaginationPositionTable extends KingdeeElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 }
    ];

    dataSource = Array.from({ length: 50 }, (_, index) => ({
        id: String(index + 1),
        name: `用户${index + 1}`,
        age: 20 + (index % 30)
    }));

    paginationTopEnd = {
        total: 50,
        pageSize: 5,
        position: 'topEnd'
    };

    paginationBottomCenter = {
        total: 50,
        pageSize: 5,
        position: 'bottomCenter'
    };
}
```

**index.css**
```css
.demo-group {
    margin-bottom: 32px;
}
.demo-group h4 {
    margin: 0 0 var(--sl-spacing-small);
    color: var(--sl-color-neutral-700);
}
```

---

### 示例3：自定义每页条数选项

通过 `pageSizeOpts` 自定义每页条数的下拉选项。

**index.html**
```html
<template>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
        pagination={pagination}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class CustomPageSizeTable extends KingdeeElement {
    columns = [
        { title: 'ID', dataIndex: 'id', width: 80 },
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '部门', dataIndex: 'department' }
    ];

    dataSource = Array.from({ length: 200 }, (_, index) => ({
        id: String(index + 1),
        name: `员工${index + 1}`,
        department: ['研发部', '产品部', '设计部'][index % 3]
    }));

    pagination = {
        total: 200,
        pageSize: 15,
        pageSizeOpts: [15, 30, 50, 100, 200]  // 自定义选项
    };
}
```

---

### 示例4：简洁模式

设置 `simpleMode: true` 使用简洁分页样式。

**index.html**
```html
<template>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
        pagination={pagination}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class SimplePaginationTable extends KingdeeElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '邮箱', dataIndex: 'email' }
    ];

    dataSource = Array.from({ length: 100 }, (_, index) => ({
        id: String(index + 1),
        name: `用户${index + 1}`,
        email: `user${index + 1}@example.com`
    }));

    pagination = {
        total: 100,
        pageSize: 10,
        simpleMode: true  // 简洁模式
    };
}
```

---

### 示例5：分页回调

通过 `sl-page-change` 监听分页变化事件。

**index.html**
```html
<template>
    <div class="info">
        当前页: {currentPage}, 每页: {pageSize} 条
    </div>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
        pagination={pagination}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement, track } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class PaginationCallbackTable extends KingdeeElement {
    @track currentPage = 1;
    @track pageSize = 10;

    columns = [
        { title: 'ID', dataIndex: 'id', width: 80 },
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '状态', dataIndex: 'status' }
    ];

    dataSource = Array.from({ length: 100 }, (_, index) => ({
        id: String(index + 1),
        name: `用户${index + 1}`,
        status: index % 2 === 0 ? '活跃' : '非活跃'
    }));

    get pagination() {
        const self = this;
        return {
            total: 100,
            pageSize: this.pageSize,
            defaultCurrentPage: this.currentPage,
            'sl-page-change': (event) => {
                const { pageNumber, pageSize } = event.detail;
                self.currentPage = pageNumber;
                self.pageSize = pageSize;
                console.log('分页变化:', { pageNumber, pageSize });
            }
        };
    }
}
```

**index.css**
```css
.info {
    margin-bottom: var(--sl-spacing-small);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-small);
    background: var(--sl-color-neutral-100);
    border-radius: var(--sl-border-radius-medium);
}
```

---

### 示例6：服务端分页

配合服务端进行分页数据请求。

**index.html**
```html
<template>
    <sl-table kwc:external
        row-key="id"
        loading={isLoading}
        columns={columns}
        data-source={dataSource}
        pagination={pagination}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement, track } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class ServerPaginationTable extends KingdeeElement {
    @track isLoading = false;
    @track dataSource = [];
    @track currentPage = 1;
    @track pageSize = 10;
    @track total = 0;

    columns = [
        { title: 'ID', dataIndex: 'id', width: 80 },
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '邮箱', dataIndex: 'email' }
    ];

    get pagination() {
        const self = this;
        return {
            total: this.total,
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            'sl-page-change': (event) => {
                const { pageNumber, pageSize } = event.detail;
                self.currentPage = pageNumber;
                self.pageSize = pageSize;
                self.fetchData();
            }
        };
    }

    connectedCallback() {
        this.fetchData();
    }

    async fetchData() {
        this.isLoading = true;
        
        // 模拟服务端请求
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 模拟服务端响应
        const mockTotal = 156;
        const start = (this.currentPage - 1) * this.pageSize;
        const mockData = Array.from(
            { length: Math.min(this.pageSize, mockTotal - start) }, 
            (_, index) => ({
                id: String(start + index + 1),
                name: `用户${start + index + 1}`,
                email: `user${start + index + 1}@example.com`
            })
        );
        
        this.dataSource = mockData;
        this.total = mockTotal;
        this.isLoading = false;
    }
}
```

---

## 注意事项

1. **组件导入**：使用分页功能时，除了导入 `table.js` 外，还需要导入分页器内部依赖的组件：`dropdown.js`、`icon.js`、`menu.js`、`menu-item.js`，因为分页器的每页条数选择器使用了这些组件
2. **total 属性**：`total` 用于计算总页数，如果不设置，将使用 `dataSource.length`
3. **前端分页 vs 服务端分页**：默认为前端分页（组件自动切片数据），服务端分页需手动管理数据
4. **分页位置**：6 种位置分别是 `topStart`、`topCenter`、`topEnd`、`bottomStart`、`bottomCenter`、`bottomEnd`
5. **currentPage 受控**：设置 `currentPage` 后进入受控模式，需手动管理页码变化
6. **change 事件联动**：分页变化也会触发表格的 `change` 事件，`changeType` 为 `'pagination'`

[返回目录](../index.md)
