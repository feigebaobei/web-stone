# Math

- js 的内置对象
- 用于`Number`类型，不支持`BigInt`.
- 包含数学常数属性、数学函数方法。
- 常数都是全大写
- 角度上使用弧度
  <!-- prettier-ignore-start -->
  |                  |           |                                                                         |     |
  | ---------------- | --------- | ----------------------------------------------------------------------- | --- | --- |
  | Math.E           |           | 欧拉常数。约等于 2.718                                                  |     |
  | Math.LN2         |           | 2 的自然对数 0.693                                                      |     |
  | Math.LN10        |           | 10 的自然对数 2.303                                                     |     |
  | Math.LOG2E       |           | 1.443                                                                   |     |
  | Math.LOG10E      |           | 0.434                                                                   |     |
  | Math.PI          |           |                                                                         |     |
  | Math.SQRT1_2     |           | 二分之一的平方根 0.707                                                  |     |
  | Math.SQRT2       |           | 2 的平方根 1.414                                                        |     |
  | Math.abs(x)      | x [-1, 1] | 返回值 [0, pi]                                                          |     |
  | Math.acos(x)     | x [-1, 1] | 返回值 [0, pi]                                                          |     |
  | Math.acosh(x)    |           | 反双曲余弦值                                                            |     |
  | Math.asin(x)     | x [-1, 1] | 反正弦值。返回值 [-pi/2, pi/2]                                          |     |
  | Math.asinh(x)    |           | 反双曲正弦值                                                            |     |
  | Math.atan(x)     |           | 返回值 [-pi/2, pi/2]                                                    |     |
  | Math.atanh(x)    |           |                                                                         |     |
  | Math.atan2(y, x) |           | 返回 y/x 的反正切值                                                     |     |
  | Math.cbrt(x)     |           | 返回一个数的立方根                                                      |     |
  | Math.ceil(x)     |           | 向上取整                                                                |     |
  | Math.clz32(x)    |           | 返回一个数字在转换成 32 无符号整形数字的二进制形式后, 开头的 0 的个数。 |     |
  | Math.cos(x)      |           |                                                                         |     |
  | Math.cosh(x)     |           |                                                                         |     |
  | Math.exp(x)      |           | E 的 x 次方                                                             |     |
  | Math.expm1(x)    |           | 返回 Math.exp(x) - 1                                                    |     |
  | Math.floor(x)    |           |                                                                         |     |
  | Math.fround(x)   |           |                                                                         |     |
  | Math.hypot(...n) |           | 返回所有参数平方和的平方根                                              |     |
  | Math.imul(x, y)  |           |                                                                         |     |
  | Math.log(x)      |           | 返回给定数字的自然对数                                                  |     |     |
  | Math.log1p(x)    |           |                                                                         |     |
  | Math.log10(x)    |           |                                                                         |     |
  | Math.log2(x)     |           |                                                                         |     |
  | Math.max(...n)   |           |                                                                         |     |
  | Math.min(...n)   |           |                                                                         |     |
  | Math.random()    |           | 返回一个[0， 1)的伪随机数                                               |     |
  | Math.round(x)    |           | 返回与 x 最接近的整数。                                                 |     |
  | Math.sign(x)     |           | 返回 x 的符号                                                           |     |
  | Math.sin(x)      |           |                                                                         |     |
  | Math.sinh(x)     |           |                                                                         |     |
  | Math.sqrt(x)     |           | 平方根                                                                  |     |
  | Math.tan(x)      |           |                                                                         |     |
  | Math.tanh(x)     |           |                                                                         |     |
  | Math.trunc(x)    |           | 舍去 x 的小数部分并返回。不改变 x。                                     |     |
  | Math.sinh(x)     |           |                                                                         |     |
  | Math.sinh(x)     |           |                                                                         |     |
  | Math.sinh(x)     |           |                                                                         |     |
  | Math.sinh(x)     |           |                                                                         |     |
  <!-- prettier-ignore-end -->
  `**`指数运算符 与`Math.pow()`的实现不同。
