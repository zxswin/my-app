## react-transition-group 动画库的使用

## React 实现普通的动画效果

- 使用 transition 进行动画的过渡切换

```jsx
import { useState, useCallback } from 'react';
import classnames from 'classnames';
import './style.scss';

const TestAnimation = () => {
  const [show, setShow] = useState(true);
  const handleToggole = useCallback(() => {
    setShow(!show);
  }, [show]);
  return (
    <div className="TestAnimation">
      {/* 这里是关键样式名的切换 会触发transition动画 */}
      <div
        className={classnames({
          show: show,
          hide: !show,
        })}
      >
        动画效果展示文字
      </div>
      <button onClick={handleToggole}>切换过渡动画</button>
    </div>
  );
};

export default TestAnimation;
```

```scss
.show {
  opacity: 1;
  transition: all 1s ease-in;
}

.hide {
  opacity: 0;
  transition: all 1s ease-in;
}
```

- 使用 animation 关键帧实现动画效果的切换

```scss
.show {
  animation: show-item 1s ease-in forwards;
}

.hide {
  animation: hide-item 1s ease-in forwards;
}

@keyframes show-item {
  0% {
    opacity: 0;
    color: blue;
  }
  50% {
    opacity: 0.5;
    color: green;
  }
  100% {
    opacity: 1;
    color: red;
  }
}

@keyframes hide-item {
  0% {
    opacity: 1;
    color: red;
  }
  50% {
    opacity: 0.5;
    color: green;
  }
  100% {
    opacity: 0;
    color: blue;
  }
}
```

## React 动画组件 react-transition-group

- 安装

```tsx
/**
 * react官方提供的动画过渡库，有着完善的API文档
 * 安装:
 * npm install react-transition-group -S
 * npm install @types/react-transition-group -S
 *
 * 相关的css样式类
 * xxx-enter: 进入（入场）前的CSS样式；
 * xxx-enter-active:进入动画直到完成时之前的CSS样式;
 * xxx-enter-done:进入完成时的CSS样式;
 * xxx-exit:退出（出场）前的CSS样式;
 * xxx-exit-active:退出动画知道完成时之前的的CSS样式。
 * xxx-exit-done:退出完成时的CSS样式。
 *
 * unmountOnExit 属性
 * 加上这个的意思是在元素退场时，自动把DOM也删除
 *
 */


import { CSSTransition } from 'react-transition-group'

render() {
    return (
        <div>
            <CSSTransition
                in={this.state.isShow}   //用于判断是否出现的状态
                timeout={2000}           //动画持续时间
                classNames="boss-text"   //className值，防止重复 要注意的是这个属性是classNames 后面是有s的
                unmountOnExit
            >
                <div>BOSS级人物-孙悟空</div>
            </CSSTransition>
            <div><button onClick={this.toToggole}>召唤Boss</button></div>
        </div>
        );
}

```

- react-transition-group css 文件示例

```css
.boss-text-enter {
  opacity: 0;
}
.boss-text-enter-active {
  opacity: 1;
  transition: opacity 2000ms;
}
.boss-text-enter-done {
  opacity: 1;
}
.boss-text-exit {
  opacity: 1;
}
.boss-text-exit-active {
  opacity: 0;
  transition: opacity 2000ms;
}
.boss-text-exit-done {
  opacity: 0;
}
```

- react-transition-group 多 DOM 动画制作和编写

```tsx
import { CSSTransition, TransitionGroup } from 'react-transition-group';

<ul
  ref={(ul) => {
    this.ul = ul;
  }}
>
  <TransitionGroup>
    {this.state.list.map((item, index) => {
      return (
        <CSSTransition
          timeout={1000}
          classNames="boss-text"
          unmountOnExit
          appear={true}
          key={index + item}
        >
          <XiaojiejieItem
            content={item}
            index={index}
            deleteItem={this.deleteItem.bind(this)}
          />
        </CSSTransition>
      );
    })}
  </TransitionGroup>
</ul>;
```
