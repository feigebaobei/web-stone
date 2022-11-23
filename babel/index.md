# babel

## overview

> 把 es6 及以上的 js 代码转化为 es5 的 js 代码。  
> 由插件组成。（又是可插件化的框架）

### feature

- 转化语法
- 兼容指定环境
- 转化代码

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

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
