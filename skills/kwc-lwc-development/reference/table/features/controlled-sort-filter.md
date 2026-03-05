# 受控排序筛选与服务端数据

[返回目录](../index.md)

## 功能说明

当需要与服务端数据联动时，可使用受控的排序（`sortOrder`）和筛选（`filteredValue`）属性。受控模式下，组件不会自动进行排序/筛选，而是通过回调通知外部状态变化，由外部发起服务端请求并更新数据。

## API 属性

### Column 受控配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `sortOrder` | 受控的排序方向 | `'asc' \| 'desc' \| null` | - |
| `filteredValue` | 受控的筛选值 | `string[]` | - |

---

## 代码示例

### 示例1：受控排序

通过 `sortOrder` 属性控制排序状态，配合 `change` 事件手动管理排序。

**index.html**
```html
<template>
    <div class="info-panel">
        <p>当前排序: {sortInfo}</p>
        <sl-button kwc:external size="small" onclick={clearSort}>清除排序</sl-button>
    </div>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
        onchange={handleChange}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement, track } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

export default class ControlledSortTable extends KingdeeElement {
    @track currentSortOrder = null;
    @track sortInfo = '无';

    dataSource = [
        { id: '1', name: '张三', age: 32 },
        { id: '2', name: '李四', age: 28 },
        { id: '3', name: '王五', age: 35 },
        { id: '4', name: '赵六', age: 26 }
    ];

    get columns() {
        return [
            { title: '姓名', dataIndex: 'name', width: 150 },
            { 
                title: '年龄', 
                dataIndex: 'age', 
                width: 100,
                sorter: (a, b) => a.age - b.age,
                sortOrder: this.currentSortOrder  // 受控排序
            }
        ];
    }

    handleChange(event) {
        const { sorting, changeType } = event.detail;
        
        if (changeType === 'sorter') {
            if (sorting && sorting.length > 0) {
                this.currentSortOrder = sorting[0].desc ? 'desc' : 'asc';
                this.sortInfo = `年龄 ${this.currentSortOrder === 'desc' ? '降序' : '升序'}`;
            } else {
                this.currentSortOrder = null;
                this.sortInfo = '无';
            }
        }
    }

    clearSort() {
        this.currentSortOrder = null;
        this.sortInfo = '无';
    }
}
```

**index.css**
```css
.info-panel {
    display: flex;
    align-items: center;
    gap: var(--sl-spacing-medium);
    margin-bottom: var(--sl-spacing-medium);
    padding: var(--sl-spacing-small);
    background: var(--sl-color-neutral-100);
    border-radius: var(--sl-border-radius-medium);
}
.info-panel p {
    margin: 0;
}
```

---

### 示例2：受控筛选

通过 `filteredValue` 属性控制筛选状态，配合 `change` 事件手动管理筛选。

**index.html**
```html
<template>
    <div class="info-panel">
        <p>当前筛选: {filterInfo}</p>
        <sl-button kwc:external size="small" onclick={clearFilter}>清除筛选</sl-button>
    </div>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
        onchange={handleChange}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement, track } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

export default class ControlledFilterTable extends KingdeeElement {
    @track currentFilterValue = [];
    @track filterInfo = '无';

    dataSource = [
        { id: '1', name: '张三', status: 'active' },
        { id: '2', name: '李四', status: 'inactive' },
        { id: '3', name: '王五', status: 'active' },
        { id: '4', name: '赵六', status: 'pending' }
    ];

    get columns() {
        return [
            { title: '姓名', dataIndex: 'name', width: 150 },
            { 
                title: '状态', 
                dataIndex: 'status', 
                width: 120,
                filters: [
                    { text: '在职', value: 'active' },
                    { text: '离职', value: 'inactive' },
                    { text: '待入职', value: 'pending' }
                ],
                onFilter: (value, record) => record.status === value,
                filteredValue: this.currentFilterValue  // 受控筛选
            }
        ];
    }

    handleChange(event) {
        const { columnFilters, changeType } = event.detail;
        
        if (changeType === 'filters') {
            const statusFilter = columnFilters.find(f => f.id === 'status');
            if (statusFilter && statusFilter.value.length > 0) {
                this.currentFilterValue = statusFilter.value;
                this.filterInfo = statusFilter.value.join(', ');
            } else {
                this.currentFilterValue = [];
                this.filterInfo = '无';
            }
        }
    }

    clearFilter() {
        this.currentFilterValue = [];
        this.filterInfo = '无';
    }
}
```

**index.css**
```css
.info-panel {
    display: flex;
    align-items: center;
    gap: var(--sl-spacing-medium);
    margin-bottom: var(--sl-spacing-medium);
    padding: var(--sl-spacing-small);
    background: var(--sl-color-neutral-100);
    border-radius: var(--sl-border-radius-medium);
}
.info-panel p {
    margin: 0;
}
```

---

### 示例3：服务端排序/筛选综合示例

完整的服务端数据联动示例，排序和筛选都由服务端处理。

**index.html**
```html
<template>
    <div class="info-panel">
        <p>请求参数: {requestParams}</p>
    </div>
    <sl-table kwc:external
        row-key="id"
        loading={isLoading}
        columns={columns}
        data-source={dataSource}
        onchange={handleChange}
    ></sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement, track } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class ServerSideTable extends KingdeeElement {
    @track isLoading = false;
    @track dataSource = [];
    @track currentSortOrder = null;
    @track currentFilterValue = [];
    @track requestParams = '{}';

    get columns() {
        return [
            { title: '姓名', dataIndex: 'name', width: 150 },
            { 
                title: '年龄', 
                dataIndex: 'age', 
                width: 100,
                sorter: (a, b) => a.age - b.age,
                sortOrder: this.currentSortOrder
            },
            { 
                title: '状态', 
                dataIndex: 'status', 
                width: 120,
                filters: [
                    { text: '在职', value: 'active' },
                    { text: '离职', value: 'inactive' }
                ],
                onFilter: (value, record) => record.status === value,
                filteredValue: this.currentFilterValue
            }
        ];
    }

    connectedCallback() {
        this.fetchData();
    }

    handleChange(event) {
        const { sorting, columnFilters, changeType } = event.detail;
        
        // 更新受控状态
        if (changeType === 'sorter') {
            if (sorting && sorting.length > 0) {
                this.currentSortOrder = sorting[0].desc ? 'desc' : 'asc';
            } else {
                this.currentSortOrder = null;
            }
        }
        
        if (changeType === 'filters') {
            const statusFilter = columnFilters.find(f => f.id === 'status');
            this.currentFilterValue = statusFilter?.value || [];
        }
        
        // 重新请求数据
        this.fetchData();
    }

    async fetchData() {
        this.isLoading = true;
        
        // 构建请求参数
        const params = {
            sort: this.currentSortOrder ? {
                field: 'age',
                order: this.currentSortOrder
            } : null,
            filter: this.currentFilterValue.length > 0 ? {
                field: 'status',
                values: this.currentFilterValue
            } : null
        };
        
        this.requestParams = JSON.stringify(params, null, 2);
        
        // 模拟服务端请求
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 模拟服务端返回数据（实际应用中这里调用真实 API）
        let mockData = [
            { id: '1', name: '张三', age: 32, status: 'active' },
            { id: '2', name: '李四', age: 28, status: 'inactive' },
            { id: '3', name: '王五', age: 35, status: 'active' },
            { id: '4', name: '赵六', age: 26, status: 'inactive' }
        ];
        
        // 模拟服务端筛选
        if (this.currentFilterValue.length > 0) {
            mockData = mockData.filter(item => 
                this.currentFilterValue.includes(item.status)
            );
        }
        
        // 模拟服务端排序
        if (this.currentSortOrder) {
            mockData.sort((a, b) => {
                const diff = a.age - b.age;
                return this.currentSortOrder === 'desc' ? -diff : diff;
            });
        }
        
        this.dataSource = mockData;
        this.isLoading = false;
    }
}
```

**index.css**
```css
.info-panel {
    margin-bottom: var(--sl-spacing-medium);
    padding: var(--sl-spacing-small);
    background: var(--sl-color-neutral-100);
    border-radius: var(--sl-border-radius-medium);
}
.info-panel p {
    margin: 0;
    white-space: pre-wrap;
    font-family: monospace;
    font-size: var(--sl-font-size-x-small);
}
```

---

## 注意事项

1. **受控模式切换**：一旦设置了 `sortOrder` 或 `filteredValue`，该列就进入受控模式，组件不会自动排序/筛选
2. **必须配合回调使用**：受控模式下需要监听 `change` 事件并手动更新状态
3. **服务端分页联动**：通常服务端排序/筛选需要配合服务端分页使用，每次变化都重新请求第一页数据
4. **loading 状态**：服务端请求时建议设置 `loading` 状态，提升用户体验
5. **清空受控值**：将 `sortOrder` 设为 `null`、`filteredValue` 设为空数组可清除对应状态

[返回目录](../index.md)
