# esbuild plugin
> esbuild的插件
> 只能与js、go的build api结合使用
> 先去[插件列表](https://github.com/esbuild/community-plugins)找一找，若能找到合适的插件就用不再开发了。
> 使用cjs规范编写
> 插件功能还beta阶段。（v1前有可能变动）

## 概念
||||
|-|-|-|
|namespace|每个模块都有一个关联的命名空间。默认是`file`。使用stdi输入时使用“虚拟模块”。插件可用于创建虚拟模块。||
|filter|满足条件的才能执行回调。||

## 查找

## 使用
```js
// 定义插件
let envPlugin = {
    name: 'env',
    setup(build) {

        build.onResolve()
        build.onLoad()
    }
}
require('esbuild').build({
    entryPoints: ['app.js'],
    bundle: true,
    outfile: 'out.js',
    plugins: [envPlugin], // 把插件传入插件数组
}).catch(() => process.exit(1))
```

## 基本结构
```ts
{
    name: $pluginName
    setup(build) { // 具体的逻辑
        // build 可设置回调方法
        // 解决导入的模板路径时触发
        // 每个模块的每个import对应的文件都调用此方法
        // 用于解析路径
        build.onResolve(options: {
            filter: ExpReg,         // 满足该正则的才能执行该回调。避免执行不需要的回调
            namespace?: string      // 默认值为file
        }, cb: (params: {
            path: string;       // 代码中的原始path
            importer: string;   // 引入当前文件的文件的path。当前文件是入口文件时该字段为''
            namespace: string;  // 
            resolveDir: string; // path所在文件系统中绝对路径
            kind: ResolveKind;  // 引入方式
            pluginData: any;    // 由前一个插件的onLoad方法设置
        }) => {                 // 返回一个自定义路径
            errors?: Message[];     // 
            external?: boolean;     // true 不打包
            namespace?: string;     // 默认为file
            path?: string;          // 用于解析引入的明确路径。若未设置该字段则继续当前回调之后注册的onResolve。然后，如果路径仍然没有解析，esbuild将默认解析相对于当前模块的解析目录的路径。
            pluginData?: any;       // 传递给下一个插件的数据。从onResolve传到onLoad，从onLoad传到onResolve
            pluginName?: string;    // 用于代替plugin的name
            sideEffects?: boolean;  // false，可删除
            suffix?: string;        // 设置后缀
            warnings?: Message[];   // 
            watchDirs?: string[];   // 指定额外的需要scan的文件，用于watch模式
            watchFiles?: string[];  // 指定额外的需要scan的文件，用于watch模式
        })
        // 解析模块前调用。主要是用于处理并返回模块的内容。告知 esbuild 要如何解析它们。
        build.onLoad(options: {
            filter: RegExp,
            namespace?: string,
        }, cb: (params: {
            path: string,       // 已经解析好的绝对路径
            namespace: string,  // 
            suffix: string,     // qs、hash 
            pluginData: any,    // 前一个插件的onResolve方法设置的数据
        }) => { // 返回该模块的内容
            contents?: string | Uint8Array; // 模块的内容
            errors?: Message[];             // 用于输出日志
            loader?: Loader;                // 告诉esbuild应该使用什么loader解释该内容。默认为js
            pluginData?: any;
            pluginName?: string;
            resolveDir?: string;            // 解析好的绝对路径
            warnings?: Message[];           // 用于输出日志
            watchDirs?: string[];
            watchFiles?: string[];
        })
        // 打包开始时触发
        build.onStart(() => {
            // console.log('str')
        })
        // 所有打包结束时触发
        // 可得到打包结果
        build.onEnd((result: { errors: [], warnings: [] }) => {...})
    }
}

type ResolveKind =
  | 'entry-point'       // 入口
  | 'import-statement'  // 使用了import / export
  | 'require-call'      // 使用package.json中的require字段引入
  | 'dynamic-import'    // 
  | 'require-resolve'   // 
  | 'import-rule'       // 使用css @import 规则
  | 'url-token'         // 

interface Message {
  text: string;
  location: Location | null;
  detail: any; // The original error from a JavaScript plugin, if applicable
}

interface Location {
  file: string;
  namespace: string;
  line: number; // 1-based
  column: number; // 0-based, in bytes
  length: number; // in bytes
  lineText: string;
}
```

### 访问build options
在setup方法中可以得到，可查看当前打包配置，也要可以修改后再使用。
```js
let examplePlugin = {
    name: 'str',
    setup(build) {
        let options = build.initialOptions // 得到打包的配置项
        options.define = options.define || {}
        options.define['porcess.env.NODE_ENV'] = options.minify ? 'production' : 'development'
    }
}
```
在`incremental rebuild / watch mode / serve mode`时不更新打包配置。

### resolving paths

### 使用缓存
使打包更快
可缓存在内存、硬盘。





## 开发
- namespaces 不知道做什么的
- filters

## 发布

## 如何与esbuild结合工作
- 传入到build api的一个插件数组中。
- setup会在每个build api中只运行一次。  

## 常用插件列表
- [title](/builder/esbuild/plugin/title.md)
- [title](/builder/esbuild/plugin/title.md)
- [title](/builder/esbuild/plugin/title.md)
- [title](/builder/esbuild/plugin/title.md)
- [title](/builder/esbuild/plugin/title.md)
- [title](/builder/esbuild/plugin/title.md)

## todo
### Virtual Modules
是指在文件系统中不存在的模块，往往需要我们构造出 Virtual Modules 对应的模块内容。

### 写个插件练手
- 替换
- 转换
- 列出每个打包文件
- 指定缓存的文件

```js

// - 替换
let replacePlugin = (source, target, filter = /^$/) => ({
    name: 'replace',
    setup(build) {
    build.onLoad({filter}, (args) => {
        return fs.promises.readFile(args.path, 'utf-8').then(res => {
            return {
                contents: res.replace(source, target)
            }
        })
    })
    }
})

// - 转换
let transformPlugin = (filter = /^$/) => {
    return {
        name: 'transform',
        setup: function (build) {
            build.onLoad({filter}, (args) => {
                return fs.promises.readFile(args.path, 'utf-8').then(source => {
                    let arr = source.split(/;\n*/) // [k v, k1 v, ...]
                    let str = arr.reduce((r, c) => {
                        // c: k v
                        let t = c.split(' ')
                        r[t[0]] = t[1]
                        return r
                    }, {})
                    str = JSON.stringify(str)
                    return {
                        contents: str,
                        loader: 'json'
                    }
                })
            })
        }
    }
}

require('esbuild').build({
    entryPoints: ['src/index.js'],
    bundle: true,
    outdir: 'out',
    format: 'esm',
    plugins: [transformPlugin(), replacePlugin('let clog = console.log', 'let {log: clog} = console'), listFilePlugin()], // 把插件传入插件数组
    // plugins: [cachePlugin()]
}).then(() => {
    clog('打包成功')
}).catch(() => process.exit(1))
```

### title

