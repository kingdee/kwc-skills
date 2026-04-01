# KWC CLI Reference

按需读取本文件，用于补充命令语法、OpenAPI 参数和页面元数据示例。

## 核心概念

- `Project`：本地项目目录，保存源代码、配置文件和元数据。
- `Env`：远端苍穹环境，一个本地项目可以连接多个环境。

## 安装 CLI

```bash
npm i -g @kdcloudjs/cli
kd -v
```

更新脚手架到最新版本：

```bash
kd update
```

## 初始化项目

```bash
kd project init my-demo-project
```

交互过程中通常需要：

- 选择框架，如 React、Vue、LWC
- 选择语言，如 TypeScript、JavaScript
- 输入应用标识 `app`（必须由用户明确提供，详见 SKILL.md「需要用户提供或确认的输入」一节）

初始化后执行：

```bash
cd my-demo-project
npm install
npm run dev
```

## 创建组件

```bash
kd project create DemoComponent1 --type kwc
kd project create DemoComponent2 --type kwc
```

建议：

- 使用 `PascalCase` 作为组件名。
- 先让 CLI 生成组件工程，再补充具体实现代码。
- 生成后应继续检查并完善 `.js-meta.kwc`，不要把脚手架模板直接当成最终元数据。

## 创建页面

```bash
kd project create demo_page --type page
```

页面元数据常见示例：

```xml
<?xml version="1.0" encoding="UTF-8"?>

<Page>
    <name>demo_page</name>
    <masterLabel>demo_page</masterLabel>
    <template>oneregion</template>
    <isv></isv>  <!-- deploy 时由脚手架自动从环境拉取 -->
    <app>your_app_code</app>
    <version>1</version>
    <regions>
        <region>
            <name>region1</name>
            <controls>
                <control>
                    <type>DemoComponent1</type>
                    <name>instance1</name>
                </control>
                <control>
                    <type>DemoComponent1</type>
                    <name>instance2</name>
                </control>
                <control>
                    <type>DemoComponent2</type>
                    <name>instance3</name>
                </control>
            </controls>
        </region>
    </regions>
</Page>
```

字段提醒：

- `name`：页面标识。
- `masterLabel`：页面展示名。
- `template`：页面模板。
- `app`：苍穹应用编码（必须由用户明确提供，详见 SKILL.md）。
- `version`：正整数；仅当该页面元数据文件有变更并准备重新上传时，手动加 `1`。
- `control.type`：组件类型名。
- `control.name`：页面内的组件实例名。
- 实测默认不会自动插入真实 `<control>` 节点，只保留注释模板。
- 页面中配置的属性名，应与组件元数据里定义的 `<property name="...">` 对应。

## 环境管理

创建环境：

```bash
kd env create dev --url https://feature.kingdee.com:1026/feature_dev/
```

OpenAPI 认证：

```bash
kd env auth openapi
```

常用环境命令：

```bash
kd env set target-env dev
kd env list
kd env info
kd env delete dev
```

OpenAPI 认证时通常需要：

- 数据中心
- Client ID
- Client Secret
- Username

注意：这里的"数据中心"应由脚手架在认证过程中读取列表后供用户选择，不应和其他凭据一样让用户手动输入。

如果环境不存在，先向用户收集以下字段，再继续：

- env name
- env url
- Client ID
- Client Secret
- Username

推荐直接让用户按这个模板回填：

```text
请补充以下环境信息：
1. env name:
2. env url:
3. client id:
4. client secret:
5. username:

说明：data center 不需要先手填，后续由脚手架读取候选项供选择。
```

相关 OpenAPI 应用需具备这些接口授权：

1. `updateKwc`
2. `kwcisv`
3. `updatePageMeta`

补充提醒：

- 环境配置写入 `~/.kd`。
- 在受限环境中执行 `kd env create` 后，务必再跑 `kd env list` 检查是否真正保存成功。
- 删除环境后要重新确认默认环境是否被 CLI 自动切换。

## 部署

部署整个项目：

```bash
kd project deploy
```

仅部署指定组件到 `sit` 环境：

```bash
kd project deploy -d app/kwc/MyComponent -e sit
```

仅部署指定页面元数据到 `sit` 环境：

```bash
kd project deploy -d app/pages/my_page -e sit
```

注意：

- 部署时脚手架会自动替换组件及页面元数据中的 `isv`。
- 若未指定环境，则使用默认环境。
- 若环境未认证，CLI 会直接阻止部署。
- 不要把 `deploy` 当成每次改代码后的必跑步骤；先看是否真的改了元数据文件。

版本管理规则：

| 变更类型 | 是否需要递增 `version` | 是否需要 `deploy` | 推荐动作 |
| --- | --- | --- | --- |
| 只改组件实现代码，未改任何元数据 | 否 | 否 | `npm run build`，需要联调时再 `kd debug` |
| 改了组件元数据 `.js-meta.kwc` | 是，递增该组件元数据 `version` | 是 | 部署该组件或整个项目 |
| 改了页面元数据 `.page-meta.kwp` | 是，递增该页面元数据 `version` | 是 | 部署该页面元数据或整个项目 |
| 同时改了组件元数据和页面元数据 | 是，分别递增 | 是 | 部署受影响路径或整个项目 |
| 新建组件元数据或页面元数据 | 初始值设为 `1` | 是 | 首次上传 |

判断提醒：

- 是否需要 `deploy`，先看元数据文件是否变更。
- 是否需要递增 `version`，也先看对应元数据文件是否变更。
- 只改组件代码，不要因为"刚改了东西"就盲目 `deploy`。

## 调试

```bash
kd debug                              # 交互选择表单
kd debug -e sit                       # 指定环境
kd debug -f kdtest_demo_page           # 直接指定表单（值为页面元数据中 <name> 节点的值）
kd debug -f kdtest_demo_page -e sit    # 同时指定表单和环境
```

### 选项说明

- `-e, --target-env <name>`：指定调试连接的后端环境
- `-f, --formid <name>`：指定调试表单。**表单名称需要传入页面元数据内的 `<name>` 标识，不是表单文件名称**

### 调试约定

- AI 在执行调试时，应根据当前任务中已创建或已部署的页面元数据，自动使用 `-f <page_name>` 参数
- `<page_name>` 的值是页面元数据 XML 中 `<name>` 节点的值（如 `kdtest_demo_page`），不是文件名
- 若当前任务只涉及一个页面元数据，直接传入该 name 值
- 若涉及多个页面元数据，让用户选择或按上下文判断
- `kd debug` 会自动打开浏览器，后续在浏览器里继续定位并验证目标页面

### 调试前确认

- 已部署过组件或页面元数据
- 当前默认环境正确，或已通过 `-e <env>` 参数指定
- `.kd/config.json` 中 `app` 编码与目标应用一致
- 若 `.kd/config.json` 缺少 `isv/app`，静态路由不会挂载
- `localhost:3333` 未被占用

### 注意事项

- 若需在不同 app 间切换调试，请手动修改 `.kd/config.json` 中的 `app` 编码

按需深入读取：

- `component-metadata.md`
- `env-setup.md`
- `page-metadata.md`
