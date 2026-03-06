# 可编辑单元格

[返回目录](../index.md)

## 功能说明

通过 `generateCustomSlot` 和 `onCell` 配合实现可编辑单元格。点击单元格进入编辑模式，支持输入框、选择器、多行文本等不同编辑组件。

---

## 代码示例

### 示例1：可编辑单元格

点击单元格进入编辑模式，支持 Input、Select、Textarea 三种编辑组件。

```jsx
import React, { useEffect, useState, useMemo } from "react";
import {
  dataSource as editableDataSource,
  columns as editableColumns,
} from "./editable.js";
import { generateCustomSlot } from "@kdcloudjs/shoelace/dist/components/table/utils.js";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';
import SlTextarea from '@kdcloudjs/shoelace/dist/react/textarea/index.js';
import SlInput from '@kdcloudjs/shoelace/dist/react/input/index.js';
import SlSelect from '@kdcloudjs/shoelace/dist/react/select/index.js';
import SlOption from '@kdcloudjs/shoelace/dist/react/option/index.js';
import "./editTable.less";

const EditCell = (props) => {
  const {
    slotName,
    cellInfo,
    colKey,
    editing,
    handleCellValueChange,
  } = props;

  const editCell = useMemo(() => {
    switch (colKey) {
      case "name":
        return (
          <SlInput
            autofocus
            value={cellInfo}
            onSlChange={(e) => handleCellValueChange(e.target.value)}
          />
        );
      case "salary":
        return (
          <SlSelect
            defaultValue={cellInfo}
            onSlChange={(e) => handleCellValueChange(e.target.value)}
          >
            <SlOption value="12000">12000</SlOption>
            <SlOption value="15000">15000</SlOption>
            <SlOption value="18000">18000</SlOption>
            <SlOption value="20000">20000</SlOption>
            <SlOption value="24000">24000</SlOption>
          </SlSelect>
        );
      case "address":
        return (
          <SlTextarea
            value={cellInfo}
            onSlChange={(e) => handleCellValueChange(e.target.value)}
          />
        );
      default:
        return (
          <SlInput
            value={cellInfo}
            onSlChange={(e) => handleCellValueChange(e.target.value)}
          />
        );
    }
  }, [props]);

  return (
    <div slot={slotName} className="table-custom-cell">
      {editing ? editCell : <div className="table-editClass">{cellInfo}</div>}
    </div>
  );
};

export default () => {
  const [dataSource, setDataSource] = useState(editableDataSource);
  const [editKey, setEditKey] = useState("");

  const handleOnCell = (record, index, colKey) => {
    return {
      onclick: (e) => {
        e?.stopPropagation();
        setEditKey(`${colKey}-${index}`);
      },
    };
  };

  const [columns, setColumns] = useState(
    editableColumns.map((col) => ({
      ...col,
      onCell: col.slot
        ? (record, rowIndex) => handleOnCell(record, rowIndex, col.dataIndex)
        : undefined,
    })),
  );

  const handleCellValueChange = (value, index, colKey) => {
    const newData = [...dataSource];
    newData[index][colKey] = value;
    setDataSource(newData);
  };

  const handleGetCustomSlot = useMemo(
    () =>
      generateCustomSlot(
        "id",
        dataSource,
        columns
          .filter((f) => f.slot)
          .map((col) => ({
            type: "customCell",
            columnId: col.dataIndex,
            callback: (props) => {
              const editing = editKey === `${col.dataIndex}-${props.rowIndex}`;
              return (
                <EditCell
                  key={props.slotName}
                  handleCellValueChange={(value) =>
                    handleCellValueChange(value, props.rowIndex, col.dataIndex)
                  }
                  colKey={col.dataIndex}
                  editing={editing}
                  {...props}
                />
              );
            },
          })),
      ),
    [dataSource, columns, editKey],
  );

  useEffect(() => {
    document.addEventListener("click", () => setEditKey(""));
    return () => document.removeEventListener("click", () => setEditKey(""));
  }, []);

  const style = {
    width: "70%",
    margin: "0 auto",
    padding: "20px",
  };
  return (
    <div style={style}>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource}>
        {handleGetCustomSlot}
      </SlTable>
    </div>
  );
};
```

---

## 注意事项

1. **onCell 回调**：通过列的 `onCell` 返回包含 `onclick` 的对象来触发编辑模式
2. **点击外部退出编辑**：通过 `document.addEventListener("click", ...)` 监听全局点击，退出编辑模式
3. **stopPropagation**：编辑区域点击时需要 `stopPropagation()` 防止冒泡导致立即退出编辑
4. **样式文件**：可编辑表格的样式定义在 `editTable.less` 中

[返回目录](../index.md)
