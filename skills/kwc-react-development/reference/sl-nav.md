# Nav 导航组件 Skill

## 组件概述

`SlNav` 是一套用于构建应用导航的组件族，适合顶部导航、侧边导航和分组菜单。核心组件包括：

- `SlNav`：导航容器，管理选中值和展示模式
- `SlNavItem`：导航项，支持选中态和链接模式
- `SlNavGroup`：导航分组
- `SlNavSubmenu`：子菜单，支持展开和弹出

## 功能列表

| 功能 | 说明 |
|------|------|
| 基础选中 | 使用 `value` 管理当前激活项 |
| 三种模式 | `horizontal`、`vertical`、`vertical-popup` |
| 分组展示 | `SlNavGroup` 组织同类菜单 |
| 子菜单 | `SlNavSubmenu` 支持层级结构 |
| 链接跳转 | `SlNavItem` 可通过 `href` 直接跳转 |
| 事件处理 | `onSlChange`、`onSlNavSelect` |

## 核心约束

### 必须遵守的规则

1. **导入必须使用 React Wrapper**
   ```js
   import SlNav from '@kdcloudjs/shoelace/dist/react/nav/index.js';
   import SlNavItem from '@kdcloudjs/shoelace/dist/react/nav-item/index.js';
   import SlNavGroup from '@kdcloudjs/shoelace/dist/react/nav-group/index.js';
   import SlNavSubmenu from '@kdcloudjs/shoelace/dist/react/nav-submenu/index.js';
   ```

2. **选中态统一由 `SlNav.value` 驱动**
   - `SlNavItem.value` 必须唯一
   - 推荐使用受控状态维护 `value`
   - 不要在多个 `SlNavItem` 上手工散落维护 `active`

3. **事件必须使用 `onSl*`**
   - `onSlChange`：获取当前导航值，使用 `event.target.value`
   - `onSlNavSelect`：获取选中项对象，使用 `event.detail.item`

4. **模式差异必须明确**
   - `horizontal`：子菜单以弹层展示
   - `vertical`：子菜单内联展开
   - `vertical-popup`：垂直布局但子菜单走弹层，适合紧凑侧栏

5. **链接模式要和状态模式区分**
   - 应用内导航建议使用 `value + onSlChange`
   - 外部跳转再使用 `href`

6. **`SlNavGroup` 标题只能通过 slot 传入**
   - 正确写法：`<span slot="title">基础设置</span>`
   - 不要写成 `<SlNavGroup title="基础设置">`

## 快速开始

### 组件导入

```jsx
import SlIcon from '@kdcloudjs/shoelace/dist/react/icon/index.js';
import SlNav from '@kdcloudjs/shoelace/dist/react/nav/index.js';
import SlNavItem from '@kdcloudjs/shoelace/dist/react/nav-item/index.js';
import SlNavGroup from '@kdcloudjs/shoelace/dist/react/nav-group/index.js';
import SlNavSubmenu from '@kdcloudjs/shoelace/dist/react/nav-submenu/index.js';
```

### 最简示例

```jsx
import React, { useState, useCallback } from 'react';
import SlIcon from '@kdcloudjs/shoelace/dist/react/icon/index.js';
import SlNav from '@kdcloudjs/shoelace/dist/react/nav/index.js';
import SlNavItem from '@kdcloudjs/shoelace/dist/react/nav-item/index.js';

export default function BasicNav() {
  const [value, setValue] = useState('home');

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return (
    <SlNav value={value} onSlChange={handleChange}>
      <SlNavItem value="home">
        <SlIcon slot="prefix" name="house" />
        首页
      </SlNavItem>
      <SlNavItem value="profile">
        <SlIcon slot="prefix" name="person" />
        个人中心
      </SlNavItem>
    </SlNav>
  );
}
```

### 侧边导航示例

```jsx
import React, { useState, useCallback } from 'react';
import SlIcon from '@kdcloudjs/shoelace/dist/react/icon/index.js';
import SlNav from '@kdcloudjs/shoelace/dist/react/nav/index.js';
import SlNavItem from '@kdcloudjs/shoelace/dist/react/nav-item/index.js';
import SlNavGroup from '@kdcloudjs/shoelace/dist/react/nav-group/index.js';
import SlNavSubmenu from '@kdcloudjs/shoelace/dist/react/nav-submenu/index.js';

export default function SidebarNav() {
  const [value, setValue] = useState('security');

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const handleSelect = useCallback((event) => {
    console.log('选中项:', event.detail.item.value);
  }, []);

  return (
    <SlNav
      value={value}
      style={{ maxWidth: '256px' }}
      onSlChange={handleChange}
      onSlNavSelect={handleSelect}
    >
      <SlNavSubmenu title="系统设置" open>
        <SlIcon slot="prefix" name="gear" />
        <SlNavGroup>
          <span slot="title">基础设置</span>
          <SlNavItem value="profile">个人资料</SlNavItem>
          <SlNavItem value="security">安全设置</SlNavItem>
        </SlNavGroup>
      </SlNavSubmenu>
    </SlNav>
  );
}
```

## API 概览

### `SlNav` 主要属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 当前选中的导航值 | `string` | `''` |
| `mode` | 导航模式 | `'horizontal' \| 'vertical' \| 'vertical-popup'` | `'vertical'` |

### `SlNavItem` 主要属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 导航项值 | `string` | `''` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `active` | 是否激活 | `boolean` | `false` |
| `href` | 跳转链接 | `string` | `''` |
| `target` | 链接打开方式 | `'_blank' \| '_parent' \| '_self' \| '_top'` | - |
| `download` | 下载文件名 | `string` | - |
| `rel` | 链接 rel 属性 | `string` | `'noreferrer noopener'` |

### `SlNavGroup` 主要属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `active` | 组内是否存在激活项 | `boolean` | `false` |

### `SlNavSubmenu` 主要属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `open` | 是否展开 | `boolean` | `false` |
| `title` | 子菜单标题 | `string` | `''` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `active` | 是否包含激活项 | `boolean` | `false` |
| `mode` | 当前菜单模式 | `'horizontal' \| 'vertical' \| 'vertical-popup'` | `'vertical'` |

### 主要事件

| 事件 | React 写法 | 获取方式 |
|------|------------|----------|
| `sl-change` | `onSlChange` | `event.target.value` |
| `sl-nav-select` | `onSlNavSelect` | `event.detail.item` |
| `sl-show` | `onSlShow` | 监听子菜单展开 |
| `sl-hide` | `onSlHide` | 监听子菜单收起 |

### 主要方法

| 组件 | 方法 | 说明 |
|------|------|------|
| `SlNavSubmenu` | `show()` | 展开子菜单 |
| `SlNavSubmenu` | `hide()` | 收起子菜单 |

### 主要 Slots

| 组件 | Slot | 说明 |
|------|------|------|
| `SlNavItem` | `prefix` / `suffix` | 导航项前后缀 |
| `SlNavGroup` | `title` | 分组标题，必须通过 `slot="title"` 传入 |
| `SlNavSubmenu` | `title` / `prefix` / `suffix` / `expand-icon` / `collapse-icon` | 子菜单标题与图标区域 |

## 使用建议

1. **受控写法优先**：用 React state 驱动 `value`，这样和路由状态更容易保持一致。
2. **唯一值**：每个 `SlNavItem.value` 都要唯一，否则选中同步会混乱。
3. **模式选择**：顶部菜单选 `horizontal`，标准侧栏选 `vertical`，折叠栏选 `vertical-popup`。
4. **结构建议**：复杂侧边导航优先用 `SlNavSubmenu + SlNavGroup + SlNavItem` 组合，不要用大量平铺项。
5. **外链场景**：带 `href` 的导航项更适合外部页面，不建议和应用内状态切换混用在同一组复杂逻辑里。
