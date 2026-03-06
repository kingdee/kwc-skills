# 排序

[返回目录](../index.md)

## 功能说明

Table 组件支持列排序功能，通过列配置的 `sorter` 函数开启。支持非受控模式（组件内部管理状态）和受控模式（外部管理 `sortOrder`）。

> **注意**：此文档专注于排序功能。排序与筛选的综合使用场景请参考 [filter-sort.md](./filter-sort.md)。

## API 属性

### Column 排序配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `sorter` | 排序函数 | `(a, b) => number` | - |
| `defaultSortOrder` | 默认排序方向（非受控） | `'asc' \| 'desc'` | - |
| `sortOrder` | 受控的排序方向 | `'asc' \| 'desc'` | - |

### onChange 事件

| 字段 | 说明 | 类型 |
|------|------|------|
| `e.detail.sorting` | 当前排序状态 | `{ id: string, desc: boolean }[]` |
| `e.detail.changeType` | 变化类型（排序时为 `'sorter'`） | `string` |

---

## 代码示例

### 示例1：非受控排序

`sorter` 开启排序，`defaultSortOrder` 设置默认排序方向，由组件内部管理状态。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 100,
    sorter: (a, b) => a.age - b.age,
    defaultSortOrder: 'asc'
  },
  {
    title: '薪资',
    dataIndex: 'salary',
    width: 120,
    sorter: (a, b) => a.salary - b.salary
  },
  { title: '部门', dataIndex: 'department', width: 120 }
];

const dataSource = [
  { id: '1', name: '张三', age: 28, salary: 12000, department: '研发部' },
  { id: '2', name: '李四', age: 35, salary: 18000, department: '产品部' },
  { id: '3', name: '王五', age: 25, salary: 9000, department: '设计部' },
  { id: '4', name: '赵六', age: 32, salary: 15000, department: '研发部' },
  { id: '5', name: '钱七', age: 29, salary: 11000, department: '市场部' }
];

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource} />
    </div>
  );
};
```

---

### 示例2：受控排序

通过 `onChange` 获取排序变化，外部维护 `sortOrder` 受控状态。

```jsx
import React, { useState, useMemo, useCallback } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const baseColumns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    title: '薪资',
    dataIndex: 'salary',
    width: 120,
    sorter: (a, b) => a.salary - b.salary
  },
  { title: '部门', dataIndex: 'department', width: 120 }
];

const dataSource = [
  { id: '1', name: '张三', age: 28, salary: 12000, department: '研发部' },
  { id: '2', name: '李四', age: 35, salary: 18000, department: '产品部' },
  { id: '3', name: '王五', age: 25, salary: 9000, department: '设计部' },
  { id: '4', name: '赵六', age: 32, salary: 15000, department: '研发部' },
  { id: '5', name: '钱七', age: 29, salary: 11000, department: '市场部' }
];

export default () => {
  const [sortInfo, setSortInfo] = useState({ columnId: null, desc: false });

  const columns = useMemo(() => {
    return baseColumns.map(col => {
      const colCopy = { ...col };
      if (col.sorter) {
        if (col.dataIndex === sortInfo.columnId) {
          colCopy.sortOrder = sortInfo.desc ? 'desc' : 'asc';
        } else {
          colCopy.sortOrder = undefined;
        }
      }
      return colCopy;
    });
  }, [sortInfo]);

  const handleChange = useCallback((e) => {
    const { sorting, changeType } = e.detail;
    if (changeType === 'sorter') {
      if (sorting?.length > 0) {
        setSortInfo({ columnId: sorting[0].id, desc: sorting[0].desc });
      } else {
        setSortInfo({ columnId: null, desc: false });
      }
    }
  }, []);

  const infoStyle = {
    marginBottom: "12px", padding: "8px",
    background: "#f5f5f5", borderRadius: "4px", fontSize: "14px"
  };
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <div style={infoStyle}>
        排序列: {sortInfo.columnId || "无"} &nbsp;|&nbsp;
        方向: {sortInfo.columnId ? (sortInfo.desc ? "降序" : "升序") : "-"}
      </div>
      <SlTable
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        onChange={handleChange}
      />
    </div>
  );
};
```

---

### 示例3：字符串排序

对字符串类型的列进行排序，使用 `localeCompare`。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 150,
    sorter: (a, b) => a.name.localeCompare(b.name, 'zh-CN')
  },
  {
    title: '城市',
    dataIndex: 'city',
    width: 150,
    sorter: (a, b) => a.city.localeCompare(b.city, 'zh-CN')
  },
  { title: '年龄', dataIndex: 'age', width: 100 }
];

const dataSource = [
  { id: '1', name: '张三', city: '上海', age: 28 },
  { id: '2', name: '李四', city: '北京', age: 35 },
  { id: '3', name: '王五', city: '广州', age: 25 },
  { id: '4', name: '赵六', city: '深圳', age: 32 },
  { id: '5', name: '陈七', city: '杭州', age: 29 }
];

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource} />
    </div>
  );
};
```

---

## 注意事项

1. **sorter 返回值**：返回负数表示 a 在 b 前面，正数表示 a 在 b 后面，0 表示相等
2. **单列排序**：当前同一时间只支持单列排序，点击其他列会取消之前的排序
3. **非受控 vs 受控**：
   - 非受控：使用 `defaultSortOrder`，由组件内部管理
   - 受控：使用 `sortOrder`，需手动通过 `onChange` 更新
4. **onChange 已映射**：Table 的 React wrapper 已映射 `change` 事件为 `onChange`，可直接在 JSX 使用
5. **useMemo 缓存**：受控模式下，columns 依赖 sortInfo 状态，使用 `useMemo` 避免不必要的重新计算

[返回目录](../index.md)
