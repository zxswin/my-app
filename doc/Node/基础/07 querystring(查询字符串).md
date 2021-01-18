## querystring

- 起步说明

```ts
/**
 * querystring 模块提供了一些实用函数，用于解析与格式化 URL 查询字符串。 可以通过以下方式使用：
 */
const querystring = require('querystring');

const postData = querystring.stringify({
  msg: 'Node.js',
  name: 'abc',
});

console.log('postData', postData); // msg=Node.js&name=abc
```

## api 说明

```ts
/**
 * 1.querystring.escape 底层方法 提供 querystring.stringify()使用
 */

/**
 * 2.querystring.parse(str[, sep[, eq[, options]]])
 * 把一个 URL 查询字符串 str 解析成一个键值对的集合
 */
let qs = require('querystring');
let value = qs.parse('foo=bar&abc=xyz&abc=123');
console.log(value); // { foo: 'bar', abc: [ 'xyz', '123' ] }

/**
 * 3.querystring.stringify(obj[, sep[, eq[, options]]])
 * 通过遍历给定的 obj 对象的自身属性，生成 URL 查询字符串。
 */
let qs = require('querystring');
let value = qs.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
console.log(value); // foo=bar&baz=qux&baz=quux&corge=

/**
 * 4.querystring.unescape(str)
 * 该方法是提供给 querystring.parse() 使用的，通常不直接使用。
 */
```

## 单词

```pug
escape 逃跑 泄露
parse 解析
```
