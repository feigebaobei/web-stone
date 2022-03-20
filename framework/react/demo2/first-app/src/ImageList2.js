import React, { useState } from "react"

import useImageList from "./useImageList"

let {log} = console

let ImageList = (props) => {
    let [page, setPage] = useState(1)
    let [imageList] = useImageList(page)
    return (
        <div>
            {imageList.map((item, index) => {
                return (<img src={item.urls.small} key={index} alt=""></img>)
            })}
        </div>
    )
}
export default ImageList