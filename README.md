# KWC Skills

**KWC Skills** 仓库用于统一管理和沉淀与 Kingdee Web Components (KWC) 和 LWC (Lightning Web Components) 相关的 AI 智能体专属技能 (AI Agent Skills)。

通过在 AI IDE 或智能开发助手中加载本仓库的 Skills，可以赋予 AI 处理 KWC 专属业务逻辑、熟悉特定组件 API 并强制遵循开发规范的能力，从而大幅提升代码生成的质量与合规性。

## 📦 当前包含的 Skills

### 1. [KWC LWC 开发专家](./skills/kwc-lwc-development) (`kwc-lwc-development`)
这是 KWC LWC 项目开发的核心辅助指令集。
- **核心定位**：项目开发入口与总指挥，提供组件创建、代码修改与技术咨询。
- **开发约束**：内置针对 KWC 架构的硬性代码约束，包括：
  - 必须继承 `@kdcloudjs/kwc` 提供的 `KingdeeElement`。
  - 模板中严格禁止 JS 表达式、禁止自闭合标签、禁止使用 ID 选择器。
  - 强制遵循事件绑定规范（纯 HTML 原生事件，在 JS `renderedCallback` 中处理 Shoelace 组件的自定义事件）。
  - `@kdcloudjs/shoelace` (`sl-*`) 组件必须包含 `kwc:external` 等特性。
- **参考文档**：内置了核心组件（如 DatePicker、TimePicker、Pagination、Table 等）的详细开发指引及示例。

## 🚀 如何使用

1. **配置并加载 Skill**：在兼容的 AI 开发平台（如本地 Agent 环境、光年 IDE 等）中，导入或加载本仓库下的具体 Skill 文件夹（例如 `skills/kwc-lwc-development`）。
2. **自动上下文识别**：Skill 内置了智能识别机制。当检测到当前项目环境符合 KWC 特征（如包含 `.kd` 文件夹或 `kwc.config.json`，且标识为 `lwc` 框架）时，AI 将自动激活这套专属的开发规范。
3. **获取解答与代码**：一旦加载并生效，您可以自然语言提问或指派编码任务，AI 将严格遵守 `SKILL.md` 与 `rule.md` 中的规范为您生成高度符合要求的零修改或少修改代码。

## 📂 仓库结构

```text
kwc-skills/
├── README.md                 # 仓库入口说明（本文档）
└── skills/                   # 不同场景维度的 AI Skills 集合
    └── kwc-lwc-development/  # KWC LWC 前端开发专家 Skill
        ├── SKILL.md          # 技能核心描述、入口与工作流定义
        ├── rule.md           # [需结合实际内容] 强制开发规范与约束
        ├── assets/           # 优质示例代码
        └── reference/        # 专属扩展组件文档 (DatePicker, Table 等)
```

## 🤝 参与贡献

如果您在使用过程中总结了新的踩坑经验、或者有了更优的代码模式，欢迎为本仓库贡献力量：
1. **完善文档与参考**：在特定 Skill 的 `reference/` 或 `assets/` 目录下提交更多的 API 用法和最佳实践代码。
2. **补充校验规则**：将常犯的错误或新的框架限制补充至对应 Skill 的 `rule.md` 或 `SKILL.md` 检查清单中，以提升 AI 准确率。
3. **新增 Skill**：如果出现了有别于当前 LWC 业务模块的新型架构或大模块，可以在 `skills/` 下新建独立的 Skill。
