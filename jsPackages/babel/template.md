# @babel/template

## overview

> 可实现宏替换

### feature

- feature0
- feature1
- feature2

## install

`npm i -D @babel/template`

## usage

要么都使用`%%var%%`，要么都使用`VAR`

```js
import template from '@babel/template'
import generate from '@babel/generator'
import * as t from '@babel/types'

let buildRequire = template(`
    var %%importName%% = require(%%source%%);
`)
let ast = buildRequire({
  importName: t.identifier('myModule'),
  source: t.stringLiteral('my-module'),
})
console.log(generate(ast).code)
// const myModule = require("my-module")
```

## api

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|template(code: string, options?: object) => fn|返回一个替换对象的方法|||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
