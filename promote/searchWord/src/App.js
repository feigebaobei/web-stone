import React, {
    // useState,
    // // useEffect,
    // Fragment,
    // useReducer,
} from "react";
import {Routes, Route, Link} from 'react-router-dom'
import WordQuery from './components/WordQuery'
import History from './components/History'
import styles from './app.module.css'

export default function App () {
    return (
        <div className={styles.cont}>
            <nav className={styles.navBox}>
                <Link to="/">查询</Link>
                <Link to="/history">历史</Link>
            </nav>
            <Routes>
                <Route path="/" element={<WordQuery />} />
                <Route path="history" element={<History />} />
            </Routes>
        </div>
    )
}