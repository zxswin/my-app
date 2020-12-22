import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './layout.module.scss';

class Layout extends Component {
  render() {
    return (
      <div className={styles.Layout}>
        <div className="layout-left">
          <NavLink to="/home" exact activeClassName="active-select">
            首页
          </NavLink>
          <NavLink to="/home/product" activeClassName="active-select">
            产品中心
          </NavLink>
          <NavLink to="/home/order" activeClassName="active-select">
            订单中心
          </NavLink>
        </div>
        <div className="layout-right"></div>
      </div>
    );
  }
}

export default Layout;
