# @babel/code-frame

## overview

> 生成的错误信息中包含源代码位置信息、代码框架。

### feature

- feature0
- feature1
- feature2

## install

`npm i -D @babel/code-frame`

## usage

```js
import { codeFrameColumns } from '@babel/code-frame'

const rawLines = `class Foo {
  constructor() {
    console.log("hello");
  }
}`
const location = {
  start: { line: 2, column: 17 },
  end: { line: 4, column: 3 },
}

const result = codeFrameColumns(rawLines, location, {
  /* options */
})

console.log(result)
```

```
  1 | class Foo {
> 2 |   constructor() {
    |                 ^
> 3 |     console.log("hello");
    | ^^^^^^^^^^^^^^^^^^^^^^^^^
> 4 |   }
    | ^^^
  5 | };
```

s

## api

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|highlightCode||boolean|false|||||
|linesAbove||number|2|||||
|linesBelow||number|3|||||
|forceColor||boolean|false|||||
|message||string||||||
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
