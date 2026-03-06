# 行展开

[返回目录](../index.md)

## 功能说明

Table 组件支持行展开功能，通过 `expandProps` 配置。展开后可以显示更多行详情内容，内容通过 `custom-row-{rowKeyValue}` slot 自定义。支持点击展开图标或点击整行展开、指定可展开行、默认展开等功能。

## API 属性

### ExpandProps 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `rowExpandable` | 是否开启行展开 | `boolean` | `false` |
| `expendableRowKeys` | 可展开的行 key 数组（不传则所有行可展开） | `any[]` | - |
| `expandRowByClick` | 是否可通过点击行展开 | `boolean` | `false` |
| `defaultExpandedRowKeys` | 默认展开的行 key 数组 | `any[]` | - |
| `defaultExpandAllRows` | 是否默认展开所有可展开行 | `boolean` | `false` |

### Slot 命名规则

| Slot 格式 | 说明 |
|-----------|------|
| `custom-row-{rowKeyValue}` | 展开行内容 |

---

## 代码示例

### 示例1：基础展开行

开启行展开功能，点击展开图标显示详情。展开行内容通过 `custom-row-{rowKeyValue}` slot 渲染。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '邮箱', dataIndex: 'email' }
];

const dataSource = [
  { id: '1', name: '张三', age: 32, email: 'zhangsan@example.com' },
  { id: '2', name: '李四', age: 28, email: 'lisi@example.com' },
  { id: '3', name: '王五', age: 35, email: 'wangwu@example.com' }
];

const expandProps = {
  rowExpandable: true
};

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource} expandProps={expandProps}>
        <div slot="custom-row-1" style={{ padding: "12px 24px", background: "#fafafa" }}>
          <p><strong>详细地址：</strong>北京市朝阳区建国路88号SOHO现代城A座1001室</p>
          <p><strong>联系电话：</strong>13800138001</p>
          <p><strong>备注信息：</strong>VIP客户，需优先处理</p>
        </div>
        <div slot="custom-row-2" style={{ padding: "12px 24px", background: "#fafafa" }}>
          <p><strong>详细地址：</strong>上海市浦东新区张江高科技园区碧波路100号</p>
          <p><strong>联系电话：</strong>13800138002</p>
          <p><strong>备注信息：</strong>新客户，首次合作</p>
        </div>
        <div slot="custom-row-3" style={{ padding: "12px 24px", background: "#fafafa" }}>
          <p><strong>详细地址：</strong>广州市天河区珠江新城华夏路30号</p>
          <p><strong>联系电话：</strong>13800138003</p>
          <p><strong>备注信息：</strong>老客户，合作3年以上</p>
        </div>
      </SlTable>
    </div>
  );
};
```

---

### 示例2：点击行展开

设置 `expandRowByClick: true`，点击整行即可展开/收起。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '客户名称', dataIndex: 'customer', width: 150 },
  { title: '订单金额', dataIndex: 'amount', width: 120 },
  { title: '状态', dataIndex: 'status', width: 100 }
];

const dataSource = [
  { id: '1', customer: '客户A', amount: '¥1,299.00', status: '已完成' },
  { id: '2', customer: '客户B', amount: '¥2,599.00', status: '进行中' },
  { id: '3', customer: '客户C', amount: '¥899.00', status: '待付款' }
];

const expandProps = {
  rowExpandable: true,
  expandRowByClick: true
};

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <p style={{ color: "#1890ff", fontSize: "14px", marginBottom: "8px" }}>
        点击任意行即可展开/收起
      </p>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource} expandProps={expandProps}>
        <div slot="custom-row-1" style={{ padding: "12px 24px", background: "#fafafa" }}>
          <h4 style={{ margin: "0 0 8px" }}>订单详情</h4>
          <p>订单号：ORD-2024-001</p>
          <p>下单时间：2024-01-15 10:30:00</p>
        </div>
        <div slot="custom-row-2" style={{ padding: "12px 24px", background: "#fafafa" }}>
          <h4 style={{ margin: "0 0 8px" }}>订单详情</h4>
          <p>订单号：ORD-2024-002</p>
          <p>下单时间：2024-01-16 14:20:00</p>
        </div>
        <div slot="custom-row-3" style={{ padding: "12px 24px", background: "#fafafa" }}>
          <h4 style={{ margin: "0 0 8px" }}>订单详情</h4>
          <p>订单号：ORD-2024-003</p>
          <p>下单时间：2024-01-17 09:15:00</p>
        </div>
      </SlTable>
    </div>
  );
};
```

---

### 示例3：嵌套子表格

展开行中嵌套另一个 `SlTable` 组件，实现主从表结构。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const mainColumns = [
  { title: '部门名称', dataIndex: 'department', width: 200 },
  { title: '人数', dataIndex: 'count', width: 100 },
  { title: '负责人', dataIndex: 'leader' }
];

const mainDataSource = [
  { id: '1', department: '研发部', count: 30, leader: '张三' },
  { id: '2', department: '产品部', count: 15, leader: '李四' }
];

const subColumns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '职位', dataIndex: 'position', width: 150 },
  { title: '入职时间', dataIndex: 'hireDate' }
];

const subData = {
  '1': [
    { id: 's1', name: '小明', position: '前端工程师', hireDate: '2022-03-01' },
    { id: 's2', name: '小红', position: '后端工程师', hireDate: '2021-06-15' },
    { id: 's3', name: '小刚', position: '测试工程师', hireDate: '2023-01-10' }
  ],
  '2': [
    { id: 's4', name: '小李', position: '产品经理', hireDate: '2020-08-20' },
    { id: 's5', name: '小王', position: '交互设计师', hireDate: '2022-11-01' }
  ]
};

const expandProps = {
  rowExpandable: true,
  defaultExpandedRowKeys: ['1']
};

export default () => {
  const style = { width: "80%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <SlTable
        rowKey="id"
        columns={mainColumns}
        dataSource={mainDataSource}
        expandProps={expandProps}
      >
        {mainDataSource.map((row) => (
          <div key={row.id} slot={`custom-row-${row.id}`} style={{ padding: "12px 24px" }}>
            <h4 style={{ margin: "0 0 8px" }}>{row.department} - 成员列表</h4>
            <SlTable
              rowKey="id"
              bordered
              columns={subColumns}
              dataSource={subData[row.id] || []}
            />
          </div>
        ))}
      </SlTable>
    </div>
  );
};
```

---

### 示例4：指定可展开行 + 默认展开

通过 `expendableRowKeys` 指定可展开行，通过 `defaultExpandedRowKeys` 设置默认展开行。

```jsx
import React from "react";
import SlTable from '@kdcloudjs/shoelace/dist/react/table/index.js';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '部门', dataIndex: 'department' }
];

const dataSource = [
  { id: '1', name: '张三', age: 32, department: '研发部' },
  { id: '2', name: '李四', age: 28, department: '产品部' },
  { id: '3', name: '王五', age: 35, department: '设计部' },
  { id: '4', name: '赵六', age: 26, department: '市场部' }
];

const expandProps = {
  rowExpandable: true,
  expendableRowKeys: ['1', '3'],      // 只有这两行可展开
  defaultExpandedRowKeys: ['1']        // 默认展开第一行
};

export default () => {
  const style = { width: "70%", margin: "0 auto", padding: "20px" };
  return (
    <div style={style}>
      <p style={{ color: "#faad14", fontSize: "14px", marginBottom: "8px" }}>
        只有ID为1和3的行可以展开，ID为1的行默认展开
      </p>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource} expandProps={expandProps}>
        <div slot="custom-row-1" style={{ padding: "12px", background: "#e6f7ff" }}>
          <p>这是张三的展开内容（默认展开）</p>
        </div>
        <div slot="custom-row-3" style={{ padding: "12px", background: "#e6f7ff" }}>
          <p>这是王五的展开内容</p>
        </div>
      </SlTable>
    </div>
  );
};
```

---

## 注意事项

1. **Slot 名称格式**：展开行内容 slot 必须遵循 `custom-row-{rowKeyValue}` 格式，其中 `rowKeyValue` 为该行的 `rowKey` 字段值
2. **expendableRowKeys 与 slot**：只有在 `expendableRowKeys` 中的行才会渲染展开图标，如不传则所有行可展开
3. **展开图标列**：启用行展开后会自动添加一个展开图标列在最左侧
4. **expandRowByClick 与单元格点击**：启用点击行展开时，注意处理单元格内按钮等元素的点击冲突（使用 `e.stopPropagation()`）
5. **嵌套子表格**：展开行中可以嵌套 `SlTable` 组件，注意子表格也需要独立的 `rowKey`

[返回目录](../index.md)
