# throttleDebouncd

## throttle

```js
// 最基本的。体现节流思想的。
let createThrottleFn0 = (fn, t = 250) => {
  let prev = new Date().getTime()
  return (...rest) => {
    let now = new Date().getTime()
    if (now - prev > t) {
      fn(...rest)
      prev = now
    }
  }
}

// 变种一
// 从第一次触发开始计时。当t时间内无触发，则重置状态。
let createThrottleFn1 = (fn, t = 250) => {
  let prev = Number.MAX_SAFE_INTEGER
  let doing = false
  let timerId = 0
  return (...rest) => {
    if (!doing) {
      doing = true
      prev = new Date().getTime()
    }
    let now = new Date().getTime()
    if (now - prev > t) {
      fn(...rest)
    }
    if (timerId) {
      clearTimeout(timerId)
      timerId = 0
    }
    timerId = setTimeout(() => {
      prev = Number.MAX_SAFE_INTEGER
      doing = false
      clearTimeout(timerId)
      timerId = 0
    }, t)
  }
}
// 变种二
// 在t时间段内触发的事件，只使用第一次触发时的参数。
let createThrottleFn1 = (fn, t = 250) => {
  let prev = Number.MAX_SAFE_INTEGER
  let doing = false
  let timerId = 0
  let map = new Map()
  return (...rest) => {
    if (!doing) {
      doing = true
      prev = new Date().getTime()
      map.set(prev, rest)
    }
    let now = new Date().getTime()
    if (now - prev > t) {
      // fn(...rest)
      fn(map.get(prev))
    }
    if (timerId) {
      clearTimeout(timerId)
      timerId = 0
    }
    timerId = setTimeout(() => {
      prev = Number.MAX_SAFE_INTEGER
      doing = false
      map.clear()
      clearTimeout(timerId)
      timerId = 0
    }, t)
  }
}
```

||休时开始|回调方法的参数|||
|-|-|-|||
|createThrottleFn0|在定义时|最后一次的参数|||
|createThrottleFn1|第一次触发时|最后一次的参数|||
|createThrottleFn2|第一次触发时|第一次的参数|||
||||||
||||||

## debouncd

```js
let createDebounceFn0 = (fn: F, t = 250, self?: A) => {
  let timer: N
  return (...rest: A[]) => {
    if (timer) {
      clearTimeout(timer)
      timer = 0
    }
    timer = window.setTimeout(() => {
      fn.apply(self, rest)
      clearTimeout(timer)
      timer = 0
    }, t)
  }
}
```
