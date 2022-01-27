# `react`

## overview

> 声明式  
> 基于组件的  
> 一次学习，多次使用  
> jsx语法。（类似xml，由babel解释。）  
> React 团队希望，组件不要变成复杂的容器，最好只是数据流的管道。开发者根据需要，组合管道即可。 组件的最佳写法应该是函数，而不是类。  

### feature

- feature0
- feature1
- feature2

## install

`npm i react`

## usage

见demo

## demo

- [demo0-first](/react/demo0/first.html)  
- [demo0-second](/react/demo0/second.html)  
- [demo1]()  

## hooks

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
若fn返回一个方法则方法在御载组件是被调用。
listener指定当哪个变量变化时触发fn.

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
componentDidMount()
    挂载组件后调用
    常用于发送网络请求。启用事件监听方法。
shouldComponentUpdate(nextProps, nextState)
    控制是否进行更新。若返回true，则更新。否则不更新。
getSnapshotBeforeUpdate(prevProps, prevState)
    render之后，被挂载时调用。
componentDidUpdate(prevProps, prevState, snapshot)
    更新后被调用。首次渲染不会被执行。
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

## configuration

默认配置文件：`path/to/file.json`。

## api

`react.fn(param, first: string, second: boolean = true) => void`
description

`react.fn(param, [options: {a: string, b?: number}])`
description

## principle

此包的处理逻辑。

### uml

```

```

## react家族成员

- [redux](/react/redux/index.html)  
- [react native](/react/reactNative.html)  
- [react-router react-router-dom react-router-native](/react/router.html)  
- [title](/react/title.html)  
- [title](/react/title.html)  
- [title](/react/title.html)  
- [title](/react/title.html)  
- [title](/react/title.html)  

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。