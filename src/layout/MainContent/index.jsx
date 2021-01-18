import { Suspense } from 'react';
import { observer } from 'mobx-react';
import { Route } from 'react-router-dom';
import LoginStore from '../../store/login';
import NoFound from '../../pages/NoFound';
import Login from '../../pages/Login';
import Welcome from '../../pages/Welcome';
import RouterNavLink from './RouterNavLink';
import RouterSubLink from './RouterSubLink';
import TopBar from '../TopBar';
import FooterBar from '../FooterBar';
import Validator from 'validatorjs';

import './style.scss';

const loginStore = LoginStore.getInstance();

const MainContent = props => {
  console.log('MainContent999', props);
  const { location, config, homeRouterConfig } = props;
  const { pathname } = location;
  const { login: loginData } = loginStore;

  Validator.useLang('zh'); // 设置校验插件

  const isLogin = sessionStorage.getItem('isLogin'); // 是否为登录状态

  console.log('pathname', pathname, 'isLogin888', isLogin);

  // 获取当前路由的路由配置
  const targetRouterConfig = config.find(router => router.path === pathname);

  // 如果当前未登录则跳转到登录界面
  if (!isLogin || pathname === '/login') {
    return <Route path="/" component={Login} />;
  }

  // 已经登录
  if (targetRouterConfig) {
    const { component } = targetRouterConfig;

    return (
      <Suspense fallback={<div>加载中……</div>}>
        <div className="MainContent">
          {/* 顶部 */}
          <TopBar />
          {/* 主体内容部分 */}
          <div className="MainContent-main">
            {/* 左侧菜单 */}
            <RouterNavLink location={location} routerConfig={homeRouterConfig} />
            <div className="MainContent-contain">
              {/* 主体内容顶部三级菜单 */}
              {/* <RouterSubLink location={location} routerConfig={homeRouterConfig} /> */}
              {/* 访问根目录如果是已经登录状态则直接跳转到主页 */}
              {pathname === '/' ? <Route path="/" component={Welcome} /> : <Route path={pathname} component={component} />}
            </div>
          </div>
          {/* 页脚 */}
          <FooterBar />
        </div>
      </Suspense>
    );
  } else {
    // 没有找到任何界面
    return <Route component={NoFound} />;
  }
};

export default observer(MainContent);
