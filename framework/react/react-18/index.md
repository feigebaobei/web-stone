# `react-18`

## feature

- 创建element
- 基本hook
- 使用vdom。（可使diff更快）

## install

`npm i react`

## 元素
React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。  
React 只更新它需要更新的部分  
过程如下：
1. 创建一个react元素，传入ReactDOM.render()。
2. 与之前的react元素比较。只更新不同的部分。

## jsx
它是像xml的js代码。（当然也像html）。  
它是js代码的语法糖，会被babel转换为js代码。如:
```
let str = 'string'
<span>{str}</span>
=>
let str = 'string'
React.createElement('span', {}, str)
```
jsx代码的本质是js Function。这些Function返回ReactElement.然后是更新组件、渲染视图。  
把html中不区分大小写变为camelCase。  
支持自闭合。  

## 组件
没有继承，只有组合。(好像js语言中的对象委托呀！原型链就是对象委托的表现。)
### 函数组件
```
(props) -> ReactElement
funtion Clock(props) {
    return ... // ReactElement
}
// props是只读的。
// state 是私有的，并且完全受控于当前组件。
```
组件名称必须以大写字母开头。

### class组件
```
class ComponentName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...}
    }
    <!-- 生命周期函数 -->
    componentDidMount() {...}
    componentWillUnmount() {...}
    render() {
        return ... // ReactElement
    }
}
```
setState({k: v})
setState((state, props, any) => ({k: v}))

### 使用组件
```
<ComponentName name="top" />
```
name等属性会在props中。

## 事件
命名采用小驼峰式
事件对应的方法的参数 e 是一个合成对象，与原生事件对象不完全相同。





## hooks
考虑把它移到 react包 中。它是js代码的语法糖，会被babel转换为js代码。如:
```
let str = 'string'
<span>{str}</span>
=>
let str = 'string'
React.createElement('span', {}, str)
```

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
useEffect(() => {})         => componentDidMount, componentDidUpdate
useEffect(() => {}, [])         => componentDidMount
useEffect(() => {}, [p])         => componentDidMount, 当p改变时
useEffect(() => () => {})         => componentWillUnMount
fn中不能直接使用异步方法（async/await），需要使用立即执行函数包裹异步方法。
若fn返回一个方法则方法在御载组件时被调用。
listener指定当哪个变量变化（使用浅复制比较）时触发fn.

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
  <summary>hooks</summary>
<artical>
<pre>
<img src="https://www.runoob.com/wp-content/uploads/2016/02/ogimage.png" alt="">
<ul>
    <li>挂载</li>
    <li>
    <ul>
    <li>constructor</li>
    <li>getDerivedStateFromProps</li>
    <li>render</li>
    <li>componentDidMount</li>
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
    <li>
</ul>
<code>
constructor() // 为了调用super()
static getDerivedStateFromProps(nextProps, prevState)
    它是静态方法，不能使用this。只能作一些无副作用的操作。
    若返回一个对象，则更新state。若返回null，则不更新。
render()
    class组件中必须使用的方法。
    用于渲染dom.
    必须返回reactDOM
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
  <summary>hooks</summary>
<artical>
<pre>
import {useState, createContext, useContext} from 'react'
import ReactDOM from 'react-dom'

let UserContext = createContext() // 生成context对象

function CP () {
    let [user, setUser] = useState('top')
    return (
        <UserContext.Provider value={user}> // 让context提供指定的数据
            <C1 user={user} /> // C1及其子组件都可以使用指定的数据
        </UserContext.Provider>
    )
}

function C1 () {
    let user = useContext(UserContext) // 使用context提供的数据
    return (<>
        <p>{`hi ${user}`}</p>
    </>)
}
</pre>
</artical>

</details>

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
exports.Children = Children;
exports.Component = Component;
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.Profiler = REACT_PROFILER_TYPE;
exports.PureComponent = PureComponent;
exports.StrictMode = REACT_STRICT_MODE_TYPE;
exports.Suspense = REACT_SUSPENSE_TYPE;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
exports.cloneElement = cloneElement$1;
exports.createContext = createContext;
exports.createElement = createElement$1;
exports.createFactory = createFactory;
exports.createRef = createRef;
exports.forwardRef = forwardRef;
exports.isValidElement = isValidElement;
exports.lazy = lazy;
exports.memo = memo;
exports.startTransition = startTransition;
exports.unstable_act = act;
exports.useCallback = useCallback;
exports.useContext = useContext;
exports.useDebugValue = useDebugValue;
exports.useDeferredValue = useDeferredValue;
exports.useEffect = useEffect;
exports.useId = useId;
exports.useImperativeHandle = useImperativeHandle;
exports.useInsertionEffect = useInsertionEffect;
exports.useLayoutEffect = useLayoutEffect;
exports.useMemo = useMemo;
exports.useReducer = useReducer;
exports.useRef = useRef;
exports.useState = useState;
exports.useSyncExternalStore = useSyncExternalStore;
exports.useTransition = useTransition;
exports.version = ReactVersion;
```

## [principle](/framework/react/react-18/principle.md)

### 更新机制
### fiber




### uml

```

```

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

### 未来迭代计划。
### 未来迭代计划。
### 未来迭代计划。
### 未来迭代计划。