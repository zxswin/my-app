const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
  entry: {
    main: './src/app/index/index.ts',
    vendor: ['jquery', 'lodash'] // 需要提取的库文件列表
  },
  plugins: [
    // 生成第一个html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'index页面',
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联css
      },
      template: './src/app/index/index.html' //模板地址
    }),

    // 当遇到了至少一处用到 lodash 变量的模块实例，自动lodash package包引入进来
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery'
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
    // 开启 Scope Hoisting 作用域提升功能
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  module: {
    rules: [
      // 解析js文件
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, 'src')
      },
      // 解析ts文件
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path.resolve(__dirname, 'src')
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
        ],
        include: path.resolve(__dirname, 'src')
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
              limit: 8192,
              esModule: false // 这里设置为false 不然html-loader解析的图片是 [object Module]
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ],
        include: path.resolve(__dirname, 'src')
      },

      // svg,字体等资源的解析
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false // 这里设置为false 不然html-loader解析的图片是 [object Module]
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ],
        include: path.resolve(__dirname, 'src')
      },

      // 解析html文件
      {
        test: /\.(htm|html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', ':data-src']
          }
        },
        include: path.resolve(__dirname, 'src')
      },

      // 解析csv|tsv|xml
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
        include: path.resolve(__dirname, 'src')
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // 使用绝对路径指明第三方模块的存放位置,已减少搜索步骤
    modules: [path.resolve(__dirname, 'node_modules')],
    // 针对npm中的第三方模块优先采用jsnext:main中指向es6模块化语法的文件
    mainFields: ['jsnext:main', 'main', 'browser']
  },
  optimization: {
    // 提取样板(boilerplate)文件
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      // 选择要进行分割的包 可选值： all（推荐）, async(默认，只分隔异步代码), and initial(只分割同步代码)
      // 还可以通过函数来过滤所需的 chunks , chunks (chunk) => chunk.name
      chunks: 'all',

      // 默认，大于30k的包才做代码分割
      minSize: 30000,
      // maxSize：表示抽取出来的文件在压缩前的最大大小，默认为 0，表示不限制最大大小；
      maxSize: 0,
      // 默认，至少被引入一次就进行代码分隔
      minChunks: 1,
      // 默认，浏览器最多并行请求5个js文件,也就是说，分割数量超过5个时，就会停止代码分割了
      maxAsyncRequests: 5,
      // 默认，对于入口文件最多只分割3个js包，超过3个就停止
      maxInitialRequests: 3,
      // 默认，文件名连接符 多个入口文件使用了同一个chunk
      automaticNameDelimiter: '~',
      // 默认，分割后的文件名将根据chunks和cacheGroups自动生成名称。
      name: true,

      // test、priorty和reuseExistingChunk只能用于配置缓存组,cacheGroups会继承上面的配置
      cacheGroups: {
        // 库文件提取
        vendor: {
          name: 'vendor', // 提取的chunk的名称
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1, // 被多少个模块重复引用的时候进行提取操作
          // 默认缓存组的优先级(priotity)是负数 默认自定义缓存组优先级为0
          priority: -10
        }
      }
    }
  }
};
