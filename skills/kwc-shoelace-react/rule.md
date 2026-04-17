# React 组件开发硬性约束

所有通用 React 项目中的 KWC 组件开发都必须遵守以下规则。

> **⚠️ KWC 扩展组件声明（最高优先级）**
>
> 以下组件由 `@kdcloudjs/shoelace` 扩展提供，**开源版 Shoelace 不含这些组件**，但 KWC 版本已完整支持。AI 不得因“Shoelace 没有该组件”而使用原生 HTML 或第三方库替代。
>
> **禁止原生 HTML 替代**：
>
> | 原生 HTML（禁止） | KWC 组件（必须使用） | 文档 |
> |---|---|---|
> | `<table>` / 原生 HTML 表格 | `SlTable` | `./reference/table/index.md` |
> | `<input type="date">` / 原生日期输入 | `SlDatepicker` | `./reference/datepicker/index.md` |
>
> **KWC 扩展组件完整清单**（均可直接使用，严禁猜测 API，必须查阅对应 reference 文档）：
>
>> `SlTable` · `SlDatepicker` · `SlTimePicker` · `SlDateRangePicker` · `SlPagination` · `SlNav` · `SlDialog`(扩展) · `SlXMarkdown` · `SlThink` · `SlThoughtChain` · `SlSender` · `SlUpload` · `SlTreeSelect` · `SlCascader` · `SlFloatButton` · `SlSteps` · `SlGrid` · `SlNotification` · `SlRadioGroup`(扩展) · `SlSpace` · `SlSegmented` · `SlTransfer` · `SlPopconfirm` · `SlBubble` · `SlImage`

## 1. 导入规范
- 组件必须从 React Wrapper 路径导入：`@kdcloudjs/shoelace/dist/react/[component]/index.js`
- 元素类型必须从组件定义路径导入：`@kdcloudjs/shoelace/dist/components/[component]/[component].js`
- 组件命名使用 PascalCase，例如 `SlButton`、`SlInput`

## 2. 事件绑定
- Shoelace 事件在 React 中必须使用 `onSl` 前缀
  - `sl-change` -> `onSlChange`
  - `sl-input` -> `onSlInput`
  - `sl-focus` -> `onSlFocus`
- 事件对象通常为 `CustomEvent`
- 从 `event.target` 取值时必须做元素类型断言
- 禁止用 `onChange`、`onInput` 代替 Shoelace 事件，除非组件文档明确支持

## 3. 状态与实例
- 使用 React 标准 Hooks 管理状态和副作用
- 使用 `ref` 调用组件实例方法，例如 `focus()`、`show()`
- 保持事件处理函数命名语义清晰，例如 `handleInput`、`handleSubmit`

## 4. 严格范例

```tsx
import React, { useRef, useState } from 'react';
import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';
import SlInput from '@kdcloudjs/shoelace/dist/react/input/index.js';
import type SlInputElement from '@kdcloudjs/shoelace/dist/components/input/input.js';

export default function UserForm() {
  const [value, setValue] = useState('');
  const inputRef = useRef<SlInputElement>(null);

  function handleInput(event: CustomEvent) {
    const target = event.target as SlInputElement;
    setValue(target.value);
  }

  function handleSubmit() {
    inputRef.current?.focus();
  }

  return (
    <div className="form-shell">
      <SlInput
        ref={inputRef}
        label="请输入名称"
        value={value}
        onSlInput={handleInput as any}
      />
      <SlButton variant="primary" onClick={handleSubmit}>
        提交
      </SlButton>
    </div>
  );
}
```

## 5. 扩展组件规则
- 标准组件参考官网 [https://shoelace.style/](https://shoelace.style/)
- KWC 扩展组件必须先阅读本地文档，严禁猜测 API
- `SlDialog` 扩展属性 `maskClosable` 控制点击蒙层关闭，文档：`./reference/sl-dialog.md`
- 表格组件：**严禁使用原生 HTML `<table>`**，必须使用 `SlTable`（KWC 扩展组件）。开源 Shoelace 不含 Table，但 `@kdcloudjs/shoelace` 已扩展提供，禁止退回原生 HTML 表格。涉及自定义单元格时，使用 `@kdcloudjs/shoelace/dist/components/table/utils.js` 中的 `generateCustomSlot`
- 日期选择器必须使用 `SlDatepicker`，不要退回到原生日期输入控件
- Upload 组件涉及自定义渲染（`itemRender`、`iconRender`）时，需使用 `lit` 的 `html` 模板字面量返回 `TemplateResult`
- 其他扩展组件（使用前**必须**阅读对应 reference 文档，严禁猜测 API）：
  - ThoughtChain: `./reference/sl-thought-chain.md` · DateRangePicker: `./reference/sl-daterangepicker.md` · TreeSelect: `./reference/sl-tree-select.md` · Cascader: `./reference/sl-cascader.md` · FloatButton: `./reference/sl-float-button.md` · Steps: `./reference/sl-steps.md` · Grid: `./reference/sl-grid.md` · Notification: `./reference/sl-notification.md` · RadioGroup: `./reference/sl-radio-group.md` · Space: `./reference/sl-space.md` · Segmented: `./reference/sl-segmented.md` · Transfer: `./reference/sl-transfer.md` · Popconfirm: `./reference/sl-popconfirm.md` · Bubble: `./reference/sl-bubble.md` · Image: `./reference/sl-image.md` · Sender: `./reference/sender/index.md` · Nav: `./reference/sl-nav.md` · Pagination: `./reference/sl-pagination.md` · TimePicker: `./reference/sl-timepicker.md` · XMarkdown: `./reference/sl-xmarkdown.md` · Think: `./reference/sl-think.md`

## 6. 样式规范
- 颜色、间距、字号、圆角优先使用 Shoelace Design Token
- 禁止在新增样式里大面积硬编码 hex 色值和 px 数值
- 编写样式前请先阅读 `reference/css-design-tokens.md`

## 7. 工程边界
- 本 Skill 不创建 KWC 工程
- 本 Skill 不调用 KWC CLI 脚手架命令
- 交付结果应适配现有 React 工程自己的目录结构和构建方式

## 8. 强制自检
- [ ] 导入路径使用 `dist/react/.../index.js`
- [ ] 事件命名使用 `onSl*`
- [ ] `event.target` 已做类型断言
- [ ] 扩展组件已先阅读本地文档
- [ ] 样式优先使用 Design Token
