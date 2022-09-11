import React, {
    useState,
    // useEffect,
    Fragment,
    useReducer,
} from "react";
// import First from "./components/First";
import 'antd/dist/antd.css';
import {Button, Input, message, Drawer, Form, InputNumber} from 'antd'
import {clog, getEnv, instance} from '../src/util/index'
import { SettingOutlined } from '@ant-design/icons';
import styles from './app.module.css'
import {Routes, Route, Link} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'

const {Search} = Input

export default function App () {
    return (
        <div>
            <h2>title</h2>
            <nav>
                <Link to="/">home</Link>
                <Link to="/about">about</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home></Home>} />
                <Route path="about" element={<About></About>} />
            </Routes>
        </div>
    )
}