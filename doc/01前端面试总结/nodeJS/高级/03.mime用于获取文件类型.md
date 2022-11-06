## mime 模块

- mime 模块的作用

```ts
/**
 * 1.用于根据文件类型 获取文件 Content-Type
 * 用于请求服务器端的时候 根据请求地址响应正确的静态资源
 *
 * 2.用于识别文件的 MIME type 类型
 */
```

- 使用

```ts
/**
 * 1.按装依赖
 * npm install mime -S
 */

// 2.简单案例
const mime = require('mime'); // 引入依赖

mime.getType('txt'); // ⇨ 'text/plain'
mime.getExtension('text/plain'); // ⇨ 'txt'
```

## API

- new Mime(typeMap) 创建并使用 Mime 实例

```ts
// 引入 Mime class
const Mime = require('mime/Mime');

// 定义 mime type -> 拓展名集合
const typeMap = {
  'text/abc': ['abc', 'alpha', 'bet'],
  'text/def': ['leppard'],
};

// 创建并使用 Mime 实例
const myMime = new Mime(typeMap);
myMime.getType('abc'); // ⇨ 'text/abc'
myMime.getExtension('text/def'); // ⇨ 'leppard'
```

- mime.getType(pathOrExtension) 获取拓展名

```ts
mime.getType('js'); // ⇨ 'application/javascript'
mime.getType('json'); // ⇨ 'application/json'

mime.getType('txt'); // ⇨ 'text/plain'
mime.getType('dir/text.txt'); // ⇨ 'text/plain'
mime.getType('dir\\text.txt'); // ⇨ 'text/plain'
mime.getType('.text.txt'); // ⇨ 'text/plain'
mime.getType('.txt'); // ⇨ 'text/plain'
```

- mime.getExtension(type) 获取文件后缀名 扩展名

```ts
mime.getExtension('text/plain'); // ⇨ 'txt'
mime.getExtension('application/json'); // ⇨ 'json'
mime.getExtension('text/html; charset=utf8'); // ⇨ 'html'
```

- mime.define(typeMap[, force = false]) 定义 mime 类型

```ts
mime.define({ 'text/x-abc': ['abc', 'abcd'] });
mime.getType('abcd'); // ⇨ 'text/x-abc'
mime.getExtension('text/x-abc'); // ⇨ 'abc'
```

## 运用实例

- 加载静态资源

```ts
const Koa = require('koa');
const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');
let Router = require('koa-router');
const koaBody = require('koa-body');
const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

app.use(async (ctx, next) => {
  let url = '/static/';
  let dir = __dirname + '/static';
  let rpath = ctx.request.path;
  console.log('rpath', rpath);
  if (rpath.startsWith(url)) {
    let fp = path.join(dir, rpath.substring(url.length));
    console.log('fp', fp);
    if (await fs.exists(fp)) {
      ctx.response.type = mime.getType(rpath); // 指定响应类型 Content-Type
      ctx.response.body = await fs.readFile(fp); // 指定响应体
    } else {
      ctx.response.status = 404;
    }
  } else {
    await next();
  }
});

// 添加路由中间件
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
console.log('app started at port 3000...');
```

## 单词：

```pug
comprehensive 全面的
compact 紧凑
note 注意 记录
version 版本
implies 暗示
prefer 更喜欢
legacy 遗产
legacy version 旧版本
bundler 打包机
via 经过; 通过，凭借; 取道
available 可获得的; 有空的; 可购得的; 能找到的
quick 快速
extension 扩展 伸展
lite 清淡的
instance 实例
detected 发现 查明
recognize 识别
plain 平原
```
