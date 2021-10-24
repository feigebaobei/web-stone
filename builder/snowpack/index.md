# `snowpack`

## overview
> esm的打包工具  
> 与vite是同一团队开发的。  

### feature
- 较快的打包器。使用的js原生的esm功能。
- 一次打包后缓存起来
- 在dev环境，浏览器绝不下载2次同一个文件。
- 适合htr,快速刷新。
- 开箱即用。
- 为产出优化
- 可插件
- 默认支持ts/jsx

- 可扫描全部package
- 支持从node_modules中读取文件。
- 每个文件打包成单独的文件。
- 每个打包后的文件使用esm的import单独引入。
- 当每个文件有变动时重新打包。

## install
`npm i snowpack`

## usage
同[demo0.md](/builder/snowpack/demo0.html)

## configuration
最好让snowpack使用配置文件，snowpack也支持使用cli.
默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
|mount|定义本地目录与打包后的目录的映射||||||
||||||||
||||||||

## api
`snowpack.fn(param, first: string, second: boolean = true) => void`
description

`snowpack.fn(param, [options: {a: string, b?: number}])`
description

### cli
Commands:
  snowpack init          Create a new project config file.
  snowpack prepare       Prepare your project for development (optional).
  snowpack dev           Develop your project locally.
  snowpack build         Build your project for production.
  snowpack add [package] Add a package to your project.
  snowpack rm [package]  Remove a package from your project.

Flags:
  --config [path]        Set the location of your project config file.
  --help                 Show this help message.
  --version              Show the current version.
  --reload               Clear the local cache (useful for troubleshooting).
  --cache-dir-path       Specify a custom cache directory.
  --verbose              Enable verbose log messages.
  --quiet                Enable minimal log messages.

## principle
此包的处理逻辑。

### uml
```
```

## todo
为类工具全部支持插件。
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。