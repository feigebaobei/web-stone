# Math
**Math.trunc()** 除去一个数的小数部分，返回整数部分。  

    Math.trunc(2.6) // 2
    Math.trunc(-2.6) // -2

**Math.sign()** 判断指定的数到底是正数、负数、还是零。
    
    Math.sign(3.7) // 1
    Math.sign(-3.7) // -1
    Math.sign(0) // 0
    Math.sign(-0) // -0
    
    -0 > 0
    false
    -0 < 0
    false
    -0 == 0
    true
    -0 === 0

**Math.cbrt(number)** 计算一个数的立方根。  

    Math.cbrt(8) // 2

**Math.clz32()**  
**Math.imul()**  
**Math.fround()**  

**Math.hypot()** 返回所有参数的平方和的平方根。  

    Math.hypot(3, 4) // 5 3*3+4*4的平方根 = 5

**Math.expm1()**  
**Math.log1p()**  

**Math.log10(n)** 得到以10为底n的对数。  
**Math.log2(n)** 得到以2为底n的对数。  
**Math.sinh(n)**  
**Math.cosh(n)**  
**Math.tanh(n)**  
**Math.asinh(n)**  
**Math.acosh(n)**  
**Math.atanh(n)**  

**Math.signbit(n)** 判断一个数的符号是否被设置。  

**指数运算符(\**)**  
它与Math.pow()的实现不同。  
    
    2 ** 2 // 4
    2 ** 3 // 8

