## react-create-app 设置 proxy 接口转发代理

```ts
/**
 * 安装http-proxy-middleware中间件
 * yarn add http-proxy-middleware -D
 */
```

- 在 src 文件夹下面新建 setupProxy.js 文件

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:7001',
      pathRewrite: { '/api': '' },
    })
  );
};
```

## axios 的简单使用

- axios 的安装

```ts
/**
 * yarn add axios
 * 或npm install axios -S
 */
```

- 执行 get 请求

```ts
// 为给定 ID 的 user 创建请求
axios
  .get('/user?ID=12345')
  .then(function (response) {})
  .catch(function (error) {});

// 上面的请求也可以这样做
axios
  .get('/user', { params: { ID: 12345 } })
  .then(function (response) {})
  .catch(function (error) {});
```

- 执行 post 请求

```ts
axios
  .post(
    '/user',
    {
      firstName: 'Fred',
      lastName: 'Flintstone',
    },
    { params: { a: 1 } } // 其他配置项目
  )
  .then(function (response) {})
  .catch(function (error) {});
```

- 执行多个并发请求

```ts
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()]).then(
  axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  })
);
```

## axios 使用进阶

- 通过传递配置项来创建请求

```ts
// 发送 GET 请求（默认的方法）
axios('/user/12345');

// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone',
  },
});

// 获取远端图片
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream',
}).then(function (response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'));
});
```

- 通过请求别名来发起请求

```ts
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```

## 通过创建实例来发起请求

- 创建一个 axios 实例

```ts
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

// 实例方法
instance.request(config)
instance.get(url[, config])
instance.delete(url[, config])
instance.head(url[, config])
instance.options(url[, config])
instance.post(url[, data[, config]])
instance.put(url[, data[, config]])
instance.patch(url[, data[, config]])
```

## 请求配置

- 相关的请求配置项

```ts
/**
 * 配置选项。只有 url 是必需的。如果没有指定 method，请求将默认使用 get 方法。
 */

const config = {
  url: '/user', // 是用于请求的服务器 URL
  method: 'get', // 是创建请求时使用的方法
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseURL: 'https://some-domain.com/api/',

  // 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [
    function (data, headers) {
      // 对 data 进行任意转换处理
      return data;
    },
  ],

  // 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function (data) {
      // 对 data 进行任意转换处理
      return data;
    },
  ],

  headers: { 'X-Requested-With': 'XMLHttpRequest' }, // 是即将被发送的自定义请求头

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: { ID: 12345 },

  // 一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },

  // 作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: { firstName: 'Fred' },

  // 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

  withCredentials: false, //  表示跨域请求时是否需要使用凭证

  // 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应
  adapter: function (config) {},

  // 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret',
  },

  // 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json',

  // 指定响应的解码方式
  responseEncoding: 'utf8',

  // 用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN',

  // http携带xsrf请求头的值
  xsrfHeaderName: 'X-XSRF-TOKEN',

  // 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {},

  // 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {},

  // 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve;
  // 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },

  // 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5,

  //  定义一个在node.js中使用的 UNIX Socket
  // 可以指定 `socketPath` 或 `proxy`
  socketPath: null,

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。
  // 允许像这样配置选项：`keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l',
    },
  },

  // 指定用于取消请求的 cancel token
  cancelToken: new CancelToken(function (cancel) {}),
};
```

- 设置全局 axios 默认值

```ts
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
```

- 自定义实例默认值

```ts
const instance = axios.create({
  baseURL: 'https://api.example.com',
});

instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

- 配置项的优先顺序

```ts
/**
 * 在 lib/defaults.js 找到的库的默认值，然后是实例的 defaults 属性，最后是请求的 config 参数
 * 后者将优先于前者
 */
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = axios.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;

// 为已知需要花费很长时间的请求覆写超时设置
instance.get('/longRequest', {
  timeout: 5000,
});
```

## 响应结构说明

```ts
const response = {
  data: {}, // 由服务器提供的响应
  status: 200, // 来自服务器响应的 HTTP 状态码
  statusText: 'OK', // 来自服务器响应的 HTTP 状态信息
  headers: {}, //  服务器响应的头
  config: {}, // 是为请求提供的配置信息
  // 'request'
  // 生成此处响应的请求
  // 在nodejs中最后的请求实例
  // 一个浏览器XMLHttpRequest实例
  request: {},
};
```

## 拦截器

- 拦截器的使用

```ts
/* 在请求或响应被 then 或 catch 处理前拦截它们 */
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
```

- 拦截器的移除

```ts
const myInterceptor = axios.interceptors.request.use(function () {});
axios.interceptors.request.eject(myInterceptor);
```

- 为自定义 axios 实例添加拦截器

```ts
const instance = axios.create();
instance.interceptors.request.use(function () {});
```

## 错误处理

- 一般的错误处理

```ts
axios.get('/user/12345').catch(function (error) {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  console.log(error.config);
});
```

- 自定义 HTTP 状态码的错误范围

```ts
// 使用 validateStatus 配置选项定义一个
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500;
  },
});
```

## 取消

- 创建 cancel token

```ts
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios
  .get('/user/12345', {
    cancelToken: source.token,
  })
  .catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      console.log('Request canceled', thrown.message);
    } else {
      // 处理错误
    }
  });

axios.post(
  '/user/12345',
  {
    name: 'new name',
  },
  {
    cancelToken: source.token,
  }
);

// 取消请求（message 参数是可选的）
source.cancel('用户已取消操作');
```

- 创建 cancel token

```ts
// 可以使用同一个 cancel token 取消多个请求
// 通过传递一个 executor 函数到 CancelToken 的构造函数来创建 cancel token
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  }),
});

// 取消请求
cancel();
```

## 使用 application/x-www-form-urlencoded 发送数据

- 在浏览器中

```ts
// 在浏览器中，可以使用URLSearchParams API，如下所示：
// 请注意，所有浏览器都不支持URLSearchParams（请参阅caniuse.com），但可以使用polyfill
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```

- 可以使用 qs 库编码数据

```ts
const qs = require('qs');
axios.post('/foo', qs.stringify({ bar: 123 }));
```

- 另一种方式（ES6）

```ts
import qs from 'qs';
const data = { bar: 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```

- 在 node.js 中

```ts
// 可以使用querystring模块
const querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```

## axios-retry 一个可以设置请求重试的插件
