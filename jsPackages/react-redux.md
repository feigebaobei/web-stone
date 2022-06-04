# `react-redux`

## overview
> react官方出品的
> 把react和redux结合在一起使用的包。  
> react-redux 8.x需要react 16.8.3+ / react native 0.59+  

## install
`npm i react-redux`

## usage
```js
import {Provider} from 'react-redux' // react-redux提供了Provider组件。该组件支持store属性，用于支持store功能。
import store from './store'

export default function App (props) {
    return (
    <Provider store={store}>
    </Provider>)
}
```
```js
import {useSelector, useDispatch} from 'react-redux'
export default function Counter() {
    let count = useSelect({count})
    let dispatch = useDispatch()
    return (<div>
        <button
            onClick={() => {dispatch({type: 'ADD'})}}
        >+</button>
        <button
            onClick={() => {dispatch({type: 'DE'})}}
        >-</button>
    </div>)
}
```

## principle
```
```

### uml
```
```

