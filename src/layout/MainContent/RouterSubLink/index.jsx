import { NavLink } from 'react-router-dom';
import './style.scss';
const RouterSubLink = props => {
  const { location, routerConfig } = props;
  const { pathname } = location;

  const filterRouter = routerConfig.find(routerItem => {
    return pathname.includes(routerItem.path) && pathname !== '/home' && !pathname.includes('/welcome');
  });

  // 当前模块的主路径
  const mainPath = filterRouter ? filterRouter.path : '';
  let subRouterList = [];

  if (filterRouter && Array.isArray(filterRouter.children)) {
    subRouterList = filterRouter.children;
  }

  return (
    <div className="RouterSubLink">
      {/* 渲染二级路由 */}
      {subRouterList.map((routerItem, index) => (
        <div key={`${routerItem.path}${routerItem.title}`} className="subnav-link-item">
          <NavLink
            to={routerItem.path}
            /* 设置激活路径样式包括默认激活 */
            className={mainPath === pathname && index === 0 ? 'active-select' : ''}
            exact
            activeClassName="active-select"
          >
            {routerItem.title}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default RouterSubLink;
