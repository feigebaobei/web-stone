# overview

> 高版本 npm 与 yarn 1+无明显差异。用哪个都可以。

# install

不需要专门安装。npm 已经内置于 node。

# use

<!-- prettier-ignore-start -->
|           |          |      |
| --------- | -------------------------- | ------------- |
| uninstall | 卸载模块   |      |
| update    | 更新模块   | 按照 package.js 里标注的版本号进行更新                  |
| outdated  | 检查模块是否已经过时               |      |
| ls        | 查看安装的模块                     |      |
| help      | 查看详细信息                       |      |
| root      | 查看安装路径                       |      |
| config    | 设置配置   | npm config set proxy=http://xxx.com:8080(设置代理)npm config set registry="http://r.cnpmjs.org"(设置镜像)npm install -g cnpm --registry=https://registry.npm.taobao.org(设置淘宝镜像) |
| cache     | 管理模块的缓存                     |      |
| start     | 启动模块   |      |
| stop      |            |      |
| restart   |            |      |
| test      |            |      |
| version   |            |      |
| view      | 查看模块的注册信息                 |      |
| adduer    | 用户登录   |      |
| publish   | 发布模块   |      |
| access    | 在发布的包上设置访问级别           |      |
| rebuild   | 使用新版本的 node 时，重新编译所有 c++插件。它会运行在与`npm build`相匹配的文件夹下。 |      |
| init      | 把初始化信息写入`package.json`     | `npm init -y`会使用默认值    |
|           |            |      |
<!-- prettier-ignore-end -->

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

首先需要理解全局安装在 c 盘里的，局部安装在本项目的./node_modules 里。  
引用时需要使用相对链接的方式引用（../）。  
各个项目使用各个依赖版本可能与别的项目的版本不一样。  
使用的工具适合使用全局安装。  
项目的依赖适合使用本地安装。

### 安装过程

1. 执行`npm install`命令。
2. npm 向 registry 查询模块压缩包。
3. 下载压缩包，存放在~/.npm 目录
4. 解压压缩包到当前目录的 node_modules 目录。

本地会有 2 份数据，分别在`~/.npm`，`node_modules`里。因此可以实现缓存机制。

```
npm cache clean
npm cache clean --force
```

## [子命令](/package-manager/npm/subCommand.html)

<!-- prettier-ignore-start -->
|            |            |      |
| ---------- | ----------------------------- | ------------- |
| uninstall  | 卸载模块   |      |
| update     | 更新模块   | 按照 package.js 里标注的版本号进行更新                  |
| outdated   | 检查模块是否已经过时               |      |
| ls         | 查看安装的模块                     |      |
| help       | 查看详细信息                       |      |
| root       | 查看安装路径                       |      |
| config     | 设置配置   | npm config set proxy=http://xxx.com:8080(设置代理)npm config set registry="http://r.cnpmjs.org"(设置镜像)npm install -g cnpm --registry=https://registry.npm.taobao.org(设置淘宝镜像) |
| cache      | 管理模块的缓存                     |      |
| start      | 启动模块   |      |
| stop       |            |      |
| restart    |            |      |
| test       |            |      |
| version    |            |      |
| view       | 查看模块的注册信息                 |      |
| adduer     | 用户登录   |      |
| publish    | 发布模块   |      |
| access     | 在发布的包上设置访问级别           |      |
| rebuild    | 使用新版本的 node 时，重新编译所有 c++插件。它会运行在与`npm build`相匹配的文件夹下。 |      |
| init       | 把初始化信息写入`package.json`     | `npm init -y`会使用默认值    |
| set-script | 设置脚本   | `npm set-script build 'node ./index.js'`旧写法 `npm pkg set scripts.dev="concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""`新写法                |
<!-- prettier-ignore-end -->

### intall 命令

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

<!-- prettier-ignore-start -->
| 缩写 | 全写            |    |
| ---- | --------------- | ----------------------------------------------------- |
| -S   | --save          | 安装包信息将加入 dependencies(生产阶段的依赖)（默认） |
| -D   | --save-dev      | 安装包信息将加入到 devdependencies(开发阶段的依赖)    |
| -O   | --save-optional | optionalDependencies(可选阶段的依赖)                  |
| -E   | --save-exact    | 精确安装指定模块版本          |
|      | --dry-run       |    |
|      | local           | 本地安装                      |
| -g   | --global        | 全局安装                      |
<!-- prettier-ignore-end -->

- 他项目里没有引入你所需的依赖包，那么你插件所依赖的包会被安装
- 他项目里引入了你所需的依赖包：
  - 版本号一致，那么你所需的依赖包不会被安装，插件将共用项目里的依赖包
  - 版本号不一致，那么你所需的依赖包就会被安装，项目里就存在了两套不同版本的依赖

## 安装淘宝镜像

    npm i -g cnpm --regitstry=https://registry.npm.taobao.org

使用[nrm](/jsPackages/nrm.html)更方便管理注册地址。

## 创建本地链接（常用于开发、调试）

```
    cd <pathOfPackage>
    npm link
```

## 使用本地链接（常用于开发、调试）

```
npm link <packagename>
```

require 方法不能把全局安装的文件引入。若使用`npm link packagename`后就可以引入全局文件。  
但是`npm link xxx`不支持 windows. `-_-`

```shell
npm link                  # 创建软链接
npm unlink                # 取消创建软链接
npm link <package-name>   # 链接依赖项
npm unlink <package-name> # 取消链接依赖项
```

## package.json 说明

在运行时引入模块，引入的是 package.json 中"main"指向的文件。
在 webpack 打包或者 webpack-dev-server 的时候，引入的是 package.json 中"module"指向的文件。

## package.json 各字段说明

有些项目中会在此文件中添加自定义字段。可以是该项目需要。

<!-- prettier-ignore-start -->
| key   | description     | optional                | type              | demo     |
| ---- | ------------- |  | ------ | ----- |
| name  | 包的名字。可以使用作用域前缀`@myorg/mypackage`    | n        | string            |          |
| version              | 版本号                   | n        | string            |          |
| description          | 展示必要的信息。方便`npm search`   |          | string                 |               |
| keywords             | 该包的关键字      | string[]                   | string   | |
| homepage             | 项目的主页        |        |          | "homepage": "https://github.com/owner/project#readme" |
| bugs                 | 当前包的 issue 的地址                 |        |          | |
| license              | 版权说明          |        |          | |
| author               | 作者              |        |          | |
| contributors         | 贡献者            |        |          | |
| funding              | 最新的信息所在网址的字段。            |        | Object / Array               | |
| files                | 用于描述包作为依赖项安装时要包含的条目              | y      |          | |
| main                 | 主要入口。使用`require(packageName)`时就是从这个字段开始获取数据。                    |        |          | |
| browser              | 当该包使用在 browser 时，会代替 main 字段的功能。包中不能使用 node.js modules         |        |          | |
| bin                  | 一个包会有若干个可执行文件。这些可执行文件需要安装到`PATH`。使用该字段定义命令与本包中可执行文件的映射关系。在安装后 npm 会链接到`prefix/bin`为全局使用或安装到`./node_modules/.bin`为本地使用。当有多可执行文件时需要写成`object`，当只有一个可执行文件时可写成`string`。可执行文件需要以`#!/usr/bin/env node`开头。 |        |          | `{"bin": {"myapp": "./cli.js"}}`  |
| man                  | 方便 linux 的 man 命令查找文件                  |              |      |               |
| directories          | 本包的目录结构      |              |      |   |
| description.lib      | 指定 lib 目录       |              |      |   |
| description.bin      | 指定 bin 目录       |              |      |   |
| description.man      | 指定 man 目录       |              |      |   |
| description.doc      | 指定 doc 目录       |              |      |   |
| description.example  | 指定示例目录        |              |      |   |
| description.test     | 指定测试目录        |              |      |   |
| repository           | 该包的仓库          | Object       | {"type":"git","url":"xxxx"}                |   |
| script               | 可运行的脚本。包括一些生命周期脚本。  | Object       |      |   |
| config               | 使用该包时需要的配置项，将用于该包的脚本。                |              |      |   |
| dependencies         | 生产环境的依赖项。可以使用 url/github url/本地路径/       | Object       |      |   |
| devDependencies      | 开发环境的依赖项。        | Object       |      |   |
| peerDependencies     | 本包依赖的其他依赖包。同等依赖，会同级安装。执行`install`时不安装。           | Object                   | {'vue': '2.6.0'}       | 一般用于常用包、babel 等。        |
| peerDependenciesMeta | 若安装 peerDependencies 中的包时，报警告。则使用`peerDependenciesMeta`指明提示信息。                  |      | `{peerDependenciesMeta: "${packageName}": {"optional": true}}` |
| bundledDependencies  | 一组包名，他们会在发布的时候被打包进去。          |      |            |   |
| optionalDependencies | 如果一个依赖不可用，但你希望在它安装失败的时候 npm 也能继续初始化。npm 会使用该字段对应的包。此时该字段的功能与`dependencies`的功能一样。使用`npm i --no-optional`时该字段无效。          |      |            |   |
| engines              | 需要什么样的引擎环境支持      |      | `{"engines": {"node": ">=10.0.0"}}`        |   |
| os                   | 需要什么样的操作系统          |      | string[]   |   |
| cpu                  | 指定 cpu  |      |            |   |
| private              | 若 true，则不能`npm publish`  |      | Boolean    |   |
| publishConfig        | 发布时的配置                  |      |            |   |
| workspaces           | 它描述了本地文件系统中的位置，安装时应该查找这些位置，以找到需要与顶级 node_modules 文件夹进行符号链接的每个工作区。就像工作区内有 package.json 一样。常用于一库多包。workspace 中的每一项都是一个包，每个包都有一个 package.json。           |      |            |
| DEFAULT VALUES       | 不支持的 value                |      |            |   |
| unpkg                | 上所有的文件都开启 cdn 服务地址                   |      |            |
| engineStrict         | 不会      |                  |    |               |
| preferGlobal         | 不会                     |               |    |               |
| types                | 指定类型文件的目录       |               |    |               |
| typings                | 指定类型文件的目录       |               |    |               |
| type                 | 指定规范                 | "module" / "commonjs"             | 默认为"commonjs"       |               |
| exports              | 可以根据不同的引用方式或者模块化类型，来指定 npm 包引用不同的入口文件。              | 如`"exports": {"import": "./main-module.js","require": "./main-require.cjs"`}import 为 esm 的导入方式，require 为 cjs 的导入方式 | 优先级高于 brower/module/main.比 file 好用。                   |               |
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
| 版本前的符号         |       |                  |    |               |
|   -| -      |  -    |  -  |    -           |
|~|允许匹配最近的小版本。||||
|^|最近的大版本||||
|无|精确版本号||||
|latest|最新的版本||||
|> >= < <=|具体的版本范围||||
|`-`|2个版本号之间的任意版本||||
|`&&`|指定多个版本范围，安装满足多个版本范围的版本。||||
<!-- prettier-ignore-end -->

### 依赖的引用方式

file

```
"dependencies": {
  "pn": "file:../pn-path"
}
```

link
会创建一个链接，可以实时同步依赖包的变化。不推荐中开发环境中使用。

```
"dependencies": {
  "pn": "link:../pn-path"
}
```

link
在本地包中运行 npm link
再在项目中执行 npm link.pn
npm install .pn-path
or
yarn add pn-path
相对路径

```
"dependencies": {
  "pn": "../pn-path"
}
```

### 注册 cli 的逻辑

在 package.json 中定义`bin`字段。npm 会根据该字段创建一个软链接。若使用全局安装，则安装在`/home/turbo/.nvm/versions/node/v14.16.1/bin/`。若使用局部安装，则安装在`./node_modules/.bin/`

## scope

### 说明

所有包必须有一个名字。有些包名有作用域。就遵守以下规则：`@somescope/somepackagename`
把相关的包放在一起。

### 安装作用域包

### 引用作用域包

### 发布作用域包

### 关联作用域包

## npm 包使用范围

- 只允许在客户端使用的，
- 只允许在服务端使用的，
- 浏览器/服务端都可以使用。

- main：npm 包的入口文件。兼容 browser / node。
  - main 字段是 npm 包主要入口文件`require(xxx)`时就是从 main 字段取值的。
- module: npm 包的 esm 规范的入口文件。兼容 browser / node。module 的优先级大于 main.
- browser：npm 包的 browser 环境下的入口文件。

`*.mjs`文件是在 node 环境下原生执行 ESM 规范的脚本文件。当执行`require('index') / import('index')`时，优先加载`index.mjs`，即优先级：`*.mjs > *.js`

## 脚本

`npm run xxx` // 执行脚本  
`npm xxx` // 执行脚本  
npm run // 查看所有脚本  
脚本运行在`shell`中。  
传参数:使用`--`标明。如：`npm run lint -- --reporter checkstyle > checkstyle.xml`  
`&`：同时执行。`&&`：成功后向下执行。这 2 个符号是`bash`的功能。  
默认的脚本：`"start": "node server.js"` / `"install": "node-gyp rebuild"`。不需要定义即可执行。

**hooks 钩子**:  
npm 脚本支持`pre`/`post`2 种钩子。每个脚本都可以如此处理。如：当执行`npm run build`时，会执行：`npm run prebuild && npm run build && npm run postbuild`.默认提供的金子：

- prepublish, postpublish
- preinstall, postinstall
- preuninstall, postuninstall
- preversion, postversion
- pretest, posttest
- prestop, poststop
- prestart, poststart
- prerestart, postrestart
- prepare
  - 在执行 npm publish / npm pack 前执行
  - 打包前执行
  - 发布前执行
  - 当执行 npm install （无参数） 时执行

`npm restart`是`npm stop && npm restart && npm stop`的简写。
简写：`npm start`.忽略了`run`  
双重 pre/post 无效，比如：prepretest/postposttest 是无效的。

### 变量

通过`npm_package_`前缀可得到`package.json`中的字段。 如：`process.env.npm_package_version` / `process.env.npm_package_script_install`
通过`npm_config`前缀可得到`package.json`中`config`里的变量。如：`npm_config_tag`。`npm config get xxx`

## 设置 npm registry

### 全局设置

```shell
npm config set registry=https://registry.npmjs.org
process.env.npm_config_registry # 读取
```

### .npmrc

包管理工具（npm/pnpm/yarn）默认从项目的`.npmrc`文件中读取配置。

```
registry = https://registry.npmjs.org
```

### --regitry 选项

```
npm install esbuild -- registry=https://registry.npmjs.org
```

### package.json publishConfig

```json
// packags.json
{
  ...
  "publishConfig": {
    "registry": "https://registry.npmjs.org"
  }
}
```

## exports

|         |     |     |     |     |
| ------- | --- | --- | --- | --- |
| default |     |     |     |     |
| import  |     |     |     |     |
| require |     |     |     |     |
| browser |     |     |     |     |
| node    |     |     |     |     |

```json
{
  "name": "pkg",
  "exports": {
    // 使用明确的子路径引入
    "./foo": {
      // 条件引入语法
      "import": "./imported.mjs",   // esm
      "require": "./required.cjs",  // cjs/amd
      "default": "./fallback.js"
    },
    // 指定优先级
    "./bar": ["./bar0/", "./bar1"],
    // 条件语法
    ".": {
      "red": "./a.js",    // 有顺序
      "green": "./b.js",
      "default": "./c.js", // 最后一个总是default.总是被触发。
    },
    // 缩写
    ".": "./a.js",
  }
}

{
  "name": "my-awesome-lib",
  "exports": {
    ".": { // 支持所有引入
      "browser": {
        "default": "./lib/whole-lib.browser.js"
      }
    },
    "module-a": { // 支持 'my-awesome-lib/module-a'
      "import": "./lib/public-module-a.mjs",
      "require": "./lib/public-module-a.cjs"
    },
    "module-b": { // 支持 'my-awesome-lib/module-b'
      "import": "./lib/public-module-b.mjs",
      "require": "./lib/public-module-b.cjs"
    }
  }
}
```

## workspace

在一库多包`monorepo`项目中使用。

- 在项目根目录下的 package.json 中指定`workspaces`字段。
- 然后包管理工具会把该字段下的所有子包创建软链接。就像执行了`npm link`一样。这样就可以在其他子包中使用该子包了。

## 缓存

```
npm config get cache // 列出缓存目录
npm cache clean --force // 清空缓存
```

## [config](/package-manager/npm/config.html)

## [发布](/package-manager/npm/publish.html)

## title

## title

## title

## title

### title
