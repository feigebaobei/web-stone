# 环境变量

|||||
|-|-|-|-|
|`/etc/paths`|全局|一行一个。||
|`/etc/profile`|公有配置文件。建议不修改。|每个用户登录时都会读取此文件||
|`/etc/bashrc`|公有配置文件|bash shell执行时，会读取此文件。||
|`~/.profile`|为每个用户设置环境信息。|每个用户登录时都会读取此文件|修改后需要重启修改才能生效。或执行`source ~/.profile`|
|`~/.bashrc`|当base shell打开时，读取此文件。||修改后需要新打开bash后生效|
|`~/.bash_profile`|这是属于当前用户的base信息。当登录时且打开shell时读取本文件。||`source ~/.bash_profile`|

## 当需要每次执行`source ~/.bash_profile`才能得到变量时才能生效时

```shell
echo $SHELL
# 若输出 /bin/zsh  则说明本机使用zsh。
```
解决方法：  
在`~/.zshrc`中添加
```
source ~/.bash_profile
```
然后重启终端。

## [bash & zsh](/linux//bash.html)
