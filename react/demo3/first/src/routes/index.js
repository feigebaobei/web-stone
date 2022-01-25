import Home from '../pages/Home'
import About from '../pages/About'
import Users from '../pages/Users'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
// import NotFound from '../pages/NotFound'


let routeList = [
    {
        path: "/",
        exact: true,
        component: () => <Home />,
        protected: null
    },
    {
        path: "/about",
        exact: true,
        component: () => <About />,
        protected: null
    },
    {
        path: "/Users",
        exact: true,
        component: () => <Users />,
        protected: 'auth'
    },
    {
        path: "/login",
        exact: true,
        component: () => <Login />,
        protected: 'guest'
    },
    {
        path: "/signup",
        exact: true,
        component: () => <Signup />,
        protected: 'guest'
    }
]
export default routeList