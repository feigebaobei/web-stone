// import logo from './logo.svg';
import './App.css';

import {createStore } from 'redux'

let {log} = console


function counter(state = 0, action) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1
      case 'DECREMENT':
        return state - 1
        default:
          return state
  }
}
let store = createStore(counter)
store.subscribe(() => {
  log(store.getState())
})
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'DECREMENT'})




function App() {
  return (<p>hi</p>)
}

export default App;
