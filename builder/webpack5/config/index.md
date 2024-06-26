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
|static.redirect|是否直接在`/`后面使用pathname|||||
|static.publicPath||||||
|static.serveIndex||||||
|static.watch||||||
|static.watchFiles||||||
|webSocketServer||||||

## cache
|cache的选项|说明|type|default|||
|-|-|-|-|-|-|
|cache|是否缓存打包结果。可用于提高打包速度|boolean / object|false|||
|cache.allowCollectingMemory|只在cache.type为'filesystem'时，收集不使用的内存。生产时使用false.|boolean|false|||
|cache.buildDependencies|缓存依赖。默认缓存所有依赖|object|||`cache.buildDependencies.config = [__filename]`|
|cache.cacheDirectory|只有在cache.type='filesystem'时有效。设置缓存的目录。|string|`node_modules/.cache/webpack`||`cache.cacheDirectory: path.resolve(__dirname, '.temp_cache')`|
|cache.cacheLocation|缓存的location|string|`path.resolve(cache.cacheDirectory, cache.name)`|||
|cache.cacheUnaffected|只能在`cache.type = 'memory'`时有效。缓存没有改变的模块。|boolean|true|||
|cache.compression|在缓存文件中使用压缩文件。一般在开始是不使用缓存。在生产时使用gzip.|boolean / 'gzip' / 'brotli'|false|||
|cache.hashAlgorithm||string|md4|||
|cache.idleTimeout|只能在`cache.type = 'filesystem'`时有效。多长时间后开始缓存|number|60000|||
|cache.idleTimeoutAfterLargeChanges|只能在`cache.type = 'filesystem'`时有效。|number|1000|||
|cache.idleTimeoutForInitialStore|只能在`cache.type = 'filesystem'`时有效。多长时凌后init缓存。|number|5000|||
<!-- |cache.managedPaths|||||| -->
<!-- |cache.snapshot.managedPaths|||||| -->
|cache.maxAge|若缓存文件不被使用，最大缓存多长时间。只能在`cache.type = 'filesystem'`时有效。|number|5184000000|||
|cache.maxGenerations|定义在缓存中存在的文件寿命。1: 删除不使用的单个编译。 Infinity: 一直存在。|number||||
|cache.maxMemoryGenrations||||||
|cache.memoryCacheUnaffected|只能在`cache.type = 'filesystem'`时有效。当模块或模块的引入模块未改变时，缓存计算该模块。|boolean|-|||
|cache.name|只能在`cache.type = 'filesystem'`时有效。指定缓存的名字，不同的名字会同时存在。|string||||
|cache.profile|只能在`cache.type = 'filesystem'`时有效。跟踪并记录模块的信息。|boolean|false|||
|cache.store|指定缓存的数据。pack: 缓存一个单独的文件|string|`'pack'`|||
|cache.type|指定缓存形式|string|`'memory' | 'filesystem'`|||
|cache.version|只能在`cache.type = 'filesystem'`时有效。指定缓存的版本。不同的版本不能重用缓存。|||||

## devtool
控制如何处理source map的选项。  

|devtool的选项|说明|type|default|枚举值||
|-|-|-|-|-|-|
|devtool|提高dubugging速度。会影响打包速度|string / boolean|'eval'|||
|||||(none)||
|||||eval||
|||||eval-cheap-source-map||
|||||eval-cheap-module-source-map||
|||||eval-source-map||
|||||cheap-source-map||
|||||cheap-module-source-map||
|||||source-map||
|||||inline-cheap-source-map||
|||||inline-cheap-module-source-map||
|||||inline-source-map||
|||||eval-nosources-cheap-source-map||
|||||eval-nosources-cheap-module-source-map||
|||||eval-nosources-source-map||
|||||inline-nosources-cheap-source-map||
|||||inline-nosource-cheap-module-source-mpa||
|||||inline-nosource-source-map||
|||||nosource-cheap-source-map||
|||||nosource-cheap-module-source-map||
|||||nosource-source-map||
|||||hidden-nosource-cheap-source-map||
|||||hidden-nosource-cheap-module-source-map||
|||||hidden-nosource-source-map||
|||||hidden-cheap-source-map||
|||||hidden-cheap-module-source-map||
|||||hidden-source-map||

## target
指定打包结果的运行环境。  

|target的选项|说明|type|default|枚举值||
|-|-|-|-|-|-|
|target||string / string[] / boolean|'browserslist' / 'web'|||
|||||async-node[[x],y]||
|||||electron[[x].y]-main||
|||||electron[[x].y]-renderer||
|||||electron[[x].y]-preload||
|||||node[[x].y]||
|||||node-webkit[[x].y]||
|||||nwjs[[x].y]|同上|
|||||web||
|||||webworker||
|||||esX||
|||||browserslist||

## Watch and WatchOption
指定观察模式的选项。  

|watch的选项|说明|type|default|枚举值||
|-|-|-|-|-|-|
|watch|是否启用观察模式。|boolean|false|||
|watchOptions|设置自定义观察选项|object||||
|watchOptions.aggregateTimeout|合并多长时间(ms)内的变化|number|20|||
|watchOptions.ignored|忽略|regexp / string / string[]||||
|watchOptions.poll|多长时间检查一次文件变化|boolean / number||||
|watchOptions.followSymlinks|指定是否观察的link文件|boolean|-|||
|watchOptions.stdin|当stdin stream停止时停止观察|boolean|-|||

## Externals
指定不打包的内容  
|externals的选项|说明|type|default|枚举值||
|-|-|-|-|-|-|
|externals|指定不打包的内容|string / object / function / regexp / [string, object, function, regexp]||||
|externals.byLayer||function / object||||
|externalsType||string|'var'|||
||设置排除项的type默认为'commonjs'|||'commonjs'||
|||||'global'||
|||||'module'||
|||||'node-commonjs'||
|||||'promise'||
|||||'self'||
|||||'script'||
|||||'this'||
|||||'var'||
|||||'window'||
|externalsPresets||||||

```js
externals: 'jquery'
externals: /jquery/
externals: {
  jquery: 'jquery',
  jquery: 'commonjs jquery', // ${externalsType} ${libraryName}
  subract: ['commonjs ./math', 'subtract'] // 以commonjs规范引入./math中的subtract
}
externals: [
  function({
    context,      // 引入的内容
    request,      // 引入的路径
    contextInfo,  // 关于issuer的信息
    getResolve,   // Get a resolve function with the current resolver options.
  }, (err, result, type) => {}),
  ({context, request, contextInfo, getResolve}) => Promise<>
]
```

## Performance
设置wp如何控制资源和入口文件超出文件限制的通知消息。  

|performance的选项|说明|type|default|枚举值||
|-|-|-|-|-|-|
|performance||||||
|performance.assetFilter|控制哪些文件显示要性能提示|function(assetFilename) => boolean||||
|performance.hints|是否抛出提示|string / boolean|'warning'|'error' / 'warning' ||
|performance.maxAssetSize|资源最大值|number|250000|||
|performance.maxEntrypointSize|入口文件的最大值|number|250000|||

## node
为内置的NodeStuffPlugin提供选项。  

|node的选项|说明|type|default|枚举值||
|-|-|-|-|-|-|
|node||boolean / object|false|||
|node.global||||||
|node.__filename||||||
|node.__dirname||||||

## stats
提供了精确控制提示信息的接口。  

|stats的选项|说明|type|default|枚举值||
|-|-|-|-|-|-|
|stats||object / string||`'errors-only' / 'errors-warnings' / 'minimal' / 'none' / 'normal' / 'verbose' / 'detailed' / 'summary'`||
|stats.xx|指定输出特定信息。|||||
|stats.all|指定输出特定信息|||||
|stats.assets|指定如何显示asset的信息|||||
|stats.assetsSort||string|'id'|||
|stats.buildAt|开始build的时间|boolean|true|||
|stats.moduleAssets|是否添加module中资源的add 信息|boolean|true|||
|stats.assetsSpace||number|15|||
|stats.modulesSpace||number|15|||
|stats.chunkModulesSpace||number|10|||
|stats.nestedModules||number|10|||
|stats.cached||||||
|stats.cachedModules|缓存中modules中的信息|boolean|true|||
|stats.runtimeModules||boolean|true|||
|stats.dependentModules||boolean||||
|stats.groupAssetsByChunk||boolean||||
|stats.groupAssetsByEmitStatus||boolean||||
|stats.groupAssetsByExtension||boolean||||
|stats.groupAssetsByInfo||boolean||||
|stats.groupAssetsByPath||boolean||||
|stats.groupModulesByAttributes||boolean||||
|stats.groupModulesByCacheStatus||boolean||||
|stats.groupModulesByExtension||boolean||||
|stats.groupModulesByLayer||boolean||||
|stats.groupModulesByPath||boolean||||
|stats.groupModulesByType||boolean||||
|stats.groupModulesByOrigin||boolean||||
|stats.cachedAssets||boolean|true|||
|stats.child||boolean||||
|stats.chunks||boolean||||
|stats.chunkGroups||boolean||||
|stats.chunkModules||boolean||||
|stats.chunkOrigins||boolean||||
|stats.chunksSort||string|'id'|||
|stats.context||string||||
|stats.colors||boolean / object||||
|stats.depth||boolean||||
|stats.entrypoints||boolean||||
|stats.env||boolean||||
|stats.orphanModules||boolean||||
|stats.errors||boolean||||
|stats.errorDetails||boolean||||
|stats.errorStack||boolean||||
|stats.excludeAssets||boolean||||
|stats.excludeModules||boolean||||
|stats.exclude||boolean||||
|stats.hash||boolean||||
|stats.logging||boolean||||
|stats.chunkModulesSpace||string / boolean|'none'|'none' / 'error' / 'warn' / 'info' / 'log' / 'verbose'||
|stats.logginDebug||array||||
|stats.loggingTrace||boolean||||
|stats.modules||boolean|true|||
|stats.modulesSort||string|'id'|||
|stats.moduleTrace||boolean|true|||
|stats.optimizationBailout||boolean||||
|stats.outputPath||boolean||||
|stats.performance||boolean||||
|stats.preset||boolean||||
|stats.providedExports||boolean||||
|stats.errorsCount|显示错误数量|boolean|true|||
|stats.warningCount||||||
|stats.publicPath||||||
|stats.reasons||||||
|stats.reasonsSpace||||||
|stats.relatedAssets||||||
|stats.source||||||
|stats.timings||||||
|stats.ids||||||
|stats.usedExports||||||
|stats.version||||||
|stats.chunkGroupAuxiliary||||||
|stats.chunkGroupChildren||||||
|stats.chunkGroupMaxAssets||||||
|stats.warnings||||||
|stats.warningsFilter||||||
|stats.chunkRelations||||||

为什么wp把这么多相似的api用这么多boolean选项去控制，而不使用数组等方式。  

排序字段
|'id'|||
|'name'|||
|'size'|||
|'chunks'|||
|'errors'|||
|'warnings'|||
|'field'|||
|'cacheable'|||
|'built'|||
|'prefetched'|||
|'optional'|||
|'identifier'|||
|'index'|||
|'index2'|||
|'profile'|||
|'issuer'|||
|'issuerId'|||
|'issuerName'|||
|'issuerPath'|||

## experiments
使用实验性的功能。  

|experiments的选项|说明|type|default|枚举值||
|-|-|-|-|-|-|
|experiments||boolean|false|||
|experiments.backCompat||||||
|experiments.buildHttp||||||
|experiments.buildHttp.allowedUris|允许的uri|||||
|experiments.buildHttp.cacheLocation||||||
|experiments.buildHttp.frozen||||||
|experiments.buildHttp.lockfileLocation||||||
|experiments.buildHttp.proxy||||||
|experiments.buildHttp.upgrade||||||
|experiments.css||||||
|experiments.cacheUnaffected||||||
|experiments.futureDefaults||||||
|experiments.lazyCompilation||||||
|experiments.outputModule||||||

## other options
- amd
- bail
- dependencies
- ignoreWarnings
- infrastructureLogging
  - appendOnly
  - colors
  - console
  - debug
  - level
  - stream
- loader
  - answer
- name
- parallelism number 100
- profile
- recordsInputPath
- recordsOutputPath
- recordsPath
- snapshot
- buildDependencies
- immutablePaths
- managedPaths
- module
- resolve
- resolveBuildDependencies
