# Set

set 类似数组。其成员的值都是唯一的。其键名与键值相同。

**数组去重**

    const set = new Set([1,2,3,2,4,2,3,4])
    console.log(set)
    [...new Set(array)] // 返回无重复的数组

**数组与 set 转换**

    var arr = Array.from(set)
    var set = new Set(arr)

## api

<!-- prettier-ignore-start -->
|      |      |     |     |
| -- | -- | --- | --- |
| constructor   | Set       |     |     |
| size    | 返回 set 对象的长度        |     |     |
| add(value)    | 为 set 对象添加一个值      |     |     |
| delete(value) | 删除 set 对象中的指定的值，并返回 bool 结果。   |     |     |
| has(value)    | 检查 set 对象中是否有指定的值    |     |     |
| clear() | 删除指定 set 对象中的所有值      |     |     |
| keys()  | 返回一个以指定 set 对象的 key 组成的 `Iterator` 对象。键名和键值是同一个值。其返回结果与 Set.values() 一样。可与`Array.form()`/`for...of`一起使用。 |  注意返回值是“`Iterator`对象”   |     |
| values()      | 返回一个以指定 set 对象的 value 组成的 `Iterator` 对象。可与`Array.form()`/`for...of`一起使用。      |  注意返回值是“`Iterator`对象”   |     |
| entries()     | 返回一个以 key 和 value 组成的数组组成的 `Iterator` 数组。可与`Array.form()`/`for...of`一起使用。    |  注意返回值是“`Iterator`对象”   |     |
| forEach()     | 对 set 对象进行遍历操作。(value 与 key 相同)          |     |     |
<!-- prettier-ignore-end -->

set 对象没有提供访问指定值的方法。要想访问指定值需要转为数组后再用数组的方法取指定值。

```js
let set = new Set(['a', 1, 2, 2, 2, 1, 3])
let arr = [...set] // ['a', 1, 2, 3]
let index = arr.indexOf('a') // 0
console.log(arr[index]) // 'a'
```

**因为 set 对象在存数据时无重复值。在取时较困难。所以石头一般使用 set 对象存放对象，然后检查是否有某个值，使用数组取数据。**  
**set 对象不能判断对象是否相等。所以不能去重对象。**  
**set 对象认为 NaN 是相等的**

**并集**

    let union = new Set([...seta, ...setb])
    // 有的高版本浏览器已经支持 set#union(otherSet)。返回一个新的集合。不改变原集合。

**交集**

    let intersect = new Set([...seta].filter(x => setb.has(x)))

**差集**

    let difference = new Set([.seta].filter(x => !setb.has(x)))

**取出相应位置的元素**

不能从 set 元素直接取出元素。需要把 set 转化为 array 对象。

    let arr = Array.from(set)
    // 或
    // let arr = [...set]
    arr[index]

# WeakSet

1. 只能存放对象或 symbol。
2. 对对象是弱引用。
3. 不支持遍历

只有 3 个方法
**WeakSet.prototype.add(obj)** 为 WeakSet 对象指定添加的对象。  
**WeakSet.prototype.delete(obj)** 返回是否删除指定的对象。  
**WeakSet.prototype.has(obj)** 返回是否存在指定的对象。  
没有办法遍历它的成员。

WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用。  
现在 set 对象的操作方法、属性太少。（比如：无法准确地取出指定的值。）所以把他只做为一个仓库对待。操作还要在数组中操作。  
它出现在数组对象没有这些功能的时期。应该是做为一个数组对象的补充存在。要项目中应当把 set/array 结合起来使用。  
set 对象用处少。weakset 对象的用处更少。

# 2024 增加的属性

|                            |              |     |     |
| -------------------------- | ------------ | --- | --- |
| union(other)               | 并集         |     |     |
| intersection(other)        | 交集         |     |     |
| difference(other)          | 差集         |     |     |
| symmetricDifference(other) | 对称差集     |     |     |
| isSubsetOf(other)          | 是否是集     |     |     |
| isSuppersetOf(other)       | 是否是超集   |     |     |
| isDisjointFrom(other)      | 是否不相交集 |     |     |
|                            |              |     |     |
