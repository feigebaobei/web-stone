# javascript patterns

作者 stoyan stefanow
译者 陈新

# no.1 简介

js 是一门动态性较强的语言，面向对象的语言。
模式是指一个通用问题的解决方案。
对象有 2 类：

- 原生的
- 宿主环境的 + console
  jslint: 检测 js 代码质量的工具

# no.2 基本技巧

易维护的代码：

- 阅读性好
- 具有一致性
- 预见性好
- 如一人写成
- 有文档
  少用全局变量
- 使用 var 创建的全局变量不能被删除
- 未使用 var 创建的全局变量能被删除
  不要修改内置原型
  避免使用隐式类型转换
  避免使用 eval
  大写构造函数首字母
  编写 api 文档

```
/*
* @tag value {type} description
* @namespace
* @class
* @method
* @param
* @return
*/
```

正式发布是精简代码

# no.3 字面量和构造函数

优先使用字面量方式定义。
`new`与构造函数结合使用时的返回值：
|返回 this|返回非 this 的对象|other|
|-|-|-|
|返回 this|返回该对象|返回 this|
严格模式中，this 指向 undefined  
自调用构造函数：

```
function Fn(arg) {
	if (!(this instanceof Fn)) {
		return new Fn(arg)
	}
	this.a = 'str'
}
```

改变了实例的`instanceof`属性，无法改变实例与构造函数的关系。

# no.4 函数

可以提供作用域。
惰性函数定义：

```
var fn = function () {
	// other code
	fa = function () {...}
}
```

- 被重新定义后原函数上的原型对象被丢失。
  即时函数（立即执行函数/自调用函数/自执行函数）iife  
  备忘模式：

```
var a, b;
(function (a, b) {...})(a, b)
```

```
// defind
function fnCurry (caption) {
	let fn = function (...a) {
		let k = a.map(e => e.toString()).join(',')
		let ele = fn.cache.find(e => {
			return e.key === k
		})
		let result
		if (ele) {
			result = ele.value
			return result
		}
		}
		// 经过计算
		result = {...}
		if (fn.cache.length >= caption) {
			fn.cache.pop()
			fn.cache.push({
				key: k,
				value: result
			})
		}
		return result
	}
	fn.cache = [
		\\ {key, value}
	]
	return fn
}
// usage
let fn = fnCurry(5)
fn(p, q)
fn(p, q)
fn(p, q)
```

配置对象模式：

- 可使用参数变整洁。
- 不用记过多参数/顺序
- 可忽略可选参数
- 易于阅读/维护
- 易于添加/删除参数
- 需要记住参数名称
- 无法压缩属性名称
  curry:
  由“调用函数”改为“应用函数”。

```
fn(p) // 调用函数
fn.call(obj, p) // 应用函数
```

- 柯理化是一个转换过程。
- 有大多数参数相同时，可使用 curry 化。
  回调模式

# no.5 对象创建模式

命名空间模式：

```
var myapp = myapp || {}
myapp.namespace = function (path) {
	let parts = path.split('.')
	if (parts[0] === 'myapp') {
		parts.pop()
	}
	let parent = myapp
	for (let i = 0; i <parts.length; i++) {
		if (typeof parent[parts[i]] === 'undefined') {
			parent[parts[i]] = {}
		}
		parent = parent[part[i]]
	}
}
```

声明依赖关系

- 明确依赖
- 解析局部变量比解析全局变量快
  闭包：

```
function f () {
	let a = 'str' // 无法被外部直接访问
	let b = () => {...}
	return b
}
```

特权方法：可以访问私有属性的方法
私有性失效：当特权方法返回私有的对象时。返回的是该对象的引用。若在闭包外修改该对象，则闭包内也会受动影响。

```
// 接上段代码
f.prototype = (function () {
	// other code
	return {
		a: a,
		b: b,
	}
})()
// 闭包与原型对象结合使用，可使用所有实例拥有该功能。
```

揭示模式

```
(function () {
	function a () {...}
	function b () {...}
	return {
		a,
		b,
	}
}())
```

模块模式
提供了一种创建自包含非耦合代码片段的有利工具。命名空间+即时函数+私有特权成员+声明依赖
沙箱模式

- 同一个包可实现多个版本的实例
- 解决多个访问长度

```
// defind
function Sandbox(...modules, cb) {
	if (!(this instanceof Sandbox)) { // 当没有使用new操作符时使用new操作符
		return new Sandbox(...modules, cb)
	}
	// 为this添加属性
	this.a = 'a'
	this.b = 'b'
	for (let i = 0; i < modules.length; i++) {
		Sandbox.modules[modules[i]](this) // 使this具有指定module的功能
	}
	cb(this)
}
Sandbox.modules = {}
Sandbox.modules.a = function() {/*实现模块a的功能*/}
Sandbox.modules.b = function() {/*实现模块b的功能*/}
Sandbox.modules.c = function() {/*实现模块c的功能*/}
// usage
let box = {} //
new Sandbox('a', 'b', function (box) {
	// ...
})
```

链模式

- 以创建简短/具有特定功能的函数。

```
// defind
var obj = {
	v: 0
	increment: function () {
		this.v++
		return this
	},
	add: function (p) {
		this.v += p
		return this
	},
	shout: function(p) {
		// empty
	}
}
// usage
obj.increment().add(2).shout
console.log(obj.v)
```

# no.6 代码复用模式

es5 中的方法。  
推荐此方法。因为此方法更遵守 js 语言的原型链（有对象/无类）的实际情况。

```
Object.create(prot: object, attr: object)
```

利用复制实现继承

```
funtion extend(p, c = {}) {
	for (let k in p) {
		if (p.hasOwnProperty(k) {
			c[k] = p[k]
		})
	}
	return c
}
```

深复制

```
function cloneDeep(p, c = {}) {
	for (let k in p) {
		if (p.hasOwnProperty(k)) {
			if (typeof p[k] === 'object') {
				c[k] = Object.prototype.toString.call(p[k]) === '[object Array]' ? [] : {}
				cloneDeep(p[k], c[k])
			} else {
				c[k] = p[k]
			}
		}
	}
	return c
}
```

混入

```
// define
function mixin(...os) {
	let r = {}
	os.forEach(o => {
		Object.entries(o) // [[k0, v0], ...]
		.forEach([k, v] => {
			r[k] = v
		})
	})
	return r
}
// usage
mixin(oa, ob, oc)
```

借用方法

```
// 又希望复用方法，又不想有父子关系
pf.call(self: object, ...args)
pf.apply(self: object, args: any[])
```

绑定方法

```
pf.bind(self: object, ...args): () => function
// 实现
if (typeof Function.prototype.bind === 'undefined') {
	Funciton.prototype.bind = function(self, ...args) {
		return this.apply(self, args)
	}
}
```

## 继承

这种思想是受到`java`等语言的影响。非在 js 语言中使用类。不建议使用此方法。

```
function inherit(c, p) {
	c.prototype = new p()
}
```

借用构造函数

```
function C(...args) {
	P.apply(this, args)
	// 也可以多次借用构造函数
	// P1.apply(this, args)
	// P2.apply(this, args)
}
```

设置原型，共享原型。

```
function inherit(c, p) {
	c.prototype = p.prototype
}
```

临时构造函数

```
function inherit(c, p) {
	let F = function () {}
	F.prototype = p.prototype
	c.prototype = new F()
}
```

存储超类

```
function inherit(c, p) {
	let F = function () {}
	F.prototype = p.prototype
	c.prototype = new F()
	c.uber = c.prototype
}
```

重置构造函数指针

```
let inherit = (funtion () {
	let f = function () {}
	return function (c, p) {
		f.prototype = p.prototype
		c.prototype = new f()
		c.prototype.constructor = c
		c.uber = c.prototype
	}
})()
```

klass  
不推荐

```

```

# no.7 设计模式

## 单例模式

一个特定类只有一个实例。

```
var universe
(function() {
	var instance
	universe = function () {
		if (instance) {
			return instance
		}
		instance = this
		this.a = 'a'
		this.b = 'b'
	}
	})()
```

## 多例模式

```
var inst = new ClassName()
```

## 工厂模式

为了批量创建对象。多见于构造函数。

```
function Point(x, y) {
	this.x = x
	this.y = y
}
var p = new Point(1, 2)
```

## 迭代器模式

常用于链表。  
链表多作为一种数据结构出现。详见[数据基石](https://www.npmjs.com/package/data-footstone)

```
let makeLink = (...args) => {
}
```

```
for...of
filter
find
map
forEach
reduce
reduceRight
```

## 装饰器模式

运行时为目标添加附加功能。

```
@decorator(args)
Class Cn {
	constructor() {...}
	@decoratorF(argsf)
	first() {...}
}

// 函数lan处理
```

## 策略模式

定义关键字与方法的对应关系。运行时选择相应算法。（表单验证）
可看作为 if/else 判断的另一种表现形式，在达到相同目的的同时，极大的减少了代码量以及代码维护成本。
分离算法的使用、算法的实现。

```
// demo0
var realize = {
    first: () => {},
    second: () => {},
    third: () => {}
}
let result = realize[param] ? realize[param]() : null

// demo1
// html
<form>
// js
document.getElementById('submit').on('click', (event) => {
  event.preventDefault()
  var validator = new Validator()
  var result = validator.test({
    'userName': [
      {rule: 'isRequired', value: this.userName.value, message: 'string'},
      ...
    ],
    ...
  })
})

function Validator () {}
Validator.prototype.rules = {
  isRequired: (value) => {
    return value.replace(/(^\s*)|(\s*$)/g, '')
  },
  ...
}
Validator.prototype.test = (rules) => {
  var that = this
  var valid = null
  for (let key in rules) {
    for(let i = 0; i < rules[key].length; i++) {
      let {rule, value, message} = rules[key][i]
      let result = that.rules[rule](value)
      // let result = that.rules[rule].apply(this, value)
      if (!result) {
        valid = {
          errValue: key,
          errMsg: message
        }
        break
      }
    }
    if (valid) {
      break
    }
  }
  return valid
}
```

## 外观模式

统一对外接口

```

```

## 代理模式

## 中介模式

为了促进松耦合。

```
			  |---------|
   -----------|   中介  |----------
   |		  |---------|        |
   A                             B

A.fn() -> 中介.fn() -> B.fn()
```

## 观察者模式

有人说别名是“订阅/发布模式”

```
let publisher = {
	subscribers: {},
	subscribe: (type, fn) => {
		// subscribers[type] = [].push(fn)
	},
	unsubscribe: (type, fn) => {
		// subscribers[type].splice(..)
	},
	publish: (type, self) => {
		// subscribes[type].forEach(fn => fn(self))
	}
}
function makePublisher(o) {
	Object.keys(publisher).forEach(k => {
		o[k] = publisher[k]
	})
}
// use
let p = {...}
let a = makePublisher(p)
let b1 = {...}
let b2 = {...}
a.subscribe('t', b1.f)
a.subscribe('t', b2.f)
a.publish('t')
```

# no.8 DOM 和浏览器模式

## 关注点分离

- 内容 html
- 表现 css
- 行为 js  
  特征检测技术

```
if (document.attachEvent) {
	document.attachEvent('onclick', console.log)
}
```

## 访问 dom

访问 dom 的代价是昂贵的。

- 避免在循环中使用 dom 访问。
- 将 dom 引用分配给局部变量，并使用这些局部变量。
- 在可能的情况下使用 selector api.
- 当在 html 容器中重复使用时，缓存重复的次数。

## 操作 dom

- 先整理文档碎片，
- 再一次插入到合适的父节点。

## 事件

- 应该在 js 中附加监听器。
- 事件委托

## temp

- setTimeout
- web worker
- [xhr](/language/javascript/xhr.html)

```
var xhr = new XMLHttpRequest()
xhr.onreadystatechange = handler
xhr.open('GET', 'page.html', true) // 指定http请求方法/url.
xhr.send() // 发送请求
```

- jsonp

```
https://www.temp.org/path.php?callback=handler
```

## 图像灯塔

```
new Image().src = "https://www.temp.org"
```

- 前端向后端发送，后端可以不回馈。可用于埋点。

## 配置脚本文件

- 合并
- 分为不可改变的，和可改变的。
- 使用时间戳/hash 为后缀
- 精简（压缩）
- expires 报头
- 使用 cdn

## 载入策略

- 加载时遇到 script 标签会停止其他工作，直到加载完。
- 可用 defer/async 属性于 script 标签上。
- 可把注入脚本增加到一个数组中，当主脚本文件加载完后再执行该数组中的脚本。（有点像 umd/amd）
- 增加 script 元素
- 建议在 header 中使用 script 标签
- 延迟加载。后来发展成为渐进式页面。
  - 第一部分代码用于初始化页面。
  - 第二部分代码用于用户交互等。
- 按需加载
- 预加载

# 后记

## 惰性函数会越执行越快么？

不会，会在第一次执行时做若干判断，返回一个新函数。其后执行该新函数。
