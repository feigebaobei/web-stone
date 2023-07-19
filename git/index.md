# git

## overview

> 版本管理工具

### feature

- 支持管理分支
- 多人协作
- 本地、远程共同储存
- 记录每次文件的改动。(**git 跟踪并管理的是文本文件的改动修改**)

## 基本概念

commitID 全球版本号 git 库的版本号是通过 sha-1 算法得到一个 40 位的哈希值。这个哈希值全球惟一，基本只要前 6 位就可以唯一标识。  
工作区就是`.git`文件夹在的文件夹  
版本库: `.git`就是版本库  
只是一个简单的数据库，包含所有用来维护与管理项目的修订版本和历史信息。  
Git 的版本库里存了很多东西，其中最重要的就是称为 stage（或者叫 index）的暂存区。在我们第一次创建仓库时会自动创建一个分支`master`。有一个`HEAR`指针指向`master`  
从修改文件到提交文件需要做

1. 把修改过的文件添加到舞台。（添加到舞台后再修改文件还需要添加到舞台）
2. 把舞台上的文件移出舞台（在把文件添加到舞台后，提交前。有可能会用到。）
3. 把舞台内的文件提交。

## install

### linux

```shell
sudo apt-get-install git
```

### mac os

- 一是安装 homebrew，然后通过 homebrew 安装 Git，具体方法请参考 homebrew 的文档：http://brew.sh/。
- 第二种方法更简单，也是推荐的方法，就是直接从 AppStore 安装 Xcode，Xcode 集成了 Git，不过默认没有安装，你需要运行 Xcode，选择菜单“Xcode”->“Preferences”，在弹出窗口中找到“Downloads”，选择“Command Line Tools”，点“Install”就可以完成安装了。

### windows

在 Git 官网直接下载安装程序

```shell
	$ git config --global user.name "Your Name"
	$ git config --global user.email "email@example.com"

	$ git config --local user.name "Your Name"
	$ git config --local user.email "email@example.com"
```

因为 Git 是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和 Email 地址。你也许会担心，如果有人故意冒充别人怎么办？这个不必担心，首先我们相信大家都是善良无知的群众，其次，真的有冒充的也是有办法可查的。

## usage

```shell
# create repository
mkdir learngit
cd learngit
pwd # 输出 /Users/michael/learngit

# 初始化
git init # 在learngit文件夹下会创建一个叫.git的文件夹。
git add <file>
git commit

git status # 查看当前库的状态。哪些文件被修改过。是否放到git舞台。
git status -s # 查看简化版本的输出。
git diff # 查看被修改的地方
git add readme.txt # 在提交前添加需要提交的文件
git status
git commit -m "message of resolve" # 提交
git commit --amend  # 修改git commit i 进入编辑状态 修改注释 esc :wq

# 取消跟踪文件
git rm --cached file.ext # 删除file.ext的跟踪,并保留本地文件.
git rm --f file.ext # 删除file.ext的跟踪,并删除本地文件.
git commit -m 'note' # 一定要有这步
# 不建议使用.gitignore方法

# 版本回退
git log # 查看提交的日志
git reset --hard HEAD^
git reset --soft <commitID> # 重置head，不碰触文件。
git reset --hard <commitID> # 重置head.把跟踪文件改为修改前
git reset --mixed <commitID> # git reset <commitID>的默认操作。重置head,不重置工作树。保存文件变更，不标记为commit
git reset --merge <commitID> # 重置head.保留工作树与commit之间不同的文件。若这些文件有没有添加到舞台的文件，则中止重置。
git reset --keep <commitID> # 重置head.保留工作树与commit之间不同的文件。若这些文件有本地变更，则中止重置。
`HEAD`表示当前版本
`HEAD^`表示上一个版本
`HEAD^^`表示上上个版本
`HEAD~100`表示上100个版本
`git reset`表示把版本重新设置为……版本
`HEAD`是指向版本的指针
git reset # 提交回滚，使用当前提交替换一个指定的版本。
git reset # 重置指定版本。默认参数 --soft 把commit的修改退回到git缓冲区。 --hard 把commit的修改丢弃。
git push -f -u origin <branchName>

# 版本前进
git reset --hard <commitID>

# 查看命令历史
git reflog

# 撤销修改
git reset HEAD <file>
git checkout -- <file>

# 删除文件
rm <file> # git知道删除了文件，但是工作区和版本库不一致。这时需要下面这一步。
git rm --cached file.ext # 删除file.ext的跟踪,并保留本地文件.
git rm --f file.ext # 删除file.ext的跟踪,并删除本地文件.
git commit -m 'note' # 一定要有这
# 如果在`$ rm <file>`误删了。使用下行代码恢复回来。
git checkout -- <file>
git clean -f # 删除untracked file

# 把本地代码推到远程仓库
ssh-keygen -t rsa -C '18515195415@163.com' # 1. 生成ssh key.
# 2. 在github网站上添加第一步中生成的ssh key。
# 3. 在github网站上创建一个新的仓库。
# 4. 关联本场仓库和远程仓库。
git remote add origin git@github.com:feigebaobei/learngit.git
# or
git remote add origin http://****:****/xxx.git
# 5. 把本场库的内容推送到远程库上。
git push -u origin master // 第一次
git push origin master // 第二次及以后

# 从远程克隆仓库
# 1. 在远程（如：github）创建一个仓库。
# 2. 克隆这个仓库
git clone git@github.com:feigebaobei/gitskills.git
git clone http://****:****/xxx.git
git remote rm origin
git remote add origin git@...

# 分支
# 1. 创建分支
git branch dev
git checkout dev
git add --all
git commit -m 'dev'
git push -u origin dev
# 2. 切换分支
git checkout dev
# 3. 查看当前分支
git branch
# 4. 合并分支
git merge dev # 把dev分支合并到当前分支
# git在fast forward模式下，删除分支后会丢掉分支信息。在--no-ff下，git会在merge时生成一个新的commit。这样就可以看到分支信息。在对于bug分支、功能分支合并时一般不关心每一次提交的版本，只要最后的版本。这时使用ff模式。
git merge --no-ff -m 'merge with no-ff' dev
# 5. 删除分支
git branch -d dev # 强行删除用-D
git push origin --delete dev # 删除远程分支 dev
# 6. 处理冲突
# 若合并分支时报错。说明2个分支中有同一个文件有不同的修改。这时需要把当前分支上的文件内容修改为要合并的分支上的文件一样。然后再合并。
# 7. 查看分支合并图
git log --graph
# 8. 比较2个分支的文件差异
git diff branch1 branch2 --stat # 显示出所有有差异的文件列表.
git diff branch1 branch2 <path/to/file> # 显示指定文件的详细差异.
git diff branch1 branch2 # 显示出所有有差异的文件的详细差异.
git diff version1 version2
git log dev ^master # 查看dev有，master没有的提交。
git log master..dev # 查看dev比master多提交了哪些提交内容。
git log dev...master # 查看有什么不一样的提交。
# 9. 拉取远程分支
git fetch
git checkout -b localbranchname origin/oribranchname # 本地分支与远程分支会建立映射关系。
git fetch origin oribranchname:localbranchname # 本地分支与远程分支不会建立映射关系。
git branch --set-upstream-to origin/oribranchname localbranchname # 使本地分支与远程分支建立映射关系

# 暂存
git stash # 暂存内容
git stash save # save
git stash list # find all stash list
git stash pop [stashIndex] # pop last stash 或弹出指定stash的内容。 git stash pop stash@{1}
git stash show # show diff cur stash and last push
git stash show [stash@{1}] [-p] # 查看哪些地方不同
git stash apply # 当前变化合并到最后一次stash
git stash drop [stashIndex] # drop stashIndex
git stash clear # clear all stash
# 当使用`git stash pop`出现冲突时,git不会删除保存在stash中的记录。需要使用`git stash drop`进行删除。

git revert [commitId] # 撤销指定commitId的变动。该commitId之前、之后的都变动都存在。

# delete repository
rm -rf .git
```

_tip:_ master 分支上是非常稳定的版本，用于发布。开发在 dev 分支上。各开发者在 dev 分支上再创建自己的分支。

### reset & revert

|            | reset         | revert        |     |
| ---------- | ------------- | ------------- | --- |
|            | head 向前移动 | head 向后移动 |     |
|            | 撤销多个提交  | 撤销一个提交  |     |
|            | 一般无冲突    | 一般有冲突    |     |
| 之后的合并 |               |               |     |

### 多人协作

1. 创建仓库。
2. 设置协作者。把链接发给他，他接受请求后就可以一起开发同一个项目了。
3. 克隆项目
4. 创建分支。就是项目中已经有了分支，在新克隆的项目中也协作者也看不到。需要协作者再创建一次相同名的分支。
5. 编辑项目后先 pull 再 push。

```
git pull origin dev
git push origin dev
```

### 标签管理

1. 创建标签。

```
git tag v1.0
git tag v1.0 f52c633
git tag v0.0.1 // 轻量级标签（保存提交对象的校验与信息的文件）
git tag -a v0.0.2 -m 'comment' // 含附注标签（）
git tag -s v0.0.2 -m 'comment'	 // 签署标签（）
```

2. 查看所有标签

```
git tag // 查看所有标签
git tag -l 'v1.4.*' // 查看1.4.*的版本
```

3. 查看标签信息

```
git show v1.0
```

4. 为标签写说明

```
git tag -a v1.0 -m 'version 1.0'
git tag -a v1.0 -m 'version 1.0' f52c633
```

5. 删除标签

```
git tag -d v1.0
```

6. 推送标签到远程库

```
git push origin v1.0
```

### 上传大于 100m 的文件。

我找到 2 种方法。1, git large file storage 2, 配置上传大小阈值。  
** 1. git large file storage **  
[这是文章链接](http://www.liuxiao.org/2017/02/git-处理-github-不允许上传超过-100mb-文件的问题/)  
[这里还有一个文章链接](https://blog.csdn.net/Tyro_java/article/details/53440666)  
** 2. 配置上传大小阈值 **

```
cd file/path
git config http.postBuffer 314572800
```

我设置成最大 300m.(300*1024*1024=314572800)

## rebase & merge

|     | rebase                         | merge                        |     |
| --- | ------------------------------ | ---------------------------- | --- |
|     | 分支线路不分叉。也就是一条线。 | 分支线路分叉。也就是二条线。 |     |
|     | 不会产生一个提交               | 会产生一个提交               |     |
|     | 保持分支干净                   | 操作简单                     |     |
|     | 一般用于代码管理               | 一般用于个人代码合并         |     |
|     | 都会记录提交                   | 都会记录提交                 |     |

## [常用子命令](/git/command.html)

## 查看 git 配置信息

```shell
git config --list # 查看当前用户在当前库的配置信息
git config --global --list # 查看当前用户（global）配置
git config --system --list # 查看系统config
git config --local --list # 查看当前仓库配置信息
git config --system <key> <value> # 系统配置 作用于全用户/全库
git config --global <key> <value> # 全局配置 作用于当前用户/全库
git config --local <key> <value> # 本地配置 作用于当前用户/当前库
```

## 测试是否联通

```shell
ssh -T git@github.com
ssh -T git@gitlab.com
```

## 分支规范

| 分类   | 名称               | 命名方式                   | 是否可删 |
| ------ | ------------------ | -------------------------- | -------- |
| master | 主分支             | -                          | 否       |
| dev    | 主要开发分支       | -                          | 否       |
| -      | f_li_1012_select   | f_yourname_time_function   | 及时删除 |
| -      | dev_li_1012_select | dev_yourname_time_function | 及时删除 |
| -      | bug_li_1012_select | bug_yourname_time_function | 及时删除 |

commit 必须写注释。  
先 pull 再 push  
有冲突必须解决 `git reset HEAD HEAD^`  
merge 前保证当前工作区干净

## merge 规范

| key      | 全称 | description                    |     |
| -------- | ---- | ------------------------------ | --- |
| feat     | -    | 新增功能                       |     |
| to       |      | 正在修改 bug                   |     |
| fix      |      | 已经修改完成 bug               |     |
| docs     |      | 仅仅修改了文档                 |     |
| style    |      | 修改代码缩进等。不改变代码逻辑 |     |
| refactor |      | 代码重构。                     |     |
| perf     | -    | 优化                           |     |
| test     |      | 测试用例                       |     |
| chore    |      | 改变构建流程/增加依赖/工具     |     |
| revert   |      | 回滚                           |     |
| demo     |      | 示例                           |     |

`<key>(scope): content`

## [git flow](/git/flow.html)

## [git hook](/git/hooks.html)

执行`git init`时会生成`.git`目录。其下的`hooks`目录是 git 的所有钩子。
所有钩子可分为 4 类：

- 提交工作流钩子
  - pre-commit // 提交前执行。使用 git commit --no-verify 可路过此钩子。
  - prepare-commit-msg // 准备提交信息钩子
  - commit-msg // 提交信息钩子
  - post-commit // 提交后钩子
- 电子邮件钩子
  - post-applypatch
- 其他客户端钩子
  - pre-rebase // 预衍合钩子
  - post-rewrite //
  - pre-push
- 服务端钩子
  - pre-receive
  - update
  - post-receive

## git 对象类型

1. 块（blob）
2. 目录树（tree）
3. 提交（commit）保存版本库中和每一次变化的元数据（作者、提交者、提交日期、日志消息）。
4. 标签（tag）

## 同一台电脑配置多个 git 账号

这是参考的文档：`https://www.cnblogs.com/popfisher/p/5731232.html`  
在管理员模式下进行。

### 1. 生成 github.com 的公钥、私钥。

```shell
ssh-keygen -t rsa -C 10000@qq.com // 邮箱使用自己的。
```

根据提示输入 id_rsa 的文件名（包括目录）。一般不要在这里修改文件名。再生成指纹（）文件后再修改文件名。此时修改需要保存公钥与私钥一致。（即：`id_rsa_name`与`id_rsa_name.pub`）

### 2. 生成 git.other.com 的公钥、私钥。

```shell
ssh-keygen -t rsa -C 10000@qq.com // 邮箱使用自己的。
```

使用邮箱地址可以相同。  
命名为 id_rsa_git_other // 不可与第一步中一样  
密码为 123456 // 可以相同

### 3. 把这 2 套公钥分别上传到服务器。

### 4. 在.ssh 目录下创建 config 文本文件，并完成相关配置（最核心的地方）

配置文件的字段说明：  
|||
|-|-|
|Host||
|HostName|真实的域名地。可以是 ip 也可以是域名。|
|IdentityFile|id_rsa 的地址|
|PreferredAuthentications|配置登录时使用什么权限认证。可设为：publickey, password publickey, keyboard-interactive 等。|
|User|配置使用用户名|

为每一个账号配置一个 Host。// 这个名字不会影响 git 命令  
为每一个 Host 配置 HostName 和 IdentityFile  
若设置 Host 为`Host mygithub`，则使用 git 命令时就应该这样：`git clone git@mygithub:githubOfName/propName.git`  
以下是例子：

```
Host github.com
User git
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443

Host gitlab.com
Hostname altssh.gitlab.com
User git
Port 443
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
```

### 5. 使用管理员身份打开 git bash 客户端。测试是否配置成功。

```shell
ssh -T git@github.com
ssh -T git@gitlab.com
```

## fatal: remote origin already exists

```shell
git remote rm origin
git remote add origin ****
```

## 修改、删除远程仓库名称

打开相应仓库——setting——修改成新名称——点击 remane
打开相应仓库——setting——在最下面有删除按钮，点击删除按钮——输入仓库的名字——点击确定

## 远程仓库信息

```shell
git remote -v
```

输出远程的仓库信息。  
若没有信息则说明远程没有相应仓库。

## 删除`.DS_Store`

```shell
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
// 将 .DS_Store 加入到 .gitignore
```

## command

太多了，不好列出。

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
