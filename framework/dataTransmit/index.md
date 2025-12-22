# 组件间数据传递

## react

数据从上向下单向流动的

|          |                                |     |
| -------- | ------------------------------ | --- |
| 父 -> 子 | props                          |     |
| 子 -> 父 | props + event                  |     |
| 跨组件   | context / useSyncExternalStore |     |
| 状态管理 | redux / react-redux / mobx     |     |
| 路由跳转 | useLocation + useNavigate      |     |

### props + event

### [context](/framework/react/react-18/context.html)

### useSyncExternalStore

基本用法  
demo0

```js
const state = useSyncExternalStore(store.subscribe, store, getSnapshot)
const selectedField = useSyncExternalStore(
  store.subscribe,
  () => store.getSnapshot().selectedField
)
```

与一个 store 结合使用
demo1

```js
// 创建store
const store = {
    state: {
        count: 0,
        text: 'str',
        k: []
    },
    listeners: new Set(),
    setState = (fnOrState) => {
        let newState = typeof fnOrState === 'function' ? fnOrState(store.state) : fnOrState
        store.state = {
            ...store.state,
            ...newState
        }
        store.listeners.forEach(listener => {listener()})
    },
    subscribe: (cb) => {
        store.listeners.add(cb)
        return () => {
            store.listeners.delete(cb)
        }
    },
    getSnapshot: () => store.state
}

// xxx
import store from './store'
let App = () => {
    let state = useSyncExternalStore(store.subscribe, store.getSnapshot)
    return (<button onClick={() => {store.setState({count: state.count+1})}}>state.count</button>)
}
```

与多个 store 结合使用。
demo2

```js
// createStore.js
export default const createStore = (initState) => {
    let state = initState // 这里应该使用深复制
    let listeners = new Set()
    let getSnapshot = () => state
    let setState = (fnOrState) => {
        let newState = typeof fnOrState === 'function' ? fnOrState(state) : fnOrState
        state = {
            ...state,
            ...newState
        }
        listener.forEach(listener => listener())
    }
    let subscribe = (listener => {
        listener.add(listener)
        return () => {
            listeners.delete(listener)
        }
    })
    return {
        getSnapshot,
        setState,
        subscribe
    }
}

// useMyStore.js
import createStore from './createStore.js'
const initState = {
    count: 0,
    text: 'str'
}
let store = createStore(initState)
let loop = v => (v)
export default function useMyStore(selector = loop) {
    return useSyncExternalStore(store.subscribe, () => selector(store.getSnapshot())) // 它是state
}
export const {setState} = store

// xxx
import useMyStore, {setState} from './useMyStore.js'
let App = () => {
    let state = useMyStore()
    return (<button onClick={() => {setState({count: 2})}}>str</button>)
}
```

与 React.reducer 结合使用
demo3

```js
// createReducerStore.js
export default let createReducerStore = (reducer, initState) => {
    let state = initState
    let listeners = new Set()
    let getSnapshot = () => state
    let dispatch = action => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }
    let subscribe = (listener) => {
        listener.add(listener)
        return () => {
            listeners.delete(listener)
        }
    }
    return {
        getSnapshot,
        dispatch,
        subscribe
    }
}

// useReducerStore
import createReducerStore from './createReducerStore'
let initState = {...}
let reducer = (state, action) => {
    let res = state
    switch (action) {
        case 'x':
            res = {
                ...state,
                count: state.count + 1
            }
    }
    return res
}

// useReducerStore.js
let store = createReducerStore(reducer, initState)
let loop = v => (v)
export default function useTodoStore((selector = loop) => {
    return useSyncExternalStore(store.subscribe, () => selector(store.getSnapshot()))
})
export const {dispatch} = store

//
let App = () => {
    let state = useReducerStore()
    return (<button onClick={() => dispatch({type: 'x'})}>str</button>)
}
```

### redux

### react-redux

### mobx

### 路由时传递

在跳转路由前的组件设置要传递的数据。

```tsx
import { useNavigate } from "react-router" // react-router@7+
const navigate = useNavigate()
<button onClick={() => navigate('/two', {
    state: {message: 'hello'}
})}>enter two</button>
```

在跳转路由后的组件设置要接收数据。

```tsx
import { useLocation } from 'react-router' // react-router@7+
const location = useLocation()
location.state?.message
```

#### state & urlQs

|          | state                | urlQs                             | 动态路由                 |
| -------- | -------------------- | --------------------------------- | ------------------------ |
| 特点     | 不会在地址栏中显示   | 会出现在 url 中。                 | restful 风格，seo 友好。 |
| 使用场景 | 临时通信，敏感数据， | 可分享链接，选择条件，页码，id 等 | 资源 id，详情页面。      |
|          |                      |                                   |                          |

## vue

|           |                               |     |     |
| --------- | ----------------------------- | --- | --- |
| 父 -》 子 | props                         |     |     |
| 子 -》 父 | emit                          |     |     |
|           | v-model                       |     |     |
|           | refs                          |     |     |
|           | provide/inject                |     |     |
|           | eventBus                      |     |     |
|           | vuex/pinia （等状态管理工具） |     |     |

### props

### emit

```js
// 父组件
<template>
<child-comp @add="addClickHanler"></child-comp>
</template>
<script>
    let addClickHanler = () => {
        ...
    }
</script>
// 子组件
<template>
    ...
</template>
<script setup>
    import {defineEmits} from 'vue'
    const emits = defineEmits(['add'])
    let buttonClickHanler = () => {
        // value是传递的实参
        emits('add', value)
    }
</script>
```

### v-model

它是一个语法糖

```html
<!-- 父组件 -->
<child-comp v-model:title="value"></child-comp>
<child-comp
  :title="value"
  @update:title="$event => value = $event"
></child-comp>
<!-- 子组件 -->
<script>
  import { defineEmits } from 'vue'
  const emits = defineEmits(['update:title'])
  let buttonClickHandler = () => {
    // value是实参
    emits('update:title', value)
  }
</script>
```

### refs

### provide/inject

- 无响应式

```
<!-- 祖先组件 -->
provide('name', value)

<!-- 后代组件 -->
let value = inject('name', defaultValue?)
```

```
let v1 = reactive({k: 2})
provide('name', v1)
provide('name', ref(100))
provide('changeFn', (p) => {v1.k = p})
<!-- 后代若需要修改响应式的值，则必须使用inject注入changeFn后调用。 -->
```

### eventBus

### vuex/pinia

## angular

## title

## title

## title

## title

## title
