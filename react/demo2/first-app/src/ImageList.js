import React, { useRef, useState } from "react"

import useImageList from "./useImageList"
import InfiniteScroll from "react-infinite-scroll-component";

let {log} = console

let ImageList = (props) => {
    let [page, setPage] = useState(1)
    let [searchTerm, setSearchTerm] = useState(null)
    let searchInputRef = useRef(null)

    let [imageList] = useImageList(page, searchTerm)
    let inputChangeHandler = () => {
        let text = searchInputRef.current.value
        setPage(1)
        setSearchTerm(text)
    }
    return (
        <div className="imageBox">
            
        <header className="header">
            <input type="text" ref={searchInputRef} placeholder="input search key"
             className="search-input"
            ></input>
            <button className="search-button" onClick={inputChangeHandler}>search</button>
        </header>
            <InfiniteScroll
                dataLength={imageList.length}
                next={() => setPage(page + 1)}
                hasMore={true}
            >
            {imageList.map((item, index) => {
                return (<img className="img" src={item.urls.small} key={index} alt=""
                crossOrigin="anonymous"
                ></img>)
            })}
            </InfiniteScroll>
        </div>
    )
}
export default ImageList