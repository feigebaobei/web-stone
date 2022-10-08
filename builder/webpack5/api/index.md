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
|hasErrors()||||||
|hasErrors()||||||
|hasErrors()||||||
|hasErrors()||||||
|hasErrors()||||||
|hasErrors()||||||
|hasErrors()||||||

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

## Stats Data



## title
## title
## title
## title
## title
## title
## title
## title
## title
## title
## title
## title
## title
## title