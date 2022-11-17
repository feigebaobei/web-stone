# introduction

## overview

> 把若干小片 js 代码打包成为一个指定规范的大段 js 文件。  
> 可打包为多种规范。  
> 支持 stdin 输入（esbuild 也支持）  
> 选项级 cli > rollup.config.js  
> 推荐使用 esm 规范的 rollup.config.js  
> 该团队未做随便扩张 rollup 的功能。让 rollup 只做 rollup 的事。插件做插件的事。在产品级做到了单一原则。难得呀！  
> 它的 loader 是使用 plugin 实现的。  
> plugin 用于加载文件  
> output.plugin 用于输出是的插件  
> 没有 loader  
> 支持 cli、js、配置文件

## feature

- 把小段代码打包成指定格式的大段代码
- 代码分割（动态引入）
- feature2

## install

`npm i -g rollup`

## quick start

```shell
rollup --help
```

若需求是是：入口为`main.js`，打包为`bundle.js`，规范是`iife`。则可以这样写

```shell
rollup main.js -o bundle.js -f iife # 打包iife规范，方便浏览器使用。
rollup main.js -o bundle.js -f cjs  # 打包为cjs规范，方便node使用。
# commonjs 规范
rollup main.js -o bundle.js -f umd --name "myBundle"
# umd 规范。
# 规范是umd。在browser/node.js中都可使用。
```

`-o`表示输出的文件。
`-f`表示输出的格式。

## 为什么使用 rollup

在 es6 前。每段 js 代码都是独立的，无法与其它 js 代码联系起来。在 es6 之后，可以使用`import / export`输入/输出。可它仍有缺点：只能运行在现代浏览器中。**rollup 可以把小段代码打包成指定格式的大段代码**。支持的格式：esm/commonjs/amd/umd/iife-style/system.

## tree-shaking

- 按需引入。
- 只能用于打包 esm 规范的代码（即使用 import）
- eg: `import {one} from 'pack'`
- rollup 支持静态分析引入的代码，
- 排除不使用的。判断出哪些方法/变量等被使用过，哪些未被使用。在打包后的代码中使用包含被使用到的。

## rollup 的使用方式

- cli
- rollup.config.js
- api

## 兼容性

- 使用插件`@rollup/plugin-commonjs`引入`cjs`规范的代码。

# command link interface（命令行的用法）

rollup 可以使用命令行功能。

## configuration files

rollup 的配置文件是可选的。若使用配置文件会更方便，所以推荐使用配置文件。  
**配置文件的全量字段**
各字段说明，见下文。

```js
// rollup.config.js

// can be an array (for multiple inputs)
export default {
  // core input options
  external,       // 排除的文件
  input, // conditionally required    入口文件
  plugins,        //

  // advanced input options
  cache,                      // 是否缓存已经打好包的文件
  onwarn,                     // 处理warnning的方法
  preserveEntrySignatures,    //
  strictDeprecations,

  // danger zone
  acorn,
  acornInjectPlugins,
  context,
  moduleContext,
  preserveSymlinks,
  shimMissingExports,
  treeshake,

  // experimental
  experimentalCacheExpiry,
  perf,

  // required (can be an array, for multiple outputs)
  output: {
    // core output options
    dir,          // 指定输出目录名。当输出多个文件时必须设置此配置项。
    file,         // 指定输出文件名。输出单个文件时使用。
    format, // required
    globals,       // 指定变量名。format为umd/iife时必填。
    name,           // 指定全局变量名。iife/umd时必填。
    plugins,          // 指定用于输出的插件
                      // 用于如何写打包后的代码。

    // advanced output options
    assetFileNames,   // 定义资源的文件名。
    banner,           //
    chunkFileNames,   // 定义chunk的文件名。在代码分割时会用到
    compact,          // 是否压缩
    entryFileNames,   // 指定入口文件名
    extend,           // 是否扩展全局变量。
    footer,           //
    hoistTransitiveImports,   // 当打包多个chunk时，是否把引入文件提升到入口chunk中引入。
    inlineDynamicImports,     // 当遇到动态引入时是否打包为chunk
    interop,
    intro,
    manualChunks,
    minifyInternalExports,    // 允许创建自定义共享公共块。
    outro,
    paths,                  // 映射external的moduleId到url上。
    preserveModules,
    preserveModulesRoot,
    sourcemap,
    sourcemapBaseUrl,
    sourcemapExcludeSources,
    sourcemapFile,
    sourcemapPathTransform,
    validate,

    // danger zone
    amd,
    esModule,
    exports,
    externalLiveBindings,
    freeze,
    indent,
    namespaceToStringTag,
    noConflict,
    preferConst,
    sanitizeFileName,
    strict,
    systemNullSetters

    dynamicImportInCjs      // 是否在指定输出规范为cjs时把import的引入方式改为require.
    generatedCode           // 指定输出的es版本
      arrowFunctions        // 是否允许输出时使用箭头函数
      constBindings         // 是否把var改变为const
      objectShorthand       // 是否使用短方式在对象上
      preset                // 设置presets
      reservedNamesAsProps  // 是否在对象上的保留字段上使用引号
      symbols               // 是否允许输出symbol
  },

  watch: {
    buildDelay,
    chokidar,
    clearScreen,
    skipWrite,
    exclude,
    include
  },

  makeAbsoluteExternalsRelative,     // 是否把绝对路径转换为相对路径。
};
```

### demo 最基本的配置

```js
// rollup.config.js
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
}

// 在配置文件中有几个必填项
// export default {
// 	input:      // 入口
// 	output: {   // 出口
// 		file:   // 文件名 // 非必填。但是不设置会得不到打包后的文件。
// 		format: // 输出文件的格式
// 	}
// }
```

### demo 多个输出

```js
// rollup.config.js (building more than one bundle)
export default [
  {
    input: 'main-a.js',
    output: {
      file: 'dist/bundle-a.js',
      format: 'cjs',
    },
  },
  {
    input: 'main-b.js',
    output: [
      {
        file: 'dist/bundle-b1.js',
        format: 'cjs',
      },
      {
        file: 'dist/bundle-b2.js',
        format: 'es',
      },
    ],
  },
]
```

### demo 异步输出配置文件

```js
// rollup.config.js
import fetch from 'node-fetch'
export default fetch('/some-remote-service-or-file-which-returns-actual-config')
// or
// export default Promise.all([fetch('get-config-1'), fetch('get-config-2')]);
```

### demo 动态配置

```shell
rollup main.js --config --configDebug
```

```js
// rollup.config.js
import defaultConfig from './rollup.default.config.js'
import debugConfig from './rollup.debug.config.js'
// commandLineArgs可得到命令行中的数据
export default (commandLineArgs) => {
  if (commandLineArgs.configDebug === true) {
    return debugConfig
  }
  return defaultConfig
}
```

- 推荐使用 esm 规范编写配置文件。
- 一般命名为`rollup.config.js`
- 当`output`是数组时，可打包出多个相应输出配置的包。
- 当使用异步配置项时，rollup 会生成一个`Promise<object|array>`。也可以使用`Promise.all([...])`处理成为异步的配置文件。
- rollup 使用`-c`/`--config`指定配置文件。
- 若返回一个方法。参数是命令行中的参数组成的对象，返回值是配置文件格式的对象。

配置文件的编写规范：  
||esm|cjs||
|-|-|-|-|
||推荐|支持||
||需要转换|不需要转换||
|命名|`*.js`|`*.cjs`||
|输出|输出默认对象|||
||方便 esm 文件共享|||
||node v13+ 且 `*.mjs`，则不转换。但是入口文件必须是 esm 规范|||
|Esm 比 cjs 好用这么多。请推荐使用 esm。||||

### 配置文件的基本结构

```js
// 待测试
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
// import cssnano from 'cssnano'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprifixer'
import typescript from '@rollup/plugin-typescript'
import strip from '@rollup/plugin-strip'
export default [
  {
    input: ['index.js'],
    output: [
      {
        dir: 'dist',
        // entryFileNames: [name].js,
        assetFileNames: '[name]-[hash][extend]',
        chunkFileNames: '[name]-[hash].js',
        format: 'esm',
        sourcemap: true,
        compact: false,
        plugins: [terser()],
        preserveModules: true, // 保留目录结构
        preserveModulesRoot: 'src', // 将保留的模块目录结构放在根目录下该路径下
      },
      // {
      //   dir: 'dist',
      //   format: 'umd',
      //   name: 'umdModuleName',
      //   sourcemap: true,
      // }
    ],
    external: ['react'], // 指定不打包的包。
    plugins: [
      nodeResolve(), // 加载node_modules是的文件
      commonjs(), // 使rollup支持打包cjs规范的代码
      postcss({
        // v3版本的postcss插件
        plugins: [
          autoprefixer(),
          // cssnano() // 压缩css文件
        ],
        // extract: 'css/index.css' // 抽离为单独的css文件
      }),
      typescript(), // 使其可打包ts文件
      strip(), // 删除开发、测试代码。
    ],
  },
]
```

### differences to the javascript api

这里没说清楚  
与 js api 的不同。
配置文件不能被其他打包工具去结合使用。现在可以在脚本中以编程方式调用 rollup.  
|config|js api||
|-|-|-|
||`rollup.rollup(obj)`其参数必须是`object`，且不能包裹`promise/function`。||
|不再需要配置项组成的数组，需要为每一个`inputOptions`执行一次`rollup.rollup`|||
|忽略`output`，请使用`bundle.generate(outputOptions)`/`bundle.write(outputOptions)`生成每个生成项。|||

### loading a configuration from a Node package

rollup 支持从`node_modules`中加载配置项文件。

```
rollup --config node:my-special-config
# 先尝试加载`rollup-config-my-special-config`，若失败则加载`my-special-config`
```

### 使用不需要转换的配置文件

默认 rollup 希望得到`esm`规范的配置文件。然后在需要它时把它转换为`commonjs`规范的文件。转换过程很快。也可以基于 esm 规范很容易分享代码。若希望使用 commonjs 规范的配置文件，请设置扩展名为`*.cjs`。

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
							指定配置文件
-d, --dir <dirname>         Directory for chunks (if absent, prints to stdout)
-e, --external <ids>        Comma-separate list of module IDs to exclude
-f, --format <format>       Type of output (amd, cjs, es, iife, umd, system)
-g, --globals <pairs>       Comma-separate list of `moduleID:Global` pairs
-h, --help                  Show this help message
-i, --input <filename>      Input (alternative to <entry file>)
							指定入口文件
-m, --sourcemap             Generate sourcemap (`-m inline` for inline map)
							生成sourcemap的方式
-n, --name <name>           Name for UMD export
-o, --file <output>         Single output file (if absent, prints to stdout)
							基于 --dir
-p, --plugin <plugin>       Use the plugin specified (may be repeated)
							指定插件
-v, --version               Show version number
-w, --watch                 Watch files in bundle and rebuild on changes
							启动观察模式
--amd.id <id>               ID for AMD module (default is anonymous)
--amd.autoId                Generate the AMD ID based off the chunk name
--amd.basePath <prefix>     Path to prepend to auto generated AMD ID
--amd.define <name>         Function to use in place of `define`
--assetFileNames <pattern>  Name pattern for emitted assets
--banner <text>             Code to insert at top of bundle (outside wrapper)
--chunkFileNames <pattern>  Name pattern for emitted secondary chunks
							代码块的名字的第二部分模式
--compact                   Minify wrapper code
--context <variable>        Specify top-level `this` value
							代码中的上下文环境变量
--entryFileNames <pattern>  Name pattern for emitted entry chunks
							xxx不会
--environment <values>      Settings passed to config file (see example)
							为process.env对象设置值
--no-esModule               Do not add __esModule property
--exports <mode>            Specify export mode (auto, default, named, none)
--extend                    Extend global variable defined by --name
--no-externalLiveBindings   Do not generate code to support live bindings
--failAfterWarnings         Exit with an error if the build produced warnings
							在构建时若出错警告是否当作错误处理
--footer <text>             Code to insert at end of bundle (outside wrapper)
--no-freeze                 Do not freeze namespace objects
--no-hoistTransitiveImports Do not hoist transitive imports into entry chunks
--no-indent                 Don't indent result
							不缩进
--no-interop                Do not include interop block
							不会
--inlineDynamicImports      Create single bundle when using dynamic imports
--intro <text>              Code to insert at top of bundle (inside wrapper)
--minifyInternalExports     Force or disable minification of internal exports
--namespaceToStringTag      Create proper `.toString` methods for namespaces
--noConflict                Generate a noConflict method for UMD globals
--outro <text>              Code to insert at end of bundle (inside wrapper)
--preferConst               Use `const` instead of `var` for exports
--no-preserveEntrySignatures Avoid facade chunks for entry points
--preserveModules           Preserve module structure
							维持模块结构
--preserveModulesRoot       Put preserved modules under this path at root level
--preserveSymlinks          Do not follow symlinks when resolving files
--shimMissingExports        Create shim variables for missing exports
--silent                    Don't print warnings
							不输出警告
--sourcemapExcludeSources   Do not include source code in source maps
--sourcemapFile <file>      Specify bundle position for source maps
--stdin=ext                 Specify file extension used for stdin input
              支持标准输入的扩展名
--no-stdin                  Do not read "-" from stdin
--no-strict                 Don't emit `"use strict";` in the generated modules
--strictDeprecations        Throw errors for deprecated features
--systemNullSetters         Replace empty SystemJS setters with `null`
--no-treeshake              Disable tree-shaking optimisations
							不使用treeshake
--no-treeshake.annotations  Ignore pure call annotations
--no-treeshake.moduleSideEffects Assume modules have no side-effects
--no-treeshake.propertyReadSideEffects Ignore property access side-effects
--no-treeshake.tryCatchDeoptimization Do not turn off try-catch-tree-shaking
--no-treeshake.unknownGlobalSideEffects Assume unknown globals do not throw
--waitForBundleInput        Wait for bundle input files
							等待所有入口都可以得到时打包
--watch.buildDelay <number> Throttle watch rebuilds
--no-watch.clearScreen      Do not clear the screen when rebuilding
							观察模式时不清屏
--watch.skipWrite           Do not write files to disk when watching
--watch.exclude <files>     Exclude files from being watched
--watch.include <files>     Limit watching to specified files
--watch.onStart <cmd>       Shell command to run on `"START"` event
              cmd 是回调命令
--watch.onBundleStart <cmd> Shell command to run on `"BUNDLE_START"` event
--watch.onBundleEnd <cmd>   Shell command to run on `"BUNDLE_END"` event
--watch.onEnd <cmd>         Shell command to run on `"END"` event
--watch.onError <cmd>       Shell command to run on `"ERROR"` event
--validate                  Validate output


--configPlugin              可能它也是一个选项。用于指定配置文件的插件。
```

### demo -p, --plugin

```shell
rollup -i input.js -f es -p ./my-plugin.js
rollup -i input.js -f es -p @rollup/plugin-node-resolve
rollup -i input.js -f es -p node-resolve
rollup -i input.js -f es -p '{transform: (c, i) => `\n${c}`}'
rollup -i input.js -f es -p commonjs,json
rollup -i input.js -f es -p 'terser={output: {beautify: true, indent_level: 2}}'
```

### demo --configPlugin

```shell
rollup --config rollup.config.js --configPlugin @rollup/plugin-typescript
```

```json
// tsconfig.json
{
	...
	"include": ["src/**/*", "rollup.config.js"]
}
```

# js api

为 node.js 使用 rollup

```ts
rollup.rollup(inputOptions) => Promise<bundle>
rollup.watch(watchOptions) => watcher
watcher.on('event', event => {...})

interface inputOptions {
  // core input options
  external;
  input; // conditionally required
  plugins;
  // advanced input options
  cache;
  onwarn;
  preserveEntrySignatures;
  strictDeprecations;
  // danger zone
  acorn;
  acornInjectPlugins;
  context;
  moduleContext;
  preserveSymlinks;
  shimMissingExports;
  treeshake;
  // experimental
  experimentalCacheExpiry;
  perf;
}
interface outputOptions {
  // core output options
  dir,
  file,
  format, // required
  globals,
  name,
  plugins,
  // advanced output options
  assetFileNames,
  banner,
  chunkFileNames,
  compact,
  entryFileNames,
  extend,
  externalLiveBindings,
  footer,
  hoistTransitiveImports,
  inlineDynamicImports,
  interop,
  intro,
  manualChunks,
  minifyInternalExports,
  outro,
  paths,
  preserveModules,
  preserveModulesRoot,
  sourcemap,
  sourcemapExcludeSources,
  sourcemapFile,
  sourcemapPathTransform,
  validate,
  // danger zone
  amd,
  esModule,
  exports,
  freeze,
  indent,
  namespaceToStringTag,
  noConflict,
  preferConst,
  sanitizeFileName,
  strict,
  systemNullSetters
}
interface watchOptions {
}
interface bundle {

}
```

## usage

```js
import { rollup } from 'rollup'
rollup(inputOptions).then((bundle) => {
  bundle.generate(outputOptions) // 在内存中生成打包结果
  bundle.write() // 把打包结果写入硬盘
})
```

## type 类型

```ts
rollup.rollup: (inputOptions) => Promise<bundle>
type inputOption = {
  // core input options
  external,
  input, // conditionally required
  plugins,

  // advanced input options
  cache,
  onwarn,
  preserveEntrySignatures,
  strictDeprecations,

  // danger zone
  acorn,
  acornInjectPlugins,
  context,
  moduleContext,
  preserveSymlinks,
  shimMissingExports,
  treeshake,

  // experimental
  experimentalCacheExpiry,
  perf
};

type outputOptions = {
  // core output options
  dir,
  file,
  format, // required
  globals,
  name,
  plugins,

  // advanced output options
  assetFileNames,
  banner,
  chunkFileNames,
  compact,
  entryFileNames,
  extend,
  externalLiveBindings,
  footer,
  hoistTransitiveImports,
  inlineDynamicImports,
  interop,
  intro,
  manualChunks,
  minifyInternalExports,
  outro,
  paths,
  preserveModules,
  preserveModulesRoot,
  sourcemap,
  sourcemapExcludeSources,
  sourcemapFile,
  sourcemapPathTransform,
  validate,

  // danger zone
  amd,
  esModule,
  exports,
  freeze,
  indent,
  namespaceToStringTag,
  noConflict,
  preferConst,
  sanitizeFileName,
  strict,
  systemNullSetters
};
const watchOptions = {
  ...inputOptions,
  output: [outputOptions],
  watch: {
    buildDelay,
    chokidar,
    clearScreen,
    skipWrite,
    exclude,
    include
  }
};
```

## watch

```js
let rollup = require('rollup')
let watchOptions = {...}
let watcher = rollup.watch(watchOptions)
watcher.on('event', event => {
	// event.code
	// 	START			全部开始
	// 	BUNDLE_START	开始打包每个个体文件
	// 	BUNDLE_END		打包完每一个个体文件
	// 	END				全部结束
	// 	ERROR			打包时出现的错误
})
watcher.on('event', ({result}) => {
	if (result) {
		result.close()
	}
})
watcher.close() // 停止监听
```

# es module syntax

就正常使用就行。

# tutorial

示例请看 setup

## using plugins

```shell
npm i -D @rollup/plugin-json
```

```js
import { version } from '../package.json'
export default function () {
  console.log('version', version)
}
```

```js
// rollup.config.js
import json from '@rollup/plugin-json'
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  plugins: [json()],
}
```

```shell
npm run build
# "build": "rollup -c"
```

### 常用插件列表

- [awesome](https://github.com/rollup/awesome) 功能功能功能功能
- [@rollup/plugin-node-resolve]() 找到外部依赖（在 node_modules 中找）
- [@rollup/plugin-commonjs]() 把 cjs 转换为 esm。使 rollup 可以打包 cjs 规范的代码
- [@rollup/plugin-babel]() 转换 js 代码的版本
- [@rollup/plugin-json]() 把 json 转换为 esm
- [@rollup/plugin-data-uri]() 以 data uri 的形式引入资源
- [@rollup/plugin-html]() 创建一个 html 文件为 rollup 打包服务
- [@rollup/plugin-typescript]() 使 rollup 可以打包 ts 文件。
- [@rollup/plugin-yaml]() yarm => esm
- [@rollup/plugin-strip]() 用于从代码中删除 debugger 语句和函数。包括 assert.equal、console.log 等等。
- [rollup-plugin-postcss]() 默认支持 scss、less、stylus
- [autoprefixer]() 添加样式的前缀
- [cssnano]() css 压缩。有压缩功能的包太多了，不一定非要用它。
- [@rollup/plugin-strip]() 删除 debugger/console.log/assert.equal 等
- [rollup-plugin-node-externals]() 好像是排出打包项的插件
- [@rollup/plugin-node-resolve]() 功能功能功能功能
- [@rollup/plugin-node-resolve]() 功能功能功能功能
- [@rollup/plugin-node-resolve]() 功能功能功能功能

## 代码分割

动态引入、多入口会触发代码分割。

- 自动代码分割
- `output.manualChunks`
- `output.chunkFileNames`
- `output.entryFileNames`
- 动态加载时分使用代码分割

```js
export default function () {
  import('./file.js').then(({ default: file }) => {
    console.log(file)
  })
}
```

# [插件](/builder/rollup/plugin/index.html)

插件部分的文档写的一团糟。还得让我去看 rollup 的源码、插件的源码。

- Rollup 的运行逻辑是什么，如何与插件合作？
- 插件 demo 的功能是什么？定出具体代码。
- 各钩子的运行顺序。
- 各钩子的 api（包括：参数、返回值）

# plugin development

# [frequently asked questions](/builder/rollup/qas.html)

# integrating rollup with other tools

## 同等依赖

external 不打包

## babel

## gulp

## deno

# big list of options

## core functionality

### external

```ts
Type: (string | RegExp)[] | RegExp | string | (id: string, parentId: string, isResolved: boolean) => boolean
CLI: -e/--external <external-id,another-external-id,...>
```

指定不打包的包

### input

```ts
Type: string | string [] | { [entryName: string]: string }
CLI: -i/--input <filename>
```

指定入口文件。若为多入口，则多出口。

### output.dir

```ts
Type: string
CLI: -d / --dir<dirname>
```

出口的目录

### output.file

```ts
Type: string
CLI: -o / --file<filename>
```

出口的文件

### output.format

```ts
Type: string
CLI: -f/--format <formatspecifier>
Default: "es"
enum: amd
      cjs
      es      适用于bundler / <script type="module">
        别名为 esm / module
      iife      自执行函数
      umd
      system    原生格式 Native format of the SystemJS loader (alias: systemjs)
        别名为 systemjs
```

指定输出规范

### output.globals

```ts
Type: { [id: string]: string } | ((id: string) => string)
CLI: -g/--globals <external-id:variableName,another-external-id:anotherVariableName,...>
```

指定包的全局变量名。用于 umd/iife 规范。

```js
// 告诉rollup全局变量是jquery，并且与全局变量$相等。
export default {
  ...
  external: ['jquery'],
  output: {
    format: 'iife',
    name: "myBundle",
    globals: {
      jquery: '$'
    }
  }
}
```

### output.name

```ts
Type: string
CLI: -n / --name<variableName>
```

指定全局变量名。
iife/umd 的必填项。

### output.plugins

```ts
Type: OutputPlugin | (OutputPlugin | void)[]
```

输出时使用的插件

### plugin

```ts
Type: Plugin | (Plugin | void)[]
```

引入时使用的插件

## advanced funcitonality

### cache

```js
Type: RollupCache | false
```

在观察模式时会默认使用缓存。

### makeAbsoluteExternalsRelative

```js
Type: boolean | 'ifRelativeSource'
CLI: --makeAbsoluteExternalsRelative / --no - makeAbsoluteExternalsRelative
Default: 'ifRelativeSource'
```

是否把绝对路径转换为相对路径。
'ifRelativeSource' 把使用相对链接引入的文件使用相对链接输出。

### maxParallelFileOps

```js
Type: number
CLI: --maxParallelFileOps <number>
Default: 20
```

最大并行打包的文件数量。

### onwarn

```js
Type: (warning: RollupWarning, defaultHandler: (warning: string | RollupWarning) => void) => void;
```

提供一个方法处理警告信息。若使用`--silent`则不显示警告。

### output.assetFileNames

```js
Type: string | ((assetInfo: AssetInfo) => string)
CLI: --assetFileNames <pattern>
Default: "assets/[name]-[hash][extname]"
```

设置资源的文件名

- [extname] 有点开头的扩展名
- [ext] 无点开头的扩展名
- [hash] 基于文件名与内容的散列值
- [name] 不包含扩展名的文件名

### output.banner/output.footer

```js
Type: string | (() => string | Promise<string>)
CLI: --banner/--footer <text>
```

为文件内容设置前缀、后缀。

### output.chunkFileNames

```js
Type: string | ((chunkInfo: ChunkInfo) => string)
CLI: --chunkFileNames <pattern>
Default: "[name]-[hash].js"
```

指定使用代码分割时文件的模板。

- [format] 在 output 指定渲染格式
- [hash] 基于内容和内容的依赖的散列值
- [name] chuck 的名字

### output.compact

```js
Type: boolean
CLI: --compact / --no - compact
Default: false
```

是否压缩

### output.dynamicImportInCjs

```js
Type: boolean
CLI: --dynamicImportInCjs / --no - dynamicImportInCjs
Default: true
```

现在的 node 版本已经支持 import 引入方式了。  
是否在指定输出规范为 cjs 时把 import 的引入方式改为 require

### output.entryFileNames

```js
Type: string | ((chunkInfo: ChunkInfo) => string)
CLI: --entryFileNames <pattern>
Default: "[name].js"
```

指定入口文件的文件名模板

- [format]
- [hash]
- [name]

### output.extend

```js
Type: boolean
CLI: --extend / --no - extend
Default: false
```

是否扩展全局变量。

```js
// true
global.name = global.name || {}
// false
global.name = {} // 可能被覆盖（重写）
```

### output.externalImportAssertions

```js
Type: boolean
CLI: --externalImportAssertions / --no - externalImportAssertions
Default: true
```

当输出格式为 esm 时，是否添加引入断言。

### output.generatedCode

```js
Type: "es5" | "es2015" | { arrowFunctions?: boolean, constBindings?: boolean, objectShorthand?: boolean, preset?: "es5" | "es2015", reservedNamesAsProps?: boolean, symbols?: boolean }
CLI: --generatedCode <preset>
Default: "es5"
```

设置生成代码的版本

- es5 不使用 es2015+的功能。如箭头函数。
- es2015 使用 es2015 版本

### output.generatedCode.arrowFunctions

```js
Type: boolean
CLI: --generatedCode.arrowFunctions / --no - generatedCode.arrowFunctions
Default: false
```

### output.generatedCode.constBindings

```js
Type: boolean
CLI: --generatedCode.constBindings / --no - generatedCode.constBindings
Default: false
```

### output.generatedCode.objectShorthand

```js
Type: boolean
CLI: --generatedCode.objectShorthand / --no - generatedCode.objectShorthand
Default: false
```

是否使用对象短赋值。

### output.generatedCode.preset

```js
Type: "es5" | "es2015"
CLI: --generatedCode <value>
```

### output.generatedCode.reservedNamesAsProps

```js
Type: boolean
CLI: --generatedCode.reservedNamesAsProps / --no -
  generatedCode.reservedNamesAsProps
Default: false
```

### output.generatedCode.symbols

```js
Type: boolean
CLI: --generatedCode.symbols / --no - generatedCode.symbols
Default: false
```

是否可以使用 symbol

### output.hoistTransitiveImports

```js
Type: boolean
CLI: --hoistTransitiveImports / --no - hoistTransitiveImports
Default: true
```

当打包多个 chunk 时，是否把引入文件提升到入口 chunk 中引入。

### output.inlineDynamicImports

```js
Type: boolean
CLI: --inlineDynamicImports/--no-inlineDynamicImports Default: false
```

当遇到动态引入时是否打包为 chunk

### output.interop

```js
Type: "auto" | "esModule" | "default" | "defaultOnly" | boolean | ((id: string) => "auto" | "esModule" | "default" | "defaultOnly" | boolean)
CLI: --interop <value>
Default: true
```

不会

### output.intro/output.outro

```js
Type: string | (() => string | Promise<string>)
CLI: --intro/--outro <text>
```

设置代码。

### output.manualChunks

```js
Type: { [chunkAlias: string]: string[] } | ((id: string, {getModuleInfo, getModuleIds}) => string | void)
```

允许创建自定义共享公共块。

### output.minifyInternalExports

```js
Type: boolean
CLI: --minifyInternalExports/--no-minifyInternalExports
Default: true for formats es and system or if output.compact is true, false otherwise
```

es / system / output.compact: true 时使用一个字母输出变量。

### output.paths

```js
Type: { [id: string]: string } | ((id: string) => string)
```

映射 external 的 moduleId 到 url 上。

```js
external: ['d3'],
output: {
  ...
  paths: {
    d3: 'https://d3js.org/d3.v4.min'
  }
}
```

### output.preserveModules

```js
Type: boolean
CLI: --preserveModules / --no - preserveModules
Default: false
```

尽量使用原本文件名。保持原来的目录结构。（rollup 默认会创建较小数量的 chunck）

### output.preserveModulesRoot

```js
Type: string
CLI: --preserveModulesRoot <directory-name>
```

保留目录结构的所有模块在的目录。

### output.sourcemap

```js
Type: boolean | 'inline' | 'hidden'
CLI: -m / --sourcemap / --no - sourcemap
Default: false
```

### output.sourcemapBaseUrl

```js
Type: string
CLI: --sourcemapBaseUrl <url>
```

默认生成 sourcemap 的相对 url.

### output.sourcemapExcludeSources

```js
Type: boolean
CLI: --sourcemapExcludeSources / --no - sourcemapExcludeSources
Default: false
```

### output.sourcemapFile

```js
Type: string
CLI: --sourcemapFile <file-name-with-path>
```

### output.sourcemapPathTransform

```js
Type: (relativeSourcePath: string, sourcemapPath: string) => string
```

### output.validate

```js
Type: boolean
CLI: --validate / --no - validate
Default: false
```

### preserveEntrySignatures

```js
Type: "strict" | "allow-extension" | "exports-only" | false
CLI: --preserveEntrySignatures <strict|allow-extension>/--no-preserveEntrySignatures
Default: "strict"
```

### strictDeprecations

```js
Type: boolean
CLI: --strictDeprecations / --no - strictDeprecations
Default: false
```

## danger zone

### acorn

```js
Type: AcornOptions
```

### acornInjectPlugins

```js
Type: AcornPluginFunction | AcornPluginFunction[]
```

### context

```js
Type: string
CLI: --context <contextVariable>
Default: undefined
```

### moduleContext

```js
Type: ((id: string) => string) | { [id: string]: string }
```

### output.amd

```js
Type: { id?: string, autoId?: boolean, basePath?: string, define?: string }
```

### output.amd.id

```js
Type: string
CLI: --amd.id <amdId>
```

### output.amd.autoId

```js
Type: boolean
CLI: --amd.autoId
```

### output.amd.basePath

```js
Type: string
CLI: --amd.basePath
```

### output.amd.define

```js
Type: string
CLI: --amd.define <defineFunctionName>
```

### output.esModule

```js
Type: boolean
CLI: --esModule / --no - esModule
Default: true
```

### output.exports

```js
Type: string
CLI: --exports <exportMode>
Default: 'auto'
```

### output.externalLiveBindings

```js
Type: boolean
CLI: --externalLiveBindings / --no - externalLiveBindings
Default: true
```

### output.freeze

```js
Type: boolean
CLI: --freeze / --no - freeze
Default: true
```

### output.indent

```js
Type: boolean | string
CLI: --indent / --no - indent
Default: true
```

### output.noConflict

```js
Type: boolean
CLI: --noConflict / --no - noConflict
Default: false
```

### output.preferConst

```js
Type: boolean
CLI: --preferConst / --no - preferConst
Default: false
```

### output.sanitizeFileName

```js
Type: boolean | (string) => string
CLI: --sanitizeFileName/no-sanitizeFileName Default: true
```

### output.strict

```js
Type: boolean
CLI: --strict / --no - strict
Default: true
```

### output.systemNullSetters

```js
Type: boolean
CLI: --systemNullSetters / --no - systemNullSetters
Default: false
```

### preserveSymlinks

```js
Type: boolean
CLI: --preserveSymlinks
Default: false
```

### shimMissingExports

```js
Type: boolean
CLI: --shimMissingExports / --no - shimMissingExports
Default: false
```

### treeshake

```js
Type: boolean | "smallest" | "safest" | "recommended" | { annotations?: boolean, correctVarValueBeforeDeclaration?: boolean, moduleSideEffects?: ModuleSideEffectsOption, preset?: "smallest" | "safest" | "recommended", propertyReadSideEffects?: boolean | 'always', tryCatchDeoptimization?: boolean, unknownGlobalSideEffects?: boolean }
CLI: --treeshake/--no-treeshake
Default: true
```

### treeshake.annotations

```js
Type: boolean
CLI: --treeshake.annotations / --no - treeshake.annotations
Default: true
```

### treeshake.correctVarValueBeforeDeclaration

```js
Type: boolean
CLI: --treeshake.correctVarValueBeforeDeclaration / --no -
  treeshake.correctVarValueBeforeDeclaration
Default: false
```

### treeshake.moduleSideEffects

```js
Type: boolean | "no-external" | string[] | (id: string, external: boolean) => boolean
CLI: --treeshake.moduleSideEffects/--no-treeshake.moduleSideEffects/--treeshake.moduleSideEffects no-external
Default: true
```

### treeshake.preset

```js
Type: "smallest" | "safest" | "recommended"
CLI: --treeshake <value>
```

### treeshake.propertyReadSideEffects

```js
Type: boolean | 'always'
CLI: --treeshake.propertyReadSideEffects / --no -
  treeshake.propertyReadSideEffects
Default: true
```

### treeshake.tryCatchDeoptimization

```js
Type: boolean
CLI: --treeshake.tryCatchDeoptimization / --no -
  treeshake.tryCatchDeoptimization
Default: true
```

### treeshake.unknownGlobalSideEffects

```js
Type: boolean
CLI: --treeshake.unknownGlobalSideEffects / --no -
  treeshake.unknownGlobalSideEffects
Default: true
```

## experimental options

### experimentalCacheExpiry

```js
Type: number
CLI: --experimentalCacheExpiry <numberOfRuns>
Default: 10
```

### perf

```js
Type: boolean
CLI: --perf / --no - perf
Default: false
```

## Watch options

```js
Type: { buildDelay?: number, chokidar?: ChokidarOptions, clearScreen?: boolean, exclude?: string, include?: string, skipWrite?: boolean } | false
Default: {}
```

### watch.buildDelay

```js
Type: number
CLI: --watch.buildDelay <number>
Default: 0
```

### watch.chokidar

```js
Type: ChokidarOptions
```

### watch.clearScreen

```js
Type: boolean
CLI: --watch.clearScreen / --no - watch.clearScreen
Default: true
```

### watch.exclude

```js
Type: string | RegExp | (string | RegExp)[]
CLI: --watch.exclude <files>
```

### watch.include

```js
Type: string | RegExp | (string | RegExp)[]
CLI: --watch.include <files>
```

### watch.skipWrite

```js
Type: boolean
CLI: --watch.skipWrite / --no - watch.skipWrite
Default: false
```
