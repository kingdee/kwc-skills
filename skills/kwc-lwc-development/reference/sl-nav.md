# Nav 导航组件 Skill

## 组件概述

`sl-nav` 是一套用于构建导航菜单的组件族，适合顶部导航、左侧菜单和带层级的业务导航。核心标签包括：

- `sl-nav`
- `sl-nav-item`
- `sl-nav-group`
- `sl-nav-submenu`

## 功能列表

| 功能 | 说明 |
|------|------|
| 当前选中 | 通过 `value` 维护当前激活项 |
| 三种模式 | `horizontal`、`vertical`、`vertical-popup` |
| 分组 | 使用 `sl-nav-group` 组织菜单 |
| 多级菜单 | 使用 `sl-nav-submenu` 实现层级导航 |
| 图标扩展 | `prefix` / `suffix` 插槽 |
| 链接跳转 | `sl-nav-item` 支持 `href` |

## 核心约束

### 必须遵守的规则

1. **所有 Shoelace 标签必须加 `kwc:external`**
   ```html
   <sl-nav kwc:external></sl-nav>
   <sl-nav-item kwc:external></sl-nav-item>
   <sl-nav-group kwc:external></sl-nav-group>
   <sl-nav-submenu kwc:external></sl-nav-submenu>
   ```

2. **必须导入所有实际使用的组件定义**
   ```js
   import '@kdcloudjs/shoelace/dist/components/icon/icon.js';
   import '@kdcloudjs/shoelace/dist/components/nav/nav.js';
   import '@kdcloudjs/shoelace/dist/components/nav-item/nav-item.js';
   import '@kdcloudjs/shoelace/dist/components/nav-group/nav-group.js';
   import '@kdcloudjs/shoelace/dist/components/nav-submenu/nav-submenu.js';
   ```

3. **Shoelace 自定义事件不能写在 HTML 上**
   - 禁止 `onslchange`、`onslnavselect`
   - 必须在 `renderedCallback()` 中通过 `addEventListener()` 绑定

4. **选中态应由 `sl-nav.value` 驱动**
   - `sl-nav-item` 的 `value` 应唯一
   - 初始化和业务切换时优先更新 `sl-nav.value`
   - 不建议手工维护多个 `active`

5. **模式差异必须明确**
   - `vertical`：子菜单内联展开
   - `horizontal`：子菜单弹层展示
   - `vertical-popup`：垂直布局但子菜单使用弹层

6. **`sl-nav-group` 标题只能通过 `slot="title"` 传入**
   - 正确写法：`<span slot="title">基础设置</span>`
   - 不要写成 `<sl-nav-group title="基础设置">`

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

**index.html**
```html
<template>
    <sl-nav kwc:external class="nav-el" value="home">
        <sl-nav-item kwc:external value="home">
            <sl-icon kwc:external slot="prefix" name="house"></sl-icon>
            首页
        </sl-nav-item>
        <sl-nav-item kwc:external value="profile">
            <sl-icon kwc:external slot="prefix" name="person"></sl-icon>
            个人中心
        </sl-nav-item>
    </sl-nav>
</template>
```

**index.js**
```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/icon/icon.js';
import '@kdcloudjs/shoelace/dist/components/nav/nav.js';
import '@kdcloudjs/shoelace/dist/components/nav-item/nav-item.js';

export default class BasicNav extends KingdeeElement {
    renderedCallback() {
        if (this._eventsBound) return;
        this._eventsBound = true;

        const nav = this.template.querySelector('.nav-el');
        if (nav) {
            nav.addEventListener('sl-change', this.handleChange.bind(this));
            nav.addEventListener('sl-nav-select', this.handleSelect.bind(this));
        }
    }

    handleChange(event) {
        console.log('当前导航值:', event.target.value);
    }

    handleSelect(event) {
        console.log('选中项:', event.detail.item.value);
    }
}
```

### 侧边导航示例

**index.html**
```html
<template>
    <sl-nav kwc:external class="sidebar-nav" value="security" style="max-width: 256px;">
        <sl-nav-submenu kwc:external title="系统设置" open>
            <sl-icon kwc:external slot="prefix" name="gear"></sl-icon>
            <sl-nav-group kwc:external>
                <span slot="title">基础设置</span>
                <sl-nav-item kwc:external value="profile">个人资料</sl-nav-item>
                <sl-nav-item kwc:external value="security">安全设置</sl-nav-item>
            </sl-nav-group>
        </sl-nav-submenu>
    </sl-nav>
</template>
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

### `sl-nav-submenu` 主要属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `open` | 是否展开 | `boolean` | `false` |
| `title` | 子菜单标题 | `string` | `''` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `active` | 是否包含激活项 | `boolean` | `false` |

### 主要事件

| 事件 | 说明 | 获取方式 |
|------|------|----------|
| `sl-change` | 当前导航值变化 | `event.target.value` |
| `sl-nav-select` | 选择到具体导航项 | `event.detail.item` |
| `sl-show` | 子菜单展开 | 绑定在 `sl-nav-submenu` 上 |
| `sl-hide` | 子菜单收起 | 绑定在 `sl-nav-submenu` 上 |

### 主要方法

| 组件 | 方法 | 说明 |
|------|------|------|
| `sl-nav-submenu` | `show()` | 展开子菜单 |
| `sl-nav-submenu` | `hide()` | 收起子菜单 |

### 主要 Slots

| 组件 | Slot | 说明 |
|------|------|------|
| `sl-nav-item` | `prefix` / `suffix` | 导航项前后缀 |
| `sl-nav-group` | `title` | 分组标题，必须通过 `slot="title"` 传入 |
| `sl-nav-submenu` | `title` / `prefix` / `suffix` / `expand-icon` / `collapse-icon` | 子菜单标题与图标区域 |

## 使用建议

1. **唯一值优先**：每个 `sl-nav-item` 都应配置唯一 `value`，便于业务状态同步。
2. **常规侧栏用 `vertical`**：这是默认模式，也最适合后台导航。
3. **紧凑侧栏用 `vertical-popup`**：适合只保留一级入口、二级菜单弹出的场景。
4. **事件统一在 JS 中绑定**：不要在 HTML 中直接监听 Shoelace 自定义事件。
5. **初始化同步**：渲染后让 `sl-nav.value` 与当前业务页面一致，避免激活态不对。
