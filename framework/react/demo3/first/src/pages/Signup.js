import {useState} from 'react'
import {
    useNavigate,
} from 'react-router-dom'
import {
    getAuth,
    createUserWithEmailAndPassword
} from 'firebase/auth'

// let {log} = console

let Signup = () => {
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
    let signupHandler = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(getAuth(), email, password).then(res => {
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
            <button onClick={signupHandler}>signup</button>
            {
                error ? (<p>{error}</p>) : ('')
            }
        </form>
    </div>)
}
export default Signup