# React 面试题总结

## React 事件机制

```js
// 在react17中不再是代理到document，而是react组件树的容器节点）

// React基于浏览器事件机制实现了一套自己的事件机制，包括：事件注册、事件合成、事件冒泡、事件触发等。
// React的事件并没有绑定到具体的dom节点上，而是绑定在了document上，然后由统一的事件监听器去监听事件的触发

// 合成事件
// 合成事件是React模拟DOM原生事件的一个事件对象，这些合成事件并没有绑定到对应的真实DOM上，而是通过事件代理的方式，将所有的事件绑定到了document上。
// 优点:
// 1.兼容所有浏览器，兼容性好
// 2.性能好:
// 原生事件: 当多个事件被触发时就会创建多个事件对象，这样存在内部分配的问题。
// 对于合成事件来说，有一个专门事件池来管理事件的创建和销毁，当需要使用事件时，就会在事件池中复用对象，事件回调结束后，再销毁事件对象上的属性，以便于下次再复用对象。

// 事件注册
// React为了在触发事件时可以查到对应的回调去执行，会把组件内的所有事件统一存放到一个对象中（映射表）。首先根据事件类型分类存储，例如click事件相关的统一存储到一个对象中，回调函数的存储采用键值对的形式，key代表组件的唯一标识，value对应的就是事件的回调函数。
// React把所有事件和事件类型以及React组件进行了关联，在事件触发的时候根据当前的组件id与事件类型找到对应的回调函数。

// react事件的执行顺序
// 事件的执行顺序为原生事件先执行，合成事件再执行。
// 如果原生事件阻止冒泡，那么就会导致合成事件不执行。

// react事件阻止冒泡的方式
// event.preventDefault();阻止浏览器默认行为， 例如标签不跳转
// event.stopPropagation();阻止冒泡； 例如上级点击事件不生效
// react事件中e.stopPropagation()只能阻止react的合成事件的冒泡

// 所有的原生事件都有对应的合成事件吗？

// 不是。「几乎」所有事件都代理到了 document，说明有例外，比如audio、video标签的一些媒体事件（如 onplay、onpause 等），是 document 所不具有，这些事件只能够在这些标签上进行事件进行代理，但依旧用统一的入口分发函数（dispatchEvent）进行绑定。
```

## React 的事件和普通的 HTML 事件有什么不同？

```js
// 区别：
// 对于事件名称命名方式，原生事件为全小写，react 事件采用小驼峰
// 对于事件函数处理语法，原生事件为字符串，react 事件为函数
// react 事件不能采用 return false 的方式来阻止浏览器的默认行为
```

## React 组件中怎么做事件代理？它的原理是什么？

```js
// React 基于 Virtual DOM 实现了一个 SyntheticEvent 层(合成事件层), 定义的事件处理器会接收到一个合成事件对象的实例, 它符合 W3C 标准, 且与原生的浏览器事件拥有同样的接口, 支持冒泡机制, 所有的事件都自动绑定在最外层上。

// 在 React 底层, 主要对合成事件做了两件事:

// 事件委派: React 会把所有的事件绑定到结构的最外层, 使用统一的事件监听器, 这个事件监听器上维持了一个映射来保存所有组件内部事件监听和处理函数
// 自动绑定: React 组件中, 每个方法的上下文都会指向该组件的实例, 即自动绑定 this 为当前组件

// 首先React生成要挂载的组件的虚拟DOM（通过babel对jsx进行词法分析，然后调用React.createElement()方法返回一个对象，这个对象就是虚拟DOM）
// 然后处理组件的props，判断props内是否有声明为事件的属性比如 onClick,onChange,这个时候得到事件类型 click,change 和对应的事件处理程序 fn
// 将这些事件在document上注册
// 在组件挂载完成后，将事件处理函数存储到listenerBank（映射表）中
```

## React 高阶组件、Render props、hooks 有什么区别，为什么要不断迭代

```js
// 三者都能用来进行逻辑复用。区别在于高阶组件为接收组件，对其进行包装，Render props 为在 render 中渲染共享数据，而 hooks 是以函数调用的形式共享数据。

// 在大部分情况下，高阶组件和 Render props 都存在各自的缺陷：
// 重名问题
// 嵌套问题
// 无法在 return 之外访问数据的问题
// 数据来源不清晰的问题
// 不断迭代是为了解决上述问题，让我们可以用更加简洁的方式实现组件逻辑复用，让写代码变得更加轻松和愉快
```

## React 如何获取组件对应的 DOM 元素？

```js
// 1、ref获取dom元素
// <div ref={el => this.nodeEle = el}> ====> this.nodeEle即为获取到的元素
// 2、根据id获取dom元素
// document.getElementById(“idName”)
// 3、通过类名获取dom元素
// document.getElementsByClassName(“className”) 获取到的是一个数组集
// 4、根据标签名获取dom元素
// document.getElementsByTagName(‘标签名称’) 获取的是一个数据集
// 5、根据元素的属性name获取dom元素
// document.getElementsByName(‘属性name值’) 获取的是一个数据集
// 6、根据css选择符获取dom元素
// document.querySelector(“css选择符”) css选择符可以为元素名、类名、id名 获取的是符合条件的第一个元素，如果参数为空，则返回null
// document.querySelectorAll(‘css选择符’) css选择符可以为元素名、类名、id名 获取的是符合条件的元素列表，如果参数为空，
```

## React 中可以在 render 访问 refs 吗？为什么？

```js
// 不可以，render 阶段 DOM 还没有生成，无法获取 DOM。DOM 的获取需要在 pre-commit 阶段和 commit 阶段
<>
  <span id="name" ref={this.spanRef}>
    {this.state.title}
  </span>
  <span>{this.spanRef.current ? '有值' : '无值'}</span>
</>
```

## 对 React 的插槽(Portals)的理解，如何使用，有哪些使用场景

```js
// 1、首先简单的介绍下react中的插槽（Portals），通过ReactDOM.createPortal(child, container)创建，是ReactDOM提供的接口，可以实现将子节点渲染到父组件DOM层次结构之外的DOM节点。
// 2、第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 片段(fragment)。第二个参数（container）则是一个 DOM 元素。
// 3、对于 portal 的一个典型用例是当父组件有 overflow: hidden 或 z-index 样式，但你需要子组件能够在视觉上 “跳出(break out)” 其容器。例如，对话框、hovercards以及提示框。所以一般react组件里的模态框，就是这样实现的。
```

```tsx
/**
 * ReactDOM.createPortal(child, container)
 * 将提供一种将子节点渲染到 DOM 节点中的方式，该节点存在于 DOM 组件的层次结构之外。
 * 使用Portal使组件的挂载脱离父组件。例如：对话框，tooltip
 * 组件的挂载点虽然可以脱离父组件，但组件的事件通过冒泡机制仍可以传给父组件
 * 只要挂载的DOM存在于父组件中就可以了
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class List extends Component<any> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        onClick={() => {
          console.log('list被点击了');
        }}
      >
        {ReactDOM.createPortal(
          <span
            onClick={() => {
              console.log('Portal被点击了');
            }}
          >
            11122
          </span>,
          document.querySelector('#app')
        )}
      </div>
    );
  }
}

export default List;
```

## 在 React 中如何避免不必要的 render？

```js
// 当我们使用Component时,父组件中的state或者props发生更新时,无论子组件中的state和props是否更新,都会触发子组件的更新,会导致很多没有必要的render,浪费很多性能。

// 方案1.使用shouldComponentUpdate生命周期判断

// 方案2.使用PureComponent
// PureComponent通过props和state进行浅比较,浅比较是react源码中的一个内置函数，它替代了shouldComponentUpdate，它只比较外层数据结构,只要外层相同,则认为没有变化,不会深层次去比较数据。

// PureComponent存在的一些问题
// 1、不可以在函数式组件上使用
// 2、进行浅比较，深层次的数据不一致，有可能会导致页面得不到更新。
// 3、不太适合使用在含有多层嵌套对象的state和props中。

// 3.React.memo（useMemo）
```

## 对 React-Intl 的理解，它的工作原理？

```js
// React-intl是雅虎的语言国际化开源项目FormatJS的一部分，通过其提供的组件和API可以与ReactJS绑定。

// React-intl提供了两种使用方法，一种是引用React组件，另一种是直接调取API，官方更加推荐在React项目中使用前者，只有在无法使用React组件的地方，才应该调用框架提供的API。它提供了一系列的React组件，包括数字格式化、字符串格式化、日期格式化等。

// 在React-intl中，可以配置不同的语言包，他的工作原理就是根据需要，在语言包之间进行切换。
```

## 对 React context 的理解

```js
// 没有 context 这个概念之前，我们在组件中自上而下传递数据是通过 props 属性来实现的；如果层级不多用 props 还好，但是如果层级多了，并且只是最后一层会用到，那我们是不是每一层都得写一个 props，这样的话代码写起来很繁琐，不够优雅，不容易维护；所以 context 的出现可以解决这个问题。context 提供了一个无需为每层组件手动添加 props，就能在组件之间进行数据传递的方法。

// React.createContext：创建一个装上下文的容器组件，defaultValue 可以设置需要共享的默认数据；只有在没有被 Provider 容器包裹下的组建使用 context，默认值才会生效；
// Context.Provider：提供者，用于提供共享数据的地方，value 属性设置什么数据就共享什么数据；
// Context.Consumer：消费者，专门消费 Provider 提供的共享数据，Consumer 需要嵌套在 Provider 下面，才能通过回调的方式拿到共享的数据；（只有函数组件会用到）
// Class.contextType：记住是用于指定 contextType 等于当前的 context，必须指定，才能通过 this.context 来访问到共享的数据；（只有类组件会用到）
// Context.displayName：context 对象接收一个名为 displayName 的属性，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。
```

## 为什么 React 并不推荐优先考虑使用 Context？

```js
// 1、Context目前还处于实验阶段，可能会在后面的发行版本中有很大的变化，事实上这种情况已经发生了，所以为了避免给今后升级带来大的影响和麻烦，不建议在app中使用context。
// 2、尽管不建议在app中使用context，但是独有组件而言，由于影响范围小于app，如果可以做到高内聚，不破坏组件树之间的依赖关系，可以考虑使用context
// 3、对于组件之间的数据通信或者状态管理，有效使用props或者state解决，然后再考虑使用第三方的成熟库进行解决，以上的方法都不是最佳的方案的时候，在考虑context。
// 4、context的更新需要通过setState()触发，但是这并不是很可靠的，Context支持跨组件的访问，但是如果中间的子组件通过一些方法不影响更新，比如 shouldComponentUpdate() 返回false 那么不能保证Context的更新一定可以使用Context的子组件，因此，Context的可靠性需要关注。
```

## React 中什么是受控组件和非控组件？

```js
// 受控组件
// 受控组件就是可以被 react 状态控制的组件
// 通过 onChange 事件获取当前输入内容，将当前输入内容作为 value 传入，此时就成为受控组件。

// 非控组件
// 表单数据由 DOM 本身处理。即不受 setState() 的控制，与传统的HTML表单输入相似，input 输入值即显示最新值（使用 ref 从 DOM 获取表单值）
```

## React 中 refs 的作用是什么？有哪些应用场景？

```js
// Refs 是一个 获取 DOM节点或 React元素实例的工具。在 React 中 Refs 提供了一种方式，允许用户访问DOM 节点或者在render方法中创建的React元素。

// 适用场景
// 对DOM 元素焦点的控制、内容选择或者媒体播放；
// 通过对DOM元素控制，触发动画特效；
// 通第三方DOM库的集成。
```

## React 组件的构造函数有什么作用？它是必须的吗？

```js
// 构造函数并不是必须的,对于无状态组件，内部没有维护自己的state，只接收外部传入的props 是不需要声明构造函数的
```

## React.forwardRef 是什么？它有什么作用？

```js
// React.forwardRef 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。这种技术并不常见，但在以下两种场景中特别有用：

// 转发 refs 到 DOM 组件
// 在高阶组件中转发 refs
```

## 类组件与函数组件有什么异同？

```js
// 1. 语法上的区别：
// 函数式组件是一个纯函数，它是需要接受props参数并且返回一个React元素就可以了。类组件是需要继承React.Component的，而且class组件需要创建render并且返回React元素，语法上来讲更复杂。

// 2. 调用方式
// 函数式组件可以直接调用，返回一个新的React元素；类组件在调用时是需要创建一个实例的，然后通过调用实例里的render方法来返回一个React元素。

// 3. 状态管理
// 函数式组件没有状态管理，类组件有状态管理。

// 4. 使用场景
// 类组件没有具体的要求。函数式组件一般是用在大型项目中来分割大组件（函数式组件不用创建实例，所有更高效），一般情况下能用函数式组件就不用类组件，提升效率。
```

## React setState 调用的原理

```js
// 1、setState异步更新
// 我们都知道，React通过this.state来访问state，通过this.setState()方法来更新state。当this.setState()方法被调用的时候，React会重新调用render方法来重新渲染UI

// 首先如果直接在setState后面获取state的值是获取不到的。在React内部机制能检测到的地方， setState就是异步的；
// 在React检测不到的地方，例如setInterval,setTimeout，setState就是同步更新的

// 因为setState是可以接受两个参数的，一个state，一个回调函数。因此我们可以在回调函数里面获取值

// setState方法通过一个队列机制实现state更新，当执行setState的时候，会将需要更新的state合并之后放入状态队列，而不会立即更新this.state
// 如果我们不使用setState而是使用this.state.key来修改，将不会触发组件的re-render。
// 如果将this.state赋值给一个新的对象引用，那么其他不在对象上的state将不会被放入状态队列中，当下次调用setState并对状态队列进行合并时，直接造成了state丢失

// 如果在shouldComponentUpdate或者componentWillUpdate方法中调用setState，此时this._pending-StateQueue != null，就会造成循环调用，使得浏览器内存占满后崩溃
```

## React setState 调用之后发生了什么？是同步还是异步？

```js
// 这是的异步指的是多个state合到一起进行批量更新。

// 在React中，如果是由React引发的事件处理（比如是通过onClick引发的事件处理,以及生命周期函数调用setState），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state。
// 所谓"除此之外"，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。
```

## React 中的 setState 批量更新的过程是什么？

```js
// 在react生命周期和合成事件执行前后都有相应的钩子，分别是pre钩子和post钩子，pre钩子会调用batchedUpdate方法将isBatchingUpdates变量置为true，开启批量更新，而post钩子会将isBatchingUpdates置为false

// isBatchingUpdates变量置为true，则会走批量更新分支，setState的更新会被存入队列中，待同步代码执行完后，再执行队列中的state更新。 isBatchingUpdates为 true，则把当前组件（即调用了 setState的组件）放入 dirtyComponents 数组中；否则 batchUpdate 所有队列中的更新
// 而在原生事件和异步操作中，不会执行pre钩子，或者生命周期的中的异步操作之前执行了pre钩子，但是pos钩子也在异步操作之前执行完了，isBatchingUpdates必定为false，也就不会进行批量更新

// enqueueUpdate包含了React避免重复render的逻辑。mountComponent和updateComponent方法在执行的最开始，会调用到batchedUpdates进行批处理更新，此时会将isBatchingUpdates设置为true，也就是将状态标记为现在正处于更新阶段了。 isBatchingUpdates为 true，则把当前组件（即调用了 setState 的组件）放入dirtyComponents 数组中；否则 batchUpdate 所有队列中的更新
```

## React 中有使用过 getDefaultProps 吗？它有什么作用？

```js
// createReactClass 参数对象内的一个方法，用于初始化组件属性
//ES5写法
var Video = React.createClass({
    getDefaultProps: function(){
        return {
            autoPlay: false,
            maxLoops: 10
        }
    },
    getInitialState: function(){
        return {
            loopsRemaining: this.props.maxLoops
        }
    },
    propTypes: {
        autoPlay: React.PropTypes.bool.isRequired,
        maxLoops: React.PropTypes.number.isRequired,
        posterFrameSrc: React.PropTypes.string.isRequired,
        videoSrc: React.PropTypes.string.isRequired
    }
})

//ES6写法
class Video extends React.Component {
    static defaultProps = {
        autoPlay: false,
        maxLoops: 10
    }
    static propTypes = {
        autoPlay: React.PropTypes.bool.isRequired,
        maxLoops: React.PropTypes.number.isRequired,
        posterFrameSrc: React.PropTypes.string.isRequired,
        videoSrc: React.PropTypes.string.isRequired
    }
    //构造函数写法
    constructor(props){
        this.state = {
            ...
        }
    }
    //非构造函数写法
    state = {
        loopsRemaining: this.props.maxLoops
    }
}

//组件外部写法
Video.defaultProps = {
    autoPlay: false,
    maxLoops: 10
}
```

## React 中 setState 的第二个参数作用是什么？

```js
// 第二个参数是一个callback函数，用于setState设置state的属性值成功之后的回调，此时调用this.state.property可以取到刚刚设置的最新的值
```

## React 中的 setState 和 replaceState 的区别是什么？

```js
// setState:更新状态
// replaceState:替换状态
```

## 在 React 中组件的 this.state 和 setState 有什么区别？

```js
// 在react中，this.state与this.setState是由明显区别的，this.state是用来初始化state的，而this.setState是用来修改state的值的。
```

## state 是怎么注入到组件的，从 reducer 到组件经历了什么样的过程

```js
// 通过connect和mapStateToProps将state注入到组件中：
// active就是注入到Link组件中的状态。 mapStateToProps（state，ownProps）中带有两个参数，含义是∶
// state-store管理的全局状态对象，所有都组件状态数据都存储在该对象中。
// ownProps 组件通过props传入的参数。
import { connect } from 'react-redux';
import { setVisibilityFilter } from '@/reducers/Todo/actions';
import Link from '@/containers/Todo/components/Link';

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFilter: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);
```

- reducer 到组件经历的过程：

```js
// reducer对action对象处理，更新组件状态，并将新的状态值返回store。
// 通过connect（mapStateToProps，mapDispatchToProps）（Component）对组件 Component进行升级，此时将状态值从store取出并作为props参数传递到组件。
import React from 'react';
import PropTypes from 'prop-types';

// 高阶组件 contect
export const connect =
  (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends React.Component {
      // 通过对context调用获取store
      static contextTypes = {
        store: PropTypes.object,
      };

      constructor() {
        super();
        this.state = {
          allProps: {},
        };
      }

      // 第一遍需初始化所有组件初始状态
      componentWillMount() {
        const store = this.context.store;
        this._updateProps();
        store.subscribe(() => this._updateProps()); // 加入_updateProps()至store里的监听事件列表
      }

      // 执行action后更新props，使组件可以更新至最新状态（类似于setState）
      _updateProps() {
        const store = this.context.store;
        let stateProps = mapStateToProps
          ? mapStateToProps(store.getState(), this.props)
          : {}; // 防止 mapStateToProps 没有传入
        let dispatchProps = mapDispatchToProps
          ? mapDispatchToProps(store.dispatch, this.props)
          : {
              dispatch: store.dispatch,
            }; // 防止 mapDispatchToProps 没有传入
        this.setState({
          allProps: {
            ...stateProps,
            ...dispatchProps,
            ...this.props,
          },
        });
      }

      render() {
        return <WrappedComponent {...this.state.allProps} />;
      }
    }
    return Connect;
  };
```

## React 组件的 state 和 props 有什么区别？

```js
// props是传递给组件的（类似于函数的形参），而state是在组件内部被组件自己管理的（类似于在一个函数内声明的变量）。state是组件自己管理数据，控制自己的状态，可变；props是外部传入的数据参数，不可变。
```

## React 中的 props 为什么是只读的？

```js
// React 组件都必须像纯函数一样保护它们的 props 不被更改。

// 将react组件理解成纯函数,数据流驱动,参数传入不允许做更改

// state内容可以更改,但是不允许直接赋值,需要借助setState

// props用于定义外部接口，state用于记录内部状态

// props的赋值在于外部世界使用组件，state的赋值在于组件内部

// 组件不应该改变props的值，而state存在的目的就是让组件来修改的

// state 只能在constructor中设置默认值

// setState修改state的值是异步的
```

## React 中怎么检验 props？验证 props 的目的是什么？

```js
// 对属性进行强检验，避免运行时报错
```

## React 的生命周期有哪些？

```js
// 挂载：在组件实例被创建并插入到dom中时，生命周期调用顺序如下
// constructor
// componentWillMount
// getDerivedStateFromProps
// render
// componentDidMount

// 更新：当组件的 props 或 state 发生变化时会触发更新。
// componentWillReceiveProps ()
// shouldComponentUpdate
// componentWillUpdate
// getSnapshotBeforeUpdate
// componentDidUpdate

// 卸载：当组件从 DOM中移除时会调用如下方法：
// componentWillUnmount（）
```

## React 废弃了哪些生命周期？为什么？

```js
// React16废弃的生命周期有3个will：
// componentWillMount
// componentWillReceiveProps
// componentWillUpdate

// 废弃的原因，是在React16的Fiber架构中，调和过程会多次执行will周期，不再是一次执行，失去了原有的意义。此外，多次执行，
// 在周期中如果有setState或dom操作，会触发多次重绘，影响性能，也会导致数据错乱
```

## React 16.X 中 props 改变后在哪个生命周期中处理

```js
// static getDerivedStateFromProps():返回一个对象用于更新 state，返回 null 则不更新。

// shouldComponentUpdate():根据返回值，判断 React 组件是否受 props 变化影响。

// getSnapshotBeforeUpdate():在最近一次渲染输出(提交到 DOM 节点)之前调用。它使得组件能在更改之前从 DOM 中捕获一些信息(例如滚动信息，后台数据变更)

// componentDidUpdate():可以对比 props 变化，也可以执行一些网络请求。
```

## React 性能优化在哪个生命周期？它优化的原理是什么？

```js
// shouldComponentUpdate
// 减少不必要的重新渲染
```

## state 和 props 触发更新的生命周期分别有什么区别？

```js
// 相对于 state 更新，props 更新后唯一的区别是增加了对 componentWillReceiveProps 的调用。关于 componentWillReceiveProps，需要知道这些事情：

// componentWillReceiveProps：它在Component接受到新的 props 时被触发。componentWillReceiveProps 会接收一个名为 nextProps 的参数（对应新的 props 值）。该生命周期是 React16 废弃掉的三个生命周期之一。在它被废弃前，可以用它来比较 this.props 和 nextProps 来重新setState。在 React16 中，用一个类似的新生命周期 getDerivedStateFromProps 来代替它。
```

React 中发起网络请求应该在哪个生命周期中进行？为什么？

```js
// 异步情况可以在componentDidMount()函数中进行。
// 同步的情况可以在componentWillMount()中进行。
```

React 16 中新生命周期有哪些

```js
// 新增的生命周期
// getDerivedStateFromProps
// getSnapshotbeforeUpdate
// componentDidCatch
// getDerivedStateFromError

// 废弃的生命周期
// (React17去除，React16不允许和新的生命周期同时使用)
// componentWillMount
// componentWillReceiveProps
// componentWillUpdate
```

## 父子组件的通信方式？

```js
// 在 React 中，父子组件的通信是常见的问题，除了使用状态管理工具（如redux）以外，也可以实现父子组件的相互通信。
// 其中，父组件可以通过props、原型方法向子组件通信，子组件可以通过回调函数、事件冒泡向父组件通信。
```

## 跨级组件的通信方式？

```js
// 中间组件层层传递 props
// 使用 context 对象
```

## 非嵌套关系组件的通信方式？

```js
// 非嵌套关系的组件通信：即没有任何包含关系的组件，包括兄弟组件以及不在同一个父级中的非兄弟组件。

// 可以使用自定义事件通信（发布订阅模式）
// 可以通过redux等进行全局状态管理
// 如果是兄弟组件通信，可以找到这两个兄弟节点共同的父节点, 结合父子间通信方式进行通信。
```

## React-Router 的实现原理是什么？

```js
// 1.react-router依赖基础 - history，是一个独立的第三方js库，可以用来兼容在不同浏览器、不同环境下对历史记录的管理，拥有统一的API。具体来说里面的history分为三类:

// HashRouter：老浏览器的history,主要通过hash来实现，对应createHashHistory()
// BrowserRouter：高版本浏览器,通过html5里面的history，对应createBrowserHistory()
// **MemeoryRouter：**node环境下,主要存储在memeory里面，对应createMemoryHistory()
// *createHashHistory、createBrowserHistory、createMemoryHistory方法只是覆盖了某些基础公用方法，比如go(),replace(),push()等。BrowserRouter和HashRouter组件，前者使用pushState和popState事件构建路由，后者使用 hash 和 hashchange 事件构建路由。MemeoryRouter可以应用于像react native。

// 当url发生变化时，路由通过监听url的变化，我们不仅能直接获取和解析url路径，并且通过路由匹配，决定应该展示什么样的组件，即React组件的展示，授权路由进行控制，保证了url和视图的同步。
```

## 如何配置 React-Router 实现路由切换

```js
// 使用<Route>组件
// 路由匹配是通过比较<Route>的 path 属性和当前地址的 pathname 来实现的。当一个<Route> 匹配成功的时候，它将渲染其内容，当他不匹配的时候就会渲染 null。没有路径的<Route>将始终被匹配。

// when location = { pathname: '/about' }
<Route path='/about' component={About}/>
<Route path='/contact' component={Contact}/>
<Route component={Always}/>


// 结合使用<Switch>组件和<Route>组件
// <Switch>不是分组<Route>所必须的，但他通常很有用。一个<Switch>会遍历其所有的子<Route>元素，并渲染与当前地址匹配的第一个元素。
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
</Switch>


// 使用<Link>、<NavLink>、<Redirect>组件
// <Link> 组件来在你的应用程序中创建链接，无论你在何处渲染一个<Link>，都会在应用程序的 HTML 中渲染锚a 标签
<Link to="/">Home</Link>
//相等于 <a href='/'>Home</a>
<Navlink>是一个特殊类型的<Link>，当它的 to 属性与当前地址匹配的时候，可以将其定义为"活跃的"

{/* location = { pathname: '/react' } */}
<NavLink to="/react" activeClassName="active">
  React
</NavLink>
{/* <a href='/react' className='active'>React</a> */}
{/*
当你想强制导航时，你可以渲染一个<Redirect>。当一个<Redirect>渲染的时候，将会使用它的to属性进行定向。
 */}
```

## React-Router 怎么设置重定向？

```js
// 在老版本的使用中，我们一般都是用Redirect 进行重定向，在V6版本中，我们使用Navigate 组件
// 当我们输入一个不存在的路由路径的时候，他就会重定向到首页
export default function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        {/* 重定向到首页 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
```

## react-router 里的 Link 标签和 a 标签的区别

```js
// 从最终渲染的DOM来看，这两者都是链接，都是a标签。
// 区别是： Link标签是react-router里实现路由跳转的链接，一般配合Route使用，react-router接下了a标签的默认链接跳转行为，区别于传统的页面跳转，Link标签的"跳转"行为只会触发相匹配的Route对应的页面内容更新，而不会刷新整个页面

// Link标签做的三件事情：
// 有onclick那就执行onclick
// click的时候阻止a标签默认事件
// 根据跳转href(即使是to)，用history(web前端路由两种方式之一，history&hash)跳转，此时只是链接变了，并没有刷新页面

// a标签默认事件禁掉之后做了什么才实现了跳转？
let domArr = document.getElementByTagName('a');
[...domArr].forEach((item) => {
  item.addEventListener('click', function () {
    location.href = this.href;
  });
});
```

## React-Router 如何获取 URL 的参数和历史对象？

```js
// 通过params
// 类组件：在保证props能获取到路由信息的前提下（如果不是直接嵌套在<Route/>下，需要使用withRouter的HOC），通过this.props.match.params获取
// 函数式组件：const params = useParams();

// query传参
this.props.history.push({
  pathname: 'list',
  search: qs.stringify({
    a: 123,
  }),
});
// 取值
import qs from 'qs';
// 类组件中取值
const paramStr = this.props.location.search.slice(1);
qs.parse(paramStr); // {a: '123'}
// 在函数式组件中取值
const location = useLocation();
const paramStr = location.search.slice(1);
qs.parse(paramStr); // {a: '123'}
```

## React-Router 4 怎样在路由变化时重新渲染同一个组件？

```js
// 1.在同一个组件添加不同的key,以下重新封装了组件：
export default function (props) {
  return (<组件 {...props} key={search参数} />)
}

// 2.但是不知道在路由跳转的地方加入key可行否？
<Route path='/sdspace/offline/:id/detail' exact component={SdSpace.Detail} key={new Date().getTime()} />
<Route path='/sdspace/offline/:id/edit' exact component={SdSpace.Detail} key={new Date().getTime()} />

// 3.可以在这个组件的componentWillReceiveProps和shouldComponentUpdate生命周期方法中添加url变化的判断，如果url判断变化，就执行相关的逻辑代码(变化了就会就会重新执行render()函数，组件变会进行重新渲染。)
```

## React-Router 的路由有几种模式？

```js
// 1、BrowserRouter：浏览器的路由方式，也就是在开发中最常使用的路由方式
// 2、HashRouter：在路径前加入#号成为一个哈希值，Hash模式的好处是，再也不会因为我们刷新而找不到我们的对应路径
// 3、MemoryRouter：不存储history，所有路由过程保存在内存里，不能进行前进后退，因为地址栏没有发生任何变化
// 4、NativeRouter：经常配合ReactNative使用，多用于移动端
// 5、StaticRouter：设置静态路由，需要和后台服务器配合设置，比如设置服务端渲染时使用
```

## React-Router 4 的 Switch 有什么用？

```js
// switch排他性路由，采用 <Switch>，只有一个路由会被渲染，并且总是渲染第一个匹配到的组件，更好进行路由匹配。
```

## 对 Redux 的理解，主要解决什么问题

```js
// 介绍redux：
// 官方解释：Redux 是 JavaScript 状态容器,提供可预测化的状态管理。我的理解是，redux是为了解决react组件间通信和组件间状态共享而提出的一种解决方案，主要包括3个部分，（store + action + reducer）。

// store：用来存储当前react状态机（state）的对象。connect后，store的改变就会驱动react的生命周期循环，从而驱动页面状态的改变

// action: 用于接受state的改变命令，是改变state的唯一途径和入口。一般使用时在当前组件里面调用相关的action方法，通常把和后端的通信(ajax)函数放在这里

// reducer: action的处理器，用于修改store中state的值，返回一个新的state值

// 主要解决什么问题：
// 1、组件间通信

// 由于connect后，各connect组件是共享store的，所以各组件可以通过store来进行数据通信，当然这里必须遵守redux的一些规范，比如遵守 view -> aciton -> reducer的改变state的路径

// 2、通过对象驱动组件进入生命周期

// 对于一个react组件来说，只能对自己的state改变驱动自己的生命周期，或者通过外部传入的props进行驱动。通过redux，可以通过store中改变的state，来驱动组件进行update

// 3、方便进行数据管理和切片

// redux通过对store的管理和控制，可以很方便的实现页面状态的管理和切片。通过切片的操作，可以轻松的实现redo之类的操作
```

## Redux 原理及工作流程

```js
// redux是专门用于集中式管理状态的javascript库，他并不是react的插件库。

// 比如你有多个组件A-E都想要用同一个组件D中的状态：
// 1）像以前我们可以通过父子组件通信的方式让父组件进行传递状态，或者是让兄弟组件之间通过订阅发布进行通信
// 2）当我们使用了redux就可以直接通过让redux进行统一的状态管理，谁想要用状态就自己去拿，省去了第一种方法的层层传递

// 2、redux的工作流程

// 在我们了解redux的工作流程之前我们应该要知道redux有三个核心概念，分别为actions、store、reducers（带s的表明可能存在多个）

// 1）actions
// actions英文直译过来就是行动、动作的意思，那么我们就可以猜到他表示的是“怎么做”，简单来说actions就是一个对象，actions里面有两个属性分别为type和data：
// type：标识属性，值为字符串且唯一，必要属性（你想要做什么事情
// data：数据属性，值为任意类型，可选属性（你要做事情的数据

// 那我们浅浅举个栗子：比如计算器你可以进行加1减2等操作，那么加减乘除这个操作就是你的type，数字就是你的数据

// 2）store
// store有且只能有一个，他相当于一个最高指挥家，他负责把action动作交给对应的reducer进行执行，也就是说将state、action和reducer联系在一起的对象。

// 3）reducer
// reducer用于将store发过来的action完成并将结果返回给store，他接收两个参数preState（旧状态）和action（动作）并返回一个newState（新状态）。

// 比如像计算器我们需要在原来的数据上进行加1的操作，那么旧状态旧对应原来的数据，action对应加1的操作，返回的新状态就是计算器加完之后重新返回的结果。
```

## Redux 中异步的请求怎么处理

```js
// 答案就是使用中间件(Middleware), 如果学习过Express或Koa框架的小伙伴对中间件的概念一定不陌生;

// 由于在正常情况下, store.dispatch()只能派发一个对象, 不能派发函数; 如果dispatch想要派发函数, 我们必须要使用中间件对该store进行增强

// 首先安装redux-thunk库, 引入中间件

// 安装redux-thunk库: npm i redux-thunk, 在该库中有一个中间件thunk, 如下方式应用thunk中间件

// 派发action
const mapDispatchToProps = (dispatch) => ({
  fetchHomeMultidata() {
    // 派发一个函数, 内部返回的函数自动执行
    dispatch(fetchHomeMultidataAction());
  },
});

import axios from 'axios';

export const changeBannersAction = (banners) => ({
  type: CHANGE_BANNERS,
  banners,
});
export const changeRecommendsAction = (recommends) => ({
  type: CHANGE_RECOMMENDS,
  recommends,
});

export const fetchHomeMultidataAction = () => {
  // 派发时返回的该函数自动执行, 且传入两个参数dispatch, getState
  return (dispatch, getState) => {
    axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;

      // 获取到数据后在派发action
      dispatch(changeBannersAction(banners));
      dispatch(changeRecommendsAction(recommends));
    });
  };
};
```

## Redux 怎么实现属性传递，介绍下原理

```js
// redux是专门用于集中式管理状态的javascript库，他并不是react的插件库。

// 比如你有多个组件A-E都想要用同一个组件D中的状态：
// 1）像以前我们可以通过父子组件通信的方式让父组件进行传递状态，或者是让兄弟组件之间通过订阅发布进行通信
// 2）当我们使用了redux就可以直接通过让redux进行统一的状态管理，谁想要用状态就自己去拿，省去了第一种方法的层层传递
```

## Redux 中间件是什么？接受几个参数？柯里化函数两端的参数具体是什么？

```js
// middleware。 你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。
// 换言之，中间件都是对store.dispatch()的增强。
// 不难发现：

// 不使用middleware时，在dispatch(action)时会执行rootReducer，并根据action的type更新返回相应的state。
// 而在使用middleware时，简言之，middleware会将我们当前的action做相应的处理，随后再交付rootReducer执行。
```

## Redux 请求中间件如何处理并发

```js
// 使用redux-Saga redux-saga是一个管理redux应用异步操作的中间件，用于代替 redux-thunk 的。它通过创建 Sagas 将所有异步操作逻辑存放在一个地方进行集中处理，以此将react中的同步操作与异步操作区分开来，以便于后期的管理与维护。 redux-saga如何处理并发：

// takeEvery
// 可以让多个 saga 任务并行被 fork 执行。

import { fork, take } from 'redux-saga/effects';

const takeEvery = (pattern, saga, ...args) =>
  fork(function* () {
    while (true) {
      const action = yield take(pattern);
      yield fork(saga, ...args.concat(action));
    }
  });
```

## Redux 状态管理器和变量挂载到 window 中有什么区别

```js
// 两者都是存储数据以供后期使用。但是Redux状态更改可回溯——Time travel，数据多了的时候可以很清晰的知道改动在哪里发生，完整的提供了一套状态管理模式。

// 随着 JavaScript 单页应用开发日趋复杂，JavaScript 需要管理比任何时候都要多的 state （状态）。 这些 state 可能包括服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等。

// 管理不断变化的 state 非常困难。如果一个 model 的变化会引起另一个 model 变化，那么当 view 变化时，就可能引起对应 model 以及另一个model 的变化，依次地，可能会引起另一个 view 的变化。直至你搞不清楚到底发生了什么。state 在什么时候，由于什么原因，如何变化已然不受控制。 当系统变得错综复杂的时候，想重现问题或者添加新功能就会变得举步维艰。
// 如果这还不够糟糕，考虑一些来自前端开发领域的新需求，如更新调优、服务端渲染、路由跳转前请求数据等等。前端开发者正在经受前所未有的复杂性，难道就这么放弃了吗?当然不是。

// 这里的复杂性很大程度上来自于：我们总是将两个难以理清的概念混淆在一起：变化和异步。 可以称它们为曼妥思和可乐。如果把二者分开，能做的很好，但混到一起，就变得一团糟。一些库如 React 视图在视图层禁止异步和直接操作 DOM来解决这个问题。美中不足的是，React 依旧把处理 state 中数据的问题留给了你。Redux就是为了帮你解决这个问题。
```

## mobox 和 redux 有什么区别？

```js
// 1）Redux每一次的dispatch都会从根reducer到子reducer嵌套递归的执行，所以效率相对较低；而Mobx的内部使用的是依赖收集，所以不会有这个问题，执行的代码较少，性能相对更高；

// 2）Redux核心是不可变对象，在Reducer中的操作都要比较小心，注意不能修改到state的属性，返回时必须是一个全新的对象；而Mobx采用不存在这个问题，操作比较随意；

// 3）Redux中写法固定，模板代码较多，Mobx中写法比较随意，但是因为写法随意的原因，如果没有规范性的话，维护性则不会像Redux那么高；

// 4）正因为Redux中的reducer更新时，每次return的都是不可变对象，所以时间旅行操作相对容易，而Mobx在这方面不占优势

// 5）Redux更加的轻量，但是一般来说都会配合中间件进行使用
```

## Redux 和 Vuex 有什么区别，它们的共同思想

```js
// (1) Redux 和Vuex区别
// ●Vuex改进 了Redux中的Action和Reducer函数，以mutations变化函数取代Reducer, 无需switch, 只需在对
// 应的mutation函数里改变state值即可
// ●Vuex由 于Vue自动重新渲染的特性，无需订阅重新渲染函数，只要生成新的State即可
// ●Vuex数据流的顺序是:View调用store.commit提交对应的请求到Store中对应的mutation函数- ->store改变
// (vue检测到数据变化自动渲染)
// 通俗点理解就是，vuex 弱化dispatch,通过commit进行store状态的一次更变;取消了action概念，不必传入特
// 定的action形式进行指定变更;弱化reducer，基于commit参数直接对数据进行转变，使得框架更加简易;
// (2)共同思想.
// ●单一的数据源
// ●变化可以预测
// 本质上: redux与vuex都是对mvvm思想的服务，将数据从视图中抽离的一种方案;形式上: vuex借鉴了redux,
// 将store作为全局的数据中心，进行mode管理;
```

## Redux 中间件是怎么拿到 store 和 action? 然后怎么处理?

```js
// redux中间件本质就是一个函数柯里化。redux applyMiddleware Api 源码中每个middleware 接受2个参数， Store 的getState 函数和dispatch 函数，分别获得store和action，最终返回一个函数。该函数会被传入 next 的下一个 middleware 的 dispatch 方法，并返回一个接收 action 的新函数，这个函数可以直接调用 next（action），或者在其他需要的时刻调用，甚至根本不去调用它。调用链中最后一个 middleware 会接受真实的 store的 dispatch 方法作为 next 参数，并借此结束调用链。所以，middleware 的函数签名是（{ getState，dispatch })=> next => action。
```

## Redux 中的 connect 有什么作用

```js
// connect()方法的作用是将store和组件联系到一起，但是它并不会改变它连接的connect组价，而是提供一个经过包裹的connect组件
```

## 对 React Hook 的理解，它的实现原理是什么

```js
// 我们都知道 React 16.8 之后采用了新的 Fiber 架构，Fiber 也就是一个对象用来存储组件的信息，一般组件都会被存储在 stateNode 这个属性上，而 Hooks 的 state 会用链表结构被存储在 Fiber 的 memoizedState 这个属性上。

// 要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。因为我们是根据调用 hook 的顺序依次将值存入数组中，如果在判断逻辑循环嵌套中，就有可能导致更新时不能获取到对应的值，从而导致取值混乱。同时 useEffect 第二个参数是数组，也是因为它就是以数组的形式存入的。
```

## 为什么 useState 要使用数组而不是对象

```js
// 如果 useState 返回的是数组，那么使用者可以对数组中的元素命名，代码看起来也比较干净
// 如果 useState 返回的是对象，在解构对象的时候必须要和 useState 内部实现返回的对象同名，想要使用多次的话，必须得设置别名才能使用返回值

// useState 返回的是 array 而不是 object 的原因就是为了降低使用的复杂度，返回数组的话可以直接根据顺序解构，而返回对象的话要想使用多次就得定义别名了
```

## React Hooks 解决了哪些问题？

```js
// 1、从组件中提取状态逻辑，解决了在组件之间复用状态逻辑很难的问题；
// 2、将组件中相互关联的部分拆分成更小的函数，解决了复杂组件的问题；
// 3、在非class的情况下使用
```

## React Hook 的使用限制有哪些？

```js
// 如果在 if 条件中调用 useState 会怎样呢？就会造成数组的取值错位，所以不能在 React 的循环、条件或嵌套函数中调用 Hook。

// 在 React 的函数组件中调用 Hook。(不能在类中使用)

// 只需要在 ESLint 中引入 eslint-plugin-react-hooks 完成自动化检查就可以了。在处理代码编写方式的问题时，都应该优先想到从 Lint 工具入手。
```

## useEffect 与 useLayoutEffect 的区别

```js
// 唯一的不同点就是useEffect是异步执行，而useLayoutEffect是同步执行的。

// 当函数组件刷新（渲染）时，包含useEffect的组件整个运行过程如下：
// 触发组件重新渲染（通过改变组件state或者组件的父组件重新渲染，导致子节点渲染）。
// 组件函数执行。
// 组件渲染后呈现到屏幕上。
// useEffect hook执行。

// 当函数组件刷新（渲染）时，包含useLayoutEffect的组件整个运行过程如下：
// 触发组件重新渲染（通过改变组件state或者组件的父组件重新渲染，导致子组件渲染）。
// 组件函数执行。
// useLayoutEffect hook执行, React等待useLayoutEffect的函数执行完毕。
// 组件渲染后呈现到屏幕上。

// useEffect异步执行的优点是，react渲染组件不必等待useEffect函数执行完毕，造成阻塞。

// 百分之99的情况，使用useEffect就可以了，唯一需要用到useLayoutEffect的情况就是，在使用useEffect的情况下，我们的屏幕会出现闪烁的情况（组件在很短的时间内渲染了两次）。
```

## React Hooks 和生命周期的关系？

```js
// 下面，是具体的 class 与 Hooks 的生命周期对应关系：
// constructor	useState
// getDerivedStateFromProps	useState 里面 update 函数
// shouldComponentUpdate	useMemo
// render	函数本身
// componentDidMount	useEffect
// componentDidUpdate	useEffect
// componentWillUnmount	useEffect 里面返回的函数
// componentDidCatch	无
// getDerivedStateFromError	无
```

## 对虚拟 DOM 的理解？虚拟 DOM 主要做了什么？虚拟 DOM 本身是什么？

```js
// 一、什么是 虚拟 DOM
// 从本质上来说，Virtual DOM 是一个 JavaScript 对象，通过对象的方式来表示 DOM 结构。将页面的状态抽象为 JS 对象的形式，配合不同的渲染工具，使跨平台渲染成为可能。通过事务处理机制，将多次 DOM 修改的结果一次性的更新到页面上，从而有效减少页面渲染的次数，减少修改 DOM 的重排和重绘的次数，提高渲染性能。
// 虚拟 DOM 是对 DOM 的抽象，这个对象是对 DOM 的描述，这个对象是更加轻量级的对 DOM 的描述。他设计的最初目的，就是更好的跨平台，比如 Node.js 就没有 DOM ，如果想实现 SSR，那么，一个方式就是借助虚拟 DOM ，因为虚拟 DOM 本身就是 JS 对象。
// 在代码渲染到页面之前，vue 或者 rect 会把代码转换成一个对象（虚拟 DOM）。以对象的形式来描述真实的 DOM 结构，最终渲染到页面，在每次数据发生变化前，虚拟 DOM 都会缓存一份，变化之时现在的虚拟 DOM 会和缓存的虚拟 DOM 进行比较。
// 在 vue 或者 rect 内部封装了 diff 算法，通过这个算法，来进行比较，渲染时修改改变的变化，原先没有发生改变的通过原先的数据进行渲染。
// 另外，现代前端框架的一个基本要求就是无需手动操作 DOM ，一方面是因为手动操作 DOM 无法保证程序性能，多人协作的项目中如果 review 不严格，可能会有开发者写出性能较低的代码，另一方面更重要的是省略手动操作 DOM 可以大大提高开发效率。

// 二、为什么要使用 Virtual DOM
// 1.保证性能下限，在不进行手动优化的情况下，提供过得去的性能
// 页面渲染过程：解析 HTML => 生成 DOM => 生成 CSSOM => Layout => Paint => Compiler
// 下面对比一下修改 DOM 时真实 DOM 操作和 Virtual DOM 的过程，来看一下他们重排和重绘的性能消耗：
// 真实 DOM ：生成 HTML 字符串 +  重建所有的 DOM 元素
// 虚拟 DOM ：生成 Virtual Node + DOMDiff + 必要的 DOM 更新
// Virtual DOM 的更新 DOM 的准备工作耗费更多的时间，也就是 JS 层面，相比于更多的 DOM 操作它的消费是极其便宜的。尤雨溪在社区论坛中说道：框架给你的保证是，你不需要手动优化的情况下，我依然可以给你提供过得去的性能。
// 2.跨平台
// Virtual DOM 本质上是 JS 对象，他可以很方便的跨平台操作，比如服务端渲染、uniapp 等。

// 三、Virtual DOM 真的比真实 DOM 性能好吗
// 1.首次渲染大量的 DOM 时，由于多了一层虚拟 DOM 的计算，会比 innerHTML 插入慢。
// 2.正如它能保证性能下限，在真实的 DOM 操作的时候进行针对性的优化时，还是更快的。
```

## React diff 算法的原理是什么？

```js
// react中diff算法主要遵循三个层级的策略：

// tree层级
// conponent 层级
// element 层级

// tree层级
// DOM节点跨层级的操作不做优化，只会对相同层级的节点进行比较 只有删除、创建操作，没有移动操作
// react发现新树中，R节点下没有了A，那么直接删除A，在D节点下创建A以及下属节点

// conponent层级
// 如果是同一个类的组件，则会继续往下diff运算，如果不是一个类的组件，那么直接删除这个组件下的所有子节点，创建新的
// 当component D换成了component G 后，即使两者的结构非常类似，也会将D删除再重新创建G

// element层级
// 对于比较同一层级的节点们，每个节点在对应的层级用唯一的key作为标识
// 提供了 3 种节点操作，分别为 INSERT_MARKUP(插入)、MOVE_EXISTING (移动)和 REMOVE_NODE (删除)
```

## React key 是干嘛用的 为什么要加？key 主要是解决哪一类问题的

```js
// 其实，key是react用来追踪哪些列表的元素被修改，被添加或者是被删除的辅助标示。在开发过程中我们需要保证某个元素的key在其同级元素中具有唯一性。

// 在react的diff算法中react会借助元素的key来判断该元素是最新创建的还是被移动而来的，从而减少不必要的元素渲染。除此之外，react还要根据key来判断元素与本地状态的关联关系。

// 注意点：

// key的值一定要和具体的元素一一对应
// 尽量不要用数组中的index来作为key的值
// 永远不要视图在render的时候用随机数或者是其他的操作来给key加上不稳定的key，这样造成的性能开销比不加key的情况更糟糕。
```

## 虚拟 DOM 的引入与直接操作原生 DOM 相比，哪一个效率更高，为什么

```js
// 虚拟DOM相对原生的DOM不一定是效率更高，如果只修改一个按钮的文案，那么虚拟 DOM 的操作无论如何都不可能比真实的 DOM 操作更快。在首次渲染大量DOM时，由于多了一层虚拟DOM的计算，虚拟DOM也会比innerHTML插入慢。它能保证性能下限，在真实DOM操作的时候进行针对性的优化时，还是更快的。所以要根据具体的场景进行探讨。

// 在整个 DOM 操作的演化过程中，其实主要矛盾并不在于性能，而在于开发者写得爽不爽，在于研发体验/研发效率。虚拟 DOM 不是别的，正是前端开发们为了追求更好的研发体验和研发效率而创造出来的高阶产物。虚拟 DOM 并不一定会带来更好的性能，React 官方也从来没有把虚拟 DOM 作为性能层面的卖点对外输出过。**虚拟 DOM 的优越之处在于，它能够在提供更爽、更高效的研发模式（也就是函数式的 UI 编程方式）的同时，仍然保持一个还不错的性能。
```

## React 与 Vue 的 diff 算法有何不同？

```js
// diff算法：对dom进行different比较不同的一种算法（虚拟）

// 共同点：vue和diff算法，都是不进行跨层级比较，只做同级比较

// 不同点：

//   1.vue进行diff时，调用patch打补丁函数，一边比较一边给真实的dom打补丁，vue对比节点时，当节点元素类型相同，类名不同时，认为是不同的元素，删除重新创建，而react认为是同类型的节点，进行修改操作

//   2.vue列表对比的时候，采用从两端到中间的方式，旧集合和新集合两端各存在两个指针，两两进行比较，每次对比结束后，指针向队列中间移动；react则是从左往右一次对比，利用元素的index和lastindex进行比较

//   3.当一个集合把最后一个节点移动到最前面，react会把前面的节点依次向后移动，而Vue只会把最后一个节点放在最前面，这样的操作来看，Vue的diff性能是高于react的
```

## react 最新版本解决了什么问题，增加了哪些东西

```js
// react16.x的三大特性
// Time Slicing(时间分片)、Suspense()、hooks

// Time Slicing(解决CPU速度问题)使得在执行任务的期间可以随时暂停，跑去干别事情，使得react能够在性能极差的机器跑时，仍然保持良好的性能

// Suspense(解决网络IO的问题)和lazy配合，实现异步加载组件。能够暂停当前组件的渲染，当某件事完成以后再继续渲染，解决了react出生到现在存在的异步副作用问题，解决的非常好。

// 此外，还提供了一个内置函数componentDidCatch,当有错误发生时，可以友好的捕捉到子元素抛出的异常

// react 16.8 加入hooks
// 加入hooks，让react函数组件更加的灵活
```

## 对 React 和 Vue 的理解，它们的异同

```js
// 一、相同点：
// 1. 都用虚拟dom实现快速渲染
// 2. 都支持组件化，都有props（properties）的概念，允许父组件往子组件或孙组件传送数据（不允许子组件改变父组件传来的props值）
// 3. 都是数据驱动视图
// 4. 都支持服务端渲染
// 5. 都有管理状态，React有redux,Vue有Vue、
// 6. 都有支持native的方案，React的React native，Vue的weex
// 7. 都有组合功能，React使用 Hoc（高阶组件)，Vue使用mixins（混合）

// 8. 都有自己的构建工具，可以快速搭建开发环境。React可以使用Create React App (CRA)，而Vue对应的则是vue-cli

//  二、不同点：
// 1. 实现原理不同

// 1） react 函数式组件思想（diff算法，react只对比节点的key和tag）

// react中数据发生变化（调用setstate时），render函数就会执行，重新生成一个新的虚拟dom， 就会遍历 diff 当前组件所有的子节点子组件，新旧比较，得出差异然后渲染。 react 16 采用了 fiber 把Dom树微观化成链表，可以中断的，分片的在浏览器空闲时候执行，提高diff效率。

// 2） vue 组件响应式思想 （diff算法，vue对比key、tag还有其他属性）

// vue组件中数据发生变化，会触发setter，由于vue组件中数据的getter的作用，收集了依赖，setter触发会根据这些依赖，生成新的虚拟dom，然后对比新旧虚拟dom进行渲染。 采用代理监听数据，在组件内修改数据，就通过虚拟DOM去更新页面，而组件间通过响应式通知更新。

// 2. 设计结构不同

// vue使用的是可变数据，数据由data属性在vue对象中管理，

// React 更强调数据不可变，由setState()更新状态

// 3. 数据流不同

// vue是通过v-model进行双向数据流，react是单向数据流，一般通过setState/onChange

// 注：

//         1）双向数据流和数据双向绑定不是一回事，react单向数据流也可以双向绑定数据，例如表单的事件绑定。

//         2）双向数据流是说数据的流向是双向的；双向数据绑定指的是单纯的数据与视图层之间的绑定。实质上也是单向数据流在加上用户的操作事件来实现双向数据绑定。无论是单向数据还是双向,最终呈现给用户的都是同步效果.只不过是一个需要手动实现,一个自动。

//         3）双向绑定把数据变更的操作隐藏在框架内部，调用者并不会直接感知。Vue 中的 v-model 来说，他是一个语法糖，利用 bind 语法与事件来实现数据与视图之间的绑定。

// 4. 渲染方式的不同

// React是通过JSX渲染模板，等计算完毕之后在渲染；

// Vue是通过一种拓展的HTML语法进行渲染，边计算边渲染

// 5.框架本质不同

// Vue本质是MVVM框架，由MVC发展而来。

// React是前端组件化框架，只针对MVC的view层。

// 6. 通信方式不同

// vue: 父通过props向子传递数据或回调（一般传数据）；子通过事件向父发消息；通过provide /  inject 来实现父向子注入数据，可跨层级传递。

// react：父通过props向子传递数据或回调；子通过回调向父发消息；通过 context进行跨层级的通信。
```

## React 设计思路，它的理念是什么？

```js
// React一个主要的设计理念是编写简单容易理解的代码。
```

## React 中 props.children 和 React.Children 的区别

```js
// 如果想把父组件的属性传给所有子组件就要用到React.Children属性了
function renderChildren(props) {
  //遍历所有子组件
  return React.Children.map(props.children, (child) => {
    if (child.type === RadioOption)
      return React.cloneElement(child, {
        //克隆每一个对象，并且把父组件的props.name赋值给每个子组件

        name: props.name,
      });
    else return child;
  });
}
```

## React 的状态提升是什么？使用场景有哪些？

```js
// React的状态提升就是用户对子组件操作，子组件不改变自己的状态，通过自己的props把这个操作改变的数据传递给父组件，改变父组件的状态，从而改变受父组件控制的所有子组件的状态，这也是React单项数据流的特性决定的。

// 官方的原话是：共享 state(状态) 是通过将其移动到需要它的组件的最接近的共同祖先组件来实现的。 这被称为“状态提升(Lifting State Up)”。
```

## React 中 constructor 和 getInitialState 的区别?

```js
// Es5 语法
// 如果使用createClass方法创建一个Component组件，可以自动调用它的getInitialState方法来获取初始化的State对象，但是在ES6的Class中并不会如此自动调用，因此，要稍作修改。

// ES6语法
// 使用class声明一个类，且要继承react组件的方法和属性的时候 :
// 在里面我们可以直接指定 this.state = { }， 我们可以当前组件内任何地方使用 this.setState()来改变组件状态;
```

## React 的严格模式如何使用，有什么用处？

```js
// react的strictMode 是一个突出显示应用程序中潜在问题的工具，与Fragment一样，strictMode 不会渲染任何的可见UI，它为其后代元素触发额外的检查和警告。

// 注意：严格模式仅在开发模式下运行，它们不会影响生产构建

// 可以为程序的任何部分使用严格模式
import React from 'react';

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}

// 在上述的示例中，不会对 Header 和 Footer 组件运行严格模式检查。但是，ComponentOne 和 ComponentTwo 以及它们的所有后代元素都将进行检查。

// StrictMode 目前有助于：

// 识别不安全的生命周期
// 关于使用过时字符串 ref API 的警告
// 关于使用废弃的 findDOMNode 方法的警告
// 检测意外的副作用
// 检测过时的 context API
```

## 在 React 中遍历的方法有哪些？

```js
// 有React.Children.map和 React.Children.forEach这两个方法，他们的参数都是在组件中接受props.children这个ReactNode作为参数，然后进行遍历。专门提供这两个遍历方法的目的是props.children可能是字符串、null、数组，用React.Children.map可以抹平这些数据类型的差异，使之都能进行循环，并返回合理的值;React.Children.map有返回值（当前组件被遍历的数组，注意React.Fragment不会被遍历）， React.Children.forEach没有返回值。
```

## React 必须使用 JSX 吗？

```js
// 首先给出答案，不是必须的
// 只不过通过JSX，你可以简单明了的知道UI是怎样的
```

## 为什么使用 jsx 的组件中没有看到使用 react 却需要引入 react？

```js
// 在react 老版本中 因为 jsx 在被 babel 编译后，写的 jsx 会变成上述 React.createElement 形式，所以需要引入 React，防止找不到 React 引起报错。

// 是的，因为react在编辑的时候，写的jsx会被编译成React.createElement，所以这时候如果不引入React，则js会报错 找不到React。

// 但是大家要注意的是，从React最新之后，我们再也不用引入React了。

// 因为：新版本已经不需要引入createElement，我们看一下它是如何做的？
// 大家会发现，脚手架已经自己为我们引入了一个来处理jsx的文件。所以我们无需再去操心react没有引入的问题。
```

## 在 React 中怎么使用 async/await？

```js
// 如果是脚手架创建的react项目即可直接使用，否则需要配置babel
```

## React.Children.map 和 js 的 map 有什么区别？

```js
// React.Children.map 能够处理未知数据类型，即使 React.children 是 null 和 undefined 也能够正确处理。
// React.Children.forEach 一样的原理。
```

## 对 React SSR 的理解

## 为什么 React 要用 JSX？

```js
// 1、jsx是什么？
// jsx是一个javascript的语法扩展，jsx可以很好的描述ui应该呈现它应有的交互的本质。
// jsx其实是react.createElement的语法糖。

// 2、react想实现什么目的？
// 需要实现声明式
// 代码结构需要非常清晰和简洁，可读性强。
// 结构，样式和事件等能够实现高内聚低耦合，方便重用和组合。
// 不想引入新的概念，只写javascript

// 3、为什么jsx最好
// vue.js使用了基于html的模板语法，允许开发者声明式的将dom绑定到底层的vue实例的数据。
// 引入太多概念，比如angular.

// 4、jsx工作原理
// 抽象语法树是源代码语法结构的一种抽象的表示，它以树状的形式表现变成呢个语言的语法结构，树上的每一个节点都表示一种结构。
```

## HOC 相比 mixins 有什么优点？

```js
// 其实这个做法在函数式编程里称之为高阶函数，大家都知道 React 的思想中是存在函数式编程的，高阶组件和高阶函数就是同一个东西。我们实现一个函数，传入一个组件，然后在函数内部再实现一个函数去扩展传入的组件，最后返回一个新的组件，这就是高阶组件的概念，作用就是为了更好的复用代码。
// 其实 HOC 和 Vue 中的 mixins 作用是一致的，并且在早期 React 也是使用 mixins 的方式。但是在使用 class 的方式创建组件以后，mixins 的方式就不能使用了，并且其实 mixins 也是存在一些问题的，比如
// 1.隐含了一些依赖，比如我在组件中写了某个 state 并且在 mixin 中使用了，就这存在了一个依赖关系。万一下次别人要移除它，就得去 mixin 中查找依赖

// 2.多个 mixin 中可能存在相同命名的函数，同时代码组件中也不能出现相同命名的函数，否则就是重写了，其实我一直觉得命名真的是一件麻烦事。。

// 3.雪球效应，虽然我一个组件还是使用着同一个 mixin，但是一个 mixin 会被多个组件使用，可能会存在需求使得 mixin 修改原本的函数或者新增更多的函数，这样可能就会产生一个维护成本

// HOC 解决了这些问题，并且它们达成的效果也是一致的，同时也更加的政治正确（毕竟更加函数式了）
```

## React 中的高阶组件运用了什么设计模式？

```js
// 高阶组件是参数为组件，返回值为新组件的函数
// 组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件
// HOC是 React 中用于复用组件逻辑的一种高级技巧; 是一种组件组合的设计模式
```

## 僵尸进程和孤儿进程是什么？

```js
// 僵尸进程：一个进程使用 fork 创建子进程，如果子进程退出，而父进程并没有调用 wait 或 waitpid 获取子进程的状态信息，那么子进程的进程描述符仍然保存在系统中，这种进程称之为僵死进程。

// 孤儿进程：一个父进程退出，而它的一个或多个子进程还在运行，那么这些子进程将成为孤儿进程。孤儿进程将被 init 进程(进程号为1)所收养，并由 init 进程对它们完成状态收集工作。
```

## 死锁产生的原因及解决

```js
// 多个线程同时被阻塞，它们中的一个或者全部都在等待某个资源被释放。由于线程被无限期地阻塞，因此程序不可能正常终止。(指多个线程因竞争资源而造成的一种僵局（互相等待），若无外力作用，这些进程都将无法向前推进。)
```

## 如何实现浏览器内多个标签页之间的通信?

```js
// 使用 websocket 协议，因为 websocket 协议可以实现服务器推送，所以服务器就可以用来当做这个中介者。标签页通过向服务器发送数据，然后由服务器向其他标签页推送转发。
// 使用 ShareWorker 的方式，shareWorker 会在页面存在的生命周期内创建一个唯一的线程，并且开启多个页面也只会使用同一个线程。这个时候共享线程就可以充当中介者的角色。标签页间通过共享一个线程，然后通过这个共享的线程来实现数据的交换。
// 使用 localStorage 的方式，我们可以在一个标签页对 localStorage 的变化事件进行监听，然后当另一个标签页修改数据的时候，我们就可以通过这个监听事件来获取到数据。这个时候 localStorage 对象就是充当的中介者的角色。
// 使用 postMessage 方法，如果我们能够获得对应标签页的引用，就可以使用postMessage 方法，进行通信。postMessage原理
```

## 在浏览器地址栏按回车、F5、Ctrl+F5 刷新网页的区别

```js
// “刷新”是在你现有页面的基础上，检查网页是否有更新的内容。在检查时，会保留之前的一些变量的值，因此有可能会造成刷新后网页出现错误，或者打不开的情况；

// “转到”和在地址栏回车，则相当于你重新输入网页的URL访问，这种情况下，浏览器会尽量使用已经存在于本机中的缓存。也就是说，“刷新” 是取网页的新内容来更新本机缓存，在更新的同时保留之前的一些变量；“转到”则是一种全新的访问，它会尽量使用本机缓存中的文件，但不会保留之前的变量
```

## 常见的浏览器内核比较

```js
// 1、IE浏览器内核：Trident内核，也是俗称的IE内核；

// 2、Chrome浏览器内核：统称为Chromium内核或Chrome内核，以前是Webkit内核，现在是Blink内核；

// 3、Firefox浏览器内核：Gecko内核，俗称Firefox内核；

// 4、Safari浏览器内核：Webkit内核；

// 5、Opera浏览器内核：最初是自己的Presto内核，后来是Webkit，现在是Blink内核；

// 6、360浏览器、猎豹浏览器内核：IE+Chrome双内核；

// 7、搜狗、遨游、QQ浏览器内核：Trident（兼容模式）+Webkit（高速模式）；

// 8、百度浏览器、世界之窗内核：IE内核；

// 9、2345浏览器内核：以前是IE内核，现在也是IE+Chrome双内核；
```

## 浏览器的主要组成部分

```js
//  1. 用户界面:

//           用户界面主要包括：地址栏，后退/前进按钮，书签目录等；（除了从服务器请求到的网页窗口）

//        2. 浏览器引擎：

//           用来查询及操作渲染引擎的接口；

//        3. 渲染引擎：

//          用来显示请求的html内容；（包括样式，图片，js）

//        4. 网络：

//           主要是来完成网络调用，例如http请求，它具有平台无关的接口，可以在不同平台上工作；

//         5. UI后端：

//             用来绘制类似组合选择框及对话框等基本组件，具有不特定于某个平台的通用接口，底层使用操作系统的用户接口。

//        6. JS解释器 ：

//           用来解释执行JS代码；

//         7. 数据存储：

//            属于持久层，浏览器需要在硬盘中保存类似cookie的各种数据，HTML5定义了web database技术，这是一种轻量级完整的      客户端存储技术；

// 3⃣️ 内核：

//       浏览器的内核可分成两部分：

//         渲染引擎和js 引擎；（注：我们常说的浏览器内核就是指渲染引擎）

//         由于js 引擎越来越独立，内核就指的只是渲染引擎了，渲染引擎主要用来请求网络页面资源解析排版后呈现给用户；

//         渲染引擎可以渲染html和xml文档及图片，它也可以借助插件显示其他类型数据，例如使用PDF阅读器插件，可以显示PDF格式；

// 4⃣️ 主流浏览器用的渲染引擎（内核）都各是什么：

//      fire-fox ：gecko引擎；

//      IE：Trident引擎；（在2015年微软推出自己的新浏览器，名叫斯巴达后改edge，故使得是edge引擎）

//     opera：Presto引擎，后弃用；

//     chrome\safari\opera： webkit引擎，13年chrome和opera开始使用Blink引擎；

//      UC：U3引擎；

//      QQ和微信 ：X5引擎，16年开始使用Blink引擎；

// 5⃣️  主流浏览器都各用的什么js引擎：

//        老版本IE使用Jscript引擎；

//         IE9之后使用Chakra引擎；

//         edge浏览器仍然使用Chakra引擎；

// 　    firefox使用monkey系列引擎；

//         safari使用的SquirrelFish系列引擎；

//        Opera使用Carakan引擎；

//        chrome使用V8引擎;(nodeJs其实就是封装了V8引擎)
```

## 如何优化关键渲染路径？

```js
// 如何优化关键渲染路径，上一章初步了解了关键渲染路径的流程，此时，可以对此做一定的优化。我们可以从三个大类方向优化

// 一、减少网络发送的数据量

//      1.采用精简（移除注释，空格）、混淆（额外缩短变量名）的方式

//      2.gzip压缩，现在绝大部分浏览器都支持gzip压缩

//      3.部分资源可考虑采用内联的

//      4.静态资源采用浏览器缓存，时间要长

// 二、减少关键资源的数量，移除非关键渲染资源

// 　　1.css默认会生成cssom。通过非关键资源拆出来，单独外联引入，增加media，则浏览器只会下载，不会解析（用到的时候解析）。但是此时额外增加了网络请求，需要权衡

//       2.js执行会等待cssom构建完毕，并且会阻塞dom的构建。动态引入js

// 三、缩短关键呈现路径的长度

//      1.通过外联js加async，则不会等待cssom，异步执行，不阻塞dom构建
```

## Cookie 有哪些字段，作用分别是什么

```js
// name字段：名称
// value字段：cookie的值
// domain字段：为可以访问此cookie的域名，顶级域名只能设置domain为顶级域名，不能设置为二级域名或者三级域名，否则cookie无法生成。二级域名能读取设置了domain为顶级域名或者自身的cookie，不能读取其他二级域名domain的cookie。所以要想cookie在多个二级域名中共享，需要设置domain为顶级域名，这样就可以在所有二级域名里面或者到这个cookie的值了。
// path字段：为可以访问此cookie的页面路径。 比如domain是abc.com,path是/test，那么只有/test路径下的页面可以读取此cookie。
// Size字段：设置cookie的大小
// http字段：cookie的httponly属性。若为true，则只有在http请求头中会带有此cookie的信息，而不能通过document.cookie来访问此cookie
// expires/Max-Age字段：设置cookie的过期时间。不设置的话默认值是Session，意思是cookie会和session一起失效。当浏览器关闭(不是浏览器标签页，而是整个浏览器) 后，此cookie失效。
// secure字段：设置是否只能通过https来传递此条cookie
```

## 事件是什么？事件模型？

```js
// 事件是用户操作网页时发生的交互动作，比如 click/move， 事件除了用户触发的动作外，还可以是文档加载，窗口滚动和大小调整。事件被封装成一个 event 对象，包含了该事件发生时的所有相关信息（ event 的属性）以及可以对事件进行的操作（ event 的方法）。

// 事件是用户操作网页时发生的交互动作或者网页本身的一些操作，现代浏览器一共有三种事件模型：

// DOM0 级事件模型，这种模型不会传播，所以没有事件流的概念，所有浏览器都兼容这种方式。直接在dom对象上注册事件名称，就是DOM0写法。
// IE 事件模型，在该事件模型中，一次事件共有两个过程，事件处理阶段和事件冒泡阶段。事件处理阶段会首先执行目标元素绑定的监听事件。然后是事件冒泡阶段，冒泡指的是事件从目标元素冒泡到 document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。这种模型通过attachEvent 来添加监听函数，可以添加多个监听函数，会按顺序依次执行。
// DOM2 级事件模型，在该事件模型中，一次事件共有三个过程，第一个过程是事件捕获阶段。捕获指的是事件从 document 一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。后面两个阶段和 IE 事件模型的两个阶段相同。这种事件模型，事件绑定的函数是addEventListener，其中第三个参数可以指定事件是否在捕获阶段执行。
```

## GET 方法 URL 长度限制的原因

```js
// Http Get方法提交的数据大小长度并没有限制，HTTP协议规范没有对URL长度进行限制。这个限制是特定的浏览器及服务器对它的限制。
// 如：IE对URL长度的限制是2083字节(2K+35)。
// 由于IE浏览器对URL长度的允许值是最小的，所以网站开发中，只要URL不超过2083字节，那么在所有浏览器中工作都不会有问题。
// GET的长度值 = URL（2083）- （你的Domain+Path）-2（2是get请求中?=两个字符的长度）
// 下面就是对各种浏览器和服务器的最大处理能力做一些说明.
// Microsoft Internet Explorer (Browser)
// IE浏览器对URL的最大限制为2083个字符，如果超过这个数字，提交按钮没有任何反应。
// Firefox (Browser)
// 对于Firefox浏览器URL的长度限制为65,536个字符。
// Safari (Browser)
// URL最大长度限制为 80,000个字符。
// Opera (Browser)
// URL最大长度限制为190,000个字符。
// Google (chrome)
// URL最大长度限制为8182个字符。
// Apache (Server)========================server端
// 能接受最大url长度为8,192个字符。
// Microsoft Internet Information Server(IIS)====server端
// 能接受最大url的长度为16,384个字符。
```

## 说一下 HTTP 3.0

```js
// http3把下层的TCP协议改成UDP，所以不会出现HTTP1.1的队头阻塞和HTTP2的丢包全部重传问题。
// 是基于UDP的QUIC协议（本质上是UDP的低延时的互联网传输层协议），实现了TCP的可靠性，TLS的安全性和HTTP2的并发性。
```

## OSI 七层模型

```js
// OSI 7层参考模型：
// 应用层、表示层、会话层、传输层、网络层、数据链路层、物理层
// 应用层、表示层、会话层----控制层面
// 表示层 、网络层、数据链路层、物理层----数据层面

// 应用层接收用户的数据，人机交互的接口，面向的应用程序

// 表示层   讲逻辑语言转为机器语言，翻译，加密

// 会话层   针对传输的每一种数据建立一条虚连接

// 传输层  作用 1.区分流量   2.定义数据传输方式 （可靠传输TCP、不可靠传输UDP）

// 通过端口号区分流量
//     常见端口号（<256）：
// 21端口号：FTP 文件传输服务
// 22端口号：SSH 远程登录（安全性较高 加密认证）- TCP
// 23端口：Telnet 远程登录服务  TCP
// 25端口：SMTP 简单邮件传输服务
// 53端口：DNS 域名解析服务  TCP和UDP
// 80端口：HTTP 超文本传输协议  TCP
// 110端口：POP3 “邮局协议版本”使用的端口
// 443端口：HTTPS 加密的超文本传输协议  TCP
// 520端口：RIP   UDP
```

## TCP 粘包是怎么回事，如何处理?

```js
// TCP粘包是指发送方发送的若干包数据到接收方接收时粘成一包，从接收缓冲区看，后一包数据的头紧接着前一包数据的尾。

// 粘包可能由发送方造成，也可能由接收方造成。

// 只有TCP有粘包现象，UDP永远不会粘包

// 粘包不一定会发生

// 粘包的原因：

// 发送端原因: 由于TCP协议本身的机制（面向连接的可靠地协议-三次握手机制）客户端与服务器会维持一个连接（Channel），数据在连接不断开的情况下，可以持续不断地将多个数据包发往服务器，但是如果发送的网络数据包太小，那么他本身会启用Nagle算法（可配置是否启用）对较小的数据包进行合并（基于此，TCP的网络延迟要UDP的高些）然后再发送（超时或者包大小足够）。那么这样的话，服务器在接收到消息（数据流）的时候就无法区分哪些数据包是客户端自己分开发送的，这样产生了粘包.

// 接收端原因: 服务器在接收到数据后，放到缓冲区中，如果消息没有被及时从缓存区取走，下次在取数据的时候可能就会出现一次取出多个数据包的情况，造成粘包现象。

// 定义一个pos，建立两个缓冲区 一个消息缓冲区msgBuf  一个接收消息缓冲区recvBuf

// 每次接收完将recvBuf里面的数据拷贝到msgBuf里面，pos指向消息缓冲区的数据尾部。 然后根据当前接收到的数据的大小和消息头部的大小比较 如果大于消息头长度 则强转（DataHeader*）msgBuf , 在根据消息头读出实际消息的大小，再比较接收数据的大小是否大于消息的大小，是的话处理该消息，然后将msgBuf里面未处理的数据前移。Pos也需要重新计算。
```

## CDN 的原理

```js
// 1.什么是CDN？
// CDN的全称是Content Delivery Network，即内容分发网络。CDN是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN的关键技术主要有内容存储和分发技术。

// 2.基本原理
// CDN的基本原理是在用户访问相对集中的地区和网络设置一些缓存服务器。当用户访问网站时，利用全局的负载均衡技术将用户的访问指向距离最近的缓存服务器，由缓存服务器代替源站响应用户的访问请求。这样一方面减轻了源站服务器的工作压力，另一方面使用户可就近取得所需内容，解决 Internet网络拥挤的状况，提高用户访问网站的响应速度。
```
