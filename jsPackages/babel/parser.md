# @babel/parser

## overview

> 基于[acorn]()/[acorn-jsx]()，在 babel 中做解析器。

### feature

- 默认支持到 es2020.
- comment attachment
- 支持 jsx/flow/ts

## install

`npm i -D @babel/parser`

## usage

```js
const @babel/parser = require('@babel/parser');
// or
// import @babel/parser from '@babel/parser';
// TODO: DEMONSTRATE API
```

## api

|key|description|default|enum|demo|||

|                                 |                 |                                            |     |     |     |     |
| ------------------------------- | --------------- | ------------------------------------------ | --- | --- | --- | --- |
| parse(code, options?) => ast    | code 是 js 代码 | 输出是 babel 的 ast（与一般的 ast 有区别） |     |     |     |     |
| parseExpression(code, options?) |                 | 尝试在内存中解析单个表达式。               |     |     |     |     |

若分不清应该使用哪个，则使用`parse()`

```ts
interface options: {
    allowImportExportEverywhere
    allowAwaitOutsideFunction
    allowReturnOutsideFunction
    allowSuperOutsideMethod
    allowUndeclaredExports
    attachComment
    createParenthesizedExpressions
    errorRecovery
    plugins
    sourceType
    sourceFilename
    startColumn
    startLine
    strictMode
    ranges
    tokens
}
interface ast {
    Literal:
}
```

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
