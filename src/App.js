import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import NoFound from './pages/NoFound/NoFound';
// import { Button } from 'antd';

import './App.scss';

const Layout = lazy(() => import('./pages/Layout/Layout'));

function App() {
  return (
    <Suspense fallback={<div>加载中……</div>}>
      <div className="App">
        {/* <Button type="primary">Button</Button> */}
        {/* <Input placeholder="Basic usage" /> */}
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" component={Layout} />
          <Route component={NoFound} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
