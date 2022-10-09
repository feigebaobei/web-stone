# flow

## overview
> 为js提供静态类型检测。  

### feature
- 类型引用  
- 实时回馈  
- feature2

## install
`npm i flow-bin -D`
注意包名。  

1. 编写flow语言的代码  
2. 使用@babel/preset-flow或flow-remove-types去掉类型代码。  
3. 运行flow

```js
// @flow
function f (n: number): number {
    return n * n;
}
f('2') // error
```
**使用@babel/preset-flow**
```
npm i -D @babel/core @babel/cli @babel/preset-flow  
```
```
// .babelrc
{
    "presets": ["@babel/preset-flow"]
}
```
```
// package.json
"script": {
    "build": "babel src/ -d lib/" // 去掉类型
}
```
**使用flow-remove-types**
```
npm i -D flow-remove-types
```
```
// package.json
"script": {
    "build": "flow-remove-types src/ -d lib/" // 去掉类型
}
```

```shell
npm run flow init   // 第一次运行
npm run flow        // 非第一次运行
```

## usage
- 生产配置文件。 `flow init`  
- 以`// @flow`或`/* flow */`开头，表示此文件是flow文件。  
- 编写flow代码。  
- 使用`flow`或`flow status`开始后台进程。检查错误  
- 使用`flow stop`停止flow的进程。  

## faq
## type annotations
## flow enums
## type system
## cli commands
## configuration
## library definitions
## declaration files
## error suppressions
## react
## tools
## editors
## linting
## flow strict









## configuration
默认配置文件：`<root>/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||
## api
`flow.fn(param, first: string, second: boolean = true) => void`
description

`flow.fn(param, [options: {a: string, b?: number}])`
description

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 重新整理入口文件。
    > 基本类型
    fn/object/type/interface/class/generic/utility
> 未来迭代计划。
> 未来迭代计划。

## flow & ts
||flow|ts|
|-|-|-|
||方法内的方法中不能使用this|可以|
|不知道的类型|mixed|unknown|
|any|不检测||
|类型别名||v|
||||
||||