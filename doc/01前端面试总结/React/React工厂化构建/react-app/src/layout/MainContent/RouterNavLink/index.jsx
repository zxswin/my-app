import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import './style.scss';

const RouterNavLink = props => {
  const { location, routerConfig } = props;
  const { pathname } = location;

  const filterRouter = routerConfig.find(routerItem => {
    return pathname.includes(routerItem.path) && pathname !== '/home' && !pathname.includes('/welcome');
  });

  // 当前模块的主路径
  const mainPath = filterRouter ? filterRouter.path : '';

  console.log('mainPath', mainPath);

  /** 点击了一级路由  */
  const onMenuClickHandle = e => {
    // 实现显示及隐藏子菜单
    const target = e.currentTarget;
    const menuItem = target.parentNode;
    const menuIconArrow = target.querySelector('.link-menu-icon-arrow');
    if (menuIconArrow) menuIconArrow.classList.toggle('icon-arrow-up');
    const menuSubContent = menuItem.querySelector('.link-menu-sub-contain');
    if (menuSubContent) menuSubContent.classList.toggle('hide-sub');
  };

  return (
    <div className="RouterNavLink">
      {routerConfig.map(routerItem => (
        <div key={`${routerItem.title}${routerItem.path}`} className="nav-link-item">
          <NavLink
            to={routerItem.path}
            exact
            /* 设置激活路径样式包括默认激活 */
            className={classnames({
              'link-menu-submenu': true,
              'active-select': pathname.includes(routerItem.path),
            })}
            activeClassName="active-select"
            onClick={onMenuClickHandle}
          >
            <div className="link-menu-title">
              <span className={`link-menu-icon link-menu-icon-${routerItem.icon}`}></span>
              <span>{routerItem.title}</span>
              <span
                className={classnames({
                  'link-menu-icon': Array.isArray(routerItem.children) && routerItem.children.length,
                  'icon-arrow-size': true,
                  'link-menu-icon-arrow': Array.isArray(routerItem.children) && routerItem.children.length,
                  'icon-arrow-up': Array.isArray(routerItem.children) && routerItem.children.length,
                })}
              ></span>
            </div>
          </NavLink>
          {routerItem.children && (
            <ul className="link-menu-sub-contain hide-sub">
              {routerItem.children.map((childItem, index) => (
                <li key={`${childItem.path}${childItem.title}`}>
                  <NavLink
                    to={childItem.path}
                    exact
                    /* 设置激活路径样式包括默认激活 */
                    className={classnames({
                      'link-menu-sub-item': true,
                      'active-select':
                        childItem.path.includes(mainPath) && childItem.path.includes(pathname) && mainPath !== '' && index === 0,
                    })}
                    activeClassName="active-select"
                  >
                    <span className="link-menu-sub-title">{childItem.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default RouterNavLink;
