import { lazy } from 'react';
const AgentUserManage = lazy(() => import('../../pages/Agent/modules/AgentUserManage'));
// 代理模块路由配置
const agentRouterConfig = [
  {
    title: '代理客户管理',
    path: '/home/agent/management',
    component: AgentUserManage,
    auth: false,
  },
];

export default agentRouterConfig;
