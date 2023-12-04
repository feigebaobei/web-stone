# Object

- 基础类型之一。

```
{...}
new Object(any)
```

`Object.length`  
`Object.prototype`  
`Object.assign(target, ...source)`  
把 source 上的属性复制到 target 上，并返回 target.

`Object.create(proto, [propertiesObject])`  
按指定的原型对象 proto、新对象的属性返回新对象。
新对象的`__proto__`属性指向原型对象。

`Object.defineProperty(obj, prop, descriptor)`  
obj 目标对象
prop 目标对象的属性
descriptor { // 数据描述符
value:
writable:
enumerable:
configurable:
}
修改或定义 obj 的 prop 属性。返回该对象。

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

`Object.defineProperties(object, props)`  
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

`Object.entries(obj)`  
obj
返回目标对象上可枚举的属性的键值对组成的数组。

`Object.getOwnPropertyDescriptor(obj, prop)`  
obj,
prop
返回指定对象的指定属性的属性描述符对象

```
{
    value,
    writable
    get
    set
    configuration
    enumerable
}
```

`Object.getOwnPropertyNames(obj)`  
返回指定对象自身拥有的非`symbol`/非不可枚举（非`enumerable: false`）属性名组成的数组。

`Object.getOwnPropertySymbols(obj)`  
obj
返回指定对象自身的全部`Symbol`属性值组成的数组。

`Object.getPrototypeOf(obj)`  
返回原型对象

`Object.setPrototypeOf(obj, prototype)`  
调用给定对象的原型对象。

`Object.is(v0, v1)`  
返回是否是同一个值。  
`+0`和`-0`不是同一个值。

- 两个值都是 undefined
- 两个值都是 null
- 两个值都是 true 或者都是 false
- 两个值是由相同个数的字符按照相同的顺序组成的字符串
- 两个值指向同一个对象
- 两个值都是数字并且
  - 都是正零 +0
  - 都是负零 -0
  - 都是 NaN
  - 都是除零和 NaN 外的其它同一个数字

`Object.freeze(obj)`  
obj 目标对象
不可修改（value/writable/enumerable/configuration）、不能删除已有属性、不能修改该对象的原型
返回被冻结的对象
属性描述符会改变为：

```
{
    configurable: false
    enumerable: true
    value: 1
    writable: false
}
```

数组的原型链中有`Object`，所以数组可以被冻结。
freeze 是浅冻结。

```
// 深冻结
function deepFreeze(obj) {
    let propNames = Object.getOwnPropertyNames(obj)
    propNames.forEach(function(name) {
        let value = obj[name]
        if (typeof value === 'object' && value !== null) {
            deepFreeze(value)
        }
    })
    return Object.freeze(obj)
}
```

`Object.isFrozen(obj)`  
返回是冻结
不可扩展的对象也是冻结的。

`Object.preventExtensions(obj)`  
返回不可扩展的对象
obj 对象上的属性描述符不会改变。

`Object.isExtensible(obj)`  
返回是否可扩展（即：是否可添加新属性）

`Object.keys(obj)`  
返回由指定对象的可枚举对象的属性组成的数组。

`Object.values(obj)`  
返回指定对象上可枚举属性值组成的数组。

`Object.seal(obj)`  
不可改变已有属性，把对象的所有属性设置为不可配置。
不可添加新属性。
返回操作后的对象。

`Object.isSealed(obj)`  
返回是否密封

`Object#toString()`  
返回对象的字符串形式

`Object#toLocaleString()`  
返回当前对象的本地化客串形式。

`Object#valueOf()`  
返回对象的原始值

`Object#hasOwnProperty(prop)`  
自身是否拥有指定属性

`Object#isPrototypeOf(obj)`  
`a.isPrototypeOf(b)`  
返回 a 是否在 b 对象的原型链中

`Object#propertyIsNumberable(prop)`  
返回指定属性是否可枚举

## 固定对象的方法

|     | Object.preventExtensions(obj) | Object.freeze(obj)         | Object.seal(obj)             |     |     |
| --- | ----------------------------- | -------------------------- | ---------------------------- | --- | --- |
|     | 不可扩展                      | 冻结                       | 密封                         |     |     |
|     | 不能添加新属性                | 不能添加新属性。不可修改。 | 不可配置：不改变属性描述符。 |     |     |

## 描述符

|            | configurable | enumerable | value | writable | get | set |
| ---------- | ------------ | ---------- | ----- | -------- | --- | --- |
| 数据描述符 | v            | v          | v     | v        | x   | x   |
| 存取描述符 | v            | v          | x     | x        | v   | v   |

| -            | -                                                     | 默认值    | 用于                       |
| ------------ | ----------------------------------------------------- | --------- | -------------------------- |
| configurable | 是否可以删除。除 value/wriable 外的属性是否可以被修改 | false     | 用于                       |
| enumerable   | 是否可枚举                                            | false     | `for...in`/`Object.keys()` |
| value        | 当前值                                                | undefined |
| writable     | 是否可修改                                            | false     |
| get          | 属性的 getter 方法                                    | undefined |
| set          | 属性的 setter 方法                                    | undefined |
