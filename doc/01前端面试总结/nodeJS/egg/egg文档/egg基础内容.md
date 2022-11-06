# egg 框架学习笔记

## egg-cli 脚手架构建框架(项目搭建方法一)
``` bash
# 全局安装egg-init
$ npm i egg-init -g 
# 会在当前目录下生成egg-cli文件加并生成相关文件
$ egg-init egg-cli --type=simple
# 定位到egg-cli目录下并安装相关依赖包
$ cd egg-cli
$ npm i

# 启动项目:
$ npm run dev
$ open localhost:7001
```

## 逐步搭建(项目搭建方法二)

* 项目初始化及依赖安装

``` bash
# 初始化项目
$ npm init
# 依赖安装
$ npm i egg --save
$ npm i egg-bin --save-dev

```

## 目录规范
* 框架约定的目录
``` bash
app/router.js 用于配置 URL 路由规则
app/controller/** 用于解析用户的输入，处理后返回相应的结果
app/service/** 用于编写业务逻辑层，可选，建议使用
app/middleware/** 用于编写中间件，可选
app/public/** 用于放置静态资源，可选
app/extend/** 用于框架的扩展，可选
config/config.{env}.js 用于编写配置文件
config/plugin.js 用于配置需要加载的插件
app/view/** 用于放置模板文件，可选，由模板插件约定
app/model/** 用于放置领域模型，可选，由领域类相关插件约定，如 egg-sequelize。
test/** 用于单元测试
app.js 和 agent.js 用于自定义启动时的初始化工作，可选，具体参见启动自定义。agent.js的作用参见Agent机制。
```

* 由内置插件约定的目录
``` bash
app/public/** 用于放置静态资源，可选
app/schedule/** 用于定时任务
```

## 框架内置基础对象

### Application
* Application 是全局应用对象，在一个应用中，只会实例化一个 可以挂载全局方法和对象

#### 事件
``` js

module.exports = app => {
  /* server: 该事件一个 worker 进程只会触发一次，在 HTTP 服务完成启动后，会将 HTTP server 通过这个事件暴露出来给开发者。 */
  app.once('server', server => {});

  /* error: 运行时有任何的异常被 onerror 插件捕获后，都会触发 error 事件 */
  app.on('error', (err, ctx) => {});

  /* request 和 response: 应用收到请求和响应请求时，分别会触发 request 和 response 事件 */
  app.on('request', ctx => {});
  app.on('response', ctx => {
    const used = Date.now() - ctx.starttime;
  });
};

```
### Application的获取方式
``` js
/* 几乎所有被框架 Loader 加载的文件（Controller，Service，Schedule 等），都可以 export 一个函数，这个函数会被 Loader 调用，并使用 app 作为参数： */

module.exports = app => {
  app.cache = new Cache();
};

/*在继承于 Controller, Service 基类的实例中 可以通过this.app文件获取 */
class UserController extends Controller {
  async fetch() {
    this.ctx.body = this.app.cache.get(this.ctx.query.id);
  }
}

/* 在 Context 对象上，可以通过 ctx.app 访问到 Application 对象 */
class UserController extends Controller {
  async fetch() {
    this.ctx.body = this.ctx.app.cache.get(this.ctx.query.id);
  }
}
```

### Context
* 框架会将所有的 Service 挂载到 Context 实例上，
* 一些插件也会将一些其他的方法和对象挂载到它上面（egg-sequelize 会将所有的 model 挂载在 Context 上）。

#### 获取方式
``` js
/* 中间件中获取Context的方法 */
async function middleware(ctx, next) {
  // ctx is instance of Context
  console.log(ctx.query);
}

/* 非用户请求的场景下  Context 实例上的对象 的获取 通过 Application.createAnonymousContext() 方法创建一个匿名 Context 实例 */

// app.js
module.exports = app => {
  app.beforeStart(async () => {
    const ctx = app.createAnonymousContext();
    // preload before app start
    await ctx.service.posts.load();
  });
}

// app/schedule/refresh.js
exports.task = async ctx => {
  await ctx.service.posts.refresh();
};
```

### Request & Response
* ctx.request.query.id 和 ctx.query.id 是等价的，ctx.response.body= 和 ctx.body= 是等价的。
* 获取 POST 的 body 应该使用 ctx.request.body，而不是 ctx.body。
``` js
/* 获取 Request & Response*/
// app/controller/user.js
class UserController extends Controller {
  async fetch() {
    const { app, ctx } = this;
    const id = ctx.request.query.id;
    ctx.response.body = app.cache.get(id);
  }
}
```
### Controller
* 框架提供了一个 Controller 基类，并推荐所有的 Controller 都继承于该基类实现
``` bash
# Controller 基类属性
ctx - 当前请求的 Context 实例。
app - 应用的 Application 实例。
config - 应用的配置。
service - 应用所有的 service。
logger - 为当前 controller 封装的 logger 对象。
```
#### Controller获取方式
``` js
// 从 egg 上获取（推荐）
const Controller = require('egg').Controller;
class UserController extends Controller {
  // implement
}
module.exports = UserController;

// 从 app 实例上获取
module.exports = app => {
  return class UserController extends app.Controller {
    // implement
  };
};
```

### Service
* 框架提供了一个 Service 基类，并推荐所有的 Service 都继承于该基类实现。
#### Service类的获取方法
``` js
// 从 egg 上获取（推荐）
const Service = require('egg').Service;
class UserService extends Service {
  // implement
}
module.exports = UserService;

// 从 app 实例上获取
module.exports = app => {
  return class UserService extends app.Service {
    // implement
  };
};
```
### Helper
* Helper 用来提供一些实用的 utility 函数。
* Helper类和 Controller 基类一样的属性 每次请求时进行实例化 可以获取每次请求的上下文信息
#### Helper 获取方式
``` js
/* 可以在 Context 的实例上获取到当前请求的 Helper(ctx.helper) 实例。 */
// app/controller/user.js
class UserController extends Controller {
  async fetch() {
    const { app, ctx } = this;
    const id = ctx.query.id;
    const user = app.cache.get(id);
    ctx.body = ctx.helper.formatUser(user);
  }
}

/* Helper 的实例还可以在模板中获取到 */
{{ helper.shtml(value) }}

/* 自定义 helper 方法  通过框架扩展的形式来自定义 helper 方法。*/
// app/extend/helper.js
module.exports = {
  formatUser(user) {
    return only(user, [ 'name', 'phone' ]);
  }
};

```

### Config
* 应用开发遵循配置和代码分离的原则，将一些需要硬编码的业务配置都放到配置文件中，同时配置文件支持各个不同的运行环境使用不同的配置
* 我们可以通过 app.config 从 Application 实例上获取到 config 对象
* 可以在 Controller, Service, Helper 的实例上通过 this.config 获取到 config 对象。

### Logger
* 框架内置了功能强大的日志功能，可以非常方便的打印各种级别的日志到对应的日志文件中
``` bash
# 每一个 logger 对象都提供了 4 个级别的方法：
logger.debug()
logger.info()
logger.warn()
logger.error()
```
#### App Logger
* 通过 app.logger 来获取到它
* 如记录启动阶段的一些数据信息，记录一些业务上与请求无关的信息

#### App CoreLogger
* 通过 app.coreLogger 来获取到它
* 通过 CoreLogger 打印的日志会放到和 Logger 不同的文件中。
* 一般我们在开发应用时都不应该通过 CoreLogger 打印日志，而框架和插件则需要通过它来打印应用级别的日志
#### Context Logger
* ctx.logger 从 Context 实例上获取到它
* 打印的日志都会在前面带上一些当前请求相关的信息

#### Context CoreLogger
* 通过 ctx.coreLogger 获取到它
* 和 Context Logger 的区别是一般只有插件和框架会通过它来记录日志

#### Controller Logger & Service Logger
* 在 Controller 和 Service 实例上通过 this.logger 获取到它们
* 它们本质上就是一个 Context Logger，不过在打印日志的时候还会额外的加上文件路径，方便定位日志的打印位置。


### Subscription
* 提供了 Subscription 基类来规范化订阅模式。
``` js
/* 引用 Subscription 基类 */
const Subscription = require('egg').Subscription;

class Schedule extends Subscription {
  // 需要实现此方法
  // subscribe 可以为 async function 或 generator function
  async subscribe() {}
}

```

## 运行环境
* 通过 app.config.env 来区分环境，app.env 不再使用。

### 指定运行环境
* 通过 config/env 文件指定，该文件的内容就是运行环境，如 prod。一般通过构建工具来生成这个文件。
* 通过 EGG_SERVER_ENV 环境变量指定。
> EGG_SERVER_ENV=prod npm start

### 应用内获取运行环境
> 框架提供了变量 `app.config.env` 来表示应用当前的运行环境。

### 与 NODE_ENV 的区别
* 使用 NODE_ENV 来区分运行环境，但 EGG_SERVER_ENV 区分得更加精细
* 如果未指定 EGG_SERVER_ENV 会根据 NODE_ENV 来匹配
``` bash
# NODE_ENV
本地开发环境 
单元测试 `test`
生产环境 `production`

# EGG_SERVER_ENV
本地开发环境 `local`
单元测试 `unittest`
生产环境 `prod`

```
### 自定义环境
* 将 EGG_SERVER_ENV 设置成 sit（并建议设置 NODE_ENV = production），
* 启动时会加载 config/config.sit.js，运行环境变量 app.config.env 会被设置成 sit。

## 知识点补充

* LTS版本为稳定版
* Cookie
``` bash
1.HTTP 请求都是无状态的
2.服务端可以通过响应头（set-cookie）将少量数据响应给客户端，浏览器会遵循协议将数据保存，并在下次请求同一个服务的时候带上
# Cookie 一般是通过服务器端设置 保存在浏览器上的
# Cookie 有长度限制限制 cookie的长度不能大于4kB 一般来说不要超过 4093 bytes
# Cookie 的设置参数
maxAge(Number) 设置这个键值对在浏览器的最长保存时间。是一个从服务器当前时刻开始的毫秒数。 
expires(Date) 设置这个键值对的失效时间，如果设置了 maxAge，expires 将会被覆盖。如果 maxAge 和 expires 都没设置，Cookie 将会在浏览器的会话失效（一般是关闭浏览器时）的时候失效。 
path(String) 设置键值对生效的 URL 路径，默认设置在根路径上（/），也就是当前域名下的所有 URL 都可以访问这个 Cookie。
domain(String) 设置键值对生效的域名，默认没有配置，可以配置成只在指定域名才能访问。 
httpOnly(Boolean) 设置键值对是否可以被 js 访问，默认为 true，不允许被 js 访问。 
secure(Boolean) 设置键值对只在 HTTPS 连接上传输，框架会帮我们判断当前是否在 HTTPS 连接上自动设置 secure 的值。 

egg框架拓展的其他参数
# 默认的配置下，Cookie 是加签不加密的，浏览器可以看到明文，js 不能访问，不能被客户端（手工）篡改。
overwrite(Boolean) 设置 key 相同的键值对如何处理，如果设置为 true，则后设置的值会覆盖前面设置的，否则将会发送两个 set-cookie 响应头。  
signed(Boolean) 设置是否对 Cookie 进行签名，如果设置为 true，则设置键值对的时候会同时对这个键值对的值进行签名，后面取的时候做校验，可以防止前端对这个值进行篡改。默认为 true。 
encrypt(Boolean) 设置是否对 Cookie 进行加密，如果设置为 true，则在发送 Cookie 前会对这个键值对的值进行加密，客户端无法读取到 Cookie 的明文值。默认为 false。 
```
* Session
``` bash
# session类似服务器端的cookie，保存于服务器端，类似于服务器缓存。
# session可以储存在内存中 也可以储存在数据库或文件中
# session的使用 cookie与url重写
1.sessionid字段通过cookie传递给后端
2.sessionid字段通过URL传递给后端

```


## 单词
``` pug
compression 压缩
agent 代理人
schedule 日程安排
anonymous 匿名的
utility 效用 公共事业
subscription 订阅
```