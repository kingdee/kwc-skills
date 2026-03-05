# 事件监听

[返回目录](../index.md)

## 功能说明

Table 组件提供统一的 `change` 事件，用于监听排序、筛选、分页等状态的变化。通过 `changeType` 字段区分变化类型，便于统一处理各类状态变化。

## API 属性

### change 事件 detail

| 属性 | 说明 | 类型 |
|------|------|------|
| `sorting` | 当前排序状态 | `{ id: string, desc: boolean }[]` |
| `columnFilters` | 当前筛选状态 | `{ id: string, value: any[] }[]` |
| `changeType` | 变化类型 | `'sorter' \| 'filters' \| 'pagination'` |
| `pagination` | 分页信息（仅分页变化时） | `{ pageNumber: number, pageSize: number, total: number }` |

---

## 代码示例

### 示例1：change 事件统一监听

通过 `onchange` 监听所有状态变化。

**index.html**
```html
<template>
    <div class="log-panel">
        <h4>事件日志</h4>
        <div class="log-content">{logContent}</div>
    </div>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
        pagination={pagination}
        onchange={handleChange}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement, track } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class ChangeEventTable extends KingdeeElement {
    @track logContent = '等待操作...';

    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { 
            title: '年龄', 
            dataIndex: 'age', 
            width: 100,
            sorter: (a, b) => a.age - b.age
        },
        { 
            title: '状态', 
            dataIndex: 'status',
            width: 120,
            filters: [
                { text: '在职', value: 'active' },
                { text: '离职', value: 'inactive' }
            ],
            onFilter: (value, record) => record.status === value
        }
    ];

    dataSource = Array.from({ length: 50 }, (_, index) => ({
        id: String(index + 1),
        name: `用户${index + 1}`,
        age: 20 + (index % 30),
        status: index % 3 === 0 ? 'inactive' : 'active'
    }));

    pagination = {
        total: 50,
        pageSize: 10
    };

    handleChange(event) {
        const { sorting, columnFilters, changeType, pagination } = event.detail;
        const time = new Date().toLocaleTimeString();
        
        this.logContent = `[${time}] 变化类型: ${changeType}\n`;
        this.logContent += JSON.stringify(event.detail, null, 2);
    }
}
```

**index.css**
```css
.log-panel {
    margin-bottom: var(--sl-spacing-medium);
    padding: var(--sl-spacing-small);
    background: var(--sl-color-neutral-100);
    border-radius: var(--sl-border-radius-medium);
}
.log-panel h4 {
    margin: 0 0 var(--sl-spacing-x-small);
    font-size: var(--sl-font-size-small);
}
.log-content {
    padding: var(--sl-spacing-x-small);
    background: var(--sl-color-neutral-0);
    border: 1px solid var(--sl-color-neutral-300);
    border-radius: var(--sl-border-radius-medium);
    font-family: monospace;
    font-size: var(--sl-font-size-x-small);
    white-space: pre-wrap;
    max-height: 150px;
    overflow: auto;
}
```

---

### 示例2：区分 changeType

根据不同的 `changeType` 执行不同的处理逻辑。

**index.html**
```html
<template>
    <div class="status-bar">
        <span class="status-item">排序: {sortStatus}</span>
        <span class="status-item">筛选: {filterStatus}</span>
        <span class="status-item">分页: {pageStatus}</span>
    </div>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
        pagination={pagination}
        onchange={handleChange}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement, track } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class ChangeTypeTable extends KingdeeElement {
    @track sortStatus = '无';
    @track filterStatus = '无';
    @track pageStatus = '第1页';

    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { 
            title: '年龄', 
            dataIndex: 'age', 
            width: 100,
            sorter: (a, b) => a.age - b.age
        },
        { 
            title: '部门', 
            dataIndex: 'department',
            width: 120,
            filters: [
                { text: '研发部', value: '研发部' },
                { text: '产品部', value: '产品部' },
                { text: '设计部', value: '设计部' }
            ],
            onFilter: (value, record) => record.department === value
        }
    ];

    dataSource = Array.from({ length: 50 }, (_, index) => ({
        id: String(index + 1),
        name: `员工${index + 1}`,
        age: 22 + (index % 20),
        department: ['研发部', '产品部', '设计部'][index % 3]
    }));

    pagination = {
        total: 50,
        pageSize: 10
    };

    handleChange(event) {
        const { sorting, columnFilters, changeType, pagination } = event.detail;
        
        switch (changeType) {
            case 'sorter':
                if (sorting && sorting.length > 0) {
                    const sort = sorting[0];
                    this.sortStatus = `${sort.id} ${sort.desc ? '降序' : '升序'}`;
                } else {
                    this.sortStatus = '无';
                }
                break;
                
            case 'filters':
                if (columnFilters && columnFilters.length > 0) {
                    const filters = columnFilters.map(f => 
                        `${f.id}: ${f.value.join(',')}`
                    ).join('; ');
                    this.filterStatus = filters;
                } else {
                    this.filterStatus = '无';
                }
                break;
                
            case 'pagination':
                this.pageStatus = `第${pagination.pageNumber}页，每页${pagination.pageSize}条`;
                break;
        }
    }
}
```

**index.css**
```css
.status-bar {
    display: flex;
    gap: 24px;
    margin-bottom: var(--sl-spacing-medium);
    padding: var(--sl-spacing-small);
    background: var(--sl-color-primary-100);
    border-radius: var(--sl-border-radius-medium);
}
.status-item {
    font-size: var(--sl-font-size-small);
    color: var(--sl-color-primary-600);
}
```

---

### 示例3：事件联动场景

多个表格状态变化的联动处理，如服务端数据请求。

**index.html**
```html
<template>
    <div class="request-info">
        <p>最近请求参数:</p>
        <pre>{requestParams}</pre>
    </div>
    <sl-table kwc:external
        row-key="id"
        loading={isLoading}
        columns={columns}
        data-source={dataSource}
        pagination={pagination}
        onchange={handleChange}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement, track } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class EventLinkageTable extends KingdeeElement {
    @track isLoading = false;
    @track dataSource = [];
    @track requestParams = '{}';
    
    // 状态管理
    @track currentSort = null;
    @track currentFilters = [];
    @track currentPage = 1;
    @track pageSize = 10;
    @track total = 0;

    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { 
            title: '年龄', 
            dataIndex: 'age', 
            width: 100,
            sorter: (a, b) => a.age - b.age
        },
        { 
            title: '状态', 
            dataIndex: 'status',
            width: 120,
            filters: [
                { text: '在线', value: 'online' },
                { text: '离线', value: 'offline' }
            ],
            onFilter: (value, record) => record.status === value
        }
    ];

    get pagination() {
        return {
            total: this.total,
            pageSize: this.pageSize,
            currentPage: this.currentPage
        };
    }

    connectedCallback() {
        this.fetchData();
    }

    handleChange(event) {
        const { sorting, columnFilters, changeType, pagination } = event.detail;
        
        // 更新状态
        if (changeType === 'sorter') {
            this.currentSort = sorting && sorting.length > 0 ? sorting[0] : null;
            this.currentPage = 1;  // 排序变化重置到第一页
        }
        
        if (changeType === 'filters') {
            this.currentFilters = columnFilters || [];
            this.currentPage = 1;  // 筛选变化重置到第一页
        }
        
        if (changeType === 'pagination') {
            this.currentPage = pagination.pageNumber;
            this.pageSize = pagination.pageSize;
        }
        
        // 重新请求数据
        this.fetchData();
    }

    async fetchData() {
        this.isLoading = true;
        
        // 构建请求参数
        const params = {
            page: this.currentPage,
            pageSize: this.pageSize,
            sort: this.currentSort,
            filters: this.currentFilters
        };
        
        this.requestParams = JSON.stringify(params, null, 2);
        
        // 模拟请求
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // 模拟响应
        const mockTotal = 86;
        this.total = mockTotal;
        this.dataSource = Array.from(
            { length: Math.min(this.pageSize, mockTotal - (this.currentPage - 1) * this.pageSize) },
            (_, index) => {
                const realIndex = (this.currentPage - 1) * this.pageSize + index;
                return {
                    id: String(realIndex + 1),
                    name: `用户${realIndex + 1}`,
                    age: 20 + (realIndex % 30),
                    status: realIndex % 2 === 0 ? 'online' : 'offline'
                };
            }
        );
        
        this.isLoading = false;
    }
}
```

**index.css**
```css
.request-info {
    margin-bottom: var(--sl-spacing-medium);
    padding: var(--sl-spacing-small);
    background: var(--sl-color-neutral-100);
    border-radius: var(--sl-border-radius-medium);
}
.request-info p {
    margin: 0 0 var(--sl-spacing-x-small);
    font-weight: bold;
}
.request-info pre {
    margin: 0;
    padding: var(--sl-spacing-x-small);
    background: var(--sl-color-neutral-0);
    border: 1px solid var(--sl-color-neutral-300);
    border-radius: var(--sl-border-radius-medium);
    font-size: var(--sl-font-size-x-small);
    max-height: 120px;
    overflow: auto;
}
```

---

## 注意事项

1. **事件统一入口**：所有状态变化都通过 `change` 事件触发，通过 `changeType` 区分类型
2. **changeType 值**：`'sorter'` 表示排序变化，`'filters'` 表示筛选变化，`'pagination'` 表示分页变化
3. **pagination 字段**：只有 `changeType === 'pagination'` 时才有 `pagination` 字段
4. **重置页码**：排序和筛选变化时，通常需要重置页码到第一页
5. **防抖处理**：如果事件处理中涉及服务端请求，建议添加防抖避免频繁请求

[返回目录](../index.md)
