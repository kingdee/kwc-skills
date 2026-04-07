# Controller 常见模式和代码示例

本文档提供脚本控制器的常见开发模式和完整代码示例，可作为快速参考。

## 1. 最简 GET 示例

一个最简单的单方法 Controller，用于获取单个资源。

### 1.1 XML 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Controller>
    <name>HelloController</name>
    <isv>kingdee</isv>
    <app>dev</app>
    <version>1</version>
    <url>/kd/dev/sample/hello</url>
    <scriptFile>HelloController.ts</scriptFile>
    <methods>
        <method>
            <name>sayHello</name>
            <url>/{name}</url>
            <httpMethod>GET</httpMethod>
            <permission>
                <permission>
                    <permitAll>true</permitAll>
                </permission>
            </permission>
        </method>
    </methods>
</Controller>
```

### 1.2 TypeScript 代码

```typescript
class HelloController {
  sayHello(request: any, response: any) {
    // 获取路径参数
    const name = request.getPathVariable('name');
    
    // 返回响应
    response.ok({
      message: `Hello, ${name}!`,
      timestamp: new Date().toISOString()
    });
  }
}

let kwcController = new HelloController();
export { kwcController };
```

### 1.3 访问示例

```
GET ../kwc/v1/kd/dev/sample/hello/World

Response (200):
{
  "message": "Hello, World!",
  "timestamp": "2026-04-03T10:30:00.000Z"
}
```

## 2. 完整 CRUD 示例

一个包含增删改查四个方法的完整 Controller。

### 2.1 XML 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Controller>
    <name>UserController</name>
    <isv>kingdee</isv>
    <app>dev</app>
    <version>1</version>
    <url>/kd/dev/sample/users</url>
    <scriptFile>UserController.ts</scriptFile>
    <methods>
        <!-- 查询单个用户 -->
        <method>
            <name>getUser</name>
            <url>/{id}</url>
            <httpMethod>GET</httpMethod>
            <permission>
                <permission>
                    <permitAll>false</permitAll>
                    <entityNumber>bos_user</entityNumber>
                    <permItemId>47150e89000000ac</permItemId>
                    <checkRightApp>dev</checkRightApp>
                </permission>
            </permission>
        </method>
        
        <!-- 创建用户 -->
        <method>
            <name>createUser</name>
            <url></url>
            <httpMethod>POST</httpMethod>
            <permission>
                <permission>
                    <permitAll>false</permitAll>
                    <entityNumber>bos_user</entityNumber>
                    <permItemId>47150e89000000ac</permItemId>
                    <checkRightApp>dev</checkRightApp>
                </permission>
            </permission>
        </method>
        
        <!-- 更新用户 -->
        <method>
            <name>updateUser</name>
            <url>/{id}</url>
            <httpMethod>PUT</httpMethod>
            <permission>
                <permission>
                    <permitAll>false</permitAll>
                    <entityNumber>bos_user</entityNumber>
                    <permItemId>47150e89000000ac</permItemId>
                    <checkRightApp>dev</checkRightApp>
                </permission>
            </permission>
        </method>
        
        <!-- 删除用户 -->
        <method>
            <name>deleteUser</name>
            <url>/{id}</url>
            <httpMethod>DELETE</httpMethod>
            <permission>
                <permission>
                    <permitAll>false</permitAll>
                    <entityNumber>bos_user</entityNumber>
                    <permItemId>47150e89000000ac</permItemId>
                    <checkRightApp>dev</checkRightApp>
                </permission>
            </permission>
        </method>
    </methods>
</Controller>
```

### 2.2 TypeScript 代码

```typescript
class UserController {
  // GET /kd/dev/sample/users/{id}
  getUser(request: any, response: any) {
    const userId = request.getLongPathVariable('id');
    
    // 模拟查询用户
    const user = {
      id: userId,
      name: '张三',
      email: 'zhangsan@example.com',
      department: '研发部'
    };
    
    response.ok(user);
  }
  
  // POST /kd/dev/sample/users
  createUser(request: any, response: any) {
    const body = request.getMapBody();
    
    // 参数验证
    if (!body['name']) {
      response.throwException('用户名不能为空', 400, 'MISSING_NAME');
      return;
    }
    
    if (!body['email']) {
      response.throwException('邮箱不能为空', 400, 'MISSING_EMAIL');
      return;
    }
    
    // 模拟创建用户
    const newUser = {
      id: Date.now(),
      name: body['name'],
      email: body['email'],
      department: body['department'] || '默认部门'
    };
    
    response.of(201, newUser);
  }
  
  // PUT /kd/dev/sample/users/{id}
  updateUser(request: any, response: any) {
    const userId = request.getLongPathVariable('id');
    const body = request.getMapBody();
    
    // 模拟更新用户
    const updatedUser = {
      id: userId,
      name: body['name'],
      email: body['email'],
      department: body['department'],
      updatedAt: new Date().toISOString()
    };
    
    response.ok(updatedUser);
  }
  
  // DELETE /kd/dev/sample/users/{id}
  deleteUser(request: any, response: any) {
    const userId = request.getLongPathVariable('id');
    
    // 模拟删除用户
    response.ok({
      message: '删除成功',
      deletedId: userId
    });
  }
}

let kwcController = new UserController();
export { kwcController };
```

## 3. 权限配置模式

### 3.1 标准权限验证

需要验证用户具有特定实体的操作权限：

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

**字段说明**：
- `entityNumber`: 业务实体编码
- `permItemId`: 权限项 ID
- `checkRightApp`: 验权应用编码

### 3.2 跳过权限检查

由 Controller 方法自行处理权限逻辑：

```xml
<permission>
    <permission>
        <permitAll>true</permitAll>
    </permission>
</permission>
```

**使用场景**：
- 需要自定义复杂的权限逻辑
- 公开接口但需要记录访问日志

### 3.3 允许匿名访问

无需登录即可访问：

```xml
<permission>
    <permission>
        <permitAll>true</permitAll>
        <anonymousUser>true</anonymousUser>
    </permission>
</permission>
```

**使用场景**：
- 公开的查询接口
- 健康检查接口
- 第三方回调接口

## 4. 错误处理模式

### 4.1 参数验证失败

```typescript
class ValidationController {
  createOrder(request: any, response: any) {
    const body = request.getMapBody();
    
    // 必填字段验证
    if (!body['productId']) {
      response.throwException('商品ID不能为空', 400, 'MISSING_PRODUCT_ID');
      return;
    }
    
    // 数值范围验证
    const quantity = body['quantity'];
    if (!quantity || quantity <= 0) {
      response.throwException('数量必须大于0', 400, 'INVALID_QUANTITY');
      return;
    }
    
    // 格式验证
    const email = body['email'];
    if (email && !email.includes('@')) {
      response.throwException('邮箱格式不正确', 400, 'INVALID_EMAIL');
      return;
    }
    
    // 验证通过，继续处理
    response.ok({ message: '订单创建成功' });
  }
}

let kwcController = new ValidationController();
export { kwcController };
```

### 4.2 业务异常处理

```typescript
class BusinessController {
  processOrder(request: any, response: any) {
    const orderId = request.getLongPathVariable('id');
    
    // 模拟查询订单
    const order = this.findOrder(orderId);
    
    // 资源不存在
    if (!order) {
      response.throwException('订单不存在', 404, 'ORDER_NOT_FOUND');
      return;
    }
    
    // 状态不允许操作
    if (order.status === 'COMPLETED') {
      response.throwException('已完成的订单不能修改', 400, 'ORDER_COMPLETED');
      return;
    }
    
    // 权限不足
    if (!this.hasPermission(order)) {
      response.throwException('无权操作此订单', 403, 'FORBIDDEN');
      return;
    }
    
    response.ok({ message: '处理成功' });
  }
  
  private findOrder(id: number) {
    // 模拟查询
    return { id: id, status: 'PENDING' };
  }
  
  private hasPermission(order: any) {
    // 模拟权限检查
    return true;
  }
}

let kwcController = new BusinessController();
export { kwcController };
```

### 4.3 try-catch 异常捕获

```typescript
class SafeController {
  riskyOperation(request: any, response: any) {
    try {
      // 可能抛出异常的操作
      const result = this.doSomethingRisky();
      response.ok(result);
    } catch (e: any) {
      // 捕获异常并返回错误响应
      response.throwException(
        e.message || '操作失败',
        500,
        'OPERATION_FAILED'
      );
    }
  }
  
  private doSomethingRisky() {
    // 模拟可能失败的操作
    throw new Error('模拟异常');
  }
}

let kwcController = new SafeController();
export { kwcController };
```

## 5. 综合示例

同时使用路径参数、查询参数、请求头、请求体的完整示例。

### 5.1 XML 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Controller>
    <name>OrderController</name>
    <isv>kingdee</isv>
    <app>dev</app>
    <version>1</version>
    <url>/kd/dev/sample/orders</url>
    <scriptFile>OrderController.ts</scriptFile>
    <methods>
        <!-- 查询订单列表（分页 + 过滤） -->
        <method>
            <name>listOrders</name>
            <url></url>
            <httpMethod>GET</httpMethod>
            <permission>
                <permission>
                    <permitAll>false</permitAll>
                    <entityNumber>bos_order</entityNumber>
                    <permItemId>47150e89000000ad</permItemId>
                    <checkRightApp>dev</checkRightApp>
                </permission>
            </permission>
        </method>
        
        <!-- 处理订单 -->
        <method>
            <name>processOrder</name>
            <url>/{id}/process</url>
            <httpMethod>POST</httpMethod>
            <permission>
                <permission>
                    <permitAll>false</permitAll>
                    <entityNumber>bos_order</entityNumber>
                    <permItemId>47150e89000000ad</permItemId>
                    <checkRightApp>dev</checkRightApp>
                </permission>
            </permission>
        </method>
    </methods>
</Controller>
```

### 5.2 TypeScript 代码

```typescript
class OrderController {
  // GET /kd/dev/sample/orders?page=1&size=10&status=PENDING
  listOrders(request: any, response: any) {
    // 获取查询参数
    const page = request.getIntQueryParam('page') || 1;
    const size = request.getIntQueryParam('size') || 10;
    const status = request.getStringQueryParam('status');
    const startDate = request.getDateQueryParam('startDate');
    const endDate = request.getDateQueryParam('endDate');
    
    // 获取请求头
    const clientVersion = request.getHeader('X-Client-Version');
    
    // 模拟分页查询
    const orders = [
      { id: 1001, status: 'PENDING', amount: 100.00 },
      { id: 1002, status: 'PENDING', amount: 200.00 }
    ];
    
    response.ok({
      data: orders,
      pagination: {
        page: page,
        size: size,
        total: 100
      },
      filters: {
        status: status,
        startDate: startDate,
        endDate: endDate
      },
      clientVersion: clientVersion
    });
  }
  
  // POST /kd/dev/sample/orders/{id}/process
  processOrder(request: any, response: any) {
    // 获取路径参数
    const orderId = request.getLongPathVariable('id');
    
    // 获取请求体
    const body = request.getMapBody();
    const action = body['action'];      // 'approve' | 'reject'
    const remark = body['remark'];
    
    // 获取请求头
    const operatorId = request.getHeader('X-Operator-Id');
    
    // 参数验证
    if (!action) {
      response.throwException('操作类型不能为空', 400, 'MISSING_ACTION');
      return;
    }
    
    if (action !== 'approve' && action !== 'reject') {
      response.throwException('操作类型无效，仅支持 approve 或 reject', 400, 'INVALID_ACTION');
      return;
    }
    
    // 执行操作
    if (action === 'approve') {
      response.ok({
        orderId: orderId,
        status: 'APPROVED',
        message: '订单已审批通过',
        operator: operatorId,
        remark: remark,
        processedAt: new Date().toISOString()
      });
    } else {
      response.ok({
        orderId: orderId,
        status: 'REJECTED',
        message: '订单已驳回',
        operator: operatorId,
        remark: remark,
        processedAt: new Date().toISOString()
      });
    }
  }
}

let kwcController = new OrderController();
export { kwcController };
```

## 6. 请求/响应 API 速查

### 6.1 请求 API

| 方法 | 说明 | 返回类型 |
|------|------|---------|
| `getHttpMethod()` | 获取 HTTP 方法 | string |
| `getPathVariable(name)` | 获取路径参数（字符串） | string |
| `getLongPathVariable(name)` | 获取路径参数（长整型） | long |
| `getQueryParams()` | 获取所有查询参数 | Map |
| `getStringQueryParam(name)` | 获取查询参数（字符串） | string |
| `getIntQueryParam(name)` | 获取查询参数（整数） | int |
| `getLongQueryParam(name)` | 获取查询参数（长整型） | long |
| `getBooleanQueryParam(name)` | 获取查询参数（布尔） | boolean |
| `getDateQueryParam(name)` | 获取查询参数（日期） | Date |
| `getHeader(name)` | 获取请求头 | string |
| `getHeaders()` | 获取所有请求头 | Map |
| `getBody()` | 获取请求体（原始对象） | Object |
| `getStringBody()` | 获取请求体（字符串） | string |
| `getMapBody()` | 获取请求体（Map） | Map |

### 6.2 响应 API

| 方法 | 说明 | HTTP 状态码 |
|------|------|------------|
| `ok(data)` | 成功响应 | 200 |
| `of(statusCode, data)` | 指定状态码响应 | 自定义 |
| `throwException(message, httpCode, bizCode)` | 错误响应 | 自定义 |

### 6.3 常用状态码

| 状态码 | 含义 | 方法 |
|--------|------|------|
| 200 | 成功 | `response.ok(data)` |
| 201 | 创建成功 | `response.of(201, data)` |
| 204 | 无内容 | `response.of(204, null)` |
| 400 | 参数错误 | `response.throwException(msg, 400, code)` |
| 401 | 未授权 | `response.throwException(msg, 401, code)` |
| 403 | 禁止访问 | `response.throwException(msg, 403, code)` |
| 404 | 不存在 | `response.throwException(msg, 404, code)` |
| 500 | 内部错误 | `response.throwException(msg, 500, code)` |

## 7. 安全响应模式（数组序列化陷阱规避）

> **背景**：KS 运行时在序列化 `response.ok()` 时，可能将 JS 数组 `[]` 转换为空对象 `{}`。为避免前端白屏，数组字段应使用字符串序列化方式返回。

### 7.1 将数组转为 JSON 字符串返回

```typescript
class SafeResponseController {
  // GET /kd/dev/sample/info
  getInfo(request: any, response: any) {
    const items = [
      '页面已通过 adapterApi 接入 KS Controller',
      '当前返回内容是后端硬编码的演示数据',
      '确认链路可用后，可以继续替换成真实业务逻辑'
    ];

    // ✅ 安全：将数组 JSON.stringify 后放入响应
    response.ok({
      title: 'CLI 创建的 KWC + KS 联调页',
      summary: '这段内容由 Controller 直接返回',
      items: JSON.stringify(items),   // 前端用 JSON.parse() 还原
      serverTime: new Date().toISOString()
    });
  }
}

let kwcController = new SafeResponseController();
export { kwcController };
```

**前端对应解析方式**：
```typescript
// 前端安全解析
const items: string[] = (() => {
  try {
    const parsed = JSON.parse(responseData.items);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
})();
```

### 7.2 用分隔符字符串代替简单数组

```typescript
class SimpleListController {
  getTags(request: any, response: any) {
    const tags = ['前端', '后端', '全栈'];

    // ✅ 安全：用分隔符拼接
    response.ok({
      tagsText: tags.join('||')    // 前端用 split('||') 还原
    });
  }
}

let kwcController = new SimpleListController();
export { kwcController };
```

## 8. SDK 使用常见模式

> 注意：SDK 的详细文档由 `kingscript-code-generator` 技能包提供，这里只展示在 Controller 中的典型用法模式。

### 7.1 数据库查询（QueryServiceHelper）

#### 查询单条记录

```typescript
import { QueryServiceHelper } from 'kd/sdk/helper';

class UserController {
  // GET /kd/dev/sample/users/{id}
  getUser(request: any, response: any) {
    const userId = request.getLongPathVariable('id');

    try {
      // 根据 ID 查询单条记录
      const result = QueryServiceHelper.queryDataSet(
        'bos_user',
        'id, name, email, department',
        [{ left: 'id', op: '=', right: userId }]
      );

      if (!result || result.size() === 0) {
        response.throwException('用户不存在', 404, 'USER_NOT_FOUND');
        return;
      }

      result.first();
      const user = {
        id: result.getLong('id'),
        name: result.getString('name'),
        email: result.getString('email'),
        department: result.getString('department')
      };

      response.ok(user);
    } catch (e: any) {
      response.throwException(e.message || '查询失败', 500, 'QUERY_FAILED');
    }
  }
}

let kwcController = new UserController();
export { kwcController };
```

#### 查询列表（带分页）

```typescript
import { QueryServiceHelper } from 'kd/sdk/helper';

class UserListController {
  // GET /kd/dev/sample/users?page=1&size=10&department=研发部
  listUsers(request: any, response: any) {
    const page = request.getIntQueryParam('page') || 1;
    const size = request.getIntQueryParam('size') || 10;
    const department = request.getStringQueryParam('department');

    try {
      // 构建过滤条件
      const filters: any[] = [];
      if (department) {
        filters.push({ left: 'department', op: '=', right: department });
      }

      // 分页查询
      const result = QueryServiceHelper.queryDataSet(
        'bos_user',
        'id, name, email, department',
        filters,
        'id asc',
        (page - 1) * size,
        size
      );

      const users: any[] = [];
      while (result.next()) {
        users.push({
          id: result.getLong('id'),
          name: result.getString('name'),
          email: result.getString('email'),
          department: result.getString('department')
        });
      }

      response.ok({
        data: users,
        pagination: { page, size, total: users.length }
      });
    } catch (e: any) {
      response.throwException(e.message || '查询失败', 500, 'QUERY_FAILED');
    }
  }
}

let kwcController = new UserListController();
export { kwcController };
```

### 7.2 业务数据操作（BusinessDataServiceHelper）

#### 保存实体

```typescript
import { BusinessDataServiceHelper } from 'kd/sdk/helper';
import { DynamicObject } from 'kd/sdk/datatype';

class UserCreateController {
  // POST /kd/dev/sample/users
  createUser(request: any, response: any) {
    const body = request.getMapBody();

    // 参数校验
    if (!body['name']) {
      response.throwException('用户名不能为空', 400, 'MISSING_NAME');
      return;
    }

    try {
      // 创建数据对象
      const userObj = new DynamicObject();
      userObj.set('name', body['name']);
      userObj.set('email', body['email']);
      userObj.set('department', body['department'] || '默认部门');

      // 保存实体
      const savedObj = BusinessDataServiceHelper.save('bos_user', userObj);

      response.of(201, {
        id: savedObj.getLong('id'),
        name: savedObj.getString('name'),
        message: '创建成功'
      });
    } catch (e: any) {
      response.throwException(e.message || '创建失败', 500, 'CREATE_FAILED');
    }
  }
}

let kwcController = new UserCreateController();
export { kwcController };
```

#### 更新实体

```typescript
import { BusinessDataServiceHelper } from 'kd/sdk/helper';
import { QueryServiceHelper } from 'kd/sdk/helper';

class UserUpdateController {
  // PUT /kd/dev/sample/users/{id}
  updateUser(request: any, response: any) {
    const userId = request.getLongPathVariable('id');
    const body = request.getMapBody();

    try {
      // 先查询已有记录
      const result = QueryServiceHelper.queryDataSet(
        'bos_user',
        'id, name, email, department',
        [{ left: 'id', op: '=', right: userId }]
      );

      if (!result || result.size() === 0) {
        response.throwException('用户不存在', 404, 'USER_NOT_FOUND');
        return;
      }

      // 获取已有数据对象并更新字段
      result.first();
      const userObj = result.getCurrentDynamicObject();
      if (body['name']) {
        userObj.set('name', body['name']);
      }
      if (body['email']) {
        userObj.set('email', body['email']);
      }
      if (body['department']) {
        userObj.set('department', body['department']);
      }

      // 保存更新
      BusinessDataServiceHelper.save('bos_user', userObj);

      response.ok({ message: '更新成功', id: userId });
    } catch (e: any) {
      response.throwException(e.message || '更新失败', 500, 'UPDATE_FAILED');
    }
  }
}

let kwcController = new UserUpdateController();
export { kwcController };
```

### 7.3 数据对象操作（DynamicObject）

#### 创建数据对象并赋值

```typescript
import { DynamicObject } from 'kd/sdk/datatype';

class DataController {
  // POST /kd/dev/sample/data
  createData(request: any, response: any) {
    const body = request.getMapBody();

    try {
      // 创建 DynamicObject 并设置属性
      const obj = new DynamicObject();
      obj.set('name', body['name']);
      obj.set('code', body['code']);
      obj.set('amount', body['amount']);
      obj.set('isActive', true);
      obj.set('createTime', new Date());

      response.ok({
        name: obj.getString('name'),
        code: obj.getString('code'),
        amount: obj.get('amount'),
        isActive: obj.getBoolean('isActive')
      });
    } catch (e: any) {
      response.throwException(e.message || '操作失败', 500, 'OPERATION_FAILED');
    }
  }
}

let kwcController = new DataController();
export { kwcController };
```

#### 从查询结果中提取属性

```typescript
import { QueryServiceHelper } from 'kd/sdk/helper';

class DetailController {
  // GET /kd/dev/sample/orders/{id}/detail
  getOrderDetail(request: any, response: any) {
    const orderId = request.getLongPathVariable('id');

    try {
      const result = QueryServiceHelper.queryDataSet(
        'bos_order',
        'id, orderNo, amount, status, customerName, createTime',
        [{ left: 'id', op: '=', right: orderId }]
      );

      if (!result || result.size() === 0) {
        response.throwException('订单不存在', 404, 'ORDER_NOT_FOUND');
        return;
      }

      // 从查询结果提取属性
      result.first();
      const detail = {
        id: result.getLong('id'),
        orderNo: result.getString('orderNo'),
        amount: result.getBigDecimal('amount'),
        status: result.getString('status'),
        customerName: result.getString('customerName'),
        createTime: result.getDate('createTime')
      };

      response.ok(detail);
    } catch (e: any) {
      response.throwException(e.message || '查询失败', 500, 'QUERY_FAILED');
    }
  }
}

let kwcController = new DetailController();
export { kwcController };
```
