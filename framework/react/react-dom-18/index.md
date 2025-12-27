# `react-dom`

本文档是 react v18+

## overview

> react 家庭中操作 dom 的包。
> 它是 client/server 渲染组件的入口。通常与 react 配对使用。

### feature

- 一个应用中包含任意多的独立根 DOM 节点
- 该包负责把 vdom 生成 dom.
- 只更新它需要更新的部分。
- props 不能被修改

## install

`npm i react-dom`

## usage

```js
// const React = require('react');
const ReactDOM = require('react-dom')
ReactDOM.createRoot($('#id')).render(<div>str</div>)
```

## api

```js
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Internals
exports.createPortal = createPortal$1
exports.createRoot = createRoot$1
exports.findDOMNode = findDOMNode
exports.flushSync = flushSync$1
exports.hydrate = hydrate
exports.hydrateRoot = hydrateRoot$1
// exports.render = render;
exports.unmountComponentAtNode = unmountComponentAtNode
exports.unstable_batchedUpdates = batchedUpdates$1
exports.unstable_renderSubtreeIntoContainer = renderSubtreeIntoContainer
exports.version = ReactVersion
```

## 受控组件 & 非受控组件

| 受控组件                     | 非受控组件                              |     |
| ---------------------------- | --------------------------------------- | --- |
| 受别的组件影响当前组件的组件 | 不受别的组件影响当前组件的组件          |     |
| 使用 props 渲染当前组件      | 不使用 props 渲染当前组件，如使用 state |     |

## class & function 组件

```js
class Comp extends React.Component {
    contructor(props) {
        super(props)
        this.state = {
            key: props.key // 取出props中的数据，放入当前组件的state中。成为非受控组件。
        }
        // ...
    }
    render() {
        return (<div>string<div>)
    }
}
```

```js
function Comp(props) {
  // ...
  return <div>string</div>
}
```

## portal

```js
ReactDOM.createPortal(child, dom)
// 把可渲染的react元素挂载到指定dom中(可以不是父组件的dom)。
```

portal 仍存在于 React 树， 且与 DOM 树 中的位置无关。（这样就与合成事件呼应了）。

```js
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
function Child(props) {
  let $el = document.createElement('div')
  let bd = document.querySelector('body')
  useEffect(() => {
    bd.appendChild($el)
    return () => {
      bd.removeChild($el)
    }
  })
  return createPortal(props.children, $el)
}
export function Three() {
  let ThreeClickHandler = () => {
    console.log('Three ThreeClickHandler')
  }
  return (
    <div onClick={ThreeClickHandler}>
      <Child>
        <button>string</button>
      </Child>
    </div>
  )
}
```

## diff

O(n)

- 不同类型的元素会产生不同的树。
- 使用 key 属性标识在不同的渲染中可能是不变的。

对比不同类型的元素
当根节点为不同类型的元素时，React 会拆卸原有的树并且建立起新的树。
对比同一类型的元素
当对比两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性。
对比同类型的组件元素
React 将更新该组件实例的 props 以保证与最新的元素保持一致，并且调用该实例的 UNSAFE_componentWillReceiveProps()、UNSAFE_componentWillUpdate() 以及 componentDidUpdate() 方法。再调用 render() 方法。然后 diff 算法将在之前的结果以及新的结果中进行递归。
对子节点进行递归
默认情况下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation。

## [principle](/framework/react/react-dom-18/principle.html)

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
