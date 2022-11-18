# jest

## overview

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
test("describe", () => {
    expect(sum(1,2).toBe(3))
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

## title

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

`jest.fn(param, first: string, second: boolean = true) => void`
description

`jest.fn(param, [options: {a: string, b?: number}])`
description

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
