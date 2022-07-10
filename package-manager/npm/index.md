    npm install (with no args, in package dir)
    npm install [<@scope>/]<name>
    npm install [<@scope>/]<name>@<tag>
    npm install [<@scope>/]<name>@<latest>
    npm install [<@scope>/]<name>@<version>
    npm install [<@scope>/]<name>@<version range>
    npm install <tarball file>
    npm install <tarball url>
    npm install <folder>

    npm uninstall xxx
    npm uninstall -g xxx

    npm i

|缩写|全写||
|-|-|-|
|-S|--save|安装包信息将加入dependencies(生产阶段的依赖)（默认）|
|-D|--save-dev|安装包信息将加入到devdependencies(开发阶段的依赖)|
|-O|--save-optional|optionalDependencies(可选阶段的依赖)|
|-E|--save-exact|精确安装指定模块版本|
||--dry-run||
||local|本地安装|
|-g|--global|全局安装|  
## [子命令](/package-manager/npm/subCommand.html)

||||
|-|-|-|
|uninstall|卸载模块||
|update|更新模块|按照package.js里标注的版本号进行更新|
|outdated|检查模块是否已经过时||
|ls|查看安装的模块||
|help|查看详细信息||
|root|查看安装路径||
|config|设置配置|npm config set proxy=http://xxx.com:8080(设置代理)npm config set registry="http://r.cnpmjs.org"(设置镜像)npm install -g cnpm --registry=https://registry.npm.taobao.org(设置淘宝镜像)|
|cache|管理模块的缓存||
|start|启动模块||
|stop|||
|restart|||
|test|||
|version|||
|view|查看模块的注册信息||
|adduer|用户登录||
|publish|发布模块||
|access|在发布的包上设置访问级别||
|rebuild|使用新版本的node时，重新编译所有c++插件。它会运行在与`npm build`相匹配的文件夹下。||
|init|把初始化信息写入`package.json`|`npm init -y`会使用默认值|
|setScript|设置脚本|`npm setScript build 'node ./index.js'`|

## 全局安装和局部安装的区别  

### 全局安装

在任何地方都可以调用。  
在安装后可以在“C:/user/(pc's name)/AppData/Roaming/npm”里面有`*.cmd`  

### 局部安装  

只在本项目中可以使用。  
安装在`./node_modules`  
使用时需要引入  

    var webpack = require('webpack')

何时使用全局安装、局部安装？  

首先需要理解全局安装在c盘里的，局部安装在本项目的./node_modules里。  
引用时需要使用相对链接的方式引用（../）。  
各个项目使用各个依赖版本可能与别的项目的版本不一样。  
使用的工具适合使用全局安装。  
项目的依赖适合使用本地安装。  

### 安装过程

1. 执行`npm install`命令。  
2. npm向registry查询模块压缩包。  
3. 下载压缩包，存放在~/.npm目录  
4. 解压压缩包到当前目录的node_modules目录。  

本地会有2份数据，分别在`~/.npm`，`node_modules`里。因此可以实现缓存机制。
```
npm cache clean
npm cache clean --force
```

## 安装淘宝镜像  

    npm i -g cnpm --regitstry=https://registry.npm.taobao.org

使用[nrm]()更方便管理注册地址。

## 创建本地链接（常用于开发、调试）
```
    cd <pathOfPackage>
    npm link
```

## 使用本地链接（常用于开发、调试）
```
npm link <packagename>
```
require方法不能把全局安装的文件引入。若使用`npm link packagename`后就可以引入全局文件。  
但是`npm link xxx`不支持windows.  `-_-`  

## package.json说明

在运行时引入模块，引入的是package.json中"main"指向的文件。
在webpack打包或者webpack-dev-server的时候，引入的是package.json中"module"指向的文件。

## package.json各字段说明
有些项目中会在此文件中添加自定义字段。可以是该项目需要。  

|key|description|optional|type|demo|
|-|-|-|-|-|
|name|包的名字。可以使用作用域前缀`@myorg/mypackage`|n|string||
|version|版本号|n|string||
|description|展示必要的信息。方便`npm search`||string||
|keywords|该包的关键字|string[]|string||
|homepage|项目的主页|||"homepage": "https://github.com/owner/project#readme"|
|bugs|当前包的issue的地址||||
|license|版权说明||||
|author|作者||||
|contributors|贡献者||||
|funding|最新的信息所在网址的字段。||Object / Array||
|files|用于描述包作为依赖项安装时要包含的条目|y|||
|main|主要入口。使用`require(packageName)`时就是从这个字段开始获取数据。||||
|browser|当该包使用在browser时，会代替main字段的功能。包中不能使用node.js modules||||
|bin|一个包会有若干个可执行文件。这些可执行文件需要安装到`PATH`。使用该字段定义命令与本包中可执行文件的映射关系。在安装后npm会链接到`prefix/bin`为全局使用或安装到`./node_modules/.bin`为本地使用。当有多可执行文件时需要写成`object`，当只有一个可执行文件时可写成`string`。可执行文件需要以`#!/usr/bin/env node`开头。|||`{"bin": {"myapp": "./cli.js"}}`|
|man|方便linux的man命令查找文件||||
|directories|本包的目录结构||||
|description.lib|指定lib目录||||
|description.bin|指定bin目录||||
|description.man|指定man目录||||
|description.doc|指定doc目录||||
|description.example|指定示例目录||||
|description.test|指定测试目录||||
|repository|该包的仓库|Object|{"type":"git","url":"xxxx"}||
|script|可运行的脚本。包括一些生命周期脚本。|Object|||
|config|使用该包时需要的配置项，将用于该包的脚本。||||
|dependencies|生产环境的依赖项。可以使用url/github url/本地路径/|Object|||
|devDependencies|开发环境的依赖项。|Object|||
|peerDependencies|本包依赖的其他依赖包。同等依赖，会同级安装。|Object|{'vue': '2.6.0'}||
|peerDependenciesMeta|若安装peerDependencies中的包时，报警告。则使用`peerDependenciesMeta`指明提示信息。||`{peerDependenciesMeta: "${packageName}": {"optional": true}}`|
|bundledDependencies|一组包名，他们会在发布的时候被打包进去。||||
|optionalDependencies|如果一个依赖不可用，但你希望在它安装失败的时候npm也能继续初始化。npm会使用该字段对应的包。此时该字段的功能与`dependencies`的功能一样。使用`npm i --no-optional`时该字段无效。||||
|engines|需要什么样的引擎环境支持||`{"engines": {"node": ">=10.0.0"}}`||
|os|需要什么样的操作系统||string[]||
|cpu|指定cpu||||
|private|若true，则不能`npm publish`||Boolean||
|publishConfig|发布时的配置||||
|workspaces|它描述了本地文件系统中的位置，安装时应该查找这些位置，以找到需要与顶级node_modules文件夹进行符号链接的每个工作区。就像工作区内有package.json一样。常用于一库多包。workspace中的每一项都是一个包，每个包都有一个package.json。|||
|DEFAULT VALUES|不支持的value||||
|unpkg|上所有的文件都开启 cdn 服务地址|||
|engineStrict|不会||||
|preferGlobal|不会||||
|types|指定类型文件的目录||||

### 注册cli的逻辑
在package.json中定义`bin`字段。npm会根据该字段创建一个软链接。若使用全局安装，则安装在`/home/turbo/.nvm/versions/node/v14.16.1/bin/`。若使用局部安装，则安装在`./node_modules/.bin/`

## scope
### 说明
所有包必须有一个名字。有些包名有作用域。就遵守以下规则：`@somescope/somepackagename`
把相关的包放在一起。

### 安装作用域包
### 引用作用域包
### 发布作用域包
### 关联作用域包

## npm 包使用范围

只允许在客户端使用的，
只允许造服务端使用的，
浏览器/服务端都可以使用。
如果我们需要开发一个 npm 包同时兼容支持 web端 和 server 端，需要在不同环境下加载npm包不同的入口文件，显然一个 main 字段已经不能够满足我们的需求，这就衍生出来了 module 与 browser 字段。

`*.mjs`文件是在 node 环境下原生执行 ESM 规范的脚本文件。当执行`require('index') / import('index')`时，优先加载`index.mjs`，即优先级：`*.mjs > *.js`

main：npm包的入口文件。兼容browser / node。
  main字段是npm包主要入口文件`require(xxx)`时就是从main字段取值的。  
module: npm包的esm规范的入口文件。兼容browser / node。module的优先级大于main.  
browser：npm包的browser环境下的入口文件。  

只npm包只允许在web端（浏览器中）运行，则使用browser。  
只npm包只允许在server端（node中）运行，则使用main.  
使用npm包可以在web、server端都可运行，则使用browser+main.  

## 脚本
`npm run xxx` // 执行脚本  
`npm xxx` // 执行脚本  
npm run // 查看所有脚本  
脚本运行在`shell`中。  
传参数:使用`--`标明。如：`npm run lint -- --reporter checkstyle > checkstyle.xml`  
`&`：同时执行。`&&`：成功后向下执行。这2个符号是`bash`的功能。  
默认的脚本：`"start": "node server.js"` / `"install": "node-gyp rebuild"`。不需要定义即可执行。  
钩子:  
npm脚本支持`pre`/`post`2种钩子。每个脚本都可以如此处理。如：当执行`npm run build`时，会执行：`npm run prebuild && npm run build && npm run postbuild`.默认提供的金子：  
- prepublish, postpublish  
- preinstall, postinstall  
- preuninstall, postuninstall  
- preversion, postversion  
- pretest, posttest  
- prestop, poststop  
- prestart, poststart  
- prerestart, postrestart  

`npm restart`是`npm stop && npm restart && npm stop`的简写。
简写：`npm start`.忽略了`run`

### 变量
通过`npm_package_`前缀可得到`package.json`中的字段。 如：`process.env.npm_package_version` / `process.env.npm_package_script_install`
通过`npm_config`前缀可得到`package.json`中`config`里的变量。如：`npm_config_tag`。`npm config get xxx`

## npx
执行npm包的二进行文件
```
npx [options] <command>[@version] [command-arg]...
npx [options] [-p|--package <pkg>]... <command> [command-arg]...
npx [options] -c '<command-string>'
npx --shell-auto-fallback [shell]
```

### npm & npx
npm是包管理命令行工具。可以下载、删除……依赖包。若该包可执行，则在本项目`./node_modules/.bin`中创建软链接，或在全局`bin/`中创建软链接。
使用已经安装的依赖包：
1. 定义脚本去执行二进制文件（也被叫做可执行文件）。  
```js
{
    ...
    "script": {
        "package-name": "package-name"
    }
}
```
2. 执行脚本  
`npm run package-name`  
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