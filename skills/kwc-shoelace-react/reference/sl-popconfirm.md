# Popconfirm 气泡确认框

点击元素，弹出气泡式的确认框，用于在操作前进行二次确认。

## 特性概览

- **气泡确认**：在目标元素附近弹出轻量级确认浮层，无需打断用户流程
- **12 个弹出方向**：支持 `top`、`topLeft`、`topRight`、`bottom`、`bottomLeft`、`bottomRight`、`left`、`leftTop`、`leftBottom`、`right`、`rightTop`、`rightBottom`
- **异步确认**：`onConfirm` 回调支持返回 Promise，确认按钮自动 loading
- **自定义图标**：通过 `icon` 属性或 `icon` 插槽自定义图标
- **箭头控制**：支持显示/隐藏箭头，支持箭头精准指向目标元素中心
- **语义化样式定制**：通过 `classNames` 和 `customStyles` 自定义各语义结构的类名和内联样式
- **禁用状态**：支持整体禁用交互

## 基础用法

最简单的用法，点击按钮弹出确认浮层。通过 `title` 设置确认框标题。

```jsx
import React from 'react';
import SlPopconfirm from '@kdcloudjs/shoelace/dist/react/popconfirm/index.js';
import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';

const onConfirm = () => console.log('确认');
const onCancel = () => console.log('取消');

export default () => (
  <SlPopconfirm title="确定删除吗？" onConfirm={onConfirm} onCancel={onCancel}>
    <SlButton>删除</SlButton>
  </SlPopconfirm>
);
```

## 自定义按钮文字

通过 `okText` 和 `cancelText` 自定义确认和取消按钮的文字。

```jsx
import React from 'react';
import SlPopconfirm from '@kdcloudjs/shoelace/dist/react/popconfirm/index.js';
import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';

export default () => (
  <SlPopconfirm title="Are you sure to delete this task?" okText="Yes" cancelText="No">
    <SlButton variant="danger">Delete</SlButton>
  </SlPopconfirm>
);
```

## 添加描述

通过 `description` 属性为确认框添加描述信息。

```jsx
import React from 'react';
import SlPopconfirm from '@kdcloudjs/shoelace/dist/react/popconfirm/index.js';
import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';

export default () => (
  <SlPopconfirm title="确定删除吗？" description="删除后将无法恢复，请谨慎操作。">
    <SlButton>删除</SlButton>
  </SlPopconfirm>
);
```

## 禁用状态

通过在 `Popconfirm` 上添加 `disabled` 属性，可以禁用气泡确认框，使其无法弹出。

```jsx
import React from 'react';
import SlPopconfirm from '@kdcloudjs/shoelace/dist/react/popconfirm/index.js';
import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';

export default () => (
  <SlPopconfirm title="确定删除吗？" disabled>
    <SlButton>删除</SlButton>
  </SlPopconfirm>
);
```

## 位置

通过 `placement` 属性控制弹出位置，支持 12 个方向。

```jsx
import React from 'react';
import SlPopconfirm from '@kdcloudjs/shoelace/dist/react/popconfirm/index.js';
import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '80px 40px' }}>
    {/* 上方三个 */}
    <div style={{ display: 'flex', gap: '8px' }}>
      <SlPopconfirm title="TL 确认？" placement="topLeft">
        <SlButton style={{ width: '80px' }}>TL</SlButton>
      </SlPopconfirm>
      <SlPopconfirm title="Top 确认？" placement="top">
        <SlButton style={{ width: '80px' }}>Top</SlButton>
      </SlPopconfirm>
      <SlPopconfirm title="TR 确认？" placement="topRight">
        <SlButton style={{ width: '80px' }}>TR</SlButton>
      </SlPopconfirm>
    </div>

    {/* 中间左右 */}
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '420px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SlPopconfirm title="LT 确认？" placement="leftTop">
          <SlButton style={{ width: '80px' }}>LT</SlButton>
        </SlPopconfirm>
        <SlPopconfirm title="Left 确认？" placement="left">
          <SlButton style={{ width: '80px' }}>Left</SlButton>
        </SlPopconfirm>
        <SlPopconfirm title="LB 确认？" placement="leftBottom">
          <SlButton style={{ width: '80px' }}>LB</SlButton>
        </SlPopconfirm>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SlPopconfirm title="RT 确认？" placement="rightTop">
          <SlButton style={{ width: '80px' }}>RT</SlButton>
        </SlPopconfirm>
        <SlPopconfirm title="Right 确认？" placement="right">
          <SlButton style={{ width: '80px' }}>Right</SlButton>
        </SlPopconfirm>
        <SlPopconfirm title="RB 确认？" placement="rightBottom">
          <SlButton style={{ width: '80px' }}>RB</SlButton>
        </SlPopconfirm>
      </div>
    </div>

    {/* 下方三个 */}
    <div style={{ display: 'flex', gap: '8px' }}>
      <SlPopconfirm title="BL 确认？" placement="bottomLeft">
        <SlButton style={{ width: '80px' }}>BL</SlButton>
      </SlPopconfirm>
      <SlPopconfirm title="Bottom 确认？" placement="bottom">
        <SlButton style={{ width: '80px' }}>Bottom</SlButton>
      </SlPopconfirm>
      <SlPopconfirm title="BR 确认？" placement="bottomRight">
        <SlButton style={{ width: '80px' }}>BR</SlButton>
      </SlPopconfirm>
    </div>
  </div>
);
```

## 自定义图标

通过 `icon` 属性更换图标名称，或使用 `icon` 插槽完全自定义图标内容。

```jsx
import React from 'react';
import SlPopconfirm from '@kdcloudjs/shoelace/dist/react/popconfirm/index.js';
import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';

export default () => (
  <SlPopconfirm title="确定提交？" icon="question-circle-fill">
    <SlButton>提交</SlButton>
  </SlPopconfirm>
);
```

## 异步确认

当 `onConfirm` 回调返回 Promise 时，确认按钮自动进入 loading 状态，请求成功后气泡自动关闭。

```jsx
import React from 'react';
import SlPopconfirm from '@kdcloudjs/shoelace/dist/react/popconfirm/index.js';
import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';

const onConfirm = () => new Promise(resolve => setTimeout(resolve, 2000));

export default () => (
  <SlPopconfirm title="确定提交吗？" description="将模拟 2 秒异步请求" onConfirm={onConfirm}>
    <SlButton>异步确认</SlButton>
  </SlPopconfirm>
);
```

## 确认按钮类型

通过 `okType` 属性设置确认按钮的类型，支持 `primary`、`danger`、`default`。

```jsx
import React from 'react';
import SlPopconfirm from '@kdcloudjs/shoelace/dist/react/popconfirm/index.js';
import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';

export default () => (
  <div style={{ display: 'flex', gap: '16px' }}>
    <SlPopconfirm title="确定？" okType="primary">
      <SlButton>Primary</SlButton>
    </SlPopconfirm>
    <SlPopconfirm title="确定删除？" okType="danger">
      <SlButton variant="danger">Danger</SlButton>
    </SlPopconfirm>
  </div>
);
```

## 条件触发

可以判断是否需要弹出。开关打开时点击按钮直接执行删除，关闭时弹出确认框。

```jsx
import React, { useState, useRef, useCallback } from 'react';
import SlPopconfirm from '@kdcloudjs/shoelace/dist/react/popconfirm/index.js';
import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';
import SlSwitch from '@kdcloudjs/shoelace/dist/react/switch/index.js';

export default () => {
  const [condition, setCondition] = useState(true);
  const pcRef = useRef(null);

  const onConfirm = useCallback(() => {
    if (pcRef.current) pcRef.current.open = false;
    alert('已删除。');
  }, []);

  const onCancel = useCallback(() => {
    if (pcRef.current) pcRef.current.open = false;
  }, []);

  const handleClick = useCallback(
    e => {
      if (condition) {
        e.stopPropagation();
        alert('已删除。');
      }
    },
    [condition]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
      <SlPopconfirm
        ref={pcRef}
        title="删除任务"
        description="是否确认直接删除?"
        okText="确定"
        cancelText="取消"
        disabled={condition}
        onConfirm={onConfirm}
        onCancel={onCancel}
      >
        <SlButton variant="danger" onClick={handleClick}>
          删除
        </SlButton>
      </SlPopconfirm>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '14px' }}>是否直接删除：</span>
        <SlSwitch checked={condition} onSlChange={e => setCondition(e.target.checked)} />
      </div>
    </div>
  );
};
```

## 自定义语义结构样式

通过 `classNames` 和 `customStyles` 属性可以自定义 Popconfirm 各语义化结构的类名和内联样式。`customStyles` 支持传入对象或函数，函数形式可以根据组件当前 props 动态返回样式。

支持的语义化结构 key：`body`、`icon`、`title`、`description`、`footer`。

```jsx
import React from 'react';
import SlPopconfirm from '@kdcloudjs/shoelace/dist/react/popconfirm/index.js';
import SlButton from '@kdcloudjs/shoelace/dist/react/button/index.js';

const customStyles = {
  body: { backgroundColor: '#eee', boxShadow: 'inset 5px 5px 3px #fff, inset -5px -5px 3px #ddd' },
  title: { color: '#262626' },
  description: { color: '#262626' }
};

export default () => (
  <SlPopconfirm title="对象样式" description="通过对象设置自定义样式" customStyles={customStyles}>
    <SlButton>对象样式</SlButton>
  </SlPopconfirm>
);
```

## Properties

| 属性         | 描述   | 类型    | 默认值             |
| ------------ | ------ | ------------ | -------- |
| title        | 确认框标题        |`string`        | `''`  |
| description  | 确认框描述         | `string`     | `''`      |
| okText       | 确认按钮文字（HTML 属性：`ok-text`）  | `string`    | `'确定'`     |
| cancelText   | 取消按钮文字（HTML 属性：`cancel-text`）  | `string`    | `'取消'`  |
| `direction` | 确认框方向 | `'ltr' \| 'rtl'` | `'ltr'` |
| placement    | 弹出位置       | `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomLeft' \| 'bottomRight' \| 'left' \| 'leftTop' \| 'leftBottom' \| 'right' \| 'rightTop' \| 'rightBottom'` | `'top'`         |
| open         | 是否显示（reflects）  | `boolean` | `false`  |
| disabled     | 是否禁用（reflects） | `boolean`  | `false`    |
| icon         | 图标名称   | `string`  | `'exclamation-circle-fill'` |
| arrow        | 是否显示箭头，支持设置箭头精准指向目标元素中心 | `boolean \| { pointAtCenter: boolean }`   | `true` |
| okType       | 确认按钮类型（HTML 属性：`ok-type`）  | `'primary' \| 'danger' \| 'default'`  | `'primary'`   |
| onConfirm    | 点击确认的回调，支持返回 Promise 实现异步确认  | `() => void \| Promise<void>` | -    |
| onCancel     | 点击取消的回调  | `() => void`  | -  |
| classNames   | 自定义语义化结构的 CSS 类名                    | `Partial<Record<'body' \| 'icon' \| 'title' \| 'description' \| 'footer', string>>`| -    |
| customStyles | 自定义语义化结构的内联样式，支持对象或函数     | `PopconfirmStylesObject \| PopconfirmStylesFn`   | -        |

## Methods

| 方法名 | 描述           | 参数 | 返回值          |
| ------ | -------------- | ---- | --------------- |
| show() | 显示气泡确认框 | -    | `Promise<void>` |
| hide() | 隐藏气泡确认框 | -    | `Promise<void>` |

## Slots

| 名称    | 描述                 |
| ------- | -------------------- |
| default | 触发气泡确认框的元素 |
| icon    | 自定义图标内容       |

## CSS Parts

| 名称        | 描述           |
| ----------- | -------------- |
| body        | 确认框主体容器 |
| icon        | 图标区域       |
| title       | 标题区域       |
| description | 描述区域       |
| footer      | 底部按钮区域   |

## CSS Custom Properties

| CSS 属性                | 描述     | 默认值         |
| ----------------------- | -------- | -------------- |
| --max-width             | 最大宽度 | `20rem`        |
| --sl-tooltip-arrow-size | 箭头大小 | 继承自 tooltip |

## 常见问题

### Q: 如何在 React 中绑定 onConfirm / onCancel 回调？

A: `onConfirm` 和 `onCancel` 是 JS 属性（非 HTML 属性），可以直接通过 `const` 定义后传入：

```jsx
const onConfirm = () => console.log('确认');
const onCancel = () => console.log('取消');

<SlPopconfirm title="确认？" onConfirm={onConfirm} onCancel={onCancel}>
  ...
</SlPopconfirm>;
```

### Q: 如何实现异步确认（带 loading）？

A: 让 `onConfirm` 返回一个 Promise，确认按钮会自动进入 loading 状态，Promise resolve 后气泡自动关闭：

```jsx
el.onConfirm = () => fetch('/api/delete').then(res => res.json());
```

### Q: placement 属性值和 sl-popup 的 placement 有什么区别？

A: Popconfirm 使用驼峰命名（如 `topLeft`），内部会映射为 sl-popup 的 `top-start` 格式。完整映射关系：

- `topLeft` → `top-start`，`topRight` → `top-end`
- `bottomLeft` → `bottom-start`，`bottomRight` → `bottom-end`
- `leftTop` → `left-start`，`leftBottom` → `left-end`
- `rightTop` → `right-start`，`rightBottom` → `right-end`

