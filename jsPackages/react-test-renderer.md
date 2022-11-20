# react-test-renderer

## overview

> 不需要 dom/native mobile 环境，把 react 组件渲染为纯 js 对象。

### feature

- feature0
- feature1
- feature2

## install

`npm i react-test-renderer`

## usage

```js
import TestRenderer from 'react-test-renderer'
function Link(props) {
  return <a href={props.page}>{props.children}</a>
}
const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
)
console.log(testRenderer.toJSON())
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }
```

## api

|                  | 说明                               | 参数                                                                              |     |     |
| ---------------- | ---------------------------------- | --------------------------------------------------------------------------------- | --- | --- |
| 静态方法         |                                    |                                                                                   |     |     |
|                  | create(element, options) => object | 创建一个表示组件树的对象（不是 ReactElement/FiberNode），保存在内存中。           |     |     |
|                  | act(cb)                            | 在 cb 中执行渲染组件的工作。通常会用于 TestRenderer.creat()/TestRenderer.update() |     |     |
| 原型对象上的属性 |                                    |                                                                                   |     |     |
|                  | toJSON()                           | 返回一个已经渲染的组件树的对象                                                    |     |     |
|                  | toTree()                           | 返回一个已经渲染的组件树的对象。比 toJSON()详细                                   |     |     |
|                  | update(element)                    | 模拟一次更新                                                                      |     |     |
|                  | unmount()                          | 模拟一次卸载                                                                      |     |     |
|                  | getInstance()                      | 返回根组件对应的实例。函数组件无实例。                                            |     |     |
|                  | root                               | 返回根元素                                                                        |     |     |
| 实例对象上的属性 |                                    |                                                                                   |     |     |
|                  | find(cb)                           | 返回 cb(testInstance)为 true 的后代测试实例，若不是一个实例，则报错。             |     |     |
|                  | findByType(type)                   | 返回匹配 type 的后代测试实例，若不是一个实例，则报错。                            |     |     |
|                  | findByProps(props)                 |                                                                                   |     |     |
|                  | findAll()                          | 返回所有 test(testInstance)为 true 的后代实例                                     |     |     |
|                  | findAllByType()                    |                                                                                   |     |     |
|                  | findAllByProps()                   |                                                                                   |     |     |
|                  | instance                           | 返回测试实例相对应的组件实例。方法组件无实例。                                    |     |     |
|                  | type                               | 返回组件的 type                                                                   |     |     |
|                  | ptops                              | 返回组件的 ptops                                                                  |     |     |
|                  | parent                             | 返回组件的 parent (父测试实例)                                                    |     |     |
|                  | children                           | 返回组件的 children （子测试实例）                                                |     |     |

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
