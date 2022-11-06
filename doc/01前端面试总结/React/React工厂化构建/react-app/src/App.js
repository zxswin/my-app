import React, { Suspense } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import store from './store/index';
import Home from 'pages/home';
import About from 'pages/about';
import Concat from 'pages/concat';
import NoMatch from 'pages/noMatch';
import style from './index.module.scss';

function App(props) {
  console.log('获取redux state结果', store.getState());
  const { fetchAppData } = props;

  const getRemoteData = () => {
    fetchAppData({ page: 1 });
    console.log('props===', props);
  };

  return (
    <Suspense fallback={<div>加载中……</div>}>
      <div className={style.App}>
        <div className={style.linkbox}>
          <NavLink to="/" exact activeClassName={style.active}>
            首页
          </NavLink>
          <NavLink
            to={{
              pathname: '/about/1',
              state: { name: 'sunny', age: 18 },
            }}
            activeClassName={style.active}
          >
            关于我们
          </NavLink>
          <NavLink to="/contact" activeClassName={style.active}>
            联系我们
          </NavLink>

          <button onClick={getRemoteData}>获取远程数据</button>
        </div>

        <div className={style.contain}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about/:id" component={About} />
            <Route path="/contact" component={Concat} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
