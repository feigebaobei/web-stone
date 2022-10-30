# es4

# es5

# es6

let 命令

1. 所在代码块内有效。
2. 无变量提升。
3. 暂时性死区。
4. 不允许重复声明。

块级作用域

## **6 种变量声明方法的对比**

| 关键字   | 特点                                                                                                                                |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| var      |                                                                                                                                     |
| function |                                                                                                                                     |
| let      | 1. 所在代码块内有效。 2.无变量提升。 3. 存在暂时性死区。 4. 不允许重复声明。                                                        |
| const    | 1. 用来声明只读常量。 2. 声明时必须初始化。 3. 无变量提升。 4. 存在暂时性死区。 5. 不可重复声明。 6。本质：变量指向的内存地址不变。 |
| import   |                                                                                                                                     |
| class    |                                                                                                                                     |

## 解构赋值

1. 数组解构赋值时 rest 要放在最后。
2. 解构值严格等于 undefined 时使用默认值。
3. 解构对象时按照模式相同的赋值。
4. 函数参数使用解构赋值并给参数设置默认值。一定要为参数设置默认值。不是为参数的属性设置默认值。

**默认值，** 只有 undefined 可以触发默认值。

## 字符串的扩展

**模板字符串**

## 正则表达式

## 数值的扩展

## 函数的扩展

    function m1 ({x = 0, y = 0} = {}) {}
    // m1函数的默认参数时{}。
    // m1({})时 m1({x = 0, y = 0 } = {})
    // x = 0
    // y = 0

    function m2 ({x, y} = { x: 0, y: 0 }) {}
    // m2函数的默认值是{ x: 0, y: 0 }
    // m2({})时 m2({x, y} = {})
    // x undefined
    // y undefined

    // 为函数设置必填参数
    function throwIfMissing() {
        throw new Error('Missing parameter')
    }
    function foo (mustBePorvided = throwIfMissing()) {
        // code
    }

1. rest 参数后不能再有别的参数。
2. 函数的 length 属性不包括 rest 参数。

### 严格模式

    'use strict'

es6 中规定：只要函数参数使用了默认值、解构赋值、扩展运算符(...rest)，那么函数内部就不能显式设定为严格模式。否则就会报错。

1. 设定全局性的严格模式。
2. 把函数包在一个无参数的立即执行函数里。

**注意：**  
箭头函数：

1. 函数体内的 this 对象是定义时所在的对象。
2. 不能用作构造函数。
3. 不能使用 arguments 对象。使用 rest 参数可以启相同作用。
4. 不能使用 yield 命令。
5. 不存在 this/arguments/super/new.target

**绑定 this**

###尾调用优化

最后一步操作。

    (x) => {
        if (x > 0) {
            return m(x)
        } else {
            return n(x)
        }
    }

1. 不保存函数内部变量。
2. 不保存函数的调用位置等信息。

### 尾递归

    let tailFactorial = (n, total) => {
        if (n === 1) {
            return total
        }
        return (n-1, total * n)
    }
    let factorial = (n) => {
        return taiFactorial(n, 1)
    }

**使用尾调用、尾递归不会发生栈溢出，相对节省内存。**

**柯里化**

将多参数的函数转换成单参数的形式。

1. 柯里化有什么特点。
2. 柯里化能做什么。
3. 柯里化能用在什么地方。
4. 柯里化怎么使用。
5. 柯里化的优缺点。

```
    let currying = (fn, n) => {
        return (m) => {
            return fn.call(fn, m, n)
        }
    }
    let tailFactorial = (n, total) => {
        if (n === 1) {
            return total
        }
        return tailFactorial(n - 1, n * total)
    }
    const factorial = currying(tailFactorial, 1)
```

**循环可以使用递归代替，一旦使用递归，最好使用尾递归。**

**尾调用优化只在严格模式下启作用，在正常模式下无效。**

## 对象的扩展

**对象中只写属性名时，表示。属性值等于属性名所代表的变量。**

object.assign(target, source1[, source2, source3]) // 将多个源对象的可枚举属性添加到目标对象。

**对象的遍历方法**

    for (let key in obj) {} // 遍历对象的key
    Object.keys(obj) // 以数组形式返回对象自身的所有可枚举属性（不包含symbol属性）
    Object.getOwnPropertyNames(obj) // 以数组的形式返回对象自身的所有属性（不含symbol属性）
    Object.getOwnPropertySymbols(obj) // 以数组形式返回对象自身的所有Symbol属性
    Object.ownKeys(obj) // 以数组形式返回对象自身的所有属性

## call/apply/bind

bind 是固定某个函数的参数和 this，返回另外一个函数。
call 和 apply 是指定 this 和参数调用这个函数，立即执行这个函数。
call apply 的区别是他们指定参数的方式不同。
都是重新定义 this

### call

obj.fn.call(newThis, p0, p1, p2, ...)

### apply

obj.fn.apply(newThis, [p0, p1, p2, ...])

### bind

obj.fn.bind(newThis, p0, p1, p2, ...)

# es7

# es8

# es9
