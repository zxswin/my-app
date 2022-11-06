## create-react-app 的使用

- 使用 create-react-app 快速创建一个项目

```bash
# 快速创建
npx create-react-app my-app

# 也可以先本地全局安装create-react-app
npm i create-react-app -g
cd my-app
# 启动项目
npm start
# 将生产环境的应用程序构建到build
npm run build

# 相关目录说明
webpack只会处理src文件夹中的文件
public/index.html只能引用public文件中的文件

# public ---- 静态资源文件夹
# favicon.icon ------ 网站页签图标
# index.html -------- 主页面
# logo192.png ------- logo图
# logo512.png ------- logo图
# manifest.json ----- 应用加壳的配置文件
# robots.txt -------- 爬虫协议文件
# src ---- 源码文件夹
# App.css -------- App组件的样式
# App.js --------- App组件
# App.test.js ---- 用于给App做测试
# index.css ------ 样式
# index.js ------- 入口文件
# logo.svg ------- logo图
# reportWebVitals.js — 页面性能分析文件(需要web-vitals库的支持)
# setupTests.js ---- 组件单元测试的文件(需要jest-dom库的支持)

```

```js
// 创建typescript的项目
// npx create-react-app my-app --template typescript
```

- 升级 create-react-app

```js
// 查看最新版本
// npm info create-react-app

// 查看当前版本
// create-react-app --version

// 卸载旧版本 安装新版本
// npm uninstall -g create-react-app
// npm install -g create-react-app

// 创建react项目
// create-react-app react-app
```

- Scripts 可以脚本命令

```bash
# 在开发模式下启动项目
npm start
# 启动测试
npm test
# 打包生产环境部署包
npm run build
# 弹出生产环境配置项目用于自定义配置项目
npm run eject
```

- 关于项目升级

```bash
# 要升级create-react-app 只需要升级react-scripts即可
# 具体升级方法为
# 在package.json文件中替换react-scripts版本
# 然后重新npm install 或yarn install就可以了
```

## eslint 代码校验功能的添加

```js
// create-react-app默认是有一套eslint配置
// create-react-app默认已经安装了
"babel-eslint": "7.2.3",
"eslint": "4.10.0",
"eslint-config-react-app": "^2.1.0",
"eslint-loader": "1.9.0",
"eslint-plugin-flowtype": "2.39.1",
"eslint-plugin-import": "2.8.0",
"eslint-plugin-jsx-a11y": "5.1.1",
"eslint-plugin-react": "7.4.0",
```

- eslint 相关插件的安装

```ts
// eslint相关
eslint
eslint-loader
eslint-plugin-import
babel-eslint
eslint-plugin-flowtype

// react-app校验相关
eslint-config-react-app
eslint-plugin-jsx-a11y
eslint-plugin-react-hooks
eslint-plugin-react

// react-app/jest相关
eslint-plugin-jest
eslint-plugin-testing-library


// npm i eslint eslint-loader eslint-plugin-import babel-eslint eslint-plugin-flowtype eslint-config-react-app eslint-plugin-jsx-a11y eslint-plugin-react-hooks eslint-plugin-react eslint-plugin-jest eslint-plugin-testing-library -D

```

- 在根目录下新建.eslintrc.js

```ts
module.exports = {
  extends: ['react-app', 'react-app/jest'],
  parser: 'babel-eslint', // 关键一行 转换为ES6可识别的代码
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'no-console': 0, //禁止使用console
    'no-eq-null': 0, //禁止对null使用==或!=运算符
  },
};
```

## git 提交代码自动格式化和校验

- 相关依赖的安装

```ts
// 相关依赖的安装
npm install husky --save-dev
npm i lint-staged -D
npm i -D eslint eslint-loader eslint-plugin-import babel-eslint eslint-plugin-flowtype
npm i prettier -D
```

- .gitignore 文件

```bash
/node_modules
/.history
.eslintcache
/.vscode
/coverage
/build
```

- .prettierignore 文件

```bash
/dist/**
/node_modules/**
```

- .prettierrc 文件

```ts
{
  "arrowParens": "avoid",
  "printWidth": 140,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}

```

- 在 package.json 文件中

```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "src/**/*.{js,vue}": ["prettier --write", "eslint --cache --fix", "git add"]
}
```

- 添加 git 历史记录插件

```ts
// 安装Git History Diff插件
```

## 在 vscode 中调试 react 代码

```ts
// 第一步安装Debugger for Chrome插件
// 点击进入调试模块后会自动创建.vscode文件夹并创建launch.json文件
// npm start 运行项目
// 再需要调试的代码上打上断点,按F5进行调试
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceRoot}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

## Storybook 的使用

## React Styleguidist 的使用

## 分析 Bundle (包) 大小

```bash
# 安装source-map-explorer
yarn add source-map-explorer
# 在 package.json 中，将以下行添加到 scripts 中
"analyze": "source-map-explorer build/static/js/main.*",
```

## 样式模块化

- 添加 CSS Modules 样式表

```bash
# [name].module.css 文件命名约定支持 CSS Modules ,区分常规的CSS文件
# 对于以 .module.css 扩展名结尾的文件，将切换到 CSS Modules。

# 添加 Sass 样式表 安装node-sass就可以支持scss文件的编译了
npm install node-sass -D

# 必须在 node_modules 之前添加 ~ 前缀
@import 'styles/_colors.scss'; // 假设 styles 目录 在 src/ 目录下
@import '~nprogress/nprogress'; // 从 nprogress node模块导入 一个 css 文件

# 默认会自动进行PostCSS
# 启用 CSS Grid(网格) 前缀，请将 /* autoprefixer grid: on */ 添加到 CSS 文件的顶部
```

- Button.module.css

```css
.error {
  background-color: red;
}
```

- Button.js

```jsx
import React, { Component } from 'react';
import styles from './Button.module.css'; // 将 css modules 文件导入为 styles
import './another-stylesheet.css'; // 导入常规 CSS 文件

class Button extends Component {
  render() {
    // 作为 js 对象引用
    return <button className={styles.error}>Error Button</button>;
  }
}
```

- 输出结果

```html
<button class="Button_error_ax7yz"></div>
```

## SVG 的添加

```tsx
// ReactComponent 导入名称是特殊的，它告诉 Create React App 你想要一个渲染 SVG 的 React 组件，而不是它的文件名
import { ReactComponent as Logo } from './logo.svg';
const App = () => (
  <div>
    {/* Logo 是一个实际的 React 组件 */}
    <Logo />
  </div>
);
```

## 懒加载与代码拆分

```ts
// 支持通过 动态import() 进行代码拆分
```

## 环境变量的设置

- 环境变量的访问

```tsx
// process.env.NODE_ENV 是内置环境变量不可更改
// 运行 npm start 等于 'development'
// 运行 npm test 等于 'test'
// 运行 npm run build 等于 'production'
render() {
  return (
    <div>
      <small>{process.env.NODE_ENV}</small>
      <span>{process.env.REACT_APP_SECRET_CODE}</span>
    </div>
  );
}
```

- 设置临时环境变量

```ts
// Windows (cmd.exe)
set "REACT_APP_SECRET_CODE=abcdef" && npm start

// Linux, macOS (Bash)
REACT_APP_SECRET_CODE=abcdef npm start
```

- 设置永久环境变量

```bash
# env：默认。
# .env.local：本地覆盖。除 test 之外的所有环境都加载此文件。
# .env.development, .env.test, .env.production：设置特定环境。
# .env.development.local, .env.test.local, .env.production.local：设置特定环境的本地覆盖。
# 在根目录中添加.env文件
# 在 .env 中添加开发环境变量
REACT_APP_SECRET_CODE = abcdef;
REACT_APP_VERSION = $npm_package_version;
DOMAIN = www.example.com;
REACT_APP_FOO = $DOMAIN/foo;
REACT_APP_BAR = $DOMAIN/bar;
```

## api 访问 Proxy 代理设置

```ts
/**
 * 安装http-proxy-middleware中间件
 * yarn add http-proxy-middleware -D
 */
```

- 在 src 文件夹下面新建 setupProxy.js 文件

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:7001',
      pathRewrite: { '/api': '' },
    })
  );
};
```

## 运行生产构建版本的静态服务器

```bash
# 安装serve
# yarn add serve -D
"serve": "serve -s build"
```

- package.json 文件中的 browserslist 决定是否需要添加对于的 css 前缀

```ts
"browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
```

## 资源

```js
// 中文文档
// https://create-react-app.bootcss.com/docs/adding-relay
```
