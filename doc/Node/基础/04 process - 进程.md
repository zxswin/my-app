## process

- 关于 process

```ts
/**
 * 1.process 对象是一个全局变量，提供 Node.js 进程的有关信息以及控制进程。
 * 2.因为是全局变量，所以无需使用 require()。
 * 3.process 对象是 EventEmitter 的实例。
 */
```

- 进程事件

```ts
/**
 * 1.'beforeExit' 事件
 * 除非需要添加额外的工作，否则不要使用 'beforeExit' 事件代替 'exit' 事件。
 *
 * 2.'disconnect' 事件
 * 当 IPC 通道关闭时触发'disconnect'事件。
 *
 * 3.'exit' 事件
 * 触发 'exit' 事件： -调用 process.exit()；
 * -Node.js 事件循环不再有额外的工作。
 *
 * 4.'message' 事件
 * 则当子进程接收到父进程使用 childprocess.send() 发送的消息时触发。
 * 消息会进行序列化和解析，收到的消息可能与发送的不完全一样。
 *
 * 5.'multipleResolves' 事件
 * 主要用于使用 promise 时追踪错误。
 *
 * 6.'rejectionHandled' 事件
 * 在同步代码情况下，当未处理异常列表增长时，会触发 'uncaughtException' 事件。
 * 在异步代码情况下，当未处理异常列表增长时，会触发 'unhandledRejection' 事件，
 * 当未处理列表收缩时，会触发 'rejectionHandled' 事件。
 */

// 触发 'exit' 事件： -调用 process.exit()；
process.on('exit', (code) => {
  console.log(`退出码: ${code}`); // 退出码 0
});

// 'exit' 事件监听器的回调函数只允许同步操作。
process.on('exit', (code) => {
  setTimeout(() => {
    console.log('该函数不会被执行');
  }, 0);
});

/**
 * 7.'uncaughtException' 事件
 * 'uncaughtException' 事件监听器的回调函数，使用 Error 对象作为唯一参数值。
 * Node.js 默认情况下会将这些异常堆栈打印到 stderr 然后进程退出。
 * 为 'uncaughtException' 事件增加监听器会覆盖上述默认行为。
 */
process.on('uncaughtException', (err) => {
  console.log('捕获到异常：', err);
});

setTimeout(() => {
  console.log('这里仍然会运行。');
}, 500);

// 故意调用一个不存在的函数，应用会抛出未捕获的异常。
nonexistentFunc();
console.log('这里不会运行。');

/**
 * 8.'unhandledRejection' 事件
 * 如果在事件循环的一次轮询中，一个 Promise 被 rejected，并且此 Promise 没有绑定错误处理器，'unhandledRejection 事件会被触发。
 */

/**
 * 9.'warning' 事件
 * 任何时候 Node.js 发出进程告警，都会触发'warning'事件。
 */
process.on('warning', (warning) => {
  console.warn(warning.name); // 打印告警名称
  console.warn(warning.message); // 打印告警信息
  console.warn(warning.stack); // 打印堆栈信息
});

/**
 * 10.process.abort()
 * process.abort()方法会使 Node.js 进程立即结束，并生成一个 core 文件。
 */

/**
 * 11.process.allowedNodeEnvironmentFlags
 */

/**
 * 12.process.arch
 * process.arch 属性返回一个表示操作系统 CPU 架构的字符串，Node.js 二进制文件是为这些架构编译的。
 */
console.log(`This processor architecture is ${process.arch}`); // This processor architecture is x64

/**
 * 13.process.argv
 * process.argv 属性返回一个数组，这个数组包含了启动 Node.js 进程时的命令行参数。
 */
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

// \$ node process-args.js one two=three four

// 输出：
// 0: /usr/local/bin/node
// 1: /Users/mjr/work/node/process-args.js
// 2: one
// 3: two=three
// 4: four

/**
 * 14.process.argv0
 * process.argv0 属性，保存 Node.js 启动时传入的 argv[0]参数值的一份只读副本。
 */

/**
 * 15.process.channel
 * process.channel 属性保存 IPC channel 的引用。 如果 IPC channel 不存在，此属性值为 undefined。
 *
 * 16.process.chdir(directory) 方法变更 Node.js 进程的当前工作目录，如果变更目录失败会抛出异常
 * 17.process.config 属性返回一个 Javascript 对象。此对象描述了用于编译当前 Node.js 执行程序时涉及的配置项信息。
 * 18.process.connected process.connected 如果为 false，则不能通过 IPC channel 使用 process.send()发送信息。
 */

/**
 * 19.process.cpuUsage()方法返回包含当前进程的用户 CPU 时间和系统 CPU 时间的对象。
 * 上一次调用 process.cpuUsage()方法的结果，可以作为参数值传递给此方法，得到的结果是与上一次的差值。
 */
const startUsage = process.cpuUsage(); // { user: 38579, system: 6986 }
const now = Date.now(); // spin the CPU for 500 milliseconds
while (Date.now() - now < 500);
console.log(process.cpuUsage(startUsage)); // { user: 514883, system: 11226 }

/**
 * 20.process.cwd()
 * process cwd() 方法返回 Node.js 进程当前工作的目录。
 */

console.log(`Current directory: ${process.cwd()}`);

/**
 * 21.process.debugPort
 * 22.process.disconnect()
 * 23.process.dlopen(module, filename[, flags])
 * 24.process.emitWarning(warning[, options])
 * process.emitWarning()方法可用于发出定制的或应用特定的进程警告。
 * 25.process.emitWarning(warning[, type[, code]][, ctor])
 */

/**
 * 26.process.env
 * process.env 属性返回一个包含用户环境信息的对象
 */
// 例如这样的对象:
// {
// TERM: 'xterm-256color',
// SHELL: '/usr/local/bin/bash',
// USER: 'maciej',
// PATH: '~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin',
// PWD: '/Users/maciej',
// EDITOR: 'vim',
// SHLVL: '1',
// HOME: '/Users/maciej',
// LOGNAME: 'maciej',
// \_: '/usr/local/bin/node'
// }

// 在 process.env 中新增一个属性，会将属性值转换成字符串
process.env.test = null;
console.log(process.env.test);
// => 'null'
process.env.test = undefined;
console.log(process.env.test);
// => 'undefined'

// 用 delete 从 process.env 中删除一个属性
process.env.TEST = 1;
delete process.env.TEST;
console.log(process.env.TEST);
// => undefined

// 在 Windows 系统下，环境变量是不区分大小写的
process.env.TEST = 1;
console.log(process.env.test);
// => 1

/**
 * 27.process.execArgv
 * process.execArgv 属性返回当 Node.js 进程被启动时，Node.js 特定的命令行选项。
 */

/**
 * 28.process.execPath 属性，返回启动 Node.js 进程的可执行文件所在的绝对路径。
 * process.exit()方法以结束状态码 code 指示 Node.js 同步终止进程。
 * 'success' 状态码 0
 * 'failure' 状态码 1
 *
 * 29.process.exitCode 此数值标识进程结束的状态码。
 *
 * 30.process.getegid()方法返回 Node.js 进程的有效数字标记的组身份
 * 3这个函数只在 POSIX 平台有效(在 Windows 或 Android 平台无效)。
 *
 * 31.process.geteuid()方法返回 Node.js 进程的有效数字标记的用户身份
 * 这个函数只在 POSIX 平台有效(在 Windows 或 Android 平台无效)。
 *
 * 32.process.getgid()方法返回 Node.js 进程的数字标记的组身份
 * 这个函数只在 POSIX 平台有效(在 Windows 或 Android 平台无效)。

 * 33.process.getgroups()方法返回数组，其中包含了补充的组 ID。
 * 这个函数只在 POSIX 平台有效(在 Windows 或 Android 平台无效)。
 *
 * 34.process.getuid() 方法返回 Node.js 进程的数字标记的用户身份
 * 这个函数只在 POSIX 平台有效(在 Windows 或 Android 平台无效)

 * 35.process.hasUncaughtExceptionCaptureCallback()
 */

/**
 * 36.process.hrtime([time])
 * time <Array> 上一次调用 process.hrtime()的结果
 * 此方法最主要的作用是衡量间隔操作的性能：
 */
setTimeout(() => {
  const diff = process.hrtime(time);
  // [ 1, 552 ]

  console.log(`Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`);
  // benchmark took 1000000552 nanoseconds
}, 1000);

/**
 * 37.process.hrtime.bigint()
 * 38.process.initgroups(user, extraGroup)
 * 39.process.kill()方法将 signal 发送给 pid 标识的进程。
 * 40.process.mainModule 属性提供了一种获取 require.main 的替代方式。
 */

/**
 * 41.process.memoryUsage()方法返回 Node.js 进程的内存使用情况的对象，该对象每个属性值的单位为字节。
 */
console.log(process.memoryUsage());
// {
//   rss: 4935680,
//   heapTotal: 1826816,
//   heapUsed: 650472,
//   external: 49879
// }

/**
 * 42.process.nextTick(callback[, ...args])
 * 一旦当前事件轮询队列的任务全部完成，在 next tick 队列中的所有 callbacks 会被依次调用。
 */
console.log('start');
process.nextTick(() => {
  console.log('nextTick callback');
});
console.log('scheduled');

// start
// scheduled
// nextTick callback

/**
 * 43.process.noDeprecation
 * 44.process.pid 属性返回进程的 PID。

  */
/**
 *  45.process.platform 属性返回字符串，标识 Node.js 进程运行其上的操作系统平台。
 */
console.log(`This platform is ${process.platform}`); // This platform is win32

/**
 * 46.process.ppid 属性返回当前父进程的进程 ID
 * 47.process.release 属性返回与当前发布相关的元数据对象，包括源代码和源代码头文件 tarball 的 URLs。
 * 48.process.send()方法可以用来给父进程发送消息。 接收到的消息被视为父进程的 ChildProcess 对象上的一个'message'事件。
 * 49.process.setegid()方法为进程设置有效的用户组 ID。
 * 这个方法只在 POSIX 平台可用(换句话说，Windows 或 Android 不行)。
 * 50.process.seteuid()方法为进程设置有效的用户 ID。
 * 这个方法只在 POSIX 平台可用(换句话说，Windows 或 Android 不行)。
 * 51.process.setgid() 为进程方法设置组 ID.
 * 这个方法只在 POSIX 平台可用(换句话说，Windows 或 Android 不行)。
 * 52.process.setgroups(groups)
 * 53.process.setuid(id) 设置进程的用户 ID
 * 这个方法只在 POSIX 平台可用(换句话说，Windows 或 Android 不行)。
 * 54.process.setUncaughtExceptionCaptureCallback(fn)
 */

/**
 * 55.process.stderr 属性返回连接到 stderr(fd 2)的流
 * 556.process.stdin 属性返回连接到 stdin (fd 0)的流
 * 557.process.stdout 属性返回连接到 stdout (fd 1)的流。
 */
// /_1:声明变量_/;
var num1, num2;
// /_2：向屏幕输出，提示信息，要求输入 num1_/;
process.stdout.write('请输入 num1 的值：');
// /_3：监听用户的输入_/;
process.stdin.on('data', function (chunk) {
  if (!num1) {
    num1 = Number(chunk);
    // /_4：向屏幕输出，提示信息，要求输入 num2_/;
    process.stdout.write('请输入 num2 的值');
  } else {
    num2 = Number(chunk);
    process.stdout.write('结果是：' + (num1 + num2));
  }
});

/**
 * 58.process.throwDeprecation 属性表示--throw-deprecation 标记是否被设置到当前 Node.js 进程上。
 * 59.process.title 属性用于获取或设置当前进程在 ps 命令中显示的进程名字
 * 60.process.traceDeprecation
 * 61.process.umask()方法用于返回或设置 Node.js 进程的默认创建文件的权限掩码。
 * 62.process.uptime() 方法返回当前 Node.js 进程运行时间秒长
 * 该返回值包含秒的分数。 使用 Math.floor() 来得到整秒钟。
 * 63.process.version 属性返回 Node.js 的版本信息
 * 64.process.versions 属性返回一个对象，此对象列出了 Node.js 和其依赖的版本信息。
 */
```

## 注意：

```ts
/**
 * 正常情况下，如果没有异步操作正在等待，那么 Node.js 会以状态码 0 退出，其他情况下，会 用如下的状态码:
 * 1 未捕获异常 - 有一个未被捕获的异常, 并且没被一个 domain 或 an 'uncaughtException' 事件处理器处理。
 * 2 - 未被使用 (Bash 为防内部滥用而保留)
 * 3 内部 JavaScript 分析错误 - Node.js 的内部的 JavaScript 源代码 在引导进程中导致了一个语法分析错误。 这是非常少见的, 一般只会在开发 Node.js 本身的时候出现。
 * 4 内部 JavaScript 执行失败 - 引导进程执行 Node.js 的内部的 JavaScript 源代码时，返回函数值失败。 这是非常少见的, 一般只会在开发 Node.js 本身的时候出现。
 * 5 致命错误 - 在 V8 中有一个致命的错误. 比较典型的是以 FATALERROR 为前缀从 stderr 打印出来的消息。
 * 6 非函数的内部异常处理 - 发生了一个内部异常，但是内部异常处理函数 被设置成了一个非函数，或者不能被调用。
 * 7 内部异常处理运行时失败 - 有一个不能被捕获的异常。 在试图处理这个异常时，处理函数本身抛出了一个错误。 这是可能发生的, 比如, 如果一个 'uncaughtException' 或者 domain.on('error') 处理函数抛出了一个错误。
 * 8 - 未被使用. 在之前版本的 Node.js, 退出码 8 有时候表示一个未被捕获的异常。
 * 9 - 不可用参数 - 也许是某个未知选项没有确定，或者没给必需要的选项填值。
 * 10 内部 JavaScript 运行时失败 - 调用引导函数时， 引导进程执行 Node.js 的内部的 JavaScript 源代码抛出错误。 这是非常少见的, 一般只会在开发 Node.js 本身的时候出现。
 * 12 不可用的调试参数 - --inspect 和/或 --inspect-brk 选项已设置，但选择的端口号无效或不可用。

 * 128 退出信号 - 如果 Node.js 的接收信号致命诸如 SIGKILL 或 SIGHUP，那么它的退出代码将是 128 加上信号的码值。 这是 POSIX 的标准做法，因为退出码被定义为 7 位整数，并且信号退出设置高位，然后包含信号码值。
 */
```

## 单词：

```pug
exit 出口 退出
disconnect 断开
exception 例外
resume 继续 简历
stack 堆栈
trace 追踪
deprecation 贬低 不赞同
abort 终止 流产
core 核心
arch 主要 拱门
channel 通道
usage 使用 习惯
previous 以前的
exec 执行程序
harmony 和谐
shell 壳
tuple 元组
extra 额外的
kill 杀死
heap 堆
tick 打上勾 滴答
release 释放
umask 掩码
```
