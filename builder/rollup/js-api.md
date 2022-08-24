# overview
rollup为node.js提供了js api。你可以在脚本中使用rollup去打包项目。

# 2个api
## rollup.rollup
```
rollup.rollup(inputOption)
以inputOption为参数去打包，返回bundle对象，该对象包含若干属性/方法。
此方法不会输出打包内容。
```
inputOption:
||||||
|-|-|-|-|-|
|xxx|||||
```
bundle.generate(outputOption)
按outputOption输出打包内容。在内在中。
可被执行多次。
bundle.write()
写入硬盘。
```
当完成打包后，请执行`bundle.close()`。该方法会执行`closeBundle`钩子，清除外部的程序或服务。

### demo
```
// demo
const rullup = require('rollup')
const inputOptions = {...}
const outputOptions = {...}
async function build() {
    const bundle = await rollup.rollup(inputOptions)
    bundle.geenrate(outputOptions)
    await bundle.write(outputOptions)
    await bundle.close()
}
build()
```

### bundle对象
```
bundle: {
  cache: {
    modules: [ [Object], [Object], [Object] ],
    plugins: [Object: null prototype] {}
  },
  closed: false,
  close: [AsyncFunction: close],
  generate: [AsyncFunction: generate],
  watchFiles: [
    '/home/turbo/code/exercise/exRollup/src/main.js',
    '/home/turbo/code/exercise/exRollup/package.json',
    '/home/turbo/code/exercise/exRollup/src/foo.js'
  ],
  write: [AsyncFunction: write]
}
```

### inputOptions
```
{
    external   不打包
    input
    plugins
    cache      缓存上一次打包的内容。可加快下一次打包速度。
    onwarn     在出现warning时打断打包的方法。使用--silent则只提示warning
    preserveEntrySignatures   是否使用与底层模块相同的输出。
    strictDeprecations        严格对待弃用功能。若使用弃用功能，则报错误，不显示警告。
    acorn                     应该被Acorn方法解析的属性。
    acornInjectPlugins        不应该被Acorn方法解析的插件。
    context                   模块的内容。即模块的id。默认为undefined。可明确指定，如windonw
    modulecontext             为每个模块设置id。
    preserveSymlinks          是否保存软链接。true:不解析该软链接。false:把链接到的文件放在此位置。
    shimMissingExports        当引入的文件不存在时是否停止。默认为undefined
    treeshake                 是否使用treeshake
    experimentalCacheExpiry   缓存数据使用多少次
    perf                      是否收集性能参数。
}
```
### outputOptions
```
{
    dir                      设置生成文件的目录，在分块打包时必填。不分块打包时使用file
    file                     设置生成文件的目录，不分块打包时使用。
    format                   生成文件的格式
    globals                  设置id:variableName。当使用umd/iife格式时此项必填。
    name                     本包的名字。umd/iife时使用。
    plugins                  为生成文件时使用的插件。
    assetFileNames           自定义资源目录。
    banner                   生成文件的前缀
    chunkFileNames           自定义生成文件的名字。
    compact                  生成的代码最小，不会修改程序员
    entryFileNames           自定义入口文件的名字
    extend                   在umd/iife格式时是否定义全局变量的名字。
    externalLiveBindings     xxx不会
    footer                   生成文件的后缀
    hoistTransitiveImports   在入口文件中的import是否使用空块。（不理解）
    inlineDynamicImports     是否使用行内动态引入。只在单入口时有用。它会影响执行顺序。
    interop                  如何处理外部依赖
    intro                    生成文件的前缀
    manualChunks             手动模块。用于指定共享模块。例：manualChunks:{lodash: "['lodash']}
    minifyInternalExports    是否在es/system/output.compact:true时把要变量名压缩为一个字母。
    outro                    生成文件的后缀
    paths                    设置外部模块的id对就的地址（url等）。生成的文件中会使用模块id代码模块的地址。
    preserveModules          保护模块。为所有模块创建单独的模块。不是创建尽可能少的模块。以每个模块名作为文件名。必须与output.dir一起使用。
    preserveModulesRoot      xx不会
    sourcemap                如何对行代码地图
    sourcemapExcludeSource   设置不使用代码地图的模块
    sourcemapFile            代码地图的名字
    sourcempaPathTransform   转换代码地图的名字
    validate                 重解析每一个生成的模块，是否是合法的js文件。
    amd                      只能用于单文件打包。不能与autoId/basePath一起使用。
    esModule                 是否为非es格式添加__esModule:true属性。
    exports                  设置生成文件的模式。默认auto，与输入文件的输出模式一样。
    freeze                   是否对命名空间使用Ojbect.freeze()
    indent                   是否缩进
    namespaceToStringTag     设置.toString()方法
    noConflict               xxx不会
    preferconst              优先使用const相对于var
    strict                   是否使用严格模式，在非es时，
    systemNullSetters        中systemjs 6.3.3+时，格式为system。则把setter方法设置为null
```
## rollup.watch
使用`rollup.watch()`监视文档变化后重新打包。cli方式使用监视时请使用`--watch`。执行`event.result.close()`相当于触发`bundle_end`事件。会在`closeBundle`时清空缓存。

### demo
```
const rullup = require('rollup')
const watchOptions = {...}
const watcher = rollup.watch(watchOptions)
watcher.on('event', event => {
    ...
})
// 确保在每个bundle在运行后关闭。
watcher.on('event', ({result}) => {
    if (result) {
        result.close()
    }
})
// stop watch
watcher.close()
```

### event对象
```
event: {
  code: 'BUNDLE_END',
  duration: 33,
  input: './src/main.js',
  output: [ '/home/turbo/code/exercise/exRollup/dist-multiple' ],
  result: {
    cache: { modules: [Array], plugins: [Object: null prototype] },
    closed: false,
    close: [AsyncFunction: close],
    generate: [AsyncFunction: generate],
    watchFiles: [
      '/home/turbo/code/exercise/exRollup/src/main.js',
      '/home/turbo/code/exercise/exRollup/package.json',
      '/home/turbo/code/exercise/exRollup/src/foo.js'
    ],
    write: [AsyncFunction: write]
  }
}
event: { code: 'END' }

```

### watchOptions
```
watchOptions: {
    ...inputOptions,
    output: [outputOptions],
    watch: {
        buildDelay,    被监听的文件被修改后多久后重新打包。
        chokidar,      xxx不会
        clearScreen,   重新打包时是否清空屏幕
        skipWrite,     重新打包后是否路过bundle.write()
        exclude,       指定不监视的文件
        include,       指定监视的文件
    }
}
```

# js-api demo（未完善）
```
let rollup = require('rollup')
let json = require('rollup-plugin-json')
let {terser} = require('rollup-plugin-terser')

let inputOptions = {
    input: './src/main.js', // 相对于执行命令行时的目录
    external: ['lodash'],     // 不打包的模块id
    plugins: [json()]
}
let outputOptionsList = [
    {
        dir: './dist-multiple',
        format: 'cjs',
        // globals: {}
        // name: 
        plugins: [terser()]
    },
    {
        file: './dist/bundle.es.js',
        format: 'es'
    },
    {
        file: './dist/bundle.iife.js',
        format: 'iife',
        globals: {
            myBundle: '$b'
        },
        name: 'myBundle',
        // plugins: [terser()]
    },
    {
        file: './dist/bundle.amd.js',
        format: 'amd'
    },
    {
        file: './dist/bundle.umd.js',
        format: 'umd',
        globals: {                // 只作用于 umd/iife
            myBundle: '$b' 
        },
        name: 'myBundle',         // 只作用于 umd/iife

    },
    {
        file: './dist/bundle.system.js',
        format: 'system'
    }
]
let watchOptions = {
    ...inputOptions,
    output: [outputOptionsList[0]],
    watch: {
        include: './src/main.js'
    }
}

async function build() {
    let bundle = await rollup.rollup(inputOptions)
    // console.log(bundle)
    for (let i = 0; i < outputOptionsList.length; i++) {
        await bundle.write(outputOptionsList[i])
    }
        // await bundle.write(outputOptionsList[0])
}

build()
function wfn() {
    let watcher = rollup.watch(watchOptions)
    watcher.on('event', event => {
        console.log(event)
    })
}
// wfn()

```
