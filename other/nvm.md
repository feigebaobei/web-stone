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
nvm ls-remote # 列出可安装的版本号
nvm use <version> # 使用指定版本号的node
nvm run node --version
nvm exec 4.2 node --version # 强制运行指定版本
nvm install iojs
nvm alias default <version> # 设置默认版本
```

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。