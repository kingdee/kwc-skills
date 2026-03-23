# Page Metadata

按需读取本文件，用于从用户需求生成页面元数据 `.page-meta.kwp`。

## 页面元数据的职责

页面元数据决定环境最终如何装配页面。

它至少回答四个问题：

1. 这个页面叫什么
2. 归属哪个应用和开发商
3. 页面里有哪些组件实例
4. 每个组件实例拿到什么配置值

所以页面元数据不是“补充信息”，而是最终渲染链路的核心描述。

## 顶层字段如何生成

| 字段 | 生成原则 |
| --- | --- |
| `name` | 页面唯一标识；全小写；字母开头；仅小写字母、数字、下划线；长度不超过 30；`kd debug -f` 时优先使用它的完整值 |
| `masterLabel` | 页面标题，给业务用户看的名称 |
| `template` | 目前默认 `oneregion` |
| `isv` | 开发商标识，开发阶段可留空，deploy 时自动从环境拉取并写入 |
| `app` | 用户手工输入并写入 `.kd/config.json` 的目标业务应用编码 |
| `bizUnit` | 仅在用户明确要求放到某业务单元时填写 |
| `version` | 新页面从 `1` 起；仅当该 `.page-meta.kwp` 文件内容变更并准备重新上传时递增 |
| `enableExtend` | 仅在需求明确允许扩展时填写 |
| `enablePermissionControl` | 仅在需求明确要求权限控制时填写 |

关于 `app`：

- 不要写死
- 不要使用文档示例值
- 生成页面元数据前先核对 `.kd/config.json` 中的 `app`

推荐页面命名：

- `[开发商_]{业务应用_}{页面标识}`
- 尽量短，避免超过 30 字符

调试提醒：

- `kd debug -f` 默认优先使用这里的 `name` 完整值
- 不要把 `name` 截短成自定义简称再传给 `-f`
- 不要把 `masterLabel` 当成 `formId`

## 从需求生成 `<controls>`

先把页面需求拆成“页面中实际出现的组件实例”。

每个实例对应一个：

```xml
<control>
    <type>ComponentType</type>
    <name>instance_name</name>
    <label>组件标题</label>
    <propertys>...</propertys>
</control>
```

字段规则：

- `type`：组件类型名，必须与组件元数据中的组件 `name` 完全一致，包含大小写也必须一致
- `name`：页面内唯一实例名；全小写；字母开头；仅小写字母、数字、下划线
- `label`：当前实例的显示名称
- `propertys`：只填写组件元数据里已经定义过的属性

正反例：

假设组件元数据里写的是：

```xml
<name>OverviewCard</name>
```

则页面元数据中：

```xml
<!-- 正确 -->
<type>OverviewCard</type>

<!-- 错误：擅自加了目录前缀 -->
<type>kwc_OverviewCard</type>

<!-- 错误：大小写不一致 -->
<type>overviewcard</type>

<!-- 错误：自作主张改了类型名 -->
<type>OverviewCardKwc</type>
```

原则只有一条：`control.type` 直接抄组件元数据里的 `name`，不要自行加前缀、后缀或改写大小写。

## 如何把用户需求映射到控制实例

### 一个页面多个不同功能块

若用户说：

- 顶部是筛选区
- 中间是统计卡片
- 底部是明细表格

则应生成多个 `<control>`，而不是一个大而全组件。

### 同类组件多次复用

若页面上要放两个相同组件实例：

- `type` 可以相同
- `name` 必须不同
- 每个实例的 `<propertys>` 可以不同

示例：

```xml
<control>
    <type>SummaryCard</type>
    <name>sales_summary</name>
    <label>销售汇总</label>
</control>
<control>
    <type>SummaryCard</type>
    <name>refund_summary</name>
    <label>退款汇总</label>
</control>
```

## 页面元数据与组件元数据的配合

生成页面元数据前，先确认：

1. 组件是否有对应 `.js-meta.kwc`
2. `control.type` 是否与组件元数据 `name` 完全一致
3. 页面里用到的属性名，组件元数据里是否已声明

如果这三项不成立，页面部署后极可能无法正确装配。

## 上传前检查

部署前至少检查：

1. `name`、`masterLabel`、`app`、`version` 已填写
2. 页面 `name` 符合小写命名规范
3. 各级 `name` 均不为空
4. 每个 `control.type` 都能在组件元数据中找到完全一致的 `name`
5. 每个 `property` 名都在组件元数据中定义过
6. 若是修改已有页面元数据，`version` 已递增

额外检查：

7. 页面元数据 `app` 与 `.kd/config.json` 中的 `app` 完全一致

## 常见失误

- 页面 `name` 含大写或连字符
- 页面标识超过 30 字符
- `<controls>` 还是脚手架默认注释模板
- `control.type` 写成实例名，而不是组件类型名
- `control.type` 与组件元数据 `name` 只有语义接近，但字符串并不完全一致
- 组件属性名和组件元数据定义不一致
- 修改元数据后忘记递增 `version`
- 只改了组件实现代码，却误以为页面 `version` 也要递增
