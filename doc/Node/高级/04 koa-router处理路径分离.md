## koa-router

- 简单使用范例

```ts
const Koa = require('koa');
let Router = require('koa-router');
const koaBody = require('koa-body');
const fs = require('mz/fs');

const path = require('path');

const app = new Koa();
const router = new Router();

const uuidv1 = require('uuid/v1'); // 用于生成唯一值

const mime = require('mime'); // 识别文件mime类型
const Mime = require('mime/Mime');
const typeMap = {
  'text/abc': ['abc', 'alpha', 'bet'],
  'text/def': ['leppard'],
};

// 打印请求的url
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  const myMime = new Mime(typeMap);

  console.log(myMime.getType('abc')); // 'text/plain'
  console.log(myMime.getExtension('text/def')); // txt
  await next();
});

app.use(koaBody()); // 解析请求体参数 要不然服务器无法识别

// get请求
router.get('/api/hello', async (ctx, next) => {
  // console.log(ctx.request.query); // { name: 'koa', password: '12345' } 获取链接上的参数
  ctx.response.body = [];
});

// post请求
router.post('/api/pt', async (ctx, next) => {
  // console.log(ctx.request.query); // { name: 'koa', password: '12345' } 获取链接上的参数
  // console.log(ctx.request.body); // { id: 'test', manufacturer: '测试数据', name: '测试数据1', price: 888888 } 获取body上的数据
  ctx.response.body = [];
});

// 文件上传接口
router.post(
  '/api/upload',
  koaBody({
    // 自定义koaBody配置选项
    multipart: true, // 是否支持 multipart-formdate 的表单 默认是false (其实就是是否支持文件上传)
    encoding: 'gzip',
    formidable: {
      uploadDir: path.join(__dirname, 'uploads/files'), // 设置文件默认上传目录 自定义目录和名称可以不写
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => {
        // 文件上传前的设置
        // name 是 input type='file' 的name属性值
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

        /*       (async function () {

        if (await fs.access(dir)) {
          console.log("可读可写");
          upload();
        } else {
          await fs.mkdir(dir);
          upload();
        }

      })(); */

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
// 不设置router.allowedMethods()在表现上除了ctx.status不会自动设置,以及response header中不会加上Allow之外,不会造成其他影响.
// allowedMethods处理的业务是当所有路由中间件执行完成之后,若ctx.status为空或者404的时候,丰富response对象的header头
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
console.log('app started at port 3000...');
```
