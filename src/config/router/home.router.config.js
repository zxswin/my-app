import { lazy } from 'react';
import produceRouterConfig from './product.router.config';
import orderRouterConfig from './order.router.config';
// const ProductPromise = import('../../pages/Product');
// const OrderPromise = import('../../pages/Order');
import Welcome from '../../pages/Welcome';
const Product = lazy(() => import('../../pages/Product'));
const Order = lazy(() => import('../../pages/Order'));

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
];

export default homeRouterConfig;
