import { createContext } from "react"

let AppContext = createContext({loggedIn: false, user: {}})
export default AppContext