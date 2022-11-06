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
    contentBase: './dist',
    hot: true,
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
