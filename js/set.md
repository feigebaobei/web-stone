# Set

set类似数组。其成员的值都是唯一的。其键名与键值相同。  

**数组去重**

    const set = new Set([1,2,3,2,4,2,3,4])
    console.log(set)
    [...new Set(array)] // 返回无重复的数组

**数组与set转换**

    var arr = Array.from(set)
    var set = new Set(arr)

**Set.prototype.add(value)** 为set对象添加一个值
**Set.prototype.size** 返回set对象的长度
**Set.prototype.delete(value)** 删除set对象中的指定的值，并返回bool结果。
**Set.prototype.has(value)** 检查set对象中是否有指定的值
**Set.prototype.clear()** 删除指定set对象中的所有值
**Set.prototype.keys()** 返回一个以指定set对象的key组成的类数组对象。键名和键值是同一个值。其返回结果与Set.values一样。
**Set.prototype.values()** 返回一个以指定set对象的value组成的类数组对象。
**Set.prototype.entries()** 返回一个以key和value组成的数组组成的数组。
**Set.prototype.forEach(fn(value, key, set) {})** 对set对象进行遍历操作。(value 与 key 相同)

set对象没有提供访问指定值的方法。要想访问指定值需要转为数组后再用数组的方法取指定值。  

    let set = new Set(['a', 1, 2, 2, 2, 1, 3])
    let arr = [...set] // ['a', 1, 2, 3]
    let index = arr.indexOf('a') // 0
    console.log(arr[index]) // 'a'

**因为set对象在存数据时无重复值。在取时较困难。所以石头一般使用set对象存放对象，然后检查是否有某个值，使用数组取数据。**  
**set对象不能判断对象是否相等。所以不能去重对象。**  
**set对象认为NaN是相等的**  

**并集**

    let union = new Set([...seta, ...setb])

**交集**

    let intersect = new Set([...seta].filter(x => setb.has(x)))

**差集**

    let difference = new Set([.seta].filter(x => !setb.has(x)))

**取出相应位置的元素**

不能从set元素直接取出元素。需要把set转化为array对象。

    let arr = Array.from(set)
    // 或
    // let arr = [...set]
    arr[index]

# WeakSet

1. 只能存放对象。  
2. 对对象是弱引用。  

**WeakSet.prototype.add(obj)** 为WeakSet对象指定添加的对象。
**WeakSet.prototype.delete(obj)** 返回是否删除指定的对象。
**WeakSet.prototype.has(obj)** 返回是否存在指定的对象。
没有办法遍历它的成员。

WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用。
现在set对象的操作方法、属性太少。（比如：无法准确地取出指定的值。）所以把他只做为一个仓库对待。操作还要在数组中操作。  
它出现在数组对象没有这些功能的时期。应该是做为一个数组对象的补充存在。要项目中应当把set/array结合起来使用。  
set对象用处少。weakset对象的用处更少。  
