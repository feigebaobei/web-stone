# 组件间数据传递

- props + event
- context
- useSyncExternalStore

## props + event

## context

## useSyncExternalStore

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

## react

## vue

## angular

## title

## title

## title
