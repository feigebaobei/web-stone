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
- 使用新版本性能更好。    

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

### 代码分割
触发代码分割的方法：
- 多入口  
- 入口依赖 或 splitchunkplugin  
- 动态引入  

打包分析工具： 
- [webpack-chart](/jsPackages/xxx.html)
- [webpack-visualizer](/jsPackages/xxx.html)
- [webpack-bundle-analyzer](/jsPackages/xxx.html)
- [webpack bundle optimize helper](/jsPackages/xxx.html)
- [bundle-stats](/jsPackages/xxx.html)

Prefetching/Preloading modules

### caching
说了好多optimization中设置项。因不懂它们是做什么的。所有没看懂。学习了config后再看这里。

### 写一个库
[demo2](/builder/webpack5/demo/demo2.html)

### 环境变量
定义环境变量
```shell
npx webpack --env goal=local --env production --progress
```
使用环境变量
```js
const path = require('path');

module.exports = (env) => {
  // Use env.<YOUR VARIABLE> here:
  console.log('Goal: ', env.goal); // 'local'
  console.log('Production: ', env.production); // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
```

### build performance
- 通用的  
  - 每个loader/plugin都使用消耗时间（性能），应该非必须，不使用。  
  - resolve  
    - 减少 `resovle.modules / resolve.extensions / resolve.mainFiles / resolve.descriptionFiles` 的值的数量。  
    - 不使用symlinks `resolve.symlinks: false`  
    - `resolve.cacheWithContext: false`  
  - DllPlugin可提高编译速度
  - small = faster
    - 少用几个包、用小体积包。  
    - 使用`SplitChunksPlugin`分为多页面应用。  
    - 删除不用的代码  
    - 只编译本次开发的部分。  
  - worker pool  
    - 使用`thread-loader`  
  - persistent cache  
    - xxx  
  - progress plugin  
- 开发的
  - 若使用webpack的watch模式，则不要使用别的watch工具  
  - 在内存中编译  
    - webpack-dev-server  
    - webpack-hot-middleware  
    - webpack-dev-middleware  
  - state.toJson() 不会  
  - devtool  
    - eval 不会被转换代码  
    - cheap-source-map  
    - eval-source-map  
    - eval-cheap-module-source-map  
    - 不使用生产时的功能  
      - terserPlugin  
      - [fullhash]/[chunkhash]/[contenthash]  
      - aggressiveSplittingPlugin  
      - AgressiveMergingPlugin  
      - ModuleConcatenationPlugin  
    - 最小化入口 `optimization.runtimeChunk: true`  
    - 不使用额外的步骤  
    - 不输出路径信息`output.pathinfo: false`  
    - 请使用高长版本node  
    - 对于ts，只做类型检查。`{loader: 'ts-loader', options: {transpileOnly: true}}`  
- 生产的  
  - 若不需要sourcemap，则不输出  
- 特殊工具  
  - babel 最小化preset/plugins
  - ts
  - sass 有一个bug。当使用`thread-loader`时设置`workerParallelJobs: 2`

### content security policies
使用入口脚本文件中设置`__webpack__nonce__`为所有脚本的nonce  
```js
// 如
__webpack__nonce__ = 'c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM='
```

### development vagrant
### 依赖管理  
wp支持类似文件管理的能力。  
支持动态引入表达式。  
esbuild只支持静态引入表达式。  

### installation
[webpack](/jsPackages/webpack.html)
[webpack-cli](/jsPackages/webpackCli.html)

### hmr (hot module replacement)  
hmr: wp提供在不刷新页面时运行时可更新所有模块的能力。  
[webpack-dev-server](/jsPackages/webpackDevServer.html)内置了hmr插件。v4+默认支持hmr.  

### tree shaking
不打包死代码。  
依赖esm模块语法。`import / export`
在`package.json`中设置`sideEffects: false`，则wp根据此字段删除死代码。  
```json
<!-- demo -->
"sideEffects": ["./src/some-side-effectful-file.js", "*.css"]
```

- sideEffects 跳过指定的文件  
- usedExports 依赖terser去探测side effects 声明  

### production
推荐把配置文件分开。  
合并时会用到[webpack-merge](/jsPackages/webpackMerge.html)  
```js
const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')
module.exports = merge(common, {
    mode: 'production'
})
```
然后在package.json中定义脚本。

- 不使用sourcemap  
- minimize css  
- cli alernatives (即cli优先)  

### lazy loading
```js
button.onclick = e => import('./print').then(module => {
    let p = module.default
    p()
})
```
当使用`import()`时，引入的必须使用`.default`属性

### shimming

### ts
```shell
npm i typescript ts-loader -D
```
创建`<root>/tsconfig.json`
```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node"
  }
}
```
创建`<root>/webpack.config.js`
```js
module.exports = {
    entry: '...',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {...}
}
```
ts-loader会根据tsconfig.json转化ts文件。  

#### 使用自自定义声明文件
```ts   
/// <reference types="webpack/module" />
... other ts code
```

#### 使用第三方声明文件
`npm i @types/lodash`  

### web workers
在wp5时，不用`worker-loader`也能使用`Web Workers`  
```js
new Worker(new URL('./worker.js', import.meta.url))
```
### pwa (progressive web application)
`npm i workbox-webpack-plugin`
```js
// webpack.config.js
const WorkboxPlugin = require('workbox-webpack-plugin')
module.exports = {
    plugins: [
        new WorkboxPlugin({
            title: '....'
        }),
        new WorkboxPlugin.GenerateSW({
            clientClaim: true,
            skipWaiting: true,
        })
    ]
}
```
```js
// index.js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(registration => {
            console.log(....)
        }).catch(err => {...})
    })
}
```

### public path
应用可直接访问的资源路径。  

### integrations
与下列工具一起使用：
- npm scritp  
- grunt  
- gulp  
- mocka  
- karma  

### asset modules
常用这三个loader:   
- raw-loader  
- url-loader  
- file-loader  

支持的模块类型：  
- asset/resource    把文件分开并输出url             默认值  
  - 适用于png等
- asset/inline      输出资源的data uri  
  - 适用于svg等
- asset/source      输出源代码  
- asset             自动选择asset/resource 和 asset/inline  
  - 适用于txt等

### advanced entry
可以使用多入口。如把css/js分开打包。  

### package exports

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

#### 用法
**1. config**
...

**2. node api**
```js
const webpack = require('webpack')
const config = require('./webpack.config.js')
let compiler = webpack(config)
new webpack.ProgressPlugin().apply(compiler)
compiler.run((err, stats) => {
    ...
})
```

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
`target: 'node'` // 指定运行环境。默认为web

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
要么在一个js中包含所有代码，要么把所有代码分在多个js中。程序员要在二者中找到平衡点。  

### under the hood
入口 + 依赖图 = chunk

chunk的形式：
- initial       明确入口的文件  
- non-initial   可以延迟加载的块

## [configuration](/builder/webpack5/config/index.html)
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
        runtimeChunk: 'single', // 多入口时需要此字段
        splitChunks: {          // 待明确
            chunks: 'all',
        },
    }
}
```
使用webpack-cli生成的配置文件是配置对象+方法  







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

### webpack-dev-server
该包为node.js提供了api，可直接使用。  
#### install
`npm i -D webpack webpack-dev-server`

#### usage
在node中使用api  
```js
// server.js
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.js')
const compiler = webpack(config)
const devServerOptions = {...config.devServer, open: true}
const server = new WebpackDevServer(devServerOptions, compiler)
cons runServer = async () => {
    console.log('start')
    await server.start()
}
runServer()
```
```shell
node server.js
```

在cli中使用方法
```shell
npx webpack serve
```



#### api
<!-- 待完善 -->
```js
WebpackDevServer: {
    constructor (config, compiler) {

    }
    start()
}
```

|webpackDevServer的实例的属性|说明||||||
|-|-|-|-|-|-|-|
|start()|启动服务||||||
|startCallback(cb)|启动后回调||||||
|stop()|||||||
|stopCallback(cb)|||||||
|internalIP(family: "v4"|"v6")|||||||
|internalIPSync(family: "v4"|"v6")|||||||

默认为异步。有等效的同步方法。  






## [loader](/builder/webpack5/loader/index.html)
常用loader  
|插件名|说明（功能）|使用方法||||
|-|-|-|-|-|-|
|css-loader||||||
|raw-loader|以字符串的形式导入|||||
|url-loader|以data url的形式导入|||||
|file-loader|把文件复制到output directory|||||
|source-map-loader||||||
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
|workbox-webpack-plugin|||||搞清它是如何工作的|
|SplitChunksPlugin|代码分割|||||
|SourceMapDevToolPlugin||||||
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

### 内置插件
用法如
```js
const webpack = require('webpack')
module.exports = {
    plugins: [new webpack.ProvidePlugin({
        _: 'lodash'
    })]
}
```
|插件名|说明（功能）|使用方法||||
|-|-|-|-|-|-|
|ProvidePlugin||||||
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

## 提高性能
- threa-loader  
- externals  
- dll  

