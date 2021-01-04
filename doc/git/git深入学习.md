# git 深入学习

## github 的使用

- 新建项目(先新建了远程仓库)

```bash
# 进入github官网 并登陆进入个人主页 进入Repositories(个人代码仓库)
# 选择New选择进入新建项目向导页面
# 输入项目名称 输入项目描述 选择Public 可勾选选项创建README.md文件
# 点击 Create repository 进行创建

# 初始化项目操作
# 1.克隆项目到本地
# 2.使用git协议 使用ssh 配置好口令后每次推送都无需在输入(推荐)
git clone git@github.com:zxswin/test.git
# 使用https协议 速度慢且每次提交都需要输入口令(不推荐)
git clone https://github.com/zxswin/test.git

# 3.修改后提交代码
git add . 从暂存区提交所有文件的修改到工作区
git commit -m '修改描述'
git push -u origin master 把本地库的所有内容推送到远程库上
# 4.下次提交的时候不用加-u参数
# -第一次推送要加上-u参数 把本地master分支内容推送到远程的master分支
# -关联本地和远程分支 以后推送和拉取就可以简化命令
git push origin master

```

- 新建项目(先新建了本地仓库)

```bash
# 本地新建项目目录执行git init 初始化项目
# 新建README.md文件 并提交修改
git add . 提交所有改动的文件
git commit -m '修改描述'
# 在github上新建远程仓库
# 关联本地仓库和远程仓库
git remote add origin git@github.com:zxswin/test888.git
# 把本地库的所有内容推送到远程库上
git push -u origin master
# 下次提交的时候不用加-u参数
# -第一次推送要加上-u参数 把本地master分支内容推送到远程的master分支
# -关联本地和远程分支 以后推送和拉取就可以简化命令
git push origin master
```

- 删除项目

```bash
# 进入github官网并登陆 https://github.com
# 找到你要删除的项目
# 进入项目后找到Settings选项并点击进入
# 进入Settings页面后拉到最后选择Delete this repository
# 在弹出的页面中填入项目名称
# 输入密码 删除成功
```

## TortoiesGit 的安装及配置使用

```bash
# TortoiesGit下载地址 下载安装程序及语言包
https://download.tortoisegit.org/tgit/
# 因为TortoiseGit 只是一个程序壳,必须依赖一个 Git Core,所以安装前请确定已完成git安装和配置
# TortoiesGit最好默认安装在C盘，要不然会报莫名错误(右键的时候)
# 配置TortoiseGit
1.在空白处点击鼠标右键, 选择 --> TortoiseGit --> Settings
2.点击 “编辑全局 .git/config(O)”按钮,会使用记事本打开全局配置文件
[user]
	name = github账号
	email = 联系邮箱
	signingkey = github账号密码
# 秘钥配置
1.开始-->TortoiseGit-->PuTTYgen，进入PuTTY Key Generator
2.点击Generate,生成公钥和私钥
3.先点击Save private key把私有的密钥存起来，记住存储的位
4.把生成出来的public Key复制粘贴到Gitlab上面，配置SSH key

# 使用TortoiseGit进行和远端输出项目时，Pageant必须启动且添加了对应的私钥。否则会报错
开始-->TortoiseGit-->Pageant 添加私钥

```

## git 的使用

### 创建本地和远程分支

```bash
# 创建并切换到dev分支
git checkout -b dev
# 推送本地分支到远程(远程仓库会自动创建分支)
git push origin dev
# 删除分支删除分支
git branch -d test
git branch -D test (强制删除分支 创建的分支不合并的情况)

# 同步远程本地已经删除的分支(先删除了本地分支)
git branch -a 可以查看本地分支和远程分支情况
# 删除远程分支
git push origin --delete dev
git push origin -d dev (简写方式)

# 同步远程已经删除的分支但是本地还有(仅同步remote中的，本地需要自行删除)
git fetch --prune

# 本地同步远程分支(远程有分支而本地没有)
git pull 拉去远程最新版本信息
git branch -a 可以查看本地分支和远程分支情况
git checkout -b dev 新建本地分支后可以正常修改和提交

# 合并分支
# 合并分支并不会把分支删除
git merge test
git add .
git commit -m '修改内容描述'
git push origin master 推送到远程仓库

# 查看合并分支图
git log --graph --pretty=oneline --abbrev-commit

# 分支合并加上--on-ff参数使用普通模式合并,合并后的历史有分支,能看出曾经做过的合并
# --no-ff指的是强行关闭fast-forward方式。
# fast-forward方式就是当条件允许的时候，git直接把HEAD指针指向合并分支的头，完成合并。属于“快进方式”
# --no-ff：不使用fast-forward方式合并，保留分支的commit历史
# --squash：使用squash方式合并，把多次分支commit历史压缩为一次
git merge --no-ff -m "merge with no-ff" dev 合并分支并填写信息
```

- 检出远程分支

```ts
/**
 * 1.把远程的 ask 分支检出到本地的 ask 分支中
 * git pull origin ask:ask
 * 或根据远程分支创建本地分支
 * git checkout -b dev origin/dev
 * 2.推送代码到远程分支
 * git push --set-upstream origin ask
 * 之后提交就可以直接使用 git push 提交了
 */
```

## git pull 和 git fetch 的区别

- 效果相同的时候 git pull 更加便捷
- git fetch 更加安全

```bash
# 在本地新建一个temp分支，并将远程origin仓库的master分支代码下载到本地temp分支
git fetch origin master:tmp
# 来比较本地代码与刚刚从远程下载下来的代码的区别
git diff tmp
# 合并temp分支到本地的master分支
git merge tmp
# 如果不想保留temp分支 可以用这步删除
git branch -d temp
```

- 原理分析

```bash
# pull
相当于是从远程获取最新版本并merge到本地
git pull origin master
# fetch
相当于是从远程获取最新到本地，不会自动merge
git fetch orgin master //将远程仓库的master分支下载到本地当前branch中
git log -p master  ..origin/master //比较本地的master分支和origin/master分支的差别
git merge origin/master //进行合并
# 在实际使用中，git fetch更安全一些
.git文件下面
refs文件中heads文件夹保存了当前分支的版本信息
refs文件中的remotes保存了关联的远程仓库版本信息
pull 会把最新版本同步到remotes中并合并heads中的版本信息
fetch 只同步remotes中的版本信息
# FETCH_HEAD
FETCH_HEAD： 是一个版本链接，记录在本地的一个文件中，指向着目前已经从远程仓库取下来的分支的末端版本。
# commit-id
commit-id：在每次本地工作完成后，都会做一个git commit 操作来保存当前工作到本地的repo，
此时会产生一个commit-id，这是一个能唯一标识一个版本的序列号。
在使用git push后，这个序列号还会同步到远程仓库。
```

## tag 标签的使用

```bash
# 创建标签
git tag v1.0  当前版本打上标签
# 创建指定版本的标签
git log --pretty=oneline --abbrev-commit 查看提交日志
git tag v0.9 3e8e0c49393b014cb0225e5a4ef5f6f0a10bbad9 在对应的commit id上打上标签

# 查看标签信息
git tag 查看所有标签
git show v0.9 查看标签信息
git ls-remote --tags origin 查看远程所有标签
# 删除标签
git tag -d v0.1
# 推送标签到远程
git push origin v1.0
# 一次性推送全部未推送的远程标签
git push origin --tags
# 删除远程标签
git tag -d v0.9  //先删除本地
git push origin :refs/tags/v0.9  //再删除远程

# 检出分支
git checkout -b [branchname] [tagname] 在特定的标签上创建一个新分支：
git checkout -b version2 v0.9

```

## git rebase(变基)

```bash
# 查看提交历史
git log --graph --pretty=oneline --abbrev-commit

# 如果使用 git pull 在解决冲突的情况下 时间线会分叉
本地开发的时间线 和远程开发的时间线的提交节点分叉了
前先将修改提交的暂存区 执行 git pull 进行合并(此时产生冲突)
本地解决冲突然后提交(时间线出现了分叉) 合并为一个新的提交

# 如果使用 git rebase 在解决冲突的情况下 时间线是直线不会分叉

# git rebase origin 命令
分支里的每个提交(commit)取消掉，并且把它们临时 保存为补丁(patch)(这些补丁放到".git/rebase"目录中)
然后把"mywork"分支更新 为最新的"origin"分支，最后把保存的这些补丁应用到"mywork"分支上

# git pull --rebase 详解
把你的本地当前分支里的每个提交(commit)取消掉
把它们临时 保存为补丁(patch)(这些补丁放到".git/rebase"目录中)
然后把本地当前分支更新 为最新的"origin"分支
最后把保存的这些补丁应用到本地当前分支上

# git rebase --continue
git会继续应用(apply)余下的补丁。

#  git rebase --abort
--abort参数来终止rebase的行动，并且"mywork" 分支会回到rebase开始前的状态

# rebase 普通操作
本地修改后 git add .
git commit - m '提交修改'
git pull 拉去远程代码
解决冲突
git add .
git rebase 变基
解决冲突
git rebase --continue 继续
git push origin master 提交到远程

# rebase 最佳实践(rebase 可以代替merge)
git pull --rebase
git add . 如果产生冲突 解决冲突并添加
git rebase --continue 继续应用(apply)余下的补丁。
git rebase --abort(需要的时候可以终止rebase运行)
git push origin master 提交到远程

# rebase 在分支合并中的运用(dev 合并 master)
git pull origin master --rebase 先拉取远程的
git add .
git rebase --continue
git pull origin dev --rebase 再拉去分支
git add .
git rebase --continue
git push origin dev


```

## git reset 回退到指定版本

```bash
reset是指将HEAD指针指到指定提交，历史记录中不会出现放弃的提交记录
$ git reset --hard HEAD^ //上一个版本就是HEAD^，上上一个版本就是HEAD^^，上100个版本写成HEAD~100。
$ git reset --hard 3628164 //commit id commit id 是 3628164 无需写全
$ git reflog //记录你每一次的命令

# -f 参数是强制提交，因为reset之后本地库落后于远程库一个版本，因此需要强制提交。
git push origin master -f
```

- revert 回滚远程仓库(新建一个版本和指定版本一样)

```bash
revert是放弃指定提交的修改，但是会生成一次新的提交，需要填写提交注释，以前的历史记录都在
# 回滚最后一次提交
git revert HEAD
git push origin master

# revert 回滚到指定版本
git revert -n 549cebf1c1dfb793ff673d006f184b56252d6219
有冲突就解决冲突
git commit -m 'reveret to aaa'
git push origin master

```

## 分支管理

- Git 之 hotfix 热修复分支(就是拉一个分支然后修复 bug 再合并回去)

## git 补丁

- 运用场景：需要同步两个 git 版本库的代码的时候运用
  一个 git 版本库生成补丁文件 , 另一版本库将补丁打入

###方案一： git format-patch 生成的 Git 专用.patch 文件。

- 生成 patch
  .patch 文件带有记录文件改变的内容，也带有 commit 记录信息,每个 commit 对应一个 patch 文件。

```bash
# git format-patch 【commit sha1 id】-n
# n指从sha1 id对应的commit开始算起n个提交。
git format-patch   0ea77b9e060c877b66c13f3571381ca11e8bd385 -2
# 生成指定某次提交的补丁文件
git format-patch   0ea77b9e060c877b66c13f3571381ca11e8bd385 -1
# 某两次提交之间的所有patch:
# git format-patch 【commit sha1 id】..【commit sha1 id】
git format-patch  2a2fb4539925bfa4a141fe492d9828d030f7c8a8..89aebfcc73bdac8054be1a242598610d8ed5f3c8
# 生成的补丁文件存放在工作区中

```

- 运用 patch

```bash
# 检查patch是否能正常打入:
# git apply --check 【path/to/xxx.patch】
git apply --check patch/0001-2.patch

# 打入patch
# git apply 【path/to/xxx.patch】
git apply patch/0001-2.patch

# 或者 git  am 【path/to/xxx.patch】
git  am patch/0001-2.patch

# 解决冲突
# 自动合入 patch 中不冲突的代码改动，同时保留冲突的部分：
# 生成后缀为 .rej 的文件，保存没有合并进去的部分的内容，可以参考这个进行冲突解决。
git  apply --reject  patch/0001-2.patch
# 解决完冲突后删除后缀为 .rej 的文件，并执行git add.添加改动到暂存区.
# 接着执行git am --resolved或者git am --continue
# 执行git am --skip跳过此次冲突，
# 也可以执行git am --abort回退打入patch的动作，还原到操作前的状态。

# 添加修改内容
git add .
# 推送到远程仓库
git push origin master

```

### 方案二 ： git diff 生成的 UNIX 标准补丁.diff 文件

- .diff 文件只是记录文件改变的内容，不带有 commit 记录信息,多个 commit 可以合并成一个 diff 文件。

```bash
# 创建diff文件的常用方法
# git diff  【commit sha1 id】 【commit sha1 id】 >  【diff文件名】
git diff  2a2fb4539925bfa4a141fe492d9828d030f7c8a8  89aebfcc73bdac8054be1a242598610d8ed5f3c8 > patch.diff


# 应用打入diff补丁
# 检查diff是否能正常打入:
git apply --check 【path/to/xxx.diff】

# 打入补丁
git apply 【path/to/xxx.diff】

# 解决冲突
# 自动合入 diff 中不冲突的代码改动，同时保留冲突的部分：
# 生成后缀为 .rej 的文件，保存没有合并进去的部分的内容，可以参考这个进行冲突解决。
git  apply --reject  【path/to/xxx.diff】

# 解决完冲突后删除后缀为 .rej 的文件，并执行git add.添加改动到暂存区.
# 接着执行git am --resolved或者git am --continue
# 执行git am --skip跳过此次冲突，
# 也可以执行git am --abort回退打入patch的动作，还原到操作前的状态。

# 添加修改内容
git add .
# 推送到远程仓库
git push origin master

```

## git 钩子

- Git 钩子是指在特定的 Git 动作（如：git commit、 git push ）下被触发的脚本。而钩子主要被分为两种：
  客户端钩子
  服务端钩子

- Git 的钩子不管客户端钩子还是服务端钩子，都是放在当前项目的 .git/hooks 目录下。
  .git 目录是不会被提交到服务器上的，所以放置在 .git/hooks 目录中的客户端脚本也不会被提交。
  如果想让别人也使用你的钩子需要一种策略来偷偷的安装这个钩子或者在服务端放置实现这个钩子的功能

### 本地钩子

```bash
# pre-commit 脚本在每次你运行 git commit 命令时
pre-commit
# prepare-commit-msg 钩子在 pre-commit 钩子在文本编辑器中生成提交信息之后被调用
prepare-commit-msg
# commit-msg 钩子和 prepare-commit-msg 钩子很像，但它会在用户输入提交信息之后被调用。
commit-msg
# post-commit 钩子在 commit-msg 钩子之后立即被运行 。
post-commit
# post-checkout 钩子和 post-commit 钩子很像，但它在你用 git checkout 查看引用的时候被调用。
post-checkout
# pre-rebase 钩子在 git rebase 发生更改之前运行，确保不会有什么糟糕的事情发生。
pre-rebase
```

### 使用 node 写一个拒绝提交没有被解决的冲突的文件

```js
// .git/hooks/pre-commit
#!/usr/bin/env node
// 在 commit 之前检查是否有冲突，如果有冲突就 process.exit(1)

const execSync = require('child_process').execSync

// git 对所有冲突的地方都会生成下面这种格式的信息，所以写个检测冲突文件的正则
const isConflictRegular = '^<<<<<<<\\s|^=======$|^>>>>>>>\\s'

let results

try {
  // git grep 命令会执行 perl 的正则匹配所有满足冲突条件的文件
  results = execSync(`git grep -n -P "${isConflictRegular}"`, {
    encoding: 'utf-8'
  })
} catch (e) {
  console.log('没有发现冲突，等待 commit')
  process.exit(0)
}

if (results) {
  console.error('发现冲突，请解决后再提交，冲突文件：')
  console.error(results.trim())
  process.exit(1)
}

process.exit(0)
```

### 每个成员都通过 npm start 命令开启服务的时候安装钩子

```js
const fs = require('fs');

// 判断是否已经存在 pre-commit，不存在就读取 pre-commit.sh 并写入
if (!fs.existsSync('.git/hooks/pre-commit')) {
  if (!fs.existsSync('.git/hooks/')) {
    fs.mkdirSync('.git/hooks/');
  }

  let preCommitFile = fs.readFileSync('./pre-commit.sh');

  fs.writeFileSync('.git/hooks/pre-commit', preCommitFile, {
    encoding: 'utf8',
    mode: 0o777,
  });
}
```

## Git 提交引用和引用日志

- 引用以一段普通的文本存在于 .git/refs 目录中，
- 特殊的引用

```bash
HEAD – 当前所在的提交或分支。
FETCH_HEAD – 远程仓库中 fetch 到的最新一次提交。
ORIG_HEAD – HEAD 的备份引用，避免损坏。
MERGE_HEAD – 你通过 git merge 并入当前分支的引用（们）。
CHERRY_PICK_HEAD – 你 cherry pick 使用的引用。
```

## gitignore 不起作用的解决办法

```ts
/**
 * 清理一些缓存即可
 * git rm -r --cached .
 */
```

## 单词

```pug
repository 仓库 贮藏室
discover  发现
remote 遥远的 远程的
fatal 致命
reuse 重新使用
delta 三角州 变量增量
receive 收到
enumerate 枚举
regedit 打开注册表
tortoise 乌龟
pageant 盛会
graph 图表
checkout 结账 校验
recently 最近的
perform 执行
prune 修剪
fetch 取到
pull 拉
revert 恢复
abort 终止
apply 运用 申请
patch 补丁
husky 哈士奇
```
