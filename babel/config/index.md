# config

## 配置文件名

所有的配置文件都是平行的。  
|配置文件名|支持的扩展名|适用||
|-|-|-|-|
|babel.config._|.json .js .cjs .mjs|使用较多||
|.babelrc._|.json .js .cjs .mjs|||
|.babelrc||||
|package.json 中的 babel 字段||||

## 一库多包中使用

根目录中创建的配置文件会作用于所有子包。  
子包中的配置文件只会作用于该子包。

### 在子包中使用根目录中的配置文件

cli

```shell
babel --root-mode upward src -d dist_babel
```

@babel/regiser
这是一个脚本文件

```js
require('@babel/register')({
  rootMode: 'upward',
})
```

webpack

```js
module: {
  rules: [
    {
      loader: 'babel-loader',
      options: {
        rootMode: 'upward',
      },
    },
  ]
}
```

jest

```js
module.exports = require('babel-jest').default.createTransformer({
  rootMode: 'upward',
})
```

```json
"transform": {
    "^.+\\.jsx?$": "./path/to/wrapper.js"
}
```

## 配置文件中的 api

当使用 cjs 规范的配置文件时。如下：

```js
module.exports = function (api) {
    return {...}
}
```

| api                                              | 类型   | 说明               |     |
| ------------------------------------------------ | ------ | ------------------ | --- |
| api.version                                      | string | 当前 babel 的版本  |     |
| api.cache                                        |        | 如何管理缓存       |     |
| api.cache.forever()                              |        |                    |     |
| api.cache.never()                                |        |                    |     |
| api.cache.user(() => process.env.NODE_ENV)       |        |                    |     |
| api.cache.invalidate(() => process.env.NODE_ENV) |        |                    |     |
| api.cache(true)                                  |        |                    |     |
| api.cache(false)                                 |        |                    |     |
| api.env()                                        |        | 用于检查 envName   |     |
| api.env('production')                            |        |                    |     |
| api.env(['production', 'test'])                  |        |                    |     |
| api.env()                                        |        | 返回当前的 envName |     |
| api.env(envName => envName.startswith('test-'))  |        | 返回当前的 envName |     |
| api.caller(cb)                                   |        |                    |     |
| api.assertVersion(range)                         |        |                    |     |

## 选项

| key                     | description                                                                                                                                                  | type                                                        | default                                          | enum                | demo                                           | 可以使用的方式 |                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------ | ------------------- | ---------------------------------------------- | -------------- | ------------------------------------------------------------ | --- | ---------------------------------- | ---- | --- |
| 主要选项                | 只用于编程时使用                                                                                                                                             |                                                             |                                                  |                     |                                                |                |                                                              |
| cwd                     | 工作目录                                                                                                                                                     | string                                                      | process.cwd()                                    |                     |                                                | 编程           |                                                              |
| caller                  | 好像是定义 preset/plugin                                                                                                                                     | obj                                                         | 见下文                                           |                     |                                                | 编程           |                                                              |
| filename                |                                                                                                                                                              | string                                                      |                                                  |                     |                                                | 编程           |                                                              |
| filenameRelative        | 设置 sourceFileName 的默认值                                                                                                                                 | string                                                      | path.relative(opts.cwd, opts.filename)           |                     |                                                | 编程           |                                                              |
| code                    | 生成代码时默认返回 code/map 属性。                                                                                                                           | boolean                                                     | true                                             |                     |                                                | 编程           |                                                              |
| ast                     | 默认生成 string / source map                                                                                                                                 | boolean                                                     | false                                            |                     |                                                | 编程           |                                                              |
| cloneInputAst           | 复制输入的 ast.以防止它改变。                                                                                                                                | boolean                                                     | true                                             |                     |                                                | 编程           |                                                              |
| 加载选项                | 处理环境的                                                                                                                                                   |                                                             |                                                  |                     |                                                |                |                                                              |
| root                    | 基于 rootMode.                                                                                                                                               | string                                                      | opts.cwd                                         |                     |                                                | 编程           |                                                              |
| rootMode                | 结合 root 选项生成最终的项目根目录。只用于编程时使用。v7.1+                                                                                                  | 'root'/'upward'/'upward-optional'                           | 'root'                                           |                     |                                                | 编程           |                                                              |
| envName                 | 设置环境变量                                                                                                                                                 | string                                                      | `process.env.BABEL_ENV                           |                     | process.env.NODE_ENV                           |                | "development"`                                               |     |                                    | 编程 |     |
| configFile              | 设置配置文件的路径                                                                                                                                           | string/boolean                                              | `path.resolve(opts.root, 'babel.config.json')`   |                     |                                                | 编程           |                                                              |
| babelrc                 | 当为 true 时与 filename 结合使用。会覆盖配置文件中的配置项                                                                                                   | boolean                                                     |                                                  |                     |                                                | 编程           |                                                              |
| babelrcRoots            | 不会                                                                                                                                                         | `boolean / MatchPattern / Array<MathPattern>`               | opts.root                                        |                     |                                                | 编程           |                                                              |
| plugin/preset 选项      |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |
| plugins                 | 处理文件的插件                                                                                                                                               | `Array<PluginEntry>`                                        | `[]`                                             |                     |                                                |                |                                                              |
| presets                 | preset 组成的数组                                                                                                                                            | `Array<PresetEntry>`                                        | `[]`                                             |                     |                                                |                |                                                              |
| 输出选项                |                                                                                                                                                              |                                                             |                                                  |                     |                                                | 编程、配置     |                                                              |
| targets                 | 定义转换结果的运行环境。若不指定此字段，则认为运行环境是最旧的浏览器，即转换结果是 es5.                                                                      | `string                                                     | Array<string>                                    | {[string]: string}` | `{}`                                           |                |                                                              |     | 建议设置此字段，减小输出代码体积。 |
| targets.esmodules       | 输出的代码可以在支持 esm 的浏览器 中运行。                                                                                                                   | boolean                                                     |                                                  |                     |                                                |                | 若同时设置了 esmodules/target，则取交集。                    |
| targets.node            | 指定输出哪个 node 版本的代码                                                                                                                                 | string / 'current' / true                                   |                                                  |                     | `{"targets": "node 12.0"}`                     |                | 需要明确中版本。                                             |
| targets.safari          |                                                                                                                                                              | string / 'tp'                                               |                                                  |                     |                                                |                |                                                              |
| targets.browsers        | browsers                                                                                                                                                     | 查询浏览器的版本                                            | `string / Array<strgin>`                         |                     |                                                |                |                                                              |
| targets.deno            | 最小支持 1.0                                                                                                                                                 | string                                                      |                                                  |                     |                                                |                |                                                              |
| browserslistConfigFile  |                                                                                                                                                              | boolean                                                     |                                                  |                     |                                                | 编程、配置     |                                                              |
| browserslistEnv         | browserslist 的环境                                                                                                                                          | string                                                      | undefined                                        |                     |                                                | 编程、配置     |                                                              |
| 合并选项                |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |
| extends                 | 增强配置                                                                                                                                                     | string                                                      |                                                  |                     |                                                |                | 不能内置 presets                                             |
| env                     |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |
| overrides               |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |
| test                    |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |
| include                 |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |
| exclude                 |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |
| ignore                  |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |
| only                    |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |
| source map 选项         |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |
| inputSourceMap          | 是否加载 sourcemap 文件                                                                                                                                      | boolean / SourceMap                                         | true                                             |                     |                                                |                |                                                              |
| sourceMaps              | true: 在输出结果中包含 sourcemap inline: 生成行内 sourcemap both: 二者都有                                                                                   | boolean / 'inline' / 'both'                                 |                                                  |                     |                                                |                |                                                              |
| sourceMap               | 与 sourceMaps 等效，请使用 sourceMaps                                                                                                                        |                                                             |                                                  |                     |                                                |                |                                                              |
| sourceFileName          | 用于文件内部的 source map 对象                                                                                                                               | string                                                      | path.basename(opts.filenameRelative) / "unknown" |                     |                                                |                |                                                              |
| sourceRoot              | sourcemap 的目录。                                                                                                                                           | string                                                      |                                                  |                     |                                                |                |                                                              |
| misc 选项               |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |
| sourceType              | 代码规范. script: 使用 esm，无 import/export，使用非严格模式。 module: esm,import/export,严格模式。unambigous: 若有 import/export 则使用 esm.否则使用 script | `'script'                                                   | 'module'                                         | 'unambiguous'`      |                                                |                |                                                              |     | script                             |
| assumptions             | 假设运行环境已经支持的功能                                                                                                                                   | `{[assumption: string]: boolean}`                           | `{}`                                             |                     | `{"assumptions": {"iteratableIsArray": true}}` | 编程、配置     |                                                              |
| highlightCode           | 是否高亮显示错误信息                                                                                                                                         | boolean                                                     | true                                             |                     |                                                |                |                                                              |
| wrapPluginVisitorMethod | visitor 的包裹器                                                                                                                                             | `(key: string, nodeType: string, fn: Function) => Function` |                                                  |                     |                                                |                |                                                              |
| parserOpts              |                                                                                                                                                              | `{}`                                                        |                                                  |                     |                                                |                |                                                              |
| generatorOpts           |                                                                                                                                                              | `{}`                                                        |                                                  |                     |                                                |                |                                                              |
| 代码生成选项            |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |
| retainLines             | 是否尽量与原代码保持相同行                                                                                                                                   | boolean                                                     | false                                            |                     |                                                |                | 必要性不大。因为在生产时大多是使用压缩。它的作用不用于生产。 |
| compact                 | 是否压缩. auto: code.length > 500_000                                                                                                                        | boolean / 'auto'                                            | 'auto'                                           |                     |                                                |                |                                                              |
| minified                | compact:true + 忽略末尾分号 + 忽略() + 输出短变量                                                                                                            | boolean                                                     | false                                            |                     |                                                |                |                                                              |
| auxiliaryCommentBefore  | 是否使用特定的注释在每一段代码前。                                                                                                                           | string                                                      |                                                  |                     |                                                |                |                                                              |
| auxiliaryCommentAfter   | 是否使用特定的注释在每一段代码后                                                                                                                             | string                                                      |                                                  |                     |                                                |                |                                                              |
| shouldPrintComment      | 是否使用注释在输出文件中                                                                                                                                     | `(value: string) => boolean`                                | `() => opts.comments`                            |                     |                                                |                |                                                              |
| comments                |                                                                                                                                                              | boolean                                                     | true                                             |                     |                                                |                |                                                              |
| amd/umd/systemjs 选项   |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |
| moduleIds               | 是否使用 module id 生成                                                                                                                                      | boolean                                                     | `!!opts.moduleId`                                |                     |                                                |                |                                                              |
| moduleId                | 指定 module id。不会被 getModuleId 得到                                                                                                                      | string                                                      |                                                  |                     |                                                |                |                                                              |
| getModuleId             |                                                                                                                                                              | `(name: string) => string`                                  |                                                  |                     |                                                |                |                                                              |
| moduleRoot              |                                                                                                                                                              | string                                                      |                                                  |                     |                                                |                |                                                              |
| 选项观念                |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |
| MatchPattern            |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |
| Merging                 |                                                                                                                                                              |                                                             |                                                  |                     |                                                |                |                                                              |

```js
interface CallerData {
  name: string;
  supportsStaticESM?: boolean;
  supportsDynamicImport?: boolean;
  supportsTopLevelAwait?: boolean;
  supportsExportNamespaceFrom?: boolean;
}
PluginEntry
browserlist
```

## presets

定义若干 plugins 的集合。  
已经内置的 presets:

- @babel/preset-env 把 es6 及以上代码转换为 es5
- @babel/preset-typescript 转换 ts
- @babel/preset-react 转换 jsx
- @babel/preset-flow 转换 flow

preset 的执行顺序是倒序

```json
// demo
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "loose": true,
        "modules": true
      }
    ]
  ]
}
```

### stage-x

babel 7+ 反对使用此配置项

- Stage 0
- Stage 1
- Stage 2
- Stage 3
- Stage 4

### create a preset

```js
module.exports = funtion () {
  return {
    // 可以指定包含哪些plugins。也可以使用指定需要哪些presets
    // presets: [require('@babel/preset-env')],
    plugins: ["pluginA", "pluginB", "pluginC", "pluginD"]
  }
}
```

## plugins

- 所有的转换工作都在插件上完成。
- 一个插件一个转换功能。
- 先于 presets 执行
- 从前向后执行

```json
// demo
{
  "plugins": ["babel-plugin-myPlugin0", "@babel/plugin-transform-runtime"]
  // 为插件提供选项
  // "plugins": [
  //   ["p1", {
  //     "p1Option1": "value",
  //     "p1Option2": "value2",
  //   }]
  // ]
}
```

### plugin development

```js
// demo for revser
export default function () {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name
        path.node.name = name.split('').reverse().join('')
      },
    },
  }
}
```

### [plugin list](https://babeljs.io/docs/en/plugins-list)

## compiler assumptions

假设运行环境已经支持了指定功能。  
|||||
|-|-|-|-|
|arrayLikeIsIterable|类数组、数组可扩展|||
|constantReexports|可连续导出|||
|constantSuper|可在 class 中使用 super|||
|enumerableModuleMeta|esm->cjs 时会用到\_\_esModule|||
|ignoreFunctionLength|参数中的默认值|||
|ignoreToPrimitiveHint|支持模板字符串|||
|iterableIsArray|数组可 iterable.即支持 for of|||
|mutableTemplateObject|可变的模板对象|||
|noClassCalls|总是使用 new 命令得到实例|||
|noDocumentAll|可以使用`?.`访问子元素|||
|noIncompleteNsImportDetection||||
|noNewArrows||||
|objectRestNoSymbols|对象解构时使用 rest|||
|privateFieldsAsProperties|软私有 `#`|||
|pureGetters||||
|setClassMethods|class 的静态方法|||
|setComputedProperties|set 计算属性|||
|setPublicClassFields||||
|setSpreadProperties||||
|skipForOfIteratorClosing||||
|superIsCallableConstructor||||

### title

### title

## plugins

## title

## title

## title
