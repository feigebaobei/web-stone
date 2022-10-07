import React, {
    useState,
    useEffect,
    Fragment,
    useReducer,
    useRef,
} from "react";
// import First from "./components/First";
import {Button, Input, message, Drawer, Form, InputNumber} from 'antd'
import {clog, getEnv, instance, createThrottleFn} from '../../util/index'
import { SettingOutlined } from '@ant-design/icons';
import styles from './index.module.css'
// import { useEffect } from "react/cjs/react.production.min";

// 本模块内的变量
const {Search} = Input

export default function WordQuery () {
    let [wordList, setWordList] = useState([])
    let [drawerOpen, setDrawerOpen] = useState(false)
    let searchRef = useRef()
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
    useEffect(function () {
        let fn = () => {
            searchRef.current.focus({cursor: 'all'})
        }
        window.addEventListener('focus', fn)
        searchRef.current.focus({cursor: 'all'}) // 打开就聚焦
        return () => {
            window.removeEventListener('focus', fn)
        }
    }, [])
    // let searchClickHandler = () => {

    // }
    // let historeClickHandler = () => {

    // }
    let drawerCloseHandler = () => {
        setDrawerOpen(false)
        saveSet()
    }
    let setButtonClickHandler = () => {
        setDrawerOpen(true)
    }
    let searchFn = (searchStr) => {
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
        }).finally(() => {
            searchRef.current.blur()
        })
    }
    let throttleSearchFn = createThrottleFn(searchFn)
    let searchHandler = (searchStr) => {
        if (!searchStr || !searchStr.trim()) {return}
        throttleSearchFn(searchStr)
    }
    let searchPressEnterHandler = (event) => {
        let value = event.target.value
        throttleSearchFn(value)
    }
    let saveSet = () => {
        window.localStorage.setItem('setBox', JSON.stringify({num: state.num}))
    }
    let NumberChangeHandler = (v) => {
        dispatch({type: 'num', payload: v})
    }
    let isEq = (a, b, strict = false) => {
        if (a && b) {
            if (strict) {
                return a === b
            } else {
                return a.toLowerCase() === b.toLowerCase()
            }
        } else {
            return false
        }
    }
    return <main className={styles.appRp}>
        <div className={styles.searchBox}>
            <Search ref={searchRef} size="large" allowClear placeholder="input search text" onPressEnter={searchPressEnterHandler} onSearch={searchHandler}/>
        </div>
        <main className={styles.mainBox}>
            {wordList.map((wordItem, index) => {
                return <Fragment key={index}>
                    <h2>{wordItem.entry}</h2>
                    {isEq(wordItem.entry, wordItem.query) && <p>
                        {wordItem.ukphone && <span style={{marginRight: '8px'}}><span>英</span> <span>{wordItem.ukphone}</span></span>}
                        {wordItem.usphone && <span><span>美</span> <span>{wordItem.usphone}</span></span>}
                    </p>}
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