# 二分查找

```js
var arr = [1, 2, 3, 4, 5, 6, 7]
let f = (arr, v) => {
  if (!arr.length) {
    return false
  } else {
    let p = arr.length >> 1
    let t = v - arr[p]
    if (t === 0) {
      return true
    } else if (t > 0) {
      return f(arr.slice(p + 1), v)
    } else {
      return f(arr.slice(0, p), v)
    }
  }
}
clog(f(arr, 33))
```

# 选择排序、冒泡排序、插入排序

# 快排、归并排序

# huffman coding

# 广度优先

# 深度优先

# gradient descent

# dijkstra‘s algorithm

# diffie-Helllman key exchange

# title

# title
