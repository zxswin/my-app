import { lazy } from 'react';
const Fishs = lazy(() => import('../../pages/Product/modules/Fishs'));
const Vegetables = lazy(() => import('../../pages/Product/modules/Vegetables'));
// 产品模块路由配置
const produceRouterConfig = [
  {
    title: '鱼类中心',
    path: '/home/product/fishs',
    component: Fishs,
    auth: false,
  },
  {
    title: '蔬菜中心',
    path: '/home/product/vegetables',
    component: Vegetables,
    auth: false,
  },
];

export default produceRouterConfig;
