# introduction

## overview
> 把若干小片js代码打包成为一个指定规范的大段js文件。  
> 可打包为多种规范。  

## install

`npm i -g rollup`

## quick start
```shell
rollup --help
```

假设入口是`main.js`，打包为`bundle.js`，规范是`iife`。为了方便浏览器使用。
`-o`表示输出的文件。
`-f`表示输出的格式。
```shell
rollup main.js -o bundle.js -f iife # iife规范
rollup main.js -o bundle.js -f cjs # 为了方便node使用。
# commonjs 规范
rollup main.js -o bundle.js -f umd --name "myBundle"
# umd 规范。
# 规范是umd。在browser/node.js中都可使用。
```

## 为什么使用rollup
在es6前。每段js代码都是独立的，无法与其它js代码联系起来。在es6之后，可以使用`import / export`输入/输出。可它仍有缺点：只能运行在现代浏览器中。rollup可以把小段代码打包成指定格式的大段代码。支持的格式：esm/commonjs/amd/umd/iife-style/system.

## tree-shaking
rollup支持静态分析引入的代码，排除不使用的。判断出哪些方法/变量等被使用过，哪些未被使用。在打包后的代码中使用包含被使用到的。

## rollup的使用方式
- cli
- rollup.config.js
- api

## 兼容性
- 使用插件`@rollup/plugin-commonjs`引入`cjs`规范的代码。
- 





# command link interface

rollup可以使用命令行功能。

## configuration files

rollup的配置文件是可选的。若使用配置文件会更方便，所以推荐使用配置文件。
```
// demo
// rollup.config.js
export default {
	input: 'src/main.js',
	output: {
		file: 'bundle.js',
		format: 'cjs'
	}
}
```
一般配置文件是`*.json`，rollup的配置文件是`*.js`。好特别。
该配置文件一般在项目的根目录，一般命名为`rollup.config.js`
若配置文件是commonjs规范，请使用`require / module.exports`。
`output.format`可控制输出的文件格式。
当`output`是数组时，可打包出多个相应输出配置的包。
当使用异步配置项时，rollup会生成一个`promise`处理它成为一个object/array。也可以使用`Promise.all([...])`处理成为异步的配置文件。
rollup使用`-c`/`--config`指定配置文件。
若返回一个方法。参数是命令行中的参数组成的对象，返回值是配置文件格式的对象。

### overview
在配置文件中有几个必填项
```
export default {
	input:      // 入口
	output: {   // 出口
		file:   // 文件名 // 非必填。但是不设置会得不到打包后的文件。
		format: // 输出文件的格式
	}
}
```

### differences to the javascript api
与js api的不同。
配置文件不能被其他打包工具去打包。现在可以在脚本中以编辑方式调用rollup.
|config|js api||
|-|-|-|
||`rollup.rollup(obj)`其参数必须是`object`，且不能包裹`promise/function`。||
|不再需要配置项组成的数组，需要为每一个`inputOptions`执行一次`rollup.rollup`|||
|忽略`output`，请使用`bundle.generate(outputOptions)`/`bundle.write(outputOptions)`生成每个生成项。|||

### loading a configuration from a Node package

rollup支持从`node_modules`中加载配置项文件。
```
rollup --config node:my-special-config
# 先尝试加载`rollup-config-my-special-config`，若失败则加载`my-special-config`
```
### 使用不需要转换的配置文件
默认rollup希望得到`esm`规范的配置文件。然后在需要它时把它转换为`commonjs`规范的文件。转换过程很快。也可以基于esm规范很容易分享代码。若希望使用commonjs规范的配置文件，请设置扩展名为`*.cjs`。
```
// rollup.config.csj
module.exports = {
	input:..
	output: {...}
}
```

### command line flag

```
-c, --config <filename>     Use this config file (if argument is used but value
                              is unspecified, defaults to rollup.config.js)
-d, --dir <dirname>         Directory for chunks (if absent, prints to stdout)
-e, --external <ids>        Comma-separate list of module IDs to exclude
-f, --format <format>       Type of output (amd, cjs, es, iife, umd, system)
-g, --globals <pairs>       Comma-separate list of `moduleID:Global` pairs
-h, --help                  Show this help message
-i, --input <filename>      Input (alternative to <entry file>)
-m, --sourcemap             Generate sourcemap (`-m inline` for inline map)
-n, --name <name>           Name for UMD export
-o, --file <output>         Single output file (if absent, prints to stdout)
-p, --plugin <plugin>       Use the plugin specified (may be repeated)
-v, --version               Show version number
-w, --watch                 Watch files in bundle and rebuild on changes
--amd.id <id>               ID for AMD module (default is anonymous)
--amd.autoId                Generate the AMD ID based off the chunk name
--amd.basePath <prefix>     Path to prepend to auto generated AMD ID
--amd.define <name>         Function to use in place of `define`
--assetFileNames <pattern>  Name pattern for emitted assets
--banner <text>             Code to insert at top of bundle (outside wrapper)
--chunkFileNames <pattern>  Name pattern for emitted secondary chunks
--compact                   Minify wrapper code
--context <variable>        Specify top-level `this` value
--entryFileNames <pattern>  Name pattern for emitted entry chunks
--environment <values>      Settings passed to config file (see example)
--no-esModule               Do not add __esModule property
--exports <mode>            Specify export mode (auto, default, named, none)
--extend                    Extend global variable defined by --name
--no-externalLiveBindings   Do not generate code to support live bindings
--failAfterWarnings         Exit with an error if the build produced warnings
--footer <text>             Code to insert at end of bundle (outside wrapper)
--no-freeze                 Do not freeze namespace objects
--no-hoistTransitiveImports Do not hoist transitive imports into entry chunks
--no-indent                 Don't indent result
--no-interop                Do not include interop block
--inlineDynamicImports      Create single bundle when using dynamic imports
--intro <text>              Code to insert at top of bundle (inside wrapper)
--minifyInternalExports     Force or disable minification of internal exports
--namespaceToStringTag      Create proper `.toString` methods for namespaces
--noConflict                Generate a noConflict method for UMD globals
--outro <text>              Code to insert at end of bundle (inside wrapper)
--preferConst               Use `const` instead of `var` for exports
--no-preserveEntrySignatures Avoid facade chunks for entry points
--preserveModules           Preserve module structure
--preserveModulesRoot       Put preserved modules under this path at root level
--preserveSymlinks          Do not follow symlinks when resolving files
--shimMissingExports        Create shim variables for missing exports
--silent                    Don't print warnings
--sourcemapExcludeSources   Do not include source code in source maps
--sourcemapFile <file>      Specify bundle position for source maps
--stdin=ext                 Specify file extension used for stdin input
--no-stdin                  Do not read "-" from stdin
--no-strict                 Don't emit `"use strict";` in the generated modules
--strictDeprecations        Throw errors for deprecated features
--systemNullSetters         Replace empty SystemJS setters with `null`
--no-treeshake              Disable tree-shaking optimisations
--no-treeshake.annotations  Ignore pure call annotations
--no-treeshake.moduleSideEffects Assume modules have no side-effects
--no-treeshake.propertyReadSideEffects Ignore property access side-effects
--no-treeshake.tryCatchDeoptimization Do not turn off try-catch-tree-shaking
--no-treeshake.unknownGlobalSideEffects Assume unknown globals do not throw
--waitForBundleInput        Wait for bundle input files
--watch.buildDelay <number> Throttle watch rebuilds
--no-watch.clearScreen      Do not clear the screen when rebuilding
--watch.skipWrite           Do not write files to disk when watching
--watch.exclude <files>     Exclude files from being watched
--watch.include <files>     Limit watching to specified files
--validate                  Validate output

```

### reading a file from stdin






## overview
## overview
## overview
## overview
## overview
## overview


# js api
# es module syntax
# tutorial
1. cli
2. config
3. use plugins
	```
	npm i -D @rollup/plugin-json
	// rollup.config.js
	import json from '@rollup/plugin-json'
	{
		...
		plugins: [json()]
	}
	```
3. use output plugins
	```
	npm i -D rollup-plugin-json
	// rollup.config.js
	import terser from 'rollup-plugin-json'
	{
		...
		output: {
			...
			plugins: [terser()]
		}
	}
	```
4. 代码分离

# plugin development
# frequently asked questions
# integrating rollup with other tools
# troubleshooting
# big list of options
## overview
## overview
## overview
## overview
## overview
## overview
## overview
## use plugin
### @rollup/plugin-commonjs
把commonjs规范的代码打包为esm规范的代码。

```
// install
npm i @rollup/plugin-commonjs -D

// usage
// rollup.config.js
import commonjs from '@rollup/plugin-commonjs'
export default {
	...
	plugin: [commonjs()]
}
```
#### api

##### dynamicRequireTargets
##### exclude
##### include
##### extensions
##### ignoreGlobal
##### sourceMap
##### trasnformMixedEsModules
##### ignore
##### ignoreTryCatch
##### ignoreDynamicRequires
##### esmExternals
##### defaultIsModuleExports
##### requireReturesDefault
#### using with @rollup/plugin-node-resolve
在commonjs后很多引入来自`node_modules`。`@rollup/plugin-node-resolve`可解决来自`node_modules`的问题。
```
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
export default {
	...
	plugin: [resolve(), commonjs()]
}
```
#### usage width symlinks
与软链接一起使用。
软链接一般在一库多包中使用。rollup使用`@rollup/plugin-node-resolve`把解析模块到指定的真实目录。e.g. `../common/node_modules/**` => `node_modules/**`。
```
commonjs({include: /node_modules/})
```

##### dynamicRequireTargets
##### dynamicRequireTargets
##### dynamicRequireTargets
##### dynamicRequireTargets
##### dynamicRequireTargets
##### dynamicRequireTargets
##### dynamicRequireTargets
##### dynamicRequireTargets
##### dynamicRequireTargets
##### dynamicRequireTargets
##### dynamicRequireTargets
##### dynamicRequireTargets
##### dynamicRequireTargets

### @rollup/plugin-node-resolve

## overview
## overview
## overview
## overview
## overview
## overview
## overview


### api
```
// rollup-build.js
let rollup = require('rollup')
let inputOption = require('path/to/input.js')
let outputOpiton = require('path/to/output.js')
let bundle = rollup.rollup(inputOption)         // 生成打包文件
bundle.write(outputOpiton)                      // 根据配置文件输出打包文件。
```
```
// path/to/input.js
module.exports = {
    input: './src/main.js'
}
```
```
// path/to/output.js
module.exports = {
    file: './bundle.js',
    format: 'cjs',
}
```
```
// 执行打包脚本
node rollup-build.js
```
