# react-18

## feature

- 创建 element
- 基本 hook
- 使用 vdom。（可使 diff 更快）

## install

```shell
npm i react
# 一般还需要
npm i react-dom
```

## 元素

ReactElement 对象是**不可变对象**。一旦被创建，你就无法更改它的元素或者子属性。一个对象就像电影的单帧：它代表了某个特定时刻的 UI。  
React 只更新它需要更新的部分  
过程如下：

1. 创建一个 react 元素，传入 ReactDOM.render()。
2. 与之前的 react 元素比较。只更新不同的部分。

## jsx

- 它是像 xml 的 js 代码。（当然也像 html）。
- 它是 js 代码的语法糖，会被 babel 转换为 js 代码。如:

```js
let str = 'string'
<span>{str}</span>
=>
let str = 'string'
React.createElement('span', {}, str)
```

- 在 jsx 中使用 js 代码时需要放在`{}`中
- jsx 代码会被`babel`转化为 js Function。这些 Function 返回 ReactElement。然后是更新组件、渲染视图。
- 把 html 中不区分大小写变为 camelCase。
- 支持自闭合。
- 防止注入攻击
- false, null, undefined, and true 是合法的子元素。但它们并不会被渲染。
- 首字母大写。

### jsx 的特殊属性

|           |          |     |
| --------- | -------- | --- |
| className | class    |     |
| tabIndex  | tabindex |     |
| htmlFor   | for      |     |

## 组件

没有继承，只有组合。(好像 js 语言中的对象委托呀！原型链就是对象委托的表现。)

### 函数组件

其上不能 ref 属性。因为函数组件没有实例。class 组件有实例。
就是在原来的无状态组件上添加了 hooks.  
组件名称必须以大写字母开头。

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
Clock.propTypes = { // 为props设置类型检测
    k: PropTypes.string
}
// props是只读的。
// state 是私有的，并且完全受控于当前组件。
```

### [class 组件](/framework/react/classComp.html)

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
ComponentName.contextType = MyContext // 组件内使用this.context访问
```

### state & props & this.xxx

|                    | state                | props                          | this.xxx |     |
| ------------------ | -------------------- | ------------------------------ | -------- | --- |
| 改变时             | 会触发本组件重新渲染 | 会触发本组件重新渲染           | 不会     |     |
| 来源               | 本组件               | 本组件的父元素（一般为父组件） | 本组件   |     |
| 作用范围           | 本组件               | 本组件                         | 本组件   |     |
| 是否在本组件可改变 | 可`this.setState()`  | 不可                           | 可       |     |
| 改变时是否为异步   | 是                   | -                              | 否       |     |
| 出现的组件形式     | class                | function/class                 | class    |     |
|                    |                      |                                |          |     |

- 使用`this.setState()`改变 state
- setState 是异步的。把多个 setState 合并为一个。

setState(obj | (...args) => obj)

```js
setState({k: v})
setState((state, props, any, ...) => ({k: v}))
```

### 使用组件

```
<ComponentName name="top" />
```

name 等属性会在 props 中。

### class 组件 & 方法组件

||class 组件|方法组件||
||-|-|-|
||有实例|无实例||
||会创建一个类，|不会创建类，只是数据的管道。||
||可使用生命周期方法，|不可使用||
|hook|不可使用|可使用||
|默认值|可设置 defaultProps|不可设置||
||有 displayName 属性|无||
||this.props|props||
||this.state|useState(initValue)||
|返回值|在 render()中返回 jsx/ReactElement|jsx/ReactElement||
||constructor|无||
||需要在生命周期方法中写好多与逻辑无关的代码。如请求数据。|监听当特定数据改变时执行指定方法。||
|||可使用 react 更多新功能||
|||||

### 无状态组件（已经过时了）

了解它可以帮助读者了解方法式组件

1. 只负责接收 props 渲染 DOM，不维护自己的 state。
2. 不能访问生命周期方法。
3. 不需要声明类，可以避免 extends 或 constructor 之类的代码，语法上更加简洁。
4. 不会被实例化，因此不能直接传 ref，可以使用 React.forwardRef 包装后再传 ref。
5. 不需要显示声明 this 关键字，在 ES6 的类声明中往往需要将函数的 this 关键字绑定到当前作用域，而因为函数式声明的特性，我们不需要再强制绑定。
6. 更好的性能表现，因为函数式组件中并不需要进行生命周期的管理与状态管理，因此 React 并不需要进行某些特定的检查或者内存分配，从而保证了更好地性能表现。

```js
function Hello(props) {
  return <div>Hello {props.name}</div>
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

|            |     |     |
| ---------- | --- | --- |
| 剪贴板事件 |     |     |
| 复合事件   |     |     |
| 键盘事件   |     |     |
| 焦点事件   |     |     |
| 表单事件   |     |     |
| 通用事件   |     |     |
| 鼠标事件   |     |     |
| 指针事件   |     |     |
| 选择事件   |     |     |
| 触摸事件   |     |     |
| ui 事件    |     |     |
| 滚轮事件   |     |     |
| 媒体事件   |     |     |
| 图像事件   |     |     |
| 动画事件   |     |     |
| 过滤事件   |     |     |
| 其他事件   |     |     |

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
在 componentDidMount/componentDidUpdate/componentWillUnmount 时触发。
尽量把不相关的监听写在不同的 useEffect 里。

let value = useContext(myContext)
接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。

let [state, dispatch] = useReducer(reducer, initialArg, [init])
init 是一个方法。参数是 initialArg
与 useState 功能相似。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。（如果你熟悉 Redux 的话，就已经知道它如何工作了。）
dispatch({type: 'typename', key: value}) // dispatch 的参数是 action. action.type, action.key

let memoizedCallback = useCallback(fn, ...dependencies)
只有 dependencies 改变时执行 fn
返回一个 memoized 回调函数。
只在更新组件时执行。
阻止不必要的重新渲染。

let memoizedValue = useMemo(fn: () => any, ...dependencies)
返回一个 memoized 值。
与 useCallback 类似。

let refContainer = useRef(initialValue)
useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。
组件重新渲染期间其值一直存在。
改变其值时不会重新渲染组件。
可以使用它：得到 dom 元素，跟踪状态变化（保存变化前的状态），

useImperativeHandle(ref, createHandle, [deps])
useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：

useLayoutEffect
其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，
执行顺序：更新变量值 -》 组件重新渲染 -》 执行 useLayoutEffect -> 显示渲染结果 -》 执行 useEffect
尽可能使用标准的 useEffect 以避免阻塞视觉更新。

useDebugValue(value, [fn])
可用于在 React 开发者工具中显示自定义 hook 的标签。

let deferredValue = useDeferredValue(value)
会根据 value 返回一个复制的 deferredValue（延迟数据）。当有急切的更新时要，react 会返回原来的值，当更新结束后再使用新值更新组件。

let [isPending, startTransition] = useTransition()
用于降低渲染优先级.

let id = useId() // 如 :r1:
返回一个惟一的 id.可用于跨平台。string 类型。包括:

let state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshort])
对任务进行优先级排序并同时执行多个任务。
可以把外部存储的数据读来和订阅。

useInsertionEffect(didUpdate)
它与 useEffect 的用法一样。
它会在所有 dom 更新前执行。常用于学页面布局。
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

constructor() // 为了调用 super()
static getDerivedStateFromProps(nextProps, prevState)
它是静态方法，不能使用 this。只能作一些无副作用的操作。
若返回一个对象，则更新 state。若返回 null，则不更新。
render()
class 组件中必须使用的方法。
用于渲染 dom.
必须返回 reactDOM。也就是 ReactElement 对象。
不要在 render 中执行 setState
getSnapshotBeforeUpdate(prevProps, prevState)
render 之后，被挂载时调用。
componentDidMount()
挂载组件后调用
常用于发送网络请求。启用事件监听方法。
shouldComponentUpdate(nextProps, nextState)
控制是否进行更新。若返回 true，则更新。否则不更新。
componentDidUpdate(prevProps, prevState, snapshot)
更新后被调用。首次渲染不会被执行。
当前的 props 和 state 是 this.props/this.state
componentWillUnmount()
在组件即将被卸载或销毁时进行调用。
</code>

</pre>
</artical>
</details>

## 基础使用

```js
// 挂载
// 1. 创建一个root节点
// 2. 为root节点传参
let root = ReactDOM.reactRoot(document.getElementById('root'))
root.reander(<app />)
// 条件渲染
function C() {
  if (xx) {
    return <A />
  } else {
    return <B />
  }
}
xx && <A />
xx ? <A /> : <B />
function C() {
  if (xx) {
    return null
  } else {
    return <A />
  }
}
// list & key
function A(props) {
  return props.list.map((item, index) => {
    return <li key={index}>{item.label}</li>
  })
}
```

## [context](framework/react/react-18/context.html)

- 主要用于不同层级的组件使用同一份数据。

## fragment

- 短语法 `<>...</>`
- 长语法 `<fragment>...</fragment>`
- 惟一可接收的 props： `key`
- 用于返回若干同级元素。

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
    这是一个内置组件。用于把多个子组件放在一起。
exports.Profiler

exports.PureComponent
exports.StrictMode
exports.Suspense
    这是一个内置组件。指定懒加载组件不具备渲染条件时（使用fallback属性指定）显示的内容。
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED= ReactSharedInternals;
exports.cloneElement
exports.createContext(defaultValue)
    创建一个Context对象。
    只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
exports.createElement
exports.createFactory
exports.createRef
    类组件中使用ref
exports.forwardRef((props, ref) => {
    <dom ref={ref}>...</dom>
})
    让方法式组件也支持ref属性。把ref透传下去
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

## 优化

- `<React.Suspense/> + React.lazy()`
- React.memo(Comp)
- React.PureComponent
- shouldComponentUpdate
- 代码分割： React.lazy() / router

## PureComponent

纯组件只进行简单比较 props。  
纯组件可与不可变对象结合使用。（array/object 都是可变对象）  
React.PureComponent 内实现了`shouldComponentUpdate()`(React.Component 中未实现)。该方法会简单判断是否需要更新。该方法会跳过所有子组件的 props 更新。

## 异常捕获边界

https://zh-hans.reactjs.org/docs/error-boundaries.html

`static getDerivedStateFromError(error)` // 有错误时触发，用于渲染降级 ui  
`componentDidCatch(error, errorInfor)` // 捕获错误  
自定义错误边界的粒度。  
若不捕获错误，则会导致整个 react 树被卸载。请根据页面区域划分捕获错误。阻止全页面空白。

## forwardRef

为常规函数组件提供接收 ref 的功能。

```js
// 父组件
let ref = React.createRef()
<FancyButton ref={ref} />
// 子组件
const FancyButton = React.forwardRef(props, ref) {
    return <button ref={ref}>str</button>
}
export default FancyButton
```

第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，**且 props 中也不存在 ref**。  
Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。

## HOC 高阶组件

- 组件：把 props => ui
- hoc：把组件 => 另一个组件
- 将组件包装在容器内，组成新组件。
- 是纯函数，无副作用。
- 不应用修改传入的组件，而是修改组合方式。
- 与容器组件相似
- 在组件树中横截面操作
  - 属性代理 (修改 props。如：增删改)
- 不要在 render 中使用 hoc

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
- shouldComponentUpdate 阻止不必要的更新
- useMemo
- useCallback
- useDeferredValue
- useTransition
-

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

在若干 props 值中有一个是方法的 props 值。该 props 值就是 render props. (与 HOC 有些类似)

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

- [flow](/language/flow/index.html) (react 就是用它写的)
- [ts](/language/typescript/index.html) （ms 开发的强类型 js）
- ReScript 不会
- Kotlin 不会
- PropTypes

### PropTypes

propTypes 仅在开发模式下进行检查。
从 react v15.5 后分离出`prop-types`包。

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

react 也有自己的严格模式。

```js
<React.StrictMode>
  <Comp />
</React.StrictMode>
```

只检查包裹在内的元素。

- 识别不安全的生命周期。
- 警告过时的 ref api
- 警告过时的 context api
- 警告废弃的 findDOMNode 方法
- 检测意外的副作用
- 确保可复用的状态

不要在渲染阶段的生命周期中执行副作用。

## 受控组件 & 非受控组件

专用于 form 元素的分类。
|受控组件|非受控组件||
|-|-|-|
|本组件内使用 state+根据用户输入更新表单数据|使用`ref`得 dom 后取表单数据||
|用于设置|用于得到||
||||

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

## diff

好像是对象改变时执行 diff 运算。  
vue3 使用 proxy 监听对象的属性变化时执行 rerender.  
react 当组件链上的 ReactElement 改变时执行 rerender.

## [Web Components](/webComonents/index.html)

react 和 web components 一起使用时与 react 和 html 一起使用时一样、无差别。

## todo

### 有很多以`$$`开头的变量。

### 有好多针对 dev 环境的检查错误。

```js
if (__DEV__) {...}
```

### 多以构造函数+prototype+Object.defineProperty 的方式写代码。

为什么不用 class 呢？

### import/export 结构很清晰。源码比 vue 好看多了。

### 方法组件&class 组件的区别

### 在 class 组件中为什么修改 state 的惟一方法是 setState()

### 为什么当前组件不能知道别的组件中的 state 的值

## 版本迭代

16 增加 fiber
17 在\*.jsx 文件中自动引入`reatct/jsx-runtime`，用于处理 jsx

### 在源码上看看为什么类组件不能使用 hooks

### 何时更新组件

- props/state 改变时。
- 父组件重新渲染时

### 严格模式为什么会渲染 2 次

strict mode 的通过两次调用 constructor 和 render 函数来更好的检测不符合预期的 side effects  
下列函数会执行两次

- 类组件的 constructor,render 和 shouldComponentUpdate 方法
- 类组建的静态方法 getDerivedStateFromProps
- 函数组件方法体
- 状态更新函数(setState 的第一个参数)
- 传入 useState,useMemo 或 useReducer 的函数  
  在 production 环境下不会这样,所以不用担心

### 未来迭代计划。

都已经推荐使用 function 组件了，在官方文档中还是大多数是 class 组件。

### 未来迭代计划。
