## mbox 的实现原理

- mobx 是基本概念

```ts
/**
 * Observable  //被观察者
 * Observer    //观察者
 * Reaction    //响应
 */
```

- 在被观察者和观察者之间建立依赖关系

```ts
/**
 * 通过一个Reaction来track一个函数，该函数中访问了Observable变量，
 * Observable变量的get方法会被执行，此时可以进行依赖收集，将此函数加入到该Observable变量的依赖中。
  */
 //伪代码
reaction.track(function() {
    mobx.beginCollect();  //开始收集
    handler();            //被观察函数
    mobx.endCollect();    //结束收集
}
```

- 触发依赖函数

```ts
/**
 * 上一步中Observable中，已经收集到了该函数。
 * 一旦Observable被修改，会调用set方法，就是依次执行该Observable之前收集的依赖函数，当前函数就会自动执行。
 *
 * mobx底层对数据的观察，是使用Object.defineProperty(Mobx4)或Proxy(Mobx5)，
 * Mobx4中Array是用类数组对象来模拟的，原始值是装箱为一个对象
 */
```

- mobx-react 如何更新 react 状态

```ts
/**
 * observer这个装饰器，对React组件的render方法进行track。
 * 将render方法，加入到各个observable的依赖中。当observable发生变化，track方法就会执行。
 * track中，还是先进行依赖收集，调用forceUpdate去更新组件，
 * 一个mobx添加的周componentWillReact，也会在此时执行。然后结束依赖收集。
 * 次都进行依赖收集的原因是，每次执行依赖可能会发生变化。
 */
import React, { Component} from 'react';
import { observer } from 'mobx-react';

@observer
export default MyCom extends Component {
  render() {
    // ...do something
  }
}
```
