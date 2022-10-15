import store from './store'

// let createAction = () => {
let deCreateAction = (value) => {
  return {
    type: 'DE',
    payload: {
      value,
    },
  }
}

function CounterOp() {
  return (
    <div className="CounterOp">
      <button
        onClick={() => {
          store.dispatch({ type: 'ADD' })
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          store.dispatch({ type: 'DE' })
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          store.dispatch({ type: 'ADD', payload: { value: 5 } })
        }}
      >
        +5
      </button>
      <button
        onClick={() => {
          store.dispatch(deCreateAction(5))
        }}
      >
        -5
      </button>
    </div>
  )
}

export default CounterOp
