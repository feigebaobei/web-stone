## 2022 年了还想开发工具方法包。赶紧取消这个想法吧。

```js
// 去抖
// 在最后一次触发后指定时长执行回调方法
// 一段时间内连续调用，只执行一次。维护一个定时器，在定时器结束时执行。
let createDebounceFn = (fn: F, t = 250, self?: A) => {
    let timer: N
    return (...rest: A[]) => {
      let context = self
      if (timer) {
        clearTimeout(timer)
        timer = 0
      }
      timer = window.setTimeout(() => {
        fn.apply(context, rest)
        clearTimeout(timer)
        timer = 0
      }, t)
    }
}
// 节流
// 当事件持续触发时，在每隔指定时长执行一次回调方法。
// 指定时间外的方法才执行
// 一段时间内调用，每隔一段时间执行一次。当大于延迟时执行。
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
let j = (obj?: object) => (obj === undefined ? undefined : JSON.parse(JSON.stringify(obj)))
let clogj = (p) => {
  if (typeof p === 'object') {
    clog(j(p))
  } else {
    clog(p)
  }
}

let randomNum = (n = 10000) => (String(Math.floor(Math.random() * n)))
// 深复制。
// 有引用的情况。
// 无法处理循环引用
let cloneDeep = (v) => {
  let baseType = ['string', 'number', 'boolean', 'undefined', 'bigint', 'symbol']
  let res
  if (baseType.includes(typeof v)) {
      res = v
  } else { // null array object date set map function
      if (!v) {
          res = v
      } else {
          if (Array.isArray(v)) {
              res = v.map(item => cloneDeep(item))
          } else {
              let t = {}
              Object.entries(v).forEach(([k, v]) => {
                let type = getType(v)
                switch (type) {
                  case 'Function':
                    t[k] = v
                    break;
                  case 'Set':
                    t[k] = new Set(Array.from(v).map(item => {
                      return cloneDeep(item)
                    }))
                    break;
                  case 'Map':
                    t[k] = new Map(Array.from(v).map(([k, v]) => ([cloneDeep(k), cloneDeep(v)])))
                    break;
                  case 'Date':
                    t[k] = new Date(v)
                    break;
                  case 'Object':
                    t[k] = cloneDeep(v)
                    break;
                  case 'RegExp': // 未测试
                    t[k] = new RegExp(v.source, v.flags)
                    break;
                  default:
                    t[k] = v // 当发现新类型里再添加，先用引用处理。
                    break;
                }
              })
              res = t
          }
      }
  }
  return res
}
let cloneDeepTs = (v: A): A => {
  let baseType = ['string', 'number', 'boolean', 'undefined', 'bigint', 'symbol']
  let res
  if (baseType.includes(typeof v)) {
      res = v
  } else { // null array object date set map function
      if (!v) {
          res = v
      } else {
          if (Array.isArray(v)) {
              res = v.map((item: A) => cloneDeep(item))
          } else {
              let t: A = {}
              Object.entries(v).forEach(([k, v]) => {
                let type = getType(v)
                switch (type) {
                  case 'Function':
                    t[k] = v
                    break;
                  case 'Set':
                    t[k] = new Set(Array.from(v as Set<A>).map(item => {
                      return cloneDeep(item)
                    }))
                    break;
                  case 'Map':
                    t[k] = new Map(Array.from(v as Map<A, A>).map(([k, v]) => ([cloneDeep(k), cloneDeep(v)])))
                    break;
                  case 'Date':
                    t[k] = new Date(v as unknown as Date)
                    break;
                  case 'Object':
                    t[k] = cloneDeep(v)
                    break;
                  default:
                    t[k] = v // 当发现新类型里再添加，先用引用处理。
                    break;
                }
              })
              res = t
          }
      }
  }
  return res
}
let cloneDeep = (v: A) => {
  let baseType = ['string', 'number', 'boolean', 'undefined', 'bigint', 'symbol']
  let res: A
  if (baseType.includes(typeof v)) {
      res = v
  } else { // null array object
      if (!v) {
          res = v
      } else {
          if (Array.isArray(v)) {
              res = v.map(item => cloneDeep(item))
          } else {
              Object.entries(v).forEach(([k, v]) => {
                  res[k] = cloneDeep(v)
              })
          }
      }
  }
  return res
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
let preventEvent = (e, option = {isStop: true, isPrevent: true}) => {
  option.isStop && e.stopPropagation() // 阻止冒泡
  option.isPrevent && e.preventDefault() // 阻止默认事件
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
function j (obj) {
  return JSON.parse(JSON.stringify(obj))
}
// 把一个数字表示为2的若干次方相加之和
let basis2 = (n) => {
  let res = []
  let s = n.toString(2)
  s.split('').reverse().forEach((item, index) => {
    if (item === '1') {
      res.push(index)
    }
  })
  return res
}
// 最大公约数
let gcd = (n, m) => {
  if (!m) {
    return n
    } else {
      return gcd(m, n % m)
    }
}
// 最小公倍数
let lcm = (a, b) => {
  return a * b / gcd(a, b)
}
// 最大并行数量promise
let parallelMaxPromise = (cb = Promise.resolve(), capacity = 3, material = []) => {
  let mi = 0
  let pendingCount = capacity
  let createP = () => {
    Promise.resolve(cb(material[mi]))
    .finally(() => {
      pendingCount--
      check()
    })
  }
  let check = () => {
    if (pendingCount < capacity && mi < material.length) {
      createP()
      mi++
    }
  }
  if (material.length) {
    for (let i = 0; i < capacity; i++) {
      createP()
      mi++
    }
  }
}
// 创建一个worker
function createWorker(f) {
  var blob = new Blob(['(' + f.toString() +')()']);
  var url = window.URL.createObjectURL(blob);
  var worker = new Worker(url);
  return worker;
}
// 可控制状态的promise对象
export function createDefer<T = any>(): Defer<T> {
  const r: any = {};
  const promise = new Promise<T>((resolve, reject) => {
    r.resolve = resolve;
    r.reject = reject;
  });
  r.promise = () => promise;
  return r;
}

let clog = console.log
let helper = {
  deepClone: (p) => p // todo
}
let mockUlid = () => {
  return Math.floor(Math.random() * 100000)
}
let ulid = mockUlid
// 创建一个空间，用于容纳数据。
// 创建若干索引表，每条索引指向若干数据。
class MySql {
  constructor(indexField = ['id'], schema = {},
// spaceSize = '500k'
  ) {
    // 预检
    // 设置实例属性
    this.space = new Map()
    this._indexTableBox = new Map()
    // this._indexFieldList = Array.isArray(indexField) ? indexField : [indexField]
    this._indexFieldSet = new Set()
    this._schema = schema
    // this.genIndexTableMap()
    this.init(indexField)
  }
  init(indexField) {
    this.getFieldSet(indexField)
    this.genIndexTableMap(indexField)
  }
  getFieldSet(indexField) {
    indexField.forEach(item => {
      this._indexFieldSet.add(item)
    })
  }
  // Init 若干索引表
  genIndexTableMap(indexField) {
    indexField.forEach(indexKey => {
      this._indexTableBox.set(indexKey, new Map())
    })
  }
  recastIndexTable() {
    // this.genIndexTable()
    this._indexTableBox = {}
    this.space.forEach(element => {
      this.add(element)
    })
  }
  add(p) {
    // object
    // number
    // string
    // array
    // regexp
    // date
    let ulid = mockUlid()
    this.space.set(ulid, helper.deepClone(p))
    Array.from(Object.keys(p)).forEach(key => {
      if (this._indexFieldSet.has(key)) {
        let value = p[key]
        let indexTable = this._indexTableBox.get(key)
        let ulidList = indexTable.get(value)
        if (ulidList) {
          ulidList.push(ulid)
        } else {
          indexTable.set(value, [ulid])
        }
      }
    })
  }
  get(key, value) {
    // return this._indexTableBox.get(key).get(value)
    // 预检
    if (this._indexFieldSet.has(key)) {
      // 查询
      let ulidList = this._indexTableBox.get(key).get(value)
      let res = []
      if (ulidList) {
        ulidList.forEach(ulid => {
          res.push(this.space.get(ulid))
        })
      }
      return res
    } else {
      return new Error(`此${key}不是索引，不能做查询。`)
    }
  }
  delete(key, value) {
    let indexTable = this._indexTableBox.get(key)
    let ulidList = indexTable.get(value)
    // let remainUlid = [...ulidList]
    (ulidList || []).forEach(ulid => {
      this.space.delete(ulid)
    })
    indexTable.set(value, [])
  }
  // 没有改
  // set(key, value) {}
}
// export default MySql;
window.MySql = MySql

// 可控制的promise
// 只能用一次。若想用多次请使用rxjs
class ControlablePromise {
  constructor() {
    this.promise = new Promise((s, j) => {
      this.resolve = s
      this.reject = j
    })
    this.resolve = () => {}
    this.reject = () => {}
  }
}
// 去空
let delEmpty = (str: S) => {
  let res = ''
  switch(getType(str)) {
    case 'String':
      let reg = /\s*/g
      res = str.replace(reg, '')
      break;
    default:
      res = ''
      break;
  }
  return res
}
let errorCode = {
  0: '成功',
  100100: '未传递必传参数', // 要求字段必传
  200000: '保存数据时出错',
  300000: '无对应数据',
  // ...
}
Promise.resolve().then(() => {
  // step 0
  // .then(() => {...})
  // .catch(() => {return Promise.reject(100100)})
}).then(() => {
  // step 1
  // .then(() => {...})
  // .catch(() => {return Promise.reject(200000)})
}).then(() => {
  // step 2
  // .then(() => {...})
  // .catch(() => {return Promise.reject(300000)})
}).catch((code) => {
  return res.status(200).json({
    code,
    message: errorCode[code],
    data: {}
  })
})
// 格式化json字符串
// 未测试
let formatJson = (a: object | string, indent = 2) => {
  let ot = a
  switch(getType(ot)) {
    case 'String':
      ot = ot.trim()
      ot = ot.replace(/^['"]{/, '{')
      ot = ot.replace(/}['"]$/, '}')
      ot = ot.replace(/\\"/g, '"')
      ot = JSON.parse(ot)
      break;
    case 'Object':
      break;
  }
  return JSON.stringify(ot, (_k, v) => v, indent)
}
let formatDate = (ms: N) => {
  if (Number.isInteger(ms)) {
    return
  } else {
    let date = new Date(ms)
    let [y, m, d] = [date.getFullYear(), date.getMonth(), date.getDate()]
    let h: S | N, mm: S | N, s: S | N
    [h, mm, s] = [date.getHours(), date.getMinutes(), date.getSeconds()]
    if (h < 10) {
      h = `0{h}`
    }
    if (mm < 10) {
      mm = `0{mm}`
    }
    if (s < 10) {
      s = `0{s}`
    }
    return `${y}-${m + 1}-${d} ${h}:${mm}:${s}`
  }
}
let djb2HashFn: HashFn = (k: A) => {
    let h = 5381  let t = String(k)
    for (let i = 0; i < t.length; i++) {
      h = h * 33 + t.charCodeAt(i)
    }
    return h % 1013
}
let loseloseHashFn: HashFn = (k: A) => {
  let h = 0  let t = String(k)
  for (let i = 0; i < t.length; i++) {
    h = h + t.charCodeAt(i)
  }
  return h % 37
}
let microAsync = (cb: F, delay = 0, ...p: A[]) => {
  return new Promise((s, _j) => {
    setTimeout(() => {
      s(true)
    }, delay)
  }).then(() => {
    return cb(...p)
  })
}
let cutTail = (str, threshold = 18) => {
  return str.length > threshold ? `${str.slice(0, threshold)}...` : str
}
let cutLength = (str, pre = 4, post = 6) => {
  if (str) {
    if (pre + post < str.length) {
      return `${str.slice(0, pre)}...${str.slice(-post)}`
    } else {
      return str旧上过不是刉jmh6
    }
  } else {
    return str
  }
}
// 兼容的数组，常用于处理脏数据。
let compatibleArray = (a) => Array.isArray(a) ? Array.from(a) : []
// 轮询promise
let sleep = (n: N = 0) => {
  return new Promise((s) => {
    setTimeout(() => {s(true)}, n)
  })
}
let getQs = (url = window.location.href) => {
  let i = url.indexOf('?')
  let s = url.slice(i + 1)
  if (s.length) {
    let arr = s.split('&')
    let obj = {}
    arr.forEach(item => {
      let [k, v] = item.split('=')
      if (obj.hasOwnProperty(k)) {
        if (Array.isArray(obj[k])) {
          obj[k].push(v)
        } else {
          obj[k] = [obj[k], v]
        }
      } else {
        obj[k] = v
      }
    })
    return obj
  }
}
let asyncMacroP = (fn: F, timing: N = 0, ...p: A[]) => {
  return new Promise((s, j) => {
    setTimeout(() => {
      // fn(...p)
      s(p)
    }, timing)
  }).then((p: A) => {
    fn(...p)
  })
}
let asyncMicroP = (fn: F, ...p: A[]) => {
  return new Promise((s) => {
    s(true)
  }).then(() => {
    fn(...p)
  })
}
class PromiseControllable<T> {
    resolve: (value: T) => void
    reject: (value?: T) => void
    promise: Promise<T>
    constructor () {
      this.resolve = () => {}
      this.reject = () => {}
      this.promise = new Promise((s, j) => {
        this.resolve = s
        this.reject = j
      })
    }
}
let o = {
  a: {b: 's'},
  b: true,
  c: false,
  d: new Date(),
  e: /\d{3}/,
  f: function () {return 'f'},
  g: undefined,
  h: null,
  i: 1n,
  j: Symbol('a'),
}
// 待测试
let serialize = (p: object) => {
  let str = '{'
  Array.from(Object.entries(p)).forEach(([k, v]) => {
    switch (typeof v) {
      case 'object':
        str += `"${k}":${serialize(v)},`
        break;
      case 'number':
      case 'boolean':
        str += `"${k}":${v},`
        break;
      default:
        str += `"${k}":"${v}",`
        break;
    }
  })
  return str.slice(0, -1) + '}'
}


interface LoopPropotype {
  launch: (...p: A[]) => Promise<A>
}
interface Loop extends LoopPropotype {
  pFn: () => Promise<A>
  bFn: (p: A) => B
  interval: N
}
let loopPropotype = Object.create({}, {
  launch: {
    value: function (...p: A[]) {
      return this.pFn(...p).then((r: A) => {
        if (this.bFn(r)) { // 若满足条件则继承，否则返回结果。
          return sleep(this.interval).then(() => {
            return this.launch(...p)
          })
        } else {
          return r
        }
      })
    }
  }
})
let createLoop = (pFn: F, bFn: F, i: N = 0): Loop => {
  return Object.create(loopPropotype, {
    pFn: {
      value: pFn
    },
    bFn: {
      value: bFn
    },
    interval: {
      value: i
    },
  })
}
// 基本类型
type S = string
type N = number
type A = any
type B = boolean
type ULID = S
type F = Function
type O = object
type D = Date
// type At = '@'
// type Email
// todo rename OA
interface Oa {
    [k: S]: A
}
type FT<T = A> = (...p: A[]) => T
type Email = `${S}@${S}`
interface Options<T, G> {
    label: T,
    value: G,
}
export type {
  S, N, A, B, ULID, F, O, D
  Oa, FT, Email, Options,
}

//jQueryなし
function querySelectorAllShadow(selector, context){
	context = context || document;
	var docs = [context];
	dig(context);
	var result = [];
	docs.forEach(function(doc){
		Array.apply(null, doc.querySelectorAll(selector)).forEach(function(dom){
			result.push(dom);
		});
	});
	return result;
	function dig(doc){
		Array.apply(null, doc.querySelectorAll('*')).forEach(function(dom){
			if(dom.shadowRoot!=null){
				docs.push(dom.shadowRoot);
				dig(dom.shadowRoot);
			}
		})
	}
}
//要素の配列を返す
querySelectorAllShadow('.footer div');
//jQueryあり
$.shadowDom = function(selector, context){
	context = context || document;
	var docs = [context];
	dig(context);
	var result = $();
	docs.forEach(function(doc){
		Array.apply(null, doc.querySelectorAll(selector)).forEach(function(dom){
			result = result.add(dom);
		});
	});
	return result;
	function dig(doc){
		Array.apply(null, doc.querySelectorAll('*')).forEach(function(dom){
			if(dom.shadowRoot!=null){
				docs.push(dom.shadowRoot);
				dig(dom.shadowRoot);
			}
		})
	}
};
//jQueryオブジェクトを返す
$.shadowDom('a');
//実DOMとshadowDomを股がる走査はできない。
//絞り込みたい場合は第2引数にコンテキストを指定する。
$.shadowDom('.footer div', $('.text')[0]);












```

- [rxjs](/util/rxjs.html)
- [转换 JSON](/language/javascript/json-transfer.html)
- [axios 项目中使用工具方法](/util/axios.html)
- [统计学 statistics 常用的方法](/util/statistics.html)
- [项目进度可视化工具](/promote/visibleProgress.html)
- [eventPivot](/util/eventPivot.html)
- [title](/util/title.html)
- [title](/util/title.html)
- [title](/util/title.html)
- [title](/util/title.html)
