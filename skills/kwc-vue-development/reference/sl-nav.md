# Nav 导航组件 Skill

## 组件概述

`sl-nav` 是一套用于构建应用导航的组件族，适合顶栏、侧边栏和分组菜单场景。核心标签包括：

- `sl-nav`：导航容器，负责管理当前选中值和模式
- `sl-nav-item`：单个导航项，可做纯选择项，也可配置为链接
- `sl-nav-group`：分组容器，用于组织同类导航项
- `sl-nav-submenu`：子菜单容器，支持内联展开或弹出式展开

## 功能列表

| 功能 | 说明 |
|------|------|
| 基础选中 | 通过 `value` 管理当前激活项 |
| 三种模式 | 支持 `horizontal`、`vertical`、`vertical-popup` |
| 前后缀 | 导航项和子菜单支持 `prefix` / `suffix` 插槽 |
| 分组展示 | 使用 `sl-nav-group` 增强层级和可读性 |
| 多级菜单 | 使用 `sl-nav-submenu` 构建嵌套导航 |
| 链接跳转 | `sl-nav-item` 配置 `href` 后渲染为链接 |
| 事件监听 | 监听 `sl-change` 和 `sl-nav-select` 处理交互 |

## 核心约束

### 必须遵守的规则

1. **组件导入必须完整**
   - 涉及 `sl-nav` 时，必须按实际使用标签分别导入：
   ```js
   import '@kdcloudjs/shoelace/dist/components/nav/nav.js';
   import '@kdcloudjs/shoelace/dist/components/nav-item/nav-item.js';
   import '@kdcloudjs/shoelace/dist/components/nav-group/nav-group.js';
   import '@kdcloudjs/shoelace/dist/components/nav-submenu/nav-submenu.js';
   ```

2. **选中状态以 `sl-nav.value` 为单一事实来源**
   - `sl-nav-item` 的 `value` 应唯一且稳定
   - 推荐通过修改 `sl-nav` 的 `value` 或监听事件后同步状态
   - 不要手工在多个 `sl-nav-item` 上分散维护 `active`

3. **模式差异必须理解**
   - `vertical`：子菜单内联展开，激活项祖先子菜单会自动展开
   - `horizontal`：子菜单以下拉形式展示
   - `vertical-popup`：侧边栏节省空间场景，子菜单以弹层展示

4. **Vue 事件监听使用 `@sl-*`**
   - 选中变化监听 `@sl-change`
   - 获取具体项监听 `@sl-nav-select`
   - `sl-nav-select` 的目标项在 `event.detail.item`

5. **链接与选择项分开理解**
   - `sl-nav-item` 未设置 `href` 时更适合作为应用内导航状态切换
   - 设置 `href` 后组件会渲染为链接，可配合 `target` / `rel`

6. **`sl-nav-group` 标题只能用 slot**
   - 正确写法：`<span slot="title">基础设置</span>`
   - 错误写法：`<sl-nav-group title="基础设置">`

## 快速开始

### 组件导入

```js
import '@kdcloudjs/shoelace/dist/components/icon/icon.js';
import '@kdcloudjs/shoelace/dist/components/nav/nav.js';
import '@kdcloudjs/shoelace/dist/components/nav-item/nav-item.js';
import '@kdcloudjs/shoelace/dist/components/nav-group/nav-group.js';
import '@kdcloudjs/shoelace/dist/components/nav-submenu/nav-submenu.js';
```

### 最简示例

```vue
<template>
  <sl-nav value="home" @sl-change="handleChange">
    <sl-nav-item value="home">
      <sl-icon slot="prefix" name="house"></sl-icon>
      首页
    </sl-nav-item>
    <sl-nav-item value="profile">
      <sl-icon slot="prefix" name="person"></sl-icon>
      个人中心
    </sl-nav-item>
  </sl-nav>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/icon/icon.js';
import '@kdcloudjs/shoelace/dist/components/nav/nav.js';
import '@kdcloudjs/shoelace/dist/components/nav-item/nav-item.js';

function handleChange(event) {
  console.log('当前导航值:', event.target.value);
}
</script>
```

### 侧边导航示例

```vue
<template>
  <sl-nav value="security" style="max-width: 256px;" @sl-nav-select="handleSelect">
    <sl-nav-submenu title="系统设置" open>
      <sl-icon slot="prefix" name="gear"></sl-icon>
      <sl-nav-group>
        <span slot="title">基础设置</span>
        <sl-nav-item value="profile">个人资料</sl-nav-item>
        <sl-nav-item value="security">安全设置</sl-nav-item>
      </sl-nav-group>
    </sl-nav-submenu>

    <sl-nav-item value="message">
      <sl-icon slot="prefix" name="envelope"></sl-icon>
      消息中心
    </sl-nav-item>
  </sl-nav>
</template>

<script setup>
import '@kdcloudjs/shoelace/dist/components/icon/icon.js';
import '@kdcloudjs/shoelace/dist/components/nav/nav.js';
import '@kdcloudjs/shoelace/dist/components/nav-item/nav-item.js';
import '@kdcloudjs/shoelace/dist/components/nav-group/nav-group.js';
import '@kdcloudjs/shoelace/dist/components/nav-submenu/nav-submenu.js';

function handleSelect(event) {
  console.log('选中项:', event.detail.item.value);
}
</script>
```

## API 概览

### `sl-nav` 主要属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 当前选中的导航值 | `string` | `''` |
| `mode` | 导航模式 | `'horizontal' \| 'vertical' \| 'vertical-popup'` | `'vertical'` |

### `sl-nav-item` 主要属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 导航项值 | `string` | `''` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `active` | 是否激活 | `boolean` | `false` |
| `href` | 跳转链接 | `string` | `''` |
| `target` | 链接打开方式 | `'_blank' \| '_parent' \| '_self' \| '_top'` | - |
| `download` | 下载文件名 | `string` | - |
| `rel` | 链接 rel 属性 | `string` | `'noreferrer noopener'` |

### `sl-nav-group` 主要属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `active` | 组内是否存在激活项 | `boolean` | `false` |

### `sl-nav-submenu` 主要属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `open` | 是否展开 | `boolean` | `false` |
| `title` | 子菜单标题 | `string` | `''` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `active` | 是否包含激活项 | `boolean` | `false` |
| `mode` | 当前菜单模式 | `'horizontal' \| 'vertical' \| 'vertical-popup'` | `'vertical'` |

### 主要事件

| 事件 | 说明 | 获取方式 |
|------|------|----------|
| `sl-change` | 当前选中的导航项变化时触发 | `event.target.value` |
| `sl-nav-select` | 某个导航项被选中时触发 | `event.detail.item` |
| `sl-show` | 子菜单展开时触发 | 监听 `sl-nav-submenu` |
| `sl-hide` | 子菜单收起时触发 | 监听 `sl-nav-submenu` |

### 主要 Slots

| 组件 | Slot | 说明 |
|------|------|------|
| `sl-nav-item` | `prefix` / `suffix` | 导航项前后缀 |
| `sl-nav-group` | `title` | 分组标题，必须通过 `slot="title"` 传入 |
| `sl-nav-submenu` | `title` / `prefix` / `suffix` / `expand-icon` / `collapse-icon` | 子菜单标题与图标区域 |

### 主要方法

| 组件 | 方法 | 说明 |
|------|------|------|
| `sl-nav-submenu` | `show()` | 展开子菜单 |
| `sl-nav-submenu` | `hide()` | 收起子菜单 |

## 使用建议

1. **应用内路由场景**：优先把业务路由 key 作为 `sl-nav-item.value`，监听 `sl-change` 后统一切换视图或路由。
2. **外链场景**：需要跳转外部页面时再使用 `href`，不要把所有导航都写成链接。
3. **层级控制**：尽量控制在两层以内，超过两层会影响可用性。
4. **模式选择**：顶部菜单用 `horizontal`，常规侧边栏用 `vertical`，折叠侧栏或图标栏用 `vertical-popup`。
5. **状态同步**：页面初始化时应让 `sl-nav.value` 与当前路由保持一致，否则激活态会错位。
