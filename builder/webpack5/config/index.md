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
|assetModuleFilename|为asset module设置打包后的名字|string|`'[hash][ext][query]'`|||
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
|output.export|指定输出点|string / string[]|-|`['default', 'subModule']`||
|output.libray.auxiliaryComment||||||
|output.library.umdNamedDefine|（好像与amd/umd有关）|||||
|output.path|指定输出的绝对路径|string|`path.join(process.cwd(), 'dist')`|||
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
|assetModuleFilename||||||
|assetModuleFilename||||||
|assetModuleFilename||||||
|assetModuleFilename||||||





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