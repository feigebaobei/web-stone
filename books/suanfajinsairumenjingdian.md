# 算法竞赛入门经典

全书内容分为 12 章,包括程序设计入门、循环结构程序设计、数组和字符串、
函数和递归、C++与 STL 入门、数据结构基础、暴力求解法、高效算法设计、动态规划初步、数学概念与
方法、图论模型与算法、高级专题等内容,覆盖了算法竞赛入门和提高所需的主要知识点,并含有大量例
题和习题。
最好有人带着学习。

# 第 1 部分 语言篇

## 第 1 章 程序设计入门

### 1.1 算术表达式

```
clog(1+2)
```

### 变量及其输入

输入底面半径、和高 h,输出圆柱体的表面积,保留 3 位小数,格式见样例。

```js
let f = (r, h) => {
  return r * r * Math.PI * h
}
```

### 顺序结构程序设计

输入一个三位数,分离出它的百位、十位和个位,反转后输出。

```js
let f = (n) => {
  let m
  let res = []
  while (n > 10) {
    m = n % 10
    res.unshift(m)
    n = Math.floor(n / 10)
  }
  res.unshift(n)
  return res
}
```

输入两个整数 a 和 b,交换二者的值.

```js
let f = (a, b) => {
  let t = a
  a = b
  b = t
  // [a, b] = [b, a]
  // a = a + b
  // b = a - b
  // a = a - b
}
```

### 分支结构程序设计

已知鸡和兔的总数量为 n,总腿数为 m。输入 n 和 m,依次输出鸡的数目和兔的数目。

```js
let f = (n, m) => {
  // a + b = n
  // 2a + 4b = m
  // a = n - b
  // 2(n -b) + 4b = m
  // 2n - 2b + 4b = m
  // 2n + 2b = m
  // b = (m - 2n) / 2
  let b = (m - 2n) / 2
  let a = n - b
  return [a, b]
}
```

输入 3 个整数,从小到大排序后输出。

```js
let f = (a, b, c) => {
  let arr = [a, b, c].sort((a, b) => a - b)
  return arr
}
```

### 注解与习题

输入 3 个整数,输出它们的平均值,保留 3 位小数。

```js
let f = (a, b, c) => {
  return ((a + b + c) / 3).toFixed(3)
}
```

输入华氏温度 f,输出对应的摄氏温度 c,保留 3 位小数。提示:c=5(f-32)/9。

```js
let f = (f) => {
  let c = (5 * (f - 32)) / 9
  c = c.toFixed(3)
  return c
}
```

输入正整数 n,输出 1+2+………+n 的值。提示:目标是解决问题,而不是练习编程。

```js
let f = (n) => {
  let r = 0
  for (let i = 0; i < n; i++) {
    r += i
  }
  return r
}
```

输入正整数 n (≤360),输出 n 度的正弦、余弦函数值。提示:使用数学函数。

```js
let f = (n) => {
  let r = n / 360 // 弧度
  return [Math.sin(r), Math.cos(r)]
}
```

一件衣服 95 元,若消费满 300 元,可打八五折。输入购买衣服件数,输出需要支付的
金额(单位:元),保留两位小数。

```js
let f = (n) => {
  let yuanjia = n * 95
  let r = 0
  if (yuanjia >= 300) {
    r = yuanjia * 0.85
  } else {
    r = yuanjia
  }
  r = r.toFixed(2)
  return r
}
```

输入三角形 3 条边的长度值(均为正整数),判断是否能为直角三角形的 3 个边长。
如果可以,则输出 yes,如果不能,则输出 no。如果根本无法构成三角形,则输出 not a triangle。

```js
let f = (a, b, c) => {
  let arr = [a, b, c].sort((a, b) => a - b)
  let r = ''
  if (arr[0] * arr[0] + arr[1] * arr[1] === arr[2] * arr[2]) {
    r = 'yes'
  } else {
    r = 'no'
  }
  return r
}
```

输入年份,判断是否为闺年。如果是,则输出 yes,否则输出 no。
提示:简单地判断除以 4 的余数是不够的。

```js
let f = (n) => {
  let r = ''
  if (n % 100) {
    if (n % 4) {
      r = 'no'
    } else {
      r = 'yes'
    }
  } else {
    if (n % 400) {
      r = 'no'
    } else {
      r = 'yes'
    }
  }
  return r
}
```

## 第 2 章 循环结构程序设计

### for 循环

for (初始化;条件;调整) 方法体
输出所有形如 aabb 的 4 位完全平方数(即前两位数字相等,后两位数字也相等)。

```js
let f = () => {
  let arr = []
  for (let i = 1; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      arr.push(i * 1000 + i * 100 + j * 10 + j) // 可能需要调整。什么是完全平方数
    }
  }
  return arr
}
```

### while 循环和 do-while 循环

对于任意大于 1 的自然数 n,若 n 为奇数,则将变为 3n+1,否则变为 n 的一
半。经过若干次这样的变换,一定会使 n 变为 1。例如,3→10→5→16→8→4→2→1。

```js
let f = (n) => {
  if (n === 1) {
    return n
  }
  if (n % 2) {
    return f(3 * n + 1)
  } else {
    return f(n / 2)
  }
}
```

计算 pi/4=1-1/3+1/5-1/7+...直到最后一项小于 10^-6。

```js
let f = () => {
  let a = Math.PI / 4
  let b = 0
  let i = 0
  let n = 1 / (2 * i + 1)
  let p = 1 / 1000000
  while (n > p) {
    if (i % 2) {
      b += n
    } else {
      b -= n
    }
    i++
    n = 1 / (2 * i + 1)
  }
  return a === b
}
```

### 循环的代价

输入 n,计算 S = 1! + 2! +3! +………+ n!的末 6 位(不含前导 0)。n≤10^6, n!表示前个
正整数之积。

```js
let _f = (n) => {
  let r = 1
  for (let i = 1; i <= n; i++) {
    r *= i
  }
  return r
}
let f = (n) => {
  let r = 0
  for (let i = 1; i <= n; i++) {
    r += _f(n)
  }
  return r
}
let f = (n) => {
  // let dp = [1]
  // dp[i] = dp[i - 1] + i!
  // 阶乘
  // 1 2 3 4
  // 1 2 6 24
  // 1 3 9 33
  // let dp = new Array(n + 1)
  // dp[0] = 1
  // dp[1] = 1
  // for (let i = 2; i <= n; i++) {
  //     dp[i] = dp[i - 1] + _f(i)
  // }
  // return dp[n]
  let dp = new Array(n + 1)
  dp[0] = 0
  dp[1] = 1
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] * i
  }
  return dp.reduce((r, c) => {
    return (r += c)
  }, 0)
}
```

### 算法竞赛中输入输出框架

输入一些整数,求出它们的最小值、最大值和平均值(保留 3 位小数)。输入保证这
些数都是不超过 1000 的整数。

```js
let f = (...arr) => {
  return [
    Math.min(...arr),
    Math.max(...arr),
    (arr.reduce((r, c) => (r += c), 0) / arr.length).toFixed(3),
  ]
}
```

### 注解与习题

输出 100~999 中的所有水仙花数。若 3 位数 ABC 满足 ABC=A^3+B^3+C^3,则称其为水仙
花数。例如 153=1³+5³+3³,所以 153 是水仙花数。

```js
let f = () => {
  let r = []
  for (let i = 1; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      for (let k = 0; k <= 9; k++) {
        let t = i * 100 + j * 10 + k
        if (t === Math.pow(i, 3) + Math.pow(j, 3) + Math.pow(k, 3)) {
          r.push(t)
        }
      }
    }
  }
  return r
}
```

相传韩信才智过人,从不直接清点自己军队的人数,只要让士兵先后以三人一排、五人
一排、七人一排地变换队形,而他每次只掠一眼队伍的排尾就知道总人数了。输入包含多组数
据,每组数据包含 3 个非负整数 abc, 表示每种队形排尾的人数(a<3, b<5, <7),输出总
人数的最小值(或报告无解)。已知总人数不小于 10,不超过 100。输入到文件结束为止。

```js
let f = (a, b, c) => {
    // n % 3 = a
    // n % 5 = b
    // n % 7 = c
    let r = 'no answer'
    for (let i >= 10; i < 100; i++) {
        if (i % 3 === a && i % 5 === b && i % 7 === c) {
            r = i
            break;
        }
    }
    return r
    // for (let i = 9 + a; i < 100; i += 3) {
    //     if (i % 5 === b && i % 7 === c) {
    //         r = i
    //         break;
    //     }
    // }
    // return r
}
```

输入正整数 n≤20,输出一个 n 层的倒三角形。例如,n=5 时输出如下:

```
#########
 #######
  #####
   ###
    #
```

```js
let f = (n) => {
  // 用2个dp表处理
  // 9 7 5 3 1
  let dpa = Array.from({ length: n }, (item, index) => 2 * index + 1).reverse()
  let dpb = new Array(n).fill(0).map((item, index) => index)
  let res = []
  for (let i = 0; i < n; i++) {
    res.push(' '.repeat(dpb[i]) + '#'.repeat(dpa[i]))
  }
  return res
}
```

输入两个正整数`n<m<10^6`,输出`1/n²+1/(n+1)²+...+1/m²` 保留 5 位小数。输入包含多组数据,结束标记为 n=m=0。提示:本题有陷阱。

```js
let f = (n, m) => {
  let r = 0
  for (let i = n; i <= m; i++) {
    r += Number((1 / Math.pow(i, 2)).toFixed(5))
  }
  return r
}
```

输入正整数 a, b, c,输出 a/b 的小数形式,精确到小数点后 c 位。a,b≤10^6, c≤100。
输入包含多组数据,结束标记为 a=b=c=0

```js
let f = (a, b, c) => {
  return (a / b).toFixed(c)
}
```

用 1,2,3,……9 组成 3 个三位数 abc, def 和 ghi,每个数字恰好使用一次,要求 abc:def:ghi=1:2:3。按照“abc def ghi”的格式输出所有解,每行一个解。提示:不必太动脑筋。

```js
let f = () => {
  let res = []
  for (let i = 123; i < 328; i++) {
    // i, 2 * i, 3 * i
    // if (3 * i < 999)
    let set = new Set()
    String(i)
      .split('')
      .forEach((item) => {
        set.add(item)
      })
    String(2 * i)
      .split('')
      .forEach((item) => {
        set.add(item)
      })
    String(3 * i)
      .split('')
      .forEach((item) => {
        set.add(item)
      })
    if (set.size === 9) {
      res.push([i, 2 * i, 3 * i])
    }
  }
  return res
}
```

## 第 3 章 数组和字符串

开灯问题。有 n 盏灯,编号为 1~n。第 1 个人把所有灯打开,第 2 个人按下所有编号为
2 的倍数的开关(这些灯将被关掉),第 3 个人按下所有编号为 3 的倍数的开关(其中关掉
的灯将被打开,开着的灯将被关闭),依此类推。一共有 k 个人,问最后有哪些灯开着?
输入 n 和 k, 输出开着的灯的编号。k≤n≤1000。

```js
let f = (n, k) => {
  let res = new Array(n + 1).fill(false)
  let i = 1
  while (i <= k) {
    for (let j = i; j <= n; j += j) {
      res[j] = !res[j]
    }
    i++
  }
  return res
    .map((item, index) => {
      if (item) {
        return index
      }
    })
    .filter((item) => item)
}
```

蛇形填数。在 n×n 方阵里填入 1, 2, …., n×n,要求填成蛇形。例如,n=4 时方阵为:

```
10 11 12 1
9  16 13 2
8  15 14 3
7  6  5  4
```

```js
// 一圈一圈地画
let f = (n) => {
  if (n === 1) {
    return [[1]]
  } else {
    let i = 0,
      x = 0,
      y = 0
    let arr = Array.from({ length: n }, () => Array.from({ length: n }).fill(0))
    let rotate = 1
    while (i < n * n && rotate <= n / 2) {
      x = rotate - 1
      y = rotate - 1
      while (x < n - rotate) {
        arr[x][y] = ++i
        x++
      }
      while (y < n - rotate) {
        arr[x][y] = ++i
        y++
      }
      while (x >= rotate) {
        arr[x][y] = ++i
        x--
      }
      while (y >= rotate) {
        arr[x][y] = ++i
        y--
      }
      rotate++
    }
    if (n % 2) {
      arr[x + 1][y + 1] = n * n
    }
    return arr
  }
}
f = (n, m) => {
  if (n === 1 && m === 1) {
    return [[1]]
  } else {
    let i = 0,
      x = 0,
      y = 0,
      rotate = 1
    let rotateCount = Math.floor(Math.min(n, m) / 2)
    let big = Math.max(n, m)
    let arr = Array.from({ length: n }, () =>
      Array.from({ length: m }, () => 0)
    )
    while (i < n * m && rotate <= rotateCount) {
      x = rotate - 1
      y = rotate - 1
      while (x < n - rotate) {
        arr[x][y] = ++i
        x++
      }
      while (y < m - rotate) {
        arr[x][y] = ++i
        y++
      }
      while (x >= rotate) {
        arr[x][y] = ++i
        x--
      }
      while (y >= rotate) {
        arr[x][y] = ++i
        y--
      }
      rotate++
    }
    if (n === 1 || m === 1) {
    } else {
      x++
      y++
    }
    if (n > m) {
      let k = 0
      while (k < big - (rotate - 1) * 2) {
        arr[x][y] = ++i
        x++
        k++
      }
    } else if (n < m) {
      let k = 0
      while (k < big - (rotate - 1) * 2) {
        arr[x][y] = ++i
        y++
        k++
      }
    }
    return arr
  }
}
```

### 字符数组

### 竞赛题目选讲

输入一个字符串,判断它是否为回文串以及镜像串。

```js
let f = (s) => {
  let t = s.split('').reverse().join('')
  return t === s
}
let f = (s) => {
  let arr = s.split('')
  let res = true
  if (arr.length % 2) {
    arr.splice(Math.floor(arr.length / 2), 1)
  }
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    if (arr[i] !== arr[arr.length - 1 - i]) {
      res = false
      break
    }
  }
  return res
}
let map = new Map([
  ['A', 'A'],
  ['B', ''],
  ['C', 'A'],
  ['D', 'A'],
  ['E', '3'],
  ['F', ''],
  ['G', ''],
  ['H', 'H'],
  ['I', 'I'],
  ['J', 'L'],
  ['K', ''],
  ['L', 'J'],
  ['M', 'M'],
  ['N', ''],
  ['O', 'O'],
  ['P', ''],
  ['Q', ''],
  ['R', ''],
  ['S', '2'],
  ['T', 'T'],
  ['U', 'U'],
  ['V', 'V'],
  ['W', 'W'],
  ['X', 'X'],
  ['Y', 'Y'],
  ['Z', '5'],
  ['1', '1'],
  ['2', 'S'],
  ['3', 'E'],
  ['4', ''],
  ['5', 'Z'],
  ['6', ''],
  ['7', ''],
  ['8', '8'],
  ['9', ''],
])
let f = (s) => {
  let arr = s.split('') // .reverse()
  let m = Math.floor(arr.length / 2)
  if (arr.length % 2) {
    if (!map.get(arr[m])) {
      return false
    }
  } else {
    for (let i = 0; i < m; i++) {
      if (map.get(arr[i]) !== arr[arr.length - 1 - i]) {
        return false
      }
    }
    return true
  }
}
```

实现一个经典“猜数字”游戏。给定答案序列和用户猜的序列,统计有多少数字位置正确(A),有多少数字在两个序列都出现过但位置不对(B)。

```js
let f = (s1, s2) => {
  let res = []
  for (let i = 0; i < s1.length; i++) {
    if (s1.charAt(i) === s2.charAt(i)) {
      res.push(s1.charAt(i))
    }
  }
  return res.length
}
let f = (s1, s2) => {
  let arr1 = s1.split('')
  let arr2 = s2.split('')
  let res = []
  arr1.forEach((item, index) => {
    if (arr2.include(item) && item !== arr2[index]) {
      res.push(item)
    }
  })
  return res
}
```

如果 x 加上 x 的各个数字之和得到 y,就说 x 是 y 的生成元。给出 n(1≤n≤100000),
求最小生成元。无解输出 0。例如,n=216, 121, 2005 时的解分别为 198,0,1979。

```js
let f = (n) => {
  let i = 1 // 几位数
  let t = n
  while (t > 10) {
    t = t / 10
    i++
  }
  let res = 0
  for (let p = n - i * 9; p < n; ) {
    let pOrigin = p
    let sumNumber = 0
    while (p > 1) {
      sumNumber += Math.floor(p % 10)
      p /= 10
    }
    p = pOrigin
    if (p + sumNumber === n) {
      res = p
      break
    } else {
      p++
    }
  }
  return res
}
```

长度为”的环状串有 n 种表示法,分别为从某个位置开始顺时针得到。例如,图 3-4 的环状串有 10 种表示: CGAGTCAGCT, GAGTCAGCTC,AGTCAGCTCG 等。在这些表示法中,字典序最小的称为“最小表示”。
输入一个长度为 n (ヵ ≤100)的环状 DNA 串(只包含 A、C、G、T
这 4 种字符)的一种表示法,你的任务是输出该环状串的最小表示。例
如,CTCC 的最小表示是 CCCT,CGAGTCAGCT 的最小表示为
AGCTCGAGTC.

```js
let f = (range) => {
  let dp = Array.from({ length: range.size }, () => '')
  dp[0] = range.getArrayByIndex(0)
  for (let i = 1; i < dp.length; i++) {
    let t = range.getArrayByIndex(i)
    // dp[i] = min(dp[i - 1], t)
    let b = false
    for (let k = 0; k < t.length; k++) {
      if (dp[i - 1][k] > t[k]) {
        dp[i] = t
        b = true
        break
      }
    }
    if (!b) {
      dp[i] = dp[i - 1]
    }
  }
  return dp[dp.length - 1]
}
```

输入一些数,统计个数。
输入一些数,求最大值、最小值和平均数。
输入一些数,哪两个数最接近。
输入一些数,求第二大的值。
输入一些数,求它们的方差。
输入一些数,统计不超过平均数的个数。

```js
// 略
let f = (...arr) => {
  let res = []
  let diff = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      let t = Math.abs(arr[i] - arr[j])
      if (diff > t) {
        diff = t
        res = [arr[i], arr[j]]
      }
    }
  }
  return res
}
let f = (...arr) => {
  if (arr.length >= 2) {
    arr.sort((a, b) => a - b)
    return arr[arr.length - 2]
  } else {
    return
  }
}
let f = (...arr) => {
  let miu =
    arr.reduce((r, c) => {
      r += c
      return r
    }, 0) / arr.length
  // todo
  // 方差怎么算
}
let f = (...arr) => {
  let miu = arr.reduce((r, c) => {
    r += c
    return r
  }, 0)
  let n = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= miu) {
      n++
    }
  }
  return n
}
```

给出一个由 O 和 X 组成的串(长度为 1~80),统计得分。每个 O 的得分为目前连续
出现的 O 的个数, X 的得分为 0。例如,OOXXOXXOOO 的得分为 1+2+0+0+1+0+0+1+2+3。

```js
let f = (s) => {
  let dp = Array.from({ length: s.length }, () => 0)
  if (s.charAt(0) === 'O') {
    dp[0] = 1
  } else {
    dp[0] = 0
  }
  for (let i = 1; i < s.length; i++) {
    if (s.charAt(i) === 'O') {
      dp[i] = dp[i - 1] + 1
    } else {
      dp[i] = 0
    }
  }
  return dp.reduce((r, c) => (r += c), 0)
}
```

给出一种物质的分子式(不带括号),求分子量。本题中的分子式只包含 4 种原子,
分别为 C, H, O, N, 原子量分别为 12.01, 1.008, 16.00, 14.01(单位:g/mol)。例如,C6H5OH
的分子量为 94.108g/mol。

```js
let map = new Map([
  ['C', 12.01][('H', 1.008)][('O', 16.0)][('N', 14.01)],
  // ...
])
let f = (s) => {
  let reg = /[A-Z]\d*/g
  let arr = s.match(reg)
  let obj = {}
  arr.forEach((item) => {
    let k = item.slice(0, 1)
    let n = Number(item.slice(1)) || 1
    if (Object.keys(obj).includes(k)) {
      obj[k] += n
    } else {
      obj[k] = n
    }
  })
  return Object.entries(obj) // [[k, v], ...]
    .reduce((r, [k, v]) => {
      r += map.get(k) * v
      return r
    }, 0)
}
```

把前 n(n≤10000)个整数顺次写在一起:123456789101112･…･数一数 0~9 各出现多少
次(输出 10 个整数,分别是 0,1,…,9 出现的次数)。

```js
let f = (n) => {
  let s = ''
  for (let i = 1; i <= n; i++) {
    s += String(i)
  }
  let map = new Map([
    ['0', 0],
    ['1', 0],
    ['2', 0],
    ['3', 0],
    ['4', 0],
    ['5', 0],
    ['6', 0],
    ['7', 0],
    ['8', 0],
    ['9', 0],
  ])
  for (let i = 0; i < s.length; i++) {
    let t = map.get(s.charAt(i))
    map.set(s.charAt(i), ++t)
  }
  return map
}
```

如果一个字符串可以由某个长度为 k 的字符串重复多次得到,则称该串以 k 为周期。例如,abcabcabcabc 以 3 为周期(注意,它也以 6 和 12 为周期)。
输入一个长度不超过 80 的字符串,输出其最小周期。

```js
let f = (s) => {
  s.charAt(0)
  let arr = s.split('')
  let r = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[0] === arr[i]) {
      r.push(i)
      // break
    }
  }
  for (let i = 0; i < r.length; i++) {
    s.slice(0, i)
    if (!(r.length % i) && Math.floor(r.length / i) * s.slice(0, i) === s) {
      return r[i]
    }
  }
}
```

有一个 5\*5 的网格,其中恰好有一个格子是空的,其他格子各有一个字母。一共有 4 种指令:A, B, L, R,分别表示把空格上、下、左、右的相邻字母移到空格中。输入初始网格和指令序列(以数字 0 结束),输出指令执行完毕后的网格。如果有非法指令,应输出“This puzzle has no final configuration.”,例如,图 3-5 中执行 ARRBBL0 后,效果如图 3-6 所示。

```js
// 看不懂
```

输入一个 r 行 c 列 (1≤r, c≤10)的网格,黑格用“\*”表示,每个白格都填有一个字母。如果一个白格的左边相邻位置或者上边相邻位置没有白格(可能是黑格,也可能出了网格边界),则称这个白格是一个起始格。

```js
// 看不懂
```

输入 m 个长度均为 n 的 DNA 序列,求一个 DNA 序列,到所有序列的总 Hamming 距离尽量小。两个等长字符串的 Hamming 距离等于字符不同的位置个数,例如,ACGT 和 GCGA 的 Hamming 距离为 2(左数第 1,4 个字符不同)。
输入整数 m 和 n (4≤m≤50,4≤n≤1000),以及 m 个长度为 n 的 DNA 序列(只包含字母 A, C, G,T),输出到 m 个序列的 Hamming 距离和最小的 DNA 序列和对应的距离。如有多解,要求为字典序最小的解。例如,对于下面 5 个 DNA 序列,最优解为 TAAGATAC.
TATGAТАС
TAAGCТАС
AAAGATCC
TGAGATAС
TAAGATGT

```js
let f = (...arr) => {
  let m = arr.length
  let n = arr[0].length
  let res = ''
  // m个长度为n的dna序列
  for (let j = 0; j < n; j++) {
    let o = new Map([
      ['A', 0],
      ['C', 0],
      ['G', 0],
      ['T', 0],
    ])
    for (let i = 0; i < m; i++) {
      let t = o.get(arr[i][j])
      o.set(arr[i][j], ++t)
    }
    let max = Math.max(o.get('A'), o.get('C'), o.get('G'), o.get('T'))
    if (o.get('A') === max) {
      res += 'A'
    } else if (o.get('C') === max) {
      res += 'C'
    } else if (o.get('G') === max) {
      res += 'G'
    } else if (o.get('T') === max) {
      res += 'T'
    }
  }
  return res
}
```

输入整数 a 和 b (0≤a≤3000,1≤b≤3000),输出 a/b 的循环小数表示以及循环节长度。例如 a=5,b=43,小数表示为 0.(116279069767441860465),循环节长度为 21。

```js
// 不会
```

输入两个字符串 s 和 t, 判断是否可以从 t 中删除 0 个或多个字符(其他字符顺序不变),得到字符串 s。例如, abcde 可以得到 bce,但无法得到 dc。

```js
let f = (s, t) => {
  if (s.length < t.length) {
    let dp = [] // 保存第i个字母在t串中的下标
    for (let i = 0; i < s.length; i++) {
      for (let j = (dp[i - 1] || -1) + 1; j < t.length; j++) {
        if (s.charAt(i) === t.charAt(j)) {
          dp[i] = j
          break
        }
      }
    }
    return dp.length === s.length
  } else {
    return false
  }
}
```

给定 6 个矩形的长和宽 wi 和 hi (1≤wi, hi≤1000),判断它们能否构成长方体的 6 个面。

```js
// 未验证
let f = (w0, w1, w2, h0, h1, h2) => {
  let o = {}
  if (o[w0]) {
    o[w0]++
  } else {
    o[w0] = 1
  }
  if (o[w1]) {
    o[w1]++
  } else {
    o[w1] = 1
  }
  if (o[w2]) {
    o[w2]++
  } else {
    o[w2] = 1
  }
  if (o[h0]) {
    o[h0]++
  } else {
    o[h0] = 1
  }
  if (o[h1]) {
    o[h1]++
  } else {
    o[h1] = 1
  }
  if (o[h2]) {
    o[h2]++
  } else {
    o[h2] = 1
  }
  if (Object.keys(o).length === 3) {
    return true
  } else {
    return false
  }
}
```

给出两个长度分别为 n1, n2 (n1, n2≤100) 且每列高度只为 1 或 2 的长条。需要将它们放入一个高度为 3 的容器(如图 3-8 所示),问能够容纳它们的最短容器长度。

```js
// 看不懂题
```

计算机常用阶码-尾数的方法保存浮点数。如图 3-9 所示,如果阶码有 6 位,尾数有 8
位,可以表达的最大浮点数为 0.111111111₂×211。注意小数点后第一位必须为 1,所以
一共有 9 位小数。

```js
// 看不懂题
```

## 第 4 章 函数和递归

计算组合数。编写函数,参数是两个非负整数 n 和 m,返回组合数 C(m, n)=n! / (m!(n-m)!)
其中 m≤n≤25。例如,n=25,m=12 时答案为 5200300。

```js
// 计算阶乘
let o = {}
let fn = (n) => {
  if (o[n]) {
    return o[n]
  } else {
    let t = 1
    for (let i = 1; i <= n; i++) {
      t *= i
    }
    return (o[n] = t)
  }
}
let f = (n, m) => {
  return fn(n) / (fn(m) * fn(n - m))
}
```

对复杂的表达式进行化简有时不仅能减少计算量,还能减少甚至避免中间结果溢出。

素数判定

```js
let f = (n) => {
  // 0 不是素数。 1 是素数
  if (n < 1) {
    return 0
  } else {
    let m = Math.floor(Math.sqrt(n) + 0.5)
    for (let i = 2; i <= m; i++) {
      if (!(n % i)) {
        return 0
      }
    }
    return 1
  }
}
```

给定两个长度相同且不超过 100 的字符串,判断是否能把其中一个字符串的各个字母重排,然后对 26 个字母做一个一一映射,使得两个字符串相同。例如,JWPUDJSTVP 重排后可以得到 WJDUPSJPVT,然后把每个字母映射到它前一个字母 (B->A, C->B, …', Z->Y,A->Z),得到 VICTORIOUS。输入两个字符串,输出 YES 或者 NO。

```js
let f = (s1, s2) => {}
```

快速排序 qsort
但要注意为递归函数编写终止条件,否则将产生无限递归。

n(n≤20)个人站成一圈,逆时针编号为 1~n。有两个官员,A 从 1 开始逆时针数,B 从 n 开始顺时针数。在每一轮中,官员 A 数 k 个就停下来,官员 B 数 m 个就停下来(注意有可能两个官员停在同一个人上)。接下来被官员选中的人(1 个或者 2 个)离开队伍。如,输入 n, k, m 输出每轮里被选中的人的编号(如果有两个人,先输出被 A 选中的)。例 n=10,k=4,m=3,输出为 48,95, 3 1, 2 6, 10,7。注意:输出的每个数应当恰好占 3 列。

```js
// 看不懂这个题的答案
// 未验证
let f = (n, k, m) => {
  let arr = []
  for (let i = 1; i <= n; i++) {
    arr.push(i)
  }
  let i = 0
  let j = n - 1
  let res = []
  while (arr.length) {
    i += k
    let _i = i % arr.length
    j -= m
    while (j < 0) {
      j += arr.length
    }
    let _j = j % arr.length
    if (_i === _j) {
      res.push(...arr.splice(_i, 1))
    } else {
      res.push(...arr.splice(_i, 1))
      if (_i < _j) {
        _j--
      }
      res.push(...arr.splice(_j, 1))
    }
  }
  return res
}
```

有一个行 c 列 (1≤r, c≤50)的电子表格,行从上到下编号为 1~r,列从左到右编号为 1~c。如图 4-2(a)所示,如果先同时删除第 1、5 行,然后同时删除第 3,6,7,9 列,结果如图 4-2 (b)所示。
接下来同时在第 2、3、5 行前各插入一个空行,然后同时在第 3 列前插入一个空列,会得到如图 4-3 所示结果。
你的任务是模拟这样的 n 个操作。具体来说一共有 5 种操作:

- EX-r1,c1,r2,c2 交换单元格(r1,c1), (r2,c2)。
- DC-A 删除 A 列,1≤A≤ 最大列
- DR-A 删除 A 行,1≤A≤ 最大行
- IC-A 在 A 列插入 1 列,1≤A≤ 最大列
- IR-A 在 A 行插入 1 行,1≤A≤ 最大行

```js
// 未测试
let arr = []
let init = (r, c) => {
    arr = Array.from({length: r}, () => Array.from({length: c}, () => 0))
    let t = 0
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            arr[i][j] = ++t
        }
    }
}
let f = (command) => {
    let EXFn = (s) => {
        let [r1, c1, r2, c2] = s.split(',')
        let t = arr[r1][c1]
        arr[r1][c1] = arr[r2][c2]
        arr[r2][c2] = t
    }
    let DCFn = (n) => { // 删除A列
        for (let i = 0; i < arr.length; i++) {
            arr[i][n] = ''
        }
    }
    let DRFn = (n) => {
        for (let i = 0; i < arr[0].length; i++) {
            if (i === n) {
                arr[i] = Array.from({length: arr[0].length}, () => '')
                break;
            }
        }
    } // 删除A行
    let ICFn = (n) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i].split(n, 0, '')
        }
    } // 在A列插入1列
    let IRFn = (n) => {
        for (let i = 0; i < arr.len)
        arr.split(n, '', Array.from({length: arr[0].length}, () => ''))
    } // 在A行插入1行
    let commandMap = new Map([
        ['EX-', EXFn],
        ['DC-', DCFn],
        ['DR-', DRFn],
        ['IC-', ICFn],
        ['IR-', IRFn],
    ])
    commandMap.get(command.slice(0, 3))(command.slice(3))
}
```

考虑一个象棋残局,其中红方有 n (2≤≤7)个棋子,黑方只有一个将。红方除了有一个帅(G)之外还有 3 种可能的棋子:车 (R),马(H),炮(C),并且需要考虑“整马腿”(如图 4-4 所示)与将和帅不能照面(将、帅如果同在一条直线上,中间又不隔着任何棋子的情况下,走子的一方获胜)的规则。输入所有棋子的位置,保证局面合法并且红方已经将军。你的任务是判断红方是否已经把黑方将死。关于中国象棋的相关规则请参见原题。

```js
let f = (
  hong = {
    ju1: [1, 2],
    ju2: [1, 3],
    ma1: [1, 4],
    ma2: [1, 8],
    pao1: [1, 6],
    pao2: [1, 7],
    shuai: [1, 5],
  },
  hei = {
    jiang: [9, 5],
  }
) => {
  let pan = [
    ['', '', '', '', '', '', '', '', ''], // 0
    ['', '', '', '', '', '', '', '', ''], // 1
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],

    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''], // 7
    ['', '', '', '', '', '', '', '', ''], // 8
    ['', '', '', '', '', '', '', '', ''], // 9
    //   0   1   2   3   4   5
  ]
  // 放置棋子
  Object.keys(hong).forEach((qiZi) => {
    let position = hong[qiZi] // [1, 2]
    pan[position[0]][position[1]] = qiZi
  })
  //
  let jiangRound = new Map({
    73: [74, 83],
    74: [73, 75, 84],
    75: [74, 85],
    83: [73, 84, 93],
    84: [74, 83, 85, 94],
    85: [75, 84, 95],
    93: [83, 94],
    94: [84, 93, 95],
    95: [85, 94],
  })
  // 棋子可运行的位置
  let map = new Map()
  // let qiZiCate = ju | ma | pao
  Object.keys(hong).forEach((qiZi) => {
    let qiZiCate = qiZi.slice(0, -1)
    // 不会
    // if (qiZiCate === 'ju') {
    //     map.set(qiZi, [])
    //     pan.forEach()
    //     qiZiCate
    // }
    // if (qiZiCate === 'ma') {}
    // if (qiZiCate === 'pao') {}

    // ju1List
    // ju2List
    // ma1List
    // ma2List
    // pao1List
    // pao2List
  })
}
```

有 n 行 n 列 (2≤n≤9)的小黑点,还有 m 条线段连接其中的一些黑点。统计这些线段
连成了多少个正方形(每种边长分别统计)
行从上到下编号为 1~n,列从左到右编号为 1~n。边用 Hij 和 Vij 表示,分别代表边(ij)-(ij+1)和(ij)-(i+1.j)。如图 4-5 所示最左边的线段用 V11 表示。图中包含两个边长为 1 的正方形和一个边长为 2 的正方形。

```js
let arr = [
  [['H', 'V'], ['V'], ['H'], ['V']],
  [['H'], ['H', 'V'], ['H', 'V'], ['V']],
  [[], ['H', 'V'], [], ['V']],
  [[], ['H'], ['H'], []],
]
let f = (n, state) => {
  let res = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = Math.max(i, j) + 1; k < n; k++) {
        // 延长到k
        let boolArr = []
        // 上
        let t = j
        let pointArr = []
        while (t < k) {
          pointArr.push(arr[i][t])
          t++
        }
        if (pointArr.every((p) => p.includes('H'))) {
          boolArr.push(true)
        } else {
          // boolArr.push(false)
          break
        }
        // 下
        t = j
        pointArr = []
        while (t < k) {
          pointArr.push(arr[k][t])
          t++
        }
        if (pointArr.every((p) => p.includes('H'))) {
          boolArr.push(true)
        } else {
          // boolArr.push(false)
          break
        }
        // 左
        t = i
        pointArr = []
        while (t < k) {
          pointArr.push(arr[t][j])
          t++
        }
        if (pointArr.every((p) => p.includes('V'))) {
          boolArr.push(true)
        } else {
          // boolArr.push(false)
          break
        }
        // 右
        t = i
        pointArr = []
        while (t < k) {
          pointArr.push(arr[t][k])
          t++
        }
        if (pointArr.every((p) => p.includes('V'))) {
          boolArr.push(true)
        } else {
          // boolArr.push(false)
          break
        }
        // 总
        if (boolArr.every((item) => item)) {
          res.push([[i, j], k])
        }
      }
    }
  }
  return res
}
```

你的任务是模拟黑白棋游戏的进程。黑白棋的规则为:黑白双方轮流放棋子,每次必须让新放的棋子“夹住”至少一枚对方棋子,然后把所有被新放棋子“夹住”的对方棋子替换成己方棋子。一段连续(横、竖或者斜向)的同色棋子被“夹住”的条件是两端都是对方棋子(不能是空位)。如图 4-6 (a)所示,白棋有 6 个合法操作,分别为(2,3),(3,3),(3,5),(6,2),(7,3),(7,4)。选择在(7,3)放白棋后变成如图 4-6(b)所示效果(注意有竖向和斜向的共两枚黑棋变白)。注意(4,6)的黑色棋子虽然被夹住,但不是被新放的棋子夹住,因此不变白。输入一个 8\*8 的棋盘以及当前下一次操作的游戏者,处理 3 种指令:
□L 指令打印所有合法操作,按照从上到下,从左到右的顺序排列(没有合法操作时输出 No legal move)。
미 Mrc 指令放一枚棋子在(r,c)。如果当前游戏者没有合法操作,则是先切换游戏者再操作。输入保证这个操作是合法的。输出操作完毕后黑白方的棋子总数。
□Q 指令退出游戏,并打印当前棋盘(格式同输入)。

```js
// 看不懂
// 初始化
let arr = []
let f = (n = 8) => {
  arr = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => 0)
  )
  // 0 无棋子  1 白棋子  2 黑棋子
}
// 判断是否合法
let f = (r, c) => {
  let base = arr[(r, c)]
  // 判断8个方向。
  // 至少一个合法。
  // 右下
  let boolArr = []
  for (let i = r; i < arr.length; i++) {
    for (let j = c; j < arr[0].length; j++) {
      // 存在相同颜色
      if (arr[i][j] === base) {
        boolArr.push(true)
        break
      }
    }
  }
  boolArr.push(false)
  // 下
  for (let i = r; i < arr.length; i++) {
    if (arr[i][c] === base) {
      boolArr.push(true)
      break
    }
  }
  boolArr.push(false)
  // 左下
  for (let i = r; i < arr.length; i++) {
    for (let j = c; j > 0; j--) {
      if (arr[i][j] === base) {
        boolArr.push(true)
        break
      }
    }
  }
  boolArr.push(false)
  // 左
  for (let j = c; j > 0; j--) {
    if (arr[r][j] === base) {
      boolArr.push(true)
      break
    }
  }
  boolArr.push(false)
  // 左上
  for (let i = r; i > 0; i--) {
    for (let j = c; j > 0; j--) {
      boolArr.push(true)
      break
    }
  }
  boolArr.push(false)
  // 上
  for (let i = r; i > 0; i--) {
    if (arr[i][c] === base) {
      boolArr.push(true)
      break
    }
  }
  boolArr.push(false)
  // 右上
  for (let i = r; i > 0; i--) {
    for (let j = c; j < arr[0].length; j++) {
      // 存在相同颜色
      if (arr[i][j] === base) {
        boolArr.push(true)
        break
      }
    }
  }
  boolArr.push(false)
  // 右
  for (let j = 0; j < arr[0].length; j++) {
    if (arr[r][j] === base) {
      boolArr.push(true)
      break
    }
  }
  boolArr.push(false)
  // 总
  if (boolArr.every((item) => !item)) {
    return 'No legal move'
  } else {
    return true
  }
}
```

输入两个骰子,判断二者是否等价。每个骰子用 6 个字母表示,如图 4-7 所示。
例如 rbgggr 和 rggbgr 分别表示如图 4-8 所示的两个骰子。二者是等价的,因为图 4-8 (a)所示的骰子沿着竖直轴旋转 90° 之后就可以得到图 4-8(b)所示的骰子。

```js
// 看不懂题
```

ip 网络
莫尔斯电码
raid 技术
特别困的学生
课堂上有个学生(n≤10)。每个学生都有一个“睡眠-清醒”周期,其中第 i 个学生
醒 Ai 分钟后睡 Bi 分钟,然后重复 (1≤Ai,Bi≤5),初始时第 i 个学生处在他的周期的第
C 分钟。每个学生在临睡前会察看全班睡觉人数是否严格大于清醒人数,只有这个条件满
足时才睡觉,否则就坚持听课 Ai 分钟后再次检查这个条件。问经过多长时间后全班都清醒。
如果用(A,B,C)描述一些学生,则图 4-11 中描述了 3 个学生(2,4,1)、(1,5,2)和(1,4,3)在每个时刻的行为。
图 4-11 3 个学生每个时刻的行为
注意:有可能并不存在“全部都清醒”的时刻,此时应输出-1。

```js
// 简单测试，通过。
let f = (
  arr = [
    // [a, b, c]
  ]
) => {
  // 阈值设为 8 * 60min
  let dp = Array.from({ length: arr.length }, () => []) // 0 清醒   1 睡眠
  let i = 1
  for (let j = 0; j < arr.length; j++) {
    let tArr = []
    let t = 0
    while (t < arr[j][0]) {
      tArr.push(0)
      t++
    }
    t = 0
    while (t < arr[j][1]) {
      tArr.push(1)
      t++
    }
    dp[j] = tArr.slice(arr[j][2] - 1)
  }
  let j = 0
  let tArr = []
  while (j < dp.length) {
    tArr.push(dp[j].length)
    j++
  }
  i = Math.min(...tArr)
  while (i < 8 * 60 + 1) {
    let k = 0
    while (k < arr.length) {
      let length = dp[k].length
      if (length <= i) {
        switch (dp[k][length - 1]) {
          case 0: // 要睡觉
            let activeCount = 0
            let sleepCount = 0
            for (let j = 0; j < arr.length; j++) {
              switch (dp[j][i - 1]) {
                case 0:
                  activeCount++
                  break
                case 1:
                  sleepCount++
                  break
              }
            }
            if (sleepCount > activeCount) {
              dp[k].push(...Array.from({ length: arr[k][1] }, () => 1))
            } else {
              dp[k].push(...Array.from({ length: arr[k][0] }, () => 0))
            }
            break
          case 1: // 要清醒
            dp[k].push(...Array.from({ length: arr[k][0] }, () => 0))
            break
        }
      }
      k++
    }
    let sleepCount = 0
    for (let j = 0; j < dp.length; j++) {
      switch (dp[j][dp[j].length - 1]) {
        case 1:
          sleepCount++
          break
      }
    }
    if (!sleepCount) {
      return i
    }
    i++ // 可以取最短的dp[i]
  }
  return -1
}
```

有一个 n\*m (1≤m, n<30)的网格,每个格子是边长 10 米的正方形,网格四周是无限
大的墙壁。输入每个格子的海拔高度,以及网格内雨水的总体积,输出水位的海拔高度以
及有多少百分比的区域有水(即高度严格小于水平面)。

```js
// 未测试
let f = (arr, v) => {
  // 默认arr已正向排序
  let p, h
  // dp[i] // 表示第i个网格开始被淹需要的水量
  let dp = []
  dp[0] = 0
  for (let i = 0; i < arr.length - 1; i++) {
    dp[i] = arr[i + 1] - arr[i] * 100 * (i + 1)
  }
  let j = 0
  for (let i = dp.length - 1; i >= 0; i--) {
    if (dp[i] < v) {
      j = i
    }
  }
  p = (j + 1) / dp.length
  let x = v - dp[j] / (100 * (j + 1))
  h = arr[j] + x
  return [h, p]
}
```

## 第 5 章 C++与 STL 入门

标准模板库 (Standard Template Libra）
现有 N 个大理石,每个大理石上写了一个非负整数。首先把各数从小到大排序,然后回答个问题。每个问题问是否有一个大理石写着某个整数 x,如果是,还要回答哪个大理石上写着 x。排序后的大理石从左到右编号为 1~N。(在样例中,为了节约篇幅,所有大理石上的数合并到一行,所有问题也合并到一行。)

```js
// 略
```

vector 就是一个不定长数组。不仅如此,它把一些常用操作“封装”在了 vector 类型内
部。例如,若 a 是一个 vector,可以用 a.size()读取它的大小, a.resize()改变大小, a.push_back)
向尾部添加元素,a.pop_back()删除最后一个元素。

```js
class Vector {
  constructor(n) {
    this.arr = Array.from({ length: n }, () => null)
  }
  size() {
    return this.arr.length
  }
  resize(n) {
    let t = this.size()
    if (t === this.arr.length) {
      // null
    } else if (n < t) {
      this.arr = this.arr.slice(0, n)
    } else {
      // t < n
      let t = [...this.arr]
      while (t.length < n) {
        t.push(null)
      }
      this.arr = t
    }
  }
  push_back(v) {
    this.arr.splice(0, 1)
    this.arr.push(v)
  }
  pop_back() {
    let r = this.arr.splice(this.arr.length - 1, 1, null)
    return r
  }
}
```

从左到右有 n 个木块,编号为 0~n-1,要求模拟以下 4 种操作(下面的 a 和 b 都是木块
编号)。
☐move a onto b:把 a 和 b 上方的木块全部归位,然后把 a 放在 b 上面。
☐move a over b:把 a 上方的木块全部归位,然后把 a 放在 b 所在木块堆的顶部。
☐pile a onto b:把 b 上方的木块全部归位,然后把 a 及上面的木块整体摆在 b 上面。
☐pile a over b:把 a 及上面的木块整体擦在 b 所在木块堆的顶部。

```js
// 略
```

输入一个文本,找出所有不同的单词(连续的字母序列),按字典序从小到大输出。单词不区分大小写。

```js
let f = (str) => {
  let reg = /\b[a-zA-Z]+\b/g
  let arr = str.match(reg)
  let set = new Set(arr)
  return [...set].sort((a, b) => {
    a = a.toUpperCase()
    b = b.toUpperCase()
    let r = 0
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      r = a.charCodeAt(i) - b.charCodeAt(i)
      if (r !== 0) {
        break
      }
    }
    if (r === 0 && a.length !== b.length) {
      r = a.length - b.length
    }
    return r
  })
}
```

输入一些单词,找出所有满足如下条件的单词:该单词不能通过字母重排,得到输入文本中的另外一个单词。在判断是否满足条件时,字母不分大小写,但在输出时应保留输入中的大小写,按字典序进行排列(所有大写字母在所有小写字母的前面)。

```js
// 看不懂题
```

有个团队的人正在排一个长队。每次新来一个人时,如果他有队友在排队,那么这个
新人会插队到最后一个队友的身后。如果没有任何一个队友排队,则他会排到长队的队尾。
输入每个团队中所有队员的编号,要求支持如下 3 种指令(前两种指令可以穿插进行)。

- NQUEUE x:编号为 x 的人进入长队。
- DEQUEUE:长队的队首出队。
- STOP:停止模拟。

```js
// 略
```

丑数是指不能被 2,3,5 以外的其他素数整除的数。把丑数从小到大排列起来,结果如下:
1,2,3,4, 5, 6, 8, 9, 10, 12, 15, ...
求第 1500 个丑数。

```js
// 好像错了
let f = (n) => {
  let dp = []
  let i = 1
  while (dp.length < n) {
    if (!(i % 2) || !(i % 3) || !(i % 5)) {
      dp.push(i)
    }
    i++
  }
  return dp[n - 1]
}
```

输入正整数 n 以及 n 个文件名,排序后按列优先的方式左对齐输出。假设最长文件名有 M 字符,则最右列有 M 字符,其他列都是 M+2 字符。

```js
let f = (arr) => {
  // 最长文件名的长度
  // 每m个文件名就换行
  // let maxLengthFileName = ''
  // let fileNameArr = arr.map(item => item.length)
  let m = 0
  let maxCol = 60 // 题目中没有。书中的示例代码中有。
  arr.forEach((item) => {
    m = Math.max(m, item.length)
  })
  let col, row
  col = Math.floor((maxCol - m) / (m + 2))
  row = Math.ceil(arr.length / col)
  let res = ''
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let t = arr[i + row * j]
      if (t) {
        // 不是满行时有数据不存在。
        t += ' '.repeat(m - t.length)
        if (j === col - 1) {
          res += t + '\n'
        } else {
          res += t + '  '
        }
      }
    }
  }
  return res
}
```

输入一个”n 行 m 列的数据库(1≤n≤10000, 1≤m≤10),是否存在两个不同行 r1, r2 和两个不同列 c1, c2,使得这两行和这两列相同 (即(r1,c1)和(r2,c1)相同,(r1,c2)和 (r2,c2)相同)。例如,对于如图 5-3 所示的数据库,第 2、3 行和第 2、3 列满足要求。

```js
// 好现几个描述不严谨的题目
// 看不懂“分析”
let f = (arr) => {
  let map = new Map()
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!map.get(arr[i][j])) {
        map.set(arr[i][j], 1)
      } else {
        return '有重复'
      }
    }
  }
}
```

PGA 巡回赛的奖金
邮件传输代理的交互
城市正视图
如图 5-4 所示,有 n(≤100) 个建筑物。左侧是俯视图(左上角为建筑物编号,右下角为高度),右侧是从南向北看的正视图。图 5-4 建筑俯视图与正视图输入每个建筑物左下角坐标(即 x、y 坐标的最小值)、宽度(即 x 方向的长度)、深度(即 y 方向的长度)和高度(以上数据均为实数),输出正视图中能看到的所有建筑物,按照左下角 x 坐标从小到大进行排序。左下角 x 坐标相同时,按 y 坐标从小到大排序。输入保证不同的 x 坐标不会很接近(即任意两个 x 坐标要么完全相同,要么差别足够大,不会引起精度问题)。
（建筑物都在第一象限）

```js
// 本题最大的收获是初步认识了 “离散化” ：将无限转化为有限的方法。
// 首先，我们注意到，每个建筑物的深度在这里没有影响，因此深度是个干扰项
// 一个关键点是，题目给定的数据是实数，即浮点数，因此我们不能穷举所有的x坐标来遍历，对于无穷问题，我们需要考虑离散化，化无穷为有限
// 对于本题，离散化的关键在于，如何表示建筑物之间的互相重叠的关系
// 必须注意到，每个建筑物有2个x坐标，一个是input中直接给出的x，而另一个是我们可以通过w+x得到的“右边的x坐标”
// 通过2个坐标，我们可以首先对x去重，然后构建出相应的x轴的多个区间，这样，每一组重叠关系必然会落在我们的x区间之中。这也正是代码中x数组开2倍空间的原因，以及用途。
// 我们只需在区间内任选一点，即可作为区间的整体代表元素，来判断某个建筑是否经过了此区间，因此，可以选择比较方便的区间中点。没有经过区间代表元素的，显然不会经过该区间。经过了第5步和这一步，我们就将一个无限问题，转化为有限问题了。
// 对于每个建筑，我们考虑2点：是否经过了区间中点；是否存在y坐标小于它，且高度大于等于它的建筑。上述两点满足任何一点，则该建筑都不可见
// 其他小细节：代码 53 行的  b[j].y < b[i].y  能够保证 i != j； 53行的判定语句的顺序也可以些微提高代码效率，比如将函数调用延迟到最后一个，以降低调用概率，降低平均运行时间；unique() 函数调用前必须首先排序，因为unique函数只能对相邻元素去重，这和unique的原理有关，话说，这里的unique函数真的没有python 里的 set() 好用啊。。。
// 代码如下：
// 未测试
let f = (
  arr
  //   [{
  //     x, y,
  //     w, c, h
  //   }]
) => {
  // 排序arr 略
  // 第i个建筑是否覆盖x点
  let isCover = (i, x) => {
    return arr[i].x <= x && x <= arr[i].x + arr[i].w
  }
  // 在x点能否看到第i个建筑
  let isVisible = (i, x) => {
    if (isCover(i, x)) {
      for (let j = 0; j < arr.length; j++) {
        if (
          arr[j].y < arr[i].y && // 在i前面
          arr[j].h >= arr[i].h && // 比i高
          cover(j, x)
        ) {
          return false
        }
      }
      return true
    } else {
      return false
    }
  }
  let xList = []
  for (let i = 0; i < arr.length; i++) {
    xList[i * 2] = arr[i].x
    xList[i * 2 + 1] = arr[i].x + arr[i].w
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < xList.length; j++) {
      if (isVisible(i, (xList[j - 1] + xList[j]) / 2)) {
        // 已经判断为可见了。所以不用再看其他点了
        clog(arr[i])
        break //
      }
    }
  }
}
```

输入若干行代码,要求各列单词的左边界对齐且尽量靠左。单词之间至少要空一格。每个单词不超过 80 个字符,每行不超过 180 个字符,一共最多 1000 行,样例输入与输出如图 5-5 所示。

```js
let f = (
  arr // 一行一个元素
) => {
  // 少了洗数据。需要每行前后都无空格。
  let wordArr = arr.map((item) => {
    return item.split(' ')
  })
  let rowMaxLength = Math.max(...wordArr.map((item) => item.length))
  let dp = Array.from({ length: arr.length }, () => [])
  for (let i = 0; i < rowMaxLength; i++) {
    let tArr = []
    for (let j = 0; j < arr.length; j++) {
      if (wordArr[j][i]) {
        tArr.push(wordArr[j][i])
      }
    }
    // 这列单词的最大长度
    let wordMaxLength = Math.max(...tArr.map((item) => item.length))
    for (let j = 0; j < arr.length; j++) {
      if (wordArr[j][i]) {
        dp[j].push(
          wordArr[j][i] + ' '.repeat(wordMaxLength - wordArr[j][i].length)
        )
      } else {
        dp[j].push(' '.repeat(wordMaxLength))
      }
    }
  }
  // clog('dp', dp)
  let res = ''
  for (let i = 0; i < dp.length; i++) {
    res += dp[i].join(' ') + '\n'
  }
  return res
}
```

对于一个 n 元组(aı, a, …, an),可以对于每个数求出它和下一个数的差的绝对值,得到一个新的 n 元组(|a1-a2|,|a2-a3|,...,|an-a1|,)。重复这个过程,得到的序列称为 Ducci 序列,例如:
(8, 11, 2, 7) -> (3, 9, 5, 1) -> (6, 4, 4, 2) -> (2, 0, 2, 4) -> (2, 2, 2, 2) -> (0, 0, 0, 0).
也有的 Ducci 序列最终会循环。输入”元组(3≤n≤15),你的任务是判断它最终会变成 0 还是会循环。输入保证最多 1000 步就会变成 0 或者循环。

```js
let f = (arr, safe = 0, p) => {
  // 0
  // loop
  // 1000
  let pArr = arr.map((item) => item)
  for (let i = 0; i < 1000; i++) {
    let t = []
    for (let j = 0; j < arr.length - 1; j++) {
      t.push(Math.abs(arr[j] - arr[j + 1]))
    }
    t.push(Math.abs(arr[arr.length - 1] - arr[0]))
    clog(t)
    if (t.every((item) => item === 0)) {
      return 0
    }
    if (t.every((item, index) => item === pArr[index])) {
      return 'loop'
    }
    arr = t
  }
  return 1000
}
```

桌上有 n(n≤50)张牌,从第一张牌(即位于顶面的牌)开始,从上往下依次编号为 1~n。当至少还剩下两张牌时进行以下操作:把第一张牌扔掉,然后把新的第一张牌放到整叠牌的最后。输入每行包含一个 n,输出每次扔掉的牌以及最后剩下的牌。

```js
// 看不懂
let f = (n) => {
  let arr = []
  for (let i = 1; i < n + 1; i++) {
    arr.push(i)
  }
  while (arr.length) {
    let p = arr.shift()
    let t = arr.shift()
    if (t) {
      arr.push(t)
    }
  }
}
```

交换学生
复合词
给出平面上 N (N≤1000)个点,问是否可以找到一条竖线,使得所有点左右对称。例如图 5-6 中,左边的图形有对称轴,右边没有。

```js
let f = (arr) => {
  // 按x正序排列
  // 奇数时找到中位点
  // 偶数时找到2个中位点之间的点
  arr.sort((a, b) => a.x - b.x)
  let x
  if (arr.length % 2) {
    let t = Math.floor(arr.length / 2)
    x = arr[t].x
  } else {
    let t = Math.floor(arr.length / 2)
    x = (arr[t].x + arr[t - 1].x) / 2
  }
  // 判断是否对称
  for (let i = 0; i < arr.length / 2; i++) {
    if (
      Math.abs(arr[i].x - x) !== Math.abs(arr[arr.length - 1 - i].x - x) ||
      arr[i].y !== arr[arr.length - 1 - i].y
    ) {
      return false
    }
  }
  return true
}
```

打印队列
图书管理系统
找 bug
输入并模拟执行一段程序,输出第一个 bug 所在的行。每行程序有两种可能:
□ 数组定义,格式为 arr[size]。例如[10]或者 b[5],可用下标分别是 0~9 和 0~4。定
义之后所有元素均为未初始化状态。
□ 赋值语句,格式为 arr[index]=value。例如 a[0]=3 或者 a[a[0]]=a[1]。
赋值语句可能会出现两种 bug:下标 index 越界;使用未初始化的变量(index 和 value
都可能出现这种情况)。
程序不超过 1000 行,每行不超过 80 个字符且所有常数均为小于 2²1 的非负整数。

```js
// 不会
```

```js
// 未测试
let f = (articleArr, reqArr) => {
  let sentenceArr = articleArr.map((article) => {
    return article.split('\n')
  })
  let res = []
  reqArr.map((word) => {
    // 4种操作
    if (word.includes(' AND ')) {
      let [a, b] = word.split(' AND ')
      for (let i = 0; i < sentenceArr.length; i++) {
        for (let j = 0; j < sentenceArr[i].length; j++) {
          if (sentenceArr[i][j].includes(a) && sentenceArr[i][j].includes(b)) {
            res.push()
          }
        }
      }
    } else if (word.includes(' OR ')) {
      let [a, b] = word.split(' OR ')
      for (let i = 0; i < sentenceArr.length; i++) {
        for (let j = 0; j < sentenceArr[i].length; j++) {
          if (sentenceArr[i][j].includes(a) || sentenceArr[i][j].includes(b)) {
            res.push()
          }
        }
      }
    } else if ('NOT ') {
      let w = word.slice(4)
      for (let i = 0; i < sentenceArr.length; i++) {
        if (sentenceArr[i].every((sentence) => !sentence.includes(w))) {
          res.push(sentenceArr)
        }
      }
    } else {
      for (let i = 0; i < sentenceArr.length; i++) {
        for (let j = 0; j < sentenceArr[i].length; j++) {
          if (sentenceArr[i][j].toLowerCase().includes(word)) {
            res.push(sentenceArr[i][j])
          }
        }
      }
    }
  })
  return res
}
```

更新字典(Updating a Dictionary, UVa12504)
在本题中,字典是若干键值对,其中键为小写字母组成的字符串,值为没有前导零或
正号的非负整数(−4,03 和+77 都是非法的,注意该整数可以很大)。输入一个旧字典和
一个新字典,计算二者的变化。输入的两个字典中键都是唯一的,但是排列顺序任意。具
体格式为(注意字典格式中不含任何空白字符):
{key:value, key:value,, key:value}
输入包含两行,各包含不超过 100 个字符,即旧字典和新字典。输出格式如下:
■ 如果至少有一个新增键,打印一个“+”号,然后是所有新增键,按字典序从小到大
排列。
■ 如果至少有一个删除键,打印一个“”号,然后是所有删除键,按字典序从小到大
排列。
■ 如果至少有一个修改键,打印一个“*”号,然后是所有修改键,按字典序从小到大
排列。
■ 如果没有任何修改,输出 No changes。
例如,若输入两行分别为 {a:3,b:4,c:10,f:6}和{a:3,c:5,d:10,ee:4},输出为以下 3 行: +d,ee:
-b,f; *co

```js
let f = (map0, map1) => {
  let res = ''
  let arrOld = Array.from(map0.keys())
  let arrNew = Array.from(map1.keys())
  let addArr = []
  let modifyArr = []
  let deleteArr = []
  for (let i = 0; i < arrOld.length; i++) {
    // 从旧到新
    if (arrNew.includes(arrOld[i])) {
      // 仍存在
      // 是否修改
      if (map1.get(arrOld[i]) === map0.get(arrOld[i])) {
        // null
      } else {
        modifyArr.push(arrOld[i])
      }
    } else {
      // 不存在，即已删除
      deleteArr.push(arrOld[i])
    }
  }
  for (let i = 0; i < arrNew.length; i++) {
    // 从新到旧
    if (!arrOld.includes(arrNew[i])) {
      // 旧的不包含，即增加
      addArr.push(arrNew[i])
    }
  }
  if (addArr.length) {
    res += '+'
    res += addArr.join(',')
    res += ';'
  }
  if (deleteArr.length) {
    res += '-'
    res += deleteArr.join(',')
    res += ';'
  }
  if (modifyArr.length) {
    res += '*'
    res += modifyArr.join(',')
    res += ';'
  }
  return res
}
```

地图查询
客户中心模拟
交易所
Fibonacci 的复仇
Fibonacci 数的定义为:F(0)=F(1)=1,然后从 F(2)开始,F(i)=F(i-1)+F(i-2)。例如,前 10 项 Fibonacci 数分别为 1, 1, 2, 3, 5, 8, 13, 21,34,55……………有一天晚上,你梦到了 Fibonacci,它告诉你一个有趣的 Fibonacci 数。醒来以后,你只记得了它的开头几个数字。你的任务是找出以它开头的最小 Fibonacci 数的序号。例如以 12 开头的最小 Fibonacci 数是 F(25)。输入不超过 40 个数字,输出满足条件的序号。

```js
let f = (n) => {
  let map = new Map([
    [0, 1],
    [1, 1],
  ])
  let getFib = (n) => {
    if ([0, 1].includes(n)) {
      return map.get(n)
    } else {
      if (map.get(n)) {
        return map.get(n)
      } else {
        let t = getFib(n - 1) + getFib(n - 2)
        map.set(n, t)
        return t
      }
    }
  }
  let i = 0
  let c = String(getFib(i))
  while (!c.startsWith(String(n))) {
    i++
    c = String(getFib(i))
  }
  return Number(c)
}
```

医院里有 n (n≤10)个手术室和 m(m≤30)个恢复室。每个病人首先会被分配到一个手术室,手术后会被分配到一个恢复室。从任意手术室到任意恢复室的时间均为 t1,准备一个手术室和恢复室的时间分别为 t2 和 t3(一开始所有手术室和恢复室均准备好,只有接待完一个病人之后才需要为下一个病人准备)。k 名(k≤100)病人按照花名册顺序排队,T 点钟准时开放手术室。每当有准备好的手术室时,队首病人进入其中编号最小的手术室。手术结束后,病人应立刻进入编号最小的恢复室。如果有多个病人同时结束手术,编号较小的病人优先进入编号较小的恢复室。输入保证病人无须排队等待恢复室。输入 n、m、 T、t1、 t2、t3、k 和 k 名病人的名字、手术时间和恢复时间,模拟这个过程。输入输出细节请参考原题。

```js
// 改一下：有空闲手术室和恢复室时才开始接待。
// 理解题意：
// 在手术室 t1
// 在恢复室 t1
// 准备手术室 t2
// 准备恢复室 t3
// 准备手术室 -》 准备恢复室 -》 在手术室 -》 在恢复室 -》
// 未测试
let f = (n, m, t, t1, t2, t3, k) => {
  let kArr = []
  for (let i = 0; i < k; i++) {
    kArr.push(i)
  }
  let opArr = Array.from({ length: n + 1 }, () => 0)
  let resetArr = Array.from({ length: m + 1 }, () => 0)
  let doingFn = (t) => {
    return new Promise((s) => {
      setTimeout(() => {
        s(true)
      }, t)
    })
  }
  let loopFn = (i, opF, p = undefined) => {
    if (i < kArr.length) {
      return Promise.resolve(opF(kArr[i])).then((res) => {
        i++
        return opF(i, opF, res)
      })
    } else {
      return Promise.resolve(p)
    }
  }
  let opF = () => {
    return new Promise((s) => {
      // 准备
      let prepareP
      if (opArr.includes(0)) {
        if (resetArr.includes(0)) {
          prepareP = Promise.resolve()
        } else {
          prepareP = doingFn(t3)
        }
      } else {
        if (resetArr.includes(0)) {
          prepareP = doingFn(t2)
        } else {
          prepareP = doingFn(Math.max(t2, t3))
        }
      }
      // 手术
      return (
        prepareP
          .then(() => {
            return doingFn(t1)
          })
          // 恢复
          .then(() => {
            return doingFn(t1)
          })
      ) // .then()
    })
  }
  loopFn(0, opF)
}
```

# 第 2 部分 基础篇

## 第 6 章 数据结构基础

并行程序模拟
某城市有一个火车站,铁轨铺设如图 6-1 所示。有 n 节车厢从 A 方向驶入车站,按进站顺序编号为 1~n。你的任务是判断是否能让它们按照某种特定的顺序进入 B 方向的铁轨并驶出车站。例如,出栈顺序(54123)是不可能的,但(54321)是可能的。

```js
let f = (arr0, arr1) => {
  let t = arr0.reverse()
  return arr1.every((item, index) => item === t[index])
}
```

矩阵链乘
破损的键盘

```js
let f = (arr) => {
  return arr.map((item) => {
    let lineArr = item.split('')
    let sucessArr = []
    let p = 0
    lineArr.forEach((item) => {
      switch (item) {
        case '[':
          p = 0
          break
        case ']':
          p = sucessArr.length
          break
        default:
          sucessArr.splice(p, 0, item)
          p++
          break
      }
    })
    return sucessArr.join('')
  })
}
// 作者说可以使用链表，但是我看不明白。
```

你有一行盒子,从左到右依次编号为 1,2,3,…,n。可以执行以下 4 种指令:
□1XY 表示把盒子 X 移动到盒子 Y 左边(如果 X 已经在 Y 的左边则忽略此指令)。
□2XY 表示把盒子 X 移动到盒子 Y 右边(如果 X 已经在 Y 的右边则忽略此指令)。
□3XY 表示交换盒子 X 和 Y 的位置。
□4 表示反转整条链。
指令保证合法,即 X 不等于 Y。例如,当 n=6 时在初始状态下执行 114 后,盒子序列为 231456。接下来执行 235,盒子序列变成 214536。再执行 316,得到 264531。最终执行 4,得到 135462。

```js
// 简单测试，通过。
let f = (n, commandList) => {
  let arr = []
  for (let i = 0; i < n; i++) {
    arr.push(i + 1)
  }
  commandList.forEach((command) => {
    let commandArr = command.split(' ').map(Number)
    let xIndex, yIndex
    xIndex = arr.findIndex((item) => item === commandArr[1])
    yIndex = arr.findIndex((item) => item === commandArr[2])
    switch (commandArr[0]) {
      case 1:
        if (xIndex + 1 === yIndex) {
          // null
        } else {
          arr.splice(xIndex, 1)
          let newYIndex = xIndex < yIndex ? yIndex - 1 : yIndex
          arr.splice(newYIndex, 0, commandArr[1])
        }
        // clog(arr)
        break
      case 2:
        if (yIndex + 1 === xIndex) {
        } else {
          arr.splice(xIndex, 1)
          arr.splice(xIndex < yIndex ? yIndex - 1 : yIndex, 0, commandArr[1])
        }
        break
      case 3:
        ;[arr[xIndex], arr[yIndex]] = [arr[yIndex], arr[xIndex]]
        break
      case 4:
        arr.reverse()
        break
    }
  })
  return arr
}
```

有一棵二叉树,最大深度为 D,且所有叶子的深度都相同。所有结点从上到下从左到
右编号为 1,2,3,…… 2°–1。在结点 1 处放一个小球,它会往下落。每个内结点上都有一个开
关,初始全部关闭,当每次有小球落到一个开关上时,状态都会改变。当小球到达一个内
结点时,如果该结点上的开关关闭,则往左走,否则往右走,直到走到叶子结点,如图 6-2
所示。
一些小球从结点 1 处依次开始下落,最后一个小球将会落到哪里呢?输入叶子深度 D 和
小球个数 1,输出第 Ⅰ 个小球最后所在的叶子编号。假设 I 不超过整棵树的叶子个数。D≤
20。输入最多包含 1000 组数据。

```js
let f = (i, d) => {
  // 创建一棵树。
  // 节点：{
  //     left: node,
  //     value: {
  //         count: number,
  //         toggle: boolean, // true 开 false 关
  //     },
  //     right: node,
  // }
  let createNode = (v) => {
    return {
      left: null,
      value: v,
      right: null,
    }
  }
  class Tree {
    constructor() {
      this.root = null
    }
    mount(node, v1, v2) {
      node.left = v1
      node.right = v2
    }
  }
  let tree = new Tree()
  let nodeCount = 0
  for (let j = 0; j < d; j++) {
    nodeCount += Math.pow(2, j)
  }
  tree.root = createNode({
    count: 1,
    toggle: false,
  })
  let tArr = [tree.root] // 要挂载子节点的数组
  let cur = 1
  while (cur < nodeCount) {
    let node = tArr.shift()
    let leftNode = createNode({
      count: ++cur,
      toggle: false,
    })
    let rightNode = createNode({
      count: ++cur,
      toggle: false,
    })
    tArr.push(leftNode)
    tArr.push(rightNode)
    tree.mount(node, leftNode, rightNode)
  }
  // 放球
  let _f = (node, n) => {
    if (!node) {
      return n
    } else {
      if (node.value.toggle) {
        // 如果该结点上的开关关闭,则往左走,否则往右走
        node.value.toggle = !node.value.toggle
        return _f(node.right, node.value.count)
      } else {
        node.value.toggle = !node.value.toggle
        return _f(node.left, node.value.count)
      }
    }
  }
  let dp = []
  for (let j = 0; j < i; j++) {
    dp.push(_f(tree.root))
  }
  return dp
}
```

输入一个树状天平,根据力矩相等原则判断是否平衡。如图 6-5 所示,所谓力矩相等,
就是 WD=WĻD,其中 W 和 W.分别为左右两边砝码的重量,D 为距离。
采用递归(先序)方式输入:每个天平的格式为 W,D₁,W₁, D₂, 当或为 0 时,
表示该“砝码”实际是一个子天平,接下来会描述这个子天平。当 W=W,=0 时,会先描述
左子天平,然后是右子天平。

```js
f = (
  arr
  // [
  //     [wl, dl, wr, dr],
  // ]
) => {
  let createNode = (w, d) => {
    return {
      left: null,
      right: null,
      value: {
        d,
        w,
      },
    }
  }
  class Tree {
    constructor() {
      this.root = null
    }
    mount(parentNode, branch, w, d) {
      let node = createNode(w, d)
      switch (branch) {
        case 'left':
          this.mountLeft(parentNode, node)
          break
        case 'right':
          this.mountRight(parentNode, node)
          break
      }
    }
    mountLeft(parentNode, node) {
      parentNode.left = node
    }
    mountRight(parentNode, node) {
      parentNode.right = node
    }
  }
  let tree = new Tree()
  // 创建树
  tree.root = {
    left: null,
    right: null,
    value: null,
  }
  // 挂节点
  let tArr = [tree.root]
  while (tArr.length) {
    let tNode = tArr.shift()
    let arrItem = arr.shift()
    tree.mount(tNode, 'left', arrItem[0], arrItem[1])
    tree.mount(tNode, 'right', arrItem[2], arrItem[3])
    if (arrItem[2] === 0) {
      tArr.unshift(tNode.right)
    }
    if (arrItem[0] === 0) {
      tArr.unshift(tNode.left)
    }
  }
  // 算w
  let _f = (node) => {
    if (!node) {
      return
    } else {
      if (node.value.w) {
        return node.value.w
      } else {
        return (node.value.w = _f(node.left) + _f(node.right))
      }
    }
  }
  _f(tree.root.left)
  _f(tree.root.right)
  clog(tree)
  // 判断是否平衡 wl * dl = wr * dr
  let res = []
  let isBalance = (node) => {
    if (node.left && node.right) {
      clog(
        node.left.value.w * node.left.value.d,
        node.right.value.w * node.right.value.d
      )
      if (
        node.left.value.w * node.left.value.d ===
        node.right.value.d * node.right.value.w
      ) {
      } else [res.push(node)]
      isBalance(node.left)
      isBalance(node.right)
    }
  }
  isBalance(tree.root)
  // 收集所有不平衡的节点
  return res
}
```

下落的树叶

## 6.4 图

图(Graph)描述的是一些个体之间的关系。与线性表和二叉树不同的是:这些个体之
间既不是前驱后继的顺序关系,也不是祖先后代的层次关系,而是错综复杂的网状关系。
输入一个 m 行 n 列的字符矩阵,统计字符“@”组成多少个八连块。如果两个字符“@”所在的格子相邻(横、竖或者对角线方向),就说它们属于同一个八连块。例如,图 6-9 中有两个八连块。

```js
let f = (arr) => {
  let tagArr = Array.from({ length: arr.length }, () =>
    Array.from({ length: arr[0].length }, () => 0)
  )
  // 0 未探索 1 可访问 2 已使用
  let queueArr = []
  // 八连块
  let res = []
  let bfs = (i, j, p) => {
    queueArr.push([i, j])
    while (queueArr.length) {
      let [r, c] = queueArr.shift()
      tagArr[r][c] = 2
      p.push([r, c])
      // 右
      if (
        arr[r] &&
        arr[r][c + 1] && // 存在
        arr[r][c + 1] === '@' && // 是@
        tagArr[r][c + 1] === 0 // 未搜索
      ) {
        queueArr.push([r, c + 1])
        tagArr[r][c + 1] = 1
      }
      // 右下
      if (
        arr[r + 1] &&
        arr[r + 1][c + 1] && // 存在
        arr[r + 1][c + 1] === '@' && // 是@
        tagArr[r + 1][c + 1] === 0 // 未搜索
      ) {
        queueArr.push([r + 1, c + 1])
        tagArr[r + 1][c + 1] = 1
      }
      // 下
      if (
        arr[r + 1] &&
        arr[r + 1][c] && // 存在
        arr[r + 1][c] === '@' && // 是@
        tagArr[r + 1][c] === 0 // 未搜索
      ) {
        queueArr.push([r + 1, c])
        tagArr[r + 1][c] = 1
      }
      // 左下
      if (
        arr[r - 1] &&
        arr[r - 1][c - 1] && // 存在
        arr[r - 1][c - 1] === '@' && // 是@
        tagArr[r - 1][c - 1] === 0 // 未搜索
      ) {
        queueArr.push([r - 1, c - 1])
        tagArr[r - 1][c - 1] = 1
      }
      // 左
      if (
        arr[r - 1] &&
        arr[r - 1][c] && // 存在
        arr[r - 1][c] === '@' && // 是@
        tagArr[r - 1][c] === 0 // 未搜索
      ) {
        queueArr.push([r - 1, c])
        tagArr[r - 1][c] = 1
      }
      // 左上
      if (
        arr[r - 1] &&
        arr[r - 1][c - 1] && // 存在
        arr[r - 1][c - 1] === '@' && // 是@
        tagArr[r - 1][c - 1] === 0 // 未搜索
      ) {
        queueArr.push([r - 1, c - 1])
        tagArr[r - 1][c - 1] = 1
      }
      // 上
      if (
        arr[r - 1] &&
        arr[r - 1][c] && // 存在
        arr[r - 1][c] === '@' && // 是@
        tagArr[r - 1][c] === 0 // 未搜索
      ) {
        queueArr.push([r - 1, c])
        tagArr[r - 1][c] = 1
      }
      // 右上
      if (
        arr[r - 1] &&
        arr[r - 1][c + 1] && // 存在
        arr[r - 1][c + 1] === '@' && // 是@
        tagArr[r - 1][c + 1] === 0 // 未搜索
      ) {
        queueArr.push([r - 1, c + 1])
        tagArr[r - 1][c - 1] = 1
      }
    }
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (!tagArr[i][j] && arr[i][j] === '@') {
        res.push([])
        bfs(i, j, res[res.length - 1])
      }
    }
  }
  return res
}
```

古代象形符号
假设有一个网格迷宫,由 n 行 m 列的单元格组成,每个单元格要么是空地(用 1 来表示),要么是障碍物(用 0 来表示)。如何找到从起点到终点的最短路径?萬还记得二叉树的 BFS 吗?结点的访问顺序恰好是它们到根结点距离从小到大的顺序。类似地,也可以用 BFS 来按照到起点的距离顺序遍历迷宫图。

```js
// 求最少需要多少步
let f = (n, m, obstacleList, start, end) => {
  let dp = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => Number.MAX_SAFE_INTEGER)
  )
  // dp[i]表示到第i个格子需要的最短距离
  let tag = Array.from({ length: n }, () => Array.from({ length: m }, () => 0))
  // 0 未探索 1 可访问 2 已使用
  // clog(dp)
  obstacleList.forEach((item) => {
    dp[item[0]][item[1]] = -1 // 用-1表示障碍物
  })
  dp[start[0]][start[1]] = 1 // 起点记为1
  tag[start[0]][start[1]] = 2
  let queue = []
  // 再找相邻的点
  if (dp[start[0]][start[1] + 1] && dp[start[0]][start[1] + 1] !== -1) {
    tag[start[0]][start[1] + 1] = 1
    queue.push([start[0], start[1] + 1])
  }
  if (
    dp[start[0] + 1] &&
    dp[start[0] + 1][start[1]] &&
    dp[start[0] + 1][start[1]] !== -1
  ) {
    tag[start[0] + 1][start[1]] = 1
    queue.push([start[0] + 1, start[1]])
  }
  if (dp[start[0]][start[1] - 1] && dp[start[0]][start[1] - 1] !== -1) {
    tag[start[0]][start[1] - 1] = 1
    queue.push([start[0], start[1] - 1])
  }
  if (
    dp[start[0] - 1] &&
    dp[start[0] - 1][start[1]] &&
    dp[start[0] - 1][start[1]] !== -1
  ) {
    tag[start[0] - 1][start[1]] = 1
    queue.push([start[0] - 1, start[1]])
  }

  while (queue.length) {
    let t = queue.shift()
    let [i, j] = t
    // 处理当前值
    // 周围最小值+1
    dp[i][j] =
      Math.min(
        dp[i - 1] && dp[i - 1][j] > 0 ? dp[i - 1][j] : Number.MAX_SAFE_INTEGER,
        dp[i][j + 1] > 0 ? dp[i][j + 1] : Number.MAX_SAFE_INTEGER,
        dp[i + 1] && dp[i + 1][j] > 0 ? dp[i + 1][j] : Number.MAX_SAFE_INTEGER,
        dp[i][j - 1] > 0 ? dp[i][j - 1] : Number.MAX_SAFE_INTEGER
      ) + 1
    tag[i][j] = 2
    // 相邻点入队列
    // 上
    if (
      dp[i - 1] &&
      dp[i - 1][j] && // 存在
      ![-1].includes(dp[i - 1][j]) && // 不是障碍物
      tag[i - 1][j] === 0 // 未搜索
    ) {
      tag[i - 1][j] = 1
      queue.push([i - 1, j])
    }
    // 右
    if (
      dp[i] &&
      dp[i][j + 1] && // 存在
      ![-1].includes(dp[i][j + 1]) && // 不是障碍物
      tag[i][j + 1] === 0 // 未搜索
    ) {
      tag[i][j + 1] = 1
      queue.push([i, j + 1])
    }
    // 下
    if (
      dp[i + 1] &&
      dp[i + 1][j] && // 存在
      ![-1].includes(dp[i + 1][j]) && // 不是障碍物
      tag[i + 1][j] === 0 // 未搜索
    ) {
      tag[i + 1][j] = 1
      queue.push([i + 1, j])
    }
    // 左
    if (
      dp[i] &&
      dp[i][j - 1] && // 存在
      ![-1].includes(dp[i][j - 1]) && // 不是障碍物
      tag[i][j - 1] === 0 // 未搜索
    ) {
      tag[i][j - 1] = 1
      queue.push([i, j - 1])
    }
  }
  // clog(dp)
  return dp[end[0]][end[1]]
}
// 求最短路径
f = (n, m, obstacleList, start, end) => {
  let res = []
  let map = Array.from({ length: n }, () =>
    Array.from(
      { length: m },
      () =>
        // Number.MAX_SAFE_INTEGER))
        1
    )
  )
  obstacleList.forEach(([i, j]) => {
    map[i][j] = -1
  })
  let tag = Array.from({ length: n }, () => Array.from({ length: m }, () => 0))
  tag[start[0]][start[1]] = 1
  clog(map)
  let fn = (p, state = []) => {
    let [i, j] = p
    tag[i][j] = 2
    state.push([i, j])
    if (
      state.length &&
      state[state.length - 1][0] === end[0] &&
      state[state.length - 1][1] === end[1]
    ) {
      res.push([...state])
    }
    // 上
    if (
      map[i - 1] &&
      map[i - 1][j] && // 存在
      tag[i - 1][j] !== 2 && // 不走已经走过的节点
      map[i - 1][j] !== -1 // 不是障碍物
    ) {
      fn([i - 1, j], state)
    }
    // 右
    if (
      map[i][j + 1] && // 存在
      tag[i][j + 1] !== 2 && //
      map[i][j + 1] !== -1 // 不是障碍物
    ) {
      fn([i, j + 1], state)
    }
    // 下
    if (
      map[i + 1] &&
      map[i + 1][j] && // 存在
      tag[i + 1][j] !== 2 && //
      map[i + 1][j] !== -1 // 不是障碍物
    ) {
      fn([i + 1, j], state)
    }
    // 左
    if (
      map[i][j - 1] && // 存在
      tag[i][j - 1] !== 2 && //
      map[i][j - 1] !== -1
    ) {
      fn([i, j - 1], state)
    }
    tag[i][j] = 1
    state.pop()
  }
  // fn(start)
  fn(start)
  return res
}
```

Abbott 的复仇

### 拓扑排序

```js
let f = (vertexList, edgeList) => {
  class Graph {}
  let graph = new Graph() // 有向无环图
  let aNode = { value: 'a' }
  let bNode = { value: 'b' }
  let cNode = { value: 'c' }
  let dNode = { value: 'd' }
  graph = {
    adjMap: new Map([
      [aNode, [bNode]],
      [dNode, [cNode, bNode]],
    ]),
  }
  let res = []
  let uniqueByKey = (arr, key) => {
    let set = new Set()
    return arr.filter((item) => {
      if (set.has(item[key])) {
        return false
      } else {
        set.add(item[key])
        return true
      }
    })
  }
  let tagArr = []
  let fn = (state, choise) => {
    if (state.length === 4 && state[state.length - 1].value === 'b') {
      let t = state.reduce((r, c) => {
        return (r += c.value)
      }, '')
      if (tagArr.includes(t)) {
      } else {
        tagArr.push(t)
        res.push([...state])
      }
    } else {
      if (state.find((item) => item.value === 'b')) {
      } else {
        for (let v of choise) {
          state.push(v)
          let arr = choise.filter((item) => item.value !== v.value)
          arr.push(...(graph.adjMap.get(v) || []))
          uniqueByKey(arr, 'value')
          fn(state, arr)
          state.pop()
        }
      }
    }
  }
  let startList = Array.from(graph.adjMap.keys())
  startList.forEach((v) => {
    fn([], startList)
  })
  return res
}
```

图中的最短路径 Dijkstra's

```js
let f = () => {}
```

```js
let f = () => {}
```

```js
let f = () => {}
```

```js
let f = () => {}
```

```js
let f = () => {}
```

```js
let f = () => {}
```

```js
let f = () => {}
```

### title

### title

## 第 7 章 数据结构基础

# 第 3 部分 竞赛篇

## 第 8 章 高效算法设计

## 第 9 章 动态规划初步

## 第 10 章 数学概念与方法

## 第 11 章 图论模型与算法

## 第 12 章 高级专题

## 附录 A 开发环境与方法

## 主要参考书目
