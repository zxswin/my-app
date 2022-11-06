const path = require('fs');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  // 入口配置
  entry: './app/entry',
  // 输出配置
  output: {
    // 输出文件存放的目录
    path: path.resolve(__dirname, 'dist'),
    // 输出文件的名称
    filename: '[name]-[chunkhash].js',
    // 发布到线上所有资源的url前缀
    publicPath: '', // 放在根目录下
    // 导出库的名称,不填的时候默认的输出格式是匿名的立即执行函数
    library: 'MyLibrary',
    // 可以是 umd,umd2,commonjs2,commonjs,amd,this,var,assign,window,global,jsonp
    libraryTarget: 'umd',
    // 是否包含有用的文件路径信息到生成的代码里
    pathinfo: true,
    // 附加Chunk的文件名
    chunkFilename: '[id]-[chunkhash].js',
    // JSONP异步加载资源时的回调函数名称,需要和服务器搭配使用
    jsonpFunction: 'myWebpackJsonp',
    // 生成source Map文件的名称
    sourceMapFilename: '[file].map',
    // 浏览器开发者工具里显示的源码模块的名称
    devtollModuleFilenameTemplate: 'webpack:///[resource-path]',
    // 异步加载跨域的资源的使用方式
    crossOriginLoading: false,
  },

  // 配置模块相关
  module: {
    // 配置loader
    rules: [
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'app')],
        exclude: [path.resolve(__dirname, 'app/demo-files')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
            },
          },
        ],
      },
    ],
    // 不用解析和处理的模块
    noParse: [
      /special-library\.js$/, // 使用正则匹配
    ],
  },

  // 配置插件
  plugins: [
    new CommonsChunkPlugin({
      name: 'common',
      chunks: ['a', 'b'],
    }),
  ],

  // 配置寻找模块的规则
  resolve: {
    // 寻找模块的根目录,为array类型,默认以node_modules为根目录
    modules: ['node_modules', path.resolve(__dirname, 'app')],
    // 模块的后缀名
    extensions: ['.js', '.json', '.jsx', '.css'],
    // 模块别名配置,用于映射模块
    alias: {
      module: 'new-module',
      'only-module$': 'new-module',
    },
    // 是否跟随文件的软连接去搜寻模块的路径
    symlinks: true,
    // 模块的描述文件
    descriptionFiles: ['package.json'],
    // 模块的描述文件里描述入口的文件的字段名
    mainFields: ['main'],
    // 是否强制导入语句写明文件后缀
  },

  // 输出文件的性能检查配置
  performance: {
    hints: 'warning', // 有性能问题的时候输出警告
    maxAssetSize: 200000, // 最大文件大小
    maxEntrypointSize: 400000, // 最大入口文件的大小
    assetFilter: function(assetFilename) {
      // 过滤要检查的文件
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    },
  },

  // 配置source-map的类型
  devtool: 'source-map',
  // webpack使用的根目录,string类型必须是绝对路径
  context: __dirname,
  // 配置输出代码的运行环境
  target: 'web', // 浏览器默认
  // 使用来自JS运行环境提供的全局变量
  externals: {
    jquery: 'jQuery',
  },

  // 控制台输出日志控制
  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
  },
  // DevServer相关的配置
  devServer: {
    // 代理到后端服务接口
    proxy: {
      '/api': 'http://localhost:3000',
    },
    // 配置DevServer HTTP服务器的文件根目录
    contentBase: PushSubscription.join(__dirname, 'public'),
    // 是否开启Gzip压缩
    compress: true,
    // 是否开发HTML5 History API网页
    historyApiFallback: true,
    // 是否开启模块热替换功能
    hot: true,
    // 是否开启https模式
    https: false,
  },

  // 是否捕抓webpack构建的性能信息,分析是什么原因导致构建性能不佳
  profile: true,
  // 是否启用缓存来提升构建速度
  cache: false,
  // 是否启用文件监听模式
  watch: true,
  // 文件监听选项
  watchOptions: {
    // 不监听的文件或文件夹,支持正则匹配,默认为空
    ignored: /node_modules/,
    // 监听到变化后300ms再执行动作
    aggregateTimeout: 300,
    // 询问系统指定文件有没有发生变化,默认每秒询问1000次
    poll: 1000,
  },
};
