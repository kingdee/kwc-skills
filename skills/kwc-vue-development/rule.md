# KWC Vue 开发硬性约束 (Hard Rules)

所有 KWC Vue 开发工作必须严格遵守以下约束。违反这些规则的代码将无法运行或无法通过审查。

> **框架版本**：本项目基于 **Vue 3**，统一使用 Composition API + `<script setup>` 语法。**绝对禁止**使用 Vue 2 的 Options API 或 Vue 2 特有语法。

## 1. Vue 3 基础规范
- **Composition API**：
  - 统一使用 `<script setup>` 或 `<script setup lang="ts">` 语法。
  - **禁止** Options API（`export default { data(), methods, computed, watch, mounted() }`）。
  - **禁止**使用 `this`（Composition API 中无 `this`）。
- **响应式状态**：
  - 使用 `ref()` 声明基础类型响应式数据，使用 `reactive()` 声明对象类型。
  - 修改 `ref` 值使用 `.value`。
- **生命周期**：使用 `onMounted()`、`onUnmounted()` 等 Composition API 钩子，**禁止** `mounted()`、`created()` 等 Options API 钩子。
- **Vue 2 禁止语法清单**：
  - `Vue.use()` / `Vue.component()` / `new Vue()` → 无需注册，导入即用
  - `this.$refs` / `this.$emit` / `this.$set` / `this.$delete` → 使用 `ref()` / `emit()` / 直接赋值
  - `<slot>` 中 `v-bind` slot 属性（Scoped Slots Vue 2 语法） → 使用 Vue 3 `#slotName` 语法
- **⭐ 极度重要：自定义单元格 / 展开行 slot 写法**：
  - **禁止**在 `<template>` 上使用 `v-for` + 动态插槽指令（如 `#[\`custom-cell-xxx-${row.id}\`]`），在 Vite 编译时会报 错。
  - **正确写法**：在 `v-for` 循环的**元素本身**上绑定 `:slot` 属性：
    ```html
    <!-- ✅ 正确：在循环元素上绑定 :slot -->
    <div
      v-for="row in dataSource"
      :key="row.id"
      :slot="`custom-cell-status-${row.id}`"
    >
      ...
    </div>

    <!-- ❌ 错误：在 <template> 上使用 v-for + 动态插槽指令，Vite 编译报错 -->
    <template v-for="row in dataSource" #[`custom-cell-status-${row.id}`] :key="row.id">
      <div>...</div>
    </template>
    ```

## 2. 导入规范
- **Shoelace 组件导入**：
  - 必须从 `@kdcloudjs/shoelace/dist/components/[component]/[component].js` 导入。
  - 导入即注册 Web Component，无需 `Vue.use()` 或 `components: {}` 注册。
  - 示例：`import '@kdcloudjs/shoelace/dist/components/input/input.js';`

## 3. 模板规范 (Template)
- **组件标签**：必须使用 kebab-case 标签（如 `<sl-input></sl-input>`），禁止 PascalCase（`<SlInput>`）。
- **Shoelace 事件绑定**：
  - 必须使用 `@sl-*` 绑定自定义事件。
  - 示例：`@sl-change="handleChange"`，`@sl-input="handleInput"`。
  - 禁止使用 `@change` 或 `@input` 监听 Shoelace 组件（除非组件文档明确支持原生事件）。
- **属性绑定**：
  - 使用 `:prop` 绑定属性。
  - 使用 `v-model` 进行双向绑定（需组件支持 `v-model` 接口）。
  - Boolean 属性直接写属性名表示 true，省略表示 false。
  - **⭐ 极度重要：对象/数组类型属性必须用 camelCase + `.prop` 修饰符**：
    - 由于 DOM attribute 只能为字符串，传递对象/数组类型的属性时必须直接设置 DOM property。
    - **属性名必须使用 camelCase**：kebab-case 的动态绑定无法正确映射到 DOM property。
    - **必须添加 `.prop` 修饰符**：强制 Vue 3 以 DOM property 方式传递值。
    ```html
    <!-- ✅ 正确：camelCase + .prop 修饰符 -->
    <sl-table :dataSource.prop="rows" :columns.prop="cols" :rowSelection.prop="sel"></sl-table>
    <sl-pagination :pageSizeOpts.prop="[25, 50, 100]"></sl-pagination>

    <!-- ❌ 错误：kebab-case 绑定，数组/对象会变成 [object Array] / [object Object] -->
    <sl-table :data-source="rows" :row-selection="sel"></sl-table>
    <sl-pagination :page-size-opts="[25, 50, 100]"></sl-pagination>
    ```
  - **数字类型属性**：使用 camelCase 绑定，不需要 `.prop` 修饰符（如 `:pageSize="20"`、`:currentPage="1"`）。
  - **字符串和布尔属性**：必须使用 camelCase，无需 `.prop`（如 `rowKey="id"`、`showHeader`、`simpleMode`）。**禁止** kebab-case（如 `row-key`、`show-header`、`simple-mode`）。
    ```html
    <!-- ✅ 正确：camelCase 属性名 -->
    <sl-table rowKey="id" showHeader></sl-table>
    <sl-pagination simpleMode></sl-pagination>

    <!-- ❌ 错误：kebab-case 属性名 -->
    <sl-table row-key="id" show-header></sl-table>
    <sl-pagination simple-mode></sl-pagination>
    ```

## 4. Shoelace 组件集成规范
- **通用规则**：
  - **库说明**：`@kdcloudjs/shoelace` 是 `@shoelace-style/shoelace` 的 **100% 克隆**，标准组件 API **完全一致**，仅新增了部分 KWC 专用组件。
  - **包名**：必须使用 `@kdcloudjs/shoelace`，禁止使用 `@shoelace-style/shoelace`。
  - **属性名**：向 Shoelace 组件传递属性时，属性名**必须使用 camelCase**（如 `rowKey`、`showHeader`、`simpleMode`），**禁止** kebab-case（如 `row-key`、`show-header`、`simple-mode`）。
  - **样式**：默认不手工导入主题 CSS，平台通常已注入。
- **排障**：
  - **组件不渲染样式**：检查是否在 script 中导入了 `.js` 文件。

## 5. 事件与数据处理
- **事件对象**：在处理函数中通过 `event.target` 获取组件值（Shoelace 组件通常是 Web Component，`v-model` 可能不适用所有场景）。
  - 示例：`const value = (event.target as HTMLInputElement).value;`
- **响应式状态**：
  - 推荐使用 `ref` 或 `reactive` (Composition API)。
  - 保持事件命名与业务语义一致（如 `handleInput`、`handleSubmit`）。
- **⭐极度重要：Web Components 响应式数据更新**：
  - 向 Shoelace/KWC Web Components （例如 `sl-table` 的 `:dataSource.prop`）传递复杂数据（数组/对象）时，**绝对禁止**进行“原地修改”（如调用 `push`、`splice` 或直接修改对象属性）。
  - Web Components 内部（基于 Lit）进行的是严格的引用比对（`===`），只有整个数组/对象引用发生改变时，才会触发组件重新渲染。即使你在 Vue 中使用了 `reactive`，原地修改也无法驱动组件刷新。
  - **规范写法**：始终使用不可变方式更新数据，如 `dataSource.value = [...dataSource.value, newItem]` 或 `dataSource.value = dataSource.value.map(...)` 生成**全新的引用**并重新赋值。

## 6. KWC 扩展组件文档与约束
- **标准组件**（Button/Input/Dialog/Icon 等）：参考官网 [https://shoelace.style/](https://shoelace.style/)
- **扩展组件**：以下组件为 KWC 专用扩展组件（不在 Shoelace 官网），当任务涉及这些组件时，**必须立即调用 Read 工具读取并学习**对应的 reference 文档，严禁凭空猜测 API：

- **表格 (Table)**:
  - 文档：`./reference/table/index.md` (**涉及表格开发时必须读取**)
  - `sl-table` 不支持 `sl-table-column`，必须通过 `columns` 属性定义列。
  - 需导入 `@kdcloudjs/shoelace/dist/components/table/table.js`。
- **日期选择器 (DatePicker)**:
  - 文档：`./reference/datepicker/index.md`
  - 严禁使用 `<sl-input type="date">`，必须使用 `<sl-datepicker>`。
- **时间选择器 (TimePicker)**:
  - 文档：`./reference/sl-timepicker.md`
- **分页器 (Pagination)**:
  - 文档：`./reference/sl-pagination.md`
- **导航 (Nav)**:
  - 文档：`./reference/sl-nav.md`
  - 涉及 `sl-nav`、`sl-nav-item`、`sl-nav-group`、`sl-nav-submenu` 时必须先阅读
- **Markdown 渲染器 (XMarkdown)**:
  - 文档：`./reference/sl-xmarkdown.md`
  - 涉及 `sl-x-markdown` 时必须先阅读
- **思考过程 (Think)**:
  - 文档：`./reference/sl-think.md`
- **消息发送 (Sender)**:
  - 文档：`./reference/sender/index.md` (**涉及 Sender 开发时必须读取**)
  - 包含 `sl-sender`（主体）、`sl-sender-header`（可折叠头部）、`sl-sender-switch`（功能开关）三个子组件
  - 需导入对应的 `.js` 定义文件

## 7. 开发工具与环境约束 (Tools & Environment)
- **严禁运行 ESLint/Prettier 修复与校验**：**绝对禁止**运行任何形式的 lint fix 命令（无论是手动还是自动，如 `eslint --fix`）。同时，**不需要**关注或修复 ESLint 格式报错。KWC Vue 的特殊语法可能与通用规则冲突，强行修复会导致代码损坏。
- **严禁修改既有配置**：严禁修改 `.eslintrc`, `.prettierrc` 或 `package.json` 中的构建脚本。

## 8. CSS 样式规范 — 必须使用 Design Token
- 编写 CSS 时，颜色、间距、字号、圆角等属性**必须**使用 Shoelace Design Token，**禁止**硬编码 hex 色值或 px 数值。
- 完整的 Token 速查表（颜色/间距/字号/圆角映射、正反示例、例外情况）请参考：`./reference/css-design-tokens.md`
- **编写 CSS 代码前必须阅读该文档。**

## 9. 强制自检清单
- [ ] 使用 Vue 3 Composition API (`<script setup>`)，未使用 Options API
- [ ] 已导入所有使用的 Shoelace 组件 (`import '.../dist/components/...'`)
- [ ] 模板中使用 kebab-case 标签 (`<sl-input>`)
- [ ] 事件绑定使用 `@sl-*` (`@sl-change`)
- [ ] 响应式状态使用 `ref()` / `reactive()`，未使用 `this`
- [ ] 自定义单元格/展开行 slot 使用 `v-for` + `:slot="\`...-${row.id}\`"` 绑定，**未**在 `<template>` 上使用动态插槽指令
- [ ] 未运行 `eslint --fix`
