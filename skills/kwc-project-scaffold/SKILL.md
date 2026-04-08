---
name: kwc-project-scaffold
description: 【KWC 工程唯一入口 Skill】负责 KWC 项目的脚手架初始化、组件/页面元数据生成、环境配置与部署。当用户请求涉及 KWC 工程创建、kd CLI 使用、.page-meta.kwp 或 .js-meta.kwc 元数据文件、环境部署时，必须优先使用本 Skill。本 Skill 是 KWC 工作流的总入口，框架开发 Skill（react/vue/lwc-development）仅在脚手架初始化完成后、且明确需要编写组件实现代码时才被激活。禁止在元数据操作、工程初始化、部署阶段直接使用框架开发 Skill。
---

# KWC Project Scaffold

将本 Skill 作为 KWC 工程脚手架工作的入口。
优先把用户需求归入以下几类：初始化项目、创建组件、创建页面元数据、配置环境、部署、查看环境效果、调试。

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
5. 部署后是查看环境效果（`kd open`）还是需要本地联调（`kd debug`）

只有把这几项补齐，脚手架命令才有明确目标。

## 框架开发 Skill 协作

将 `kwc-project-scaffold` 视为 KWC 工作流的总入口，但不要让它吞掉框架开发 Skill 的职责。

### 硬性约束：代码实现必须移交框架 Skill

**当任务进入"实现组件代码"阶段时，必须遵循以下强制规则：**

1. **禁止直接编写代码**：本 Skill 严禁直接编写、修改任何组件实现代码（*.tsx / *.vue / *.js）
2. **必须先加载框架 Skill**：在编写代码前，必须先调用并加载对应的框架开发 Skill（kwc-react-development / kwc-vue-development / kwc-lwc-development）
3. **验证加载状态**：开始编码前必须确认框架 Skill 已激活，且其 rule.md 约束已生效
4. **框架识别依据**：
   - 新建工程：以 `kd project init` 时用户选择的 framework 为准
   - 已有工程：以 `.kd/config.json` 中的 `framework` 字段为准
   - 若无法识别 framework，必须停止并向用户确认，禁止猜测

**违反以上约束的后果**：
- 直接编写代码将导致不符合框架规范的输出（错误的导入路径、事件绑定方式等）
- 元数据与代码实现可能不一致
- 无法保证组件在目标环境中的正确渲染

### 协作边界表

| 任务阶段 | 负责 Skill | 产出物 |
|----------|------------|--------|
| 工程初始化 | scaffold | .kd/config.json |
| 创建组件目录 | scaffold | app/kwc/Component/ |
| **编写组件代码** | **react/vue/lwc-development** | ***.tsx / *.vue / *.js** |
| 补全组件元数据 | scaffold | *.js-meta.kwc |
| 创建页面元数据 | scaffold | *.page-meta.kwp |
| 环境配置与部署 | scaffold | 环境渲染结果 |
| 创建 Controller 目录 | scaffold | app/ks/controller/ControllerName/ |
| 构建 Controller | scaffold | dist/controller/ |
| **编写 Controller 代码** | **kwc-ks-controller-development** | **XML 配置 + .ts 脚本** |

### 切换时机

- 当任务仍处于需求拆分、脚手架命令、元数据、环境、`deploy`、`open`、`debug` 阶段时，继续由本 Skill 主导
- 当 `kd project create` 完成后需写代码 → **必须切到框架 Skill，禁止本 Skill 直接编写**
- 当代码写完需补元数据或部署 → 回到 scaffold
- 当 Controller 目录已创建且需要编写脚本代码 → **必须切到 `kwc-ks-controller-development`，禁止本 Skill 直接编写**
- 当 Controller 脚本代码写完需构建或部署 → 回到 scaffold

### 框架 Skill 激活检查清单

在进入代码实现阶段前，确认以下事项：

- [ ] 已识别当前工程 framework（react/vue/lwc）
- [ ] 已调用对应的框架开发 Skill（kwc-*-development）
- [ ] 框架 Skill 的 rule.md 约束已加载并生效
- [ ] 本 Skill 不再直接处理任何代码文件内容

### 推荐规则

1. 若是新建工程，以 `kd project init` 交互中用户选择的 framework 作为后续推荐 Skill 依据
2. 若是已有工程，以 `.kd/config.json` 中的 `framework` 作为推荐 Skill 依据
3. 当 `framework=react` 时，**必须**转入 `kwc-react-development`
4. 当 `framework=vue` 时，**必须**转入 `kwc-vue-development`
5. 当 `framework=lwc` 时，**必须**转入 `kwc-lwc-development`
6. 若还无法判断 framework，先停下来向用户确认
7. 当任务涉及 Controller/脚本控制器代码编写时，**必须**转入 `kwc-ks-controller-development`
8. Controller 代码实现与前端框架无关，不受 framework 字段影响

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
- 判断当前该执行 `init`、`create`、`deploy`、`open` 还是 `debug`
- 查看环境效果时结合当前任务和页面元数据，自行判断使用 `kd open` 的目标页面；仅当用户明确要求本地联调时才使用 `kd debug`
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
3. 让 CLI 生成目录和基础文件。
4. **立刻检查生成出来的 `.js-meta.kwc`，补齐可部署所需字段和属性定义**（这是本 Skill 的职责）。
5. **组件代码实现移交**：确认 `.js-meta.kwc` 补齐后，必须停止本 Skill 的代码编写，转而加载对应的框架开发 Skill（kwc-react-development / kwc-vue-development / kwc-lwc-development）来编写组件实现代码。
6. 若用户同时要创建多个组件，逐个执行创建命令，不要手工复制推断目录结构。

若用户只提供了页面结构想法，没有组件名，先根据语义生成稳定、可复用的组件名，再创建。
若用户给的是完整业务诉求，而不是组件清单，先主动拆分组件职责，再批量创建。

补充：
- 组件生成在 `app/kwc/<ComponentName>/` 下
- 脚手架生成的 `.js-meta.kwc` 只是模板，需按上述规则补齐
- **严禁在本 Skill 中直接修改组件代码文件（*.tsx / *.vue / *.js），代码实现必须交由框架 Skill**

## 创建 Controller

在已有项目中新增 KingScript 脚本控制器时：

1. 运行 `kd project create <ControllerName> --type controller`。
2. 使用 `PascalCase` 控制器名，建议以 `Controller` 后缀结尾。
3. 让 CLI 生成目录和基础文件。Controller 工程生成在 `app/ks/controller/<ControllerName>/` 下。
4. 创建后检查生成的 XML 配置文件，补齐必填字段（name/isv/app/version/url/scriptFile/methods）。
5. **Controller 代码实现移交**：确认 XML 配置补齐后，必须停止本 Skill 的代码编写，转而加载 `kwc-ks-controller-development` 来编写控制器脚本代码。
6. 若需指定拉取 SDK 的目标环境，可使用 `-e` 选项：`kd project create <ControllerName> --type controller -e dev`。

补充：
- Controller 与前端组件（KWC）是独立的工程实体，可以在同一个项目中共存
- 脚手架生成的 XML 配置只是模板，需按控制器开发指南补齐
- **严禁在本 Skill 中直接修改 Controller 脚本代码（*.ts），代码实现必须交由 `kwc-ks-controller-development`**

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
3. **补全组件 `.js-meta.kwc`**（本 Skill 职责）
4. **移交代码实现**：确认当前工程 framework，**必须**加载并切换到对应框架开发 Skill（kwc-react-development / kwc-vue-development / kwc-lwc-development）
5. **框架 Skill 实现组件代码**（*.tsx / *.vue / *.js）
6. 代码实现完成后，回到本 Skill：执行 `kd project create <page-name> --type page`
7. 补全页面 `app/pages/<page-name>.page-meta.kwp`
8. 确认或创建目标环境，完成认证
9. 若元数据有变更或需要更新环境上的静态文件，执行 `kd project deploy`（部署到开发环境时会同时上传前端静态文件）
10. 部署后使用 `kd open -e <env> -f <page_name>` 查看环境效果
11. 仅当用户明确要求本地联调时，才执行 `kd debug`（须后台模式，见调试约定）

**关键原则**：
- 步骤 3（元数据补全）必须由本 Skill 完成
- 步骤 4-5（代码实现）**必须**由框架 Skill 完成，本 Skill 严禁直接编写代码
- 步骤 6 起（页面创建及后续）回到本 Skill 主导

如果是修改已有页面：

1. 先识别是改组件实现、改组件元数据、改页面元数据，还是三者都改
2. **若涉及组件代码修改**：必须加载对应框架 Skill，禁止本 Skill 直接修改代码
3. 参考"是否需要 deploy 决策"决定后续操作

如果是新增 Controller：

1. 若无工程，执行 `kd project init`
2. 执行 `kd project create <ControllerName> --type controller` 创建 Controller
3. **补全 Controller XML 配置**（本 Skill 职责）
4. **移交代码实现**：**必须**加载并切换到 `kwc-ks-controller-development`
5. **controller-development Skill 编写脚本代码**（*.ts）
6. 代码实现完成后，回到本 Skill：执行 `npm run build:controller` 构建
7. 执行 `kd project deploy` 部署到目标环境

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

### Controller 构建

Controller 脚本在部署前需要先构建：

1. `npm run build:controller`：构建所有 Controller
2. `npm run build:controller -- MyController`：构建指定 Controller
3. `npm run build:controller -- --env=dev`：指定目标环境构建
4. `kd project build --type controller`：使用 kd CLI 构建

构建输出到 `dist/controller/` 目录。构建完成后通过 `kd project deploy` 部署到目标环境。

### 是否需要 deploy 决策

```
改了什么？
├── 只改 .tsx/.vue/.js/.html/.scss
│   ├── 仅本地调试 → 不需要 deploy，执行 npm run build，kd debug
│   └── 需要更新环境效果 → npm run build，然后 deploy（开发环境下同时上传静态文件），kd open 查看
├── 改了 .js-meta.kwc → version + 1，然后 deploy
├── 改了 .page-meta.kwp → version + 1，然后 deploy
├── 新建组件/页面 → version = 1，然后 deploy
└── 改了 Controller 代码或 XML 配置 → version + 1，npm run build:controller，然后 deploy
```

### 常用命令

1. `kd project deploy`：部署整个项目到默认环境（开发环境下同时上传前端静态文件）
2. `kd project deploy -d app/kwc/MyComponent -e sit`：仅部署指定组件到 `sit`
3. `kd project deploy -d app/pages/my_page -e sit`：仅部署指定页面元数据到 `sit`
4. `kd open -e dev -f kdtest_demo_page`：部署后直接打开环境上的表单查看效果（无 DNS 代理）
5. `kd debug`：进入本地调试，通过 DNS 代理连接环境（**必须使用 `is_background: true` 运行**，仅当用户明确要求调试时使用）

## 查看环境效果（kd open）

部署后默认使用 `kd open` 查看环境上的表单效果：

- `kd open -e <env> -f <page_name>`：直接在浏览器中打开对应环境上已部署的表单页面
- `-e` 指定目标环境（必填），`-f` 传入页面元数据 `<name>` 值（必填），取值规则与 `kd debug -f` 一致
- 不需要本地 dev server 运行，不走 DNS 代理
- 使用前提：已通过 `kd project deploy` 将元数据和静态文件部署到目标环境

适用场景：用户说"看看效果"、"打开页面"、"查看环境上的表单"、"看看部署结果"等。

### 本地调试（kd debug）

仅当用户明确说"调试"、"本地调试"、"联调"、"实时预览代码修改"时才使用 `kd debug`：

- 运行 `kd debug` 时**必须使用后台模式**（`is_background: true`），因为这是一个持续运行的开发服务器，不会自动结束
- 若使用前台模式运行 `kd debug`，命令会在 90 秒后因超时被强制终止，导致本地服务被 kill
- `kd debug` 启动后会先打开浏览器访问对应地址，但此时本地开发服务可能尚未完全启动，页面可能暂时无法访问。应等待服务启动完成后再刷新浏览器
- 可以通过 `get_terminal_output` 查看 `kd debug` 的运行状态和输出
- 若目标环境不是当前默认环境，先执行 `kd env set target-env <env-name>`
- 不要手工拼调试 URL，由 AI 自行结合任务和页面元数据判断预览目标
- 浏览器自动打开后继续定位目标页面

### 触发决策

```
用户意图判断：
├── "看效果/打开页面/查看部署结果/看看环境上的表单" → kd open
├── "调试/联调/本地调试/实时预览修改" → kd debug
└── 未明确表达 → 默认推荐 kd open
```

补充：环境未认证时 `kd project deploy` 会直接阻止部署。

## 应用菜单管理

> 菜单管理将部署后的页面注册到应用导航菜单，使页面在苍穹环境中可被用户导航访问。
> 所有菜单操作通过 `scripts/menu-api.mjs` 脚本完成，详细命令参考见 [references/app-menu.md](references/app-menu.md)。

### 触发条件

- `kd project deploy` 成功后，引导用户是否将页面发布到应用菜单
- 用户直接说"发布菜单"、"添加菜单"、"菜单管理"、"查看菜单"、"修改菜单"、"删除菜单"、"移动菜单"

### 前置条件

- 环境已认证（`kd env auth openapi` 已完成）
- bizAppNumber 已知（来自 `.kd/config.json` 的 `app` 字段，或用户明确提供）

### 接口依赖关系（强制约束）

**所有菜单操作必须遵循「先查后改」原则，禁止跳过查询直接执行写操作。**

```
queryTree（必须）→ 获得 menuId / 菜单结构 → 执行写操作 → getMenu 或 queryTree 验证结果
```

| 约束 | 说明 |
|------|------|
| **menuId 只能从接口获取** | `menuId` 只能来自 `queryTree` 返回的菜单树、`addMenu` 返回的新建菜单、或 `getMenu` 返回的详情。禁止凭记忆或猜测构造 menuId |
| **修改/删除/移动前必须先查询** | 执行 `updateMenu`、`deleteMenu`、`moveMenu` 前，必须先执行 `queryTree` 获取当前菜单树，从返回结果中确认目标 menuId 存在且状态正确 |
| **新增后必须捕获 menuId** | `addMenu` 成功后，必须从响应中提取新菜单的 `menuId` 并记录，供后续修改/移动使用 |
| **写操作后必须验证** | 任何写操作（add/update/delete/move）完成后，必须执行 `getMenu` 或 `queryTree` 验证实际状态，不能仅凭返回的 success 判断 |
| **parentMenuId 必须来自查询** | 新增子菜单时，`parentMenuId` 必须从 `queryTree` 的返回结果中获取已有菜单的 menuId，禁止猜测 |

### Step 1: 上下文准备

- 读取 `.kd/config.json` 的 `app` 字段作为 bizAppNumber
- 若从部署流程进入：formNumber = deploy 后 `.page-meta.kwp` 中 `<name>` 标签的实际值（已含 ISV 前缀）
- 若用户直接触发菜单管理：仅已知 bizAppNumber，进入 Step 2 查询菜单树

> ⚠ formNumber 必须从 deploy 后的 `.page-meta.kwp` 文件中读取 `<name>` 标签的实际值，不要自行拼接 ISV 前缀。

### Step 2: 查询并展示菜单树（任何操作的前置步骤）

**无论用户要求什么菜单操作，都必须先执行此步骤获取当前菜单状态。**

```bash
node "{menu_api}" queryTree --bizAppNumber {bizAppNumber}
```

- 按层级缩进展示，用图标区分类型（📁 分组 / 📄 页面 / 🔗 链接），展示规范见 [references/app-menu.md](references/app-menu.md)
- **记录所有菜单的 menuId**，后续操作必须使用这里获取到的 menuId
- 展示后根据来源引导下一步：
  - **部署后进入** → 根据表单名称和现有菜单结构，推荐菜单放置位置（分析语义关联，推荐同类分组；菜单树为空则推荐创建一级菜单）。推荐前须检查目标位置层级深度（不超过 3 级）
  - **用户直接触发** → 展示菜单树后等待用户指示操作

### Step 3: 执行菜单操作

根据用户意图执行对应操作（所有 menuId 必须来自 Step 2 的查询结果）：

| 操作 | 命令 | 执行前检查 |
|------|------|------------|
| 新增 | `addMenu --bizAppNumber {app} --name {name} --formNumber {form} [--parentMenuId {pid}] [--seq {n}]` | 确认菜单名称和位置；检查层级不超 3 级；parentMenuId 必须来自 queryTree 结果；**批量新增同级菜单时必须传递从小开始的递增 --seq 值（如 1、2、3），禁止使用大数值，范围 1–32767** |
| 修改 | `updateMenu --bizAppNumber {app} --menuId {id} [--name ...] [--visible ...] [--seq {n}]` | menuId 必须来自 queryTree 结果；修改 visible 为 0 时警告级联隐藏；修改 parentMenuId 时检查循环引用和层级 |
| 删除 | `deleteMenu --bizAppNumber {app} --menuId {id}` | menuId 必须来自 queryTree 结果；检查 HPCE 保护；警告级联删除子菜单；需用户确认 |
| 移动 | `moveMenu --bizAppNumber {app} --menuId {id} --direction {up/down}` | menuId 必须来自 queryTree 结果；展示当前排序位置；若报错「序号一致」，先用 updateMenu --seq 修改相邻菜单序号再重试 |

> 每次操作前均需将配置方案展示给用户确认，用户确认后再执行。

### Step 4: 验证并展示结果

- 任何写操作完成后**必须**验证实际结果：
  - **删除操作**：优先用 `getMenu` 确认目标菜单返回 `MENU_NOT_FOUND`（菜单树可能存在短暂缓存延迟）
  - **其他写操作**：执行 `getMenu`（单个菜单）或 `queryTree`（全局）验证
- addMenu 成功后，从响应中提取并记录新菜单的 menuId
- 展示完成信息，并提供后续操作选项：
  1. 修改此菜单
  2. 移动菜单位置
  3. 删除此菜单
  4. 继续添加其他菜单
  5. 查看完整菜单树
  6. 完成

### 与部署流程的集成

`kd project deploy` 成功后，在展示部署结果的同时，询问用户：

> 部署成功。是否需要将页面发布到应用菜单？

若用户同意 → 自动进入 Step 1（bizAppNumber 和 formNumber 均已可从当前上下文获取）。

### 约束速查

| 约束 | 何时提醒 |
|------|----------|
| 菜单最多 3 级 | 新增或移动菜单时检查 |
| HPCE 菜单不可删除 | 删除前检查 menuId 是否以 HPCE 结尾 |
| 级联隐藏 | 修改 visible 从 1→0 时警告 |
| 级联删除 | 删除有子菜单的菜单时警告 |
| formNumber 取实际值 | 新增页面菜单时 |

## 元数据查询

> 元数据查询用于在已认证环境中搜索表单和获取实体字段结构，为 KS 脚本编写、页面开发等提供上下文信息。
> 所有查询操作通过 `scripts/meta-query-api.mjs` 脚本完成，详细命令参考见 [references/meta-query.md](references/meta-query.md)。

### 触发条件

- 用户提到表单名称（如"销售订单"）但未提供 formNumber
- 需要查询某个表单的字段结构
- KS Controller 开发前需了解目标表单的实体字段
- 页面开发时需了解关联表单的数据模型

### 前置条件

- 环境已认证（`kd env auth openapi` 已完成）
- appNumber 已知（来自 `.kd/config.json` 的 `app` 字段，或用户明确提供）

### 工作流

#### Step 1: 搜索表单

优先使用 `queryFormsByApp` 在当前应用范围内搜索：

```bash
node "{meta_query_api}" queryFormsByApp --appNumber {appNumber} --keyword {keyword}
```

- `appNumber` 从 `.kd/config.json` 的 `app` 字段获取
- `keyword` 为用户提到的表单名称关键词（可选，不传则列出应用下所有表单）

#### Step 2: 确认目标表单

根据返回结果数量处理：

| 场景 | 处理方式 |
|------|----------|
| 返回单条 | 直接确认为目标表单，提取 `formNumber` |
| 返回多条 | 列表展示让用户选择（序号 / 表单名称 / 表单编码 / 模型类型 / 所属应用） |
| 返回空 | 提示未找到，建议尝试换关键词重试 |

#### Step 3: 获取实体字段（按需）

确认目标表单后，根据需要获取字段结构：

```bash
node "{meta_query_api}" getEntityFields --formNumber {formNumber}
```

返回结果按单头和单据体分组展示字段的 key、类型、是否必录等信息。

#### 灵活使用

- 用户也可以只执行 Step 1-2（仅查询表单列表），不必每次都查字段
- 若用户已知 formNumber，可直接执行 Step 3 获取字段结构
- 查询结果可用于 KS 脚本编写、页面开发、或单纯了解表单结构

### 与其他流程的集成

- **KS Controller 开发**：开发前先查询目标表单字段结构，了解单头/单据体/子分录的字段 key 和类型
- **页面开发**：查询关联表单了解数据模型，辅助组件设计
- **独立使用**：用户只想了解某个表单结构时，可独立调用

## 端到端执行原则

当用户说“帮我开发一个 KWC 页面/功能”时，默认按这条链路推进：

1. 识别是新工程还是已有工程
2. 收集不可推断的环境输入
3. 拆分组件并创建组件工程
4. 实现组件代码
5. 创建并补全页面元数据
6. 配置环境并确认认证状态
7. 若元数据有变更，执行 `deploy`
8. 部署后使用 `kd open` 查看环境效果
9. 仅当用户明确要求时执行 `kd debug` 进行本地联调

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
| `kd debug` 启动后无法找到目标表单 / 进入了错误的表单 | 未使用 `-f` 参数指定页面元数据 name，或传入了文件名而非元数据 name 值 | 使用 `kd debug -f <page_name>`，其中 `<page_name>` 为**当前本地 `.page-meta.kwp` 文件中 `<name>` 节点的实际值**。注意：deploy 后脚手架会自动更新本地文件中的 name（拼接 isv 前缀），因此应使用 deploy 后的完整名称，如 `kdtest_demo_page` |
| `kd open` 打开页面后显示空白 | 未部署或静态文件未上传 | 先执行 `kd project deploy` 确保元数据和静态文件已上传 |
| `kd open` 提示表单不存在 | `-f` 参数值不正确 | 传入页面元数据 `<name>` 节点的实际值（deploy 后的完整名称） |

### 表单名称与 ISV 前缀说明

- **创建阶段**：`.page-meta.kwp` 中的 `<name>` 可填写业务标识，如 `demo_page`
- **Deploy 阶段**：脚手架自动从环境拉取 isv（如 `kdtest`），拼接成 `kdtest_demo_page` 上传到远端，并**同步更新本地文件**
- **Debug/Open 阶段**：`kd debug -f` 和 `kd open -f` 均应传入**当前本地文件中的 `<name>` 值**（即 deploy 后的完整名称）
- 如果不确定，直接打开 `.page-meta.kwp` 查看 `<name>` 节点即可

## 快速导航

按常见场景快速定位参考文档：

- **新工程初始化** → `cli-reference.md`（project init）+ 本文「初始化工程」章节
- **添加组件** → `cli-reference.md`（project create）+ `component-metadata.md`
- **创建页面** → `page-metadata.md` + 本文「创建页面元数据」章节
- **环境配置与部署** → `env-setup.md` + `cli-reference.md`（deploy/open/debug）+ 本文「配置环境」「部署与调试」章节
- **应用菜单管理** → `app-menu.md` + 本文「应用菜单管理」章节
- **元数据查询** → `meta-query.md` + 本文「元数据查询」章节

## 参考资料

| 主题 | 参考文件 |
|------|----------|
| CLI 命令语法、参数、示例 | `references/cli-reference.md` |
| 组件元数据字段与属性类型 | `references/component-metadata.md` |
| 环境信息收集与认证流程 | `references/env-setup.md` |
| 页面元数据字段、controls 规则、命名规范 | `references/page-metadata.md` |
| 应用菜单管理命令与展示规范 | `references/app-menu.md` |
| 元数据查询命令与响应格式 | `references/meta-query.md` |
