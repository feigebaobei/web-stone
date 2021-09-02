# Object
- 基础类型之一。


```
{...}
new Object(any)
```

Object.length
Object.prototype
Object#assign(target, ...source)
把source上的属性合并到target上，并返回target.

Object#create(proto, [propertiesObject])
按指定的原型对象proto、对标对象的属性返回一个新对象。
会被新对象的`__proto__`属性接收原型对象。

Object#defineProperty(obj, prop, descriptor)
obj 目标对象
prop 目标对象的属性
descriptor { // 数据描述符
    value: 
    writable:
    enumerable:
    configurable:
}
修改或定义obj的prop属性。返回该对象。
```
// demo
let o = {}
Object.defineProperty(o, 'a', {
    value: 0,
    writable: true,
    enumerable: true,
    configurable: true,
})
Object.defineProperty(o, 'b', {
    enumerable: true,
    configurable: true,
    get() {
        return this.a
    },
    set(v) {
        this.a = v
    }
})
```

Object.defineProperties(object, props)
object 目标对象
props: {
    configurable
    enumerable
    writable
    value
    get: function() {}
    set: function(v) {}
}
在一个对象上定义新的属性或修改现有属性，并返回该对象。
```
var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  // etc. etc.
});
```

Object.entires(obj)
obj
返回目标对象上可枚举的属性的键值对组成的数组。

Object#assign()
Object#assign()
Object#assign()
Object#assign()
Object#assign()
Object#assign()
Object#assign()
Object#assign()
Object#assign()
Object#assign()
Object#assign()
Object#assign()
Object#assign()
Object#assign()
Object#assign()


## 描述符
||configurable|enumerable|value|writable|get|set|
|-|-|-|-|-|-|-|
|数据描述符|v|v|v|v|x|x|
|存取描述符|v|v|x|x|v|v|

|-  |-|默认值|用于|
|-  |-|-|-|
|configurable  |是否可以删除。除value/wriable外的属性是否可以被修改|false|用于|
|enumerable    |是否可枚举|false|`for...in`/`Object.keys()`|
|value  |当前值|undefined|
|writable   |是否可修改|false|
|get   |属性的getter方法|undefined|
|set   |属性的setter方法|undefined|