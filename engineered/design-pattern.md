# 设计模式

- 创建型
  - 工厂模式
  - 单例模式
  - 原型模式
- 结构型
  - 适配器模式
  - 装饰器模式
  - 代理模式
  - 外观模式
  - 桥接模式
  - 组合模式
  - 享元模式
- 行为型
  - 策略模式
  - 模板方法模式
  - 观察者模式
  - 迭代器模式
  - 职责链模式
  - 模块模式
  - 命令模式
  - 备忘录模式
  - 发布订阅模式
  - 状态模式
  - 访问者模式
  - 中介模式
  - 解释器模式
  - 环形模式
  - 回调模式
  - 惰性模式
  - 沙箱模式
  - 链模式
  - 依赖注入
  - 金子模式（可扩展插件的模式）（可插件模式）

## 为什么要总结设计模式

- 解决常见问题
- 有名称便于交流
- 方便 code review
- 方便理解现有代码

## [设计模式的六大原则](/engineered/design-principle.html)

## 工厂模式

抽象了创建具体对象的过程。就是使用工厂函数。  
该模式就是为了创建对象。

```
function createPerson (name, age, job) {
    var o = new Object()
    o.name = name
    o.age = age
    o.job = job
    o.sayName = function () {
        console.log(this.name)
    }
    return o
}
```

## 单例模式

也叫单体模式，核心思想是确保一个类只对应一个实例。即使多次实例化。其实例结果是相同的。
在实现中只能有一个的事物。如：一个公司只能有一个会计系统，一个超市只能有一个收银系统。

```
var Singleton = function () {
    let instance = null
    function init () {
        var o = Object.create(null)
        o.name = 'top'
        o.admin = true
        o.sayHi = () => {
            console.log('hi')
        }
        return o
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = init()
            }
            return instance
        }
    }
}()
var a = Singleton.getInstance()
var b = Singleton.getInstance()
a === b
```

store(redux/vuex/pinia)/injector

## 原型模式

```
function Foo () {}
Foo.prototype.hi = () => {}
var foo = new Foo()
```

## 适配器模式

把不合适的接口从一个合适的接口输出。

```
// 若
var hong = {
  say: () => {
    console.log('hi')
  }
}
var ming = {
  speak: () => {
    console.log('hi')
  }
}
var mingAdapter = {
  say: ming.speak
}
// 则可以这样使用
var friend = [hong, mingAdapter]
friend.forEach(item => {
  console.log(item)
  item.say()
})
```

## 装饰器模式

```
let dfn = () => {
  //
}
class MyClass {
}
// use
@dfn
class MyClass {
  constructor () {}
  fire () {}
}
// es5方法，会修改原来的属性。
```

## 代理模式

用来控制访问本体对象。在模块模式的基础上开发出来的模式。先写一个单一原则的方法。再写一个控制触发该方法的方法（代理）
是把一些开销很大的对象，延迟到真正需要它的时候才去创建执行
一般用于：隔离、保护、验证、阻隔、缓冲、代理等。

```
class User {
  constructor (name, age) {
    this.name = name
    this.age = age
  }
}
var handler = {
  set: (target, key, value, receiver) => {
    console.log(target, key, value, receiver)
    target[kye] = value
  },
  construct: (target, args, newTarget) => {
    console.log(target, args, newTarget)
    if (200 < args[1]) {
      return {error: new Error('age is invalid')}
    } else {
      var a = Array.prototype.slice.call(args, 0)
      return new target(...a)
    }
  }
}
var proxy = new Proxy(User, handler)
var u = new proxy('u', 33)
let {proxy: p, revoke} = Proxy.revocable(User, handler)
revoke() // 解除代理
var a = new p('a', 23) // Uncaught TypeError: Cannot perform 'construct' on a proxy that has been revoked
```

## 外观模式（门面模式）

对外提供一个大接口，在大接口的方法体时调用模块（或定义域）内的子方法。
如此可省去用户调用多个小接口的麻烦。让模块更内聚。  
`compose`方法就是一种体现。

```
// demo0
function a () {...}
function b () {...}
function ab () {
  a()
  b()
}
ab()

// demo1
stopEvent()
function stopEvent () {
  stopPropagation()
  preventDefault()
}
function stopPropagation() {}
function preventDefault() {}
```

## 桥接模式

类的嵌套。
可利用常用的基本类。

```
class Base0 {}
class Base1 {}
class Super {
  constructor () {
    this.base0 = new Base0()
    this.base1 = new Base1()
  }
}
```

## 组合模式

把多个命令（或方法）组合起来。可追加命令，再依次执行。
与门面模式类似。

```
class MacroCommand {
  constructor () {
    this.commandList = []
  }
  add (fn) {
    this.commandList.push(fn)
  }
  execute () {
    this.commandList.forEach(cb => cb())
  }
}
let macroCommand = new MacroCommand()
macroCommand.add(firstCommand)
macroCommand.add(secondCommand)
macroCommand.add(threeCommand)
macroCommand.execute()
```

## 享元模式（共享模式）

该模式是创建一个类，把相同的属性定义在该类中，把不同的属性定义在该类外面。  
当需要类的实例需要某些属性时，保持相同属性不变，改变不同属性为希望的属性。再返回该实例。  
当需要很多具有若干相同属性与不同属性的对象时，可以使用享元模式。  
// 该模式下的实例是共享的一个对象。

```
function Circle (color) {
  this.color = color
  this.x
  this.y
  this.r
  this.setAttr = (x, y, r) => {
    this.x = x
    this.y = y
    this.r = r
  }
  this.draw = () => console.log('draw')
}
let shapeFactory = (function () {
  let store = {}
  return {
    getCircle: (color) => {
      if (!store[color]) {
        store[color] = new Circle(color)
      }
      return store[color]
    }
  }
})()
let circle0 = shapeFactory.getCircle('red')
circle.setAttr(1, 2, 3)
circle.draw()
```

## 策略模式

策略模式可看作为 if/else 判断的另一种表现形式，在达到相同目的的同时，减少了代码量以及代码维护成本。  
分离算法的使用、算法的实现。

```js
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
    valid && break
  }
  return valid
}

```

## 模板方法模式

模板方法模式由二部分组成，第一部分是抽象父类，第二部分是具体实现的子类。
在子类中的方法修改父类中的方法。
很像抽象类。
基本实践过程如下：

```
function SaveData () {}
SaveData.prototype.check = () => {
  console.log('check data format')
}
SaveData.prototype.store = () => {
  console.log('store to db')
}
SaveData.prototype.feedback = () => {
  console.log('success save')
}
function SaveUser () {}
SaveUser.prototype = new SaveData()
SaveUser.prototype.check = (name) => {
  if (typeof name === 'string') {
    return name !== ''
  } else {
    return new Error('name is invalid')
  }
}
```

## 观察者模式

也叫发布订阅模式

```
                 subject
                  ^   |
                  |   |
                  |   |
                  |   |
       subscribe  |   |  fire event
                  |   |
                  |   |
                  |   V
                 observer
```

```js
// use function
function Public () {
  this.subs = new Map()
  this.addSub = (item) => { // 添加订阅者
    this.subs.set(item, Simple())
  }
  this.removeSub = (item) => {
    this.subs.delete(item)
  }
  this.notice = () => { // 通知所有的订阅者，然后调用订阅者的指定方法。
    this.subs.keys().map(item => item.compile())
  }
}
function Sub () {
  this.compile () {
    //
  }
}

// use class format
class Subject {
  constructor () {
    this.observers = new Map
  }
  add(...observer) {
    observer.forEach(item => {
      this.observers.set(item, Simple())
    })
  }
  remove(observer) {
    this.observers.delete(observer)
  }
  notify() {
    this.observers.forEach(item => item.update())
  }
}
class Observer {
  constructor () {
    // ...
  }
  update () {
    console.log('update')
  }
}
let [o0, o1] = [new Observer(), new Observer()]
let sub = new Subject()
sub.add(o0, o1)
sub.notify()
```

## 迭代器模式

实现统一遍历接口。  
内部迭代器

```js
$.each(['a', 'b', 'c'], function (index, value) {
  console.log(index, value)
})
```

外部迭代器

```js
function* gen(arr) {
  for (let [index, value] of arr.entries()) {
    yield console.log([index, value])
  }
}
let ite = gen(['a', 'b', 'c'])
ite.next()
ite.next()
ite.next()
```

es6 中 Iterator 接口部署在 Symbol.iterator 属性上。  
当执行`[Symbol.iterator]()`会返回一个遍历器对象。

```js
var a = ['a', 'b', 'c']
var ite = arr[Symbol.iterator]()
// arr[Symbol.iterator]   是遍历器生成函数
// arr[Symbol.iterator]() 是遍历器对象
ite.next() // {value: 'a', done: false}
ite.next() // {value: 'b', done: false}
ite.next() // {value: 'c', done: false}
ite.next() // {value: undefined, done: true}
```

## 职责链模式

消除请求的发送者与接收者的耦合。

1.  发送者知道链中的第一个接收者，它向这个接收者发送该请求。
2.  每一个接收者都对请求进行分析，然后要么处理它，要么它往下传递。
3.  每一个接收者只知道它在链中的下家(successor)。
4.  如果没有任何接收者处理请求，那么请求会从链中离开。
5.  过程很像链表。

```js
function order500(orderType, isPay, count) {
  if (orderType == 1 && isPay == true) {
    console.log('亲爱的用户，您中奖了100元红包了')
  } else {
    //我不知道下一个节点是谁,反正把请求往后面传递
    return 'nextSuccessor'
  }
}
function order200(orderType, isPay, count) {
  if (orderType == 2 && isPay == true) {
    console.log('亲爱的用户，您中奖了20元红包了')
  } else {
    //我不知道下一个节点是谁,反正把请求往后面传递
    return 'nextSuccessor'
  }
}
function orderNormal(orderType, isPay, count) {
  // 普通用户来处理中奖信息
  if (count > 0) {
    console.log('亲爱的用户，您已抽到10元优惠卷')
  } else {
    console.log('亲爱的用户，请再接再厉哦')
  }
}
// 下面需要编写职责链模式的封装构造函数方法
var Chain = function (fn) {
  this.fn = fn
  this.successor = null
}
Chain.prototype.setNextSuccessor = function (successor) {
  return (this.successor = successor)
}
// 把请求往下传递
Chain.prototype.passRequest = function () {
  var ret = this.fn.apply(this, arguments)
  if (ret === 'nextSuccessor') {
    return (
      this.successor &&
      this.successor.passRequest.apply(this.successor, arguments)
    )
  }
  return ret
}
//现在我们把3个函数分别包装成职责链节点：
var chainOrder500 = new Chain(order500)
var chainOrder200 = new Chain(order200)
var chainOrderNormal = new Chain(orderNormal)

// 然后指定节点在职责链中的顺序
chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

//最后把请求传递给第一个节点：
chainOrder500.passRequest(1, true, 500) // 亲爱的用户，您中奖了100元红包了
chainOrder500.passRequest(2, true, 500) // 亲爱的用户，您中奖了20元红包了
chainOrder500.passRequest(3, true, 500) // 亲爱的用户，您已抽到10元优惠卷
chainOrder500.passRequest(1, false, 0) // 亲爱的用户，请再接再厉哦

// 我优化过的
class Chain {
  constructor(...fnList) {
    this._fnMap = new Map(fnList.map((item) => [item, Symbol()]))
  }
  add(fn) {
    this._fnMap.set(fn, Symbol())
  }
  remove(fn) {
    return this._fnMap.delete(fn) // boolean
  }
  get fnList() {
    return Array.from(this._fnMap.keys())
  }
  // set fnList() {}
  passRequest(threshold, ...args) {
    let res
    for (let i = 0; i < this.fnList.length; i++) {
      res = this.fnList[i](...args)
      console.log('sdfa', res, threshold)
      if (res === threshold) {
        break
      }
    }
    return res
  }
}
let fn0 = (a) => {
  clog('fn0', a)
  return ''
}
let fn1 = (a, b) => {
  clog('fn1', a, b)
}
let fn2 = (a, b, c) => {
  clog('fn2', a, b, c)
}
let c = new Chain(fn0, fn1, fn2)
// c.add((a, b) => {clog('fn3', a, b)})
// c.remove(fn2)
c.passRequest('q', 1, 2, 4, 5)

let chain = function (threshold, ...fnList) {
  this.fnList = fnList
  return (...args) => {
    // this.fnList
    let res = null
    for (let i = 0; i < this.fnList.length; i++) {
      res = this.fnList[i](...args)
      if (res === threshold) {
        // go on
      } else {
        break
      }
    }
    return res
  }
}
let fn0 = (a) => {
  clog('fn0', a)
  return Symbol.for('chain')
}
let fn1 = (a, b) => {
  clog('fn1', a, b)
}
let fn2 = (a, b, c) => {
  clog('fn2', a, b, c)
}
let cf = chain(Symbol.for('chain'), fn0, fn1, fn2)
cf('a', 'b', 'c') // 输出到fn2
```

```js
function Fn1() {
  console.log(1)
  return 'nextSuccessor'
}
function Fn2() {
  console.log(2)
  var self = this
  setTimeout(function () {
    self.next()
  }, 1000)
}
function Fn3() {
  console.log(3)
}
// 下面需要编写职责链模式的封装构造函数方法
var Chain = function (fn) {
  this.fn = fn
  this.successor = null
}
Chain.prototype.setNextSuccessor = function (successor) {
  return (this.successor = successor)
}
// 把请求往下传递
Chain.prototype.passRequest = function () {
  var ret = this.fn.apply(this, arguments)
  if (ret === 'nextSuccessor') {
    return (
      this.successor &&
      this.successor.passRequest.apply(this.successor, arguments)
    )
  }
  return ret
}
Chain.prototype.next = function () {
  return (
    this.successor &&
    this.successor.passRequest.apply(this.successor, arguments)
  )
}
//现在我们把3个函数分别包装成职责链节点：
var chainFn1 = new Chain(Fn1)
var chainFn2 = new Chain(Fn2)
var chainFn3 = new Chain(Fn3)

// 然后指定节点在职责链中的顺序
chainFn1.setNextSuccessor(chainFn2)
chainFn2.setNextSuccessor(chainFn3)

chainFn1.passRequest() // 打印出1，2 过1秒后 会打印出3
```

## 模块模式

把方法、属性分为分开的与私有的。

```js
// 闭包
var ModuleFn = (function () {
  var privateVar = 0
  var privateFn = () => {
    console.log('privateFn')
  }
  return {
    publicFn0: () => {
      console.log('publicFn0')
      console.log('privateVar', privateVar)
    },
    publicFn1: () => {
      console.log('publicFn1')
      privateFn()
    },
  }
})()
ModuleFn.publicFn0()
ModuleFn.publicFn1()
// commonjs同理
// esm同理
```

```js
// 再使用class实现一次
import { SingleChain } from 'data-footstone'
class DutyChain {
  constructor() {
    this.chain = new SingleChain()
  }
  append(rule, fn) {
    this.chain.append({ rule, fn })
  }
  remove() {
    // to do
  }
  execute(pararms) {
    let cur = this.chain.head
    let res = undefind
    while (cur) {
      if (cur.value.rule(pararms)) {
        res = cur.value.fn(params)
        break
      }
      cur = cur.next
    }
    return res
  }
}
```

## 命令模式

执行一个执行某些特定事情的指令。像是封装了一个方法。  
把需要重用的逻辑封装为一个方法，再在需要的地方调用此方法。

```
// 如下代码上的四个按钮 点击事件
var b1 = document.getElementById("button1"),
    b2 = document.getElementById("button2"),
    b3 = document.getElementById("button3"),
    b4 = document.getElementById("button4");
/*
 bindEnv函数负责往按钮上面安装点击命令。点击按钮后，会调用
 函数
 */
var bindEnv = function(button,func) {
    button.onclick = function(){
        func();
    }
};
// 现在我们来编写具体处理业务逻辑代码
var Todo1 = {
    test1: function(){
        alert("我是来做第一个测试的");
    }
};
// 实现业务中的增删改操作
var Menu = {
    add: function(){
        alert("我是来处理一些增加操作的");
    },
    del: function(){
        alert("我是来处理一些删除操作的");
    },
    update: function(){
        alert("我是来处理一些更新操作的");
    }
};
// 调用函数
bindEnv(b1,Todo1.test1);
// 增加按钮
bindEnv(b2,Menu.add);
// 删除按钮
bindEnv(b3,Menu.del);
// 更改按钮
bindEnv(b4,Menu.update);
```

```
var command1 = {
    execute: function(){
        console.log(1);
    }
};
var command2 = {
    execute: function(){
        console.log(2);
    }
};
var command3 = {
    execute: function(){
        console.log(3);
    }
};
// 定义宏命令，command.add方法把子命令添加进宏命令对象，
// 当调用宏命令对象的execute方法时，会迭代这一组命令对象，
// 并且依次执行他们的execute方法。
var command = function(){
    return {
        commandsList: [],
        add: function(command){
            this.commandsList.push(command);
        },
        execute: function(){
            for(var i = 0,commands = this.commandsList.length; i < commands; i+=1) {
                this.commandsList[i].execute();
            }
        }
    }
};
// 初始化宏命令
var c = command();
c.add(command1);
c.add(command2);
c.add(command3);
```

## 备忘录模式

也叫缓存模式。在一个栈中保存多个状态。当需要返回前一个状态时，从栈中弹出一状态。直到栈为空。  
与缓存相关的算法有[fifo/lru/lfu](/jsPackages/data-footstone.html)

```js
class Memo {
  constructor() {
    this.state = new Map()
    this.stateKeyList = []
  }
  // 保存状态
  push(key, state) {
    this.stateKeyList.push(key)
    let KEY = Symbol.for(key)
    this.state.set(KEY, state)
  }
  // 查看指定状态
  peek(key) {
    return this.state.get(Symbol.for(key))
  }
  // 弹出最后一个状态
  pop() {
    let lastKey = this.stateKeyList.pop()
    let state = this.peek(lastKey)
    this.delState(lastKey)
    return state
  }
  // 删除指定的状态
  delState(key) {
    let index = this.stateKeyList.findIndex((item) => item === key)
    if (index > -1) {
      this.stateKeyList.splice(index, 1)
      this.state.delete(Symbol.for(key))
    }
  }
  // 查看所有状态
  allState() {
    // [[k, v], [k0, v0], ...]
    return this.stateKeyList.reduce((r, c) => {
      r.push([c, this.state.get(Symbol.for(c))])
      return r
    }, [])
  }
}
```

## 状态模式

定义一个对象。这个对象里定义了很多状态及对应的方法，再暴露一个改变状态的接口，再暴露一个调用的接口。

```
class user {
  constructor () {
    this.currentState = []
    this.states = {
      move: () => {console.log('move')},
      stop: () => {console.log('stop')},
      speak: () => {console.log('speak')}
    }
  }
  changeStatus (...state) {
    this.currentState = state
    return this
  }
  goAhead () {
    this.currentState.forEach(item => this.states[item] && this.states[item]())
    return this
  }
}
```

## 访问者模式

在 js 这种弱类型语言里，很多方法里都不做对象的类型检测，而是只关心这些对象能做什么。  
根据不同的访问者调用不同的方法。  
把数据与操作数据的方法分开。  
常用到`abc`方法。

```
function Chicken (name) {
  this.name = name
}
Chicken.prototype.kind = 'chicken'
Chicken.prototype.speak = function () {
  console.log(`${this.name}: ji ji`)
}
function Duck (name) {
  this.name = name
}
Duck.prototype.kind = 'duck'
Duck.prototype.speak = function () {
  console.log(`${this.name}: ga ga`)
}
var Visitor = {
  speak: function (...rest) {
    let [that, ...params] = rest
    // console.log(that, params, this)
    return Chicken.prototype.speak.apply(this, params)
  }
}
var c = new Chicken('c')
var d = new Duck('d')
// console.log(d)
d.speak = Visitor.speak
d.speak()
```

## 中介模式

解耦对象与对象（数据与数据）之间关系。使二者间尽可能解耦。  
常用于多对多的关系。

```
// demo0
let playerDirector = (function () {
  let players = {}, operations = {}
  operations.addPlayer = function (player) {
    var teamColor = player.teamColer
    players[teamColor] = players[teamColor] || []
    players[teamColor].push(player)
  }
  operations.removePlayer = function (player) {
    var teamColor = player.teamColer
    players[teamColor] = players[teamColor] || []
    let index = -1
    players.some((item, i) => {
      if (item.name === player.name) {
        index = i
        return true
      }
    })
    if (index !== -1) {
      players.splice(index, 1)
    }
  }
  options.playerDead = function (player) {
    let teamPlayers = players[player.teamColor]
    let allDead = teamPlayers.some(item => item.state)
    if (allDead) {
      players.forEech(item => {
        item.color === player.color ? item.win() : item.lose()
      })
    }
  }
  let reciveMessage: function () {
    let [msgType, ...rest] = arguments
    options[msgType].apply(this, rest) // 这样比`options[msgType](rest)`更安全。
  }
  return {reciveMessage}
})()
class Player () {
  constructor (name, teamColor) {
    this.name = name
    this.teamColor = teamColor
    this.state = true
  }
  win () {
    console.log('win')
  }
  lose () {
    console.log('lose')
  }
  die () {
    playerDirector.reciveMessage('playerDead', this)
  }
}

// demo1
class Game {
  constructor() {
    this.playerList = new Map()
  }
  addPlayer(...ps) {
    ps.forEach(p => {
      this.playerList.set(p.name, p)
    })
  }
  removePlayer(p) {
    this.playerList.delete(p.name)
  }
  operate(source, target, operation) {
    switch(operation) {
      case '...':
        // source.fn0()
        // target.fn1()
        break
    }
  }
}
class Player {
  constructor(name, ...rest) {
    this.name = name
  }
  fn0() {...}
  fn1() {...}
}
const game = new Game()
let p0 = new Player('p0')
let p1 = new Player('p1')
let p2 = new Player('p2')
game.addPlayer(p0, p1, p2)
// 某情况下触发了：
game.operate(p0, p1, 'xxx')
```

## 解释器模式

解释器模式(Interpreter) : 定义一种文法的表示,并定义一种解释器, 通过这个解释器类解析对应的文法内容.

1. 利用解释器类解析文法中表示的想要的意图,解决并实现对应的需求.
2. 将一些特定类型的问题, 提供一种更简单的文法表示, 来解决对应的问题.
3. 将一些重复出现的问题,用一种简单的语言来进行表达.

## 环形模式

这是我定义的模式。在读一起开源项目时发现常这么使用。  
有点像环形链表。

```js
let o = {
  k: 'v',
}
o.origin = o
export default o
```

## 回调模式

把一个方法 a 传入另一个方法 b。在某时刻是调用方法 a.  
在子组件改变父组件的数据时常用这种方法。

```js
let fn = (cb) => {
  // 某时刻执行
  if (expression) {
    cb()
  }
}
```

## 惰性模式

把懒函数整理为一种设计模式

```js
// 定义
let fn = () => {
  // 若干环境判断
  return () => {
    ...
  }
}
// 使用
let fa = fn()
fa()
```

## 沙箱模式

该模式提供了一个可用于模块运行的环境。yui 中就使用了此模式。  
从全量模块中取出指定的模块。  
书上写的太繁琐了，下面我整理的简单的。

```js
// es5
let allModules = {
  a: fn,
  b: fn,
  c: fn,
  d: fn,
}
let sandbox = (modulesName) => {
  let res = {}
  modulesName.forEach(name => {
    res[name] = allModules[name]
  })
  return res
}
let instance = sandbox(['a', 'b', 'c'])

// es6
import * as all from './allModules'
export default {
  a: all.a
  b: all.b
  c: all.c
}
```

## 链模式

```js
class O {
  constructor() {...}
  a: () => {
    ...
    return this
  }
  b: () => {
    ...
    return this
  }
  c: () => {
    ...
    return this
  }
}
let o = new O()
o.a().b().c()
```

## 依赖注入

它是设计模式，同时又是一种机制：当应用程序的一些部件（即一些依赖）需要另一些部件时，利用依赖注入来创建被请求的部件，并将它们注入到需要它们的部件中。

在 Angular 中，依赖通常是服务，但是也可以是值，比如字符串或函数。应用的注入器（它是在启动期间自动创建的）会使用该服务或值的配置好的提供者来按需实例化这些依赖。各个不同的提供者可以为同一个服务提供不同的实现。

我的理解：

1. 实例化一个类，得到实例。
2. 把实例作为参数喂入方法。
3. 文体体中用实例执行逻辑。

我常用的是高阶方法、回调方法，要么喂入变量。虽然变量包括实例，但是没有把实例作为参数提高认知高度。

## 总结

在实际运行中常会用于多种设计模式，也会用到设计模式的变种。
