# 可编辑单元格

[返回目录](../index.md)

## 功能说明

通过 `slot` 渲染输入框实现单元格编辑，点击进入编辑态，失焦后保存。

## 示例代码（React）

```jsx
import React, { useState, useMemo } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';
import SlInput from '@kdcloudjs/shoelace/dist/react/input/index.js';
import { generateCustomSlot } from "@kdcloudjs/shoelace/dist/components/table/utils.js";

export default () => {
  const [editKey, setEditKey] = useState('');
  const [dataSource, setDataSource] = useState([
    { id: '1', name: 'Jane Doe', salary: '18000', address: 'London' },
    { id: '2', name: 'Alisa Ross', salary: '24000', address: 'Paris' }
  ]);

  const columns = [
    { title: '姓名', dataIndex: 'name', slot: true },
    { title: '薪资', dataIndex: 'salary', slot: true },
    { title: '地址', dataIndex: 'address', slot: true }
  ];

  const handleCellClick = (rowIndex, colKey) => {
    setEditKey(`custom-cell-${colKey}-${rowIndex}`);
  };

  const handleInputChange = (value, rowIndex, colKey) => {
    const next = [...dataSource];
    next[Number(rowIndex)] = {
      ...next[Number(rowIndex)],
      [colKey]: value
    };
    setDataSource(next);
  };

  const handleInputBlur = () => {
    setEditKey('');
  };

  const cellSlots = useMemo(() => {
    return generateCustomSlot(
      "id",
      dataSource,
      columns
        .filter((f) => f.slot)
        .map((col) => ({
          type: "customCell",
          columnId: col.dataIndex,
          callback: (props) => {
            const editing = editKey === `custom-cell-${col.dataIndex}-${props.rowIndex}`;
            return (
              <div
                key={props.slotName}
                slot={props.slotName}
                onClick={() => handleCellClick(props.rowIndex, col.dataIndex)}
              >
                {editing ? (
                  <SlInput
                    autoFocus
                    value={props.record[col.dataIndex]}
                    onSlChange={(e) => handleInputChange(e.target.value, props.rowIndex, col.dataIndex)}
                    onSlBlur={handleInputBlur}
                  />
                ) : (
                  <div>{props.record[col.dataIndex]}</div>
                )}
              </div>
            );
          },
        })),
    );
  }, [dataSource, editKey]);

  return (
    <SlTable rowKey="id" columns={columns} dataSource={dataSource}>
      {cellSlots}
    </SlTable>
  );
};
```

---

## 注意事项

1. **Slot 名称格式**：必须严格遵循 `custom-cell-{dataIndex}-{rowKeyValue}` 格式
2. **rowKey 值**：slot 名称中的 rowKeyValue 是数据中 rowKey 字段的实际值
3. **性能考虑**：大量自定义单元格会增加 DOM 复杂度，大数据量时建议配合虚拟滚动
