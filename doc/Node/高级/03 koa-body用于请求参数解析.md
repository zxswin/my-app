## koa-body

- koa-body 插件的作用

```ts
/**
 * 1.用于处理 post 等通过 body 发送过来的数据解析
 * 2.目前支持 3 种类型的参数请求
 * multipart/form-data // 用于大的二进制文件的处理
 * application/x-www-urlencoded // 表单提交
 * application/json // json 结构数据提交
 */
```

- koa-body 的使用

```ts
/**
 * 1.安装 koa-body 依赖
 * npm install koa-body -S
 *
 * 2.引入 koa-body 依赖
 * const koaBody = require('koa-body');
 */
```

- 简单的例子(包括普通的 get,post 请求及文件上传接口)

```ts
const Koa = require('koa');
let Router = require('koa-router');
const koaBody = require('koa-body');
const fs = require('mz/fs');

const path = require('path');

const app = new Koa();
const router = new Router();

const uuidv1 = require('uuid/v1'); // 用于生成唯一值

// 打印请求的 url
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

app.use(koaBody()); // 解析请求体参数 要不然服务器无法识别

// get 请求
router.get('/api/hello', async (ctx, next) => {
  // console.log(ctx.request.query); // { name: 'koa', password: '12345' } 获取链接上的参数
  ctx.response.body = [];
});

// post 请求
router.post('/api/pt', async (ctx, next) => {
  // console.log(ctx.request.query); // { name: 'koa', password: '12345' } 获取链接上的参数
  // console.log(ctx.request.body); // { id: 'test', manufacturer: '测试数据', name: '测试数据 1', price: 888888 } 获取 body 上的数据
  ctx.response.body = [];
});

// 文件上传接口
router.post(
  '/api/upload',
  koaBody({
    // 自定义 koaBody 配置选项
    multipart: true, // 是否支持 multipart-formdate 的表单 默认是 false (其实就是是否支持文件上传)
    encoding: 'gzip',
    formidable: {
      uploadDir: path.join(__dirname, 'uploads/files'), // 设置文件默认上传目录 自定义目录和名称可以不写
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => {
        // 文件上传前的设置
        // name 是 input type='file' 的 name 属性值
        // file 为单个文件对象 多个文件上传 则 次文件会执行多次

        console.log('=============================');
        console.log(file);
        console.log('=============================');

        let date = new Date();
        let month = Number.parseInt(date.getMonth()) + 1;
        month = month.toString().length > 1 ? month : `0${month}`;
        let fileDir = `${date.getFullYear()}${month}${date.getDate()}`;

        let dir = path.join(__dirname, `uploads/files/${fileDir}`); // 设置文件上传路径 必须真实存在

        /**
         * 要生成文件在自定义的目录中 必须使用同步模式 要不然无法生成在自动目录 而是生成在默认目录下
         */
        try {
          fs.accessSync(dir);
          console.log('可读可写');
          upload();
        } catch (err) {
          console.error('不可访问');
          try {
            fs.mkdirSync(dir);
            upload();
          } catch (err) {
            console.log('err', err);
          }
        }

        function upload() {
          // 自定义生成文件
          let extname = path.extname(file.name);
          let fileName = uuidv1();
          let filePath = path.join(dir, file.name);
          file.path = filePath; // 指定文件生成路径 用于生成文件
        }
      },
    },
  }),
  async (ctx, next) => {
    console.log('上传成功');
    // console.log(ctx.request.files); // 获取上传后文件的信息
    // console.log(ctx.request.body); // 获取其他的表单字段
    ctx.response.body = JSON.stringify(ctx.request.files);
  }
);

// 添加路由中间件
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
console.log('app started at port 3000...');
```

- 详细参数解读

```ts
// 1.一般配置示例
const koaBody = require('koa-body');
const app = new koa();
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    encoding: 'gzip',
    formidable: {
      uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => {
        // 文件上传前的设置 可以用于自定义文件路径
        // console.log(`name: ${name}`);
        // console.log(file);
      },
    },
  })
);
```

- koa-body 的基本参数

```bash

# 参数名 描述 类型 默认值
# patchNode 将请求体打到原生 node.js 的 ctx.req 中 Boolean false
# patchKoa 将请求体打到 koa 的 ctx.request 中 Boolean true
# jsonLimit JSON 数据体的大小限制 String / Integer 1mb
# formLimit 限制表单请求体的大小 String / Integer 56kb
# textLimit 限制 text body 的大小 String / Integer 56kb
# encoding 表单的默认编码 String utf-8
# multipart 是否支持 multipart-formdate 的表单 Boolean false
# urlencoded 是否支持 urlencoded 的表单 Boolean true
# text 是否解析 text/plain 的表单 Boolean true
# json 是否解析 json 请求体 Boolean true
# jsonStrict 是否使用 json 严格模式，true 会只处理数组和对象 Boolean true
# formidable 配置更多的关于 multipart 的选项 Object {}
# onError 错误处理 Function function(){}
# stict 严格模式,启用后不会解析 GET, HEAD, DELETE 请求 Boolean true
```

- formidable 的相关配置参数

```bash
# 参数名 描述 类型 默认值
# maxFields 限制字段的数量 Integer 1000
# maxFieldsSize 限制字段的最大大小 Integer 2 _ 1024 _ 1024
# uploadDir 文件上传的文件夹 String os.tmpDir()
# keepExtensions 保留原来的文件后缀 Boolean false
# hash 如果要计算文件的 hash，则可以选择 md5/sha1 String false
# multipart 是否支持多文件上传 Boolean true
# onFileBegin 文件上传前的一些设置操作

```

- 获取文件信息

```ts
// 文件信息从 ctx.request.files 中获取
// 其他表单字段从 ctx.request.body 中获取
```

- 简单用示例

```ts
// 1.一般使用
app.use(koaBody()); // 全局用法 get 和 post 无需改变写法 解析请求体参数 要不然服务器无法识别

// 2.自定义某次请求特殊处理
// 文件上传接口
router.post(
  '/api/upload',
  koaBody({
    // 自定义 koaBody 配置选项
    multipart: true, // 是否支持 multipart-formdate 的表单 默认是 false (其实就是是否支持文件上传)
    encoding: 'gzip',
    formidable: {
      uploadDir: path.join(__dirname, 'uploads/files'), // 设置文件默认上传目录 自定义目录和名称可以不写
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => {
        // 文件上传前的设置
        // name 是 input type='file' 的 name 属性值
        // file 为单个文件对象 多个文件上传 则 次文件会执行多次

        console.log('=============================');
        console.log(file);
        console.log('=============================');

        let date = new Date();
        let month = Number.parseInt(date.getMonth()) + 1;
        month = month.toString().length > 1 ? month : `0${month}`;
        let fileDir = `${date.getFullYear()}${month}${date.getDate()}`;

        let dir = path.join(__dirname, `uploads/files/${fileDir}`); // 设置文件上传路径 必须真实存在

        /**
         * 要生成文件在自定义的目录中 必须使用同步模式 要不然无法生成在自动目录 而是生成在默认目录下
         */
        try {
          fs.accessSync(dir);
          console.log('可读可写');
          upload();
        } catch (err) {
          console.error('不可访问');
          try {
            fs.mkdirSync(dir);
            upload();
          } catch (err) {
            console.log('err', err);
          }
        }

        function upload() {
          // 自定义生成文件
          let extname = path.extname(file.name);
          let fileName = uuidv1();
          let filePath = path.join(dir, file.name);
          file.path = filePath; // 指定文件生成路径 用于生成文件
        }
      },
    },
  }),
  async (ctx, next) => {
    console.log('上传成功');
    // console.log(ctx.request.files); // 获取上传后文件的信息
    // console.log(ctx.request.body); // 获取其他的表单字段
    ctx.response.body = JSON.stringify(ctx.request.files);
  }
);
```

## 单词

```pug
formidable 可怕的
```
