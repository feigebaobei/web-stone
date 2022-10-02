# config

## configuration language
- js (cjs)          推荐
- ts  
- coffeescript  
- babel / jsx       会被转化为json

## configuration types
配置文件的形式：  
- 输出一个返回对象的方法。该方法的参数是env、argv  `(env, argc) => object`  
- 输出一个返回promise的方法。  `() => Promise<object>`  
- 多个配置文件。需要处理好：
  - 依赖关系。  `dependencies:['moduleName']`
  - 最大同时打包数量。  `module.exports.parallelism = 1`  

## entry and context
context使用绝对路径定义entry的相对目录。  

## mode
`string = 'production': 'none' | 'development' | 'production' `

## output
|options|说明|type|default|||
|-|-|-|-|-|-|
|assetModuleFilename|为asset module设置打包后的名字。只能工作在`rule.type : 'asset' | 'asset/resource'`时。|string|`'[hash][ext][query]'`|||
|asyncChunks|明确（强制）使用异步加载模块|boolean|true|||
|auxiliaryComment|设置输出时的注释|||||
|charset|告诉wp为`<script>`标签添加`charset="utf-8"`|boolean|true|||
|chunkFilename|指定模块的名字|string|`'[id].js'`|优先级小于`output.filename`||
|chunkFormat|指定模块的规范|string|`'array-push' (web/webworker) | 'commonjs' | 'module' | <any string>`|||
|chunkLoadTimeout|请求过期的毫秒值|number|12000 (ms)|||
|chunkLoadingGlobal|wp加载模块时的全局变量|string|-|||
|chunkLoading|加载模块的方式|string|`'jsonp' (default) (web) | 'import-scripts' (webworker) | 'require' (sync node) | 'async-node' (async node) | 'import' (esm) | <any string>`|`'jsonp'`||
|clean|是否清除以前的打包结果|boolean|-|5.20.0+||
|clean.dry||||||
|clean.keep||||||
|compareBeforeEmit|是否比对已经打包好的内容|boolean|true|||
|crossOriginLoading|只工作在target=web时。使用jsonp加载。|boolean / string|false|'use-credentials' / 'anonymous'||
|devtoolFallbackModuleFilenameTemplate||||||
|devtoolModuleFilenameTemplate||||||
|devtoolNamespace|devtoolModuleFilenameTemplate的模块的全名空间|||||
|enabledChunkLoadingTypes||||||
|enabledLibraryTypes|可以用于入口的包的书写规范。|string|-|||
|enabledWasmLoadingTypes|为入口文件设置wasm loading type|string||||
|environment||||||
|filename|为每个出口文件定义名字|string|-|`[fullhash] [id] [name] [chunkhash] [ontenthash] ...`||
|globalObject|当libraryTarget=umd时，定义全局变量对象|string|'self'|||
|hashDigest|指定使用哪种hash|string|'hex'|||
|hashDigsetLength|hash的长度|number|20|||
|hashFunction|指定hash算法|string|md4|||
|hashSalt||||||
|hotUpdateChunkFilename|热更新的chunk文件名|string|`'[id].[fullhash].hot-update.js'`|||
|hotUpdateGlobal|只在target为web时有效。使用jsonp方式异步加载。|string||||
|hotUpdateMainFilename|自定义热更新文件名|string|`'[runtime].[fullhash].hot-update.json'`|||
|iife|是否使用iife方法包裹|boolean|true|||
|importFuntionName|引入代码的方法|string|`'import'`|||
|library|打包为库的输出|string / string[] / object||||
|library.name||||||
|library.type|string|'var'|'module', 'assign', 'assign-properties', 'this', 'window', 'self', 'global', 'commonjs', 'commonjs2', 'commonjs-module', 'commonjs-static', 'amd', 'amd-require', 'umd', 'umd2', 'jsonp' and 'system',|||
|export|指定输出点|string / string[]|-|`['default', 'subModule']`||
|libray.auxiliaryComment||||||
|library.umdNamedDefine|（好像与amd/umd有关）|||||
|path|指定输出的绝对路径|string|`path.join(process.cwd(), 'dist')`|||
|pathinfo|是否把模块的信息包含在打包结果中。|boolean/string|true / 'verbose'||不要在生产时使用|
|publicPath|指定公开路径。浏览器可访问的路径。|function / string|当target是web/webworker时，默认为'auto'|||
|scriptType|为script标签设置type属性。用于自定义异步加载脚本|string/boolean|'module'|'text/javascript' / false||
|sourceMapFilename|指定source map文件的名字。|string|`'[file].map[query]'`|`[name], [id], [fullhash], [chunkhash]`||
|sourcePrefix|定义在chunk块中每一行的前缀|string|''|||
|strictModuleErrorHandling||||||
|trustedTypes||||||
|uniqueName|用于避免全局冲突|string||||
|wasmLoading|指定加载wasm模块的方法。|boolean / string|false / 'fetch'(web/webworker) / 'async-node'|||
|workerChunkLoading|指定加载working的方法|string / boolean|'require' / 'import-scripts' / 'async-node' / 'import' / 'universal'/ false|||

## Module
定义如何对待不同类型的module

|module的选项|说明|type|default|||
|-|-|-|-|-|-|
|generator|控制所有的生产选项|||||
|generator.dataUrl|指定生产ur的方法|object / function|`{ encoding string = 'base64' | false, mimetype string = undefined | false } function (content, { filename, module }) => string`|||
|generator.emit||||||
|generator.filename||||||
|generator.publicPath|为资源设置自定义的publicPath|string / function||||
|generator.outputPath||||||
|parser|控制所有的解析选项|||||
|parser.javascript|指定如何解析js|||||
|parser.javascript.commonjsMagicCommonts|是否支持逻辑注释。（wp写的）|||||
|parser.javascript.dynamicImportMode|为动态引入指定全局的模式属性|string|'eager' / 'weak' / 'lazy' / 'lazy-once'|||
|parser.javascript.dynamicImportPrefetch|为动态引入指定全局的prefetch|number / boolean||||
|parser.javascript.dynamicImportPreload|为动态引入指定全局的preload|||||
|parser.javascript.exportsPresence|当遇到非法的输出名字是如何提示信息。作用于import/exports|string / boolean|'error' / 'warn' / 'auto' / false|||
|parser.javascript.importExportsPresence|作用于import|||||
|parser.javascript.importMeta|是否可以使用`import.meta`|||||
|parser.javascript.importMetaContext|是否可以使用`import.meta.webpackContext`|||||
|parser.javascript.reexportExportsPresence||||||
|parser.javascript.url|是否解析`new URL()`|boolean / string|true / 'relative'|||
|parser.amd|||||
|parser.commonjs|||||
|parser.system|||||
|parser.harmony|不会||||
|parser.requireInclude|是否可使用require.include||||
|parser.requireEnsure|||||
|parser.requireContext|||||
|parser.browserify|||||
|parser.requireJs|是否可使用requirejs.*||||
|parser.node|||||
|parser.commonjsMagicComments|||||
|parser.node: {....}|||||
|parser.worker|||||
|parser.dataUrlCondition|若小于maxSize，则使用base64编码放在原来的文件中，否则创建一个相应的文件放在输出目录中。|object / function(source, {filename, module} => boolean)|{maxSize: 8096}|这个数比较奇怪。4096、8192|
|noParse|指定不解析的部分。（一般该部分没有引入东西，import/require/...）|RegExp / function(resource) / string||`noParse: /jquery|lodash/`||
|unsafeCache|指定如何处理缓存|boolean/ function(module)||||
|rules|处理模块的规则。可包括：loader/parser/...|{}[]||||
||rule.enforce|不会||||
||rule.exclude|不能与rule.resource一起使用。||||
||rule.include|不能与rule.resource一起使用。||||
||rule.issuer|||||
||rule.issuerLayer|||||
||rule.layer|||||
||rule.loader|指定loader|string / string[]|||
||rule.mimetype|||||
||rule.oneOf|任一匹配规则||||
||rule.resource|匹配规则||||
||rule.resourceQuery|||||
||rule.scheme|||||
||rule.sideEffects|||||
||rule.test|匹配断言。不能与rule.resource一起使用|string / regexp / function / condition[] / object: {add?: condition, or?: condition, not?: condition}|||
||rule.type|指定文件类型|string|`'javascript/auto' | 'javascript/dynamic' | 'javascript/esm' | 'json' | 'webassembly/sync' | 'webassembly/async' | 'asset' | 'asset/source' | 'asset/resource' | 'asset/inline'`||
||rule.use|指定loader||||
||rule.resolve|||||
||rule.resolve.fullySpecified|||||

rule conditions  
- resource  资源  
- issuer    发起者  

rule results  
只对满足rule conditions的文件处理。  
- 调用loader  
- 使用解析  

nested rule 
其下包括rules/oneof  
当满足parent rule时执行  
- the parent rule  
- rules  
- oneof  

## resolve
设置wp如何解决自己写的modules  
一般使用默认的。  
有好多为package.json的字段设置的选项。真要是都用上，说明这个包写的太不规范了。若把包写规范了。不用上这些字段。  

|resolve的选项|说明|type|default|||
|-|-|-|-|-|-|
|alias|别名，指定绝对路径||||与esbuild中的define差不多|
|aliasFields||||||
|cacheWithContext|是否使用缓存|boolean||||
|conditionNames|定义为exports字段设置|string[]|-|`resolve.conditionNames: ['require', 'node']`||
|descriptionFiles|指定说明文件。一般默认为package.json|string[]||||
|enforceExtension|是否使用严格扩展名|boolean|false||false更方便一点|
|extensionAlias|为扩展名定义别名。|object|||别名这个东西有多方便就有多烦锁|
|extensions|可扩展名。当引入的文件名中没有扩展名时从此字段中依次尝试取扩展名。|string[]|`['.js', '.json', '.wasm']`|||
|fallback|当解析失败是触发|object||||
|mainFields|主要字段。也是为package.json服务的。|string[]||||
|mainFiles|当引入目录时，引入的文件。|string[]|`['index']`|||
|exportsFields|-|||||
|modules|指定引入的依赖的目录|string[]|`['node_moduels']`|||
|unsafeCache|指定缓存的内容|RegExp[]/boolean|true|当为true时全缓存。||
|useSyncFileSystemCalls|是否使用同步方式处理文件系统|boolean|-|||
|plugins|||||[DirectoryNamedWebpackPlugin](/builder/webpack5/plugin/dirctoryNamedWebpackPlugin.html)|
|preferRelative|是否使用相对路径代替node_modules目录中的文件路径。|boolean|-|||
|preferAbsolute||||||
|symlinks|是否使用本地的软链接|||||
|cachePredicate|是否使用缓存|||||
|restrictions|限制。|`string[]/regexp[]`|-|`resolve.restriction: [/\.(sass|scss|css)/]`||
|roots||||||
|importsFields|-|||||
|byDependency|引入模块的选项。|||||
|resolveLoader||||||

## module & resolve

Module定义解决项目内自己写的代码的方法。  
Resolve定义解决nodemodule里的代码的方法。

## Optimization
设置优化选项。  
依赖mode选项设置此字段。  
需要手动设置  

|optimization的选项|说明|type|default|||
|-|-|-|-|-|-|
|chunkIds|设置计算chunkId的算法。若为false则使用内置的算法。|boolean / string|false|`boolean = false string: 'natural'(按使用的顺序依次增加) | 'named'（可读性好） | 'size'（init时的大小） | 'total-size'（总共的下载大小） | 'deterministic'（在未改变文件时不改变numeric ids，对于较长时间缓存好。一般在生产环境不使用）`||
|concatenateModules|依赖于optimization.providedExports和optimization.usedExports。告诉wp去发现模块图的片段，连接成一个。在生产环境中使用。|boolean||||
|emitOnErrors|在编译时出错是否抛出错误|boolean|false|||
|flagIncludedChunks|是否标记chunk做为别的chunks的子集。在生产环境中使用。|boolean||||
|innerGraph|是否为没用到的输出执行内部图分析|boolean|true|||
|mangleExports|在生产时使用|boolean / string||||
|mangleWasmImports|减小wasm的大小|boolean|false|||
|mergeDuplicateChunks|是否合并相同的chunk|boolean|true|||
|minimize|是否使用压缩代码。|boolean|true|||
|minimizer|设置压缩插件|`[TerserPlugin] and or [function (compiler)]`||||
|moduleIds|与chunkIds差不多|||||
|nodeEnv|设置`process.env.NODE_ENV`|boolean / string||||
|portableRecords|不会|boolean||||
|providedExports|是否`export * from ...`|boolean||||
|realContentHash|是否添加hash|boolean|true|||
|removeAvailableModules|当在所有的父级是存在时，是否移除modules。默认只在生产时使用。|boolean|false|||
|removeEmptyChunks|当chunk是空时，是否删除。|boolean|true|||
|runtimeChunk|不会|object / string / boolean||||
|sideEffects|-|boolean / string||||
|splitChunks|不会|||||
|usedExports|依赖providedExports。指定每个模板的输出。用于优化和代码生成。如：不生成无用输出。最小化死代码。|||||

## plugins
wp打包时使用的插件。  
内置插件是`webpack.[pluginName]`  

|plugins的选项(类型是`[Plugin]`)|说明|type|default|||
|-|-|-|-|-|-|
|||||||

## devServer
这是为 `webpack-dev-server` 提供的设置项。  
`npx webpack serve` 会启动webpack-dev-server  
这个选项与它的包名很对应。  

|devServer的选项|说明|type|default|||
|-|-|-|-|-|-|
|allowedHosts|可访问开发服务的白名单|string[] / 'all' / 'auto'||||
|bonjour|是否使用bonjour开始服务|||||
|client.logging|设置可以在客户端显示日志的级别||'log' / 'info' / 'warn' / 'error' / 'none' / 'verbose'|||
|client.overlay|当有编译错误时，是否全屏遮罩显示错误。|boolean/object|true|||
|client.progess|是否在浏览器中显示打包百分比进度|||||
|client.reconnect|重新链接次数|boolean / number|true|||
|client.webSocketTransport|不会||'ws' / 'sockjs' string|||
|client.webSocketURL|指定web socket server|string / object:{hostname, pathname, password, port, protocol, username}||||
|compress|是否使用gzip压缩|||||
|devMiddleware|为webpack-dev-middleware设置选项|||||
|http2||||||
|https||||||
|headers|设置response的header|||||
|historyApiFallback|是否使用html5 history api|boolean||||
|host||||||
|host|指定host|string|'local-ip' / 'local-ipv4' / 'local-ipv6'|||
|hot|是否启动hmr|boolean|true|||
|ipc|unix环境的host|||||
|liveReload|当文件改变时是否reload/refresh|boolean|true|||
|magicHtml|是否使用magic html routes   不会|boolean|true|||
|onAfterSetupMiddleware|不会|||||
|onBeforeSetupMiddleware|不会|||||
|onListening|当服务开始时执行的方法|||||
|open|启动服务后是否在浏览器打开相应页面|string / boolean / object||||
|port|监听的端口|string / number / 'auto'|'auto'|||
|proxy|设置代理|object:{key: {target, bypass, context(支持多个目标), }} / [object, function]||||
|server|设置服务的访问协议|string / object / 'http' / 'https' / 'spdy'|'http'|||
|setupExitSignals|关闭服务时执行exit在SIGINT / SIGTERM|||||
|setupMiddlewares|提供执行自定义中间的能力|(middlewares, devServer) => {}||||
|static|是否为静态文件提供服务|boolean / string / object [string, object]||||
|static.directory||strgin = path.join(process.cwd(), 'public')||||
|static.redirect|是否可重定向|||||
|static.publicPath||||||
|static.serveIndex||||||
|static.watch||||||
|static.watchFiles||||||
|webSocketServer||||||

## cache
## title
## title
## title
## title
## title