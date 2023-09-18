# 常用的统计指标

连续型数据有以下 4 个特征：

- 集中趋势
  - 平均数 miu
  - 中位数 最中间的一个数值
  - 众数 出现次数最多的数值
- 分散或变异趋势
  - 全距 R 分散程度 max - min
  - 变异数 sigma^2
  - 标准差 sigmab
  - 变异系数
- 偏态
- 峰度

```ts
let getMean = (arr: N[]) => {
  if (arr.length) {
    return (
      arr.reduce((r, c) => {
        r += c
        return r
      }, 0) / arr.length
    )
  } else {
    return undefined
  }
}
let getMedian = (arr: N[]) => {
  let len = arr.length
  let res
  if (len) {
    if (len % 2) {
      res = arr[len / 2]
    } else {
      let l = Math.floor(len / 2)
      let r = l + 1
      res = (arr[l] + arr[r]) / 2
    }
  } else {
    res = undefined
  }
  return res
}
let getMode = (arr: N[]) => {
  if (arr.length) {
    let map = new Map()
    arr.forEach((item) => {
      let n = map.get(item)
      if (n) {
        map.set(item, n + 1)
      } else {
        map.set(item, 1)
      }
    })
    let max = -1
    let num = undefined
    Array.from(map.entries()).forEach(([k, v]) => {
      if (v > max) {
        max = v
        num = k
      }
    })
    return {
      number: num,
      count: max,
    }
  } else {
    return undefined
  }
}
```

# title

# title

# title

# title

# title

# title
