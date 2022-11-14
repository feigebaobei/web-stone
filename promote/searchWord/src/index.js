// import clog from './util/index'
import React from 'react'
// import ReactDOM from 'react-dom'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { HashRouter } from 'react-router-dom'
import 'antd/dist/antd.css'

const root = ReactDOM.createRoot(document.getElementById('id'))
root.render(
  // <React.StrictMode>
  <HashRouter>
    <App />
  </HashRouter>
  // </React.StrictMode>
)
