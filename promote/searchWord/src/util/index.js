import { instance } from "./axios"

const clog = console.log
const getEnv = () => {
    // 0 本地
    // 10 prev
    // 20 生产
    let {host} = location
    if (host.includes('localhost')) {
        return 0
    } else if (host.includes('lixiaodan.org')) {
        return 20
    } else if (host.includes('vercel')) {
        return 21
    } else if (host.includes('netlify')) {
        return 22
    }
}

export {
    clog,
    instance,
    getEnv
}