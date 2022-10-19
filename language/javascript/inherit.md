# 继承

## 原型链继承

子构造函数的 prototype 指向父构造函数的实例。

```
function Sub () {...}
function Super () {...}
Sub.prototype = new Super()
```

特点：

1. 继承单一
2. 无法向父类构造函数传参。
3. 共享父类的属性及原型。

## 构造函数继承

使用 call()/apply()改变 this.

```
function Con () {
  Super.call(this, 'str')
  this.age = 12
}
```

特点：

1. 只继承父构造函数的属性，不继承父构造函数的原型。
2. 可给父构造函数传参。

## 组合继承（混合继承）

```
function Sub(name) {
  Super.call(this, name)
}
Sub.propotype = new Super()
```

特点：

1. 可以给父构造函数传参。
2. 可以得到父构造函数的原型。

## 原型式继承

```
function content (obj) {
  function f() {}
  f.prototype = obj
  return new f()
}
```

Object.create()就是使用这种方法。
特点：

1. 只从父原型中得到原型。

## 寄生式继承

把原型式继承嵌套在一个方法里。这个方法为新对象设置新属性。

```
function content (obj) {
  function f() {}
  f.prototype = obj
  return new f()
}
function sub (obj) {
  var sub = content(obj)
  sub.name = 'str'
  return sub
}
```

与混合继承很像。

## 寄生组合式继承

```
function content (obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
var con = content(Person.prototype)
function Sub () {
  Person.call(this)
}
Sub.prototype = con
con.constructor = Sub
var a = new Sub()
```
