## create-react-app 的自定义 webpack 配置

## 使用 react-app-rewired

- 依赖的安装

```ts
// 不会直接去修改create-react-app的默认配置，而是在create-react-app配置的基础上进行扩展。
// 安装react-app-rewired
// npm install react-app-rewired --save-dev

// 安装react-app-rewired
// customize-cra
const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addBundleVisualizer,
  addWebpackAlias,
  adjustWorkbox,
} = require('customize-cra');
```

- 创建 config-overrides.js

```ts
// 在根目录下新建config-overrides.js
module.exports = function override(config, env) {
  // 这里可以编写自定义的webpack配置
  return config;
};
```

- 修改 package.json 文件

```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject",
    "lint": "eslint src",
    "analyze": "source-map-explorer build/static/js/main.*",
    "serve": "serve -s build"
  },
```

## 去掉生产编译多余的 console.log 输出

- 安装依赖

```ts
// 安装 uglifyjs-webpack-plugin 插件
```

- 修改 config-overrides.js

```ts
const { override, addWebpackPlugin } = require('customize-cra');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = override(
  // 判断环境，只有在生产环境的时候才去使用这个插件
  process.env.NODE_ENV === 'production' &&
    addWebpackPlugin(
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true,
          },
        },
      })
    )
);
```

## 装饰器的支持

- 安装相关依赖

```ts
// 安装 babel-plugin-import
// 安装@babel/plugin-proposal-decorators
```

- 在根目录下添加 jsconfig.json 文件

```js
// 用以消除vscode的报错
// 在系统配置文件中添加,可以不用并无任何报错
// {
//     "javascript.implicitProjectConfig.experimentalDecorators": true
// }
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}

```

- 修改 config-overrides.js

```ts
const {
  override,
  addWebpackPlugin,
  addDecoratorsLegacy,
  disableEsLint,
} = require('customize-cra');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = override(
  // 启用装饰器bable插件
  addDecoratorsLegacy(),

  // 在webpack中禁用eslint
  disableEsLint(),

  // 判断环境，只有在生产环境的时候才去使用这个插件
  process.env.NODE_ENV === 'production' &&
    addWebpackPlugin(
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true,
          },
        },
      })
    )
);
```

## ant 的引入

- 安装相关依赖

```ts
// 安装相关依赖
// "antd": "3.26.19",
// "less": "^4.0.0",
// less-loader": "^7.1.0",
```

- 在 app.js 文件中引入

```js
// 按需引入即可
// less样式文件混合会报错需要添加()
// Possibly missing '(' in mixin call
import { Button } from 'antd';

<Button type="primary">Button</Button>;
```

- 修改 config-overrides.js

```js
const {
  override,
  addWebpackPlugin,
  addDecoratorsLegacy,
  disableEsLint,
  addLessLoader,
  fixBabelImports,
} = require('customize-cra');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = override(
  // 启用装饰器bable插件
  addDecoratorsLegacy(),

  // 在webpack中禁用eslint
  disableEsLint(),

  // 判断环境，只有在生产环境的时候才去使用这个插件
  process.env.NODE_ENV === 'production' &&
    addWebpackPlugin(
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true,
          },
        },
      })
    ),

  // babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // 添加对less的支持
  addLessLoader({
    lessOptions: {
      modifyVars: {
        '@primary-color': '#1DA57A', // Ant Design主题颜色修改
      },
      javascriptEnabled: true,
    },
  })
);
```

## 对别名的支持

```ts
// 对别名的支持
addWebpackAlias({
  '@': path.resolve(__dirname, 'src'),
  components: path.resolve(__dirname, 'src/components'),
});
```
