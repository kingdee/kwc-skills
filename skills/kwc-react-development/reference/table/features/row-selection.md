# 行选择

[返回目录](../index.md)

## 功能说明

第一列是联动的选择框，可以通过 `rowSelection.type` 属性指定选择类型，默认为 checkbox。

## API 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `type` | 选择类型 | `'checkbox' \| 'radio'` | `'checkbox'` |
| `hidden` | 是否隐藏选择列 | `boolean` | `false` |
| `width` | 选择列宽度 | `number` | `50` |
| `disabled` | 表头全选是否禁用 | `boolean` | `false` |
| `defaultSelectedRowKeys` | 默认选中的行 key 数组 | `string[]` | - |
| `onChange` | 选择变化回调 | `(selectedRowKeys, selectedRows) => void` | - |
| `onSelect` | 点击行选择框回调 | `(record, selected, selectedRows, event) => void` | - |
| `onSelectAll` | 全选框变化回调 | `(selected, selectedRows) => void` | - |
| `getCheckboxProps` | 自定义选择框属性 | `(record) => object` | - |

---

## 代码示例

### 示例1：Checkbox / Radio 切换

通过 `rowSelection.type` 在 checkbox 和 radio 之间切换。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';
import SlRadioGroup from '@kdcloudjs/shoelace/dist/react/radio-group/index.js';
import SlRadioButton from '@kdcloudjs/shoelace/dist/react/radio-button/index.js';
import { dataSource, columns } from "./data";

export default () => {
  const style = {
    width: "70%",
    margin: "0 auto",
    padding: "20px",
  };

  const [rowSelection, setRowSelection] = React.useState({
    type: "checkbox",
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `onChange selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows,
      );
    },
    onSelectAll: (selected, selectedRows) => {
      console.log(`select all rows: ${selected}`, selectedRows);
    },
    onSelect: (record, selected, selectedRows, nativeEvent) => {
      console.log(
        `onSelect select row: ${selected}`,
        record,
        selectedRows,
        nativeEvent,
      );
    },
  });

  return (
    <div style={style}>
      <SlRadioGroup value={rowSelection.type} style={{ marginBottom: "20px" }}>
        <SlRadioButton
          value="checkbox"
          onClick={() => setRowSelection({ ...rowSelection, type: "checkbox" })}
        >
          Checkbox
        </SlRadioButton>
        <SlRadioButton
          value="radio"
          onClick={() => setRowSelection({ ...rowSelection, type: "radio" })}
        >
          Radio
        </SlRadioButton>
      </SlRadioGroup>
      <SlTable
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};
```

---

## 注意事项

1. **rowKey 必须设置**：行选择功能依赖 `rowKey` 来唯一标识每行
2. **回调函数**：`onChange` 在每次选择变化时都会触发，`onSelect` 仅在用户手动点击选择框时触发
3. **radio 模式**：radio 模式下只能选中一行，切换选中会自动取消上一行

[返回目录](../index.md)
