## 使用 nvm 切换不同的 node 环境

```js
// 第一步 卸载已经安装的node环境
// node -v 查看当前安装的node版本
// v12.16.3

// mac 系统卸载nodejs
// 官网下载pkg安装包的卸载方案
// 执行卸载指令
// sudo rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*}

// 通过单个指令来删除，清除其他的遗留文件
// sudo rm /usr/local/bin/npm
// sudo rm /usr/local/share/man/man1/node.1
// sudo rm /usr/local/lib/dtrace/node.d
// sudo rm -rf ~/.npm
// sudo rm -rf ~/.node-gyp

// sudo rm /opt/local/bin/node
// sudo rm /opt/local/include/node
// sudo rm -rf /opt/local/lib/node_modules

// sudo rm /usr/local/bin/node
// sudo rm /usr/local/include/node
// sudo rm -rf /usr/local/lib/node_modules
```

## nvm 的下载及安装

```js
// 下载地址
// https://github.com/nvm-sh/nvm

// 手动安装
// clone git
// https://github.com/nvm-sh/nvm.git

// 进入nvm文件夹 并执行
// sh ./install.sh

// 再执行如下命令
// export NVM_DIR="$HOME/.nvm"
// [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
// [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

// 安装成功查看nvm版本
// nvm --version
```

## nvm 的使用

```js
// 安装node前配置一下镜像地址
// node_mirror: https://npm.taobao.org/mirrors/node/
// npm_mirror: https://npm.taobao.org/mirrors/npm/

// 安装最新稳定版 node
// nvm install stable
// nvm install 12.16.3
// nvm install 14.17.0

// 使用nvm ls 或者 nvm list可以查看安装的不同node版本，*指向的就是当前版本
// 切换node版本
// nvm use 14.17.0可以切换node版本
```

## 资源

```js
// node 官网
// https://nodejs.org/en/
```
