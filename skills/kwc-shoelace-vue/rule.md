# Vue 组件开发硬性约束

所有通用 Vue 3 项目中的 KWC 组件开发都必须遵守以下规则。

> **⚠️ KWC 扩展组件声明（最高优先级）**
>
> 以下组件由 `@kdcloudjs/shoelace` 扩展提供，**开源版 Shoelace 不含这些组件**，但 KWC 版本已完整支持。AI 不得因“Shoelace 没有该组件”而使用原生 HTML 或第三方库替代。
>
> **禁止原生 HTML 替代**：
>
> | 原生 HTML（禁止） | KWC 组件（必须使用） | 文档 |
> |---|---|---|
> | `<table>` / 原生 HTML 表格 | `<sl-table>` | `./reference/table/index.md` |
> | `<input type="date">` / 原生日期输入 | `<sl-datepicker>` | `./reference/datepicker/index.md` |
>
> **KWC 扩展组件完整清单**（均可直接使用，严禁猜测 API，必须查阅对应 reference 文档）：
>
> `sl-table` · `sl-datepicker` · `sl-timepicker` · `sl-daterange-picker` · `sl-pagination` · `sl-nav` · `sl-dialog`(扩展) · `sl-x-markdown` · `sl-think` · `sl-thought-chain` · `sl-sender` · `sl-upload` · `sl-tree-select` · `sl-cascader` · `sl-float-button` · `sl-steps` · `sl-grid` · `sl-notification` · `sl-radio-group`(扩展) · `sl-space` · `sl-segmented` · `sl-transfer` · `sl-popconfirm` · `sl-bubble` · `sl-image`

## 1. Vue 3 基础规范
- 统一使用 Vue 3 Composition API
- 推荐使用 `<script setup>` 或 `<script setup lang="ts">`
- 禁止回退到 Vue 2 的 Options API 写法
- 使用 `ref()` / `reactive()` 声明响应式数据

## 2. 导入规范
- 组件必须从 `@kdcloudjs/shoelace/dist/components/[component]/[component].js` 导入
- 导入后即可注册 Web Component，无需再做 Vue 全局注册
- 例如：`import '@kdcloudjs/shoelace/dist/components/input/input.js';`

## 3. 模板规范
- 组件标签必须使用 kebab-case，例如 `<sl-input></sl-input>`
- Shoelace 事件必须使用 `@sl-*`
- 对象和数组属性必须使用 camelCase + `.prop`
  - `:dataSource.prop="rows"`
  - `:columns.prop="cols"`
- 数字类型属性使用 camelCase 绑定即可，例如 `:pageSize="20"`
- 字符串和布尔属性必须使用 camelCase，例如 `rowKey="id"`、`showHeader`

## 4. 数据更新规则
- 传给 Web Components 的数组或对象禁止原地修改
- 需要通过生成新引用的方式触发组件更新
- 例如：

```ts
rows.value = [...rows.value, newRow];
rows.value = rows.value.map((item) => item.id === id ? nextItem : item);
```

## 5. 严格范例

```vue
<template>
  <div class="form-shell">
    <sl-input
      label="请输入名称"
      :value="value"
      @sl-input="handleInput"
    ></sl-input>

    <sl-button variant="primary" @click="handleSubmit">
      提交
    </sl-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import '@kdcloudjs/shoelace/dist/components/button/button.js';
import '@kdcloudjs/shoelace/dist/components/input/input.js';

const value = ref('');

function handleInput(event: Event) {
  value.value = (event.target as HTMLInputElement).value;
}

function handleSubmit() {
  console.log(value.value);
}
</script>
```

## 6. 扩展组件规则
- 标准组件参考官网 [https://shoelace.style/](https://shoelace.style/)
- KWC 扩展组件必须先阅读本地文档，严禁猜测 API
- `sl-dialog` 扩展属性 `mask-closable` 控制点击蒙层关闭，文档：`./reference/sl-dialog.md`
- `sl-table`：**严禁使用原生 HTML `<table>`**，必须使用 `sl-table`（KWC 扩展组件）。开源 Shoelace 不含 Table，但 `@kdcloudjs/shoelace` 已扩展提供，禁止退回原生 HTML 表格。`sl-table` 不支持 `sl-table-column`，必须使用 `columns` 属性定义列
- 日期选择器必须使用 `sl-datepicker`，不要退回到原生日期输入控件
- Upload 组件的对象/数组属性必须使用 `.prop` 修饰符（`:headers.prop`、`:fileList.prop`、`:beforeUpload.prop` 等）
- Upload 组件涉及自定义渲染（`itemRender`、`iconRender`）时，需使用 `lit` 的 `html` 模板字面量返回 `TemplateResult`
- 其他扩展组件（使用前**必须**阅读对应 reference 文档，严禁猜测 API）：
  - sl-thought-chain: `./reference/sl-thought-chain.md` · sl-daterange-picker: `./reference/sl-daterangepicker.md` · sl-tree-select: `./reference/sl-tree-select.md` · sl-cascader: `./reference/sl-cascader.md` · sl-float-button: `./reference/sl-float-button.md` · sl-steps: `./reference/sl-steps.md` · sl-grid: `./reference/sl-grid.md` · sl-notification: `./reference/sl-notification.md` · sl-radio-group: `./reference/sl-radio-group.md` · sl-space: `./reference/sl-space.md` · sl-segmented: `./reference/sl-segmented.md` · sl-transfer: `./reference/sl-transfer.md` · sl-popconfirm: `./reference/sl-popconfirm.md` · sl-bubble: `./reference/sl-bubble.md` · sl-image: `./reference/sl-image.md` · sl-sender: `./reference/sender/index.md` · sl-nav: `./reference/sl-nav.md` · sl-pagination: `./reference/sl-pagination.md` · sl-timepicker: `./reference/sl-timepicker.md` · sl-x-markdown: `./reference/sl-xmarkdown.md` · sl-think: `./reference/sl-think.md`

## 7. 样式规范
- 颜色、间距、字号、圆角优先使用 Shoelace Design Token
- 禁止在新增样式里大面积硬编码 hex 色值和 px 数值
- 编写样式前请先阅读 `reference/css-design-tokens.md`

## 8. 工程边界
- 本 Skill 不创建 KWC 工程
- 本 Skill 不调用 KWC CLI 脚手架命令
- 交付结果应适配现有 Vue 工程自己的目录结构和构建方式

## 9. 强制自检
- [ ] 组件已从 `dist/components/...` 导入
- [ ] 模板标签使用 kebab-case
- [ ] 事件使用 `@sl-*`
- [ ] 对象和数组属性使用 camelCase + `.prop`
- [ ] 复杂数据更新采用新引用
- [ ] 扩展组件已先阅读本地文档
- [ ] 样式优先使用 Design Token
