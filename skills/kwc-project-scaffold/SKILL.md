---
name: kwc-project-scaffold
description: 使用 KWC CLI (kd) 将用户需求翻译成可交付的 KWC 工程、组件、页面元数据、环境配置、部署与调试结果。当 Agent 需要脚手架初始化或扩展 KWC 项目、拆分功能为 KWC 组件、创建或更新 *.page-meta.kwp、配置 kd env、部署元数据到目标环境，或引导从需求到 KWC 页面渲染的全流程时使用。
---

# KWC Project Scaffold

将本 Skill 作为 KWC 工程脚手架工作的入口。
优先把用户需求归入以下几类：初始化项目、创建组件、创建页面元数据、配置环境、部署、调试。

## 正确认知交付对象

不要把 KWC 工作流理解成“本地把一个组件渲染出来”。
KWC 的核心交付对象是：

1. 组件工程本身
2. 页面元数据 `*.page-meta.kwp`
3. 目标环境配置与认证
4. 通过 `kd project deploy` 上传后的环境渲染结果

页面最终展示依赖页面元数据中的 `<controls>` 和组件类型映射，而不是本地 `main.tsx` 是否挂载了某个组件。
`main.tsx` 和 `npm run dev` 只用于本地辅助预览，不是最终交付路径。

## 元数据优先的开发模型

从用户开发角度看，一个 KWC 功能要拆成三层：

1. 组件代码：真正负责渲染和行为逻辑
2. 组件元数据 `.js-meta.kwc`：声明“这个组件可以被页面如何引用、可以暴露哪些可配置属性”
3. 页面元数据 `.page-meta.kwp`：声明“这个页面由哪些组件实例组成，并给每个实例传什么属性值”

因此，面对需求时不要只问“要写几个组件”，还要继续判断：

- 哪些参数是写死在组件代码里的
- 哪些参数需要暴露给页面配置者，通过组件元数据定义为 `<property>`
- 哪些组件实例会出现在页面元数据的 `<controls>` 中

默认原则：

- 能固定在组件内部的实现细节，不要暴露到元数据
- 只有需要被页面装配、复用、配置的参数，才进入组件元数据和页面元数据

## 先把需求翻译成工程目标

面对“帮我开发一个 KWC 页面/功能”的请求时，先把需求翻译成下面几项：

1. 是否需要新建工程，还是在已有工程里继续开发
2. 需要几个组件，各自承担什么职责
3. 需要几个页面元数据文件，页面里如何组合这些组件
4. 最终要部署到哪个环境
5. 是否还需要进入 `kd debug` 做联调验证

只有把这几项补齐，脚手架命令才有明确目标。

## 框架开发 Skill 协作

将 `kwc-project-scaffold` 视为 KWC 工作流的总入口，但不要让它吞掉框架开发 Skill 的职责。

### 协作边界表

| 任务阶段 | 负责 Skill | 产出物 |
|----------|------------|--------|
| 工程初始化 | scaffold | .kd/config.json |
| 创建组件目录 | scaffold | app/kwc/Component/ |
| 编写组件代码 | react/vue/lwc-development | *.tsx / *.vue / *.js |
| 补全组件元数据 | scaffold | *.js-meta.kwc |
| 创建页面元数据 | scaffold | *.page-meta.kwp |
| 环境配置与部署 | scaffold | 环境渲染结果 |

### 切换时机

- 当任务仍处于需求拆分、脚手架命令、元数据、环境、`deploy`、`debug` 阶段时，继续由本 Skill 主导
- 当 `kd project create` 完成后需写代码 → 切到框架 Skill
- 当代码写完需补元数据或部署 → 回到 scaffold

### 推荐规则

1. 若是新建工程，以 `kd project init` 交互中用户选择的 framework 作为后续推荐 Skill 依据
2. 若是已有工程，以 `.kd/config.json` 中的 `framework` 作为推荐 Skill 依据
3. 当 `framework=react` 时，建议转入 `kwc-react-development`
4. 当 `framework=vue` 时，建议转入 `kwc-vue-development`
5. 当 `framework=lwc` 时，建议转入 `kwc-lwc-development`
6. 若还无法判断 framework，先停下来向用户确认

注意：不要同时加载三个框架开发 Skill；只根据当前工程的 framework 推荐一个。

## 需要用户提供或确认的输入

这些输入若无法从现有工程或上下文推断，就必须向用户确认：

- 项目名或现有项目路径
- 框架和语言
- 苍穹应用编码 `app`
- 目标环境别名和 URL
- 认证方式，以及 OpenAPI 所需的真实参数
- 页面标识，例如 page name，以及业务页面用途
- 哪些组件需要暴露给页面使用，哪些只是内部逻辑组件
- 哪些参数需要做成可配置属性
- 若用户已有环境，是否允许直接部署到该环境

这些信息不要擅自编造，尤其是 `app`、环境 URL、认证参数和最终部署环境。

关于 `isv`（开发商标识）：开发阶段可以留空，在组件与环境绑定时会从环境拉取开发商标识，`kd project deploy` 时会自动写入组件和页面元数据，因此不需要用户手工提供或维护。

对 `app` 使用最严格的规则（本节为全文唯一权威定义）：

- `app` 必须由用户明确提供，或来自 `.kd/config.json`
- 不可猜测、不可使用示例值
- 新建工程时在 `kd project init` 交互中输入
- 若无 `app`，不继续生成元数据或部署

## 由 Skill 自动决策或生成的内容

这些内容应由 Skill 基于用户需求主动完成，不要把它们再推回给用户逐项设计：

- 将业务需求拆成组件列表
- 为组件生成稳定的 `PascalCase` 名称
- 为页面和实例生成符合规范的小写标识
- 判断组件是否需要保留 `.js-meta.kwc`，还是应删除以避免被当成可部署组件
- 将需求映射为组件元数据里的 `<property>`
- 为页面生成 `page-meta.kwp` 并填充 `<controls>`
- 为页面中的每个组件实例生成唯一 `name`
- 判断当前该执行 `init`、`create`、`deploy` 还是 `debug`
- 调试时结合当前任务、页面元数据和最近改动，自行判断优先预览哪个页面
- 仅当对应元数据文件变更并需要重新上传时，递增该元数据的 `version`
- 在环境操作后复核 `kd env list` 和 `kd env info`

默认策略是：让用户确认不可推断的关键环境参数，由 Skill 负责把需求落实成工程结构和元数据。

`app` 是例外：即使在自动决策范围内，也必须严格遵守"需要用户提供或确认的输入"中的 `app` 规则。

## 从需求生成组件元数据

当用户要“开发一个页面功能”时，不要等到最后才补 `.js-meta.kwc`。
应在组件职责确定后，立即判断组件元数据应如何生成。

按这个顺序处理：

1. 先识别组件是否会被页面元数据直接引用。
2. 若会被页面引用，就保留并完善对应的 `.js-meta.kwc`。
3. 若组件只是内部复用逻辑、不需要在元数据页面中声明，可删除对应 `.js-meta.kwc`，避免被脚手架当作可部署组件。
4. 将“页面配置者可调的参数”提炼为 `<property>`，不要把所有内部 props 都暴露出去。

组件元数据至少应关注这些字段：

- `version`：自然数；脚手架模板可能留空，Skill 需要补成有效值
- `name`：通常与组件名保持一致，作为组件类型标识
- `masterLabel`：组件在页面装配侧显示的名称
- `isv`：开发商标识，开发阶段可留空，deploy 时自动从环境拉取写入
- `app`：规则见“需要用户提供或确认的输入”一节
- `framework`
- `targets`
- `targetConfigs`

如果需要字段规则、类型和示例，读取：

- `references/component-metadata.md`

## 从需求生成页面元数据

页面元数据不是简单“列出组件名称”，而是把用户要的页面装配结构显式写出来。

按这个顺序处理：

1. 先确定页面名称、标题、所属应用、业务单元、版本策略。
2. 根据需求把页面拆成一个或多个组件实例。
3. 为每个实例生成 `<control>`。
4. `control.type` 必须与组件元数据里的组件 `name` 完全一致，包含大小写也必须一致。
5. `control.name` 是页面内唯一实例名，必须符合页面元数据命名规范。
6. 只有组件元数据中定义过的属性，才能写进 `<propertys>`。

例如，若组件元数据中的 `name` 是 `OverviewCard`，则页面元数据里的 `control.type` 只能写 `OverviewCard`。
不要因为组件目录在 `app/kwc/` 下，就擅自写成 `kwc_OverviewCard`；这类前缀不是组件类型名的一部分。

页面字段默认策略：

- `template` 默认使用 `oneregion`
- `isv` deploy 时自动写入，无需手填
- `app` 规则见“需要用户提供或确认的输入”一节

如果需要字段规则、校验约束和示例，读取：

- `references/page-metadata.md`

## 先判断当前所处阶段

按这个顺序判断并推进：

1. 若当前目录下不存在 `.kd`，先视为“尚未初始化 KWC 工程”。
2. 若用户要新建页面或组件，优先使用 `kd project create`，不要手工拼目录结构。
3. 若用户要部署或调试，先检查环境是否已经通过 `kd env create` 和 `kd env auth openapi` 完成配置。
4. 若用户开始编写具体前端实现代码，先判断当前工程 framework，再建议转入对应框架的专用 Skill，不要把本 Skill 当成组件编码规范。

## 执行前置检查

先确认以下前提：

- 将 `Project` 理解为本地工程目录。
- 将 `Env` 理解为远端苍穹环境。
- 提醒用户本地需具备 `node`、`npm`、`git`。

## 初始化工程

在用户尚未拥有 KWC 工程时，按以下流程执行：

1. 安装 CLI。
2. 运行 `kd project init <project-name>`。
3. 在交互流程中按用户要求选择框架和语言；若用户未指定，应主动询问。
4. 输入应用标识 `app`（规则见“需要用户提供或确认的输入”一节）。
5. 初始化完成后进入项目目录，执行 `npm install`。
6. 仅在需要本地辅助预览组件时，再执行 `npm run dev`。

补充：`kd project init` 依赖 `git clone` 下载模板，若失败优先检查 `git`。

## 创建组件

在已有项目中新增组件时：

1. 运行 `kd project create <ComponentName> --type kwc`。
2. 使用 `PascalCase` 组件名。
3. 让 CLI 生成目录和基础文件，再在生成结果上修改代码。
4. 立刻检查生成出来的 `.js-meta.kwc`，补齐可部署所需字段和属性定义。
5. 若用户同时要创建多个组件，逐个执行创建命令，不要手工复制推断目录结构。

若用户只提供了页面结构想法，没有组件名，先根据语义生成稳定、可复用的组件名，再创建。
若用户给的是完整业务诉求，而不是组件清单，先主动拆分组件职责，再批量创建。

补充：组件生成在 `app/kwc/<ComponentName>/` 下；脚手架生成的 `.js-meta.kwc` 只是模板，需按上述规则补齐。

## 创建页面元数据

页面元数据是最终交付链路的核心。
环境在部署后会根据 `page-meta.kwp` 的 `<controls>` 来渲染页面包含的组件，因此这里不是可选步骤，而是页面交付的主入口。

在需要新增页面时：

1. 运行 `kd project create <page-name> --type page`。
2. 打开 `app/pages/<page-name>.page-meta.kwp`。
3. 至少核对并填写 `name`、`masterLabel`、`app`、`version`。
4. 在 `<controls>` 中把页面实例和组件类型关联起来。
5. 仅当该页面元数据文件有变更并准备重新上传时，手动将 `version` 加 `1`。
6. 将组件树、实例名和页面布局映射到 XML，而不是停留在“组件已经创建”这一步。

不要忽略以下约束：

- `type` 是组件类型名，必须与组件元数据中的组件 `name` 完全一致，不能只做到语义对应或名称相近。
- `name` 是组件实例名，需要在页面内唯一。
- `isv` 开发阶段可留空，deploy 时会自动从环境拉取并写入
- `app` 规则见“需要用户提供或确认的输入”一节

若需要字段规则、校验约束和示例，读取 `references/page-metadata.md`。

补充：新生成的 `page-meta.kwp` 默认只包含注释掉的 `<control>` 模板，Skill 必须根据需求主动补全 `<controls>`。

## 脚手架命令的推荐编排

当用户要新增一个完整 KWC 页面功能时，优先按这条顺序执行：

1. 若无工程，执行 `kd project init`
2. 对每个“会出现在页面里的组件”执行 `kd project create <ComponentName> --type kwc`
3. 确认当前工程 framework；若后续进入代码实现，建议切换到对应框架开发 Skill
4. 实现组件代码
5. 补全组件 `.js-meta.kwc`
6. 执行 `kd project create <page-name> --type page`
7. 补全页面 `app/pages/<page-name>.page-meta.kwp`
8. 确认或创建目标环境，完成认证
9. 若元数据有变更，执行 `kd project deploy`
10. 需要联调时执行 `kd debug`

如果是修改已有页面：

1. 先识别是改组件实现、改组件元数据、改页面元数据，还是三者都改
2. 参考“是否需要 deploy 决策”决定后续操作

## 配置环境

在部署前先完成环境配置。

### 环境存在性检查

当用户提供了具体的环境名称或别名（如 `dev`、`sit`、`uat` 等）时，应先执行环境存在性检查：

1. 运行 `kd env list` 查看当前已配置的环境列表
2. 若目标环境已存在于列表中：
   - 不需要再让用户提供 URL、Client ID/Secret 等环境信息
   - 直接使用该环境进行后续操作（如 deploy、debug）
   - 若该环境不是当前默认环境，可通过 `kd env set target-env <name>` 切换
   - 使用 `kd env info` 确认环境认证状态
3. 只有当环境不存在时，才进入完整的环境创建和认证流程

### 新建环境流程

当环境不存在时，按以下流程执行：

1. 使用 `kd env create <env-name> --url <url>` 创建环境别名。
2. 使用 `kd env auth openapi` 走交互式认证。
3. 若用户经常切换环境，可用 `kd env set target-env <env-name>` 设置默认环境。
4. 必要时使用 `kd env list` 和 `kd env info` 检查当前配置。

优先采用 `openapi` 认证方式；`web` 模式暂不作为默认路径。

### 需要收集环境信息的情况

如果目标环境不存在，或环境存在但尚未完成认证，先停下来收集这些字段：

- 环境别名
- 环境 URL
- Client ID
- Client Secret
- Username

其中 `data center` 不属于预先手填字段，而属于“读取后选择”的字段：

- 先有环境 URL
- 再进入 `kd env auth openapi`
- 由脚手架读取该环境可用的数据中心列表
- 最后让用户从列表中选择

收集规则：

- 环境别名、环境 URL、Client ID、Client Secret、Username 这些值必须由用户手工提供
- `data center` 不要让用户自由输入，应让脚手架读取候选项后再选择
- 不要使用历史环境中的凭据去猜测新环境
- 不要因为存在 `dev`、`sit`、`base` 等别名，就自动推断这次要绑定哪个环境

交互方式规则：

- 不要假设当前一定支持弹窗或表单式输入
- 在当前常规模式下，先让用户回填手工字段，再在 `kd env auth openapi` 的交互里选择数据中心
- 若运行环境明确支持结构化选择工具，可以在读到数据中心列表后把候选项展示给用户选择
- 即便如此，Client Secret 这类自由文本仍应让用户手填

推荐向用户索要环境信息的格式：

```text
请补充以下环境信息：
1. env name:
2. env url:
3. client id:
4. client secret:
5. username:

说明：data center 不需要先手填，后续会由脚手架读取候选项供选择。
```

补充：环境配置保存在 `~/.kd` 而非项目目录；创建后必须用 `kd env list` 复核是否持久化成功；`kd env auth openapi` 在 URL 不可达时会直接失败。

## 部署与调试

### 是否需要 deploy 决策

```
改了什么？
├── 只改 .tsx/.vue/.js/.html/.scss → 不需要 deploy，执行 npm run build
├── 改了 .js-meta.kwc → version + 1，然后 deploy
├── 改了 .page-meta.kwp → version + 1，然后 deploy
└── 新建组件/页面 → version = 1，然后 deploy
```

### 常用命令

1. `kd project deploy`：部署整个项目到默认环境
2. `kd project deploy -d app/kwc/MyComponent -e sit`：仅部署指定组件到 `sit`
3. `kd project deploy -d app/pages/my_page -e sit`：仅部署指定页面元数据到 `sit`
4. `kd debug`：进入调试，脚手架自动打开浏览器

### 调试约定

- 统一直接运行 `kd debug`
- 若目标环境不是当前默认环境，先执行 `kd env set target-env <env-name>`
- 不要手工拼调试 URL，由 AI 自行结合任务和页面元数据判断预览目标
- 浏览器自动打开后继续定位目标页面

补充：环境未认证时 `kd project deploy` 会直接阻止部署。

## 端到端执行原则

当用户说“帮我开发一个 KWC 页面/功能”时，默认按这条链路推进：

1. 识别是新工程还是已有工程
2. 收集不可推断的环境输入
3. 拆分组件并创建组件工程
4. 实现组件代码
5. 创建并补全页面元数据
6. 配置环境并确认认证状态
7. 若元数据有变更，执行 `deploy`
8. 必要时执行 `debug`

不要只完成其中的“创建组件”或“本地跑起来”，除非用户明确只要某个局部步骤。

## 输出要求

输出方案或执行命令时，尽量同时给出：

- 用户还需要补充哪些关键输入
- 当前处于哪个阶段
- 下一条应执行的命令
- 是否依赖已有环境认证
- 是否需要修改 `page-meta.kwp`
- 页面元数据将如何组合组件
- 是否真的需要 `deploy`
- 若需要部署，是否因为元数据变更而必须递增 `version`

## 故障排查速查表

| 症状 | 可能原因 | 解决方案 |
|------|----------|----------|
| `kd project deploy` 提示未认证 | 环境未执行 auth | `kd env auth openapi` |
| 页面元数据上传失败 | version 未递增 | 递增 version 后重试 |
| 页面显示空白 | control.type 与组件 name 不匹配 | 检查大小写完全一致 |
| 组件属性不生效 | 属性未在 .js-meta.kwc 声明 | 添加 `<property>` 定义 |
| name 校验失败 | 格式不符 | 字母开头，仅小写+数字+下划线，≤30字符 |
| isv 不一致 | 页面与环境开发商不匹配 | deploy 会自动替换，无需手填 |
| 在非 KWC 工程目录执行命令 | 缺少 .kd 目录 | 先执行 `kd project init` |
| 创建了页面但组件不显示 | 未把组件写入 `<controls>` | 编辑 page-meta.kwp 添加 control |
| `kd debug` 提示端口占用 | 3333 端口被占用 | 关闭占用进程或重启终端 |

## 快速导航

按常见场景快速定位参考文档：

- **新工程初始化** → `cli-reference.md`（project init）+ 本文「初始化工程」章节
- **添加组件** → `cli-reference.md`（project create）+ `component-metadata.md`
- **创建页面** → `page-metadata.md` + 本文「创建页面元数据」章节
- **环境配置与部署** → `env-setup.md` + `cli-reference.md`（deploy/debug）+ 本文「配置环境」「部署与调试」章节

## 参考资料

| 主题 | 参考文件 |
|------|----------|
| CLI 命令语法、参数、示例 | `references/cli-reference.md` |
| 组件元数据字段与属性类型 | `references/component-metadata.md` |
| 环境信息收集与认证流程 | `references/env-setup.md` |
| 页面元数据字段、controls 规则、命名规范 | `references/page-metadata.md` |
