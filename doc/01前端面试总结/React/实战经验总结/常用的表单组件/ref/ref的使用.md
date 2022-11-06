## ref 的使用

- ref 的简单使用

```tsx
import React, { Component } from 'react';
import './fishs.scss';

class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // 创建一个ref对象
    this.usernameRef = React.createRef();
  }
  // 点击按钮获取用户名
  getUserName = () => {
    // 通过ref获取控件的值
    const username = this.usernameRef.current.value;
    console.log('username', username);
  };

  render() {
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          {/* 
            当input没有value和onchange属性的时候可以自动响应输入的变化
            通过ref属性获取控件的实例对象
           */}
          <input
            ref={this.usernameRef}
            type="text"
            defaultValue="用户名"
            placeholder="请输入用户名"
          />
          <button type="button" onClick={this.getUserName}>
            获取用户名
          </button>
        </div>
      </div>
    );
  }
}

export default Fishs;
```

- ref 与 forwardRef 的使用

```tsx
import React, { Component } from 'react';
import './fishs.scss';
// 只有在类组件才可以使用ref属性
// 函数式组件不能使用ref,因为函数式组件并没有被实例化，获取不到该实例
class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // 创建一个ref对象
    this.usernameRef = React.createRef();
  }

  // 一个用户名输入框组件
  // 通过React.forwardRef ref就可以获取到组件内部的控件实例
  // 如果不使用React.forWardRef 那么ref获取到的是组件实例
  UsernameInput = React.forwardRef((props, ref) => (
    <input ref={ref} {...props} />
  ));

  // 点击按钮获取用户名
  getUserName = () => {
    // 通过ref获取控件的值
    const username = this.usernameRef.current.value;
    console.log('username', username);
  };

  render() {
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          <this.UsernameInput
            ref={this.usernameRef}
            type="text"
            defaultValue="用户名"
            placeholder="请输入用户名"
          />
          <button type="button" onClick={this.getUserName}>
            获取用户名
          </button>
        </div>
      </div>
    );
  }
}

export default Fishs;
```

- 在类组件上使用 ref

```tsx
import React, { Component } from 'react';
import './fishs.scss';

// 定义一个输入控件的子组件
class UsernameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.inputRef = React.createRef();
  }

  // 子组件中定义类一个公用的方法
  showInputValue() {
    const value = this.inputRef.current.value;
    console.log('当前控件是输入值是', value);
  }

  render() {
    return (
      <React.Fragment>
        <input
          ref={this.inputRef}
          type="text"
          defaultValue="用户名"
          placeholder="请输入用户名"
        />
      </React.Fragment>
    );
  }
}

class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // 创建一个ref对象
    this.usernameRef = React.createRef();
  }

  // 点击按钮获取用户名
  getUserName = () => {
    // 通过ref获取子组件的实例
    const sunComponent = this.usernameRef.current;
    // 可以直接调用子组件的方法
    sunComponent.showInputValue();
  };

  render() {
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          <UsernameInput ref={this.usernameRef} />
          <button type="button" onClick={this.getUserName}>
            获取用户名
          </button>
        </div>
      </div>
    );
  }
}

export default Fishs;
```

- useRef 的使用

```tsx
// 在函数式组件中可以使用useRef,不可以在类组件中使用
/**
 * 通过使用useRef可以访问Dom
 * useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。
 * 避免在渲染期间设置 refs
 */

import React, { useRef } from 'react';

const HookCom: React.FC = () => {
  const inputEl = useRef(null);
  const buttonClick = () => {
    const inputVal = inputEl.current.value;
    console.log(inputEl, inputVal);
  };

  return (
    <>
      <input ref={inputEl} type="text"></input>
      <button onClick={buttonClick}>点击获取input的值</button>
    </>
  );
};

export default HookCom;
```
