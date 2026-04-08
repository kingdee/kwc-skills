# KWC Skills

**KWC Skills** 仓库用于统一管理和沉淀与 Kingdee Web Components (KWC) 相关的 AI 智能体技能。

这些 Skill 分成两类：
- **KWC 工程型 Skill**：面向 KWC React、Vue、LWC 工程，以及从 0 到 1 的脚手架、元数据、部署和调试流程
- **组件型 Skill**：面向不依赖 KWC 工程结构、只需要在 React/Vue 项目中使用 `@kdcloudjs/shoelace` 与 KWC 扩展组件的场景

## 当前包含的 Skills

### 1. `kwc-project-scaffold`

KWC 项目的总入口 Skill，负责需求拆分、`kd project init/create`、组件元数据 `.js-meta.kwc`、页面元数据 `.page-meta.kwp`、环境配置、`deploy`、`debug` 等全流程能力。推荐所有 KWC 工程场景优先安装。

### 2. `kwc-react-development`

面向 **KWC React 工程** 的开发 Skill。适合已经处在 KWC React 项目中的组件开发、页面构建和规范约束场景。

### 3. `kwc-vue-development`

面向 **KWC Vue 工程** 的开发 Skill。适合已经处在 KWC Vue 项目中的组件开发、页面构建和规范约束场景。

### 4. `kwc-lwc-development`

面向 **KWC LWC 工程** 的开发 Skill。适合 KWC/LWC 模式下的组件开发、模板约束和事件处理场景。

### 5. `kwc-shoelace-react`

面向 **通用 React 项目** 的组件 Skill。适用于不使用 KWC 工程结构、只需要在现有 React 工程中正确接入 `@kdcloudjs/shoelace` 与 KWC 扩展组件的场景。

### 6. `kwc-shoelace-vue`

面向 **通用 Vue 3 项目** 的组件 Skill。适用于不使用 KWC 工程结构、只需要在现有 Vue 工程中正确接入 `@kdcloudjs/shoelace` 与 KWC 扩展组件的场景。

### 7. `kwc-ks-controller-development`

面向 **KWC KingScript 脚本控制器** 的开发 Skill。专注于 Controller XML 配置编写和 KingScript/TypeScript 代码实现，当项目中需要后端 REST API 时使用。

### 8. `kingscript-code-generator`

面向 **Kingscript 二开场景** 的代码生成与知识检索 Skill。提供 SDK 索引、插件模板、代码示例、语言规范和风险审查能力，支持 Qoder、Codex、Claude Code 三个平台。

## 推荐组合

- **KWC React 项目**：`kwc-project-scaffold` + `kwc-react-development`
- **KWC Vue 项目**：`kwc-project-scaffold` + `kwc-vue-development`
- **KWC LWC 项目**：`kwc-project-scaffold` + `kwc-lwc-development`
- **通用 React 组件项目**：`kwc-shoelace-react`
- **通用 Vue 组件项目**：`kwc-shoelace-vue`
- **KWC KS Controller 开发**：`kwc-project-scaffold` + `kwc-ks-controller-development` + `kingscript-code-generator`
- **Kingscript 二开（插件/脚本）**：`kingscript-code-generator`

## 如何使用

1. 在准备开始开发的工作目录中运行：

   ```bash
   npx skills add kingdee/kwc-skills
   ```

2. 按照当前项目场景选择需要的 Skill 组合。
3. 让 AI 在对应 Skill 约束下完成项目初始化、组件开发或组件接入。

## 仓库结构

```text
kwc-skills/
├── README.md
└── skills/
    ├── kingscript-code-generator/
    ├── kwc-ks-controller-development/
    ├── kwc-lwc-development/
    ├── kwc-project-scaffold/
    ├── kwc-react-development/
    ├── kwc-shoelace-react/
    ├── kwc-shoelace-vue/
    └── kwc-vue-development/
```

## 贡献方向

- 补充扩展组件文档和高质量示例
- 更新 `rule.md` 中的强约束和常见踩坑
- 新增适用于不同工程形态的 Skill
