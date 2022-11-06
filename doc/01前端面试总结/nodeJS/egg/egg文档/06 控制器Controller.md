# 控制器（Controller）

## egg.Controller 类上挂载的属性

```bash
this.ctx: 当前请求的上下文 Context 对象的实例
this.app: 当前应用 Application 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
this.service：应用定义的 Service，等价于 this.ctx.service
this.config：应用运行时的配置项。
this.logger：logger 对象 通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径
```

## 请求参数获取

- GET /posts?category=egg&language=node 获取请求参数

```js
/** ctx.query 只取 key 第一次出现时的值，后面再出现的都会被忽略
 * ctx.query 上获取的参数一旦存在，一定是字符串类型。
 */
const query = this.ctx.query;
// {
//   category: 'egg',
//   language: 'node',
// }
```

- this.ctx.queries 相同的 key

```js
/** 不会丢弃任何一个重复的数据，而是将他们都放到一个数组中
 *  key 如果有值，也一定会是数组类型
 */
console.log(this.ctx.queries);
// {
//   category: [ 'egg' ],
//   id: [ '1', '2', '3' ],
// }
```

- 通过 ctx.params 获取 Router 上申明的参数

```js
/** /projects/:projectId/app/:appId
 * GET /projects/1/app/2
 */
this.ctx.params.projectId;
this.ctx.params.appId;
```

## body 参数获取

- ctx.request.body 获取 body 参数

```js
/** 我们无法在 GET、HEAD 方法中按照此方法获取到内容 建议使用body
 * 请求 body 超过了我们配置的解析最大长度，会抛出一个状态码为 413
 * 请求的 body 解析失败（错误的 JSON），会抛出一个状态码为 400
 */
this.ctx.request.body.title;
this.ctx.request.body.content;
```

- 设置解析时允许的最大长度

```js
// config/config.default.js
/** 变更解析时允许的最大长度
 * 如果我们应用前面还有一层反向代理（Nginx），可能也需要调整它的配置，确保反向代理也支持同样长度的请求 body
 */
config.bodyParser = {
  jsonLimit: '1mb', // 默认为100k
  formLimit: '1mb' // 默认为100k
};
```

## 获取和设置 header 参数

```bash
ctx.headers，ctx.header，ctx.request.headers，ctx.request.header：这几个方法是等价的，都是获取整个 header 对象。
ctx.get(name)，ctx.request.get(name)：获取请求 header 中的一个字段的值，如果这个字段不存在，会返回空字符串。
我们建议用 ctx.get(name) 而不是 ctx.headers['name']，因为前者会自动处理大小写。
通过 ctx.ips 获取请求经过所有的中间设备 IP 地址列表 获取不到时为空数组
通过 ctx.ip 获取请求发起方的 IP 地址，优先从 ctx.ips 中获取，ctx.ips 为空时使用连接上发起方的 IP 地址。
```

## 通过 ctx.cookies，我们可以在 Controller 中便捷、安全的设置和读取 Cookie。

## 框架内置了 Session 插件，给我们提供了 ctx.session 来访问或者修改当前用户 Session 。

## 通过 ctx.validate(rule, [body]) 直接对参数进行校验：

```js
class PostController extends Controller {
  async create() {
    // 校验参数
    // 如果不传第二个参数会自动校验 `ctx.request.body`
    this.ctx.validate({
      title: { type: 'string' },
      content: { type: 'string' }
    });
  }
}
```

## 发送 HTTP 响应

### 设置 status

- 置状态码为 201
  this.ctx.status = 201;

## 设置 body

- ctx.body 是 ctx.response.body 的简写，不要和 ctx.request.body 混淆了。

- 框架也支持直接将 body 设置成一个 Stream，并会同时处理好这个 Stream 上的错误事件

```js
class ProxyController extends Controller {
  async proxy() {
    const ctx = this.ctx;
    const result = await ctx.curl(url, {
      streaming: true
    });
    ctx.set(result.header);
    // result.res 是一个 stream
    ctx.body = result.res;
  }
}
```

## 设置 Header

- 通过 ctx.set(key, value) 方法可以设置一个响应头，ctx.set(headers) 设置多个 Header。

```js
// 设置一个响应头
ctx.set('show-response-time', used.toString());
```

## 重定向

- ctx.redirect(url) 如果不在配置的白名单域名内，则禁止跳转。
- ctx.unsafeRedirect(url) 不判断域名，直接跳转，一般不建议使用，明确了解可能带来的风险后使用。
