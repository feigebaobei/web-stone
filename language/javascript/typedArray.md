# TypedArray

## 简介

> 缓存二进度数据的类数组窗口。  
> 它包括 8 个构造函数  
> Int8Array  
> Uint8Array  
> Uint8ClampedArray  
> Int16Array  
> Uint16Array  
> Int32Array  
> Uint32Array  
> Float32Array  
> Float64Array  
> BigInt64Array  
> BigInt64Array  
> 可操作缓存地址内的数据。以数组形式处理。

| type              | 范围                   | 占多少 byte | 说明          | web IDL type        |     |     |
| ----------------- | ---------------------- | ----------- | ------------- | ------------------- | --- | --- |
| Int8Array         | -128~127               | 1           |               | byte                |     |     |
| Uint8Array        | 0~255                  | 1           |               | octet               |     |     |
| Uint8ClampedArray | 0~255                  | 1           |               | octet               |     |     |
| Int16Array        | -32768~32767           | 2           |               | short               |     |     |
| Uint16Array       | 0~65535                | 2           |               | unsigned short      |     |     |
| Int32Array        | -2147483648~2147483647 | 4           |               | long                |     |     |
| Uint32Array       | 0~4294967295           |             | unsigned long |                     |     |     |
| Float32Array      | -3.4E38~3.4E38         | 4           |               | unrestricted float  |     |     |
| Float64Array      | -1.8E308~1.8E308       | 8           |               | unrestricted double |     |     |
| BigInt64Array     | -2^63~2^63-1           | 8           |               | bigint              |     |     |
| BigUint64Array    | 0~2^64-1               | 8           |               | gibint              |     |     |

## api

```js
new TypedArray()
new TypedArray(length)
new TypedArray(typedArray)
new TypedArray(object)
new TypedArray(buffer) // 为全部缓存找开窗口
new TypedArray(buffer, byteOffset)
new TypedArray(buffer, byteOffset, length)
// 都是返回一个确切的类型的构造函数。
length          创建一个占用指定长度的内存
typedArray      它是一个typedArray。把它复制到的typedArray.
object          新的typedArray如同使用TypedArray.from()创建一个。
buffer          缓存
typeOffset      相对缓存开头的偏移byte
```

|          |                                                                               | 返回值类型                                                          |                              |     |     |     |     |
| -------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------- | --- | --- | --- | --- |
| 静态属性 |                                                                               |                                                                     |                              |     |     |     |     |
|          | TypedArray.BYTES_PER_ELEMENT                                                  | 每个元素占多少个 byte                                               | number                       |     |     |     |     |
|          | TypedArray.name                                                               | 构造函数的名字                                                      | string                       |     |     |     |     |
|          | TypedArray[`get [Symbol.species]`]                                            | 返回当前构造函数                                                    |                              |     |     |     |     |
| 静态方法 |                                                                               |                                                                     |                              |     |     |     |     |
|          | TypedArray.from(iterableObj)                                                  |                                                                     |                              |     |     |     |     |
|          | TypedArray.of(...params)                                                      |                                                                     |                              |     |     |     |     |
| 实例属性 |                                                                               |                                                                     |                              |     |     |     |     |
|          | TypedArray#buffer                                                             | 创建 TypedArray 时的 ArrayBuffer 的引用                             |                              |     |     |     |     |
|          | TypedArray#byteLength                                                         | 占用多少个 byte                                                     |                              |     |     |     |     |
|          | TypedArray#byteOffset                                                         | 相对于 buffer 开头的偏移量                                          |                              |     |     |     |     |
|          | TypedArray#length                                                             | 占用多少个 byte                                                     | 分不清它与 byteLength 的不同 |     |     |     |     |
| 实例方法 |                                                                               |                                                                     |                              |     |     |     |     |
|          | TypedArray#at(position)                                                       | 返回指定下标的数据。若为负，则从尾开始数。否则从头开始数。          |                              |     |     |     |     |
|          | TypedArray#copyWithin(target, start, end?)                                    | 把指定范围的数据复制到指定开头及以后的位置。返回被修改后的数组      |                              |     |     |     |     |
|          | TypedArray#entries()                                                          | 返回一个数组类型。它是一个 iterator 对象。`[[k, v], ...]`           |                              |     |     |     |     |
|          | TypedArray#every((ele, index?, array?) => boolean)                            | 返回 boolean                                                        |                              |     |     |     |     |
|          | TypedArray#fill(v, start?, end?)                                              | 把指定范围内的元素设置为指定的值，返回修改后的数组。                |                              |     |     |     |     |
|          | TypedArray#filter(ele, index?, array?) => TypedArray                          | 返回通过过滤方法的 TypedArray,不改变原数组                          |                              |     |     |     |     |
|          | TypedArray#find(ele, index?, array?) => ele/undefined                         | 返回从头开始的第一个满足条件的元素，否则返回 undefined              |                              |     |     |     |     |
|          | TypedArray#findIndex(ele, index?, array?) => number                           | 返回从头开始第一个满足条件的元素的下标。-1 表示没有满足条件的元素。 |                              |     |     |     |     |
|          | TypedArray#findLast(ele, index?, array?) => ele/undefined                     |                                                                     |                              |     |     |     |     |
|          | TypedArray#findLastIndex(ele, index?, array?) => number                       |                                                                     |                              |     |     |     |     |
|          | TypedArray#forEach((ele, index?, array?) => void, this?)                      |                                                                     |                              |     |     |     |     |
|          | TypedArray#includes(searchElement, fromIndex?) => boolean                     |                                                                     |                              |     |     |     |     |
|          | TypedArray#indexOf(searchElement, fromIndex) => number                        | 若为-1,则表示示找到。                                               |                              |     |     |     |     |
|          | TypedArray#join(seperator?) => string                                         |                                                                     |                              |     |     |     |     |
|          | TypedArray#keys() => number[]                                                 | 返回由下标组成的 iterator 对象。                                    |                              |     |     |     |     |
|          | TypedArray#lastIndexOf(searchElement, fromIndex?) => number                   |                                                                     |                              |     |     |     |     |
|          | TypedArray#map((ele, index?, array?) => ele) => TypedArray                    | 返回改变后的 TypedArray                                             |                              |     |     |     |     |
|          | TypedArray#reduce((pre, cur, index?, array?) => newValue, initialValue?)      |                                                                     |                              |     |     |     |     |
|          | TypedArray#reduceRight((pre, cur, index?, array?) => newValue, initialValue?) |                                                                     |                              |     |     |     |     |
|          | TypedArray#reverse()                                                          | 把原来倒序后返回                                                    |                              |     |     |     |     |
|          | TypedArray#set(arrayOrTypedArray, targetOffset?)                              | 从指定位置开始设置为指定数组（或 TypedArray）里的元素               |                              |     |     |     |     |
|          | TypedArray#slice(start?, end?) => TyepdArray                                  | 返回提取出来的数据组成的 TypedArray                                 |                              |     |     |     |     |
|          | TypedArray#some((ele, index?, array?) => boolean, this?) => boolean           |                                                                     |                              |     |     |     |     |
|          | TypedArray#sort(((a, b) => number)?)                                          |                                                                     |                              |     |     |     |     |
|          | TypedArray#subarray(begin?, end?) => TypedArray                               | 返回取出指定范围内的数据。不改变原数组。返                          |                              |     |     |     |     |
|          | TypedArray#values() => array                                                  |                                                                     |                              |     |     |     |     |
|          | TypedArray#toLocaleString(locales?, options?) => string                       | 使用本地语言转换为 string。                                         |                              |     |     |     |     |
|          | TypedArray#toString() => string                                               |                                                                     |                              |     |     |     |     |
|          | TypedArray#[@@iterator]()                                                     |                                                                     |                              |     |     |     |     |
| 事件     |                                                                               |                                                                     |                              |     |     |     |     |

## 注意事项

1. 不可冻结。别的缓存窗口也可操作缓存数据 Object.freeze(ta)
2. 必须设置正确的 ByteOffset new Int32Array(new ArrayBuffer(4), 4/_必须是 4 的倍数_/)
3. 必须设置正确的 ByteLength new Int32Array(new ArrayBuffer(4/_必须是 4 的倍数_/))

# ArrayBuffer

## 简介

> 返回一个固定长度的生的二进制数据缓存  
> 操作二进制数据，更方便。比 array 快很多。

## api

```js
let b = new ArrayBuffer(length) // length 占用多少个byte
// length < 2^53
```

|          |                                      | 返回值类型                                     |     |     |     |     |     |
| -------- | ------------------------------------ | ---------------------------------------------- | --- | --- | --- | --- | --- |
| 静态属性 |                                      |                                                |     |     |     |     |     |
|          | ArrayBuffer.[`get [Symbol.species]`] | 返回当前构造函数                               |     |     |     |     |     |
| 静态方法 |                                      |                                                |     |     |     |     |     |
|          | ArrayBuffer.isView(p)                | 若参数有缓存的窗口则返回 true，否则返回 false. |     |     |     |     |     |
| 实例属性 | 都是只读                             |                                                |     |     |     |     |     |
|          | ArrayBuffer#byteLength               | 返回占多少 byte                                |     |     |     |     |     |
| 实例方法 |                                      |                                                |     |     |     |     |     |
|          | ArrayBuffer#slice(begin, end)        | 返回`[begin, end)`的 ArrayBuffer               |     |     |     |     |     |
