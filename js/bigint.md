# BigInt
- 可表示任意大的数字
- 使用“整数字面量后面加`n`”的方法表示。
- 不能用于`Math`.
- 不能与`Number`混合运算。
- 遇到小数会取整数部分。
- 与`Number`宽松相等。
- 与`Number`可以比较。
- 操作bigint时不是常数时间，不能用于密码学。
- 不适用于`JSON.stringify()`。请使用下文的`BigInt.prototype.toJSON()`.
- 可以使用`+`/`-`/`*`/`/`/`**`/`%`。
- 可以使用除`>>>`以外的全部位运算。如：`&`/`|`/`^`/`~`/`>>`/`<<`

typeof 1n === 'bigint'          // true
typeof BigInt('1') === 'bigint' // true

BigInt(n)
返回一个bigint对象

BigInt.asIntN(width, bigint)
静态方法将 BigInt 值转换为一个 -2width-1 与 2width-1-1 之间的有符号整数。

BigInt.asUintN(width, bigint)
静态方法将 BigInt 转换为一个 0 和 2width-1 之间的无符号整数。

BigInt#valueOf()
返回bigint对象的原始值

BigInt#toString([radix])
radix 基数
返回bigint的字符串。无`n`

BigInt#toLocaleString([locales, [options]])
locales
options
返回此数字的 language-sensitive 形式的字符串。

## Number & BigInt
建议只在值的绝对值大于`2^53`时使用`bigint`。
二者转化时会损失精度。

Number => BigInt
BigInt(n)

BigInt => Number
Number(bi.toString())
// 适用于[-2^52, 2^52 - 1]的整数。

## 封装一个toJSON()
```
BigInt.prototype.toJSON = function () {
    return this.toString()
}
```