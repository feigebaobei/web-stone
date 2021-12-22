# map

类似对象。实现了“值-值”的对应。就是记录键值对的映射关系的集合。Map 的键实际上是跟内存地址绑定的。如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。  
null不能成为键名。

**Map([[kay, value], [kay, value], [kay, value], [kay, value]])** 以数组为参初始化map对象。  
以第一个参数为key，以第二个参数为value。  

|||||
|-|-|-|-|
|constructor|Map|||
|size|数量|||
|clear()|删除所有kv|||
|delete(key)|若该map对象中有key，则删除key及其值返回true。若该map对象中没有key，则返回false。|||
|entries()|返回一个iterator对象，其值为[key, value]|||
|forEach(callback(item, index, arr)[, thisArg])||||
|get(key)|若存在key，则返回其对应的值。若不存在key，则返回其undefined。|||
|has(key)|返回是否包含key。|比较算法和Object.is()几乎一样。||
|set(key, value)|设置该map对象key对应的value。|||
|keys()|返回一个iterator对象，其值为key。|||
|values()|返回一个iterator对象，其值为value。|||

**Map => Array**  

    [...map] // [[kay, value], [kay, value], [kay, value], [kay, value]]

**Array => Map**  

    new Map([[kay, value], [kay, value], [kay, value], [kay, value]])

**Map => Object**  

    function strMapToObj (strMap) {
        let obj = Object.create(null)
        for (let [key, value] of strMap) {
            obj[key] = value
        }
        return obj
    }

**Object => Map**  

    function objToStrMap (obj) {
        let strMap = new Map()
        for (let key of Object.keys(obj)) {
            strMap.set(key, obj[key])
        }
        return strMap
    }

**Map => JSON**  

    function strMapToJson (strMap) {
        return JSON.stringify(strMapToObj(strMap))
    }

**JSON => Map**  

    function jsonToStrMap (json) {
        return objToStrMap(json)
    }

### 复制，合并

    var clone = new Map(othermap)
    var merged = new Map([...map0, ...map1, ...map2])

#WeakMap

1. 只能设置对象为key.  
2. 对对象的引用是弱引用。  

**WeakMap.prototype.length**  
**WeakMap.prototype.prototype** // WeakMap对象  
**WeakMap.prototype.set(obj, value)**  
**WeakMap.prototype.get(obj)**  
**WeakMap.prototype.has(obj)**  
**WeakMap.prototype.delete(obj)**  
