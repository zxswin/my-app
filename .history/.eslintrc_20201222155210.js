module.exports = {
  extends: ['react-app', 'react-app/jest'],
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
    'no-console': 0, //禁止使用console
    'no-eq-null': 0, //禁止对null使用==或!=运算符
  },
};
