# overview
> redux是一个独立的库。可以应用于vue、react、angular、script等。
> 应该把“predictable”翻译为"可控制的"
> > 一个状态管理工具。  
> > 只有2k  
> react-redux
> > 必须要求react@16.8.3+
> > 为react开发的状态管理库
> > 使react组件从redux store中读数据，并且向store分发actions。
> 一个应用只有一个store。若需要扩展，则在combineReducers()中扩展。
> 

## 在什么时候使用
- 在应用的大量地方，都存在大量的状态
- 应用状态会随着时间的推移而频繁更新
- 更新该状态的逻辑可能很复杂
- 中型和大型代码量的应用，很多人协同开发

## 术语
```js
state管理
不可变性
action
const addTodAction = {
    type: 'todos/todoAdded',  // 域/事件名称
    payload: 'Buy milk'
}
action creator 是一个创建并返回一个 action 对象的函数  
reducer 把state变成下一个state的方法  
store 用于管理state  
```

# 思想
应用中使用集中式的全局状态来管理，并明确更新状态的模式，以便让代码具有可预测性。  

# 三大原则
- 单例数据  
- state是只读的  
- reducer是纯函数

# usage
## redux
与当前项目的技术栈无关。虽然常见于react项目中使用redux，但是在vue、script标签、...等项目中也可以使用。  
```
import Redux from 'redux'
// init
let action = {
    type: 'INCREASE'
}
let reducer = (state, action) => {
    let newState
    if (action.type === 'INCREASE') {
        newState = state.value + 1
    }
    return newState
}
let initState = {value: 2}
let store = Redux.createStore(reducer(initState, action))
// subsribe
let cb = () => console.log(store.getState())
store.subscribe(cb)
// dispatch
store.dispatch(action)
```

## react-redux
```js
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import App form './App'

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.querySelect('#root'))


```

# 基础
|action|reducer|store|||
|-|-|-|-|-|
|去改变state的有效载荷|接收action,改变state.|-|||

# api
```js
createStore(reducer[, preloadedState[, enhancer]]) => store
    // 初始化时执行dispatch({type: ActionTypes.INIT})
reducer
preloadedState 初始state
enhancer 增强器
    // return enhancer(createStore)(reducer, preloadedState)
返回生成的store

store: {
    getState() => state
    dispatch(action) 触发指定的reducer
    subscribe(listener) => unSubscribe() 为state设置监听器，返回取消监听方法。
    replaceReducer(nextReducer) 重置store的reducer
        // 被执行时会触发action: {type: ActionTypes.REPLACE}

}

action: {
    type: string,
    [key]: any
}

combineReducers(...reducers) => {
    reducerKey: reducer
}
把若干reducer合并为一个reducer

bindActionCreators(actionCreators, dispatch) => {
    actionKey: 触发dispatch的fn
}
 // return dispatch(actionCreator.apply(this, args))
 // 方便子组件使用

applyMiddleware(...middlewares),

compose(...fn) => fn()
藉由從右到左組合給定的 function 而獲得的最終 function。
```

# principle
```js
redux: {
    createStore,
    combineReducers,
    bindActionCreators,
    applyMiddleware,
    compose
}
```

## redux
### creatStore
```
creatStore(reducer, [preloadedState, enhancer]) => store
store: {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]
}
```

### combineReducers
```
combineReducers(reducers) => reducer
reducer: (state, action) => newState
```

### bindActionCreators
```
bindActionCreators(actionCreators, dispatch) => actionCreator
```

### applyMiddleware
### compose
几年前我就写过一个这样的方法。
```
compose(...fns, ...) {
    return fns.reduce((fna, fnb) => {
        return (...args) => fna(fnb(...args))
    })
}
```

## react-redux
### {batch}

就是`react-dom`中的`unstable_batchedUpdates`  

### Provider
### ReactReduxContext
### connect
### useDispatch
### createDispatchHook
### useSelector
### createSelectorHook
### useStore
### createStoreHook
### shallowEqual


# uml
数据流：
```
    ----> state ---------> ui
    |                       |
    |                       |
    |                       |操作
    |                       |
    |使用reducer             |
    |改变state               V
    |-------------------调用action

```
- 这个包中用了很多方法重载，  
- 在方法内做了很多检测参数。  

# todo 
## redux & react-redux

二者不依赖。
||redux|react-redux||
|-|-|-|-|
|主要依赖|-|`react-dom`||
|||||
|||||
|||||
|||||
|||||
|||||
|||||

# title
# title
# title
# title