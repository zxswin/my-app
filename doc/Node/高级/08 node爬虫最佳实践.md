## node 爬虫最佳实践

- request 模块 请求网页信息

```ts
// 1.安装依赖
// cnpm i request -S;

// 2.简单实用案例
var request = require('request');
// 通过 GET 请求来读取 http://cnodejs.org/ 的内容
request('http://www.gps688.com/#B_vid=5594939777768808464', function (
  error,
  response,
  body
) {
  if (!error && response.statusCode == 200) {
    // 输出网页内容
    console.log(body);
  }
});
```

- 如果需要添加额外的请求参数

```ts
var request = require('request');
request(
  {
    url: 'http://www.gps688.com/#B_vid=5594939777768808464', // 请求的 URL
    method: 'GET', // 请求方法
    headers: {
      // 指定请求头
      'Accept-Language': 'zh-CN,zh;q=0.8', // 指定 Accept-Language
      Cookie: '__utma=4454.11221.455353.21.143;', // 指定 Cookie
    },
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('输出网页内容', body); // 输出网页内容
    }
  }
);
```

## cheerio 模块来提取网页中的数据

```ts
// cheerio 是一个 jQuery Core 的子集，其实现了 jQuery Core 中浏览器无关的 DOM 操作 API

// 1.安装 cheerio 模块
// cnpm i cheerio -S

// 2.简单的例子
var cheerio = require('cheerio');

// 通过 load 方法把 HTML 代码转换成一个 jQuery 对象
var $ = cheerio.load('<h2 class="title">Hello world</h2>');

// 可以使用与 jQuery 一样的语法来操作
$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

console.log($.html());
// 将输出 <h2 class="title welcome">Hello there!</h2>
```

- 结合 request 模块 和 cheerio 模块的简单例子

```ts
var request = require('request');
var cheerio = require('cheerio');

// 通过 GET 请求来读取 http://cnodejs.org/ 的内容
request('http://www.gps688.com/#B_vid=5594939777768808464', function (
  error,
  response,
  body
) {
  if (!error && response.statusCode == 200) {
    // 输出网页内容
    var $ = cheerio.load(response.body);
    $('.menu-item').each(function (i, e) {
      console.log($(this).text() + 'br');
    });
  }
});
```

## 单词：

```pug
cheerio 干杯 再见
crawler 爬行者
raw 生的 原料
```
