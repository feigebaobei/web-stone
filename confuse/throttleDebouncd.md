throttle
```
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
```

debounce
```
let createDebounceFn = (fn, t = 250) => {
    let id
    return (...rest) => {
        clearTimeout(id)
        setTimeout(() => {
            fn(...rest)
        }, t)
    }
}
```