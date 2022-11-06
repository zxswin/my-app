## 关于 HTTP 模块概述

```ts
/**
 * 要使用 HTTP 服务器与客户端，可以 require('http')。
 * Node.js 的 HTTP 接口支持协议的多种特性。 接口不缓冲完整的请求或响应，应以流的形式处理数据
 */
```

- 1.request.end([data[, encoding]][, callback])

```ts
/**
 * 结束发送请求
 * 如果部分请求主体还未被发送，则会刷新它们到流中。
 * 如果请求是分块的，则会发送终止字符 '0\r\n\r\n'。
 * 如果指定了 data，则相当于调用 request.write(data, encoding)
 * 之后再调用 request.end(callback)。
 * 如果指定了 callback，则当请求流结束时会被调用
 */
```

- request.write(chunk[, encoding][, callback])

```ts
/**
 * 发送请求主体的一个数据块。
 * 通过多次调用该方法，完整的请求主体可被发送到服务器。
 * 当调用 write 函数传入空字符串或空 buffer 时，不会进行任何操作
 */
```

- 一个简单的请求示例

```ts
var http = require('http');
var { URL } = require('url');
const options = new URL('http://www.gps688.com/#B_vid=5594939777768808464');
const req = http.request(options, (res) => {
  const { statusCode } = res;

  let error;
  if (statusCode !== 200) {
    error = new Error('请求失败\n' + `状态码: ${statusCode}`);
  }

  if (error) {
    console.error(error.message);
    res.resume(); // 消费响应的数据以释放内存。
    return;
  }

  res.setEncoding('utf8'); // 设置获取响应体的编码是 utf-8
  let rawData = '';
  res.on('data', (chunk) => {
    rawData += chunk;
  }); // 获取二进制流数据片段

  res.on('end', () => {
    console.log(rawData);
  });
});

req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

// 将数据写入到请求主体。
req.end(); // 请求结束
```

## Node.js GET/POST 请求 原生代码 简单案例(服务器接收)

- 获取 GET 请求内容

```ts
var http = require('http');
var url = require('url');
var util = require('util'); // nodejs 的工具模块

http
  .createServer(function (req, res) {
    // 创建一个服务器
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); // 写入响应头信息
    res.end(util.inspect(url.parse(req.url, true))); // 输出响应信息
  })
  .listen(3000); // 服务器监听 3000 端口

// 浏览器输出：
// Url {
//   protocol: null,
//   slashes: null,
//   auth: null,
//   host: null,
//   port: null,
//   hostname: null,
//   hash: null,
//   search: '',
//   query: {},
//   pathname: '/',
//   path: '/',
//   href: '/'
// }
```

- 获取 URL 的参数

```ts
var http = require('http');
var url = require('url');
var util = require('util');

http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf8' });

    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write('网站名：' + params.name); // 写入响应内容
    res.write('\n');
    res.write('网站 URL：' + params.url);
    res.end(); // 结束发送请求
  })
  .listen(3000);
```

- 获取 POST 请求内容

```ts
/**
 * node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。
 */
// 基本语法结构说明
var http = require('http');
var querystring = require('querystring');

http
  .createServer(function (req, res) {
    // 定义了一个 post 变量，用于暂存请求体的信息
    var post = '';

    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function (chunk) {
      post += chunk;
    });

    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function () {
      post = querystring.parse(post);
      res.end(util.inspect(post));
    });
  })
  .listen(3000);
```

- 通过 POST 提交并输出数据

```ts
var http = require('http');
var querystring = require('querystring');

var postHTML =
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';

http
  .createServer(function (req, res) {
    var body = '';
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      // 解析参数
      body = querystring.parse(body);
      // 设置响应头部信息及编码
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });

      if (body.name && body.url) {
        // 输出提交的数据
        res.write('网站名：' + body.name);
        res.write('<br>');
        res.write('网站 URL：' + body.url);
      } else {
        // 输出表单
        res.write(postHTML);
      }
      res.end();
    });
  })
  .listen(3000);
```

## 发送 HTTP 请求

- http.request(options[, callback])#

```ts
/**
 * http.request(url[, options][, callback])
 * 使用 http.request() 必须调用 req.end() 表明请求的结束，即使没有写入数据到请求主体。
 */

// 一个简单的 nodeJS 发送请求的例子
var http = require('http');
var querystring = require('querystring');

const postData = querystring.stringify({
  msg: 'Node.js 中文网',
});

const options = {
  hostname: 'nodejs.cn',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData),
  },
};

const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8'); // 设置获取响应体的编码是 utf-8
  res.on('data', (chunk) => {
    console.log(`响应主体: ${chunk}`);
  });
  res.on('end', () => {
    console.log('响应中已无数据');
  });
});

req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

// 将数据写入到请求主体。
req.write(postData);
req.end(); // 请求结束
```

- 使用 URL 作为 options：

```ts
var http = require('http');
var { URL } = require('url');
const options = new URL('http://www.baidu.com');
const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8'); // 设置获取响应体的编码是 utf-8
  res.on('data', (chunk) => {
    console.log(`响应主体: ${chunk}`);
  });
  res.on('end', () => {
    console.log('响应中已无数据');
  });
});

req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

// 将数据写入到请求主体。
req.end(); // 请求结束
```

- http.get(options[, callback])

```ts
/**
 * 因为大多数请求都是 GET 请求且不带请求主体，所以 Node.js 提供了便捷的方法。
 * 与 http.request() 的区别是，请求的方法是 GET 且自动调用 req.end()。
 * callback 只有一个参数 res，res 是一个 http.IncomingMessage 实例。
 */

// http.get() 方式获取 JSON

var http = require('https'); // 如果是 http 则引入 http 模块 如果是 https 则引入 https 模块

http
  .get('https://www.apiopen.top/novelApi', (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('请求失败\n' + `状态码: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(
        '非法的 content-type.\n' +
          `期望的是 application/json 但接收到的是 ${contentType}`
      );
    }
    if (error) {
      console.error(error.message);
      // 消费响应的数据以释放内存。
      res.resume();
      return;
    }

    res.setEncoding('utf8'); // 获取的响应内容为 utf8 模式
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    }); // 获取二进制流数据片段
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  })
  .on('error', (e) => {
    console.error(`报错: ${e.message}`);
  });
```

## 注意：

```ts
/**
 * 1.util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法
 * 2.url.parse(req.url,true) 第二个参数为 true 返回 url 对象 默认为 false 返回 url 字符串
 */
```

## 单词：

```pug
alive 活着的
agent 代理人
incoming 进来的
abort 中止
okay 可以
expect 期待
flush 冲刷 除掉 脸红
rain 雨
drain 排水
packet 包装
duplex 双工
trailer 拖车
since 自从
minor 较小的 未成年人
inspect 检查

```
