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
        build.onResolve(options: {
            filter: ExpReg,         // 满足该正则的才能执行该回调。避免执行不需要的回调
            namespace?: string      // 默认值为file
        }, cb: (params: {
            path: string;
            importer: string;
            namespace: string;
            resolveDir: string;
            kind: ResolveKind;
            pluginData: any;
        }) => {
            errors?: Message[];
            external?: boolean;
            namespace?: string;
            path?: string;
            pluginData?: any;
            pluginName?: string;
            sideEffects?: boolean;
            suffix?: string;
            warnings?: Message[];
            watchDirs?: string[];
            watchFiles?: string[];
        })
        // 解析模块前调用。主要是用于处理并返回模块的内容。告知 esbuild 要如何解析它们。
        build.onLoad(options: {
            filter: RegExp,
            namespace?: string,
        }, cb: (params: {
            path: string,
            namespace: string,
            suffix: string,
            pluginData: any,
        }) => { // 返回该模块的内容
            contents?: string | Uint8Array;
            errors?: Message[];
            loader?: Loader;     // 默认为js
            pluginData?: any;
            pluginName?: string;
            resolveDir?: string;
            warnings?: Message[];
            watchDirs?: string[];
            watchFiles?: string[];
        })
        // 每个打包开始时触发
        build.onStart(() => {
            // console.log('str')
        })
        // 每个打包结束时触发
        build.onEnd(result => {...})
    }
}

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

### title

