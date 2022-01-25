import AppContext from '../store/AppContext'
import {useContext} from 'react'
import { Route,
    // Navigate
} from 'react-router-dom'
import Home from '../pages/Home'

let AuthRoute = ({children, ...rest}) => {
    let [isLoggedIn] = useContext(AppContext)
    // let navigate = Navigate()
    if (isLoggedIn) {
        return (<Route {...rest}>
            {children}
        </Route>)
    } else {
        return (<Route path="/">
            <Home />
            </Route>)
    }
    // return (<navigate to="/login"></navigate>)
}
export default AuthRoute