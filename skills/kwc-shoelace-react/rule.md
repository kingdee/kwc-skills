# React 组件开发硬性约束

所有通用 React 项目中的 KWC 组件开发都必须遵守以下规则。

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
- 表格组件涉及自定义单元格时，使用 `@kdcloudjs/shoelace/dist/components/table/utils.js` 中的 `generateCustomSlot`
- 日期选择器必须使用 `SlDatepicker`，不要退回到原生日期输入控件

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
