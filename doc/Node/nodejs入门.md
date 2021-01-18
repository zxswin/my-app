## nodejs 入门教程

- 命令行运行 nodejs

```bash
node app.js
```

- 从 node.js 程序中退出

```ts
/**
 * 非程序退出方案
 * 当在控制台中运行程序时，可以使用 ctrl-C 将其关闭
 */

/**
 * 以编程的模式退出Node.js程序
 * 这意味着任何待处理的回调、仍在发送中的任何网络请求、任何文件系统访问、或正在写入 stdout 或 stderr 的进程，所有这些都会被立即非正常地终止
 */
process.exit();

// 可以传入一个整数，向操作系统发送退出码：
// 默认情况下，退出码为 0，表示成功。
// 0 正常情况下，如果没有异步操作正在等待，那么 Node.js 会以状态码 0 退出
// 1 未捕获异常
// 2 - 未被使用
// 3 内部的 JavaScript 解析错误
// 4 内部的 JavaScript 执行失败
// 5 致命错误
// 6 非函数的内部异常处理
// 7 内部异常处理运行时失败
// 8 - 未被使用
// 9 - 不可用参数
// 10 内部的 JavaScript 运行时失
// 12 不可用的调试参数
// 13 Unfinished Top-Level Await
// 128 退出信号 - 如果 Node.js 接收到致命信号, 诸如 SIGKILL 或 SIGHUP，那么它的退出代码将是 128 加上信号的码值。
// 例如，信号 SIGABRT 的值为 6，因此预期的退出代码将为 128 + 6 或 134。

process.exit(1);

// 通过process.exitCode 设置退出码
// 当程序结束时，Node.js 会返回该退出码。
// 当进程完成所有处理后，程序会正常地退出
process.exitCode = 1;

/**
 * 让程序友好地退出
 * 向该命令发送 SIGTERM 信号，并使用进程的信号处理程序进行处理
 */
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('你好');
});

const server = app.listen(3000, () => console.log('服务器已就绪'));

// 信号是一个 POSIX 内部通信系统：发送通知给进程，以告知其发生的事件。
// SIGKILL 是告诉进程要立即终止的信号，理想情况下，其行为类似于 process.exit()。
// SIGTERM 是告诉进程要正常终止的信号。它是从进程管理者（如 upstart 或 supervisord）等发出的信号。
// 监听SIGTERM 信号
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('进程已终止');
  });
});

// 可以从程序内部另一个函数中发送此信号
process.kill(process.pid, 'SIGTERM');
```

- 环境变量的读取

```ts
/**
 * Node.js 的 process 核心模块提供了 env 属性，该属性承载了在启动进程时设置的所有环境变量
 * 可以自定义环境变量
 */

// 访问 NODE_ENV 环境变量的示例，该环境变量默认情况下被设置为 development
process.env.NODE_ENV; // "development"

// 在脚本运行之前将其设置为 "production"，则可告诉 Node.js 这是生产环境。
process.env.NODE_ENV = 'production';
```

- Node.js REPL 的是使用

```ts
/**
 * REPL 也被称为运行评估打印循环，是一种编程语言环境（主要是控制台窗口）
 * 它使用单个表达式作为用户输入，并在执行后将结果返回到控制台。
 *
 * 等待输入代码的状态
 * ❯ node
 * >
 *
 * 编写代码时，如果按下 tab 键，则 REPL 会尝试自动补全所写的内容，以匹配已定义或预定义的变量
 *
 * 尝试输入 JavaScript 类的名称，例如 Number，添加一个点号并按下 tab。
 * REPL 会打印可以在该类上访问的所有属性和方法：
 *
 * 通过输入 global. 并按下 tab，可以检查可以访问的全局变量
 *
 * _ 特殊变量
 * 如果在某些代码之后输入 _，则会打印最后一次操作的结果。
 *
 * 特殊的命令
 * .help: 显示点命令的帮助。
 * .editor: 启用编辑器模式，可以轻松地编写多行 JavaScript 代码。当处于此模式时，按下 ctrl-D 可以运行编写的代码。
 * .break: 当输入多行的表达式时，输入 .break 命令可以中止进一步的输入。相当于按下 ctrl-C。
 * .clear: 将 REPL 上下文重置为空对象，并清除当前正在输入的任何多行的表达式。
 * .load: 加载 JavaScript 文件（相对于当前工作目录）。
 * .save: 将在 REPL 会话中输入的所有内容保存到文件（需指定文件名）。
 * .exit: 退出 REPL（相当于按下两次 ctrl-C）。
 *
 * 如果 REPL 能判断出是否正在输入多行的语句，则无需调用 .editor
 * 例如输入的是forEach的测试代码
 */
```

- Node.js 从命令行接收参数

```ts
// 当使用以下命令调用 Node.js 应用程序时，可以传入任意数量的参数
// 参数可以是独立的，也可以具有键和值。
node app.js

// 获取参数值的方法是使用 Node.js 中内置的 process 对象
// 它公开了 argv 属性，该属性是一个包含所有命令行调用参数的数组
// 第一个参数是 node 命令的完整路径
// 第二个参数是正被执行的文件的完整路径
// 所有其他的参数从第三个位置开始

// 可以使用循环迭代所有的参数（包括 node 路径和文件路径）：
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})

// 也可以通过创建一个排除了前两个参数的新数组来仅获取其他的参数
const args = process.argv.slice(2)


// 参数的处理
// 使用 minimist 库，该库有助于处理参数
// 要在每个参数名称之前使用双破折号
// node app.js --name=joe

const args = require('minimist')(process.argv.slice(2))
args['name'] //joe
```

- 使用 Node.js 输出到命令行

```ts
/**
 * Node.js 提供了 console 模块
 * 它基本上与浏览器中的 console 对象相同
 * 如果传入对象，则它会呈现为字符串
 *
 * console.log 非常适合在控制台中打印消息。 这就是所谓的标准输出（或称为 stdout）。
 * console.error 会打印到 stderr 流。它不会出现在控制台中，但是会出现在错误日志中。
 *
 * 传入变量和格式说明符来格式化用语
 * 1.%s 会格式化变量为字符串
 * 2.%d 会格式化变量为数字
 * 3.%i 会格式化变量为其整数部分
 * 4.%o 会格式化变量为对象
 *
 * 清空控制台
 * console.clear() 会清除控制台
 *
 * 元素计数
 * console.count()
 *
 * 打印堆栈踪迹
 * console.trace()
 *
 * 计算耗时
 * 使用 time() 和 timeEnd() 轻松地计算函数运行所需的时间
 *
 * 为输出着色
 * 可以使用转义序列在控制台中为文本的输出着色。 转义序列是一组标识颜色的字符
 * console.log('\x1b[33m%s\x1b[0m', '你好') 打印黄色的 你好
 *
 * Chalk 库的使用
 * 为控制台输出着色
 *
 * Progress库的使用
 * 可在控制台中创建进度条
 */

// 元素计数
const oranges = ['橙子', '橙子'];
const apples = ['苹果'];
oranges.forEach((fruit) => {
  console.count(fruit);
});
apples.forEach((fruit) => {
  console.count(fruit);
});

// 打印堆栈轨迹
const function2 = () => console.trace();
const function1 = () => function2();
function1();

// 计算耗时
const doSomething = () => console.log('测试');
const measureDoingSomething = () => {
  console.time('doSomething()');
  //做点事，并测量所需的时间。
  doSomething();
  console.timeEnd('doSomething()');
};
measureDoingSomething();

// 为控制台着色
const chalk = require('chalk');
console.log(chalk.yellow('你好'));

// 使用Progress在控制台中创建进度条
const ProgressBar = require('progress');

const bar = new ProgressBar(':bar', { total: 10 });
const timer = setInterval(() => {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  }
}, 100);
```

- 在 Node.js 中从命令行接收输入( Node.js CLI 程序具有交互性)

```ts
/**
 * readline 模块
 * CLI 输入
 *
 * readline-sync 库可以实现类型的功能
 *
 * 推荐使用Inquirer.js 库它提供了更完整、更抽象的解决方案。
 */

// 询问用户名，当输入了文本并且用户按下回车键时，则会发送问候语
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`你叫什么名字?`, (name) => {
  console.log(`你好 ${name}!`);
  readline.close();
});

// Inquirer.js 库的使用
const inquirer = require('inquirer');

var questions = [
  {
    type: 'input',
    name: 'name',
    message: '你叫什么名字?',
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(`你好 ${answers['name']}!`);
});
```

- nodejs 模块系统(CommonJs) 导入于导出

```ts
// 导入
const library = require('./library');
const car = require('./items').car;

// module.exports导入
module.exports = {
  brand: 'Ford',
  model: 'Fiesta',
};

// exports导入 是module.exports的引用类型 不可以随意更改它的引用
// 通过添加exports下面属性的方式来添加方法
const car = {
  brand: 'Ford',
  model: 'Fiesta',
};

exports.car = car;

// 或
exports.car = {
  brand: 'Ford',
  model: 'Fiesta',
};
```

- npm 包管理器

```bash
# npm 是 Node.js 标准的软件包管理器

# 在项目具有package.json文件的情况下安装所有依赖
npm install

# 软件包的安装
# --save 安装并添加条目到 package.json 文件的 dependencies
# --save-dev 安装并添加条目到 package.json 文件的 devDependencies
# devDependencies 通常是开发的工具（例如测试的库）
# 而 dependencies 则是与生产环境中的应用程序相关
npm install <package-name>

# 安装指定版本的包
npm i --save iview@2.0.0

# 更新软件包
# npm 会检查所有软件包是否有满足版本限制的更新版本
npm update

# 也可以指定单个软件包进行更新
npm update <package-name>

# 运行任务
# package.json 文件支持一种用于指定命令行任务
npm run <task-name>
{
  "scripts": {
    "start-dev": "node lib/server-development",
    "start": "node lib/server-production"
  },
}

```

- npm 软件包的安装

```bash
# 本地安装
npm install lodash

# 全局安装
# npm root -g 命令会告知其在计算机上模块全局安装的确切位置
# 如果使用 nvm 管理 Node.js 版本，则该位置会有所不同
# /Users/joe/.nvm/versions/node/v8.9.0/lib/node_modules
npm install -g lodash

```

- npm 包是执行文件

```bash
# 可执行文件一般会放在 可执行文件放到 node_modules/.bin/ 文件夹下
# 有一个隐藏的 .bin 文件夹，其中包含指向 对应模块的 二进制文件的符号链接
# 可以输入 ./node_modules/.bin/cowsay 来运行
./node_modules/.bin/cowsay

# 最新版本的 npm（自 5.2 起）中包含的 npx 是更好的选择。 只需运行
npx cowsay
```

- package.json 指南

```bash
name 属性
# name 属性，用于告知应用程序或软件包的名称
# 名称必须少于 214 个字符，且不能包含空格，只能包含小写字母、连字符（-）或下划线（_)
# 这是因为当软件包在 npm 上发布时，它会基于此属性获得自己的 URL。

author属性
# author属性列出软件包的作者名称
{
  "author": {
    "name": "NodeJS中文网",
    "email": "mail@nodejs.cn",
    "url": "http://nodejs.cn"
  }
}

contributors属性
# 除作者外，该项目可以有一个或多个贡献者。 此属性是列出他们的数组
{
  "contributors": ["NodeJS中文网 <mail@nodejs.cn> (http://nodejs.cn))"]
}

{
  "contributors": [
    {
      "name": "NodeJS中文网",
      "email": "mail@nodejs.cn",
      "url": "http://nodejs.cn"
    }
  ]
}

bugs 属性
# 链接到软件包的问题跟踪器，最常用的是 GitHub 的 issues 页面
{
  "bugs": "https://github.com/nodejscn/node-api-cn/issues"
}

homepage 属性
# homepage 属性 设置软件包的主页
{
  "homepage": "http://nodejs.cn"
}

version属性
# version 表明了当前的版本
# 此属性遵循版本的语义版本控制记法，这意味着版本始终以 3 个数字表示：x.x.x
# 第一个数字是主版本号，第二个数字是次版本号，第三个数字是补丁版本号
# 仅修复缺陷的版本是补丁版本，引入向后兼容的更改的版本是次版本，具有重大更改的是主版本。
"version": "1.0.0"

license 属性
# license 属性指定软件包的许可证
"license": "MIT"

keywords 属性
# 此属性包含与软件包功能相关的关键字数组
# 这有助于人们在浏览相似的软件包或浏览 https://www.npmjs.com/ 网站时找到你的软件包。
"keywords": [
  "email",
  "machine learning",
  "ai"
]

repository属性
# repository此属性指定了此程序包仓库所在的位置。
"repository": "github:nodejscn/node-api-cn",
"repository": "gitlab:nodejscn/node-api-cn",
"repository": "bitbucket:nodejscn/node-api-cn",
# 可以显式地设置版本控制系统
"repository": {
  "type": "git",
  "url": "https://github.com/nodejscn/node-api-cn.git"
}


# description 是应用程序/软件包的简短描述。

main属性
# main 设置了应用程序的入口点
# 当在应用程序中导入此软件包时，应用程序会在该位置搜索模块的导出
"main": "src/main.js"

# private 如果设置为 true，则可以防止应用程序/软件包被意外地发布到 npm
# scripts 定义了一组可以运行的 node 脚本。
# dependencies 设置了作为依赖安装的 npm 软件包的列表。
# devDependencies 设置了作为开发依赖安装的 npm 软件包的列表

engines属性
# engines 设置了此软件包/应用程序在哪个版本的 Node.js 上运行
# 设置此软件包/应用程序要运行的 Node.js 或其他命令的版本
"engines": {
  "node": ">= 6.0.0",
  "npm": ">= 3.0.0",
  "yarn": "^0.13.0"
}

# browserslist 用于告知要支持哪些浏览器（及其版本）
# 用于告知要支持哪些浏览器（及其版本）
# Babel、Autoprefixer 和其他工具会用到它，以将所需的 polyfill 和 fallback 添加到目标浏览器。
"browserslist": [
  "> 1%", // 此配置意味着需要支持使用率超过 1％（来自 CanIUse.com 的统计信息）
  "last 2 versions", // 所有浏览器的最新的 2 个主版本
  "not ie <= 8" // 但不含 IE8 及更低的版本
]


{
  "name": "test-project",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "main": "src/main.js",
  "private": true,
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
  },
  "dependencies": {
    "vue": "^2.5.2"
  },
  "devDependencies": {
    "webpack-merge": "^4.1.0"
  },
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": ["> 1%", "last 2 versions", "not ie <= 8"]
}

# 命令特有属性
package.json 文件还可以承载命令特有的配置，例如 Babel、ESLint 等。

# 软件包版本
# semver 表示法
~: 如果写入的是 〜0.13.0，则只更新补丁版本：即 0.13.1 可以，但 0.14.0 不可以
^: 如果写入的是 ^0.13.0，则要更新补丁版本和次版本：即 0.13.1、0.14.0、依此类推。
*: 如果写入的是 *，则表示接受所有的更新，包括主版本升级。
>: 接受高于指定版本的任何版本。
>=: 接受等于或高于指定版本的任何版本。
<=: 接受等于或低于指定版本的任何版本。
<: 接受低于指定版本的任何版本。
无符号: 仅接受指定的特定版本
latest: 使用可用的最新版本。

还可以在范围内组合以上大部分内容，例如
还可以在范围内组合以上大部分内容，例如：1.0.0 || >=1.1.0 <1.2.0，即使用 1.0.0 或从 1.1.0 开始但低于 1.2.0 的版本。
```

- package-lock.json 文件

```bash
# 在版本 5 中，npm 引入了 package-lock.json 文件
# 该文件旨在跟踪被安装的每个软件包的确切版本，以便产品可以以相同的方式被 100％ 复制
# package-lock.json 会固化当前安装的每个软件包的版本，当运行 npm install时，npm 会使用这些确切的版本。
# package-lock.json 文件需要被提交到 Git 仓库，以便被其他人获取
# package-lock.json 的每个依赖包会按字母顺序被添加到文件中，
# 每个软件包都有 version 字段、指向软件包位置的 resolved 字段、以及用于校验软件包的 integrity 字符串

```

- 查看软件包的版本

```bash
# 查看所有已安装的 npm 软件包（包括它们的依赖包）的最新版本
npm list

# 全局已安装的软件包（包括它们的依赖包）的最新版本
npm list -g

# 仅获取顶层的软件包(基本上就是告诉 npm 要安装并在 package.json 中列出的软件包)
npm list --depth=0

# 也可以通过指定名称来获取特定软件包的版本
npm list cowsay

# 适用于安装的软件包的依赖(查询已经安装的软件包的某个依赖)
npm list minimist

# 查看软件包在 npm 仓库上最新的可用版本
npm view [package_name] version
npm view cowsay version

```

- 安装 npm 包的旧版本(指定版本)

```bash
# 使用 @ 语法来安装 npm 软件包的旧版本(指定版本)
npm install <package>@<version>
npm install cowsay@1.2.0

# 全局安装
npm install -g webpack@4.16.4

# 列出软件包所有的以前的版本
npm view <package> versions
npm view cowsay versions

```

- 将所有 npm 包更新到最新版本

```bash
# 当使用 npm install <packagename> 安装软件包时
1.该软件包最新的可用版本会被下载并放入 node_modules 文件夹中
2.并且还会将相应的条目添加到当前文件夹中存在的 package.json 和 package-lock.json 文件中

# npm update
1.如果有新的次版本或补丁版本
2.则已安装的版本会被更新，并且 package-lock.json 文件会被新版本填充
3.package.json 则保持不变

# npm outdated
发觉软件包的新版本

# 若要将所有软件包更新到新的主版本
# 第一步：全局地安装 npm-check-updates 软件包
npm install -g npm-check-updates
# 第二步：运行
# 这会升级 package.json 文件的 dependencies 和 devDependencies 中的所有版本
ncu -u
# 第三步：执行更新操作
npm update
# 如果此时项目中并没有node_modules 依赖包
# 可以直接执行
npm install
```

- npm 的语义版本控制

```bash
# 语义版本控制的概念很简单：所有的版本都有 3 个数字：x.y.z
第一个数字是主版本。
第二个数字是次版本。
第三个数字是补丁版本。

# 发布新版本时需要遵循的规则
当进行不兼容的 API 更改时，则升级主版本。
当以向后兼容的方式添加功能时，则升级次版本。
当进行向后兼容的缺陷修复时，则升级补丁版本。

# 其他规则
无符号: 仅接受指定的特定版本（例如 1.2.1）。
latest: 使用可用的最新版本。
```

- 卸载 npm 软件包

```bash
# 从项目的根文件夹中运行
npm uninstall <package-name>

# 使用 -S 或 --save 标志，则此操作还会移除 package.json 文件中的引用
npm uninstall -S <package-name>

# 如果程序包是开发依赖项，则必须使用 -D 或 --save-dev 标志从文件中移除：
npm uninstall -D <package-name>

# 如果该软件包是全局安装的，则需要添加 -g 或 --global 标志
npm uninstall -g <package-name>
npm uninstall -g webpack

```

- 本地安装与全局安装

```bash
# 什么时候需要全局安装
当程序包提供了可从 shell（CLI）运行的可执行命令、且可在项目间复用时，则该程序包应被全局安装
一些流行的全局软件包的示例有：
npm
create-react-app
vue-cli
grunt-cli
mocha
react-native-cli
gatsby-cli
forever
nodemon

# 查看系统中已经安装的全局软件包
npm list -g --depth 0
```

- npm 依赖与开发依赖

```bash
# 当使用 npm install <package-name> 安装 npm 软件包时，是将其安装为依赖项
# 当添加了 -D 或 --save-dev 标志时，则会将其安装为开发依赖项（会被添加到 devDependencies 列表）。
# 开发依赖是仅用于开发的程序包，在生产环境中并不需要。 例如测试的软件包、webpack 或 Babel
# 执行npm install 会安装开发依赖项和依赖项目

# 设置 --production 标志（npm install --production），以避免安装这些开发依赖项

```

- Node.js 包运行器 npx

```bash
# npx 是一个非常强大的命令，从 npm 的 5.2 版本（发布于 2017 年 7 月）开始可用
# npx 可以运行使用 Node.js 构建并通过 npm 仓库发布的代码npx 可以运行使用 Node.js 构建并通过 npm 仓库发布的代码

# 运行 npx commandname
# 会自动地在项目的 node_modules 文件夹中找到命令的正确引用，而无需知道确切的路径，也不需要在全局和用户路径中安装软件包。

# npx 的另一个重要的特性是，无需先安装命令即可运行命令。
1.不需要安装任何东西。
2.可以使用 @version 语法运行同一命令的不同版本。

# npx 可以运行该 npm 命令，而无需在本地安装：
# 当被下载完，则下载的代码会被擦除
npx cowsay "你好"

# 使用场景
运行 vue CLI 工具以创建新的应用程序并运行它们：npx vue create my-vue-app
使用 create-react-app 创建新的 React 应用：npx create-react-app my-react-app

# 使用不同的 Node.js 版本运行代码
# 这有助于避免使用 nvm 之类的工具或其他 Node.js 版本管理工具
npx node@10 -v #v10.18.1
npx node@12 -v #v12.14.1

# 直接从 URL 运行任意代码片段
# 但要格外小心 因为并不支持这么做
npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
```

- node.js 事件循环

```ts
/**
 * 调用堆栈
 * 调用堆栈是一个 LIFO 队列（后进先出）
 * 事件循环不断地检查调用堆栈，以查看是否需要运行任何函数。
 * 事件循环会找到的所有函数调用添加到调用堆栈中，并按顺序执行每个函数
 * 每次迭代中的事件循环都会查看调用堆栈中是否有东西并执行它直到调用堆栈为空
 *
 * 消息队列(宏任务)
 *  setTimeout()回调函数会被放入“消息队列”中
 * 用户触发的事件（如单击或键盘事件、或获取响应）也会在此排队
 * 类似 onLoad 这样的 DOM 事件也如此
 *
 * 事件循环会赋予调用堆栈优先级，它首先处理在调用堆栈中找到的所有东西，
 * 一旦其中没有任何东西，便开始处理消息队列中的东西。
 *
 * ES6 作业队列(微任务)
 * 优先级高于任务队列
 * Promise 使用了该队列
 * 这种方式会尽快地执行异步函数的结果，而不是放在调用堆栈的末尾。
 *
 */

const bar = () => console.log('bar');

const baz = () => console.log('baz');

const foo = () => {
  console.log('foo');
  setTimeout(bar, 0);
  new Promise((resolve, reject) => resolve('应该在 baz 之后、bar 之前')).then((resolve) => console.log(resolve));
  baz();
};

foo();

// 打印结果
// foo
// baz
// 应该在 baz 之后、bar 之前
// bar
```

- process.nextTick()

```ts
/**
 * 每当事件循环进行一次完整的行程时，我们都将其称为一个滴答
 * 当将一个函数传给 process.nextTick() 时，在下一个事件循环滴答开始之前时调用此函数：
 * 当要确保在下一个事件循环迭代中代码已被执行，则使用 nextTick()。
 * 这是可以告诉 JS 引擎异步地（在当前函数之后）处理函数的方式，但是尽快执行而不是将其排入队列
 * setImmediate()（相当于使用 setTimeout(() => {}, 0)）
 */

function far() {
  // 调用 setTimeout(() => {}, 0) 会在下一个滴答结束时执行该函数
  setTimeout(() => {
    console.log('消息队列任务1');
  }, 0);
  console.log('1');
  console.log('2');

  Promise.resolve('作业队列任务1').then((v) => {
    console.log(v);
  });
}
far();

process.nextTick(() => {
  console.log('会在下一个事件循环开始之前调用');
});

// 打印结果
// 1
// 2
// 会在下一个事件循环开始之前调用
// 作业队列任务1
// 消息队列任务1
```

- setImmediate()

```ts
/**
 * setImmediate() 当要异步地（但要尽可能快）执行某些代码时
 * 作为 setImmediate() 参数传入的任何函数都是在事件循环的下一个迭代中执行的回调
 *
 * 传给 process.nextTick() 的函数会在事件循环的当前迭代中（当前操作结束之后）被执行
 * 延迟 0 毫秒的 setTimeout() 回调与 setImmediate() 非常相似。 执行顺序取决于各种因素，但是它们都会在事件循环的下一个迭代中运行
 */

function far() {
  setImmediate(() => {
    console.log('setImmediate');
  });

  setTimeout(() => {
    console.log('消息队列任务1');
  }, 0);

  console.log('1');
  console.log('2');

  Promise.resolve('作业队列任务1').then((v) => {
    console.log(v);
  });
}
far();

process.nextTick(() => {
  console.log('会在下一个事件循环开始之前调用');
});

// 打印结果
// 1
// 2
// 会在下一个事件循环开始之前调用
// 作业队列任务1
// 消息队列任务1
// setImmediate
```

- Node.js 事件触发器

```ts
/**
 * Node.js 也提供了使用 events 模块
 * 此模块提供了 EventEmitter 类，用于处理事件
 */

// 初始化事件处理
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// on 用于添加回调函数（会在事件被触发时执行）。
eventEmitter.on('start', () => {
  console.log('开始');
});

// emit 用于触发事件。
eventEmitter.emit('start');

// 通过将参数作为额外参数传给 emit()
eventEmitter.on('start', (start, end) => {
  console.log(`从 ${start} 到 ${end}`);
});

eventEmitter.emit('start', 1, 100);

// once(): 添加单次监听器。
// removeListener() / off(): 从事件中移除事件监听器。
// removeAllListeners(): 移除事件的所有监听器。
```

- 一个简单的 HTTP web 服务器的示例

```ts
const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('你好世界\n');
});

server.listen(port, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});
```

- 使用 Node.js 发送 HTTP 请求

```ts
// 执行 GET 请求
const https = require('https');
const options = {
  hostname: 'nodejs.cn',
  port: 443,
  path: '/todos',
  method: 'GET',
};

const req = https.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();

// 执行 POST 请求
const https = require('https');

const data = JSON.stringify({
  todo: '做点事情',
});

const options = {
  hostname: 'nodejs.cn',
  port: 443,
  path: '/todos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = https.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();

// PUT 和 DELETE
// PUT 和 DELETE 请求使用相同的 POST 请求格式，只需更改 options.method 的值即可
```

- Axios 库的使用

```ts
/**
 * 使用 Node.js 执行 HTTP 请求的最简单的方式是使用 Axios 库
 */
const axios = require('axios');

axios
  .post('http://nodejs.cn/todos', {
    todo: '做点事情',
  })
  .then((res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
```

- 获取 HTTP 请求的正文数据

```ts
// 使用Express 和 body-parser模块
const bodyParser = require('body-parser');

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body.todo);
});

// 原生处理
const server = http.createServer((req, res) => {
  let data = [];
  req.on('data', (chunk) => {
    // 通过监听流的 data 事件来获取数据
    // 必须监听要处理的主体内容，并且其是按数据块处理的
    data.push(chunk);
  });
  req.on('end', () => {
    // 然后在数据结束时调用一次流的 end 事件
    JSON.parse(data).todo; // '做点事情'
  });
});
```

- 文件描述符

```ts
/**
 * 在与位于文件系统中的文件进行交互之前，需要先获取文件的描述符。
 * 文件描述符是使用 fs 模块提供的 open() 方法打开文件后返回的：
 * 一旦获得文件描述符，就可以以任何方式执行所有需要它的操作
 */

const fs = require('fs');

fs.open('/Users/joe/test.txt', 'r', (err, fd) => {
  //fd 是文件描述符。
  // r 该标志意味着打开文件用于读取
  // r+ 打开文件用于读写。
  // w+ 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件。
  // a 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件。
  // a+ 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件。
});

// 使用 fs.openSync 方法打开文件
const fs = require('fs');

try {
  const fd = fs.openSync('/Users/joe/test.txt', 'r');
} catch (err) {
  console.error(err);
}
```

- stat() 获取文件属性

```ts
/**
 * 使用 fs 模块提供的 stat() 方法 获取文件属性
 * 同步的方法statSync
 *
 * 使用 stats.isFile() 和 stats.isDirectory() 判断文件是否目录或文件。
 * 使用 stats.isSymbolicLink() 判断文件是否符号链接。
 * 使用 stats.size 获取文件的大小（以字节为单位）。
 */

const fs = require('fs');
fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  stats.isFile(); //true
  stats.isDirectory(); //false
  stats.isSymbolicLink(); //false
  stats.size; //1024000 //= 1MB
});
```

- 文件路径

```ts
/**
 * 在 Linux 和 macOS 上，路径可能类似于/users/joe/file.txt
 * 在 Windows 上则有所不同，具有类似以下的结构 C:\users\joe\file.txt
 *
 *
 * 从路径中获取信息
 * dirname: 获取文件的父文件夹。
 * basename: 获取文件名部分。
 * extname: 获取文件的扩展名。
 *
 * 可以通过为 basename 指定第二个参数来获取不带扩展名的文件名
 * path.basename(notes, path.extname(notes)) //notes
 */

const notes = '/users/joe/notes.txt';

path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt

// path.join() 连接路径的两个或多个片段
const name = 'joe';
path.join('/', 'users', name, 'notes.txt'); //'/users/joe/notes.txt'

// 可以使用 path.resolve() 获得相对路径的绝对路径计算
path.resolve('joe.txt'); //'/Users/joe/joe.txt' 如果从主文件夹运行
path.resolve('tmp', 'joe.txt'); //'/Users/joe/tmp/joe.txt' 如果从主文件夹运行。

// 如果第一个参数以斜杠开头，则表示它是绝对路径
path.resolve('/etc', 'joe.txt'); //'/etc/joe.txt'

// path.normalize() 是另一个有用的函数，当包含诸如 .、.. 或双斜杠之类的相对说明符时，其会尝试计算实际的路径：
path.normalize('/users/joe/..//test.txt'); ///users/test.txt
```

- 读取文件

```ts
/**
 * fs.readFile() 和 fs.readFileSync() 都会在返回数据之前将文件的全部内容读取到内存中
 * 意味着大文件会对内存的消耗和程序执行的速度产生重大的影响
 * 如果是大文件：选择是使用流来读取文件的内容
 */

// 使用异步的方式来读取文件
const fs = require('fs');

fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// 使用同步的方式来读取文件
const fs = require('fs');

try {
  const data = fs.readFileSync('/Users/joe/test.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}
```

- 写入文件

```ts
// 异步方法写入文件
const fs = require('fs');

const content = '一些内容';

fs.writeFile('/Users/joe/test.txt', content, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  //文件写入成功。
});

// 同步方法写入文件
const fs = require('fs');

const content = '一些内容';

try {
  const data = fs.writeFileSync('/Users/joe/test.txt', content);
  //文件写入成功。
} catch (err) {
  console.error(err);
}

/**
 * 通过指定标志来修改默认的行为
 * r+ 打开文件用于读写。
 * w+ 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件。
 * a 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件。
 * a+ 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件。
 */
fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, (err) => {});

/**
 * 追加到文件
 * 将内容追加到文件末尾的便捷方法是 fs.appendFile()（及其对应的 fs.appendFileSync()）
 */

const content = '一些内容';

fs.appendFile('file.log', content, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  //完成！
});
```

- 使用文件夹

```ts
// fs-extra 模块，该模块非常受欢迎且维护良好。 它是 fs 模块的直接替代品
// 检查文件夹是否存在
// 使用 fs.access() 检查文件夹是否存在以及 Node.js 是否具有访问权限

// fs.mkdir() 或 fs.mkdirSync() 可以创建新的文件夹
const fs = require('fs');

const folderName = '/Users/joe/test';

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}

// fs.readdir() 或 fs.readdirSync() 可以读取目录的内容
const fs = require('fs');
const path = require('path');

const folderPath = '/Users/joe';

fs.readdirSync(folderPath);

// 获取完整的路径
fs.readdirSync(folderPath).map((fileName) => {
  return path.join(folderPath, fileName);
});

// 滤结果以仅返回文件（排除文件夹）
const isFile = (fileName) => {
  return fs.lstatSync(fileName).isFile();
};

fs.readdirSync(folderPath)
  .map((fileName) => {
    return path.join(folderPath, fileName);
  })
  .filter(isFile);

// 重命名文件夹
// fs.rename() 或 fs.renameSync()
// 异步重命名文件夹
const fs = require('fs');

fs.rename('/Users/joe', '/Users/roger', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  //完成
});

// 同步重命名文件夹
const fs = require('fs');

try {
  fs.renameSync('/Users/joe', '/Users/roger');
} catch (err) {
  console.error(err);
}

// 删除文件夹
// 使用 fs.rmdir() 或 fs.rmdirSync() 可以删除文件夹
// fs-extra 模块，该模块非常受欢迎且维护良好。 它是 fs 模块的直接替代品
// fs-extra 模块 的 remove() 用来删除包含内容的文件夹
const fs = require('fs-extra');

const folder = '/Users/joe';

fs.remove(folder, (err) => {
  console.error(err);
});

// 使用async await的方法
async function removeFolder(folder) {
  try {
    await fs.remove(folder);
    //完成
  } catch (err) {
    console.error(err);
  }
}

const folder = '/Users/joe';
removeFolder(folder);
```

- 文件系统模块

```ts
// 文件系统模块的相关方法
// fs.access(): 检查文件是否存在，以及 Node.js 是否有权限访问。
// fs.appendFile(): 追加数据到文件。如果文件不存在，则创建文件。
// fs.chmod(): 更改文件（通过传入的文件名指定）的权限。相关方法：fs.lchmod()、fs.fchmod()。
// fs.chown(): 更改文件（通过传入的文件名指定）的所有者和群组。相关方法：fs.fchown()、fs.lchown()。
// fs.close(): 关闭文件描述符。
// fs.copyFile(): 拷贝文件。
// fs.createReadStream(): 创建可读的文件流。
// fs.createWriteStream(): 创建可写的文件流。
// fs.link(): 新建指向文件的硬链接。
// fs.mkdir(): 新建文件夹。
// fs.mkdtemp(): 创建临时目录。
// fs.open(): 设置文件模式。
// fs.readdir(): 读取目录的内容。
// fs.readFile(): 读取文件的内容。相关方法：fs.read()。
// fs.readlink(): 读取符号链接的值。
// fs.realpath(): 将相对的文件路径指针（.、..）解析为完整的路径。
// fs.rename(): 重命名文件或文件夹。
// fs.rmdir(): 删除文件夹。
// fs.stat(): 返回文件（通过传入的文件名指定）的状态。相关方法：fs.fstat()、fs.lstat()。
// fs.symlink(): 新建文件的符号链接。
// fs.truncate(): 将传递的文件名标识的文件截断为指定的长度。相关方法：fs.ftruncate()。
// fs.unlink(): 删除文件或符号链接。
// fs.unwatchFile(): 停止监视文件上的更改。
// fs.utimes(): 更改文件（通过传入的文件名指定）的时间戳。相关方法：fs.futimes()。
// fs.watchFile(): 开始监视文件上的更改。相关方法：fs.watch()。
// fs.writeFile(): 将数据写入文件。相关方法：fs.write()。
```

- 文件路径模块

```ts
// path.sep  作为路径段分隔符，在 Windows 上是 \，在 Linux/macOS 上是 /
// path.delimiter 作为路径定界符，在 Windows 上是 ;，在 Linux/macOS 上是 :

// path.basename()
// 返回路径的最后一部分。 第二个参数可以过滤掉文件的扩展名
require('path').basename('/test/something'); //something
require('path').basename('/test/something.txt'); //something.txt
require('path').basename('/test/something.txt', '.txt'); //something

// path.dirname()
// 返回路径的目录部分
require('path').dirname('/test/something'); // /test
require('path').dirname('/test/something/file.txt'); // /test/something

// path.extname()
// 返回路径的扩展名部分
require('path').extname('/test/something'); // ''
require('path').extname('/test/something/file.txt'); // '.txt'

// path.isAbsolute()
// 如果是绝对路径，则返回 true
require('path').isAbsolute('/test/something'); // true
require('path').isAbsolute('./test/something'); // false

// path.join()
// 连接路径的两个或多个部分：
const name = 'joe';
require('path').join('/', 'users', name, 'notes.txt'); //'/users/joe/notes.txt'

// path.normalize()
// 当包含类似 .、.. 或双斜杠等相对的说明符时，则尝试计算实际的路径
require('path').normalize('/users/joe/..//test.txt'); //'/users/test.txt'

// path.parse()
// root: 根路径。
// dir: 从根路径开始的文件夹路径。
// base: 文件名 + 扩展名
// name: 文件名
// ext: 文件扩展名
require('path').parse('/users/test.txt');
// {
//   root: '/',
//   dir: '/users',
//   base: 'test.txt',
//   ext: '.txt',
//   name: 'test'
// }

// path.relative()
// 接受 2 个路径作为参数。 基于当前工作目录，返回从第一个路径到第二个路径的相对路径。
require('path').relative('/Users/joe', '/Users/joe/test.txt'); //'test.txt'
require('path').relative('/Users/joe', '/Users/joe/something/test.txt'); //'something/test.txt'

// path.resolve()
// 使用 path.resolve() 获得相对路径的绝对路径计算
path.resolve('joe.txt'); //'/Users/joe/joe.txt' 如果从主文件夹运行
// 通过指定第二个参数，resolve 会使用第一个参数作为第二个参数的基准：
path.resolve('tmp', 'joe.txt'); //'/Users/joe/tmp/joe.txt' 如果从主文件夹运行
// 如果第一个参数以斜杠开头，则表示它是绝对路径
path.resolve('/etc', 'joe.txt'); //'/etc/joe.txt'
```

- 操作系统模块

```ts
// os.EOL 可给出行定界符序列。 在 Linux 和 macOS 上为 \n，在 Windows 上为 \r\n。
// os.constants.signals 可告知所有与处理过程信号相关的常量，例如 SIGHUP、SIGKILL 等。
// os.constants.errno 可设置用于错误报告的常量，例如 EADDRINUSE、EOVERFLOW 等。

// 返回标识底层架构的字符串，例如 arm、x64、arm64。
os.arch();

// 返回关于系统上可用的 CPU 的信息。
os.cpus();

// 根据是使用大端序或小端序编译 Node.js，返回 BE 或 LE。
os.endianness();

// 返回代表系统中可用内存的字节数。
os.freemem();

// 返回到当前用户的主目录的路径
os.homedir(); // '/Users/joe'

// 返回主机名
os.hostname();

// 返回操作系统对平均负载的计算。
// 这仅在 Linux 和 macOS 上返回有意义的值。
// [3.68798828125, 4.00244140625, 11.1181640625]
os.loadavg();

// 返回系统上可用的网络接口的详细信息。
os.networkInterfaces();

// 返回为 Node.js 编译的平台
// darwin
// freebsd
// linux
// openbsd
// win32
os.platform();

// 返回标识操作系统版本号的字符串。
os.release();

// 返回指定的临时文件夹的路径
os.tmpdir();

// 返回表示系统中可用的总内存的字节数
os.totalmem();

// 标识操作系统
// Linux
// macOS 上为Darwin
// Windows 上为 Windows_NT
os.type();

// 返回自上次重新启动以来计算机持续运行的秒数。
os.uptime();
```

- 事件模块

```ts
// 1.初始化事件监听器
const EventEmitter = require('events');
const door = new EventEmitter();

// emitter.addListener()
// emitter.on() 的别名。

// emitter.emit()
// 触发事件。 按照事件被注册的顺序同步地调用每个事件监听器。
door.emit('slam'); // 触发 "slam" 事件。

// emitter.eventNames()
// 返回字符串（表示在当前 EventEmitter 对象上注册的事件）数组
door.eventNames();

// 获取可以添加到 EventEmitter 对象的监听器的最大数量（默认为 10，但可以使用 setMaxListeners() 进行增加或减少）。
// emitter.getMaxListeners()
door.getMaxListeners();

// 获取作为参数传入的事件监听器的计数
// emitter.listenerCount()
door.listenerCount('open');

// 获取作为参数传入的事件监听器的数组
// emitter.listeners()
door.listeners('open');

// emitter.off()
// emitter.removeListener() 的别名，新增于 Node.js 10

// 添加当事件被触发时调用的回调函数
// emitter.on();
door.on('open', () => {
  console.log('打开');
});

// emitter.once()
// 添加当事件在注册之后首次被触发时调用的回调函数。 该回调只会被调用一次，不会再被调用
const EventEmitter = require('events');
const ee = new EventEmitter();

ee.once('my-event', () => {
  //只调用一次回调函数。
});

// emitter.prependListener()
// 使用 prependListener 则可以在其他监听器之前添加并调用

// emitter.prependOnceListener()
// prependOnceListener 则可以在其他监听器之前添加并调用

// emitter.removeAllListeners()
// 移除 EventEmitter 对象的所有监听特定事件的监听器
door.removeAllListeners('open');

// emitter.removeListener()
// 移除特定的监听器。 可以通过将回调函数保存到变量中（当添加时），以便以后可以引用它
const doSomething = () => {};
door.on('open', doSomething);
door.removeListener('open', doSomething);

// emitter.setMaxListeners()
// 设置可以添加到 EventEmitter 对象的监听器的最大数量（默认为 10，但可以增加或减少）
door.setMaxListeners(50);
```

- 单词

```pug
incoming 进来的
brew 酿造
process 过程
SIGTERM 终止信号
repl 交互式解释器
trace 追踪 轨迹
chalk 粉笔
tick 发出滴答声;滴答地走时;标记号;打上钩;打对号
inquire 询问
prompt 促使 立即
roaming 漫游
cow 奶牛
contributor 贡献者
integrity 完整性
resolved 断然的
immediate 立即
normalize 规范化
relative 相对的
prepend的 预先准备
alloc 分配内存
stream 流
deflate 放气
Inflate 充气
soon 很快
halted 停止
exception 例外
Handling exceptions 异常处理
mandatory 强制性的
chain 链
```
