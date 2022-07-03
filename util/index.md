<code>
        // let createDebounceFn = (fn, t = 250) => {
        //     let id
        //     return (...rest) => {
        //         clearTimeout(id)
        //         id = setTimeout(() => {
        //             fn(...rest)
        //         }, t)
        //     }
        // }
        let fn = (a, b) => {
            console.log('fn', a, b)
        }
        // let dbFn = createDebounceFn(fn)
        // document.querySelector('#box').addEventListener('mousemove', () => dbFn('1', 2))





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
        let thFn = createThrottleFn(fn, 400)
        document.querySelector('#box').addEventListener('mousemove', thFn)


      // 未解码
      let parseUrlQS = (url = window.location.href) => {
        let index = url.indexOf('?')
        let qs = url.slice(index)
        qs = qs.slice(1)
        if (qs) {
          let res = qs.split('&') // [k=v, ...]
          .reduce((r, c) => {
            let [k, v] = c.split('=')
            r[k] = v
            return r
          }, {})
          return res
        } else {
          return {}
        }
      }




</code>




```js
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
```



