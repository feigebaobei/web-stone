import ReactDOM from 'react-dom'

// let el = 'hi'
// let App = () => {
//     return <>hi</>
// }
// import App from './App'
let App = require('./App').default
// console.log(App)

// ReactDOM.render(el, document.querySelector('#root'))
ReactDOM.render(<App/>, document.querySelector('#root'))
