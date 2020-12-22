import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Product from '../Product/Product';
import Order from '../Order/Order';
import styles from './layout.module.scss';
import './layout.scss';
class Layout extends Component {
  render() {
    return (
      <div className={styles.Layout}>
        <div className={styles['layout-left']}>
          <NavLink to="/home" exact activeClassName="active-select">
            欢迎页面
          </NavLink>
          <NavLink to="/home/product" activeClassName="active-select">
            产品中心
          </NavLink>
          <NavLink to="/home/order" activeClassName="active-select">
            订单中心
          </NavLink>
        </div>
        <div className="layout-right">
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/home/product" component={Product} />
            <Route path="/home/order" component={Order} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Layout;
