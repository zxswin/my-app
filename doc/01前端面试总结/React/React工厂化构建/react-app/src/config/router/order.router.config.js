import { lazy } from 'react';
const orderManage = lazy(() => import('../../pages/Order/modules/OrderManage'));
const CouponManage = lazy(() => import('../../pages/Order/modules/CouponManage'));
// 订单模块路由配置
const orderRouterConfig = [
  {
    title: '订单管理',
    path: '/home/order/manage',
    component: orderManage,
    auth: false,
  },
  {
    title: '优惠券管理',
    path: '/home/order/coupon',
    component: CouponManage,
    auth: false,
  },
];

export default orderRouterConfig;
