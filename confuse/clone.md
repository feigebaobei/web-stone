# 复制
js的类型可分为简单类型、引用（复杂）类型。  
简单类型被赋值时：创建一个相等值的数据再赋值给变量。  
引用类型被赋值时：把该对象的内存地址赋值给变量。  

因js的（对象引用）特点。可分为  
- 浅复制，只复制对象的内存地址。  
- 深复制，创建一个相等值的对象后再赋值给人变量。  
复制引用类型时才会出现浅、深复制。  

# 浅复制
`...`  
`Object.create()`  
`Object.assign()`  
`for in`

# 深复制
## `JSON.stringify() / JSON.parse()`  
缺点：  
- 忽略function/undefined字段。  
- 不能处理循环引用的对象。  
## 循环+递归
``` js
function deepClone(v) {
    let baseType = ['string', 'number', 'boolean', 'undefined', 'bigint', 'symbol']
    let res
    if (baseType.includes(typeof v)) {
        res = v
    } else { // null array object
        if (!v) {
            res = v
        } else {
            if (Array.isArray(v)) {
                res = v.map(item => deepClone(item))
            } else {
                Object.entries(v).forEach(([k, v]) => {
                    res[k] = deepClone(v)
                })
            }
        }
    }
    return res
}
```