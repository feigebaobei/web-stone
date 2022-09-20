# webpack5

## overview
> 强大的打包工具  
> 本文中简称wp  
> 静态资源打包器  
> 核心部分  
    > entry  
    > output  
    > loaders  
    > plugins  
    > mode  
    > browser compatiblity  
> wp5需要node v10.13.0+  

### feature
- 配置文件非必需（v4+）  
- 可打包任意文件。  
- feature2  

## install
`npm i webpack`

## usage
[demo0](/builder/webpack5/demo/demo0.html)  
[demo1](/builder/webpack5/demo/demo1.html)  

### 开发时
开发时常用以下三种方式：  
||说明|不足|脚本||||
||-|-|-|-|-|-|-|
|推荐|webpack-dev-server|提供基本的web服务|只能在打包结束后提供服务|`"wpServe": "webpack serve --open"`||||
||--watch|当文件变化时重新打包。|只是重新打包。需要程序员手动在浏览器中刷新页面|||||
||webpack-dev-middleware||好像需要与后端服务结合使用|||||

## concepts
```js
let path = require('path') // node内置包
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './path/to/entry.js',
    output: {
        path: path.resovle(__dirname, 'dist'),
        filename: 'index.bundle.js'
    },
    module: { // 在这里为资源设置loader
        rules: [
            {test: /\.txt$/, use: 'raw-loader'}
        ]
    },
    plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],
    mode: 'production'
}
```


### entry points
开始打包的地方。
```ts
entry: string | [string]
```
demo
```ts
module.exports = {
    entry: './entry.js',
    entry: ['./entry1.js', './entry2.js'],
    entry: {
        main: './entry.js'
    },
    entry: {
        app: './index.js',
        first: './first.js'
    }
}
```
```ts
type EntryDescription = {
    dependon: string;       // 当前入口文件依赖着哪个文件，必须在依赖文件后加载。
    filename: string;       // 输出在硬盘上的文件
    import: string;         // 入口文件
    library: string;        // Specify library options to bundle a library from current entry.
    runtime: string;        // 设置运行时的chunk name
    publicPath: string;     // 为输出文件设置url。
}
// runtime / dependon 不能同时使用
// dependon 不能循环依赖
```
- 若打为多个包，则在某些无变动时，它的hash值不变，浏览器就可以使用缓存中的文件。
- 多页面应用。

### output
输出选项，不管入口文件有多少个。
demo
```ts
module.exports = {
    output: {filename: 'bundle.js'},
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        publicPath: 'https://www.test.com/assets/[fullhash]/'
    },
}
```

### mode
wp会根据此字段做内部优化。  
- production // default
- development
- none

### [loaders]()
webpack的核心包并不大。它只认识js/json。其他类型的文件需要由loader转化为js，然后才能打包。
demo
`npm i -D style-loader css-loader sass-loader ts-loader`
```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {modules: true}
                    },
                    {loader: 'sass-loader'},
                ]
            },
            {test: /\.ts$/, use: 'ts-loader'},
        ]
    }
}
```
不会行内写法。  
行内优先于配置文件。  

- 可链式调用。倒序执行。其运行结果，是下一个loader的入参。所有loader有规范。
- 可同步也可异步
- node.js运行loader
- 使用`options`对象为loader设置配置。  
- 通常package.json中`main:loader`

#### 常用loader
- [style-loader]()         xxxx
- [css-loader]()         xxxx
- [sass-loader]()         xxxx
- [ts-loader]()         xxxx
- [title]()         xxxx
- [title]()         xxxx
- [title]()         xxxx
- [title]()         xxxx

### [plugin](/builder/webpack/plugin/index.html)
插件是webpack的主要部分。
插件是一个有`apply()`的对象，该方法被webpack compiler调用。
可以作用于整个过程。(由wp的项目结构决定了)。如：优先打包、管理资源、注入环境变量。

#### 常用插件
#### 内置插件

### configuration
- 一般使用cjs规范。  
- `require(...)`  
- 可使用分支逻辑  
- 使用`--env`代替从cli取数据  
- 不输出不确定的值  
- 避免编辑长配置文件  




### modules
模块化开发。
webpack可以理解的模块化
- es2015 import
- cjs require()
- amd define/require
- css / sass / less @import statement
- css img url(...) / html `<img src=...>`

webpack支持的编写规范
- esm
- cjs
- amd
- assets
- webassembly modules

webpack支持的语言
- coffeescript
- ts
- esnext
- sass
- less
- stylus
- elm

webpack支持的引入规则
- `import '/file'`
- `import 'C:\\path\\file'`
- `import '../file'`
- `import './file'`
- `import 'file'`
- `import 'file/sub'`

可以使用`resolve.alias`解决解决繁杂的引入路径。
若路径是文件，解决方案：
- 若文件有扩展名，直接引入
- 若文件无扩展名，则告诉wp可接受的扩展名 `resolve.extensions`  
若路径是目录，解决方案：
- 若目录中有package.json，则该文件中必须包括resovle.mainFields中有的字段。
- 若目录中无package.json，或resolve.mainfields返回一个有效路径。文件名必须在resovle.mainFiles中出现（有顺序要求）。
- 文件扩展名resolve.extensions

#### 缓存
若文件从文件系统中访问多次，或平行，或依次。为了更快些，则使用缓存模式，直到该文件有变动，才更新缓存中的该文件。

#### module resolution
使用[`enhanced-resolve`](/jsPackages/enhancedResovle.html)解决模块引用的功能。  

### module federation（模块联邦）
需要重读wp module部分的文档

#### 动机
若模块之间无联系，则分开部署。

#### high-level concepts

#### low-level concepts

#### low-level concepts

#### low-level concepts
#### low-level concepts
#### low-level concepts
####  concept goals

- 模块应该暴露所有wp支持的模块类型
- 代码块应该使用平行加载  
- 控制从消费者到内容者  

### dependency graph
wp根据import / require绘制依赖图。

### targets
`target: 'node'` // 指定运行环境

多个输出（多个运行环境）
```js
// webpack.config.js
let path = require('path')
let serverConfig = {
    target: 'node',
    output: {
        path: path.resovle(__dirname, 'dist'),
        filename: 'lib.node.js'
    }
}
let clientConfig = {
    target: 'web',
    output: {
        path: path.resovle(__dirname, 'dist'),
        filename: 'lib.js'
    }
}
module.exports = [serverConfig, clientConfig]
```
rollup是需要运行多次打包方法（参数时不同的配置对象）。  

### the manifest
manifest为wp提供管理打包后的模块之间交互。  
编译时，wp记录各模块的详细要点，整理成为manifest。浏览器请求应用时，把manifest发给客户端。在运行时根据该文件处理各打包后的模块的交互。`require / import`会被编译为`__webpack_requrie__`方法。  

### (hmr) hot module replacement
- 保留完全重新加载页面期间丢失的应用程序状态
- 只更新变更内容 
- 源代码的内容变动时，浏览器更新。

### why webpack
### under the hood
入口 + 依赖图 = chunk

chunk的形式：
- initial       明确入口的文件  
- non-initial   可以延迟加载的块








## configuration
默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||


### 基本结构
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development', // 可以写成根据xx的表达式
    entry: {
        index: './src/index.js',
        another: './src/another.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'hi title'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        runtimeChunk: 'single'
    }
}
```


## cli

Usage: webpack [entries...] [options]
Alternative usage to run commands: webpack [command] [options]

The build tool for modern web applications.

Options:
  -c, --config <value...>                Provide path to a webpack configuration file e.g.
                                         ./webpack.config.js.
  --config-name <value...>               Name of the configuration to use.
  -m, --merge                            Merge two or more configurations using 'webpack-merge'.
  --env <value...>                       Environment passed to the configuration when it is a
                                         function.
  --node-env <value>                     Sets process.env.NODE_ENV to the specified value.
  --progress [value]                     Print compilation progress during build.
  -j, --json [value]                     Prints result as JSON or store it in a file.
  -d, --devtool <value>                  Determine source maps to use.
  --no-devtool                           Do not generate source maps.
  --entry <value...>                     The entry point(s) of your application e.g. ./src/main.js.
  --mode <value>                         Defines the mode to pass to webpack.
  --name <value>                         Name of the configuration. Used when loading multiple
                                         configurations.
  -o, --output-path <value>              Output location of the file generated by webpack e.g.
                                         ./dist/.
  --stats [value]                        It instructs webpack on how to treat the stats e.g. verbose.
  --no-stats                             Disable stats output.
  -t, --target <value...>                Sets the build target e.g. node.
  --no-target                            Negative 'target' option.
  -w, --watch                            Watch for files changes.
  --no-watch                             Do not watch for file changes.
  --watch-options-stdin                  Stop watching when stdin stream has ended.
  --no-watch-options-stdin               Do not stop watching when stdin stream has ended.

Global options:
  --color                                Enable colors on console.
  --no-color                             Disable colors on console.
  -v, --version                          Output the version number of 'webpack', 'webpack-cli' and
                                         'webpack-dev-server' and commands.
  -h, --help [verbose]                   Display help for commands and options.

Commands:
  build|bundle|b [entries...] [options]  Run webpack (default command, can be omitted).
  configtest|t [config-path]             Validate a webpack configuration.
  help|h [command] [option]              Display help for commands and options.
  info|i [options]                       Outputs information about your system.
  serve|server|s [entries...] [options]  Run the webpack dev server.
  version|v [commands...]                Output the version number of 'webpack', 'webpack-cli' and
                                         'webpack-dev-server' and commands.
  watch|w [entries...] [options]         Run webpack and watch for files changes.


## api
`webpack.fn(param, first: string, second: boolean = true) => void`
description

`webpack.fn(param, [options: {a: string, b?: number}])`
description

## [loader](/builder/webpack5/loader/index.html)
常用loader  
|插件名|说明（功能）|使用方法||||
|-|-|-|-|-|-|
|css-loader||||||
|css-loader||||||
|css-loader||||||
|css-loader||||||
|css-loader||||||
|css-loader||||||
|css-loader||||||
|css-loader||||||
|css-loader||||||
|css-loader||||||
|css-loader||||||
|css-loader||||||
|css-loader||||||
|css-loader||||||


## [plugins](/builder/webpack5/plugin/index.html)
常用插件  
|插件名|说明（功能）|使用方法||||
|-|-|-|-|-|-|
|html-webpack-plugin||||||
|webpackmanifestplugin||||||
|pluginname||||||
|pluginname||||||
|pluginname||||||
|pluginname||||||
|pluginname||||||
|pluginname||||||
|pluginname||||||
|pluginname||||||
|pluginname||||||
|pluginname||||||
|pluginname||||||
|pluginname||||||
|pluginname||||||
|pluginname||||||



## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。





## 浏览器兼容。
wp支持ie8+及其他浏览器。内部使用`es5-compliant`实现兼容。  
