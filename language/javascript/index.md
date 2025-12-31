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

# [事件总线](/promote/eventHub.html)

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
    t () {     // 会在实例对象的原型链上的上游对象class ClassName上创建t属性。t属性的值是一个方法。方法中的this遵守作用域规则。执行`instance.t()`时this指向instance对象。
        // ...
        return this.a
    }
    // 设置存取描述符会使此属性放在实例对象上。get/set方法在原型对象上。
    get k () {...}
    set k (s) {...}
    a = 's' // 会设置在实例对象上
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
    static sa = 0        // 静态属性
}
class A extends B {      // 类A继承类B
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

# [proxy & reflect](/language/javascript/proxyReflect.html)

# [宏任务 & 微任务](/confuse/macroTask&MicroTask.html)

## 宏任务，由宿主发起。

script 可理解为外层代码触发

- setTimeout
- setInterval
- [postMessage](/language/javascript/postMessage.html)
- [MessageChannel](/language/javascript/messageChannel.html)
- setImmediate (node 环境)

## 微任务，由 js 引擎发起。

- Promise
- [MutationObserver](/promote/observe/mutationObserver.html)
- process.nextTick （node 环境）

## promise

promise 的参数是一个接收`resolve`/`reject`方法的方法。  
一个 promise 对象有三个状态。初始状态是`pendding`，当执行`resolve`方法时改变为`fulfilled`状态，当执行`reject`方法时改变为`rejected`状态。二个方法都不执行，则一直是`pendding`状态。`resolve`状态触发 promise 对象的`then`方法。`reject`状态触发 promise 对象的`catch`方法。  
在定义时开始执行。

### promise 的属性

```js
Promise#then((reslt) => {}) // then的第二个方法，无法接收第一个方法抛出的错误。catch可以。
Promise#catch((error) => {})
Promise#finally(() => {})    // 返回Promise<undefined>。它是promise对象，且解析为fulfilled状态。解析后的值是undefined。即使写了返回值也会解析为undefined。
Promise.all(arrP)    // 这种写法的都是静态属性。若arrP都是fulfilled状态则执行then方法，参数是由arrP内各Promise对象返回的数据组成的数组。若arrP中有一个rejected状态则立即执行catch，参数是第一个成为rejected状态的Promise对象返回的值。
Promise.race(arrP)   // 返回最先改变状态的promise对象，状态由该对象决定。
Promise.allSettled(arrP) // 当arrP都改变状态后返回结果。结果是由{status: 'fulfilled' | 'rejected', value / reason}组成的数组。总是触发then方法。
Promise.any(arrP)        // arrP中只要有一个状态为fulfilled则返回该值，触发then()。若全为rejected则返回AggregateError对象，触发catch()。
Promise.resolve()
Promise.reject()
Promise.try(f, ...args)           // 接收一个方法f，根据f的返回值设置为fulfilled状态或rejected状态。
Promise.withResolvers() // {promise, resolve, reject} 在外部设置promise的状态。
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
| 环境 | window/worker | window/worker |
|      | 当 Promise 被 reject 且执行 reject 处理器的时候，会触发 | 当 Promise 被 reject 且没有 reject 处理器的时候，会触发 |
<!-- prettier-ignore-end -->

### promise & ts

```
let p = new Promise<T>((s, j) => {...})
```

### promise & cb

```js
let f = (p, cb) => {
  if (cb) {
    return new Promise((s, j) => {
      if (condition) {
        return s(true)
      } else {
        return j(new Error())
      }
    })
  } else {
    new Promise((s, j) => {
      if (condition) {
        return s(true)
      } else {
        return j(new Error())
      }
    })
      .then((r) => {
        cb(null, r)
      })
      .catch((e) => {
        cb(e, null)
      })
  }
}
```

### title

```js
// 串行执行promise数组
let ps = [...]
for (let pi of ps) {
  await pi()
}
  // or
ps.reduce((curP, nextP) => curP.then(() => nextP()), Promise.resolve())

// 支持在promise作用域外改变状态
// 自己写一个withResolvers()
class ControlablePromise {
  constructor() {
    this.resolve
    this.reject
    this.promise = new Promise((s, j) => {
      this.resolve = s
      this.reject = j
    })
  }
}

// 多次请求共享一次请求
// 后来与axios结合做成了请求去重
let box = new Map()
let reqFn = (method, url, data) => {
  let key = f(method, url, data) // 取得惟一key
  if (box[key]) {
    return box.get(key)
  } else {
    let f = fetch(url, {method, data}).then(...).finally(() => {
      box.delete(key)
    })
    return f
  }
}
// 用aop思想使用promise
// 或称为pipe式使用promise
let wrapPromise = (pFn) => {
  return (...args) => {
    return pFn(...args).then((res) => {
      // op other
      return Promise.resolve(res)
    }).catch((error) => {
      // op other
      return Promise.reject(error)
    }).finally(() => {
      clog('xxx')
    })
  }
}
// wrapPromise(req)(params)
// 也可以写成class形式
class WrapPromise {
  constructor(pFn) {
    this.pFn = pFn
  }
  run(...args) {
    this.pFn(...args).then((res) => {
      // op other
      return Promise.resolve(res)
    }).catch((error) => {
      // op other
      return Promise.reject(error)
    }).finally(() => {
      clog('xxx')
    })
  }
}
// new WrapPromise(req).run(params)
// 一般类会有多个实例。方法可以运行多次。react团队也发现了这个情况，所以把class组件改为了方法组件。





```

### promise & async

async 返回 promise
await 可以处理 fulfilled 状态的值。不能处理 rejected 状态的值。
await 修饰非 promise 的值时，总是返回`Promise.resolve(value)`。
即：await 后的代码总是异步执行的。

```
let fn1 = async () => 1
<=>
let fn2 = () => Promise.resolve(1)
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

# [decorator](/language/javascript/decorator.html)

# 位运算

<!-- prettier-ignore-start -->
|        |     |  |          |     |
| ------ | --- | --------------- | ------------- | --- |
| `&`    | and | 与  | 判断 2 个二进制数每个对应的位上是否都为 1,则该位为 1   |
| `\|`   | or  | 或  | 判断 2 个二进制数每个对应的位上是否至少有一位为 1,则该位为 1 |
| `^`    | xor | 异或            | 判断 2 个二进制数每个对应的位上是否只有一位为 1（即：对应位上的数字互异）,则该位为 1 对应位上是否不同。若是则为 1，否则为 0。 |
| `~`    | not | 取反            | 每一位都取反   |
| `>>`   |     | 右移            | 右边移出的，去掉。左边以最左则的值填充。     |
| `<<`   |     | 左移            | （0）当移动位数大于 32 时。使用 x%32。 左边溢出的去掉。右边使用 0 补齐。    |
| `>>>`  |     | 无符号右移（0） | 右边移出的去掉。左边以 0 填充。            |
| `<<=`  |     |     |           |
| `>>=`  |     |     |           |
| `>>>=` |     |     |           |
| `&=`   |     |     |           |
| `^=`   |     |     |           |
| `\|=`  |     |     |           |
<!-- prettier-ignore-end -->

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

## 使用场景

- 布尔值
- 权限
- 颜色
- 位掩码

# [worker](/language/javascript/webWorker.html)

# 线程

js 是单线程语言。但是它的宿主环境——browser 支持多线程。  
当遇到大量计算时可以使用`web worker`处理。主`worker`创建一个子`worker`，再让子 worker 处理大量计算，主 worker 会交出数据的控制权给子 worker。得到计算结果后把由子 workern 以消息`message`的形式给主 worker。

## 协程

# [xhr](/language/javascript/xhr.html)

# 动画

一般与 canvas 结合工作。

<!-- prettier-ignore-start -->
| |      |     |     |
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

# js [操作 dom](/language/javascript/opDom.html)

# window 中常用的对象

- [URL](/language/javascript/url.html)
- [blob](/language/javascript/blob.html)
- [file](/language/javascript/file.html)
- [node](/language/javascript/node.html)
- [range](/language/javascript/range.html)
- [performance](/language/javascript/performance.html)
- [selection](/language/javascript/selection.html)
- [selection](/language/javascript/selection.html)
- [selection](/language/javascript/selection.html)
- [selection](/language/javascript/selection.html)
- [selection](/language/javascript/selection.html)

# [BOM](/browser/bom.html) & js

- BOM Broser Object Model 浏览器对象模型

  - window
    - DOM (document object model) 文档对象
      - ...
    - frames
    - navigator 各浏览器多有差异
    - [history](/browser/history.html)
    - location
    - screen
    - [requestIdleCallback](/promote/performance/requestIdleCallback.html)
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
  - [交叉观察器](/language/javascript/intersectionObserver.html)

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
