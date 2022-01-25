import './App.css';
import { useEffect, useState } from 'react';
import AppContext from './store/AppContext'
import Loading from './components/Loading'
import Header from './components/Header'
import {Route, Routes,
  Navigate
  // useNavigate
} from 'react-router-dom'
import routes from './routes/index'
import AuthRoute from './routes/AuthRoute'
// import Home from './pages/Home'
// import About from './pages/About'
// import Users from './pages/Users'
import Login from './pages/Login'
// import Signup from './pages/Signup'
import NotFound from './pages/NotFound'

import './config/firebase' // 在此文件中init firebase
import {
  getAuth,
  // signInWithEmailAndPassword,
  onAuthStateChanged,
  // signOut,
 } from "firebase/auth";

let {log} = console

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false)
  let [user, setUser] = useState({})
  let [isLoading, setIsLoading] = useState(true)

  // let navigate = useNavigate()

  // setTimeout(() => {
  //   setIsLoggedIn(!isLoggedIn)
  // }, 800)


// const auth = getAuth()
// let email = 'abc@gmail.com'
// let password = '123456'
// signInWithEmailAndPassword(auth, email, password)
// .then((res) => {
//   log(res)
// }).catch(err => {
//   log(err)
// })

// let email = 'abc@gmail.com'
// let password = '123456'




// 必须经过初始化
// 使用firebase中的验证方法
useEffect(() => {
  setIsLoading(true)
  const auth = getAuth();
  // 登录
  // signInWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in
  //     // const user = userCredential.user;
  //     // ...
  //     log(userCredential)
  //   })
  //   .catch((error) => {
  //     // const errorCode = error.code;
  //     // const errorMessage = error.message;
  //     log(error)
  //   });

  // 获取用户信息
  onAuthStateChanged(auth, (user) => {
    log('user', user)
    if (user) {
      // log()
      setIsLoggedIn(true)
      setUser(user)
      setIsLoading(false)
    } else {
      setUser({})
      setIsLoggedIn(false)
      setIsLoading(false)
    }
  })

  // 登出
  // signOut(auth).then(() => {
  //   // Sign-out successful.
  // }).catch((error) => {
  //   // An error happened.
  // });
}, [])









  if (isLoading) {
    return <Loading></Loading>
  } else {
    return (<AppContext.Provider value={[isLoggedIn, user]}>
      <Header />
      <Routes>
        {/* <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/about" element={<About/>}></Route>
        <Route exact path="/users" element={<Users/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/signup" element={<Signup/>}></Route>
        <Route path="*" element={<NotFou`nd/>}></Route> */}
          {routes.map((route, index) => {
            if (route.protected === 'auth') {
              // return (<AuthRoute key={index} path={route.path} exact={route.exact}>
              //   <route.component />
              // </AuthRoute>)
              if (isLoggedIn) {
                return (<Route exact
                  path={route.path}
                  element={route.component()}
                  key={index}
                >
                </Route>)
              } else {
                return (<Route
                  exact
                  path={route.path}
                  element={<Navigate to="/" replace={true} />}
                  key={index}
                  ></Route>)
              }
            } else {
              return (<Route exact
                path={route.path}
                element={route.component()}
                key={index}
              ></Route>)
            }
          })}
        <Route path="*" element={<NotFound/>}></Route>`
      </Routes>
    </AppContext.Provider>)
  }
}

export default App;
