import { legacy_createStore as createStore } from 'redux'

let initState = {
  counter: 0,
}
let reducer = function (state, action) {
  switch (action.type) {
    case 'ADD':
      if (action.payload !== undefined) {
        state.counter += action.payload.value
      } else {
        state.counter++
      }
      return state
    case 'DE':
      if (action.payload !== undefined) {
        state.counter -= action.payload.value
      } else {
        state.counter--
      }
      return state
    default:
      return state
  }
}

let store = createStore(reducer, initState)
export default store
