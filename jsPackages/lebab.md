# lebab

## overview

> 与 babel 完全相反。
> es5 => es6/es7  
> 支持命令行+api

### feature

- feature0
- feature1
- feature2

## install

`npm i lebab -g`

## usage

```shell
lebab es5.js -o es6.js --transform let
# 或者就地转换

lebab --replace src/js/ --transform arrow # 只转换 .js
lebal --replace 'src/js/**/*.jsx' --transform arrow # 使用globbing匹配其它类型文件
```

### 可转换的功能

|          |                |                    |                      |     |     |     |
| -------- | -------------- | ------------------ | -------------------- | --- | --- | --- |
| 安全的   |                |                    |                      |     |     |     |
|          | arrow          |                    |                      |     |     |     |
|          | arrow-return   | {return x} => => x |                      |     |     |     |
|          | for-of         |                    |                      |     |     |     |
|          | for-each       |                    |                      |     |     |     |
|          | arg-rest       |                    |                      |     |     |     |
|          | arg-spread     |                    | 使用 apply()扩展操作 |     |     |     |
|          | obj-method     |                    |                      |     |     |     |
|          | obj-shorthand  |                    |                      |     |     |     |
|          | no-strict      |                    |                      |     |     |     |
|          | exponent       | Moth.pow() => \*\* | 指数                 |     |     |     |
|          | multi-var      |                    |                      |     |     |     |
| 不安全的 |                |                    |                      |     |     |     |
|          | let            |                    |                      |     |     |     |
|          | class          |                    |                      |     |     |     |
|          | commonjs       |                    |                      |     |     |     |
|          | template       |                    |                      |     |     |     |
|          | default-param  |                    |                      |     |     |     |
|          | destruct-param |                    |                      |     |     |     |
|          | includes       |                    |                      |     |     |     |

## api

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

```js
import { transform } from 'lebab'
const { code, warnings } = transform(
  'var f = function(a) { return a; };', // code to transform
  ['let', 'arrow', 'arrow-return'] // transforms to apply
)
console.log(code) // -> "const f = a => a;"
```

若有错误，则如下输出，否则返回`[]`

```js
;[
  { line: 12, msg: 'Unable to transform var', type: 'let' },
  { line: 45, msg: 'Can not use arguments in arrow function', type: 'arrow' },
]
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
