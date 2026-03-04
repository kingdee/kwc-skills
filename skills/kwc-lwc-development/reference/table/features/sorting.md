# 列排序

[返回目录](../SKILL.md)

## 功能说明

Table 组件支持列排序功能，通过在列配置中设置 `sorter` 函数开启。支持升序（asc）和降序（desc）两种排序方向，可通过 `defaultSortOrder` 设置默认排序方向，通过监听 `change` 事件获取排序状态变化。

## API 属性

### Column 排序配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `sorter` | 排序函数，接收两行数据，返回比较结果 | `(a, b) => number` | - |
| `defaultSortOrder` | 默认排序方向 | `'asc' \| 'desc'` | - |
| `sortOrder` | 受控的排序方向 | `'asc' \| 'desc'` | - |

### change 事件 detail

| 属性 | 说明 | 类型 |
|------|------|------|
| `sorting` | 当前排序状态数组 | `{ id: string, desc: boolean }[]` |
| `changeType` | 变化类型，排序时为 `'sorter'` | `string` |

---

## 代码示例

### 示例1：基础排序

在列配置中设置 `sorter` 函数，点击表头即可切换排序状态。

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

export default class SortableTable extends LightningElement {
    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { 
            title: '年龄', 
            dataIndex: 'age', 
            width: 100,
            sorter: (a, b) => a.age - b.age  // 数字排序
        },
        { 
            title: '入职日期', 
            dataIndex: 'hireDate', 
            width: 150,
            sorter: (a, b) => new Date(a.hireDate) - new Date(b.hireDate)  // 日期排序
        },
        { title: '地址', dataIndex: 'address' }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, hireDate: '2020-03-15', address: '北京市朝阳区' },
        { id: '2', name: '李四', age: 28, hireDate: '2021-07-20', address: '上海市浦东新区' },
        { id: '3', name: '王五', age: 35, hireDate: '2019-01-10', address: '广州市天河区' },
        { id: '4', name: '赵六', age: 26, hireDate: '2022-11-05', address: '深圳市南山区' }
    ];
}
```

---

### 示例2：默认排序方向

通过 `defaultSortOrder` 设置列的初始排序方向。

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

export default class DefaultSortTable extends LightningElement {
    columns = [
        { title: '商品名称', dataIndex: 'name', width: 200 },
        { 
            title: '价格', 
            dataIndex: 'price', 
            width: 120,
            sorter: (a, b) => a.price - b.price,
            defaultSortOrder: 'asc'  // 默认按价格升序
        },
        { 
            title: '销量', 
            dataIndex: 'sales', 
            width: 120,
            sorter: (a, b) => a.sales - b.sales
        },
        { title: '描述', dataIndex: 'description' }
    ];

    dataSource = [
        { id: '1', name: '商品A', price: 299, sales: 1500, description: '热销商品' },
        { id: '2', name: '商品B', price: 199, sales: 800, description: '新品上市' },
        { id: '3', name: '商品C', price: 599, sales: 2000, description: '旗舰款' },
        { id: '4', name: '商品D', price: 99, sales: 500, description: '特价商品' }
    ];
}
```

---

### 示例3：多列定义 sorter

多列都可以定义排序函数，但同一时间只有一列处于排序状态。

**index.html**
```html
<template>
    <p class="tip">点击不同列头切换排序列，同时只有一列生效</p>
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

export default class MultiSorterTable extends LightningElement {
    columns = [
        { 
            title: '姓名', 
            dataIndex: 'name', 
            width: 150,
            sorter: (a, b) => a.name.localeCompare(b.name, 'zh-CN')  // 中文拼音排序
        },
        { 
            title: '年龄', 
            dataIndex: 'age', 
            width: 100,
            sorter: (a, b) => a.age - b.age
        },
        { 
            title: '工资', 
            dataIndex: 'salary', 
            width: 120,
            sorter: (a, b) => a.salary - b.salary
        },
        { 
            title: '绩效分', 
            dataIndex: 'score', 
            width: 100,
            sorter: (a, b) => a.score - b.score
        }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, salary: 15000, score: 85 },
        { id: '2', name: '李四', age: 28, salary: 12000, score: 92 },
        { id: '3', name: '王五', age: 35, salary: 20000, score: 78 },
        { id: '4', name: '赵六', age: 26, salary: 10000, score: 95 }
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

### 示例4：排序状态变化监听

通过监听 `change` 事件，获取当前排序状态。

**index.html**
```html
<template>
    <div class="sort-info">
        <p>当前排序列: {sortColumn}</p>
        <p>排序方向: {sortDirection}</p>
    </div>
    <sl-table
        row-key="id"
        columns={columns}
        data-source={dataSource}
        onchange={handleChange}
    ></sl-table>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/table/table.js';

export default class SortChangeTable extends LightningElement {
    @track sortColumn = '无';
    @track sortDirection = '无';

    columns = [
        { title: '姓名', dataIndex: 'name', width: 150 },
        { 
            title: '年龄', 
            dataIndex: 'age', 
            width: 100,
            sorter: (a, b) => a.age - b.age
        },
        { 
            title: '工资', 
            dataIndex: 'salary', 
            width: 120,
            sorter: (a, b) => a.salary - b.salary
        }
    ];

    dataSource = [
        { id: '1', name: '张三', age: 32, salary: 15000 },
        { id: '2', name: '李四', age: 28, salary: 12000 },
        { id: '3', name: '王五', age: 35, salary: 20000 }
    ];

    handleChange(event) {
        const { sorting, changeType } = event.detail;
        
        if (changeType === 'sorter') {
            if (sorting && sorting.length > 0) {
                const sort = sorting[0];
                this.sortColumn = sort.id;
                this.sortDirection = sort.desc ? '降序' : '升序';
            } else {
                this.sortColumn = '无';
                this.sortDirection = '无';
            }
        }
    }
}
```

**index.css**
```css
.sort-info {
    margin-bottom: 16px;
    padding: 12px;
    background: #f5f5f5;
    border-radius: 4px;
}
.sort-info p {
    margin: 4px 0;
}
```

---

## 注意事项

1. **sorter 函数返回值**：返回负数表示 a 在 b 前面，返回正数表示 a 在 b 后面，返回 0 表示相等
2. **单列排序**：当前实现同一时间只支持单列排序，点击其他列会取消之前的排序
3. **排序图标**：有排序功能的列会显示排序图标，当前排序方向的图标会高亮
4. **字符串排序**：对于中文字符串排序，建议使用 `localeCompare` 方法
5. **日期排序**：日期类型需要转换为 Date 对象或时间戳进行比较

[返回目录](../SKILL.md)
