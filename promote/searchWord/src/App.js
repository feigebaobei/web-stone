import React, {
    // useState,
    // useEffect,
    Fragment
} from "react";
// import First from "./components/First";
import 'antd/dist/antd.css';
import {Button} from 'antd'

export default function App () {
    let searchClickHandler = () => {

    }
    let historeClickHandler = () => {

    }
    return <Fragment>
        {/* 考虑使用react-router */}
        <header>
            <div onClick={searchClickHandler}>查询</div>
            <div onClick={historeClickHandler}>历史</div>
        </header>
        <Button>
            hi str
        </Button>
        {/* <div>
            from App
        </div> */}
        {/* <First /> */}
    </Fragment>
}