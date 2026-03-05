# 自定义单元格

[返回目录](../index.md)

## 功能说明

Table 组件支持通过 slot 自定义单元格内容。在列配置中设置 `slot: true`，然后使用对应的 slot 名称 `custom-cell-{dataIndex}-{rowKeyValue}` 来渲染自定义内容。

## API 属性

### Column 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `slot` | 是否启用自定义渲染 | `boolean` | `false` |

### Slot 命名规则

| Slot 格式 | 说明 |
|-----------|------|
| `custom-cell-{dataIndex}-{rowKeyValue}` | 自定义单元格内容 |

- `dataIndex`：列的 dataIndex 值
- `rowKeyValue`：该行数据的 rowKey 字段值

---

## 代码示例

### 示例1：基础自定义单元格

为操作列添加自定义按钮。

**index.html**
```html
<template>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
    >
        <div slot="custom-cell-action-1" class="action-cell">
            <sl-button kwc:external size="small" variant="primary" onclick={handleEdit} data-id="1">编辑</sl-button>
            <sl-button kwc:external size="small" variant="danger" onclick={handleDelete} data-id="1">删除</sl-button>
        </div>
        <div slot="custom-cell-action-2" class="action-cell">
            <sl-button kwc:external size="small" variant="primary" onclick={handleEdit} data-id="2">编辑</sl-button>
            <sl-button kwc:external size="small" variant="danger" onclick={handleDelete} data-id="2">删除</sl-button>
        </div>
        <div slot="custom-cell-action-3" class="action-cell">
            <sl-button kwc:external size="small" variant="primary" onclick={handleEdit} data-id="3">编辑</sl-button>
            <sl-button kwc:external size="small" variant="danger" onclick={handleDelete} data-id="3">删除</sl-button>
        </div>
    </sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

export default class CustomCellTable extends KingdeeElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '年龄', dataIndex: 'age', width: 100 },
        { title: '邮箱', dataIndex: 'email', width: 200 },
        { title: '操作', dataIndex: 'action', width: 180, slot: true }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, email: 'zhangsan@example.com' },
        { id: '2', name: '李四', age: 28, email: 'lisi@example.com' },
        { id: '3', name: '王五', age: 35, email: 'wangwu@example.com' }
    ];

    handleEdit(event) {
        const id = event.target.dataset.id;
        console.log('编辑:', id);
    }

    handleDelete(event) {
        const id = event.target.dataset.id;
        console.log('删除:', id);
    }
}
```

**index.css**
```css
.action-cell {
    display: flex;
    gap: var(--sl-spacing-x-small);
}
```

---

### 示例2：多列自定义渲染

为多个列添加自定义渲染，如状态标签、头像等。

**index.html**
```html
<template>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
    >
        <!-- 状态列 -->
        <div slot="custom-cell-status-1" class="status-cell">
            <sl-tag kwc:external variant="success">在职</sl-tag>
        </div>
        <div slot="custom-cell-status-2" class="status-cell">
            <sl-tag kwc:external variant="danger">离职</sl-tag>
        </div>
        <div slot="custom-cell-status-3" class="status-cell">
            <sl-tag kwc:external variant="warning">休假</sl-tag>
        </div>
        
        <!-- 头像列 -->
        <div slot="custom-cell-avatar-1" class="avatar-cell">
            <sl-avatar kwc:external initials="张"></sl-avatar>
        </div>
        <div slot="custom-cell-avatar-2" class="avatar-cell">
            <sl-avatar kwc:external initials="李"></sl-avatar>
        </div>
        <div slot="custom-cell-avatar-3" class="avatar-cell">
            <sl-avatar kwc:external initials="王"></sl-avatar>
        </div>
    </sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/tag/tag.js';
import '@kdcloudjs/shoelace/dist/components/avatar/avatar.js';

export default class MultiCustomCellTable extends KingdeeElement {
    columns = [
        { title: '头像', dataIndex: 'avatar', width: 80, slot: true },
        { title: '姓名', dataIndex: 'name', width: 150 },
        { title: '部门', dataIndex: 'department', width: 120 },
        { title: '状态', dataIndex: 'status', width: 100, slot: true }
    ];

    dataSource = [
        { id: '1', name: '张三', department: '研发部', status: 'active' },
        { id: '2', name: '李四', department: '产品部', status: 'inactive' },
        { id: '3', name: '王五', department: '设计部', status: 'vacation' }
    ];
}
```

**index.css**
```css
.status-cell,
.avatar-cell {
    display: flex;
    align-items: center;
    justify-content: center;
}
```

---

### 示例3：动态数据的 slot 生成

使用 `for:each` 循环生成动态数据的 slot。

**index.html**
```html
<template>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
    >
        <template for:each={dataSource} for:item="row">
            <div key={row.id} slot={row.actionSlot} class="action-cell">
                <sl-button kwc:external 
                    size="small" 
                    variant="text" 
                    onclick={handleView}
                    data-id={row.id}
                >
                    查看
                </sl-button>
                <sl-button kwc:external 
                    size="small" 
                    variant="text"
                    onclick={handleEdit}
                    data-id={row.id}
                >
                    编辑
                </sl-button>
            </div>
        </template>
    </sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement, track } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

export default class DynamicSlotTable extends KingdeeElement {
    columns = [
        { title: '任务名称', dataIndex: 'task', width: 200 },
        { title: '负责人', dataIndex: 'owner', width: 120 },
        { title: '状态', dataIndex: 'status', width: 100 },
        { title: '操作', dataIndex: 'action', width: 150, slot: true }
    ];

    @track rawData = [
        { id: '1', task: '需求分析', owner: '张三', status: '进行中' },
        { id: '2', task: '技术设计', owner: '李四', status: '已完成' },
        { id: '3', task: '代码开发', owner: '王五', status: '待开始' },
        { id: '4', task: '测试验证', owner: '赵六', status: '待开始' }
    ];

    // 为每行数据生成 slot 名称
    get dataSource() {
        return this.rawData.map(item => ({
            ...item,
            actionSlot: `custom-cell-action-${item.id}`
        }));
    }

    handleView(event) {
        const id = event.target.dataset.id;
        const item = this.rawData.find(d => d.id === id);
        alert(`查看任务: ${item.task}`);
    }

    handleEdit(event) {
        const id = event.target.dataset.id;
        const item = this.rawData.find(d => d.id === id);
        alert(`编辑任务: ${item.task}`);
    }
}
```

**index.css**
```css
.action-cell {
    display: flex;
    gap: var(--sl-spacing-2x-small);
}
```

---

### 示例4：自定义单元格与数据联动

根据数据内容动态渲染不同的自定义内容。

**index.html**
```html
<template>
    <sl-table kwc:external
        row-key="id"
        columns={columns}
        data-source={dataSource}
    >
        <template for:each={dataSource} for:item="row">
            <div key={row.id} slot={row.progressSlot} class="progress-cell">
                <sl-progress-bar kwc:external value={row.progress}></sl-progress-bar>
                <span class="progress-text">{row.progress}%</span>
            </div>
        </template>
    </sl-table>
</template>
```

**index.js**
```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';
import '@kdcloudjs/shoelace/dist/components/progress-bar/progress-bar.js';

export default class DataBindingSlotTable extends KingdeeElement {
    columns = [
        { title: '项目名称', dataIndex: 'project', width: 200 },
        { title: '负责人', dataIndex: 'owner', width: 120 },
        { title: '进度', dataIndex: 'progress', width: 200, slot: true }
    ];

    rawData = [
        { id: '1', project: '项目A', owner: '张三', progress: 80 },
        { id: '2', project: '项目B', owner: '李四', progress: 45 },
        { id: '3', project: '项目C', owner: '王五', progress: 100 },
        { id: '4', project: '项目D', owner: '赵六', progress: 20 }
    ];

    get dataSource() {
        return this.rawData.map(item => ({
            ...item,
            progressSlot: `custom-cell-progress-${item.id}`
        }));
    }
}
```

**index.css**
```css
.progress-cell {
    display: flex;
    align-items: center;
    gap: var(--sl-spacing-x-small);
}
.progress-cell sl-progress-bar {
    flex: 1;
}
.progress-text {
    min-width: 40px;
    text-align: right;
    font-size: var(--sl-font-size-x-small);
    color: var(--sl-color-neutral-600);
}
```

---

## 注意事项

1. **Slot 名称格式**：必须严格遵循 `custom-cell-{dataIndex}-{rowKeyValue}` 格式
2. **rowKey 值**：slot 名称中的 rowKeyValue 是数据中 rowKey 字段的实际值
3. **动态生成 slot**：对于动态数据，建议在 dataSource 的 getter 中预先计算 slot 名称
4. **slot 内容为空**：如果某个 slot 没有提供内容，会显示该单元格的原始数据值
5. **性能考虑**：大量自定义单元格会增加 DOM 复杂度，大数据量时建议配合虚拟滚动

[返回目录](../index.md)
