# `lerna`

## overview
> 一个一库多包的管理工具。

### feature
- 一个库中包含多个包。
- 方便包之间引用。
- 统一发布包。

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

它有2种模式去管理项目：fixed / independent。

#### fixed（固定模式）默认

固定模式下项目操作一个单独的版本。版本号在`lerna.json`的`version`中。当你执行了`lerna publish`，若从上次发布后有包被修改过，则该包会使用新的版本号去发布。即只需要修改`lerna.json`中的`version`就可作用于所有被修改的包。
`babel`就是使用这种模式。若你想使用这种自动作用于全部包的版本号管理工具，你就可以这么做。

#### independent（分离模式）

`lerna init --independent`
在该模式下每个包使用当前包的`package.json`管理版本号。每次发布时，会得到一个提示，关于每个包的补丁/小更改/主要更改/自定义变动。
该模式下允许你更自由地升级每个包的版本，用于组件组更合适。
`lerna.json`中`version`的值是`independent`。

## configuration
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

## log
默认日志文件：`<root>/lerna-debug.log`。在lerna运行出错时记录的日志。

## api
详见[command](/jsPackages/lerna/commands.html)  

`lerna init`
创建一个lerna仓库或在已经存在的库中初始化一个lerna仓库的目录结构。
默认是`fixed`模式。可使用`--independent / -i`设置为分离模式。

`lerna bootstrap`
安装依赖

`lerna import <pathToRepo>`
不会。
好像是：把本地包`<pathToRepo>`到本lerna库中。

`lerna publish`
把有变更的包发布出去。同时更新本包的git远端仓库。
`--npm-tag [tagName]`   npm的版本标签。默认是latest
`--canary / -c`         不会
`--skip-git`            不运行git命令。
`--force-publish [packages]`  强行发布指定的包。

`lerna changed`
检查有变化的包并列出。

`lerna diff [packages]`
显示从上次发布后有变化的包。

`lerna run [script]`
运行npm脚本。

`lerna ls`
列出所有本lerna库中的包。

## principle
此包的处理逻辑。

### uml
```
```

## recommend
- 每个包一个git仓库。本地使用一个项目，其中是lerna创建的项目。此项目没有git仓库。

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。