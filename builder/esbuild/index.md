# `esbuild`

## overview
> 我们目前的web构建工具的速度比他们可以做到的慢10-100倍。esbuild捆绑包项目的主要目标是带来构建工具性能的新时代，并在此过程中创建一个易于使用的现代捆绑包。  
> 
> 它处理ts -> js的速度是tsc的20-30倍

### feature
- 使用缓存也很快
- 支持esm/cjs
- esm 可 tree shaking
- 支持js / go 使用 api
- 支持ts/jsx
- source map
- minification
- 可插件

## install
`npm i esbuild`

## usage
同`./demo.md`
```
const esbuild = require('esbuild');
// or
// import esbuild from 'esbuild';
// TODO: DEMONSTRATE API
```

## configuration
默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||
## api
`esbuild.fn(param, first: string, second: boolean = true) => void`
description

`esbuild.fn(param, [options: {a: string, b?: number}])`
description

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。