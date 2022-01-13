# `nvm`

## overview
> node版本管理的cli工具  

### feature
- 可在本地安装多个node版本。并激活其中一个版本。  
- feature1  
- feature2  

## install & update
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
# or
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```
会把`nvm`包安装在`~/.nvm`目录。  
然后在如下的配置文件中添加如下代码。
`~/.bash_profile``~/.zshrc``~/.profile``~/.bashrc`  
```sh
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

## usage
```sh
nvm -v
nvm install node # node是最新版的别名
nvm install <version>
nvm uninstall <version> # 删除指定版本的node
nvm ls-remote # 列出可安装的版本号
nvm ls-remote  --lts
nvm use <version> # 使用指定版本号的node
nvm run node --version
nvm exec 4.2 node --version # 强制运行指定版本
nvm install iojs
nvm alias default <version> # 设置默认版本
```

## confuse
### 需要每次都执行`source .bash_profile`
执行 source .bash_profile文件
之后nvm可以正常允许，但是新开一个终端tab就会发现 nvm命令找不到，找了很多资料终于解决了。
这是因为新的mac系统默认终端是zsh不再是bash，默认启动的文件是.zshrc不是.bash_profile。所以这样配置不会一直生效。
touch .zshrc
vim .zshrc
将上面文件那天复制搭配.zshrc文件中
source .zshrc文件
问题得到解决  
这就意味着，.bashrc文件和.bash_profile文件不需要了

### 环境变量文件的优先级

```
/etc/profile /etc/paths ~/.bash_profile ~/.bash_login ~/.profile ~/.bashrc
```
/etc/profile （建议不修改这个文件 ） 全局（公有）配置，不管是哪个用户，登录时都会读取该文件。
/etc/bashrc （一般在这个文件中添加系统级环境变量） 全局（公有）配置，bash shell执行时，不管是何种方式，都会读取此文件。
~/.bash_profile （一般在这个文件中添加用户级环境变量） 每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!
~/.bashrc （一般在这个文件中添加用户级环境变量） bash shell执行时，不管是何种方式，都会读取此文件。

 如果你的终端不是bash是zsh，配置文件就会是.zshrc。
 
## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。