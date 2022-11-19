## jest 平台工具 的常用工具包

整个平台才有几个工具包。可怜。

### jest-changed-files

```js
const { getChangeFileForRoots } = require('jest-changed-files')
getChangeFileForRoots(['./'], {
  // lastCommit: true
}).then((result) => {
  // result 包含修改文件和仓库的信息
  console.log(result.changedFiles)
})
```

### jest-diff

```js
const {diff} = require('jest-diff')
let a = ...
let b = ...
let res = diff(a, b) // => string  表示哪些不同
```

### jest-docblock

提取和解析 JavaScript 文件顶部注释的工具， 导出各种函数来操作注释块内的数据。

```js
let {parseWithComments} = require('jest-docblock')
let code = ....
let res = parseWithComments(code)
clog(res)
```

### jest-get-tye

用于识别任何 JavaScript 值的原始类型的模块， 模块导出了一个可以识别传入参数类型并将类型以字符串作为返回值的函数。

```js
const { getType } = require('jest-get-type')
let a = []
let b = null
let c = undefined
clog(getType(a))
clog(getType(b))
clog(getType(c))
```

### jest-validate

```js
const {validate} = require('jest-validate')
let configByUser = {
  key: 'value'
}
let res = validate(configByUser, {
  key: 'value',
  k: ...
}) // => {hasDeprecationWarnings 是否有弃用警告, isValid 配置是否正确}
```

### jest-worker

可以多分支进程。

```js
async function main () {
  let worker = new Worker(require.resolve('./file.js'))
  let res = await Promise.all([
    worker.heavyFn(p)
    worker.heavyFn(q)
  ])
  clog(res)
}
main()
```

### pretty-format

任何 JavaScript 值转换为可读的字符串的函数

```js
let { format: prettyFormat } = require('pretty-format')
let val = { object: {} }
val.circularReference = val // 可处理循环引用
val[Symbol('foo')] = 'foo'
val.map = new Map([['prop', 'value']])
val.array = [-0, Infinity, NaN]
clog(prettyFormat(val))
```
