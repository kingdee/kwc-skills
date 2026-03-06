# 自定义单元格

[返回目录](../index.md)

## 功能说明

可通过 `slot` 方式传入自定义渲染组件，实现对单元格的自定义渲染。在列定义中指定 `slot: true`，再通过调用 `generateCustomSlot` 函数，传入 `rowKey` 和 `dataSource`，即可生成自定义渲染的 `slotName`。

## API

### generateCustomSlot 工具函数

```jsx
import { generateCustomSlot } from "@kdcloudjs/shoelace/dist/components/table/utils.js";

// 用法
generateCustomSlot(rowKeyField, dataSource, customSlotConfigs);
```

| 参数 | 说明 | 类型 |
|------|------|------|
| `rowKeyField` | 行唯一标识字段名 | `string` |
| `dataSource` | 表格数据源 | `TData[]` |
| `customSlotConfigs` | 自定义 slot 配置数组 | `CustomSlotConfig[]` |

### CustomSlotConfig 配置

| 属性 | 说明 | 类型 |
|------|------|------|
| `type` | slot 类型 | `'customCell' \| 'customRow'` |
| `columnId` | 列标识（type 为 customCell 时必填） | `string` |
| `callback` | 渲染回调函数 | `(props) => ReactNode` |

callback 参数 props 包含：`slotName`、`rowInfo`（行数据）、`cellInfo`（单元格值）、`rowIndex`

---

## 代码示例

### 示例1：自定义单元格渲染

通过 `generateCustomSlot` 自定义渲染单元格，包括徽章、头像、操作按钮等。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';
import SlBadge from '@kdcloudjs/shoelace/dist/react/badge/index.js';
import SlAvatar from '@kdcloudjs/shoelace/dist/react/avatar/index.js';
import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';
import SlIconButton from '@kdcloudjs/shoelace/dist/react/icon-button/index.js';
import { generateCustomSlot } from "@kdcloudjs/shoelace/dist/components/table/utils.js";
import { dataSource as customDataSource, columns } from "./customCell";

const CustomCell = (props) => {
  return (
    <div slot={props.slot} key={props.slot}>
      <SlAvatar
        initials={props.cell.slice(0, 1)}
        style={{ "--size": "32px" }}
      />
      <span style={{ marginLeft: "8px" }}>{props.cell}</span>
    </div>
  );
};

export default () => {
  const style = {
    width: "70%",
    margin: "0 auto",
    padding: "20px",
  };

  const [dataSource, setDataSource] = React.useState(customDataSource);

  const handleDeleteRow = (row) => {
    setDataSource(dataSource.filter((item) => item.id !== row.id));
  };

  const handleGetCustomSlot = React.useMemo(
    () =>
      generateCustomSlot("id", dataSource, [
        {
          type: "customCell",
          columnId: "No",
          callback: ({ slotName, cellInfo }) => (
            <div slot={slotName} key={slotName}>
              <SlBadge pill pulse>
                {cellInfo}
              </SlBadge>
            </div>
          ),
        },
        {
          type: "customCell",
          columnId: "action",
          callback: ({ slotName, rowInfo }) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                padding: "18px",
              }}
              slot={slotName}
              key={slotName}
            >
              <SlIconButton
                style={{
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                name="trash"
                onClick={() => handleDeleteRow(rowInfo)}
              />
            </div>
          ),
        },
        {
          type: "customCell",
          columnId: "from",
          callback: ({ slotName, cellInfo }) => (
            <CustomCell
              slot={slotName}
              key={slotName}
              cell={cellInfo}
            />
          ),
        },
        {
          type: "customCell",
          columnId: "to",
          callback: ({ slotName, cellInfo }) => (
            <CustomCell
              slot={slotName}
              key={slotName}
              cell={cellInfo}
            />
          ),
        },
      ]),
    [dataSource, columns],
  );

  return (
    <div style={style}>
      <SlButton
        onClick={() => setDataSource(customDataSource)}
        style={{ marginBottom: "12px" }}
        variant="primary"
      >
        重置
      </SlButton>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource}>
        {handleGetCustomSlot}
      </SlTable>
    </div>
  );
};
```

---

## 注意事项

1. **slot 属性**：列定义中必须设置 `slot: true` 才能启用自定义渲染
2. **slotName**：`generateCustomSlot` 自动生成符合 `custom-cell-{dataIndex}-{rowKeyValue}` 格式的 slot 名称
3. **key 属性**：每个自定义渲染的元素必须设置 `key` 属性以确保 React 正确 diff
4. **useMemo**：建议使用 `useMemo` 缓存 `generateCustomSlot` 的结果，避免不必要的重渲染

[返回目录](../index.md)
