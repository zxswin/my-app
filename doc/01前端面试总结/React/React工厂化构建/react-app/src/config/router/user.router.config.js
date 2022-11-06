import { lazy } from 'react';
const UserManage = lazy(() => import('../../pages/User/modules/UserManage'));
const UserRolesManage = lazy(() => import('../../pages/User/modules/UserRolesManage'));
const UserPermissions = lazy(() => import('../../pages/User/modules/UserPermissions'));
// 用户管理路由配置
const setRouterConfig = [
  {
    title: '用户管理',
    path: '/home/user/manage',
    component: UserManage,
    auth: false,
  },
  {
    title: '用户角色设置',
    path: '/home/user/roles',
    component: UserRolesManage,
    auth: false,
  },
  {
    title: '操作权限设置',
    path: '/home/user/permissions',
    component: UserPermissions,
    auth: false,
  },
];

export default setRouterConfig;
