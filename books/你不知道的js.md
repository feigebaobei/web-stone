# 作用域是什么

js语言的本质是编译型语言。
js代码在执行前编译。

## 编译原理
1. 记法分析
2. 语法分析。用到编译器。
3. 代码生成

```
            变量声明
编译器 -------------------> 作用域
  |
  |
  |
  V          找变量
引擎----------------------->

            返回变量
    <----------------------
```
LHS左侧查询 变量出现在赋值操作的左侧
RHS右侧查询 变量出现在赋值操作的右侧 更准确的是非左侧
根据作用域链特点。若当前作用域中没有该变量会在其上层查询。直到找到或在全局作用域中找不到。
若在非严格模式下。会创建一个并返回一个全局变量，
否则不会创建一个并返回一个全局变量，报ReferenceError错误。
先做作用域查询，再做类型操作。

# 词法作用域

代码定义时产生的作用域。
查询作用域是会从内向外一层一层地查询。中间作用域的变量被屏蔽了，则无法得到。
访问全局变量：`window.key`

## 欺骗词法作用域（eval/with）
eval在非严格模式下。可以接受一个string。在运行时插入到该作用域中。
eval在严格模式下，有独立的作用域。
with已经不被推荐使用。
with常用于简化访问同一个对象下的多个属性。
```
var o = {a, b, c}
with(o) {
  a = 3
  b = 3
  c = 3
}
```
eval、with 运行都较慢。
  无法判断标识符的位置，无法编译优化。

# 函数作用域与块作用域

js是有函数作用域、块级作用域、局部作用域(全局作用域是最大的局部作用域)。
## 函数作用域
就是用函数包裹一段代码。
可以认为是函数包裹了代码。也可以认为是代码放在了函数内。
这种方式可以实现内部与外部“隔离”。
然后就实现了最小权限原则、规避冲突、创建命名空间等。

```
// 函数声明
function f() {...}
// 函数表达式
var f = function () {...}
```
匿名函数的缺点：
1. 调试困难。
2. 调用自己时需要使用已经过期的方法`argument.callee`
3. 可读性较差。

## 立即执行函数

```
(function () {...})()
// or
(function () {...}())
```
第二个()里的数据会做为function的参数。有时会传递window/document/undefind/另一个方法。

## 块作用域

let、const、with、try/watch
使用块作用域可以让浏览器的垃圾回收器更好分辨哪些空间需要被回收。
（没有块作用域前浏览器怎么回收垃圾。）

# 提升

1. 先编译，再执行。
2. 先声明，再赋值。
3. 函数声明优先变量声明。
4. 一个普通块内部的函数声明会被提升到所在作用域的顶部。
5. 可以覆盖。

# 作用域闭包

函数可以记住并访问所有的词法作用域。当函数在词法作用域外执行时，就产生了闭包。

用途：
1. 返回函数。
2. 回调函数。
3. iife

iife会通过声明并立即执行一个函数来创建作用域。

```
for (var i = 0; i < 5 i++) {
  (function () {
    var j = i;
    setTimeout(() => {...}, 0)
  })()
}
for (var i = 0; i < 5 i++) {
  (function (j) {
    setTimeout(() => {...}, 0)
  })(i)
}
```

模块：返回一个字面量对象的方法。
```
let myModule = function () {
  return {
    a: function () {...},
    b: function () {...},
  }
}
```
模块机制
```
// define module
// name name of module
// deps impl function 需要的params
// impl 定义模块内容的方法。
var MyModules = (function () {
  var modules = {}
  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i]=modules[deps[i]]
    }
    modules[name] = impl.apply(impl, deps)
  }
  function get(name) {
    return modules[name]
  }
  return {
    define: define,
    get: get
  }
  })()
```
import & export
import可以将一个模块中的一个、多个api导入到当前作用域中。

# 附录A: 动态作用域

动态作用域：运行时作用域。
与其相对的是词法作用域。
只关心在何处调用。作用域链是基于调用栈的。
它不好理解的原因是：平时写代码多以词法作用域的思维思考。若以运行时的思维思考则会很好理解。
```
// demo
var a = 2
function foo () {
  console.log(a)
}
function bar () {
  var a = 3
  foo()
}
bar() // 3 因为foo有执行时执行了RHS。在调用栈中先查询到了a = 3（在bar的词法作用域中）。
```
# 附录B: 块作用域的方案

在es3时出来了try/catch。它是块级作用域。
google开发了traceur，它可以把es6代码办的为es5代码。它在对待let时是使用try/catch的。
```
try {
  throw 2
} catch(a) {
  console.log(a) // 2
}
```

# 附录C: this词法

当在代码中使用this时会出现，指向不好确定的问题，或者需要很在力气才能搞清的问题。
对于以上问题可以使用箭头函数缓解。
```
let o = {
  count: 0,
  cool: function () {
    if (this.count < 1) {
      setTimeout(() => {
        console.log(this.count++)
      }, 100)
    }
  }
}
// or use bind
let o = {
  count: 0,
  cool: function () {
    if (this.cound < 1) {
      setTimout(function () {
        console.log(this.count++)
      }.bind(this), 100)
    }
  }
}
```

# 附录D: 致谢

# 关于this

this是指向当前方法（非箭头函数）所在的运行时上下文。
使用this可以方便函数在改变上下文时使用。提高了函数的普适性。
this不是指向词法作用域的。

# this全面解析

调用栈决定this的指向。
因箭头函数没有自己的this，所以以下内容不作用于箭头函数。

## 4种绑定this的规则：

优先级：
显式绑定>new绑定>隐式绑定>默认绑定

### 默认绑定

严格模式下不能把要全局对象用于默认绑定。
默认绑定时this就是当前函数调用栈的this.
是否是严格模式，由当前函数体是否使用严格模式决定。

|模式|this指向|是否受影响|
|-|-|-|
|严格模式|undefined|不受影响|
|非严格模式|全局对象|受影响|

### 隐式绑定

|隐式绑定|默认绑定|
|-|-|
|this指向调用位置的this.|this指向全局对象|

```
var bar = obj.foo
obj.foo() // 隐式绑定
foo() // 默认绑定
```

### 显式绑定

#### 硬绑定

apply/bind/call

#### 上下文

常出现在函数式编程中。
```
// demo
[1, 2].forEach(fn, self)
```

### new绑定

1. 创建一个全新的对象。
2. 这个新对象会被执行[[Prototype]]连接。
3. 函数体中的this指向新对象。
4. 若没有返回其他对象，则返回这个新对象。

先创建新对象，再返回新对象。

### bind

```
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      throw new Error('..')
    }
    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis ? this : oThis), aArgs.concat(Array.prototype.slice.call(arguments))
        }
    fNOP.prototype = this.prototype
    fBound.prototype = new fNOP
    return fBound
  }
}
```

bind是柯里化的一种体现。

## 被忽略的this

当在apply/bind/call中把this设置为undefined/null时，会使用默认绑定。
其缺点是把this指向全局对象。当在严格模式下要全局对象是undefined。更安全的方法是使用要DMZ(demilitarized zone，非军事区)。
`fn.apply(Object.create(null), [p0, p1, ...])`

## 软绑定

因硬绑定后无法再使用隐式绑定、显式绑定。所以创建了软绑定。

```
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function (obj) {
    var fn = this
    var curried = Array.prototype.slice.call(arguments, 1)
    var bound = function () {
      return fn.apply((!this || this === (window || global)) ? obj : this, curried.concat.apply(curried, arguments))
    }
    bound.prototype = Object.create(fn.prototype)
    return bound
  }
}
```

# 对象

js中有很多对象是基于object扩展出来的。
常见对象：

- String
Number
Boolean
Object
Funtion
Array
Date
RegExp
Error
...

## 内容

对象的key都是字符串。
若使用`[..]`方式，则可以接受任意UTF-8/Unicode字符串。
`[]`里可以使用表达式计算出字符串后再使用计算出的字符串为key.
对象里的方法是不属于对象的。只是对象的特定属性指向特定的方法。
数组也是一种对象。当为数组添加key时，数组的length属性不变。
Object.assign()是浅复制。

js中使用二进制的前三位判断类型。object的前三位是0，null全是0.所以`typeof(null) // object`

属性描述符
```
Object.defineProperty(obj, key, {
  value: '',             // 值
  writable: true,        // 是否可修改
  configurable: true,    // 是否可配置。（即：是否可修改属性描述符。）
  enumerable: true       // 是否可枚举
})
```
把configurable设置为false是单向的。一旦为false后不可再修改。
configurable:false时，可把writable由true设置为false，不可由false设置为true.

## 不可变性

- writable: false
- Object.preventExtensions(obj) // 不可添加新属性。
- Object.seal(obj)              // 等价于Object.preventExtensions(obj) + 每个属性的configurable: false
- Object.freeze(obj)            // 等价于Object.seal(obj) + 每个属性的writable:false

## [[get]] & [[put]]

### [[get]]
[[get]]操作的使用方法：obj.key
原理：从当前对象到其在原型链上依次寻找key。若存在则返回其值，否则返回undefined.
如何判断当其值是undefined还是不存在其key
```
// 当前对象上是否存在指定key.
function reallyExist (o, k) {
  // in 判断key是否存在于当前对象其原型链上。
  // o.hasOwnProperty(k) 当前对象o上是否存在k。
  return {
    current: o.hasOwnProperty(k),
    propotype: (k in o)
  }
}
```

### [[put]]
使用方法：obj.key = value
原理：
1. 是否存在访问描述符。若存在则使用setter。否则不使用。
2. 是否可写。若否，则静默失败。否则把obj.key设置为value.

## getter & setter

访问描述符（存取描述符）与数据描述符（属性描述符）相对。

|访问描述符|数据描述符|||
|-|-|-|-|
|set get configurable enumerable|value writable configurable enumerable|||

```
let o = {
  _a_: null,
  get k () {return _a_},
  set k (v) {this._a_ = v},
  configurable: true,
  enumerable: true
}

Object.defineProperty(o, key, {
  get: function () {return this._a_},
  set: function (v) {this._a_ = v},
  configurable: function () {return true},
  enumerable: function () {return true},
  })
```

## 遍历

对象没有Iterator接口。
```
// 为对象o添加Iterator接口
function createIterator (o) {
  Object.defineProperty(o, Symbol.iterator, {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function () {
      let o = this,
          i = 0,
          ks = Object.keys(o) // Object.keys(o)返回的key的顺序是字面量+增加、删除的key的顺序。
      return {
        next: function () {
          return {
            value: o[ks[i++]],
            done: i > ks.length
          }
        }
      }
    },
  })
}
```

## 静默失败

- 设置writable: false，再修改其值。
- 设置configurable: false，再delete obj.key
- 

## tip

如何判断null的类型？
使用toString()方法。

# 混合对象“类”

可以对数据做什么时类的方法。
子类使用与父类相同的方法名会屏蔽父类中的方法。有时需要利用这个特性，有时需要避免这个特性。
类设计模式：过程化编程、函数式编程。
js中虽有关键字class，但是它不是真正的类。它是构造函数的语法糖。本质还是使用原型链。
多态是子类直接使用父类中的方法，或修改后再使用父类中的方法。
js不能多重继承，ks

## 混入

显式混入
```
// 混合复制
function mixin(s, t) {
  for (let k in s) {
    if (!(k in t)) {
      t[k] = s[k]
    }
  }
}
// 多态
// 在子类中调用父类的方法
super.fn.call(this)
// 寄生继承
function Car () {
  var car = new Vehicle()
  var vefn = car.fn
  car.fn = function () {
    vefn.call(this)
    // modify something
  }
  return car
}
var car = new Car()
car.fn()
```
隐式混入
```
let cool = {
  fn: function () {...}
}
let other = {
  fn: function () {
    cool.fn.call(this)
  }
}
```

# 原型


isPorpotypeOf()

## prototype

设置、屏蔽属性

1. 若原型链上存在指定属性且不为只读，则在当前对象上添加一个指定属性及其值。
2. 若原型链上存在指定属性且为只读，则无法修改该属性。若在严格模式下，则报错。否则静默失败。
3. 若原型链上存在指定属性且为setter，则调用这个setter，然后静默失败设置。

## 类

`new Fn()`/`Object.create()`都可以关联起来2个对象（新对象、原型对象）。构造函数方法可以有副作用，Object.create()不会有副作用，所以推荐使用Object.create()
Object.create(proto, propertiesObject)
// proto            原型对象
// propertiesObject 描述对象
该章强调了js中无继承，只有对象关联（书中常称为委托）。
在new后面的方法都是构造函数。构造函数与函数之间区别。new可以把函数变为构造函数。

判断某对象是否是某原型的实例
```
Fn.prototype.isPrototypeOf(obj) // 推荐
obj instanceof Fn
typeof(param)                       // 不严谨
p.constructor === Fn                // 不可靠
// 原因如下：
constructor属性是不可枚举属性，不是不可变属性。
p.constructor 的本质是 p.__proto__.constructor
若p上没有constructor属性，则会关联到p.__proto__.constructor。
还可以在p上修改或设置constructor属性。Object.defineProperty(p, constructor, {...})
还可以在p的构造函数的原型对象上修改或设置constructor属性。Object.defineProperty(Fn.prototype, constructor, {...})
```
```
var a = 2
// 2
var b = new Number(3)
// Number {3}
Number.prototype.isPrototypeOf(a) // false
Number.prototype.isPrototypeOf(b) // true
```
Object.getPrototypeOf(p)
Object.setPrototypeOf(self, o) // 为
`__proto__`的大致过程
```
Object.defineProperty(Object.Prototype, '__proto__', {
  set: function (v) {
    Object.setPrototypeOf(this, v)
  },
  get: function () {
    return Object.getPrototypeOf(this)
  }
})
```
`__proto__`被叫做“笨蛋proto”
原型上的方法不是备用的，应用作用“内部委托”来解决该问题。

# 行为委托

这是我学习这本书到现在最有用的一章。它纠正了我对js“继承”的认识。
在上一章中我们明确了：js是使用`prototype`把对象关联起来的（形成原型链）。有了原型就可以使用原型上的属性、方法。
js里本没有继承。我猜因为js中有new关键字，再加上程序员对面向类的语言的理解。所以把js的当成面向类的语言。实质上js是面向对象的语言。
js中new出来的对象是函数处理过的this(新对象)。并给新对象添加`constructor`/`prototype`属性。在对象关联关系中较少使用`constructor`，较多使用`prototype`。
js注重的是对象间的关联关系。没有继承关系。
若干对象关联起来后，之间的关系是委托关系。`Object.create(proto, propertiesObject)`可以创建委托关系。比使用构造函数更符合js的本质，也更简洁创建关系关系（创建原型链）。
原型链下层的元素可以重写、覆盖原型链上层的属性、方法。
js禁止互相委托。
class仍然是使用[[prototype]]机制实现的。

## 比较思维模型

```
// 原型风格
function Foo (who) {this.me = who}
Foo.prototype.identity = function () {return `I am ${this.me}.`}
function Bar (who) {Foo.call(this, who)}
Bar.prototype = Object.create(Foo.prototype)
Bar.prototype.speak = function () {alert(`Hello, ${this.identify()}.`)}
let b1 = new Bar('b1')
let b2 = new Bar('b2')
b1.speak()
b2.speak()
```

```
// 对象关联风格
let Foo = {
  init: function (who) {this.me = who},
  identify: function () {return `I am ${this.me}`}
}
let Bar = Object.create(Foo)                                  // 把Bar.prototype指向Foo
Bar.speak = function () {alert(`Hello, ${this.identify()}.`)} // 创建Bar特有的方法。
let b1 = Object.create(Bar)
b1.init('b1')
let b2 = Object.create(Bar)
b2.init('b2')
b1.speak()
b2.speak()
```

```
Object.getOwnPropertyDescriptor(o.__proto__, 'constructor')
{
  configurable: true,
  enumerable: false,
  value: ƒ Object(),
  writable: true
}
Object.getOwnPropertyDescriptor(o, '__proto__')
undefined
```
## 内省

在面向类的语言中，通过创建方式来判断对象的结构和功能。`instance instanceof Fn`
在面向对象的语言中，通过[[prototype]]委托互相关联。`Parent.isPrototypeOf(Child)`

# 附录A es6中的class

class是es6时出现的新关键字。它可以使用`extends`继承另一个类。`constructor`中的this指向实例。`super`指向父类。super是静态绑定的，从定义class时就确定了子类与父类的关系。它是`[[prototype]]`的语法糖。
`new Fn()`是面向类的写法。class是对其的优化。但是js是面向对象的。class的本质是使用`[[prototype]]`建立对象间的关联关系。
早期的js既支持了`new`也支持了`prototype`。后来使用者多喜欢使用`new`。所以后来对`new`优化出`class`。虽然方便使用。但是阻碍了程序员理解js的本质。

推荐的代码风格：
1. class.
2. Object.create()
3. new Fn()

# 类型

js中有7种基本类型
1. null
undefined
boolean
number
string
object
symbol

function类型的对象中有一个内部属性`[[call]]`。
```
// 检查null类型
(!u && typeof(u) === 'object') // boolean
```
typof对待undefined、undeclared都返回undefined.这是typeof的一种安全机制。
`undefined`/`is not defined`是两码事。

|undefined|undeclared||
|-|-|-|
|声明了，但没有赋值。|未声明。||

# 值

## 数组

使用delete删除数组内的元素后。arr.length不变。
使用稀疏数组时注意空白部分。取稀疏部分的值会得到undefined。与设置为undefined不同。
若把数组的下标为字符串的下标设置值时，arr.length不变。
若字符串的下标可被转换为十进制数字，则对应的下标会被设置为相应的值。arr.length会自动改变。
```
类数组=>数组
Array.from(arguments)
Array.prototype.slice.call(arguments)
```

## 字符串

字符串不可改变，只会经过处理后返回新的字符串。
```
arr.join      // string
str.split('') // array
```

## 数字

小数点前面的0可省略。
最后部分的0可省略。
这章提到好多Number类型的操作方法。具体的方法、属性请查看`@/language/javascript/number.md`
```
n.toExponential() // 返回科学记数法。
n.toFixed(x)      // 保留x位小数。

Number.MIN_VALUE
Number.MAX_SAFE_INTEGER
Number.MIN_SAFE_INTEGER
Number.isInteger(x)
Math.pow(n, x)           // 求n的x次方。x的绝对值最大为32.
Number.POSITIVE_INFIINTY // Infinity
Number.NEGATIVE_INFIINTY // -Infinity
```
0x/0X 十六进制
0o/0O 八进制
0b/0B 二进制

undefined // 表示没有赋值。
null      // 已经赋值了，但是现在没有值。
undefined是关键字，不要给它赋值。
void运算符是不修改其后面的表达式的结果，只有让表达式不返回值。

NaN
不是数字的数字。可理解为“无效数值”，“失败数值”。
是惟一一个与自身不相等的。
`Number.isNaN(p)`可检查是否是NaN.推荐使用它。
```
// demo
var a = 2 / 'foo' // NaN
a == a            // false
a === a           // false
if (!Number.isNaN) {
  Number.isNaN = function (n) {
    return n !== n
  }
}
Infinity / Infinity // NaN
```

当数学运算超出处理范围时，则就近取整。

零值
有正负。二者===。
```
JSON.stringify(-0) // '0'
JSON.parse('-0')   // -0
Number('-0')       // -0
function isNegZero (n) {
  n = Number(n)
  return (n === 0) && (1 / n === -Infinity)
}
```
Object.is(a, b) // 判断a与b是否绝对相等。
```
if (!Object.is) {
  Object.is = function (a, b) {
    // 判断是否是-0
    if (a === 0 && b === 0) {
      return 1 / a +++ 1 / b
    }
    // 判断是否是NaN
    if (a !== b) {
      return a !== b
    }
    return a === b
  }
}
```
`==`/`===`的效率比`Object.is()`高。

## 值和引用

js中没有指针，有引用。
引用是指向内存中的空间的。
简单值（标量基本类型值，scalar primitive）总是通过值复制的方式来赋值、传递。包括null/undefined/string/number/boolean/symbol.
复合值（compound value）包括对象（数组属于对象）、函数。通过引用复制的方式来赋值、传递。
```
// 清空数组的方法
arr.splice(0, arr.length)
arr.length = 0            //
arr = []                  // 最快。重新赋值一个空数组。旧数组会被垃圾回收。
```
浅复制的本质：创建当前子层的数据、引用。孙子层及以下层的值方式（引用、赋值）不变。

# 原生函数

常用的原生函数

1. String()
Number()
Boolean()
Array()
Object()
Function()
RegExp()
Date()
Error()
Symbol()

string/number/boolean/function/regexp/array/object一般使用常量形式创建。
object/function/regexp万不得已使用封装对象。
Date/Error一般使用封装对象。
symbol不使用new开头。

根据文档约定，String.prototype.key可简写为String#key。别的原型属性同理。

## [[class]]

内部属性[[class]]无法直接访问。可以使用`Object.prototype.toString(p)`查看。
```
Object.prototype.toString.call([1,2,3]) // "[object Array]"
```

## 封装对象

就是被new出来的对象。
一般不推荐直接使用封闭对象。但是偶尔也会派上用场。

## 拆封

使用`valueOf()`可以取封装对象的基本类型值。
```
var n = new Number(12)
n.valueOf() // 12
```

# 强制类型转换

可分为隐式强制类型转换和显式强制类型转换。

## 抽象值操作

### ToString

```
null      => 'null'
undefined => 'undefined'
true      => 'true'
object    调用 Object.prototype.toString()
array     => 各元素使用`,`连接，无法被字符串化的元素返回`null`.
json      => JSON.stringify(jsonObj) // 会忽略undefined/function/symbol
             JSON.stringify()优先调用toJSON()。
             toJSON()应该返回一个安全的json对象，然后再由JSON.stringify()处理为字符串。
             JSON.stringify(jsonObj, arr|fn, space)
String(p) // 把p转换为字符串。
```

### ToNumber

```
true => 1
false => 0
undefined => NaN
null => 0
object   把每项转换为相应的基本类型值。
          ToPrimitive：先检查是否有valueOf()，若存在，则返回该方法的值。若不存在，则使用toString()的值。否则报错（TypeError）。

Number(p)       // 转换为number。当p为0开头的十六进制是按照十进制处理。不许出来非数字字符。
parseInt(p)     // 解析为整数，                                  直到非数字字符。
parseFloat(p)   // 可解析为小数。
parseInt(str, radix) // str 字符串， radix 进率。
```

### ToBoolean

```
// 假值
undefined
null
false
+0/-0/NaN
''

Boolean(p)
!!p
```
非假值就是真值。

## 显式强制类型转换

### string => number

```
String(p)
// date => number
if (!Date.now) {
  Date.now = function () {
    return +new Date()
  }
}
~              1. ToNumber 2. ToInt32
              先把值转换为32位数字，再按位取非。
-1            一般表示失败。如：indexOf()。
~~p           可取32位数字的整数部分。
Math.floor(p) 取比p小的最大整数。
parseInt(str, r)
parseFloat(str, r)
Boolean(p)
!!p           常用
```
一元运算符可显式转换，但是不要乱用。

## 隐式强制类型转换

```
number => string
p + ''

string => number
p - 0
p * 1
p / 1

boolean => number
function onlyOne () {
  var sum = 0
  for(var i = 0; i < arguments.length; i++) {
    sum += Number(!!arguments[i])
  }
  return sum === 1
}
if() / for() / while() / do..while() / ?: / || &&Z
```
`||`/`&&`应该是“选择器运算符”。
```
a || b    当a为真是返回a.否则返回b.
a && b    当a为真是返回b,否则返回a.
a || b    a只执行一次。
a && b    a只执行一次。
a ? a : b a执行二次。
```

symbol不可以被转换为数字，可被转换为boolean，结果总是true.

## 宽松相等和严格相等

`==`允许在相等比较中进行强制类型转换，而`===`不允许。
```
字符串与数字之间的相等比较
1. 转换为数字。 2. 比较。
其他类型与boolean之间的比较。
1. 转换为数字。 2. 比较。
null/undefined之间的相等比较。
null undefined 在==时相等。
对象与非对象之间的相等比较
1. 执行ToPrimitive 2. 比较。
```

不要修改内置原型。
[] == ![] // true
若两边有true/false时，不要使用==.
若两边的值中有`[]` `''` `0`时，尽量不要使用==.
比较双方首先调用ToPrimitive，如果出现非字符串，就根据ToNumber规则将双方强制类型转换为数字后进行比较。
`<=`是不大于的意思。
相等有严格相等，比较没有严格比较。

# 语法

grammer
语句statement和表达式expression不是同一件事。
表达式可以返回一个结果。
do{..}是一个表达式，可返回最后一行的结果。
b = (a++, a) // 返回自加后的a.
json是js语法的一个子集，但是json本身不是合法的js语法。
优先级: `&&` > `||` > `?:`
左关联 || &&
右关联 ?: =
asi automatic semicolon insertion 自动分号插入
优点：1. 可省略不必要的代码。让代码更简洁。
     2. 让许多`;`可有可无，因此只要让代码没问题，有没有`;`都一样。
缺点：1. 自动插入`;`会改变代码的逻辑。
     2. 有人认为省略`;`是错误的。用linter来处理错误。
do..while后必须带`;`
linter是纠错机制。不应该让js引擎处理错误代码。
tdz temporal dead zone 暂时性死区。

## try..finally
try执行完后（不管是否return）都会执行finally。等finnaly执行完后再返回结果。

## switch
case后可以是表达式。需要`===`为真。严格为true时返回执行相应case.
```
switch (a) {
  case !!(a || b == 0):
    break
  default:
    break
}
```

# 附录A 混合环境JavaScript

js程序几乎总是在宿主环境中运行的。
javascript语言的官方名称是ECMAScript
运行环境：浏览器、node.js、rhino
  浏览器一般使用v8引擎（使用c++写的）。
  rhino是一个js引擎。与v8引擎竞争市场。
  v8运行速度比rhino快很多。
js有很多条件被宿主对象限制。
宿主对象的方法：console/
宿主对象的行为差异：
1. 无法访问正常的object内建方法。如toString()
无法写覆盖
包含一些预定义的只读属性。
包含无法将this重载为其他对象的方法。

在创建带有id属性的dom元素时会创建同名的全局变量。
不要扩展原生原型。
在扩展原生方法时需要加入判断条件。
es5-shim / es6-shim / traceur
要么不做，要么100%符合规范。
多个`<script>`共享globle对象（在浏览器中则是window）。也就是说这些代码在共享的命名空间中运行，并相互交互。
在es5前，保留字不能用于对象常量中的属性名称或键值。

限制
1. 字符串常量中允许的最大字符数。
可作为参数传递到函数中的数据大小。
函数声明中的参数个数。
未经优化的调用栈的最大层数。
js程序以阻塞方式在浏览器中运行的最长时间
变量名的最大长度。

# 异步：现在与将来

现在运行的部分与将来运行的部分之间的关系是异步编程的核心。常用回调函数解决。
js从不跨线程共享数据。
竞态条件。
大数据量是常用方法
```
// 少阻塞
let res = []
let fn = function (data) {
  let chunk = data.splice(0, 1000)
  res = res.concat(chunk.map((v) => v * 2))
  if (data.length > 0) {
    setTimeout(() => fn(data), 0)
  }
}
ajax('url', fn)
```

# 回调

回调是编写和处理js程序异步逻辑的最常用方式。
控制反转会把控制权交给别的的方法（有可能是第三方的方法）。会使信任链完全断裂。
分离回调（把成功、失败的调用方法分别写在2个方法中）。如`ajax`的`success``failure`
```
ajax('url', success: sfn, failure: ffn)
promise.then().catch()
```
回调需要注意“重复回调”。
永远要异步。

# promise

||||
|-|-|-|
|回调|通知任务调用回调||
|promise|监听事件，当得到通知后，执行相应的方法。||
promise反控制反转。
关注点分离。then处理成功时，catch处理失败时。
new Promise的参数会立即执行。

```
// 判断是否是promise对象。
function isPromise (p) {
  if (p !== null && (typeof(p) === 'object' || typeof() === 'function') && typeof(p.then) === 'function') {
    return true
  } else {
    return false
  }
}
原因：
1. 可能是嵌套窗口、iframe中的promise实例。造成当前窗口无法识别。
2. 某些库中自定义的Promise对象。浏览器使用es6 promise判断可能会出错。
```

promise可以解决：
- 调用回调过早             // 当promise的状态改变时触发回调。
- 调用回调过晚
- 调用回调次数过多、过少。
- 未能传递所需的环境、参数。
- 吞掉可能出现的错误、异常。

流式调用，不仅表达多个异步序列的流程控制，还是一个从一个步骤到另一个步骤的消息通道。

以前的项目要使用“error-first回调”，现在我认为使用“split-callback”更好（分离回调）。

```
// 利用promise的状态只能改变一次的特点。实现按钮只能点击一次的功能。
var p = new Promise((s) => {
  clickFn('#id', s)
})
p.then((e) => {
  var id = e.target.id
  return reqFn('url' + queryString)
}).then((data) => {...})
// 这种处理方法破坏了“关注点分离”的思想。
```

```
// promise的变体
if (!Promise.first) {
  Promise.first = (ps) => {
    return new Promise((s) => {
      let num = 0
      let len = ps.length
      ps.forEach((p) => {
        Promise.resolve(p).then(s()).catch(() => {
          num++
          if (num === len) {Promise.reject('all promise not resolve')}
        })
      })
    })
  }
}
if (!Promise.last) {
  Promise.last = (ps) => {
    return new Promise((s, j) => {
      let num = 0;
      let len = ps.length
      ps.forEach((p) => {
        Promise.resolve(p).then(res => {
          num++
          if (num === len - 1) {
            s(res)
          }
        }).catch(err => {
          num++
          if (num === len - 1) {
            j(err)
          }
        })
      })
    })
  }
}
// Promise.none
if (!Promise.none) {
  Promise.none = (ps) => {
    return new Promise()
  }
}
// Promise.any
if (!Promise.any) {
  Promise.any = (ps) => {
    return new Promise((s, j) => {
      let num = 0;
      let len = ps.length;
      ps.forEach(p => {
        Promise.resolve(p).then(res => {
          s(res)
        }).catch(err => {
          num++;
          if (num === len) {
            j('all error')
          }
        })
      })
    })
  }
}
// Promise.every
if (!Promise.every) {
  Promise.every = (ps) => {
    return Promise.all(ps).then(() => {Promise.resolve(true)}).catch(() => {Promise.resolve(false)})
  }
}
```

# 生成器

## Generator

它是一个状态机，其内部使用yield定义多个状态。可以中断后再次执行。它返回一个iterator对象。
`function * fn () {...}`
`yield`只能在generator方法内。
同一个generator方法生成的不同iterator对象互相不影响。
多个generator方法之间可以交互。
使用与普通函数一样。
it.return([p])后结束生成器。
`yield`可以理解为‘生成一种状态’。
`yield *`是生成器委托。作用就是的把生成器嵌套起来。

## Iterator

它有next()方法。
使用it.next(p)可以与generator方法交互数据。把p设置为上一个yield的值，并向下执行。
第一个it.next()不能有参数。有参数也不启作用。
it.next()的返回值是`{value: ..., done: boolean}`

# 程序性能

两种交互建模：
1. 顺序
2. 并发（伪）

## web worker

在ui线程外开辟一个新的线程。
父子worker之间使用消息通信。
父子worker之间一一对应。
有共享worker也有专用worker。
```
// api
// 主线程
var worker = new Worker('url/file.js')
worker.addEventListener('message', function (event) {...})
worker.postMessage('string')
worker.terminal()
// 子线程
addEventListener('message', function (event) {...})
postMessage('string')
```

使用场景
1. 处理密集型计算
大数据集排序
数据处理（压缩、音频分析、图像处理……）
高流量网络通信。

## transferable

像Unit8Array就是transferable.
数据使用权转移。

## SIMD
单指令多数据

## asm.js
通常使用别的工具编译。
影响性能的最大因素：内存分配、垃圾收集、作用域访问。
该方法不适用于全部情况，一般用于特定任务，如数学运算（如游戏中的图形处理）

# 性能与调优

整体的框架性能大于局部性能。
benchmark.js是测试js代码性能的库。请不要独自写测试性能的代码。因为很可能写的不对、不严谨。请使用大段代码测试。
jsPerf.com是使用bencnmark.js测试代码的网站。
js的运行环境会影响到性能。
引擎运行的代码不一定是程序员写的代码。

引擎优先例子
- 递归 -> 循环
- for ...
- ++/--

代码可读性 > 微性能提升
“非关键路径上的优化是万恶之源” --高德纳
尾调用优化（tail call optimization TCO）

# 附录A asynquence库
# 高级异步模式

这2章中介绍asynquence库的。
https://www.npmjs.com/package/asynquence

# 深入编程
# 深入javascript
# 深入你不知道的javascript

弱类型是js的特点，请利用它。（我反对ts的强类型）
代码兼容性的转换方法：
1. polyfill
2. transpiling
有新特性，请使用新特性。兼容性问题交给工具库。
常用的兼容工具库
1. babel
2. traceur
非js语言（就是宿主上的方法）
1. window
2. alert
3. console
4. ...

请使用“面向对象”的方式理解js的原型链。
使用“行为委托”比“构造函数”更准确理解原型链。
js中不存在“继承”。

回调的缺点：
1. 控制反转（造成信任丢失）
2. 线性理解能力差。
3. 可被多次触发。
promise/generator可很好地解决以上缺点。


# es?现在与未来

this绑定的4条基本原则。
连接到其他对象的对象 objects linked to other objects oloo
异步和性能。
transpiling = transformation + compiling 转换+编译
shim/polyfill是重要的工具，它能帮助程序员处于这个语言发展的最前沿。应该尽量使用最新的语法，并使用工具做兼容处理
void 0 <=> undefined

# 语法

for循环+let会在每次循环中执行一次let声明。
const只使赋值不可变。
spread / rest
...arr => arr // rest
arr => ...arr // spread
暂时性死区（TDZReferenceError）

解构赋值
1. 可重复赋值
2. undefined就是缺失。

```
// 带默认值的对象解构

```
```
// 为对象设置默认值
{
  let {
    options: {
      remove = default.options.remove,
      enable = default.options.enable,
      instance = default.options.instance,
    } = {},
    log: {
      warn: default.log.warn
      error: default.log.error
    } = {}
  } = config
  config = {
    optons: {remove, enable, instance},
    log: {warn, error}
  }
}
```
简洁写法
get修饰方法后，可当做属性使用。

|prototype|__proto__|||
|-|-|-|-|
|构造函数|任意对象|||
|指定原型对象|由继承来的属性组成的对象|||
|向外输出|用于接收|||

Object.setPrototypeOf(obj, proto)
Object.getOwnPropertySymbols(o) // 得到当前对象的符号属性对应的值。
String.raw(p) // 得到字符串的原始版本
String.fromCharCode()
String.fromCodePoint()
instance instanceof proto
Symbol.for(p) // 在全局符号注册中搜索
Symbol.keyFor(p) // 得到symbol的描述文本。
一般内置属性、方法使用`@@`开头。

for...of => array
for...in => object

正则表达式flags
'gimuy'

```
// 计算字符串长度
var str = '§'
[...arr].length        // 1
Array.from(str).length // 1
```

# 代码组织

迭代器是一种有序的、连续的、基于拉取的用于消耗数据的组织方式。
可迭代对象有iterator接口（Symbol.Iterator）。该接口对应一个generator方法。该方法会返回一个iterator对象。该对象执行next()方法后（也可执行return()/throw()）返回一个iteratorResult对象。该对象的结构是`{value: any, down: boolean}`

```
let tasks = {
  [Symbol.iterator]() {
    return {
      [Symbol.iterator]() {return this},
      next(v) {...},
      return (v) {...}
    }
  }
}
```

generator
一般用于：产生一系列数据，顺序执行的任务队列。
```
// 无限生成随机数
function *foo () {
  while (true) {
    yield Math.random()
  }
}
```
generator函数可当做普通函数执行。

模块
esm
1. 基于文件的模块
2. api是静态的。
3. 模块是单例
4. 公开的api会指向模块内的数据。
5. 加载功能与宿主环境有关。
6. 不能实现条件编译。
7. 一个默认导出，多个命名导出。
8. 默认导出，可在模块内修改需要导出的值。
9. 命名导出后，不能在模块内修改需要导出的值。
10. 虽然循环依赖不会出错，但是不是使用循环依赖。

类
构造函数+原型对象。
super在构造函数中指向父构造器。
super在原型对象中指向父构造器的原型对象。
new.target指向直接构造器。
使用static声明后的方法会放在构造器上，不放在构造器的原型对象上。
Symbol.species用于指定构造器。
```
class MyCoolArray extends Array {
  static get [Symbol.species]() {return Array}
}
```

# 异步流控制

Promsie.resolve()可用于规范异步。
thenable 是 类promise对象。不是promise对象。
当Promise.all()的参数是[]时，永远不会决议。

generator + promise
```
function *main () {
  let res = yield p0()
  try {
    res = yield p1(res)
  } catch (e) {
    res = yield p2(e)
  }
  res = yield Promise.all([
    p3(res),
    p4(res),
    p5(res)
  ])
  yield p5(res)
}
function run(gen, ...rest) {
  let it = gen.apply(this, rest)
  return Promise.resolve().then(function nextHandler (v) {
    let next = it.next(v)
    return (function resultHandler (next) {
      if (next.done) {
        return next.value
      } else {
        return Promise.resolve(next.value).then(nextHandler).catch(e => Promise.resolve(it.throw(e)).then(resultHandler))
      }
    })(next)
  })
}
run(main).then(...).catch(...)
```

# 集合

所谓小端模式（Little-endian）, 是指数据的高字节保存在内存的高地址中,而数据的低字节保存在内在的低地址中,这种存储模式将地址的高低和数据位 权有效结合起来,高地址部分权值高,低地址部分权值低,和我们的逻辑方法一致;
1字节=8bit
浏览器一般为小端。
```
var buf = new ArrayBuffer(32)
buf.byteLength                  // 32
```

# 新增API

# 元编程

对程序的编程的编程。
元属性以属性的方式提供一些其他方法无法获取的元信息。
new.target总是指向直接调用new的目标构造器。

## 尾递归（Tail Call Optimization, TCO）

常处理为高阶函数、在参数中求值。

# es6之后

async = generator + runner
Object.observe(..)
SIMD Single Instruction Multiple Data
WASM webassembly

# 严格模式与非严格模式的本质异同
# 错误类型
TypeError
ReferenceError
  xx is not declared




