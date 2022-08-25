import counterReducer from './counter'
import loggedReducer from './isLogged'
import {combineReducers} from 'redux'

let allReducers = combineReducers({
    counter: counterReducer,
    // asdf: counterReducer,
    isLogged: loggedReducer
})

export default allReducers