## 流

- 流的类型

```ts
/**
 * Node.js，Stream 有四种流类型：
 * Readable - 可读操作。
 * Writable - 可写操作。
 * Duplex - 可读可写操作.
 * Transform - 操作被写入数据，然后读出结果。
 */
```

- 流的事件

```ts
/**
 * 所有的 Stream 对象都是 EventEmitter 的实例。
 * 常用的事件有：
 * data - 当有数据可读时触发。
 * end - 没有更多的数据可读时触发。
 * error - 在接收和写入过程中发生错误时触发。
 * finish - 所有数据已被写入到底层系统时触发。
 */
```

- 从流中读取数据

```ts
let fs = require('fs');
let data = '';

// 创建可读流
let readerStream = fs.createReadStream('input.txt');

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function (chunk) {
  data += chunk;
});

readerStream.on('end', function () {
  console.log(data);
});

readerStream.on('error', function (err) {
  console.log(err.stack);
});
```

- 写入流

```ts
var fs = require('fs');
var data = '菜鸟教程官网地址：www.runoob.com';

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write(data, 'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on('finish', function () {
  console.log('写入完成。');
});

writerStream.on('error', function (err) {
  console.log(err.stack);
});
```

- 管道流

```ts
/**
 * 1.管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
 * 2.读取一个文件内容并将内容写入到另外一个文件中
 */

let fs = require('fs');

let readerStream = fs.createReadStream('input.txt'); // 创建一个可读流

let writerStream = fs.createWriteStream('output.txt'); // 创建一个可写流

// 管道读写操作
readerStream.pipe(writerStream); // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
```

- 链式流

```ts
/**
 * 1.链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。
 * 2.管道和链式来压缩和解压文件
 */

// 压缩操作
var fs = require('fs');
var zlib = require('zlib'); // 引入压缩模块

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));

console.log('文件压缩完成。');

// 解压操作
var fs = require('fs');
var zlib = require('zlib');

// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));

console.log('文件解压完成。');
```

- 单词

```pug
duplex 两部分的 双工
stack 堆栈
destination 目的地 目标
``
```
