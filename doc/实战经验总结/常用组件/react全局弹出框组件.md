## raect 全局弹出框组件

- React.createElement

```ts
/**
 * React.createElement()： 根据指定的第一个参数创建一个React元素
 * 方法接受三个参数，第一个参数是组件类型，第二个参数是要传递给组件的属性，第三个参数是children。
 * 方法最终会返回一个具有以下属性的对象
 * 最后我们看到React通过createElement方法将组件或者元素转成ReactElement，并最终通过一系列操作渲染到页面成为HTMLElement。
 */
```

- ReactDOM.render

```ts
/**
 * 在提供的 container 里渲染一个 React 元素，并返回对该组件的引用（或者针对无状态组件返回 null）。
 * ReactDOM.render() 不会修改容器节点（只会修改容器的子节点）。
 * 可以在不覆盖现有子节点的情况下，将组件插入已有的 DOM 节点中。
 */
```

- ReactDOM.createPortal(child, container)

```ts
/**
 * 创建 portal。Portal 将提供一种将子节点渲染到 DOM 节点中的方式，该节点存在于 DOM 组件的层次结构之外。
 */
```

- unmountComponentAtNode()

```ts
/**
 * 从 DOM 中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。
 * 如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。如果组件被移除将会返回 true，如果没有组件可被移除将会返回 false。
 */

let div;
div = document.createElement('div');
document.body.appendChild(div);

// 挂载
let Box = ReactDOM.render(React.createElement(Alert, props), div);

ReactDOM.unmountComponentAtNode(div);
document.body.removeChild(div);

// 卸载
ReactDOM.unmountComponentAtNode(div);
document.body.removeChild(div);
```

- 全局弹出层组件基本思路

```ts
import React from 'react';
import ReactDOM from 'react-dom';

class Alert extends React.Component {
  show = () => {
    console.log('点击弹出组件');
  };
  render() {
    return (
      <div className="alert-box">
        <p>alert 组件</p>
      </div>
    );
  }
}

let div = document.createElement('div');
let props = {};

document.body.appendChild(div);
// 如果这么写Box将会返回null
// let Box = ReactDOM.render(Alert, div);
// 这么写会返回Alert组件的实例
let Box = ReactDOM.render(React.createElement(Alert, props), div);
console.log('alert组件加载了……');
export default Box;
```
