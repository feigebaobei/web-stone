import React, {
  // useState,
  // useEffect,
  Fragment,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { instance } from '../../util'
import { CloseCircleOutlined } from '@ant-design/icons'
import styles from './index.module.css'

// export default
function History(props) {
  console.log('porps', props)
  let [wordList, setWordList] = useState([])
  let [selected, setSelected] = useState('')
  let navigate = useNavigate()
  useEffect(() => {
    instance({
      method: 'get',
      url: '/searchWord/history',
    }).then((res) => {
      if (res.code === 0) {
        setWordList(
          res.data[0].values
            .map((item) => {
              return {
                entry: item[0],
                ukphone: item[1],
                usphone: item[2],
                explain: item[3],
              }
            })
            .reverse()
        )
      }
    })
  }, [])
  let gotoQeury = (s) => {
    navigate(`/?q=${s}`)
  }
  let sectionClickHander = (s) => {
    gotoQeury(s)
  }
  let iconClickHandler = (entry) => {
    if (selected) {
      if (selected === entry) {
        setWordList(wordList.filter((word) => word.entry !== entry))
        setSelected('')
        instance({
          method: 'delete',
          url: 'searchWord/history',
          data: {
            entry,
          },
        }).then((res) => {
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

  return (
    <Fragment>
      <main>
        {wordList.map((wordItem, index) => {
          // 没用到排序，可以使用index为key
          return (
            <Fragment key={index}>
              <section
                className={styles.wordItem}
                onClick={() => {
                  sectionClickHander(wordItem.entry)
                }}
              >
                <div className={styles.left}>
                  <div className={styles.entry}>{wordItem.entry}</div>
                  <div className={styles.ukphone}>{wordItem.ukphone}</div>
                  <div className={styles.usphone}>{wordItem.usphone}</div>
                </div>
                <div className={styles.explain}>{wordItem.explain}</div>
                <CloseCircleOutlined
                  className={`${styles.icon} ${
                    selected === wordItem.entry ? styles.iconSelected : ''
                  }`}
                  onClick={() => {
                    iconClickHandler(wordItem.entry)
                  }}
                />
              </section>
            </Fragment>
          )
        })}
      </main>
    </Fragment>
  )
}

// export default withRouter(History)
export default History
