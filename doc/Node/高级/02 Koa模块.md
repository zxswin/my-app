# Koa 模块

## Koa 简单使用案例

- hello world 例子

```ts
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

- 级联案例分析

```ts
/**
 * 当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件。
 */
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log('执行到第 1 个中间件……');
  await next(); // 等待下一个中间件执行完毕 才执行后面的内容
  const rt = ctx.response.get('X-Response-Time'); // 获取响应时间
  console.log(`${ctx.method} ${ctx.url} - ${rt}`); // 这个日志是最后才输出的内容
});

app.use(async (ctx, next) => {
  console.log('执行到第 2 个中间件……');
  const start = Date.now();
  await next(); // 等待下一个中间件执行完毕 才执行后面的内容
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`); // 设置响应时间
});

app.use(async (ctx) => {
  console.log('执行到第 3 个中间件 输出响应文本……');
  ctx.body = 'Hello World';
});

app.listen(3000);

// 打印输出内容为： 每响应一次资源都会执行一次
// 执行到第 1 个中间件……
// 执行到第 2 个中间件……
// 执行到第 3 个中间件 输出响应文本……
// GET / - 5ms
// 执行到第 1 个中间件……
// 执行到第 2 个中间件……
// 执行到第 3 个中间件 输出响应文本……
// GET /favicon.ico - 0ms
```

## 一些配置

- 1.app.listen(...)

```ts
// 一个无作用的 Koa 应用程序被绑定到 3000 端口：
const Koa = require('koa');
const app = new Koa();
app.listen(3000);

// app.listen(...) 方法只是以下方法的语法糖:
const http = require('http');
const Koa = require('koa');
const app = new Koa();
http.createServer(app.callback()).listen(3000);

// 可以将同一个应用程序同时作为 HTTP 和 HTTPS 或多个地址
const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();
http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);

// app.callback()
// 返回适用于 http.createServer() 方法的回调函数来处理请求。

// app.use(function)
// 将给定的中间件方法添加到此应用程序。

// 4.app.keys= 设置签名的 Cookie 密钥。
// 这些被传递给 KeyGrip，但是你也可以传递你自己的 KeyGrip 实例
app.keys = ['im a newer secret', 'i like turtle'];
app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');

// 这些密钥可以倒换，并在使用 { signed: true } 参数签名 Cookie 时使用
ctx.cookies.set('name', 'tobi', { signed: true });

// 5.app.context
// app.context 是从其创建 ctx 的原型。您可以通过编辑 app.context 为 ctx 添加其他属性
// app.context.db = db();
app.use(async (ctx) => {
  console.log(ctx.db);
});

// 错误处理 -当 err.status 是 404 或 err.expose 是 true 时默认错误处理程序也不会输出错误。
// 要执行自定义错误处理逻辑，如集中式日志记录，您可以添加一个 “error” 事件侦听器：
app.on('error', (err) => {
  log.error('server error', err);
});

// 如果 req/res 期间出现错误，并且 _无法_ 响应客户端，Context 实例仍然被传递：
app.on('error', (err, ctx) => {
  log.error('server error', err, ctx);
});
```

## 上下文(Context)

```ts
/**
 * Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法。
 *
 */
app.use(async (ctx) => {
  ctx; // 这是 Context
  ctx.request; // 这是 koa Request
  ctx.response; // 这是 koa Response
});
```

- Context 具体方法和访问器.

```ts
// 绕过 Koa 的 response 处理是 不被支持的.

// 1.ctx.req
// Node 的 request 对象.

// 2.ctx.res
// Node 的 response 对象.

// 3.ctx.request
// koa 的 Request 对象.

// 4.ctx.response
// koa 的 Response 对象.

// 5.ctx.state
// 推荐的命名空间，用于通过中间件传递信息和你的前端视图。
ctx.state.user = await User.find(id);

// 6.ctx.app 应用程序实例引用

// 7.ctx.cookies.get(name, [options])
// 通过 options 获取 cookie name:
// signed 所请求的 cookie 应该被签名
// koa 使用 cookies 模块，其中只需传递参数。

// 8.ctx.cookies.set(name, value, [options])
// 通过 options 设置 cookie name 的 value :

// maxAge 一个数字表示从 Date.now() 得到的毫秒数
// signed cookie 签名值
// expires cookie 过期的 Date
// path cookie 路径, 默认是'/'
// domain cookie 域名
// secure 安全 cookie
// httpOnly 服务器可访问 cookie, 默认是 true
// overwrite 一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此 Cookie 时从 Set-Cookie 标头中过滤掉。

// 9.ctx.throw([status], [msg], [properties])
// Helper 方法抛出一个 .status 属性默认为 500 的错误，这将允许 Koa 做出适当地响应。
// koa 使用 http-errors 来创建错误。

// -允许以下组合：

ctx.throw(400);
ctx.throw(400, 'name required');
ctx.throw(400, 'name required', { user: user });

// -例如 ctx.throw(400, 'name required') 等效于:

const err = new Error('name required');
err.status = 400;
err.expose = true;
throw err;

// 10.ctx.assert(value, [status], [msg], [properties])
// 当 !value 时，Helper 方法抛出类似于 .throw() 的错误。这与 node 的 assert() 方法类似.
ctx.assert(ctx.state.user, 401, 'User not found. Please login!');

// 11.ctx.respond
// 为了绕过 Koa 的内置 response 处理，你可以显式设置 ctx.respond = false;。
// 如果您想要写入原始的 res 对象而不是让 Koa 处理你的 response，请使用此参数。
```

- Request 别名

```ts
// 以下访问器和 Request 别名等效：
// ctx.header
// ctx.headers
// ctx.method
// ctx.method=
// ctx.url
// ctx.url=
// ctx.originalUrl
// ctx.origin
// ctx.href
// ctx.path
// ctx.path=
// ctx.query
// ctx.query=
// ctx.querystring
// ctx.querystring=
// ctx.host
// ctx.hostname
// ctx.fresh
// ctx.stale
// ctx.socket
// ctx.protocol
// ctx.secure
// ctx.ip
// ctx.ips
// ctx.subdomains
// ctx.is()
// ctx.accepts()
// ctx.acceptsEncodings()
// ctx.acceptsCharsets()
// ctx.acceptsLanguages()
// ctx.get()
```

- Response 别名

```ts
// 以下访问器和 Response 别名等效：
// ctx.body
// ctx.body=
// ctx.status
// ctx.status=
// ctx.message
// ctx.message=
// ctx.length=
// ctx.length
// ctx.type=
// ctx.type
// ctx.headerSent
// ctx.redirect()
// ctx.attachment()
// ctx.set()
// ctx.append()
// ctx.remove()
// ctx.lastModified=
// ctx.etag=
```

## 请求(Request)

```ts
// Koa Request 对象是在 node 的 vanilla 请求对象之上的抽象，提供了诸多对 HTTP 服务器开发有用的功能
// 1.request.header 请求标头对象。

// 2.request.header= 设置请求标头对象。

// 3.request.headers 请求标头对象。别名为 request.header.

// 4.request.headers= 设置请求标头对象。别名为 request.header=.

// 5.request.method 请求方法。

// 6.request.method= 设置请求方法，对于实现诸如 methodOverride() 的中间件是有用的。

// 7.request.length 返回以数字返回请求的 Content-Length，或 undefined。

// 8.request.url 获取请求 URL.

// 9.request.url= 设置请求 URL, 对 url 重写有用。

// 10.request.originalUrl 获取请求原始 URL。

// 11.request.origin 获取 URL 的来源，包括 protocol 和 host。
// ctx.request.origin // => http://example.com

// 12.request.href 获取完整的请求 URL，包括 protocol，host 和 url。
// ctx.request.href; // => http://example.com/foo/bar?q=1

// 13.request.path 获取请求路径名。

// 14.request.path= 设置请求路径名，并在存在时保留查询字符串。

// 15.request.querystring 根据 ? 获取原始查询字符串.

// 16.request.querystring= 设置原始查询字符串。

// 17.request.search 使用 ? 获取原始查询字符串。

// 18.request.search= 设置原始查询字符串。

// 19.request.host 获取当前主机（hostname:port）。当 app.proxy 是 true 时支持 X-Forwarded-Host，否则使用 Host。

// 20.request.hostname 存在时获取主机名。当 app.proxy 是 true 时支持 X-Forwarded-Host，否则使用 Host。
// 如果主机是 IPv6, Koa 解析到 WHATWG URL API, 注意 这可能会影响性能。

// 21.request.URL 获取 WHATWG 解析的 URL 对象。

// 22.request.type 获取请求 Content-Type 不含参数 "charset"。
// const ct = ctx.request.type; // => "image/png"

// 23.request.charset 在存在时获取请求字符集，或者 undefined：
// ctx.request.charset; // => "utf-8"

// 24.request.query 获取解析的查询字符串, 当没有查询字符串时，返回一个空对象。请注意，此 getter _不_ 支持嵌套解析。
// 例如 "color=blue&size=small":
// {
// color: 'blue',
// size: 'small'
// }

// 25.request.query= 将查询字符串设置为给定对象。 请注意，此 setter _不_ 支持嵌套对象。
ctx.query = { next: '/login' };

// 26.request.fresh
// 检查请求缓存是否“新鲜”，也就是内容没有改变。此方法用于 If-None-Match / ETag, 和 If-Modified-Since 和 Last-Modified 之间的缓存协商。 在设置一个或多个这些响应头后应该引用它。
// 新鲜度检查需要状态 20x 或 304
ctx.status = 200;
ctx.set('ETag', '123');

// 缓存是好的
if (ctx.fresh) {
  ctx.status = 304;
  return;
}

// 缓存是陈旧的
// 获取新数据
ctx.body = await db.find('something');
request.stale;
// 相反与 request.fresh.

// 27.request.protocol 返回请求协议，“https” 或 “http”。当 app.proxy 是 true 时支持 X-Forwarded-Proto。

// 28.request.secure 通过 ctx.protocol == "https" 来检查请求是否通过 TLS 发出。

// 29.request.ip 请求远程地址。 当 app.proxy 是 true 时支持 X-Forwarded-Proto。

// 30.request.ips
// 当 X-Forwarded-For 存在并且 app.proxy 被启用时，这些 ips 的数组被返回，从上游 - >下游排序。 禁用时返回一个空数组。

// 32.request.subdomains 将子域返回为数组。
// 子域是应用程序主域之前主机的点分隔部分。默认情况下，应用程序的域名假定为主机的最后两个部分。这可以通过设置 app.subdomainOffset 来更改。
// 例如，如果域名为“tobi.ferrets.example.com”：
// 如果 app.subdomainOffset 未设置, ctx.subdomains 是 ["ferrets", "tobi"]. 如果 app.subdomainOffset 是 3, ctx.subdomains 是 ["tobi"].

// 33.request.is(types...)
// 检查传入请求是否包含 Content-Type 头字段， 并且包含任意的 mime type。 如果没有请求主体，返回 null。 如果没有内容类型，或者匹配失败，则返回 false。 反之则返回匹配的 content-type。

// 使用 Content-Type: text/html; charset=utf-8
ctx.is('html'); // => 'html'
ctx.is('text/html'); // => 'text/html'
ctx.is('text/*', 'text/html'); // => 'text/html'

// 当 Content-Type 是 application/json 时
ctx.is('json', 'urlencoded'); // => 'json'
ctx.is('application/json'); // => 'application/json'
ctx.is('html', 'application/*'); // => 'application/json'

ctx.is('html'); // => false
// 例如，如果要确保仅将图像发送到给定路由：

if (ctx.is('image/*')) {
  // 处理
} else {
  ctx.throw(415, 'images only!');
}

// 34.内容协商
// Koa 的 request 对象包括由 accepts 和 negotiator 提供的有用的内容协商实体。
// 这些实用程序是：
// request.accepts(types)
// request.acceptsEncodings(types)
// request.acceptsCharsets(charsets)
// request.acceptsLanguages(langs)
// 如果没有提供类型，则返回 所有 可接受的类型。
// 如果提供多种类型，将返回最佳匹配。 如果没有找到匹配项，则返回一个 false，你应该向客户端发送一个 406 "Not Acceptable" 响应。
// 如果接收到任何类型的接收头，则会返回第一个类型。 因此，你提供的类型的顺序很重要。

// request.accepts(types)
// 检查给定的 type(s) 是否可以接受，如果 true，返回最佳匹配，否则为 false。 type 值可能是一个或多个 mime 类型的字符串，如 application/json，扩展名称如 json，或数组 ["json", "html", "text/plain"]。

// Accept: text/html
ctx.accepts('html');
// => "html"

// Accept: text/\*, application/json
ctx.accepts('html');
// => "html"
ctx.accepts('text/html');
// => "text/html"
ctx.accepts('json', 'text');
// => "json"
ctx.accepts('application/json');
// => "application/json"

// Accept: text/\*, application/json
ctx.accepts('image/png');
ctx.accepts('png');
// => false

// Accept: text/\*;q=.5, application/json
ctx.accepts(['html', 'json']);
ctx.accepts('html', 'json');
// => "json"

// No Accept header
ctx.accepts('html', 'json');
// => "html"
ctx.accepts('json', 'html');
// => "json"
// 你可以根据需要多次调用 ctx.accepts()，或使用 switch：

switch (ctx.accepts('json', 'html', 'text')) {
  case 'json':
    break;
  case 'html':
    break;
  case 'text':
    break;
  default:
    ctx.throw(406, 'json, html, or text only');
}

// request.acceptsEncodings(encodings)
// 检查 encodings 是否可以接受，返回最佳匹配为 true，否则为 false。 请注意，您应该将 identity 作为编码之一！

// Accept-Encoding: gzip
ctx.acceptsEncodings('gzip', 'deflate', 'identity');
// => "gzip"

ctx.acceptsEncodings(['gzip', 'deflate', 'identity']);
// => "gzip"
// 当没有给出参数时，所有接受的编码将作为数组返回：

// Accept-Encoding: gzip, deflate
ctx.acceptsEncodings();
// => ["gzip", "deflate", "identity"]
// 请注意，如果客户端显式地发送 identity;q=0，那么 identity 编码（这意味着没有编码）可能是不可接受的。 虽然这是一个边缘的情况，你仍然应该处理这种方法返回 false 的情况。

request.acceptsCharsets(charsets);
// 检查 charsets 是否可以接受，在 true 时返回最佳匹配，否则为 false。

// Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5
ctx.acceptsCharsets('utf-8', 'utf-7');
// => "utf-8"

ctx.acceptsCharsets(['utf-7', 'utf-8']);
// => "utf-8"
// 当没有参数被赋予所有被接受的字符集将作为数组返回：

// Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5
ctx.acceptsCharsets();
// => ["utf-8", "utf-7", "iso-8859-1"]
request.acceptsLanguages(langs);
// 检查 langs 是否可以接受，如果为 true，返回最佳匹配，否则为 false。

// Accept-Language: en;q=0.8, es, pt
ctx.acceptsLanguages('es', 'en');
// => "es"

ctx.acceptsLanguages(['en', 'es']);
// => "es"
// 当没有参数被赋予所有接受的语言将作为数组返回：

// Accept-Language: en;q=0.8, es, pt
ctx.acceptsLanguages();
// => ["es", "pt", "en"]

// 35.request.idempotent 检查请求是否是幂等的。

// 36.request.socket 返回请求套接字。

// 37.request.get(field) 返回请求标头。
```

- 响应(Response)

```ts
// 1.response.header 响应标头对象。

// 2.response.headers 响应标头对象。别名是 response.header。

// 3.response.socket 请求套接字。

// 4.response.status 获取响应状态。默认情况下，response.status 设置为 404 而不是像 node 的 res.statusCode 那样默认为 200。

// 6.response.status= 通过数字代码设置响应状态：

// 100 "continue"
// 101 "switching protocols"
// 102 "processing"
// 200 "ok"
// 201 "created"
// 202 "accepted"
// 203 "non-authoritative information"
// 204 "no content"
// 205 "reset content"
// 206 "partial content"
// 207 "multi-status"
// 208 "already reported"
// 226 "im used"
// 300 "multiple choices"
// 301 "moved permanently"
// 302 "found"
// 303 "see other"
// 304 "not modified"
// 305 "use proxy"
// 307 "temporary redirect"
// 308 "permanent redirect"
// 400 "bad request"
// 401 "unauthorized"
// 402 "payment required"
// 403 "forbidden"
// 404 "not found"
// 405 "method not allowed"
// 406 "not acceptable"
// 407 "proxy authentication required"
// 408 "request timeout"
// 409 "conflict"
// 410 "gone"
// 411 "length required"
// 412 "precondition failed"
// 413 "payload too large"
// 414 "uri too long"
// 415 "unsupported media type"
// 416 "range not satisfiable"
// 417 "expectation failed"
// 418 "I'm a teapot"
// 422 "unprocessable entity"
// 423 "locked"
// 424 "failed dependency"
// 426 "upgrade required"
// 428 "precondition required"
// 429 "too many requests"
// 431 "request header fields too large"
// 500 "internal server error"
// 501 "not implemented"
// 502 "bad gateway"
// 503 "service unavailable"
// 504 "gateway timeout"
// 505 "http version not supported"
// 506 "variant also negotiates"
// 507 "insufficient storage"
// 508 "loop detected"
// 510 "not extended"
// 511 "network authentication required"
// 注意: 不用太在意记住这些字符串, 如果你写错了,可以查阅这个列表随时更正.

// 7.response.message 获取响应的状态消息. 默认情况下, response.message 与 response.status 关联.

// 8.response.message= 将响应的状态消息设置为给定值。

// 9.response.length= 将响应的 Content-Length 设置为给定值。

// 10.response.length 数字返回响应的 Content-Length，或者从 ctx.body 推导出来，或者 undefined。

// 11.response.body 获取响应主体。

// 12.response.body= 将响应体设置为以下之一：
// string 写入
// Buffer 写入
// Stream 管道
// Object || Array JSON-字符串化
// null 无内容响应
// 如果 response.status 未被设置, Koa 将会自动设置状态为 200 或 204。

// 13.String
// Content-Type 默认为 text/html 或 text/plain, 同时默认字符集是 utf-8。Content-Length 字段也是如此。

// 14.Buffer
// Content-Type 默认为 application/octet-stream, 并且 Content-Length 字段也是如此。

// 15.Stream
// Content-Type 默认为 application/octet-stream。
// 以下是流错误处理的示例，而不会自动破坏流：(如果把流作为响应实体的话)
const PassThrough = require('stream').PassThrough;
app.use(async (ctx) => {
  ctx.body = someHTTPStream.on('error', ctx.onerror).pipe(PassThrough());
});

// 16.Object
// Content-Type 默认为 application/json. 这包括普通的对象 { foo: 'bar' } 和数组 ['foo', 'bar']。

// 17.response.get(field) 不区分大小写获取响应标头字段值 field。
const etag = ctx.response.get('ETag');

// 18.response.set(field, value)
// 设置响应标头 field 到 value:
ctx.set('Cache-Control', 'no-cache');

// 19.response.append(field, value)
// 用值 val 附加额外的标头 field。
ctx.append('Link', '<http://127.0.0.1/>');

// 20.response.set(fields)
// 用一个对象设置多个响应标头 fields:

ctx.set({
  Etag: '1234',
  'Last-Modified': date,
});

// 21.response.remove(field) 删除标头 field。

// 22.response.type
// 获取响应 Content-Type 不含参数 "charset"。
const ct = ctx.type; // => "image/png"

// 23.response.type= 设置响应 Content-Type 通过 mime 字符串或文件扩展名。

ctx.type = 'text/plain; charset=utf-8';
ctx.type = 'image/png';
ctx.type = '.png';
ctx.type = 'png';

// 24.response.is(types...)
// 非常类似 ctx.request.is(). 检查响应类型是否是所提供的类型之一。这对于创建操纵响应的中间件特别有用。
// 例如, 这是一个中间件，可以削减除流之外的所有 HTML 响应。

const minify = require('html-minifier');

app.use(async (ctx, next) => {
  await next();

  if (!ctx.response.is('html')) return;

  let body = ctx.body;
  if (!body || body.pipe) return;

  if (Buffer.isBuffer(body)) body = body.toString();
  ctx.body = minify(body);
});

// 25.response.redirect(url, [alt])
// 执行 [302] 重定向到 url.
// 字符串 “back” 是特别提供 Referrer 支持的，当 Referrer 不存在时，使用 alt 或“/”。
ctx.redirect('back');
ctx.redirect('back', '/index.html');
ctx.redirect('/login');
ctx.redirect('http://google.com');

// 26.要更改 “302” 的默认状态，只需在该调用之前或之后分配状态。要变更主体请在此调用之后:
ctx.status = 301;
ctx.redirect('/cart');
ctx.body = 'Redirecting to shopping cart';

// 27.response.attachment([filename])
// 将 Content-Disposition 设置为 “附件” 以指示客户端提示下载。(可选)指定下载的 filename。

// 28.response.headerSent
// 检查是否已经发送了一个响应头。 用于查看客户端是否可能会收到错误通知。

// 29.response.lastModified
// 将 Last-Modified 标头返回为 Date, 如果存在。

// 30.response.lastModified=
// 将 Last-Modified 标头设置为适当的 UTC 字符串。您可以将其设置为 Date 或日期字符串。

// 31.ctx.response.lastModified = new Date();

// 32.response.etag=
// 设置包含 " 包裹的 ETag 响应， 请注意，没有相应的 response.etag getter。

// 33.ctx.response.etag = crypto.createHash('md5').update(ctx.body).digest('hex');

// 34.response.vary(field) 在 field 上变化。

// 35.response.flushHeaders() 刷新任何设置的标头，并开始主体。
```

## 单词：

```pug
development 发展 开发区
turtle 乌龟
silent 沉默的
expose 揭露 暴露
expires 到期
secure 保护 安全
properties 属性
assert 断言
hack 劈砍
redirect 重定向
attachment 附件
vanilla 香草
override 重写 推翻
forward 前进 发送 促进
since 自从
accept 接受 同意
negotiator 谈判者
plain 平原 完全的
deflate 放气 收缩
identity 身份 特性
idempotent 幂等
authoritative 权威的
partial 部分的
permanently 永久的
temporary 暂时的
payment 付款 支付
forbidden 被禁止的
conflict 冲突
payload 有效载荷
satisfiable 可满足的
precondition 先决条件 前提
expectation 期待
teapot 茶壶
processable 可加工的
implemented 实施
gateway 网关
variant 变体
insufficient 不足
detected 检测
authentication 认证
octet 八位字节
mime 笑剧 模拟
minifier 缩小镜
referred 援引的
referrer 介绍人
cart 货运马车
disposition 性格 安排 配置
vary 变化
flush 脸红 冲刷
```
