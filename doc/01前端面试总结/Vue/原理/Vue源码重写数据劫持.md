## Vue2.0 源码重写『数据劫持』

- 思路

```ts
/**
 * 首先Vue会使用documentfragment劫持根元素里包含的所有节点，这些节点不仅包括标签元素，还包括文本，甚至换行的回车。
 * 然后Vue会把data中所有的数据，用defindProperty()变成Vue的访问器属性，这样每次修改这些数据的时候，就会触发相应属性的get，set方法。
 * 接下来编译处理劫持到的dom节点，遍历所有节点，根据nodeType来判断节点类型，
 * 根据节点本身的属性（是否有v-model等属性）或者文本节点的内容（是否符合{{文本插值}}的格式）来判断节点是否需要编译。
 * 对v-model，绑定事件当输入的时候，改变Vue中的数据。
 * 对文本节点，将他作为一个观察者watcher放入观察者列表，当Vue数据改变的时候，会有一个主题对象，
 * 对列表中的观察者们发布改变的消息，观察者们再更新自己，改变节点中的显示，从而达到双向绑定的目的
 */
```

- mvvm.html

```html
<!-- 
 mvvm.html页面，实例化一个VUE对象
 -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <input type="text" v-model="message.a" />
      <ul>
        <li>{{message.a}}</li>
      </ul>
      {{name}}
    </div>
    <script src="mvvm.js"></script>
    <script src="compile.js"></script>
    <script src="observer.js"></script>
    <script src="watcher.js"></script>
    <script>
      let vm = new MVVM({
        el: '#app',
        data: {
          message: {
            a: 'hello',
          },
          name: 'haoxl',
        },
      });
    </script>
  </body>
</html>
```

- mvvm.js 主要用来劫持数据，及将节点挂载到$el上，数据挂载到$data 上。

```ts
class MVVM {
  constructor(options) {
    //将参数挂载到MVVM实例上
    this.$el = options.el;
    this.$data = options.data;
    //如果有要编译的模板就开始编译
    if (this.$el) {
      //数据劫持－就是把对象的所有属性改成get和set方法
      new Observer(this.$data);
      //将this.$data上的数据代理到this上
      this.proxyData(this.$data);
      //用数据和元素进行编译
      new Compile(this.$el, this);
    }
  }
  //将this.$data上的数据代理到this上
  proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newValue) {
          data[key] = newValue;
        },
      });
    });
  }
}
```

- observer.js

```ts
/**
 * 利用Object.defineProerty来劫持数据，结合发布订阅模式来响应数据变化。
 */
class Observer {
  constructor(data) {
    this.observe(data);
  }
  observe(data) {
    //将data数据原有属性改成set和get的形式，如果data不为对象，则直接返回
    if (!data || typeof data !== 'object') {
      return;
    }
    //要将数据一一劫持，先获取data中的key和value
    Object.keys(data).forEach((key) => {
      //劫持
      this.defineReactive(data, key, data[key]);
      this.observe(data[key]); //递归劫持，data中的对象
    });
  }
  defineReactive(obj, key, value) {
    let that = this;
    let dep = new Dep(); // 每个变化的数据都会对应一个数组，这个数组是存放所有更新的操作
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      //取值时会触发的方法
      get() {
        //当取值时调用的方法
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      //赋值时会触发的方法
      set(newValue) {
        //给data中的属性赋新值
        if (newValue !== value) {
          //如果是对象继续劫持
          that.observe(newValue);
          value = newValue;
          dep.notify(); //通知所有人数据更新了
        }
      },
    });
  }
}

// 发布和订阅
class Dep {
  constructor() {
    //订阅的数组
    this.subs = [];
  }
  //添加订阅
  addSub(watcher) {
    this.subs.push(watcher);
  }
  notify() {
    //调用watcher的更新方法
    this.subs.forEach((watcher) => watcher.update());
  }
}
```

- watcher.js

```ts
/**
 * 观察者的目的就是给需要变化的元素加一个观察者，当数据变化后执行对应的方法
 */

class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    //获取旧的值
    this.value = this.get();
  }
  getVal(vm, expr) {
    expr = expr.split('.');
    return expr.reduce((prev, next) => {
      //vm.$data.a.b
      return prev[next];
    }, vm.$data);
  }
  get() {
    Dep.target = this; //将实例赋给target
    let value = this.getVal(this.vm, this.expr);
    Dep.target = null; //
    return value; //将旧值返回
  }
  // 对外暴露的方法
  update() {
    //值变化时将会触发update，获取新值，旧值已保存在value中
    let newValue = this.getVal(this.vm, this.expr);
    let oldValue = this.value;
    if (newValue !== oldValue) {
      this.cb(newValue); //调用watch的回调函数
    }
  }
}
```

- compile.js

```ts
/**
 * 利用DocumentFragment文档碎片创建DOM节点，然后利用正则解析{{}}，将数据渲染到此区域。
 */
class Compile {
  constructor(el, vm) {
    //el为MVVM实例作用的根节点
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    //如果元素能取到才开始编译
    if (this.el) {
      //1.先把这些真实DOM移入到内存中fragment
      let fragment = this.node2fragment(this.el);
      //2.编译=>提取想要的元素节点 v-model或文本节点{{}}
      this.compile(fragment);
      //3.把编译好的fragment塞到页面中
      this.el.appendChild(fragment);
    }
  }
  /*辅助方法*/
  //判断是否是元素
  isElementNode(node) {
    return node.nodeType === 1;
  }
  //是否是指令
  isDirective(name) {
    return name.includes('v-');
  }
  /*核心方法*/
  //将el中的内容全部放到内存中
  node2fragment(el) {
    //文档碎片－内存中的文档碎片
    let fragment = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = el.firstChild)) {
      fragment.appendChild(firstChild);
    }
    return fragment; //内存中的节点
  }
  //编译元素
  compileElement(node) {
    //获取节点所有属性
    let attrs = node.attributes;
    Array.from(attrs).forEach((attr) => {
      //判断属性名是不是包含v-
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        //取到对应的值放到节点中
        let expr = attr.value;
        //指令可能有多个，如v-model、v-text、v-html，所以要取相应的方法进行编译
        let [, type] = attrName.split('-'); //解构赋值[v,model]
        CompileUtil[type](node, this.vm, expr);
      }
    });
  }
  compileText(node) {
    //带{{}}
    let expr = node.textContent;
    let reg = /\{\{([^}]+)\}\}/g;
    if (reg.test(expr)) {
      CompileUtil['text'](node, this.vm, expr);
    }
  }
  compile(fragment) {
    //当前父节点节点的子节点，包含文本节点，类数组对象
    let childNodes = fragment.childNodes;
    // 转换成数组并循环判断每一个节点的类型
    Array.from(childNodes).forEach((node) => {
      if (this.isElementNode(node)) {
        //是元素节点
        //编译元素
        this.compileElement(node);
        //如果是元素节点，需要再递归
        this.compile(node);
      } else {
        //是文本节点
        //编译文本
        this.compileText(node);
      }
    });
  }
}

//编译方法，暂时只实现v-model及{{}}对应的方法
CompileUtil = {
  getVal(vm, expr) {
    expr = expr.split('.');
    return expr.reduce((prev, next) => {
      //vm.$data.a.b
      return prev[next];
    }, vm.$data);
  },
  getTextVal(vm, expr) {
    //获取编译后的文本内容
    return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      return this.getVal(vm, arguments[1]);
    });
  },
  text(node, vm, expr) {
    //文本处理
    let updateFn = this.updater['textUpdater'];
    //将{{message.a}}转为里面的值
    let value = this.getTextVal(vm, expr);
    //用正则匹配{{}}，然后将其里面的值替换掉
    expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      //解析时遇到模板中需要替换为数据值的变量时，应添加一个观察者
      //当变量重新赋值时，调用更新值节点到Dom的方法
      //new（实例化）后将调用observe.js中get方法
      new Watcher(vm, arguments[1], (newValue) => {
        //如果数据变化了文本节点需要重新获取依赖的属性更新文本中的内容
        updateFn && updateFn(node, this.getTextVal(vm, expr));
      });
    });
    //如果有文本处理方法，则执行
    updateFn && updateFn(node, value);
  },
  setVal(vm, expr, value) {
    //[message,a]给文本赋值
    expr = expr.split('.'); //将对象先拆开成数组
    //收敛
    return expr.reduce((prev, next, currentIndex) => {
      //如果到对象最后一项时则开始赋值，如message:{a:1}将拆开成message.a = 1
      if (currentIndex === expr.length - 1) {
        return (prev[next] = value);
      }
      return prev[next]; // TODO
    }, vm.$data);
  },
  model(node, vm, expr) {
    //输入框处理
    let updateFn = this.updater['modelUpdater'];
    //加一个监控，当数据发生变化，应该调用这个watch的callback
    new Watcher(vm, expr, (newValue) => {
      //当值变化后会调用cb，将新值传递回来
      updateFn && updateFn(node, this.getVal(vm, expr));
    });
    //给输入添加input事件,输入值时将触发
    node.addEventListener('input', (e) => {
      let newValue = e.target.value;
      this.setVal(vm, expr, newValue);
    });
    //如果有文本处理方法，则执行
    updateFn && updateFn(node, this.getVal(vm, expr));
  },
  updater: {
    //更新文本
    textUpdater(node, value) {
      node.textContent = value;
    },
    //更新输入框的值
    modelUpdater(node, value) {
      node.value = value;
    },
  },
};
```

- 缺点

```ts
/**
 * 使用Object.defineProperty做数据劫持的缺点
 * 只能对属性进行数据劫持，对于JS对象劫持需要深度遍历；
 * 对于数组不能监听到数据的变化，而是通过一些hack办法来实现，
 * 如push、pop、shift、unshift、splice、sort、reverse
 */
```

## Vue3.0 源码重写『数据劫持』

- 优点

```ts
/**
 * ES6新方法，它可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，
 * 都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
 */
```

```ts
/**
 * 使用了Proxy 和 Reflect
 * Proxy可以监控整个对象
 * Proxy不需要各种hack技术就可以无压力监听数组变化；甚至有比hack更强大的功能——自动检测length。
 * 除此之外，Proxy还有多达13种拦截方式，包括construct、deleteProperty、apply等等操作；
 * 而且性能也远优于Object.defineProperty
 */
let handler = {
  get(target, key) {
    if (typeof target[key] === 'object' && target[key] !== null) {
      // 嵌套子对象也需要进行数据代理
      return new Proxy(target[key], hanlder);
    }
    collectDeps(); // 收集依赖
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    if (key === 'length') return true;
    notifyRender(); // 通知订阅者更新
    return Reflect.set(target, key, value);
  },
};
let proxy = new Proxy(data, handler);
proxy.age = 18; // 支持新增属性
let proxy1 = new Proxy({ arr: [] }, handler);
proxy1.arr[0] = 'proxy'; // 支持数组内容变化
```

- proxy 是可以监控数组的

```ts
/**
 * proxy是可以监控数组的
 */
let arr = [1, 2, 3];
let proxy = new Proxy(arr, {
  get: function (target, key, receiver) {
    console.log('get的key为 ===>' + key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log('set的key为 ===>' + key, value);
    return Reflect.set(target, key, value, receiver);
  },
});
proxy[0]; // set的key为 ===>0
proxy[3] = 12; // set的key为 ===>3  12
```

## 计算属性的原理

```ts
/**
 * 1.data 属性初始化 getter setter
 * 2.computed 计算属性初始化，提供的函数将用作计算属性的getter
 * 3.当首次获取计算属性的值时，Dep 开始依赖收集,添加到自己的观察者列表中
 * 建立对于的依赖关系,当依赖发送变化的时候,会触发计算属性的重新计算
 */
```

## 数据监听原理 Watch

```ts
/**
 * watch 在一开始初始化的时候，会 读取 一遍 监听的数据的值，于是，此时 那个数据就收集到 watch 的 watcher 了
 * 然后 你给 watch 设置的 handler ，watch 会放入 watcher 的更新函数中
 * 当 数据改变时，通知 watch 的 watcher 进行更新，于是 你设置的 handler 就被调用了
 */
```

- 基础例子

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```ts
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello',
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('');
    },
  },
});
```

## 单词

```pug
mutable 可变的
reflect 反射
```
