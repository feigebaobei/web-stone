# 原型链
- js中使用原型链实现对象间扩展。

`funtion`有`prototype`属性。其值是个对象。该对象就是该`function`的实例的原型。该`function`是构造函数。它返回方法的this对象，即使没有写`return this`。
`function`的原型链中有`Object`对象。`function`使用`prototype`属性给原型的下一个节点提供原型对象。
`function`的返回值是当前实例`instance`。`instance`有`__proto__`属性，该属性指向构造函数`function`的`prototype`属性。
`function.prototype`像输出。
`instance.__proto__`像接收。

## 实例化过程

实例
是否存在于原型链中