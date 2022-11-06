## mobx 的基本用法

```tsx
/**
 * 1.定义状态并使其可观察
 */

import { observable, action } from 'mobx';
class ListStore {
  @observable listNum = 1;
  @action addNum() {
    this.listNum += 1;
  }
  @action lessNum() {
    this.listNum -= 1;
  }
}
export default ListStore;

/** 2.创建响应式视图 - 方法1通过inject注入  */

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
@inject('listStore') // 注入可观察数据
@observer // 使组件变成响应式组件
class About extends Component<any> {
  render() {
    return (
      <div>
        <h1>list页数据源的number为:{this.props.listStore.listNum}</h1>
      </div>
    );
  }
}

export default About;

/** 2.创建响应式视图 - 方法1通过props属性传递  */
ReactDOM.render(<About listStore={listStore} />, document.body);

/** 3.更改状态-通过action  */
import { observable, action } from 'mobx';
class ListStore {
  @observable listNum = 1;
  @action addNum() {
    this.listNum += 1;
  }
  @action lessNum() {
    this.listNum -= 1;
  }
}
export default ListStore;

/** 执行更新数据操作  */
<button
  onClick={() => {
    this.props.listStore.lessNum();
  }}
>
  点击删除
</button>;
```

## 观察状态的改变

```tsx
import { observable, autorun } from 'mobx';
var todoStore = observable({
  /* 一些观察的状态 */
  todos: [],
  /* 推导值 */
  get completedCount() {
    return this.todos.filter((todo) => todo.completed).length;
  },
});
/* 观察状态改变的函数 */
autorun(function () {
  console.log(
    'Completed %d of %d items',
    todoStore.completedCount,
    todoStore.todos.length
  );
});
/* ..以及一些改变状态的动作 */
todoStore.todos[0] = {
  title: 'Take a walk',
  completed: false,
};
// -> 同步打印 'Completed 0 of 1 items'
todoStore.todos[0].completed = true;
// -> 同步打印 'Completed 1 of 1 items'
```

## observable 用法

```tsx
/**
 * 用法:
 * observable(value)
 * @observable classProperty = value
 *
 * 如果 value 是ES6的 Map : 会返回一个新的 Observable Map。
 * @observable 提供了细粒度的控制。
 */

import { observable, computed } from 'mobx';
class OrderLine {
  @observable price = 0;
  @observable amount = 1;
  @computed get total() {
    return this.price * this.amount;
  }
}

/**
 * @observable map = new Map()
 * 创建一个动态键的 observable 映射。如果你不但想对一个特定项的更改做出反应，
 * 而且对添加或删除该项也做出反应的话，那么 observable 映射会非常有用。
 */

@observable map = new Map()
map.merge({
  a:1,
  b:1,
});
map.set('a',5);
map.get('a');
map.clear();

/**
 * 创建一个 observable box 以便管理这样的原始类型值
 * observable.box(value) 接收任何值并把值存储到箱子中。
 * 使用 .get() 可以获取当前值，使用 .set(newValue) 可以更新值
 */
import {observable} from "mobx";
const cityName = observable.box("Vienna");
console.log(cityName.get());
// 输出 'Vienna'
cityName.observe(function(change) {
    console.log(change.oldValue, "->", change.newValue);
});
cityName.set("Amsterdam");
// 输出 'Vienna -> Amsterdam'

/**
 * 可以使用 ref 调节器。它会确保创建 observable 属性时，只追踪引用而不会把它的值转变成 observable 。
 */
class Message {
  @observable message = "Hello world"
  // 虚构的例子，如果 author 是不可变的，我们只需要存储一个引用，不应该把它变成一个可变的 observable 对象
  @observable.ref author = null
}

/**
 * 浅层可观察性
 * 使用普通的 author 数组分配给 authors 的话，会使用 observables 数组来更新 author
  */
class AuthorStore {
    @observable.shallow authors = []
}
```

## @observer

- 基本用法

```tsx
/**
 * 函数/装饰器可以用来将 React 组件转变成响应式组件。
 * 它用 mobx.autorun 包装了组件的 render 函数以确保任何组件渲染中使用的数据变化时都可以强制刷新组件。
 * observer 是由单独的 mobx-react 包提供的
 *
 * 需要组合其它装饰器或高阶组件时，请确保 observer 是最深处(第一个应用)的装饰器，否则它可能什么都不做。
 *
 */

import { observer } from 'mobx-react';
var timerData = observable({
  secondsPassed: 0,
});
setInterval(() => {
  timerData.secondsPassed++;
}, 1000);
@observer
class Timer extends React.Component {
  render() {
    return <span>Seconds passed: {this.props.timerData.secondsPassed} </span>;
  }
}
ReactDOM.render(<Timer timerData={timerData} />, document.body);
```

- 通过 observer 创建 react 无状态函数组件

```tsx
const TodoView = observer(({ todo }) => {
  /**
   * 使用autorun、reaction 和 when 函数即可简单的创建自定义 reactions
   * Reactions 和计算值很像，但它不是产生一个新的值，而是会产生一些副作用，比如打印到控制台、网络请求、递增地更新 React 组件树以修补DOM、等等。
   * 每当 unfinishedTodoCount 的数量发生变化时，下面的 autorun 会打印日志消息:
   */
  autorun(() => {
    console.log('Tasks left: ' + todo.id);
  });

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.finished}
        onChange={() => (todo.finished = !todo.finished)}
      />
      {todo.title}
    </li>
  );
});
```

- 可观察的局部组件状态

```tsx
import { observer } from 'mobx-react';
import { observable } from 'mobx';
@observer
class Timer extends React.Component {
  @observable secondsPassed = 0;
  componentWillMount() {
    setInterval(() => {
      this.secondsPassed++;
    }, 1000);
  }
  render() {
    return <span>Seconds passed: {this.secondsPassed} </span>;
  }
}
ReactDOM.render(<Timer />, document.body);
```

- 使用 inject 将组件连接到提供的 stores

```tsx
import { observer, inject, Provider } from 'mobx-react';

@inject('color')
@observer
class Button extends React.Component {
  render() {
    return (
      <button style={{ background: this.props.color }}>
        {this.props.children}
      </button>
    );
  }
}

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  render() {
    const children = this.props.messages.map((message) => (
      <Message text={message.text} />
    ));
    return (
      <Provider color="red">
        <div>{children}</div>
      </Provider>
    );
  }
}
```

- componentWillReact (生命周期钩子)

```tsx
/**
 * componentWillReact 对于 mobx-react@4+, 当接收新的 props 时并在 setState 调用后会触发此钩子
 * 当组件因为它观察的数据发生了改变，它会安排重新渲染，这个时候 componentWillReact 会被触发。
 */
import { observer } from 'mobx-react';
@observer
class TodoView extends React.Component {
  componentWillReact() {
    console.log('I will re-render, since the todo has changed!');
  }
  render() {
    return <div>this.props.todo.title</div>;
  }
}
```

- mobx-react 内置的 Observer 组件

```tsx
const MyComponent = ({ message }) => (
  <SomeContainer
    title={() => <Observer>{() => <div>{message.title}</div>}</Observer>}
  />
);
message.title = 'Bar';
```

## 对 observables 作出响应

- (@)computed 计算值

```tsx
/**
 * 计算值是高度优化过的，所以尽可能的多使用它们
 * 响应式的产生一个可以被其它 observer 使用的值，请使用 @computed
 * 不想产生一个新值，而想要达到一个效果，请使用 autorun 像打印日志
 * 一个计算值不再被观察了，例如使用它的UI不复存在了，MobX 可以自动地将其垃圾回收
 * 而 autorun 中的值必须要手动清理才行
 *
 */

// 可以在任意类属性的 getter 上使用 @computed 装饰器来声明式的创建计算属性
import { observable, computed } from 'mobx';
class OrderLine {
  @observable price = 0;
  @observable amount = 1;
  constructor(price) {
    this.price = price;
  }
  @computed get total() {
    return this.price * this.amount;
  }

  // 永远在 getter 之后 定义 setter
  set total(value) {
    // 这是一个自动的动作，不需要注解
    this.price = value / this.amount;
  }
}

// computed(expression) 函数
// 传递一个“在box中”的计算值时，它可能是有用的
import { observable, computed } from 'mobx';
var name = observable.box('John');
var upperCaseName = computed(() => name.get().toUpperCase());
var disposer = upperCaseName.observe((change) => console.log(change.newValue));
name.set('Dave');
// 输出: 'DAVE'

// @computed 装饰器不需要接收参数。如果你想创建一个能进行结构比较的计算属性时，请使用 @computed.struct。
// 内置比较器
// comparer.identity: 使用恒等 (===) 运算符来判定两个值是否相同。
// comparer.default: 等同于 comparer.identity，但还认为 NaN 等于 NaN 。
// comparer.structural: 执行深层结构比较以确定两个值是否相同。

// 错误处理
const x = observable.box(3);
const y = observable.box(1);
const divided = computed(() => {
  if (y.get() === 0) throw new Error('Division by zero');
  return x.get() / y.get();
});
divided.get(); // 返回 3
y.set(0); // OK
divided.get(); // 报错: Division by zero
divided.get(); // 报错: Division by zero
y.set(2);
divided.get(); // 已恢复; 返回 1.5
```

- Autorun 自定义反应

```tsx
/**
 * 创建一个响应式函数，而该函数本身永远不会有观察者
 * 所提供的函数总是立即被触发一次，然后每次它的依赖关系改变时会再次被触发。
 * autorun 只会观察在执行提供的函数时所使用的数据。
 */
var numbers = observable([1, 2, 3]);
var sum = computed(() => numbers.reduce((a, b) => a + b, 0));
var disposer = autorun(() => console.log(sum.get()));
// 输出 '6'
numbers.push(4);
// 输出 '10'

// Autorun 接收第二个参数，它是一个参数对象，有如下可选的参数:
// delay: 可用于对效果函数进行去抖动的数字(以毫秒为单位)。如果是 0(默认值) 的话，那么不会进行去抖。
// name: 字符串，用于在例如像 spy 这样事件中用作此 reaction 的名称。
// onError: 用来处理 reaction 的错误，而不是传播它们。
// scheduler: 设置自定义调度器以决定如何调度 autorun 函数的重新运行
autorun(
  () => {
    // 假设 profile.asJson 返回的是 observable Json 表示，
    // 每次变化时将其发送给服务器，但发送前至少要等300毫秒。
    // 当发送后，profile.asJson 的最新值会被使用。
    sendProfileToServer(profile.asJson);
  },
  { delay: 300 }
);
```

- when 自定义反应

```tsx
/**
 *  观察并运行给定的 predicate，直到返回true。
 * 一旦返回 true，给定的 effect 就会被执行，
 * 然后 autorunner(自动运行程序) 会被清理。
 * 该函数返回一个清理器以提前取消自动运行程序。
 */

class  MyResource {
    constructor() {
        when(
            // 一旦...
            () => !this.isVisible,
            // ... 然后
            () => this.dispose()
        );
    }
    @computed get isVisible() {
        // 标识此项是否可见
    }
    dispose() {
        // 清理
    }
}

// 如果没提供 effect 函数，when 会返回一个 Promise 。它与 async / await 可以完美结合。
async function() {
  await when(() => that.isVisible)
  // 等等..
}
```

- Reaction 自定义反应

```tsx
/**
 * 不同于 autorun 的是当创建时效果 函数不会直接运行，只有在数据表达式首次返回一个新值后才会运行。
 * 在执行 效果 函数时访问的任何 observable 都不会被追踪
 * 第一个(数据 函数)是用来追踪并返回数据作为第二个函数(效果 函数)的输入。
 * 粗略地讲，reaction 是 computed(expression).observe(action(sideEffect))
 * 或 autorun(() => action(sideEffect)(expression) 的语法糖
 */
const todos = observable([
  {
    title: 'Make coffee',
    done: true,
  },
  {
    title: 'Find biscuit',
    done: false,
  },
]);

// reaction 的正确用法: 对 length 和 title 的变化作出反应
reaction(
  () => todos.map((todo) => todo.title),
  (titles) => console.log('reaction 2:', titles.join(', '))
);

todos.push({ title: 'explain reactions', done: false }); // reaction 2: Make coffee, Find biscuit, explain reactions
todos[0].title = 'Make tea'; // reaction 2: Make tea, Find biscuit, explain reactions

/**
 * 当调用 reaction 时，第二个参数会作为清理函数使用。下面的示例展示了 reaction 只会调用一次
 */

const counter = observable({ count: 0 });
// 只调用一次并清理掉 reaction : 对 observable 值作出反应。
const reaction3 = reaction(
  () => counter.count,
  (count, reaction) => {
    console.log('reaction 3: invoked. counter.count = ' + count);
    reaction.dispose();
  }
);
counter.count = 1;
// 输出:
// reaction 3: invoked. counter.count = 1
counter.count = 2;
// 输出:
// (There are no logging, because of reaction disposed. But, counter continue reaction)
console.log(counter.count);
// 输出:
// 2
```

## 改变 observables

- action

```tsx
import { observable, action } from 'mobx';
class ListStore {
  @observable listNum = 1;
  @action addNum() {
    this.listNum += 1;
  }
  @action lessNum() {
    this.listNum -= 1;
  }
}
export default ListStore;

<button
  onClick={() => {
    this.props.listStore.addNum();
  }}
>
  点击添加
</button>;
```

- 编写异步 Actions (动作)

```tsx
/**
 *   @action.bound 以获取正确的 this
 * action 包装/装饰器只会对当前运行的函数作出反应，而不会对当前运行函数所调用的函数
 * （不包含在当前函数之内）作出反应！ 这意味着如果 action 中存在 setTimeout、promise 的
 * then 或 async 语句，并且在回调函数中某些状态改变了，那么这些回调函数也应该包装在 action 中
 */
mobx.configure({ enforceActions: true });
class Store {
  @observable githubProjects = [];
  @observable state = 'pending'; // "pending" / "done" / "error"
  @action
  fetchProjects() {
    this.githubProjects = [];
    this.state = 'pending';
    fetchGithubProjectsSomehow().then(
      // 内联创建的动作
      action('fetchSuccess', (projects) => {
        const filteredProjects = somePreprocessing(projects);
        this.githubProjects = filteredProjects;
        this.state = 'done';
      }),
      // 内联创建的动作
      action('fetchError', (error) => {
        this.state = 'error';
      })
    );
  }
}
```

- runInAction 工具函数 可以使用 runInAction 在函数中对状态进行修改

```tsx
mobx.configure({ enforceActions: true });
class Store {
  @observable githubProjects = [];
  @observable state = 'pending'; // "pending" / "done" / "error"
  @action
  fetchProjects() {
    this.githubProjects = [];
    this.state = 'pending';
    fetchGithubProjectsSomehow().then(
      (projects) => {
        const filteredProjects = somePreprocessing(projects);
        // 将‘“最终的”修改放入一个异步动作中
        runInAction(() => {
          this.githubProjects = filteredProjects;
          this.state = 'done';
        });
      },
      (error) => {
        // 过程的另一个结局:...
        runInAction(() => {
          this.state = 'error';
        });
      }
    );
  }
}
```

- async / await

```tsx
mobx.configure({ enforceActions: true });
class Store {
  @observable githubProjects = [];
  @observable state = 'pending'; // "pending" / "done" / "error"
  @action
  async fetchProjects() {
    this.githubProjects = [];
    this.state = 'pending';
    try {
      const projects = await fetchGithubProjectsSomehow();
      const filteredProjects = somePreprocessing(projects);
      // await 之后，再次修改状态需要动作:
      runInAction(() => {
        this.state = 'done';
        this.githubProjects = filteredProjects;
      });
    } catch (error) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}
```

## 直接操控 Observable

```tsx
/* values(thing) 将集合中的所有值作为数组返回
keys(thing) 将集合中的所有键作为数组返回
set(thing, key, value) 或 set(thing, { key: value }) 使用提供的键值对来更新给定的集合
remove(thing, key) 从集合中移除指定的项。用于数组拼接
has(thing, key) 如果集合中存在指定的 observable 属性就返回 true
get(thing, key) 返回指定键下的子项 */

import { get, set, observable, values } from 'mobx';
const twitterUrls = observable.object({
  John: 'twitter.com/johnny',
});
autorun(() => {
  console.log(get(twitterUrls, 'Sara')); // get 可以追踪尚未存在的属性
});
autorun(() => {
  console.log('All urls: ' + values(twitterUrls).join(', '));
});
set(twitterUrls, { Sara: 'twitter.com/horsejs' });
```

## 创建无状态组件的推荐方式

```tsx
/**
 * 可以解决无状态组件的热加载问题
 */
function ToDoItem(props) {
  return <div>{props.item}</div>;
}
export default observer(ToDoItem);
```

## spy(listener).注册一个全局间谍监听器，用来监听所有 MobX 中的事件

```tsx
spy((event) => {
  if (event.type === 'action') {
    console.log(`${event.name} with args: ${event.arguments}`);
  }
});
```

## 清理 reaction

```tsx
const VAT = observable(1.2);
class OrderLIne {
  @observable price = 10;
  @observable amount = 1;
  constructor() {
    // 这个 autorun 将与当前的命令行实例一起进行垃圾回收
    this.handler = autorun(() => {
      doSomethingWith(this.price * this.amount);
    });
    // 这个 autorun 将不会与当前的命令行实例一起进行垃圾回收
    // 因为 VAT 保留了引用以通知这个 autorun
    // 这反过来在作用域中保留了 `this`
    this.handler = autorun(() => {
      doSomethingWith(this.price * this.amount * VAT.get());
    });
    // 所以，为了避免细微的内存问题，总是调用清理函数..
    this.handler();
    // 当 reaction 不再需要时！
  }
}
```

## 使用 trace 进行调试

```tsx
import { observer } from "mobx-react"
import { trace } from "mobx"
@observer
class MyComponent extends React.Component {
    render() {
        trace(true) // 每当 observable 值引起这个组件重新运行时会进入 debugger
        return <div>{this.props.user.name}</name>
    }
}
```

## 工具函数

- toJS

```tsx
/** 递归地将一个(observable)对象转换为 javascript 结构  */
var obj = mobx.observable({
  x: 1,
});
var clone = mobx.toJS(obj);
console.log(mobx.isObservableObject(obj)); // true
console.log(mobx.isObservableObject(clone)); // false
```

- Atom

```tsx
/**
 * Atom 可以用来通知 Mobx 某些 observable 数据源被观察或发生了改变。当数据源被使用或不再使用时，MobX 会通知 atom 。
 */
import { createAtom, autorun } from 'mobx';
class Clock {
  atom;
  intervalHandler = null;
  currentDateTime;
  constructor() {
    // 创建一个 atom 用来和 MobX 核心算法交互
    this.atom = createAtom(
      // 第一个参数: atom 的名字，用于调试
      'Clock',
      // 第二个参数(可选的): 当 atom 从未被观察到被观察时的回调函数
      () => this.startTicking(),
      // 第三个参数(可选的): 当 atom 从被观察到不再被观察时的回调函数
      // 注意同一个 atom 在这两个状态之间转换多次
      () => this.stopTicking()
    );
  }
  getTime() {
    // 让 MobX 知道这个 observable 数据源已经使用了
    // 如果 atom 当前是被某些 reaction 观察的，那么 reportObserved 方法会返回 true
    // 如果需要的话，reportObserved 还会触发 onBecomeObserved 事件处理方法(startTicking)
    if (this.atom.reportObserved()) {
      return this.currentDateTime;
    } else {
      // 显然 getTime 被调用的同时并没有 reaction 正在运行
      // 所以，没有人依赖这个值，因此 onBecomeObserved 处理方法(startTicking)不会被触发
      // 根据 atom 的性质，在这种情况下它可能会有不同的表现(像抛出错误、返回默认值等等)
      return new Date();
    }
  }
  tick() {
    this.currentDateTime = new Date();
    // 让 MobX 知道这个数据源发生了改变
    this.atom.reportChanged();
  }
  startTicking() {
    this.tick(); // 最初的运行
    this.intervalHandler = setInterval(() => this.tick(), 1000);
  }
  stopTicking() {
    clearInterval(this.intervalHandler);
    this.intervalHandler = null;
  }
}
const clock = new Clock();
const disposer = autorun(() => console.log(clock.getTime()));
// ... 输出每一秒的时间
disposer();
// 停止输出。如果没有人使用同一个 `clock` 的话，clock 也将停止运行。
```

- intercept 拦截器

```tsx
const theme = observable({
  backgroundColor: '#ffffff',
});
const disposer = intercept(theme, 'backgroundColor', (change) => {
  if (!change.newValue) {
    // 忽略取消设置背景颜色
    return null;
  }
  if (change.newValue.length === 6) {
    // 补全缺少的 '#' 前缀
    change.newValue = '#' + change.newValue;
    return change;
  }
  if (change.newValue.length === 7) {
    // 这一定是格式正确的颜色代码！
    return change;
  }
  if (change.newValue.length > 10) disposer(); // 不再拦截今后的任何变化
  throw new Error("This doesn't like a color at all: " + change.newValue);
});
```

- Observe 观察变化

```tsx
import { observable, observe } from 'mobx';
const person = observable({
  firstName: 'Maarten',
  lastName: 'Luther',
});
const disposer = observe(person, (change) => {
  console.log(
    change.type,
    change.name,
    'from',
    change.oldValue,
    'to',
    change.object[change.name]
  );
});
person.firstName = 'Martin';
// 输出: 'update firstName from Maarten to Martin'
disposer();
// 忽略任何未来的变化
// 观察单个字段
const disposer2 = observe(person, 'lastName', (change) => {
  console.log('LastName changed to ', change.newValue);
});
```

- expr

```tsx
/**
 * expr 可以用来在计算值(computed values)中创建临时性的计算值。
 * 嵌套计算值有助于创建低廉的计算以防止运行昂贵的计算。
 */
const TodoView = observer(({ todo, editorState }) => {
  const isSelected = mobx.expr(() => editorState.selection === todo);
  return (
    <div className={isSelected ? 'todo todo-selected' : 'todo'}>
      {todo.title}
    </div>
  );
});
```

## 注意

```tsx
/**
 * render() 是 observer 组件的唯一追踪函数
 * 值不是 observable，而对象的属性才是
 */
```

```pug
reaction 反应
shallow 浅的
derivation 派生 起源
scheduler 调度器
intercept 拦截
struct 结构体
predicate 断定
dispose 处置
atom 原子
transaction 交易
expr 出口
```
