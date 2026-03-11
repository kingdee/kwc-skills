# 受控排序筛选

[返回目录](../index.md)

## 功能说明

通过 `sortOrder`、`filteredValue` + `onChange` 实现受控排序/筛选，适用于服务端联动。

## 示例代码（React）

```jsx
import React, { useState, useMemo } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

export default () => {
  const [sorting, setSorting] = useState({});
  const [filters, setFilters] = useState({ name: [] });

  const dataSource = [
    { id: "1", no: 1, name: "Alice" },
    { id: "2", no: 2, name: "Bob" },
  ];

  const columns = useMemo(() => {
    return [
      {
        dataIndex: "no",
        title: "#",
        width: 60,
        sorter: () => null,
        sortOrder: sorting.no || "",
      },
      {
        dataIndex: "name",
        title: "姓名",
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortOrder: sorting.name || "",
        filters: [
          { text: "Alice", value: "Alice" },
          { text: "Bob", value: "Bob" },
        ],
        filteredValue: filters.name || [],
        onFilter: () => true,
      },
    ];
  }, [sorting, filters]);

  const handleChange = (e) => {
    const { changeType, sorting: newSorting, columnFilters } = e.detail || {};
    if (changeType === "sorter") {
      const next = {};
      (newSorting || []).forEach((s) => {
        next[s.id] = s.desc ? "desc" : "asc";
      });
      setSorting(next);
    }
    if (changeType === "filters") {
      const next = {};
      (columnFilters || []).forEach((f) => {
        next[f.id] = f.value;
      });
      setFilters(next);
    }
  };

  return (
    <SlTable
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      onChange={handleChange}
    />
  );
};
```

---

## 注意事项

1. **受控模式切换**：一旦设置了 `sortOrder` 或 `filteredValue`，该列就进入受控模式，组件不会自动排序/筛选
2. **必须配合回调使用**：受控模式下需要使用 `onChange` 事件并手动更新状态
3. **清空受控值**：将 `sortOrder` 设为 `null`、`filteredValue` 设为空数组可清除对应状态
