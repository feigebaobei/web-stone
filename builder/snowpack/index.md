# `snowpack`

## overview
> 把npm包打包为esm的打包工具。  
> 与vite是同一团队开发的。  
> 与pnpm结合使用时报错。  
> 依赖与esbuild/rollup  
> 听说已经不在维护了。（好可惜）  

### 打包过程
1. 为网站、应用扫描所有使用过的npm包。  
2. 从`node_modules`中读取已经安装的依赖。  
3. 单独打包每一个依赖。  
4. 每个打包后的文件直接在浏览器中运行。  
5. 当本地依赖文件有变化时，会重新打包。  

### feature
- 较快的打包器。把文件打包为esm规划的js。连`*.vue`文件也会被打包为`*.vue.js`。  
- 一次打包后缓存起来  
- 在dev环境，浏览器绝不下载2次同一个文件。  
- 适合htr,快速刷新。  
- 开箱即用。  
- 为产出优化  
- 可插件  
- 默认支持ts/jsx  
- 可扫描全部packag

### attention
- 文件中的链接必须使用打包后的链接。  

## install
`npm i snowpack`

## usage
支持cli（命令行）/package（js api）用法。以下是cli用法。  s
- [demo0.md](/builder/snowpack/demo0.html)  
- [demo1.md](/builder/snowpack/demo1.html)  

## configuration
最好让snowpack使用配置文件，snowpack也支持使用cli.  
默认配置文件：`<root>/snowpack.config.mjs`。  
|key|description|default|type|enum|require|demo|
|-|-|-|-|-|-|-|
|mode|模式|`snowpack dev`的默认值：`development`。`snowpack build`的默认值：`production`||test / development / production|||
|root|指定snowpack项目的根目录|/|||||
|workspaceRoot|工作空间的root||||||
|extends|基于base的相对路径||||||
|exclude|不包括|`[**/node_modules/**/*]`|||||
|mount|定义本地目录与打包后的目录的映射||||||
|mount.url|指定挂载的url||string/boolean||必填||
|mount.static|是否不打包此目录的文件||boolean||||
|mount.resolve|是否解决js文件中的引入。||boolean||||
|mount.dot|打包时是否包括`.`开头的文件。||boolean||||
|env|声明环境变量。运行时使用`__SNOWPACK_ENV__`获取||||||
|alias|别名，可用于引用文件时。||object||||
|plugins|snowpack的插件|||||`plugin-1``[plugin-2, {pluginOpiton: 'value'}]`|
|devOptions|配置snowpack的开发时的配置||||||
|devOptions.secure|是否使用ssl.|false|boolean/object|||若为true，则会在`snowpack.crt / snowpack.key`上获取数据。|
|devOptions.hostnaem||loaclhost|||||
|devOptions.port||8080|||||
|devOptions.openUrl|指定开发时的url，也可以设置qs.|string||||`test/foo.html?bar=123`|
|devOptions.open|使用哪个浏览器打开服务地址|`**default**`|string||||
|devOptions.output|输出模式|dashboard|string|stream / dashboard|||
|devOptions.hmr|是否使用hmr|true|boolean||||
|devOptions.hmrDelay|hmr的延迟|0|number||||
|devOptions.hmrPort|hmr的port|devOptions.port|number||||
|devOptions.tailwindConfig|tailwind的配置文件|`./tailwind.config.js`|||||
|packageOptions|配置已经下载的包||object||||
|packageOptions.external|||||||
|packageOptions.source|||||||
|packageOptions.knownEntrypoints|||||||
|packageOptions.polyfillNode|||||||
|packageOptions.env|||||||
|packageOptions.packageLoolupFields|||||||
|packageOptions.packageExportLookupField|||||||
|packageOptions.rollup|||||||
|packageOptions.source=remote|||||||
|packageOptions.origin|||||||
|packageOptions.cache|||||||
|packageOptions.types|||||||
|buildOptions|||||||
|buildOptions.out|输出目录|build|||||
|buildOptions.baseUrl|/||||||
|buildOptions.clean|是否清空输出目录|true|boolean||||
|buildOptions.cacheDirPath|指定缓存目录|./node_module/.cache/snowpack|||||
|buildOptions.metaUrlPath|指定snowpack的元目录。||||||
|buildOptions.sourcemap|是否生成sourcemap|false|||||
|buildOptions.watch|是否启用watch|false|||||
|buildOptions.htmlFragments|是否转换html碎片为整个页面。|||||不能以`<!doctype html>`开头|
|buildOptions.jsxFactory|设置创建jsx元素的方法名|`React.createElement / h`|||||
|buildOptions.jsxFragment|设置创建jsx碎片的方法名|`React.Fragment`|||||
|buildOptions.jsxInject|设置jsx文件的自动引入部分||||||
|testOptions|||||||
|testOptions.files|设置test文件|`["__tests__/**/*", "**/*.@(spac|test).*"]`|||||
|experiments|预留字段||||||

## api

### cli
Commands:
  snowpack init          Create a new project config file.
  snowpack prepare       Prepare your project for development (optional).
  snowpack dev           Develop your project locally.
  snowpack build         Build your project for production.
  snowpack add [package] Add a package to your project.
  snowpack rm [package]  Remove a package from your project.

Flags:
  --config [path]        Set the location of your project config file.
  --help                 Show this help message.
  --version              Show the current version.
  --reload               Clear the local cache (useful for troubleshooting).
  --cache-dir-path       Specify a custom cache directory.
  --verbose              Enable verbose log messages.
  --quiet                Enable minimal log messages.

### js api
`createConfiguration(config?: SnowpackUserConfig) => SnowpackConfig`  
使用指定配置项，生成snowpack的配置对象。  
支持零配置。  

`loadConfiguration(overrides?: SnowpackUserConfig, configPath?: string | undefined) => Promise<SnowpackConfig>`  
使用本地本地文件生成配置对象。  

`startServer({config: SnowpackUserConfig}) => Promise<SnowpackDevServer>`  
使用配置对象生成服务。  

`SnowpackDevServer.port`  
`SnowpackDevServer.loadUrl(reqUrl: string, opt?: {isSSR?: boolean; allowStale?: boolean; encoding?: string}) => Promise<LoadResult<Buffer | string>>`  
设置指定url对应的文件。优先于`build`目录。  
`SnowpackDevServer.getUrlForFile(fileLoc: string) => string | null`  
设置指定url对应的文件。优先于`build`目录。  

`SnowpackDevServer.getUrlForPackage(packageSpec: string) => Promise<string>`  
这是一个助手函数，用于帮助发现依赖包。  
`SnowpackDevServer.sendResponseError(req: http.IncomingMessage, res: http:ServerResponse, status: number) => void`  
这是一个助手函数，用于帮助发送一个错误回馈。一般与node服务结合使用，如：express/koa。  
`SnowpackDevServer.onFileChange({filePath: string}) => void`  
用于监听指定文件改变。  
`SnowpackDevServer.shutdown() => Promise<void>`  
停止服务。  
`SnowpackDevServer.getServerRuntime({invalidateOnChange?: boolean}) => ServerRuntime`  
获取运行时的esm。  
`ServerRuntime.importModule(url: string) => Promise<ServerRuntimeModule>`  
`ServerRuntime.invalidateModule(url: string) => void`  
`ServerRuntimeModule.export: any`  
`ServerRuntimeModule.css: string[]`  

`build({config: SnowpackUserConfig}) => Promise<SnowpackBuildResult>`  
使用配置文件生成打包后的服务。  
`SnowpackBuildResult.result`
`SnowpackBuildResult.shutdown`  
停止`--watch`  

`SnowpackBuildResult.onFileChange`
在执行完`build()`后，又有文件改变。则执行此方法。参数是被改变的文件。  

`getUrlForFile(fileLoc: string, config: SnowpackConfig) => string | null`  
得到指定文件在host url中的uri.  

`clearCache() => Promise<void>`  
清空缓存  

`logger`  
可直接操作snowpack内部的logger。这是的高级用法，不是所有用户都会用到。  

## [插件](/builder/snowpack/plugin.html)
1. 使用pipeline方式处理文件（好多包都使用这种方式，方便支持可插件。）  
2. 只有4个方法。

## principle
此包的处理逻辑。

### uml
```
```

## todo
为类工具全部支持插件。
### 文件中的链接必须使用打包后的链接
这样与编辑器（vscode）的路径功能不符。与开发时的路径也有可能不符。
### 依赖与esbuild/rollup做了什么？
### 推荐使用@web/test-runner去测试
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。