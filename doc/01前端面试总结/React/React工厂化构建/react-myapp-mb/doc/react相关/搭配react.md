## 搭配 react

## 构建 React 开发环境

### 相关插件的安装及配置

```js
// cnpm i react react-dom -S
// cnpm install --save-dev @babel/preset-react -D

// .babelrc文件的配置
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

- 对 scss 文件的支持

```js
// 解析scss文件
{
  test: /\.scss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        esModule: true,
      },
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        ident: 'postcss',
        plugins: [
          require('postcss-preset-env')({
            browsers: 'last 5 versions',
            autoprefixer: { grid: true },
          }),
          require('postcss-pxtorem')({
            rootValue: 75,
            propList: ['*'],
          }),
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
  include: path.resolve(__dirname, 'src'),
},
```

- 对装饰器的支持

```js
// cnpm i @babel/plugin-proposal-decorators -D

// 在babelrc文件中配置
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
}

```

- css 模块化的支持

```js

{
  loader: 'css-loader',
  options:{
    sourceMap: true,
    modules:{
      localIdentName:'[path][name]_[local]--[hash:base64:5]',
    }
  }
}

```

### 基础模块的安装

```js
'react-router';
'react-router-dom';
'redux';
'react-redux';
'redux-persist';
'redux-saga';
'intl';
'react-intl';
"mobx": "5.15.7",
"mobx-react": "6.3.1",
"mobx-react-form": "^3.0.0",
```

## 环境变量的添加

- concurrently 的使用

- 1 次执行多条命令

```js
// better-npm-run 的使用
```

- string-replace-webpack4-plugin 的安装

```js
// cnpm i string-replace-webpack4-plugin -D
```

### 移动端的适配方案

- 设置理想视口

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
```

- 第二步利用 px2rem-loader 和 flexible.js 实现响应式

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUni: 75,
              remPrecision: 8,
            },
          },
        ],
      },
    ],
  },
};

// 或者
{
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    ident: 'postcss',
    plugins: [
      require('postcss-preset-env')({
        browsers: 'last 5 versions',
        autoprefixer: { grid: true },
      }),
      require('postcss-pxtorem')({
        rootValue: 75,
        propList: ['*'],
      }),
    ],
  },
},
```

- 忽略格式化转换的方法

```scss
body,
html {
  /* prettier-ignore */
  max-width: 750PX;
  /* prettier-ignore */
  min-width: 320PX;
  margin: 0 auto;
  border: 1px solid #f00;
}
```

- flexible.js

```js
/**
 * 以下这段代码是用于根据移动端设备的屏幕分辨率计算出合适的根元素的大小
 * 当设备宽度为375(iPhone6)时，根元素font-size=16px; 依次增大；
 * 限制当为设备宽度大于768(iPad)之后，font-size不再继续增大
 * scale 为meta viewport中的缩放大小
 */
(function(doc, win) {
  var docEl = win.document.documentElement;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  /**
    * ================================================
    *   设置根元素font-size
    * 当设备宽度为375(iPhone6)时，根元素font-size=16px; 
    × ================================================
    */
  var refreshRem = function() {
    var clientWidth = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;

    console.log(clientWidth);
    if (!clientWidth) return;
    var fz;
    var width = clientWidth;
    fz = (16 * width) / 375;
    docEl.style.fontSize = fz + 'px';
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, refreshRem, false);
  doc.addEventListener('DOMContentLoaded', refreshRem, false);
  refreshRem();
})(document, window);
```

## 相关参考文章

```js
// 移动端Web页面适配方案 https://segmentfault.com/a/1190000008767416
```
