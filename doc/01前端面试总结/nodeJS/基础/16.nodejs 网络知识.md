## nodejs 网络知识

- 数据传输协议

```ts
/**
 * TCP 可靠 传输效率低
 * 文件传输 接受邮件 远程登录
 *
 * UDP 不可靠 传输效率高
 * 在线视频 网络语言电话
 */
```

- dgram 数据报

```ts
/**
 * dgram 模块提供了 UDP 数据包 socket 的实现
 * const dgram = require('dgram');
 */
// 简单的 UDP 运用例子
// server.js 服务器端程序用于接收请求
// 监听当前服务器上指定的 ip 与端口 如果有数据发送到 ip 和端口上 就进行处理
const dgram = require('dgram');

// 创建一个 scoket 类 scoket 就是用来处理网络数据的一个标准 API 对象
// 通过 scoket 我们就可以对网络数据镜像读取和输出
// dgram.Scoket 类

const socket = new dgram.Scoket();
const serverSocket = dgram.createSocket('udp4'); // udp4 => ipv4

serverSocket.on('listening', () => {
  console.log('服务器开启成功,等待数据：');
});

serverSocket.on('message', (data) => {
  console.log('接收到的数据', data.toString());
});

// 监听指定的地址及端口
serverSocket.bind(12345, '127.0.0.1');

// client.js 客户端程序 发送请求
const dgram = require('dgram');
const clientSocket = dgram.createSocket('udp4');
// 发送数据
// UDP 无连接协议 不需要连接到服务器 然后再发数据
clientSocket.send('hello', 12345, '127.0.0.1');
```

- Net 模块(TCP)

```ts
/**
 * net 模块提供了创建基于流的 TCP 或 IPC 服务器 net.createServer()
 * 和客户端 net.createConnection()的异步网络 API
 * 使用 require('net');
 *
 * 服务端 提供服务 被链接 被请求的一方
 * 客户端 获取服务 发起请求 请求的一方
 */

// net 连接简单的例子
// server.js

// 创建一个服务器端
// 监听地址以及端口
// 处理发送到当前监听地址以及端口的数据
// 返回 发送数据到连接的客户端
// net.Server 类
// new net.Server()
// net.createServer() => return new net.Server()
const net = require('net');
const server = net.createServer(() => {
  // 这个函数其实就是 connection 事件绑定的函数 和下面的作用一样
});

// 当有客户端连接的时候触发
server.on('connection', (socket) => {
  // socket => 当前链接的 socket 对象
  console.log('有人连接了');

  socket.write('Hello');

  socket.on('data', (data) => {
    socket.write('show me the money');
  });
});

// 监听地址及端口
server.listen(12345, '127.0.0.1');

// client.js
const net = require('net');
// 要连接的目标主机的地址以及端口号
const clientSocket = net.createConnection(12345, '127.0.0.1');

// 监听数据传输
clientSocket.on('data', (data) => {
  console.log('服务器返回：', data.toString());
  clientSocket.write('get money');
});
```

- HTTP

```ts
/**
 * Request 消息分为三部分
 * Request Line 请求行
 * Request header 请求头
 * Request body 请求正文
 */

// client.js 一个简单的请求类的例子
const http = require('http');
const fs = require('fs');
// 创建一个客户端（能发 http 请求）的对象
// 请求行: get http://127.0.0.1:80/ http/1.1
const client = http.request(
  {
    // tcp
    host: 'www.baidu.com',
    port: 80,

    // http
    protocol: 'http:',
    method: 'get',

    path: '/img/bd_logo1.png',
  },
  (res) => {
    // 这个函数会在服务器响应的时候出发

    // let content = '';

    let content = Buffer.alloc(0);

    // res => socket
    res.on('data', (data) => {
      // console.log(data.toString());
      // content += data.toString();

      content = Buffer.concat([content, data], content.length + data.length);
    });

    res.on('end', () => {
      fs.writeFileSync('./baidu.png', content);
    });
  }
);

// 请求的发送需要调用下面的方法
client.write('');
client.end();

/**
 * Response 消息分为三部分
 * Response Line 响应行
 * Response header 响应头
 * Response body 响应正文
 *
 * 消息头
 * Content-Type 发送内容类型
 * Content-Lenght 发送内容长度
 * Location 重定向地址
 * Cookie 包含要发送给服务器的 Cookie
 * Set-Cookie 服务器端向客户端发送的 cookie
 */

// client.js
const http = require('http');
const fs = require('fs');

const client = http.request(
  {
    host: '127.0.0.1',
    port: 80,

    protocol: 'http:',
    method: 'get',

    path: '/view',
  },
  (res) => {
    res.on('data', (data) => {
      console.log(data.toString());
    });
  }
);

client.write('');
client.end();

// server.js
const http = require('http');
const server = http.createServer();

// request : 客户端请求对象，保存了与当前这次请求的客户端相关的信息
// http.IncomingMessage 类
// response: 服务器输出对象，提供了服务端输出（响应）有关的一些方法
server.on('request', (request, response) => {
  console.log('接收到了请求');

  // 向客户端返回数据
  // request本质是net.socket+http协议增加的一些内容
  // request.socket => net.socket
  // console.log(request.socket.remoteAddress);

  // console.log(request.url);

  // 我们可以根据 url 来判断当前用户想要什么

  //response.setHeader('Content-Type', 'text/html;charset=utf8'); //MIME : https://baike.baidu.com/item/MIME/2900607?fr=aladdin

  switch (request.url) {
    case '/':
      response.writeHead(200, 'ok', {
        'Content-Type': 'text/html;charset=utf8',
      });
      response.write('<h1>Index</h1>');
      break;
    case '/list':
      response.writeHead(200, 'ok', {
        'Content-Type': 'text/html;charset=utf8',
      });
      response.write('<h1>List</h1>');
      break;
    case '/view':
      response.writeHead(200, 'ok', {
        'Content-Type': 'text/html;charset=utf8',
      });
      response.write('<h1>View</h1>');
      break;
    default:
      // response.writeHead(404, http.STATUS_CODES[404], {
      //     'Content-Type': 'text/html;charset=utf8'
      // });
      // response.writeHead(404, 'ye mian mei le', {
      //     'Content-Type': 'text/html;charset=utf8'
      // });
      // response.write('<h1>页面不存在</h1>');

      response.writeHead(301, http.STATUS_CODES[301], {
        'Content-Type': 'text/html;charset=utf8',
        // 重定向地址
        // 'Location': 'http://www.miaov.com'
        Location: '/',
      });
      response.write('<h1>页面不存在</h1>');

      break;
  }

  response.end();
});

server.listen(80, '0.0.0.0');
```

- 代理的实现原理

```ts
/**
 * 客户端由于同源策略有跨域的限制 但是服务器端没有 可以先通过服务器获取请求到的响应 然后前端调用后端封装好的接口 实现代理
 */
```

- 单词

```pug
remote 远程的 遥控器
```
