import { lazy } from 'react';
const Setting = lazy(() => import('../../pages/Setting/modules/MysqlSet'));
// 订单模块路由配置
const setRouterConfig = [
  {
    title: '数据库设置',
    path: '/home/set/mysql',
    component: Setting,
    auth: false,
  },
];

export default setRouterConfig;
