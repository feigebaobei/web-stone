# hooks

> 只能在方法组件的最顶层使用。  
> 以'use'开头。意为只是使用，不是创建。  
> 它是一个特定方法，可以“hook into”react 功能

## feature

- 可访问状态
- 可处理生命周期方法

## usage

```js
let [value, setValue] = useState(initValue?)
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
useEffect(() => {})             => componentDidMount, componentDidUpdate
useEffect(() => {}, [])         => componentDidMount
useEffect(() => {}, [p])        => componentDidMount, 当p改变时
useEffect(() => {               => componentWillUnMount是执行f
    let f = () => {}
    return f
})
fn中不能直接使用异步方法（async/await），需要使用立即执行函数包裹异步方法。
若fn返回一个方法则方法在御载组件前被react框架调用。
listener指定当哪个变量变化（使用浅复制比较）时触发fn.
尽量把不相关的监听写在不同的useEffect里。
当视图更新后执行fn。
fn应该是纯函数。
类似vue的watchEffect
// 最好不要执行fn内定义的方法。？
fn只在指定时刻执行，如dep改变时。在useEffect外、组件内的代码会在每次渲染时执行。

let value = useContext(myContext)
接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 提供。
示例见上一个页面。
当context的value改变时更新组件

let [state, dispatch] = useReducer(reducer, initialArg, init?)
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

let refContainer = useRef(initialValue?)
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

|     | dom 元素       | 类组件                | 函数式组件           |     |     |     |
| --- | -------------- | --------------------- | -------------------- | --- | --- | --- |
| ref | 得到对应的 dom | 得到 class 组件的实例 | 得到`{current: ...}` |     |     |     |

## forwardRef

函数式组件使用 ref 时，需要使用`forwardRef`包裹。

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

|     |             |     |     |     |     |
| --- | ----------- | --- | --- | --- | --- |
| key | description |     |     |     |     |

## uml

https://www.cnblogs.com/bejamin/p/15116546.html

## 自定义 hook

**Hook 用途：封装为可多次使用的方法。与 uitl 功能相同。**

监听对象改变时输出。

```js
// 定义
export default function useLogger(value) {
  useEffect(() => {
    console.log(value)
  }, [value])
}
// 使用
useLogger(stateValue)
```

设置表单的初始值、验证规则。

```js
function useFormField(initialVal = '', rule = () => true) {
  const [val, setVal] = React.useState(initialVal)
  const [isValid, setValid] = React.useState(true)
  function onChange(e) {
    setVal(e.target.value)
    setValid(rule(e.target.value))
  }
  //   return [val, onChange, isValid];
  return [val, isValid]
}
export default useFormField
// 使用
```

xxx

```js
useSubmit
```

xxx

```js
useBoolean
```

xxx

```js
useLocalStorage
```

xxx

```js
useFontsize
```

xxx

```js
useFetch
const useFetch = (initialUrl, initialParams = {}, skip = false) => {
  const [url, updateUrl] = useState(initialUrl)
  const [params, updateParams] = useState(initialParams)
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [refetchIndex, setRefetchIndex] = useState(0)
  const queryString = Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    )
    .join('&')
  const refetch = () =>
    setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1)
  useEffect(() => {
    const fetchData = async () => {
      if (skip) return
      setIsLoading(true)
      try {
        const response = await fetch(`${url}${queryString}`)
        const result = await response.json()
        if (response.ok) {
          setData(result)
        } else {
          setHasError(true)
          setErrorMessage(result)
        }
      } catch (err) {
        setHasError(true)
        setErrorMessage(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url, params, refetchIndex])
  return {
    data,
    isLoading,
    hasError,
    errorMessage,
    updateUrl,
    updateParams,
    refetch,
  }
}
export default useFetch
```

```js
useDeepEffect
```

```js
usePageBottom
```

```js
useInfinitRoll
```

```js
useAxios
```

```js
useBreakPoint
```

```js
import { useMediaQuery } from '@mountain-ui/react-hooks'
function useViewport() {
  let isMobile = useMediaQuery(
    'screen add (min-width: 1px) and (max-width: 513px)'
  )
  let isTablet = useMediaQuery(
    'screen add (min-width: 514px) and (max-width: 1205px)'
  )
  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
  }
}
export default useViewport
```

```js
useDeepEffect
```

```js
function useInterval(cb = () => {}, delay = 10) {
  let savedCallback = useRef()
  useEffect(() => {
    savedCallback.current = cb
  }, [cb])
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
export default useInterval
```

```js
useDeviceDetect
```

得到、设置 ls 里的值。（不能实现监听）

```js
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (e) {
      return initialValue
    }
  })
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (e) {
      console.log(e)
    }
  }
  return [storedValue, setValue]
}
export default useLocalStorage
```

```js
import { useState, useEffect } from 'react'

function useOnline() {
  const [online, setOnline] = useState(navigator.onLine)
  function offlineHandler() {
    setOnline(false)
  }
  function onlineHandler() {
    setOnline(true)
  }
  useEffect(() => {
    setOnline(navigator.onLine)
    window.addEventListener('online', onlineHandler)
    window.addEventListener('offline', offlineHandler)
    return () => {
      window.removeEventListener('online', onlineHandler)
      window.removeEventListener('offline', offlineHandler)
    }
  }, [])
  return online
}
export default useOnline
```

没发现它有独特的用途

```js
import { useRef } from 'react'
export default function useStore(key, initValue) {
  let ref = useRef({ key, initValue })
  let setRef = (key, value) => {
    ref.current[key] = value
  }
  let getRef = (key) => {
    return ref.current[key]
  }
  return [getRef, setRef]
}
// 使用
useStore(stateValue)
```

当依赖项改变时，执行异步方法。

```js
export default function useAsyncEffect(fn, deps, ...args) {
  useEffect(() => {
    ;(async function () {
      await fn(...args)
    })()
  }, deps)
}
```

懒加载非首屏的组件。可用于减少打包体积、减小非必要回馈。

```jsx
function usePrefetch(factory) {
    let [comp, setComp] = useState(null)
    useEffect(() => {
        let comp = lazy(factory)
        setComp(comp)
    }, [factory])
    return comp
}
let importModal = () => import('./Modal')
let Modal = usePrefetch(importModal) // 一定要写成这样，否则会是触发useEffect
isShow && <Modal>
```

```jsx
function useGeo(opts) {
  let [isLoading, setIsLoading] = useState(true)
  let [error, setError] = useState(null)
  let [geo, setGeo] = useState({})
  let isLoad = true
  let id
  function onSuccess(event) {
    if (isLoad) {
      setIsLoading(false)
      setGeo(event.coords)
    }
  }
  function opFailure(error) {
    if (isLoad) {
      setIsLoading(false)
      setError(error)
    }
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onFailure, opts)
    id = navigator.geolocation.watchPosition(onSuccess, onFailure, opts)
    isLoad = false
    navigator.geolocation.clearWatch(id)
  }, [opts])
}
let { geo, isLoading, error } = useGeo()(!isLoading && !error) ? (
  <div></div>
) : null
```

节流

```js
function useThrottle<T>(value: T, interval = 500): T {
  const [throttledValue, setThrottledValue] = useState < T > value
  const lastExecuted = useRef < number > Date.now()
  useEffect(() => {
    if (Date.now() >= lastExecuted.current + interval) {
      lastExecuted.current = Date.now()
      setThrottledValue(value)
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now()
        setThrottledValue(value)
      }, interval)
      return () => clearTimeout(timerId)
    }
  }, [value, interval])
  return throttledValue
}
// let cb = useCallback(() => {
//     fn(args)
// }, args)
let prevRef = useRef(new Date().getTime())
function useThrottleFn(fn, args, delay, opts) {
  useEffect(() => {
    let now = new Date().getTime()
    if (now - prevRef.current > delay) {
      fn(args)
      prevRef.current = now
    }
  }, opts)
}
```

去抖
指定时长后执行
待测试

```js
let prevRef = useRef(new Date().getTime())
let timeoutId = useRef()
function useDebounceFn(fn, args, delay, opts) {
  useEffect(() => {
    let now = new Date().getTime()
    // 先清空
    timeoutId.current && clearTimeout(timeoutId.current)
    // 再定义
    timeoutId.current = setTimeout(() => {
      fn(args)
      prevRef.current = now
    }, delay)
    return () => {
      // 卸载时清空
      clearTimeout(timeoutId.current)
    }
  }, opts)
}
```

useFilter

```js
import React from 'react'
export function useFilter() {
    const [_filter, _setFilter] = React.useState<{"key": {[x: string]: {[x:string]: any}}}>({"key": {}})
    const getFilter = (pageKey: string, tableKey: string) => {
        const f = _filter['key'][`${pageKey}_${tableKey}`]
        return f;
    }
    const setFilter = (pageKey: string, tableKey: string, values: {[x:string]: any}={}) => {
        values.resetCurrentPage = true
        const data = _filter.key;
        data[`${pageKey}_${tableKey}`] = values;
        _setFilter({
            "key": data
        })
    }
    return { getFilter, setFilter }
}
// js
import {useState} from 'react'
function useFilter () {
    let [_filter, _setFilter] = useState({key: {}})
    let getFilter = (k) => {
        return _filter.key[k]
    }
    let setFilter = (k, v) => {
        let d = _filter.key
        d[`${k}`] = v
        _setFilter({'key': d})
    }
    return {getFilter, setFilter}
}
export default useFilter
// 作者常把它用于与context结合使用。
// let context = React.createContext()
// context.Provider value={{...}}
// 再在子组件中使用 this.context.xxx
// 会触发组件渲染
```

useParams

```js
import React from 'react'
export function useParams() {
    const [_params, _setParams] = React.useState<{[x: string]: {[x:string]: any}}>({})
    //使用 useRef 渲染周期之前共享数据的存储（state触发重新渲染，ref不会）
    const countRef = React.useRef<{[x: string]: {[x:string]: any}}>();
    countRef.current = _params;
    const getParams = (pageKey: string, sectionKey: string) => {
        const params = countRef.current || {}
        const f = params[`${pageKey}_${sectionKey}`]
        return f;
    }
    const setParams = (pageKey: string, sectionKey: string, value: {[x:string]: any}) => {
        const params = countRef.current || {}
        _setParams({
            ...params,
            [`${pageKey}_${sectionKey}`]: value
        })

    }
    return { getParams, setParams }
}
// 待测试
function useParams () {
    let mapRef = useRef(new Map())
    let getParams = (k) => {
        return mapRef.current.get(k)
    }
    let setParams = (k, v) => {
        mapRef.current.set(k, v)
    }
    return {getParams, setParams}
}
```

useOnce

```js
// cf 判断条件的方法。 参数是 dep
// fn 若条件满足则执行的方法  参数是args
// args   fn方法的参数
// dep    依赖
export default function useOnce(cf, fn, args, dep) {
  let [hasRun, setHasRun] = useState(false)
  useEffect(() => {
    if (cf(dep) && !hasRun) {
      fn(args)
      setHasRun(true)
    }
  }, [dep, args, cf, fn, hasRun])
}
// use
let cf = (v) => {
  return v.length % 3 === 2
}
let fn = (v) => {
  console.log('fn', v)
}
let [v, setV] = useState('')
useOnce(cf, fn, 'str', v)
```

## 自定义 hooks 的包

- [title]()
- [title]()
- [title]()

## todo

### title

有缓存功能的都可用于性能优化

### useState & useRef

|     | useState                                   | useRef                       |     |
| --- | ------------------------------------------ | ---------------------------- | --- |
|     | 在 ui 更新期间保护自己的数据               | 在 ui 更新期间保护自己的数据 |     |
|     | 可理解为数据钩子                           | 可理解为数据钩子             |     |
|     | 会触发重新渲染                             | 不会                         |     |
|     | 返回[state, setState]                      | 返回一个对象{current: any}   |     |
|     | state 是不可变的。可能使用 setState 去改变 | current 属性是可变的         |     |
|     | 不可用于访问别的元素                       | 可访问组件、dom              |     |

### useCallback & useMemo

|      | useCallback | useMemo      |     |     |
| ---- | ----------- | ------------ | --- | --- |
| 用途 | 缓存方法    | 缓存计算结果 |     |     |
|      |             |              |     |     |
|      |             |              |     |     |

```ts
type DependencyList = ReadonlyArray<any>

function useCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList
): T

function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T
```

### [react-use](https://www.npmjs.com/package/react-use)

### [@mountain-ui/react-hooks](https://www.npmjs.com/package/@mountain-ui/react-hooks)

- useBoolean
- useDarkMode
- useFontSize
- useLocalStorage
- useMediaQuery
- usePrefersDarkMode
- useToggle

### 基本结构

```js
import { useState, useEffect } from 'react'
function useOnline() {
  // ...
}
export default useOnline
```

### title

### title

### title
