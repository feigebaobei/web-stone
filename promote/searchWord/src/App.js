import React, {
    useState,
    // useEffect,
    Fragment,
    useReducer,
} from "react";
// import First from "./components/First";
import 'antd/dist/antd.css';
import {Button, Input, message, Drawer, Form, InputNumber} from 'antd'
import {clog, instance} from '../src/util/index'
import { SettingOutlined } from '@ant-design/icons';
import styles from './app.module.css'

const {Search} = Input

export default function App () {
    let [wordList, setWordList] = useState([])
    // console.log('wordList', wordList)
    let [drawerOpen, setDrawerOpen] = useState(false)
    let oldSetBox = JSON.parse(window.localStorage.setBox || '{}')
    console.log('oldSetBox', oldSetBox)
    let [state, dispatch] = useReducer((state, action) => {
        let res = state
        switch (action.type) {
            case 'num':
                // res = {num: }
                res.num = action.payload
                break
            default:
                break
        }
        return res
    }, {
        // num: '5',
        num: oldSetBox.num || 5,
        ver: '3.0',
        doctype: 'json',
        cache: 'false',
        le: 'en',
        q: '' 
    })
    let searchClickHandler = () => {

    }
    let historeClickHandler = () => {

    }
    let drawerCloseHandler = () => {
        // clog('drawerCloseHandler')
        setDrawerOpen(false)
        saveSet()
    }
    let setButtonClickHandler = () => {
        // clog('drawerOpenHandler')
        setDrawerOpen(true)
    }
    let searchHandler = (searchStr) => {
        // clog('searchHandler', '调用接口', searchStr)
        instance({
            method: 'get',
            // https://dict.youdao.com/suggest?num=5&ver=3.0&doctype=json&cache=false&le=en&q=evaluate
            // url: 'https://dict.youdao.com/suggest',
            url: 'http://localhost:5000/searchWord',
            params: {
                num: '5',
                ver: '3.0',
                doctype: 'json',
                cache: 'false',
                le: 'en',
                q: searchStr
            },
            // headers: {
            //     Origin: 'https://dict.youdao.com',
            //     Referer: 'https://dict.youdao.com',
            //     k: 'v'
            // }
        }).then(res => {
            if (!res.code) {
                setWordList(res.data)
            } else {
                message.error(`出错了，再试一次吧！   ${res.message}`)
            }
        })
    }
    let saveSet = () => {
        let obj = {}
        obj.num = state.num
        window.localStorage.setItem('setBox', JSON.stringify(obj))
    }
    let NumberChangeHandler = (v) => {
        dispatch({type: 'num', payload: v})
    }
    return <main className={styles.appRp}>
        {/* 考虑使用react-router */}
        <header>
            <Button onClick={searchClickHandler}>
            查询
            </Button>
            <Button onClick={historeClickHandler}>
            历史
            </Button>
        </header>
        <div>
            <Search placeholder="input search text" onSearch={searchHandler}/>
        </div>
        <main>
            {wordList.map((wordItem, index) => {
                return <Fragment key={index}>
                    <h2>{wordItem.entry}</h2>
                    <p>{wordItem.explain}</p>
                </Fragment>
            })}
        </main>
        <div className={styles.setBox}>
            <Button type="primary" shape="circle" icon={<SettingOutlined />} size="large" onClick={setButtonClickHandler} />
        </div>
        <Drawer
            title="设置"
            placement="left"
            onClose={drawerCloseHandler}
            open={drawerOpen}
            // key={placement}
        >
    {/* //   num: '5',
    //   ver: '3.0',
    //   doctype: 'json',
    //   cache: 'false',
    //   le: 'en',
    //   q: req.query.q || '' */}
    <p>{state.num}</p>
            <Form>
                <Form.Item
                    label="查询数量"
                    name="num"
                    placeholder="最小为0"
                    rules={[{ required: true, message: 'Please input your 查询数量!' }]}
                >
                    {/* <Input />
                     */}
                    <InputNumber  min={1} max={20} 
                        value={state.num}
                        onChange={NumberChangeHandler}
                    />
                </Form.Item>
            </Form>
        </Drawer>
    </main>
}