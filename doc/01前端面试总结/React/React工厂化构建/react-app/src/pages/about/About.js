import React, { lazy, Suspense } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import style from './style.module.scss';

// 提前调用import() 实现预加载
const AboutOnePromise = import('./aboutOne');
const AboutTwoPromise = import('./aboutTwo');

// 通过lazy生成需要延迟加载的组件
const AboutOne = lazy(() => AboutOnePromise);
const AboutTwo = lazy(() => AboutTwoPromise);

const About = props => {
  const clickGoHome = () => {
    const { history } = props;
    console.log('history====', history);
    history.push('/');
  };

  return (
    <Suspense fallback={<div>加载中666……</div>}>
      <div className={style.about}>
        <div className={style.linkBox}>
          <NavLink to="/about/1/one" activeClassName={style.active}>
            AboutOne
          </NavLink>

          <NavLink to="/about/1/two" activeClassName={style.active}>
            AboutTwo
          </NavLink>

          <button onClick={clickGoHome}>回到主页</button>
        </div>
        <div className={style.contain}>
          <Switch>
            <Route path="/about/:id" exact component={AboutOne} />
            <Route path="/about/:id/one" component={AboutOne} />
            <Route path="/about/:id/two" component={AboutTwo} />
          </Switch>
        </div>
      </div>
    </Suspense>
  );
};

export default About;
