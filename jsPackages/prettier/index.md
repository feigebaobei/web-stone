# prettier

## overview
> 格式化代码的工具  
> 使用ast.  
> 根据设置项强制格式化代码。  
> 它只是代码格式指南

### feature
- 支持很多语言
- 支持很多ide
- 一般与钩子函数结合使用。
- 去掉原始的编写样式，使用指定的代码格式  
- 发现编写的bug  

## install
`npm i --save-dev --save-exact prettier`
为什么要用`--save-exact`  

## usage
本示例是基于`crtp-cli`做的。请先安装它
```shell
mkdir first
npm init
crtp initFile .prettier.json
vim src/index.js
npm i -D -E prettier
# 代码如下
npm set-script p "prettier --write ."
npm set-script pc "prettier --check ."
npm run pc # 会报错
npm run p  # 格式化
npm run pc # 不会报错
```
```js
// <root>src/index.js
function fn(a, b) {
  return a + b;}fn(1, 2);
// 显然这是编写不规范的
```

### pritter & git

## summary
- 尽量使用确定版本的prettier。  
- `.prettier.json`使编辑器知道如何使用prettier  
- `.prettierignore`使编辑器知道哪些不使用prettier  
- 在 ci 中使用`pretter --check .`  
- eslint-config-prettier可以使用prettier和eslint一起使用  
- 在pre-commit钩子中使用  

## configuration

|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||



### .prettierignore
指定忽略的文件。  
使用gitignore语法  

## [忽略](jsPackages/prettier/index.html)  

## cli
## api
## browser
## pro-commit hook
## tittlt

## api
`prettier.fn(param, first: string, second: boolean = true) => void`
description

`prettier.fn(param, [options: {a: string, b?: number}])`
description

## principle
此包的处理逻辑。
||||||
|-|-|-|-|-|
|correctness|当格式化失败时报错||||
|strings|单引号还是双引号||||
|empty lines|1. 把多个空行合并为一个空行。 2. 文件开头的空行会被删除||||
|multi-line objects|若一行放不下，则使用多行放置。||||
|decorators|||||
|semicolons|noSemi 没有分号||||
|print width|每行的最大宽度||||
|testing functions|||||
|jsx|||||
|comments|||||
|disclaimer about non-standard syntax|||||
|what prettier is not concerned about|||||

### uml
```
```

## todo
> 感觉没必要与eslint一起使用。二者都是做格式化的。在项目中使用一个就够。  
> 未来迭代计划。
> 未来迭代计划。

## prettier & linter
||prettier|linter|||||
|-|-|-|-|-|-|-|
|Formatting rules|减少不必要的配置规则。||||||
|Code-quality rules|||||||
