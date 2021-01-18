## （mac）node 升级或版本切换方法

```bash
1.首先安装n模块：
sudo npm install -g n

2.升级node.js到最新稳定版
sudo n stable

3.升级到最新版
sudo n latest

4.安装其他版本
sudo n v10.15.1

5.切换使用版本
sudo n
然后可以切换到想要使用的版本

6.删除指定版本
sudo n rm 7.10.0

7.用指定的版本执行脚本
n use 7.10.0 some.js
```
