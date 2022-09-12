import React, {
    useState,
    // useEffect,
    Fragment,
    useReducer,
} from "react";
// import First from "./components/First";
import {Button, Input, message, Drawer, Form, InputNumber} from 'antd'
import {clog, getEnv, instance} from '../../util/index'
import { SettingOutlined } from '@ant-design/icons';
import styles from './index.module.css'

// 本模块内的变量
const {Search} = Input

export default function WordQuery () {
    let [wordList, setWordList] = useState([])
    let [drawerOpen, setDrawerOpen] = useState(false)
    let defaultSetBox = {num: 5}
    let oldSetBox = JSON.parse(window.localStorage.getItem('setBox') || JSON.stringify(defaultSetBox))
    let [state, dispatch] = useReducer((state, action) => {
        let res = state
        switch (action.type) {
            case 'num':
                res.num = action.payload
                break
            default:
                break
        }
        return res
    }, {
        num: oldSetBox.num, // || 5,
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
        setDrawerOpen(false)
        saveSet()
    }
    let setButtonClickHandler = () => {
        setDrawerOpen(true)
    }
    let searchHandler = (searchStr) => {
        instance({
            method: 'get',
            url: '/searchWord',
            params: {
                num: state.num,
                ver: '3.0',
                doctype: 'json',
                cache: 'false',
                le: 'en',
                q: searchStr
            },
        }).then(res => {
            if (!res.code) {
                setWordList(res.data)
            } else {
                message.error(`出错了，再试一次吧！   ${res.message}`)
            }
        })
    }
    let saveSet = () => {
        window.localStorage.setItem('setBox', JSON.stringify({num: state.num}))
    }
    let NumberChangeHandler = (v) => {
        dispatch({type: 'num', payload: v})
    }
    return <main className={styles.appRp}>
        <div className={styles.searchBox}>
            <Search size="large" placeholder="input search text" onSearch={searchHandler}/>
        </div>
        <main className={styles.mainBox}>
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
        >
            <p>{state.num}</p>
            <Form>
                <Form.Item
                    label="查询数量"
                    name="num"
                    placeholder="最小为0"
                    rules={[{ required: true, message: 'Please input your 查询数量!' }]}
                >
                    <InputNumber  min={1} max={20} 
                        value={state.num}
                        onChange={NumberChangeHandler}
                    />
                </Form.Item>
            </Form>
        </Drawer>
    </main>
}