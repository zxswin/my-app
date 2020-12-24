import React, { Component, lazy, Suspense } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import './layout.scss';
const ProductPromise = import('../Product/Product');
const OrderPromise = import('../Order/Order');
const Product = lazy(() => ProductPromise);
const Order = lazy(() => OrderPromise);
class Layout extends Component {
  render() {
    return (
      <Suspense fallback={<div>加载中……</div>}>
        <div className="Layout">
          <div className="layout-left">
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
      </Suspense>
    );
  }
}

export default Layout;
