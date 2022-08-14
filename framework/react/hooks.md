# hooks
> 只能在方法组件的最顶层使用。
> 以'use'开头。意为只是使用，不是创建。
> 它是一个特定方法，可以“hook into”react功能

## feature
- 可访问状态
- 可处理生命周期方法
- feature0
- feature1
- feature2

## usage
```js
let [value, setValue] = useState([initValue])
用于处理组件内的状态
组件更新时返回最近的状态。（它是如何做到的？）
setValus（与useState）都会自动合并更新对象。
内部使用object.is判断新旧状态是否相同。若相同，则不触发更新。
setValue是异步的。react会打包一批更新为一次更新。
setValue(newValue)
setValue((any) => {...; reture obj})
useState(() => {reture obj})
可使用flushSync()强制立即更新。非必要不使用。
flushSync(() => {
    setValue(...)
})

useEffect(fn, ...listener = [])
用于处理副作用
在componentDidMount/componentDidUpdate/componentWillUnmount时触发。
useEffect(() => {})         => componentDidMount, componentDidUpdate
useEffect(() => {}, [])         => componentDidMount
useEffect(() => {}, [p])         => componentDidMount, 当p改变时
useEffect(() => {         => componentWillUnMount是执行f
    let f = () => {}
    return f
})
fn中不能直接使用异步方法（async/await），需要使用立即执行函数包裹异步方法。
若fn返回一个方法则方法在御载组件前被调用。
listener指定当哪个变量变化（使用浅复制比较）时触发fn.
尽量把不相关的监听写在不同的useEffect里。  
当视图更新后执行fn。
fn应该是纯函数。
类似vue的watchEffect
最好不要执行fn内定义的方法。

let value = useContext(myContext)
接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 提供。
示例见上一个页面。
当context的value改变时更新组件

let [state, dispatch] = useReducer(reducer, initialArg, [init])
init是一个方法。参数是initialArg。初始数据会被设置为init(initialArg)
与useState功能相似。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。（如果你熟悉 Redux 的话，就已经知道它如何工作了。）
dispatch({type: 'typename', key: value}) // dispatch的参数是action. action.type, action.key
// 定义
const [state, dispatch] = useReducer((state, action) => {
    let res
    switch (action.type) {
        case 'x':
            res = {k: state.k + action.payload}
        default:
            res = state
    }
    return res
}, {k: 0}, (p) => {
    return p
})
// 使用
state.k // 0
dispatch({type: 'x', payload: 2})

let memoizedCallback = useCallback(fn, ...dependencies)
只有dependencies改变时执行fn。可用于阻止不必要的重新渲染。
返回一个 memoized 回调函数。
只在更新组件时执行。等价于 useMemo(() => fn, ...dependencies)
像vue里的computer

let memoizedValue = useMemo(fn, ...dependencies)
返回一个 memoized 值。
与useCallback类似。当dependencies中有值改变时执行fn。  
它是在渲染时运行的，不要做任务应该在useEffect中运行的代码。  
它只是用于优化性能，不用它，功能照样可以实现。

let refContainer = useRef(initialValue)
useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。
组件重新渲染期间其值一直存在。
改变其值时不会重新渲染组件。
可以使用它：得到dom元素，跟踪状态变化（保存变化前的状态），
let inputEl = React.useRef(null)
<input ref={inputEl} />
let btClickHandler = () => {
    inputEl.current.focus()
}
<button onClick={btClickHandler}>bt</button>

useImperativeHandle(ref, createHandle, [deps])
useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：
export default function App () {
    let counterRef = useRef()
    let reset = () => {
        counterRef.current.resetCount && counterRef.current.resetCount()
    }
    return (<div>
        <button onClick={reset}>reset</button>
        <MyC ref={counterRef}/>
    </div>)
}
function C (props, ref) {
    let [count, setCount] = useState(0)
    let btClickHandler = () => {
        setCount(count + 1)
    }
    let resetCount = () => {setCount(0)}
    React.useImperativeHandle(ref, () => {
        resetCount: resetCount
    })
    return (<div>
        <span>{count}<span>
        <button onClick={btClickHandler}>+1</button>
    </div>)
}
export default MyC = React.forwardRef(C)
除了暴露指定的方法外，还可以指定暴露的属性、数据。 

useLayoutEffect
其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，
执行顺序：更新变量值 -》 组件重新渲染 -》 执行useLayoutEffect -> 显示渲染结果 -》 执行useEffect
尽可能使用标准的 useEffect 以避免阻塞视觉更新。
与useEffect有相同的触发机制

useDebugValue(value, [fn])
可用于在 React 开发者工具中显示自定义 hook 的标签。
不会

let deferredValue = useDeferredValue(value)
会根据value返回一个复制的deferredValue（延迟数据）。当有急切的更新时要，react会返回原来的值，当更新结束后再使用新值更新组件。
使用它可实现节流、防抖功能。它会在别的更新结束后马上更新。
使用React.useMemo / React.Memo与React.useDeferredValue结合可阻止子组件也参与急切的更新。
function Comp () {
    let query = useSearchQuery('')
    let deferredValue = useDeferredValue(query)
    let suggestions = useMemo(() => {
        return <SearchSuggestion query={deferredValue}>
    }, [deferredValue])
    return (
        <SearchInput query={query} />
        <Suspense fallback="str">
            {suggestions}
        </Suspense>
    )
}

let [isPending, startTransition] = useTransition()
用于降低渲染优先级.
isPending表示是否处理pending状态。  
let [isPending, startTransition] = useTransition()
let [search, setSearch] = useState()
let inputChangeHandle = (event) => {
    startTransition(() => {
        setSearch(event.target.value)
    })
}
<input type="text" onChange={inputChangeHandle} />
<SearchComp searchStr={search}>

let id = useId() // 如 :r1:
返回一个惟一的id.可用于跨平台。string类型。包括:  
可以为该返回值id设置前缀、后缀。
不要用于list中的key。该key应该从渲染数据中取得。  
let id = useId()
<label htmlFor={id} />
<input id={id} />

let state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshort])
对任务进行优先级排序并同时执行多个任务。
外部存储：redux/zustand/...
内部存储：useState/props/context/...
可以把外部存储的数据读来和订阅。
react要知道外部数据的变化，搞了这样的hook。
subscribe           当store改变时触发的订阅方法。
getSnapshot         返回当前store的值
getServerSnapshot   在服务器上渲染时，返回当前store的值
eg：let state = useSyncExternalStore(store.subscribe, store.getSnapshot)
详见状态管理

useInsertionEffect(didUpdate)
它与useEffect的用法一样。
它会在所有dom更新前执行。常用于学页面布局。
```

## useRef
||dom元素|类组件|函数式组件||||
|-|-|-|-|-|-|-|
|ref|得到对应的dom|得到class组件的实例|得到`{current: ...}`||||


## forwardRef
函数式组件使用ref时，需要使用`forwardRef`包裹。
```js
// React.forwardRef 接受一个渲染函数，其接收 props 和 ref 参数并返回一个 React 节点。
// 这样我们就将父组件中创建的ref转发进子组件，并赋值给子组件的input元素，进而可以调用它的focus方法。
let InputComp = React.forwardRef((props, ref) => {
    return <input ref={ref} />
})
function C () {
    let inputEl = useRef(null)
    let btClickHandler = () => {
        inputEl.current.focus()
    }
    return (
        <>
            <InputComp ref={inputEl}>
            <button onClick={btClickHandler}>bt</button>
        </>
    )
}
```


## api
|||||||
|-|-|-|-|-|-|
|key|description|||||

## uml
https://www.cnblogs.com/bejamin/p/15116546.html

## 自定义hook
```js
```

## todo
### title
有缓存功能的都可用于性能优化

### useCallback & useMemo
||useCallback | useMemo|||
|-|-|-|-|-|
|用途|缓存方法|缓存计算结果|||
||||||
||||||

```ts
type DependencyList = ReadonlyArray<any>;

function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;

function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
```




### title
