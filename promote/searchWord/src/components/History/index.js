import React, {
    // useState,
    // useEffect,
    Fragment, useEffect, useState
} from "react";
import { instance } from "../../util";
import { CloseCircleOutlined } from '@ant-design/icons';
import styles from './index.module.css'

export default function History () {
    let [wordList, setWordList] = useState([])
    let [selected, setSelected] = useState('')
    useEffect(() => {
        instance({
            method: 'get',
            url: '/searchWord/history',
        }).then(res => {
            if (res.code === 0) {
                // setWordList(res.data)
                // console.log('sdf')
                setWordList(res.data[0].values.map(item => {
                    return {
                        entry: item[0],
                        ukphone: item[1],
                        usphone: item[2],
                        explain: item[3],
                    }
                }))
            }
        })
    }, [])
    let gotoQeury = {}
    let entryClickHandler = () => {
        gotoQeury()
    }
    let explainClickHandler = () => {
        gotoQeury()
    }
    let iconClickHandler = (entry) => {
        if (selected) {
            if (selected === entry) {
                setWordList(wordList.filter(word => word.entry !== entry))
                setSelected('')
                instance({
                    method: 'delete',
                    url: 'searchWord/history',
                    data: {
                        entry
                    }
                }).then(res => {
                    // if (res.code === 0) {
                    //     // setWordList(wordList.filter(word => word.entry !== entry))
                    //     // setSelected('')
                    // }
                })
            } else {
                setSelected(entry)
            }
        } else {
            setSelected(entry)
        }
    }

    return <Fragment>
        <main>
            {wordList.map((wordItem) => {
                return <Fragment key={wordItem.entry}>
                    <section className={styles.wordItem}>
                        <div className={styles.left}>
                            <div className={styles.entry} onClick={entryClickHandler}>{wordItem.entry}</div>
                            <div className={styles.ukphone} onClick={entryClickHandler}>{wordItem.ukphone}</div>
                            <div className={styles.usphone} onClick={entryClickHandler}>{wordItem.usphone}</div>
                        </div>
                        <div className={styles.explain} onClick={explainClickHandler}>{wordItem.explain}</div>
                        <CloseCircleOutlined className={`${styles.icon} ${selected === wordItem.entry ? styles.iconSelected : ''}`} onClick={() => {iconClickHandler(wordItem.entry)}}/>
                    </section>
                </Fragment>
            })}
        </main>
    </Fragment>
}