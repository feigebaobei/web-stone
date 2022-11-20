# test utilities

react 有一个自己的单测包 react-dom/test-utils

## 引入

```js
// es6
import ReactTestUtils from 'react-dom/test-utils'
// es5
var ReactTestUtils = require('react-dom/test-utils')
```

## usage

通常与 jest 结合使用。

### demo

```js
// Counter.test.js
// 前提：
// 已经存在Counter组件
import React from 'react'
import ReactDOM from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import Counter from './Counter'

let container
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})
afterEach(() => {
  document.body.removeChild(container)
  container = null
})
// it 与 test 互为别名
it('str', () => {
  //
  act(() => {
    ReactDOM.createRoot(container).render(<Counter />)
  })
  expect(container.querySelector('p').textContent).toBe('str')

  act(() => {
    container
      .querySelector('button')
      .dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
  expect(container.querySelector('p').textContent).toBe('str1')
})
```

## api

|                                                                   | 说明                                                            | 参数         | demo                                          |     |
| ----------------------------------------------------------------- | --------------------------------------------------------------- | ------------ | --------------------------------------------- | --- |
| act(fn)                                                           | 为后续的断言、比较。需要在此方法中渲染、更新组件。              | fn 是方法    |                                               |     |
| mockComponent(componentClass, mockTagName?)                       | 创建一个假组件，使用指定标签（mockTagName）渲染。用于包裹子元素 |              |                                               |     |
| isElement(element) => boolean                                     | 参数是否是 ReactElement 对象                                    |              |                                               |     |
| isElementOfType(element, componentClass) => boolean               | 参数是否是指定的 Class 组件                                     |              |                                               |     |
| isDOMComponent(instance) => boolean                               | 是否是指定的 dom 元素                                           |              |                                               |     |
| isCompositeComponent(instance) => boolean                         | 是否是用户定义的组件。如：class 组件、funciton 组件             |              |                                               |     |
| isCompositeComponentWithType(instance, componentClass) => boolean | instance 是否是指定类的实例                                     |              |                                               |     |
| findAllInRenderedTree(tree, test)                                 |                                                                 |              |                                               |     |
| scryRenderedDOMComponentsWithClass(tree, className)               | 在渲染树中找到所有与 className 相匹配的组件                     |              |                                               |     |
| findRenderedDOMComponentWithclass(tree, className)                |                                                                 |              |                                               |     |
| scryRenderedDOMComponentWithTag(tree, tagName)                    |                                                                 |              |                                               |     |
| findRenderedDOMComponentWithTag(tree, tagName)                    |                                                                 |              |                                               |     |
| scryRenderedComponentsWithType(tree, copmonentClass)              | 找到所有指定类的实例                                            |              |                                               |     |
| findRenederdComponentWithType(tree, componentClass)               |                                                                 |              |                                               |     |
| renderIntoDocument(element)                                       | 不会，好像挺重要的。把 ReactElement 渲染到指定 dom 中。         | ReactElement |                                               |     |
| Simulate.{eventName}(element, eventData?)                         |                                                                 |              | `ReactTestUtils.Simulate.click(ReactElement)` |     |
