# javascript
- (缩写：JS)是一门完备的 动态编程语言。当应用于 HTML 文档时，可为网站提供动态交互特性。由布兰登·艾克（ Brendan Eich，Mozilla 项目、Mozilla 基金会和 Mozilla 公司的联合创始人）发明。
- 它是一个面向对象的语言。它比java中的对象更纯粹。js在es5后的有`class`，也不能说js中有了类。`class`的本质还是对象（`Object`）。
- 没有继承，有引用。因为没有类，所以没有继承。引用是通过原型链实现引用。

# 名词说明
**动态编程语言**
是指可在运行阶段时执行那些在编译阶段执行的操作的编程语言。比如，在 JavaScript 中， 我们可以在程序运行时改变变量的类型，或者为一个对象增加一个新属性或者方法。
**对象的属性**
对象是复杂数据类型（亦称：引用数据类型）。对象的每个key对应的值可以是简单数据类型也可以是复杂数据类型。作者把每个key对应的值都称为属性，不论是简单数据类型还是复杂数据类型。

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

# 事件
# 原型链
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

# class
本质是构造函数的语法糖。
不能变量提升，遵守是块级作用域规则。
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
静态方法的本质是定义在构造方法上的方法。所以有人理解为不使用实例化就能使用的方法。也有人理解为不能在实例上使用，只能在类上使用的方法。
如果把静态方法的本质写出来，则如下：
```
function ClassName () {...}
ClassName.staticFn () {...}
```
为什么可以这样写？
`funtion`的原型链上游中有`Object`对象。该对象支持设置属性。静态方法就是为一个是funtion的对象设置了一个属性，该属性值是一个方法。

# proxy & reflect
```
var proxy = new Proxy(target, handler)
target: Object,
handler: 控制对象。
    {
        get(target, propKey, receiver) // receiver 读操作所在的对象
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
reflect
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
demo for 观察者模式
```
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
```

# 宏任务 & 微任务
宏任务
setTimeout

微任务
promise


# eventLoop (异步 & 同步)
## generator
<!-- ## iterator & for...of -->
## async & await

# decorator

# 位运算
# title
# title
















