const path = require('path');
const {
  override,
  addWebpackPlugin,
  addDecoratorsLegacy,
  disableEsLint,
  addLessLoader,
  fixBabelImports,
  addWebpackAlias,
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
  }),
  // 对别名的支持
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    components: path.resolve(__dirname, 'src/components'),
    pages: path.resolve(__dirname, 'src/pages'),
    Api: path.resolve(__dirname, 'src/api'),
    Utils: path.resolve(__dirname, 'src/utils'),
    config: path.resolve(__dirname, 'src/config'),
  })
);
