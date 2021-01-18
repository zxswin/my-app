import { lazy } from 'react';
const Fishs = lazy(() => import('../../pages/Product/modules/Fishs'));
const Vegetables = lazy(() => import('../../pages/Product/modules/Vegetables'));

const TestComponent = lazy(() => import('../../pages/Product/modules/TestComponent'));
// 产品模块路由配置
const produceRouterConfig = [
  {
    title: '鱼类产品',
    path: '/home/product/fishs',
    component: Fishs,
    auth: false,
  },
  {
    title: '蔬菜类产品',
    path: '/home/product/vegetables',
    component: Vegetables,
    auth: false,
  },
  {
    title: '测试中心',
    path: '/home/product/fishs-test',
    component: TestComponent,
    auth: false,
  },
];

export default produceRouterConfig;
