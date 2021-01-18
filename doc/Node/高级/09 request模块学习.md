## request 模块最佳实践

- 发送 GET 请求

```ts
// 1.便捷写法
var fs = require('mz/fs');
var request = require('request');

var url = 'https://www.baidu.com';

// 发送 Get 请求
// 第一个参数:请求的完整 URL,包括参数
// 第二个参数:请求结果回调函数,会传入 3 个参数,第一个错误,第二个响应对象,第三个请求数据
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});

// 2.常规写法
request(
  {
    url: url,
    method: 'GET', //默认为 get
    qsStringifyOptions: {}, // 用于 URL 后面添加参数 待验证
    useQuerystring: true, // 用于 URL 后面添加参数 待验证
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }
);
```

- 发送 POST 请求

```ts
/**
 * post 请求有 3 种方式，由请求头中的 content-type 决定，属于哪一种 post 请求
 * 1.application/x-www-form-urlencoded： 普通 http 请求方式，参数是普通的 url 参数拼接
 * 2.application/json： JSON 请求方式，参数是 json 格式
 * 3.multipart/form-data: 文件上传
 */
// 第一种写法
// 1.application/x-www-form-urlencoded： 普通 http 请求方式，参数是普通的 url 参数拼接
var request = require('request');
var url = 'https://www.baidu.com';

request.post({ url: url, form: { key: 'value' } }, function (
  error,
  response,
  body
) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});

// 其他写法
request.post('http://service.com/upload', { form: { key: 'value' } });
// 或者;
request.post('http://service.com/upload').form({ key: 'value' });

// 2.application/json： JSON 请求方式，参数是 json 格式
var request = require('request');
var url = 'http://192.168.0.102:3000/home';

request(
  {
    url: url,
    method: 'POST',
    json: true,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(requestData),
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }
);

// 3.multipart/form-data: 文件上传
// 第一种写法
var request = require('request');
var url = 'http://192.168.0.102:3000/home';
var formData = {
  my_field: 'my_value', // 字符串
  my_buffer: new Buffer([1, 2, 3]), // Buffer
  my_file: fs.createReadStream(__dirname + '/unicycle.jpg'), // 二进制流
};
request.post({ url: url, formData: formData }, function (
  error,
  response,
  body
) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});

// 第二种写法
var r = request.post('http://veblen.com/upload')
var form = r.form()
form.append('my_field', 'my_value')
form.append('my_buffer', new Buffer([1, 2, 3]))
form.append('my_file', fs.createReadStream(path.join(__dirname, 'doodle.png'))
form.append('remote_file', request('https://www.baidu.com/img/bd_logo1.png'))
```

## 结合文件流

- 抓取百度 logo 并保存到本地

```ts
request('https://www.baidu.com/img/bd_logo1.png').pipe(
  fs.createWriteStream('a.png')
);
```

- 也可以将文件传给 PUT 或 POST 请求，用于文件上传。

```ts
/**
 * 未提供 header 的情况下，会检测文件后缀名，在 PUT 请求中设置相应的 content-type。
 */
//读取流 pipe 上传
fs.createReadStream('pic.jpg').pipe(request.put('http://veb.com/upload'));
```

- 重定向

```ts
// 1.nodejs 重定向
res.writeHead(302, {
  Location: 'https://www.baidu.com',
  //add other headers here...
});
res.end();
```

## 文档部分

- 简单例子示范

```ts
// 1.request 模块简单示范
var request = require('request');
request('https://www.baidu.com', function (error, response, body) {
  console.log('error:', error); // 发生错误时候打印出错误信息
  console.log('statusCode:', response && response.statusCode); //如果接收到响应 则 打印出状态码
  console.log('body:', body); // 打印出响应体
});
```

- 使用流复制文件

```ts
var fs = require('mz/fs');
var request = require('request');
request('https://www.baidu.com').pipe(fs.createWriteStream('baidu.html')); // 如果文件不存在则创建文件
```

- 使用 PUT 的方式更新

```ts
var fs = require('mz/fs');
var request = require('request');
fs.createReadStream('file.json').pipe(
  request.put('http://mysite.com/obj.json')
);
```

- PUT 会保存请求类型

```ts
request
  .get('http://google.com/img.png')
  .pipe(request.put('http://mysite.com/img.png'));
```

- response 响应体是 http.IncomingMessage 的实例

```ts
request
  .get('http://google.com/img.png')
  .on('response', function (response) {
    console.log(response.statusCode); // 200
    console.log(response.headers['content-type']); // 'image/png'
  })
  .pipe(request.put('http://mysite.com/img.png'));
```

- 使用管道之前的错误信息处理

```ts
request
  .get('http://mysite.com/doodle.png')
  .on('error', function (err) {
    console.log(err);
  })
  .pipe(fs.createWriteStream('doodle.png'));
```

- 结合服务器输出响应内容

```ts
http.createServer(function (req, resp) {
  if (req.url === '/doodle.png') {
    if (req.method === 'PUT') {
      req.pipe(request.put('http://mysite.com/doodle.png'));
    } else if (req.method === 'GET' || req.method === 'HEAD') {
      request.get('http://mysite.com/doodle.png').pipe(resp);
    }
  }
});
```

- 可以把请求示例导入到管道

```ts
http.createServer(function (req, resp) {
  if (req.url === '/doodle.png') {
    var x = request('http://mysite.com/doodle.png');
    req.pipe(x);
    x.pipe(resp);
  }
});
```

- 可以写成链式管道

```ts
req.pipe(request('http://mysite.com/doodle.png')).pipe(resp);
```

- 新的请求与请求之前的特性并没有冲突

```ts
var r = request.defaults({ proxy: 'http://localproxy.com' });
http.createServer(function (req, resp) {
  if (req.url === '/doodle.png') {
    r.get('http://google.com/doodle.png').pipe(resp);
  }
});
```

## 支持 Forms 表单提交

- application/x-www-form-urlencoded (URL-Encoded Forms)

```ts
request.post('http://service.com/upload', { form: { key: 'value' } });
// 或者
request.post('http://service.com/upload').form({ key: 'value' });
// 或者
request.post(
  { url: 'http://service.com/upload', form: { key: 'value' } },
  function (err, httpResponse, body) {}
);
```

- multipart/form-data (Multipart Form Uploads)

```ts
var fs = require('mz/fs');
var request = require('request');

var formData = {
  my_field: 'my_value', // 字符串
  my_buffer: Buffer.from([1, 2, 3]), // Buffer
  my_file: fs.createReadStream(__dirname + '/unicycle.jpg'), // 图像二进制流
  // 数组
  attachments: [
    fs.createReadStream(__dirname + '/attachment1.jpg'),
    fs.createReadStream(__dirname + '/attachment2.jpg'),
  ],

  custom_file: {
    value: fs.createReadStream('/dev/urandom'),
    options: {
      filename: 'topsecret.jpg',
      contentType: 'image/jpeg',
    },
  },
};
request.post(
  { url: 'http://service.com/upload', formData: formData },
  function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    console.log('Upload successful! Server responded with:', body);
  }
);
```

- 通过 form()获取请求数据对象;

```ts
var fs = require('mz/fs');
var request = require('request');

var r = request.post('http://service.com/upload', function optionalCallback(err, httpResponse, body) {})
var form = r.form();
form.append('my_field', 'my_value');
form.append('my_buffer', Buffer.from([1, 2, 3]));
form.append('custom_file', fs.createReadStream(\_\_dirname + '/unicycle.jpg'), {filename: 'unicycle.jpg'});
```

- multipart/related

```ts
request(
  {
    method: 'PUT',
    preambleCRLF: true,
    postambleCRLF: true,
    uri: 'http://service.com/upload',
    multipart: [
      {
        'content-type': 'application/json',
        body: JSON.stringify({
          foo: 'bar',
          _attachments: {
            'message.txt': {
              follows: true,
              length: 18,
              content_type: 'text/plain',
            },
          },
        }),
      },
      { body: 'I am an attachment' },
      { body: fs.createReadStream('image.png') },
    ],
    // alternatively pass an object containing additional options
    multipart: {
      chunked: false,
      data: [
        {
          'content-type': 'application/json',
          body: JSON.stringify({
            foo: 'bar',
            _attachments: {
              'message.txt': {
                follows: true,
                length: 18,
                content_type: 'text/plain',
              },
            },
          }),
        },
        { body: 'I am an attachment' },
      ],
    },
  },
  function (error, response, body) {
    if (error) {
      return console.error('upload failed:', error);
    }
    console.log('Upload successful! Server responded with:', body);
  }
);
```

- HTTP Authentication 认证

```ts
// 1.简单例子示范
var fs = require('mz/fs');
var request = require('request');

request.get('http://some.server.com/').auth('username', 'password', false);
// or
request.get('http://some.server.com/', {
  auth: {
    user: 'username',
    pass: 'password',
    sendImmediately: false,
  },
});
// or
request.get('http://some.server.com/').auth(null, null, true, 'bearerToken');
// or
request.get('http://some.server.com/', {
  auth: {
    bearer: 'bearerToken',
  },
});
```

- 使用 URL 本身指定基本身份验证

```ts
var fs = require('mz/fs');
var request = require('request');

var username = 'username',
  password = 'password',
  url = 'http://' + username + ':' + password + '@some.server.com';

request({ url: url }, function (error, response, body) {
  // 这里可以对响应体做出一些操作
});
```

## 自定义 HTTP 头部

```ts
// 1.自定义的用户代理头简单例子
var request = require('request');
var options = {
  url: 'https://api.github.com/repos/request/request',
  headers: {
    'User-Agent': 'request',
  },
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info.stargazers_count + ' Stars');
    console.log(info.forks_count + ' Forks');
  }
}

request(options, callback);
```

- 支持 HMAC-SHA1 默认算法

```ts
var fs = require('mz/fs');

var request = require('request');
var qs = require('querystring'),
  oauth = {
    callback: 'http://mysite.com/callback/',
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
  },
  url = 'https://api.twitter.com/oauth/request_token';
request.post({ url: url, oauth: oauth }, function (e, r, body) {
  var req_data = qs.parse(body);
  var uri =
    'https://api.twitter.com/oauth/authenticate' +
    '?' +
    qs.stringify({ oauth_token: req_data.oauth_token });

  var auth_data = qs.parse(body),
    oauth = {
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
      token: auth_data.oauth_token,
      token_secret: req_data.oauth_token_secret,
      verifier: auth_data.oauth_verifier,
    },
    url = 'https://api.twitter.com/oauth/access_token';
  request.post({ url: url, oauth: oauth }, function (e, r, body) {
    var perm_data = qs.parse(body),
      oauth = {
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
        token: perm_data.oauth_token,
        token_secret: perm_data.oauth_token_secret,
      },
      url = 'https://api.twitter.com/1.1/users/show.json',
      qs = { screen_name: perm_data.screen_name, user_id: perm_data.user_id };
    request.get({ url: url, oauth: oauth, qs: qs, json: true }, function (
      e,
      r,
      user
    ) {
      console.log(user);
    });
  });
});
```

## Support for HAR 1.2

- 简单范例

```ts
var request = require('request');
request({
  // will be ignored
  method: 'GET',
  uri: 'http://www.google.com',

  // HTTP Archive Request Object
  har: {
    url: 'http://www.mockbin.com/har',
    method: 'POST',
    headers: [
      {
        name: 'content-type',
        value: 'application/x-www-form-urlencoded',
      },
    ],
    postData: {
      mimeType: 'application/x-www-form-urlencoded',
      params: [
        {
          name: 'foo',
          value: 'bar',
        },
        {
          name: 'hello',
          value: 'world',
        },
      ],
    },
  },
});
```

## request(options, callback) 通用请求模式

```ts
// 1.选项如下：
// uri || url
// baseUrl
// method
// headers
// qs
// qsParseOptions
// qsStringifyOptions
// arrayFormat
// useQuerystring
// body
// ReadStream
// form
// formData
// multipart
// preambleCRLF
// postambleCRLF
// json
// jsonReviver
// jsonReplacer
// auth
// sendImmediately
// oauth
// hawk
// aws
// httpSignature
// followRedirect
// followAllRedirects
// followOriginalHttpMethod
// maxRedirects
// removeRefererHeader
// encoding
// gzip
// jar
// agent
// agentClass
// agentOptions
// forever
// timeout
// localAddress
// proxy
// url
// strictSSL
// tunnel
// proxyHeaderWhiteList
// proxyHeaderExclusiveList
// time
// callback
```

- request.defaults(options) 便利写法

```ts
// 1.简单的例子
var fs = require('mz/fs');
var request = require('request');

var baseRequest = request.defaults({
  headers: { 'x-token': 'my-token' },
});

var specialRequest = baseRequest.defaults({
  headers: { special: 'special value' },
});
```

- request.METHOD()

```ts
// 1.request.get(): Defaults to method: "GET".
// 2.request.post(): Defaults to method: "POST".
// 3.request.put(): Defaults to method: "PUT".
// 4.request.patch(): Defaults to method: "PATCH".
// 5.request.del() / request.delete(): Defaults to method: "DELETE".
// 6.request.head(): Defaults to method: "HEAD".
// 7.request.options(): Defaults to method: "OPTIONS".
```

- request.cookie()

```ts
request.cookie('key1=value1');
```

- request.jar()

```ts
request.jar();
```

- Timeouts

```ts
// 1.简单的例子
var request = require('request');

request.get('http://10.255.255.1', { timeout: 1500 }, function (err) {
  console.log(err.code === 'ETIMEDOUT');
  console.log(err.connect === true);
  process.exit(0);
});
```

- 通过 PUT 请求

```ts
var request = require('request'),
  rand = Math.floor(Math.random() * 100000000).toString();
request(
  {
    method: 'PUT',
    uri: 'http://mikeal.iriscouch.com/testjs/' + rand,
    multipart: [
      {
        'content-type': 'application/json',
        body: JSON.stringify({
          foo: 'bar',
          _attachments: {
            'message.txt': {
              follows: true,
              length: 18,
              content_type: 'text/plain',
            },
          },
        }),
      },
      { body: 'I am an attachment' },
    ],
  },
  function (error, response, body) {
    if (response.statusCode == 201) {
      console.log(
        'document saved as: http://mikeal.iriscouch.com/testjs/' + rand
      );
    } else {
      console.log('error: ' + response.statusCode);
      console.log(body);
    }
  }
);
```

- gzip 用法

```ts
var request = require('request');
request({ method: 'GET', uri: 'http://www.google.com', gzip: true }, function (
  error,
  response,
  body
) {
  console.log(
    'server encoded the data as: ' +
      (response.headers['content-encoding'] || 'identity')
  );
  console.log('the decoded data is: ' + body);
})
  .on('data', function (data) {
    console.log('decoded chunk: ' + data);
  })
  .on('response', function (response) {
    response.on('data', function (data) {
      console.log('received ' + data.length + ' bytes of compressed data');
    });
  });
```

- jar 用法

```ts
var j = request.jar();
var cookie = request.cookie('key1=value1');
var url = 'http://www.google.com';
j.setCookie(cookie, url);
request({ url: url, jar: j }, function () {
  request('http://images.google.com');
});
```

## 单词：

```pug
way 方法
possible 可能
occur 发生
receive 接收
available 可获取的
techniques 技术
offers 提供
convenience 方便 便利
extension 延伸 扩大
against 在 ... 之前
mapping 映射
case 案例
proper 适当的
provide 提供
preserved 保存
fancy 想象
mean 方法
destination 目标
previous 先前的
features 特性
intermediate 中间的
natively 天然地
instead 代替
prefer 更喜欢
alternative 非正统的 取舍
several 几个
via 通过 取道
pair 一对 一副
related 有关系的 叙述的
manually 手工地
advanced 先进的 高级的
implementations 实现方式
boundary 分界线
postamble 后同步信号
immediately 立即的
bearer 持票人 搬运工
stuff 材料 原料
probably 大概 可能
particularly 特别的 详细的
conjunction 链接
signing 签署
algorithm 运算法则 计算程序
verifier 证实者
proxies 代理 代表权
optional 可选的
signature 签名
pool 水池
tunnel 隧道
convenience 便利

```
