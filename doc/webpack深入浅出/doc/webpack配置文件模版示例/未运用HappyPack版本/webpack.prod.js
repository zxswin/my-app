const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
// webpack-merge 用于合并其他的webpack配置文件
const merge = require('webpack-merge');
// 公用的webpack配置文件
const common = require('./webpack.common.js');

const ProdConfig = {
  mode: 'production',
  // 生成map文件的形式
  devtool: '',
  plugins: [
    // 清空dist文件夹
    new CleanWebpackPlugin(),
    // 抽离出单独的css文件
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css'
    }),
    // 压缩和优化css文件
    new OptimizeCssAssetsPlugin(),
    // 处理模块标识符(Module Identifiers)，使得未改动文件保持文件名
    new webpack.NamedModulesPlugin(),
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // 打包输出分析
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    // js代码的压缩和去重
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_debugger: true, //去掉debugger
            drop_console: true // 去掉console
          },
          output: {
            comments: false // 删除所有注释
          }
        },
        sourceMap: false,
        parallel: true
      })
    ],
    // 开启Tree Shaking
    usedExports: true,
    sideEffects: true
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist')
  }
};

module.exports = merge(common, ProdConfig);
