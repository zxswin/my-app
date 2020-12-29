## React 路由部分：react-router-dom 的使用

- BrowserRouter

```tsx
/**
 * BrowserRouter主要使用在浏览器中，也就是WEB应用中。
 */

// 1.basename 属性
// 设置运用根目录
<BrowserRouter basename="/admin"/>
    ...
    <Link to="/home"/> // 被渲染为 <a href="/admin/home">
    ...
</BrowserRouter>

// 2.getUserConfirmation: func
// 当导航需要确认的时候执行函数,默认使用 window.confirm
// 使用默认的确认函数
const getConfirmation = (message, callback) => {
  console.log('执行了默认确认函数……');
  const allowTransition = window.confirm(message);
  callback(allowTransition);
};

const yourCallBack = (ok) => {
  console.log('路由跳转成功了。');
};
<BrowserRouter getUserConfirmation={() => getConfirmation('确认跳转路由么', yourCallBack(true)) />

// 3.forceRefresh: bool
// 当设置为 true 时，在导航的过程中整个页面将会刷新。 只有当浏览器不支持 HTML5 的 history API 时，才设置为 true。
const supportsHistory = 'pushState' in window.history
<BrowserRouter forceRefresh={!supportsHistory}/>

// 4.keyLength: number
// location.key 的长度。默认是 6。
<BrowserRouter keyLength={12}/>
```

- 使用 HashRouter

```tsx
/**
 * 使用HashRouter - 这样路径就类似于这样http://localhost:3000/contact#/contact
 * 由于该技术仅用于支持传统的浏览器，因此在用于浏览器时可以使用 <BrowserHistory> 代替。
 * 使用 hash 的方式记录导航历史不支持 location.key 和location.state
 */

// ================ hashType ================
// hashType: string
// window.location.hash 使用的 hash 类型。有如下几种：

// "slash" - 后面跟一个斜杠，例如 #/ 和 #/sunshine/lollipops
// "noslash" - 后面没有斜杠，例如 # 和 #sunshine/lollipops
// "hashbang" - Google 风格的 "ajax crawlable"，例如 #!/ 和 #!/sunshine/lollipops
// 默认为 "slash"。
```

- Link 组件

```tsx
/**
 * Link就像是一个个的路牌，为我们指明组件的位置。
 * 定义的Link最终会被渲染成一个a标签。
 * Link使用to这个属性来指明目标组件的路径，可以直接使用一个字符串，也可以传入一个对象。
 */
import { Link } from 'react-router-dom'
// 字符串参数
<Link to="/query">查询</Link>

// 对象参数
<Link to={{
  pathname: '/query',
  search: '?key=name',
  hash: '#hash',
  state: { fromDashboard: true }
}}>查询</Link>

// ======= 属性： to 需要跳转到的路径(pathname)或地址（location）=======

// ======= 属性：replace: bool =======
// 当设置为 true 时，点击链接后将使用新地址替换掉访问历史记录里面的原地址。
// 当设置为 false 时，点击链接后将在原有访问历史记录的基础上添加一个新的纪录。
// 默认为 false
```

- NavLink 组件

```tsx
/**
 * 可以使用activeClassName来设置Link被选中时被附加的class
 * 使用activeStyle来配置被选中时应用的样式。
 * 有一个exact属性,此属性要求location完全匹配才会附加class和style
 *
  to 可以是字符串或者对象，同Link组件
  exact 布尔类型，完全匹配时才会被附件class和style
  activeStyle Object类型
  activeClassName 字符串类型
  strict: bool类型，当值为 true 时，在确定位置是否与当前 URL 匹配时，将考虑位置 pathname 后的斜线。

 */

// 选中后被添加class selected
<NavLink to={'/'} exact activeClassName='selected'>Home</NavLink>
// 选中后被附加样式 color:red
<NavLink to={'/gallery'} activeStyle={{color:red}}>Gallery</NavLink>
```

- Route 组件

```tsx
/**
 * Route组件
 * 当location与Route的path匹配时渲染Route中的Component。
 * 如果有多个Route匹配，那么这些Route的Component都会被渲染。
 */

// ======= Route也有一个exact属性，作用也是要求location与Route的path绝对匹配 =======
// 当location形如 http://location/时，Home就会被渲染。
// 因为 "/" 会匹配所有的URL，所以这里设置一个exact来强制绝对匹配。
<Route exact path="/" component={Home}/>
<Route path="/about" component={About}/>


// ======= Route的三种渲染方式=======
// 1. component: 这是最常用也最容易理解的方式，给什么就渲染什么。
// 2. render: render的类型是function，Route会渲染这个function的返回值。
<Route path="/home" render={() => {
    console.log('额外的逻辑');
    return (<div>Home</div>);
    }/>
// 3.children: 这是最特殊的渲染方式
// 它会被传入一个match参数来告诉你这个Route的path和location匹配上没有
// 即使path没有匹配上，我们也可以将它渲染出来
// 我们可以根据这个参数来决定在匹配的时候渲染什么，不匹配的时候又渲染什么

// 在匹配时，容器的calss是light，<Home />会被渲染
// 在不匹配时，容器的calss是dark，<About />会被渲染
// <Route path='/home' children={({ match }) => (
//     <div className={match ? 'light' : 'dark'}>
//       {match ? <Home/>:<About>}
//     </div>
//   )} />


// ======= 所有路由中指定的组件将被传入以下三个 props =======
// 1.match.
<Link to='/p/1' />
<Link to='/p/2' />
<Link to='/p/3' />
......
<Route path='/p/:id' render={(match)=<h3>当前文章ID:{match.params.id}</h3>)} />
// 2.location.
// Location 是指你当前的位置，下一步打算去的位置，或是你之前所在的位置
// 在 Route component 中，以 this.props.location 的方式获取，
// 在 Route render 中，以 ({ location }) => () 的方式获取，
// 在 Route children 中，以 ({ location }) => () 的方式获取，
// 在 withRouter 中，以 this.props.location 的方式获取。

{
  key: 'ac3df4', // 在使用 hashHistory 时，没有 key
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
// location 对象不会发生改变，因此你可以在生命周期的钩子函数中使用 location 对象来查看当前页面的位置是否发生改变
componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // 已经跳转了！
  }
}

// 通常你只需要这样使用 location
<Link to="/somewhere"/>

// 但是你同样可以这么用
const location = {
  pathname: '/somewhere'
  state: { fromDashboard: true }
}

<Link to={location}/>
<Redirect to={location}/>
history.push(location)
history.replace(location)

// 你可以把 location 传入一下组件 [Route] [Switch]
// 可以让组件不使用路由状态（router state）中的真实 location，
// 因为我们有时候需要组件去渲染一个其他的 location 而不是本身所处的真实 location



// 3.history.
// History 是 React Router 的两大重要依赖之一（除去 React 本身）
// history.location 中获取 location 对象，但是别那么写，因为 history 是可变的
// 在不同的 Javascript 环境中，history 以多种形式实现了对于 session 历史的管理。

// ======= history 对象通常会具有以下属性和方法：=======

// length -（ number 类型）指的是 history 堆栈的数量。
// action -（ string 类型）指的是当前的动作（action），例如 PUSH，REPLACE 以及 POP 。
// location -（ object类型）是指当前的位置（location），location 会具有如下属性：
// pathname -（ string 类型）URL路径。
// search -（ string 类型）URL中的查询字符串（query string）。
// hash -（ string 类型）URL的 hash 分段。
// state -（ string 类型）是指 location 中的状态，例如在 push(path, state) 时，state会描述什么时候 location 被放置到堆栈中等信息。这个 state 只会出现在 browser history 和 memory history 的环境里。
// push(path, [state]) -（ function 类型）在 hisotry 堆栈顶加入一个新的条目。
// replace(path, [state]) -（ function 类型）替换在 history 堆栈中的当前条目。
// go(n) -（ function 类型）将 history 对战中的指针向前移动 n 。
// goBack() -（ function 类型）等同于 go(-1) 。
// goForward() -（ function 类型）等同于 go(1) 。
// block(prompt) -（ function 类型）阻止跳转，

// ======= match 对象包含了 <Route path> 如何与URL匹配的信息。match 对象包含以下属性：=======
// params -（ object 类型）即路径参数，通过解析URL中动态的部分获得的键值对。
// isExact - 当为 true 时，整个URL都需要匹配。
// path -（ string 类型）用来做匹配的路径格式。在需要嵌套 <Route> 的时候用到。
// url -（ string 类型）URL匹配的部分，在需要嵌套 <Link> 的时候会用到。

// 你可以在以下地方获取 match 对象：
// 在 Route component 中，以 this.props.match 方式。
// 在 Route render中，以 ({ match }) => () 方式。
// 在 Route children中，以 ({ match }) => () 方式

```

- Redirect 组件

```tsx
/**
 * 当这个组件被渲染是，location会被重写为Redirect的to指定的新location。
 * 必须放在需要重定向的页面前面
 */
<Redirect to="/new" />
```

- Switch 组件

```tsx
/**
 * 渲染匹配地址(location)的第一个 <Route>或者<Redirect>
 * <Switch>的独特之处是独它仅仅渲染一个路由。
 */
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/:user" component={User} />
  <Route component={NoMatch} />
</Switch>
```

- 路由配置示例

```tsx
const routes = [
  {
    path: '/sandwiches',
    component: Sandwiches,
  },
  {
    path: '/tacos',
    component: Tacos,
    routes: [
      {
        path: '/tacos/bus',
        component: Bus,
      },
      {
        path: '/tacos/cart',
        component: Cart,
      },
    ],
  },
];
```

- 基本使用

```tsx
/**
 * 关于react-router-dom的组成
 * 1.react-router: 实现了路由的核心功能，而react-router-dom依赖react-router，
 * 2.react-router-dom: 基于react-router，加入了在浏览器运行环境下的一些功能：
 * Link组件，会渲染一个a标签；
 * BrowserRouter组件，使用pushState和popState事件构建路由；
 * HashRouter组件，使用window.location.hash和hashchange事件构建路由。
 *
 * 其他
 * react-router-native: 基于react-router，类似react-router-dom，加入了react-native运行环境下的一些功能。
 */

// BaseLayout.tsx

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  HashRouter,
  Redirect,
  Switch,
} from 'react-router-dom';

const HomePage = () => <div>首页</div>;
const LoginPage = () => <div>登录</div>;
const RegisterPage = () => <div>注册</div>;
const ProfilePage = () => <div>简介页面</div>;
const AboutPage = () => <div>关于我们</div>;
const ContactPage = () => <div>联系我们</div>;
const NotFound = () => <div>页面未找到</div>;

class BaseLayout extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="base">
        <header>
          <nav>
            <ul>
              {/* replace 属性用于解决 Warning: Hash history cannot PUSH the same path*/}
              <li>
                <Link to="/" replace>
                  首页
                </Link>
              </li>
              <li>
                <Link to="/about" replace>
                  关于我们
                </Link>
              </li>
              <li>
                <Link to="/me" replace>
                  简介页面
                </Link>
              </li>
              <li>
                <Link to="/login" replace>
                  登录
                </Link>
              </li>
              <li>
                <Link to="/register" replace>
                  注册
                </Link>
              </li>
              <li>
                <Link to="/contact" replace>
                  联系我们
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="container">
          <Switch>
            {/* exact 指定路由为排他路由 v4默认路由为非排他路由 */}
            <Route path="/" exact component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            {/** 必须放在需要重定向的页面前面  */}
            <Redirect to="/register" />
            <Route path="/me" component={ProfilePage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default BaseLayout;

// - 使用HashRouter - 这样路径就类似于这样http://localhost:3000/contact#/contact
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  HashRouter,
} from 'react-router-dom';
import BaseLayout from './pages/BaseLayout';
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <BaseLayout />
      </HashRouter>
    );
  }
}
export default App;
```

- Route 的参数

```tsx
/**
 * 第一种传参方式；通过params
 */

// 在路由组件中获取参数 props里面包含了location history match staticContext等参数
const AboutPage = (props) => {
  console.log('match', props.match);
  console.log('props.match.params', props.match.params);
  return <div>关于我们</div>;
};

// 设置切换路由传递参数的key
<Route path="/about/:name" component={AboutPage} />;

// 在指定界面跳转到路由传递过去的参数值
<Link to="/about/2" replace>
  关于我们
</Link>;

/** 第二种传参方式  */

const AboutPage = (props) => {
  console.log('location', props.location.state);
  return <div>关于我们</div>;
};

// 在指定界面跳转到路由传递过去的参数值
<Link
  to={{
    pathname: '/about',
    state: { name: 'sunny', age: 18 },
  }}
>
<Route path="/about" component={AboutPage} />
```

## 实战经验部分

- index.js

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// 引入BrowserRouter模块
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* 使用Router包裹主组件这样下面的子组件就可以获取路由相关的属性 */}
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
```

- app.js

```tsx
// Route用于展示匹配路由路径对应的组件
// Switch只会展示一个匹配到的路由组件
import { Route, Switch } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Login from './pages/Login/Login';
import NoFound from './pages/NoFound/NoFound';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Layout} />
        <Route component={NoFound} />
      </Switch>
    </div>
  );
}

export default App;
```

- Product.jsx

```tsx
import React, { Component } from 'react';
// 三级路由配置
// NavLink 可以设置配置匹配路由激活时候的样式
// Route 配置匹配路由对应的组件
// Switch 只会展示被优先匹配到的路由
import { NavLink, Route, Switch } from 'react-router-dom';
import classnames from 'classnames';
import Fishs from './modules/Fishs/Fishs';
import Vegetables from './modules/Vegetables/Vegetables';
import './product.scss';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 匹配默认展示的三级路由地址
    const initRouteState = this.props.location.pathname === '/home/product';
    return (
      <div className="Product">
        <div className="product-nav">
          <div>产品中心</div>
          {/* activeClassName设置路由连接被激活时候的样式 */}
          <NavLink
            to="/home/product/fishs"
            className={classnames({ 'active-select': initRouteState })}
            activeClassName="active-select"
          >
            鱼类中心
          </NavLink>

          <NavLink
            to="/home/product/vegetables"
            activeClassName="active-select"
          >
            蔬菜中心
          </NavLink>
        </div>

        <div className="product-content">
          <Switch>
            <Route path="/home/product/fishs" component={Fishs} />
            <Route path="/home/product/vegetables" component={Vegetables} />
            {/* 匹配 /home/product 二级路由默认展示的组件*/}
            <Route component={Fishs} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Product;
```
