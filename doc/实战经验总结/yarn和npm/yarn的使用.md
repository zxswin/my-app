## yarn 的使用

## yarn 的基本使用方法

- 安装依赖

```bash
# 初始化一个新项目
yarn init

# 添加依赖包
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]

yarn add package-1@1.2.3
yarn add package-2@^1.0.0
yarn add package-3@beta

# 全局安装依赖包
yarn global add [package]

# 将依赖项添加到不同依赖项类别中
# 分别添加到 devDependencies、peerDependencies 和 optionalDependencies 类别中
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional

# 升级依赖包
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]

# 全局升级依赖包
yarn global upgrade

# 移除依赖包
yarn remove [package]

# 安装项目的全部依赖
yarn 或 yarn install

# 只安装生产版本的依赖
yarn install --production

# 清除yarn缓存
yarn cache clean [package]

```
