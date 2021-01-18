# 服务（Service）

## egg.Service 类的属性

```bash
this.ctx: 当前请求的上下文 Context 对象的实例
this.app: 当前应用 Application 对象的实例
this.service：应用定义的 Service
this.config：应用运行时的配置项。
this.logger：logger 对象
```

## Service ctx

```bash
this.ctx.curl 发起网络调用。
this.ctx.service.otherService 调用其他 Service。
this.ctx.db 发起数据库调用等， db 可能是其他插件提前挂载到 app 上的模块。
```

## Service 支持多级目录

- Service 文件必须放在 app/service 目录，可以支持多级目录，访问的时候可以通过目录名级联访问。

```bash
app/service/biz/user.js => ctx.service.biz.user
app/service/sync_user.js => ctx.service.syncUser
app/service/HackerNews.js => ctx.service.hackerNews
```

## Service 简单实用案例

```js
// app/router.js
module.exports = app => {
  app.router.get('/user/:id', app.controller.user.info);
};

// app/controller/user.js
const Controller = require('egg').Controller;
class UserController extends Controller {
  async info() {
    const { ctx } = this;
    const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find(userId);
    ctx.body = userInfo;
  }
}
module.exports = UserController;

// app/service/user.js
const Service = require('egg').Service;
class UserService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.ctx.db.query(
      'select * from user where uid = ?',
      uid
    );

    // 假定这里还有一些复杂的计算，然后返回需要的信息。
    const picture = await this.getPicture(uid);

    return {
      name: user.user_name,
      age: user.age,
      picture
    };
  }

  async getPicture(uid) {
    const result = await this.ctx.curl(`http://photoserver/uid=${uid}`, {
      dataType: 'json'
    });
    return result.data;
  }
}
module.exports = UserService;

// curl http://127.0.0.1:7001/user/1234
```
