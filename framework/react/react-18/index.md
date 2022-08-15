# `react-18`

## feature

- 创建element
- 基本hook
- 使用vdom。（可使diff更快）

## install

`npm i react`

## 元素
React 元素是**不可变对象**。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。  
React 只更新它需要更新的部分  
过程如下：
1. 创建一个react元素，传入ReactDOM.render()。
2. 与之前的react元素比较。只更新不同的部分。

## jsx
- 它是像xml的js代码。（当然也像html）。  
- 它是js代码的语法糖，会被babel转换为js代码。如:
```
let str = 'string'
<span>{str}</span>
=>
let str = 'string'
React.createElement('span', {}, str)
```
- 在jsx中使用js代码时需要放在`{}`中
- jsx代码会被`babel`转化为js Function。这些Function返回ReactElement。然后是更新组件、渲染视图。  
- 把html中不区分大小写变为camelCase。  
- 支持自闭合。  
- 防止注入攻击
- false, null, undefined, and true 是合法的子元素。但它们并不会被渲染。
- 首字母大写。

### jsx的特殊属性
||||
|-|-|-|
|className|class||
|tabIndex|tabindex||
|htmlFor|for||

## 组件
没有继承，只有组合。(好像js语言中的对象委托呀！原型链就是对象委托的表现。)

### 函数组件
其上不能ref属性。因为函数组件没有实例。class组件有实例。
就是在原来的无状态组件上添加了hooks.  
```js
// 函数组件模板
import {useReducer} from 'react'
import PropTypes from 'prop-types'
funtion Clock(props) { // (props) => ReactElement
    let initObj = {}
    let [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'str':
                res = {..}
        }
        return res
    }, initObj)
    useEffect(() => {...}, [])
    // 定义缓存数据
    let param = useMemo(() => {
        return 0
    }, [])
    // 定义缓存回调方法
    let cb = useCallback(() => {
        // 处理逻辑
    }, [])
    return ... // ReactElement
}
Clock.propTypes = {
    k: PropTypes.string
}
// props是只读的。
// state 是私有的，并且完全受控于当前组件。
```
组件名称必须以大写字母开头。

### [class组件](/framework/react/classComp.html)
```js
// 类组件模板
import PropTypes from 'prop-types'
class ComponentName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...}
    }
    // 生命周期函数
    componentDidMount() {...}
    componentWillUnmount() {...}
    render() {
        return ... // ReactElement
    }
}
ComponentName.propTypes = { // 检查参数数据类型
    k: PropTypes.string
}
ComponentName.defaultProps = { // 类组件可以设置默认props值。方法组件不可以。
    k: 'v'
}
```
setState({k: v})
setState((state, props, any) => ({k: v}))

### 使用组件
```
<ComponentName name="top" />
```
name等属性会在props中。

### 不同点

|class组件|方法组件||
|-|-|-|
|有实例|无实例||
|会创建一个类，|不会创建类，只是数据的管道。||
|可使用生命周期方法，|不可使用||
|不可使用|可使用hook||
|可设置defaultProps|不可设置||
|有displayName属性|无||
|this.props|props||
|this.state|useState(initValue)||
|必有render()|无||
|constructor|无||
|需要在生命周期方法中写好多与逻辑无关的代码。如请求数据。|监听当特定数据改变时执行指定方法。||
||可使用react更多新功能||
||||

### 无状态组件（已经过时了）
了解它可以帮助读者了解方法式组件
1. 只负责接收props渲染DOM，不维护自己的state。
2. 不能访问生命周期方法。
2. 不需要声明类，可以避免extends或constructor之类的代码，语法上更加简洁。
2. 不会被实例化，因此不能直接传ref，可以使用React.forwardRef包装后再传ref。
2. 不需要显示声明this关键字，在ES6的类声明中往往需要将函数的this关键字绑定到当前作用域，而因为函数式声明的特性，我们不需要再强制绑定。
2. 更好的性能表现，因为函数式组件中并不需要进行生命周期的管理与状态管理，因此React并不需要进行某些特定的检查或者内存分配，从而保证了更好地性能表现。

```js
function Hello(props) { 
    return (
        <div>Hello {props.name}</div>
    )
} 
```

## [事件](/framework/react/event.html)
命名采用小驼峰式
事件对应的方法的参数 e 是一个合成对象`SyntheticEvent`，与原生事件对象不完全相同。

- 源码中使用`addEventListener()`添加事件。
- 使用`e.preventDefault()`防止默认行为
- 使用`e.stopPropagation()`防止冒泡行为
- 绑定事件示例 `<button onClick={() => this.handleClick()}>` `<button onClick={this.handleClick}>`
- 传参示例 `<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>` `<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>`
- 

||||
|-|-|-|
|剪贴板事件|||
|复合事件|||
|键盘事件|||
|焦点事件|||
|表单事件|||
|通用事件|||
|鼠标事件|||
|指针事件|||
|选择事件|||
|触摸事件|||
|ui事件|||
|滚轮事件|||
|媒体事件|||
|图像事件|||
|动画事件|||
|过滤事件|||
|其他事件|||

## jsx
它是js代码的语法糖，会被babel转换为js代码。如:
```
let str = 'string'
<span>{str}</span>
=>
let str = 'string'
React.createElement('span', {}, str)
```

## [hooks](/framework/react/hooks.md)

<details>
  <summary>hooks</summary>
  <artical>
    <ul>
        <li>从react v16.8开始支持hooks。</li>
        <li>内置于react中</li>
        <li>100%向后兼容</li>
        <li>不影响使用class组件</li>
        <li>不计划代替class组件</li>
        <li>可以不迁移class组件</li>
        <li>ellint-plugin-react-hooks已经内置与create-react-app中</li>
    </ul>
<pre>
<code>
let [value, setValue] = useState([initValue])
用于处理组件内的状态
setValue(newValue)

useEffect(fn, ...listener = [])
用于处理副作用
在componentDidMount/componentDidUpdate/componentWillUnmount时触发。
尽量把不相关的监听写在不同的useEffect里。  

let value = useContext(myContext)
接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。

let [state, dispatch] = useReducer(reducer, initialArg, [init])
init是一个方法。参数是initialArg
与useState功能相似。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。（如果你熟悉 Redux 的话，就已经知道它如何工作了。）
dispatch({type: 'typename', key: value}) // dispatch的参数是action. action.type, action.key

let memoizedCallback = useCallback(fn, ...dependencies)
只有dependencies改变时执行fn
返回一个 memoized 回调函数。
只在更新组件时执行。
阻止不必要的重新渲染。

let memoizedValue = useMemo(fn, ...dependencies)
返回一个 memoized 值。
与useCallback类似。

let refContainer = useRef(initialValue)
useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。
组件重新渲染期间其值一直存在。
改变其值时不会重新渲染组件。
可以使用它：得到dom元素，跟踪状态变化（保存变化前的状态），

useImperativeHandle(ref, createHandle, [deps])
useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：

useLayoutEffect
其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，
执行顺序：更新变量值 -》 组件重新渲染 -》 执行useLayoutEffect -> 显示渲染结果 -》 执行useEffect
尽可能使用标准的 useEffect 以避免阻塞视觉更新。

useDebugValue(value, [fn])
可用于在 React 开发者工具中显示自定义 hook 的标签。

let deferredValue = useDeferredValue(value)
会根据value返回一个复制的deferredValue（延迟数据）。当有急切的更新时要，react会返回原来的值，当更新结束后再使用新值更新组件。

let [isPending, startTransition] = useTransition()
用于降低渲染优先级.

let id = useId() // 如 :r1:
返回一个惟一的id.可用于跨平台。string类型。包括:  

let state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshort])
对任务进行优先级排序并同时执行多个任务。
可以把外部存储的数据读来和订阅。

useInsertionEffect(didUpdate)
它与useEffect的用法一样。
它会在所有dom更新前执行。常用于学页面布局。
</code>
</pre>

<p>自定义hooks</p>
<p>hooks的规则</p>
<ul>
    <li>只能在function组件内的顶级中使用</li>
    <li>不能被使用条件判断</li>
</ul>
</artical>
</details>

## 生命周期方法

<details>
  <summary>生命周期方法</summary>
<artical>
<pre>
<img src="https://www.runoob.com/wp-content/uploads/2016/02/ogimage.png" alt="">
<ul>
    <li>挂载</li>
    <li>
        <ul>
            <li>constructor</li>
            <li>getDerivedStateFromProps(error) 当更新state且出现错误时执行。可用于显示降级ui</li>
            <li>render</li>
            <li>componentDidMount</li>
            <li>componentDidCatch(error, info) 当后代组件出现错误时执行</li>
        </ul>
    </li>
    <li>
    <li>更新</li>
    <li>
        <ul>
            <li>getDerivedStateFromProps</li>
            <li>shouldComponentUpdate</li>
            <li>render</li>
            <li>getSnapshotBeforeUpdate</li>
            <li>componentDidUpdate</li>
        </ul>
    </li>
    <li>
    <li>卸载</li>
    <li>
        <ul>
            <li>componentDidUnmount</li>
        </ul>
    </li>
</ul>
<code>
只能在class组件中使用

constructor() // 为了调用super()
static getDerivedStateFromProps(nextProps, prevState)
    它是静态方法，不能使用this。只能作一些无副作用的操作。
    若返回一个对象，则更新state。若返回null，则不更新。
render()
    class组件中必须使用的方法。
    用于渲染dom.
    必须返回reactDOM。也就是ReactElement对象。
    不要在render中执行setState
getSnapshotBeforeUpdate(prevProps, prevState)
    render之后，被挂载时调用。
componentDidMount()
    挂载组件后调用
    常用于发送网络请求。启用事件监听方法。
shouldComponentUpdate(nextProps, nextState)
    控制是否进行更新。若返回true，则更新。否则不更新。
componentDidUpdate(prevProps, prevState, snapshot)
    更新后被调用。首次渲染不会被执行。
    当前的props和state是this.props/this.state
componentWillUnmount()
    在组件即将被卸载或销毁时进行调用。
</code>
</pre>
</artical>
</details>

## context

<details>
  <summary>context</summary>
<artical>
<pre>
import { createContext } from 'react'
export let DataContext = createContext() // 在组件外生成context对象

import { useState } from "react";
import { C } from '../C/index'
import { DataContext } from "../../context";
export function First () {
    let [data] = useState({k: 'v'})
    return (<DataContext.Provider value={data}> // 让context提供指定的数据
        <C></C>
    </DataContext.Provider>)
}

import { useContext } from "react";
import { DataContext } from "../../context";
export function C () {
    let data = useContext(DataContext)
    return (<div>
        {JSON.stringify(data)}
    </div>)
}
</pre>
</artical>
</details>

## state
- 使用`this.setState()`改变state
- setState是异步的。把多个setState合并为一个。

setState(obj | (...args) => obj)

## 数据
从根组件向叶子组件流动。  

## memoized

<details>
  <summary>memoized</summary>
<artical>
<pre>
</pre>
</artical>
</details>

## api
```js
exports.Children
exports.Component
exports.Fragment
exports.Profiler

exports.PureComponent
exports.StrictMode
exports.Suspense
    这是一个内置组件。指定懒加载组件不具备渲染条件时（使用fallback属性指定）显示的内容。
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED= ReactSharedInternals;
exports.cloneElement
exports.createContext
exports.createElement
exports.createFactory
exports.createRef
    类组件中使用ref
exports.forwardRef((props, ref) => {
    <dom ref={ref}>...</dom>
})
    让方法式组件也支持ref属性。把ref透传下去
exports.Fragment
    这是一个内置组件。用于把多个子组件放在一起。
exports.isValidElement(obj)
    验证对象是否为react对象
exports.lazy(() => {return Promise})
    参数是一个方法，该方法返回一个Promise，该promise返回一个组件。
    用于动态加载组件。可缩减bundle的体积。
exports.memo(Comp)
    当props、useState/useReducer/useContext改变时重新渲染组件
exports.startTransition(fn)
    明确指定降低ui更新优先级的更新。
exports.unstable_act
exports.useCallback
exports.useContext
exports.useDebugValue
exports.useDeferredValue
exports.useEffect
exports.useId
exports.useImperativeHandle
exports.useInsertionEffect
exports.useLayoutEffect
exports.useMemo
exports.useReducer
exports.useRef
    （方法组件上不能使用ref属性）
exports.useState
exports.useSyncExternalStoreuseSyncExternalStore;
exports.useTransition
exports.version
```

## [principle](/framework/react/react-18/principle.md)

### 更新机制
### fiber
比进程、线程还要细致的控制方式。



### uml
```

```

## 组件间传递数据的方式
- props + event
- context

## 代码分割
### 1. import()
```
import(...).then(...).catch(...)
```

### 2. React.lazy() 懒加载
```js
let OtherComponent = React.lazy(() => import(...)) // 只能导出default
// 代码将会在组件首次渲染时，自动导入包含 OtherComponent 组件的包。
```
## ui优化
- `<React.Suspense/> + React.lazy()`  
- React.memo(Comp)  
- React.PureComponent  
- shouldComponentUpdate  

## PureComponent
纯组件只进行简单比较props。  
纯组件可与不可变对象结合使用。（array/object都是可变对象）  
React.PureComponent内实现了`shouldComponentUpdate()`(React.Component中未实现)。该方法会简单判断是否需要更新。该方法会跳过所有子组件的props更新。


## 异常捕获边界
https://zh-hans.reactjs.org/docs/error-boundaries.html

## HOC 高阶组件
```js
// 定义
function HOC(WC, sf) {
    return function (props) {
        let [d, setD] = setState(sf(props))
        let f = (o) => {
            setD(sf({...props, ...o}))
        }
        return <WC d={d} onEvent={f} />
    }
}
// 使用
let C = function (props) {...}
let A = HOC(C, () => {...})
let B = HOC(C, () => {...})
<A />
<B />
```

## 提高性能
- 使用生产版本。
- 访问打包后的文件。
- 打包时压缩
- 虚拟化长列表 `react-window` 和 `react-virtualized`
- shouldComponentUpdate阻止不必要的更新

## Profiler API
用于测量渲染速度。
```js
let renderHander = (obj) => {...}
// obj: {
//   id, // 发生提交的 Profiler 树的 “id”
//   phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
//   actualDuration, // 本次更新 committed 花费的渲染时间
//   baseDuration, // 估计不使用 memoization 的情况下渲染整棵子树需要的时间
//   startTime, // 本次更新中 React 开始渲染的时间
//   commitTime, // 本次更新中 React committed 的时间
//   interactions // 属于本次更新的 interactions 的集合
// }
<Profiler id="id" onRender={renderHander}><OtherComp /></Profiler>
```

## Render Props
在若干props值中有一个是方法的props值。该props值就是render props.  (与HOC有些类似)
```js
function C (props) {
    return <div>
        {props.render(...)}
    </div>
}
function P () {
    return <C render={(...args) => {...}} />
}
// 若与PureComponent一起使用可以
```

## 静态类型检查
- flow (react就是用它写的)
- ts （ms开发的强类型js）
- ReScript 不会
- Kotlin 不会
- PropTypes

### PropTypes
propTypes 仅在开发模式下进行检查。
从react v15.5后分离出`prop-types`包。
```js
import PropTypes form 'prop-types'
// 定义Comp ...
Comp.propTypes = {
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,
    optionalNode: PropTypes.node,
    optionalElement: PropTypes.element,
    optionalElementType: PropTypes.elementType,
    optionalMessage: PropTypes.instanceOf(Message),
    optionalEnum: PropTypes.oneOf(['News', 'Photos']),
    optionalUnion: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Message)
    ]),
    optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),
    optionalObjectWithShape: PropTypes.shape({
        color: PropTypes.string,
        fontSize: PropTypes.number
    }),
    optionalObjectWithStrictShape: PropTypes.exact({
        name: PropTypes.string,
        quantity: PropTypes.number
    }),
    requiredFunc: PropTypes.func.isRequired,
    requiredAny: PropTypes.any.isRequired,
}
```

## 严格模式
react也有自己的严格模式。
```js
<React.StrictMode>
    <Comp />
</React.StrictMode>
```
只检查包裹在内的元素。
- 识别不安全的生命周期。
- 警告过时的ref api
- 警告过时的context api
- 警告废弃的findDOMNode方法
- 检测意外的副作用
- 确保可复用的状态

不要在渲染阶段的生命周期中执行副作用。

## 受控组件 & 非受控组件
专用于form元素的分类。
|受控组件|非受控组件||
|-|-|-|
|本组件内使用state+根据用户输入更新表单数据|使用`ref`得dom后取表单数据||

```js
// 受控组件
this.state = {k: 'v'}
cF(event) {
    this.setState({k: event.target.value})
}
<form onSubmit={}>
    <input type="file" value={this.state.k} onChange={this.cF} />
</form>
// 非受控组件
this.fileInput = React.createRef()
fn() {
    clog(this.fileInput.current.file[0].name)
}
<form onSubmit={fn}>
    <input type="file" ref={this.fileInput}>
</form>
```

## [Web Components](/webComonents/index.html)
react和web components一起使用时与react和html一起使用时一样、无差别。

## todo

### 有很多以`$$`开头的变量。
### 有好多指对dev环境的检查错误。
```js
if (__DEV__) {...}
```
### 多以构造函数+prototype+Object.defineProperty的方式写代码。
为什么不用class呢？

### import/export结构很清晰。源码比vue好看多了。

### 方法组件&class组件的区别
### 在class组件中为什么修改state的惟一方法是setState()
### 为什么当前组件不能知道别的组件中的state的值
## 版本迭代
16 增加fiber
17 在*.jsx文件中自动引入`reatct/jsx-runtime`，用于处理jsx

### 在源码上看看为什么类组件不能使用hooks
### 未来迭代计划。
### 未来迭代计划。
### 未来迭代计划。