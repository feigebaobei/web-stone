# `lerna`

## overview

> 一个一库多包的管理工具。

### feature

- 一个库中包含多个包。
- 建立包之间引用。(bootstrap)
- 统一发布包。自动升级版本号。
- 缓存运行命令的结果。
- 在每个包(或指定的包)中运行脚本。

## install

`npm i lerna -g`

## usage

```
npm i lerna -g
mkdir projName
cd projName
lerna init     // 生成基本的lerna库目录结构。
```

结果如下：

```
<root>
|--package.json
|--lerna.json
|--packages/
```

### how it works

它有 2 种模式去管理项目：fixed / independent。

#### fixed（固定模式）默认

若你想使用这种自动作用于全部包的版本号管理工具，你就可以这么做。
即只需要修改`lerna.json`中的`version`就可作用于所有被修改的包。在执行`lerna publish`时会提示选择改变相应版本。  
`babel`就是使用这种模式。
固定模式下项目操作一个单独的版本。版本号在`lerna.json`的`version`中。当你执行了`lerna publish`，若从上次发布后有包被修改过，则该包会使用新的版本号去发布。

#### independent（分离模式）

`lerna init --independent`
在该模式下每个包使用当前包的`package.json`管理版本号。每次发布时，会得到一个提示，关于每个包的补丁/小更改/主要更改/自定义变动。
该模式下允许你更自由地升级每个包的版本，用于组件组更合适。
`lerna.json`中`version`的值是`independent`。

## [configuration](/jsPackages/lerna/config.html)

默认配置文件：`<root>/lerna.json`。

```
{
    version
    npmClient               // 指定注册器客户端。默认npm.
    command: {
        publish: {
            ignoreChanges   // 执行lerna change/publish时不包含的内容。
            message         // 在执行publish时的commit message
            registry        // 自定义注册rul.默认npmjs.org。必须有权限。
        }
        bootstrap: {
            ignore           // 执行lerna bootstrap时不包含的内容。
            npmClientArgs    // 在执行lerna bootstrap时会调用npm install。本字段为npm install提供参数。
            scope            // 设置lerna bootstrap的执行范围。
            }  //
    },
    packages: [...]          // 各包的目录。用数组的元素表示多个值。
}
```

所有命令都可以设置默认配置项

## log

默认日志文件：`<root>/lerna-debug.log`。在 lerna 运行出错时记录的日志。

## api

详见[command](/jsPackages/lerna/commands.html)

`lerna init`
创建一个 lerna 仓库或在已经存在的库中初始化一个 lerna 仓库的目录结构。
默认是`fixed`模式。可使用`--independent / -i`设置为分离模式。

`lerna bootstrap`
安装依赖

`lerna import <pathToRepo>`
不会。
好像是：把本地包`<pathToRepo>`到本 lerna 库中。

`lerna publish`
把有变更的包发布出去。同时更新本包的 git 远端仓库。
`--npm-tag [tagName]` npm 的版本标签。默认是 latest
`--canary / -c` 不会
`--skip-git` 不运行 git 命令。
`--force-publish [packages]` 强行发布指定的包。

`lerna changed`
检查有变化的包并列出。

`lerna diff [packages]`
显示从上次发布后有变化的包。

`lerna run [script]`
运行 npm 脚本。

`lerna ls`
列出所有本 lerna 库中的包。

lerna 没有删除包的命令。若要删除包，只能手动删除目录。

## principle

此包的处理逻辑。

### uml

```

```

## recommend

- 每个包一个 git 仓库。本地使用一个项目，其中是 lerna 创建的项目。此项目没有 git 仓库。

## 一库多包的优势

- 代码复用
- 模块清晰、分工明确
- 代码耦合低
- 各模块独立管理

## 一库多包的缺点

- 需要 git 分目录设置权限。

## todo

### [nx](/nx/index.html)

nx 只会让 lerna 理强大。lerna 已有的功能，仍然可以使用。

### title

### title

### title

### title
