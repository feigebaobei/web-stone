> 常用的操作

## object/map/set 等

```js
let o = {}
o[k] = o[k]++ || 1
let map = new Map()
map.set(k, map.get(k) ? map.get(k) + 1 : 1)
let set = new Set()
set.add(v)
```

## 相等

```js
let f = (obj1, obj2) => {
  let key1 = Object.keys(obj1)
  let key2 = Object.keys(obj2)
  if (key1.length === key2.length) {
    return key1.every((item) => {
      if (['xxx'].includes(type(obj1[item]))) {
        // todo
        return obj1[item] === obj2[item]
      } else {
        return f(obj1[item], obj2[item])
      }
    })
  } else {
    return false
  }
}
```

## 和

```js
// 数组求和
arr.reduce((r, c) => r += c, 0)
// 数组区间求和
for (let i = k; i < n; i++) {
    r += arr[i]
}
// 值的和
obj = {a: 1, b: 2, c: 3, ...}
Array.from(Object.values(obj)).reduce((r, c) => r += c, 0)
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
