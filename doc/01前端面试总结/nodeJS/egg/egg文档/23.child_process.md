# 在node中，child_process这个模块非常重要。掌握了它，等于在node的世界开启了一扇新的大门。

## 进程与线程
* 线程是最小的执行单元，而进程由至少一个线程组成。

## CPU密集型和I/O密集型区别
### I/O密集型
* 大部分时间花在计算上
> 些大量循环的代码（例如：图片处理、视频编码、人工智能等）就是CPU密集型。

### I/O密集型
* 在input 和output上花费了大多时间
> 比如文件的读取和写入

## nodeJs的优点和缺点
* 优点
``` bash
1. 高并发（最重要的优点）
2. 适合I/O密集型应用
```
* 缺点
``` bash
1. 不适合CPU密集型应用；
```
## nodeJs的适用场景
* RESTful API
* 统一Web应用的UI层(通过接口处理页面的生成)
* 大量Ajax请求的应用
* NodeJS适合运用在高并发、I/O密集、少量业务逻辑的场景。

## 深入理解单线程实现高并发原理
* nodeJs 底层结构
*  Javascript中调用的方法，最终都会通过 process.binding 传递到 C/C++ 层面，最终由他们来执行真正的操作。
``` bash
1.Node.js 标准库
2.Node bindings 实现在 node.cc 把js转换为c来执行
3.V8：Google 推出的 Javascript VM 解释js代码
4.Libuv：它为 Node.js 提供了跨平台，线程池，事件池，异步 I/O 等能力，是 Node.js 如此强大的关键。
5.C-ares：提供了异步处理 DNS 相关的能力
6.http_parser、OpenSSL、zlib 等：提供包括 http 解析、SSL、数据压缩等其他的能力。
``` 

* nodeJs 的 '单线程'
``` bash
1.Node.js的单线程指的是主线程是“单线程”
由主要线程去按照编码顺序一步步执行程序代码，假如遇到同步代码阻塞，主线程被占用，后续的程序代码执行就会被卡住。

2.Node.js有多种线程
js引擎执行的线程
定时器线程(setTimeout, setInterval)
异步http线程(ajax)

3.通过事件驱动/事件循环实行高并发 （主线程 和 线程池）
每个Node.js进程只有一个主线程在执行程序代码，形成一个执行栈（execution context stack)。
主线程之外，还维护了一个 `事件队列`（Event queue）。
异步操作到来时，node都会把它放到Event Queue之中，此时并不会立即执行它
主线程代码执行完毕完成后，然后通过Event Loop，也就是事件循环机制，开始到Event Queue的开头取出第一个事件，从线程池中分配一个线程去执行这个事件
每当有新的事件加入到事件队列中，都会通知主线程按顺序取出交EventLoop处理。当有事件执行完毕后，会通知主线程，主线程执行回调，线程归还给线程池。
node将所有的阻塞操作都交给了内部的线程池去实现，本身只负责不断的往返调度，并没有进行真正的I/O操作，从而实现异步非阻塞I/O，这便是node单线程和事件驱动的精髓之处了。
```

## node中的child_process模块实现多进程
* 可以实现1个主进程，多个子进程的模式，主进程称为master进程，子进程又称工作进程。
* 在子进程中不仅可以调用其他node程序，也可以执行非node程序以及shell命令等等，执行完子进程后，以流或者回调的形式返回

### child_process提供了4个方法，用于新建子进程，这4个方法分别为spawn、execFile、exec和fork。
* 在传入参数的同时，会检测传入实参执行的安全性，如果存在安全性问题，会抛出异常。除了execFile外，spawn和fork也都不能直接执行shell，因此安全性较高。

* exec 与execFile 不同的是exec可以直接执行一串shell命令。

``` js
/** 子进程执行的是非node程序，传入一串shell命令，执行后结果以回调的形式返回 
 * exec正如命令行一样，执行的等级很高，执行后会出现安全性的问题
*/
let cp=require('child_process');
cp.exec('echo hello world',function(err,stdout){
  console.log(stdout);
});
```

* execFile：子进程中执行的是非node程序，提供一组参数后，执行的结果以回调的形式返回。

``` js
/** exec是直接执行的一段shell命令，而execFile是执行的一个应用  
 *  执行的是非node应用，且执行后的结果以回调函数的形式返回。
*/

let cp=require('child_process');
cp.execFile('echo',['hello','world'],function(err,stdout){
   console.log(stdout);
});

```

* spawn ： 子进程中执行的是非node程序，提供一组参数后，执行的结果以流的形式返回。
``` js
/**与execFile相比，spawn执行应用后的结果并不是执行完成后，一次性的输出的，而是以流的形式输出。
 * 对于大批量的数据输出，通过流的形式可以减少内存的使用。
  */
let cp=require('child_process');
let cat=cp.spawn('cat',['input.txt']);
let sort=cp.spawn('sort');
let uniq=cp.spawn('uniq');

cat.stdout.pipe(sort.stdin);
sort.stdout.pipe(uniq.stdin);
uniq.stdout.pipe(process.stdout);
console.log(process.stdout);

```

* fork：子进程执行的是node程序，提供一组参数后，执行的结果以流的形式返回，与spawn不同，fork生成的子进程只能执行node应用。接下来的小节将具体的介绍这一些方法。
``` js
/** 通过fork方法在单独的进程中执行node程序，并且通过父子间的通信，
 * 子进程接受父进程的信息，并将执行后的结果返回给父进程。  
 * 使用fork方法，可以在父进程和子进程之间开放一个IPC通道，使得不同的node进程间可以进行消息通信。
 * 
 * 在子进程中：通过process.on('message')和process.send()的机制来接收和发送消息。
 *在父进程中：通过child.on('message')和child.send()的机制来接收和发送消息。
 * */

/** child.js  */
process.on('message',function(msg){
  process.send(msg)
})

/** parent.js  */
let cp=require('child_process');
let child=cp.fork('./child');
child.on('message',function(msg){
  console.log('got a message is',msg);
});
child.send('hello world');

/** 中断父子间通信的方式，可以通过在父进程中调用： */
child.disconnect();
```
### 同步执行的子进程
* exec、execFile、spawn和fork执行的子进程都是默认异步的，子进程的运行不会阻塞主进程。
* 除此之外，child_process模块同样也提供了execFileSync、spawnSync和execSync来实现同步的方式执行子进程。

## node中的cluster模块 多核CPU的利用
* cluster意为集成，集成了两个方面，第一个方面就是集成了child_process.fork方法创建node子进程的方式，
* 第二个方面就是集成了根据多核CPU创建子进程后，自动控制负载均衡的方式。
* 我们将master称为主进程，而worker进程称为工作进程，
* 利用cluster模块，使用node封装好的API、IPC通道和调度机可以非常简单的创建包括一个master进程下HTTP代理服务器 + 多个worker进程多个HTTP应用服务器的架构。

``` js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);

  // 衍生工作进程。
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });
} else {
  // 工作进程可以共享任何 TCP 连接。
  // 在本例子中，共享的是一个 HTTP 服务器。
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('你好世界\n');
  }).listen(8000);

  console.log(`工作进程 ${process.pid} 已启动`);
}
```








``` pug
cluster 群集
loop 回路 环
spawn 产卵
execFile 执行文件
execute 执行
fork 分叉
IPC（Inter-Process Communication，进程间通信）
binding 绑定
stack 堆栈
```