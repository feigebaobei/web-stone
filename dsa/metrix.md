> 常用的操作

## 环

```js
// ------>
// ^     |
// |     |
// |     |
// <-----V
if (n === 1 && m === 1) {
  arr[n][m]
} else {
  let i = 0,
    j = 0
  while (j < arr[0].length) {
    arr[i][j]
    j++
  }
  j--
  while (i < arr.length) {
    arr[i][j]
    i++
  }
  i--
  while (j >= 0) {
    arr[i][j]
    j--
  }
  j++
  while (i >= 0) {
    arr[i][j]
    i--
  }
  i++
}
```

## 列

```js
for (let j = 0; j < arr[0].length; j++) {
  arr[i][j]
}
```

## 行

```js
for (let i = 0; i < arr.length; i++) {
  arr[i]
}
```

## 倒着

```js
for (let i = arr.length - 1; i >= 0; i--) {
  arr.splice(i, 1)
}
```

## 斜

```js
// let i = 0, j = 0
// 右下
while (i < arr.length && j < arr[0].length) {
  arr[i][j]
  i++
  j++
}
// 左下
while (i < arr.length && j >= 0) {
  arr[i][j]
  i++
  j--
}
// 左上
for (let i = r, j = c; i >= 0, j >= 0; i--, j--) {
  arr[i][j]
}
// 右上
for (let i = r, j = c; i >= 0, j < arr[0].length; i--, j++) {
  arr[i][j]
}
```

## bfs

创建一个空间相等的标记对象。
把起点入队列。
根据队列中的元素找到相邻元素
处理每个元素+更新标记+把标记为 0 的入队列
循环到队列为空。

不会用到递归

```js
let bfs = (i, j) => {
  let queue = [[i, j]]
  let tag = Array.from({ length: n }, () => Array.from({ length: m }, () => 0))
  // 0 未探索 1 可访问 2 已处理
  let state = []
  while (queue.length) {
    let t = queue.shift()
    let [i, j] = t
    tag[i][j] = 2 // 标记为已处理
    arr[i][j] // 操作它
    state.push([i, j])
    // 8个方法
    if (
      arr[i][j + 1] && // 存在
      tag[i][j + 1] === 0 && // 未探索
      arr[i][j + 1] === x // 符合特定值
    ) {
      tag[i][j + 1] = 1 // 标记为可访问
      queue.push([i, j + 1]) // 新点入队列
    }
    if (
      arr[i + 1] &&
      arr[i + 1][j + 1] &&
      tag[i + 1][j + 1] === 0 &&
      arr[i + 1][j + 1] === x
    ) {
      tag[i + 1][j + 1] = 1
      queue.push([i + 1, j + 1])
    }
    if (
      arr[i + 1] &&
      arr[i + 1][j] &&
      tag[i + 1][j] === 0 &&
      arr[i + 1][j] === x
    ) {
      tag[i + 1][j] = 1
      queue.push([i + 1, j])
    }
    if (
      arr[i + 1] &&
      arr[i + 1][j - 1] &&
      tag[i + 1][j - 1] === 0 &&
      arr[i + 1][j - 1] === x
    ) {
      tag[i + 1][j - 1] = 1
      queue.push([i + 1, j - 1])
    }
    if (arr[i][j - 1] && tag[i][j - 1] === 0 && arr[i][j - 1] === x) {
      tag[i][j - 1] = 1
      queue.push([i, j - 1])
    }
    if (
      arr[i - 1] &&
      arr[i - 1][j - 1] &&
      tag[i - 1][j - 1] === 0 &&
      arr[i - 1][j - 1] === x
    ) {
      tag[i - 1][j - 1] = 1
      queue.push([i - 1, j - 1])
    }
    if (
      arr[i - 1] &&
      arr[i - 1][j] &&
      tag[i - 1][j] === 0 &&
      arr[i - 1][j] === x
    ) {
      tag[i - 1][j] = 1
      queue.push([i - 1, j - 1])
    }
    if (
      arr[i - 1] &&
      arr[i - 1][j + 1] &&
      tag[i - 1][j + 1] === 0 &&
      arr[i - 1][j + 1] === x
    ) {
      tag[i - 1][j + 1] = 1
      queue.push([i - 1, j + 1])
    }
  }
  // 和上面的while一样。写重了。
  while (queue.length) {
    let [i, j] = queue.shift()
    tag[i][j] = 2
    state.push([i, j])
    let r = i
    let c = j + 1
    if (arr[r][c] && tag[r][c] === 0 && arr[r][c] === x) {
      tag[r][c] = 1
      queue.push([r, c])
    }
    r = i + 1
    j = j + 1
    if (arr[r] && arr[r][c] && tag[r][c] === 0 && arr[r][c] === x) {
      tag[r][c] = 1
      queue.push([r, c])
    }
    // 其他方向的点
  }
  // 每圈一步
  let len = queue.length
  for (let i = 0; i < len; i++) {
    let [i, j] = queue.shift()
    tag[i][j] = 2
    state.push([i, j])
    // 搜索
  }
  return state
}
```

## 暴力

```js
for (let i = 0; i < arr.length; i++) {
  // 从0开始
  for (let j = 0; j < arr.length; j++) {}
  // 从i+1开始
  for (let j = i + 1; j < arr.length; j++) {}
}
```

## 排序

```js
metrix.sort((aArr, bArr) => {
  let res = 0
  // 判断2个数组的大小
  for (let i = 0; i < aArr.length; i++) {
    let t = aArr[i] - bArr[i]
    if (t) {
      // 不等于0就是判断出大小了
      res = t
      break
    }
  }
  return res
})
```

## 去重

```js
// 二维数组的坐标去重
let productList = []
arr.forEach((point) => {
  let product = point[0] * arr[0].length + point[1]
  if (!productList.includes(product)) {
    productList.push(product)
    opFn(product)
  }
})
```

## 顺时针旋转 90 度

```js
let f = (metrix) => {
  let n = metrix.length
  let m = Math.max(...metrix.map((arr) => arr.length))
  let newMetrix = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => ' ')
  )
  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j < m; j++) {
      newMetrix[j][n - 1 - i] = metrix[i][j] || ' '
    }
  }
  return newMetrix
}
```

## 最短距离

```js
let map = [[], []]
// 求2点之间最短距离
let f = (startI, startJ, endI, endJ) => {
  // 保存从起点到所有点的距离
  let distMetrix = Array.from({ length: map.length }, () =>
    Array.from({ length: map[0].length }, () => 0)
  )
  // 保存到该点前的点
  let predMetrix = Array.from({ length: map.length }, () =>
    Array.from({ length: map[0].length }, () => null)
  )
  let tag = Array.from({ length: map.length }, () =>
    Array.from({ length: map[0].length }, () => 0)
  )
  let shortestDist = 0
  let shortestPath = []
  let queue = [[startI, startJ]]
  tag[startI][startJ] = 2
  // distMetrix[startI][startJ] = 0
  // predMetrix[startI][startJ] = null
  //   得到相邻点
  let bfs = (curI, curJ, tag) => {
    let state = []
    // 4
    let r = curI - 1
    let c = curJ
    if (
      map[r] &&
      map[r][c] !== undefined &&
      tag[r][c] === 0
      // && map[r][c] // 特定条件
    ) {
      tag[r][c] === 1
      state.push([r, c])
    }
    r = curI
    c = curJ + 1
    if (map[r] && map[r][c] !== undefined && tag[r][c] === 0) {
      tag[r][c] === 1
      state.push([r, c])
    }
    r = curI + 1
    c = curJ
    if (map[r] && map[r][c] !== undefined && tag[r][c] === 0) {
      tag[r][c] === 1
      state.push([r, c])
    }
    r = curI
    c = curJ - 1
    if (map[r] && map[r][c] !== undefined && tag[r][c] === 0) {
      tag[r][c] === 1
      state.push([r, c])
    }
    return state
  }
  while (queue.length) {
    let [curI, curJ] = queue.shift()
    let arr = bfs(curI, curJ, tag) // 广度优先探索当前点的相邻点
    let curDist = distMetrix[curI][curJ]
    arr.forEach((item) => {
      // 到相邻点的距离加1
      tag[item[0]][item[1]] = 2
      distMetrix[item[0]][item[1]] = curDist + 1 // 距离+1
      predMetrix[item[0]][item[1]] = [curI, curJ] // 相邻点的前面的点是当前点
      if (item[0] === endI && item[1] === endJ) {
        shortestDist = curDist + 1
      }
      queue.push(item)
    })
  }
  if (shortestDist) {
    shortestPath = [[endI, endJ]]
    let curPoint = predMetrix[endI][endJ]
    while (curPoint[0] !== startI || curPoint[1] !== startJ) {
      shortestPath.unshift(curPoint)
      curPoint = predMetrix[curPoint[0]][curPoint[1]]
    }
    shortestPath.unshift([startI, startJ]) // 放入起点
  }
  return { shortestDist, shortestPath }
}
// 从[i, j]到全地图的最短距离
f = (i, j) => {
  let distMetrix = Array.from({ length: map.length }, () =>
    Array.from({ length: map[0].length }, () => 0)
  )
  let pathMetrix = Array.from({ length: map.length }, () =>
    Array.from({ length: map[0].length }, () => null)
  )
  let tag = Array.from({ length: map.length }, () =>
    Array.from({ length: map[0].length }, () => 0)
  )
  let bfs = (curI, curJ, tag) => {
    let state = []
    let r = curI - 1
    let c = curJ
    if (
      map[r] &&
      map[r][c] !== undefined &&
      tag[r][c] === 0
      // && map[r][c] // 特定条件
    ) {
      state.push([r, c])
    }
    r = curI
    c = curJ + 1
    if (map[r] && map[r][c] !== undefined && tag[r][c] === 0) {
      state.push([r, c])
    }
    r = curI + 1
    c = curJ
    if (map[r] && map[r][c] !== undefined && tag[r][c] === 0) {
      state.push([r, c])
    }
    r = curI
    c = curJ - 1
    if (map[r] && map[r][c] !== undefined && tag[r][c] === 0) {
      state.push([r, c])
    }
    return state
  }
  let queue = [[i, j]]
  tag[i][j] = 2
  while (queue.length) {
    let [curI, curJ] = queue.shift()
    let curDist = distMestrix[curI][curJ]
    let arr = bfs(curI, curJ, tag)
    arr.forEach((point) => {
      tag[point[0]][point[1]] = 2
      distMetrix[point[0]][point[1]] = curDist + 1
      pathMetrix[point[0]][point[1]] = [curI, curJ]
      queue.push(point)
    })
  }
  return { distMetrix, pathMetrix }
}
```

## 合并区间

```js
// 所有区间的并区间
let f = (arr) => {
  // let arr = [] // [][]
  arr.sort((a, b) => a[0] - b[0])
  let res = []
  if (arr.length) {
    let range = [arr[0][0], arr[0][1]]
    for (let i = 1; i < arr.length; i++) {
      if (arr[i][0] <= range[1]) {
        range[1] = Math.max(arr[i][1], range[1])
      } else {
        res.push([...range])
        range[0] = arr[i][0]
        range[1] = arr[i][1]
      }
    }
    res.push([...range])
  }
  return res
}
```

## 区间的交集

```js
let f = (i, j, k, l) => {
  let s = Math.max(i, k)
  let e = Math.max(j, l)
  if (s <= e) {
    return [s, e]
  } else {
    return []
  }
}
```
