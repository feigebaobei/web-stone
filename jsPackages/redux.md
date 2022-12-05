# `redux`

## overview

> 不依赖框架的状态管理工具  
> 守规则的状态管理工具

|               |                                                                           |                       |                                  |
| ------------- | ------------------------------------------------------------------------- | --------------------- | -------------------------------- |
| state         | 应用的状态                                                                |                       |                                  |
| store         | state 的管理者                                                            |                       |                                  |
| action        | 描述运行的对象                                                            | type 属性是必填属性。 | `{type: string, [payload]: any}` |
| actionCreator | 创建 action 的方法。工厂模式。                                            |                       |                                  |
| reducer       | 当 store.dispatch(action)时触发，根据 acttion.type 分别更新并返回 state。 | 必须是同步的纯函数    |                                  |
|               |                                                                           |                       |                                  |

store 是 Redux.createStore(reducer, [initState])的实例。  
store.dispatch(action)是修改状态 state 的惟一方法。  
store.getState()是获取 state 的惟一方法。（state 是单例的）

## install

`npm i redux`

## usage

```js
// 定义store
import { createStore } from 'redux'
let initState = {
  counter: 0,
  todos: [],
}
let reducer = function (state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      state.todos.push(action.payload)
      state.counter++
      return state
    default:
      return state
  }
}
let store = createStore(reducer, initState)

// 改变store
let action = {
  type: 'ADD_TODO',
  payload: {
    id: 1,
    content: 'content',
    completed: false,
  },
}
store.dispatch(action)

// 获取state
store.getState()
```

## principle

使用单例模式保存数据。

```
Redux: {
    creatStore(reducer, [initState]) -> store,      // 返回store对象
    combineReducers(reducers: {[key]: reducer})     // 把reducers捆成一个reducer
    applyMiddleware(...middlewares),                //
    bindActionCreators(actionCreators, dispatch),   //
    compose(...functions)                           // 从右向左，依次执行函数。上一个函数的结果是下一个函数的参数
}
store: {
    getState() -> nextState                 // 返回当前state
    dispatch(action) -> action              // 依次执行订阅器，返回action
    subscribe(listener) -> unsubcribe()     // 添加订阅函数。返回取消订阅函数
    replaceReducer(nextReducer)             // 1.使用nextReducer 2.生成新的nextState
    [$$observable]: observable              // 留给 可观察/响应式库 的接口
}
```

### uml

```
                                 counterReducer(counter, action) -------------------- counter
                              ↗                                                              ↘
rootReducer(state, action) —→∑     ↗ optTimeReducer(optTime, action) ------ optTime ↘         nextState
                              ↘—→∑                                                    todo  ↗
                                   ↘ todoListReducer(todoList,action) ----- todoList ↗


注：左侧表示 dispatch 分发流，∑ 表示 combineReducers；右侧表示各实体 reducer 的返回值，最后汇总整合成 nextState
```

<!-- 1.使用所有reducer处理state，得到nextState. 2.今次触发所有订阅者 3.返回nextState -->

## [自己开发的 redux redux-simple](https://github.com/feigebaobei/simple/packages/redux-simple)
