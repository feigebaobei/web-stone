# install nvm

整体安装思路在github上：https://github.com/nvm-sh/nvm#installing-and-updating

## run script
需要翻墙。  
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
// or
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
// 若其中一个不能正常运行，则使用另一个。
// 注意更新版本。
```

## 设置环境变量
```shell
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

## check result of install
关闭terminal，再打开terminal。
```
nvm --version
```
若显示相应版本号，则安装成功。

## usage(example)
```
nvm ls-remote        // 查看可安装的版本
nvm install <number> // 安装指定版本的node
nvm ls               // 查看已安装的node
node -v              // 查看正在运行的node版本
```