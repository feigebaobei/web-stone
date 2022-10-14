# npx
运行本地、远端的包
执行npm包的二进行文件

```
npm exec -- <pkg>[@<version>] [args...]
npm exec --package=<pkg>[@<version>] -- <cmd> [args...]
npm exec -c '<cmd> [args...]'
npm exec --package=foo -c '<cmd> [args...]'

npx <pkg>[@<specifier>] [args...]
npx -p <pkg>[@<specifier>] <cmd> [args...]
npx -c '<cmd> [args...]'
npx -p <pkg>[@<specifier>] -c '<cmd> [args...]'

alias: npm x, npx

--package=<pkg> (may be specified multiple times)
-p is a shorthand for --package only when using npx executable
-c <cmd> --call=<cmd> (may not be mixed with positional arguments)
```

`<pkg>`是必填项。可以使用`path`代替包名。  
`--call / -c`用于生成命令字符串。  
- 若package.json中有bin只有一个，则调用该字段。  
- 若package.json中bin字段有多个，其中有一个被匹配，则执行该字段的匹配值。  
- 若无匹配（无bin、无匹配项），则报错。  


## npm & npx
### npm 
npm是包管理命令行工具。可以下载、删除……依赖包。若该包可执行，则在本项目`./node_modules/.bin`中创建软链接，或在全局`bin/`中创建软链接。
使用已经安装的依赖包：
1. 定义脚本去执行二进制文件（也被叫做可执行文件）。  
```js
{
    ...
    "script": {
        "package-name": "package-cli"
    }
}
```
2. 执行脚本  
`npm run package-name`  

### npx
npx是包执行器。在npm v5.2.0时内置于npm中。可直接执行可执行文件，不必先安装。
demo for npx:
```shell
# 1
npx cowsay wow
# 2
npx cowsay[@version] hi
```
运行过程：  
1. 下载指定的包。  
2. 执行该包的可执行文件。  
3. 删除该包及其依赖。  

若想使用已经下载的包，又不想使用npx，则可以运行`./node_modules/.bin/<command> <args...>`  

# init
## 别名 create / innit
`npm init <initializer>`  
可以创建一个新npm包或使用一个已有的npm包。  
完成的npm包名应该是`create-<initializer>`
相当于执行`npm exec`命令 `npm exec create-<initializer>`
使用`-y` / `--yes` 跳过所有询问。
使用`--scope` 设置作用空间。

# unlink
取消软链接

# rm
删除（`package.json`中）指定的包。

# ci
```shell
npm ci
# aliases: clean-install, ic, install-clean
```

与`npm install`类似。  

|install|ci|||
|-|-|-|-|
||必须存在`package-lock.json`、`npm-shrinkwrap.json`|||
||当锁文件与package.json的依赖不相同时，抛出错误。|||
||只能安装全部依赖|||
||若node_modules已经存在，则先删除，再创建。|||
||不会修改package.json和锁文件。|||

## configuration
||说明|ult||
|-|-|-|-|
|save||||
|save-exact||||
|global||||
|global-style||||
|legacy-bundling||||
|omit||||
|strict-peer-deps||||
|package-lock||||
|foreground-scripts||||
|ignore-scripts||||
|audit||||
|bin-links||||
|fund||||
|dry-run||||
|workspace||||
|workspaces||||
|include-workspace-root||||
|install-links||false||

# pack
生成本地安装包`<name>-<version>.tgz`。  
可以使用`npm i` / `npm update` / `npm dedupe` / `npm uninstall`

```shell
npm pack [[<@scope>/]<pkg>...] [--dry-run] [--json]
```

|||||
|-|-|-|-|
|`--dry-run`|不会|||
|`--json`|是否使用json格式输出|boolean|false|
|`--pack-detination`|打包的目录|string|`.`|
|`--workspace`|工作空间。不会。可选值：- 工作空间的名字。- 工作空间的目录。- 父工作空间的路径|string|-|
|`--workspaces`||boolean|false|

# title
# title
# title
# title
# title
# title