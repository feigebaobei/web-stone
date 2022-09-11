// import clog from './util/index'
import React from 'react'
// import ReactDOM from 'react-dom'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'

// console.log('ReactDOM', ReactDOM)
// ReactDOM.render(React.createElement('span', {}, 'string'), document.querySelector('#id'))
// ReactDOM.render(
//     <App />,
//     document.querySelector('#id')
// )
const root = ReactDOM.createRoot(document.getElementById('id'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)