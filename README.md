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

## 推荐组合

- **KWC React 项目**：`kwc-project-scaffold` + `kwc-react-development`
- **KWC Vue 项目**：`kwc-project-scaffold` + `kwc-vue-development`
- **KWC LWC 项目**：`kwc-project-scaffold` + `kwc-lwc-development`
- **通用 React 组件项目**：`kwc-shoelace-react`
- **通用 Vue 组件项目**：`kwc-shoelace-vue`

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
    ├── kwc-lwc-development/
    ├── kwc-project-scaffold/
    ├── kwc-shoelace-react/
    ├── kwc-react-development/
    ├── kwc-shoelace-vue/
    └── kwc-vue-development/
```

## 贡献方向

- 补充扩展组件文档和高质量示例
- 更新 `rule.md` 中的强约束和常见踩坑
- 新增适用于不同工程形态的 Skill
