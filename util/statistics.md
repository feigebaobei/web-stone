```ts
// 未测试
type N = number
type F = Function

// let subtract = (a: N, b: N): N => (a - b)
let subtractMap = (a: N[], b): N => {
  return a.map((n) => {
    return a - b
  })
}
// 求和
let sum = (a: N[]): N => {
  return a.reduce((r, c) => {
    r += c
    return r
  })
}
// 平均数，重心
let miu = (a: N[]): N => {
  return sum(a) / a.length
}
// 中位数
let eta = (arr: N[]): N => {
  let len = arr.length
  if (len % 2) {
    return arr[(len + 1) / 2]
  } else {
    let p = len / 2
    return (arr[p] + arr[p + 1]) / 2
  }
}
// 众数
let mode = (a: N[]): N[] | undefined => {
  let map = new Map()
  a.forEach((n) => {
    if (map.has(n)) {
      map.set(n, map.get(n) + 1)
    } else {
      map.set(n, 1)
    }
  })
  let max = Number.NEGATIVE_INFINITY // 负无穷大
  let res = a[0]
  Array.from(map.entries()).forEach(([k, v]) => {
    if (max < v) {
      res = k
    }
  })
  return res
}
// 最小值
let min = (a: N[]): N => Math.min(...a)
// 最大值
let max = (a: N[]): N => Math.max(...a)
// 全距
let range = (a: N[]): N => {
  return max(a) - min(a)
}
// 变异数
let variance = (a: N[], sample = true) => {
  let len = a.length
  if (sample) {
    let square = (a: N[]) => {
      return a.map((n) => n * n)
    }
    return (
      (compose(square, sum)(a) - compose(sum, (a) => [a], square)(a) / len) /
      (len - 1)
    )
  } else {
    let m = miu(a)
    let f = (a) => {
      return a.map((n) => {
        return Math.pow(n - m, 2)
      })
    }
    return compose(f, sum)(a) / (len - 1)
  }
}
// 标准差
let standardDeviation = (a: N[]) => Math.sqrt(variance(a))
// 把a依次用fn[]处理
// 每一个f都是纯函数，且有返回值。
// 也可以写成高阶函数
// let compose = (a: N[], ...fn: F[]) => {
//   return fn.reduce((r, f) => {
//     return f(a)
//   })
// }
let compose = (...fn: F[]) => {
  return (a: N[]) => {
    let i = 0
    let r = a
    while (i < fn.length) {
      r = fn[i](r)
      i++
    }
    return r
  }
}
// 变异系数
let cv = (a: N[]): N => {
  return standardDeviation(a) / miu(a)
}
// 偏态系数
let g1 = (a: N[]): N => {
  let m = miu(a)
  let len = a.length
  let f = (a) => {
    return a.map((n) => {
      return Math.pow(n - m, 3)
    })
  }
  return compose(f, sum)(a) / (len - 1) / Math.pow(standardDeviation(a), 3)
}
// 峰度系数
let g2 = (a: N[]) => {
  let m = miu(a)
  let f = (a) => {
    return a.map((n) => {
      return Math.pow(n - m, 4)
    })
  }
  let len = a.length
  return compose(f)(a) / ((len - 1) * Math.pow(standardDeviation(a), 4)) - 3
}
// 分位
// n 几分
let part = (a: N[], n = 4) => {
  if (a.length < n) {
    return
  }
  // 整理得所有下标值
  let indexArr = []
  let i = 1
  while (i < n) {
    indexArr.push(i / n)
    i++
  }
  // 用下标取得分位值
  i = 0
  while (i < indexArr.length) {
    let l = Math.floor(indexArr[i])
    let r = Math.ceil(indexArr[i])
    let remain = indexArr[i] - Math.trunc(indexArr[i])
    let leftNum = arr[l]
    let rightNum = arr[r]
    let t = (rightNum - leftNum) * remain + leftNum
    res.push(t)
    i++
  }
  return res
}
// 四分位距
let iqr = (a: N[]) => {
  let arr = part(a, 4)
  if (arr) {
    return arr[2] - arr[0]
  } else {
    return undefined
  }
}
// 阶乘
let factorial = (n: N) => {
  if (n < 0 || !Number.isInteger(n)) {
    return new Error('参数不合法')
  } else if (n > 0) {
    let res: N
    let i = 1
    while (i <= n) {
      res *= i
      i++
    }
    return res
  } else {
    return 1
  }
}
// 排列
let arrange = (n: N, m: N) => {
  return factorial(n) / factorial(n - m)
}
// 组合
let combination = (n: N, m: N) => {
  return factorial(n, m) / factorial(m)
}
```
