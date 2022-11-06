## koa 及中间件的实现原理

- 关于 koa 中间件的特性

```ts
/**
 * 洋葱模型
 * 调用的时候是从外往里调用,执行的时候是从里往外执行
 *
 * 这是一种尾递归的形式，尾递归的特点是最后返回的值是一个递归的函数调用，
 * 这样执行完就会在调用栈中销毁，不会占据调用栈.
 * 返回的是一个Promise.resolve包装之后的调用，而不是同步的调用，所以这是一个异步递归，
 * 异步递归比同步递归的好处是可以被打断，如果中间有一些优先级更高的微任务，那么可以先执行别的微任务
 * compose是函数复合，把n个middleware复合成一个，参数依然是context和next，
 * 这种复合之后依然是一个middleware，还可以继续进行复合。
 */
```

- 先看一个简单的实例

```ts
const Koa = require('../lib/application');

let app = new Koa();

app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(8);
});

app.use(async (ctx, next) => {
  console.log(2);
  await next();
  console.log(7);
});

app.use(async (ctx, next) => {
  console.log(3);
  await next();
  console.log(6);
});

app.use(async (ctx, next) => {
  console.log(4);
  await next();
  console.log(5);
});

app.listen(3000);

// 最终执行的打印结果
// 正确输出 1 2 3 4 5 6 7 8
```

## 中间层的实现剖析

- 1.middlewares

```ts
// 把中间层加入到中间层队列里面

use(fn) {
  this.middlewares.push(fn);
}
```

- compose 是函数复合

```ts
/**
 * 把中间件的执行结果包在一个Promise中返回出来
  */

compose(middlewares) {
  function useInRecursive(index) {
    if(index === middlewares.length) return Promise.resolve();
    let fn = middlwares[index];
    return Promise.resolve(fn(this.ctx, () => useInRecursive(index ++)));
  }
  return useInRecursive(0);
}
```
