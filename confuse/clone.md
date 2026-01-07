# 复制

js 的类型可分为简单类型、引用（复杂）类型。  
简单类型被赋值时：创建一个相等值的数据再赋值给变量。  
引用类型被赋值时：把该对象的内存地址赋值给变量。

因 js 的（对象引用）特点。可分为

- 浅复制，只复制对象的内存地址。
- 深复制，创建一个相等值的对象后再赋值给人变量。  
  复制引用类型时才会出现浅、深复制。

# 浅复制

`...`  
`Object.create()`  
`Object.assign()`  
`for in`
`arr.slice()`

# 深复制

## `JSON.stringify() / JSON.parse()`

缺点：

- 忽略 function/undefined/正则/symbol 字段。
- 不能处理循环引用的对象。

## 循环+递归

见[util](/util/index.html)

## structureClone(value, [transfer])

- 新 api，有兼容性
- transfer： transfer 对象组成的数组
- 返回克隆后的对象
- 不是 js 语言提供的能力，js 语言的运行环境提供的能力。

## [MessageChannel](/language/javascript/messageChannel.html)

```js
let f = (o) => {
  return new Promise((s, _j) => {
    let { port1, port2 } = new MessageChannel()
    port1.postMessage(o)
    port2.onmessage = (e) => s(e.data)
  })
}
let a
f(o).then((r) => {
  a = r
})
```

可以用于循环对象。
深复制。

## jQuery.extend()

```
$.extend(deepCopy, target, object1, [objectN])
$.extend(true, {}, o)
```

## title

## title

想做到极致也不好做。
