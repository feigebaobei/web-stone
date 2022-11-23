# babel

## overview

> 把 es6 及以上的 js 代码转化为 es5 的 js 代码。  
> 由插件组成。（又是可插件化的框架）  
> v7.8+ 必要 配置文件

### feature

- 转化语法
- 兼容指定环境
- 转化功能

babel 认为 js 的语法和功能不一样吗？

## install

它有一系列包，用哪个安装哪个。

## usage

根据使用环境不同，用法有很多。这里列出依 cli 的使用方式。

```shell
npm i -D @babel/core @babel/cli
```

```json
// package.json
"script": {
    "babel": "babel src -d dist_babel"
}
```

```shell
npm run babel
# or
# ./node_modules/.bin/babel src -d dist_babel
```

没配置文件也行，有更好些。  
babel.config.json

```json
{
  "preset": ["@babel/preset-env"]
}
```

### jsx

```shell
npm i -D @babel/preset-react
```

### flow

```shell
npm i -D @babel/preset-flow
```

### ts

```shell
npm i -D @babel/preset-typescript
```

## configuration

默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## 工作流程

```
    code ----------> ast ----------> ast ----------> ast
          parser          transform       generator
          解析源文件        转换            生成新文件
```

## 组成

[@babel/core](/jsPackages/babel/core.html) ast 转换的核心包  
[@babel/cli](/jsPackages/babel/cli.html) 命令行工具  
@babel/plugin-\* 插件  
 [@babel/plugin-transform-runtime](/jsPackages/babel/core.html) 解决 polyfill 直接修改 api 带来的全局污染问题  
[@babel/preset-env](/jsPackages/babel/presetEnv.html) 插件的集合  
[core-js](/jsPackages/babel/coreJs.html)  
[@babel/polyfill](/jsPackages/babel/coreJs.html)babel 放弃使用它，改为使用 core-js 了。  
[@babel/core](/jsPackages/babel/core.html)

## title

## title

## title

## api

`babel.fn(param, first: string, second: boolean = true) => void`
description

`babel.fn(param, [options: {a: string, b?: number}])`
description

## [principle](/babel/plugin/index.html)

## principle

此包的处理逻辑。

### uml

```

```

## todo

### [ast](/babel/ast/index.html)

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
