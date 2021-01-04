import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import MainContent from './layout/MainContent';
import routerConfig from './config/router/router.config';
import homeRouterConfig from './config/router/home.router.config';

/**
 * 把路由配置扁平化
 * @param RouterConfig 路由配置
 */

const routerFlatten = configData => {
  const flattenConfig = [];

  function faltten(config) {
    config.forEach(item => {
      if (!flattenConfig.find(configItem => configItem.path === item.path)) flattenConfig.push(item);

      if (Array.isArray(item.children)) {
        item.children.forEach(router => {
          flattenConfig.push(router);
          if (Array.isArray(router.children)) faltten(router.children);
        });
      }
    });
  }

  faltten(configData);

  return flattenConfig;
};

const flattenRouterConfig = routerFlatten(routerConfig);

console.log('最终路由结果', flattenRouterConfig);

function App() {
  return (
    <Suspense fallback={<div>加载中……</div>}>
      <div className="App">
        <Switch>
          <MainContent homeRouterConfig={homeRouterConfig} config={flattenRouterConfig} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
