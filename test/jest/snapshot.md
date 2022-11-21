# snapshot

## 快照测试

第一次生成快照，第二次的运行结果与快照比对。

```shell
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-jest jest react-test-renderer
```

```js
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react'],
  ],
}
```

```js
// __tests__/comp.test.js
import React from 'react' // 引入react才能使用jsx
import testRenderer from 'react-test-renderer'
import Link from '../src/components/Link.js'

it('renders correctly', () => {
  const tree = testRenderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
```

```json
// package.json
...
"script": {
    "jest": "jest"
}
...
```

## 更新快照

第一次运行时会生成快照文件。

```shell
npm run jest
```

再运行一次会执行快照比对。  
执行`npm run jest --updateSnapshot`可更新快照。

## 交互式快照模式

```shell
npm run jest --watch
```

再按提示操作。

## 内联快照

第一次运行`npm run jest`后，jest 会把快照代码写入测试文件。如下：
第二次运行时断言运行结果与快照是否相同。

```js
// demo
// 除了使用内联快照，别的与first.test.js相同
import React from 'react'
import renderer from 'react-test-renderer'
import Link from '../src/components/Link.js'

it('renders correctly', () => {
  const tree = renderer
    // .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .create(<Link />)
    .toJSON()
  expect(tree).toMatchInlineSnapshot(`
<div>
  from ReactComp
</div>
`)
})
```

## 属性匹配器

在匹配`new Date() / Math.random()`时使用此方法。

```js
it('will check the matchers and pass', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  }
  expect(user).toMatchSnapshot({
    createdAt: expect.any(Date),
    id: expect.any(Number),
  })
})
// Snapshot
// 不匹配匹配器的值会保存在快照中
exports[`will check the matchers and pass 1`] = `
Object {
  "createdAt": Any<Date>,
  "id": Any<Number>,
  "name": "LeBron James",
}
`
```

## 持续集成系统(CI) 中不会生成快照文件

截止到 Jest 20 版本，如果没有明确传入 --updateSnapshot，快照是不会自动写入 CI 系统的。 预计所有快照都是在 CI 上运行的代码的一部分，并且由于新快照会自动通过，因此它们不应通过在 CI 系统上运行的测试。 建议始终提交所有快照并将其保留在版本控制中。

## 总结

1. 把快照当做代码。第一次生成的快照是不比对的。需要程序员去读。确认正确后参与后续判断。

## title

## title
