# overview
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
reducer
store





```

# 思想
应用中使用集中式的全局状态来管理，并明确更新状态的模式，以便让代码具有可预测性。  

# usage
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

## creatStore
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

## combineReducers
```
combineReducers(reducers) => reducer
reducer: (state, action) => newState
```

## bindActionCreators
```
bindActionCreators(actionCreators, dispatch) => actionCreator
```

## applyMiddleware
## compose
几年前我就写过一个这样的方法。
```
compose(...fns, ...) {
    return fns.reduce((fna, fnb) => {
        return (...args) => fna(fnb(...args))
    })
}
```

# uml
- 这个包中用了很多方法重载，  
- 在方法内做了很多检测参数。  