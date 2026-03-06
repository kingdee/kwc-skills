# 过滤排序

[返回目录](../index.md)

## 功能说明

Table 组件支持列排序和筛选功能。排序通过列配置的 `sorter` 函数开启，筛选通过 `filters` 和 `onFilter` 配置。支持非受控模式（组件内部管理状态）和受控模式（外部管理 `sortOrder`、`filteredValue`）。

## API 属性

### Column 排序配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `sorter` | 排序函数 | `(a, b) => number` | - |
| `defaultSortOrder` | 默认排序方向 | `'asc' \| 'desc'` | - |
| `sortOrder` | 受控的排序方向 | `'asc' \| 'desc'` | - |

### Column 筛选配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `filters` | 筛选项配置 | `{ text: string; value: any }[]` | - |
| `onFilter` | 筛选函数 | `(value, record) => boolean` | - |
| `filterMultiple` | 是否支持多选筛选 | `boolean` | `true` |
| `defaultFilters` | 默认筛选值 | `string[]` | - |
| `filteredValue` | 受控的筛选值 | `string[]` | - |

---

## 代码示例

### 示例1：非受控排序与筛选

排序和筛选完全由组件内部管理。通过 `sorter` 开启排序，`filters` + `onFilter` 开启筛选。引用外部数据文件 `filterAndSort.js`。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';
import { dataSource, sortAndFilterColumns } from "./filterAndSort";

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable
        rowKey="id"
        columns={sortAndFilterColumns}
        dataSource={dataSource}
      />
    </div>
  );
};
```

> **数据文件 `filterAndSort.js` 说明**：
> - `序号` 列：设置了 `defaultSortOrder: 'desc'` 和 `sorter`，默认按序号降序排列
> - `单据号` 列：设置了 `sorter` 和 `filters`（含 `onFilter`），同时支持排序和筛选
> - `来户` 列：设置了 `filters`、`defaultFilters: ['004']` 和 `filterMultiple: false`，默认筛选且单选模式

---

### 示例2：受控排序与筛选

外部管理排序和筛选状态。通过 `onChange` 事件获取变化，更新受控的 `sortOrder` / `filteredValue`。引用外部数据文件 `filterAndSortTwo.js`。

```jsx
import React, { useState, useMemo } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';
import { dataSource, sortAndFilterColumns as baseColumns } from "./filterAndSortTwo";

export default () => {
  const [sortInfo, setSortInfo] = useState({ columnId: "No", desc: false });
  const [filterInfo, setFilterInfo] = useState([]);

  const columns = useMemo(() => {
    return baseColumns.map((col) => {
      const colCopy = { ...col };

      // 受控排序
      if (col.dataIndex === sortInfo.columnId) {
        colCopy.sortOrder = sortInfo.desc ? "desc" : "asc";
      } else if (col.sorter) {
        colCopy.sortOrder = undefined;
      }

      // 受控筛选
      const matchFilter = filterInfo.find((f) => f.id === col.dataIndex);
      if (matchFilter) {
        colCopy.filteredValue = matchFilter.value;
      }

      return colCopy;
    });
  }, [sortInfo, filterInfo]);

  const handleChange = (e) => {
    const { sorting, columnFilters, changeType } = e.detail;
    if (changeType === "sorter" && sorting?.length > 0) {
      setSortInfo({ columnId: sorting[0].id, desc: sorting[0].desc });
    }
    if (changeType === "filters") {
      setFilterInfo(columnFilters || []);
    }
  };

  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <div style={{ marginBottom: "12px", padding: "8px", background: "#f5f5f5", borderRadius: "4px" }}>
        <p style={{ margin: "4px 0" }}>排序列: {sortInfo.columnId || "无"}</p>
        <p style={{ margin: "4px 0" }}>排序方向: {sortInfo.desc ? "降序" : "升序"}</p>
        <p style={{ margin: "4px 0" }}>筛选: {filterInfo.length > 0 ? JSON.stringify(filterInfo) : "无"}</p>
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

> **受控模式说明**：
> - `sortOrder`：设置后列进入受控排序模式，需通过 `onChange` 手动更新
> - `filteredValue`：设置后列进入受控筛选模式，需通过 `onChange` 手动更新
> - `onChange`：Table 的 React wrapper **已映射** `change` 事件，可直接在 JSX 使用 `onChange`

---

## 注意事项

1. **sorter 返回值**：返回负数表示 a 在 b 前面，正数表示 a 在 b 后面，0 表示相等
2. **单列排序**：当前同一时间只支持单列排序，点击其他列会取消之前的排序
3. **filters 和 onFilter 配合使用**：必须同时配置 `filters` 和 `onFilter` 才能使筛选功能生效
4. **多选筛选逻辑**：多选模式下，只要满足任一筛选条件即显示该行（OR 逻辑）
5. **onChange 事件**：排序筛选变化都会触发 `onChange`，通过 `e.detail.changeType` 区分 `'sorter'` 或 `'filters'`
6. **非受控 vs 受控**：
   - 非受控：使用 `defaultSortOrder` / `defaultFilters`，由组件内部管理
   - 受控：使用 `sortOrder` / `filteredValue`，需手动通过 `onChange` 更新

[返回目录](../index.md)
