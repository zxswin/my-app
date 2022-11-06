// import { lazy } from 'react';

// const ProductPage = lazy(() => import('../../pages/ProductPage'));
import ProductLists from '../../containers/ProductLists';
import Contact from '../../containers/Contact';
import DriedFood from '../../containers/DriedFood';
import ProdPage from '../../containers/ProdPage';
import HotSale from '../../containers/HotSale';
import Agent from '../../containers/Agent';
import NoFound from '../../containers/NoFound';

// 不需要在底部菜单栏中展示的路由
export const ignoreNavBarList = ['/prod', '/agent'];

// 整体路由配置
const routerConfig = [
  {
    name: '产品',
    path: '/',
    component: ProductLists,
    auth: false,
    icon: 'prod',
  },
  // 主页
  {
    name: '热销',
    path: '/hotsale',
    component: HotSale,
    auth: false,
    icon: 'hot',
  },
  {
    name: '干货',
    path: '/driedfood',
    component: DriedFood,
    auth: false,
    icon: 'dried',
  },
  {
    name: '购买',
    path: '/contact',
    component: Contact,
    auth: false,
    icon: 'mine',
  },
  // 单独访问某个产品连接
  {
    name: '产品',
    path: '/prod',
    component: ProdPage,
    auth: false,
    icon: 'prod',
  },
  {
    name: '代理',
    path: '/agent',
    component: Agent,
    auth: false,
    icon: 'hot',
  },
  // 找不到相关页面展示页
  {
    name: '未找到任何页面',
    path: null,
    component: NoFound,
    auth: false,
  },
];

export default routerConfig;
