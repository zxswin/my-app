## API 概述

```ts
/**
 * 1.path.basename  返回 path 的最后一部分
 * 2.path.delimiter 返回平台特定的路径分隔符：环境变量
 * 3.path.dirname(path) 返回 path 的目录名，
 * 4.path.extname(path) 返回 path 的扩展名
 * 5.path.format(pathObject) 将一个对象格式化为一个路径字符串。
 * 6.path.isAbsolute(path) 判断 path 是否绝对路径。
 * 7.path.join([...paths]) 使用平台特定的分隔符把所有 path 片段连接到一起，并规范化生成的路径。
 * 8.path.normalize(path) 规范化指定的 path，并处理 '..' 和 '.' 片段。
 * 9.path.parse(path) 返回一个对象，其中对象的属性表示 path 的元素。
 * 10.path.relative(from, to) 返回从 from 到 to 的相对路径（基于当前工作目录）。
 * 11.path.resolve([...paths]) 将路径或路径片段的序列处理成绝对路径。
 * 12.path.sep 返回平台特定的路径片段分隔符：
 * 13.path.toNamespacedPath(path) 返回 path 的带命名空间前缀的路径，仅支持 Window 系统。
 * 14.path.win32 返回为 Windows 实现的 path 方法。
 */
const path = require('path');
console.log('返回 path 的最后一部分', path.basename('a/b/c/text.txt')); // text.txt
console.log('返回平台特定的路径分隔符：环境变量', path.delimiter); // :
console.log('返回 path 的目录名', path.dirname('a/b/c/text.txt')); //  a/b/c
console.log('返回 path 的扩展名', path.extname('a/b/c/text.txt')); // .txt
console.log('判断 path 是否绝对路径。', path.isAbsolute('/a/b/c/text.txt')); // true
console.log(
  'path.join([...paths]) 使用平台特定的分隔符把所有 path 片段连接到一起，并规范化生成的路径',
  path.join('a', 'b', 'c') //  a/b/c
);
console.log(
  'path.normalize(path) 规范化指定的 path，并处理 ..和 . 片段',
  path.normalize('../a/b/c/text.txt') // ../a/b/c/text.txt
);

console.log(
  'path.parse(path) 返回一个对象，其中对象的属性表示 path 的元素',
  path.parse('/a/b/c/text.txt')
  // {
  //   root: '/',
  //   dir: '/a/b/c',
  //   base: 'text.txt',
  //   ext: '.txt',
  //   name: 'text'
  // }
);

console.log(
  'path.relative(from, to) 返回从 from 到 to 的相对路径（基于当前工作目录）。',
  path.relative('a', 'b') // ../b
);

console.log(
  'path.resolve([...paths]) 将路径或路径片段的序列处理成绝对路径',
  path.resolve('/a/b/c/text.txt'), // /a/b/c/text.txt
  path.resolve('../a/b/c/text.txt') // /Users/zxswin/myitem/面试资料/a/b/c/text.txt
);

console.log('path.sep 返回平台特定的路径片段分隔符', path.sep); // /
console.log(
  'path.toNamespacedPath(path) 返回 path 的带命名空间前缀的路径，仅支持 Window 系统。',
  path.toNamespacedPath('/a/b')
); // /a/b

console.log('path.win32 返回为 Windows 实现的 path 方法', path.win32); // {...obj}
```

- path.basename

```ts
/**
 * 返回 path 的最后一部分
 * 第一个参数是路径 , 第二个参数是拓展名(可选)
 */
path.basename('/foo/bar/baz/asdf/quux.html'); // 返回: 'quux.html'
path.basename('/foo/bar/baz/asdf/quux.html', '.html'); // 返回: 'quux'
```

- path.delimiter

```ts
/**
 * 返回平台特定的路径分隔符(环境变量)：
 */
const path = require('path');

console.log(path.delimiter); // ';'
console.log(process.env.PATH.split(path.delimiter));
```

- path.dirname(path)

```ts
/**
 * 返回 path 的目录名
 */
const path = require('path');
console.log(path.dirname('/foo/bar/baz/asdf/quux')); // 返回: '/foo/bar/baz/asdf'
```

- path.extname(path)

```ts
/**
 * 返回 path 的扩展名
 */
const path = require('path');
console.log(path.extname('index.html')); // '.html'
console.log(path.extname('index.coffee.md')); // '.md'
console.log(path.extname('index.')); // '.'
console.log(path.extname('index')); // ''
console.log(path.extname('.index')); // ''
```

- path.format(pathObject)

```ts
/**
 * dir <string>
 * root <string>
 * base <string>
 * name <string>
 * ext <string>
 * 将一个对象格式化为一个路径字符串。
 * 如果指定了 pathObject.dir，则忽略 pathObject.root。
 * 如果指定了 pathObject.base，则忽略 pathObject.ext 和 pathObject.name。
 */
path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt',
});
// 返回: '/home/user/dir/file.txt'

path.format({
  root: '/',
  base: 'file.txt',
  ext: 'ignored',
});

path.format({
  root: '/',
  name: 'file',
  ext: '.txt',
});
// 返回: '/file.txt'
```

- path.isAbsolute(path)

```ts
/**
 * 判断 path 是否绝对路径
 */
console.log(path.isAbsolute('/foo/bar')); // true
console.log(path.isAbsolute('/baz/..')); // true
console.log(path.isAbsolute('qux/')); // false
console.log(path.isAbsolute('.')); // false
```

- path.join([...paths])

```ts
/**
 * 使用平台特定的分隔符把所有 path 片段连接到一起，并规范化生成的路径。
 * 如果连接后的路径字符串是一个长度为零的字符串，则返回 '.'，表示当前工作目录。
 */
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux')); // \foo\bar\baz\asdf\quux
console.log(path.join('a', 'b', 'c', 'd')); // a\b\c\d
```

- path.normalize(path)

```ts
/**
 * 规范化指定的 path，并处理 '..' 和 '.' 片段。
 */
console.log(path.normalize('/foo/bar//baz/asdf/quux/..')); // \foo\bar\baz\asdf
```

- path.parse(path)

```ts
/**
 * 返回一个对象，其中对象的属性表示 path 的元素。
 * dir <string>
 * root <string>
 * base <string>
 * name <string>
 * ext <string>
 */
console.log(path.parse('/home/user/dir/file.txt'));

// {
// root: '/',
// dir: '/home/user/dir',
// base: 'file.txt',
// ext: '.txt',
// name: 'file'
// }
```

- path.relative(from, to)

```ts
/**
 * 返回从 from 到 to 的相对路径（基于当前工作目录）。
 * 如果 from 或 to 传入长度为零的字符串，则使用当前工作目录代替长度为零的字符串。
 * 如果 from 和 to 解析到同一路径（调用 path.resolve()），则返回一个长度为零的字符串。
 * console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')); // ..\..\impl\bbb
 */
```

- path.resolve([...paths])

```ts
/**
 * 将路径或路径片段的序列处理成绝对路径。
 */
console.log(path.resolve('./foo/bar')); // C:\Users\admin\Desktop\ng5 测试\项目测试\node-server\test\foo\bar
console.log(path.resolve('/foo/bar', './baz')); // C:\foo\bar\baz
console.log(path.resolve('/foo/bar', '/tmp/file/')); // C:\tmp\file
console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')); // \Users\admin\Desktop\ng5 测试\项目测试\node-server\test\wwwroot\static_files\gif\image.gif
```

- path.sep

```ts
/**
 * 返回平台特定的路径片段分隔符：
 */
console.log(path.sep); // \
'foo/bar/baz'.split(path.sep); // 返回: ['foo', 'bar', 'baz']
```

- path.toNamespacedPath(path)

```ts
/**
 * 返回 path 的带命名空间前缀的路径，仅支持 Window 系统。
 */
```

- path.win32

```ts
/**
 * 返回为 Windows 实现的 path 方法。
 */
```

- 单词

```pug
delimiter 定界符
normalize 使正常化 使标准化
parse 解析
POSIX 可移植性操作系统接口
```
