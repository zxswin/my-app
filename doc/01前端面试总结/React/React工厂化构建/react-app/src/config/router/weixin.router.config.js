import { lazy } from 'react';
const WeixinGzh = lazy(() => import('../../pages/Weixin/modules/WeixinGzh'));
const WeixinInfo = lazy(() => import('../../pages/Weixin/modules/WeixinInfo'));
// 订单模块路由配置
const weixinRouterConfig = [
  {
    title: '自定义菜单',
    path: '/home/weixin/gzh',
    component: WeixinGzh,
    auth: false,
  },
  {
    title: '回复信息设置',
    path: '/home/weixin/info',
    component: WeixinInfo,
    auth: false,
  },
];

export default weixinRouterConfig;
