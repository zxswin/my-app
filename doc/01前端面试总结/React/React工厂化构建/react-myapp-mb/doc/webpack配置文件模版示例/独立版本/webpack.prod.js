const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/app/index/index.ts',
    vendor: ['jquery', 'lodash'] // 需要提取的库文件列表
  },
  // 生成map文件的形式
  devtool: '',
  plugins: [
    // 清空dist文件夹
    new CleanWebpackPlugin(),
    // 生成第一个html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'index页面',
      template: './src/app/index/index.html' //模板地址
    }),

    // 当遇到了至少一处用到 lodash 变量的模块实例，自动lodash package包引入进来
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery'
    }),

    // 抽离出单独的css文件
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css'
    }),
    // 生成雪碧图
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/asset/ico'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'src/asset/sprites/sprite.png'),
        css: path.resolve(__dirname, 'src/asset/sprites/sprite.css')
      },
      apiOptions: {
        cssImageRef: '../../asset/sprites/sprite.png'
      }
    }),
    // 压缩和优化css文件
    new OptimizeCssAssetsPlugin(),
    // 处理模块标识符(Module Identifiers)，使得未改动文件保持文件名
    new webpack.NamedModulesPlugin()
  ],
  module: {
    rules: [
      // 解析js文件
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      // 解析ts文件
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      // 解析less文件
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: [
                require('postcss-preset-env')({
                  browsers: 'last 5 versions',
                  autoprefixer: { grid: true }
                })
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },

      // 解析css文件
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // 图片资源的解析
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ],
        exclude: /node_modules/
      },

      // svg,字体等资源的解析
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        use: [
          {
            loader: 'file-loader'
          },
          {
            loader: 'image-webpack-loader'
          }
        ],
        exclude: /node_modules/
      },

      // 解析csv|tsv|xml
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    // js代码的压缩和去重
    minimizer: [new UglifyJsPlugin()],
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
          minChunks: 1 // 被多少个模块重复引用的时候进行提取操作
        }
      }
    }
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist')
  }
};
