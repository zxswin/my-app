## webpack 深入浅出

## 常用的 Loader

- 加载文件

```bash
# raw-loader
将文本文件的内容加载到代码中
# file-loader
将文本文件输出到一个文件夹中,在代码中通过对应的URL去引用输出的文件
# url-loader
和file-loader类似,但是在文件很小的情况下以base64方式将文件的内容出入到代码中
# source-map-loader
加载额外的SourceMap文件,以便断点调试
# svg-inline-loader
将压缩后的SVG内容出入代码中
# node-loader
加载Node.js原生模块的.node文件
# image-loader
加载并且压缩图片文件
# json-loader
加载JSON文件
# yaml-loader
加载YAML文件

```

- 编译模块

```bash
# pug-loader
将pug模板转换成功js函数并返回
# handlebars-loader
将Handlebars模板编译成函数并返回
# ejs-loader
将EJS模板编译成函数并返回
# haml-loader
将HAML代码装成HTML
# markdowm-loader
将Markdown文件转换成HTML
```

- 转换脚本语言

```bash
# babel-loader
将ES6转换为ES5
# ts-loader
将TS转换成js
# awesome-typescript-loader
将TS转换成js,性能要比ts-loader好
# coffee-loader
将CoffeeScript转换为js
```

- 转换样式文件

```bash
# css-loader
加载CSS,支持模块化压缩,文件导入等特性
# style-loader
将CSS代码注入js中,通过DOM操作去加载CSS
# sass-loader
将SCSS/SASS代码转换成CSS
# postcss-loader
扩展CSS语法,使用下一代CSS
# less-loader
将Less代码转换成功CSS代码
# stylus-loader
将Stylus代码转换成CSS代码
```

- 检测代码

```bash
# eslint-loader
通过ESlint检测js代码
# tslint-loader
通过TSLint检测TypeScript代码
# mocha-loader
加载Mocha测试用例代码
# coverjs-loader
计算测试的覆盖率
```

- 其他 Loader

```bash
# vue-loader
加载Vue.js单文件组件
# i18n-loader
加载多语言版本,支持国际化
# ignore_loader
忽略部分文件
# ui-component-loader
按需加载UI组件库,例如在使用antdUI组件库时,不会引号只用到Button组件而打包进所有的组件

```

## 常用的插件

- 用于修改行为

```bash
# defind-plugin
定义环境变量
# context-replacement-plugin
修改require语句在寻在文件时的默认行为
# ignore-plugin
用于忽略部分文件
```

- 用于优化

```bash
# commons-chunk-plugin
提取公共代码
# extract-text-webpack-plugin
提取js中的css代码到单独的文件中
# prepack-webpack-plugin
通过Facebook的Prepack优化输出js代码的性能
# uglifyjs-webpack-plugin
通过UglifyEs压缩ES6代码
# webpack-parallel-uglify-plugin
多进程执行UglifyJS代码压缩,提升构建速度
# imagemin-webpack-plugin
压缩图片文件
# webpack-spritesmith
用插件制作雪碧图
# ModuleConcatenationPlugin
开启WebpackScopeHoisting功能
# dll-plugin
借鉴DDL的思想大幅提升构建速度
# hot-module-replacement-plugin
开启模块热替换功能
```

- 其他 Plugin

```bash
# serviceworker-webpack-plugin
为网页运用增加离线缓存功能
# stylelint-webpack-plugin
将stylelint集成到项目中
#i18n-webpack-plugin
使网页支持国际化
# provide-plugin
从环境中提供的全局变量中加载模块,而不用导入对应的文件
#web-webpack-plugin
可以方便地位单网页应用输出HTML,比html-webpack-plugin好用
```

## 相关资源

- [webpack 深入浅出在线图书](http://webpack.wuhaolin.cn/)
- [webpack-examples：来自 Webpack 官方的案例集合](https://github.com/webpack/webpack/tree/master/examples)
- [来自阮一峰的 Webpack 案例集合](https://github.com/ruanyf/webpack-demos)
- [Webpack 优秀周边生态收集](https://github.com/webpack-contrib/awesome-webpack)
- [Webpack 优秀中文文章](https://github.com/webpack-china/awesome-webpack-cn)
