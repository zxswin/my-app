import { lazy } from 'react';
const Fishs = lazy(() => import('../../pages/Product/modules/Fishs'));
const Vegetables = lazy(() => import('../../pages/Product/modules/Vegetables'));
// 订单模块路由配置
const orderRouterConfig = [
  {
    title: '订单查询',
    path: '/home/order/fishs',
    component: Fishs,
    auth: false,
  },
  {
    title: '订单补录',
    path: '/home/order/vegetables',
    component: Vegetables,
    auth: false,
  },
];

export default orderRouterConfig;
