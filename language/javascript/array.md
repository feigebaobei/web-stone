# array 对象

## 简介

null

## 属性

**constructor** 返回构造原型

    var arr = new Array();
    console.log(arr.constructor);

**length** 返回数组的长度

    var arr = [1,3,3,4,5,6,'b','a'];
    console.log(arr.length);

**prototype** 得到或操作数组的属性和方法

    var arr = ['a', 'b'];
    console.log(arr.prototype)

## 方法

**concat()** 在一个数组后连接几个数组，并返回新的数组。不改变原来的各个数组。

    var a = [1,2];
    var b = [3];
    var c = [4];
    var d = a.concat(b,c);
    console.log(d); // [1,2,3,4]

**join(separator)** 把指定数组内的各元素用，指定的间隔符（默认为英文逗号）分隔开。返回字符串。  
separator，分隔符。
var joinStr = d.join('ok'); // "1ok2ok3ok4"

**pop()** 返回并删除指定数组的最后一个元素。

    var newd = d.pop(); // 4

**push(p: ele | ele[])** 在数组的末尾添加新元素并返回数组的新长度

    newd.push('a'); // 5

**shift()** 返回并删除指定数组的第一个元素

    newd.shift(); // 'a'

**unshift(item0, item1, ...)** 在数组的头部添加若干个元素,并返回新的长度。

    f.unshift(0,1,2); // 6

添加时返回新的长度，删除时返回被删除的元素。都会改变原数组。

**reverse()** 把指定数组排倒序并返回

    newd.reverse(); // ['a', 4, 3, 2, 1]

**slice(start, end)** 返回指定数组的选定部分。不改变原数组。  
start，必填。
end，非必填。
浅复制。

    var e = newd.slice(1,3); // [3, 2]

**sort(sortby)** 把指定数组的各元素按照指定方法（sortby）排序。会改变原数组。返回改变后的数组。  
sortby(a, b)，可选。必须是函数。
|||
|-|-|
|大于 0|ab|
|等于 0|不变|
|小于 0|ba|

    var f = [1,7,3,6,8,4,2];
    function sortNum(a, b) {return a - b};
    f.sort(sortNum); // [1,2,3,4,6,7,8]

**splice(start,howmany,item0,item1,...)** 把数组的指定部分替换为指定内容，以数组的格式返回被删除的项目组成的数组。  
start，必填。
howmany，必填。
item0,...，非必填。

    f.splice(2,4,'a'); // [3,4,6,7]

**toSource()**

**toString()** 返回由指定数组转化的字符串。不改变原数组。

    f.toString(); // '1,2,a,8'

**toLocaleString()** 返回由指定数组转化的本地字符串。不改变原数组。

    f.toLocaleString(); // '1,2,a,8'

**valueOf()** 返回指定数据

    f.valueOf(); // [0,1,2,1,2,'a',8]

**indexOf(search, start)** 返回 search 首次出现的位置。  
es5 时添加的新方法。  
search，必填。  
start，非必填。

    f.indexOf(2,3); // 4

**lastIndexOf(search, start)** 返回指定范围内，最后一次出现的位置。

    f.lastIndexOf(1, -2); // 3

**reduce(fn, init)** 遍历当前数组。

    // 把数组减少到一个值。
    f.reduce(function (total, currentValue, currentIndex, arr) {}, initialValue)

total，必填。初始值或计算结束后的返回值。
currentValue, 必填。当前元素。
currentIndex, 非必填。当前元素的索引。
arr，必填。当前数组。
initialValue，非必填。传递给函数的初始值。

**reduceRight(fn, init)** 从右边开始遍历当前数组。

    f.reduce(function () {}, 0)

**map(fn，obj)** 对原数组的每个元素依次执行 fn。返回一位新数组，原数组不变。  
fn，必填，对每个元素操作的方法。
obj，非必填，fn 执行时 this 指向的对象。即上下文参数。

    f.splice(f.indexOf('a',0),1);
    var g = 2;
    f.map(function(item, index, arr) {return item * this}, g); // [0,2,4,2,4,16]

**forEach(fn, obj)** 对指定数组的每个元素依次执行 fn。不返回东西。原数组不变。  
fn，必填。
obj，上下文参数。

    f.forEach(function(item,index, arr) {console.log(item)}); // 0 2 4 2 4 16

可用于类数组对象。

**filter(boolean|fn)** 用指定数组中满足条件的元素组成新数组并返回。  
boolean|fn，必填，判断结果是 true 的元素组成的数组。

    var h = f.filter(function (item, index, arr) {
        return item > 2
    })
    //[4,4,16]

**some(fn)** 把数组中的每一项都运行给定的函数。若有一项返回 true，则返回 true。反之返回 false。不改变原数组。  
fn，必填，返回 boolean 值。

    var bool0 = h.some(function(item, index, arr) {
        return item % 2 === 0
    })
    // bool0 = true

**every(fn)** 用数组中的每一项都运行给定的函数。若都返回 true，则返回 true。反之返回 false。不改变原数组。当遇到第一个为 false 时，不再执行剩下元素并返回 false.  
fn，必填，返回 boolean 值。

    var bool1 = h.every(function (item, index, arr) {
        return item % 2 === 0
    })
    // bool1 = true

**数组去重**

    function distinct(arr) {
        var temp = [],
            obj = {}
        for (var i = 0, iLen = arr.length; i < iLen; i < iLen; i++) {
            if (!obj[arr[i]]) {
                obj[arr[i]] = 1
                temp.push(arr[i])
            }
        }
        return temp
    }

**将类数组对象转为数组对象**

    Array.from(objArr)
    [].slice.call(objArr)

**find(fn(item, index, arr) {}, obj)** 返回第一个符合条件的元素（的引用）。

    [3, 3, 5, -6, 12].find((item, index, arr) => {
        return item < 0
    }) // -6

**findIndex(function (item, index, arr) => {})** 返回第一个符合条件的数组元素的位置。若不符合则返回-1。

    [3, 3, 5, -6, 12].findIndex((item, index, arr) => {
        return item < 0
    }) // 3

**fill(value, start, end)** 为数组填充值。

value 必填。填充的值。  
start 选填。开始的位置。  
end 选填。结束的位置。不包含这个位置。

    let arrTemp = new Array(5) // 创建一个长度是5的数据
    arr.fill(false, 1, 3) // [undefined, false, false, undefined, undefined]

**entries()** 对键值对的遍历。

    let arr = [0, 1, 2, "3", "3", 6, 7, 7, 8]
    for ( let [key, value] of arr.entries()) {
        // console.log(item)
        console.log(key)
        console.log(value)
    }

**keys()** 对键的遍历，返回 iterator 对象

    for (let key of arr.keys()) {
        console.log(key)
    }

**values()** 对值的遍历，返回 iterator 对象

    for (let key of arr.values()) {
        console.log(key)
    }

**copyWithin(target, start? = 0, end? = this.length)** 将数组内部指定位置的成员复制到其它位置（会覆盖原有成员）。不会改变数组长度.  
target 开始覆盖的下标
start 开始复制的下标
end 结束复制的下标

    console.log([1, 2, 3, 4, 5].copyWithin(-2, -3, -1)); // [1, 2, 3, 3, 4]

**includes(value, start)** 数组中是否包含给定的值。

    arr.includes('3') // true,
    arr.includes(9) // false,

**for...of** 遍历数组中每一个元素的方法。

可以使用`return`/`break`/`continue`

    for (let item of arr) {
        //
    }

**Array.from(arrayLike[, mapFn[, thisArg]])**

arrayLike 必填 数组、伪数组、可迭代对象。  
mapFn 选填 把 arrayLike 里的数据放入新数组再对每个元素执行这个回调函数再返回到新数组。  
thisArg 选填 mapFn 的 this 对象  
不会出现空槽位。

Array.from(obj, mapFn, thisArg) <=> Array.from(obj).map(mapFn, thisArg)

    Array.from([1, 2, 3], x => x + x) // [2, 4, 6]
    Array.from([1, 2, 3], function (item) {
        return item + this
    }, 5) // [6, 7, 8]
    Array.from({length: 5}, (item, index) => index) // [0, 1, 2, 3, 4]

**Array.of(item0[, item1, item2])** 将一组值转化为一个数组。

    Array.of('a', 3, 2, 'b', 'c') // ['a', 3, 2, 'b', 'c']

**Array.flat([deep])** 按指定深度拼接元素为一维数组。返回该数组。

    const arr1 = [0, 1, 2, [3, 4]];
    console.log(arr1.flat()); // [0, 1, 2, 3, 4]

**Array.prototype.toReversed() => Array**
不改变原数组，返回一个新数组。

**Array.prototype.toSorded(compareFn) => Array**
不改变原数组，返回一个新数组。

**Array.prototype.toSpliced(start, deleteCount, ...items) => Array**
不改变原数组，返回一个新数组。

**Array.prototype.with(index, value) => Array**
不改变原数组，返回一个新数组。

**Array.prototype.group(index, value) => Array**
把数组内的元素分组

### 常用操作方法比较

|        | unshift            | shift                | pop                    | push         | splice                    |
| ------ | ------------------ | -------------------- | ---------------------- | ------------ | ------------------------- |
| 逻辑   | 在头部添加若干元素 | 删除数组的第一个元素 | 删除数组的最后一个元素 | 追加若干元素 | 替换指定部分              |
| 参数   | items...           | -                    | -                      | items...?    | start, howmany, items...? |
| 返回值 | 数组新长度         | 返回被删除元素       | 返回被删除元素         | 数组新长度   | 被删除的元素组成的数组    |
| 添加的 | 返回新长度         |                      |                        |              |                           |
| 删除的 | 返回被删除元素     |                      |                        |              |                           |

## [TypedArray](/language/javascript/typedArray.html)
