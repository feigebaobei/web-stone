# number
JavaScript 内部使用 64 位浮点数（国际标准 IEEE 754）表示数值。
IEEE 754 规定第一位是符号位，0表示正数，1表示负数。所以会有两种零，+0是符号位为0时的零值，-0是符号位为1时的零值。实际编程中，判断一个值是+0还是-0非常麻烦，因为它们是相等的。

## 语法
```
new Number(v)
var a = new Number('123')
var b = Number('23')
a instanceof Number // true
b instanceof Number // false
```

## 属性
||||||
|-|-|-|-|-|
|Number.EPSILON|2个可表示数之间的最小间隔| 2.220446049250313e-16|||
|Number.MAX_SAFE_INTEGER|最大安全数|2^53 - 1|||
|Number.MAX_VALUE|最大正数||||
|Number.MIN_SAFE_INTEGER|最小安全数|-(2^53 - 1)|||
|Number.MIN_VALUE|最小正数||||
|Number.NaN|||||
|Number.NEGATIVE_INFINITY|负无穷大||||
|Number.POSITIVE_INFINITY||正无穷大|||
|Number.prototype|||||

## 方法
Number.isNaN(value)
返回是不是NaN

Number.isFinite(number)
返回是否是有限数

Number.isInteger(number)
返回是否是整数

Number.isSafeInteger(value)
返回是否是安全数。(-(2^53 - 1), 2^53 - 1)

Number.parseFloat(string)
把参数转化为小数。若无法转换则返回NaN

Number.parseInt(string, [radix])
radix 字符串的基数。默认值不是10.
把参数转化为整数。向下取整。或NaN.

Number#toExponential(fractionDigits)
fractionDigits 小数位数。默认使用尽可能多的小数，以保证精度。
返回转换为指数形式的字符串

Number#toFixed(digits)
digits 小数位数。[0, 20]。不在此范围的，默认为0.
会四舍五入。
使用定点表示法表示给定数字的字符串。

Number#toLocaleString(form)
form
返回指定语言环境下的字符串。

Number#toPrecision(precision)  返回指定小数位数的字符串形式的数字
precision
会四舍五入。
返回指定的精度的数值对象的字符串表示。

Number#toString([radix])
radix 基数
返回字符串表示形式。

Number#valueOf()
返回表示指定 Number 对象的原始值的数字

## Number & String
string => number
Number(s)
// 把字符串转换为数字。若可以转换则调用`parseInt`/`parseFloat`。否则返回`NaN`.
parseInt(s)
parseFloat(s)
// 转换第一个无效字符前的字符串

number => string
n.toString([radix])
String(n)
n + ''

### 处理过多小数
Number(n.toFixed(4))
