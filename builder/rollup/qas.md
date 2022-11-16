# frequently asked questions

## 为什么使用 esm 代码 cjs

| esm      | cjs            |
| -------- | -------------- |
| 官方标准 | 怪癖的遗留格式 |

## tree-shaking 是什么

"live code inclusion"包含活跃代码。  
使用 ast(abstract syntax tree)实现。

## 如何使用 rollup 处理 node.js、cjs

rollup 是为 esm 服务的。若要处理 cjs，请使用`node-resolve / commonjs`插件。处理 json，请使用`json`插件。

## 为什么不内置`node-resolve`。这种品质太宝贵了。

- rollup 是 node 和 browsers 的适配器。解决`import`不能在浏览器中工作的问题。
- 使用插件对于软件工程师来说非常简单。
- 使核心包变小。

## 为什么在代码拆分时在入口块中出现额外的导入?

默认情况下，当创建多个块时，条目块依赖项的导入将作为空导入添加到条目块本身。
加快加载和解析代码的速度。
可以使用`output.hoistTransitiveImports`打开、关闭此优化。
在使用`preserveModules`时不可使用此优化。

## 如何在打包结果中使用 polyfills

以下情况不使用：

- 代码分割
- 外部依赖

## rollup 是为了打包 libraries / applications 吗？

是的。

## troubleshooting

- 不要使用 eval
  - `let evalAlias = eval`
- 有 tree-shaking 不管用
  - 静态分析比较困难。
  - 请使用`import key from './file.js'`代替`import {key} from './file.js'`
  - 静态分析超时
- [name] is not exproted by [module]
  - 查看是否是默认输出
  - 经常使用`@rollup/plugin-commonjs`可解决。
- this is undefined. rollup 会设置 this 为 undefined
- sourcemap is likely to be incorrect. 是否使用多个插件处理 sourcemap
- "Treating [module] as external dependency"
  - 检查 external 的选项是否包括该包。
- EMFILE: too many open files" 设置 watch.chokidar.useFsEvents: false
- JavaScript heap out of memory. rollup 的代码分析、tree-shaking 都在内存中。 `node --max-old-space-size=8192 node_modules/rollup/bin/rollup -c`
