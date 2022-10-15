# `nrm`

## overview

> 管理本地的 npm 注册器。

## install

`npm i -g nrm`

## usage

```
nrm ls // 列出所有注册器及其url
nrm current // 显示当前注册器
nrm use <registry> // 使用指定的注册器
nrm add <registry> <url> [home] // 添加注册器
nrm login <registry> [value] // 登录指定注册
        -a --always-auth
        -u --username <username>
        -p --password <password>
        -e --email <email>
nrm set-hosted-repo <registry> <value>
nrm set-scope <scopeName> <value>
nrm del-scope <scopeName>
nrm set <registryName> // 设置当前注册器的名称
        -a --attr <attr>
        -v --value <value>
nrm del <registry>
nrm rename <registryName> <newName>
nrm home <registry> [browser]
nrm publish [<tarball>|<floder>]
        -t --tag [tag]
        -a --access <public|restricted>
        -o --otp [otpcode]
        -dr --dry-run
nrm test [registry] // 列出所有注册器的响应时间
nrm help // 显示说明
```

## principle

此包的处理逻辑。

1. 指定`bin`对应的文件`<root>/cli.js`。
2. 在`<root>/cli.js`中简明写清每个命令对就的行为 action。
3. action 由`<root>/actions.js`统一输出。每个行为都是先定义，然后统一输出。
4. 作者把 util 的文件叫做`helpers.js`

### uml

```
constants.js ---------------> helpers.js ----------------> actions.js -----------> cli.js
根据环境输出文件的路径。         使用文件的路径              定义并输出行为           定义各命令对应的行为
```
