# @babel/generator

## overview

> 把 ast 转换为 code

### feature

- feature0
- feature1
- feature2

## install

`npm i -D @babel/generator`

## usage

```js
import { parse } from '@babel/parser'
import generate from '@babel/generator'
let code = 'class Example {}'
let ast = parse(code)
let output = generate(
  ast,
  {
    // options
  },
  code
)

// 多个ast源
let a = 'var a = 0'
let b = 'var b = 1'
let astA = parse(a, { sourceFileName: 'a.js' })
let astB = parse(b, { sourceFileName: 'b.js' })
let ast = {
  type: 'Program',
  body: [].concat(astA.program.body, astB.program.body),
}
let output = generate(ast, { sourceMaps: true }, { 'a.js': a, 'b.js': b })
```

## configuration

默认配置文件：`path/to/file.json`。

## api

generate(ast, options: object, code) => {code, map: sourcemap}

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|auxiliaryCommentAfter|在输出文件的末尾添加一块注释|string||||||
|auxiliaryCommentBefore|在输出文件的开头添加一块注释|string||||||
|comments|输出时是否包含注释|boolean|true|||||
|compact|是否删除空格|boolean / 'auto'|opts.minified|||||
|concise|是否减少空间。（与opts.compact不同）|boolean|false|||||
|decoratorsBeforeExport|输出前使用decorators|boolean||||||
|filename|用于warning message|string||||||
|jsescOption||||||||
|jsonCompatibleStrings||boolean|false|||||
|minified||boolean|false|||||
|retainFunctionParents|是否保存方法中的括号|boolean|false|||||
|retainLines|是否保存同行|boolean|false|||||
|shouldPrintComment|是否输出注释|function|opts.comments|||||
|topicToken|不会|'%' / '#'||||||
|sourceMaps|是否生成 sourcemap|boolean|false|||||
|sourceRoot|相关文件的根目录|string||||||
|sourceFileName|相关文件名|string||||||
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
