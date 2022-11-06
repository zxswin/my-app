import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import routerConfig, { ignoreNavBarList } from '../../config/router/router.config';
import styles from './style.scss';

const NavBar = props => {
  const { pathname } = props;
  const showRouterConfig = routerConfig.filter(router => router.path !== null && !ignoreNavBarList.includes(router.path));
  return (
    <div className={styles.NavBar}>
      {showRouterConfig.map((routerItem, i) => (
        <NavLink
          className={classnames(styles.nav, routerItem.path === pathname ? styles.activeSelect : '')}
          key={`${i}${routerItem.name}`}
          to={routerItem.path}
          exact
        >
          <div
            className={classnames(
              styles.icon,
              styles[`${routerItem.icon}`],
              routerItem.path === pathname ? styles[`active${routerItem.icon}`] : ''
            )}
          ></div>
          <div>{routerItem.name}</div>
        </NavLink>
      ))}
    </div>
  );
};

export default NavBar;
