```js
// 去抖
let createDebounceFn = (fn, t = 250) => {
    let id
    return (...rest) => {
        clearTimeout(id)
        id = setTimeout(() => {
            fn(...rest)
        }, t)
    }
}
// 节流
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
// 解释查询字符串
let parseUrlQS = (url = window.location.href, useCode = true) => {
  let index = url.indexOf('?')
  let qs = url.slice(index)
  qs = qs.slice(1)
  if (qs) {
    let res = qs.split('&') // [k=v, ...]
      .reduce((r, c) => {
        let [k, v] = c.split('=')
        if (useCode) {
          v = decodeURIComponent(v)
        }
        r[k] = v
        return r
      }, {})
    return res
  } else {
    return {}
  }
}
// 获取数据类型
let getType = (o) => Object.prototype.toString.call(o).slice(8, -1)
// 深复制对象
let cloneDeep = (p, c = {}) => {
  for (let k in p) {
    if (p.hasOwnProperty(k)) {
      if (typeof p[k] === 'object') {
        c[k] = getType(p[k]) === 'Array' ? [] : {}
        clone(p[k], c[k])
      } else {
        c[k] = p[k]
      }
    }
  }
  return c
}
// promise封装ajax
let fetchData = (url, method) => {
  return new Promise((s, j) => {
    let client = new XMLHttpRequest()
    client.open(method.toUpperCase(), url)
    client.onreadystatechange = function () {
      if (this.readyState !== 4) {
        return
      } else {
        if (this.status === 200) {
          s(this.response)
        } else {
          j(new Error(this.statusText))
        }
      }
    }
    client.responseType = 'json'
    client.setRequstHeader('Accept', 'application/json')
    client.send()
  })
}
// 判断是否是promise对象
let isPromise = (obj) => (typeof obj.then === 'function')
// 开关机
function * genSwitch() {
    let t = true
    while (true) {
        yield t = !t
    }
}
// 生成fibonacci数列
function * getFibonacci(num = 10) {
    let t = 0;
    let [pre, cur] = [0, 1]
    while (t++ < num) {
        yield cur
        let q = cur
        cur = q + pre
        pre = q
    }
}
// 阻止事件
let preventEvent = (e, isStop = true, isPrevent = true) => {
  isStop && e.stopPropagation() // 阻止冒泡
  isPrevent && e.preventDefault() // 阻止默认事件
}










```


