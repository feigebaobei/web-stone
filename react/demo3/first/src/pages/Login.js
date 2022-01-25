import { useState } from "react"
import {
    getAuth,
    signInWithEmailAndPassword
} from 'firebase/auth'
import {
    // useHistory
    useNavigate
} from 'react-router-dom'

// let {log} = console

let Login = () => {
    let [error, setError] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let navigate = useNavigate()

    let emailChangeHandler = (e) => {
        let value = e.target.value
        setEmail(value)
    }
    let passwordChangeHandler = (e) => {
        let value = e.target.value
        setPassword(value)
    }
    let login = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(getAuth(), email, password).then(res => {
            // log('res', res)
            // history.replace('/')
            setError('')
            navigate('/', {replace: true})
            // setIsLoading(false)
        }).catch(err => {
            setError(err.message)
        })
    }
    return (<div>
        <form>
            <label htmlFor="email">email</label>
            <input type="email" name="email" id="email" value={email} onChange={emailChangeHandler}></input>
            <br/>
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" value={password} onChange={passwordChangeHandler}></input>
            <br/>
            <button onClick={login}>login</button>
            {
                error ? (<p>{error}</p>) : ('')
            }
        </form>
    </div>)
}
export default Login