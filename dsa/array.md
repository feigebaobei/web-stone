> 常用的操作

## 从指定位置开始循环

```js
// 从k开始，循环n次
for (let i = arr.length + k; i < n; i++) {
  arr[i % arr.length] // 当前值
  arr[(i - 1) % arr.length] // 前一个值
  arr[(i + 1) % arr.length] // 后一个值
}
let i = 0
let index = arr.length + k
while (i < n) {
  arr[i % arr.length]
  i++
  index++
}
arr[i]
// 返回第i个元素
let f = (arr, i) => {
  return arr[i % arr.length]
}
```

## 排列

使用回溯

```js
let res = []
// 全排列
let f = (choices, state = []) => {
  if (state.length === choices.length) {
    res.push([...state])
  } else {
    for (let i = 0; i < choices.length; i++) {
      if (!state.includes(choices[i])) {
        state.push(choices[i])
        f(choices, state)
        state.pop()
      }
    }
  }
}
// choices中排n个
f = (choices, n, state = []) => {
  if (state.length === 2) {
    res.push([...state])
  } else {
    choices.forEach((item) => {
      state.push(item)
      f(
        choices.filter((ele) => ele !== item),
        n,
        state
      ) // 也可以限制不包含 !includes
      state.pop()
    })
  }
}
```

## 组合

```js
f = (choices, n, state = []) => {
  if (state.length === n) {
    res.push([...state])
  } else {
    choices.forEach((item) => {
      if (!state.includes(item)) {
        state.push(item)
        f(choices, n, state)
        state.pop()
      }
    })
  }
}
```

## 并集

```js
let f = (a, b) => {
  return [...new Set([...a, ...b])]
}
```

## 交集

```js
let f = (a, b) => {
  return a.filter((item) => {
    return b.includes(item)
  })
}
```

## 去重

```js
// 第一种。
// 适用于多个数组内和相等
// 组合去重
let productList = []
let product = arr.reduce((r, c) => (r *= c), 1)
if (productList.includes(product)) {
    productList.push(product)
    opFn(arr)
}

// 第二种
// 排列去重
let arrList = [[], [], [], ...]
let productList = arrList.map(arr => {
    let r = 0
    for (let i = 0; i < arr.length; i++) {
        r += arr[i] * (arr.length - i)
    }
    return r
})
for (let i = productList.length - 2; i >= 0; i--) {
    if (productList.slice(i + 1).includes(productList[i])) {
        productList.split(i, 1)
    }
}
```

## 数组是否相等

```js
let f = (aArr, bArr) => {
  if (aArr.length !== bArr.length) {
    return false
  } else {
    let newAArr = [...aArr]
    let newBArr = [...bArr]
    newAArr.sort((a, b) => a - b)
    newBArr.sort((a, b) => a - b)
    return newAArr.every((item, index) => item === newBBrr[index])
  }
}
```

## 等分/切割

```js
let f = (arr, len) => {
  let res = []
  while (arr.length) {
    res.push(arr.splice(0, len)) // 从头开始
  }
  return res
}
let f = (arr, len) => {
  let res = []
  while (arr.length) {
    res.push(arr.splice(-len)) // 从尾开始
  }
  return res
}
let f = (arr, spliceIndexArr) => {
  let res = []
  let pre = 0
  for (let i = 0; i < spliceIndexArr.length; i++) {
    res.push([...arr.slice(pre, spliceIndexArr[i])])
    pre = i
  }
  res.push([...arr.slice(spliceIndexArr[spliceIndexArr.length - 1])])
}
```

## 是否有序

```js
let f = (arr) => {
  let order = true
  let i = 0
  while (i < arr.length - 1) {
    if (arr[i] > arr[i + 1]) {
      order = false
      break
    }
    i++
  }
  return order
}
```

## 字符串字典排序

```js
let f = (arr) => {
  return arr.sort((a, b) => {
    let min = Math.min(a.length, b.length)
    let i = 0
    while (i < len) {
      if (a.charCodeAt(i) !== b.charCodeAt(i)) {
        break
      }
      i++
    }
    if (i < len) {
      return a.charCodeAt(i) - b.charCodeAt(i)
    } else {
      return a.length - b.length
    }
  })
}
```

## flat

```js
let f = (arr, res = []) => {
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      f(item, res)
    } else {
      res.push(item)
    }
  })
  return res
}
```

## title

```js

```

## title

```js

```

## title

```js

```

## title

```js

```
