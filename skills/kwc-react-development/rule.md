# KWC React 开发硬性约束 (Hard Rules)

所有 KWC React 开发工作必须严格遵守以下约束。违反这些规则的代码将无法运行或无法通过审查。

## 1. 导入规范 (Imports)
- **组件源**: 必须从 React 包装器路径导入：`@kdcloudjs/shoelace/dist/react/[component]/index.js`。
- **类型源**: 元素类型从组件源导入：`@kdcloudjs/shoelace/dist/components/[component]/[component].js`。
- **命名**: 组件使用 PascalCase (如 `SlButton`, `SlInput`)。
- **示例**:
  ```javascript
  import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';
  import type SlButtonElement from '@kdcloudjs/shoelace/dist/components/button/button.js';
  ```

## 2. 事件绑定 (Events)
- **命名约定**: Shoelace 事件在 React 中使用 `onSl` 前缀 + PascalCase。
    - `sl-change` -> `onSlChange`
    - `sl-input` -> `onSlInput`
    - `sl-focus` -> `onSlFocus`
- **事件类型**: 通常为 `CustomEvent`，需通过 `event.target` 断言类型获取值。
- **禁止**: 禁止直接使用 `onChange` 或 `onInput` 监听 Shoelace 事件（除非 Wrapper 明确重写）。

## 3. 状态管理 (State Management)
- 使用标准 React Hooks (`useState`, `useCallback`, `useEffect`, `useRef`)。
- 使用 `ref` 调用组件方法（如 `focus()`, `show()`）。

## 4. 开发范例 (Strict Template)

请参考以下代码结构进行开发。

```tsx
import React, { useState, useCallback, useRef } from 'react';
// 1. 组件导入：必须从 @kdcloudjs/shoelace/dist/react 导入
import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';
import SlInput from '@kdcloudjs/shoelace/dist/react/input/index.js';
// 2. 类型导入：用于 Ref 和事件目标断言
import type SlInputElement from '@kdcloudjs/shoelace/dist/components/input/input.js';

function StrictTemplate() {
  // 内部状态
  const [value, setValue] = useState('');
  // 引用组件实例
  const inputRef = useRef<SlInputElement>(null);

  // 事件处理：命名规范 handle[Action]
  const handleInput = useCallback((event: CustomEvent) => {
    // 类型断言
    const target = event.target as SlInputElement;
    setValue(target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    console.log('Submitting:', value);
    inputRef.current?.focus();
  }, [value]);

  return (
    <div className="container">
      {/* 规则：事件映射为 onSl[EventName] */}
      <SlInput
        ref={inputRef}
        label="请输入名称"
        value={value}
        onSlInput={handleInput as any}
        clearable
      />
      
      <SlButton variant="primary" onClick={handleSubmit}>
        提交
      </SlButton>
    </div>
  );
}

export default StrictTemplate;
```

## 5. KWC 扩展组件文档与约束
- **标准组件**（Button/Input/Icon 等）：参考官网 [https://shoelace.style/](https://shoelace.style/)
- **扩展组件**：以下组件为 KWC 专用扩展组件（不在 Shoelace 官网），当任务涉及这些组件时，**必须立即调用 Read 工具读取并学习**对应的 reference 文档，严禁凭空猜测 API：

- **对话框 (Dialog)**:
  - 文档：`./reference/sl-dialog.md`
  - 扩展属性：`maskClosable` 控制点击蒙层是否允许关闭
- **表格 (Table)**:
  - 文档：`./reference/table/index.md` (**涉及表格开发时必须读取**)
  - React 中需特别注意列配置 (`columns`) 和数据源 (`dataSource`) 的传递方式。
  - 使用自定义渲染时（如自定义单元格，自定义行展开等）需严格按照以下要求：
    - 导入：`import { generateCustomSlot } from '@kdcloudjs/shoelace/dist/components/table/utils.js'`
    - 调用：`generateCustomSlot(rowKeyField, dataSource, [{ type: 'customCell | customRow', columnId, callback }])`
    - callback 类型：`(props: { slotName: string; rowInfo: any; cellInfo?: any; rowIndex?: number }) => any[]`
    - 必须读完整文档：`./reference/table/features/custom-cell.md`
    - 必须读完整案例：`./reference/table/example/editableCell/index.tsx`
- **日期选择器 (DatePicker)**:
  - 文档：`./reference/datepicker/index.md`
  - 严禁使用 `<SlInput type="date">`，必须使用 `<SlDatepicker>`。
- **时间选择器 (TimePicker)**:
  - 文档：`./reference/sl-timepicker.md`
- **分页器 (Pagination)**:
  - 文档：`./reference/sl-pagination.md`
- **导航 (Nav)**:
  - 文档：`./reference/sl-nav.md`
  - 涉及 `SlNav`、`SlNavItem`、`SlNavGroup`、`SlNavSubmenu` 时必须先阅读
- **Markdown 渲染器 (XMarkdown)**:
  - 文档：`./reference/sl-xmarkdown.md`
  - 涉及 `SlXMarkdown` 时必须先阅读
- **思考过程 (Think)**:
  - 文档：`./reference/sl-think.md`
- **消息发送 (Sender)**:
  - 文档：`./reference/sender/index.md` (**涉及 Sender 开发时必须读取**)
  - 包含 `SlSender`（主体）、`SlSenderHeader`（可折叠头部）、`SlSenderSwitch`（功能开关）三个子组件
  - 支持结构化插槽填充（`slotConfig`）、技能标签（`skill`）、语音输入（`allowSpeech`）等高级功能
  - **自定义插槽**：优先使用 `lit` 中的 `html` 模板字面量（`import { html } from 'lit'`）实现自定义插槽功能（如 `header`、`footer`、`suffixContent`、`prefixContent`），而非 DOM 操作或原生 JSX
  - **自定义 footer**：必须使用函数式 `footer`（`sender.footer = (defaultFooter, { components }) => html\`...\``），并通过 `components` 解构使用 `SendButton`、`ClearButton`、`LoadingButton` 等内置按钮渲染器，禁止手动创建发送/清空/加载按钮
- **文件上传 (Upload)**:
  - 文档：`./reference/upload/index.md` (**涉及 Upload 开发时必须读取**)
  - 支持点击上传、拖拽上传、粘贴上传、目录上传等多种模式
  - 支持 `beforeUpload` 校验、`customRequest` 自定义上传、`itemRender`/`iconRender` 自定义渲染
  - 自定义渲染函数需使用 `lit` 的 `html` 模板字面量返回 `TemplateResult`

## 6. 开发工具与环境约束 (Tools & Environment)
- **严禁运行 ESLint/Prettier 修复与校验**：**绝对禁止**运行任何形式的 lint fix 命令（无论是手动还是自动，如 `eslint --fix`）。同时，**不需要**关注或修复 ESLint 格式报错。KWC React 的特殊语法可能与通用规则冲突，强行修复会导致代码损坏。
- **严禁修改既有配置**：严禁修改 `.eslintrc`, `.prettierrc` 或 `package.json` 中的构建脚本。

## 7. ⚠️ API 响应防御性校验约束（P0 高频问题）

**背景**：KS 运行时在序列化后端响应时，**可能将 JavaScript 数组 `[]` 转换为空对象 `{}`**，导致前端代码调用 `.map()` 等数组方法时崩溃白屏。

### 7.1 禁止对 adapterApi 响应直接使用 `as` 类型断言

```typescript
// ❌ 危险：直接强转，运行时数据类型可能与接口定义不符
setData(responseData as MyResponse);

// ✅ 安全：逐字段校验 + 容错
const raw = responseData || {};
setData({
  title: raw.title ?? '',
  summary: raw.summary ?? '',
  items: Array.isArray(raw.items) ? raw.items : [],
});
```

### 7.2 数组字段必须用 `Array.isArray()` 校验后再调用 `.map()`

```tsx
// ❌ 危险：如果 items 实际是 {}，直接崩溃
{data.items.map((item) => <li key={item}>{item}</li>)}

// ✅ 安全：先校验再渲染
{Array.isArray(data.items) && data.items.map((item) => <li key={item}>{item}</li>)}
```

### 7.3 如后端返回 JSON 字符串化的数组，前端需安全 parse

```typescript
const items: string[] = (() => {
  try {
    const parsed = JSON.parse(raw.items);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
})();
```

## 8. Controller API 调用规范

当组件需要调用后端 Controller API 时，**必须**使用 `adapterApi` 的 `doGet` / `doPost` 方法，并正确配置 `endpointConfig`。

> **完整用法、参数说明和示例请参考**：`../kwc-ks-controller-development/reference/frontend-integration.md`——编写 Controller API 调用代码前**必须阅读**该文档。

### 8.1 关键约束

- `endpointConfig` 中的 `isv` 和 `app` **必须**从组件参数 `config.isvId` 和 `config.moduleId` 动态获取，**禁止**硬编码
- `source` 字段必须与 Controller XML 配置中的 URL 路径一致（去掉 `/{isv}/{app}/` 前缀）
- `version` 固定为 `'v1'`
- 组件卸载时**必须**调用 `adapter.disconnect()` 防止内存泄漏

### 8.2 快速参考

```typescript
import { adapterApi } from '@kdcloudjs/kwc-shared-utils/api';

// GET 请求（config 为组件直接接收的参数）
const adapter = adapterApi.doGet(({ data, error }) => {
  if (error) { console.error(error.message); return; }
  // 处理 data（注意防御性校验，见第 7 节）
});
adapter.update({
  endpointConfig: {
    isv: config.isvId,
    app: config.moduleId,
    source: 'sample/users',   // Controller XML url 去掉 /{isv}/{app}/ 前缀
    version: 'v1',
  },
  params: { page: 1, size: 10 },
  headers: {},
});

// 组件卸载时断开连接
adapter.disconnect();
```

## 9. CSS 样式规范 — 必须使用 Design Token
- 编写 CSS 时，颜色、间距、字号、圆角等属性**必须**使用 Shoelace Design Token，**禁止**硬编码 hex 色值或 px 数值。
- 完整的 Token 速查表（颜色/间距/字号/圆角映射、正反示例、例外情况）请参考：`./reference/css-design-tokens.md`
- **编写 CSS 代码前必须阅读该文档。**

## 10. 强制自检清单 (Checklist)
1.  [ ] **导入路径**: 是否使用了 `dist/react/...` 路径？
2.  [ ] **事件命名**: 是否使用了 `onSl*` 前缀（如 `onSlChange`）
3.  [ ] **类型断言**: 是否正确处理了 `event.target` 的类型断言？
4.  [ ] **Ref 使用**: 是否正确使用 `ref` 调用组件方法？
5.  [ ] **扩展组件**: 是否参考了本地 reference 文档（如 Table, DatePicker）？
6.  [ ] **API 响应校验**: 是否对 adapterApi 响应做了防御性校验？是否禁止了直接 `as` 强转？数组字段是否用 `Array.isArray()` 校验？
7.  [ ] **API 调用规范**: 调用 Controller API 时是否使用 `adapterApi`？`isv`/`app` 是否从 `config` 动态获取？
8.  [ ] **工具约束**: 是否**未运行**任何 ESLint/Prettier 修复命令？
