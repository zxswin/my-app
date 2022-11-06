## Buffer

- Buffer 类

```ts
/**
 * 1.Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
 * 2.一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。
 * 3.建议使用 Buffer.from() 接口去创建Buffer对象。
 */
```

- Buffer 与字符编码

```ts
/**
 * 1.Node.js 目前支持的字符编码包括：
 * ascii - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
 * utf8 - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
 * utf16le - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
 * ucs2 - utf16le 的别名。
 * base64 - Base64 编码。
 * latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。
 * binary - latin1 的别名。
 * hex - 将每个字节编码为两个十六进制字符。
 */

/**
 *  2.Buffer 实例一般用于表示编码字符的序列，比如 UTF-8 、 UCS2 、 Base64 、或十六进制编码的数据。
 * 通过使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换。
 */
const buf = Buffer.from('runoob', 'ascii');
console.log(buf.toString('hex')); // 输出 72756e6f6f62
console.log(buf.toString('base64')); // 输出 cnVub29i
```

## 创建 Buffer 类

- Buffer 提供了以下 API 来创建 Buffer 类：

```ts
/**
 * Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
 * Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
 * Buffer.allocUnsafeSlow(size)
 * Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
 * Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
 * Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
 * Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例
 */

// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，但返回的 Buffer 实例可能包含旧数据，因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');
```

- 写入缓冲区

```ts
/**
 * 1.语法
 * buf.write(string[, offset[, length]][, encoding])
 *
 * 2.参数说明
 * string - 写入缓冲区的字符串。
 * offset - 缓冲区开始写入的索引值，默认为 0 。
 * length - 写入的字节数，默认为 buffer.length
 * encoding - 使用的编码。默认为 'utf8' 。
 *
 * 根据 encoding 的字符编码写入 string 到 buf 中的 offset 位置。
 * length 参数是写入的字节数。 如果 buf 没有足够的空间保存整个字符串，则只会写入 string 的一部分。 一部分解码的字符不会被写入。
 *
 * 3.返回值
 * 返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。
 */

// 使用示例
buf = Buffer.alloc(256);
len = buf.write('www.runoob.com');
console.log('写入字节数 : ' + len); // 14 返回的是 buffer 的大小
```

- 从缓冲区读取数据

```ts
/**
 * 1.语法
 * buf.toString([encoding[, start[, end]]])
 *
 * 2.参数如下
 * encoding - 使用的编码。默认为 'utf8' 。
 * start - 指定开始读取的索引位置，默认为 0。
 * end - 结束位置，默认为缓冲区的末尾。
 *
 * 3.返回值
 * 解码缓冲区数据并使用指定的编码返回字符串。
 */

// 使用示例
buf = Buffer.alloc(26);
for (var i = 0; i < 26; i++) {
  buf[i] = i + 97;
}

console.log(buf.toString('ascii')); // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf.toString('ascii', 0, 5)); // 输出: abcde
console.log(buf.toString('utf8', 0, 5)); // 输出: abcde
console.log(buf.toString(undefined, 0, 5)); // 默认使用 'utf8' 编码, 并输出: abcde
```

- 将 Buffer 转换为 JSON 对象

```ts
/**
 * 1.语法：
 * buf.toJSON()
 * 当字符串化一个 Buffer 实例时，JSON.stringify() 会隐式地调用该 toJSON()。
 *
 * 2.返回值：返回 JSON 对象。
 *
 */

// 3.示例展示
const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);

console.log(json); // 输出: {"type":"Buffer","data":[1,2,3,4,5]}

const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ? Buffer.from(value.data) : value;
});

console.log(copy); // 输出: <Buffer 01 02 03 04 05>
```

- 缓冲区合并

```ts
/**
 * 1.语法：Buffer.concat(list[, totalLength])
 *
 * 2.参数说明
 * list - 用于合并的 Buffer 对象数组列表。
 * totalLength - 指定合并后 Buffer 对象的总长度。
 *
 * 3.返回值
 * 返回一个多个成员合并的新 Buffer 对象。
 */

// 4.使用示例
var buffer1 = Buffer.from('菜鸟教程');
var buffer2 = Buffer.from('www.runoob.com');
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log('buffer3 内容: ' + buffer3.toString()); // buffer3 内容: 菜鸟教程www.runoob.com
```

- 缓冲区比较

```ts
/**
 * 1.语法：buf.compare(otherBuffer);
 * 2.参数：otherBuffer - 与 buf 对象比较的另外一个 Buffer 对象。
 * 3.返回值：返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。
 */
// 使用示例
var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if (result < 0) {
  console.log(buffer1 + ' 在 ' + buffer2 + '之前'); // ABC 在 ABCD 之前
} else if (result == 0) {
  console.log(buffer1 + ' 与 ' + buffer2 + '相同');
} else {
  console.log(buffer1 + ' 在 ' + buffer2 + '之后');
}
```

- 拷贝缓冲区

```ts
/**
 * 1.语法 ：buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
 *
 * 2.参数：
 * targetBuffer - 要拷贝的 Buffer 对象。
 * targetStart - 数字, 可选, 默认: 0
 * sourceStart - 数字, 可选, 默认: 0
 * sourceEnd - 数字, 可选, 默认: buffer.length
 *
 * 3.返回值：没有返回值。
 */
// 4.使用示例
var buf1 = Buffer.from('abcdefghijkl');
var buf2 = Buffer.from('RUNOOB');
//将 buf2 插入到 buf1 指定位置上
buf2.copy(buf1, 2);
console.log(buf1.toString()); //abRUNOOBijkl
```

- 缓冲区裁剪

```ts
/**
 * 1.语法：buf.slice([start[, end]])
 *
 * 2.参数
 * start - 数字, 可选, 默认: 0
 * end - 数字, 可选, 默认: buffer.length
 *
 * 3.返回值:返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。
 */
// 使用示例：
var buffer1 = Buffer.from('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0, 2);
console.log('buffer2 content: ' + buffer2.toString()); // buffer2 content: ru
```

- 缓冲区长度

```ts
/**
 * 1.语法：buf.length;
 * 2.返回值:返回 Buffer 对象所占据的内存长度。
 */
// 使用示例：
var buffer = Buffer.from('www.runoob.com');
// 缓冲区长度
console.log('buffer length: ' + buffer.length); // buffer length: 14
```

- 补充：

```ts
/**
 * 1.JSON.parse()【从一个字符串中解析出 json 对象】
 * 2.JSON.stringify()【从一个对象中解析出字符串
 */
let json = JSON.parse('{"p": 5}', function (k, v) {
  if (k === '') {
    return v;
  }
  return v * 2; // 每个值都乘以 2 并返回
});

console.log(JSON.stringify(json)); // {"p":10}
```

- 单词

```pug
alloc 分配
buffer 缓冲区
reviver 复兴者
compare 比较
studio 工作室
publish 出版 发行
```
