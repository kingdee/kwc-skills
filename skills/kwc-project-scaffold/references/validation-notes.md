# Validation Notes

本文件记录对 `kwc-project-scaffold` 的一次真实 CLI 验证结果，供后续执行时参考。

## 验证环境

- 日期：2026-03-19
- CLI：`kd 0.0.9`
- Node.js：`v24.14.0`
- npm：`11.9.0`
- 验证目录：`verification-playground/verify-kwc-skill`

## 已实测通过

1. `kd -v`
2. `kd project init verify-kwc-skill`
3. `kd project create DemoComponent1 --type kwc`
4. `kd project create DemoComponent2 --type kwc`
5. `kd project create demoPage --type page`
6. `npm install`
7. `npm run build`
8. `npm run dev`
9. `kd env create/list/set/info/delete`
10. `kd debug -f demoPage`，在设置默认环境后可启动本地调试链路

## 关键观察

### 初始化

- `kd project init` 依赖模板下载；在受限环境里可能因为 `git clone` 失败而中断。
- React + TypeScript 初始化后，`.kd/config.json` 默认只包含：
  - `app`
  - `framework`
  - `language`
- 验证中使用的 `app` 只是当次人工输入值，用于完成真实部署验证；它不应被固化进 Skill 作为默认值。

### 创建组件与页面

- 新组件生成在 `app/kwc/<ComponentName>/`。
- 新页面生成在 `app/pages/<page-name>.page-meta.kwp`。
- 组件创建不会自动改 `app/kwc/main.tsx`。
- 页面创建不会自动把组件写进 `<controls>`。
- 组件生成的 `.js-meta.kwc` 中，`version` 默认可能为空，应人工补齐后再作为正式元数据使用。

### 环境管理

- 受限沙箱里，`kd env create` 可能提示成功但并未写入 `~/.kd`；必须用 `kd env list` 复核。
- 删除临时环境后，默认环境会自动切换到某个已有环境；实测出现过切回 `dev`，因此删除后必须重新设置目标默认环境。

### 认证与部署

- `kd env auth openapi -e skillcheck` 在 URL 不可达时直接返回 `fetch failed`。
- `kd project deploy -e skillcheck` 在环境未认证时直接返回 `Environment not authenticated. Please run "kd env auth" first`。

### 调试

- 在受限沙箱里，`kd debug -e skillcheck -f demoPage` 可能因为 `tsx` IPC pipe 权限失败。
- 在放开权限后，`kd debug -e skillcheck -f demoPage` 曾返回 `Environment "undefined" has no URL configured`。
- 更稳定的路径是：

```bash
kd env set target-env skillcheck
kd debug -f demoPage
```

- 调试成功启动后，日志出现：
  - `KD Dev Server Started`
  - `Listening on http://localhost:3333`
  - `Opening: <env-url>?formId=demoPage&kdkwc_cdn=http://localhost:3333`
- 若 `.kd/config.json` 缺少 `isv/app`，会提示：
  - `kdConfig missing isv/app, static route not mounted`
- 若 `3333` 端口已占用，会提示端口冲突。
