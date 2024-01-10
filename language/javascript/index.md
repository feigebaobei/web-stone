# javascript

- (缩写：JS)是一门完备的 动态编程语言。当应用于 HTML 文档时，可为网站提供动态交互特性。由布兰登·艾克（ Brendan Eich，Mozilla 项目、Mozilla 基金会和 Mozilla 公司的联合创始人）发明。
- 它是一个面向对象的语言。它比 java 中的对象更纯粹。js 在 es5 后的有`class`，也不能说 js 中有了类。`class`的本质还是对象（`Object`）。
- 没有类，所以没有继承。有引用，没有类，引用是通过原型链实现引用。

# 引擎

- [V8](/language/javascript/v8.md)
- [JavascriptCore](/language/javascript/javascriptCore.md)

# 名词说明

**动态编程语言**  
是指可在运行阶段时执行那些在编译阶段执行的操作的编程语言。比如，在 JavaScript 中， 我们可以在程序运行时改变变量的类型，或者为一个对象增加一个新属性或者方法。  
**对象的属性**  
对象是复杂数据类型（亦称：引用数据类型）。对象的每个 key 对应的值可以是简单数据类型也可以是复杂数据类型。作者把每个 key 对应的值都称为属性值，不论是简单数据类型还是复杂数据类型。  
**原型对象上的方法**  
prop#method。如：`Promise#then`。

# 数据类型

- String
- Number
- Boolean
- Null
- undefined
- Object
- Symbol
- BigInt

typeof 命令返回数据类型

# 变量

## var & let & const

<!-- prettier-ignore-start -->
|       | 是否可以变量提升 | 作用域 |   |  |  
| ----- | ----------- | --- | ----- | ---- |
| var   | y  | 函数级作用域 | 可多次声明   | 可多次赋值   |
| let   | n  | 块级作用域   | 不可多次声明 | 可多次赋值   |
| const | n  | 块级作用域   | 不可多次声明 | 只能赋值一次 |
<!-- prettier-ignore-end -->

## 声明 & 定义

|        |               |             |
| ------ | ------------- | ----------- |
| 声明   | 提出变量名    | `var a`     |
| 初始化 | 第一次赋值    | `a = 's'`   |
| 定义   | 声明 + 初始化 | `var n = 0` |

## 变量提升

function、var 都会触发变量提升。  
先提升 function，再提升 var。且存在变量覆盖。

# [事件](/language/javascript/event.html)

# 原型链 [ppt](/confuse/jsPrototypeChain.pptx)

使用对象的`[[prototype]]`属性原型链上源的对象。
原型链中的对象使用`[[prototype]]`属性“串联”起彼此。
一条链中不能有分支。
原型链的下游对象可以访问原型链的上游对象的属性。

## new 的过程做了什么

1. var a = Object.create(Object)
2. a[[prototype]] = Foo.prototype  
   // or  
   // a.**proto** = Foo.prototype
3. Foo.call(a)
4. 先创建一个实例，再把实例添加到原型链中。

# [继承](/language/javascript/inherit.html)

# 作用域链

js 在宏观上使用函数作用域，同时支持块级作用域。  
函数作用域。。。。  
块级作用域，只有`let`、`const`。

## this

this 指向运行时（不是定义时）的上下文环境变量。

### abc

即`apply / bind / call`。`abc`是作者起的名字。

|       |                                     | 执行时间     | 参数                                         |
| ----- | ----------------------------------- | ------------ | -------------------------------------------- |
| apply | fn.apply(otherThis, arrOfArgs)      | 立即执行     | 数组                                         |
| call  | fn.call(otherThis, arg0, arg1, ...) | 立即执行     | 多个参数                                     |
| bind  | fn.bind(otherThis, arg0, arg1, ...) | 返回一个方法 | 执行 bind 的参数追加上执行返回的方法时的参数 |

```js
// 待测试
Function.prototype.mockBind = (otherthis, ...args) => {
  let self = this
  let fBound = function (...otherArgs) {
    self.call(otherthis, ...args, ...otherArgs)
  }
  let Ft = function () {}
  Ft.prototype = this.prototype
  fBound.prototype = new Ft()
  return fBound
}
```

# constructor & class

## constructor

（特指构造方法）  
es5 前的产物。es6 以后一般不用。  
`inst instanceof ClassName`

## class

与构造函数很像。（不是构造函数的语法糖。）  
不能变量提升，遵守是块级作用域规则。  
class 可以结合`decorator`使用，构造函数不能使用`decorator`。

```js
class ClassName {
    constructor (...params) { // 可省略
        // super()
        // ...
        this.a = params[0] // 会在实例对象上设置属性a
    }
    t () {                 // 会在实例对象的原型链上的上游对象class ClassName上创建t属性。t属性的值是一个方法。方法中的this遵守作用域规则。执行`instance.t()`时this指向instance对象。
        // ...
        return this.a
    }
    // 设置存取描述符会使此属性放在实例对象上。
    get k () {...}
    set k (s) {...}
}
```

上述代码可(大致)转换为构造函数代码：

```js
function ClassName (...params) {
    this.a = params[0]
}
ClassName.prototype.t = funtion () {
    return this.a
}
// 若要使用class则构造者是class ClassName.
// 若要使用构造器则构造者是方法ClassName
```

```js
class A {
    constructor () {...} // 可省略
    get p () {...}       // 使用存取描述符
    set p (v) {...}
    [methodName] () {}   // 使用属性表达式
    static s () {}       // 静态属性
    static sa = 0       // 静态属性
}
class A extends B {     // 类A继承类B
    constructor() {
        super()
        // ...
    }
}
```

静态方法的本质是定义在构造方法上的方法。所以有人理解为不使用实例化就能使用的方法。也有人理解为不能在实例上使用，只能在类上使用的方法。  
如果把静态方法的本质写出来，则如下：

```js
function ClassName () {...}
ClassName.staticFn () {...}
```

为什么可以这样写？
`funtion`的原型链上游中有`Object`对象。该对象支持设置属性。静态方法就是为一个是 funtion 的对象设置了一个属性，该属性值是一个方法。

### 构造函数 & class & 普通函数

|          |           |                                                       |
| -------- | --------- | ----------------------------------------------------- |
| 构造函数 | 操作 this | 不返回对象。与`new`操作符一起使用，则会返回一个实例。 |
| class    | 操作 this | 不返回对象。与`new`操作符一起使用，则会返回一个实例。 |
| 普通函数 | 任意逻辑  | 返回或不返回一个对象                                  |

# proxy & reflect

## proxy

proxy 让代理模式更容易实现。
常用于做：保护/预检/代理等。

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
        get(target, propKey, receiver) // receiver 读操作所在的Proxy对象
        set(target, propKey, value, receiver)
        has(target, propKey)
        deleteProperty(target, propKey)
        ownKeys(target)
        getOwnPropertyDescription(target, propKey)
        defineProperty(target, propKey, propDesc)
        preventExtensions(target)
        getPrototypeOf(target)
        isExtensible(target)
        setPrototypeOf(target, proto)
        apply(target, object, args)
        construct(target, args)
    }
```

## reflect

- 更接近语言本质。
- 当前操作`Object`的方法同时存在于`Object`、`Reflect`。未来会只在`Reflect`上存在。
- Reflect 与 Proxy 的方法一一对应。
- Reflect 可保证原生方法被执行，Proxy 可保证原生方法不被执行，执行的是代理对象的方法。

```
Reflect.get(target, propKey, receiver)
Reflect.set(target, propKey, value, receiver)
Reflect.apply(target, thisArg, arrArgs)
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

## demo for 观察者模式

```js
let queuedObservers = new Set()
let handler = {
  set: (target, key, value, receiver) => {
    let result = Reflect.set(target, key, value, receiver)
    queuedObservers.forEach((observer) => observer())
    return result
  },
}
let observable = (obj) => {
  return new Proxy(obj, handler)
}
let observe = (fn) => queuedObservers.add(fn)

let obj = { a: 's' }
let observedObj = observable(obj)
let print = () => console.log('print')
observe(print)
observedObj.a = 0

// 我整理的代码
let clog = console.log
class Observable {
  constructor(o) {
    this.proxyObj = new Proxy(o, {
      get: (target, key, receiver) => {
        return target[key]
      },
      set: (target, key, value, receiver) => {
        target[key] = value
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

# 宏任务 & 微任务

## 宏任务，由宿主发起。

script 可理解为外层代码触发

- setTimeout
- setInterval
- postMessage
- MessageChannel
- setImmediate (node 环境)

## 微任务，由 js 引擎发起。

- Promise
- MutationObserver
- process.nextTick （node 环境）

## promise

promise 的参数是一个接收`resolve`/`reject`方法的方法。  
一个 promise 对象有三个状态。初始状态是`pendding`，当执行`resolve`方法时改变为`fulfilled`状态，当执行`reject`方法时改变为`rejected`状态。二个方法都不执行，则一直是`pendding`状态。`resolve`状态触发 promise 对象的`then`方法。`reject`状态触发 promise 对象的`catch`方法。  
在定义时开始执行。

### promise 的属性

```js
Promise#then((reslt) => {})
Promise#catch((error) => {})
Promise#finally(() => {})    // 不返回东西。即使写了返回东西的代码也不返回。回调方法中无参数。
Promise.all(arrP)    // 这种写法的都是静态属性。若arrP都是fulfilled状态则执行then方法，参数是一个数组。若arrP中有一个rejected状态则立即执行catch，参数是一个值。
Promise.race(arrP)   // 返回最先改变状态的promise对象，状态由该对象决定。
Promise.allSettled(arrP) // 当arrP都改变状态后返回结果。结果是由{status: 'fulfilled' | 'rejected', value / reason}组成的数组。总是触发then方法。
Promise.any(arrP)        // arrP中只要有一个状态为fulfilled则返回该值，触发then()。若全为rejected则返回AggregateError对象，触发catch()。
Promise.resolve()
Promise.reject()
Promise.try()            // 正在开发。
```

### 模拟 allSettled

```js
Promise.prototype.mockAllSettled = (arrP) => {
  // 每个p都触发检查方法。
  // 检查方法判断是否返回结果
  return new Promise((s) => {
    let len = arrP.length
    let res = new Array(len)
    res.fill(null)
    let f = () => {
      if (res.every((item) => !!item)) {
        s(res)
      }
    }
    for (let i = 0; i < len; i++) {
      arrP[i]
        .then((subRes) => {
          res[i] = {
            value: subRes,
            status: 'fulfilled',
          }
        })
        .catch((e) => {
          res[i] = {
            reason: e,
            status: 'rejected',
          }
        })
        .finally(() => {
          f()
        })
    }
  })
}
```

### 使用 promise 封装 ajax

```js
let fetchData = (url, method) => {
  return new Promise((s, j) => {
    let handler = function () {
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
    let client = new XMLHttpRequest()
    client.open(method.toUpperCase(), url)
    client.onreadystatechange = handler
    client.responseType = 'json'
    client.setRequestHeader('Accept', 'application/json')
    client.send()
  })
}
```

### 判断 promise 对象

```
function isPromise(obj) {
  return 'function' == typeof obj.then;
}
```

### 回调方法转换为 promise

```js
// callback
// let fn = (params, cb) => {...}
// callback: (err, res) => err ? reject(err) : resolve(res)

let cbToP = (fn, ...params) =>
  new Promise((s, j) => {
    fn(...params, (err, res) => {
      return err ? j(err) : s(res)
    })
  })
let callbackToPromise = cbToP
```

### 全局的事件

```js
window.addEventListener(
  'rejectionhandled',
  (event) => {
    console.log('Promise rejected; reason: ' + event.reason)
  },
  false
)
window.onunhandledrejection = (event) => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`)
}
```

<!-- prettier-ignore-start -->
|      | rejectionhandled          | unhandledrejection        |
| ---- | --------------- | ----- |
| 环境 | window/worker             | window/worker             |
|      | 当 Promise 被 reject 且执行 reject 处理器的时候，会触发 | 当 Promise 被 reject 且没有 reject 处理器的时候，会触发 |
<!-- prettier-ignore-end -->

### promise & ts

```
let p = new Promise<T>((s, j) => {...})
```

## eventLoop (异步 & 同步)

所有 js 代码按执行时序可分为三部分：同步代码/宏任务/微任务。  
代码从上到下执行。遇到同步代码则依次序执行。遇到宏任务不执行，放入宏任务队列。遇到微任务不执行，入入微任务队列。执行完所有同步代码后执行一个宏任务队列中的宏任务，然后执行完所有微任务。再执行宏任务队列中的一个宏任务，再执行所有微任务。直到宏任务队列为空/微任务队列为空。  
因宏任务是宿主环境的，微任务是 js 语言的。所以宏任务执行一个，微任务执行一堆。

|         | i/o          | timings    |     |
| ------- | ------------ | ---------- | --- |
| ram     | ns           | sync       |     |
| disk    | 1ms          | async/sync |     |
| network | 100ms-2000ms | async      |     |

# Symbol

内置了`Symbol.iterator`属性  
用于表示独一无二的值

```js
// 用法
Symbol(p?: string)
Symbol('string')
Symbol.for('string')

let s = Symbol('str') // symbol => string
String(s) // 'Symbol(str)'
// symbol不能转化为number

```

<!-- prettier-ignore-start -->
|      |    |    |     |     |
| ----- | --- | ---- | --- | --- |
| Symbol#description  | 返回描述   |    |     |     |
| Symbol.for(desc)    | 若存在相同的 desc 则返回已经存在的 symbol，否则新建一个 symbol 再返回 | 全局惟一，与在哪个 module 无关。 |     |     |
| Symbol.keyFor(desc) | 返回一个已登记的 symbol 的 desc  |    |     |     |
<!-- prettier-ignore-end -->

js 内置了很多 symbol 的属性。

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
|     |     |     |     |     |
|     |     |     |     |     |
|     |     |     |     |     |

# Generator & Iterator

## Iterator

它是一个遍历器。
`[Symbol.iterator]`是遍历器接口。
有 iterator 接口的对象就是可遍历对象。
可遍历对象都有`[Symbol.iterator]`属性。
遍历器接口是一个方法。该方法返回遍历器对象（至少包含`next`属性的对象）。
next 属性值是一个方法。该方法返回一个包含当前对象信息的对象。如：

```
{
    value: any, // 当前值,
    done: boolean, // 是否结束
}
```

内置 iterator 接口的对象有 Array/Set/Map/String/TypedArray/...。
也可以自定义 iterator 接口，如：

```js
let obj = {}
obj[Symbol.iterator] = () => {
  let t = 0
  return {
    next: function () {
      if (t++ < 3) {
        return {
          value: t,
          done: false,
        }
      } else {
        return {
          value: 8,
          done: true,
        }
      }
    },
  }
}
for (let v of obj) {
  console.log('v', v)
}
```

主要使用`for...of`对接 iterator 接口。

### Iterator 的作用有三个：

一是为各种数据结构，提供一个统一的、简便的访问接口；
二是使得数据结构的成员能够按某种次序排列；
三是 Iterator 接口主要供 for...of 消费。

```
for (let ele of set)
for (let [k, v] of map)
```

### 遍历器对象

```js
{
    next() => any  // 必须要有此属性。
    return: any    // 完成遍历前清理或释放资源
    throw: error
}
```

### 触发 iterator 接口的方法

- 解构赋值
- 扩展运算符`...`
- `yield *`
- 遍历结构，如`for...of / Array.from / Map() / Set() / WeakMap() / WeakSet() / Promise.all() / Promise.race()`

### 为 obj 设置 iterator 接口

```js
let a = [1, 2, 3]
let o = {
  [Symbol.iterator]: a[Symbol.iterator].bind(a),
}
```

不建议这么做。使用专有的可遍历数据结构处理 iterator 更好。`o.a = a`.

## Generator

Generator 函数

- 是一个状态机，封装了多个内部状态。
- 会返回一个 generator 对象（不是遍历器对象），(至少包含`next`属性，可以包含`throw`/`return`属性的对象)。从定义角度认为 generator 对象包括 iterartor 对象。
- `function`关键字与函数名之间有一个星号`*`.
- 调用`next()`时执行到下一个`yield`。当调用`throw()`时，把`done`的属性值改为`true`，遍历结束。当调用`return(v)`时，把`value`的属性值为`v`，`done`的属性值改为`true`，遍历结束。
- 函数体内部使用`yield`表达式，定义不同的内部状态。`generator`方法和`yield`可互相嵌套。
  每个`yield`都定义一个状态。yield 后面的值是该状态的值。
- 是分段执行的，yield 表达式是暂停执行的标记，而`next()`可以恢复执行。
- 可以用于定义 iterator 接口。

```js
// 开关机
function* helloWorldGenerator() {
  let t = true
  while (true) {
    yield (t = !t)
  }
}
var hw = helloWorldGenerator()
console.log(hw.next())
// 多执行几次
// {value: false, done: false}
// {value: true, done: false}
// {value: false, done: false}

// 生成fibonacci数列
function* getFibonacci(num = 10) {
  let t = 0
  let [pre, cur] = [0, 1]
  while (t++ < num) {
    yield cur
    let q = cur
    cur = q + pre
    pre = q
  }
}
function getFibArr(num = 10) {
  return Array.from(getFibonacci(num))
}
// 平化数组
function* faltmizeArr(arr, isDeepFirst = true) {
  if (isDeepFirst) {
    for (let ele of arr) {
      if (Array.isArray(ele)) {
        yield* faltmizeArr(ele)
      } else {
        yield ele
      }
    }
  } else {
    let s = []
    for (let ele of arr) {
      if (Array.isArray(ele)) {
        s.push(...ele)
      } else {
        yield ele
      }
    }
    if (s.length) {
      yield* faltmizeArr(s, isDeepFirst)
    }
  }
}
```

### Generator#return

### Generator#throw

generator 方法的实例可执行`throw()`。然后在 generator 方法中 catch 一次错误，若再执行实例的`throw()`，则 generator 方法不 catch，则实例所在环境 catch.

### 协程

"协程"（coroutine），意思是多个线程互相协作，完成异步任务。过程如下：

1. 协程 A 开始执行。
2. 协程 A 执行到一半，进入暂停，执行权转移到协程 B。
3. （一段时间后）协程 B 交还执行权。
4. 协程 A 恢复执行。

### co 模块

详见[co](/confuse/co.html)

整个过程和`web worker`的工作过程很像。

### 流式处理

### co 源码

## async & await

是 es7 的内容。
基于`co`模块处理的。
`async/await`是`generator/yield`的语法糖，本质是`generator/yield/co`。
`generator/yield/co`的具有的功能在`async/await`中都有。

### async 原理

```
async function fn(args) {
  // ...
}
// 等同于
function fn(args) {
  return spawn(function* () {
    // ...
  });
}
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

### async & promise

|     | async                                             | promise                    |                      |
| --- | ------------------------------------------------- | -------------------------- | -------------------- |
|     | 基于 promise.                                     | js 的底层语法              |                      |
|     | 生成于 es7                                        | 生成于 es6                 |                      |
|     | 由内部 promise 决定状态                           | 由 s/j 决定状态            |                      |
|     | 语法糖                                            | 更本质                     |                      |
|     | 需要与 try/catch 结合使用才能处理错误             | 可使用 then/catch 处理错误 | 因此我更喜欢 promise |
|     | 若能保证返回 fulfilled 状态。可以使用 async/await |                            |                      |

# decorator

- 可以用于装饰类、类的属性。不可用于装饰方法。因为方法会被变量提升。类、类的属性不会提升。
- 当前仍再更新。
- 装饰器是一个方法。参数有 3 个 target:被装饰的对象（类或类的方法），name:被装饰的属性名，descriptor:属性描述符对象。
- 需要增强已有功能时使用。如本地验证用户登录后再执行某项功能。
- 有点像高阶函数、代理。
- 修饰什么就应该返回一个什么。
- 编译时运行。

```js
// no.1
function testable(target) {
    // target.isTestable = true
    target.prototype.isTestable = true
    // 修饰class时，操作的是原型对象。
}
@testable
class C {...}
let o = new C() // 使用被装饰过的类
// no.2
function readonly (target, name, description) {
  // target     class
  // name       class的属性名
    // description: {
    //     value,
    //     enumerable,
    //     configurable,
    //     writable
    // }
    description.wriable = false
}
class P {
    @readonly
    skills() {...}
}
let p = new P()
p.skills = () => {...} // 不可被重新赋值
// no.3
function log (target, name, descriptor) {
    let oldValue = descriptor.value
    descriptor.value = (...args) => {
        console.log(`args: ${args}`)
        return oldValue.apply(null, args)
    }
    return descriptor
}
// 也可以多接收几个参数
function f (a, b, c, d) {
  return function (target, name, descriptor) {
    // 使用a,b,c,d
    return ...
  }
}
@f(1,2,3,4)
class C {...}
```

常用包

- core-decorators.js
- Trait

装饰器的种类

- 类
- 类的属性（public, private, and static）
- 类的方法（public, private, and static）
- 属性存取器（accessor）（public, private, and static）

## 应用

- 身份认证
- 日志记录
- 数据（参数）合理性检查
- 缓存装饰器

## 常用的修饰器库

- [traits-decorator](https://github.com/CocktailJS/traits-decorator)
- [postal](https://github.com/postaljs/postal.js)
- [core-decorator](https://github.com/jayphelps/core-decorators.js)

# 位运算

|        |     |                 |                                                                                                     |     |
| ------ | --- | --------------- | --------------------------------------------------------------------------------------------------- | --- |
| `&`    | and | 与              | 判断 2 个二进制数每个对应的位上是否都为 1,则该位为 1                                                |
| `\|`   | or  | 或              | 判断 2 个二进制数每个对应的位上是否至少有一位为 1,则该位为 1                                        |
| `^`    | xor | 异或            | 判断 2 个二进制数每个对应的位上是否只有一位为 1,则该位为 1 对应位上是否不同。若是则为 1，否则为 0。 |
| `~`    | not | 取反            | 每一位都取反                                                                                        |
| `>>`   |     | 右移            | 右边移出的去掉。左边以最左则的值填充。                                                              |
| `<<`   |     | 左移            | （0）当移动位数大于 32 时。使用 x%32。 左边溢出的去掉。右边使用 0 补齐。                            |
| `>>>`  |     | 无符号右移（0） | 右边移出的去掉。左边以 0 填充。                                                                     |
| `<<=`  |     |                 |                                                                                                     |
| `>>=`  |     |                 |                                                                                                     |
| `>>>=` |     |                 |                                                                                                     |
| `&=`   |     |                 |                                                                                                     |
| `^=`   |     |                 |                                                                                                     |
| `\|=`  |     |                 |                                                                                                     |

demo

|          |         |
| -------- | ------- | -------- | --- |
| 判断奇偶 | `x&1`   |
| 左移一位 | <=> \*2 | 右移一位 | /2  |

0 与任意数^ 结果是任意数。任意与自身异或都是 0  
|右移一位| 得到整数部分|
|~~| 得到 number 型(得到整数部分,包括符号.)|

- 是否为奇数 `let isOdd = n => !!(n & 1)`
- 位运算，是否为偶数 `let isEven = n => !isOdd(n)`
- 乘以 2^n `1 << n`
- n 底
- m 2 的幂

# [worker](/language/javascript/webWorker.html)

# 线程

js 是单线程语言。但是它的宿主环境——browser 支持多线程。  
当遇到大量计算时可以使用`web worker`处理。主`worker`创建一个子`worker`，再让子 worker 处理大量计算，主 worker 会交出数据的控制权给子 worker。得到计算结果后把由子 workern 以消息`message`的形式给主 worker。

## 协程

# [xhr](/language/javascript/xhr.html)

# 动画

一般与 canvas 结合工作。

<!-- prettier-ignore-start -->
|             |      |     |     |
| --------------- | ---------- | --- | --- |
| `requestAnimationFrame(cb) => number`  | 在下次更新动画时调用，即在重绘前调用。 |     |     |
| `cancelAnimationFrame(id: number) => void`    | 取消更新动画时的回调。   |     |     |
| `requestIdleCallback(cb: (IdleDeadline) => void, opt ?= {timeout: number}) => number` | 在浏览器的空闲时间执行回调方法。       |     |     |
| `cancelIdleCallback(id: number) => void`      |      |     |     |
|       |     |     |     |
<!-- prettier-ignore-end -->

```ts
IdleDeadline {
  didTimeout: boolean // 执行回调方法时是否超过指定时间。此时一定设置了timeout
  timeRemaining(): nubmer // 返回一个时间DOMHighResTimeStamp, 并且是浮点类型的数值，它用来表示当前闲置周期的预估剩余毫秒数。如果 idle period 已经结束，则它的值是 0。你的回调函数 (传给 requestIdleCallback 的函数) 可以重复的访问这个属性用来判断当前线程的闲置时间是否可以在结束前执行更多的任务。
}
```

# js 操作 dom

```js
// 创建
document.createElement('tag')
// 查
// 节点的访问关系都是属性。而节点的操作都是函数（方法）。
document.querySelector(p)
document.getElementById(id)
document.getElementByClassName(className)
document.getElementByTagName(tagName) // eg h1
dom.parentElement // 获取父节点
dom.children[index] // 获取指定下标的子节点
dom.childNodes // 包括纯文本等节点
dom.firstElementChild
dom.lastElementChild
dom.nextElementSibling // 获取下一个兄弟节点
dom.previousElementSibling // 获取上一个兄弟节点
formFieldDom.value
// 改
dom.innerText = 'sss'
dom.innerHTML = 'html代码' // 会覆盖
dom.style[cssKey] = 'value'
dom.setAttribute(key, value) // 如input设置了disable属性后，与其值无关，都是不可使用
dom.getAttribute(key)
dom[attrKey] = value
// 删
dom.removeChild(childDom)
dom.removeAttribute(key)
// 增
dom.appendChild(childDom)
dom.insertBefore(newDom, matterDom)
// 复制
dom.cloneNode(bool /*是否复制其子节点*/)
// 替换
dom.replaceChild(newDom, oldDom)
// class
dom.classList.remove(s)
dom.classList.add(s)
dom.classList.contain(s)
dom.classList.toggle(s) // 若存在则删除，否不存在则添加。
```

# window 中常用的对象

- [URL](/language/javascript/url.html)
- [blob](/language/javascript/blob.html)
- [file](/language/javascript/file.html)
- [title](/language/javascript/title.html)
- [title](/language/javascript/title.html)
- [title](/language/javascript/title.html)

# BOM & js

- BOM Broser Object Model 浏览器对象模型

  - window
    - DOM (document object model) 文档对象
      - ...
    - frames
    - navigator 各浏览器多有差异
    - [history](/browser/history.html)
    - location
    - screen
  - xxx
  - xxx
  - xxx

- js 本地对象
  - [Object](/language/javascript/object.html)
  - [String](/language/javascript/string.html)
  - [Array](/language/javascript/array.html)
  - [Date](/language/javascript/date.html)
  - [Number](/language/javascript/number.html)
  - [RegExp](/regexp/index.html)
  - [Function](/language/javascript/function.html)
  - Boolean
  - Error
  - [symbol](/language/javascript/symbol.html)
  - null
  - [undefined](/language/javascript/undefined.html)
  - [bigint](/language/javascript/bigint.html)
  - [set](/language/javascript/set.html)
  - [map](/language/javascript/map.html)
  - [url](/language/javascript/url.html)
  - [typedArray](/language/javascript/typedArray.html)
- js 内置对象
  - [Math](/language/javascript/math.html)
  - [JSON](/language/javascript/json.html)
- js 宿主对象
  - BOM
    - [fetch](/language/javascript/fetch.html)
  - DOM
- xxxxx
  - [permission](/language/javascript/permission.html)
  - [clipboard](/language/javascript/clipboard.html)
  - [dataTransfer](/language/javascript/dataTransfer.html)
  - [event](/language/javascript/event.html)

# [模块化](/language/javascript/modularity.html)

<!-- prettier-ignore-start -->
| -    | 全称       | 代表       | 加载方式 |     |     |     |
| - | -------- | -------- | -------- | --- | --- | --- |
| commonjs (cjs) |            | nodejs     | 同步加载 |     |     |     |
| amd  | asynchronous module definition | require.js           | 异步加载 |     |     |     |
| cmd  | common module definition       | sea.js     |          |     |     |     |
| umd  | universion module definition   |            |          |     |     |     |
| es6  | -          | 在 js 语言层面上实现了模块化。 |          |     |     |     |
| iife |            |            |          |     |     |
| system         |            |            |          |     |     |
<!-- prettier-ignore-end -->

# [函数式编程](/language/javascript/functionalProgramming.html)

# 低层

|                                             |                                                                                                       |     |     |     |     |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------- | --- | --- | --- | --- |
| web interfaces                              | Javascript 暴露给 web APP 的接口，也就是 ES 定义的接口。                                              |     |     |     |     |
| web IDL (web interface definition language) | 用来定义 Web interfaces 的语言，其通过一种规范实现了 JS engine(V8)和 Web core(Blink)之间的低耦合绑定. |     |     |     |     |
|                                             |                                                                                                       |     |     |     |     |

## [es 版本](/language/javascript/version.md)

- es4
- es5
- es6
- es7
- es8
- es8
- es8
