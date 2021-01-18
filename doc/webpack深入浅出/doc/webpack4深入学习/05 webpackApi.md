# webpack API

## 命令行接口(command line interface)

- 基本用法

```js
// 使用配置文件
webpack --config webpack.config.js
// 不使用配置文件
webpack src/index.js dist/bundle.js
// 在命令行中定义多个入口文件
webpack index=./src/index.js entry2=./src/index2.js dist/bundle.js
// 列出所有的可配置项
webpack --help
webpack -h
// 以 JSON 格式输出 webpack 的运行结果 部分可视化分析工具可能会用到
webpack --json
webpack --json > stats.json
```

- 环境选项

```js

// 设置 env.production == true
webpack --env.production
// 设置 env.platform == "web"
webpack --env.platform=web

// 详细配置 及 输出的环境变量结果
webpack --env prod  "prod"
webpack --env.prod  { prod: true }
webpack --env.prod=1  { prod: 1 }
webpack --env.prod=foo  { prod: "foo" }
webpack --env.prod --env.min  { prod: true, min: true }
webpack --env.prod --env min  [{ prod: true }, "min"]
webpack --env.prod=foo --env.prod=bar  {prod: [ "foo", "bar" ]}
```

- 配置选项

```js
// 配置文件的路径
// 默认值是webpack.config.js 或 webpackfile.js
--config;

// 在 webpack 配置文件加载前先预加载一个或多个模块 输入类型为一个数组
--config - register, -r;

// 要使用的配置名称
--config - name;

// 当配置文件是一个函数时，会将环境变量传给这个函数
--env;

// 用到的模式，"development" 或 "production" 之中的一个
--mode;
```

- 输出配置

```js
// 输出的附带 chunk 的文件名
--output-chunk-filename

// 打包文件的文件名
--output-filename

// 加载 chunk 时使用的 JSONP 函数名 默认值是webpackJsonp
--output-jsonp-function

// 以库的形式导出入口文件
--output-library

// 以库的形式导出入口文件时，输出的类型 默认值是var
--output-library-target

// 输出的路径（在公共路径的基础上） 默认是当前目录
--output-path

// 加入一些依赖信息的注解
--output-pathinfo

// The 输出文件时使用的公共路径
--output-public-path

// 生成的 SourceMap 的文件名
--output-source-map-filename
```

- Debug 配置

```js
// 把 loader 设置为 debug 模式
--debug;

// 为打包好的资源定义 [source map 的类型]
--devtool;

// 打印出编译进度的百分比值
--progress;

// 展示错误细节
--display - error - details;
```

- 模块配置

```js
// 为 loader 绑定一个扩展
// 用法 --module-bind js=babel-loader
--module - bind;

// 为 post loader 绑定一个扩展
--module - bind - post;

// 为 pre loader 绑定一个扩展
--module - bind - pre;
```

- Watch 配置

```js
// 观察文件系统的变化
--watch, -w;
// 指定一个毫秒数，在这个时间内，文件若发送了多次变化，会被合并
--watch - aggregate - timeout;
// 轮询观察文件变化的时间间隔（同时会打开轮询机制）
--watch - poll;
// 当 stdin 关闭时，退出进程
--watch - stdin, --stdin;
```

- 性能优化配置

```js
// 限制 chunk 的数量
--optimize - max - chunks;

// 限制 chunk 的最小体积
--optimize - min - chunk - size;

// 压缩混淆 javascript，并且把 loader 设置为 minimizing
--optimize - minimize;
```

- Resolve 配置

```js
// 指定模块的别名
--resolve - alias;
// 指定需要被处理的文件的扩展名
--resolve - extensions;
// loader的别名
--resolve - loader - alias;
```

- 统计数据配置

```js
// 开启/关闭控制台的颜色 [默认值：(supports-color)]
--color, --colors;
// 选择显示预设(verbose - 繁琐, detailed - 细节, normal - 正常, minimal - 最小, errors-only - 仅错误, none - 无; 从 webpack 3.0.0 开始)
--display;
// 在输出中显示缓存的模块
--display - cached;
// 在输出中显示缓存的 assets
--display - cached - assets;
// 在输出中显示 chunks
--display - chunks;
// 显示从入口起点到每个模块的距离
--display - depth;
// 在输出中显示入口文件
--display - entrypoints;
// 显示详细的错误信息
--display - error - details;
// 在输出中显示被排除的文件
--display - exclude;
// 设置输出中可见模块的最大数量
--display - max - modules;
// 在输出中显示所有模块，包括被排除的模块
--display - modules;
// 作用域提升回退触发器(Scope hoisting fallback trigger)（从 webpack 3.0.0 开始）
--display - optimization - bailout;
// 在输出中显示最初的 chunk
--display - origins;
// 显示有关从模块导出的信息
--display - provided - exports;
// 显示模块包含在输出中的原因
--display - reasons;
// 显示模块中被使用的接口（Tree Shaking）
--display - used - exports;
// 隐藏关于模块的信息
--hide - modules;
// 对 assets 列表以某种属性排序
--sort - assets - by;
// 对 chunks 列表以某种属性排序
--sort - chunks - by;
// 对模块列表以某种属性排序
--sort - modules - by;
// 显示更多信息
--verbose;
```

- 高级配置

```js
// 一旦发生错误，立即终止
--bail;
// 开启缓存 [watch 时会默认打开]
--cache;
// 定义 bundle 中的任意自由变量，查看 shimming
--define;
// 开启模块热替换
--hot;
// 开启模块标签 [使用 LabeledModulesPlugin]
--labeled - modules;
// 加载某个插件
--plugin;
// 预加载某个文件
--prefetch;
// 在所有模块中将这些模块提供为自由变量，查看 shimming
--provide;
// 记录文件的路径（读取）
--records - input - path;
// 记录文件的路径（写入）
--records - output - path;
// 记录文件的路径
--records - path;
// 目标的执行环境
--target;
```

- 简写

```js
// -d
--debug --devtool cheap-module-eval-source-map --output-pathinfo
// -p
--optimize-minimize --define process.env.NODE_ENV="production", see building for production
```

## 包含统计数据的文件(stats data)

- 生成统计文件

```js
// 生成包含有关于模块的统计数据的 JSON 文件
webpack --profile --json > compilation-stats.json
```

- 统计文件的结构

```js
{
  "version": "1.4.13", // 用来编译的 webpack 的版本
  "hash": "11593e3b3ac85436984a", // 编译使用的 hash
  "time": 2469, // 编译耗时 (ms)
  "filteredModules": 0, // 当 `exclude`传入`toJson` 函数时，统计被无视的模块的数量
  "outputPath": "/", // path to webpack 输出目录的 path 路径
  "assetsByChunkName": {
    // 用作映射的 chunk 的名称
    "main": "web.js?h=11593e3b3ac85436984a",
    "named-chunk": "named-chunk.web.js",
    "other-chunk": [
      "other-chunk.js",
      "other-chunk.css"
    ]
  },
  "assets": [
    // asset 对象 (asset objects) 的数组
  ],
  "chunks": [
    // chunk 对象 (chunk objects) 的数组
  ],
  "modules": [
    // 模块对象 (module objects) 的数组
  ],
  "errors": [
    // 错误字符串 (error string) 的数组
  ],
  "warnings": [
    // 警告字符串 (warning string) 的数组
  ]
}
```

- Asset 对象 (Asset Objects)

```js
{
  "chunkNames": [], // 这个 asset 包含的 chunk
  "chunks": [ 10, 6 ], // 这个 asset 包含的 chunk 的 id
  "emitted": true, // 表示这个 asset 是否会让它输出到 output 目录
  "name": "10.web.js", // 输出的文件名
  "size": 1058 // 文件的大小
}
```

- Chunk 对象 (Chunk Objects)

```js
{
  "entry": true, // 表示这个 chunk 是否包含 webpack 的运行时
  "files": [
    // 一个包含这个 chunk 的文件名的数组
  ],
  "filteredModules": 0, // 见上文的 结构
  "id": 0, // 这个 chunk 的id
  "initial": true, // 表示这个 chunk 是开始就要加载还是 懒加载(lazy-loading)
  "modules": [
    // 模块对象 (module objects)的数组
    "web.js?h=11593e3b3ac85436984a"
  ],
  "names": [
    // 包含在这个 chunk 内的 chunk 的名字的数组
  ],
  "origins": [
    // 下文详述
  ],
  "parents": [], // 父 chunk 的 ids
  "rendered": true, // 表示这个 chunk 是否会参与进编译
  "size": 188057 // chunk 的大小(byte)
}

// chunks 对象还会包含一个 来源 (origins)
{
  "loc": "", // 具体是哪行生成了这个chunk
  "module": "(webpack)\\test\\browsertest\\lib\\index.web.js", // 模块的位置
  "moduleId": 0, // 模块的ID
  "moduleIdentifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // 模块的地址
  "moduleName": "./lib/index.web.js", // 模块的相对地址
  "name": "main", // chunk的名称
  "reasons": [
    // 模块对象中`reason`的数组
  ]
}
```

- 模块对象 (Module Objects)

```js
// 每一个在依赖图表中的模块都可以表示成以下的形式。
{
  "assets": [
    // asset对象 (asset objects)的数组
  ],
  "built": true, // 表示这个模块会参与 Loaders , 解析, 并被编译
  "cacheable": true, // 表示这个模块是否会被缓存
  "chunks": [
    // 包含这个模块的 chunks 的 id
  ],
  "errors": 0, // 处理这个模块发现的错误的数量
  "failed": false, // 编译是否失败
  "id": 0, // 这个模块的ID (类似于 `module.id`)
  "identifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // webpack内部使用的唯一的标识
  "name": "./lib/index.web.js", // 实际文件的地址
  "optional": false, // 每一个对这个模块的请求都会包裹在 `try... catch` 内 (与ESM无关)
  "prefetched": false, // 表示这个模块是否会被 prefetched
  "profile": {
    // 有关 `--profile` flag 的这个模块特有的编译数据 (ms)
    "building": 73, // 载入和解析
    "dependencies": 242, // 编译依赖
    "factory": 11 // 解决依赖
  },
  "reasons": [
    // 见下文描述
  ],
  "size": 3593, // 预估模块的大小 (byte)
  "source": "// Should not break it...\r\nif(typeof...", // 字符串化的输入
  "warnings": 0 // 处理模块时警告的数量
}

// 理由 (reasons) 对象，这个对象描述了这个模块被加入依赖图表的理由
{
  "loc": "33:24-93", // 导致这个被加入依赖图标的代码行数
  "module": "./lib/index.web.js", // 所基于模块的相对地址 context
  "moduleId": 0, // 模块的 ID
  "moduleIdentifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // 模块的地址
  "moduleName": "./lib/index.web.js", // 可读性更好的模块名称 (用于 "更好的打印 (pretty-printing)")
  "type": "require.context", // 使用的请求的种类 (type of request)
  "userRequest": "../../cases" // 用来 `import` 或者 `require` 的源字符串
}
```

- 错误与警告

```js
// 错误 (errors) 和 警告 (warnings) 会包含一个字符串数组。每个字符串包含了信息和栈的追溯:
// 需要注意的是，当 错误详情为false(errorDetails:false)传入toJson函数时，对栈的追溯就不会被显示。
// 错误详情(errorDetils) 默认值为 true
../cases/parsing/browserify/index.js
Critical dependencies:
2:114-121 This seem to be a pre-built javascript file. Even while this is possible, it's not recommended. Try to require to orginal source to get better results.
 @ ../cases/parsing/browserify/index.js 2:114-121
```

## Node.js API

- 使用场景

```js
// 需要自定义构建或开发流程时
// 所有的报告和错误处理都必须自行实现
// webpack 仅仅负责编译的部分
// stats 配置选项不会在 webpack() 调用中生效。
```

- 安装及使用

```js
// 安装
npm install --save-dev webpack
// 导入
const webpack = require("webpack");

// 或者如果你喜欢 ES2015:
import webpack from "webpack";

// 使用webpack()
// 导入的 webpack 函数需要传入一个 webpack 配置对象，当同时传入回调函数时就会执行 webpack compiler
// err 对象只会包含 webpack 相关的问题，比如配置错误等
// 编译错误不在 err 对象内，而是需要使用 stats.hasErrors() 单独处理
const webpack = require("webpack");

webpack({
  // 配置对象
}, (err, stats) => {
  if (err || stats.hasErrors()) {
    // 在这里处理错误
  }
  // 处理完成
});
```

- Compiler 实例(Compiler Instance)

```js
// 如果你不向 webpack 执行函数传入回调函数，就会得到一个 webpack Compiler 实例。
// Compiler 实例提供了以下方法:
// .run(callback)
// .watch(watchOptions, handler);

// Compiler 实例上的 hooks 属性，用于将一个插件，注册到 Compiler 的生命周期中的所有钩子事件上。
// 这个 API 一次只支持一个并发编译。当使用 run 时，会等待它完成后，然后才能再次调用 run 或 watch。
// 当使用 watch 时，调用 close，等待它完成后，然后才能再次调用 run 或 watch。多个并发编译会损坏输出文件。
```

- run

```js
// run 方法用于触发所有编译时工作。完成之后，执行给定的 callback 函数。
// 最终记录下来的概括信息(stats)和错误(errors)，应该在这个 callback 函数中获取。
const webpack = require('webpack');

const compiler = webpack({
  // 配置对象
});

compiler.run((err, stats) => {
  // ...
});
```

- 监听(watching)

```js
const webpack = require('webpack');

const compiler = webpack({
  // 配置对象
});

const watching = compiler.watch(
  {
    // watchOptions 示例
    aggregateTimeout: 300,
    poll: undefined
  },
  (err, stats) => {
    // 在这里打印 watch/build 结果...
    console.log(stats);
  }
);
```

- 关闭 Watching(Close Watching)

```js
// watch 方法返回一个 Watching 实例，它会暴露一个 .close(callback) 方法。调用该方法将会结束监听：
// 不允许在当前监听器已经关闭或失效前再次监听或执行。
watching.close(() => {
  console.log('Watching Ended.');
});
```

- 作废 Watching(Invalidate Watching)

```js
// 你可以手动使当前编译循环(compiling round)无效
watching.invalidate();
```

- Stats 对象(Stats Object)

```js
// 可以通过它获取到代码编译过程中的有用信息，包括：
// 错误和警告（如果有的话）
// 计时信息
// module 和 chunk 信息

// stats 对象暴露了以下方法：

// 可以用来检查编译期是否有错误，返回 true 或 false
stats.hasErrors();
// 可以用来检查编译期是否有警告，返回 true 或 false。
stats.hasWarnings();
// 以 JSON 对象形式返回编译信息。options 可以是一个字符串（预设值）或是颗粒化控制的对象：
stats.toJson(options);
stats.toJson('minimal'); // 更多选项如: "verbose" 等.
stats.toJson({
  assets: false,
  hash: true
});
// 以格式化的字符串形式返回描述编译信息
// 配置对象与 stats.toJson(options) 一致，除了额外增加的一个选项：
stats.toString(options);
stats.toString({
  // 增加控制台颜色开关
  colors: true
});

// 下面是 stats.toString() 用法的示例：
const webpack = require('webpack');

webpack(
  {
    // 配置对象
  },
  (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(
      stats.toString({
        chunks: false, // 使构建过程更静默无输出
        colors: true // 在控制台展示颜色
      })
    );
  }
);
```

- MultiCompiler

```js
// MultiCompiler 模块可以让 webpack 在单个 compiler 中执行多个配置。
// 多个配置对象在执行时，不会并行执行。每个配置都只会在前一个处理结束后，才进行处理。
// 想要并行处理，你可以使用第三方解决方案，例如 parallel-webpack。
var webpack = require('webpack');

webpack(
  [
    { entry: './index1.js', output: { filename: 'bundle1.js' } },
    { entry: './index2.js', output: { filename: 'bundle2.js' } }
  ],
  (err, stats) => {
    process.stdout.write(stats.toString() + '\n');
  }
);
```

- 错误处理(error handling)

```js
// 致命的 wepback 错误（配置出错等）
// 编译错误（缺失的 module，语法错误等）
// 编译警告
const webpack = require('webpack');

webpack(
  {
    // 配置对象
  },
  (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    // 记录结果...
  }
);
```

- 自定义文件系统(Custom File Systems)

```js
// 可以使用 memory-fs 替换默认的 outputFileSystem，以将文件写入到内存中，而不是写入到磁盘：
// 可以改变 inputFileSystem 或 outputFileSystem
// 被 webpack-dev-server 及众多其他包依赖的 webpack-dev-middleware 就是通过这种方式，将你的文件神秘地隐藏起来，但却仍然可以用它们为浏览器提供服务
const MemoryFS = require('memory-fs');
const webpack = require('webpack');

const fs = new MemoryFS();
const compiler = webpack({
  /* options*/
});

compiler.outputFileSystem = fs;
compiler.run((err, stats) => {
  // 之后读取输出：
  const content = fs.readFileSync('...');
});
```

## 模块热替换(hot module replacement)

- 使用

```js
// 用了模块热替换(Hot Module Replacement)，则它的接口将被暴露在 module.hot 属性下面。
// 通常，用户先要检查这个接口是否可访问，然后再开始使用它。
if (module.hot) {
  module.hot.accept('./library.js', function() {
    // 使用更新过的 library 模块执行某些操作...
  });
}
```

- accept

```js
// 接受(accept)给定依赖模块的更新，并触发一个 回调函数 来对这些更新做出响应。
module.hot.accept(
  dependencies, // 可以是一个字符串或字符串数组
  callback // 用于在模块更新后触发的函数
);
```

- decline

```js
// 拒绝给定依赖模块的更新，使用 'decline' 方法强制更新失败
module.hot.decline(
  dependencies // 可以是一个字符串或字符串数组
);
```

- dispose（或 addDisposeHandler）

```js
// 添加一个处理函数，在当前模块代码被替换时执行。
// 如果要将状态传入到更新过的模块，请添加给定 data 参数
module.hot.dispose(data => {
  // 清理并将 data 传递到更新后的模块……
});
```

- removeDisposeHandler

```js
// 删除由 dispose 或 addDisposeHandler 添加的回调函数
module.hot.removeDisposeHandler(callback);
```

- status

```js
// 取得模块热替换进程的当前状态。
// module.hot.status() // 返回以下字符串之一……
// idle 该进程正在等待调用 check（见下文）
// check 该进程正在检查以更新
// prepare 该进程正在准备更新（例如，下载已更新的模块）
// ready 此更新已准备并可用
// dispose 该进程正在调用将被替换模块的 dispose 处理函数
// apply 该进程正在调用 accept 处理函数，并重新执行自我接受(self-accepted)的模块
// abort 更新已中止，但系统仍处于之前的状态
// fail 更新已抛出异常，系统状态已被破坏
```

- check

```js
// 测试所有加载的模块以进行更新，如果有更新，则应用它们
// autoApply 参数可以是布尔值，也可以是 options，当被调用时可以传递给 apply 方法
module.hot
  .check(autoApply)
  .then(outdatedModules => {
    // 超时的模块……
  })
  .catch(error => {
    // 捕获错误
  });
```

- apply

```js
// 继续更新进程（只要 module.hot.status() === 'ready'）
module.hot.apply(options).then(outdatedModules => {
  // 超时的模块……
}).catch(error => {
  // 捕获错误
});

// options
{
  type: "self-declined" | "declined" |
        "unaccepted" | "accepted" |
        "disposed" | "accept-errored" |
        "self-accept-errored" | "self-accept-error-handler-errored",
  moduleId: 4, // The module in question.
  dependencyId: 3, // For errors: the module id owning the accept handler.
  chain: [1, 2, 3, 4], // For declined/accepted/unaccepted: the chain from where the update was propagated.
  parentId: 5, // For declined: the module id of the declining parent
  outdatedModules: [1, 2, 3, 4], // For accepted: the modules that are outdated and will be disposed
  outdatedDependencies: { // For accepted: The location of accept handlers that will handle the update
    5: [4]
  },
  error: new Error(...), // For errors: the thrown error
  originalError: new Error(...) // For self-accept-error-handler-errored:
                                // the error thrown by the module before the error handler tried to handle it.
}
```

- addStatusHandler

```js
// 注册一个函数来监听 status的变化
module.hot.addStatusHandler(status => {
  // 响应当前状态……
});
```

- removeStatusHandler

```js
// 移除一个注册的状态处理函数。
module.hot.removeStatusHandler(callback);
```

## loader API

- 何为 loader

```js
// 所谓 loader 只是一个导出为函数的 JavaScript 模块
// loader runner 会调用这个函数，然后把上一个 loader 产生的结果或者资源文件(resource file)传入进去。
// 如果是单个处理结果，可以在同步模式中直接返回。
// 如果有多个处理结果，则必须调用 this.callback()

// 在异步模式中，必须调用 this.async()，来指示 loader runner 等待异步结果，
// 它会返回 this.callback() 回调函数，随后 loader 必须返回 undefined 并且调用该回调函数。
```

## 模块方法(module methods)

- ES6（推荐）

```js
// webpack 2 支持原生的 ES6 模块语法
// 你可以无须额外引入 babel 这样的工具，就可以使用 import 和 export

// - import
import MyModule from './my-module.js';
import { NamedExport } from './other-module.js';

// - export
// 具名导出
export var Count = 5;
export function Multiply(a, b) {
  return a * b;
}

// 默认导出
export default {
  // Some data...
};

// - import()
// 动态地加载模块
// 调用 import() 之处，被作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中。
if (module.hot) {
  import('lodash').then(_ => {
    // Do something with lodash (a.k.a '_')...
  });
}

// webpack 中可以通过注释接收一些特殊的参数，而无须破坏规定：
import(
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  'module'
);

// 调用 import() 时，包含在其中的动态表达式 request，会潜在的请求的每个模块
// 例如，import(`./locale/${language}.json`) 会导致 ./locale 目录下的每个 .json 文件，都被打包到新的 chunk 中。
```

## CommonJS

```js
// - require
require(dependency: String)

var $ = require("jquery");
var myModule = require("my-module");

// - require.resolve
// 以同步的方式获取模块的 ID
// webpack 中模块 ID 是一个数字（而在 NodeJS 中是一个字符串 -- 也就是文件名）
require.resolve(dependency: String)

// - require.cache
// 多处引用同一个模块，最终只会产生一次模块执行和一次导出。
// 会在运行时(runtime)中会保存一份缓存。删除此缓存，会产生新的模块执行和新的导出。
var d1 = require("dependency");
require("dependency") === d1
delete require.cache[require.resolve("dependency")];
require("dependency") !== d1

// in file.js
require.cache[module.id] === module
require("./file.js") === module.exports
delete require.cache[module.id];
require.cache[module.id] === undefined
require("./file.js") !== module.exports // 这是理论上的操作不相等；在实际运行中，会导致栈溢出
require.cache[module.id] !== module

// - equire.ensure() 是 webpack 特有的，已经被 import() 取代。
// 当使用 CommonJS 模块语法时，这是动态加载依赖的唯一方法。
var a = require('normal-dep');

if ( module.hot ) {
  require.ensure(['b'], function(require) {
    var c = require('c');

    // Do something special...
  });
}
```

## AMD

```js
// - define（通过 factory 方法导出）
// 此 define 导出方式不能在异步函数中调用。
define(['jquery', 'my-module'], function($, myModule) {
  // 使用 $ 和 myModule 做一些操作……

  // 导出一个函数
  return function doSomething() {
    // ...
  };
});

// - define（通过 value 导出）
// 只会将提供的 value 导出。这里的 value 可以是除函数外的任何值。
define({
  answer: 42
});
```

- require（AMD 版本）

```js
require(['b'], function(b) {
  var c = require('c');
});
```

## 标签模块(Labeled Modules)

```js
// webpack 内置的 LabeledModulesPlugin 插件，允许使用下面的方法导出和导入模块
// - export 标签
export: var answer = 42;
export: function method(value) {
  // 做一些操作……
};

// - require 标签
// CommonJS 或 AMD 模块无法通过这种方式，使用标签模块的导出。
export: var answer = 42;
export: function method(value) {
  // 执行一些操作……
};

require: 'some-dependency';
console.log(answer);
method(...);
```

## webpack

```js
// webpack 除了支持上述的语法之外，还可以使用一些 webpack 特定的方法
```

- require.context

```js
// 更细粒度的控制模块引入
var context = require.context('components', true, /\.html$/);
var componentA = context.resolve('componentA');
```

- require.include

```js
// 引入一个不需要执行的依赖，这可以用于优化输出 chunk 中的依赖模块的位置。
// 如果不使用 require.include('a')，输出的两个匿名 chunk 都有模块 a。
require.include('a');
require.ensure(['a', 'b'], function(require) {});
require.ensure(['a', 'c'], function(require) {});
```

- require.resolveWeak

```js
// 与 require.resolve 类似，但是这不会将 module 引入到 bundle 中。这就是所谓的"弱(weak)"依赖。
// 它与 import() 一起使用，当用户导航触发额外的导入时，它会被接管。
if (__webpack_modules__[require.resolveWeak('module')]) {
  // 模块可用时，执行一些操作……
}
if (require.cache[require.resolveWeak('module')]) {
  // 在模块被加载之前，执行一些操作……
}

// 你可以像执行其他 require/import 方法一样，
// 执行动态解析（“上下文”）。
const page = 'Foo';
__webpack_modules__[require.resolveWeak(`./page/${page}`)];
```

## 模块变量(module variables)

```js
// 使用 webpack 编译的代码中所有的变量。模块将通过 module 和其他变量，来访问编译过程中的某些数据。
```

- module.loaded(NodeJS);

```js
// false 表示该模块正在执行， true 表示同步执行已经完成。
```

- module.hot (webpack 特有变量)

```js
// 表示 模块热替换(Hot Module Replacement) 是否启用，并给进程提供一个接口。
```

- module.id (CommonJS)

```js
// 当前模块的 ID。
module.id === require.resolve('./file.js');
```

- module.exports (CommonJS)

```js
// 调用者通过 require 对模块进行调用时返回的值（默认为一个新对象）。
module.exports = function doSomething() {
  // 做一些操作……
};
```

- exports (CommonJS)

```js
// 该变量默认值为 module.exports（即一个对象）。 如果 module.exports 被重写的话， exports 不再会被导出。
exports.someValue = 42;
exports.anObject = {
  x: 123
};
exports.aFunction = function doSomething() {
  // Do something
};
```

- global (NodeJS)
- process (NodeJS)
- \_\_dirname (NodeJS)
- \_\_filename (NodeJS)

- \_\_resourceQuery (webpack 特有变量)

```js
// 当前模块的资源查询(resource query)
// 如果进行了如下的 reqiure 调用，那么查询字符串(query string)在file.js 中可访问。
require('file.js?test');
// file.js
__resourceQuery === '?test';
```

- **webpack_public_path** (webpack 特有变量)

```js
// 等同于 output.publicPath 配置选项.
```

- **webpack_require** (webpack 特有变量)

```js
// 原始 require 函数。这个表达式不会被解析器解析为依赖。
```

- **webpack_chunk_load** (webpack 特有变量)

```js
// 内部 chunk 载入函数，有两个输入参数：

// chunkId 需要载入的 chunk id。
// callback(require) chunk 载入后调用的回调函数。
```

- **webpack_modules** (webpack 特有变量)

```js
// 访问所有模块的内部对象
```

- **webpack_hash** (webpack 特有变量)

```js
// 这个变量只有在启用 HotModuleReplacementPlugin 或者 ExtendedAPIPlugin 时才生效。
// 这个变量提供对编译过程中(compilation)的 hash 信息的获取。
```

- **non_webpack_require** (webpack 特有变量)

```js
// 生成一个不会被 webpack 解析的 require 函数。
// 配合全局可以获取到的 require 函数，可以完成一些酷炫操作。
```

- DEBUG (webpack 特有变量)

```js
// 等同于配置选项中的 debug。
```
