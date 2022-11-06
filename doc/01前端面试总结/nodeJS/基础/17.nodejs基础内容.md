## nodejs 基础内容

- 常用的命令行指令

```ts
// 1.set  #查看系统环境变量
// 2.echo  %变量名%  #查看变量值
// 3.set 变量=值 #设置环境变量
// .exit #退出
```

- 从全局开始

```ts
/**
 * 1.全局对象 - global
 * 类似浏览器全局对象 window 但是 node 环境中没有 window 的
 * 本质上浏览器的 window 其实就是扩展自 ECMAScript 中的 global
 *
 * console 对象
 * __dirname
 * __filename
 * setTimeout()
 * clearTimeout()
 * setInterval()
 * clearInterval()
 * setImmediate()
 * clearImmediate()
 *
 * module
 * exports
 * require()
 * process
 * Buffer
 */
```

- EventLoop 事件循环

```ts
/**
 * 1.Timer 阶段 处理所有 setTimeout 和 setInterval 的回调
 * 2.Pending I/O Callback
 * 执行 I/O 回调 文件操作 网络操作等
 * 3.Idle,Prepare 内部使用
 * 4.Poll
 * 轮循 I/O 操作 是否有 I/O callback 如果没有就会阻塞(超时和基本检测)一段时间
 * 5.Check 只处理 setImmediate 的回到函数
 * 6.Close Callback
 * 专门处理一些 close 类型的回调 如关闭网络连接等
 */
process.nextTick();
setTimeout(); // clearTimeout()
setInterval(); //  clearInterval()
setImmediate(); // clearImmediate()
```

- 宏任务与微任务

```ts
/**
 * 同步代码(宏，微)
 *
 * 宏任务
 * 主体 script setTimeout setInterval
 *
 * 微任务
 * Promise.then process.nextTick
 */
```

- 模块化

```ts
/**
 * 模块加载采用的是同步模式
 * commentjs 规范 用于后端
 * CMD AMD 规范可以用于前端
 *
 * module 对象
 * id 当前模块的唯一标示 默认 id 为当前文件的绝对路径
 * filename 当前文件的名字
 * parent
 * children
 * loaded
 * paths
 *
 * exports
 * 每个模块文件中有一个 exports 对象
 * 在模块对象 module 下有一个属性 exports
 */
console.log(exports === module.exports); // true
// 这种写法导出会是一个空对象{}
exports = {
  a: 10,
  b: 100,
};
// 这种写法是可以正常导出的 推荐使用
module.exports = {
  a: 10,
  b: 100,
};

// 原理分析
var module = {
  exports: {},
};

var exports = moudle.exports;
exports.a = 1;
exports.b = 2;

exports = {}; // 把 exports 与 module.exports 的关系打断了
```

- 模块化 - 分类

```ts
/**
 * File Moudles
 * Folders as Modules
 * node_modules Folders
 * global folders
 * Core Modules
 */

// 当我们导入的模块是一个文件夹的时候 就会引入文件夹模块导入机制 默认导入 index.js 文件
let m1 = require('./m1');
// 如果希望默认引用的是 m1 文件夹里的其他 js 文件 可在文件夹中新增一个 package.json 的文件
// {
// "name":"m1" , // 也可以是其他名字不影响默认文件的引入
// ""main:"./1.js",
// }

// 当导入的是一个模块名称是一个文件夹的时候
// 1.读取文件夹下面的 package.json 的文件
// 2.读取 main 指定的文件
// 3.如果 package.json 文件不存在 默认自动导入 index.js 文件


// 如果我们导入的模块是在 node_modules 目录下的 又会有另外的一种规则
let m2 = require('m2');
console.log(m2);
// 非路径加载模式的模块查找规则
// 在 module 对象有一个属性 paths 是一个数组 里面保存的就是这中非路径加载模式需要查找的路径列表
// 如果自己定义的模块与核心模块冲突 默认加载核心模块


// 模块化 - 模块加载机制(后缀)
// 模块文件后缀处理机制
// 文件-js-json-node

// 使用 ES6 的 export 和 import 后缀名要是.mjs
// 1.mjs
import { a } from './2'; // 实际上利用的是对象的解构赋值
console.log(a);

// 2.mjs
export var a = 2;
export var obj = {
  name:'111',
}

export default 200;

import { * as m2 } from './2'; // 导出所有
import a from './2'; // 导入默认模块

// node --experimental-modules 1 在命令行窗口运行
```

## nodejs 基础

- 1.event EventEmitter 类

```ts
/**
 * EventEmitter 类
 * 1.emit(eventName[,..args])
 * 2.addListener(eventName,listerer)
 * 3.on('eventName,listener')
 * 4.off(eventName,listener)
 * 5.removeListener(eventName,listener)
 */
// 简单实例
const EventEmmiter = require('events'); // 引入事件对象

class Person extends EventEmmiter {
  // 继承了事件对象
  constructor(name) {
    super();
    this.name = name;
    this.age = 0;

    this.growup();
  }

  growup() {
    setInterval(() => {
      this.age++;
      this.emit('growup'); // 发射事件
    }, 1000);
  }
}

let p1 = new Person('333');
p1.addListener('growup', function () {
  // 对事件进行监听
  console.log('长大了一岁');
});
```

- Process

```ts
/**
 * Process 对象是一个全局对象 它提供当前 Node.js 进程的相关信息 以及控制当前 Nodejs 进程
 *
 * 使用
 * 全局对象 不需要 require
 * .argv // 打印的是一个数组
 * .env
 * .exit([code]) // 控制退出
 */

// 代码示例 argv
// node 2 -v
if (process.argv.includes('-v')) {
  console.log('v1.0.0');
}

//  代码示例 env
if (process.env.mode === 'dev') {
  console.log('开发模式');
} else {
  console.log('生产模式');
}

// 可以先设置系统环境变量 无需改变代码
// process.stdout 标准输出流
// .write(data[,encoding][,callback])
process.stdout.write('标准输出流');

// process.stdin 标准输入流
// 事件：'data'
process.stdin.on('data', () => {
  console.log('用户输入', data);
});

// 实例代码
var fs = require('fs');
process.stdout.write('请输入你的项目名称：');

process.stdin.on('data', (e) => {
  fs.mkdirSync(e.toString().replace('\r\n', '')); // 替换掉最后的换行回车符
  process.stdout.write('项目创建成功');
});
```

- 3.Stream 流

```ts
/**
 * 流是一种在 Node.js 中处理流式数据的抽象接口
 * stream 模块提供了一写基础的 API 用于构建实现了流接口的对象
 * Node.js 中许多的对象都是提供了流的实现：fs 文件操作 net dgram http https 等
 *
 * 流的基本类型
 * Writable - 可写入数据的流 例如 fs.createWriteStream();
 * Readable - 可读取数据的流 例如 fs.createReadStream();
 * Duplex - 可读又可写的流(例如 net.Socket);
 * Transform - 在读写过程中可以修改或转换数据类型
 * Duplex 流 例如 zlib.createDeflate();
 *
 *
 * 流的基本类型
 * 1.Writable 属性方法
 * .write() // 写入
 * .end() // 写入结束
 * .setDefaultEncoding() // 设置编码
 *
 * 2.Readable 属性方法
 * .setEncoding()
 * .read()
 * .pipe()
 * .pause()
 * .resume()
 */
```

- Buffer

```ts
/**
 * 用于操作二进制数据的类型
 * 类似数组 固定长度 只能操作二进制数据
 * Buffer 类是一个全局变量
 */
let bf1 = new Buffer(4); // 定义 Buffer 的长度
bf1[0] = 96; // 二进制值 转为了十六进制展示 60

let bf2 = new Buffer('miaov'); // 英文一个字符 占一个字节
let bf3 = new Buffer('苗位'); // 中文 utf-8 编码 一个字符占 3 个字节

let bf5 = Buffer.from('miaov');
let bf6 = Buffer.from('miaov');

bf5 == bf6; // false 比较的是引用地址
bf5.equals(bf6); // 比较值是否相等
```

- fs 模块

```ts
/**
 * write 写入
 * fs.writeFile(file,data,[,options],callback); // []表示参数是可选的
 */

// 代码示例 异步模式
// 如果文件不存在 则创建
// 如果目录不存在则创建文件失败
// First Error node 中的一种约定 如果一个回调可能有错误发生 那么约定回调函数的第一个参数专门用来提供错误对象
fs.writeFile('1.txt', 'miaov', (err) => {
  if (err) {
    console.log('文件写入失败');
  } else {
    console.log('文件写入成功');
  }
});

// 代码示例 同步模式
try {
  fs.writeFileSnyc('1.txt', 'miaov');
} catch (e) {
  console.log('写入失败');
}
```

- 文件的相关操作

```ts
// 创建文件夹 不会递归创建
fs.mkdirSync('./a/b/c');
// 删除文件夹 不能是非空文件夹
fs.rmdirSync('./a');

// 删除一非空文件夹 文件夹里还有文件夹 递归删除
var fs = require('fs');
rmdir('a');
function rmdir(dirPath) {
  let files = fs.readdirSync(dirPath); // 获取文件夹下面的所有文件
  console.log('files', files);
  files.forEach((child) => {
    let childPath = dirPath + '/' + child;
    // 当前的 child 可能是文件也可能是文件夹
    if (fs.statSync(childPath).isDirectory()) {
      rmdir(childPath);
    } else {
      // 删除每一个子文件
      fs.unlinkSync(childPath);
    }
  });
  fs.rmdirSync(dirPath);
}
```

- 文件监听

```ts
var fs = require('fs');

// 监听某个文件
fs.watchFile('./a/1.txt', (e) => {
  console.log('change');
  // e : 类似事件对象 保存当前变化的细节
  console.log('e', e); // 文件的详细信息
});

// 监听文件或目录
fs.watch('./a', (eventType, filename) => {
  // eventType : change rename
  // filename： 当前发生改变的具体文件
  console.log(eventType, filename);
});
```

## 项目案例 项目构建工具的创建

```ts
/**
 * usage: node miaov app -i
 * miaov : 我们的脚本文件
 * app: 要生成的项目名称
 * -i: 参数 表示要同时生成 index.html 文件
 */
const fs = require('fs');

// 获取用户要生成的项目名称 process

let appName = process.argv[2];

// 根据项目名称生成指定的文件目录
let appRoot = __dirname + '/' + appName;
if (fs.existsSync(appRoot)) {
  console.log('项目已经存在了,请不要重新创建');
  process.exit();
}

fs.mkdirSync(appRoot);
fs.mkdirSync(appRoot + '/images');
fs.mkdirSync(appRoot + '/css');
fs.mkdirSync(appRoot + '/js');

// 判断是否存在 -i 的选项
if (process.argv.includes('-i')) {
  fs.writeFileSync(
    appRoot + '/index.html',
    `

  <!DOCTYPE html>

    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>App</title>
    </head>

    <body>
    <h1> App </h1>
    </body>

    </html>

`
  );
}

console.log('项目创建成功');
```

- 命令行美好或操作的第三方框架

```ts
/**
 * commander
 * chalk
 * Inquirer.js
 */
```

- NPM 包管理工具

```ts
/**
 * 1.npm search <packageName>
 * 搜索条件
 * Popularity 流行度 下载次数
 * Quality 质量 稳定性 测试 依赖
 * Maintenance 维护等级 更新频率
 * Optimal 以上三点综合
 *
 * npm install jquery #安装 jquery
 * npm install @jquery2.2.2 #安装指定版本的包
 * npm ls #查看安装了那些依赖包
 * npm update #升级依赖包
 *  npm uninstall #删除依赖包
 */
```

- 发布自己的模块包

```ts
/**
 * package.json 文件 项目(模块,包)说明配置文件 该文件描述了当前包的信息
 * 只有拥有 package.json 文件的项目才可以被发布
 *
 * npm init / npm init --yes # 手动创建
 *
 *
 */

// 必须项目
// {
// 'name':'name-name-name',
// 'version':'1.0.0'
// }

// name 包名称 必填
// version 版本 必填 格式 x.x.x
// main 包的入口主文件
// scripts 自定义脚本 通过 npm run 脚本名称 执行脚本定义命令
// dependencies 生成环境下需要使用的依赖包 npm i 包名 -S
// devDependencies 只做开发环境 测试环境下的使用依赖包 npm i 包名 -D
```

- 发布包的步骤

```ts
/**
 * 注册 npmjs.org 账号
 * npm adduser / npm login #登录
 * npm publish # 发布
 * npm install # 下载安装
 */
```

- CLI 开发

```ts
/**
 * 第三方框架
 * 1.commander #命令行开发工具
 * 2.chalk #命令行样式风格控制器
 * 3.inquirer #交互命令行工具
 */
```

- package 文件中的 bin 选项

```ts
/**
 * 全局安装的时候会自动生成 .cmd 等(iso 和 window 下的执行文件)可执行文件 指定执行目录
 */
// bin:{
//   "zm-hello":"index.js"
// }
```

- 基于 Node.js 的 GUI 框架

```ts
/**
 * 使用 js,html,css 构建跨平台的桌面运用
 * -- NW.JS(Node-webkit)
 * --Electron
 *
 * 启动 在"scripts" 对象中
 * "dev":"./node_modules/.bin/electron ."
 *
 * electron 的打包框架
 * electron-builder
 * 打包的时候 electron 必须在 devDependencies 中 不然报错
 * electron-builder 也可以放在里面
 */

// 配置 package.json
{
  "build": {
    "appId":"",
    "productName":"",
    "copyright":"",
    "directories":{
      "output":"",
    },
    "win":{
    // 生成那个平台的安装包
    "icon":"",
    "target":["nsis"], //nsis 软件安装的向导工具
    }
  }
}

```

- 单词

```pug
duplex 双工
deflate 放气;紧缩
resume 简历 摘要 重新开始
equal 相等的 平等的
popularity 普及 流行 名气
quality 质量
maintenance 维护 维修 保养
optimal 最优的
chalk 粉笔
inquirer 询问者
```

- 资源

```ts
/**
 * miaov Node、TS、Koa 商城全栈开发远程课
 * BAIDU 网盘 链接：https://pan.baidu.com/s/1C4WNEVLfoetlznmhdMInkg
 * 提取码：0ef9
 */
```
