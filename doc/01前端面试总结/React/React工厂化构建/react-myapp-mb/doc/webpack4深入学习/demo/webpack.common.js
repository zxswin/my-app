const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口文件配置，可以有多个入口，可以编译生成多个文件
  entry: {
    app: './src/index.js',
    vendor: ['lodash'] // 需要提取的库文件列表
  },
  plugins: [
    // 处理index.html模块文件,未指定的时候会自动生成
    new HtmlWebpackPlugin({
      title: 'webpack构建项目'
    }),

    // ProvidePlugin插件 可以在全局中使用_变量而无需引用
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ],
  optimization: {
    // 提取样板(boilerplate)文件
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        // 库文件提取
        vendor: {
          name: 'vendor', // 提取的chunk的名称
          chunks: 'initial',
          minChunks: 2 // 被多少个模块重复引用的时候进行提取操作
        }
      }
    }
  }
};
