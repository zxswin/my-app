## git 的常用操作

- git 常用指令

```ts
/**
 * 1.修改文件名称 git mv a.txt b.txt
 * 2.vim 1.txt 修改文件 i 插入 :wq 保存退出
 * 3.cat 1.txt 查看文件
 *
 * 4.git log 查看提交日志记录
 * -p 显示具体修改了什么内容
 * -1 显示具体的 hash
 * --oneline 显示简短的信息
 * --name-only 查看那行文件变更了
 * --name-status 查看文件的变更情况
 *
 * 5.git commit --amend 修改最近一次的提交信息 可以往这次提交里追加文件
 * 6.git rm --cached 1.txt 把文件从暂存区里面撤销(第一次放入暂存区里)
 * 7.git reset HEAD 1.txt 把文件从暂存区里面撤销(多次放入暂存区里)
 * 8.git checkout -- 1.txt 把工作区的文件恢复到和仓库中的文件一样
 */
```

- 快捷操作之使用别名

```ts
/**
 * git config --global alias.a add
 * 也可找到.gitconfig 文件进行修改
 */
```

- 分支的创建

```ts
/**
 * git branch 查看分支
 * git branch ask 创建分支
 * git checkout ask 切换分支
 * git checkout -b bbs 创建并切换到分支
 */
```

- 分支的合并与删除

```ts
/**
 * 1.先切换到主分支再进行合并(其实就是你想合并到那个分支就切换到那个分支)
 * 2.git merge ask (原理就是把 master 上面的指针指向了 ask 的最后一次提交)
 * 3.git branch -d ask 删除分支
 */
```

- 正确处理冲突

```ts
/**
 * 解决冲突文件然后再提交即可
 */
```

- --merged --no-merged 及强制删除分支

```ts
/**
 * 1.git branch --merged 查看已经合并的分支
 * 2.git branch --no-merged 查看还没有合并的分支
 * 3.git branch -d test 还没有合并的分支是不允许删除的
 * 4.git branch -D test 加上-D 参数则可以强制删除分支
 */
```

- 标准的分支操作工作流

```ts
/**
 * dev 分支 开发分支 可以在这个基础上在拉出其他的开发分支
 * master 分支 稳定分支
 */
```

- stash 临时存储区

```ts
/**
 * 1.当某个分支里的暂存区里面的文件还没有提交到 git 仓库的时候,是不允许切换到其他分支的
 * 2.git stash 可以保存当前分支的存储状态,然后你就可以随意切换到其他的分支了
 * 3.git stash list 可以查看当前的暂存状态
 * 4.git stash apply 恢复暂存区,当你再从其他的分支切换回来的时候
 * 5.git stash drop stash@{0} 删除暂存区
 * 6.git stash pop 恢复并删除暂存区
 * 7.git stash apply stash@{1} 恢复某个暂存区
 */
```

- 使用 git 标签声明项目当前版本

```ts
/**
 * 1.git tag 显示当前标签的列表
 * 2.git tab v1.0 为当前项目打了一个 v1.0 的标签
 * 3.只有稳定功能的代码菜需要打标签
 */
```

- 生成 zip 代码发布压缩包

```ts
/**
 * git archive master --prefix='hdcms/' --forma=zip > hdcms.zip
 */
```

- 使用系统别名定义 git 全局指令

```ts
/**
 * 1.cd 进入系统家目录
 * 2..bash_profile 找到这个文件 没有可以新建一个
 * 3.在文件中写入如下内容即可定义系统别名
 * alias gs="git status"
 */
```

- 合并分支产生的实际问题演示

```ts
/**
 * 1.rm -rf * 删除当前目录下所有文件
 *
 * 2.合并分支的时候如果不是进行快速合并,即 master 分支上有一些 ask 分支上没有的提交点
 * 这个时候就会在 master 上面进行合并(此时提交记录时间线会分叉对提交点进行合并再合回主分支)
 * 此时如果发生冲突需要 master 上面的提交者来维护
 * master 有新增提交点 此时合并分支就会产生新的合并分支
 *
 * 3.可以使用 rebase 来解决 可理解为 replace base
 * 即先把 ask 分支上的提交点存储起来，然后把 ask 的提交点指针指向 master 的当前最新的提交点(此时就不会产生合并分支)
 * 然后再把 ask 的提交内容从新提交到 ask(此时如果产生冲突将由 ask 分支开发者解决)
 */
```

- 使用 rebase 进行合并操作

```ts
/**
 * 1.切换到 ask 分支执行 rebase 命令
 * git rebase master
 * 2.然后在切换回 master 进行合并分支操作
 * git meger ask
 */
```

- 远程仓库

```ts
/**
 * 1.使用 clone 远程仓库
 * 远程仓库代码克隆到当前目录下的 hd 文件夹里面
 * git clone git@github.com:huodunwang/xj.git hd
 *
 * 2.git push 推送到远程
 * 如果重新生成来 key 但是链接不到远程仓库 此时需清空.ssh 目录下的 known_hosts 文件(该文件是用来缓存数据的)
 */
```

- 本地版本库主动使用 remote 与远程仓库进行关联

```ts
/**
 * 1.本地并没有克隆使用下面命令来关联远程仓库
 * git remote add origin git@github.com:houdunwan/xj.git
 * 2.推送到远程服务器的 master 分支
 * git push -u origin master 仅第一次关联需要使用这个命令
 * 3.之后提交可以使用如下命令
 * git push origin master
 */
```

- 本地与远程分支的同步

```ts
/**
 * 1.显示本地分支与远程分支的信息
 * git branch -a
 * 2.创建一个新的分支,并同步到远程仓库
 * 执行 git push 的时候会有相应的报错及提示操作
 * git push --set-upstream origin ask
 */
```

- 检出远程分支

```ts
/**
 * 1.把远程的 ask 分支检出到本地的 ask 分支中
 * git pull origin ask:ask
 * 2.推送代码到远程分支
 * git push --set-upstream origin ask
 * 之后提交就可以直接使用 git push 提交了
 */
```

- 总结

```ts
/**
 * 1.git add -A 提交所有变化
 * 2.git add -u 提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)
 * 3.git add . 提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件
 */
```

- 删除远程分支

```ts
/**
 * 1.删除远程分支
 * git push origin --delete ask
 *
 * 2.删除本地分支
 * git branch -d ask
 */
```

## 自动部署之流程分析与创建 web 站点

## 单词

```pug
destination 目的地
stash 存放 贮藏
archive 档案 存档
prefix 前缀
forma 形状
profile 简介
```
