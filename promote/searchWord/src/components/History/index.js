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
                setWordList(res.data)
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
    }

    return <Fragment>
        <main>
            {wordList.map((wordItem) => {
                return <Fragment key={wordItem.entry}>
                    <section className={styles.wordItem}>
                        <span className={styles.entry} onClick={entryClickHandler}>{wordItem.entry}</span>
                        <span className={styles.explain} onClick={explainClickHandler}>{wordItem.explain}</span>
                        <CloseCircleOutlined className={styles.icon} onClick={() => {iconClickHandler(wordItem.entry)}}/>
                    </section>
                </Fragment>
            })}
        </main>
    </Fragment>
}