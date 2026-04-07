# KWC KS Controller 开发硬性约束 (Hard Rules)

所有 KWC KingScript Controller 开发工作必须严格遵守以下约束。违反这些规则的代码将无法部署或无法正常运行。

## 1. Controller 类结构约束

### 1.1 类命名规范

- **类名**：使用 PascalCase（大驼峰），建议以 `Controller` 后缀结尾
  - ✅ `UserController`、`OrderController`、`ProductController`
  - ❌ `userController`、`user_controller`、`UserCtrl`
- **文件名**：与类名一致
  - ✅ `UserController.ts`
  - ❌ `user-controller.ts`、`UserCtrl.ts`

### 1.2 类导出规范

必须创建类实例并导出为 `kwcController`：

```typescript
class UserController {
  // 方法定义
}

// 必须导出实例，名称固定为 kwcController
let kwcController = new UserController();
export { kwcController };
```

**禁止**：
- ❌ 直接导出类：`export { UserController };`
- ❌ 使用其他实例名：`export { controller };`
- ❌ 使用默认导出：`export default new UserController();`

### 1.3 方法签名规范

- **方法名**：使用 camelCase（小驼峰）
  - ✅ `getUser`、`createOrder`、`updateProduct`、`deleteItem`
- **方法参数**：统一为 `(request: any, response: any)`
- **示例**：
  ```typescript
  class UserController {
    getUser(request: any, response: any) {
      // 实现逻辑
    }

    createUser(request: any, response: any) {
      // 实现逻辑
    }
  }
  ```

## 2. XML 配置约束

### 2.1 必填字段

以下字段缺一不可，否则部署会失败：

| 字段 | 说明 | 示例 |
|------|------|------|
| `name` | 控制器名称（全局唯一） | `UserScriptController` |
| `isv` | 开发商编码 | `kingdee` 或自定义编码 |
| `app` | 业务应用编码 | `dev`、`bos`、`hr` |
| `version` | 版本号（正整数） | `1`、`2`、`3` |
| `url` | 控制器根 URL | `/kd/dev/sample/users` |
| `scriptFile` | 脚本文件名 | `UserController.ts` |
| `methods` | 方法定义集合（至少 1 个） | 见下方说明 |

### 2.2 isv 规则

- 金蝶原厂使用 `kingdee`
- 二开厂商使用自己的编码（如 `myisv`、`partner001`）

### 2.3 app 规则

- 必须与当前工程 `.kd/config.json` 中的 `app` 一致
- 常见值：`dev`、`bos`、`hr`、`fi` 等

### 2.4 version 规则

- 类型：正整数（1, 2, 3...）
- 每次部署必须递增
- **不支持**相同版本号覆盖
- 新 Controller 首次部署 version 设为 `1`

### 2.5 scriptFile 规则

- 必须与实际脚本文件名一致
- 包含文件扩展名（`.ts`）

## 3. URL 路径约束

### 3.1 URL 格式要求

```
/{开发商前缀}/{应用标识}[/自定义子目录]/{资源复数}
```

**至少 3 级路径**：
- ✅ `/kd/dev/sample/users`（推荐）
- ✅ `/kd/bos/usercenter/users`
- ✅ `/myisv/myapp/orders`
- ❌ `/kd/dev`（缺少资源路径）
- ❌ `/dev/sample/users`（缺少开发商前缀）

### 3.2 开发商前缀规则

| isv 值 | URL 前缀 | 说明 |
|--------|---------|------|
| `kingdee` | `/kd/` | 金蝶原厂统一使用 `kd` |
| 其他值 | `/{isv}/` | 二开厂商使用自己的编码 |

### 3.3 完整 URL 拼接规则

最终访问 URL = **类 URL** + **方法 URL**

| 类 URL | 方法 URL | 最终访问 URL |
|--------|---------|-------------|
| `/kd/dev/users` | `/{id}` | `/kd/dev/users/{id}` |
| `/kd/dev/users` | `` (空) | `/kd/dev/users` |
| `/kd/dev/users` | `/profile` | `/kd/dev/users/profile` |

## 4. Method 配置约束

### 4.1 必填字段

每个 method 必须包含：

| 字段 | 说明 | 允许值 |
|------|------|--------|
| `name` | 方法名（对应脚本中的方法） | camelCase 字符串 |
| `httpMethod` | HTTP 请求方法 | `GET`、`POST`、`PUT`、`DELETE` |
| `permission` | 权限配置 | 见下方说明 |

### 4.2 httpMethod 限制

仅允许以下值（大写）：
- `GET` - 查询
- `POST` - 创建
- `PUT` - 更新
- `DELETE` - 删除

## 5. 权限配置约束

每个 method **必须**有 `<permission>` 配置。

### 5.1 标准权限验证（推荐）

```xml
<permission>
    <permission>
        <permitAll>false</permitAll>
        <entityNumber>bos_user</entityNumber>
        <permItemId>47150e89000000ac</permItemId>
        <checkRightApp>dev</checkRightApp>
    </permission>
</permission>
```

### 5.2 跳过统一权限检查

由 Controller 方法自行处理权限逻辑：

```xml
<permission>
    <permission>
        <permitAll>true</permitAll>
    </permission>
</permission>
```

### 5.3 允许匿名访问

需同时开启 `permitAll` 和 `anonymousUser`：

```xml
<permission>
    <permission>
        <permitAll>true</permitAll>
        <anonymousUser>true</anonymousUser>
    </permission>
</permission>
```

## 6. 请求处理约束

### 6.1 路径参数获取

- **优先使用** `getLongPathVariable`（适用于 ID 类参数）
- 字符串类型使用 `getPathVariable`

```typescript
// 推荐：ID 类参数使用 Long 类型
const userId = request.getLongPathVariable('id');

// 字符串类型
const code = request.getPathVariable('code');
```

### 6.2 查询参数获取

使用类型化方法：

| 方法 | 返回类型 | 示例 |
|------|---------|------|
| `getStringQueryParam('name')` | string | 字符串参数 |
| `getIntQueryParam('page')` | int | 整数参数 |
| `getLongQueryParam('id')` | long | 长整型参数 |
| `getBooleanQueryParam('active')` | boolean | 布尔参数 |
| `getDateQueryParam('date')` | Date | 日期参数 |

### 6.3 请求体获取

- **优先使用** `getMapBody()` 获取 Map 类型
- 原始字符串使用 `getStringBody()`
- 原始对象使用 `getBody()`

```typescript
// 推荐
const body = request.getMapBody();
const username = body['username'];
```

### 6.4 请求头获取

```typescript
const token = request.getHeader('Authorization');
const contentType = request.getHeader('Content-Type');
```

## 7. 响应处理约束

### 7.0 ⚠️ KS 运行时数组序列化陷阱（P0 高频问题）

**已知平台限制**：KS 运行时在序列化 `response.ok(data)` 时，**可能将 JavaScript 数组 `[]` 转换为空对象 `{}`**，导致前端收到的数据类型与后端代码中定义的不一致。

**典型故障链路**：
```
后端代码写了 items: ['a', 'b', 'c']
↓ KS 运行时序列化
前端实际收到 items: {}
↓ 前端按 string[] 调用 .map()
↓ 运行时异常 → 白屏
```

**硬性约束**：

1. **禁止在 `response.ok()` 的顶层对象中直接放置数组字段**
   ```typescript
   // ❌ 危险：items 数组可能被序列化为 {}
   response.ok({
     title: '标题',
     items: ['a', 'b', 'c']
   });

   // ✅ 安全：将数组 JSON 序列化为字符串，前端再 parse
   response.ok({
     title: '标题',
     items: JSON.stringify(['a', 'b', 'c'])
   });

   // ✅ 安全：用逗号分隔的字符串代替数组
   response.ok({
     title: '标题',
     itemsText: 'a||b||c'    // 前端用 split('||') 还原
   });
   ```

2. **如果必须返回数组，必须在注释中标注序列化风险并告知前端做防御**
   ```typescript
   // ⚠️ 注意：items 为数组字段，KS 运行时可能将其序列化为 {}，
   //    前端必须用 Array.isArray() 校验后再使用。
   response.ok({
     title: '标题',
     items: ['a', 'b', 'c']
   });
   ```

### 7.1 成功响应

```typescript
// 标准成功响应（HTTP 200）
response.ok(data);

// 指定状态码
response.of(201, { message: '创建成功', id: 123 });
```

### 7.2 错误响应

使用 `throwException` 方法：

```typescript
response.throwException(message, httpStatusCode, businessErrorCode);
```

**参数说明**：
- `message`: 异常提示消息
- `httpStatusCode`: HTTP 状态码
- `businessErrorCode`: 业务异常码

### 7.3 常用状态码

| 状态码 | 含义 | 使用场景 |
|--------|------|---------|
| 200 | 成功 | 查询、更新成功 |
| 201 | 创建成功 | POST 创建资源成功 |
| 400 | 参数错误 | 请求参数校验失败 |
| 401 | 未授权 | 未登录或登录过期 |
| 404 | 不存在 | 资源不存在 |
| 500 | 内部错误 | 服务器异常 |

### 7.4 禁止忽略错误处理

所有异常路径必须有明确的错误响应：

```typescript
// ✅ 正确：有错误处理
if (!body['username']) {
  response.throwException('用户名不能为空', 400, 'MISSING_USERNAME');
  return;
}

// ❌ 错误：忽略异常
try {
  // 业务逻辑
} catch (e) {
  // 没有错误处理
}
```

## 8. SDK 使用约束

### 8.1 调用前确认

调用任何 SDK 类/方法前，**必须**先在 kingscript-code-generator 技能包的索引中确认其存在：
- 类查询：`kingscript-code-generator/references/sdk/indexes/class-index.md`
- 方法查询：`kingscript-code-generator/references/sdk/indexes/method-index.md`
- 场景查询：`kingscript-code-generator/references/sdk/indexes/scenario-index.md`

### 8.2 类型注意事项

- Long 类型注意精度问题
- 金额计算**必须**使用 BigDecimal
- 不默认假设 Java 开放能力一定可用

## 9. 禁止事项

以下操作**绝对禁止**：

1. **禁止编造 KingScript API**
   - 不编造不存在的 API、事件名或上下文对象
   - 所有 SDK 调用必须在索引中确认存在

2. **禁止运行构建或部署命令**
   - ❌ `npm run build:controller`
   - ❌ `kd project build --type controller`
   - ❌ `kd project deploy`
   - 构建和部署交由 `kwc-project-scaffold` 处理

3. **禁止修改前端组件代码**
   - ❌ 修改 `*.tsx` / `*.vue` / `*.js` 前端组件文件
   - ❌ 修改 `*.module.scss` / `*.css` 样式文件

4. **禁止修改元数据文件**
   - ❌ 修改 `.js-meta.kwc` 组件元数据
   - ❌ 修改 `.page-meta.kwp` 页面元数据

5. **禁止运行代码格式化命令**
   - ❌ `eslint --fix`
   - ❌ `prettier --write`

## 10. 强制自检清单

1. [ ] **类导出**：是否正确导出了 `kwcController` 实例？
2. [ ] **方法签名**：是否使用了 `(request: any, response: any)` 参数？
3. [ ] **XML 必填**：name/isv/app/version/url/scriptFile/methods 是否完整？
4. [ ] **URL 路径**：是否至少 3 级路径？
5. [ ] **权限配置**：每个 method 是否都有 permission？
6. [ ] **参数获取**：是否使用了正确的类型方法（如 `getLongPathVariable`）？
7. [ ] **错误处理**：是否所有异常路径都有 `throwException` 处理？
8. [ ] **SDK 确认**：调用的 SDK 方法是否在索引中已确认存在？
9. [ ] **数组序列化**：响应中是否包含数组字段？如有，是否已做 JSON.stringify 或标注风险？
10. [ ] **禁止事项**：是否未运行任何构建/部署/格式化命令？

## 11. 最佳实践

### 11.1 错误处理最佳实践

- 为所有可能失败的操作提供 try-catch
- 使用明确的业务错误码（如 `MISSING_PARAM`、`USER_NOT_FOUND`）
- 提供有意义的错误消息，便于前端展示和调试
- 区分客户端错误（4xx）和服务端错误（5xx）

### 11.2 数据验证最佳实践

- 在方法入口第一时间校验必填参数
- 优先使用强类型方法（如 `getLongPathVariable` 而非 `getPathVariable`）
- 对 null 和 undefined 进行防御性检查
- 校验字符串长度、数值范围等边界条件

### 11.3 SDK 使用最佳实践

- 调用 SDK 前先确认目标类/方法在 SDK 索引中存在
- 使用 BigDecimal 处理金额计算，避免浮点精度问题
- 查询数据时注意分页，避免一次性加载全量数据
- 理解长事务和查询缓存机制对性能的影响
