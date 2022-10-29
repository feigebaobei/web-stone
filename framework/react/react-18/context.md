# context

- 主要用于不同层级的组件使用同一份数据。

## usage(常用的三种方法)

- React.createContext 提供的 Provider、Consumer
- 函数组件 React.createContext 提供的 Provider、useContext 钩子。
- class 组件 React.createContext 提供的 Provider、class 的 contextType 属性

## demo

```js
// context.js
import { createContext } from 'react'
export default createContext()
```

```js
// App.js
import MyContext from './context'
export default function App() {
  let [store, setStore] = useState({ name: 'init' })
  let buttonClickHander = () => {
    setStore({ name: 'from app' })
  }
  return (
    // 使用context.Provider组件提供其子组件共享的数据
    <MyContext.Provider value={{ store, setStore }}>
      <First />
      <Second />
      <Third />
      <button onClick={buttonClickHander}>button</button>
    </MyContext.Provider>
  )
}
```

```js
// First.js
import MyContext from './context'
export default function First() {
  return (
    <MyContext.Consumer>
      {(value) => {
        return <>{JSON.stringify(value.store)}</> // {"name": "init"}
      }}
    </MyContext.Consumer>
  )
}
```

```js
import MyContext from './context'
export default function Second() {
  let ctx = useContext(MyContext)
  let buttonClickHander = () => {
    ctx.setStore({ name: 'other string' })
  }
  return (
    <div>
      {JSON.stringify(ctx.store)}
      <button onClick={buttonClickHander}>button</button>
    </div>
  ) // {"name": "init"}
}
```

```js
import MyContext from './context'
class Third extends React.Component {
  // static contextType = context // 此处写法与 Third.contextType等效
  render() {
    const ctx = this.context
    return <>{JSON.stringify(ctx.store)}</>
  }
}
Third.contextType = MyContext
```

## 封装一个 context 生成器

```js
// 待测试
// ctx.js
let context = React.createContext()
export default f (initValue) {
    let ContextProvider = context.Provider
    let ContextConsumer = () => {
        return context
    }
    return {
        ContextProvider,
        ContextConsumer
    }
}

// usage
import {ContextProvider, ContextConsumer} from 'ctx'
<ContextProvider>
</ContextProvider>
```

## Context + UseHooks

本例展示 Context 与 hook 结合使用。  
以`useFilter`为例。

1. 定义 useFilter
2. 整体输出各 hook
3. 封装 context。包括：1.在 context 中提供 hook。2.输出 context
4. 在 App.js 中使用封装好的 context
5. 在后代组件中使用 context

```js
// useFilter
// 见 /framework/react/hooks.html
```

```js
// useHooks
// 整体输出hooks
import useFilter from './useFilter'
export default function useHooks() {
  let filter = useFilter()
  return {
    ...filter,
  }
}
```

```js
// pages.js
import useHooks from './useHooks'
function createContainer(useHooks) {
  let context = React.createContext()
  let Provider = () => {
    let value = useHooks()
    return <context.Provider value={value}>{props.children}</context.Provider>
  }
  let useContainer = () => {
    return React.useContext(context)
  }
  return {
    Provider,
    useContainer,
  }
}
export default createContainer(useHooks)
```

```js
// App.js
import createContainer from './pages.js'
import First from './First'
export default function () {
  let { Provider } = createContainer
  return (
    <Provider>
      <First />
    </Provider>
  )
}
```

```js
// First.js
import createContainer from './pages'
export default function () {
  let ctx = createContainer.useContainer()
  return <>{JSON.stringify(ctx)}</>
}
```

## 解决多次渲染的问题

- 使用 class 组件时。使用 this.state 中的值。
- useMemo
