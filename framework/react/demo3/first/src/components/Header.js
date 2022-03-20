import { Link, useNavigate } from "react-router-dom"
import {useContext} from 'react'
import AppContext from "../store/AppContext"
import {getAuth, signOut
} from 'firebase/auth'


let {log} = console

let Header = () => {
    let [isLoggedIn, user] = useContext(AppContext)
    let navigate = useNavigate()

    let logout = () => {
        signOut(getAuth()).then(() => {
            log('已经登出')
            navigate('/', {replace: true})
        }).catch(err => {
            log('登出失败')
        })
    }

    return (<nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">about</Link>
            </li>
            <li>
                <Link to="/users">users</Link>
            </li>
            <li>
                {
                    isLoggedIn ? (<button onClick={logout}>logout</button>) : (<Link to="/login">login</Link>)
                }
            </li>
            {!isLoggedIn ? (<li><Link to="/signup">signup</Link></li>) : null}
            {user.email ? (<li>{user.email}</li>) : null}
        </ul>
        </nav>)
}
export default Header