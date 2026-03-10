> 常用的操作
> 滑动窗口的计算次数少于 2 层循环（即暴力）
> 移动指针时一定要注意改变统计值。

## start + len

```js
for (let i = 0; i <= arr.length - len; i++) {
  arr.slice(i, i + len)
}
```

## 2 指针

```js
let left = 0
let right = 0
while (right < arr.length) {
    arr.slice(left, right)
    while (k < right - left) {
        left++
    }
    right++
}
let obj = {...}
while (j < n) {
    obj[kj] // 操作它
    while (满足条件时) {
        obj[ki] // 操作它
        i++ // 减小区间
    }
    j++ // 加大区间
}

while (i < len && j < len) {
    obj[arr[j]]++ // 1 每次循环是这里会加1
    if (obj[arr[j]] >= k) {
        i++
        obj[arr[j]]-- // 因为在 1 时会加1，所以这里要-1
    } else {
        j++
    }
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

## title

```js

```

## title

```js

```
