# `react-dom`
本文档是react v18+

## overview
> react家庭中操作dom的包。

### feature
- 一个应用中包含任意多的独立根 DOM 节点
- 该负负责把vdom生成dom.
- 只更新它需要更新的部分。
- props不能被修改

## install
`npm i react-dom`

## usage
```js
// const React = require('react');
const ReactDOM = require('react-dom');
ReactDOM.createRoot($('#id')).render(<div>str</div>)
```

## api
```js
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Internals;
exports.createPortal = createPortal$1;
exports.createRoot = createRoot$1;
exports.findDOMNode = findDOMNode;
exports.flushSync = flushSync$1;
exports.hydrate = hydrate;
exports.hydrateRoot = hydrateRoot$1;
// exports.render = render;
exports.unmountComponentAtNode = unmountComponentAtNode;
exports.unstable_batchedUpdates = batchedUpdates$1;
exports.unstable_renderSubtreeIntoContainer = renderSubtreeIntoContainer;
exports.version = ReactVersion;
```

## 受控组件 & 非受控组件
|受控组件|非受控组件||
|-|-|-|
|受别的组件影响当前组件的组件|不受别的组件影响当前组件的组件||
|使用props渲染当前组件|不使用props渲染当前组件，如使用state||

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
    return (<div>string</div>)
}
```

## [principle](/framework/react/react-dom-18/principle.html)

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。