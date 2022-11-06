import { lazy } from 'react';
const ProductManage = lazy(() => import('../../pages/Product/modules/ProductManage'));
const ProductMenuManage = lazy(() => import('../../pages/Product/modules/ProductMenuManage'));
const ProductComment = lazy(() => import('../../pages/Product/modules/ProductComment'));
// const TestComponent = lazy(() => import('../../pages/Product/modules/TestComponent'));
// 产品模块路由配置
const produceRouterConfig = [
  {
    title: '产品管理',
    path: '/home/product/manage',
    component: ProductManage,
    auth: false,
  },
  {
    title: '产品菜单管理',
    path: '/home/product/menu',
    component: ProductMenuManage,
    auth: false,
  },
  {
    title: '产品评论管理',
    path: '/home/product/comment',
    component: ProductComment,
    auth: false,
  },
];

export default produceRouterConfig;
