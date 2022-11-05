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
let getType = (o) => Object.prototype.toString.call(o).slice(8, -1) // 返回构造函数的名字 大写开头
// 输出
let clog = console.log
let clogs = (jsonObj: object | string) => {
    if (typof jsonObj === 'object') {
        clog(JSON.stringify(jsonObj))
    } else {
        clog(jsonObj)
    }
}
// 深复制对象
let cloneDeep = (p, c = {}) => {
  for (let k in p) {
    if (p.hasOwnProperty(k)) {
      if (typeof p[k] === 'object') {
        c[k] = getType(p[k]) === 'Array' ? [] : {}
        cloneDeep(p[k], c[k])
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
// 转义HTML标签的方法
let funEncodeHTML = function (str) {
    if (typeof str == 'string') {
        return str.replace(/<|&|>/g, function (matches) {
            return ({
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;'
            })[matches];
        });
    }
    return '';
};
// 反转义HTML标签的方法
let funDecodeHTML = function (str) {
    if (typeof str == 'string') {
        return str.replace(/&lt;|&gt;|&amp;/g, function (matches) {
            return ({
                '&lt;': '<',
                '&gt;': '>',
                '&amp;': '&'
            })[matches];
        });
    }
    return '';
};
// 回调方法转换为promise
let cbToP = (fn, ...params) => new Promise((s, j) => {
    fn(...params, (err, res) => {
        return err ? j(err) : s(res)
    })
})
let callbackToPromise = cbToP

// 把setTimeout封装为Promise
// 考虑一下要不要做成像 Proxy Proxy.revocable 一样，分别控制不可取消与可取消。
let setTimeoutPromise = (cb: () => {}, delay: 0) => {
  // return new Promise((s) => {
  //   setTimeout(() => {s(cb())}, delay)
  // })
  let timeoutId
  let timeout = new Promise((s) => {
    timeoutId = setTimeout(() => {
      s(cb())
    }, delay)
  })
  cancel: () => timeoutId && clearTimeout(timeoutId)
  return {timeout, cancel}
}

// 指定时长后再执行
let sleep = (delay) => {
  return new Promise((s) => {
    setTimeout(s, delay)
  })
}

// 达到最大时长时，返回默认值
// 也可处理为高阶函数
let timeoutValue = (realPromiseFn, delay, defalutValue) => {
  return Promise.any([realPromiseFn(), setTimeoutPromise(() => defaultValue, delay)])
}

// 复制
let copy = function (str){
  var inp = document.createElement('input'); // create input标签
  document.body.appendChild(inp) // 添加到body中
  inp.value = str // that.textContent // 给input设置value属性为需要copy的内容
  inp.select(); // 选中
  document.execCommand('copy',false); // copy已经选中的内容
  inp.remove(); // 删除掉这个dom
}
// 创建方法
let createFunction = (...args, body) => {
  return new Function(...args, body)
}
// 职责链 见“设计模式”
// xx
function walk (instance) {
  doWork(instance)
  let children = instance.render()
  children.forEach(walk)
}
function doWork () {
  ...
}
// walk(obj)






```

- [rxjs](/util/rxjs.html)
- [title](/util/title.html)
- [title](/util/title.html)
- [title](/util/title.html)
- [title](/util/title.html)
- [title](/util/title.html)
- [title](/util/title.html)
- [title](/util/title.html)
- [title](/util/title.html)
- [title](/util/title.html)
