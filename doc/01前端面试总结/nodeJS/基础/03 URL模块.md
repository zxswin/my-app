- URL 模块前置知识

```ts
/**
 * 1.url 模块提供了两套 API 来处理 URL 字符串
 * Node.js特有的API，是旧版本的遗留
 * 实现了WHATWG URL Standard的 API ，该标准也在各种浏览器中被使用(推荐使用)
 */
```

- API 使用范例

```ts
// 利用 WHATWG API 解析一个 URL 字符串:
const { URL } = require('url');
const myURL = new URL(
  'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash'
);
console.log('myURL', myURL);
// {
//   href: 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash',
//   origin: 'https://sub.host.com:8080',
//   protocol: 'https:',
//   username: 'user',
//   password: 'pass',
//   host: 'sub.host.com:8080',
//   hostname: 'sub.host.com',
//   port: '8080',
//   pathname: '/p/a/t/h',
//   search: '?query=string',
//   searchParams: URLSearchParams { 'query' => 'string' },
//   hash: '#hash'
// }
```

- 通过 Node.js 提供的 API 解析一个 URL:

```ts
const url = require('url');
const myURL = url.parse(
  'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash'
);
console.log('myURL', myURL);

// Url {
//   protocol: 'https:',
//   slashes: true,
//   auth: 'user:pass',
//   host: 'sub.host.com:8080',
//   port: '8080',
//   hostname: 'sub.host.com',
//   hash: '#hash',
//   search: '?query=string',
//   query: 'query=string',
//   pathname: '/p/a/t/h',
//   path: '/p/a/t/h?query=string',
//   href: 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash'
// }
```

## WHATWG URL API 使用：

```ts
/**
 * 根据浏览器的约定，URL 对象的所有属性都是在类的原型上实现为 getter 和 setter，而不是作为对象本身的数据属性。
 * 如果 input 或 base 是无效 URLs，将会抛出 TypeError。请注意给定值将被强制转换为字符串。
 * 存在于 input 主机名中的 Unicode 字符将被使用 Punycode 算法自动转换为 ASCII。
 */
```

- new URL(input[, base]) 通过将 input 解析到 base 上创建一个新的 URL 对象。

```ts
const { URL } = require('url');
const myURL = new URL('/foo', 'https://example.org/');
console.log('myURL', myURL);

// URL {
//   href: 'https://example.org/foo',
//   origin: 'https://example.org',
//   protocol: 'https:',
//   username: '',
//   password: '',
//   host: 'example.org',
//   hostname: 'example.org',
//   port: '',
//   pathname: '/foo',
//   search: '',
//   searchParams: URLSearchParams {},
//   hash: ''
// }
```

- 存在于 input 主机名中的 Unicode 字符将被使用 Punycode 算法自动转换为 ASCII。

```ts
const { URL } = require('url');
const myURL = new URL('https://你好你好');

console.log('myURL', myURL);

// URL {
//   href: 'https://xn--6qqa088eba/',
//   origin: 'https://xn--6qqa088eba',
//   protocol: 'https:',
//   username: '',
//   password: '',
//   host: 'xn--6qqa088eba',
//   hostname: 'xn--6qqa088eba',
//   port: '',
//   pathname: '/',
//   search: '',
//   searchParams: URLSearchParams {},
//   hash: ''
// }
```

- url.hash 获取及设置 URL 的分段(hash)部分

```ts
const { URL } = require('url');
const myURL = new URL('https://example.org/foo#bar');
console.log(myURL.hash); // 输出 #bar

myURL.hash = 'baz';
console.log(myURL.href); // https://example.org/foo#baz
```

- url.host 获取及设置 URL 的主机(host)部分。

```ts
/**
 * 如果给 host 属性设置的值是无效值，那么该值将被忽略。
 */
const { URL } = require('url');
const myURL = new URL('https://example.org:81/foo');
console.log(myURL.host); // 输出 example.org:81

myURL.host = 'example.com:82';
console.log(myURL.href); // 输出 https://example.com:82/foo
```

- url.hostname 获取及设置 URL 的主机名(hostname)部分

```ts
/**
 * 如果给 hostname 属性设置的值是无效值，那么该值将被忽略
 */

const { URL } = require('url');
const myURL = new URL('https://example.org:81/foo');
console.log(myURL.hostname); // 输出 example.org

myURL.hostname = 'example.com:82'; // 会忽略后面的端口号
console.log(myURL.href); // 输出 https://example.com:81/foo
```

- url.href 获取及设置序列化的 URL

```ts
/**
 * 获取 href 属性的值等同于调用 url.toString()。
 * 将此属性的值设置为新值等同于 new URL(value)使用创建新的 URL 对象。URL 对象的每个属性都将被修改。
 * 如果给 href 属性设置的值是无效 URL，将会抛出 TypeError。
 */

const { URL } = require('url');
const myURL = new URL('https://example.org/foo');
console.log(myURL.href); // 输出 https://example.org/foo

myURL.href = 'https://example.com/bar';
console.log(myURL.href); // 输出 https://example.com/bar
console.log(myURL);

// URL {
//   href: 'https://example.com/bar',
//   origin: 'https://example.com',
//   protocol: 'https:',
//   username: '',
//   password: '',
//   host: 'example.com',
//   hostname: 'example.com',
//   port: '',
//   pathname: '/bar',
//   search: '',
//   searchParams: URLSearchParams {},
//   hash: ''
// }
```

- url.origin 获取只读序列化的 URL origin 部分。

```ts
const { URL } = require('url');
const myURL = new URL('https://example.org/foo/bar?baz');
console.log(myURL.origin); // 输出 https://example.org
```

- url.password 获取及设置 URL 的密码(password)部分

```ts
const { URL } = require('url');
const myURL = new URL('https://abc:xyz@example.com');
console.log(myURL.password); // 输出 xyz

myURL.password = '123';
console.log(myURL.href); // 输出 https://abc:123@example.com
```

- url.pathname 获取及设置 URL 的路径(path)部分

```ts
const { URL } = require('url');
const myURL = new URL('https://example.org/abc/xyz?123');
console.log(myURL.pathname); // 输出 /abc/xyz

myURL.pathname = '/abcdef';
console.log(myURL.href); // 输出 https://example.org/abcdef?123
```

- url.port 获取及设置 URL 的端口(port)部分

```ts
const { URL } = require('url');
const myURL = new URL('https://example.org:8888');
console.log(myURL.port); // 输出 8888

// 默认端口将自动转换为空字符
// (HTTPS 协议默认端口是 443)
myURL.port = '443';
console.log(myURL.port); // 输出空字符
console.log(myURL.href); // 输出 https://example.org/

myURL.port = 1234;
console.log(myURL.port); // 输出 1234
console.log(myURL.href); // 输出 https://example.org:1234/

// 完全无效的端口字符串将被忽略
myURL.port = 'abcd';
console.log(myURL.port); // 输出 1234

// 开头的数字将会被当做端口数
myURL.port = '5678abcd';
console.log(myURL.port); // 输出 5678

// 非整形数字将会被截取部分
myURL.port = 1234.5678;
console.log(myURL.port); // 输出 1234

// 超出范围的数字将被忽略
myURL.port = 1e10;
console.log(myURL.port); // 输出 1234
```

- url.protocol 获取及设置 URL 的协议(protocol)部分

```ts
/**
 * 如果给 protocol 属性设置的值是无效值，那么该值将被忽略
 */
const { URL } = require('url');
const myURL = new URL('https://example.org');
console.log(myURL.protocol); // 输出 https:

myURL.protocol = 'ftp';
console.log(myURL.href); // 输出 ftp://example.org/
```

- url.search 获取及设置 URL 的序列化查询(query)部分部分

```ts
const { URL } = require('url');
const myURL = new URL('https://example.org/abc?123');
console.log(myURL.search); // 输出 ?123

myURL.search = 'abc=xyz';
console.log(myURL.href); // 输出 https://example.org/abc?abc=xyz
```

- url.searchParams

```ts
/**
 * 获取表示 URL 查询参数的 URLSearchParams 对象。该属性是只读的；
 */
const { URL } = require('url');

const myURL = new URL('https://example.org/?abc=123');
console.log(myURL.searchParams.get('abc')); // 输出 123

myURL.searchParams.append('abc', 'xyz');
console.log(myURL.href); // 输出 https://example.org/?abc=123&abc=xyz

myURL.searchParams.delete('abc');
myURL.searchParams.set('a', 'b');
console.log(myURL.href); // 输出 https://example.org/?a=b
```

- url.username 获取及设置 URL 的用户名(username)部分

```ts
const { URL } = require('url');
const myURL = new URL('https://abc:xyz@example.com');
console.log(myURL.username); // 输出 abc

myURL.username = '123';
console.log(myURL.href); // 输出 https://123:xyz@example.com/
```

- url.toString()

```ts
/**
 * 在 URL 对象上调用 toString()方法将返回序列化的 URL。返回值与 url.href 和 url.toJSON()的相同。
 */
```

- url.toJSON()

```ts
/**
 * 在 URL 对象上调用 toJSON()方法将返回序列化的 URL。返回值与 url.href 和 url.toString()的相同。
 * 当 URL 对象使用 JSON.stringify()序列化时将自动调用该方法。
 */
const { URL } = require('url');
const myURLs = [
  new URL('https://www.example.com'),
  new URL('https://test.example.org'),
];
console.log(JSON.stringify(myURLs)); // 输出 ["https://www.example.com/","https://test.example.org/"]
```

- URLSearchParamsAPI 接口提供对 URLquery 部分的读写权限

```ts
/**
 * 这个 API 是专门为 URL 查询字符串而设计的。
 */
const { URL, URLSearchParams } = require('url');

const myURL = new URL('https://example.org/?abc=123');
const newSearchParams = new URLSearchParams(myURL.searchParams);
// 上面的代码等同于
// const newSearchParams = new URLSearchParams(myURL.search);
newSearchParams.append('a', 'c');
console.log(myURL.href);
// 输出 https://example.org/?abc=123
console.log(newSearchParams.toString());
// 输出 abc=123&a=c

// newSearchParams.toString() 被隐式调用
myURL.search = newSearchParams;
console.log(myURL.href); // 输出 https://example.org/?abc=123&a=c
newSearchParams.delete('a');
console.log(myURL.href); // 输出 https://example.org/?abc=123&a=c
console.log(newSearchParams.toString()); // abc=123
```

- new URLSearchParams()

```ts
/**
 * 实例化一个新的空的 URLSearchParams 对象。
 */
```

- new URLSearchParams(string)

```ts
/**
 * 实例化一个新的 URLSearchParams 对象
 */
const { URLSearchParams } = require('url');
let params;

params = new URLSearchParams('user=abc&query=xyz');
console.log(params.get('user')); // 输出 'abc'
console.log(params.toString()); // 输出 'user=abc&query=xyz'

params = new URLSearchParams('?user=abc&query=xyz');
console.log(params.toString()); // 输出 'user=abc&query=xyz'
```

- new URLSearchParams(obj) 通过使用查询哈希映射实例化一个新的 URLSearchParams 对象

```ts
/**
 * 在数组的形式中，重复的键是不允许的。
 */
const { URLSearchParams } = require('url');
const params = new URLSearchParams({
  user: 'abc',
  query: ['first', 'second'],
});
console.log(params.getAll('query')); // 输出 [ 'first,second' ]
console.log(params.toString()); // 输出 'user=abc&query=first%2Csecond'
```

- new URLSearchParams(iterable)

```ts
/**
 * 以一种类似于 Map 的构造函数的迭代映射方式实例化一个新的 URLSearchParams 对象。
 */
const { URLSearchParams } = require('url');
let params;

// Using an array
params = new URLSearchParams([
  ['user', 'abc'],
  ['query', 'first'],
  ['query', 'second'],
]);
console.log(params.toString()); // 输出 'user=abc&query=first&query=second'

// 使用 Map 对象
const map = new Map();
map.set('user', 'abc');
map.set('query', 'xyz');
params = new URLSearchParams(map);
console.log(params.toString()); // 输出 'user=abc&query=xyz'

// 使用 generator 函数
function* getQueryPairs() {
  yield ['user', 'abc'];
  yield ['query', 'first'];
  yield ['query', 'second'];
}
params = new URLSearchParams(getQueryPairs());
console.log(params.toString()); // 输出 'user=abc&query=first&query=second'

// 每个键值对必须有两个元素
new URLSearchParams([['user', 'abc', 'error']]);
// 抛出 TypeError [ERR_INVALID_TUPLE]:
// 每一个键值对必须是迭代的[键，值]元组
```

- urlSearchParams.append(name, value) 在查询字符串中附加一个新的键值对。
- 23.urlSearchParams.delete(name) 删除所有键为 name 的键值对。
- 24.urlSearchParams.entries() 在查询中的每个键值对上返回一个 ES6 迭代器。 迭代器的每一项都是一个 JavaScript 数组。 Array 的第一个项是键 name，Array 的第二个项是值 value
- 25.urlSearchParams.forEach(fn[, thisArg])

```ts
const { URL } = require('url');
const myURL = new URL('https://example.org/?a=b&c=d');
myURL.searchParams.forEach((value, name, searchParams) => {
  console.log(name, value, myURL.searchParams === searchParams);
});
// 输出:
// a b true
// c d true
```

- urlSearchParams.get(name)

```ts
/**
 * 返回: <string> ，如果没有键值对对应给定的 name 则返回 null。
 */
```

- urlSearchParams.getAll(name)

```ts
/**
 * 返回键是 name 的所有键值对的值，如果没有满足条件的键值对，则返回一个空的数组。
 */
```

- urlSearchParams.has(name) 如果存在至少一对键是 name 的键值对则返回 true。

- urlSearchParams.keys()

```ts
/**
 * 在每一个键值对上返回一个键的 ES6 迭代器。
 */
const { URLSearchParams } = require('url');
const params = new URLSearchParams('foo=bar&foo=baz');
console.log(params);
for (const name of params.keys()) {
  console.log(name);
}
// 输出:
// foo
// foo
```

- urlSearchParams.set(name, value)

```ts
/**
 * 将 URLSearchParams 对象中与 name 相对应的值设置为 value。
 * 如果已经存在键为 name 的键值对，将第一对的值设为 value 并且删除其他对。如果不存在，则将此键值对附加在查询字符串后。
 */

const { URLSearchParams } = require('url');

const params = new URLSearchParams();
params.append('foo', 'bar');
params.append('foo', 'baz');
params.append('abc', 'def');
console.log(params.toString()); // 输出 foo=bar&foo=baz&abc=def

params.set('foo', 'def');
params.set('xyz', 'opq');
console.log(params.toString()); // 输出 foo=def&abc=def&xyz=opq
```

- urlSearchParams.sort()

```ts
/**
 * 按现有名称就地排列所有的名称-值对。使用[稳定排序算法][]完成排序，因此保留具有相同名称的名称-值对之间的相对顺序。
 * 特别地，该方法可以用来增加缓存命中。
 */
const { URLSearchParams } = require('url');
const params = new URLSearchParams('query[]=abc&type=search&query[]=123');
params.sort();
console.log(params.toString()); // Prints query%5B%5D=abc&query%5B%5D=123&type=search
```

- urlSearchParams.toString() 返回查询参数序列化后的字符串，必要时存在百分号编码字符。
- urlSearchParams.values() 在每一个键值对上返回一个值的 ES6 迭代器。
- urlSearchParams[Symbol.iterator]()

```ts
/**
 * 根据查询字符串，返回一个键值对形式的 ES6 Iterator。每个迭代器的项是一个 JavaScript Array。
 * 其中，Array 的第一项是 name，第二个是 value。
 * 是 urlSearchParams.entries() 的别名。
 */

const params = new URLSearchParams('foo=bar&xyz=baz');
for (const [name, value] of params) {
  console.log(name, value);
}
// Prints:
// foo bar
// xyz baz
```

- url.domainToASCII(domain)

```ts
/**
 * 返回 Punycode ASCII 序列化的 domain. 如果 domain 是无效域名，将返回空字符串。
 */
const url = require('url');
console.log(url.domainToASCII('español.com')); // 输出 xn--espaol-zwa.com
console.log(url.domainToASCII('中文.com')); // 输出 xn--fiq228c.com
console.log(url.domainToASCII('xn--iñvalid.com')); // 输出空字符串
```

- url.domainToUnicode(domain)

```ts
/**
 * 返回 Unicode 序列化的 domain. 如果 domain 是无效域名，将返回空字符串。
 * 它执行的是 url.domainToASCII()的逆运算。
 */
const url = require('url');
console.log(url.domainToUnicode('xn--espaol-zwa.com')); // 输出 español.com
console.log(url.domainToUnicode('xn--fiq228c.com')); // 输出 中文.com
console.log(url.domainToUnicode('xn--iñvalid.com')); // 输出空字符串
```

- url.fileURLToPath(url) 范例报错 不知如何使用

- url.format(URL[, options])

```ts
/**
 * auth <boolean> 如果序列化的 URL 字符串应该包含用户名和密码为 true，否则为 false。默认为 true。
 * fragment <boolean> 如果序列化的 URL 字符串应该包含分段为 true，否则为 false。默认为 true。
 * search <boolean> 如果序列化的 URL 字符串应该包含搜索查询为 true，否则为 false。默认为 true。
 * unicode <boolean> true 如果出现在 URL 字符串主机元素里的 Unicode 字符应该被直接编码而不是使用 Punycode 编码为 true，默认为 false。
 * url.format(URL[, options])方法允许输出的基本自定义。
 */
const { URL } = require('url');
const url = require('url');
const myURL = new URL('https://a:b@你好你好?abc#foo');

console.log(myURL.href); // 输出 https://a:b@xn--6qqa088eba/?abc#foo
console.log(myURL.toString()); // 输出 https://a:b@xn--6qqa088eba/?abc#foo
console.log(url.format(myURL, { fragment: false, unicode: true, auth: false })); // 输出 'https://你好你好/?abc'
```

## 遗留的 urlObject (require('url').Url)由 url.parse()函数创建并返回。

```ts
/**
 * 1.urlObject.auth
 * 2.urlObject.hash
 * 3.urlObject.host
 * 4.urlObject.hostname
 * 5.urlObject.href
 * 6.urlObject.path
 * 7.urlObject.pathname
 * 8.urlObject.port
 * 9.urlObject.protocol
 * 10.urlObject.query
 * 11.urlObject.search
 * 12.urlObject.slashes
 * 13.url.format(urlObject)
 * 14.url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
 * 15.url.resolve(from, to)
 */
```

- 注意：

```ts
/**
 * 包含在赋给 pathname 属性的值中的无效 URL 字符是[百分比编码][]。
 * 请注意选择哪些字符进行百分比编码可能与 url.parse()和 url.format()方法产生的不同。
 */
```

- 单词

```pug
puny 微不足道的 弱小的
consider 考虑
handful 少数
scheme 计划 体系 方案
instance 实例
hypothetical 假设
permit 许可
ensure 确保
correct 正确的
decoding 解码 译码
character 性格 特点
cross 交叉
auth 作家
legacy 遗产
slashes 斜杆
```
