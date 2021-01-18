## Crawler 文档

- 快速上手

```ts
// 1.安装
// npm install crawler

// 2.最简单的使用实例
let Crawler = require('crawler');
let c = new Crawler({
  maxConnections: 10,
  // 这个将会被每个爬行页调用
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      let $ = res.$;
      // $选择器 默认使用 Cheerio 模式选择器 和jquer一样
      console.log($('title').text()); // 会爬取所有页面的h2内容
    }
    done();
  },
});

// 队列中只有一个 URL 使用默认回调
c.queue('http://www.w3school.com.cn/');

// 队列中使用一个 url 数组列表
c.queue([
  'https://juejin.im/',
  'https://juejin.im/post/5c0a146d5188256f26413f51',
]);

// 队列中使用自定义的回调和参数
c.queue([
  {
    uri: 'https://juejin.im/books',
    jQuery: false,

    // 默认回调将不会被启用
    callback: function (error, res, done) {
      if (error) {
        console.log(error);
      } else {
        console.log('抓取到', res.body.length, 'bytes');
      }
      done();
    },
  },
]);

// 在不抓取（主要用于测试）的情况下直接排入一些 HTML 代码
c.queue([
  {
    html: '<p>This is a <strong>test</strong></p>',
  },
]);
```

- 设置访问速度 访问下一条连接的时间间隔

```ts
let Crawler = require('crawler');
let c = new Crawler({
  rateLimit: 1000, // 最大连接数会被设置为 1
  callback: function (err, res, done) {
    console.log(res.$('title').text());
    done();
  },
});
// 在两个任务之间，最小时间间隔为 1000（ms）。
c.queue([
  'http://www.w3school.com.cn/',
  'https://juejin.im/',
  'https://juejin.im/post/5c0a146d5188256f26413f51',
]);
```

- 自定义参数

```ts
// 自定义请求参数不用担心设置的参数出现冗余
c.queue({
  uri: 'http://www.google.com',
  parameter1: 'value1',
  parameter2: 'value2',
  parameter3: 'value3',
});

// 然后通过 res.options 访问到自定义设置的参数
console.log(res.options.parameter1);
// res.options 打印出的参数如下：
// { uri: 'http://www.w3school.com.cn/',
// parameter1: 'value1',
// parameter2: 'value2',
// parameter3: 'value3',
// autoWindowClose: true,
// forceUTF8: true,
// gzip: true,
// incomingEncoding: null,
// jQuery: true,
// method: 'GET',
// priority: 5,
// referer: false,
// retries: 3,
// retryTimeout: 10000,
// timeout: 15000,
// callback: [Function: callback],
// headers: {},
// release: [Function] }

// 代码示例：
let Crawler = require('crawler');
let c = new Crawler({
  rateLimit: 1000, // 最大连接数会被设置为 1
  callback: function (err, res, done) {
    console.log(res.options);
    console.log(res.$('title').text());
    done();
  },
});

c.queue({
  uri: 'http://www.w3school.com.cn/',
  parameter1: 'value1',
  parameter2: 'value2',
  parameter3: 'value3',
});
```

- 下载像图像、pdf、word 等文件，则必须保存原始响应体 可将编码设置为 null

```ts
let Crawler = require('crawler');
let fs = require('mz/fs');

let c = new Crawler({
  encoding: null,
  jQuery: false, // 设置 false 以禁止警告消息。
  callback: function (err, res, done) {
    if (err) {
      console.error(err.stack);
    } else {
      fs.createWriteStream(res.options.filename).write(res.body);
    }
    done();
  },
});

c.queue({
  uri: 'http://www.w3school.com.cn/ui2017/bg.png',
  filename: 'nodejs-1920x1200bg.png',
});
```

- 可以选择回调执行的时机

```ts
let Crawler = require('crawler');
let c = new Crawler({
  preRequest: function (options, done) {
    //options 是请求的参数
    console.log(options);
    // 启动请求 执行回调 可以设置执行的时机
    done();
  },
  callback: function (err, res, done) {
    if (err) {
      console.log(err);
    } else {
      console.log(res.statusCode);
    }
  },
});

c.queue({
  uri: 'http://www.w3school.com.cn/',
  // 这里将会覆盖 之前定义的 preRequest 选项
  preRequest: function (options, done) {
    setTimeout(function () {
      console.log(options);
      done(); // 回调在 1s 后再执行
    }, 1000);
  },
});
```

- 跳过 Crawler 的请求事件 直接请求

```ts
let Crawler = require('crawler');
let crawler = new Crawler();
crawler.direct({
  uri: 'http://www.w3school.com.cn/',
  skipEventRequest: false, // 默认是 true 为 false 不会触发请求事件
  callback: function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(response.statusCode);
    }
  },
});
```

- 设置访问速率间隙 和 访问链接数

```ts
let Crawler = require('crawler');

let c = new Crawler({
  rateLimit: 2000, // 速率限制
  maxConnections: 1, // 最大链接数
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      let $ = res.$;
      console.log($('title').text());
    }
    done();
  },
});

// 站点爬取将会按照 2000ms 的间隙去请求
c.queue('http://www.somewebsite.com/page/1');
c.queue('http://www.somewebsite.com/page/2');
c.queue('http://www.somewebsite.com/page/3');

// 每个站点的爬取将会按照不同代理的限制去执行请求
c.queue({
  uri: 'http://www.somewebsite.com/page/1',
  limiter: 'proxy_1',
  proxy: 'proxy_1',
});
c.queue({
  uri: 'http://www.somewebsite.com/page/2',
  limiter: 'proxy_2',
  proxy: 'proxy_2',
});
c.queue({
  uri: 'http://www.somewebsite.com/page/3',
  limiter: 'proxy_3',
  proxy: 'proxy_3',
});
c.queue({
  uri: 'http://www.somewebsite.com/page/4',
  limiter: 'proxy_1',
  proxy: 'proxy_1',
});
```

- 设置链接速率间隔属性 推荐默认

```ts
var c = new Crawler({});
c.setLimiterProperty('limiterName', 'propertyName', value);
```

- Event: ‘schedule’ 调度事件

```ts
// 当任务添加了调度事件的时候触发
crawler.on('schedule', function (options) {
  options.proxy = 'http://proxy:port';
});
```

- Event: ‘limiterChange’

```ts
// 当限制选项值发生改变的时候触发
```

- Event: ‘request’

```ts
// 当准备发送请求的的时候触发
// 发送请求前修改参数示例
crawler.on('request', function (options) {
  options.qs.timestamp = new Date().getTime();
});
```

- 当请求是空的时候触发

```ts
crawler.on('drain', function () {
  // 释放数据库连接
  db.end(); // 关闭 mysql 数据库
});
```

- crawler.queue(uri|options)

```ts
// 输入一个任务并等待执行
```

- crawler.queueSize | Number

```ts
// 指定请求的数量
```

- 请求成功回调 Callbacks 返回的数据

```ts
callback(error, res, done);
```

- error 错误信息

```ts
// -res 包括了 标准 IncomingMessage 和 $ 以及其他选项
// -options如下:
// res.statusCode HTTP状态码
// res.body: Buffer  获取是html返回的页面结构
// res.headers HTTP返回头信息
// res.request HTTP请求头信息
// res.request.uri 请求的url对象
// res.request.method 请求的方式
// res.request.headers 请求头信息
// res.options 实例设置的选项
// $ 返回的 HTML 或 XML 的类 jquery 选择器

// done 请求执行完毕后执行回调函数
```

- Schedule options 实例化程序选项 调度程序选项

```ts
// options.maxConnections 最大链接池 默认是 10
// options.rateLimit 每个请求的访问间隔 默认是 0
// options.priorityRange 可接受的优先级 从 0 开始 默认是 10
// options.priority 优先级 默认是 5 数字越低 优先级就越高
```

- Retry options 重试选项

```ts
// options.retries 当请求失败后的重试数
// options.retryTimeout 每次重试的时间间隔 默认是 10000ms
```

- Server-side DOM options 是否使用 jquery 选择器选择 DOM

```ts
// options.jQuery: Boolean 默认为 true
```

- Charset encoding 编码 默认是 utf-8 编码

- Cache 缓存

```ts
// skipDuplicates 如果是 true 跳过已经执行的 url 不推荐这么做 最好使用外部的爬行器
```

- Http headers

```ts
// options.rotateUA: Boolean 默认是 false 如果是 true UsAgent 是一个数组
// options.userAgent: String 如果 rotateUA 设置为 false userAgent 是一个数组 将默认使用第一个值
// options.referer: String
// options.headers: Object 包含了 headers 各个参数对象
```

- 使用 Cheerio 作为 DOM 选择器

```ts
jQuery: true //(default)
//OR
jQuery: 'cheerio'
//OR
jQuery: {
  name: 'cheerio',
  options: {
    normalizeWhitespace: true,
    xmlMode: true
  }
}
```

- 使用 JSDOM 作为 DOM 选择器

```ts
var jsdom = require('jsdom');
var Crawler = require('crawler');

var c = new Crawler({
  jQuery: jsdom,
});
```

## 高级功能

```ts
/**
 * 1.自定义参数
 * 2.使用 http 代理
 * 3.处理原始返回数据
 * 4.分布式爬虫
 * 5.链式模型
 * 6.使用 POST,GET,PUT 等请求方法
 * 7.使用 Cookie
 */
```

- 参数详细介绍

```ts
/**
 * 1.回调设置
 * 2.调度参数
 * 3.重试控制
 * 4.DOM 选项
 * 5.编码设置
 * 6.缓存设置
 * 7.其它
 */
```

- Crawler 类捕获事件

```ts
// 1.Event: 'schedule'
// 2.Event: 'limiterChange'
// 3.Event: 'request'
// 4.Event: 'drain'
```

- 爬取网站新闻中心下面的全部文章

```ts
let Crawler = require('crawler');
let fs = require('mz/fs');

let originBase = 'http://www.liangguoguoji.com';
let originUrl = 'http://www.liangguoguoji.com/a/news/list_5_'; // 爬取的入口链接
let pages = 1;

let crawlerUrl = [];

let c = new Crawler({
  maxConnections: 1, // 最大链接数
  callback: function (err, res, done) {
    if (err) {
      console.log('报错了:', err);
    } else {
      let aDoms = res.$('.news-list .news-list01');
      if (!aDoms.length) {
        // 当列表也不存在的时候终止程序 或进行其他操作
        return;
      }

      console.log('aDoms.length', aDoms.length);
      aDoms.each(function (i, e) {
        let href = aDoms.eq(i).find('a').eq(0).attr('href');
        if (typeof href !== 'undefined') {
          crawlerUrl.push(href);
        }
      });
      crawlerUrlExe(); // 爬取url队列执行
    }
    done();
  },
});

c.queue(originUrl + pages + '.html');

function crawlerUrlExe() {
  // 爬取 url 队列
  crawlerUrl.forEach((v) => {
    c.queue([
      {
        uri: originBase + v,
        // 默认回调将不会被启用
        callback: function (error, res, done) {
          if (error) {
            console.log(error);
          } else {
            console.log(res.$('.content-text h2').text());
          }
          done();
        },
      },
    ]);
  });
  crawlerUrl = [];
  pages++;
  c.queue(originUrl + pages + '.html'); // 爬取下一个列表页
}
```

## 资源：

```ts
// 1.中文文档地址:
// https://node-crawler.readthedocs.io/zh_CN/latest/

// 2.官方文档地址：
// http://nodecrawler.org/
```

## 单词：

```pug
grab 抢先 抓住
mostly 主要
slow down 减速
rateLimit 速率限制
task 任务
gap 间隔
picks 采集 摘
redundance 冗余
instead 代替
override 覆盖
advanced 先进的
skip 跳过
bottleneck 瓶颈
abide 容忍
restrictions 约束
independent 独立的
worth 值得的 财富
noticing 介绍 关照
cluster 串
recommend 推荐
unless 除非
clearly 清楚的
scheduler 调度程序
stage 阶段 请求
drain 排水
release 释放
enqueue 排队
superset 超集
priority 优先
retry 重试
duplicate 复制品
truthy 诚实的
robust 精力充沛的
therefore 因此
folder 文件夹 折叠机
mock 模拟的
rely 依靠 依赖
alternative 替代方案
docker 码头工人
sizzle 表现良好的
refactoring 重构
```
