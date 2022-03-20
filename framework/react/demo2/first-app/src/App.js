import ImageList from './ImageList'
// import ImageList from './ImageList2.js'

import './app.css' // 引入样式后该文件的后代组件都可以使用相应的类。
import React from 'react'

let App = () => {
    return (<div>
        {/* <header>
            <input type="text" value="" placeholder="input search key"></input>
            <button onClick={() => {set}}>search</button>
        </header> */}
        <ImageList></ImageList>
        </div>)
}
export default App