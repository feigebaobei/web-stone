```ts
// 未测试
type N = number
type F = Function

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
let eta = (a: N[]): N => {
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
// 全距
let range = (a: N[]): N => {
  return Math.max(...a) - Math.min(...a)
}
// 变异数
let variance = (a: N[], sample = true) => {
  if (sample) {
    let square = (a: N[]) => {
      return a.map((n) => n * n)
    }
    // let
    return (compose(a, square, sum) - Math.pow(sum(a), 2)) / (a.length - 1)
  }
}
// 把a依次用fn[]处理
// 每一个f都是纯函数，且有返回值。
let compose = (a: N[], ...fn: F[]) => {
  return fn.reduce((r, f) => {
    return f(r)
  })
}
// 标准差
// let
```
