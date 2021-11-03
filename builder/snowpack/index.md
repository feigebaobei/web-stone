# `snowpack`

## overview
> 把npm包打包为esm的打包工具。  
> 与vite是同一团队开发的。  
> 与pnpm结合使用时报错。  
> 依赖与esbuild/rollup  

### 打包过程
1. 为网站、应用扫描所有使用过的npm包。  
2. 从`node_modules`中读取已经安装的依赖。  
3. 单独打包每一个依赖。  
4. 每个打包后的文件直接在浏览器中运行。  
5. 当本地依赖文件有变化时，会重新打包。  

### feature
- 较快的打包器。把文件打包为esm规划的js。连`*.vue`文件也会被打包为`*.vue.js`。  
- 一次打包后缓存起来  
- 在dev环境，浏览器绝不下载2次同一个文件。  
- 适合htr,快速刷新。  
- 开箱即用。  
- 为产出优化  
- 可插件  
- 默认支持ts/jsx  
- 可扫描全部packag

### attention
- 文件中的链接必须使用打包后的链接。  

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

## [插件](/builder/snowpack/plugin.html)


## principle
此包的处理逻辑。

### uml
```
```

## todo
为类工具全部支持插件。
### 文件中的链接必须使用打包后的链接
这样与编辑器（vscode）的路径功能不符。与开发时的路径也有可能不符。
### 依赖与esbuild/rollup做了什么？
### 推荐使用@web/test-runner去测试
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。