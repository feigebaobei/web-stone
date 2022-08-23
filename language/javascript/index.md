# javascript
- (缩写：JS)是一门完备的 动态编程语言。当应用于 HTML 文档时，可为网站提供动态交互特性。由布兰登·艾克（ Brendan Eich，Mozilla 项目、Mozilla 基金会和 Mozilla 公司的联合创始人）发明。
- 它是一个面向对象的语言。它比java中的对象更纯粹。js在es5后的有`class`，也不能说js中有了类。`class`的本质还是对象（`Object`）。
- 没有继承，有引用。因为没有类，所以没有继承。引用是通过原型链实现引用。

# 引擎
- [V8](/language/javascript/v8.md)
- [JavascriptCore](/language/javascript/javascriptCore.md)

# 名词说明
**动态编程语言**
是指可在运行阶段时执行那些在编译阶段执行的操作的编程语言。比如，在 JavaScript 中， 我们可以在程序运行时改变变量的类型，或者为一个对象增加一个新属性或者方法。
**对象的属性**
对象是复杂数据类型（亦称：引用数据类型）。对象的每个key对应的值可以是简单数据类型也可以是复杂数据类型。作者把每个key对应的值都称为属性，不论是简单数据类型还是复杂数据类型。
**原型对象上的方法**
prop#method。如：`Promise#then`。

# 数据类型
String
Number
Boolean
Null
undefined
Object
Symbol
BigInt

# 变量
## var & let & const
||是否可以变量提升|作用域||
|-|-|-|-|
|var|y|函数级作用域|可多次声明|可多次赋值|||||
|let|n|块级作用域|不可多次声明|可多次赋值|||||
|const|n|块级作用域|不可多次声明|只能赋值一次|||||

## 声明 & 定义
声明：提出变量名
初始化：第一次赋值
定义 = 声明 + 初始化
```
var a // 声明
a = 's' // 初始化
var n = 0 // 定义
```

## 变量提升
function、var都会触发变量提升。
先提升function，再提升var。且存在变量覆盖。

# [事件](/language/javascript/event.html)

# [原型链](/confuse/jsPrototypeChain.pptx)
使用对象的`[[prototype]]`属性原型链上源的对象。
原型链中的对象使用`[[prototype]]`属性“串联”起彼此。
一条链中不能有分支。
原型链的下游对象可以访问原型链的上游对象的属性。

## new的过程做了什么
var a = Object.create(Object)
a[[prototype]] = Foo.prototype
// or
// a.__proto__ = Foo.prototype
Foo.call(a)
先创建一个实例，再把实例添加到原型链中。

# 作用域链
js在宏观上使用函数作用域，同时支持块级作用域。
函数作用域。。。。
块级作用域，只有`let`、`const`。

## this
this指向运行时（不是定义时）的上下文环境变量。

### abc
即`apply / bind / call`。`abc`是作者起的名字。
||||
|-|-|-|
|apply|fn.apply(otherThis, arrOfArgs)|立即执行|
|call|fn.call(otherThis, arg0, arg1, ...)|立即执行|
|bind|fn.bind(otherThis, arg0, arg1, ...)|返回一个方法|

# constructor & class
## constructor
（特指构造方法）
es5前的产物。es6以后一般不用。
`inst instanceof ClassName`  

## class
与构造函数很像。（不是构造函数的语法糖。）
不能变量提升，遵守是块级作用域规则。
class可以使用`decorator`，构造函数不能使用`decorator`。
```
class ClassName {
    constructor (...params) { // 可省略
        // ...
        this.a = params[0] // 会在实例对象上设置属性a
    }
    t () {                 // 会在实例对象的原型链上的上游对象class ClassName上创建t属性。t属性的值是一个方法。方法中的this遵守作用域规则。执行`instance.t()`时this指向instance对象。
        // ...
        return this.a
    }
}
```
上述代码可(大致)转换为构造函数代码：
```
function ClassName (...params) {
    this.a = params[0]
}
ClassName.prototype.t = funtion () {
    return this.a
}
// 若要使用class则构造者是class ClassName.
// 若要使用构造器则构造者是方法ClassName
```
```
class A {
    constructor () {...} // 可省略
    get p () {...}       // 使用存取描述符
    set p (v) {...}
    [methodName] () {}   // 使用属性表达式
    static s () {}       // 静态属性
    static sa = 0       // 静态属性
}
class A extends B {}     // 类A继承类B
```
静态方法的本质是定义在构造方法上的方法。所以有人理解为不使用实例化就能使用的方法。也有人理解为不能在实例上使用，只能在类上使用的方法。
如果把静态方法的本质写出来，则如下：
```
function ClassName () {...}
ClassName.staticFn () {...}
```
为什么可以这样写？
`funtion`的原型链上游中有`Object`对象。该对象支持设置属性。静态方法就是为一个是funtion的对象设置了一个属性，该属性值是一个方法。

|||||
|-|-|-|-|
|构造函数|操作this|不返回对象。与`new`操作符一起使用，则会返回一个实例。||
|class|操作this|不返回对象。与`new`操作符一起使用，则会返回一个实例。||
|普通函数|任意逻辑|返回或不返回一个对象||

# proxy & reflect
## proxy
proxy让代理模式更容易实现。
常用于做：保护/预检/代理等。
```
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
console.log(p.a)
console.log(p._b)
```
let {proxy, revoke} = Proxy.revocable(target, handler)
this指向handler。因为this指向运行时上下文环境。
```
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
- Reflect与Proxy的方法一一对应。
- Reflect可保证原生方法被执行，Proxy可保证原生方法不被执行，执行的是代理对象的方法。
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
        queuedObservers.forEach(observer => observer())
        return result
    }
}
let observable = obj => {
    return new Proxy(obj, handler)
}
let observe = fn => queuedObservers.add(fn)

let obj = {a: 's'}
let observedObj = observable(obj)
let print = () => (console.log('print'))
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
        k.fn(target)
        })
        return true
    }
    })
    this.observerList = new Map()
}
addObserver (fn) {
    this.observerList.set(fn, Symbol())
}
removeObserver (fn) {
    this.observerList.delete(fn)
}
set (k, v) {
    this.proxyObj[k] = v
}
get(k) {
    return this.proxyObj[k]
}
}
let origin = {}
let o = new Observable(origin)
let a = {
fn: (p) => {
    clog('a fn', p)
}
}
let b = {
fn: (p) => {
    clog('b fn', p)
}
}
o.addObserver(a)
o.addObserver(b)
o.set('k', 'v')
o.set('k1', 'v1')
clog(o.get('k'))
```

# 宏任务 & 微任务
## 宏任务，由宿主发起。
script 可理解为外层代码
setTimeout
setInterval
postMessage
MessageChannel
setImmediate (node环境)

## 微任务，由js引擎发起。
Promise
MutationObserver
process.nextTick （node环境）

## promise
promise的参数是一个接收`resolve`/`reject`方法的方法。
一个promise对象有三个状态。初始状态是`pendding`，当执行`resolve`方法时改变为`fulfilled`状态，当执行`reject`方法时改变为`rejected`状态。二个方法都不执行，则一直是`pendding`状态。`resolve`状态触发promise对象的`then`方法。`reject`状态触发promise对象的`catch`方法。
在定义时开始执行。

### promise的属性
```
Promise#then()
Promise#catch()
Promise#finally()    // 不返回东西。即使写了返回东西的代码也不返回。
Promise.all(arrP)    // 这种写法的都是静态属性。若arrP都是fulfilled状态则执行then方法，参数是一个数组。若arrP中有一个rejected状态则立即执行catch，参数是一个值。
Promise.race(arrP)   // 返回最先改变状态的promise对象，状态由该对象决定。
Promise.allSettled(arrP) // 当arrP都改变状态后返回结果。
结果是由{status: 'fulfilled' | 'rejected', value / reason}组成的数组。
Promise.any(arrP)        // arrP中只要有一个状态为fulfilled则返回该值，触发then()。若全为rejected则返回AggregateError对象，触发catch()。
Promise.resolve()
Promise.reject()
Promise.try()            // 正在开发。
```

### 使用promise封装ajax
```
let fetchData = (url, method) => {
return new Promise((s, j) => {
    let handler = function() {
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

### 判断promise对象
```
function isPromise(obj) {
  return 'function' == typeof obj.then;
}
```

### 回调方法转换为promise
```js
// callback
// let fn = (params, cb) => {...}
// callback: (err, res) => err ? reject(err) : resolve(res)

let cbToP = (fn, params) => new Promise((s, j) => {
    fn(params, (err, res) => {
        return err ? j(err) : s(res)
    })
})
let callbackToPromise = cbToP
```

## eventLoop (异步 & 同步)
所有js代码按执行时序可分为三部分：同步代码/宏任务/微任务。
代码从上到下执行。遇到同步代码则依次序执行。遇到宏任务不执行，放入宏任务队列。遇到微任务不执行，入入微任务队列。执行完所有同步代码后执行一个宏任务队列中的宏任务，然后执行完所有微任务。再执行宏任务队列中的一个宏任务，再执行所有微任务。直到宏任务队列为空/微任务队列为空。
因宏任务是宿主环境的，微任务是js语言的。所以宏任务执行一个，微任务执行一堆。  

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
||||||
|-|-|-|-|-|
|Symbol#description|返回描述||||
|Symbol.for(desc)|若存在相同的desc则返回已经存在的symbol，否则新建一个symbol再返回|全局惟一，与在哪个module无关。|||
|Symbol.keyFor(desc)|返回一个已登记的symbol的desc||||

js内置了很多symbol的属性。


||||||
||||||
||||||
||||||
||||||


# Generator & Iterator
## Iterator
它是一个遍历器。
`[Symbol.iterator]`是遍历器接口。
有iterator接口的对象就是可遍历对象。
可遍历对象都有`[Symbol.iterator]`属性。
遍历器接口是一个方法。该方法返回遍历器对象（至少包含`next`属性的对象）。
next属性值是一个方法。该方法返回一个包含当前对象信息的对象。如：
```
{
    value: any, // 当前值,
    done: boolean, // 是否结束
}
```
内置iterator接口的对象有Array/Set/Map/String/TypedArray/...。
也可以自定义iterator接口，如：
```
let obj = {}
obj[Symbol.iterator] = () => {
    let t = 0
    return {
        next: function () {
        if (t++ < 3) {
            return {
                value: t,
                done: false
            }
        } else {
            return {
                value: 8,
                done: true
            }
        };
        }
    };
}
for (let v of obj) {
    console.log('v', v)
}
```
主要使用`for...of`对接iterator接口。
### Iterator 的作用有三个：
一是为各种数据结构，提供一个统一的、简便的访问接口；
二是使得数据结构的成员能够按某种次序排列；
三是Iterator 接口主要供for...of消费。
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

### 触发iterator接口的方法
- 解构赋值
- 扩展运算符`...`
- `yield *`
- 遍历结构，如`for...of / Array.from / Map() / Set() / WeakMap() / WeakSet() / Promise.all() / Promise.race()`

### 为obj设置iterator接口
```js
let a = [1, 2, 3]
let o = {
    [Symbol.iterator]: a[Symbol.iterator].bind(a)
}
```
不建议这么做。使用专有的可遍历数据结构处理iterator更好。`o.a = a`.  

## Generator
Generator 函数
- 是一个状态机，封装了多个内部状态。
- 会返回一个generator对象（不是遍历器对象），(至少包含`next`属性，可以包含`throw`/`return`属性的对象)。从定义角度认为generator对象包括iterartor对象。
- `function`关键字与函数名之间有一个星号`*`.
- 调用`next()`时执行到下一个`yield`。当调用`throw()`时，把`done`的属性值改为`true`，遍历结束。当调用`return(v)`时，把`value`的属性值为`v`，`done`的属性值改为`true`，遍历结束。
- 函数体内部使用`yield`表达式，定义不同的内部状态。`generator`方法和`yield`可互相嵌套。
每个`yield`都定义一个状态。yield后面的值是该状态的值。
- 是分段执行的，yield表达式是暂停执行的标记，而`next()`可以恢复执行。
- 可以用于定义iterator接口。

```js
// 开关机
function * helloWorldGenerator() {
    let t = true
    while (true) {
        yield t = !t
    }
}
var hw = helloWorldGenerator();
console.log(hw.next()) // 多执行几次

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
function getFibArr (num = 10) {
    return Array.from(getFibonacci(num))
}
// 平化数组
function * faltmizeArr(arr, isDeepFirst = true) {
    if (isDeepFirst) {
        for(let ele of arr) {
            if (Array.isArray(ele)) {
                yield * faltmizeArr(ele)
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
            yield * faltmizeArr(s, isDeepFirst)
        }
    }
}
```
### Generator#return
### Generator#throw
generator方法的实例可执行`throw()`。然后在generator方法中catch一次错误，若再执行实例的`throw()`，则generator方法不catch，则实例所在环境catch.

### 协程
"协程"（coroutine），意思是多个线程互相协作，完成异步任务。过程如下：

1. 协程A开始执行。
2. 协程A执行到一半，进入暂停，执行权转移到协程B。
3. （一段时间后）协程B交还执行权。
4. 协程A恢复执行。

### co模块
详见[co](/confuse/co.html)

整个过程和`web worker`的工作过程很像。

### 流式处理
### co源码

## async & await
是es7的内容。
基于`co`模块处理的。
`async/await`是`generator/yield`的语法糖，本质是`generator/yield/co`。
`generator/yield/co`的具有的功能在`async/await`中都有。

### async原理
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

# decorator
- 可以用于装饰类、类的属性。不可用于装饰方法。因为方法会被变量提升。类、类的属性不会提升。
- 当前仍再更新。
- 装饰器是一个方法。参数有3个target:被装饰的对象（类或类的方法），name:被装饰的属性名，descriptor:属性描述符对象。
- 需要增强已有功能时使用。如本地验证用户登录后再执行某项功能。  
- 有点像高阶函数、代理。  
- 编译时运行。  

```js
// no.1
function testable(target) {
    // target.isTestable = true
    target.prototype.isTestable = true
}
@testable
class C {...}
let o = new C() // 使用被装饰过的类
// no.2
function readonly (target, name, description) {
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

& and 与   判断2个二进制数每个对应的位上是否都为1,则该位为1  
| or  或   判断2个二进制数每个对应的位上是否至少有一位为1,则该位为1  
^ xor 异或 判断2个二进制数每个对应的位上是否只有一位为1,则该位为1  
                   对应位上是否不同。若是则为1，否则为0。  
~ not 取反 每一位都取反  
`>>` 右移 （no.1） 右边移出的去掉。左边以最左则的值填充。  
`<<` 左移（0）当移动位数大于32时。使用x%32。 左边溢出的去掉。右边使用0补齐。  
`>>>` 无符号右移（0） 右边移出的去掉。左边以0填充。  

`<<=`
`>>=`
`>>>=`
`&=`
`^=`
`|=`

demo
|判断奇偶| `x&1`|
|左移一位| <=> *2| 右移一位| /2|
0与任意数^ 结果是任意数。任意与自身异或都是0  
|右移一位| 得到整数部分|
|~~| 得到number型(得到整数部分,包括符号.)|

/**
 * 是否为奇数
 */
let isOdd = n => !!(n & 1)
/**
 * 位运算，是否为偶数
 */
let isEven = n => !isOdd(n)
/**
 * 乘以2^n
 * n 底
 * m 2的幂
 */
let multipleTwo = (n, m) => {
  return n << m
}

# [worker](/language/javascript/webWorker.html)
# 线程
js是单线程语言。但是它的宿主环境——browser支持多线程。
当遇到大量计算时可以使用`web worker`处理。主`worker`创建一个子`worker`，再让子worker处理大量计算，主worker会交出数据的控制权给子worker。得到计算结果后把由子workern以消息`message`的形式给主worker。

## 协程

# [xhr](/language/javascript/xhr.html)

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
dom.cloneNode(bool/*是否复制其子节点*/)
// 替换
dom.replaceChild(newDom, oldDom)
// class
dom.classList.remove(s)
dom.classList.add(s)
dom.classList.contain(s)
dom.classList.toggle(s) // 若存在则删除，否不存在则添加。
```

# window中常用的对象
- [URL](/language/javascript/url.html)  
- [file](/language/javascript/file.html)  
- [file](/language/javascript/file.html)  
- [file](/language/javascript/file.html)  
- [file](/language/javascript/file.html)  
- [file](/language/javascript/file.html)  

# BOM & js
- BOM Broser Object Model 浏览器对象模型
  - window
    - DOM (document object model) 文档对象
      + ...
    - frames
    - navigator 各浏览器多有差异
    - [history](/browser/history.html)
    - location
    - screen
  - xxx
  - xxx
  - xxx

- js本地对象
  + [Object](/language/javascript/object.html)
  + [String](/language/javascript/string.html)
  + [Array](/language/javascript/array.html)
  + [Date](/language/javascript/date.html)
  + [Number](/language/javascript/number.html)
  + [RegExp](/regexp/index.html)
  + Function
  + Boolean
  + Error
  + [symbol](/language/javascript/symbol.html)
  + null
  + [undefined](/language/javascript/undefined.html)
  + [bigint](/language/javascript/bigint.html)
  + [set](/language/javascript/set.html)
  + [map](/language/javascript/map.html)
- js内置对象
    + [Math](/language/javascript/math.html)
    + [JSON](/language/javascript/json.html)
- js宿主对象
    + BOM
      + [fetch](/language/javascript/fetch.html)
    + DOM

# [模块化](/language/javascript/modularity.html)
|-|全称|代表|加载方式||||  
|-|-||-|-|-|-|  
|commonjs (cjs)||nodejs|同步加载||||  
|amd|asynchronous module definition|require.js|异步加载||||  
|cmd|common module definition|sea.js|||||  
|umd|universion module definition||||||  
|es6|-|在js语言层面上实现了模块化。|||||  
|iife||||||  
|system||||||    
















