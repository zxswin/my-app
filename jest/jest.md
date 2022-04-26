Jest 已经成为了大部分前端项目的标配，每次说到 Jest、Webpack、ESLint 等配置，脑瓜子都嗡嗡的 在诸多配置中，有时一个“铆钉大”的配置，就能让程序或测试的运行效率大幅下降，“万花丛中过”难免有片叶粘身。至于为啥要写这篇文章，就是因为目前所在的项目因一处 Jest 配置的问题，导致60多个 test case 在 --no-cache 条件下要跑足足 790s ☠️

所以就记录分享一下 Jest 的一些常用配置

正题
module.exports = {
  setupFiles: [
    'react-app-polyfill/jsdom',
    '<rootDir>/test/unit/jest.setup.js',
    'core-js',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(css|less)$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules/(?!(antd)/)[/\\\\].+\\.(js|jsx|ts|tsx)$',
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss|less)$': 'identity-obj-proxy',
    '\\.svg$': 'identity-obj-proxy',
    'test/(.*)': '<rootDir>/test/$1',
    '^src/(.*)': '<rootDir>/src/$1',
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  // 其它配置已省略
};
对于 Jest 的配置优化无外乎下面两点：

更少：减少不必要的元素（比如图片、样式等）；
更精确：减少在文件系统中查找匹配的时间；
在看下面如何优化之前，可以先看下这份 Jest 配置，看一下有没有什么可以想到的优化点

setupFiles
古语云：“思则有备，有备无患”，但跑测试时一定要“万事”俱备才行吗？

setupFiles 可谓是 Jest 的“内务府大臣”，位居二品！此大臣就是来准备测试所需要的一些环境或 mock 一些全局状态的，比如 @testing-library/jest-dom 就常在 setupFile 中用到，它允许我们可以在 Jest 中断言一些关于 DOM 的状态。而我们再回头去看上面的配置：

{
  "setupFiles": [
    "react-app-polyfill/jsdom",
    "<rootDir>/test/unit/jest.setup.js",
    "core-js"
  ]
}
react-app-polyfill/jsdom 做了什么：

// 真的，源码只有这三行，原来“内务府”也有“外包项目” 
if (typeof window !== 'undefined') {
  require ('whatwg-fetch');
}
whatwg-fetch 和 core-js 可以简单理解为对当下的一些新标准做 polyfill，但我们有 babel-jest 呀，还要你二者何用？果断“开掉”，节省开支

{
  "setupFiles": ["<rootDir>/test/unit/jest.setup.js"]
}
moduleFileExtensions
moduleFileExtensions 就是 Jest 中各个“国家”（模块）的“通关文牒”，有此文牒方可游历各国。游遍各国也得有个顺序不是，不然会徒增“食宿饮马等费用”，要是搁徐霞客身上，若不是他家业富足，不然大可能会饿死途中 张骞通西域朝廷会有路线规划（默认配置），当然他也能随机应变（自定义配置），默认配置大部分情况下是行得通的，只不过可能要在“路上”多花些时间：

// 默认配置
["js", "jsx", "ts", "tsx", "json", "node"]
moduleFileExtensions 会 从左到右 查找对应的 extension，但如果在 TypeScript + React 项目中可能稍微调整一下会更好：

// 调整后
["ts", "tsx", "js", "jsx", "json", "node"]
这样就能减少些查找 extension 的次数，省点“油钱”。

moduleNameMapper
一般 npm 依赖中的源码分为 esm 和 cjs 模块，当然像 react 之类的是分为 cjs 和 umd。以 antd 为例，其结构如下：

antd
  |- lib/
  |- es/
  |- package.json
其中，在 package.json 中可以制定 esm 和 cjs 打包文件的目录，以 antd 中使用到的 rc-select 组件包为例：

{
  "version": "12.1.5",
  "main": "./lib/index",
  "module": "./es/index"
}
如要使用 cjs 规范的打包文件，工具会查询 main 字段对应文件路径内的入口文件，使用 esm 规范的打包文件，工具则会查询 module 字段对应的入口文件。

但在 rc-util 中，并没有指明 main 及 module 字段，那么其使用方式就像下面这样：

// rc-select/es/utils/legacyUtils.js
import toArray from 'rc-util/es/Children/toArray';
“聊 Jest 呢，叨叨上面这么多干嘛呢？”

因为 Jest 目前支持的是 cjs 规范，项目中又用到了 antd，所以对于其使用的 rc-util 这种依赖，Jest 无法处理，需要手动转换一下，这就需要引入一个 Jest 配置字段 —— moduleNameMapper，关于该配置字段的描述文档如下所述：

A map from regular expressions to module names that allow to stub out resources, like images or styles with a single module.
说白了就是用来 stub 一些资源文件或 module 使用的，可以把匹配到的内容映射为你指定的内容，哪怕是“指鹿为马”也是行得通的！在前端的单元测试中，时常有许多内容是不需要的，比如：静态资源、样式文件等。那么这个时候就可以将这些“鹿”指成“马”了。

我们常把“鹿 ”指为 identity-obj-proxy 这个工具，虽然 identity-obj-proxy 上次发布是5年前了，但确实很好用，并且源码也十分简单（2分钟你看不完源码你顺着信号 来打我）！

module.exports = {
  // ...
  moduleNameMapper: {
    '\\.svg$': 'identity-obj-proxy',
    '\\.css$': 'identity-obj-proxy',
  },
};
对于上面说到的将 antd 的 es 指到 lib 也就很简单了：

module.exports = {
  // ...
  moduleNameMapper: {
    'antd/es/(.*)': 'antd/lib/$1',
  },
};
通过 moduleNameMapper 就可以做到 更少 这个原则，当然下面要介绍的 transformIgnorePatterns 以及其它 ignore 等相关字段也可以让处理的资源或无关的资源更少。

transform
《天龙八部》中，马大元夫人康敏将一招“借刀杀人”发挥地淋漓尽致，而在 Jest 中 transform 也“借他人之手除掉异己”，至于康敏居心何在下回再讲，这次就说 transform 为何要“下此毒手”。所谓“异己”一般是脱离自己控制的资源，上面说到 Jest 支持的是 cjs，但在现在的前端项目中，一般都是使用 import/export 等 esm 规范来模块化开发，所以对于这种资源，我们需“借他之手”处理：

module.exports = {
    // ...
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
但这么看来，transform 也可以将 antd 中的 esm 资源转为 cjs，但既然可以“礼仪教化”，又何必“兵刃相接”呢？

transformIgnorePatterns
通过名字就能看出来，此配置的内容是“康敏”理都不想理的内容，该值默认是 ['node_modules']，也十分好理解。但我们回到文章最初的配置去看看：

module.exports = {
  // ...
  transformIgnorePatterns: [
    '[/\\\\]node_modules/(?!(antd)/)[/\\\\].+\\.(js|jsx|ts|tsx)$',
  ],
};
项目的初衷是使用 transform 去处理引入的 antd 的资源，但这也就导致了在 transform 时去遍历了整个 node_modules 文件系统，node_modules 内容是非常多的，所以在扫描时耗费了大量的时间，测试跑完发现“乔峰找着他爹了”

所以本文最开始所说的“一处配置问题”就是这儿，删掉 transformIgnorePatterns 转而使用 moduleNameMapper 会快很多，不信你试试！

结束