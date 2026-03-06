# 动态数据更新

[返回目录](../index.md)

## 功能说明

Table 组件支持动态更新数据源，包括添加数据、删除数据、清空并重新加载等操作。在 React 中，使用 `useState` 管理数据，通过创建新数组触发组件重渲染。

---

## 代码示例

### 示例1：添加数据

动态向表格添加新数据行。

```jsx
import React, { useState, useCallback } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '部门', dataIndex: 'department' }
];

let counter = 3;

export default () => {
  const [dataSource, setDataSource] = useState([
    { id: '1', name: '张三', age: 28, department: '研发部' },
    { id: '2', name: '李四', age: 32, department: '产品部' }
  ]);

  const handleAdd = useCallback(() => {
    const newItem = {
      id: String(counter),
      name: `新员工${counter}`,
      age: 20 + Math.floor(Math.random() * 20),
      department: ['研发部', '产品部', '设计部'][Math.floor(Math.random() * 3)]
    };
    setDataSource(prev => [...prev, newItem]);
    counter++;
  }, []);

  const handleAddMultiple = useCallback(() => {
    const newItems = Array.from({ length: 5 }, (_, i) => ({
      id: String(counter + i),
      name: `批量员工${counter + i}`,
      age: 20 + Math.floor(Math.random() * 20),
      department: ['研发部', '产品部', '设计部'][Math.floor(Math.random() * 3)]
    }));
    setDataSource(prev => [...prev, ...newItems]);
    counter += 5;
  }, []);

  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  const toolbarStyle = {
    display: "flex",
    alignItems: "center",
    gap: "var(--sl-spacing-small)",
    marginBottom: "var(--sl-spacing-medium)"
  };
  const btnStyle = { marginRight: "8px", cursor: "pointer" };
  const countStyle = { color: "var(--sl-color-neutral-600)", fontSize: "var(--sl-font-size-small)" };
  return (
    <div style={style}>
      <div style={toolbarStyle}>
        <button style={btnStyle} onClick={handleAdd}>添加一行</button>
        <button style={btnStyle} onClick={handleAddMultiple}>添加多行</button>
        <span style={countStyle}>共 {dataSource.length} 条数据</span>
      </div>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource} />
    </div>
  );
};
```

---

### 示例2：删除数据

从表格中删除指定数据行，结合 `generateCustomSlot` 渲染操作列。

```jsx
import React, { useState, useCallback } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';
import { generateCustomSlot } from "@kdcloudjs/shoelace/dist/components/table/utils.js";

const getColumns = (onDelete) => [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '邮箱', dataIndex: 'email', width: 250 },
  { title: '操作', dataIndex: 'action', width: 100, slot: true }
];

export default () => {
  const [dataSource, setDataSource] = useState([
    { id: '1', name: '张三', email: 'zhangsan@example.com' },
    { id: '2', name: '李四', email: 'lisi@example.com' },
    { id: '3', name: '王五', email: 'wangwu@example.com' },
    { id: '4', name: '赵六', email: 'zhaoliu@example.com' }
  ]);

  const handleDelete = useCallback((id) => {
    setDataSource(prev => prev.filter(item => item.id !== id));
  }, []);

  const columns = getColumns(handleDelete);

  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource}>
        {dataSource.map(row =>
          generateCustomSlot(
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={{ color: "var(--sl-color-danger-600)", cursor: "pointer", border: "none", background: "none" }}
                onClick={() => handleDelete(row.id)}
              >
                删除
              </button>
            </div>,
            `custom-cell-action-${row.id}`
          )
        )}
      </SlTable>
    </div>
  );
};
```

---

### 示例3：清空并重新加载

清空表格数据并重新加载。

```jsx
import React, { useState, useEffect, useCallback } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '任务名称', dataIndex: 'task', width: 200 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '创建时间', dataIndex: 'createdAt' }
];

async function fetchData() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const now = new Date();
  return Array.from({ length: 10 }, (_, index) => ({
    id: String(index + 1),
    task: `任务${index + 1}`,
    status: ['待处理', '进行中', '已完成'][index % 3],
    createdAt: new Date(now - index * 86400000).toLocaleDateString()
  }));
}

export default () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setDataSource([]);
    const data = await fetchData();
    setDataSource(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  const toolbarStyle = { display: "flex", gap: "var(--sl-spacing-small)", marginBottom: "var(--sl-spacing-medium)" };
  return (
    <div style={style}>
      <div style={toolbarStyle}>
        <button onClick={loadData}>重新加载</button>
        <button onClick={() => setDataSource([])}>清空数据</button>
      </div>
      <SlTable rowKey="id" loading={loading} columns={columns} dataSource={dataSource} />
    </div>
  );
};
```

---

### 示例4：编辑数据

通过 dialog 弹窗实现行数据编辑。

```jsx
import React, { useState, useRef, useCallback, useEffect } from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';
import { generateCustomSlot } from "@kdcloudjs/shoelace/dist/components/table/utils.js";
import '@kdcloudjs/shoelace/dist/components/dialog/dialog.js';
import '@kdcloudjs/shoelace/dist/components/input/input.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '操作', dataIndex: 'action', width: 100, slot: true }
];

export default () => {
  const [dataSource, setDataSource] = useState([
    { id: '1', name: '张三', age: 28 },
    { id: '2', name: '李四', age: 32 },
    { id: '3', name: '王五', age: 25 }
  ]);
  const [editing, setEditing] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const handleHide = () => setDialogOpen(false);
    el.addEventListener('sl-hide', handleHide);
    return () => el.removeEventListener('sl-hide', handleHide);
  }, []);

  const handleEdit = useCallback((row) => {
    setEditing({ ...row, age: String(row.age) });
    setDialogOpen(true);
  }, []);

  const handleSave = useCallback(() => {
    setDataSource(prev => prev.map(item =>
      item.id === editing.id ? { ...item, name: editing.name, age: parseInt(editing.age, 10) } : item
    ));
    setDialogOpen(false);
  }, [editing]);

  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource}>
        {dataSource.map(row =>
          generateCustomSlot(
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button style={{ cursor: "pointer", border: "none", background: "none", color: "var(--sl-color-primary-600)" }} onClick={() => handleEdit(row)}>
                编辑
              </button>
            </div>,
            `custom-cell-action-${row.id}`
          )
        )}
      </SlTable>
      <sl-dialog ref={dialogRef} label="编辑用户" open={dialogOpen || undefined}>
        {editing && (
          <div>
            <div style={{ marginBottom: "var(--sl-spacing-medium)" }}>
              <label style={{ display: "block", marginBottom: "4px" }}>姓名:</label>
              <sl-input value={editing.name} onSlInput={(e) => setEditing(prev => ({ ...prev, name: e.target.value }))} />
            </div>
            <div style={{ marginBottom: "var(--sl-spacing-medium)" }}>
              <label style={{ display: "block", marginBottom: "4px" }}>年龄:</label>
              <sl-input type="number" value={editing.age} onSlInput={(e) => setEditing(prev => ({ ...prev, age: e.target.value }))} />
            </div>
          </div>
        )}
        <div slot="footer">
          <button onClick={handleSave} style={{ marginRight: "8px" }}>保存</button>
          <button onClick={() => setDialogOpen(false)}>取消</button>
        </div>
      </sl-dialog>
    </div>
  );
};
```

---

## 注意事项

1. **不可变更新**：React 中更新数据需用展开运算符创建新数组（`[...prev, newItem]`），触发重渲染
2. **useCallback 缓存**：事件处理函数建议用 `useCallback` 包裹，避免子组件不必要的重渲染
3. **rowKey 唯一性**：添加新数据时确保 `rowKey` 字段值唯一
4. **sl-dialog 事件**：`sl-hide` 等 Shoelace 事件未映射到 React wrapper，需用 `ref` + `useEffect` + `addEventListener` 绑定
5. **动态 slot**：动态数据场景下，使用 `dataSource.map` 结合 `generateCustomSlot` 动态生成自定义单元格

[返回目录](../index.md)
