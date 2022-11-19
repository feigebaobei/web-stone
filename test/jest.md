# jest

## overview

官网文档写的太差了，连 api 都没有。

> 无需配置  
> 可快照  
> 可隔离  
> 优秀接口

### feature

- 要使用 JEST，前端必须要以模块形式暴露，即 module.exports
- feature1
- feature2

## install

`npm i jest -D`

## usage

```js
// 定义被测试的文件 sum.js
function sum (a, b) { return a + b }
module.exports = sum

// 在根目录中创建 sum.test.js
const sum = require('./sum')
describe('sum module', () => {
  // describe中可以有多个test
  test("describe", () => {
    // test中可以有多个expect
    expect(sum(1,2).toBe(3))
  })
})

// 在package.json中设置脚本
{
    "scripts": {
        "jest": "jest"
    }
}

// 运行测试命令
npm run jest
```

## configuration

```shell
jest --init
```

默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## jest & ts

```shell
npm i -D ts-jest
npm i -D @jest/globals
```

```ts
import { describe, expect, test } from '@jest/globals'
import { sum } from './sum'

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
```

## 使用匹配器

|                   |                              |                                      |     |     |     |
| ----------------- | ---------------------------- | ------------------------------------ | --- | --- | --- |
| 判断              |                              |                                      |     |     |     |
|                   | toBeNull()                   | 只能为 null                          |     |     |     |
|                   | toBeUndefined()              | 只能为 undefined                     |     |     |     |
|                   | toBeDefined()                | 非 undefined                         |     |     |     |
|                   | toBeTruthy()                 | 真                                   |     |     |     |
|                   | toBeFalsy()                  | 假                                   |     |     |     |
| 数字              |                              |                                      |     |     |     |
|                   | toBeGreaterThan()            | >                                    |     |     |     |
|                   | toBeGreaterThanOrEqual()     | >=                                   |     |     |     |
|                   | toBeLessThan()               | <                                    |     |     |     |
|                   | toBeLessThanOrEqual()        | <=                                   |     |     |     |
|                   | toBe()                       |                                      |     |     |     |
|                   | toEqual()                    |                                      |     |     |     |
|                   | toBeCloseTo()                | 在浮点型数字时阻止出现过多小数的情况 |     |     |     |
| 字符串            |                              |                                      |     |     |     |
|                   | toMatch(reg)                 |                                      |     |     |     |
| array & iterables |                              |                                      |     |     |     |
|                   | toContain()                  | 是否包含                             |     |     |     |
| exceptions        |                              |                                      |     |     |     |
|                   | expect(() => fn()).toThrow() | 判断指定方法是否返回错误             |     |     |     |

## 测试异步代码

### promise

```js
test('describe', () => {
  // 在返回的函数中断言
  return pf().then((res) => {
    expect(res).toBe(v)
  })
})
```

### .resolves/.rejects

```js
test('describe', () => {
  // .resolves 等promise变为fulfilled状态时触发判断
  return expect(pf()).resolves.toBe(v)
})
test('describe', () => {
  return expect(pf()).rejects.toMatch(v)
})
```

### async/await

```js
test('describe', async () => {
  let res = await pf()
  expect(res).toBe(v)
})
// async/await & resolves/rejects
test('describe', async () => {
  // await expect(pf()).resolves.boBe(v)
  await expect(pf()).rejects.toMatch('err')
})
```

### callback

```js
test('describe', (done) => {
  // done 为了防止出现等待过长时间
  function cb(err, data) {
    if (err) {
      done(err)
      throw err
    }
    expect(data).toBe(v)
    done()
  }
  fetchData(cb)
})
```

## setup & teardown

钩子方法需要定义在测试方法之前。

```js
beforeAll
beforeEach
test
afterEach
describe内的beforeAll
beforeEach
describe内的beforeEach
describe内的test
describe内的afterEach
afterEach
describe内的afterAll
afterAll
```

全局的钩子包含内容的钩子。  
`describe('str', () => {...})` 用于分组测试。  
describe 方法可以嵌套。  
test.only('str', () => {...}) 只运行此测试方法。

## mock functions

### 使用 mock 函数 & .mock 属性 & mock 的返回值 & mock 实现 & mock 名称

```js
// jest.fn(fn) // 返回一个mock函数。该函数的.mock属性记录了该函数的参数、返回值、调用次数等信息。
let mockCb = jest.fn((x) => 2 + x)
forEach([0, 1].mockCb)
test('str', () => {
  expect(mockCb.mock.calls.length).toBe(2) // 调用次数
  expect(mockCb.mock.calls[0][0]).toBe(0)
  expect(mockCb.mock.calls[1][0]).toBe(1)
  expect(mockCb.mock.results[0].value).toBe(42)
  // mockCb.bind(o) // 绑定this
})
// mock的返回值
let mockFn = jest.fn()
mockFn.mockReturnValueOnce('s').mockReturnValueOnce(1).mockReturnValueOnce(true)
// 多次调用mockFn()的返回值依次是 's' 1 true
// mock实现
let mockFn1 = jest
  .fn()
  .mockImplementationOnce((cb) => cb(params)) // 定义模拟执行此方法的参数
  .mockImplementationOnce((cb) => cb(params)) // 可以定义多次。多次调用此方法时依次返回指定结果
// .mockReturnThis() 支持返回this.支持链式调用
mockFn1()
// 当 mockImplementationOne定义的实现逐个调用完毕时， 如果定义了jest.fn ，它将使用 jest.fn 。
// mock名称
// 用这个方法你就可以在单元测试输出日志中快速找到你定义的Mock函数。
let mockFn2 = jest
  .fn()
  .mockReturnValue('str')
  .mockImplementation((p) => 'hi ' + p)
  .mockName('addHi')
```

### 模拟模块 & 模拟部分模块

以模拟`axios`为例

```js
// file.test.js
// 实际上不会发出请求
const axios = require('axios')
jest.mock('axios') // 这里使用模块名
test('str', () => {
  axios.get.mockResolveValue({ data: [1] })
  return realReqFn().then((resData) => {
    expect(resData).toEqual({ data: [1] })
  })
})

import defaultExport, { bar, foo } from '../file'
jest.mock('../file', () => {
  let originalModule = jest.requireActual('../file')
  // defaultExport / foo 使用模拟的代码。其他的使用真实的引入
  return {
    __esMoule: true,
    ...originalModule,
    defaultExport: jest.fn(() => 'str'),
    foo: 123,
  }
})
```

### 自定义匹配器

不知道它是做什么的。

## jest 平台工具

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

## title

## title

## title

## title

## title

## 基本结构

```js
// file.test.js

beforeAll
afterAll
```

## api

```js
let mockCallback = jest.fn(f: function)
mockCallback.mock.calls.length
mockCallback.mock.calls[0][0]
mockCallback.mock.calls[1][0]
mockCallback.mock.results[0].value


{
  advanceTimersByTime: [Function: advanceTimersByTime],
  advanceTimersToNextTimer: [Function: advanceTimersToNextTimer],
  autoMockOff: [Function: disableAutomock],
  autoMockOn: [Function: enableAutomock],
  clearAllMocks: [Function: clearAllMocks],
  clearAllTimers: [Function: clearAllTimers],
  createMockFromModule: [Function: createMockFromModule],
  deepUnmock: [Function: deepUnmock],
  disableAutomock: [Function: disableAutomock],
  doMock: [Function: mock],
  dontMock: [Function: unmock],
  enableAutomock: [Function: enableAutomock],
  fn: [Function: bound fn],
  genMockFromModule: [Function: genMockFromModule],
  getRealSystemTime: [Function: getRealSystemTime],
  getSeed: [Function: getSeed],
  getTimerCount: [Function: getTimerCount],
  isMockFunction: [Function: isMockFunction],
  isolateModules: [Function: isolateModules],
  mock: [Function: mock],
  mocked: [Function: bound mocked],
  now: [Function: now],
  requireActual: [Function: requireActual],
  requireMock: [Function: requireMock],
  resetAllMocks: [Function: resetAllMocks],
  resetModules: [Function: resetModules],
  restoreAllMocks: [Function: restoreAllMocks],
  retryTimes: [Function: retryTimes],
  runAllImmediates: [Function: runAllImmediates],
  runAllTicks: [Function: runAllTicks],
  runAllTimers: [Function: runAllTimers],
  runOnlyPendingTimers: [Function: runOnlyPendingTimers],
  setMock: [Function: setMock],
  setSystemTime: [Function: setSystemTime],
  setTimeout: [Function: setTimeout],
  spyOn: [Function: bound spyOn],
  unmock: [Function: unmock],
  unstable_mockModule: [Function: mockModule],
  useFakeTimers: [Function: useFakeTimers],
  useRealTimers: [Function: useRealTimers]
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
