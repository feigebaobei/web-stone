# number

JavaScript 内部使用 64 位浮点数（国际标准 IEEE 754）表示数值。
IEEE 754 规定第一位是符号位，0 表示正数，1 表示负数。所以会有两种零，+0 是符号位为 0 时的零值，-0 是符号位为 1 时的零值。实际编程中，判断一个值是+0 还是-0 非常麻烦，因为它们是相等的。

## 语法

```
new Number(v)
var a = new Number('123')
var b = Number('23')
a instanceof Number // true
b instanceof Number // false
```

## api

<!-- prettier-ignore-start -->
|                          |                            |                       |     |     |
| ------------------------ | -------------------------- | --------------------- | --- | --- |
| Number.EPSILON           | 2 个可表示数之间的最小间隔 | 2.220446049250313e-16 |     |     |
| Number.MAX_SAFE_INTEGER  | 最大安全数                 | 2^53 - 1              |     |     |
| Number.MAX_VALUE         | 最大正数                   |                       |     |     |
| Number.MIN_SAFE_INTEGER  | 最小安全数                 | -(2^53 - 1)           |     |     |
| Number.MIN_VALUE         | 最小正数                   | 5e-324                |     |     |
| Number.NaN               |                            |                       |     |     |
| Number.NEGATIVE_INFINITY | 负无穷大                   |                       |     |     |
| Number.POSITIVE_INFINITY | 正无穷大                    |                     |     |     |
| Number.prototype    |   |   |||
| Number.isNaN(value)    |  返回是不是 NaN |   |||
| Number.isFinite(number)    | 返回是否是有限数  |   |||
| Number.isInteger(number)    |  返回是否是整数 |   |||
| Number.isSafeInteger(value)    |  返回是否是安全数。(-(2^53 - 1), 2^53 - 1) |   |||
| Number.parseFloat(string)    |  把参数转化为小数。若无法转换则返回 NaN |   |||
| Number.parseInt(string, [radix])    | radix 字符串的基数。默认值不是 10.把参数转化为整数。向下取整。或 NaN.
  |   |||
| Number#toExponential(fractionDigits)    |  fractionDigits 小数位数。默认使用尽可能多的小数，以保证精度。返回转换为指数形式的字符串 | 发现不可在浏览器中直接运行。可能需要babel处理。  |||
| Number#toFixed(digits)    |   digits 小数位数。[0, 20]。不在此范围的，默认为 0.
|它是一个四舍六入五成双的诡异的方法(也叫银行家算法)，"四舍六入五成双"含义：对于位数很多的近似数，当有效位数确定后，其后面多余的数字应该舍去，只保留有效数字最末一位，这种修约（舍入）规则是“四舍六入五成双”，也即“4 舍 6 入 5 凑偶”这里“四”是指 ≤4 时舍去，"六"是指 ≥6 时进上，"五"指的是根据 5 后面的数字来定，当 5 后有数时，舍 5 入 1；当 5 后无有效数字时，需要分两种情况来讲：①5 前为奇数，舍 5 入 1；②5 前为偶数，舍 5 不进。（0 是偶数）|   ||
| Number#toLocaleString(form)    |  返回指定语言环境下的字符串。
 |   |||
| Number#toPrecision(precision)| 返回指定有效位数的字符串形式的数字。precision 会四舍五入。返回一个字符串，表示指定精度的数字。    |   |   ||
| Number#toString([radix])    |  radix 基数。返回字符串表示形式。 |   |||
| Number#valueOf()    | 返回表示指定 Number 对象的原始值的数字  |   |||
<!-- prettier-ignore-end -->

## Number & String

```js
// string => number
// 把字符串转换为数字。若可以转换则调用`parseInt`/`parseFloat`。否则返回`NaN`.
Number(str)

// 转换第一个无效字符前的字符串
parseInt(str)
parseFloat(str)
```

```js
// number => string
n.toString([radix])
String(n)
n + ''
```

### 处理过多小数

Number(n.toFixed(4))
