# api
## cli
wp支持cli/config，二种使用方式。  
推荐使用config方式。  

### 子命令
省略了简写和别名  
||||||
|-|-|-|-|-|
|build|开始打包。默认执行。||||
|configtest|验证配置文件是否正确||||
|help|显示子命令的使用方法||||
|info|显示关于当前系统的信息||||
|init|初始化一个wp项目||||
|loader|使用脚手架创建一个loader||||
|plugin|使用脚手架创建一个plugin||||
|serve|运行webpack-dev-server||||
|version|显示webpack/webpack-cli/webpack-dev-server的版本号||||
|watch|当文件改变时运行wp||||

### 选项
wp的选项都是使用`-`连接的。  

||||||
|-|-|-|-|-|
|--entry|打包的入口||||
|--config|指定配置文件||||
|--config-name|使用配置文件中的指定名称的配置对象|每个配置对象的name属性对应。|||
|--name|为配置对象命名||||
|--color|是否为console使用颜色||||
|--merge|合并多个配置文件||||
|--env|指定环境变量||||
|--node-env|为`process.env.NODE_ENV`设置值||||
|--progress|是否显示打包进度||||
|--help|||||
|--output-path|指定打包结束的目录||||
|--target|打包结果的运行环境||||
|--watch|是否观察文件的变化||||
|--watch-options-stdin|是否stdin输入时停止观察||||
|--hot|是否使用hmr||||
|--devtool|是否使用source map||||
|--prefetch|预加载此请求||||
|--json|打包结果的输出日志形式是否使用json形式||||
|--mode|指定mode||||
|--version|设置版本||||
|--stats|如何对待stat||||
|--analyze|是否启用webpack-bundle-analyzer||||
|--no-color|对console不使用颜色||||
|--no-hot|不使用hmr||||
|--no-stats|不使用编译stat||||
|--no-watch|不观察文件变化||||
|--no-devtool|不使用source map||||
|--no-watch-options-stdin|stdin输入是不停止||||

### 自定义环境变量
demo: `npx webpack --env production`  
`--node-env`的会同时作用于`process.env.NODE_ENV`和`mode`  

|||||
|-|-|-|-|
|boolean|`npx webpack --env prod`|{prod: true}||
|多个boolean|`npx webpack --env prod --env min`|{prod: true, min: true}||
|value|`npx webpack --env platform=app --env production`|{platform: 'app', production: true}||
|string|`npx webpack --env foo=bar=app`|{foo: "bar=app"}||
|object|`npx webpack --env app.platform="staging" --env app.name="test"`|{app: {platform: "staging", name: "test"}}||

### 内置环境变量

|||||
|-|-|-|-|
|WEBPACK_SERVE|boolean|当使用serve时为true||
|WEBPACK_BUILD|boolean|当使用build时为true||
|WEBPACK_WATCH|boolean|当使用watch时为true||

### exit code
||||
|-|-|-|
|0|成功||
|1|wp出错||
|2|配置项或选项出错||

## node interface
wp为node提供了api入口。  

### usage
```js
const webpack = require('webpack')
const compiler = webpack(config, (err, stats) => {
    // err是与wp相关的错误。
    // stats.hasError() 是编译时的错误
    // if (err || stats.hasErrors()) {...}
    const cErr = console.error
    if (err) {
        cErr(err.stack || err)
        if (err.details) {
            cErr(err.details)
        }
        return
    }
    const info = stats.toJson()
    if (stats.hasErrors()) {
        cErr(info.errors)
    }
    if (stats.hasWarnings()) {
        console.warn(info.warnings)
    }
})
```

### compiler instance
|||||
|-|-|-|-|
|方法||||
||run(cb)|||
||watch(watchOptions, handler)|||

### watching
```js
const watching = compiler.watch({...}, (err, stats) => {...})
watching.close((closeErr) => {...})
watching.invalidate() // 设置当前compiling不合法
```
### stats
|||||||
|-|-|-|-|-|-|
|hasErrors()||||||
|hasWarnings()||||||
|toJson(options)||||||
|toString(options)||||||

### multicompiler
```js
webpack([
    {entry: './index1.js', output: {filename: 'bundle1.js'}},
    {entry: './index2.js', output: {filename: 'bundle2.js'}},
], (err, stats) => {
    // stats [stats, stats]
})
```
- 当使用多个配置对象时，回调方法的参数会是多个stats对象组成的数组。  
- 当使用多个配置对象时，这些配置对象对应的打包逻辑会依次执行。  

### WatchOpitons
|属性|||||||
|-|-|-|-|-|-|-|
|aggregateTimeout||number|20||||
|ignored||regexp string string[]|||||
|poll||boolean number|false||||
|followSymlinks|是否观察软链接文件|boolean|||||
|stdin|当输入stdin时是否停止观察||||||

## Stats Data
关于module的静态信息。  
可用于优化编译速度和分析应用依赖图。  
它是顶级结构。  

|stats的属性||||||
|-|-|-|-|-|-|
|version||||||
|hash||||||
|time|编译用时 ms|||||
|publicPath||||||
|outputPath|输出目录|||||
|assetsByChunkName|每个资源的名字|||||
||main|||||
||named-chunk|||||
||other-chunk|||||
|assets||||||
|chunks||||||
|modules||||||
|entryPoints||||||
|errors||||||
|errorsCount||||||
|warnings||||||
|waringsCount||||||

|assets的属性||||||
|-|-|-|-|-|-|
|chunkNames|名字|||||
|chunks|包含的资源id|||||
|comparedForEmit|是否与相同名字的资源执行比对。|||||
|emitted|是否打包到输出目录|||||
|name|输出的文件名|||||
|size||||||
|info||||||
||immutable|是否长时间缓存||||
||size|||||
||development|是否保在开发时使用||||
||hotMudleReplacement|是否使用hmr||||
||sourceFilename|||||
||javascriptModule|资源是否是js且esm规范||||

|chunk的属性||||||
|-|-|-|-|-|-|
|entry|是否是入口文件|||||
|files|包含的文件名||[]|||
|filterModules||||||
|id|chunk的id|||||
|initial|是否在init page中加载|||||
|modules||||||
|name|包含的chunk的名字|||||
|origins||||||
|parents|父chunk的id|||||
|rendered|是否使用代码生成|||||
|size|大小|||||

|module的属性||||||
|-|-|-|-|-|-|
|assets|包含的资源|[]||||
|build||||||
|cacheable|是否从缓存中来|||||
|chunks|本module包含的chunk的id|||||
|errors|错误数量|||||
|failed|是否编译失败|||||
|id|module的id|||||
|identifier||||||
|name|真实的名字|||||
|optional||||||
|prefetched|是否预加载|||||
|profile||||||
||building|loading and parsing||||
||dependencies|打包依赖数量||||
||factory|||||
|reasons||||||
|size||||||
|source||||||
|warning||||||

|空对象的属性||||||
|-|-|-|-|-|-|
|identifier||||||

|error / warining的属性||||||
|-|-|-|-|-|-|
|moduleIdentifier||||||
|moduleName||||||
|loc||||||
|message||||||
|moduleId||||||
|moduleTrace||[]||||
||originIdentifier|||||
||originName|||||
||moduleIdentifier|||||
||moduleName|||||
||dependencies|||||
||originId|||||
||moduelId|||||
|details||||||
|stack||||||

## webpack-dev-server api
在node.js中使用此包。  

||||||
|-|-|-|-|-|
|start()|||||
|startCallback(cb)|||||
|stop()|||||
|stopCallback(cb)|||||
|internalIp(family: 'v4' | 'v6')|||||
|internalIpSync(family: 'v4' | 'v6')|||||

## hmr(hot module replacement)

## loading interface
好像是教大家怎么写一个loader

## logger interface
自定义日志的方法

## modules
当wp打包时处理module的方法  
支持如下规范。  

### esm （推荐）
wp支持动态解析，后引入。  

### cjs
require
require.resolve
require.cache
require.ensure

### amd

### labeled modules
### webpack

## module variables
使用wp打包时可以使用的变量。  

- module.loaded (nodejs)  
- module.hot (webpack-specific)
- module.id (cjs)
- module.exports (cjs)
- exports (cjs)
- global (nodejs)
- __dirname (nodejs)
- import.meta.url 引入文件的绝对url
- import.meta.webpack wp的版本
- import.meta.webpackHot module.hot的别名
- import.meta.webpackContext  
- __filename (nodejs)
- __resourceQuery (webpack-specific)
- __webpack_public_path__ (webpack-specific)
- __webpack_require__ (webpack-specific)
- __webpack_chunk_load__ (webpack-specific)
- __webpack_module__ (webpack-specific)
- __webpack_module__.id (webpack-specific)
- __webpack_modules__ (webpack-specific)
- __webpack_hash__ (webpack-specific)
- __webpack_get_script_filename__ (webpack-specific)
- __non_webpack_require__ (webpack-specific)
- __webpack_exports_info__ (webpack-specific)
- __webpack_is_included__ (webpack-specific)
- __webpack_base_uri__ (webpack-specific)
- __webpack_runtime_id__  

## compilation object
编译时使用方法/属性、hook.

|||||||
|-|-|-|-|-|-|
|getStats||||||
|addModule||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||
|getStats||||||






## title
## title
## title
## title
## title
## title
## title