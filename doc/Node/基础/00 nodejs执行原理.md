## nodeJS 执行原理

- node 中的定时器

```ts
/**
 * node中有4种定时器
 * 1.setTimeout
 * 2.setInterval
 * 3.setImmediate
 * 4.process.nextTick
 */
```

- libuv 引擎中事件循环分为 6 个阶段

```ts
/**
 * 在node中，I/O处理方面有自己的libuv引擎
 *
 * update_time
 * 在事件循环的开头，这一步的作用实际上是为了获取一下系统时间，以保证之后的timer有个计时的标准。
 * 这个动作会在每次事件循环的时候都发生，确保了之后timer触发的准确性。（其实也不太准确....)
 *
 * 第一阶段 timers
 * 事件循环跑到这个阶段的时候，要检查是否有到期的timer,其实也就是setTimeout和setInterval这种类型的timer，
 * 到期了，就会执行他们的回调。
 *
 * 第二阶段  I/O callbacks
 * 处理异步事件的回调，比如网络I/O，比如文件读取I/O。当这些I/O动作都结束的时候，
 * 在这个阶段会触发它们的回调进入队列。
 *
 * 第三阶段 idle, prepare
 * 这个阶段内部做一些动作，与理解事件循环没啥关系
 * 此阶段只在内部使用
 *
 * 第四阶段
 * I/O poll阶段
 * 轮循 I/O 操作 是否有 I/O callback 如果没有就会阻塞(超时和基本检测)一段时间
 * 在poll阶段主要执行两件事：执行I/O回调、处理队列中的事件。
 * 1.如果poll队列不为空，则执行队列中的回调；
 * 2.如果队列中为空，且有setImmediate回调要执行，就会立即停止poll阶段，进入check阶段执行setImmediate的回调；
 * 3.如果队列为空，并且没有setImmediate回调要执行，poll阶段将等待新的callback被加入。
 * 4.如果有timer的话并且poll队列为空，则会检查是否有timer超时，如果有的话就回到timer阶段，执行相应的回调。
 *
 * 第五阶段 check
 * 执行setImmediate操作
 *
 * 第六阶段 close callbacks
 * 关闭I/O的动作，比如文件描述符的关闭，链接断开，等等等
 *
 * process.nextTick的操作，会在每一轮事件循环的最后执行
 * Node 规定，process.nextTick和Promise的回调函数，追加在本轮循环，即同步任务一旦执行完成，就开始执行它们。
 * 当要确保在下一个事件循环迭代中代码已被执行，则使用 nextTick()。
 */
```

- process.nextTick()

```ts
/**
 * 每当事件循环进行一次完整的行程时，我们都将其称为一个滴答。
 * 当将一个函数传给 process.nextTick() 时，则指示引擎在当前操作结束（在下一个事件循环滴答开始之前）时调用此函数：
 */
process.nextTick(() => {
  //做些事情
});
```

- poll 阶段

```ts
/**
 * 在poll阶段主要执行两件事：执行I/O回调、处理队列中的事件。
 * 当事件循环在poll阶段时：
 * 1.如果poll队列不为空，则执行队列中的回调；
 * 2.如果队列中为空，且有setImmediate回调要执行，就会立即停止poll阶段，进入check阶段执行setImmediate的回调；
 * 3.如果队列为空，并且没有setImmediate回调要执行，poll阶段将等待新的callback被加入。
 * 4.如果有timer的话并且poll队列为空，则会检查是否有timer超时，如果有的话就回到timer阶段，执行相应的回调。
 */
```

- setTimeout 与 setImmediate 区别

```ts
/**
 * setTimeout与setImmediate区别
 */

// 如果二者都从主模块内调用，则计时器将受进程性能的约束
// 输出结果不一定，有可能先是1，也有可能先是2
// 因为setTimeout的第二个参数默认为0，但实际上，Node做不到0秒，最少也要1毫秒。
// 那么进入事件循环后，如果没到1毫秒，那么timers阶段就会跳过，进入check阶段。
setTimeout(() => console.log(1));
setImmediate(() => console.log(2));

// 如果两者在I/O周期内调用，始终先执行setImmediate回调
// 因为I/O回调是在poll阶段执行，当回调执行完毕之后队列为空
// 发现存在setImmediate的回调就会进入check阶段
// 执行完毕后，再进入timer阶段。
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```

- 单词

```pug
idle 闲置的
prepare 准备
```
