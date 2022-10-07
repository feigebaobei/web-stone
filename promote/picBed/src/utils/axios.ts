import axios from 'axios'
import md5 from 'md5'
import createSimpleStore from './simpleStore'

let simpleStore = createSimpleStore()

let instance: any = axios.create({
    // baseURL: 'http:www.xxx.com',
    // 用于各种后端接口，所以不适合设置baseURL
    timeout: 5000,
    headers: {
        // 'key': 'value'
    }
})
let myInterceptor = instance.interceptors.request.use((config: any) => {
    // 取消重复请求
    let obj = {
        url: config.url,
        method: config.method,
        params: config.params,
        data: config.data,
    }
    let hashStr = md5(JSON.stringify(obj))
    if (simpleStore.isExist(hashStr)) {
        return null
    } else {
        return config
    }
}, function (error: any) {
    return Promise.reject(error)
})
instance.interceptors.response.use((res: any) => {
    let obj = {url: res.config.url, method: res.config.method, params: res.config.params, data: res.config.data}
    let hashStr = md5(JSON.stringify(obj))
    simpleStore.remove(hashStr)
    if (res.status === 200) {
        return res.data
    } else {
        return Promise.reject(new Error('请求出错'))
    }
}, function (error: any) {
    return Promise.reject(error)
})
// let cancelRequest = () => {
//     axios.interceptors.request.eject(myInterceptor)
// }

export {
    instance,
    // 强制取消请求
    // cancelRequest
}