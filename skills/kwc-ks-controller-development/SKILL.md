---
name: kwc-ks-controller-development
description: 【KWC KS Controller 开发阶段 Skill】仅当 app/ks/controller/ 目录存在时激活。专注于 KingScript 脚本控制器的 .kws 元数据编写和 TypeScript/KingScript 代码实现。不负责工程创建、构建或部署（交由 kwc-project-scaffold）。涉及 KingScript 语言规范和 SDK 使用时，引用 kingscript-code-generator 技能包。若任务涉及 kd CLI、构建、部署，必须切换到 kwc-project-scaffold。
---

# KWC KS Controller 开发专家

当项目中需要开发 KingScript 脚本控制器（后端 REST API）时，本 Skill 负责控制器的 .kws 元数据配置和脚本代码实现。

**必须严格遵守本 Skill 目录下的 `rule.md` 中定义的硬性约束。**

## 使用前置条件

**必须同时满足以下条件才能使用本 Skill：**
1. 当前目录已存在 `.kd/config.json` 文件
2. 工程中已存在 `app/ks/controller/` 目录
3. 工程已通过 `kwc-project-scaffold` 完成初始化

**以下场景必须交由 `kwc-project-scaffold`：**
- 工程初始化、创建组件/页面/Controller 目录（`kd project init` / `kd project create`）
- 生成或修改 `.js-meta.kwc` / `.page-meta.kwp` 元数据
- 环境配置、构建、部署、调试（`kd env` / `npm run build` / `kd project deploy` / `kd debug`）

## 标准工作流

1. **确认目录存在**：Controller 目录已由 scaffold 创建（`app/ks/controller/<Name>/`）
2. **查询实体字段**（涉及业务实体操作时）：通过 `meta-query-api.mjs` 获取真实字段结构，**禁止猜测字段名**
3. **编写 .kws 元数据**：定义 URL 路由、HTTP 方法和权限
4. **编写脚本代码**：实现业务逻辑，SDK 调用前先在索引中确认存在
5. **交付构建**：完成后通知用户回到 scaffold 进行部署

## 参考资源

| 类别 | 资源 | 路径 |
|------|------|------|
| **本 Skill** | .kws 元数据配置规范 | `./reference/kws-metadata-reference.md` |
| | Controller 集成工作流 | `./reference/controller-scaffold-workflow.md` |
| | 常见模式和代码示例 | `./reference/controller-patterns.md` |
| | 前端 adapterApi 调用指南 | `./reference/frontend-integration.md` |
| **KingScript** | 脚本控制器开发指南 | `../kingscript-code-generator/references/docs/custom-development/脚本控制器开发指南.md` |
| | 语言基础 | `../kingscript-code-generator/references/language/kingscript/README.md` |
| | SDK 类索引 | `../kingscript-code-generator/references/sdk/indexes/class-index.md` |
| | SDK 方法索引 | `../kingscript-code-generator/references/sdk/indexes/method-index.md` |
| | SDK 场景索引 | `../kingscript-code-generator/references/sdk/indexes/scenario-index.md` |
| | SDK 策略和降级链路 | `../kingscript-code-generator/references/sdk/strategy.md` |
| | Java-KS 类型桥接 | `../kingscript-code-generator/references/sdk/docs/java-kingscript-bridge.md` |
| **Scaffold** | 实体字段查询工具 | `../kwc-project-scaffold/references/meta-query.md` |
