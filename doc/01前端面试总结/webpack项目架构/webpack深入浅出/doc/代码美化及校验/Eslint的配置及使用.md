## 在 VScode 中使用 Eslint

- 安装插件

```bash
# 需要先安装ESlint的vscode插件

# 在本地项目中安装相关插件
npm i -D eslint eslint-loader eslint-plugin-import babel-eslint eslint-plugin-flowtype

# 可选安装其他开源配置例如airbnb
npm i -D eslint-config-airbnb-base

# vscode settings.json添加如下配置
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}

# 在项目根目录下新建.eslintrc.js配置文件
module.exports = {
  // extends: ['prettier'], // 这一行需废弃 会导致下方的自定义规则不起作用
  parser: 'babel-eslint', // 关键一行 转换为ES6可识别的代码
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'no-console': 2, //禁止使用console
    'no-eq-null': 2, //禁止对null使用==或!=运算符
  },
};

```

- 配置项说明

```bash
# 一般配置规则
·off 或 0：表示不验证规则。
warn 或 1：表示验证规则，当不满足时，给警告。
error或 2 ：表示验证规则，不满足时报错。

# 推荐配置
module.exports = {
  // 启用默认配置
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    // 注释要含有空格
    'spaced-comment': 1,
    // 要求使用 === 和 !==
    eqeqeq: 2,
    // 禁用 alert、confirm 和 prompt
    'no-alert': 2,
    // 禁止出现空函数
    'no-empty-function': 2,
    // 要求或禁止 var 声明中的初始化
    'init-declarations': 1,
    // 禁止在变量定义之前使用它们
    'no-use-before-define': 2,
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef': 2,
    // 使用let和const代替var
    'no-var': 2,
  },
};

```

- 忽略指定文件夹

```bash
# 在项目根目录下新建.eslintignore文件
/dist
/node_modules
```

- 使用 ESLint 检查 Typescript 的代码

```bash
# 安装相关依赖
npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

# settings.json文件中配置
"eslint.validate": [
  "javascript",
  "typescript",
]

# 在eslintrc.js文件中配置
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    // 注释要含有空格
    'spaced-comment': 1,
    // 要求使用 === 和 !==
    eqeqeq: 2,
    // 禁用 alert、confirm 和 prompt
    'no-alert': 2,
    // 禁止出现空函数
    'no-empty-function': 2,
    // 要求或禁止 var 声明中的初始化
    'init-declarations': 1,
    // 禁止在变量定义之前使用它们
    'no-use-before-define': 2,
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef': 2,
    // 使用let和const代替var
    'no-var': 2,
    // 关闭any类型时的警告
    '@typescript-eslint/no-explicit-any': ['off'],
    // 只要求自定义的方法设置返回类型
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
      },
    ],
  },
};
```

- 运行脚步批量修复代码

```bash
# 在package.json文件中配置脚本
"lintjs-fix": "eslint --fix --ext .js --ext .jsx src/",
"lintts-fix": "eslint --fix --ext .ts src/",
```

## 结论

```bash
# jslint的配置和tsconfig已经可以检查typescript代码，这样可以同时兼容js和ts代码的检查
# 如果使用@typescript-eslint则只适合检查ts代码，js代码会报错
# 建议使用jslint配置结合tsconfig就可以实现ts代码的检查
```

[eslint 中文文档地址](http://eslint.cn/docs/rules/)
