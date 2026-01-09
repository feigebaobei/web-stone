## proxy

proxy 让代理模式更容易实现。
常用于做：保护/预检/代理等。
如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。
如果目标对象自身的某个属性不可写，那么 set 方法将不起作用。

```js
let o = {
    a: 's',
    _b: 1
}
var p = new Proxy(o, {
    get: (target, propKey, receiver) => {
        if (propKey.startsWith('_')) {
            return new Error('私有方法不能被外部访问')
        } else {
            return target[propKey]
        }
    },
    set: (target, propKey, value, receiver) {
        target[propKey] = value
        return true // 在严格模式下，set时必须返回true，否则会报错。
    }
})
console.log(p.a)    // 's'
console.log(p._b)   // 报错
```

this 指向 handler。因为 this 指向运行时上下文环境。

```js
let { proxy, revoke } = Proxy.revocable(target, handler)
proxy.key = 'str'
proxy.key // 'str'
revoke() // 取消代理
proxy.key // 报错
```

```js
var proxy = new Proxy(target, handler)
target: Object,
handler: 控制对象。
    {
        // 拦截读取对象的属性
        get(target, propKey, receiver) // receiver 读操作所在的Proxy对象
        // 拦截读取对象的属性
        set(target, propKey, value, receiver)
        // 拦截 propKey in proxy
        has(target, propKey) // proxy.has()返回false，则该属性不会被in运算符发现。
        // 拦截 delete obj[propKey]
        deleteProperty(target, propKey)
        // 拦截 Object.getOwnPropertyNames(p) / Object.getOwnPropertySymbols(p) / Object.keys(p) / for...in
        ownKeys(target)
        // 拦截 Object.getOwnPropertyDescriptor(p, key)
        getOwnPropertyDescription(target, propKey)
        // 拦截 Object.defineProperty(p, k, descriptor) / Object.defineProperties(p, descriptor)
        defineProperty(target, propKey, propDesc) // 如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty()方法不得改变这两个设置。
        // 拦截 Object.preventExtensions(p)
        preventExtensions(target) => boolean
        // 拦截 Object.prototype.__proto__ / Object.prototype.isPrototypeOf() / Object.getPrototypeOf() / Reflect.getPrototypeOf() / instanceof
        getPrototypeOf(target)
        // 拦截 Object.isExtensible(p)
        isExtensible(target) => boolean
        // 拦截 Object.setPrototypeOf(p, proto)
        setPrototypeOf(target, proto)
        // 拦截proxy实例作为函数调用的操作。 proxy(...args) / proxy.call(othis, ...args) / proxy.apply(othis, args)
        apply(target, thisObject, args)
        // 拦截实例化 new proxy(...args)
        construct(target, args) => newConstruct
    }
```

### 技巧

在一个 object 对象上设置一个 proxy 属性。

```js
let obj = { ...originObj, proxy: new Proxy(target, handler) }
```

嵌套

## reflect

- 为了操作对象而提供的新 API。
- Reflect 更接近语言本质。当前操作`Object`的方法同时存在于`Object`、`Reflect`。未来会只在`Reflect`上存在。
- 修改某些 Object 方法的返回结果，让其变得更合理。
- 让 Object 操作都变成函数行为。
- Reflect 与 Proxy 的方法一一对应。
- Reflect 可保证原生方法被执行，Proxy 可保证原生方法不被执行，执行的是代理对象的方法。

```
Reflect.get(target, propKey, receiver)
Reflect.set(target, propKey, value, receiver)
Reflect.apply(func, thisArg, arrArgs)
Reflect.construct(target, arrArgs)
Reflect.defineProperty(target, propKey, value, desc)
Reflect.deleteProperty(target, propKey)
Reflect.has(target, propKey)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, propKey)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)
```

## 积累

### demo for 观察者模式

```js
let clog = console.log
class Observable {
  constructor(o) {
    this.proxyObj = new Proxy(o, {
      get: (target, key, receiver) => {
<<<<<<< Updated upstream
        return Reflect.get(target, key) // 使用Reflect.get()是为了防止死循环
=======
        return Reflect.get(target, key)
>>>>>>> Stashed changes
      },
      set: (target, key, value, receiver) => {
        Reflect.set(target, key, value)
        this.observerList.forEach((v, k) => {
          k(target)
        })
        return true
      },
    })
    this.observerList = new Map()
  }
  addObserver(fn) {
    this.observerList.set(fn, Symbol())
  }
  removeObserver(fn) {
    this.observerList.delete(fn)
  }
  set(k, v) {
    this.proxyObj[k] = v
  }
  get(k) {
    return this.proxyObj[k]
  }
}
let origin = {}
let o = new Observable(origin)
let a = (p) => {
  clog('a fn', p)
}
let b = (p) => {
  clog('b fn', p)
}
o.addObserver(a)
o.addObserver(b)
o.set('k', 'v')
o.set('k1', 'v1')
clog(o.get('k'))
```

### 链式操作

```js
var pipe = function (value) {
  var funcStack = []
  var oproxy = new Proxy(
    {},
    {
      get: function (pipeObject, fnName) {
        if (fnName === 'get') {
          return funcStack.reduce(function (val, fn) {
            return fn(val)
          }, value)
        }
        funcStack.push(window[fnName])
        return oproxy
      },
    }
  )

  return oproxy
}

var double = (n) => n * 2
var pow = (n) => n * n
var reverseInt = (n) => n.toString().split('').reverse().join('') | 0

pipe(3).double.pow.reverseInt.get // 63
```

### 生成各种 DOM 节点

```js
<<<<<<< Updated upstream
const dom = new Proxy(
  {},
  {
    get(target, property) {
      return function (attrs = {}, ...children) {
        const el = document.createElement(property)
        for (let prop of Object.keys(attrs)) {
          el.setAttribute(prop, attrs[prop])
=======
const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
>>>>>>> Stashed changes
        }
        for (let child of children) {
          if (typeof child === 'string') {
            child = document.createTextNode(child)
          }
          el.appendChild(child)
        }
        return el
      }
    },
  }
)

const el = dom.div(
  {},
  'Hello, my name is ',
  dom.a({ href: '//example.com' }, 'Mark'),
  '. I like:',
  dom.ul(
    {},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, "…actually that's it")
  )
)

document.body.appendChild(el)
```

## proxy & decorator

<<<<<<< Updated upstream

|      | proxy       | decorator   | 高阶方法 |
| ---- | ----------- | ----------- | -------- |
|      | 只逆        | 不可逆      |          |
|      | 基于 target | 基于 target |          |
| 时机 | 编译时      | 编译时      |          |
|      |             |             |          |
|      |             |             |          |

=======
|| proxy | decorator |
|-|-|-|
||只逆|不可逆|
||基于 target|基于 target|
||||
||||
||||

> > > > > > > Stashed changes
