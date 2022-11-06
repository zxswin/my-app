import { lazy } from 'react';
import produceRouterConfig from './product.router.config';
import orderRouterConfig from './order.router.config';
import setRouterConfig from './set.router.config';
import weixinRouterConfig from './weixin.router.config';
import userRouterConfig from './user.router.config';
import agentRouterConfig from './agent.router.config';
// const ProductPromise = import('../../pages/Product');
// const OrderPromise = import('../../pages/Order');
import Welcome from '../../pages/Welcome';
const Product = lazy(() => import('../../pages/Product/modules/ProductManage'));
const Order = lazy(() => import('../../pages/Order/modules/OrderManage'));
const Setting = lazy(() => import('../../pages/Setting/modules/MysqlSet'));
const User = lazy(() => import('../../pages/User/modules/UserManage'));
const WeixinGzh = lazy(() => import('../../pages/Weixin/modules/WeixinGzh'));

const AgentUserManage = lazy(() => import('../../pages/Agent/modules/AgentUserManage'));

// 主页子路由配置
const homeRouterConfig = [
  // 欢迎界面
  {
    title: '主界面',
    path: '/home/welcome',
    component: Welcome,
    auth: false,
    icon: 'home',
  },
  // 产品页面
  {
    title: '产品中心',
    path: '/home/product',
    component: Product,
    auth: false,
    // 产品页面下面的子页面
    children: produceRouterConfig,
    icon: 'product',
  },
  // 订单页面
  {
    title: '订单中心',
    path: '/home/order',
    component: Order,
    auth: false,
    // 订单页面下面的子页面
    children: orderRouterConfig,
    icon: 'order',
  },
  // 用户管理页面
  {
    title: '用户管理',
    path: '/home/user',
    component: User,
    auth: false,
    // 用户管理页面下面的子页面
    children: userRouterConfig,
    icon: 'user',
  },
  // 日志管理页面
  // {
  //   title: '日志管理管理',
  //   path: '/home/log',
  //   component: User,
  //   auth: false,
  //   // 用户管理页面下面的子页面
  //   children: userRouterConfig,
  //   icon: 'user',
  // },
  // 设置页面
  {
    title: '设置中心',
    path: '/home/set',
    component: Setting,
    auth: false,
    // 订单页面下面的子页面
    children: setRouterConfig,
    icon: 'set',
  },
  {
    title: '微信平台管理',
    path: '/home/weixin',
    component: WeixinGzh,
    auth: false,
    // 订单页面下面的子页面
    children: weixinRouterConfig,
    icon: 'weixin',
  },
  // 产品页面
  {
    title: '代理中心',
    path: '/home/agent',
    component: AgentUserManage,
    auth: false,
    // 产品页面下面的子页面
    children: agentRouterConfig,
    icon: 'user',
  },
];

export default homeRouterConfig;
