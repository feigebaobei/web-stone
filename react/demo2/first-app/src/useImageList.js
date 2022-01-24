
import { useEffect, useState } from 'react'
import axiosInstance from './axiosInstance'

let {log} = console

export default function useImageList (page, searchTerm) {
    // let imageList = []
    // let setImageList = () => {}
    // return [imageList, setImageList]
    let [imageList, setImageList] = useState([])
    let fetch = () => {
        log(page, searchTerm)
        if (searchTerm) {
            fetchSearch(page, searchTerm)
        } else {
            fetchRandom(page)
        }
    }
    let fetchSearch = (page, searchTerm) => {
        axiosInstance.get('search/photos', {
            params: {
                query: searchTerm,
                page,
            }
        }).then(res => {
            if (page === 1) {
                setImageList(res.data.results)
            } else {
                setImageList([...imageList, ...res.data.results])
            }
        })
    }
    let fetchRandom = (page) => {
        axiosInstance.get('photos', {
            params: {
                page
            }
        }).then(res => {
            setImageList([...imageList, ...res.data])
        })
    }
    useEffect(() => {
        fetch();
    }, [page, searchTerm]);

    return [imageList]
}
// export default useImageList