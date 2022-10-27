# no.1 week

## 需要的基础

- C++语言程序设计基础：类、继承、重载、重写、虚方法、模板
- 离散数学基础: 集合、偏序集、良序、数学归纳法、级数、递归、递推
- 概率基础: 随机分布、概率、伯努利实验、数学期望、期望值的线性律

# no.2 week

- 程序 != 算法
- 列循环 ~ 有穷性

## 计算 = 信息处理

- 对象：规律、技巧。
- 目标：高效、低耗。

借助某种工具，遵照一定规则，以明确而机械的形式进行。  
计算模型 = 计算机 = 信息处理工具

算法：
| | | |
| ------ | ------------------------------------------------ | --- |
| 输入 | 待处理的信息（问题） | |
| 输出 | 经处理的信息（答案） | |
| 正确性 | 可以解决指定的问题 | |
| 确定性 | 任一算法都可以描述为一个由基本操作组成的序列 | |
| 可行性 | 每一基本操作都可实现，且在常数时间内完成 | |
| 有穷性 | 对于任何输入，经过有穷次基本操作，都可以得到输出 | |

求直线 l 上过点 A 的垂线。

- 勾股法 3、4、5

三等分 AB 线段。

- 相似三角形

## 有穷性

hailStone

```js
let clog = console.log
let hailstone = (n) => {
  let length = 1
  while (1 < n) {
    if (n % 2) {
      // 奇
      n = n * 3 + 1
    } else {
      // 偶
      n = n / 2
    }
    length++
  }
  return length
}
clog(hailstone(42)) // 9
clog(hailstone(7)) // 17
clog(hailstone(27)) // 112
```

无法证明是否有穷。

## 好算法

- 正确
  - 简单的
  - 大规模的
  - 一般性的
  - 退化的
  - 任意合法的
- 健壮 能辨别不合法的输入并做适当处理，而不致非正常退出。
- 可读： 结构化 + 准确命名 + 注释 + ……
- 效率： 速度尽可能快，存储空间尽可能少。
  - algorithms + data structure = programs
  - (algorithms + data structures) \* efficiency = computation

## 计算模型

to measure is to know.  
if you can not measure it, you can not improve it.

## 算法分析

- 正确性
- 成本
  - **运行时间** + 所需存储空间
  -

T(n) 程序运行次数 时间复杂度。
为稳妥起见，取最环情况。

### 划分等价类

### 图灵机

### ram 模型

## 大 O 记号

当 n>>2 时。存在 c>0，有`T(n)<cf(n)`
在数学上一个好的标记超过一个新理论。 ———— 图灵

- 长远 考虑 dsa 处理更大问题上的潜力。
- 主流 考虑主要方面，不考虑次要方面。

**渐进分析** 当问题足够大时，考察成本的增长趋势。  
T(n) 基本操作次数  
S(s) 占用存储单元数 （通常不考虑）

O(fn) = T(n)

- 反映增长趋势。
- 常系数可忽略。
- 低次项可忽略。

## 大欧密喀 下界

当 n>>2 时。存在 c>0，有`T(n)>cf(n)`

## 西它

当 n>>2 时。存在 c1>c2>0，有`c1f(n)>T(n)>c2f(n)`

## 复杂度

- 有效解
  - 常数
    - 不含循环、分支转向、递归。
  - 对数
    - 底数不同
    - 交幂不同
    - 对数多项式
  - 多项式
  - 线性： 所有 O(n)类函数
  - 从 O(n)到 O(n^2)
  - 幂
- 难解
  - 指数

## 2-subset

## 增长速度

![增长速度](/coursera/dsa/1/v.png)

# no.3 week

## 算法分析

主要任务：

- 正确性（不变性\*单调性）
- 复杂度

复杂度分析的主要方法：

- 迭代：级数求和
- 递归：递归跟踪+递推方程
- 猜测+验证

## 级数 或 级数求和

- 算数级数：与末项平方同阶
- 幂方级数：比幂次高出一阶
  - T(n) = 1^2 + 2^2 + ... + n^2 = O(n^3)
  - T(n) = 1^3 + 2^3 + ... + n^3 = O(n^4)
- 几何级数（a > 1）：与末项同阶
  - 等比数列 O(a^n)
- 收敛级数
  - 随着数量增加，趋于 O(1)
- 可能未必收敛，然而长度有限
  - h(n) = 1 + 1/2 + 1/3 + ... + 1/n = O(logn) 调和级数
  - log1 + log2 + log3 + ... + logn = log(n!) = O(nlogn) 对数级数

## 循环

```
for (let i = 0; i < n; i++)
for (let j = 0; j < n; j++)
for (let j = 0; j < i; j++)
for (let j = 0; j < i; j+= 2)
三个都是O(n^2)
计算次数递减
```

## 迭代与递归

迭代乃人工，递归方神通。  
迭代的效率>递归。  
**凡治众如治寡，分数是也**
求 n 个数之和

```js
let f = (arr, n) => {
  let sum = 0
  for (let i = 0; i < n; i++) {
    sum += arr[i]
  }
  return sum
}
// 时间复杂度 O(n)
// 空间复杂度 O(2) ： sum / i
```

```js
let f = (arr, sum = 0) => {
  if (arr.length) {
    return f(arr.slice(1), (sum += arr[0]))
  } else {
    return sum
  }
}
```

递归分析  
（概括其中的规律。像递推。）
检查每个递归实例，累计所需时间，其总和即算法执行时间。

- 分而治之
- 减而治之

- 最好情况
- 最坏情况

## 动态规划

- mark it work
- mark it right
- mark it fast

Φ^36 = 2^25
Φ^5 = 10

### fib

```js
// generator方法
let getFibArr = (n) => {
  let genF = function* (n) {
    let [pre, cur] = [0, 1]
    let i = 0
    while (i < n) {
      yield cur
      // [pre, cur] = [cur, pre + cur]
      let t = cur
      cur = t + pre
      pre = t
      i++
    }
  }
  return Array.from(genF(n))
}

// 根据最后2项和为新添加的元素
let f = (n) => {
  if (n <= 0 || !Number.isInteger(n)) {
    return []
  } else if (n === 1) {
    return [1]
  } else if (n === 2) {
    return [1, 1]
  } else {
    res = [1, 1]
    for (let i = 2; i < n; i++) {
      let t = res[res.length - 1] + res[res.length - 2]
      res.push(t)
    }
    return res
  }
}

// 得到fib中no.n个数
let f = (n) => {
  // 定义字典
  // 为字典赋值
  // 从字典中取值并赋值
  let map = new Map([
    [0, 1],
    [1, 1],
  ])
  if (map.get(n)) {
    return map.get(n)
  } else {
    let t = f(n - 1) + f(n - 2)
    map.set(n, t)
    return t
  }
}
// 还可做成类
// 待测试
class Fib {
  constructor() {
    this._map = new Map([
      [0, 1],
      [1, 1],
    ])
  }
  sum(from = 0, to = this._map.size) {
    return this.toArray(from, to).reduce((r, c) => {
      return (r += c)
    }, 0)
  }
  toArray(from = 0, to = this._map.size) {
    return Array.from(this._map.values()).slice(from, to)
  }
  getValueByIndex(n) {
    if (n <= 0) {
      return undefined
    }
    if (this._map.get(n)) {
      return this._map.get(n)
    } else {
      let t = this.getValueByIndex(n - 1) + this.getValueByIndex(n - 2)
      this._map.set(n, t)
      return t
    }
  }
  clear() {
    this._map.clear()
  }
}
```

### 最长公共子序列 lcs

```js
// 行列方式
var a = 'didactical' // 'ab'
var b = 'advantage' // 'abc'
// 返回lcs的长度
let f = (a, b) => {
  // 使用map
  let map = new Map()
  for (let i = -1; i < a.length; i++) {
    map.set(`${i},-1`, 0)
  }
  for (let j = -1; j < b.length; j++) {
    map.set(`-1,${j}`, 0)
  }
  for (let j = 0; j < b.length; j++) {
    for (let i = 0; i < a.length; i++) {
      if (a.charAt(i) === b.charAt(j)) {
        map.set(`${i},${j}`, map.get(`${i - 1},${j - 1}`) + 1)
      } else {
        map.set(
          `${i},${j}`,
          Math.max(map.get(`${i - 1},${j}`), map.get(`${i},${j - 1}`))
        )
      }
    }
  }
  return map.get(`${a.length - 1},${b.length - 1}`)
}
```

- 单调性
- 最好情况 O(n+m)
- 若出现 2 个子问题，则可能出现雷同

# no.4 week

- 线性结构
  - 向量（我学到的是面向对象的思想）
  - 链表

秩：xxxx
构造函数：类在实例化时执行
析构函数：类的实例被删除时执行。js 中好像没有析构函数

## 接口与实现

- 抽象数据类型 abstract data type
  - 数据模型 + 定义在该模型上的一组操作
- 数据结构
  - 基于某种特定语言，实现 adt 的一整套算法

```js
// 逆序对的数量
// 若为0，则有序递增。
let f = (a) => {
  let res = 0
  for (let i = 0; i < a.length - 2; i++) {
    clog(a[i], a[i + 1])
    if (a[i] > a[i + 1]) {
      res++
    }
  }
  return res
}
```

### 静态空间管理

- 开辟内部数组
- 上溢、下溢
- 难以准确预测空间的需求量
- 是否可动态调整容量？

### 动态空间管理

- 当即将发生上溢时，适当地扩大内部数组的容量。
  - 增加容量
    - 递增式扩容 分摊成本 O(n) 装填因子 约 100%
    - 加倍式扩容 O(1) >50%

### 平均分析 & 分摊分析

|     | 平均分析                                                 | 分摊分析                                                       |     |
| --- | -------------------------------------------------------- | -------------------------------------------------------------- | --- |
|     | 根据数据结构各种操作出现概率的分布，将对应的成本加权平均 | 对数据结构连续地实施足够多次操作，所需总体成本分摊到单次操作。 |     |
|     | 各种操作作为独立事件分别考查                             | 对一系列操作做整体的考量                                       |     |
|     | 割裂了操作之间的相关性和连贯性                           | 刻画了可能出现的操作序列                                       |     |
|     | 往往不能准确地评判数据结构和算法的真实性能               | 精准的评判数据结构和算法的真实性能                             |     |

### 二分查找

```js
let binSearch = (arr, e) => {
  let lo = 0,
    hi = arr.length
  let m
  while (lo < hi) {
    m = (lo + hi) >> 1 // => Math.floor((lo + hi) / 2)
    if (arr[m] > e) {
      hi = m
    } else if (arr[m] < e) {
      lo = m + 1
    } else {
      return m
    }
  }
  return -1
}
```

# no.5 week

# no.6 week

# no.7 week
