const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// webpack-merge 用于合并其他的webpack配置文件
const merge = require('webpack-merge');
// 公用的webpack配置文件
const common = require('./webpack.common.js');

const DevConfig = {
  mode: 'development',
  // 开启文件监听模式
  watch: true,
  // 监听模式下运行时的参数
  watchOptions: {
    // 不监听的文件或文件夹 支持正则匹配 默认为空
    ignored: /node_modules/,
    // 防止文件更新太快而导致重新编译频率太快,默认300ms
    aggregateTimeout: 300,
    // 询问文件是否变化 默认每秒询问1000次
    poll: 1000,
  },
  // 生成map文件的形式
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    useLocalIp: true,
    contentBase: './dist',
    hot: true,
    // 解决react等单页面运用刷新页面后找不到页面的问题
    historyApiFallback: true,
    // 代理到后端服务接口
    proxy: {
      // '/api': 'http://localhost:7001/',
      '/api': {
        target: 'http://localhost:7001/',
        // 比如访问的API路径：/api/users,
        // 设置pathRewrite: { '^/api': '' }, 后，
        // 最终代理访问的路径：http://www.baidu.com/users，
        pathRewrite: { '^/api': '' },
        // https: true,
        // changeOrigin: true, // target是域名的话，需要这个参数，
        // secure: true, // 设置支持https协议的代理
      },
      '/public': {
        target: 'http://localhost:7001/public',
        pathRewrite: { '^/public': '' },
      },
    },
  },
  plugins: [
    // 模块热替换 一般mode: 'development',的时候会自动配置
    new webpack.HotModuleReplacementPlugin(),
    // 抽离出单独的css文件
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};

module.exports = merge(common, DevConfig);
