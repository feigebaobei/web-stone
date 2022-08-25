import logo from './logo.svg';
import './App.css';
import {useSelector, 
  useDispatch
} from 'react-redux'
import {increment, decrement} from './actions'

function App() {
  let counter = useSelector(state => state.counter)
  let isLogged = useSelector(state => state.isLogged)
  let dispatch = useDispatch()
  return (
    <div className="App">
      page of app
      <p>counter {counter}</p>
      <p>isLogged {isLogged}</p>
      <button onClick={() => {dispatch(increment())}}>+</button>
      <button onClick={() => {dispatch(increment(5))}}>+5</button>
      <button onClick={() => {dispatch(decrement())}}>-</button>
    </div>
  );
}

export default App;
