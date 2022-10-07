import { instance } from "./axios"
import {clog, getEnv} from './baseUtil'
let createThrottleFn = (fn, t = 250) => {
    let prev = new Date().getTime()
    return (...rest) => {
        let now = new Date().getTime()
        if (now - prev > t) {
            fn(...rest)
            prev = now
        }
    }
}

export {
    clog,
    instance,
    getEnv,
    createThrottleFn,
}