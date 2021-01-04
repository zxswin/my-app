## git 基础

- 安装(测试)

```ts
/**
 * 1.在Windows上安装Git
 * “Git”->“Git Bash”，命令行窗口的东西，就说明Git安装成功！
 */
```

- 输入用户名和邮箱

```ts
/**
  * 1.每台机器都必须自报家门
  * $ git config --global user.name "Your Name"
  * $ git config --global user.email "email@example.com"

  * 2.注意git config命令的--global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置
  */
```

- git bash 下操作文件及文件夹命令

```ts
/**
 * 1.切换目录：cd e:\fff
 * 2.cd .. 回退到上一个目录
 */
```

- 创建和使用 git 仓库

```ts
/**
 * 1.创建
 * $ git init
 * Initialized empty Git repository in /Users/michael/learngit/.git/
 *
 * 2.把文件放入git仓库
 * 告诉 git 把文件添加进仓库,没有消息就是最好的消息,可反复多次使用，添加多个文件
 * $ git add readme.txt
 *
 * git commit 告诉 Git，把文件提交到仓库
 * $ git commit -m "wrote a readme file"
 */
```

- git log 查看历史修改记录

```ts
/**
 * git log 命令显示从最近到最远的提交日志
 * $ git log --pretty=oneline 日志在一行显示
 */
```

- 回退到指定版本

```ts
/**
 * 上一个版本就是HEAD^，上上一个版本就是HEAD^^，上100个版本写成HEAD~100
 * $ git reset --hard HEAD^
 *
 * commit id commit id 是 3628164 无需写全
 * $ git reset --hard 3628164
 *
 * $ git reflog //记录你每一次的命令
 */
```

- 工作区和暂存区

```ts
/**
 * 1.工作区：你电脑里能看到的目录
 * 2.版本库：.git 文件夹就是 Git 的版本库,包含 stage(暂存区),自动创建的第一个分支 master,指向 master 的一个指针 HEAD
 * 3.缓冲区：stage
 * 4.把文件往 git 版本库里添加,可分为两步
 * git add 把文件修改添加到暂存区
 * git commit 提交更改,把暂存区的所有内容提交到当前分支
 * git add 命令把要提交的修改放在暂存区(Stage),git commit 可以把一次性暂存区的所有修改提交到分支
 * 5.git status 查看文件状态
 */
```

- 管理修改

```ts
/**
 * 1.Git 跟踪并管理的是修改,而并非文件,创建一个新的文件也算是修改
 * 2.如果不 add 到暂存区,那么就不会加入到 commit
 * 3.第一次修改->git add ->第二次修改 ->git add ->git commit
 */
```

- 撤销修改

```ts
/**
 * git checkout -- file 直接丢弃工作区的修改,原理是用版本库里的版本替换工作区的版本,可以一键还原,无论是修改还是删除
 * 注意 -- 后面是有空格的
 * git checkout -- <file>指令先从缓存区中拉取版本还原，如果没有再到版本库中拉取还原
 * 可以还原文件夹或某个文件
 * git reset HEAD file 丢弃暂存区里的内容
 */
```

- 删除文件

```ts
/**
 * 1.删除文件,可直接删除 或 rm test.txt
 * 2.git rm 从版本库中删除文件
 * 3.git commit -m 'remove test.txt' 提交到版本库
 * 4.删错的情况可以使用 git checkout -- test.txt 恢复
 */
```

- 远程仓库

```ts
/**
 * 1.本地 Git 仓库和 GitHub 仓库之间传输是通过 SSH 加密的
 * 2.本地创建 SSH Key
 * cd ~/.ssh 用于查看电脑里有没有 SSH Key
 * $ ssh-keygen -t rsa -C "youremail@example.com" 创建 SSH Key 一路回车无需设置密码 在用户主目录下生成 包含
 * id_rsa 是私钥
 * id_rsa.pub 是公钥 可以放心告诉任何人
 * 3.登录 GitHub 添加 Add SSH Key 在 key 文本框中粘贴 id_ras.pub 公钥 title 可以任意填写
 * 4.可以添加不同电脑的 Key 到 Github
 */
```

- 添加到远程库

```ts
/**
 * 1.登录 Github 创建一个新的仓库 Create a new repo
 * 2.运行：$ git remote add origin git@github.com:zxswin/learngit.git
 * 3.$ git push -u origin master 把本地库的所有内容推送到远程库上
 *
 * 第一次推送要加上-u 参数 把本地 master 分支内容推送到远程的 master 分支 关联本地和远程分支 以后推送和拉取就可以简化命令
 * 4.本地提交试用命令 $ git push origin master
 * 5.第一次试用 Git 或 push 命令连接 GitHub 的时候会得到一个警告,需要你确认 GitHub 的 key 指纹信息 输入 yes 即可
 */
```

- 从远程库克隆

```ts
/**
 * 1.$ git clone git@github.com:michaelliao/gitskills.git
 * 要克隆一个仓库，首先必须知道仓库的地址，然后使用 git clone 命令克隆。
 * 2.Git 支持多种协议，包括 https，但通过 ssh 支持的原生 git 协议速度最快。
 */
```

- 创建与合并分支

```ts
/**
 * 1.git 用 master 指向最新的提交,再用 HEAD 指向 master 确定当前分支和当前分支的提交点
 * 2.每次提交 master 分支都会向前移动一步
 * 3.创建新分支 dev 时候,Git 创建 dev 指针,指向 master 相同提交,再把 HEAD 指向 dev,就表示当前分支在 dev 上
 * 4.git 创建分支很快,增加 dev 指针,修改 HEAD 指向,工作区的文件没有任何变化
 * 5.新提交一次后,dev 指针往前移动一步,而 master 指针不变
 * 6.合并分支：直接把 master 指向 dev 的当前提交就完成了合并
 * 7.删除分支就是把 dev 指针给删掉
 *
 * 8.git checkout -b dev 创建并切换到 dev 分支
 * 相当于执行下面两条命令
 * $ git branch dev
 * $ git checkout dev
 * 9.$ git branch 查看当前分支,当前分支前面会标一个*号
 * 10.$ git checkout master 切换回 master 分支
 * 11.$ git merge dev 合并分支
 * 12.Fast-forward 快速合并 直接把master指向dev的当前提交
 * 13.$ git branch -d dev 删除分支
 */
```

- 解决冲突

```ts
/**
 * 1.Git 无法自动合并分支时,先解决冲突后提交,合并成功
 * 2.git log --graph 查看分支合并图
 * 3.$ git log --graph --pretty=oneline --abbrev-commit
 */
```

- 分支管理策略

```ts
/**
 * 1.分支合并加上--on-ff 参数使用普通模式合并,合并后的历史有分支,能看出曾经做过的合并
 * 2.fast forward 合并就看不出曾经做过的合并
 * 3.$ git merge --no-ff -m "merge with no-ff" dev 合并分支并填写信息
 */
```

十四.Bug 分支

```ts
/**
 * 1.修复 bug 时，我们会通过创建新的 bug 分支进行修复，然后合并，最后删除；
 * 2.当手头工作没有完成时，先把工作现场 git stash 一下，然后去修复 bug，修复后，再 git stash pop，回到工作现场。
 * 3.$ git stash 把当前工作现场储存起来
 * 4.$ git stash list 查看工作现场存在哪里
 * 5.git stash apply 恢复，但是恢复后，stash 内容并不删除
 * 6.git stash drop 来删除
 * 7.git stash pop，恢复的同时把 stash 内容也删了
 */
```

- Feature 分支

```ts
/**
 * 1.开发一个新的功能,最好新建一个分支
 * 2.若要丢弃一个没有合并过的分支,可以通过 git branch -D <name> 强行删除
 */
```

- 多人协作

```ts
/**
 * 1.git remote：查看远程库的信息
 * 2.查看远程库信息，使用 git remote -v；如果没有推送权限就看不到 push 地址
 * 3.本地新建的分支如果不推送到远程，对其他人就是不可见的；
 * 4.从本地推送分支，使用 git push origin branch-name，如果推送失败，先用 git pull 抓取远程的新提交；
 * 5.在本地创建和远程分支对应的分支，使用 git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；
 * 6.建立本地分支和远程分支的关联，使用 git branch --set-upstream branch-name origin/branch-name；
 * 7.从远程抓取分支，使用 git pull，如果有冲突，要先处理冲突。
 * 8.git push origin master 推送到 master 分支
 * 9.git push origin dev 推送红到 dev 分支
 * 10.当第一次 clone 远程库的时候 默认情况下只能看到 master 分支
 *
 * 同步别人新增到远程的分支
 * git pull
 * git checkout -b dev
 * git pull origin dev
 */
```

- 创建标签

```ts
/**
 * 1.标签管理用于标记版本,tag 是一个让人容易记住的有意义的名字,它和某个 commit 绑定在一起
 * 2.命令 git tag <name>用于新建一个标签，默认为 HEAD，也可以指定一个 commit id；
 * 3.git tag -a <tagname> -m "blablabla..."可以指定标签信息；
 * 4.git tag -s <tagname> -m "blablabla..."可以用 PGP 签名标签（前提是先安装 gpg GnuPG）
 * 5.命令 git tag 可以查看所有标签。
 * 6.$ git tag v1.0  //打上标签
 * 7.$ git tag 查看所有标签
 * 8.$ git tag v0.9 6224937 在对应的commit id上打上标签
 * 9.$ git show v0.9 查看标签信息
 * 10.$ git tag -a v0.1 -m "version 0.1 released" 3628164 创建带有说明的标签
 * 11.$ git tag -s v0.2 -m "signed version 0.2 released" fec145a 创建私钥签名标签,必须先安装 gpg(GnuPG)
 */
```

- 操作标签

```ts
/**
 * 1.命令 git push origin <tagname>可以推送一个本地标签；
 * 2.命令 git push origin --tags 可以推送全部未推送过的本地标签；
 * 3.命令 git tag -d <tagname>可以删除一个本地标签；
 * 4.命令 git push origin :refs/tags/<tagname>可以删除一个远程标签。
 * 5.$ git tag -d v0.1 删除标签
 * 6.$ git push origin v1.0 推送标签到远程
 * 7.$ git push origin --tags 一次性推送全部未推送的远程标签
 * 8.删除远程标签
 * $ git tag -d v0.9 //先删除本地
 * $ git push origin :refs/tags/v0.9 //再删除远程
 */
```

- 使用 GitHub

```ts
/**
 * 1.在 GitHub 上，可以任意 Fork 开源仓库；
 * 2.自己拥有 Fork 后的仓库的读写权限；
 * 3.可以推送 pull request 给官方仓库来贡献代码
 *
 * 点“Fork”就在自己的账号下克隆了一个 bootstrap 仓库，然后，从自己的账号下 clone：
 * git clone git@github.com:michaelliao/bootstrap.git
 * 如果你想修复 bootstrap 的一个 bug，或者新增一个功能，立刻就可以开始干活，干完后，往自己的仓库推送。
 * 推送一个 pull request 给官方看官方是否接受
 */
```

- 使用码云

```ts
/**
 * 码云地址：https://gitee.com/
 * 国内的 Git 托管服务
 * 码云的免费版本也提供私有库功能，只是有 5 人的成员上限。
 * 1.git remote add origin git@gitee.com:liaoxuefeng/learngit.git 关联远程库(远程库名字不能重复)
 * 2.git remote rm origin 删除 Git 远程库
 * 3.git remote add origin git@gitee.com:liaoxuefeng/learngit.git 再度关联远程库
 * git push github master //推送到 github 仓库
 * git push gitee master //推送到 gitee 仓库
 */
```

- 自定义 Git

```ts
/**
 * 1.$ git config --global color.ui true  设置命令结果提示标记颜色 更加醒目
 * 2.在Git工作区的目录下创建.gitignore文件,把要忽略的文件名填进去,Git会自动忽略这些文件
 * 3.$ git add -f App.class // 强行添加文件到 Git
 * 4.$ git check-ignore -v App.class  //检测.gitignore到底哪个规则写错了
 * 5.$ git config --global alias.st status //配置别名 alias
 * 6.每个仓库的 Git 配置文件都放在.git/config 文件中 可以删除别名
 * 7.Git 配置文件放在用户主目录下的一个隐藏文件.gitconfig 中 可以直接修改
 * --global 参数是全局参数，也就是这些命令在这台电脑的所有 Git 仓库下都有用。
 * $ git config --global alias.co checkout
 * $ git config --global alias.ci commit
 * $ git config --global alias.br branch
 * $ git config --global alias.unstage 'reset HEAD'
 * $ git config --global alias.last 'log -1' //显示最后一次提交
 *
 * 查看提交日志
 * git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
 */
```

- 搭建 Git 服务器

```ts
/**
 * 注意: 1.试用 window 新建的 txt 文件提交到远程会有乱码现象
 */
```

- 单词

```pug
repository 仓库
pretty 漂亮的 聪明的
hard 硬的
stage 阶段 舞台
tracked 跟踪
remote 远程的
graph 图表
conflict 冲突
stash 藏匿
upstream 上游
```

- 资源

```bash
# 网站：
# git 好的学习网站：
# https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
# git 国内镜像下载：
# https://pan.baidu.com/s/1kU5OCOB#list/path=%2Fpub&parentPath=%2F
# git 的各种配置文件：
# https://github.com/github/gitignore

# git 官网
# https://git-scm.com/
# 百度网盘资源下载
# https://pan.baidu.com/s/1kU5OCOB#list/path=%2Fpub
```
