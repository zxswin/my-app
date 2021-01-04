import { lazy } from 'react';
import Login from '../../pages/Login';
import NoFound from '../../pages/NoFound';
import homeRouterConfig from './home.router.config';
const Welcome = lazy(() => import('../../pages/Welcome'));

// 整体路由配置
const routerConfig = [
  {
    title: '登录页',
    path: '/login',
    component: Login,
    auth: false,
  },
  // 主页
  {
    title: '主页',
    path: '/',
    component: Welcome,
    auth: false,
  },
  {
    title: '主页',
    path: '/home',
    component: Welcome,
    auth: false,
    // 家页面下面的子路由
    children: homeRouterConfig,
  },
  // 找不到相关页面展示页
  {
    title: '未找到任何页面',
    path: null,
    component: NoFound,
    auth: false,
  },
];

export default routerConfig;
