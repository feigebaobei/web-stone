import axios from 'axios'
import md5 from 'md5'
import createSimpleStore from './simpleStore'
import {getEnv} from './baseUtil'

let simpleStore = createSimpleStore()
let baseURL = ''
switch (getEnv()) {
    case 0:
    default:
        baseURL = 'http://localhost:5000'
        break
    case 20:
        baseURL = 'https://lixiaodan.org'
        break
    case 21:
        baseURL = 'https://lixiaodanend.vercel.app'
        break
    case 22:
        baseURL = 'https://lixiaodanend.netlify.app'
        break
}

let instance = axios.create({
    // baseURL: 'http:www.xxx.com',
    // 用于各种后端接口，所以不适合设置baseURL
    baseURL,
    timeout: 5000,
    headers: {
        // 'key': 'value'
    }
})
let myInterceptor = instance.interceptors.request.use((config) => {
    // 取消重复请求
    let hashStr = md5({
        url: config.url,
        method: config.method,
        params: config.params,
        data: config.data,
    })
    if (simpleStore.isExist(hashStr)) {
        return null
    } else {
        return config
    }
}, function (error) {
    return Promise.reject(error)
})
instance.interceptors.response.use((res) => {
    let hashStr = md5({url: res.config.url, method: res.config.method, params: res.config.params, data: res.config.data})
    simpleStore.remove(hashStr)
    if (res.status === 200) {
        return res.data
    } else {
        return Promise.reject(new Error('请求出错'))
    }
}, function (error) {
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