# react-18

## feature

- 创建 element
- 基本 hook
- 使用 vdom。（可使 diff 更快。O(n^3) -> O(n)）

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

- React.createElement(component, props, ...children)
- 它是像 xml 的 js 代码。（当然也像 html）。
- 它是 js 代码的语法糖，会被 babel 转换为 js 代码。如:
- 组件名以大写字母开头。小写会被认为是 html 标签。
- 使用`{}`包裹 js 表达式
- `"str"` <=> `{'str'}`
- props 默认为 true
- 会移除行首尾的空格以及空行。与标签相邻的空行均会被删除，文本字符串之间的新行会被压缩为一个空格。
- false, null, undefined, and true 是合法的子元素。但它们并不会被渲染

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

其上不能直接使用 ref 属性。因为函数组件没有实例。class 组件有实例。  
就是在原来的无状态组件上添加了 hooks.  
组件名称必须以大写字母开头。  
只有在你刻意忽略 prop 更新的情况下使用。此时，应将 prop 重命名为 initialColor 或 defaultColor。

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
Clock.defaultProps = {
    k: 'str'
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
        this.domClickHandler = this.domClickHandler.bind(this) // class组件不会自己绑定this。需要在constructor中使用bind(this)绑定方法
    }
    // 生命周期函数
    componentDidMount() {...}
    componentWillUnmount() {...}
    domClickHandler() {...}
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

|                    | state                | props                          | this.xxx       |     |
| ------------------ | -------------------- | ------------------------------ | -------------- | --- |
| 改变时             | 会触发本组件重新渲染 | 会触发本组件重新渲染           | 不会           |     |
| 来源               | 本组件               | 本组件的父元素（一般为父组件） | 本组件         |     |
| 作用范围           | 本组件               | 本组件                         | 本组件         |     |
| 是否在本组件可改变 | 可`this.setState()`  | 不可                           | 可             |     |
| 改变时是否为异步   | 是                   | -                              | 否             |     |
| 出现的组件形式     | class                | function/class                 | function/class |     |
|                    |                      |                                |                |     |

- 使用`this.setState()`改变 state
- setState 本质是同步的。因 react 的优化机制，有时表现为异步，有时表现为同步。

```js
setState({k: v})
setState((state, props, any, ...) => ({k: v}))
```

|      |                                     |                                                                                         |
| ---- | ----------------------------------- | --------------------------------------------------------------------------------------- |
| 异步 | 在合成事件、钩子函数中表现为异步    | 合成事件和钩子函数在更新之间调用。可以使用 setState(partialState, cb)得到更新后的结果。 |
| 同步 | 在原生事件、setTimeout 中表现为同步 | 这 2 种情况不会批量更新。                                                               |

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
||只实例化一次。后续执行只执行 render 方法。|每次都执行一次方法体||
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

## [hooks](/framework/react/hooks.md)

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
它是静态方法，不能使用 this。只能作一些无副作用的操作。整个 render 阶段都不能执行副作用方法。
若返回一个对象，则更新 state。若返回 null，则不更新。
即使 props 没有任何变化，而是父 state 发生了变化，导致子组件发生了 re-render，这个生命周期函数依然会被调用。
此生命周期方法在 render 阶段执行。
既然是生命周期方法，则只能在 class 组件中使用。
它是为 state 赋值的。
static getDerivedStateFromProps(nextProps, prevState) {
// 必须返回值。
if (condition) {
return {
b: prevState.b,
// ...prevState
a: nextProps.a,
}
}
return null //
}
尽量不要写内 props/state 共同控制的组件（即：受控&非受控）

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

## [api](/framework/react/react-18/api.html)

## Suspense

```js
let OtherComp = React.lazy(() => import('./OtherComp'))
function f() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <OtherComp />
    </React.Suspense>
  )
}
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
- 三方包（eg: redux）

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
- useCallback / useMemo
  - 常用于 props 中的方法、关键数据。

## PureComponent

纯组件只进行简单比较 props。  
纯组件可与不可变对象结合使用。（array/object 都是可变对象）  
React.PureComponent 内实现了`shouldComponentUpdate()`(React.Component 中未实现)。该方法会简单判断是否需要更新。该方法会跳过所有子组件的 props 更新。

## [异常捕获边界](/framework/react/react-18/errorBinary.html)

## forwardRef

为常规函数组件提供接收 ref 的功能。

demo for forwardRef & function

```js
// 父组件
let ref = React.createRef()
<FancyButton ref={ref} />
// 子组件
const FancyButton = React.forwardRef((props, ref) => {
    return <button ref={ref}>str</button>
})
export default FancyButton
```

demo for forwardRef & class

```js
class InputCC extends React.Component {
  render () {
    return <input ref={this.porps.inputRef} type="text" />
  }
}
const InputFR = forwardRef((props, ref) => <InputCC inputRef={ref} ...props />)
```

第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，**且 props 中也不存在 ref**。  
Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。

### 何时使用

- 祖先组件需要操作子组件的元素时。（受控组件的一种）
- 需要操作 dom 时
- 需要使用 useImperativeHandle 时

## [HOC 高阶组件](/framework/react/react-18/hoc.html)

## 提高性能

若无法测量，则无法优化。

- 使用生产版本。
- 访问打包后的文件。
- 打包时压缩
- 虚拟化长列表 `react-window` 和 `react-virtualized`
- shouldComponentUpdate 阻止不必要的更新
- useMemo
- useCallback
- useDeferredValue
- useTransition
- 使用`React.Profiler`测试渲染性能

### Profiler

- 测量应用多久渲染一次。
- 渲染用性能。
- props: {id: string, onRender: () => any}
  - onRender // 渲染时触发

```js
let cb = (
  id,
  phase, // 'mount' / 'update'
  actualDuration, // 本次渲染花费的时间
  baseDuration, //
  startTime, //
  commitTime, //
  interactions //
) => {}
;<App>
  <Profiler id="nav" onRender={cb}>
    <Nav />
  </Profiler>
  // 也可测量多个组件
</App>
```

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
// 若与PureComponent一起使用会抵消纯组件带来的优势。
```

## 静态类型检查

- [flow](/language/flow/index.html) (react 就是用它写的)
- [ts](/language/typescript/index.html) （ms 开发的强类型 js）
- ReScript 不会
- Kotlin 不会
- PropTypes

### [PropTypes](/jsPackages/prop-types.html)

propTypes 仅在开发模式下进行检查。
从 react v15.5 后分离出`prop-types`包。

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
||受控组件|非受控组件||
|-|-|-|-|
||本组件内使用 state+根据用户输入更新表单数据|使用`ref`得 dom 后取表单数据||
|用途|用于设置|用于得到||
|||||

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

## portals

`react.createPortal(child: ReactElement, container: dom)`  
把 child 渲染到 dom 中

```js
export default function (props) {
  return React.createPortal(props.children, document.querySelector('body'))
}
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
- useContext 改变时

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
