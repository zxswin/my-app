# 编写一个 loader

## loader 是什么

```js
// 所谓 loader 只是一个导出为函数的 JavaScript 模块。
// loader runner 会调用这个函数，然后把上一个 loader 产生的结果或者资源文件(resource file)传入进去。
```

## 编写一个简单的 loader

- 配置文件 webpack.loader.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // 先设置为development，不压缩代码，方便调试
  devtool: 'inline-source-map',
  entry: {
    main: './src/loader.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
          options: {
            name: 'echo'
          }
        }
      }
    ]
  },
  plugins: [
    // 处理index.html模块文件,未指定的时候会自动生成
    new HtmlWebpackPlugin({
      title: 'loader的开发'
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

- 测试用入口文件

```js
console.log('hello, world');
```

- loader 文件 replaceLoader.js

```js
// 效果为把world字符替换为配置中设置的echo
// this loader 上下文 由webpack对象填充
// this.version 显示loader API的版本
// this.context 模块所在的目录
// this.request 被解析出来的 request 字符串。

// this.callback 一个可以同步或者异步调用的可以返回多个结果的函数。
// 预期参数
// this.callback(
//   err: Error | null, 第一个参数必须是 Error 或者 null
//   content: string | Buffer, 第二个参数是一个 string 或者 Buffer
//   sourceMap?: SourceMap, 可选的：第三个参数必须是一个可以被这个模块解析的 source map
//   meta?: any 可选的：第四个选项，会被 webpack 忽略，可以是任何东西（例如一些元数据）
// );

// this.async
// 告诉 loader-runner 这个 loader 将会异步地回调。返回 this.callback

// this.data 在 pitch 阶段和正常阶段之间共享的 data 对象

// this.cacheable 设置是否可缓存标志的函数
// cacheable(flag = true: boolean)

// this.loaders
// 所有 loader 组成的数组。它在 pitch 阶段的时候是可以写入的。
// loaders = [{request: string, path: string, query: string, module: function}]
// [
//   {
//     request: "/abc/loader1.js?xyz",
//     path: "/abc/loader1.js",
//     query: "?xyz",
//     module: [Function]
//   },
//   {
//     request: "/abc/node_modules/loader2/index.js",
//     path: "/abc/node_modules/loader2/index.js",
//     query: "",
//     module: [Function]
//   }
// ]

// this.loaderIndex 当前 loader 在 loader 数组中的索引

// this.resource  request 中的资源部分，包括 query 参数
// 在我们的示例中："/abc/resource.js?rrr"

// this.resourcePath 资源文件的路径。
// /abc/resource.js

// this.resourceQuery 资源的 query 参数
// "?rrr"

// this.fs
// 用于访问 compilation 的 inputFileSystem 属性。

// 所以此处不能使用箭头函数 箭头函数的this对象在函数定义的时候就已经确定(指向当前作用域中的this)
// loader-utils 插件中的getOptions()方法用于获取loader的参数设置
// this.callback 以同步地返回转换后的 content 内容
const loaderUtils = require('loader-utils');

module.exports = function(source) {
  const options = loaderUtils.getOptions(this);
  const result = source.replace('world', options.name);
  // return result; 可以直接return 但是推荐使用this.callback(比较灵活可以传递多个参数)
  this.callback(null, result);
};
```

## loader 中编写异步代码

- 配置文件 webpack.loader.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // 先设置为development，不压缩代码，方便调试
  devtool: 'inline-source-map',
  entry: {
    main: './src/loader.js'
  },
  resolveLoader: {
    // 会依次在node_modules、loaders文件夹中查找是否存在对应loader
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'replaceLoader.js'
          },
          {
            loader: 'replaceLoaderAsync.js',
            options: {
              name: 'echo'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 处理index.html模块文件,未指定的时候会自动生成
    new HtmlWebpackPlugin({
      title: 'loader的开发'
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

- replaceLoader.js 同步 loader 的编写

```js
module.exports = function(source) {
  const result = source.replace('echo', 'world');
  this.callback(null, result);
};
```

- replaceLoaderAsync.js 异步 loader 的编写

```js
// 先调用异步loader，将world改为echo
// 之后再调用同步loader将echo改为world
// 在异步模式中，必须调用 this.async()，来指示 loader runner 等待异步结果

const loaderUtils = require('loader-utils');

module.exports = function(source) {
  const options = loaderUtils.getOptions(this);
  const callback = this.async();

  setTimeout(() => {
    const result = source.replace('world', options.name);
    callback(null, result);
  }, 1000);
};
```

## this.addDependency

```js
// 加入一个文件作为产生 loader 结果的依赖，使它们的任何变化可以被监听到。
// 例如，html-loader 当它发现 src 和 src-set 属性时，就会把这些属性上的 url 加入到被解析的 html 文件的依赖中。
addDependency(file: string)
dependency(file: string) // 简写


import path from 'path';

export default function(source) {
  var callback = this.async();
  var headerPath = path.resolve('header.js');

  this.addDependency(headerPath);

  fs.readFile(headerPath, 'utf-8', function(err, header) {
    if(err) return callback(err);
    callback(null, header + "\n" + source);
  });
};
```

## 其他

```js
// module.exports.raw = true;
// module.exports.pitch

// 根据模块类型，可能会有不同的模式指定依赖关系
// 通过把它们转化成 require 语句
// 使用 this.resolve 函数解析路径

// 同等依赖
// npm 和 yarn 安装依赖（包）时不会自动安装 peer dependence（虽然很旧的 npm 是会自动安装的，但几乎没人用那么旧的了）
"peerDependencies": {
  "node-sass": "^4.0.0"
}


// 这样就指定了webpack-plugin-a@1.0.0只兼容webpack@2.x.x，
//安装webpack-plugin-a@1.0.0必须同时安装webpack@2.x.x，
// 当用户同时安装webpack@3.0.0和webpack-plugin-a@1.0.0的时候就会抛出：

"peerDependencies": {
  "webpack": "^2.0.0"
}
```
