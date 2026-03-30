# Vue 组件开发硬性约束

所有通用 Vue 3 项目中的 KWC 组件开发都必须遵守以下规则。

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
- `sl-table` 不支持 `sl-table-column`，必须使用 `columns` 属性定义列
- 日期选择器必须使用 `sl-datepicker`，不要退回到原生日期输入控件

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
