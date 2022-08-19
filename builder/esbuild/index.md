# `esbuild`

## overview
> 我们目前的web构建工具的速度比他们可以做到的慢10-100倍。esbuild捆绑包项目的主要目标是带来构建工具性能的新时代，并在此过程中创建一个易于使用的现代捆绑包。  
> 
> 它处理ts -> js的速度是tsc的20-30倍
> 当使用api方式时，esbuild的可执行文件在child process中运行。
> plugin只支持异步api

### feature
- 使用缓存也很快
- 支持esm/cjs
- esm 可 tree shaking
- 支持js / go 使用 api
- 支持ts/jsx
- source map
- minification
- 可插件
- 支持cli
- 支持编写js代码
- 

## install
```shell
npm i esbuild
npm i esbuild-wasm
```

## usage
同`./demo.html`

## 打包结果的多种用途

### browser
```shell
esbuild input.js --target=chrome58,firefox57,safari11,edge16
```
```js
require('esbuild').buildSync({
  entryPoints: ['app.jsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outfile: 'out.js',
})
```
你想要使用的一些npm包可能不是被设计成在浏览器中运行的。有时，您可以使用esbuild的配置选项来解决某些问题，并成功地捆绑包。未定义的全局变量在简单情况下可以用定义特性替换，在复杂情况下可以用注入特性替换。

### node
当设置`--platform=node`时，esbuild会把设置一些对node友好的配置项。如：把`fs`标记为排除项。还会设置一些浏览器不永别package.json的配置项。  
既然打包时排除了，那么在使用该包时。这些排除项也要在运行时存在。（有些同等依赖）

## configuration
默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## api
## plugin
## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。